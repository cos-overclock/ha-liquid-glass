import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard, type BadgeStyle, type IconWellStyle } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clockTime } from "../i18n";
import { clamp, isUnavailable, pickEntity, supportsFeature } from "../utils";

export interface CoverCardConfig extends BaseCardConfig {
  /** Visual style; defaults from device_class (curtain → curtain, else blind). */
  style?: "blind" | "curtain";
  /** For curtain style: "double" (default) or "single". */
  curtain?: "double" | "single";
  show_tilt?: boolean;
}

const F = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8, SET_TILT: 128 };
const TRACK_H = 180;

/**
 * Cover card: illustrative position track (blind fabric or curtain panels) that can be
 * dragged to set the position, up / stop / down buttons, and an optional tilt slider.
 */
export class LiquidGlassCoverCard extends LiquidGlassBaseCard<CoverCardConfig> {
  @state() private dragPos: number | undefined;
  @state() private tiltPreview: number | undefined;
  /** Which panel of a double curtain the pointer grabbed, held for the whole drag. */
  private dragSide: "left" | "right" = "left";

  static override styles = [
    tokens,
    glassStyles,
    css`
      .card {
        gap: 16px;
      }
      .position-row {
        display: flex;
        gap: 12px;
      }
      .track {
        position: relative;
        flex: 1;
        min-width: 0;
        height: var(--lg-track-h, ${TRACK_H}px);
        border-radius: 20px;
        overflow: hidden;
        background: var(--lg-track-bg);
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.14),
          inset 0 0 0 1px var(--lg-glass-stroke);
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
      }
      .fabric,
      .panel {
        position: absolute;
        background: linear-gradient(180deg, #e6f8fc, #b9e9f3);
        box-shadow: 0 4px 10px rgba(10, 126, 164, 0.2);
        transition: height 0.25s ease, width 0.25s ease;
      }
      .fabric {
        left: 0;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 6px 14px;
      }
      .fabric span {
        height: 2px;
        border-radius: 1px;
        background: rgba(255, 255, 255, 0.7);
      }
      .panel {
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        padding: 14px 8px;
      }
      .panel.left {
        left: 0;
        box-shadow: 4px 0 10px rgba(10, 126, 164, 0.2);
      }
      .panel.right {
        right: 0;
        box-shadow: -4px 0 10px rgba(10, 126, 164, 0.2);
      }
      .panel span {
        width: 2px;
        border-radius: 1px;
        background: rgba(255, 255, 255, 0.7);
      }
      .handle {
        position: absolute;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        transition: top 0.25s ease, left 0.25s ease, right 0.25s ease;
      }
      .handle.h {
        left: 50%;
        width: 44px;
        height: 6px;
        margin-left: -22px;
      }
      .handle.v {
        top: 50%;
        width: 6px;
        height: 44px;
        margin-top: -22px;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 0 14px 18px;
        pointer-events: none;
      }
      .overlay.top {
        justify-content: flex-start;
        padding-top: 16px;
      }
      /* Double curtains part in the middle, so the readable gap is centred. */
      .overlay.center {
        align-items: center;
        padding-left: 12px;
        padding-right: 12px;
      }
      /* A single curtain gathers on the left, leaving the right side clear. */
      .overlay.right {
        align-items: flex-end;
        padding-left: 12px;
        padding-right: 16px;
      }
      .overlay .pv {
        font-family: var(--lg-font-ui);
        font-size: var(--lg-pos, 30px);
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: -1px;
        color: var(--pv-color, var(--lg-text-primary));
        font-variant-numeric: tabular-nums;
      }
      .overlay .pc {
        font-size: var(--lg-tick);
        font-weight: 500;
        color: var(--pc-color, var(--lg-text-secondary));
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-track-h: clamp(120px, 47cqi, ${TRACK_H}px);
          --lg-pos: clamp(20px, 8cqi, 30px);
        }
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .round-btn.active {
        background: rgba(43, 179, 208, 0.18);
        box-shadow: inset 0 0 0 1px rgba(43, 179, 208, 0.3);
        color: var(--lg-cover-accent-deep);
      }
      .round-btn.selected {
        background: var(--lg-segment-selected);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
      }
      .round-btn.stop lg-icon {
        --mdc-icon-size: 18px;
      }
      .tilt lg-slider {
        --lg-slider-fill: linear-gradient(90deg, rgba(43, 179, 208, 0.2), rgba(43, 179, 208, 0.65));
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["cover"], hass, entities, entitiesFallback, (e) => Boolean(((e.attributes.supported_features as number) ?? 0) & F.SET_POSITION)) };
  }

  override getCardSize(): number {
    return 4;
  }

  private get position(): number {
    if (this.dragPos !== undefined) return this.dragPos;
    const p = this.entity?.attributes.current_position as number | undefined;
    if (p !== undefined) return p;
    return this.entity?.state === "closed" ? 0 : 100;
  }

  private get styleKind(): "blind" | "curtain" {
    if (this.config.style) return this.config.style;
    return this.entity?.attributes.device_class === "curtain" ? "curtain" : "blind";
  }

  private get curtainKind(): "double" | "single" {
    return this.config.curtain ?? "double";
  }

  private get moving(): "opening" | "closing" | undefined {
    const s = this.entity?.state;
    return s === "opening" || s === "closing" ? s : undefined;
  }

  private get canSetPosition(): boolean {
    return supportsFeature(this.entity, F.SET_POSITION);
  }

  private get hasTilt(): boolean {
    if (this.config.show_tilt === false) return false;
    return supportsFeature(this.entity, F.SET_TILT) && this.entity?.attributes.current_tilt_position !== undefined;
  }

  private stateText(): string {
    const t = this.t;
    const e = this.entity!;
    const pos = this.position;
    if (this.moving) return `${t(this.moving)} · ${pos}% → ${this.moving === "opening" ? 100 : 0}%`;
    if (e.state === "closed" || pos === 0) return `${t("is_closed")} · ${t("last_change", { t: clockTime(e.last_changed) })}`;
    return `${t("position")} ${pos}% · ${t("stopped")}`;
  }

  private posFromEvent(e: PointerEvent): number {
    const track = this.shadowRoot?.querySelector(".track") as HTMLElement | null;
    if (!track) return this.position;
    const r = track.getBoundingClientRect();
    // `closed` is how much of the track the cover hides: 0 = fully open, 1 = fully closed.
    // It is measured so the edge the user grabs follows the pointer.
    let closed: number;
    if (this.styleKind === "blind") {
      // Fabric hangs from the top; its lower edge sits at `closed` of the height.
      closed = (e.clientY - r.top) / r.height;
    } else if (this.curtainKind === "single") {
      // One panel anchored left; its right edge sits at `closed` of the width.
      closed = (e.clientX - r.left) / r.width;
    } else {
      // Two panels meeting in the middle; each is `closed / 2` wide, so the grabbed
      // panel's inner edge sits at the pointer's distance from that panel's own side.
      // The side is latched at pointerdown: measuring from whichever side is nearer
      // would flip to the other panel once the pointer crosses the centre, which reads
      // as the curtain re-opening just as it finishes closing.
      const fromOwnSide = this.dragSide === "right" ? r.right - e.clientX : e.clientX - r.left;
      closed = (2 * fromOwnSide) / r.width;
    }
    return Math.round(clamp(1 - closed, 0, 1) * 100);
  }

  private onDown = (e: PointerEvent) => {
    if (!this.canSetPosition || e.button !== 0) return;
    e.preventDefault();
    const track = e.currentTarget as HTMLElement;
    track.setPointerCapture(e.pointerId);
    const r = track.getBoundingClientRect();
    this.dragSide = e.clientX < r.left + r.width / 2 ? "left" : "right";
    this.dragPos = this.posFromEvent(e);
  };
  private onMove = (e: PointerEvent) => {
    if (this.dragPos === undefined) return;
    this.dragPos = this.posFromEvent(e);
  };
  private onUp = (e: PointerEvent) => {
    if (this.dragPos === undefined) return;
    const p = this.posFromEvent(e);
    this.dragPos = undefined;
    this.callService("cover", "set_cover_position", { position: p });
  };

  private renderTrackVisual(pos: number) {
    const closedRatio = 1 - pos / 100;
    if (this.styleKind === "blind") {
      // Percentages, not pixels: the track height now scales with the card width.
      const h = `${closedRatio * 100}%`;
      return html`<div class="fabric" style=${styleMap({ height: h })}>
          ${[0, 1, 2, 3, 4].map(() => html`<span></span>`)}
        </div>
        ${pos > 0 ? html`<div class="handle h" style=${styleMap({ top: `max(4px, calc(${h} - 13px))` })}></div>` : nothing}`;
    }
    if (this.curtainKind === "single") {
      return html`<div class="panel left" style=${styleMap({ width: `${closedRatio * 100}%` })}>
          ${[0, 1, 2].map(() => html`<span></span>`)}
        </div>
        <div class="handle v" style=${styleMap({ left: `calc(${closedRatio * 100}% - 13px)` })}></div>`;
    }
    const w = `${(closedRatio * 100) / 2}%`;
    return html`<div class="panel left" style=${styleMap({ width: w })}>${[0, 1, 2].map(() => html`<span></span>`)}</div>
      <div class="panel right" style=${styleMap({ width: w })}>${[0, 1, 2].map(() => html`<span></span>`)}</div>
      <div class="handle v" style=${styleMap({ left: `calc(${w} - 13px)` })}></div>
      <div class="handle v" style=${styleMap({ right: `calc(${w} - 13px)` })}></div>`;
  }

  private buttonIcons(): [string, string] {
    if (this.styleKind === "curtain") {
      return this.curtainKind === "double" ? ["mdi:arrow-expand-horizontal", "mdi:arrow-collapse-horizontal"] : ["mdi:chevron-double-left", "mdi:chevron-double-right"];
    }
    return ["mdi:chevron-up", "mdi:chevron-down"];
  }

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const t = this.t;
    const pos = this.position;
    const closed = pos === 0 && !this.moving;
    const moving = this.moving;
    const isCurtain = this.styleKind === "curtain";
    const [upIcon, downIcon] = this.buttonIcons();
    const well: IconWellStyle | undefined = closed ? undefined : { from: "#8FE3F4", to: "var(--lg-cover-accent-deep)", glow: "rgba(43,179,208,0.24)" };
    const badge: BadgeStyle | undefined = closed ? undefined : { color: "var(--lg-cover-badge)", bg: "rgba(43,179,208,0.18)", stroke: "rgba(43,179,208,0.3)" };
    const badgeLabel = moving ? t("moving") : closed ? t("closed") : t("open");
    const icon = this.config.icon ?? entity.attributes.icon ?? (isCurtain ? "mdi:curtains" : "mdi:blinds-horizontal");
    const caption = moving ? `${t(moving)}…` : closed ? t("is_closed") : t("is_open");
    const singleCurtain = isCurtain && this.curtainKind === "single";
    // Fully closed means the cover itself sits behind the readout, whatever the style,
    // so the text has to flip to the dark ink that reads against the fabric.
    const overlayOnFabric = closed || (!isCurtain && moving === "opening" && pos < 60);
    const overlayTop = !isCurtain && moving === "opening" && pos < 60 && !closed;
    const tilt = this.tiltPreview ?? ((entity.attributes.current_tilt_position as number | undefined) ?? 50);
    const tiltDeg = Math.round((tilt / 100) * 180 - 90);

    return html`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(icon, well)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderBadge(badgeLabel, badge)}
        </div>

