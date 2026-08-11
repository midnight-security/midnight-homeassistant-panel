"""Websocket API for the Midnight 911 Frontend Plugin panel.

This integration has no alarm engine, storage, or config model of its own -
every command here reads or writes Midnight Alerts' (`midnight_alerts`)
config subentries and entity-registry sensor options directly, using the
same generic, cross-integration-safe Home Assistant core APIs the HA
frontend itself would use for any integration's subentries:
`hass.config_entries.subentries.async_init`/`async_configure` to drive a
subentry's own `ConfigSubentryFlow` (the only way to create one or edit its
`.data` - HA has no generic "just write this data" command, by design, so
this module knows midnight_alerts's subentry type strings, flow step_ids,
and field names as an implicit wire contract, not through any shared code).

Sensor options are stored the same way midnight_alerts' own `sensors.py`
stores them - as entity-registry options keyed by `MIDNIGHT_ALERTS_DOMAIN`
(`entity_registry.options[MIDNIGHT_ALERTS_DOMAIN]`) - but read and written
with our own small helpers below rather than importing that module. Nothing
here requires midnight_alerts to be Python-importable, or even present at
all: it's resolved purely at runtime via config entries, and its absence is
surfaced as a config_flow abort / repair issue (see __init__.py and
config_flow.py) instead of a hard manifest dependency.
"""

from __future__ import annotations

from typing import Any, Literal

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import ActiveConnection
from homeassistant.config_entries import ConfigEntry, ConfigSubentry
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import entity_registry as er

from .const import MIDNIGHT_ALERTS_DOMAIN

# --- Midnight Alerts' wire contract -----------------------------------------
# Subentry types, flow step field names, and per-mode-timer field key format,
# as implemented in custom_components/midnight_alerts/config_flow.py. Not
# imported from there (that's private ConfigSubentryFlow behavior, not a
# shared module) - mirrored here deliberately, see module docstring.

SUBENTRY_TYPE_AREA = "area"
SUBENTRY_TYPE_USER = "user"
SUBENTRY_TYPE_SENSOR_GROUP = "sensor_group"
SUBENTRY_TYPE_ALARMO_IMPORT = "alarmo_import"

CONF_NAME = "name"
CONF_CODE = "code"
CONF_MODES = "modes"
CONF_ENABLED = "enabled"
CONF_CAN_ARM = "can_arm"
CONF_CAN_DISARM = "can_disarm"
CONF_IS_OVERRIDE_CODE = "is_override_code"
CONF_AREA_LIMIT = "area_limit"
CONF_ENTITIES = "entities"
CONF_TIMEOUT = "timeout"
CONF_EVENT_COUNT = "event_count"
CONF_GROUP_MODE = "mode"
CONF_DECAY_PER_MINUTE = "decay_per_minute"
CONF_THRESHOLD = "threshold"
CONF_WEIGHTS = "weights"
MODE_WEIGHTED_DECAY = "weighted_decay"
CONF_EXIT_TIME = "exit_time"
CONF_ENTRY_TIME = "entry_time"
CONF_TRIGGER_TIME = "trigger_time"
CONF_AREA_SUBENTRY_ID = "area_subentry_id"

# Mirrors midnight_alerts' own config_flow.py defaults - used only if the
# frontend omits a mode's timers entirely (it shouldn't, in normal use, but
# midnight_alerts's own per-field schema default can't help here: it only
# applies when a field is missing from user_input, and this module always
# submits every field explicitly for every enabled mode).
_DEFAULT_TIMERS = {CONF_EXIT_TIME: 60, CONF_ENTRY_TIME: 60, CONF_TRIGGER_TIME: 1800}

MASTER_ENTITY_AREA_ID = 0  # matches Alarmo's own "master" sentinel convention

_UPDATE_ABORT_REASONS = {"reconfigure_successful", "sensors_updated"}

