import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { loadHaForm } from '../../load-ha-elements';
import { HomeAssistant } from '../../types';
import { Path } from '../../common/navigation';

import './alarm-mode-card';
import './area-config-card.ts';

@customElement('alarm-view-general')
export class AlarmViewGeneral extends LitElement {
  hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: Path;

  firstUpdated() {
    (async () => await loadHaForm())();
  }

  render() {
    if (!this.hass) return html``;

    return html`
      <alarm-mode-card .hass=${this.hass} .narrow=${this.narrow}></alarm-mode-card>
      <area-config-card .hass=${this.hass} .narrow=${this.narrow}></area-config-card>
    `;
  }
}
