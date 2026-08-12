"""Tests for Midnight 911 Frontend Plugin's own setup/config flow guards.

Covers the "midnight_alerts might not be installed" cases addressed by
config_flow.py (blocks adding the integration fresh) and __init__.py (repair
issue + ConfigEntryNotReady if it's removed after the fact) - added when
midnight_alerts was dropped from manifest.json's "dependencies" in favor of
explicit, user-facing error handling.
"""
from unittest.mock import AsyncMock, patch

from homeassistant import config_entries
from homeassistant.helpers import issue_registry as ir
from homeassistant.config_entries import ConfigEntryState
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.midnight_911_frontend_plugin.const import (
    DOMAIN,
    MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID,
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


async def test_config_flow_aborts_when_midnight_alerts_not_installed(hass):
    """Adding the panel fresh is refused if midnight_alerts isn't set up."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == "abort"
    assert result["reason"] == "midnight_alerts_not_installed"


async def test_config_flow_succeeds_when_midnight_alerts_installed(hass):
    """Adding the panel succeeds once midnight_alerts is set up."""
    await _setup_backend(hass)

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == "create_entry"


async def test_setup_entry_raises_repair_issue_when_backend_missing(hass):
    """A repair issue appears if midnight_alerts vanishes after configuring."""
    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)

    assert not await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert entry.state is ConfigEntryState.SETUP_RETRY

    issue = ir.async_get(hass).async_get_issue(
        DOMAIN, MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID
    )
    assert issue is not None
    assert issue.severity == ir.IssueSeverity.ERROR
    assert issue.is_fixable is False
    assert issue.translation_key == MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID


async def test_setup_entry_succeeds_and_clears_issue_when_backend_present(hass):
    """Setup succeeds and clears any stale repair issue once the backend returns."""
    await _setup_backend(hass)

    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert entry.state is ConfigEntryState.LOADED
    assert (
        ir.async_get(hass).async_get_issue(
            DOMAIN, MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID
        )
        is None
    )


async def test_unload_entry_clears_issue(hass):
    """Unloading the entry clears any repair issue on its own."""
    await _setup_backend(hass)

    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    # Recreate the issue by hand to prove unload clears it on its own,
    # independent of whatever state setup already left it in.
    ir.async_create_issue(
        hass,
        DOMAIN,
        MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID,
        is_fixable=False,
        severity=ir.IssueSeverity.ERROR,
        translation_key=MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID,
    )

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    assert (
        ir.async_get(hass).async_get_issue(
            DOMAIN, MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID
        )
        is None
    )
