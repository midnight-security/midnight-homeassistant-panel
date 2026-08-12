import { LitElement, html, CSSResultGroup, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { loadHaForm } from './load-ha-elements';

import './views/general/view-general.ts';
import './views/sensors/view-sensors.ts';
import './views/codes/view-codes.ts';

import { commonStyle } from './styles';
import { VERSION, platform } from './const';
import { fetchUsers } from './data/websockets';
import { AlarmoUser, Dictionary, HomeAssistant } from './types';
import { localize } from '../localize/localize';
import { exportPath, getPath, Path } from './common/navigation';
import { navigate } from './helpers';

enum EMenuItems {
  General = 'general',
  Sensors = 'sensors',
  Codes = 'codes',
}

@customElement('alarm-panel')
export class MyAlarmPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean, reflect: true }) public narrow!: boolean;

  @property({ attribute: false }) userConfig?: Dictionary<AlarmoUser>;

  @property({ attribute: false }) brandToken?: string;

  async firstUpdated() {
    window.addEventListener('location-changed', () => {
      if (!window.location.pathname.includes('midnight_911_frontend_plugin')) return;
      this.requestUpdate();
    });

    await loadHaForm();
    this.userConfig = await fetchUsers(this.hass);

    // The brands image endpoint isn't cookie-authenticated, so a plain <img>
    // src can't reach it - it needs this signed, rotating token appended as
    // a query param, same as HA's own frontend does for brand images.
    try {
      const { token } = await this.hass.callWS<{ token: string }>({ type: 'brands/access_token' });
      this.brandToken = token;
    } catch (e) {
      // Brand mark is decorative - leave it unset and skip rendering it.
    }

    this.requestUpdate();
  }

  render() {
    if (!customElements.get('ha-panel-config') || !this.userConfig)
      return html`
        loading...
      `;

    const path = getPath();

    return html`
      <div class="header">
        <div class="toolbar">
          <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
          ${this.brandToken
            ? html`
                <img
                  class="brand-mark"
                  src="/api/brands/integration/${platform}/icon.png?token=${this.brandToken}"
                  alt=""
                  @error=${(ev: Event) => ((ev.target as HTMLElement).style.display = 'none')}
                />
              `
            : ''}
          <div class="main-title">
            ${localize('title', this.hass.language)}
          </div>
          <div class="version">
            v${VERSION}
          </div>
        </div>

        <ha-tab-group
          @wa-tab-show=${this.handlePageSelected}
        >
          ${Object.values(EMenuItems).map(e => html`
            <ha-tab-group-tab slot="nav" panel="${e}" .active=${path.page === e}>
              ${localize(`panels.${e}.title`, this.hass.language)}
            </ha-tab-group-tab>
          `)}
        </ha-tab-group>
      </div>
      <div class="view">
        ${this.getView(path)}
      </div>
    `;
  }

  getView(path: Path) {
    const page = path.page;

    switch (page) {
      case 'general':
        return html`
          <alarm-view-general .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-general>
        `;
      case 'sensors':
        return html`
          <alarm-view-sensors .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-sensors>
        `;
      case 'codes':
        return html`
          <alarm-view-codes .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-codes>
        `;
      default:
        return html`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a page from the menu above to continue.
            </div>
          </ha-card>
        `;
    }
  }

  handlePageSelected(ev: CustomEvent) {
    const newPage = ev.detail.name;
    if (newPage !== getPath().page) {
      navigate(this, exportPath(newPage));
      this.requestUpdate();
    } else {
      scrollTo(0, 0);
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle} :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }
      .header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
      }
      .toolbar {
        height: var(--header-height);
        display: flex;
        align-items: center;
        font-size: 20px;
        padding: 0 16px;
        font-weight: 400;
        box-sizing: border-box;
      }
      .brand-mark {
        height: 24px;
        width: 24px;
        margin-left: 24px;
      }
      .main-title {
        margin: 0 0 0 12px;
        line-height: 20px;
        flex-grow: 1;
      }
      ha-tab-group {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --ha-tab-active-text-color: var(--app-header-text-color, white);
        --ha-tab-indicator-color: var(--app-header-text-color, white);
        --ha-tab-track-color: transparent;
      }
      .view {
        height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
      }
      .view > * {
        width: 600px;
        max-width: 600px;
      }
      .view > *:last-child {
        margin-bottom: 20px;
      }
      .version {
        font-size: 14px;
        color: var(--primary-text-color);
      }
    `;
  }
}
