import { HassEntity, HassEntityAttributeBase, MessageBase, Connection, HassEntities, HassServices } from 'home-assistant-js-websocket';
import { ESensorTypes } from './const';

export interface Dictionary<TValue> {
  [id: string]: TValue;
}

export interface ServiceCallRequest {
  domain: string;
  service: string;
  serviceData?: Record<string, any>;
  target?: {
    entity_id?: string | string[];
    device_id?: string | string[];
    area_id?: string | string[];
  };
}

export interface HomeAssistant {
  connection: Connection;
  language: string;
  panels: {
    [name: string]: {
      component_name: string;
      config: { [key: string]: any } | null;
      icon: string | null;
      title: string | null;
      url_path: string;
    };
  };
  states: HassEntities;
  services: HassServices;
  localize: (key: string, ...args: any[]) => string;
  translationMetadata: {
    fragments: string[];
    translations: {
      [lang: string]: {
        nativeName: string;
        isRTL: boolean;
        fingerprints: { [fragment: string]: string };
      };
    };
  };
  callApi: <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: { [key: string]: any }
  ) => Promise<T>;
  callService: (
    domain: ServiceCallRequest["domain"],
    service: ServiceCallRequest["service"],
    serviceData?: ServiceCallRequest["serviceData"],
    target?: ServiceCallRequest["target"]
  ) => Promise<void>;
  callWS: <T>(msg: MessageBase) => Promise<T>;
}

export interface AlarmEntity extends HassEntity {
  attributes: HassEntityAttributeBase & {
    code_format: 'number' | 'text';
    code_arm_required: boolean;
    supported_features: number;
    open_sensors?: string[];
    bypassed_sensors?: string[];
    next_state_change?: string;
  };
}

export enum EArmModes {
  ArmedAway = 'armed_away',
  ArmedHome = 'armed_home',
  ArmedNight = 'armed_night',
  ArmedVacation = 'armed_vacation',
  ArmedCustom = 'armed_custom_bypass',
}

export type AlarmoModeConfig = {
  enabled: boolean;
  exit_time: number | null;
  entry_time: number | null;
  trigger_time: number | null;
};

export type AlarmoSensor = {
  entity_id: string;
  type: ESensorTypes;
  modes: EArmModes[];
  use_exit_delay: boolean;
  use_entry_delay: boolean;
  arm_on_close: boolean;
  allow_open: boolean;
  always_on: boolean;
  area?: string;
  entry_delay: number | null;
  delay_on: number | null;
};

export type AlarmoUser = {
  user_id?: string;
  name: string;
  enabled: boolean;
  code?: string;
  has_code?: boolean;
  can_arm: boolean;
  can_disarm: boolean;
  is_override_code: boolean;
  area_limit: string[];
};

export type AlarmoArea = {
  area_id: string;
  name: string;
  modes: Record<EArmModes, AlarmoModeConfig>;
};

export const enum ESensorGroupMode {
  CountWindow = 'count_window',
  WeightedDecay = 'weighted_decay',
}

export type SensorGroup = {
  group_id?: string;
  name: string;
  entities: string[];
  timeout: number;
  event_count: number;
  mode?: ESensorGroupMode;
  decay_per_minute?: number;
  threshold?: number;
  weights?: Dictionary<number>;
};

export type AlarmEntityRef = {
  entity_id: string;
  area_id: string | number;
};
