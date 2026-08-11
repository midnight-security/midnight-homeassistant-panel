"""Midnight 911 Frontend Plugin - a companion frontend panel for Midnight Alerts."""

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers import issue_registry as ir

from . import const
from .panel import async_register_panel, async_unregister_panel
from .websockets import async_register_websockets

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the Midnight 911 Frontend Plugin companion panel.

    This integration has no alarm engine of its own - it only renders and
    drives Midnight Alerts' existing config subentries and entities.
    config_flow.py already refuses to let this get added without Midnight
    Alerts present, so reaching this missing branch means it was removed or
    disabled *after* this integration was configured. A repair issue makes
    that explicit and persistent in Settings > Repairs, rather than leaving
    the user staring at a silent "retrying setup" state with no explanation.
    """
    if not hass.config_entries.async_entries(const.MIDNIGHT_ALERTS_DOMAIN):
        ir.async_create_issue(
            hass,
            const.DOMAIN,
            const.MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID,
            is_fixable=False,
            severity=ir.IssueSeverity.ERROR,
            translation_key=const.MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID,
        )
        raise ConfigEntryNotReady(
            f"{const.MIDNIGHT_ALERTS_DOMAIN} is not set up - install and "
            "configure it before this panel has anything to show"
        )

    ir.async_delete_issue(hass, const.DOMAIN, const.MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID)
    await async_register_panel(hass)
    await async_register_websockets(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload the companion panel."""
    ir.async_delete_issue(hass, const.DOMAIN, const.MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID)
    async_unregister_panel(hass)
    return True
