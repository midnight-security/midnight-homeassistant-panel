import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import {
  AlarmoModeConfig,
  AlarmoSensor,
  Dictionary,
  AlarmoUser,
  EArmModes,
  AlarmoArea,
  SensorGroup,
  AlarmEntityRef,
  HomeAssistant,
} from '../types';

const WS_PREFIX = 'midnight_911_frontend_plugin';

// --- live updates -----------------------------------------------------------
//
// midnight_alerts has no custom "config changed" event of its own - this uses
// HA core's fully generic config_entries/subscribe command instead, which
// fires on any config entry (including subentry) add/update/remove. Not
// filtered by domain (the command has no such filter beyond integration
// type), so this may fire on unrelated integrations changing too; harmless,
// just an extra refetch.
export const subscribeConfigUpdates = (hass: HomeAssistant, callback: () => void): Promise<UnsubscribeFunc> =>
  hass.connection.subscribeMessage(() => callback(), { type: 'config_entries/subscribe' });

// --- areas --------------------------------------------------------------

export const fetchAreas = (hass: HomeAssistant): Promise<Dictionary<AlarmoArea>> =>
  hass.callWS({ type: `${WS_PREFIX}/areas` });

type SaveAreaInput = Partial<AlarmoArea> & { area_id?: string };

const modesToEnabledAndTimers = (modes?: Record<EArmModes, AlarmoModeConfig>) => {
  const enabled_modes: string[] = [];
  const mode_timers: Dictionary<{ exit_time: number; entry_time: number; trigger_time: number }> = {};
  if (modes) {
    Object.entries(modes).forEach(([mode, cfg]) => {
      if (cfg?.enabled) enabled_modes.push(mode);
      mode_timers[mode] = {
        exit_time: cfg?.exit_time ?? 60,
        entry_time: cfg?.entry_time ?? 60,
        trigger_time: cfg?.trigger_time ?? 1800,
      };
    });
  }
  return { enabled_modes, mode_timers };
};

export const saveArea = (hass: HomeAssistant, config: SaveAreaInput): Promise<AlarmoArea> => {
  const { enabled_modes, mode_timers } = modesToEnabledAndTimers(config.modes);
  const payload = {
    name: config.name,
    enabled_modes: enabled_modes.length ? enabled_modes : ['armed_away', 'armed_home'],
    mode_timers,
  };
  return config.area_id
    ? hass.callWS({ type: `${WS_PREFIX}/area/update`, area_id: config.area_id, ...payload })
    : hass.callWS({ type: `${WS_PREFIX}/area/create`, ...payload });
};

export const deleteArea = (hass: HomeAssistant, area_id: string): Promise<void> =>
  hass.callWS({ type: `${WS_PREFIX}/area/delete`, area_id });

export const saveAreaSensors = (
  hass: HomeAssistant,
  area_id: string,
  sensors: string[],
  options?: { arm_on_close?: boolean; delay_on?: number; always_on?: boolean; entry_delay?: number; modes?: string[] }
): Promise<AlarmoArea> =>
  hass.callWS({
    type: `${WS_PREFIX}/area/update_sensors`,
    area_id,
    sensors,
    arm_on_close: options?.arm_on_close ?? false,
    delay_on: options?.delay_on ?? 0,
    always_on: options?.always_on ?? false,
    ...(options?.entry_delay !== undefined ? { entry_delay: options.entry_delay } : {}),
    ...(options?.modes ? { modes: options.modes } : {}),
  });

// --- sensors --------------------------------------------------------------
//
// The wire shape uses `sensor_type`; the frontend keeps calling it `type`
// throughout (matches Alarmo's own field name, avoids touching every view).

type WireSensor = Omit<AlarmoSensor, 'type'> & { sensor_type?: ESensorTypeWire; status?: string };
type ESensorTypeWire = string;

const fromWireSensor = (entity_id: string, wire: WireSensor): AlarmoSensor => ({
  entity_id,
  type: (wire.sensor_type as AlarmoSensor['type']) ?? ('other' as AlarmoSensor['type']),
  modes: wire.modes ?? [],
  use_exit_delay: wire.use_exit_delay ?? true,
  use_entry_delay: wire.use_entry_delay ?? true,
  arm_on_close: wire.arm_on_close ?? false,
  allow_open: wire.allow_open ?? false,
  always_on: wire.always_on ?? false,
  area: wire.area,
  entry_delay: wire.entry_delay ?? null,
  delay_on: wire.delay_on ?? null,
});

