import { useEffect, useMemo, useRef, useState } from "react";
import { createTranslator, type Translator } from "../i18n";
import { IconWell } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { Icon } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { isUnavailable } from "../utils";

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

/** The component reports its real height here, since only it knows what is mounted. */
type GroupHost = HTMLElement & { lgGroupSize?: number };

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

const INHERITED_CONFIG = [
  "theme",
  "refraction",
  "refraction_quality",
  "language",
  "glass_variant",
] as const;
const EMPTY_CARD_CONFIGS: LovelaceCardConfig[] = [];

const ownStyles = `
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
      --lg-group-title: clamp(13px, 4.2cqi, 16px);
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
`;

/** Builds a card element without Home Assistant's helpers, which the demo page lacks. */
function createElementFallback(config: LovelaceCardConfig): LovelaceCard {
  const type = String(config.type ?? "");
  const tag = type.startsWith("custom:") ? type.slice("custom:".length) : `hui-${type}-card`;
  const element = document.createElement(tag) as LovelaceCard;
  const apply = () => {
    try {
      element.setConfig?.(config);
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
    const pair = BINARY_ICONS[(entity?.attributes.device_class) ?? ""];
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
      const deviceClass = entity.attributes.device_class;
      const labels = (deviceClass && BINARY_LABELS[deviceClass]) ?? ["on", "off"];
      return on ? { label: t(labels[0]), tone: "warm" } : { label: t(labels[1]), tone: "off" };
    }
    case "media_player": {
      if (state === "playing") return { label: t("playing"), tone: "info" };
      if (state === "paused") return { label: t("paused"), tone: "off" };
      return { label: t("standby"), tone: "off" };
    }
    case "sensor": {
      const unit = (entity.attributes.unit_of_measurement) ?? "";
      return { label: `${state}${unit}`, tone: "off" };
    }
    default:
      return on ? { label: t("on"), tone: "info" } : { label: state, tone: "off" };
  }
}

/**
 * A panel that holds other cards.
 *
 * The panel is deliberately *not* glass. Apple's guidance is that Liquid Glass never
 * stacks on itself, so the container is a plain tinted surface and the cards inside keep
 * their own glass. Collapsed, it folds down to the header plus a row of status chips.
 */
function GroupCard({ config, hass, host }: ReactCardProps<GroupCardConfig>) {
  useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [open, setOpen] = useState(config.collapsed !== true);
  const [elements, setElements] = useState<LovelaceCard[]>([]);
  const mount = useRef<HTMLDivElement>(null);
  const cardConfigs = config.cards ?? EMPTY_CARD_CONFIGS;
  const collapsible = config.collapsible !== false;
  /**
   * Our own cards inherit the group's appearance settings unless they set their own, so a
   * group forced to dark does not end up holding light cards.
   */
  const childConfigs = useMemo(() => cardConfigs.map((card) => {
    if (!String(card.type ?? "").startsWith("custom:liquid-glass-")) return card;
    const out = { ...card };
    for (const key of INHERITED_CONFIG) {
      if (out[key] === undefined && config[key] !== undefined) out[key] = config[key];
    }
    return out;
    /*
     * The inherited keys are listed one by one on purpose: `config` is a fresh object on
     * every setConfig, so depending on it would rebuild every child card each time.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    cardConfigs,
    config.glass_variant,
    config.language,
    config.refraction,
    config.refraction_quality,
    config.theme,
  ]);

  useEffect(() => setOpen(config.collapsed !== true), [config.collapsed]);

  // Children are Lovelace elements, so they are created outside React and adopted.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const helpers = await window.loadCardHelpers?.().catch(() => undefined);
      if (cancelled) return;
      setElements(childConfigs.map((card) => {
        try {
          return helpers ? helpers.createCardElement(card) : createElementFallback(card);
        } catch {
          return createElementFallback(card);
        }
      }));
    })();
    return () => { cancelled = true; };
  }, [childConfigs]);

  useEffect(() => {
    mount.current?.replaceChildren(...elements);
  }, [elements, open]);

  // hass is pushed by hand, the same way Home Assistant feeds a nested card.
  useEffect(() => {
    for (const element of elements) element.hass = hass;
    (host as GroupHost).lgGroupSize = open
      ? 1 + elements.reduce((sum, element) => sum + (element.getCardSize?.() ?? 3), 0)
      : 1;
  });

  const items = cardConfigs
    .map((card): SummaryItem | undefined => {
      const entityId = typeof card.entity === "string" ? card.entity : undefined;
      if (!entityId) return undefined;
      const entity = hass?.states[entityId];
      const domain = entityId.split(".", 1)[0];
      const icon = (card.icon as string | undefined)
        ?? (entity?.attributes.icon)
        ?? defaultIcon(entity, domain);
      if (isUnavailable(entity)) return { icon, label: t("unavailable"), tone: "off" };
      return { icon, ...describe(entity as HassEntity, domain, t) };
    })
    .filter((item): item is SummaryItem => Boolean(item));

  const subtitle = (): string => {
    if (config.subtitle) return config.subtitle;
    if (!cardConfigs.length) return "";
    const active = items.filter((item) => item.tone !== "off").length;
    const parts = [t("grp_devices", { n: cardConfigs.length })];
    if (items.length) parts.push(active ? t("grp_running", { n: active }) : t("grp_all_idle"));
    if (!open && collapsible) parts.push(t("grp_tap_expand"));
    return parts.join(" · ");
  };

  return <>
    <div className="panel">
      <div
        className={`head${collapsible ? " tappable" : ""}`}
        onClick={() => collapsible && setOpen((value) => !value)}
      >
        <IconWell icon={config.icon ?? "mdi:view-grid-outline"} />
        <div className="text">
          <div className="heading">{config.title ?? t("grp_title")}</div>
          <div className="sub">{subtitle()}</div>
        </div>
        {collapsible && <button className={`chevron${open ? "" : " closed"}`} aria-expanded={open}>
          <Icon icon="mdi:chevron-up" />
        </button>}
      </div>

      {!open && config.summary !== false && items.length > 0 && <div className="summary">
        {items.map((item, index) => (
          <div className={`sum ${item.tone}`} key={index}>
            <Icon icon={item.icon} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>}

      {open && (cardConfigs.length
        ? <div className="cards" ref={mount} />
        : <div className="empty">{t("grp_empty")}</div>)}
    </div>
  </>;
}

export const LiquidGlassGroupCard = defineLiquidGlassCard<GroupCardConfig>({
  tagName: "liquid-glass-group-card",
  component: GroupCard,
  styles: [tokens, reactCardStyles, ownStyles],
  getCardSize: (config, host) =>
    (host as GroupHost).lgGroupSize ?? (config.collapsed ? 1 : 1 + (config.cards?.length ?? 0) * 3),
  /** A fresh group is easier to understand with something already in it. */
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => {
    const pool = [entities, entitiesFallback, Object.keys(hass?.states ?? {})].find((list) => list?.length) ?? [];
    const cards = STUB_CARDS.flatMap(([domain, type]): LovelaceCardConfig[] => {
      const entity = pool.find((id) => id.startsWith(`${domain}.`));
      return entity ? [{ type, entity }] : [];
    });
    return { cards };
  },
});
