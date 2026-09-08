import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { BUTTON_DOMAINS } from "../card-constants";
import { clockTime, createTranslator, relativeTime, type Translator } from "../i18n";
import { CardTitle, IconWell, UnavailableCard, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { rowGridOptions } from "../react/grid-options";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { callConfiguredService, entityName, isUnavailable, lighten, moreInfo, pickEntity, withAlpha } from "../utils";

export interface ButtonCardConfig extends BaseCardConfig {
  /** "domain.service" to call instead of the domain's usual activation. */
  service?: string;
  service_data?: Record<string, unknown>;
  /** Accent hex colour for the icon well. */
  accent?: string;
  /** Line under the name. Defaults to the kind of thing plus when it last ran. */
  subtitle?: string;
}

/**
 * Icon well gradients exactly as the design paints them: a light top over a saturated
 * bottom. Computing the deep end by darkening the accent turns these muddy, because
 * multiplying towards black drains the saturation these need to keep.
 */
export const WELLS = [
  { from: "#FFD36B", to: "#FF8A1F" },
  { from: "#9E9CFF", to: "#5E5CE6" },
  { from: "#FF9BC2", to: "#E0417F" },
  { from: "#8FE3F4", to: "#0A7EA4" },
  { from: "#7EE8A0", to: "#1E9E4A" },
  { from: "#FFB39B", to: "#E05A2B" },
] as const;

/** A single configured accent still has to make a pair; the light end is derived. */
export function wellFor(accent: string | undefined, fallback: { from: string; to: string }): WellStyle {
  const pair = accent ? { from: lighten(accent, 0.45), to: accent } : fallback;
  return { ...pair, glow: withAlpha(pair.to, 0.3) };
}

/** Domains this card knows how to press, and what each one is called. */
export const BUTTON_ACTIONS: Record<string, { service: string; icon: string; well: { from: string; to: string }; label: string }> = {
  scene: { service: "scene.turn_on", icon: "mdi:palette", well: WELLS[0], label: "btn_scene" },
  script: { service: "script.turn_on", icon: "mdi:script-text-play", well: WELLS[1], label: "btn_script" },
  automation: { service: "automation.trigger", icon: "mdi:robot", well: WELLS[3], label: "btn_automation" },
  button: { service: "button.press", icon: "mdi:gesture-tap-button", well: WELLS[3], label: "btn_button" },
  input_button: { service: "input_button.press", icon: "mdi:gesture-tap-button", well: WELLS[3], label: "btn_button" },
};

/** How long the tick stays up after a press, matching the design's Done state. */
const DONE_MS = 2600;

const ownStyles = `
  .card {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }
  .card:focus-visible {
    outline: 2px solid var(--lg-slider-accent);
    outline-offset: 2px;
  }
  .title {
    cursor: inherit;
  }
  .action {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    --mdc-icon-size: 16px;
    transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
  }
  .action.done {
    background: rgba(48, 209, 88, 0.18);
    box-shadow: inset 0 0 0 1px rgba(48, 209, 88, 0.3);
    color: var(--lg-lock-locked-deep);
  }
  .card:active .action {
    background: var(--lg-segment-selected);
  }
`;

/** When the thing last ran: scenes keep it in the state, the rest in an attribute. */
function lastRun(entity: HassEntity): string | undefined {
  const attr = entity.attributes.last_triggered as string | undefined;
  if (attr) return attr;
  // A scene's state is the timestamp it was last applied, or "unknown".
  return Number.isNaN(Date.parse(entity.state)) ? undefined : entity.state;
}

function subtitleFor(
  entity: HassEntity,
  config: ButtonCardConfig,
  domain: string,
  justRan: boolean,
  t: Translator,
): string {
  if (config.subtitle !== undefined) return config.subtitle;
  if (justRan) return `${t("btn_done")} · ${t("just_now")}`;

  const spec = BUTTON_ACTIONS[domain];
  const kind = spec ? t(spec.label) : domain;
  const last = lastRun(entity);
  if (!last) return kind;
  // Within the day the clock time is more use than "17 hours ago".
  const age = Date.now() - new Date(last).getTime();
  const when = age < 12 * 3600 * 1000 ? relativeTime(last, t) : clockTime(last);
  return `${kind} · ${t("last")} ${when}`;
}

/** One row that runs a scene, script, automation or button, with a trailing action. */
function ButtonCard({ config, hass, host }: ReactCardProps<ButtonCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [justRan, setJustRan] = useState(false);
  const doneTimer = useRef<number | undefined>(undefined);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");

  useEffect(() => () => window.clearTimeout(doneTimer.current), []);

  if (!entity || isUnavailable(entity)) {
    return <>
      <UnavailableCard row
        refraction={refraction}
        variant={config.glass_variant}
        icon={config.icon}
        name={name}
        label={t("unavailable")}
        onOpen={() => moreInfo(host, config.entity)}
      />
    </>;
  }

  const domain = config.entity?.split(".")[0] ?? "";
  const spec = BUTTON_ACTIONS[domain];
  const well = wellFor(config.accent, spec?.well ?? WELLS[0]);
  const icon = config.icon ?? (entity.attributes.icon) ?? spec?.icon ?? "mdi:gesture-tap-button";

  const press = () => {
    const dispatched = callConfiguredService(hass, config.service ?? spec?.service, {
      entity_id: config.entity,
      ...(config.service_data ?? {}),
    });
    if (!dispatched) return;

    setJustRan(true);
    window.clearTimeout(doneTimer.current);
    doneTimer.current = window.setTimeout(() => setJustRan(false), DONE_MS);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    press();
  };

  return <>
    <LiquidGlassSurface
      className="card row"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={well.to}
      style={{ display: "flex", position: "relative" }}
      role="button"
      tabIndex={0}
      aria-label={name}
      onClick={press}
      onKeyDown={onKeyDown}
    >
      <IconWell icon={icon} style={well} />
      <CardTitle name={name} state={subtitleFor(entity, config, domain, justRan, t)} />
      <div className={`action${justRan ? " done" : ""}`}>
        <Icon icon={justRan ? "mdi:check" : "mdi:play"} />
      </div>
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassButtonCard = defineLiquidGlassCard<ButtonCardConfig>({
  tagName: "liquid-glass-button-card",
  component: ButtonCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles],
  getCardSize: () => 1,
  getGridOptions: () => rowGridOptions(),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(BUTTON_DOMAINS, hass, entities, entitiesFallback),
  }),
});
