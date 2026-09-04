import { css, unsafeCSS } from "lit";
import { rimBackground } from "./rim";

/**
 * Shared "liquid glass" surface styles.
 *
 * The .pen design renders every surface through liquid-glass.glsl. The browser port layers:
 *   1. backdrop-filter  – blur + saturation (+ SVG edge refraction on Chromium, see glass-defs.ts)
 *   2. tint             – rgba fill from --lg-glass-tint / --lg-glass-tint-alpha
 *   3. rim              – ::before, the shader's specular / fresnel / hairline in CSS
 *   4. drop shadow      – 0 14px 36px -4px shadow-glass, 0 1px 1px glass-inner
 */
export const glassStyles = css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    /* Cards live in dashboard columns of wildly different widths, so every size below is
       measured against the card's own width rather than the viewport. */
    container-type: inline-size;
    font-family: var(--lg-font-jp);
    color: var(--lg-text-primary);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  .lg-defs {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .glass {
    position: relative;
    isolation: isolate;
    background: rgba(var(--lg-glass-tint), var(--lg-glass-tint-alpha));
    -webkit-backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturation));
    backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturation));
    box-shadow:
      0 14px 36px -4px var(--lg-shadow-glass),
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  :host([refraction]) .glass {
    -webkit-backdrop-filter: url(#lg-card);
    backdrop-filter: url(#lg-card);
  }
  .glass::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 2;
  }
  /*
   * Specular, fresnel and hairline, evaluated from liquid-glass.glsl and painted in pixel
   * stops so the rim keeps its real width on a card of any size. The shader concentrates
   * almost all of it within three pixels of the edge, which is what reads as a glass slab
   * rather than a tinted panel.
   */
  .glass::before {
    background: ${unsafeCSS(rimBackground())};
  }
  /* Pointer-following caustic: a masked one-pixel rim, never a veil over the content. */
  .glass::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    padding: 1.25px;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      circle at var(--lg-light-x, 18%) var(--lg-light-y, 8%),
      rgb(255 255 255 / calc(0.16 + var(--lg-sheen-active, 0) * 0.5)) 0,
      rgb(255 255 255 / 0.08) 24%,
      transparent 54%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: opacity 180ms ease;
  }
  .card {
    --lg-pad: 20px;
    --lg-pad-row: 16px;
    --lg-gap: 18px;
    --lg-gap-row: 14px;
    --lg-well: 48px;
    --lg-well-icon: 24px;
    --lg-name: 17px;
    --lg-state: 13px;
    --lg-label: 13px;
    --lg-tick: 11px;
    --lg-corner: var(--lg-radius);

    border-radius: var(--lg-corner);
    padding: var(--lg-pad);
    display: flex;
    flex-direction: column;
    gap: var(--lg-gap);
    overflow: hidden;
    color: var(--lg-text-primary);
  }

  /* Single row cards: icon, title, optional trailing element. */
  .card.row {
    flex-direction: row;
    align-items: center;
    gap: var(--lg-gap-row);
    padding: var(--lg-pad-row) var(--lg-pad);
  }

  @supports (container-type: inline-size) {
    .card {
      --lg-pad: clamp(12px, 5.3cqi, 20px);
      --lg-pad-row: clamp(10px, 4.2cqi, 16px);
      --lg-gap: clamp(10px, 4.7cqi, 18px);
      --lg-gap-row: clamp(9px, 3.7cqi, 14px);
      --lg-well: clamp(34px, 12.6cqi, 48px);
      --lg-well-icon: clamp(17px, 6.3cqi, 24px);
      --lg-name: clamp(13.5px, 4.5cqi, 17px);
      --lg-state: clamp(11px, 3.4cqi, 13px);
      --lg-label: clamp(11px, 3.4cqi, 13px);
      --lg-tick: clamp(9.5px, 2.9cqi, 11px);
      --lg-corner: min(var(--lg-radius), 11cqi);
    }
  }
  .card.active {
    background: rgba(var(--lg-glass-tint-active), var(--lg-glass-tint-active-alpha));
    box-shadow:
      0 14px 36px -4px var(--lg-shadow-glass),
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke-active);
  }
  .card > * {
    position: relative;
    z-index: 1;
  }
  .lg-control-shader {
    position: absolute;
    z-index: 0;
  }

  /* Small glass surface used for knobs / play button / slide thumb */
  .knob {
    position: relative;
    isolation: isolate;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.22);
    -webkit-backdrop-filter: blur(3px) saturate(1.35);
    backdrop-filter: blur(3px) saturate(1.35);
    box-shadow:
      0 3px 8px rgba(0, 0, 0, 0.3),
      inset 0 0 0 2px rgba(255, 255, 255, 0.9),
      inset 0 6px 10px -4px rgba(255, 255, 255, 0.9),
      inset 0 -4px 8px -4px rgba(0, 0, 0, 0.12);
  }
  :host([refraction]) .knob {
    -webkit-backdrop-filter: url(#lg-knob);
    backdrop-filter: url(#lg-knob);
  }
  .knob:has(> .lg-control-shader) {
    background: transparent;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }
  :host([refraction]) .knob:has(> .lg-control-shader) {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }

  /* Header block: icon well + title + trailing slot */
  .header {
    display: flex;
    align-items: center;
    gap: var(--lg-gap-row);
    min-height: var(--lg-well);
  }
  .title {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
  }
  .name {
    font-size: var(--lg-name);
    font-weight: 600;
    line-height: 1.3;
    color: var(--lg-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .state {
    font-size: var(--lg-state);
    line-height: 1.35;
    color: var(--lg-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .icon-well {
    flex: none;
    width: var(--lg-well);
    height: var(--lg-well);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
    background: linear-gradient(180deg, var(--well-from, #ffd36b), var(--well-to, var(--lg-accent-deep)));
    box-shadow:
      0 4px 12px var(--well-glow, rgba(255, 165, 48, 0.24)),
      0 1px 1px rgba(255, 255, 255, 0.7),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    cursor: pointer;
    /* The gradient itself cannot interpolate, so the colours it is built from do. */
    transition:
      --well-from 0.42s ease,
      --well-to 0.42s ease,
      --well-glow 0.42s ease,
      background 0.25s ease,
      box-shadow 0.25s ease;
  }
  .icon-well.idle {
    background: var(--lg-track-bg);
    color: var(--lg-text-secondary);
    box-shadow:
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .icon-well ha-icon,
  .icon-well lg-icon {
    --mdc-icon-size: var(--lg-well-icon);
    width: var(--lg-well-icon);
    height: var(--lg-well-icon);
  }

  /* Status badge: dot + label */
  .badge {
    flex: 0 1 auto;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 14px;
    font-size: 12px;
    font-weight: 600;
    color: var(--badge-color, var(--lg-text-secondary));
    background: var(--badge-bg, var(--lg-track-bg));
    box-shadow: inset 0 0 0 1px var(--badge-stroke, var(--lg-glass-stroke));
    white-space: nowrap;
    transition: background-color 0.42s ease, color 0.42s ease, box-shadow 0.42s ease;
  }
  .badge > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .badge .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: var(--badge-color, var(--lg-text-secondary));
    box-shadow: 0 0 6px var(--badge-glow, transparent);
    transition: background-color 0.42s ease, box-shadow 0.42s ease;
  }
  /*
   * Below this width the badge would eat the room the name needs, and the state line
   * already spells the same status out in words.
   */
  @container (max-width: 250px) {
    .badge {
      display: none;
    }
  }

  /* iOS style toggle */
  .toggle {
    flex: none;
    width: 51px;
    height: 31px;
    border-radius: 16px;
    padding: 2px;
    display: flex;
    align-items: center;
    background: rgba(120, 120, 128, 0.36);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    transition: background 0.25s ease;
  }
  .toggle.on {
    background: var(--toggle-color, var(--lg-accent));
  }
  .toggle .knob-dot {
    position: relative;
    overflow: hidden;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    transform: translateX(0);
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .toggle .knob-dot:has(> .lg-control-shader) {
    background: transparent;
  }
  .toggle.on .knob-dot {
    transform: translateX(20px);
  }

  /* Label rows above sliders */
  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: var(--lg-label);
  }
  .label-row .label {
    color: var(--lg-text-secondary);
    font-weight: 500;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .label-row .value {
    flex: none;
    color: var(--lg-text-primary);
    font-weight: 600;
    font-family: var(--lg-font-ui);
    letter-spacing: -0.2px;
    font-variant-numeric: tabular-nums;
  }
  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ticks {
    display: flex;
    justify-content: space-between;
    padding: 0 4px;
    font-family: var(--lg-font-ui);
    font-size: var(--lg-tick);
    font-weight: 500;
    letter-spacing: -0.2px;
    color: var(--lg-text-secondary);
  }

  /* Segmented control */
  .segment {
    display: flex;
    gap: 2px;
    padding: 3px;
    border-radius: 18px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .segment > button {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    flex: 1;
    min-width: 0;
    height: 30px;
    border: 0;
    border-radius: 15px;
    background: transparent;
    color: var(--lg-text-secondary);
    font: inherit;
    font-size: var(--lg-label);
    font-weight: 500;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 0;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }
  .segment > button:has(> .lg-control-shader) {
    background: transparent;
  }
  .segment > button.selected {
    background: var(--lg-segment-selected);
    color: var(--lg-text-primary);
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
  }

  /* Chips */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .chip {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 14px;
    border: 0;
    border-radius: 18px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    font: inherit;
    font-size: var(--lg-tick);
    font-weight: 500;
    cursor: pointer;
    min-width: 0;
    max-width: 100%;
  }
  .chip > :not(.lg-control-shader),
  .segment > button > :not(.lg-control-shader) {
    position: relative;
    z-index: 1;
  }
  .chip > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chip ha-icon,
  .chip lg-icon {
    flex: none;
    --mdc-icon-size: 14px;
    width: 14px;
    height: 14px;
  }
  @container (max-width: 280px) {
    .chip {
      padding: 8px 11px;
    }
  }

  /* Round icon button */
  .round-btn {
    --btn: 56px;
    flex: none;
    width: var(--btn);
    height: var(--btn);
    border: 0;
    border-radius: 50%;
    background: var(--lg-track-bg);
    box-shadow:
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    display: grid;
    place-items: center;
    cursor: pointer;
    padding: 0;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .round-btn:active {
    background: var(--lg-segment-selected);
  }
  .round-btn ha-icon,
  .round-btn lg-icon {
    --mdc-icon-size: calc(var(--btn) * 0.43);
    width: calc(var(--btn) * 0.43);
    height: calc(var(--btn) * 0.43);
  }
  @supports (container-type: inline-size) {
    .round-btn {
      --btn: clamp(38px, 14.7cqi, 56px);
    }
  }

  .dim {
    opacity: 0.45;
  }
  .muted {
    opacity: 0.6;
  }
  button {
    font-family: inherit;
  }
  button:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: 2px;
  }

  /* Someone who has asked for less motion gets the end state, immediately. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;
