import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { commonStyle } from '../../styles';
import { AlarmoSensor, EArmModes, Dictionary, AlarmoArea, HomeAssistant } from '../../types';
import { fetchSensors, saveSensor, deleteSensor, fetchAreas, subscribeConfigUpdates } from '../../data/websockets';
import { localize } from '../../../localize/localize';
import { Unique, Without, handleError, showErrorDialog, computeName, navigate, isDefined } from '../../helpers';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { sensorConfigByType, getSensorTypeOptions } from '../../data/sensors';
import { EArmModeIcons, ESensorTypes } from '../../const';
import { SubscribeMixin } from '../../subscribe-mixin';

import '../../dialogs/error-dialog';
import '../../dialogs/manage-sensor-groups-dialog';
import '../../components/alarmo-select';
import '../../components/alarmo-collapsible-section';
import '../../components/alarmo-duration-picker';

import { exportPath } from '../../common/navigation';
import { fireEvent } from '../../fire_event';
@customElement('sensor-editor-card')
export class SensorEditorCard extends SubscribeMixin(LitElement) {
  @property()
  hass!: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  item!: string;

  @property()
  data?: AlarmoSensor;

  areas!: Dictionary<AlarmoArea>;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [subscribeConfigUpdates(this.hass!, () => this._fetchData())];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) return;
    const areas = await fetchAreas(this.hass);
    this.areas = areas;

    const sensors = await fetchSensors(this.hass);
    this.data = Object.keys(sensors).includes(this.item) ? sensors[this.item] : undefined;
  }

  render() {
    if (!this.data) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${localize('panels.sensors.cards.editor.title', this.hass.language)}</div>
          <ha-icon-button .path=${mdiClose} @click=${this.cancelClick}></ha-icon-button>
        </div>
        <div class="card-content">
          ${localize(
      'panels.sensors.cards.editor.description',
      this.hass.language,
      '{entity}',
      computeName(this.hass.states[this.item])
    )}
        </div>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.sensors.cards.editor.fields.entity.heading', this.hass.language)}
          </span>
          <span slot="description">${this.data.entity_id}</span>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.sensors.cards.editor.fields.area.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${this.data.area && this.areas[this.data.area] ? this.areas[this.data.area].name : '-'}
          </span>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow} .large=${true}>
          <span slot="heading">
            ${localize('panels.sensors.cards.editor.fields.device_type.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.sensors.cards.editor.fields.device_type.description', this.hass.language)}
          </span>

          <alarmo-select
            .hass=${this.hass}
            .items=${getSensorTypeOptions(this.hass)}
            label=${localize('panels.sensors.cards.editor.fields.device_type.heading', this.hass.language)}
            clearable=${true}
            icons=${true}
            value=${this.data['type']}
            @value-changed=${(ev: Event) =>
        this.setType(((ev.target as HTMLInputElement).value || ESensorTypes.Other) as ESensorTypes)}
          ></alarmo-select>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow} .large=${this.modesByArea(this.data.area).length > 3}>
          <span slot="heading">
            ${localize('panels.sensors.cards.editor.fields.modes.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.sensors.cards.editor.fields.modes.description', this.hass.language)}
          </span>

          <div>
            ${this.modesByArea(this.data.area).map(
          el => html`
                <ha-button
                  appearance="${this.data!.modes.includes(el) || this.data!.always_on ? 'filled' : 'plain'}"
                  variant="${this.data!.modes.includes(el) || this.data!.always_on ? 'brand' : 'neutral'}"
                  @click=${() => {
              this.setMode(el);
            }}
                  ?disabled=${this.data!.always_on}
                >
                  <ha-svg-icon slot="start" .path=${EArmModeIcons[Object.entries(EArmModes).find(([, v]) => v == el)![0]]}></ha-svg-icon>
                  ${localize(`common.modes_short.${el}`, this.hass.language)}
                </ha-button>
              `
        )}
          </div>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.sensors.cards.editor.fields.group.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.sensors.cards.editor.fields.group.description', this.hass.language)}
          </span>

          <ha-button appearance="filled" @click=${this.manageGroupsClick}>
            ${localize('panels.sensors.cards.editor.actions.setup_groups', this.hass.language)}
            <ha-icon slot="end" icon="mdi:open-in-new"></ha-icon>
          </ha-button>
        </alarmo-settings-row>

        <alarmo-collapsible-section
          .narrow=${this.narrow}
          header=${localize('panels.sensors.cards.editor.actions.toggle_advanced', this.hass.language)}
        >
          ${!this.data.type || [ESensorTypes.Environmental, ESensorTypes.Tamper, ESensorTypes.Other].includes(this.data.type)
        ? html`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${localize('panels.sensors.cards.editor.fields.always_on.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.sensors.cards.editor.fields.always_on.description', this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.always_on}
                    @change=${(ev: Event) => this._SetData({ always_on: (ev.target as HTMLInputElement).checked })}
                  ></ha-switch>
                </alarmo-settings-row>
              `
        : ''}
          ${!this.data.type ||
        [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)
        ? html`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${localize('panels.sensors.cards.editor.fields.use_exit_delay.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.sensors.cards.editor.fields.use_exit_delay.description', this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.use_exit_delay}
                    ?disabled=${this.data.always_on}
                    @change=${(ev: Event) => this._SetData({ use_exit_delay: (ev.target as HTMLInputElement).checked })}
                  ></ha-switch>
                </alarmo-settings-row>

                ${this.data.type == ESensorTypes.Motion && this.data.use_exit_delay
            ? html`
                      <alarmo-settings-row .narrow=${this.narrow} nested>
                        <span slot="heading">
                          ${localize('panels.sensors.cards.editor.fields.allow_open.heading', this.hass.language)}
                        </span>
                        <span slot="description">
                          ${localize('panels.sensors.cards.editor.fields.allow_open.description', this.hass.language)}
                        </span>

                        <ha-switch
                          ?checked=${this.data.allow_open}
                          ?disabled=${this.data.always_on || this.data.arm_on_close}
                          @change=${(ev: Event) =>
                this._SetData({ allow_open: (ev.target as HTMLInputElement).checked })}
                        ></ha-switch>
                      </alarmo-settings-row>
                    `
            : ''}
              `
        : ''}
          ${!this.data.type ||
        [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)
        ? html`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${localize('panels.sensors.cards.editor.fields.use_entry_delay.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.sensors.cards.editor.fields.use_entry_delay.description', this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.use_entry_delay}
                    ?disabled=${this.data.always_on}
                    @change=${(ev: Event) =>
            this._SetData({ use_entry_delay: (ev.target as HTMLInputElement).checked })}
                  ></ha-switch>
                </alarmo-settings-row>
              `
        : ''}


          ${(!this.data.type ||
        [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type))
        && this.data.use_entry_delay
        ? html`
                <alarmo-settings-row .narrow=${this.narrow} nested>
                  <span slot="heading">
                    ${localize('panels.sensors.cards.editor.fields.entry_delay.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.sensors.cards.editor.fields.entry_delay.description', this.hass.language)}
                  </span>

                  <alarmo-duration-picker
                    .hass=${this.hass}
                    max="900"
                    placeholder="-"
                    ?disabled=${!isDefined(this.data.entry_delay)}
                    value=${this.data.entry_delay}
                    @value-changed=${(ev: CustomEvent) => this._SetData({ entry_delay: ev.detail.value })}
                  ></alarmo-duration-picker>
                </alarmo-settings-row>
              `
        : ''}

          ${!this.data.type ||
        [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)
        ? html`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${localize('panels.sensors.cards.editor.fields.delay_on.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.sensors.cards.editor.fields.delay_on.description', this.hass.language)}
                  </span>

                  <alarmo-duration-picker
                    .hass=${this.hass}
                    max="60"
                    step="5"
                    placeholder="-"
                    ?disabled=${!isDefined(this.data.delay_on)}
                    value=${this.data.delay_on}
                    @value-changed=${(ev: CustomEvent) => this._SetData({ delay_on: ev.detail.value })}
                  ></alarmo-duration-picker>
                </alarmo-settings-row>
              `
        : ''}

          ${!this.data.type || [ESensorTypes.Door, ESensorTypes.Other].includes(this.data.type)
        ? html`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${localize('panels.sensors.cards.editor.fields.arm_on_close.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.sensors.cards.editor.fields.arm_on_close.description', this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.arm_on_close}
                    ?disabled=${this.data.always_on}
                    @change=${(ev: Event) => this._SetData({ arm_on_close: (ev.target as HTMLInputElement).checked })}
                  ></ha-switch>
                </alarmo-settings-row>
              `
        : ''}

        ${(!this.data.type || [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Other].includes(this.data.type))
        ? html`
              <alarmo-settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${localize('panels.sensors.cards.editor.fields.allow_open.heading', this.hass.language)}
                </span>
                <span slot="description">
                  ${localize('panels.sensors.cards.editor.fields.allow_open.description', this.hass.language)}
                </span>

                <ha-switch
                  ?checked=${this.data.allow_open}
                  ?disabled=${this.data.always_on || this.data.arm_on_close}
                  @change=${(ev: Event) =>
            this._SetData({ allow_open: (ev.target as HTMLInputElement).checked })}
                ></ha-switch>
              </alarmo-settings-row>
            `
        : ''}
        </alarmo-collapsible-section>

        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.saveClick}>
            ${this.hass.localize('ui.common.save')}
          </ha-button>

          <ha-button appearance="plain" variant="danger" @click=${this.deleteClick}>
            ${localize('panels.sensors.cards.editor.actions.remove', this.hass.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  private modesByArea(area_id?: string): EArmModes[] {
    if (!area_id || !this.areas[area_id]) return [];
    return Object.entries(this.areas[area_id].modes)
      .filter(([, v]) => v.enabled)
      .map(([k]) => k as EArmModes);
  }

  private _SetData(data: Partial<AlarmoSensor>) {
    if (!this.data) return;
    for (const [key, val] of Object.entries(data)) {
      switch (key) {
        case 'always_on':
          this.data = { ...this.data, always_on: val == true };
          if (val)
            this.data = {
              ...this.data,
              arm_on_close: false,
              use_exit_delay: false,
              use_entry_delay: false,
              allow_open: false,
            };
          break;
        case 'use_entry_delay':
          this.data = { ...this.data, use_entry_delay: val == true };
          break;
        case 'use_exit_delay':
          this.data = { ...this.data, use_exit_delay: val == true };
          if (this.data.type === ESensorTypes.Motion && !val) this.data = { ...this.data, allow_open: false };
          break;
        case 'arm_on_close':
          this.data = { ...this.data, arm_on_close: val == true };
          if (val) this.data = { ...this.data, always_on: false, allow_open: false };
          break;
        case 'allow_open':
          this.data = { ...this.data, allow_open: val == true };
          if (val) this.data = { ...this.data, arm_on_close: false, always_on: false };
          break;
        case 'entry_delay':
          this.data = { ...this.data, entry_delay: val as number | null };
          break;
        case 'delay_on':
          this.data = { ...this.data, delay_on: val as number | null };
          break;
      }
    }
  }

  private setMode(mode: EArmModes) {
    if (!this.data) return;
    this.data = {
      ...this.data,
      modes: this.data.modes.includes(mode) ? Without(this.data.modes, mode) : Unique(this.data.modes.concat([mode])),
    };
  }

  private setType(type: ESensorTypes) {
    if (!this.data) return;
    const settings = type != ESensorTypes.Other ? sensorConfigByType(this.modesByArea(this.data.area))[type] : {};

    this.data = {
      ...this.data,
      type: type,
      ...settings,
    };
  }

  private deleteClick(ev: Event) {
    deleteSensor(this.hass, this.item)
      .catch(e => handleError(e, ev))
      .then(() => {
        this.cancelClick();
      });
  }

  private saveClick(ev: Event) {
    if (!this.data) return;
    const errors: string[] = [];

    if (!this.data.modes.length && !this.data.always_on)
      errors.push(localize('panels.sensors.cards.editor.errors.no_modes', this.hass.language));
    if (errors.length) {
      showErrorDialog(
        ev,
        html`
          ${localize('panels.sensors.cards.editor.errors.description', this.hass.language)}
          <ul>
            ${errors.map(
          e =>
            html`
                  <li>${e}</li>
                `
        )}
          </ul>
        `
      );
    } else {
      saveSensor(this.hass, { ...this.data })
        .catch(e => handleError(e, ev))
        .then(() => {
          this.cancelClick();
        });
    }
  }

  private cancelClick() {
    navigate(this, exportPath('sensors'), true);
  }

  manageGroupsClick(ev: Event) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'manage-sensor-groups-dialog',
      dialogImport: () => import('../../dialogs/manage-sensor-groups-dialog'),
      dialogParams: {},
    });
  }

  static styles = commonStyle;
}
