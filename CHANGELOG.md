# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

This is a ground-up rework of this repository: what was a standalone alarm
integration - a fork of [Alarmo v1.10.18](https://github.com/nielsfaber/alarmo/releases/tag/v1.10.18),
the last upstream release before this rewrite branched off - is now a pure
configuration panel for
[`midnight_alerts`](https://github.com/midnight-security/midnight-homeassistant-911).
Versioning restarts from scratch under this architecture (this plugin is v0.1.0);
nothing has been released yet, so the entries below describe the initial feature
set, not changes relative to a prior release.

### Added

- Companion panel (`midnight_911_frontend_plugin`) that reads and writes
  `midnight_alerts`'s config subentries and entity-registry sensor options
  directly - areas, users, sensor groups, and sensors, all editable from the
  browser with no YAML.
- Independent per-mode arm timers (exit/entry/trigger delay configurable
  separately for Away, Home, Night, Vacation, and Custom bypass on each area).
- Weighted-decay sensor groups, alongside the original count-within-time-window
  mode - per-sensor weights accumulate toward a threshold that decays over time,
  for cases where no single sensor should trigger the alarm alone.
- "Import from Alarmo" migration flow: previews and imports areas, users, sensor
  groups, and sensors from an existing Alarmo installation's storage file.
  Automations are intentionally not carried over.
- Explicit, user-facing handling for a missing `midnight_alerts` backend: the
  config flow refuses to add this panel without it installed, and a persistent
  Repairs issue is raised if it's removed afterward - rather than a hard manifest
  dependency or a silent failure.
- Vitest unit tests for the frontend's websocket payload-shaping logic
  (`frontend/src/data/websockets.ts`), and pytest coverage for the Python
  adapter running against a real `midnight_alerts` checkout.
- Midnight brand assets (`custom_components/midnight_911_frontend_plugin/brand/`),
  matching the same `brand/` folder `midnight_alerts` already ships. Home
  Assistant Core 2026.3.0+ reads this automatically (no manifest key
  needed) to show the Midnight crescent-moon mark on the integrations page
  and config flow instead of a generic icon. The panel's own header now
  shows the same mark, fetched from HA's `/api/brands/integration/...`
  endpoint, and the README's title image swaps between the light/dark
  wordmark based on the viewer's OS theme.

### Removed

- Alarmo's own alarm engine, local storage, MQTT bridge, automations/actions
  engine, and bundled Lovelace card - state and configuration now live entirely
  in `midnight_alerts`. Day-to-day arming/disarming uses Home Assistant's native
  `alarm_control_panel` entities and built-in alarm card; no custom dashboard
  card is provided.
- Non-English translations (20 languages) inherited from Alarmo - they were
  stale relative to this panel's trimmed/rebuilt key structure. English only for
  now; re-translation is tracked as follow-up work.

[Unreleased]: https://github.com/midnight-security/alarmo/commits/main
