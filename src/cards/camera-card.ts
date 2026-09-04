import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { relativeTime } from "../i18n";
import { isUnavailable, pickEntity } from "../utils";

export interface CameraCardConfig extends BaseCardConfig {
  /** Binary sensor whose state drives the motion chip. Omit to hide it. */
  motion_entity?: string;
  /** Row under the feed with the motion chip and history button (default true). */
  show_actions?: boolean;
  /** Two-way audio button. Needs a service, since nothing sensible can be guessed. */
  show_mic?: boolean;
  mic_service?: string;
  /** "domain.service" for the snapshot button. Defaults to opening the still image. */
  snapshot_service?: string;
  /** Seconds between still refreshes (default 10). */
  refresh_interval?: number;
  /** Feed aspect ratio as width / height (default 16 / 9). */
  aspect_ratio?: number;
}

const DEFAULT_REFRESH = 10;

/**
 * Camera card: the still from `entity_picture` under a scrim, with the name, state and
 * controls floating on top, and an optional motion / history row beneath.
 *
 * Home Assistant's live stream lives in an internal element the frontend does not expose to
 * custom cards, so the feed is the still image on a timer. Expanding opens more-info, which
 * is where the real stream plays.
 */
export class LiquidGlassCameraCard extends LiquidGlassBaseCard<CameraCardConfig> {
  /** Bumped on a timer to force the browser to re-request the still. */
  @state() private tick = 0;
  private timer: number | undefined;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .card {
        padding: 0;
        gap: 0;
      }
      .feed {
        position: relative;
        width: 100%;
        aspect-ratio: var(--lg-cam-ratio, 16 / 9);
        overflow: hidden;
        background: #0e1014;
        background-size: cover;
        background-position: center;
      }
      /* Darkens the top and bottom just enough for white text to hold up. */
      .scrim {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.6) 0%,
          rgba(0, 0, 0, 0) 42%,
          rgba(0, 0, 0, 0) 62%,
          rgba(0, 0, 0, 0.65) 100%
        );
        pointer-events: none;
      }
      .bar {
        position: absolute;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 0 14px;
        height: 56px;
      }
      .bar.top {
        top: 0;
      }
      .bar.bottom {
        bottom: 0;
      }
      .trail {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Controls floating on the feed get their own dark glass. */
      .float {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        border: 0;
        padding: 0;
        color: #fff;
        background: rgba(11, 11, 15, 0.34);
        -webkit-backdrop-filter: blur(5px) saturate(1.35);
        backdrop-filter: blur(5px) saturate(1.35);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
      }
      :host([refraction]) .float {
        -webkit-backdrop-filter: url(#lg-knob);
        backdrop-filter: url(#lg-knob);
      }
      .float:has(> .lg-control-shader) {
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
      }
      .float > :not(.lg-control-shader) {
        position: relative;
        z-index: 1;
      }
      .round {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: pointer;
        --mdc-icon-size: 15px;
      }
      .round.big {
        width: 34px;
        height: 34px;
        --mdc-icon-size: 16px;
      }
      .live {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px;
        border-radius: 14px;
        font-size: 11px;
        font-weight: 700;
        color: #fff;
      }
      .live .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--dot, #8e8e93);
        box-shadow: 0 0 6px var(--dot-glow, transparent);
      }

      .name {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
        cursor: pointer;
      }
      .name .who {
        font-size: 15px;
        font-weight: 600;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name .when {
        font-size: 11px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
      }
      .card.offline .name .who {
        color: rgba(255, 255, 255, 0.5);
      }

      .nosignal {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: rgba(255, 255, 255, 0.5);
        --mdc-icon-size: 32px;
      }
      .nosignal span {
        font-size: 12px;
        font-weight: 500;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 16px;
      }
      .motion {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 11px;
        border-radius: 16px;
        font-size: 11px;
        font-weight: 600;
        min-width: 0;
        background: var(--chip-bg, var(--lg-track-bg));
        box-shadow: inset 0 0 0 1px var(--chip-stroke, var(--lg-glass-stroke));
        color: var(--chip-label, var(--lg-text-secondary));
      }
      .motion .dot {
        flex: none;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--chip-dot, var(--lg-text-secondary));
        box-shadow: 0 0 6px var(--chip-glow, transparent);
      }
      .motion span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .actions .spacer {
        flex: 1;
      }
      .history {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 12px;
        border-radius: 16px;
        border: 0;
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        color: var(--lg-text-primary);
        --mdc-icon-size: 14px;
      }
      .dimmed {
        opacity: 0.4;
        pointer-events: none;
      }

      @container (max-width: 260px) {
        .bar {
          height: 46px;
          padding: 0 10px;
        }
        .actions {
          padding: 12px;
        }
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["camera"], hass, entities, entitiesFallback) };
  }

  override getCardSize(): number {
    return this.config?.show_actions === false ? 4 : 5;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    const seconds = Math.max(this.config?.refresh_interval ?? DEFAULT_REFRESH, 1);
    this.timer = window.setInterval(() => this.tick++, seconds * 1000);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timer) window.clearInterval(this.timer);
  }

  private get streaming(): boolean {
    return this.entity?.state === "streaming";
  }

  /**
   * The still, with the tick appended so each refresh is a new URL. Home Assistant signs
   * `entity_picture` with a rotating token, so the base URL changes on its own as well.
   */
  private get stillUrl(): string | undefined {
    const picture = this.entity?.attributes.entity_picture as string | undefined;
    if (!picture) return undefined;
    return `${picture}${picture.includes("?") ? "&" : "?"}_=${this.tick}`;
  }

  private openSnapshot = (): void => {
    const service = this.config.snapshot_service;
    if (service) {
      const [domain, name] = service.split(".");
      void this.hass?.callService(domain, name, { entity_id: this.config.entity });
      return;
    }
    const picture = this.entity?.attributes.entity_picture as string | undefined;
    if (picture) window.open(picture, "_blank", "noopener");
  };

  private callMic = (): void => {
    const service = this.config.mic_service;
    if (!service) return;
    const [domain, name] = service.split(".");
    void this.hass?.callService(domain, name, { entity_id: this.config.entity });
  };

  private renderMotion() {
    const id = this.config.motion_entity;
    if (!id) return nothing;
    const sensor = this.hass?.states[id];
    if (!sensor) return nothing;
    const t = this.t;
    const detected = sensor.state === "on";
    const style = detected
      ? { "--chip-bg": "rgba(255, 159, 10, 0.18)", "--chip-stroke": "rgba(255, 159, 10, 0.3)", "--chip-label": "var(--lg-motion-label)", "--chip-dot": "#E08600", "--chip-glow": "#FF9F0A" }
      : {};
    const text = detected ? `${t("cam_motion")} · ${relativeTime(sensor.last_changed, t)}` : t("cam_no_motion");
    return html`<div class="motion" style=${styleMap(style)}><span class="dot"></span><span>${text}</span></div>`;
  }

  override render() {
    const entity = this.entity;
    if (!entity) return this.renderUnavailable();
    const t = this.t;
    const offline = isUnavailable(entity);
    const still = offline ? undefined : this.stillUrl;

    return html`${this.renderDefs()}
      <div
        class=${classMap({ glass: true, card: true, offline })}
        style=${styleMap({ "--lg-cam-ratio": String(this.config.aspect_ratio ?? 16 / 9) })}
      >
        <div class="feed" style=${still ? styleMap({ backgroundImage: `url("${still}")` }) : nothing}>
          <div class="scrim"></div>

          <div class="bar top">
            ${offline
              ? html`<span></span>`
              : html`<span
                  class="live float"
                  style=${styleMap(
                    this.streaming
                      ? { "--dot": "#FF453A", "--dot-glow": "#FF453A" }
                      : { "--dot": "#8E8E93" },
                  )}
                  >${this.renderControlSurface(["#15151b", "#34343e"], "pill")}<span class="dot"></span><span class="live-label">${t(this.streaming ? "cam_live" : "cam_still")}</span></span
                >`}
            <div class=${classMap({ trail: true, dimmed: offline })}>
              ${this.config.show_mic
                ? html`<button class="round float" @click=${this.callMic} title=${t("cam_mic")}>
                    ${this.renderControlSurface(["#15151b", "#34343e"])}
                    <lg-icon icon="mdi:microphone-off"></lg-icon>
                  </button>`
                : nothing}
              <button class="round float" @click=${this.openMoreInfo} title=${t("cam_expand")}>
                ${this.renderControlSurface(["#15151b", "#34343e"])}
                <lg-icon icon="mdi:arrow-expand"></lg-icon>
              </button>
            </div>
          </div>

          ${offline
            ? html`<div class="nosignal">
                <lg-icon icon="mdi:video-off"></lg-icon><span>${t("cam_no_signal")}</span>
              </div>`
            : nothing}

          <div class="bar bottom">
            <div class="name" @click=${this.openMoreInfo}>
              <span class="who">${this.entityName}</span>
              <span class="when">${offline ? t("cam_offline_state") : relativeTime(entity.last_updated, t)}</span>
            </div>
            <button class=${classMap({ round: true, big: true, float: true, dimmed: offline })} @click=${this.openSnapshot} title=${t("cam_snapshot")}>
              ${this.renderControlSurface(["#15151b", "#34343e"])}
              <lg-icon icon="mdi:camera"></lg-icon>
            </button>
          </div>
        </div>

        ${this.config.show_actions === false
          ? nothing
          : html`<div class="actions">
              ${offline
                ? html`<div
                    class="motion"
                    style=${styleMap({ "--chip-bg": "rgba(255, 69, 58, 0.18)", "--chip-stroke": "rgba(255, 69, 58, 0.3)", "--chip-label": "#FF453A", "--chip-dot": "#FF453A" })}
                  >
                    <span class="dot"></span><span>${t("cam_offline")}</span>
                  </div>`
                : this.renderMotion()}
              <div class="spacer"></div>
              <button class=${classMap({ history: true, dimmed: offline })} @click=${this.openMoreInfo}>
                <lg-icon icon="mdi:bell-outline"></lg-icon><span>${t("cam_history")}</span>
              </button>
            </div>`}
      </div>`;
  }
}

if (!customElements.get("liquid-glass-camera-card")) customElements.define("liquid-glass-camera-card", LiquidGlassCameraCard);
