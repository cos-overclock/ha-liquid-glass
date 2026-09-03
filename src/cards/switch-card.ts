import { html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { LiquidGlassBaseCard } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { relativeTime } from "../i18n";
import { formatNumber, isUnavailable, pickEntity } from "../utils";

export interface SwitchCardConfig extends BaseCardConfig {
  /** Optional power sensor shown in the state line while on. */
  power_entity?: string;
}

/** How long the card must be held before it opens more-info instead of toggling. */
const HOLD_MS = 500;
/** Movement past this many pixels means the gesture was a scroll, not a tap. */
const HOLD_SLOP = 10;

/**
 * Switch card: single row. Tapping anywhere on the card toggles the entity, holding it
 * opens more-info. On → brighter active glass tint + blue icon well. Off → neutral well.
 */
export class LiquidGlassSwitchCard extends LiquidGlassBaseCard<SwitchCardConfig> {
  private holdTimer: number | undefined;
  private holdOrigin: { x: number; y: number } | undefined;
  private heldOpen = false;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .card {
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
      }
      .card:focus-visible {
        outline: 2px solid var(--lg-switch-accent);
        outline-offset: 2px;
      }
      /* The whole card is the control, so the title must not look separately clickable. */
      .title {
        cursor: inherit;
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["switch", "input_boolean", "fan", "light", "automation", "humidifier", "siren", "remote"], hass, entities, entitiesFallback) };
  }

  override getCardSize(): number {
    return 1;
  }

  private get isOn(): boolean {
    return this.entity?.state === "on";
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.cancelHold();
  }

  private toggle = () => {
    if (!this.config.entity) return;
    const domain = this.config.entity.split(".")[0];
    const supportsToggle = ["switch", "light", "fan", "input_boolean", "automation", "humidifier", "siren", "remote"].includes(domain);
    if (supportsToggle) this.callService(domain, "toggle");
    else this.callService("homeassistant", "toggle");
  };

  private cancelHold(): void {
    if (this.holdTimer !== undefined) window.clearTimeout(this.holdTimer);
    this.holdTimer = undefined;
    this.holdOrigin = undefined;
  }

  private onPointerDown = (e: PointerEvent): void => {
    if (e.button !== 0) return;
    this.heldOpen = false;
    this.holdOrigin = { x: e.clientX, y: e.clientY };
    this.holdTimer = window.setTimeout(() => {
      this.heldOpen = true;
      this.cancelHold();
      this.openMoreInfo();
    }, HOLD_MS);
  };

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.holdOrigin) return;
    if (Math.abs(e.clientX - this.holdOrigin.x) > HOLD_SLOP || Math.abs(e.clientY - this.holdOrigin.y) > HOLD_SLOP) {
      this.cancelHold();
    }
  };

  private onClick = (): void => {
    this.cancelHold();
    // A hold already opened more-info; the click that follows it must not also toggle.
    if (this.heldOpen) {
      this.heldOpen = false;
      return;
    }
    this.toggle();
  };

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    this.toggle();
  };

  private stateText(): string {
    const t = this.t;
    const entity = this.entity!;
    if (this.isOn) {
      const power = this.config.power_entity ? this.hass?.states[this.config.power_entity] : undefined;
      if (power && !isUnavailable(power)) {
        const unit = power.attributes.unit_of_measurement ?? "W";
        return `${t("on")} · ${t("power")} ${formatNumber(this.hass, Number(power.state), 0)} ${unit}`;
      }
      return `${t("on")} · ${t("since", { t: relativeTime(entity.last_changed, t) })}`;
    }
    return `${t("off")} · ${t("last_on")} ${relativeTime(entity.last_changed, t)}`;
  }

  private defaultIcon(): string {
    const domain = this.config.entity?.split(".")[0];
    if (domain === "fan") return "mdi:fan";
    if (domain === "light") return "mdi:lightbulb";
    if (domain === "automation") return "mdi:robot";
    return "mdi:power-plug";
  }

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const on = this.isOn;
    const well = on ? { from: "var(--lg-switch-accent-light)", to: "var(--lg-switch-accent)", glow: "rgba(10,132,255,0.24)" } : undefined;

    return html`${this.renderDefs()}
      <div
        class=${classMap({ glass: true, card: true, row: true, active: on })}
        role="switch"
        aria-checked=${on}
        aria-label=${this.entityName}
        tabindex="0"
        @click=${this.onClick}
        @keydown=${this.onKeyDown}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${() => this.cancelHold()}
        @pointercancel=${() => this.cancelHold()}
        @pointerleave=${() => this.cancelHold()}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        ${this.renderIconWell(this.config.icon ?? entity.attributes.icon ?? this.defaultIcon(), well, null)}
        <div class="title">
          <div class="name">${this.entityName}</div>
          <div class="state">${this.stateText()}</div>
        </div>
      </div>`;
  }
}

if (!customElements.get("liquid-glass-switch-card")) customElements.define("liquid-glass-switch-card", LiquidGlassSwitchCard);