export const fetchSensors = async (hass: HomeAssistant): Promise<Dictionary<AlarmoSensor>> => {
  const raw = await hass.callWS<Dictionary<WireSensor>>({ type: `${WS_PREFIX}/sensors` });
  const result: Dictionary<AlarmoSensor> = {};
  Object.entries(raw).forEach(([entity_id, wire]) => {
    result[entity_id] = fromWireSensor(entity_id, wire);
  });
  return result;
};

export const saveSensor = (hass: HomeAssistant, config: Partial<AlarmoSensor> & { entity_id: string }): Promise<void> => {
  // `area` is deliberately excluded: it's read-only from this command's
  // perspective (backend rejects it as an undeclared field) - assignment
  // only happens through saveAreaSensors/area/update_sensors.
  const { entity_id, type, area: _area, ...rest } = config;
  return hass.callWS({
    type: `${WS_PREFIX}/sensor/set_options`,
    entity_id,
    ...(type !== undefined ? { sensor_type: type } : {}),
    ...rest,
  });
};

export const deleteSensor = (hass: HomeAssistant, entity_id: string): Promise<void> =>
  hass.callWS({ type: `${WS_PREFIX}/sensor/clear_options`, entity_id });

// --- users --------------------------------------------------------------

export const fetchUsers = (hass: HomeAssistant): Promise<Dictionary<AlarmoUser>> =>
  hass.callWS({ type: `${WS_PREFIX}/users` });

export const saveUser = (hass: HomeAssistant, config: Partial<AlarmoUser>): Promise<AlarmoUser> => {
  // `has_code` is derived/read-only (fetchUsers computes it from whether a
  // code is set) - excluded here since the backend rejects it as an
  // undeclared field, the same class of bug as `area` in saveSensor above.
  const { user_id, has_code: _has_code, ...rest } = config;
  return user_id
    ? hass.callWS({ type: `${WS_PREFIX}/user/update`, user_id, ...rest })
    : hass.callWS({ type: `${WS_PREFIX}/user/create`, ...rest });
};

export const deleteUser = (hass: HomeAssistant, user_id: string): Promise<void> =>
  hass.callWS({ type: `${WS_PREFIX}/user/delete`, user_id });

// --- sensor groups --------------------------------------------------------

export const fetchSensorGroups = (hass: HomeAssistant): Promise<Dictionary<SensorGroup>> =>
  hass.callWS({ type: `${WS_PREFIX}/sensor_groups` });

export const saveSensorGroup = (hass: HomeAssistant, config: SensorGroup): Promise<SensorGroup> => {
  const { group_id, ...rest } = config;
  return group_id
    ? hass.callWS({ type: `${WS_PREFIX}/sensor_group/update`, group_id, ...rest })
    : hass.callWS({ type: `${WS_PREFIX}/sensor_group/create`, ...rest });
};

export const deleteSensorGroup = (hass: HomeAssistant, group_id: string): Promise<void> =>
  hass.callWS({ type: `${WS_PREFIX}/sensor_group/delete`, group_id });

// --- entities ---------------------------------------------------------------

export const fetchEntities = (hass: HomeAssistant): Promise<AlarmEntityRef[]> =>
  hass.callWS({ type: `${WS_PREFIX}/entities` });

// --- import from Alarmo ------------------------------------------------------

export type AlarmoImportPreview = {
  available: boolean;
  reason?: string;
  flow_id?: string;
  areas?: string;
  users?: string;
  sensor_groups?: string;
  sensors?: string;
  automations_skipped?: string;
};

export const previewAlarmoImport = (hass: HomeAssistant): Promise<AlarmoImportPreview> =>
  hass.callWS({ type: `${WS_PREFIX}/alarmo_import/preview` });

export const applyAlarmoImport = (hass: HomeAssistant, flow_id: string): Promise<Dictionary<string>> =>
  hass.callWS({ type: `${WS_PREFIX}/alarmo_import/apply`, flow_id });
