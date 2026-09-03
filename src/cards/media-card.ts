import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, isUnavailable, pickEntity, supportsFeature } from "../utils";

export interface MediaCardConfig extends BaseCardConfig {
  /** Color for the source / app line (default Apple Music pink). */
  source_color?: string;
  show_volume?: boolean;
  show_device?: boolean;
}

const F = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  PREVIOUS: 16,
  NEXT: 32,
  PLAY: 16384,
  SHUFFLE: 32768,
  REPEAT: 262144,
};

function fmtTime(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${m}:${String(r).padStart(2, "0")}`;
}

/**
 * Media player card: album art, title / artist / source, seekable progress, transport
 * controls with a liquid-glass play button, and a volume slider.
 */
export class LiquidGlassMediaCard extends LiquidGlassBaseCard<MediaCardConfig> {
  @state() private tick = 0;
  @state() private seekPreview: number | undefined;
  @state() private volumePreview: number | undefined;
  private timer: number | undefined;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .card {
        gap: 16px;
      }
      .device {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
        color: var(--lg-text-secondary);
        --mdc-icon-size: 14px;
        cursor: pointer;
      }
      .art {
        flex: none;
        width: var(--lg-art, 72px);
        height: var(--lg-art, 72px);
        border-radius: 20px;
        overflow: hidden;
        background: var(--lg-track-bg);
        background-size: cover;
        background-position: center;
        box-shadow:
          0 8px 20px rgba(0, 0, 0, 0.25),
          inset 0 0 0 1px rgba(255, 255, 255, 0.4);
        display: grid;
        place-items: center;
        color: var(--lg-text-secondary);
        --mdc-icon-size: 28px;
      }
      .art.idle {
        box-shadow:
          0 1px 1px var(--lg-glass-inner),
          inset 0 0 0 1px var(--lg-glass-stroke);
      }
      .title {
        gap: 3px;
      }
      .source {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
        font-weight: 600;
        color: var(--source-color);
        --mdc-icon-size: 12px;
      }
      .source.muted-text {
        color: var(--lg-text-secondary);
      }
      .more {
        flex: none;
        width: 36px;
        height: 36px;
        border: 0;
        border-radius: 18px;
        padding: 0;
        display: grid;
        place-items: center;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        color: var(--lg-text-primary);
        cursor: pointer;
        --mdc-icon-size: 18px;
      }
      .progress {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .progress lg-slider {
        --lg-slider-height: 7px;
      }
      .times {
        display: flex;
        justify-content: space-between;
        font-family: var(--lg-font-ui);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: -0.2px;
        color: var(--lg-text-secondary);
        font-variant-numeric: tabular-nums;
      }
      .transport {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
      }
      .transport button {
        border: 0;
        background: transparent;
        padding: 0;
        color: var(--lg-text-primary);
        cursor: pointer;
        display: grid;
        place-items: center;
        transition: opacity 0.2s ease, transform 0.1s ease;
      }
      .transport button:active {
        transform: scale(0.94);
      }
      .transport button:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .transport .aux {
        color: var(--lg-text-secondary);
        --mdc-icon-size: 20px;
      }
      .transport .aux.on {
        color: var(--source-color);
      }
      .transport .aux {
        --mdc-icon-size: var(--lg-aux, 20px);
      }
      .transport .skip {
        --mdc-icon-size: var(--lg-skip, 32px);
      }
      .play {
        flex: none;
        width: var(--lg-play, 68px);
        height: var(--lg-play, 68px);
        border-radius: 50%;
        --mdc-icon-size: calc(var(--lg-play, 68px) * 0.44);
        background: rgba(255, 255, 255, 0.26);
        -webkit-backdrop-filter: blur(4px) saturate(1.35);
        backdrop-filter: blur(4px) saturate(1.35);
        box-shadow:
          0 6px 16px rgba(0, 0, 0, 0.25),
          inset 0 0 0 1.5px rgba(255, 255, 255, 0.85),
          inset 0 10px 14px -8px rgba(255, 255, 255, 0.9),
          inset 0 -8px 12px -8px rgba(0, 0, 0, 0.12);
      }
      :host([refraction]) .play {
        -webkit-backdrop-filter: url(#lg-knob);
        backdrop-filter: url(#lg-knob);
      }
      .volume {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--lg-text-secondary);
        --mdc-icon-size: 20px;
      }
      .volume lg-slider {
        flex: 1;
        --lg-slider-height: 10px;
      }
      .fade {
        opacity: 0.4;
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-art: clamp(48px, 19cqi, 72px);
          --lg-play: clamp(48px, 18cqi, 68px);
          --lg-skip: clamp(24px, 8.4cqi, 32px);
          --lg-aux: clamp(17px, 5.3cqi, 20px);
        }
      }
      @container (max-width: 250px) {
        .transport {
          padding: 0;
        }
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["media_player"], hass, entities, entitiesFallback) };
  }

  override getCardSize(): number {
    return 4;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.timer = window.setInterval(() => {
      if (this.entity?.state === "playing") this.tick++;
    }, 1000);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timer) window.clearInterval(this.timer);
  }

  private get playState(): "playing" | "paused" | "idle" {
    const s = this.entity?.state;
    if (s === "playing" || s === "buffering") return "playing";
    if (s === "paused") return "paused";
    return "idle";
  }

  private position(): { pos: number; duration: number } | undefined {
    const a = this.entity?.attributes ?? {};
    const duration = a.media_duration as number | undefined;
    let pos = a.media_position as number | undefined;
    if (!duration || pos === undefined) return undefined;
    if (this.playState === "playing" && a.media_position_updated_at) {
      pos += (Date.now() - new Date(a.media_position_updated_at as string).getTime()) / 1000;
    }
    void this.tick;
    return { pos: clamp(pos, 0, duration), duration };
  }

  private playPause = () => {
    if (this.playState === "idle" && !supportsFeature(this.entity, F.PLAY)) return;
    this.callService("media_player", "media_play_pause");
  };

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const a = entity.attributes;
    const t = this.t;
    const ps = this.playState;
    const idle = ps === "idle";
    const sourceColor = this.config.source_color ?? "#FF375F";
    const art = idle ? undefined : (a.entity_picture as string | undefined);
    const title = idle ? t("not_playing") : ((a.media_title as string | undefined) ?? entity.attributes.friendly_name ?? "");
    const artistParts = [a.media_artist, a.media_album_name].filter(Boolean) as string[];
    const artist = idle ? t("standby") : artistParts.join(" — ") || ((a.source as string | undefined) ?? "");
    const source = (a.app_name as string | undefined) ?? (a.source as string | undefined);
    const p = this.position();
    const seekRatio = this.seekPreview ?? (p ? p.pos / p.duration : idle ? 0 : 0);
    const elapsed = p ? (this.seekPreview !== undefined ? this.seekPreview * p.duration : p.pos) : 0;
    const remaining = p ? p.duration - elapsed : 0;
    const volume = this.volumePreview ?? ((a.volume_level as number | undefined) ?? 0.5);
    const shuffle = Boolean(a.shuffle);
    const repeat = (a.repeat as string | undefined) ?? "off";
    const canSeek = supportsFeature(entity, F.SEEK) && Boolean(p) && !idle;
    const showVolume = this.config.show_volume !== false && supportsFeature(entity, F.VOLUME_SET);
    const showDevice = this.config.show_device !== false;

    return html`${this.renderDefs()}
      <div class="glass card" style=${styleMap({ "--source-color": sourceColor })}>
        ${showDevice
          ? html`<div class="device" @click=${this.openMoreInfo}><lg-icon icon="mdi:speaker"></lg-icon><span>${this.entityName}</span></div>`
          : nothing}

        <div class="header">
          <div class=${classMap({ art: true, idle: !art })} style=${art ? styleMap({ backgroundImage: `url("${art}")` }) : nothing} @click=${this.openMoreInfo}>
            ${art ? nothing : html`<lg-icon icon="mdi:music"></lg-icon>`}
          </div>
          <div class="title" @click=${this.openMoreInfo}>
            <div class="name">${title}</div>
            <div class="state">${artist}</div>
            ${ps === "paused"
              ? html`<div class="source muted-text"><lg-icon icon="mdi:pause"></lg-icon><span>${t("paused")}</span></div>`
              : !idle && source
                ? html`<div class="source"><lg-icon icon="mdi:waveform"></lg-icon><span>${source}</span></div>`
                : nothing}
          </div>
          <button class="more" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:dots-horizontal"></lg-icon></button>
        </div>

        <div class=${classMap({ progress: true, dim: idle })}>
          <lg-slider
            variant="thin"
            .value=${idle ? 0.003 : seekRatio}
            min="0"
            max="1"
            .disabled=${!canSeek}
            @lg-input=${(e: CustomEvent) => (this.seekPreview = e.detail.value)}
            @lg-change=${(e: CustomEvent) => {
              this.seekPreview = undefined;
              if (p) this.callService("media_player", "media_seek", { seek_position: Math.round(e.detail.value * p.duration) });
            }}
          ></lg-slider>
          <div class="times"><span>${p ? fmtTime(elapsed) : "0:00"}</span><span>−${p ? fmtTime(remaining) : "0:00"}</span></div>
        </div>

        <div class="transport">
          <button class=${classMap({ aux: true, on: shuffle, fade: idle })} ?disabled=${!supportsFeature(entity, F.SHUFFLE)} @click=${() => this.callService("media_player", "shuffle_set", { shuffle: !shuffle })} title="Shuffle">
            <lg-icon icon="mdi:shuffle-variant"></lg-icon>
          </button>
          <button class=${classMap({ skip: true, fade: idle })} ?disabled=${!supportsFeature(entity, F.PREVIOUS)} @click=${() => this.callService("media_player", "media_previous_track")} title="Previous">
            <lg-icon icon="mdi:skip-previous-outline"></lg-icon>
          </button>
          <button class=${classMap({ play: true })} @click=${this.playPause} title="Play / Pause" style=${idle ? "color: var(--lg-text-secondary)" : ""}>
            <lg-icon .icon=${ps === "playing" ? "mdi:pause" : "mdi:play-outline"}></lg-icon>
          </button>
          <button class=${classMap({ skip: true, fade: idle })} ?disabled=${!supportsFeature(entity, F.NEXT)} @click=${() => this.callService("media_player", "media_next_track")} title="Next">
            <lg-icon icon="mdi:skip-next-outline"></lg-icon>
          </button>
          <button class=${classMap({ aux: true, on: repeat !== "off", fade: idle })} ?disabled=${!supportsFeature(entity, F.REPEAT)} @click=${() => this.callService("media_player", "repeat_set", { repeat: repeat === "off" ? "all" : repeat === "all" ? "one" : "off" })} title="Repeat">
            <lg-icon .icon=${repeat === "one" ? "mdi:repeat-once" : "mdi:repeat"}></lg-icon>
          </button>
        </div>

        ${showVolume
          ? html`<div class=${classMap({ volume: true, muted: idle })}>
              <lg-icon icon="mdi:volume-low"></lg-icon>
              <lg-slider
                variant="thin"
                .value=${volume}
                min="0"
                max="1"
                step="0.01"
                @lg-input=${(e: CustomEvent) => (this.volumePreview = e.detail.value)}
                @lg-change=${(e: CustomEvent) => {
                  this.volumePreview = undefined;
                  this.callService("media_player", "volume_set", { volume_level: Math.round(e.detail.value * 100) / 100 });
                }}
              ></lg-slider>
              <lg-icon icon="mdi:volume-high"></lg-icon>
            </div>`
          : nothing}
      </div>`;
  }
}

if (!customElements.get("liquid-glass-media-card")) customElements.define("liquid-glass-media-card", LiquidGlassMediaCard);
