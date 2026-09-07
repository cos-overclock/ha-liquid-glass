import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createTranslator } from "../i18n";
import { UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { callConfiguredService, clamp, entityName, withAlpha } from "../utils";
import { BUTTON_ACTIONS, WELLS, wellFor } from "./button-card";

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

const ownStyles = `
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
    color: var(--lg-text-primary);
    min-width: 0;
    transition: background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease, transform 0.1s ease;
  }
  .tile {
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .tile:active,
  .chip:active {
    transform: scale(0.97);
  }
  .tile.on,
  .chip.on {
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
  .tile.on .well {
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

  /* A chip is its own small glass surface, with the button filling it. */
  .chip {
    position: relative;
    isolation: isolate;
    height: var(--lg-chip-h, 42px);
    border-radius: 999px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    overflow: hidden;
  }
  .chip-button {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: transparent;
    color: inherit;
    font-size: var(--lg-chip-label, 13px);
    font-weight: 600;
  }
  .chip-button span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chip-button lg-icon {
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
`;

/** A list of scenes, scripts or buttons as a grid of tiles or a row of chips. */
function SceneCard({ config, hass, host }: ReactCardProps<SceneCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  /** Index of the item showing its pressed state, if any. */
  const [pressed, setPressed] = useState<number>();
  const pressTimer = useRef<number | undefined>(undefined);
  const items = config.scenes ?? [];
  const columns = clamp(Math.round(config.columns ?? 3), 1, 6);
  const chips = config.style === "chips";

  useEffect(() => () => window.clearTimeout(pressTimer.current), []);

  if (!items.length) {
    return <>
      <UnavailableCard
        refraction={refraction}
        variant={config.glass_variant}
        icon={config.icon}
        name={config.title ?? entityName(hass, undefined, config.name, "")}
        label={t("unavailable")}
      />
    </>;
  }

  const label = (item: SceneItem): string =>
    entityName(hass, item.entity ? hass?.states[item.entity] : undefined, item.name, item.entity ?? "");

  const iconFor = (item: SceneItem): string => {
    if (item.icon) return item.icon;
    const own = (item.entity ? hass?.states[item.entity] : undefined)?.attributes.icon;
    return own ?? BUTTON_ACTIONS[item.entity?.split(".")[0] ?? ""]?.icon ?? "mdi:palette";
  };

  const activate = (item: SceneItem, index: number) => {
    const call = item.service ?? BUTTON_ACTIONS[item.entity?.split(".")[0] ?? ""]?.service;
    callConfiguredService(hass, call, {
      ...(item.entity ? { entity_id: item.entity } : {}),
      ...(item.service_data ?? {}),
    });
    setPressed(index);
    window.clearTimeout(pressTimer.current);
    pressTimer.current = window.setTimeout(() => setPressed(undefined), PRESS_MS);
  };

  return <>
    <LiquidGlassSurface
      className={`card${chips ? " chips" : ""}`}
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={wellFor(config.scenes?.[0]?.accent, WELLS[0]).to}
      style={{ display: "flex", position: "relative" }}
    >
      {(config.title || config.show_count) && <div className="head">
        <span className="heading">{config.title ?? ""}</span>
        {config.show_count && <span className="count">{t("scene_count", { n: items.length })}</span>}
      </div>}
      <div className="grid" style={{ "--cols": String(columns) } as CSSProperties}>
        {items.map((item, index) => {
          const on = pressed === index;
          if (chips) {
            return (
              <LiquidGlassSurface
                key={`${item.entity ?? item.service ?? ""}:${index}`}
                className={`chip${on ? " on" : ""}`}
                refraction={refraction}
                variant={config.glass_variant}
                surface="compact"
                sourceAccent="var(--lg-accent)"
                style={{ display: "flex" }}
              >
                <button className="chip-button" onClick={() => activate(item, index)}>
                  {item.icon && <Icon icon={item.icon} />}
                  <span>{label(item)}</span>
                </button>
              </LiquidGlassSurface>
            );
          }
          const well = wellFor(item.accent, WELLS[index % WELLS.length]);
          return (
            <button
              key={`${item.entity ?? item.service ?? ""}:${index}`}
              className={`tile${on ? " on" : ""}`}
              style={{
                "--from": well.from,
                "--to": well.to,
                "--glow": well.glow,
                "--glow-strong": withAlpha(well.to, 0.6),
              } as CSSProperties}
              onClick={() => activate(item, index)}
            >
              <span className="well"><Icon icon={iconFor(item)} /></span>
              <span className="label">{label(item)}</span>
            </button>
          );
        })}
      </div>
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassSceneCard = defineLiquidGlassCard<SceneCardConfig>({
  tagName: "liquid-glass-scene-card",
  component: SceneCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles],
  getCardSize: (config) => {
    const columns = clamp(Math.round(config.columns ?? 3), 1, 6);
    const rows = Math.ceil((config.scenes?.length ?? 0) / columns);
    return 1 + rows * (config.style === "chips" ? 1 : 2);
  },
  getGridOptions: (config) => {
    const columns = clamp(Math.round(config.columns ?? 3), 1, 6);
    const rows = Math.ceil((config.scenes?.length ?? 0) / columns);
    return contentGridOptions(1 + rows * (config.style === "chips" ? 1 : 2), 12);
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => {
    const scenes = [entities, entitiesFallback, Object.keys(hass?.states ?? {})]
      .find((list) => list?.some((id) => id.startsWith("scene.")))
      ?.filter((id) => id.startsWith("scene."))
      .slice(0, 6);
    return { scenes: (scenes ?? ["scene.example"]).map((entity) => ({ entity })) };
  },
});