SubentryKind = Literal["area", "user", "sensor_group"]
_SUBENTRY_TYPES: dict[SubentryKind, str] = {
    "area": SUBENTRY_TYPE_AREA,
    "user": SUBENTRY_TYPE_USER,
    "sensor_group": SUBENTRY_TYPE_SENSOR_GROUP,
}


class AdapterError(Exception):
    """A subentry flow rejected the request, or nothing is configured yet."""

    def __init__(self, code: str, message: str) -> None:
        super().__init__(message)
        self.code = code
        self.message = message


def _get_backend_entry(hass: HomeAssistant) -> ConfigEntry:
    """Return the single Midnight Alerts config entry, or raise."""
    entries = hass.config_entries.async_entries(MIDNIGHT_ALERTS_DOMAIN)
    if not entries:
        raise AdapterError("not_configured", f"{MIDNIGHT_ALERTS_DOMAIN} is not set up")
    return entries[0]


# --- Driving midnight_alerts' subentry flows --------------------------------


async def _configure_through(
    hass: HomeAssistant, result: dict[str, Any], steps: list[dict[str, Any]]
) -> dict[str, Any]:
    """Submit one dict of user_input per remaining form/menu step in the flow."""
    for step_input in steps:
        if result["type"] not in (FlowResultType.FORM, FlowResultType.MENU):
            raise AdapterError("unexpected_flow_state", "Flow ended earlier than expected")
        result = await hass.config_entries.subentries.async_configure(
            result["flow_id"], step_input
        )
        if result["type"] == FlowResultType.FORM and result.get("errors"):
            raise AdapterError("invalid_input", str(result["errors"]))
    return result


async def _create_subentry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    kind: SubentryKind,
    steps: list[dict[str, Any]],
) -> ConfigSubentry:
    subentry_type = _SUBENTRY_TYPES[kind]
    before = set(entry.subentries)

    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, subentry_type), context={"source": "user"}
    )
    result = await _configure_through(hass, result, steps)
    if result["type"] != FlowResultType.CREATE_ENTRY:
        raise AdapterError("flow_did_not_complete", "Create flow did not finish")

    (new_id,) = set(entry.subentries) - before
    return entry.subentries[new_id]


async def _reconfigure_subentry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    kind: SubentryKind,
    subentry_id: str,
    steps: list[dict[str, Any]],
) -> ConfigSubentry:
    subentry_type = _SUBENTRY_TYPES[kind]
    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, subentry_type),
        context={
            "source": "reconfigure",
            "entry_id": entry.entry_id,
            "subentry_id": subentry_id,
        },
    )
    result = await _configure_through(hass, result, steps)
    if (
        result["type"] != FlowResultType.ABORT
        or result.get("reason") not in _UPDATE_ABORT_REASONS
    ):
        raise AdapterError(
            "flow_did_not_complete", result.get("reason", "Update flow did not finish")
        )
    return entry.subentries[subentry_id]


def _mode_timer_field_key(mode: str, field: str) -> str:
    return f"{mode}_{field}"


def _area_timers_step_input(
    enabled_modes: list[str], mode_timers: dict[str, dict[str, int]] | None
) -> dict[str, Any]:
    mode_timers = mode_timers or {}
    step_input: dict[str, Any] = {}
    for mode in enabled_modes:
        cfg = mode_timers.get(mode, {})
        for field, default in _DEFAULT_TIMERS.items():
            step_input[_mode_timer_field_key(mode, field)] = cfg.get(field, default)
    return step_input


def _sensor_group_steps(payload: dict[str, Any]) -> list[dict[str, Any]]:
    first = {
        CONF_NAME: payload[CONF_NAME],
        CONF_ENTITIES: payload[CONF_ENTITIES],
        CONF_TIMEOUT: payload[CONF_TIMEOUT],
        CONF_EVENT_COUNT: payload[CONF_EVENT_COUNT],
        CONF_GROUP_MODE: payload.get(CONF_GROUP_MODE, "count_window"),
    }
    steps = [first]
    if first[CONF_GROUP_MODE] == MODE_WEIGHTED_DECAY:
        weights = payload.get(CONF_WEIGHTS) or {}
        steps.append(
            {
                CONF_DECAY_PER_MINUTE: payload.get(CONF_DECAY_PER_MINUTE, 1.0),
                CONF_THRESHOLD: payload.get(CONF_THRESHOLD, 10.0),
                **{
                    entity_id: weights.get(entity_id, 5.0)
                    for entity_id in payload[CONF_ENTITIES]
                },
            }
        )
    return steps


