import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { dialogStyle } from '../styles';
import { localize } from '../../localize/localize';
import { HomeAssistant } from '../types';
import { previewAlarmoImport, applyAlarmoImport, AlarmoImportPreview } from '../data/websockets';
import { handleError } from '../helpers';
import { Dictionary } from '../types';

@customElement('import-alarmo-dialog')
export class ImportAlarmoDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: any;
  @state() private preview?: AlarmoImportPreview;
  @state() private result?: Dictionary<string>;

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    this.result = undefined;
    try {
      this.preview = await previewAlarmoImport(this.hass);
    } catch (e) {
      // Without this, a failed preview left _params set but preview
      // undefined - render()'s guard on both meant the dialog "opened"
      // with nothing visible at all, and no error ever reached the user.
      this._params = undefined;
      handleError(e, this);
      return;
    }
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
    this.preview = undefined;
    this.result = undefined;
  }

  render() {
    if (!this._params || !this.preview) return html``;
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
          <div slot="title">${localize('panels.general.dialogs.import_alarmo.title', this.hass.language)}</div>
        </ha-dialog-header>
        <div class="wrapper">
          ${this.result ? this.renderResult() : this.renderPreview()}
        </div>
        <ha-dialog-footer slot="footer">
          ${!this.result && this.preview.available
        ? html`
                <ha-button appearance="plain" slot="primaryAction" @click=${this.applyClick}>
                  ${localize('panels.general.dialogs.import_alarmo.actions.import', this.hass.language)}
                </ha-button>
              `
        : ''}
          <ha-button appearance="plain" slot="secondaryAction" @click=${this.closeDialog}>
            ${this.hass.localize(this.result ? 'ui.common.close' : 'ui.common.cancel')}
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    `;
  }

  private renderPreview() {
    if (!this.preview!.available) {
      return html`
        <p>${localize('panels.general.dialogs.import_alarmo.not_available', this.hass.language)}</p>
      `;
    }
    return html`
      <p>${localize('panels.general.dialogs.import_alarmo.description', this.hass.language)}</p>
      <ul>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.areas', this.hass.language)}: ${this.preview!.areas}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.users', this.hass.language)}: ${this.preview!.users}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.sensor_groups', this.hass.language)}: ${this.preview!.sensor_groups}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.sensors', this.hass.language)}: ${this.preview!.sensors}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.automations_skipped', this.hass.language)}: ${this.preview!.automations_skipped}</li>
      </ul>
    `;
  }

  private renderResult() {
    const reason = html`
      <p>${localize(`panels.general.dialogs.import_alarmo.reason.${this.result!.reason}`, this.hass.language)}</p>
    `;
    if (this.result!.reason !== 'import_complete') return reason;
    return html`
      ${reason}
      <ul>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.areas', this.hass.language)}: ${this.result!.areas}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.users', this.hass.language)}: ${this.result!.users}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.sensor_groups', this.hass.language)}: ${this.result!.sensor_groups}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.sensors', this.hass.language)}: ${this.result!.sensors}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.sensors_skipped', this.hass.language)}: ${this.result!.sensors_skipped}</li>
        <li>${localize('panels.general.dialogs.import_alarmo.summary.automations_skipped', this.hass.language)}: ${this.result!.automations_skipped}</li>
      </ul>
    `;
  }

  private async applyClick(ev: Event) {
    if (!this.preview?.flow_id) return;
    try {
      this.result = await applyAlarmoImport(this.hass, this.preview.flow_id);
    } catch (e) {
      handleError(e, ev);
    }
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
