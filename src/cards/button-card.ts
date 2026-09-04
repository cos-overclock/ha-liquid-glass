import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { LiquidGlassBaseCard, type IconWellStyle } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { clockTime, relativeTime } from "../i18n";
import { isUnavailable, lighten, pickEntity, withAlpha } from "../utils";

export interface ButtonCardConfig extends BaseCardConfig {
  /** "domain.service" to call instead of the domain's usual activation. */
  service?: string;
  service_data?: Record<string, unknown>;
  /** Accent hex colour for the icon well. */
  accent?: string;
  /** Line under the name. Defaults to the kind of thing plus when it last ran. */
  subtitle?: string;
}

/**
 * Icon well gradients exactly as the design paints them: a light top over a saturated
 * bottom. Computing the deep end by darkening the accent turns these muddy, because
 * multiplying towards black drains the saturation these need to keep.
 */
export const WELLS = [
  { from: "#FFD36B", to: "#FF8A1F" },
  { from: "#9E9CFF", to: "#5E5CE6" },
  { from: "#FF9BC2", to: "#E0417F" },
  { from: "#8FE3F4", to: "#0A7EA4" },
  { from: "#7EE8A0", to: "#1E9E4A" },
  { from: "#FFB39B", to: "#E05A2B" },
] as const;

/** A single configured accent still has to make a pair; the light end is derived. */
export function wellFor(accent: string | undefined, fallback: { from: string; to: string }): IconWellStyle {
  const pair = accent ? { from: lighten(accent, 0.45), to: accent } : fallback;
  return { ...pair, glow: withAlpha(pair.to, 0.3) };
}

/** Domains this card knows how to press, and what each one is called. */
const ACTIVATE: Record<string, { service: string; icon: string; well: { from: string; to: string }; label: string }> = {
  scene: { service: "scene.turn_on", icon: "mdi:palette", well: WELLS[0], label: "btn_scene" },
  script: { service: "script.turn_on", icon: "mdi:script-text-play", well: WELLS[1], label: "btn_script" },
  automation: { service: "automation.trigger", icon: "mdi:robot", well: WELLS[3], label: "btn_automation" },
  button: { service: "button.press", icon: "mdi:gesture-tap-button", well: WELLS[3], label: "btn_button" },
  input_button: { service: "input_button.press", icon: "mdi:gesture-tap-button", well: WELLS[3], label: "btn_button" },
};

/** How long the tick stays up after a press, matching the design's Done state. */
const DONE_MS = 2600;

/**
 * Button card: one row that runs a scene, script, automation or button, with a trailing
 * action that turns into a tick for a moment once it has fired.
 */
export class LiquidGlassButtonCard extends LiquidGlassBaseCard<ButtonCardConfig> {
  @state() private justRan = false;
  private doneTimer: number | undefined;

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
        outline: 2px solid var(--lg-slider-accent);
        outline-offset: 2px;
      }
      .title {
        cursor: inherit;
      }
      .action {
        flex: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        color: var(--lg-text-primary);
        --mdc-icon-size: 16px;
        transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
      }
      .action.done {
        background: rgba(48, 209, 88, 0.18);
        box-shadow: inset 0 0 0 1px rgba(48, 209, 88, 0.3);
        color: var(--lg-lock-locked-deep);
      }
      .card:active .action {
        background: var(--lg-segment-selected);
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(Object.keys(ACTIVATE), hass, entities, entitiesFallback) };
  }

  override getCardSize(): number {
    return 1;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.doneTimer);
  }

  private get domain(): string {
    return this.config.entity?.split(".")[0] ?? "";
  }

  private get spec() {
    return ACTIVATE[this.domain];
  }

  /** When the thing last ran: scenes keep it in the state, the rest in an attribute. */
  private lastRun(entity: HassEntity): string | undefined {
    const attr = entity.attributes.last_triggered as string | undefined;
    if (attr) return attr;
    // A scene's state is the timestamp it was last applied, or "unknown".
    const asDate = Date.parse(entity.state);
    return Number.isNaN(asDate) ? undefined : entity.state;
  }

  private subtitle(entity: HassEntity): string {
    if (this.config.subtitle !== undefined) return this.config.subtitle;
    const t = this.t;
    if (this.justRan) return `${t("btn_done")} · ${t("just_now")}`;

    const kind = this.spec ? t(this.spec.label) : this.domain;
    const last = this.lastRun(entity);
    if (!last) return kind;
    // Within the day the clock time is more use than "17 hours ago".
    const age = Date.now() - new Date(last).getTime();
    const when = age < 12 * 3600 * 1000 ? relativeTime(last, t) : clockTime(last);
    return `${kind} · ${t("last")} ${when}`;
  }

  private press = (): void => {
    const [domain, service] = (this.config.service ?? this.spec?.service ?? "").split(".");
    if (!domain || !service) return;
    void this.hass?.callService(domain, service, { entity_id: this.config.entity, ...(this.config.service_data ?? {}) });

    this.justRan = true;
    window.clearTimeout(this.doneTimer);
    this.doneTimer = window.setTimeout(() => (this.justRan = false), DONE_MS);
  };

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    this.press();
  };

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();

    const well = wellFor(this.config.accent, this.spec?.well ?? WELLS[0]);
    const icon = this.config.icon ?? (entity.attributes.icon as string | undefined) ?? this.spec?.icon ?? "mdi:gesture-tap-button";

    return html`${this.renderDefs()}
      <div
        class="glass card row"
        role="button"
        tabindex="0"
        aria-label=${this.entityName}
        @click=${this.press}
        @keydown=${this.onKeyDown}
      >
        ${this.renderCardSurface()}
        ${this.renderIconWell(icon, well, null)}
        <div class="title">
          <div class="name">${this.entityName}</div>
          <div class="state">${this.subtitle(entity)}</div>
        </div>
        <div class=${classMap({ action: true, done: this.justRan })}>
          <lg-icon .icon=${this.justRan ? "mdi:check" : "mdi:play"}></lg-icon>
        </div>
      </div>`;
  }
}

if (!customElements.get("liquid-glass-button-card")) customElements.define("liquid-glass-button-card", LiquidGlassButtonCard);

export { ACTIVATE as BUTTON_DOMAINS };
