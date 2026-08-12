"""Tests for the Midnight 911 Frontend Plugin websocket adapter.

Runs against the real midnight_alerts package (see .github/workflows/
validate.yaml, which checks it out alongside this repo before running
tests) - this integration has no config model of its own, so there's
nothing meaningful to test against a fake.
"""
import json
from unittest.mock import AsyncMock, patch

from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockUser, MockConfigEntry

from custom_components.midnight_911_frontend_plugin.websockets import (
    async_register_websockets,
)

VALIDATE = (
    "custom_components.midnight_alerts.api.MidnightAlertsApiClient.async_validate"
)


async def _setup_backend(hass) -> MockConfigEntry:
    entry = MockConfigEntry(domain="midnight_alerts", data={"api_key": ""})
    entry.add_to_hass(hass)
    with patch(VALIDATE, new=AsyncMock(return_value={})):
        assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def _register(hass) -> None:
    await async_register_websockets(hass)


async def test_areas_error_when_backend_not_configured(hass, hass_ws_client):
    """`areas` errors cleanly if midnight_alerts isn't set up yet."""
    await _register(hass)
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "midnight_911_frontend_plugin/areas"})
    resp = await client.receive_json()
    assert resp["success"] is False
    assert resp["error"]["code"] == "not_configured"


async def test_area_create_with_independent_per_mode_timers(hass, hass_ws_client):
    """Each arm mode keeps its own exit/entry/trigger timers, independently."""
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/area/create",
            "name": "Home",
            "enabled_modes": ["armed_away", "armed_night"],
            "mode_timers": {
                "armed_away": {"exit_time": 60, "entry_time": 30, "trigger_time": 120},
                "armed_night": {"exit_time": 0, "entry_time": 10, "trigger_time": 60},
            },
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    area = resp["result"]
    assert area["name"] == "Home"
    assert area["modes"]["armed_away"]["exit_time"] == 60
    assert area["modes"]["armed_night"]["exit_time"] == 0
    assert area["modes"]["armed_home"]["enabled"] is False

    await client.send_json({"id": 2, "type": "midnight_911_frontend_plugin/areas"})
    resp = await client.receive_json()
    assert area["area_id"] in resp["result"]


async def test_area_create_missing_mode_timers_falls_back_to_defaults(
    hass, hass_ws_client
):
    """Omitting mode_timers on create falls back to the standard defaults."""
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/area/create",
            "name": "Home",
            "enabled_modes": ["armed_away"],
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    assert resp["result"]["modes"]["armed_away"]["exit_time"] == 60
    assert resp["result"]["modes"]["armed_away"]["trigger_time"] == 1800


async def test_area_update_and_delete(hass, hass_ws_client):
    """An area can be renamed/retimed, then deleted."""
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/area/create",
            "name": "Home",
            "enabled_modes": ["armed_away"],
        }
    )
    area_id = (await client.receive_json())["result"]["area_id"]

    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/area/update",
            "area_id": area_id,
            "name": "Renamed",
            "enabled_modes": ["armed_away", "armed_home"],
            "mode_timers": {
                "armed_away": {"exit_time": 45, "entry_time": 15, "trigger_time": 90},
            },
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    assert resp["result"]["name"] == "Renamed"
    assert resp["result"]["modes"]["armed_away"]["exit_time"] == 45
    assert resp["result"]["modes"]["armed_home"]["enabled"] is True

    await client.send_json(
        {
            "id": 3,
            "type": "midnight_911_frontend_plugin/area/delete",
            "area_id": area_id,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp

    await client.send_json({"id": 4, "type": "midnight_911_frontend_plugin/areas"})
    resp = await client.receive_json()
    assert resp["result"] == {}


async def test_area_update_omitting_modes_resets_to_defaults(hass, hass_ws_client):
    """Pins a real contract gotcha, not new backend behavior.

    area/update has no partial-update concept - omitting
    enabled_modes/mode_timers doesn't mean "leave them alone", it means
    "reset to armed_away/armed_home with
    every timer back to 60/60/1800". A frontend caller that only means to
    change the area's name (create-area-dialog.ts's rename path) MUST also
    resend the area's current modes, or a plain rename silently destroys
    every other mode's configuration - a real bug found and fixed there.
    """
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/area/create",
            "name": "Front Door",
            "enabled_modes": ["armed_away", "armed_home", "armed_night"],
            "mode_timers": {
                "armed_away": {"exit_time": 45, "entry_time": 60, "trigger_time": 1800},
                "armed_night": {"exit_time": 10, "entry_time": 20, "trigger_time": 300},
            },
        }
    )
    area_id = (await client.receive_json())["result"]["area_id"]

    # The buggy shape: rename only, nothing else carried through - matches
    # saveArea()'s own fallback when `modes` is omitted (see websockets.ts).
    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/area/update",
            "area_id": area_id,
            "name": "Front Door Renamed",
            "enabled_modes": ["armed_away", "armed_home"],
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    # silently dropped
    assert resp["result"]["modes"]["armed_night"]["enabled"] is False
    assert resp["result"]["modes"]["armed_away"]["exit_time"] == 60  # silently reset


