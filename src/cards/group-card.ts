import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { LiquidGlassBaseCard } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { isUnavailable } from "../utils";
import type { Translator } from "../i18n";

export interface GroupCardConfig extends BaseCardConfig {
  title?: string;
  /** Replaces the generated "5 devices · 3 active" line. */
  subtitle?: string;
  cards?: LovelaceCardConfig[];
  /** Header opens and closes the group. Default true. */
  collapsible?: boolean;
  /** Start collapsed. Default false. */
  collapsed?: boolean;
  /** Status chips while collapsed. Default true. */
  summary?: boolean;
}

/** Tone drives the chip colour; every value has a readable token in both themes. */
type Tone = "off" | "warm" | "good" | "info";

interface SummaryItem {
  icon: string;
  label: string;
  tone: Tone;
}

const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:power-plug",
  input_boolean: "mdi:toggle-switch",
  fan: "mdi:fan",
  lock: "mdi:lock",
  cover: "mdi:blinds",
  climate: "mdi:thermostat",
  sensor: "mdi:gauge",
  binary_sensor: "mdi:motion-sensor",
  media_player: "mdi:speaker",
  camera: "mdi:cctv",
  scene: "mdi:palette",
  script: "mdi:script-text",
};

/** Short labels per binary_sensor device class; anything else falls back to on / off. */
const BINARY_LABELS: Record<string, [string, string]> = {
  door: ["open", "closed"],
  garage_door: ["open", "closed"],
  window: ["open", "closed"],
  opening: ["open", "closed"],
  motion: ["detected", "clear"],
  occupancy: ["detected", "clear"],
  presence: ["detected", "clear"],
};

/** Icons per binary_sensor device class, as [on, off]; the state changes the glyph. */
const BINARY_ICONS: Record<string, [string, string]> = {
  door: ["mdi:door-open", "mdi:door-closed"],
  garage_door: ["mdi:garage-open", "mdi:garage"],
  window: ["mdi:window-open", "mdi:window-closed"],
  opening: ["mdi:square-outline", "mdi:square"],
  motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
  occupancy: ["mdi:home-account", "mdi:home-outline"],
  presence: ["mdi:account", "mdi:account-outline"],
  moisture: ["mdi:water-alert", "mdi:water-off"],
  smoke: ["mdi:smoke-detector-alert", "mdi:smoke-detector"],
};

/** Domains a brand new group reaches for, in order, one card each. */
const STUB_CARDS: Array<[string, string]> = [
  ["light", "custom:liquid-glass-light-card"],
  ["switch", "custom:liquid-glass-switch-card"],
  ["sensor", "custom:liquid-glass-sensor-card"],
];

/**
 * Group card: a panel that holds other cards.
 *
 * The panel is deliberately *not* glass. Apple's guidance is that Liquid Glass never
 * stacks on itself, so the container is a plain tinted surface and the cards inside keep
 * their own glass. Collapsed, it folds down to the header plus a row of status chips.
 */
export class LiquidGlassGroupCard extends LiquidGlassBaseCard<GroupCardConfig> {
  @state() private open = true;
  /** Bumped whenever `elements` is rebuilt, so lit re-renders with the new children. */
  @state() private revision = 0;

  private elements: LovelaceCard[] = [];
  /** Guards against an out-of-order `loadCardHelpers` resolving after a newer config. */
  private buildId = 0;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .panel {
        --lg-group-pad: 16px;
        --lg-group-gap: 12px;
        border-radius: var(--lg-corner, var(--lg-radius));
        padding: var(--lg-group-pad);
        display: flex;
        flex-direction: column;
        gap: var(--lg-group-gap);
        background: var(--lg-group-panel);
        box-shadow: inset 0 0 0 1px var(--lg-group-panel-stroke);
      }
      @supports (container-type: inline-size) {
        .panel {
          --lg-group-pad: clamp(10px, 4.2cqi, 16px);
          --lg-group-gap: clamp(8px, 3.2cqi, 12px);
          --lg-corner: min(calc(var(--lg-radius) + 4px), 12cqi);
        }
      }

