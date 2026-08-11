import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { prettyPrint, sortAlphabetically, navigate } from '../../helpers';
import { Dictionary, AlarmoUser, HomeAssistant } from '../../types';

import './user-editor-card.ts';
import '../../components/alarmo-settings-row';
import '../../components/alarmo-table.ts';

import { commonStyle } from '../../styles';
import { localize } from '../../../localize/localize';
import { SubscribeMixin } from '../../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchUsers, subscribeConfigUpdates } from '../../data/websockets';
import { TableData, TableColumn } from '../../components/alarmo-table';
import { exportPath, Path } from '../../common/navigation';

@customElement('alarm-view-codes')
export class AlarmViewCodes extends SubscribeMixin(LitElement) {
  @property()
  hass?: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  path!: Path;

  @property()
  users: Dictionary<AlarmoUser> = {};

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [subscribeConfigUpdates(this.hass!, () => this._fetchData())];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    this.users = await fetchUsers(this.hass);
  }

  render() {
    if (!this.hass) return html``;

    if (this.path.subpage == 'new_user') {
      return html`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow}></user-editor-card>
      `;
    } else if (this.path.params.edit_user) {
      return html`
        <user-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path.params.edit_user}
        ></user-editor-card>
      `;
    } else {
      return this.usersPanel();
    }
  }

  usersPanel() {
    if (!this.hass) return html``;

    const users = Object.values(this.users);
    users.sort(sortAlphabetically);

    const columns: Dictionary<TableColumn> = {
      icon: {
        width: '40px',
      },
      name: {
        title: this.hass.localize('ui.common.name'),
        width: '60%',
        grow: true,
        text: true,
      },
      enabled: {
        title: localize('common.enabled', this.hass.language),
        width: '30%',
        text: true,
      },
    };

    const data = users.map(item => {
      const output: TableData = {
        id: item.user_id!,
        icon: html`
          <ha-icon icon="mdi:account-outline" class="${item.enabled ? '' : 'disabled'}"></ha-icon>
        `,
        name: html`
          <span class="${item.enabled ? '' : 'disabled'}">
            ${prettyPrint(item.name)}
          </span>
        `,
        enabled: html`
          <span class="${item.enabled ? '' : 'disabled'}">
            ${item.enabled
            ? localize('common.enabled', this.hass!.language)
            : localize('common.disabled', this.hass!.language)}
          </span>
        `,
      };
      return output;
    });

    return html`
      <ha-card header="${localize('panels.codes.cards.user_management.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.codes.cards.user_management.description', this.hass.language)}
        </div>

        <alarmo-table
          ?selectable=${true}
          .columns=${columns}
          .data=${data}
          @row-click=${(ev: CustomEvent) => {
        const id = String(ev.detail.id);
        navigate(this, exportPath('codes', { params: { edit_user: id } }), true);
      }}
        >
          ${localize('panels.codes.cards.user_management.no_items', this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.addUserClick}>
            ${localize('panels.codes.cards.user_management.actions.new_user', this.hass.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  addUserClick() {
    navigate(this, exportPath('codes', 'new_user'), true);
  }

  static styles = commonStyle;
}
