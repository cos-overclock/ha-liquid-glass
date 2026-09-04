import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, friendlyName, isUnavailable, withAlpha } from "../utils";
import { BUTTON_DOMAINS, WELLS, wellFor } from "./button-card";

export interface SceneItem {
  /** Entity to activate. Omit when `service` carries the action instead. */
  entity?: string;
  name?: string;
  icon?: string;
  /** Accent hex colour for this item's icon well. */
  accent?: string;
  /** "domain.service" to call instead of the entity's usual activation. */
  service?: string;
  service_data?: Record<string, unknown>;
}

export interface SceneCardConfig extends BaseCardConfig {
  scenes?: SceneItem[];
  /** "tiles" gives icon wells with labels, "chips" plain pills. */
  style?: "tiles" | "chips";
  columns?: number;
  /** Heading above the grid. Omit for none. */
  title?: string;
  /** Right side of the heading: the number of scenes, or nothing. */
  show_count?: boolean;
}

/** How long a pressed item stays lit, long enough to read as a confirmation. */
const PRESS_MS = 900;

/**
 * Scene card: a list of scenes, scripts or buttons as a grid of tiles or a row of chips.
 * Covers the design's Button Grid, Scene Chips and Scene Chips Row.
 */
export class LiquidGlassSceneCard extends LiquidGlassBaseCard<SceneCardConfig> {
  /** Index of the item showing its pressed state, if any. */
  @state() private pressed: number | undefined;
  private pressTimer: number | undefined;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .card {
        gap: 14px;
      }
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }
      .head .heading {
        font-size: var(--lg-scene-title, 15px);
        font-weight: 600;
        color: var(--lg-text-primary);
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .head .count {
        flex: none;
        font-size: var(--lg-tick);
        font-weight: 500;
        color: var(--lg-text-secondary);
      }
      /* The chips row variant labels itself quietly rather than as a heading. */
      .card.chips .head .heading {
        font-size: var(--lg-label);
        color: var(--lg-text-secondary);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr));
        gap: 10px;
      }
      .card.chips .grid {
        gap: 8px;
      }

      button {
        border: 0;
        font: inherit;
        cursor: pointer;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        color: var(--lg-text-primary);
        min-width: 0;
        transition: background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease, transform 0.1s ease;
      }
      button:active {
        transform: scale(0.97);
      }
      button.on {
        background: var(--lg-press-fill);
        color: var(--lg-press-label);
        box-shadow:
          inset 0 0 0 2px var(--lg-press-stroke),
          0 0 0 3px var(--lg-press-glow),
          0 6px 16px var(--lg-press-glow);
      }

      .tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 14px 10px;
        border-radius: 20px;
      }
      .tile .well {
        width: var(--lg-scene-well, 40px);
        height: var(--lg-scene-well, 40px);
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: #fff;
        background: linear-gradient(180deg, var(--from), var(--to));
        box-shadow:
          0 4px 12px var(--glow),
          0 1px 1px rgba(255, 255, 255, 0.7),
          inset 0 0 0 1px rgba(255, 255, 255, 0.5);
        --mdc-icon-size: calc(var(--lg-scene-well, 40px) * 0.5);
      }
      button.on .well {
        box-shadow:
          0 4px 16px var(--glow-strong),
          0 1px 1px rgba(255, 255, 255, 0.7),
          inset 0 0 0 1px rgba(255, 255, 255, 0.5);
      }
      .tile .label {
        font-size: var(--lg-scene-label, 12px);
        font-weight: 600;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .chip {
        height: var(--lg-chip-h, 42px);
        border-radius: 999px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-size: var(--lg-chip-label, 13px);
        font-weight: 600;
      }
      .chip span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .chip lg-icon {
        flex: none;
        --mdc-icon-size: 15px;
        width: 15px;
        height: 15px;
      }

      @supports (container-type: inline-size) {
        .card {
          --lg-scene-title: clamp(12.5px, 3.9cqi, 15px);
          --lg-scene-well: clamp(30px, 10.5cqi, 40px);
          --lg-scene-label: clamp(10px, 3.2cqi, 12px);
          --lg-chip-h: clamp(34px, 11cqi, 42px);
          --lg-chip-label: clamp(11px, 3.4cqi, 13px);
        }
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    const scenes = [entities, entitiesFallback, Object.keys(hass?.states ?? {})]
      .find((list) => list?.some((id) => id.startsWith("scene.")))
      ?.filter((id) => id.startsWith("scene."))
      .slice(0, 6);
    return { scenes: (scenes ?? ["scene.example"]).map((entity) => ({ entity })) };
  }

  override getCardSize(): number {
    const rows = Math.ceil(this.items.length / this.columns);
    return 1 + rows * (this.config?.style === "chips" ? 1 : 2);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.pressTimer);
  }

  private get items(): SceneItem[] {
    return this.config.scenes ?? [];
  }

  private get columns(): number {
    return clamp(Math.round(this.config.columns ?? 3), 1, 6);
  }

  private label(item: SceneItem): string {
    if (item.name) return item.name;
    const entity = item.entity ? this.hass?.states[item.entity] : undefined;
    return friendlyName(entity, item.entity ?? "");
  }

  private iconFor(item: SceneItem): string {
    if (item.icon) return item.icon;
    const entity = item.entity ? this.hass?.states[item.entity] : undefined;
    const own = entity?.attributes.icon as string | undefined;
    if (own) return own;
    const domain = item.entity?.split(".")[0] ?? "";
    return BUTTON_DOMAINS[domain]?.icon ?? "mdi:palette";
  }

  /** Items with no accent walk the design's palette, so a grid comes out varied. */
  private wellFor(item: SceneItem, index: number) {
    return wellFor(item.accent, WELLS[index % WELLS.length]);
  }

  private activate(item: SceneItem, index: number): void {
    const domain = item.entity?.split(".")[0] ?? "";
    const call = item.service ?? BUTTON_DOMAINS[domain]?.service;
    if (call) {
      const [d, s] = call.split(".");
      void this.hass?.callService(d, s, { ...(item.entity ? { entity_id: item.entity } : {}), ...(item.service_data ?? {}) });
    }
    this.pressed = index;
    window.clearTimeout(this.pressTimer);
    this.pressTimer = window.setTimeout(() => (this.pressed = undefined), PRESS_MS);
  }

  private renderTile(item: SceneItem, index: number) {
    const well = this.wellFor(item, index);
    return html`<button
      class=${classMap({ tile: true, on: this.pressed === index })}
      style=${styleMap({
        "--from": well.from,
        "--to": well.to,
        "--glow": well.glow,
        "--glow-strong": withAlpha(well.to, 0.6),
      })}
      @click=${() => this.activate(item, index)}
    >
      <span class="well"><lg-icon .icon=${this.iconFor(item)}></lg-icon></span>
      <span class="label">${this.label(item)}</span>
    </button>`;
  }

  private renderChip(item: SceneItem, index: number) {
    return html`<button class=${classMap({ chip: true, on: this.pressed === index })} @click=${() => this.activate(item, index)}>
      ${this.renderControlSurface(undefined, "pill")}
      ${item.icon ? html`<lg-icon .icon=${item.icon}></lg-icon>` : nothing}<span>${this.label(item)}</span>
    </button>`;
  }

  override render() {
    const items = this.items;
    if (!items.length) return this.renderUnavailable();
    const chips = this.config.style === "chips";
    const heading = this.config.title;

    return html`${this.renderDefs()}
      <div class=${classMap({ glass: true, card: true, chips })}>
        ${this.renderCardSurface()}
        ${heading || this.config.show_count
          ? html`<div class="head">
              <span class="heading">${heading ?? ""}</span>
              ${this.config.show_count ? html`<span class="count">${this.t("scene_count", { n: items.length })}</span>` : nothing}
            </div>`
          : nothing}
        <div class="grid" style=${styleMap({ "--cols": String(this.columns) })}>
          ${items.map((item, i) => (chips ? this.renderChip(item, i) : this.renderTile(item, i)))}
        </div>
      </div>`;
  }
}

if (!customElements.get("liquid-glass-scene-card")) customElements.define("liquid-glass-scene-card", LiquidGlassSceneCard);