        <div class="position-row">
          <div class="track" @pointerdown=${this.onDown} @pointermove=${this.onMove} @pointerup=${this.onUp} @pointercancel=${this.onUp}>
            ${this.renderTrackVisual(pos)}
            <div
              class=${classMap({ overlay: true, center: isCurtain && !singleCurtain, right: singleCurtain, top: overlayTop })}
              style=${styleMap(overlayOnFabric ? { "--pv-color": "#0B3A46", "--pc-color": "rgba(11,58,70,0.7)" } : {})}
            >
              <span class="pv">${pos}%</span>
              <span class="pc">${caption}</span>
            </div>
          </div>
          <div class="buttons">
            <button class=${classMap({ "round-btn": true, active: moving === "opening" })} @click=${() => this.callService("cover", "open_cover")} title="Open">
              <lg-icon .icon=${upIcon}></lg-icon>
            </button>
            <button class=${classMap({ "round-btn": true, stop: true, selected: Boolean(moving) })} @click=${() => this.callService("cover", "stop_cover")} title="Stop">
              <lg-icon icon="mdi:square-outline"></lg-icon>
            </button>
            <button class=${classMap({ "round-btn": true, active: moving === "closing" })} @click=${() => this.callService("cover", "close_cover")} title="Close">
              <lg-icon .icon=${downIcon}></lg-icon>
            </button>
          </div>
        </div>

        ${this.hasTilt
          ? html`<div class="section tilt">
              <div class="label-row"><span class="label">${t("tilt")}</span><span class="value">${tiltDeg}°</span></div>
              <lg-slider
                variant="thumb"
                .refraction=${this.refraction}
                .shaderPalette=${["#72d4ef", "#dce5ec", "#79d6e8", "#33515b"]}
                .value=${tilt}
                min="0"
                max="100"
                step="1"
                .fillFrom=${0.5}
                .showFill=${!closed}
                @lg-input=${(e: CustomEvent) => (this.tiltPreview = e.detail.value)}
                @lg-change=${(e: CustomEvent) => {
                  this.tiltPreview = undefined;
                  this.callService("cover", "set_cover_tilt_position", { tilt_position: Math.round(e.detail.value) });
                }}
              ></lg-slider>
              <div class="ticks"><span>−90°</span><span>0°</span><span>90°</span></div>
            </div>`
          : nothing}
      </div>`;
  }
}

if (!customElements.get("liquid-glass-cover-card")) customElements.define("liquid-glass-cover-card", LiquidGlassCoverCard);
