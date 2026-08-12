import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localize } from '../../../localize/localize';
import { TableColumn, TableData, TableFilterConfig } from '../../components/alarmo-table';
import { getConfigurableSensors, sensorClassToType } from '../../data/sensors';
import { fetchAreas, fetchSensors, saveAreaSensors, subscribeConfigUpdates } from '../../data/websockets';
import { handleError, prettyPrint } from '../../helpers';
import { commonStyle } from '../../styles';
import { SubscribeMixin } from '../../subscribe-mixin';
import { AlarmoArea, AlarmoSensor, Dictionary, HomeAssistant } from '../../types';

import '../../components/alarmo-table.ts';
import '../../components/alarmo-select';
import { ESensorTypes } from '../../const';

type SensorItem = {
  id: string;
  name: string;
  icon: string;
  type?: ESensorTypes;
};

@customElement('add-sensors-card')
export class AddSensorsCard extends SubscribeMixin(LitElement) {
  @property()
  hass!: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  addSelection: string[] = [];

  @property()
  areas: Dictionary<AlarmoArea> = {};

  @property()
  sensors: Dictionary<AlarmoSensor> = {};

  @property()
  targetArea?: string;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [subscribeConfigUpdates(this.hass!, () => this._fetchData())];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    this.areas = await fetchAreas(this.hass);
    this.sensors = await fetchSensors(this.hass);
    if (!this.targetArea || !Object.keys(this.areas).includes(this.targetArea)) {
      this.targetArea = Object.keys(this.areas)[0];
    }
  }

  render() {
    if (!this.hass || !this.areas) return html``;

    const columns: Dictionary<TableColumn> = {
      checkbox: {
        width: '48px',
        renderer: (item: SensorItem) => html`
          <ha-checkbox
            @change=${(e: Event) => this.toggleSelect(e, item.id)}
            ?checked=${this.addSelection.includes(item.id)}
          ></ha-checkbox>
        `,
      },
      icon: {
        width: '40px',
        renderer: (item: SensorItem) => html`
          <state-badge .hass=${this.hass} .stateObj=${this.hass!.states[item.id]}></state-badge>
        `,
      },
      name: {
        title: this.hass.localize('ui.components.entity.entity-picker.entity'),
        width: '40%',
        grow: true,
        text: true,
        renderer: (item: SensorItem) => html`
          ${prettyPrint(item.name)}
          <span class="secondary">${item.id}</span>
        `,
      },
      type: {
        title: localize('panels.sensors.cards.add_sensors.table.type', this.hass.language),
        width: '40%',
        hide: this.narrow,
        text: true,
        renderer: (item: SensorItem) =>
          item.type
            ? localize(`panels.sensors.cards.editor.fields.device_type.choose.${item.type}.name`, this.hass.language)
            : this.hass.localize('state.default.unknown'),
      },
    };

    const sensorList = getConfigurableSensors(this.hass, Object.keys(this.sensors), true);

    const tableData = sensorList.map(item => {
      const output = {
        ...item,
        type: sensorClassToType(this.hass.states[item.id]),
        isSupportedType: sensorClassToType(this.hass.states[item.id]) !== undefined ? 'true' : 'false',
      };
      return output;
    });

    return html`
      <ha-card header="${localize('panels.sensors.cards.add_sensors.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.sensors.cards.add_sensors.description', this.hass.language)}
        </div>

        ${Object.keys(this.areas).length > 1
        ? html`
              <div class="card-content">
                <alarmo-select
                  .hass=${this.hass}
                  .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
                  value=${this.targetArea}
                  label=${this.hass.localize('ui.components.area-picker.area')}
                  @value-changed=${(ev: Event) => (this.targetArea = (ev.target as HTMLInputElement).value)}
                ></alarmo-select>
              </div>
            `
        : ''}

        <alarmo-table
          .hass=${this.hass}
          .columns=${columns}
          .data=${tableData}
          .filters=${this.getTableFilterOptions()}
        >
          ${localize('panels.sensors.cards.add_sensors.no_items', this.hass.language)}
        </alarmo-table>

        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.addSelected} ?disabled=${this.addSelection.length == 0 || !this.targetArea}>
            ${localize('panels.sensors.cards.add_sensors.actions.add_to_alarm', this.hass!.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  toggleSelect(ev: Event, id: string) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.addSelection =
      checked && !this.addSelection.includes(id)
        ? [...this.addSelection, id]
        : !checked
          ? this.addSelection.filter(e => e != id)
          : this.addSelection;
  }

  addSelected(ev: Event) {
    if (!this.hass || !this.targetArea) return;

    const existing = Object.values(this.sensors)
      .filter(e => e.area == this.targetArea)
      .map(e => e.entity_id);

    saveAreaSensors(this.hass, this.targetArea, [...existing, ...this.addSelection])
      .catch(e => handleError(e, ev))
      .then();

    this.addSelection = [];
  }

  private getTableFilterOptions() {
    const filterConfig: TableFilterConfig = {
      isSupportedType: {
        name: localize('panels.sensors.cards.add_sensors.actions.filter_supported', this.hass!.language),
        items: [{
          value: 'true',
          name: 'true'
        }],
        value: ['true'],
        binary: true
      },
    };
    return filterConfig;
  }

  static styles = commonStyle;
}
