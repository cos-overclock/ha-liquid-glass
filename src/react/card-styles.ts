/** Shared layout styles for React cards.
 *
 * Keep this separate from `glassSurfaceStyles`: selectors such as `.card > *` also
 * match the internal layers created by `<Glass>` and can put the optical copy in
 * front of the card contents.
 */
export const reactCardStyles = `
  * { box-sizing: border-box; }

  :host {
    display: block;
    min-width: 0;
    container-type: inline-size;
    font-family: var(--lg-font-jp);
    color: var(--lg-text-primary);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
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

    width: 100%;
    border-radius: var(--lg-corner);
    padding: var(--lg-pad);
    display: flex;
    flex-direction: column;
    gap: var(--lg-gap);
    overflow: hidden;
    color: var(--lg-text-primary);
  }

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
  }
  .title.tappable,
  .icon-well.tappable { cursor: pointer; }
  .title:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: 3px;
    border-radius: 6px;
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
  .icon-well lg-icon {
    --mdc-icon-size: var(--lg-well-icon);
    width: var(--lg-well-icon);
    height: var(--lg-well-icon);
  }

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
  }
  .badge .badge-icon {
    flex: none;
    display: inline-flex;
    color: var(--badge-color, var(--lg-text-secondary));
  }
  .badge .badge-icon lg-icon {
    --mdc-icon-size: 16px;
    width: 16px;
    height: 16px;
  }

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

  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
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

  .segment {
    display: flex;
    gap: 2px;
    padding: 3px;
    border-radius: 18px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .segment > button {
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
  .segment > button.selected {
    background: var(--lg-segment-selected);
    color: var(--lg-text-primary);
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
  }

  .dim {
    opacity: 0.45;
  }
  .muted {
    opacity: 0.6;
  }

  .ticks {
    display: flex;
    justify-content: space-between;
    padding: 0 4px;
    font-family: var(--lg-font-ui);
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }

  @container (max-width: 250px) {
    .badge { display: none; }
  }
  @container (max-width: 280px) {
    .chip { padding: 8px 11px; }
  }

  button { font-family: inherit; }
  button:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;
