"""Constants for the Midnight 911 Frontend Plugin companion panel."""

import datetime

from homeassistant.components.alarm_control_panel import AlarmControlPanelState

VERSION = "0.1.0"
NAME = "Midnight 911 Frontend Plugin"
MANUFACTURER = "Midnight Security"

DOMAIN = "midnight_911_frontend_plugin"

# The backend integration this panel is a companion to. Deliberately *not*
# declared in manifest.json's "dependencies" - that would hard-fail our own
# setup with an opaque "could not setup dependencies" error. Instead we
# resolve it ourselves via hass.config_entries.async_entries(...) and surface
# its absence as an explicit config_flow abort / repair issue (see
# __init__.py and config_flow.py) so the user gets an actual explanation.
MIDNIGHT_ALERTS_DOMAIN = "midnight_alerts"

MIDNIGHT_ALERTS_NOT_INSTALLED_ISSUE_ID = "midnight_alerts_not_installed"

CUSTOM_COMPONENTS = "custom_components"
INTEGRATION_FOLDER = DOMAIN
PANEL_FOLDER = "frontend"
PANEL_FILENAME = "dist/alarm-panel.js"

PANEL_URL = f"/api/panel_custom/{DOMAIN}"
PANEL_TITLE = "Midnight 911"
PANEL_ICON = "mdi:moon-waning-crescent"
PANEL_NAME = "alarm-panel"

INITIALIZATION_TIME = datetime.timedelta(seconds=60)

STATES = [
    AlarmControlPanelState.ARMED_AWAY,
    AlarmControlPanelState.ARMED_HOME,
    AlarmControlPanelState.ARMED_NIGHT,
    AlarmControlPanelState.ARMED_CUSTOM_BYPASS,
    AlarmControlPanelState.ARMED_VACATION,
    AlarmControlPanelState.DISARMED,
    AlarmControlPanelState.TRIGGERED,
    AlarmControlPanelState.PENDING,
    AlarmControlPanelState.ARMING,
]

ARM_MODES = [
    AlarmControlPanelState.ARMED_AWAY,
    AlarmControlPanelState.ARMED_HOME,
    AlarmControlPanelState.ARMED_NIGHT,
    AlarmControlPanelState.ARMED_CUSTOM_BYPASS,
    AlarmControlPanelState.ARMED_VACATION,
]
