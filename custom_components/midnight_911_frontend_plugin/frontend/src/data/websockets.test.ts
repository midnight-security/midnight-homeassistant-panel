import { describe, expect, it, vi } from 'vitest';
import {
  saveArea,
  saveSensor,
  saveUser,
  saveSensorGroup,
  fetchSensors,
} from './websockets';
import { HomeAssistant, AlarmoUser, SensorGroup, ESensorGroupMode } from '../types';

// These four functions are exactly where every real payload-shaping bug
// found during manual/live testing lived: saveSensor leaking a read-only
// `area` field, saveUser leaking a read-only `has_code` field, and
// create-area-dialog.ts silently wiping an area's modes/timers by relying
// on saveArea's undocumented "no modes -> reset to defaults" fallback.
// None of that was caught by any automated test until now.

const mockHass = (): HomeAssistant & { callWS: ReturnType<typeof vi.fn> } => {
  const callWS = vi.fn().mockResolvedValue({});
  return { callWS } as unknown as HomeAssistant & { callWS: ReturnType<typeof vi.fn> };
};

describe('saveArea', () => {
  it('creates with area/create when no area_id is given', async () => {
    const hass = mockHass();
    await saveArea(hass, { name: 'Front Door' });
    expect(hass.callWS).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'midnight_911_frontend_plugin/area/create' })
    );
  });

  it('updates with area/update, including area_id, when area_id is given', async () => {
    const hass = mockHass();
    await saveArea(hass, { area_id: 'abc123', name: 'Front Door' });
    expect(hass.callWS).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'midnight_911_frontend_plugin/area/update',
        area_id: 'abc123',
      })
    );
  });

  it('derives enabled_modes from modes with enabled: true', async () => {
    const hass = mockHass();
    await saveArea(hass, {
      name: 'Front Door',
      modes: {
        armed_away: { enabled: true, exit_time: 45, entry_time: 60, trigger_time: 1800 },
        armed_home: { enabled: false, exit_time: 60, entry_time: 60, trigger_time: 1800 },
      } as any,
    });
    const payload = hass.callWS.mock.calls[0][0];
    expect(payload.enabled_modes).toEqual(['armed_away']);
    expect(payload.mode_timers.armed_away.exit_time).toBe(45);
  });

  it('applies 60/60/1800 defaults for a mode missing explicit timer values', async () => {
    const hass = mockHass();
    await saveArea(hass, {
      name: 'Front Door',
      modes: {
        armed_away: { enabled: true } as any,
      } as any,
    });
    const payload = hass.callWS.mock.calls[0][0];
    expect(payload.mode_timers.armed_away).toEqual({
      exit_time: 60,
      entry_time: 60,
      trigger_time: 1800,
    });
  });

  it('REGRESSION: falls back to a bare armed_away/armed_home default when modes is omitted entirely', async () => {
    // This is not new behavior - it's saveArea's existing, documented
    // contract. The regression it caused: create-area-dialog.ts's
    // rename-only path called saveArea({ area_id, name }) with no modes,
    // silently wiping every other mode's enabled state and timers back to
    // this exact fallback. Pinning it here so the contract stays visible
    // to whoever touches this function next, and any caller must
    // explicitly carry the area's current `modes` through.
    const hass = mockHass();
    await saveArea(hass, { area_id: 'abc123', name: 'Renamed' });
    const payload = hass.callWS.mock.calls[0][0];
    expect(payload.enabled_modes).toEqual(['armed_away', 'armed_home']);
    expect(payload.mode_timers).toEqual({});
  });
});

describe('saveSensor', () => {
  it('REGRESSION: never forwards `area` - the backend rejects it as an undeclared field', async () => {
    const hass = mockHass();
    await saveSensor(hass, {
      entity_id: 'binary_sensor.front_door',
      area: 'some_area_id',
      always_on: true,
    } as any);
    const payload = hass.callWS.mock.calls[0][0];
    expect(payload).not.toHaveProperty('area');
    expect(payload.entity_id).toBe('binary_sensor.front_door');
    expect(payload.always_on).toBe(true);
  });

  it('maps `type` to the wire field `sensor_type`', async () => {
    const hass = mockHass();
    await saveSensor(hass, { entity_id: 'binary_sensor.front_door', type: 'door' as any });
    const payload = hass.callWS.mock.calls[0][0];
    // `type` is legitimately present as the websocket envelope's command
    // name (e.g. "midnight_911_frontend_plugin/sensor/set_options") - what
    // matters is that the sensor's own device type only appears renamed to
    // `sensor_type`, never leaking through under the `type` key itself.
    expect(payload.sensor_type).toBe('door');
    expect(payload.type).toBe('midnight_911_frontend_plugin/sensor/set_options');
  });

  it('omits sensor_type entirely when type is not provided', async () => {
    const hass = mockHass();
    await saveSensor(hass, { entity_id: 'binary_sensor.front_door', always_on: true });
    const payload = hass.callWS.mock.calls[0][0];
    expect(payload).not.toHaveProperty('sensor_type');
  });
});

