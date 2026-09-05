/**
 * Design tokens ported from pen/design.pen variables.
 * Light values live on :host, dark values are swapped in when the host has the `dark` attribute.
 * Every token can be overridden from a Home Assistant theme via the same custom property name.
 */
export const tokens = `
  :host {
    --lg-text-primary: #1c1c1e;
    --lg-text-secondary: rgba(60, 60, 67, 0.65);
    --lg-glass-tint: 255, 255, 255;
    --lg-glass-tint-alpha: 0.2;
    --lg-glass-stroke: rgba(255, 255, 255, 0.7);
    --lg-glass-inner: rgba(255, 255, 255, 0.5);
    /* Filter-free glass lighting used by embedded/mobile WebViews. */
    --lg-static-glass-highlight: rgba(255, 255, 255, 0.5);
    --lg-static-glass-sheen: rgba(255, 255, 255, 0.2);
    --lg-static-glass-lowlight: rgba(28, 28, 30, 0.1);
    --lg-track-bg: rgba(255, 255, 255, 0.4);
    /* A slider knob is solid until it is dragged, when the glass under it is revealed. */
    --lg-knob-solid: #ffffff;
    --lg-knob-solid-rim: rgba(28, 28, 30, 0.06);
    --lg-knob-shadow: 0 0.5px 4px rgba(28, 28, 30, 0.16), 0 6px 13px rgba(28, 28, 30, 0.18);
    --lg-knob-shadow-active: 0 1px 6px rgba(28, 28, 30, 0.18), 0 10px 22px rgba(28, 28, 30, 0.26);
    /* The unfilled part of a slider bar, matching the neutral fill Apple uses. */
    --lg-slider-bar-bg: rgba(120, 120, 128, 0.24);
    --lg-slider-mark: rgba(28, 28, 30, 0.26);
    --lg-shadow-glass: rgba(28, 28, 30, 0.18);
    --lg-segment-selected: rgba(255, 255, 255, 0.85);
    --lg-glass-tint-active: 255, 255, 255;
    --lg-glass-tint-active-alpha: 0.34;
    --lg-glass-stroke-active: rgba(255, 255, 255, 0.82);
    --lg-trend-up: #1e9e4a;
    --lg-trend-up-bg: rgba(48, 209, 88, 0.18);
    --lg-trend-down: #0a7ea4;
    --lg-trend-down-bg: rgba(43, 179, 208, 0.18);
    --lg-cover-badge: #0a7ea4;
    /* A tile or chip held down. */
    --lg-press-fill: rgba(255, 255, 255, 0.9);
    --lg-press-stroke: rgba(94, 92, 230, 0.65);
    --lg-press-label: #3f3dbf;
    --lg-press-glow: rgba(94, 92, 230, 0.3);
    --lg-motion-label: #b36a00;
    /* Group panel: a container that holds glass cards, so it must not be glass itself. */
    --lg-group-panel: rgba(255, 255, 255, 0.32);
    --lg-group-panel-stroke: rgba(255, 255, 255, 0.54);
    --lg-separator-line: rgba(28, 28, 30, 0.12);

    --lg-accent: #ffb340;
    --lg-accent-deep: #ff8a1f;
    --lg-heat: #ff6a3d;
    --lg-heat-deep: #ff2d55;
    --lg-cool: #5ac8fa;
    --lg-cool-deep: #0a84ff;
    --lg-switch-accent: #0a84ff;
    --lg-switch-accent-light: #6fc3ff;
    --lg-sensor-accent: #ff9f0a;
    --lg-alert: #ff9f0a;
    --lg-lock-locked: #30d158;
    --lg-lock-locked-deep: #1e9e4a;
    --lg-lock-unlocked: #ff6b5c;
    --lg-lock-unlocked-deep: #ff3b30;
    --lg-warn: #ffd60a;
    --lg-warn-deep: #e6a800;
    --lg-warn-text: #b8860b;
    --lg-cover-accent: #2bb3d0;
    --lg-cover-accent-deep: #0a7ea4;
    --lg-slider-accent: #5e5ce6;
    --lg-slider-accent-deep: #3f3dbf;
    --lg-slider-accent-light: #9e9cff;
    --lg-slider-fill-light: #b0afff;
    --lg-motion: #7c3aed;
    --lg-motion-light: #a66bff;
    --lg-rgb-accent: #b15cff;

    --lg-font-ui: "Inter", "SF Pro Text", Roboto, system-ui, -apple-system, sans-serif;
    --lg-font-jp: "Inter", "Noto Sans JP", "Hiragino Sans", "SF Pro Text", Roboto, system-ui, sans-serif;

    --lg-radius: 40px;
    --lg-blur: 7px;
    --lg-saturation: 1.35;
  }

  :host([dark]) {
    --lg-text-primary: #ffffff;
    --lg-text-secondary: rgba(235, 235, 245, 0.65);
    --lg-glass-tint: 28, 28, 30;
    --lg-glass-tint-alpha: 0.24;
    --lg-glass-stroke: rgba(255, 255, 255, 0.25);
    --lg-glass-inner: rgba(255, 255, 255, 0.12);
    --lg-static-glass-highlight: rgba(255, 255, 255, 0.18);
    --lg-static-glass-sheen: rgba(255, 255, 255, 0.09);
    --lg-static-glass-lowlight: rgba(0, 0, 0, 0.26);
    --lg-track-bg: rgba(255, 255, 255, 0.14);
    --lg-knob-solid: #f2f2f7;
    --lg-knob-solid-rim: rgba(28, 28, 30, 0.12);
    --lg-knob-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.4), 0 6px 14px rgba(0, 0, 0, 0.42);
    --lg-knob-shadow-active: 0 1px 6px rgba(0, 0, 0, 0.44), 0 10px 24px rgba(0, 0, 0, 0.5);
    --lg-slider-bar-bg: rgba(120, 120, 128, 0.36);
    --lg-slider-mark: rgba(255, 255, 255, 0.4);
    --lg-shadow-glass: rgba(0, 0, 0, 0.45);
    --lg-segment-selected: rgba(255, 255, 255, 0.2);
    --lg-glass-tint-active: 255, 255, 255;
    --lg-glass-tint-active-alpha: 0.22;
    --lg-glass-stroke-active: rgba(255, 255, 255, 0.36);
    --lg-trend-up: #4cde73;
    --lg-trend-up-bg: rgba(48, 209, 88, 0.2);
    --lg-trend-down: #5dd6ee;
    --lg-trend-down-bg: rgba(93, 214, 238, 0.2);
    --lg-cover-badge: #5dd6ee;
    --lg-press-fill: rgba(94, 92, 230, 0.35);
    --lg-press-stroke: rgba(176, 175, 255, 0.8);
    --lg-press-label: #ffffff;
    --lg-press-glow: rgba(94, 92, 230, 0.4);
    --lg-motion-label: #ffc46b;
    --lg-group-panel: rgba(255, 255, 255, 0.08);
    --lg-group-panel-stroke: rgba(255, 255, 255, 0.12);
    --lg-separator-line: rgba(255, 255, 255, 0.14);
  }

  /* Clear glass is reserved for surfaces over photos/video or user-selected showcase UI. */
  :host([glass-variant="clear"]) {
    --lg-glass-tint-alpha: 0.07;
    --lg-blur: 3px;
    --lg-saturation: 1.45;
  }

  :host([dark][glass-variant="clear"]) {
    --lg-glass-tint-alpha: 0.1;
  }
`;