# --- Reading -----------------------------------------------------------------


def _area_dict(subentry: ConfigSubentry) -> dict[str, Any]:
    return {"area_id": subentry.subentry_id, **subentry.data}


def _user_dict(subentry: ConfigSubentry) -> dict[str, Any]:
    data = {k: v for k, v in subentry.data.items() if k != CONF_CODE}
    return {
        "user_id": subentry.subentry_id,
        "has_code": bool(subentry.data.get(CONF_CODE)),
        **data,
    }


def _sensor_group_dict(subentry: ConfigSubentry) -> dict[str, Any]:
    return {"group_id": subentry.subentry_id, **subentry.data}


def _entity_registry_get_id(
    hass: HomeAssistant, unique_id: str
) -> str | None:
    return er.async_get(hass).async_get_entity_id(
        "alarm_control_panel", MIDNIGHT_ALERTS_DOMAIN, unique_id
    )


# --- Sensor options -----------------------------------------------------------
# Mirrors midnight_alerts' own sensors.py helpers, which store per-sensor
# config as entity-registry options keyed by MIDNIGHT_ALERTS_DOMAIN - the
# same mechanism AlarmControlPanelEntity itself uses for `default_code`.
# Reimplemented locally (rather than imported) so this module has no direct
# Python dependency on midnight_alerts being installed - see module docstring.


def _sensor_options(hass: HomeAssistant, entity_id: str) -> dict[str, Any] | None:
    """Return this entity's Midnight Alerts sensor options, or None if unset."""
    entry = er.async_get(hass).async_get(entity_id)
    if entry is None:
        return None
    return entry.options.get(MIDNIGHT_ALERTS_DOMAIN)


def _set_sensor_options(hass: HomeAssistant, entity_id: str, **fields: Any) -> None:
    """Merge `fields` into this entity's Midnight Alerts sensor options."""
    registry = er.async_get(hass)
    entry = registry.async_get(entity_id)
    if entry is None:
        raise ValueError(f"{entity_id} is not a registered entity")
    options = dict(entry.options.get(MIDNIGHT_ALERTS_DOMAIN, {}))
    options.update(fields)
    registry.async_update_entity_options(entity_id, MIDNIGHT_ALERTS_DOMAIN, options)


def _clear_sensor_options(hass: HomeAssistant, entity_id: str) -> None:
    """Detach a sensor from Midnight Alerts entirely."""
    er.async_get(hass).async_update_entity_options(entity_id, MIDNIGHT_ALERTS_DOMAIN, None)


def _sensors_for_area(hass: HomeAssistant, area_subentry_id: str) -> list[str]:
    """Return entity_ids of every sensor configured for this area."""
    return [
        entry.entity_id
        for entry in er.async_get(hass).entities.values()
        if entry.options.get(MIDNIGHT_ALERTS_DOMAIN, {}).get(CONF_AREA_SUBENTRY_ID)
        == area_subentry_id
    ]


def _parse_sensor_state(state: str | None) -> str:
    """Normalize a binary_sensor state to open/closed/unavailable/unknown."""
    if state == "on":
        return "open"
    if state == "off":
        return "closed"
    if state in (None, "unavailable"):
        return "unavailable"
    return "unknown"


# --- Websocket commands ------------------------------------------------------


