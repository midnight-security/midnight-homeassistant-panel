<picture>
  <source media="(prefers-color-scheme: dark)" srcset="custom_components/midnight_911_frontend_plugin/brand/dark_logo.png">
  <img alt="Midnight" src="custom_components/midnight_911_frontend_plugin/brand/logo.png" height="64">
</picture>

# Midnight 911 Frontend Plugin

[![License][license-shield]](LICENSE)
[![Validate](https://github.com/midnight-security/alarmo/actions/workflows/validate.yaml/badge.svg)](https://github.com/midnight-security/alarmo/actions/workflows/validate.yaml)
[![Frontend Build Check](https://github.com/midnight-security/alarmo/actions/workflows/frontend-build.yaml/badge.svg)](https://github.com/midnight-security/alarmo/actions/workflows/frontend-build.yaml)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

Midnight 911 Frontend Plugin is the configuration panel for [Midnight 911](https://github.com/midnight-security/midnight-homeassistant-911). It has no alarm engine, storage, or dispatch logic of its own — it's a Home Assistant custom panel that renders and drives the `midnight_alerts` integration's entities and config subentries entirely from the browser, so you can set up areas, sensors, sensor groups, and users without touching YAML.

> **Requires Midnight 911.** Install and set up [`midnight_alerts`](https://github.com/midnight-security/midnight-homeassistant-911) first — this plugin checks for it on startup and will refuse to load without it. That repo covers how alarm state, arming, and 911 dispatch actually work, along with its own warnings and disclaimers.

---

## Origins

This project started as a fork of [Alarmo v1.10.18](https://github.com/nielsfaber/alarmo/releases/tag/v1.10.18) — the last upstream release before this rewrite branched off — by [@nielsfaber](https://github.com/nielsfaber) and its contributors. From there it's a from-scratch companion architecture, versioned independently going forward: this plugin is currently **v0.1.0**, driving [`midnight_alerts`](https://github.com/midnight-security/midnight-homeassistant-911) (currently **v0.4.0**) as its backend. We kept the parts that make Alarmo's panel pleasant to use, and rebuilt the rest around `midnight_alerts`:

- **Kept** — the panel shell, area/sensor/user editors, sensor groups, dialogs, and localization.
- **Removed** — the `alarm_control_panel` platform, MQTT bridge, built-in automations/actions engine, Alarmo-card, and local storage. State and configuration now live in `midnight_alerts`.
- **Added** — an "Import from Alarmo" flow (in the general settings) that previews and migrates areas, users, sensor groups, and sensors from an existing Alarmo installation. Automations are not carried over.

If you're coming from Alarmo: thank you, and credit to the original project — most of what you'll recognize in this panel is theirs.

---

## Installation

### HACS (Recommended)

1. In HACS, go to **Integrations** → the **⋮** menu → **Custom repositories**.
2. Add `https://github.com/midnight-security/alarmo` as an **Integration**.
3. Search for "Midnight 911 Frontend Plugin" and download it.
4. Restart Home Assistant.
5. Go to **Settings → Devices & Services → + Add Integration**, and search for "Midnight 911 Frontend Plugin".

### Manual

1. Copy the `custom_components/midnight_911_frontend_plugin` folder into your Home Assistant `custom_components` directory.
2. Restart Home Assistant.
3. Add the integration via **Settings → Devices & Services → + Add Integration**.

Only one instance of this panel can be added per Home Assistant installation.

---

## Usage

Once both integrations are installed, the panel appears in the sidebar as **Midnight 911**.
It has three tabs: **General**, **Sensors**, and **Codes**.

### Add an area

Areas are the alarm's partitions (e.g. "Downstairs", "Garage") - each one arms,
disarms, and triggers independently, and gets its own `alarm_control_panel` entity.

1. **General** tab → **Areas** card → **Add**.
2. Give it a name and pick which arm modes it supports (Away, Home, Night, Vacation,
   Custom bypass).
3. Set the exit delay, entry delay, and trigger time for each mode you enabled - these
   are independent per mode, so e.g. Home can have a 0-second exit delay while Away
   uses 30 seconds.

If you have more than one area, a picker at the top of the **General** tab's Modes
card switches which area you're editing.

### Attach sensors

1. **Sensors** tab → **Add Sensors** card.
2. Pick the target area (if you have more than one), select one or more
   `binary_sensor` entities from the list, and click **Add to alarm**.
3. Click a sensor in the **Sensors** table above to configure its device type
   (door/window/motion/tamper/environmental), which arm modes it's active in, and
   advanced flags (always-on, entry/exit delay overrides, arm-on-close).

A sensor can only belong to one area. Removing it from the alarm (via **Remove** in
the sensor editor) doesn't affect the underlying HA entity - it just stops being
alarm-aware.

### Group sensors together

For cases where a single sensor shouldn't trigger the alarm by itself (e.g. several
motion sensors that only mean something in combination), open a sensor's editor and
click **Setup groups** to create a sensor group. Two trigger modes are available:

- **Count within time window** - the alarm triggers once N of the group's sensors
  have activated within a timeout window.
- **Weighted decay** - each sensor contributes its own weight to an accumulating
  score (which decays over time); the alarm triggers once the score crosses a
  threshold.

### Manage users and codes

**Codes** tab → **New user**. Each user gets their own PIN and can be restricted to
specific areas, permitted to arm and/or disarm, and optionally marked as an override
code (bypasses open-sensor checks when arming). Leave the code field blank when
editing an existing user to keep their current PIN unchanged.

### Import from Alarmo

If you're migrating from the original Alarmo integration, **General** tab → **Areas**
card → **Import from Alarmo**. This reads Alarmo's own storage file directly and
previews what would be imported (areas, users, sensor groups, sensors) before you
confirm - automations are not carried over, since `midnight_alerts` has no automation
engine of its own; recreate anything you still need as a regular HA automation.

### Arming and disarming

This panel is for *configuration* only - day-to-day arming and disarming happens
through each area's (or the master's) standard `alarm_control_panel` entity, using
Home Assistant's own built-in alarm card, voice assistants, or automations. No custom
dashboard card is needed or provided.

---

## Development

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setting up a local environment with `uv`, running the test suite (which runs against a checked-out copy of `midnight_alerts`), and pre-commit hooks.

See [`CHANGELOG.md`](./CHANGELOG.md) for notable changes between releases.

---

## License

Copyright 2026 Midnight Security, Inc.

Licensed under the [Apache License, Version 2.0](LICENSE).

[license-shield]: https://img.shields.io/github/license/midnight-security/alarmo.svg