describe('saveUser', () => {
  const baseUser: Partial<AlarmoUser> = {
    name: 'Alice',
    can_arm: true,
    can_disarm: true,
    is_override_code: false,
    area_limit: [],
  };

  it('REGRESSION: never forwards has_code - the backend rejects it as an undeclared field', async () => {
    const hass = mockHass();
    await saveUser(hass, { ...baseUser, user_id: 'user1', has_code: true } as any);
    const payload = hass.callWS.mock.calls[0][0];
    expect(payload).not.toHaveProperty('has_code');
  });

  it('creates with user/create when no user_id is given', async () => {
    const hass = mockHass();
    await saveUser(hass, baseUser);
    expect(hass.callWS).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'midnight_911_frontend_plugin/user/create' })
    );
  });

  it('updates with user/update, including user_id, when user_id is given', async () => {
    const hass = mockHass();
    await saveUser(hass, { ...baseUser, user_id: 'user1' });
    expect(hass.callWS).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'midnight_911_frontend_plugin/user/update',
        user_id: 'user1',
      })
    );
  });
});

describe('saveSensorGroup', () => {
  const baseGroup: SensorGroup = {
    name: 'Perimeter',
    entities: ['binary_sensor.a', 'binary_sensor.b'],
    timeout: 15,
    event_count: 2,
  };

  it('creates with sensor_group/create when no group_id is given', async () => {
    const hass = mockHass();
    await saveSensorGroup(hass, baseGroup);
    expect(hass.callWS).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'midnight_911_frontend_plugin/sensor_group/create' })
    );
  });

  it('updates with sensor_group/update, including group_id, when group_id is given', async () => {
    const hass = mockHass();
    await saveSensorGroup(hass, { ...baseGroup, group_id: 'group1' });
    expect(hass.callWS).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'midnight_911_frontend_plugin/sensor_group/update',
        group_id: 'group1',
      })
    );
  });

  it('passes weighted-decay fields through unmodified', async () => {
    const hass = mockHass();
    await saveSensorGroup(hass, {
      ...baseGroup,
      mode: ESensorGroupMode.WeightedDecay,
      decay_per_minute: 2,
      threshold: 8,
      weights: { 'binary_sensor.a': 3, 'binary_sensor.b': 5 },
    });
    const payload = hass.callWS.mock.calls[0][0];
    expect(payload.mode).toBe('weighted_decay');
    expect(payload.decay_per_minute).toBe(2);
    expect(payload.threshold).toBe(8);
    expect(payload.weights).toEqual({ 'binary_sensor.a': 3, 'binary_sensor.b': 5 });
  });
});

describe('fetchSensors (wire -> frontend shape via fromWireSensor)', () => {
  it('maps the wire field sensor_type to the frontend field type', async () => {
    const hass = mockHass();
    hass.callWS.mockResolvedValue({
      'binary_sensor.front_door': { sensor_type: 'door', area: 'area1' },
    });
    const result = await fetchSensors(hass);
    expect(result['binary_sensor.front_door'].type).toBe('door');
  });

  it('defaults use_exit_delay/use_entry_delay to true and always_on/allow_open/arm_on_close to false when absent', async () => {
    const hass = mockHass();
    hass.callWS.mockResolvedValue({
      'binary_sensor.front_door': {},
    });
    const result = await fetchSensors(hass);
    const sensor = result['binary_sensor.front_door'];
    expect(sensor.use_exit_delay).toBe(true);
    expect(sensor.use_entry_delay).toBe(true);
    expect(sensor.always_on).toBe(false);
    expect(sensor.allow_open).toBe(false);
    expect(sensor.arm_on_close).toBe(false);
    expect(sensor.entry_delay).toBeNull();
    expect(sensor.delay_on).toBeNull();
    expect(sensor.modes).toEqual([]);
  });
});