def _require_backend(func):
    """Resolve the backend entry, or send a websocket error and bail out."""

    async def wrapper(hass: HomeAssistant, connection: ActiveConnection, msg: dict) -> None:
        try:
            entry = _get_backend_entry(hass)
        except AdapterError as err:
            connection.send_error(msg["id"], err.code, err.message)
            return
        try:
            await func(hass, connection, msg, entry)
        except AdapterError as err:
            connection.send_error(msg["id"], err.code, err.message)

    return wrapper


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "midnight_911_frontend_plugin/areas"})
@websocket_api.async_response
@_require_backend
async def websocket_get_areas(hass, connection, msg, entry):
    """Return every configured area."""
    result = {
        s.subentry_id: _area_dict(s)
        for s in entry.subentries.values()
        if s.subentry_type == SUBENTRY_TYPE_AREA
    }
    connection.send_result(msg["id"], result)


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "midnight_911_frontend_plugin/users"})
@websocket_api.async_response
@_require_backend
async def websocket_get_users(hass, connection, msg, entry):
    """Return every configured user (PIN never included, hashed or not)."""
    result = {
        s.subentry_id: _user_dict(s)
        for s in entry.subentries.values()
        if s.subentry_type == SUBENTRY_TYPE_USER
    }
    connection.send_result(msg["id"], result)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "midnight_911_frontend_plugin/sensor_groups"}
)
@websocket_api.async_response
@_require_backend
async def websocket_get_sensor_groups(hass, connection, msg, entry):
    """Return every configured sensor group."""
    result = {
        s.subentry_id: _sensor_group_dict(s)
        for s in entry.subentries.values()
        if s.subentry_type == SUBENTRY_TYPE_SENSOR_GROUP
    }
    connection.send_result(msg["id"], result)


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "midnight_911_frontend_plugin/sensors"})
@websocket_api.async_response
@_require_backend
async def websocket_get_sensors(hass, connection, msg, entry):
    """Return every sensor attached to any area, with its live status."""
    result: dict[str, Any] = {}
    for subentry in entry.subentries.values():
        if subentry.subentry_type != SUBENTRY_TYPE_AREA:
            continue
        for entity_id in _sensors_for_area(hass, subentry.subentry_id):
            options = _sensor_options(hass, entity_id) or {}
            state = hass.states.get(entity_id)
            result[entity_id] = {
                "entity_id": entity_id,
                "area": subentry.subentry_id,
                "status": _parse_sensor_state(state.state if state else None),
                **options,
            }
    connection.send_result(msg["id"], result)


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "midnight_911_frontend_plugin/entities"})
@websocket_api.async_response
@_require_backend
async def websocket_get_entities(hass, connection, msg, entry):
    """Return {entity_id, area_id} for every area, plus the master (area_id: 0)."""
    result = []
    for subentry in entry.subentries.values():
        if subentry.subentry_type != SUBENTRY_TYPE_AREA:
            continue
        entity_id = _entity_registry_get_id(hass, subentry.subentry_id)
        if entity_id:
            result.append({"entity_id": entity_id, "area_id": subentry.subentry_id})

    master_entity_id = _entity_registry_get_id(hass, f"{entry.entry_id}_master")
    if master_entity_id:
        result.append({"entity_id": master_entity_id, "area_id": MASTER_ENTITY_AREA_ID})

    connection.send_result(msg["id"], result)