async def test_area_update_sensors_attach_and_detach(hass, hass_ws_client):
    """Sensors can be attached to an area, then fully detached."""
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/area/create",
            "name": "Home",
            "enabled_modes": ["armed_away"],
        }
    )
    area_id = (await client.receive_json())["result"]["area_id"]

    sensor_entity_id = er.async_get(hass).async_get_or_create(
        "binary_sensor", "test", "front_door"
    ).entity_id

    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/area/update_sensors",
            "area_id": area_id,
            "sensors": [sensor_entity_id],
            "arm_on_close": True,
            "delay_on": 5,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp

    await client.send_json({"id": 3, "type": "midnight_911_frontend_plugin/sensors"})
    resp = await client.receive_json()
    assert resp["result"][sensor_entity_id]["arm_on_close"] is True
    assert resp["result"][sensor_entity_id]["delay_on"] == 5
    assert resp["result"][sensor_entity_id]["area"] == area_id

    # detach
    await client.send_json(
        {
            "id": 4,
            "type": "midnight_911_frontend_plugin/area/update_sensors",
            "area_id": area_id,
            "sensors": [],
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp

    await client.send_json({"id": 5, "type": "midnight_911_frontend_plugin/sensors"})
    resp = await client.receive_json()
    assert resp["result"] == {}


async def test_sensor_set_and_clear_options_directly(hass, hass_ws_client):
    """A sensor's options can be set directly, then cleared back to none."""
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/area/create",
            "name": "Home",
            "enabled_modes": ["armed_away"],
        }
    )
    area_id = (await client.receive_json())["result"]["area_id"]
    sensor_entity_id = er.async_get(hass).async_get_or_create(
        "binary_sensor", "test", "front_door"
    ).entity_id

    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/area/update_sensors",
            "area_id": area_id,
            "sensors": [sensor_entity_id],
        }
    )
    await client.receive_json()

    await client.send_json(
        {
            "id": 3,
            "type": "midnight_911_frontend_plugin/sensor/set_options",
            "entity_id": sensor_entity_id,
            "always_on": True,
            "sensor_type": "motion",
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp

    await client.send_json({"id": 4, "type": "midnight_911_frontend_plugin/sensors"})
    resp = await client.receive_json()
    assert resp["result"][sensor_entity_id]["always_on"] is True
    assert resp["result"][sensor_entity_id]["sensor_type"] == "motion"

    await client.send_json(
        {
            "id": 5,
            "type": "midnight_911_frontend_plugin/sensor/clear_options",
            "entity_id": sensor_entity_id,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp

    await client.send_json({"id": 6, "type": "midnight_911_frontend_plugin/sensors"})
    resp = await client.receive_json()
    assert resp["result"] == {}


async def test_sensor_set_options_rejects_area_field(hass, hass_ws_client):
    """`area` isn't a settable field on set_options.

    It comes back from `sensors` (that's how the frontend knows which
    area a sensor belongs to) but isn't settable here - assignment only
    happens through area/update_sensors. Regression test for
    a real bug: the frontend's saveSensor() naively spread a fetched sensor's
    full dict (including `area`) back into this command, which voluptuous's
    extra-keys check rejects outright - every edit of an already-attached
    sensor failed. Fixed by having saveSensor() drop `area` before sending.
    """
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)
    sensor_entity_id = er.async_get(hass).async_get_or_create(
        "binary_sensor", "test", "front_door"
    ).entity_id

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/sensor/set_options",
            "entity_id": sensor_entity_id,
            "always_on": True,
            "area": "some_area_id",
        }
    )
    resp = await client.receive_json()
    assert resp["success"] is False
    assert resp["error"]["code"] == "invalid_format"

    # The fixed shape (no `area`) must succeed.
    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/sensor/set_options",
            "entity_id": sensor_entity_id,
            "always_on": True,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp


async def test_user_code_never_returned_and_blank_code_keeps_existing(
    hass, hass_ws_client
):
    """A user's code never comes back, and blanking it on update keeps it.

    Blanking the code field on update leaves the existing code unchanged
    rather than clearing it.
    """
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/user/create",
            "name": "Alice",
            "code": "4242",
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    assert "code" not in resp["result"]
    assert resp["result"]["has_code"] is True
    user_id = resp["result"]["user_id"]

    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/user/update",
            "user_id": user_id,
            "name": "Alice",
            "code": "",
            "can_arm": False,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    assert resp["result"]["has_code"] is True  # unchanged, not cleared
    assert resp["result"]["can_arm"] is False

    await client.send_json(
        {
            "id": 3,
            "type": "midnight_911_frontend_plugin/user/delete",
            "user_id": user_id,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp

    await client.send_json({"id": 4, "type": "midnight_911_frontend_plugin/users"})
    resp = await client.receive_json()
    assert resp["result"] == {}


async def test_user_update_rejects_has_code_field(hass, hass_ws_client):
    """`has_code` isn't a settable field on user/update.

    It's derived (computed by `users` from whether a code is set).
    Regression test for a real bug: user-editor-card.ts only omits `code`
    when loading an existing user for editing, so `has_code` survived into
    saveUser()'s payload on every edit of an already-coded user -
    voluptuous's extra-keys check rejected it outright. Fixed by having
    saveUser() drop `has_code` before sending.
    """
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/user/create",
            "name": "Alice",
            "code": "1234",
        }
    )
    resp = await client.receive_json()
    user_id = resp["result"]["user_id"]
    assert resp["result"]["has_code"] is True

    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/user/update",
            "user_id": user_id,
            "name": "Alice",
            "has_code": True,
        }
    )
    resp = await client.receive_json()
    assert resp["success"] is False
    assert resp["error"]["code"] == "invalid_format"

    # The fixed shape (no `has_code`) must succeed.
    await client.send_json(
        {
            "id": 3,
            "type": "midnight_911_frontend_plugin/user/update",
            "user_id": user_id,
            "name": "Alice",
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp


async def test_sensor_group_count_window_and_weighted_decay(hass, hass_ws_client):
    """A group can move from count-window mode to weighted-decay, then be deleted."""
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    motion1 = er.async_get(hass).async_get_or_create(
        "binary_sensor", "test", "motion1"
    ).entity_id
    motion2 = er.async_get(hass).async_get_or_create(
        "binary_sensor", "test", "motion2"
    ).entity_id

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/sensor_group/create",
            "name": "Motion confirm",
            "entities": [motion1, motion2],
            "timeout": 15,
            "event_count": 2,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    group_id = resp["result"]["group_id"]

    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/sensor_group/update",
            "group_id": group_id,
            "name": "Motion confirm",
            "entities": [motion1, motion2],
            "timeout": 20,
            "event_count": 3,
            "mode": "weighted_decay",
            "decay_per_minute": 2,
            "threshold": 12,
            "weights": {motion1: 15, motion2: 5},
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    assert resp["result"]["weights"] == {motion1: 15.0, motion2: 5.0}
    assert resp["result"]["threshold"] == 12.0

    await client.send_json(
        {
            "id": 3,
            "type": "midnight_911_frontend_plugin/sensor_group/delete",
            "group_id": group_id,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp

    await client.send_json(
        {"id": 4, "type": "midnight_911_frontend_plugin/sensor_groups"}
    )
    resp = await client.receive_json()
    assert resp["result"] == {}


async def test_entities_lists_areas_and_master(hass, hass_ws_client):
    """`entities` lists every area plus the master, sentinel-keyed as 0."""
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "midnight_911_frontend_plugin/area/create",
            "name": "Home",
            "enabled_modes": ["armed_away"],
        }
    )
    area_id = (await client.receive_json())["result"]["area_id"]
    await hass.async_block_till_done()

    await client.send_json({"id": 2, "type": "midnight_911_frontend_plugin/entities"})
    resp = await client.receive_json()
    assert resp["success"], resp
    by_area = {e["area_id"]: e["entity_id"] for e in resp["result"]}
    assert area_id in by_area
    assert 0 in by_area  # master, per Alarmo's own sentinel convention


async def test_non_admin_user_is_refused(hass, hass_ws_client):
    """Every command here is @require_admin - confirm it's actually enforced.

    Not just declared. A non-admin, non-owner user should be refused before
    the handler ever runs.
    """
    await _setup_backend(hass)
    await _register(hass)

    non_admin = MockUser(is_owner=False).add_to_hass(hass)
    assert non_admin.is_admin is False
    refresh_token = await hass.auth.async_create_refresh_token(non_admin, "test-client")
    access_token = hass.auth.async_create_access_token(refresh_token)

    client = await hass_ws_client(hass, access_token)
    await client.send_json({"id": 1, "type": "midnight_911_frontend_plugin/areas"})
    resp = await client.receive_json()
    assert resp["success"] is False
    assert resp["error"]["code"] == "unauthorized"


async def test_alarmo_import_preview_no_file(
    hass, hass_ws_client, tmp_path, monkeypatch
):
    """Previewing an import with no Alarmo storage file reports it as unavailable."""
    monkeypatch.setattr(hass.config, "config_dir", str(tmp_path))
    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {"id": 1, "type": "midnight_911_frontend_plugin/alarmo_import/preview"}
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    assert resp["result"] == {"available": False, "reason": "alarmo_not_found"}


async def test_alarmo_import_preview_and_apply_against_real_storage_shape(  # noqa: PLR0915
    hass, hass_ws_client, tmp_path, monkeypatch
):
    """End-to-end against a fixture matching Alarmo's actual storage schema.

    See midnight_alerts/alarmo_import.py's parse_import for the exact
    fields read - the flow-shape-only coverage above never actually reads
    a real file, so this is the one test that would catch drift between
    this fixture's assumptions and Alarmo's real format. Deliberately one
    long scenario test walking the full preview -> apply -> re-verify ->
    re-import round trip, rather than split into disconnected pieces that
    would each need to redo the same setup.
    """
    monkeypatch.setattr(hass.config, "config_dir", str(tmp_path))
    storage_dir = tmp_path / ".storage"
    storage_dir.mkdir()

    sensor_entity_id = er.async_get(hass).async_get_or_create(
        "binary_sensor", "test", "front_door"
    ).entity_id

    alarmo_storage = {
        "version": 6,
        "key": "alarmo.storage",
        "data": {
            "areas": [
                {
                    "area_id": "area1",
                    "name": "Downstairs",
                    "modes": {
                        "armed_away": {
                            "enabled": True,
                            "exit_time": 30,
                            "entry_time": 45,
                            "trigger_time": 600,
                        },
                        "armed_home": {
                            "enabled": True,
                            "exit_time": 0,
                            "entry_time": 0,
                            "trigger_time": 600,
                        },
                    },
                }
            ],
            "users": [
                {
                    "user_id": "user1",
                    "name": "Alice",
                    "code": "fakehash",
                    "can_arm": True,
                    "can_disarm": True,
                    "is_override_code": False,
                    "enabled": True,
                    "area_limit": ["area1"],
                }
            ],
            "sensor_groups": [
                {
                    "group_id": "group1",
                    "name": "Motion group",
                    "entities": [sensor_entity_id],
                    "timeout": 20,
                    "event_count": 2,
                }
            ],
            "sensors": [
                {
                    "entity_id": sensor_entity_id,
                    "area": "area1",
                    "type": "door",
                    "enabled": True,
                    "always_on": False,
                    "allow_open": False,
                    "use_exit_delay": True,
                    "use_entry_delay": True,
                    "arm_on_close": False,
                }
            ],
            "automations": [{"id": "auto1"}, {"id": "auto2"}],
        },
    }
    (storage_dir / "alarmo.storage").write_text(json.dumps(alarmo_storage))

    await _setup_backend(hass)
    await _register(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {"id": 1, "type": "midnight_911_frontend_plugin/alarmo_import/preview"}
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    result = resp["result"]
    assert result["available"] is True
    assert result["areas"] == "1"
    assert result["users"] == "1"
    assert result["sensor_groups"] == "1"
    assert result["sensors"] == "1"
    assert result["automations_skipped"] == "2"
    flow_id = result["flow_id"]

    await client.send_json(
        {
            "id": 2,
            "type": "midnight_911_frontend_plugin/alarmo_import/apply",
            "flow_id": flow_id,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    result = resp["result"]
    assert result["reason"] == "import_complete"
    assert result["areas"] == "1"
    assert result["users"] == "1"
    assert result["sensor_groups"] == "1"
    assert result["sensors"] == "1"
    assert result["sensors_skipped"] == "0"
    assert result["automations_skipped"] == "2"

    await client.send_json({"id": 3, "type": "midnight_911_frontend_plugin/areas"})
    resp = await client.receive_json()
    assert resp["success"], resp
    assert len(resp["result"]) == 1
    imported_area = next(iter(resp["result"].values()))
    assert imported_area["name"] == "Downstairs"
    assert imported_area["modes"]["armed_away"]["exit_time"] == 30
    assert imported_area["modes"]["armed_away"]["enabled"] is True

    await client.send_json({"id": 4, "type": "midnight_911_frontend_plugin/users"})
    resp = await client.receive_json()
    assert resp["success"], resp
    imported_user = next(iter(resp["result"].values()))
    assert imported_user["name"] == "Alice"
    assert imported_user["has_code"] is True

    await client.send_json(
        {"id": 5, "type": "midnight_911_frontend_plugin/sensor_groups"}
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    imported_group = next(iter(resp["result"].values()))
    assert imported_group["name"] == "Motion group"
    assert imported_group["entities"] == [sensor_entity_id]

    # Re-running the preview against the same file must recognize the
    # already-imported unique_ids, not offer to duplicate everything.
    await client.send_json(
        {"id": 6, "type": "midnight_911_frontend_plugin/alarmo_import/preview"}
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    flow_id_2 = resp["result"]["flow_id"]
    await client.send_json(
        {
            "id": 7,
            "type": "midnight_911_frontend_plugin/alarmo_import/apply",
            "flow_id": flow_id_2,
        }
    )
    resp = await client.receive_json()
    assert resp["success"], resp
    assert resp["result"]["reason"] == "already_imported"
