import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { mdiPencil } from '@mdi/js';

import { prettyPrint, sortAlphabetically } from '../../helpers';
import { Dictionary, AlarmoArea, AlarmoSensor, HomeAssistant } from '../../types';

import '../../components/alarmo-settings-row';
import '../../components/alarmo-table.ts';
import '../../dialogs/create-area-dialog';
import '../../dialogs/import-alarmo-dialog';

import { commonStyle } from '../../styles';
import { localize } from '../../../localize/localize';
import { SubscribeMixin } from '../../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchAreas, fetchSensors, subscribeConfigUpdates } from '../../data/websockets';
import { TableData, TableColumn } from '../../components/alarmo-table';
import { fireEvent } from '../../fire_event';

@customElement('area-config-card')
export class AreaConfigCard extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;

  @property() areas: Dictionary<AlarmoArea> = {};
  @property() sensors: Dictionary<AlarmoSensor> = {};

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [subscribeConfigUpdates(this.hass!, () => this._fetchData())];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) return;
    this.areas = await fetchAreas(this.hass);
    this.sensors = await fetchSensors(this.hass);
  }

  render() {
    if (!this.hass) return html``;

    const areas = Object.values(this.areas);
    areas.sort(sortAlphabetically);

    const columns: Dictionary<TableColumn> = {
      actions: {
        width: '48px',
      },
      name: {
        title: this.hass.localize('ui.common.name'),
        width: '40%',
        grow: true,
        text: true,
      },
      remarks: {
        title: localize('panels.general.cards.areas.table.remarks', this.hass.language),
        width: '60%',
        hide: this.narrow,
        text: true,
      },
    };

    const data = Object.values(areas).map(item => {
      const sensors = Object.values(this.sensors).filter(e => e.area == item.area_id).length;
      const summary_sensors = localize(
        'panels.general.cards.areas.table.summary_sensors',
        this.hass!.language,
        'number',
        sensors
      );
      const output: TableData = {
        id: item.area_id,
        actions: html`
          <ha-icon-button @click=${(ev: Event) => this.editClick(ev, item.area_id)} .path=${mdiPencil}></ha-icon-button>
        `,
        name: prettyPrint(item.name),
        remarks: (unsafeHTML(summary_sensors) as unknown) as string,
      };
      return output;
    });

    return html`
      <ha-card header="${localize('panels.general.cards.areas.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.general.cards.areas.description', this.hass.language)}
        </div>

        <alarmo-table .columns=${columns} .data=${data}>
          ${localize('panels.general.cards.areas.no_items', this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.addClick}>
            ${localize('panels.general.cards.areas.actions.add', this.hass.language)}
          </ha-button>
          <ha-button appearance="plain" @click=${this.importClick}>
            ${localize('panels.general.cards.areas.actions.import_from_alarmo', this.hass.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  addClick(ev: Event) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'create-area-dialog',
      dialogImport: () => import('../../dialogs/create-area-dialog'),
      dialogParams: {},
    });
  }

  editClick(ev: Event, area_id: string) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'create-area-dialog',
      dialogImport: () => import('../../dialogs/create-area-dialog'),
      dialogParams: { area_id: area_id },
    });
  }

  importClick(ev: Event) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'import-alarmo-dialog',
      dialogImport: () => import('../../dialogs/import-alarmo-dialog'),
      dialogParams: {},
    });
  }

  static styles = commonStyle;
}
