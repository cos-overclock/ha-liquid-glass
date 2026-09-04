import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { clamp } from "../utils";
import "./lg-glass-surface";

export type SliderVariant = "bar" | "thumb" | "thin";

/**
 * Pointer driven slider shared by all cards.
 *
 *   bar   – 64px tall track with a soft fill and full-height thumb (brightness)
 *   thumb – 40px pill track with a full-height thumb (color temp, hue, tilt)
 *   thin  – 7px progress bar, optionally enlarged to 20px with a thumb (volume)
 *
 * Emits `lg-input` continuously while dragging and `lg-change` on release.
 * Value is normalised to 0..1; the host maps it to entity units.
 */
export class LgSlider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 1;
  @property({ type: Number }) step = 0;
  @property() variant: SliderVariant = "bar";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) refraction = false;
  /** For "thumb": render fill from `fillFrom` (0..1) to the thumb instead of nothing. */
  @property({ type: Number }) fillFrom: number | undefined = undefined;
  @property({ type: Boolean }) showFill = true;
  @property({ type: Boolean }) hideFillWhenZero = false;
  /** Add a full-height thumb to a thin track (used by the media volume control). */
  @property({ type: Boolean }) showThumb = false;
  /** Backdrop colors sampled by the shared WebGL glass shader under the thumb. */
  @property({ attribute: false }) shaderPalette: string[] = [];

  @state() private dragging = false;
  @state() private dragValue = 0;

  static override styles = css`
    :host {
      display: block;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    :host([disabled]) {
      pointer-events: none;
    }
    .track {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: var(--lg-slider-track, var(--lg-track-bg));
      box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
      cursor: pointer;
    }
    .track.bar {
      --lg-effective-slider-height: var(--lg-slider-height, 64px);
      height: var(--lg-effective-slider-height);
      border-radius: var(--lg-slider-radius, 20px);
    }
    /* Thumb geometry is driven entirely by the track height. */
    .track.thumb {
      --lg-effective-slider-height: var(--lg-slider-height, 40px);
      height: var(--lg-effective-slider-height);
      border-radius: 999px;
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.14),
        inset 0 0 0 1px var(--lg-glass-stroke);
    }
    .track.thin {
      --lg-effective-slider-height: var(--lg-slider-height, 7px);
      height: var(--lg-effective-slider-height);
      border-radius: 999px;
      box-shadow: none;
    }
    .fill {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background: var(--lg-slider-fill, linear-gradient(90deg, #fff8ea, #ffe2a6));
      box-shadow: -1px 0 2px rgba(255, 255, 255, 0.8);
      pointer-events: none;
    }
    .track.thin .fill {
      background: var(--lg-slider-fill, var(--lg-text-primary));
      opacity: var(--lg-slider-fill-opacity, 0.85);
      box-shadow: none;
      border-radius: 999px;
    }
    .track.thumb .fill {
      box-shadow: none;
    }
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      pointer-events: none;
    }
    .center-mark {
      position: absolute;
      top: 12px;
      left: 50%;
      width: 2px;
      height: 16px;
      margin-left: -1px;
      border-radius: 1px;
      background: var(--lg-text-secondary);
      pointer-events: none;
    }
    .knob {
      position: absolute;
      top: 0;
      width: var(--lg-effective-slider-height);
      height: var(--lg-effective-slider-height);
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.56);
      -webkit-backdrop-filter: blur(12px) saturate(1.35);
      backdrop-filter: blur(12px) saturate(1.35);
      box-shadow:
        0 5px 14px rgba(0, 0, 0, 0.6),
        0 1px 3px rgba(255, 255, 255, 0.4),
        inset 0 0 0 1.5px #fff;
      pointer-events: none;
      transition: transform 0.08s ease;
    }
    .track.thin .knob {
      box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.5),
        0 1px 2px rgba(255, 255, 255, 0.4),
        inset 0 0 0 1.5px #fff;
    }
    .knob.refraction {
      -webkit-backdrop-filter: url(#lg-slider-knob);
      backdrop-filter: url(#lg-slider-knob);
    }
    .knob:has(> lg-glass-surface) {
      background: transparent;
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
      box-shadow: 0 5px 14px rgba(0, 0, 0, 0.38);
    }
    :host([dragging]) .knob {
      transform: scale(1.08);
    }
  `;

  private get ratio(): number {
    const v = this.dragging ? this.dragValue : this.value;
    const span = this.max - this.min || 1;
    return clamp((v - this.min) / span, 0, 1);
  }

  private valueFromEvent(e: PointerEvent): number {
    const track = this.shadowRoot?.querySelector(".track") as HTMLElement | null;
    if (!track) return this.value;
    const rect = track.getBoundingClientRect();
    // The knob centre can only reach half a track-height in from either end.
    const hasKnob = this.variant === "thumb" || this.variant === "bar" || this.showThumb;
    const pad = hasKnob ? rect.height / 2 : 0;
    const usable = Math.max(1, rect.width - pad * 2);
    const ratio = clamp((e.clientX - rect.left - pad) / usable, 0, 1);
    let v = this.min + ratio * (this.max - this.min);
    if (this.step > 0) v = Math.round(v / this.step) * this.step;
    return clamp(v, this.min, this.max);
  }

  private onPointerDown = (e: PointerEvent) => {
    if (this.disabled || e.button !== 0) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.dragging = true;
    this.toggleAttribute("dragging", true);
    this.dragValue = this.valueFromEvent(e);
    this.dispatchEvent(new CustomEvent("lg-input", { detail: { value: this.dragValue }, bubbles: true, composed: true }));
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const v = this.valueFromEvent(e);
    if (v !== this.dragValue) {
      this.dragValue = v;
      this.dispatchEvent(new CustomEvent("lg-input", { detail: { value: v }, bubbles: true, composed: true }));
    }
  };

  private onPointerUp = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.dragging = false;
    this.toggleAttribute("dragging", false);
    const v = this.valueFromEvent(e);
    this.value = v;
    this.dispatchEvent(new CustomEvent("lg-change", { detail: { value: v }, bubbles: true, composed: true }));
  };

  private onKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    const step = this.step > 0 ? this.step : (this.max - this.min) / 20;
    let v = this.value;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") v += step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") v -= step;
    else if (e.key === "Home") v = this.min;
    else if (e.key === "End") v = this.max;
    else return;
    e.preventDefault();
    this.value = clamp(v, this.min, this.max);
    this.dispatchEvent(new CustomEvent("lg-change", { detail: { value: this.value }, bubbles: true, composed: true }));
  };

  override render() {
    const ratio = this.ratio;
    const isThumb = this.variant === "thumb";
    const hasKnob = isThumb || this.variant === "bar" || this.showThumb;
    const showFill = this.showFill && !(this.hideFillWhenZero && ratio <= 0);
    // Track height in CSS, so the knob geometry follows --lg-slider-height.
    const h = "var(--lg-effective-slider-height)";
    const travel = `(100% - ${h})`;
    let fillStyle: Record<string, string> = { width: `${ratio * 100}%` };
    if (isThumb && this.fillFrom !== undefined) {
      const from = clamp(this.fillFrom, 0, 1);
      const a = Math.min(from, ratio);
      const b = Math.max(from, ratio);
      fillStyle = { left: `calc(${h} / 2 + ${travel} * ${a})`, width: `calc(${travel} * ${b - a})` };
    } else if (hasKnob) {
      // A full-height knob travels between the two half-height insets, so a fill measured
      // as a plain percentage of the track would only meet its centre at the midpoint.
      // Ending the fill at the knob's centre keeps the two together at every value.
      fillStyle = { width: `calc(${h} / 2 + ${travel} * ${ratio})` };
    }
    return html`
      <div
        class="track ${this.variant}"
        role="slider"
        tabindex=${this.disabled ? -1 : 0}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${this.dragging ? this.dragValue : this.value}
        aria-disabled=${this.disabled}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @keydown=${this.onKeyDown}
      >
        ${showFill ? html`<div class="fill" style=${styleMap(fillStyle)}></div>` : nothing}
        ${isThumb && this.fillFrom !== undefined
          ? html`<div class="center-mark" style=${styleMap({ left: `calc(${h} / 2 + ${travel} * ${clamp(this.fillFrom, 0, 1)})` })}></div>`
          : nothing}
        <div class="overlay"><slot name="start"></slot><slot name="end"></slot></div>
        ${hasKnob
          ? html`<div class="knob" style=${styleMap({ left: `calc(${travel} * ${ratio})` })}>
              <lg-glass-surface
                shape="circle"
                .palette=${this.shaderPalette}
                .stops=${[0, 0.44, 0.56, 1]}
                .radius=${999}
                .edge=${20}
                .refraction=${this.refraction ? 10 : 0}
                .blurRadius=${12}
                .highQualityBlur=${true}
                .renderScale=${1.5}
                .pixelRatioLimit=${3}
                .highlight=${1.25}
                .tintAlpha=${this.refraction ? 0.28 : 0.18}
              ></lg-glass-surface>
            </div>`
          : nothing}
      </div>
    `;
  }
}

if (!customElements.get("lg-slider")) customElements.define("lg-slider", LgSlider);

declare global {
  interface HTMLElementTagNameMap {
    "lg-slider": LgSlider;
  }
}
