import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

/**
 * Icon wrapper. Uses Home Assistant's <ha-icon> (mdi:*) when available so icons
 * follow the frontend icon set; falls back to nothing outside HA.
 */
export class LgIcon extends LitElement {
  @property() icon = "";

  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      color: inherit;
      flex: none;
    }
    ha-icon {
      display: flex;
      --mdc-icon-size: inherit;
    }
  `;

  override render() {
    return html`<ha-icon .icon=${this.icon}></ha-icon>`;
  }
}

if (!customElements.get("lg-icon")) customElements.define("lg-icon", LgIcon);

declare global {
  interface HTMLElementTagNameMap {
    "lg-icon": LgIcon;
  }
}
