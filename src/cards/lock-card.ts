import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard, type BadgeStyle, type IconWellStyle } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clockTime, relativeTime } from "../i18n";
import { clamp, isUnavailable, pickEntity } from "../utils";

export interface LockActionButton {
  name: string;
  icon?: string;
  /** "domain.service" */
  service: string;
  data?: Record<string, unknown>;
}

export interface LockCardConfig extends BaseCardConfig {
  /** Optional chip buttons under the slider (e.g. open door, activity). */
  buttons?: LockActionButton[];
}

const THUMB = 64;
const PAD = 0;

/**
 * Lock card: slide-to-unlock / slide-to-lock control with a liquid-glass thumb.
 * Jammed → control disabled, amber warning styling.
 */
export class LiquidGlassLockCard extends LiquidGlassBaseCard<LockCardConfig> {
  @state() private dragRatio: number | undefined;
  @state() private pending = false;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .card {
        gap: 16px;
      }
      .slide {
        --thumb: ${THUMB}px;
        position: relative;
        height: calc(var(--thumb) + ${PAD * 2}px);
        border-radius: 999px;
        padding: ${PAD}px;
        background: var(--lg-track-bg);
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.14),
          inset 0 0 0 1px var(--lg-glass-stroke);
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        overflow: hidden;
      }
      .slide.disabled {
        opacity: 0.55;
        pointer-events: none;
      }
      .hint {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        /* The thumb parks at either end, so keep that much clear on both sides. */
        padding: 0 var(--thumb);
        font-size: var(--lg-hint, 14px);
        font-weight: 500;
        color: var(--lg-text-secondary);
        pointer-events: none;
        transition: opacity 0.15s ease;
        white-space: nowrap;
      }
      .hint > span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hint lg-icon {
        flex: none;
        --mdc-icon-size: 18px;
      }
      /* The arrow is decoration; the words matter more once space runs out. */
      @container (max-width: 300px) {
        .hint lg-icon {
          display: none;
        }
      }
      .thumb {
        position: absolute;
        top: ${PAD}px;
        width: var(--thumb);
        height: var(--thumb);
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: grab;
        background: rgba(255, 255, 255, 0.56);
        -webkit-backdrop-filter: blur(12px) saturate(1.35);
        backdrop-filter: blur(12px) saturate(1.35);
        box-shadow:
          0 5px 14px rgba(0, 0, 0, 0.6),
          0 1px 3px rgba(255, 255, 255, 0.4),
          inset 0 0 0 1.5px #fff;
        transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        --mdc-icon-size: calc(var(--thumb) * 0.43);
      }
      :host([refraction]) .thumb {
        -webkit-backdrop-filter: url(#lg-slider-knob);
        backdrop-filter: url(#lg-slider-knob);
      }
      .thumb:has(> .lg-control-shader) {
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        box-shadow: 0 5px 14px rgba(0, 0, 0, 0.38);
      }
      .thumb > lg-icon {
        position: relative;
        z-index: 1;
      }
      .thumb.dragging {
        transition: none;
        cursor: grabbing;
      }
      .thumb lg-icon {
        color: var(--thumb-color);
      }
      .chips .chip {
        flex: 1;
        justify-content: center;
        padding: 12px 10px;
        font-size: var(--lg-label);
        font-weight: 600;
        border-radius: 22px;
      }
      .chips .chip lg-icon {
        --mdc-icon-size: clamp(15px, 4.7cqi, 18px);
        width: clamp(15px, 4.7cqi, 18px);
        height: clamp(15px, 4.7cqi, 18px);
      }
      @supports (container-type: inline-size) {
        .slide {
          --thumb: clamp(40px, 16.8cqi, ${THUMB}px);
        }
        .card {
          --lg-hint: clamp(11.5px, 3.7cqi, 14px);
        }
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["lock"], hass, entities, entitiesFallback) };
  }

  override getCardSize(): number {
    return 2;
  }

  private get lockState(): string {
    return this.entity?.state ?? "unknown";
  }

  private get isLocked(): boolean {
    return this.lockState === "locked" || this.lockState === "locking";
  }

  private get busy(): boolean {
    return this.pending || this.lockState === "locking" || this.lockState === "unlocking";
  }

  private get jammed(): boolean {
    return this.lockState === "jammed";
  }

  private visual(): { icon: string; well?: IconWellStyle; badge?: BadgeStyle; badgeLabel: string; thumbColor: string; hint: string; state: string } {
    const t = this.t;
    const e = this.entity!;
    const rel = relativeTime(e.last_changed, t);
    if (this.jammed) {
      return {
        icon: "mdi:alert",
        well: { from: "#FFE66B", to: "var(--lg-warn-deep)", glow: "rgba(255,214,10,0.24)" },
        badge: { color: "var(--lg-warn-text)", bg: "rgba(255,214,10,0.24)", stroke: "rgba(230,168,0,0.3)", glow: "var(--lg-warn)" },
        badgeLabel: t("jammed"),
        thumbColor: "var(--lg-warn-text)",
        hint: t("cannot_operate"),
        state: t("jammed_state"),
      };
    }
    if (this.isLocked) {
      return {
        icon: "mdi:lock",
        well: { from: "#7EE8A0", to: "var(--lg-lock-locked-deep)", glow: "rgba(48,209,88,0.24)" },
        badge: { color: "var(--lg-lock-locked-deep)", bg: "rgba(30,158,74,0.18)", stroke: "rgba(30,158,74,0.3)" },
        badgeLabel: t("locked"),
        thumbColor: "var(--lg-lock-locked-deep)",
        hint: t("slide_to_unlock"),
        state: this.lockState === "locking" ? t("locking") : `${t("is_locked")} · ${t("auto_locked_at", { t: clockTime(e.last_changed) })}`,
      };
    }
    return {
      icon: "mdi:lock-open-variant",
      well: { from: "var(--lg-lock-unlocked)", to: "var(--lg-lock-unlocked-deep)", glow: "rgba(255,59,48,0.24)" },
      badge: { color: "var(--lg-lock-unlocked-deep)", bg: "rgba(255,59,48,0.18)", stroke: "rgba(255,59,48,0.3)" },
      badgeLabel: t("unlocked"),
      thumbColor: "var(--lg-lock-unlocked-deep)",
      hint: t("slide_to_lock"),
      state: this.lockState === "unlocking" ? t("unlocking") : `${t("is_unlocked")} · ${rel}`,
    };
  }

  private ratioFromEvent(e: PointerEvent): number {
    const track = this.shadowRoot?.querySelector(".slide") as HTMLElement | null;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    // The thumb shrinks with the card, so measure it rather than assuming the design size.
    const thumb = (this.shadowRoot?.querySelector(".thumb") as HTMLElement | null)?.offsetWidth || THUMB;
    const usable = rect.width - PAD * 2 - thumb;
    if (usable <= 0) return 0;
    return clamp((e.clientX - rect.left - PAD - thumb / 2) / usable, 0, 1);
  }

  private onDown = (e: PointerEvent) => {
    if (this.jammed || this.busy || e.button !== 0) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.dragRatio = this.ratioFromEvent(e);
  };

  private onMove = (e: PointerEvent) => {
    if (this.dragRatio === undefined) return;
    this.dragRatio = this.ratioFromEvent(e);
  };

  private onUp = (e: PointerEvent) => {
    if (this.dragRatio === undefined) return;
    const ratio = this.ratioFromEvent(e);
    this.dragRatio = undefined;
    if (this.isLocked && ratio >= 0.8) this.trigger("unlock");
    else if (!this.isLocked && ratio <= 0.2) this.trigger("lock");
  };

  private trigger(service: "lock" | "unlock") {
    this.pending = true;
    this.callService("lock", service);
    window.setTimeout(() => (this.pending = false), 4000);
  }

  private runButton(b: LockActionButton) {
    const [domain, service] = b.service.split(".");
    void this.hass?.callService(domain, service, { entity_id: this.config.entity, ...(b.data ?? {}) });
  }

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const v = this.visual();
    const locked = this.isLocked;
    const dragging = this.dragRatio !== undefined;
    const ratio = dragging ? this.dragRatio! : locked ? 0 : 1;
    const hintOpacity = dragging ? 1 - Math.abs(ratio - (locked ? 0 : 1)) * 1.6 : 1;
    const buttons = this.config.buttons ?? [];

    return html`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? v.icon, v.well)}
          ${this.renderTitle(this.entityName, v.state)}
          ${this.renderBadge(v.badgeLabel, v.badge)}
        </div>

        <div
          class=${classMap({ slide: true, disabled: this.jammed || this.busy })}
          @pointerdown=${this.onDown}
          @pointermove=${this.onMove}
          @pointerup=${this.onUp}
          @pointercancel=${this.onUp}
        >
          <div class="hint" style=${styleMap({ opacity: String(clamp(hintOpacity, 0, 1)) })}>
            ${!locked && !this.jammed ? html`<lg-icon icon="mdi:chevron-double-left"></lg-icon>` : nothing}
            <span>${v.hint}</span>
            ${locked && !this.jammed ? html`<lg-icon icon="mdi:chevron-double-right"></lg-icon>` : nothing}
          </div>
          <div
            class=${classMap({ thumb: true, dragging })}
            style=${styleMap({
              left: `calc(${PAD}px + (100% - ${PAD * 2}px - var(--thumb)) * ${ratio})`,
              "--thumb-color": v.thumbColor,
            })}
          >
            ${this.renderControlSurface()}
            <lg-icon .icon=${v.icon}></lg-icon>
          </div>
        </div>

        ${buttons.length
          ? html`<div class="chips">
              ${buttons.map(
                (b) => html`<button class="chip" @click=${() => this.runButton(b)}>
                  ${this.renderControlSurface(undefined, "pill")}
                  ${b.icon ? html`<lg-icon .icon=${b.icon}></lg-icon>` : nothing}<span>${b.name}</span>
                </button>`,
              )}
            </div>`
          : nothing}
      </div>`;
  }
}

if (!customElements.get("liquid-glass-lock-card")) customElements.define("liquid-glass-lock-card", LiquidGlassLockCard);
