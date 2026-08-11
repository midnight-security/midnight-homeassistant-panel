"""Config flow for Midnight 911 Frontend Plugin - nothing to configure, single instance."""

import secrets

from homeassistant import config_entries

from .const import DOMAIN, MIDNIGHT_ALERTS_DOMAIN, NAME


class MidnightAlarmUiConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for Midnight 911 Frontend Plugin."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle a flow initialized by the user."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if not self.hass.config_entries.async_entries(MIDNIGHT_ALERTS_DOMAIN):
            return self.async_abort(reason="midnight_alerts_not_installed")

        await self.async_set_unique_id(secrets.token_hex(6))
        self._abort_if_unique_id_configured()

        return self.async_create_entry(title=NAME, data={})
