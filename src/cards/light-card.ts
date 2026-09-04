import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard, type IconWellStyle } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, hsToRgb, isUnavailable, pickEntity, rgbToHex, withAlpha } from "../utils";

export interface LightPreset {
  name: string;
  icon?: string;
  scene?: string;
  brightness?: number;
  color_temp_kelvin?: number;
  rgb_color?: [number, number, number];
  hs_color?: [number, number];
  service?: string;
  data?: Record<string, unknown>;
}

export interface LightCardConfig extends BaseCardConfig {
  presets?: LightPreset[];
  favorites?: string[] | false;
  show_brightness?: boolean;
  show_color_temp?: boolean;
  show_color?: boolean;
}

export const DEFAULT_FAVORITES = ["#FF453A", "#FF9F0A", "#FFD60A", "#30D158", "#0A84FF", "#B15CFF", "#FF375F"];

type ColorUiMode = "color" | "color_temp";

/**
 * Light card. Covers both the "Light Card" (brightness + color temperature + presets)
 * and "Light Card RGB" (mode segment + hue/saturation + favorites) designs; the sections
 * shown are derived from the entity's supported_color_modes.
 */
export class LiquidGlassLightCard extends LiquidGlassBaseCard<LightCardConfig> {
  @state() private uiMode: ColorUiMode | undefined;
  @state() private preview: { brightness?: number; kelvin?: number; hue?: number; sat?: number } = {};
  private lastBrightness: number | undefined;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .brightness lg-slider {
        --lg-slider-fill: linear-gradient(90deg, var(--fill-from, #fff8ea), var(--fill-to, #ffe2a6));
      }
      .brightness .sun {
        color: var(--sun-color, #6b5323);
        --mdc-icon-size: 24px;
      }
      .brightness .sun-dim {
        color: var(--lg-text-secondary);
        --mdc-icon-size: 22px;
      }
      .temp lg-slider {
        --lg-slider-track: linear-gradient(90deg, #ffa63d 0%, #ffd9a0 40%, #fff7ec 65%, #bfdbff 100%);
      }
      .hue lg-slider {
        --lg-slider-track: linear-gradient(
          90deg,
          #ff3b30 0%,
          #ffcc00 17%,
          #34c759 33%,
          #32ade6 50%,
          #007aff 62%,
          #af52de 78%,
          #ff2d55 92%,
          #ff3b30 100%
        );
      }
      .sat lg-slider {
        --lg-slider-track: linear-gradient(90deg, #ffffff, var(--sat-color, #b15cff));
      }
      .favorites {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .favorites .label {
        font-size: 13px;
        font-weight: 500;
        color: var(--lg-text-secondary);
      }
      .swatches {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
      }
      .swatch {
        flex: none;
        width: var(--lg-swatch, 32px);
        height: var(--lg-swatch, 32px);
        border: 0;
        border-radius: 50%;
        padding: 0;
        cursor: pointer;
        background: var(--swatch);
        box-shadow:
          inset 0 0 0 1px rgba(255, 255, 255, 0.4),
          0 2px 3px rgba(255, 255, 255, 0.55),
          0 -2px 3px rgba(0, 0, 0, 0.2);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .swatch.selected {
        box-shadow:
          inset 0 0 0 3px #fff,
          0 0 0 2px var(--swatch-glow),
          0 4px 10px var(--swatch-glow);
      }
      .swatch:active {
        transform: scale(0.92);
      }
      .swatch.add {
        background: var(--lg-track-bg);
        color: var(--lg-text-secondary);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        display: grid;
        place-items: center;
        --mdc-icon-size: calc(var(--lg-swatch, 32px) * 0.5);
      }
      .favorites .label {
        font-size: var(--lg-label);
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-swatch: clamp(24px, 8.4cqi, 32px);
        }
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["light"], hass, entities, entitiesFallback, (e) => ((e.attributes.supported_color_modes as string[] | undefined) ?? []).some((m) => m !== "onoff")) };
  }

  override getCardSize(): number {
    return 5;
  }

  private get isOn(): boolean {
    return this.entity?.state === "on";
  }

  private get supportedModes(): string[] {
    return (this.entity?.attributes.supported_color_modes as string[] | undefined) ?? [];
  }

  private get supportsBrightness(): boolean {
    if (this.config.show_brightness === false) return false;
    return this.supportedModes.some((m) => m !== "onoff");
  }

  private get supportsColorTemp(): boolean {
    if (this.config.show_color_temp === false) return false;
    return this.supportedModes.includes("color_temp");
  }

  private get supportsColor(): boolean {
    if (this.config.show_color === false) return false;
    return this.supportedModes.some((m) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(m));
  }

  private get activeUiMode(): ColorUiMode {
    if (this.uiMode) return this.uiMode;
    if (!this.supportsColor) return "color_temp";
    if (!this.supportsColorTemp) return "color";
    return this.entity?.attributes.color_mode === "color_temp" ? "color_temp" : "color";
  }

  private get brightnessPct(): number {
    if (this.preview.brightness !== undefined) return this.preview.brightness;
    const raw = this.entity?.attributes.brightness as number | undefined;
    return this.isOn && raw !== undefined ? Math.round((raw / 255) * 100) : 0;
  }

  private get kelvin(): number {
    if (this.preview.kelvin !== undefined) return this.preview.kelvin;
    return (this.entity?.attributes.color_temp_kelvin as number | undefined) ?? this.kelvinRange[0];
  }

  private get kelvinRange(): [number, number] {
    const a = this.entity?.attributes;
    return [(a?.min_color_temp_kelvin as number | undefined) ?? 2000, (a?.max_color_temp_kelvin as number | undefined) ?? 6500];
  }

  private get hs(): [number, number] {
    const hs = (this.entity?.attributes.hs_color as [number, number] | undefined) ?? [280, 85];
    return [this.preview.hue ?? hs[0], this.preview.sat ?? hs[1]];
  }

  private get colorHex(): string {
    const rgb = this.entity?.attributes.rgb_color as [number, number, number] | undefined;
    if (this.preview.hue === undefined && this.preview.sat === undefined && rgb) return rgbToHex(rgb);
    return rgbToHex(hsToRgb(this.hs[0], this.hs[1]));
  }

  private get colorLike(): boolean {
    return this.supportsColor && this.activeUiMode === "color";
  }

  private get accent(): string {
    return this.colorLike ? this.colorHex : "var(--lg-accent)";
  }

  private get wellStyle(): IconWellStyle | undefined {
    if (!this.isOn) return undefined;
    if (this.colorLike) {
      const rgb = hsToRgb(this.hs[0], Math.min(this.hs[1], 60));
      return { from: rgbToHex(rgb), to: this.colorHex, glow: withAlpha(this.colorHex, 0.24) };
    }
    return { from: "#FFD36B", to: "var(--lg-accent-deep)", glow: "rgba(255, 165, 48, 0.24)" };
  }

  private stateText(): string {
    const t = this.t;
    if (!this.isOn) {
      const last = this.lastBrightness;
      return last ? `${t("unlit")} · ${t("last")} ${last}%` : t("unlit");
    }
    const parts = [t("lit")];
    if (this.supportsBrightness) parts.push(`${this.brightnessPct}%`);
    if (this.colorLike) parts.push(t("color"));
    else if (this.supportsColorTemp && this.entity?.attributes.color_temp_kelvin) parts.push(`${this.kelvin}K`);
    return parts.join(" · ");
  }

  protected override willUpdate(): void {
    super.willUpdate();
    if (this.isOn && this.entity?.attributes.brightness !== undefined) {
      this.lastBrightness = Math.round(((this.entity.attributes.brightness as number) / 255) * 100);
    }
  }

  private toggle = () => this.callService("light", "toggle");

  private setBrightness(pct: number) {
    this.preview = {};
    this.callService("light", "turn_on", { brightness_pct: Math.round(pct) });
  }

  private setKelvin(k: number) {
    this.preview = {};
    this.callService("light", "turn_on", { color_temp_kelvin: Math.round(k) });
  }

  private setHs(h: number, s: number) {
    this.preview = {};
    this.callService("light", "turn_on", { hs_color: [Math.round(h), Math.round(s)] });
  }

  private applyPreset(p: LightPreset) {
    if (p.scene) {
      void this.hass?.callService("scene", "turn_on", { entity_id: p.scene });
      return;
    }
    if (p.service) {
      const [domain, service] = p.service.split(".");
      void this.hass?.callService(domain, service, { entity_id: this.config.entity, ...(p.data ?? {}) });
      return;
    }
    const data: Record<string, unknown> = { ...(p.data ?? {}) };
    if (p.brightness !== undefined) data.brightness_pct = p.brightness;
    if (p.color_temp_kelvin !== undefined) data.color_temp_kelvin = p.color_temp_kelvin;
    if (p.rgb_color) data.rgb_color = p.rgb_color;
    if (p.hs_color) data.hs_color = p.hs_color;
    this.callService("light", "turn_on", data);
  }

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const on = this.isOn;
    const t = this.t;
    const showSegment = this.supportsColor && this.supportsColorTemp;
    const mode = this.activeUiMode;
    const presets = this.config.presets ?? [];
    const favorites = this.config.favorites === false ? [] : this.config.favorites ?? DEFAULT_FAVORITES;
    const colorHex = this.colorHex;
    const [kMin, kMax] = this.kelvinRange;
    const [hue, sat] = this.hs;
    const fillFrom = this.colorLike ? rgbToHex(hsToRgb(hue, Math.min(sat, 10))) : "#FFF8EA";
    const fillTo = this.colorLike ? rgbToHex(hsToRgb(hue, Math.min(sat, 30))) : "#FFE2A6";
    const sunColor = this.colorLike ? rgbToHex(hsToRgb(hue, 60).map((v) => v * 0.5)) : "#6B5323";

    return html`${this.renderDefs()}
      <div class=${classMap({ glass: true, card: true })}>
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? entity.attributes.icon ?? "mdi:lightbulb", this.wellStyle, this.toggle)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderToggle(on, this.accent, this.toggle)}
        </div>

        ${showSegment
          ? html`<div class="segment">
              ${(["color", "color_temp"] as ColorUiMode[]).map(
                (m) => html`<button class=${classMap({ selected: mode === m })} @click=${() => (this.uiMode = m)}>
                  ${mode === m ? this.renderControlSurface(undefined, "pill") : nothing}
                  <span>${t(m === "color" ? "color" : "color_temp")}</span>
                </button>`,
              )}
            </div>`
          : nothing}

        ${this.supportsBrightness
          ? html`<div class="section brightness" style=${styleMap({ "--fill-from": fillFrom, "--fill-to": fillTo, "--sun-color": on ? sunColor : "var(--lg-text-secondary)" })}>
              <div class="label-row"><span class="label">${t("brightness")}</span><span class="value">${this.brightnessPct}%</span></div>
              <lg-slider
                variant="bar"
                .refraction=${this.refraction}
                .shaderPalette=${[fillFrom, fillTo, "#8e8994", "#d8d4dc"]}
                .value=${this.brightnessPct}
                min="0"
                max="100"
                step="1"
                .showFill=${on}
                @lg-input=${(e: CustomEvent) => (this.preview = { ...this.preview, brightness: e.detail.value })}
                @lg-change=${(e: CustomEvent) => this.setBrightness(e.detail.value)}
              >
                <lg-icon slot="start" class="sun" icon="mdi:white-balance-sunny"></lg-icon>
                <lg-icon slot="end" class="sun-dim" icon="mdi:brightness-5"></lg-icon>
              </lg-slider>
            </div>`
          : nothing}

        ${this.supportsColorTemp && mode === "color_temp"
          ? html`<div class="section temp">
              <div class="label-row"><span class="label">${t("color_temp")}</span><span class="value">${Math.round(this.kelvin)}K</span></div>
              <lg-slider
                class=${classMap({ dim: !on })}
                variant="thumb"
                .refraction=${this.refraction}
                .shaderPalette=${["#ffb340", "#fff0d8", "#ffffff", "#b9dcff"]}
                .value=${this.kelvin}
                .min=${kMin}
                .max=${kMax}
                step="50"
                .showFill=${false}
                @lg-input=${(e: CustomEvent) => (this.preview = { ...this.preview, kelvin: e.detail.value })}
                @lg-change=${(e: CustomEvent) => this.setKelvin(e.detail.value)}
              ></lg-slider>
              <div class="ticks"><span>${kMin}K</span><span>${kMax}K</span></div>
            </div>`
          : nothing}

        ${this.supportsColor && mode === "color"
          ? html`<div class="section hue">
                <div class="label-row"><span class="label">${t("hue")}</span><span class="value">${Math.round(hue)}°</span></div>
                <lg-slider
                  class=${classMap({ dim: !on })}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .shaderPalette=${["#ff3b30", "#ffcc00", "#30d158", "#af52de"]}
                  .value=${hue}
                  min="0"
                  max="360"
                  step="1"
                  .showFill=${false}
                  @lg-input=${(e: CustomEvent) => (this.preview = { ...this.preview, hue: e.detail.value })}
                  @lg-change=${(e: CustomEvent) => this.setHs(e.detail.value, sat)}
                ></lg-slider>
              </div>
              <div class="section sat" style=${styleMap({ "--sat-color": rgbToHex(hsToRgb(hue, 100)) })}>
                <div class="label-row"><span class="label">${t("saturation")}</span><span class="value">${Math.round(sat)}%</span></div>
                <lg-slider
                  class=${classMap({ dim: !on })}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .shaderPalette=${["#ffffff", "#ffffff", rgbToHex(hsToRgb(hue, 100)), rgbToHex(hsToRgb(hue, 100))]}
                  .value=${sat}
                  min="0"
                  max="100"
                  step="1"
                  .showFill=${false}
                  @lg-input=${(e: CustomEvent) => (this.preview = { ...this.preview, sat: e.detail.value })}
                  @lg-change=${(e: CustomEvent) => this.setHs(hue, e.detail.value)}
                ></lg-slider>
              </div>
              ${favorites.length
                ? html`<div class=${classMap({ favorites: true, muted: !on })}>
                    <div class="label">${t("favorites")}</div>
                    <div class="swatches">
                      ${favorites.map((hex) => {
                        const selected = on && hex.toLowerCase() === colorHex.toLowerCase();
                        return html`<button
                          class=${classMap({ swatch: true, selected })}
                          style=${styleMap({ "--swatch": hex, "--swatch-glow": withAlpha(hex, 0.5) })}
                          title=${hex}
                          @click=${() => this.applyPreset({ name: hex, rgb_color: hexToRgbTuple(hex) })}
                        ></button>`;
                      })}
                      <button class="swatch add" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:plus"></lg-icon></button>
                    </div>
                  </div>`
                : nothing}`
          : nothing}

        ${presets.length
          ? html`<div class=${classMap({ chips: true, muted: !on })}>
              ${presets.map(
                (p) => html`<button class="chip" @click=${() => this.applyPreset(p)}>
                  ${this.renderControlSurface(undefined, "pill")}
                  ${p.icon ? html`<lg-icon .icon=${p.icon}></lg-icon>` : nothing}<span>${p.name}</span>
                </button>`,
              )}
            </div>`
          : nothing}
      </div>`;
  }
}

function hexToRgbTuple(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => clamp(v, 0, 255)) as [number, number, number];
}

if (!customElements.get("liquid-glass-light-card")) customElements.define("liquid-glass-light-card", LiquidGlassLightCard);
