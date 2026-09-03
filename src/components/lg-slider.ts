import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { clamp } from "../utils";
import { knobDefs } from "../styles/glass-defs";

export type SliderVariant = "bar" | "thumb" | "thin";

/**
 * Pointer driven slider shared by all cards.
 *
 *   bar   – 64px tall track with a soft fill (brightness)
 *   thumb – 40px gradient track with a liquid-glass thumb (color temp, hue, tilt)
 *   thin  – 7–10px progress bar (media progress / volume)
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
      height: var(--lg-slider-height, 64px);
      border-radius: var(--lg-slider-radius, 20px);
    }
    .track.thumb {
      height: 40px;
      border-radius: 20px;
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.14),
        inset 0 0 0 1px var(--lg-glass-stroke);
    }
    .track.thin {
      height: var(--lg-slider-height, 7px);
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
      top: 4px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.22);
      -webkit-backdrop-filter: blur(3px) saturate(1.35);
      backdrop-filter: blur(3px) saturate(1.35);
      box-shadow:
        0 3px 8px rgba(0, 0, 0, 0.3),
        inset 0 0 0 2px rgba(255, 255, 255, 0.9),
        inset 0 6px 10px -4px rgba(255, 255, 255, 0.9),
        inset 0 -4px 8px -4px rgba(0, 0, 0, 0.12);
      pointer-events: none;
      transition: transform 0.08s ease;
    }
    .knob.refraction {
      -webkit-backdrop-filter: url(#lg-knob);
      backdrop-filter: url(#lg-knob);
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
    const pad = this.variant === "thumb" ? 20 : 0;
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
    const showFill = this.showFill && !(this.hideFillWhenZero && ratio <= 0);
    let fillStyle: Record<string, string> = { width: `${ratio * 100}%` };
    if (isThumb && this.fillFrom !== undefined) {
      const from = clamp(this.fillFrom, 0, 1);
      const a = Math.min(from, ratio);
      const b = Math.max(from, ratio);
      fillStyle = { left: `calc(20px + (100% - 40px) * ${a})`, width: `calc((100% - 40px) * ${b - a})` };
    }
    return html`
      ${isThumb && this.refraction ? knobDefs : nothing}
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
        ${isThumb && this.fillFrom !== undefined ? html`<div class="center-mark" style=${styleMap({ left: `calc(20px + (100% - 40px) * ${clamp(this.fillFrom, 0, 1)})` })}></div>` : nothing}
        <div class="overlay"><slot name="start"></slot><slot name="end"></slot></div>
        ${isThumb
          ? html`<div class="knob ${this.refraction ? "refraction" : ""}" style=${styleMap({ left: `calc(4px + (100% - 40px) * ${ratio})` })}></div>`
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