# -- writes: areas ------------------------------------------------------------


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/area/create",
        vol.Required(CONF_NAME): str,
        vol.Required("enabled_modes"): [str],
        vol.Optional("mode_timers"): dict,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_create_area(hass, connection, msg, entry):
    """Create an area. Each enabled mode gets its own exit/entry/trigger time.

    midnight_alerts' alarm_control_panel platform only creates one
    MidnightAlarmArea entity per subentry at setup time - unlike deletion
    (async_remove_subentry already tears entities down live), adding a new
    area subentry has no matching "spin up" path yet, so the entity would
    otherwise stay invisible until the next full HA restart. Reloading the
    entry here is the same fix midnight_alerts' own manage_sensors flow
    step already applies for the equivalent sensor-attach gap.
    """
    enabled_modes = msg["enabled_modes"]
    subentry = await _create_subentry(
        hass,
        entry,
        "area",
        [
            {CONF_NAME: msg[CONF_NAME], "enabled_modes": enabled_modes},
            _area_timers_step_input(enabled_modes, msg.get("mode_timers")),
        ],
    )
    await hass.config_entries.async_reload(entry.entry_id)
    connection.send_result(msg["id"], _area_dict(subentry))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/area/update",
        vol.Required("area_id"): str,
        vol.Required(CONF_NAME): str,
        vol.Required("enabled_modes"): [str],
        vol.Optional("mode_timers"): dict,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_update_area(hass, connection, msg, entry):
    """Edit an area's name, enabled modes, and per-mode timers.

    MidnightAlarmArea computes its `supported_features` bitmask once, from
    `enabled_modes`, at __init__ time - subentry.data itself updates live
    (HA mutates the same ConfigSubentry object in place), but that cached
    bitmask doesn't, so a newly-enabled mode would otherwise stay
    unavailable to services/voice until the next full HA restart. Reloading
    here forces the entity to be recreated with the current modes, the same
    workaround already applied in websocket_create_area for a related gap.
    """
    enabled_modes = msg["enabled_modes"]
    subentry = await _reconfigure_subentry(
        hass,
        entry,
        "area",
        msg["area_id"],
        [
            {"next_step_id": "edit_timers"},
            {CONF_NAME: msg[CONF_NAME], "enabled_modes": enabled_modes},
            _area_timers_step_input(enabled_modes, msg.get("mode_timers")),
        ],
    )
    await hass.config_entries.async_reload(entry.entry_id)
    connection.send_result(msg["id"], _area_dict(subentry))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/area/update_sensors",
        vol.Required("area_id"): str,
        vol.Required("sensors"): [str],
        vol.Optional("arm_on_close", default=False): bool,
        vol.Optional("delay_on", default=0): int,
        vol.Optional("always_on", default=False): bool,
        vol.Optional("entry_delay"): int,
        vol.Optional(CONF_MODES): [str],
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_update_area_sensors(hass, connection, msg, entry):
    """Set the sensors attached to an area.

    Extra flags apply only to newly-attached sensors in this same call,
    matching midnight_alerts's own `manage_sensors` flow step - already-
    attached sensors keep whatever they had. Use sensor/set_options to edit
    an already-attached sensor's own flags.
    """
    step_input: dict[str, Any] = {
        "sensors": msg["sensors"],
        "arm_on_close": msg["arm_on_close"],
        "delay_on": msg["delay_on"],
        "always_on": msg["always_on"],
    }
    if "entry_delay" in msg:
        step_input["entry_delay"] = msg["entry_delay"]
    if msg.get(CONF_MODES):
        step_input[CONF_MODES] = msg[CONF_MODES]

    subentry = await _reconfigure_subentry(
        hass,
        entry,
        "area",
        msg["area_id"],
        [{"next_step_id": "manage_sensors"}, step_input],
    )
    connection.send_result(msg["id"], _area_dict(subentry))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/area/delete",
        vol.Required("area_id"): str,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_delete_area(hass, connection, msg, entry):
    """Delete an area. No flow side effects to preserve, so this is direct."""
    hass.config_entries.async_remove_subentry(entry, msg["area_id"])
    connection.send_result(msg["id"])


# -- writes: users --------------------------------------------------------


def _user_step_input(msg: dict[str, Any]) -> dict[str, Any]:
    return {
        CONF_NAME: msg[CONF_NAME],
        CONF_CODE: msg.get(CONF_CODE, ""),
        CONF_CAN_ARM: msg.get(CONF_CAN_ARM, True),
        CONF_CAN_DISARM: msg.get(CONF_CAN_DISARM, True),
        CONF_IS_OVERRIDE_CODE: msg.get(CONF_IS_OVERRIDE_CODE, False),
        CONF_ENABLED: msg.get(CONF_ENABLED, True),
        CONF_AREA_LIMIT: msg.get(CONF_AREA_LIMIT) or [],
    }


