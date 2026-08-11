import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { fetchSensors, fetchSensorGroups, saveSensorGroup, deleteSensorGroup, subscribeConfigUpdates } from '../data/websockets';
import { Dictionary, AlarmoSensor, SensorGroup, ESensorGroupMode, HomeAssistant } from '../types';
import { dialogStyle } from '../styles';
import { localize } from '../../localize/localize';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { SubscribeMixin } from '../subscribe-mixin';
import { computeName, handleError, prettyPrint, showErrorDialog, sortAlphabetically } from '../helpers';
import { ESensorIcons, ESensorTypes } from '../const';

import '../components/alarmo-chip-set';
import '../components/alarmo-select';
import '../components/alarmo-duration-picker';

@customElement('create-sensor-group-dialog')
export class CreateSensorGroupDialog extends SubscribeMixin(LitElement) {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _params?: any;

  @property()
  sensorGroups: Dictionary<SensorGroup> = {};

  @property()
  sensors: Dictionary<AlarmoSensor> = {};

  @property()
  data!: SensorGroup;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [subscribeConfigUpdates(this.hass!, () => this._fetchData())];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) return;
    this.sensorGroups = await fetchSensorGroups(this.hass);
    this.sensors = await fetchSensors(this.hass);
  }

  public async showDialog(params: any): Promise<void> {
    await this._fetchData();
    this._params = params;
    if (params.group_id && Object.keys(this.sensorGroups).includes(params.group_id)) {
      this.data = { ...this.sensorGroups[params.group_id] };
    } else {
      this.data = {
        name: '',
        entities: [],
        timeout: 15,
        event_count: 2,
        mode: ESensorGroupMode.CountWindow,
      };
    }
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;
    const isWeighted = this.data.mode === ESensorGroupMode.WeightedDecay;
    return html`
      <ha-dialog
        open
        @closed=${this.closeDialog}
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize("ui.common.close")}
            .path=${mdiClose}
          ></ha-icon-button>
          <div slot="title">
            ${this.data.group_id
        ? localize(
          'panels.sensors.dialogs.edit_group.title',
          this.hass.language,
          '{name}',
          this.sensorGroups[this.data.group_id!].name
        )
        : localize('panels.sensors.dialogs.create_group.title', this.hass.language)}
          </div>
        </ha-dialog-header>
        <div class="wrapper">
          <alarmo-settings-row dialog>
            <span slot="heading">
              ${localize('panels.sensors.dialogs.create_group.fields.name.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.sensors.dialogs.create_group.fields.name.description', this.hass.language)}
            </span>
            <ha-input
              label=${this.hass.localize('ui.common.name')}
              @input=${(ev: Event) =>
        (this.data = { ...this.data, name: String((ev.target as HTMLInputElement).value).trim() })}
              value="${this.data.name}"
            ></ha-input>
          </alarmo-settings-row>

          <alarmo-settings-row large dialog>
            <span slot="heading">
              ${localize('panels.sensors.dialogs.create_group.fields.sensors.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.sensors.dialogs.create_group.fields.sensors.description', this.hass.language)}
            </span>
            <div>
              ${this.renderSensorOptions()}
            </div>
          </alarmo-settings-row>

          <alarmo-settings-row dialog>
            <span slot="heading">
              ${localize('panels.sensors.dialogs.create_group.fields.mode.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.sensors.dialogs.create_group.fields.mode.description', this.hass.language)}
            </span>
            <alarmo-select
              .hass=${this.hass}
              .items=${[
        { value: ESensorGroupMode.CountWindow, name: localize('panels.sensors.dialogs.create_group.fields.mode.count_window', this.hass.language) },
        { value: ESensorGroupMode.WeightedDecay, name: localize('panels.sensors.dialogs.create_group.fields.mode.weighted_decay', this.hass.language) },
      ]}
              .value=${this.data.mode ?? ESensorGroupMode.CountWindow}
              @value-changed=${(ev: CustomEvent) => (this.data = { ...this.data, mode: ev.detail.value })}
            ></alarmo-select>
          </alarmo-settings-row>

          <alarmo-settings-row dialog>
            <span slot="heading">
              ${localize('panels.sensors.dialogs.create_group.fields.timeout.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.sensors.dialogs.create_group.fields.timeout.description', this.hass.language)}
            </span>
            <alarmo-duration-picker
              .hass=${this.hass}
              min="10"
              max="900"
              .value=${this.data.timeout}
              ?required=${true}
              @value-changed=${(ev: CustomEvent) =>
        (this.data = { ...this.data, timeout: ev.detail.value })}
            ></alarmo-duration-picker>
          </alarmo-settings-row>

          ${!isWeighted && this.data.entities.length > 2
        ? html`
          <alarmo-settings-row dialog>
            <span slot="heading">
              ${localize('panels.sensors.dialogs.create_group.fields.event_count.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.sensors.dialogs.create_group.fields.event_count.description', this.hass.language)}
            </span>
            <alarmo-select
              .hass=${this.hass}
              .items=${this.renderSensorCountOptions()}
              ?disabled=${this.data.entities.length <= 2}
              @value-changed=${(ev: CustomEvent) => { this.data = { ...this.data, event_count: Number(ev.detail.value) } }}
              .value=${String(this.data.event_count > this.data.entities.length ? this.data.entities.length : this.data.event_count)}
            ></alarmo-select>
          </alarmo-settings-row>
          `
        : ''
      }

          ${isWeighted
        ? html`
              <alarmo-settings-row dialog>
                <span slot="heading">
                  ${localize('panels.sensors.dialogs.create_group.fields.decay_per_minute.heading', this.hass.language)}
                </span>
                <span slot="description">
                  ${localize('panels.sensors.dialogs.create_group.fields.decay_per_minute.description', this.hass.language)}
                </span>
                <ha-input
                  type="number"
                  value="${this.data.decay_per_minute ?? 1}"
                  @input=${(ev: Event) =>
            (this.data = { ...this.data, decay_per_minute: Number((ev.target as HTMLInputElement).value) })}
                ></ha-input>
              </alarmo-settings-row>
              <alarmo-settings-row dialog>
                <span slot="heading">
                  ${localize('panels.sensors.dialogs.create_group.fields.threshold.heading', this.hass.language)}
                </span>
                <span slot="description">
                  ${localize('panels.sensors.dialogs.create_group.fields.threshold.description', this.hass.language)}
                </span>
                <ha-input
                  type="number"
                  value="${this.data.threshold ?? 10}"
                  @input=${(ev: Event) =>
            (this.data = { ...this.data, threshold: Number((ev.target as HTMLInputElement).value) })}
                ></ha-input>
              </alarmo-settings-row>
              ${this.data.entities.map(
          entity_id => html`
                  <alarmo-settings-row dialog nested>
                    <span slot="heading">${computeName(this.hass!.states[entity_id])}</span>
                    <span slot="description">
                      ${localize('panels.sensors.dialogs.create_group.fields.weight.heading', this.hass.language)}
                    </span>
                    <ha-input
                      type="number"
                      value="${(this.data.weights ?? {})[entity_id] ?? 5}"
                      @input=${(ev: Event) =>
              (this.data = {
                ...this.data,
                weights: { ...(this.data.weights ?? {}), [entity_id]: Number((ev.target as HTMLInputElement).value) },
              })}
                    ></ha-input>
                  </alarmo-settings-row>
                `
        )}
            `
        : ''}
        </div>
        <ha-dialog-footer slot="footer">
          <ha-button appearance="plain" slot="secondaryAction" @click=${this.saveClick}>
            ${this.hass.localize('ui.common.save')}
          </ha-button>
          ${this.data.group_id
        ? html`
                <ha-button appearance="plain" slot="secondaryAction" @click=${this.deleteClick} variant="danger">
                  ${this.hass.localize('ui.common.delete')}
                </ha-button>
              `
        : ''}
        </ha-dialog-footer>
      </ha-dialog>
    `;
  }

  renderSensorOptions() {
    // A sensor already belonging to a *different* group is excluded - group
    // membership lives on the group's own entities list, not a per-sensor
    // field, so this is the only place that constraint can be enforced.
    const otherGroupsEntities = new Set(
      Object.values(this.sensorGroups)
        .filter(g => g.group_id !== this.data.group_id)
        .reduce((all: string[], g) => all.concat(g.entities), [])
    );

    const sensors = Object.keys(this.sensors)
      .filter(e => !otherGroupsEntities.has(e))
      .map(e => {
        const stateObj = this.hass!.states[e];
        const type = Object.entries(ESensorTypes).find(([, v]) => v == this.sensors[e].type)![0];
        return {
          value: e,
          name: prettyPrint(computeName(stateObj)),
          icon: ESensorIcons[type],
        };
      });
    sensors.sort(sortAlphabetically);

    if (!sensors.length) return localize('panels.sensors.cards.sensors.table.no_items', this.hass.language);

    return html`
      <alarmo-chip-set
        .hass=${this.hass}
        .items=${sensors}
        .value=${this.data.entities}
        toggleable
        @value-changed=${(ev: CustomEvent) => (this.data = { ...this.data, entities: ev.detail })}
      ></alarmo-chip-set>
    `;
  }

  renderSensorCountOptions() {
    let options: { name: string; value: string }[] = [];
    for (let i = 2; i <= this.data.entities.length; i++) {
      options = [...options, {
        name: `${i}`,
        value: `${i}`
      }]
    }
    return options;
  }

  private saveClick(ev: Event) {
    if (!this.data.name.length)
      showErrorDialog(ev, localize('panels.sensors.dialogs.create_group.errors.invalid_name', this.hass.language));
    else if (
      (!this.data.group_id || this.data.name != this.sensorGroups[this.data.group_id].name) &&
      Object.values(this.sensorGroups).find(e => e.name.toLowerCase() == this.data.name.toLowerCase())
    )
      showErrorDialog(ev, localize('panels.sensors.dialogs.create_group.errors.invalid_name', this.hass.language));
    else if (this.data.entities.length < 2)
      showErrorDialog(
        ev,
        localize('panels.sensors.dialogs.create_group.errors.insufficient_sensors', this.hass.language)
      );
    else {
      if (this.data.event_count > this.data.entities.length) this.data = { ...this.data, event_count: this.data.entities.length };
      saveSensorGroup(this.hass, this.data)
        .catch(e => handleError(e, ev))
        .then(() => {
          this.closeDialog();
        });
    }
  }

  private deleteClick(ev: Event) {
    if (!this.data.group_id) return;
    deleteSensorGroup(this.hass, this.data.group_id!)
      .catch(e => handleError(e, ev))
      .then(() => {
        this.closeDialog();
      });
  }

  static get styles(): CSSResultGroup {
    return css`
      ${dialogStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
}
