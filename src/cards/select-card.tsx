import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SELECT_DOMAINS } from "../card-constants";
import { createTranslator } from "../i18n";
import { CardTitle, IconWell, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import { GlassSegmentedControl, glassSegmentedControlStyles } from "../react/glass-segmented-control";
import { glassSurfaceStyles, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { darken, entityName, entityStateText, isUnavailable, lighten, moreInfo, pickEntity, withAlpha } from "../utils";

export interface SelectCardConfig extends BaseCardConfig {
  /** A single moving lens, or individually wrapped glass chips. */
  style?: "segments" | "chips";
  /** Accent hex colour for the icon well and selected choice. */
  accent?: string;
}

const PENDING_MS = 4000;

const ownStyles = `
  .card {
    gap: 14px;
  }
  .select-control {
    width: 100%;
  }
  .select-control .lg-glass-segmented > button {
    flex-direction: row;
    padding: 0 8px;
    font-size: var(--lg-select-label, 13px);
    font-weight: 550;
  }
  .option-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .option-chip {
    position: relative;
    isolation: isolate;
    flex: 1 1 auto;
    min-width: min(112px, 100%);
    height: var(--lg-select-chip-h, 42px);
    border-radius: 999px;
    overflow: hidden;
    color: var(--lg-text-secondary);
    transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }
  .option-chip.selected {
    color: var(--lg-text-primary);
    background: var(--lg-press-fill);
    box-shadow:
      inset 0 0 0 2px var(--lg-select-accent),
      0 4px 14px var(--lg-select-glow);
  }
  .option-chip button {
    width: 100%;
    height: 100%;
    min-width: 0;
    padding: 0 15px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: var(--lg-select-label, 13px);
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .option-chip button:active {
    transform: scale(0.97);
  }
  .option-chip button:focus-visible {
    outline: 2px solid var(--lg-select-accent);
    outline-offset: -3px;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-select-label: clamp(11px, 3.4cqi, 13px);
      --lg-select-chip-h: clamp(36px, 11cqi, 42px);
    }
  }
`;

function optionsFor(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((option): option is string => typeof option === "string");
}

function defaultIcon(domain: string): string {
  return domain === "input_select" ? "mdi:form-select" : "mdi:form-dropdown";
}

/** Choose one of the options exposed by a select or input_select entity. */
function SelectCard({ config, hass, host }: ReactCardProps<SelectCardConfig>) {
  const { isDark, refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const [pending, setPending] = useState<string>();
  const pendingTimer = useRef<number | undefined>(undefined);
  const domain = config.entity?.split(".")[0] ?? "select";
  const options = optionsFor(entity?.attributes.options);
  const settled = pending !== undefined && entity?.state === pending;

  useEffect(() => () => window.clearTimeout(pendingTimer.current), []);

  useEffect(() => {
    if (!settled) return;
    window.clearTimeout(pendingTimer.current);
    pendingTimer.current = window.setTimeout(() => setPending(undefined), 0);
  }, [settled]);

  const name = entityName(hass, entity, config.name, config.entity ?? "");
  if (!entity || isUnavailable(entity) || options.length === 0) {
    return <>
      <UnavailableCard
        refraction={refraction}
        variant={config.glass_variant}
        icon={config.icon ?? defaultIcon(domain)}
        name={name}
        label={entity && !isUnavailable(entity) ? t("select_no_options") : t("unavailable")}
        onOpen={() => moreInfo(host, config.entity)}
      />
    </>;
  }

  const value = pending && options.includes(pending) ? pending : entity.state;
  /*
   * The raw options are integration ids such as `eco_mode`. Home Assistant translates them
   * through the entity's own strings, so what a user reads here matches the more-info
   * dialog and every built-in card. Without that helper the id is all a card can show.
   */
  const optionLabel = (option: string) => entityStateText(hass, entity, option, option);
  const accent = config.accent;
  const accentColor = accent ?? "var(--lg-slider-accent)";
  const wellStyle = {
    from: accent ? lighten(accent, 0.42) : "var(--lg-slider-accent-light)",
    to: accent ? darken(accent, 0.2) : "var(--lg-slider-accent)",
    glow: accent ? withAlpha(accent, 0.3) : "rgba(94, 92, 230, 0.3)",
  };

  const choose = (option: string) => {
    if (!hass || !config.entity || option === value) return;
    setPending(option);
    window.clearTimeout(pendingTimer.current);
    pendingTimer.current = window.setTimeout(() => setPending(undefined), PENDING_MS);
    void hass.callService(domain, "select_option", {
      entity_id: config.entity,
      option,
    });
  };

  const cardStyle = {
    display: "flex",
    position: "relative",
    "--lg-select-accent": accentColor,
    "--lg-select-glow": accent ? withAlpha(accent, 0.25) : "rgba(94, 92, 230, 0.2)",
  } as CSSProperties;

  return <>
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={accentColor}
      style={cardStyle}
    >
      <div className="header">
        <IconWell
          icon={config.icon ?? entity.attributes.icon ?? defaultIcon(domain)}
          style={wellStyle}
          onClick={() => moreInfo(host, config.entity)}
        />
        <CardTitle
          name={name}
          state={optionLabel(value)}
          onClick={() => moreInfo(host, config.entity)}
        />
      </div>

      {config.style === "chips" ? (
        <div className="option-chips" role="group" aria-label={name}>
          {options.map((option) => {
            const selected = option === value;
            return (
              <LiquidGlassSurface
                key={option}
                className={`option-chip${selected ? " selected" : ""}`}
                refraction={refraction}
                variant={config.glass_variant}
                surface="compact"
                sourceAccent={accentColor}
                style={{ display: "flex" }}
              >
                <button
                  type="button"
                  title={optionLabel(option)}
                  aria-pressed={selected}
                  onClick={() => choose(option)}
                >
                  {optionLabel(option)}
                </button>
              </LiquidGlassSurface>
            );
          })}
        </div>
      ) : (
        <div className="select-control">
          <GlassSegmentedControl
            items={options.map((option) => ({ value: option, label: optionLabel(option) }))}
            value={value}
            onValueChange={choose}
            refraction={refraction}
            scheme={isDark ? "dark" : "light"}
            selectedColor={accentColor}
            ariaLabel={name}
          />
        </div>
      )}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassSelectCard = defineLiquidGlassCard<SelectCardConfig>({
  tagName: "liquid-glass-select-card",
  component: SelectCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, glassSegmentedControlStyles, ownStyles],
  getCardSize: () => 2,
  getGridOptions: () => contentGridOptions(3),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(SELECT_DOMAINS, hass, entities, entitiesFallback),
  }),
});