      .head {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 4px;
      }
      .head.tappable {
        cursor: pointer;
      }
      .head .icon-well {
        width: 32px;
        height: 32px;
      }
      .head .icon-well lg-icon {
        --mdc-icon-size: 16px;
        width: 16px;
        height: 16px;
      }
      .head .text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .head .heading {
        font-size: var(--lg-group-title, 16px);
        font-weight: 700;
        color: var(--lg-text-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .head .sub {
        font-size: 11px;
        font-weight: 500;
        color: var(--lg-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .chevron {
        flex: none;
        width: 28px;
        height: 28px;
        border: 0;
        border-radius: 50%;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        color: var(--lg-text-secondary);
        display: grid;
        place-items: center;
        cursor: pointer;
        padding: 0;
        --mdc-icon-size: 15px;
      }
      .chevron lg-icon {
        width: 15px;
        height: 15px;
        transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
      }
      .chevron.closed lg-icon {
        transform: rotate(-180deg);
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: var(--lg-group-gap);
      }
      /* Children are full cards; they bring their own :host block layout. */
      .cards > * {
        display: block;
      }

      .summary {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 4px;
      }
      .sum {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 15px;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        font-size: 11px;
        font-weight: 600;
        color: var(--tone, var(--lg-text-secondary));
        max-width: 100%;
      }
      .sum span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sum lg-icon {
        flex: none;
        --mdc-icon-size: 14px;
        width: 14px;
        height: 14px;
      }
      .sum.warm {
        --tone: var(--lg-motion-label);
      }
      .sum.good {
        --tone: var(--lg-trend-up);
      }
      .sum.info {
        --tone: var(--lg-cover-badge);
      }

      .empty {
        padding: 6px 4px 2px;
        font-size: var(--lg-state);
        color: var(--lg-text-secondary);
      }

      @supports (container-type: inline-size) {
        .panel {
          --lg-group-title: clamp(13px, 4.2cqi, 16px);
        }
      }
    `,
  ];

  /** A fresh group is easier to understand with something already in it. */
  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    const pool = [entities, entitiesFallback, Object.keys(hass?.states ?? {})].find((list) => list?.length) ?? [];
    const first = (domain: string) => pool.find((id) => id.startsWith(`${domain}.`));
    const cards = STUB_CARDS.flatMap(([domain, type]): LovelaceCardConfig[] => {
      const entity = first(domain);
      return entity ? [{ type, entity }] : [];
    });
    return { cards };
  }

  override setConfig(config: GroupCardConfig): void {
    super.setConfig(config);
    this.open = config.collapsed !== true;
    void this.buildChildren();
  }

  override getCardSize(): number {
    if (!this.open) return 1;
    const inner = this.elements.reduce((sum, el) => sum + (el.getCardSize?.() ?? 3), 0);
    return 1 + inner;
  }

  override updated(): void {
    // Children are created outside lit, so hass has to be pushed to them by hand.
    for (const el of this.elements) el.hass = this.hass;
  }

  private get cardConfigs(): LovelaceCardConfig[] {
    return this.config?.cards ?? [];
  }

  private get collapsible(): boolean {
    return this.config?.collapsible !== false;
  }

  /**
   * Our own cards inherit the group's appearance settings unless they set their own, so a
   * group forced to dark does not end up holding light cards.
   */
  private childConfig(config: LovelaceCardConfig): LovelaceCardConfig {
    if (!String(config.type ?? "").startsWith("custom:liquid-glass-")) return config;
    const out = { ...config };
    for (const key of ["theme", "refraction", "language"] as const) {
      const value = this.config?.[key];
      if (out[key] === undefined && value !== undefined) out[key] = value;
    }
    return out;
  }

  private async buildChildren(): Promise<void> {
    const id = ++this.buildId;
    const configs = this.cardConfigs.map((config) => this.childConfig(config));
    const helpers = await window.loadCardHelpers?.().catch(() => undefined);
    if (id !== this.buildId) return;

    this.elements = configs.map((config) => {
      try {
        return helpers ? helpers.createCardElement(config) : createElementFallback(config);
      } catch {
        return createElementFallback(config);
      }
    });
    for (const el of this.elements) el.hass = this.hass;
    this.revision++;
  }

  private toggle = (): void => {
    if (!this.collapsible) return;
    this.open = !this.open;
  };

  private summaryFor(config: LovelaceCardConfig): SummaryItem | undefined {
    const entityId = typeof config.entity === "string" ? config.entity : undefined;
    if (!entityId) return undefined;
    const entity = this.hass?.states[entityId];
    const domain = entityId.split(".", 1)[0];
    const icon = (config.icon as string | undefined) ?? (entity?.attributes.icon as string | undefined) ?? defaultIcon(entity, domain);
    if (isUnavailable(entity)) return { icon, label: this.t("unavailable"), tone: "off" };
    return { icon, ...describe(entity as HassEntity, domain, this.t) };
  }

  private get summaryItems(): SummaryItem[] {
    return this.cardConfigs.map((config) => this.summaryFor(config)).filter((item): item is SummaryItem => Boolean(item));
  }

  private subtitle(items: SummaryItem[]): string {
    if (this.config.subtitle) return this.config.subtitle;
    const total = this.cardConfigs.length;
    if (!total) return "";
    const active = items.filter((item) => item.tone !== "off").length;
    const parts = [this.t("grp_devices", { n: total })];
    if (items.length) parts.push(active ? this.t("grp_running", { n: active }) : this.t("grp_all_idle"));
    if (!this.open && this.collapsible) parts.push(this.t("grp_tap_expand"));
    return parts.join(" · ");
  }

  override render() {
    const items = this.summaryItems;
    const showSummary = !this.open && this.config.summary !== false && items.length > 0;

    return html`<div class="panel">
      <div class=${classMap({ head: true, tappable: this.collapsible })} @click=${this.toggle}>
        ${this.renderIconWell(this.config.icon ?? "mdi:view-grid-outline", undefined, null)}
        <div class="text">
          <div class="heading">${this.config.title ?? this.t("grp_title")}</div>
          <div class="sub">${this.subtitle(items)}</div>
        </div>
        ${this.collapsible
          ? html`<button class=${classMap({ chevron: true, closed: !this.open })} aria-expanded=${this.open}>
              <lg-icon icon="mdi:chevron-up"></lg-icon>
            </button>`
          : nothing}
      </div>
      ${showSummary
        ? html`<div class="summary">
            ${items.map((item) => html`<div class=${classMap({ sum: true, [item.tone]: true })}><lg-icon .icon=${item.icon}></lg-icon><span>${item.label}</span></div>`)}
          </div>`
        : nothing}
      ${this.open
        ? this.cardConfigs.length
          ? html`<div class="cards">${this.revision >= 0 ? this.elements : nothing}</div>`
          : html`<div class="empty">${this.t("grp_empty")}</div>`
        : nothing}
    </div>`;
  }
}

/** Builds a card element without Home Assistant's helpers, which the demo page lacks. */
function createElementFallback(config: LovelaceCardConfig): LovelaceCard {
  const type = String(config.type ?? "");
  const tag = type.startsWith("custom:") ? type.slice("custom:".length) : `hui-${type}-card`;
  const element = document.createElement(tag) as LovelaceCard;
  const apply = () => {
    try {
      element.setConfig?.(config as BaseCardConfig);
    } catch {
      /* A child that rejects its config renders its own error; the group stays up. */
    }
  };
  if (typeof element.setConfig === "function") apply();
  else void customElements.whenDefined(tag).then(apply);
  return element;
}

/** The glyph for an entity with no icon of its own; binary sensors also swap on state. */
function defaultIcon(entity: HassEntity | undefined, domain: string): string {
  if (domain === "binary_sensor") {
    const pair = BINARY_ICONS[(entity?.attributes.device_class as string | undefined) ?? ""];
    if (pair) return entity?.state === "on" ? pair[0] : pair[1];
  }
  return DOMAIN_ICONS[domain] ?? "mdi:card-outline";
}

/** One short "what is this doing right now" phrase per domain, for the collapsed chips. */
function describe(entity: HassEntity, domain: string, t: Translator): { label: string; tone: Tone } {
  const state = entity.state;
  const on = state === "on";
  switch (domain) {
    case "light": {
      if (!on) return { label: t("unlit"), tone: "off" };
      const brightness = entity.attributes.brightness as number | undefined;
      return { label: brightness ? `${Math.round((brightness / 255) * 100)}%` : t("lit"), tone: "warm" };
    }
    case "switch":
    case "input_boolean":
    case "fan":
    case "automation":
    case "siren":
      return on ? { label: t("on"), tone: "info" } : { label: t("off"), tone: "off" };
    case "lock":
      if (state === "jammed") return { label: t("jammed"), tone: "warm" };
      return state === "locked" ? { label: t("locked"), tone: "good" } : { label: t("unlocked"), tone: "warm" };
    case "cover": {
      if (state === "closed") return { label: t("closed"), tone: "off" };
      const position = entity.attributes.current_position as number | undefined;
      return { label: position === undefined ? t("open") : `${t("open")} ${Math.round(position)}%`, tone: "info" };
    }
    case "climate": {
      if (state === "off") return { label: t("mode_off"), tone: "off" };
      const target = entity.attributes.temperature as number | undefined;
      return { label: target === undefined ? t(`mode_${state}`) : `${target}°`, tone: "warm" };
    }
    case "binary_sensor": {
      const deviceClass = entity.attributes.device_class as string | undefined;
      const labels = (deviceClass && BINARY_LABELS[deviceClass]) ?? ["on", "off"];
      return on ? { label: t(labels[0]), tone: "warm" } : { label: t(labels[1]), tone: "off" };
    }
    case "media_player": {
      if (state === "playing") return { label: t("playing"), tone: "info" };
      if (state === "paused") return { label: t("paused"), tone: "off" };
      return { label: t("standby"), tone: "off" };
    }
    case "sensor": {
      const unit = (entity.attributes.unit_of_measurement as string | undefined) ?? "";
      return { label: `${state}${unit}`, tone: "off" };
    }
    default:
      return on ? { label: t("on"), tone: "info" } : { label: state, tone: "off" };
  }
}

if (!customElements.get("liquid-glass-group-card")) customElements.define("liquid-glass-group-card", LiquidGlassGroupCard);