_USER_FIELDS = {
    vol.Required(CONF_NAME): str,
    vol.Optional(CONF_CODE, default=""): str,
    vol.Optional(CONF_CAN_ARM, default=True): bool,
    vol.Optional(CONF_CAN_DISARM, default=True): bool,
    vol.Optional(CONF_IS_OVERRIDE_CODE, default=False): bool,
    vol.Optional(CONF_ENABLED, default=True): bool,
    vol.Optional(CONF_AREA_LIMIT): [str],
}


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "midnight_911_frontend_plugin/user/create", **_USER_FIELDS}
)
@websocket_api.async_response
@_require_backend
async def websocket_create_user(hass, connection, msg, entry):
    """Create a user. Leaving code blank means no PIN required for them."""
    subentry = await _create_subentry(
        hass, entry, "user", [_user_step_input(msg)]
    )
    connection.send_result(msg["id"], _user_dict(subentry))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/user/update",
        vol.Required("user_id"): str,
        **_USER_FIELDS,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_update_user(hass, connection, msg, entry):
    """Edit a user. Leave `code` blank to keep the existing PIN unchanged."""
    subentry = await _reconfigure_subentry(
        hass, entry, "user", msg["user_id"], [_user_step_input(msg)]
    )
    connection.send_result(msg["id"], _user_dict(subentry))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/user/delete",
        vol.Required("user_id"): str,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_delete_user(hass, connection, msg, entry):
    """Delete a user."""
    hass.config_entries.async_remove_subentry(entry, msg["user_id"])
    connection.send_result(msg["id"])


# -- writes: sensor groups --------------------------------------------------


_SENSOR_GROUP_FIELDS = {
    vol.Required(CONF_NAME): str,
    vol.Required(CONF_ENTITIES): [str],
    vol.Required(CONF_TIMEOUT): int,
    vol.Required(CONF_EVENT_COUNT): int,
    vol.Optional(CONF_GROUP_MODE, default="count_window"): str,
    vol.Optional(CONF_WEIGHTS): {str: vol.Coerce(float)},
    vol.Optional(CONF_DECAY_PER_MINUTE): vol.Coerce(float),
    vol.Optional(CONF_THRESHOLD): vol.Coerce(float),
}


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "midnight_911_frontend_plugin/sensor_group/create", **_SENSOR_GROUP_FIELDS}
)
@websocket_api.async_response
@_require_backend
async def websocket_create_sensor_group(hass, connection, msg, entry):
    """Create a sensor group (count_window or weighted_decay confirmation)."""
    subentry = await _create_subentry(
        hass, entry, "sensor_group", _sensor_group_steps(msg)
    )
    connection.send_result(msg["id"], _sensor_group_dict(subentry))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/sensor_group/update",
        vol.Required("group_id"): str,
        **_SENSOR_GROUP_FIELDS,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_update_sensor_group(hass, connection, msg, entry):
    """Edit a sensor group."""
    subentry = await _reconfigure_subentry(
        hass, entry, "sensor_group", msg["group_id"], _sensor_group_steps(msg)
    )
    connection.send_result(msg["id"], _sensor_group_dict(subentry))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/sensor_group/delete",
        vol.Required("group_id"): str,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_delete_sensor_group(hass, connection, msg, entry):
    """Delete a sensor group."""
    hass.config_entries.async_remove_subentry(entry, msg["group_id"])
    connection.send_result(msg["id"])


# -- writes: sensor options (entity-registry, not a subentry) ---------------


_SENSOR_OPTION_FIELDS = {
    vol.Optional("sensor_type"): str,
    vol.Optional("always_on"): bool,
    vol.Optional("allow_open"): bool,
    vol.Optional("use_exit_delay"): bool,
    vol.Optional("use_entry_delay"): bool,
    vol.Optional("entry_delay"): int,
    vol.Optional("arm_on_close"): bool,
    vol.Optional("delay_on"): int,
    vol.Optional(CONF_MODES): [str],
}


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/sensor/set_options",
        vol.Required("entity_id"): str,
        **_SENSOR_OPTION_FIELDS,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_set_sensor_options(hass, connection, msg, entry):
    """Edit an already-attached sensor's own flags directly."""
    fields = {
        k: v for k, v in msg.items() if k not in ("id", "type", "entity_id")
    }
    _set_sensor_options(hass, msg["entity_id"], **fields)
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/sensor/clear_options",
        vol.Required("entity_id"): str,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_clear_sensor_options(hass, connection, msg, entry):
    """Detach a sensor from Midnight Alarm entirely."""
    _clear_sensor_options(hass, msg["entity_id"])
    connection.send_result(msg["id"])


# -- import from alarmo -----------------------------------------------------


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "midnight_911_frontend_plugin/alarmo_import/preview"}
)
@websocket_api.async_response
@_require_backend
async def websocket_alarmo_import_preview(hass, connection, msg, entry):
    """Start the "Import from Alarmo" flow, return its preview counts."""
    result = await hass.config_entries.subentries.async_init(
        (entry.entry_id, SUBENTRY_TYPE_ALARMO_IMPORT), context={"source": "user"}
    )
    if result["type"] == FlowResultType.ABORT:
        connection.send_result(
            msg["id"], {"available": False, "reason": result.get("reason")}
        )
        return
    connection.send_result(
        msg["id"],
        {
            "available": True,
            "flow_id": result["flow_id"],
            # HA's flow result always has this key, but its value is None
            # rather than the key being absent when a step passes no
            # placeholders - `.get(key, {})` doesn't fall back for that.
            **(result.get("description_placeholders") or {}),
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "midnight_911_frontend_plugin/alarmo_import/apply",
        vol.Required("flow_id"): str,
    }
)
@websocket_api.async_response
@_require_backend
async def websocket_alarmo_import_apply(hass, connection, msg, entry):
    """Apply a previously-previewed import."""
    result = await hass.config_entries.subentries.async_configure(msg["flow_id"], {})
    if result["type"] != FlowResultType.ABORT:
        connection.send_error(
            msg["id"], "flow_did_not_complete", "Import flow did not finish"
        )
        return
    connection.send_result(
        msg["id"],
        {
            "reason": result.get("reason"),
            # See websocket_alarmo_import_preview - same None-vs-missing gotcha.
            **(result.get("description_placeholders") or {}),
        },
    )


async def async_register_websockets(hass: HomeAssistant) -> None:
    """Register websocket handlers."""
    websocket_api.async_register_command(hass, websocket_get_areas)
    websocket_api.async_register_command(hass, websocket_get_users)
    websocket_api.async_register_command(hass, websocket_get_sensor_groups)
    websocket_api.async_register_command(hass, websocket_get_sensors)
    websocket_api.async_register_command(hass, websocket_get_entities)
    websocket_api.async_register_command(hass, websocket_create_area)
    websocket_api.async_register_command(hass, websocket_update_area)
    websocket_api.async_register_command(hass, websocket_update_area_sensors)
    websocket_api.async_register_command(hass, websocket_delete_area)
    websocket_api.async_register_command(hass, websocket_create_user)
    websocket_api.async_register_command(hass, websocket_update_user)
    websocket_api.async_register_command(hass, websocket_delete_user)
    websocket_api.async_register_command(hass, websocket_create_sensor_group)
    websocket_api.async_register_command(hass, websocket_update_sensor_group)
    websocket_api.async_register_command(hass, websocket_delete_sensor_group)
    websocket_api.async_register_command(hass, websocket_set_sensor_options)
    websocket_api.async_register_command(hass, websocket_clear_sensor_options)
    websocket_api.async_register_command(hass, websocket_alarmo_import_preview)
    websocket_api.async_register_command(hass, websocket_alarmo_import_apply)
