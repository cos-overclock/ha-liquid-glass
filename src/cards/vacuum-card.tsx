import type { CSSProperties } from "react";
import { createTranslator, relativeTime } from "../i18n";
import { Badge, CardTitle, UnavailableCard, type BadgeStyle, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { entityName, entityStateText, isUnavailable, moreInfo, pickEntity, supportsFeature, withAlpha } from "../utils";

export interface VacuumCardConfig extends BaseCardConfig {
  show_fan_speed?: boolean;
  show_stats?: boolean;
  show_locate?: boolean;
  show_clean_spot?: boolean;
}

export const VacuumFeature = {
  PAUSE: 4,
  STOP: 8,
  RETURN_HOME: 16,
  FAN_SPEED: 32,
  LOCATE: 512,
  CLEAN_SPOT: 1024,
  START: 8192,
} as const;

const ownStyles = `
  .card {
    --vacuum-accent: #0a84ff;
    --vacuum-accent-light: #68c5ff;
  }
  .icon-well.running lg-icon { animation: lg-vacuum-roam 2.2s ease-in-out infinite; }
  .icon-well.returning lg-icon { animation: lg-vacuum-return 1.35s ease-in-out infinite; }
  @keyframes lg-vacuum-roam {
    0%, 100% { transform: translateX(-2px) rotate(-5deg); }
    50% { transform: translateX(2px) rotate(5deg); }
  }
  @keyframes lg-vacuum-return {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-4px); }
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .stat {
    min-width: 0;
    padding: 10px 12px;
    border-radius: 16px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .stat-label {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--lg-text-secondary);
    font-size: var(--lg-tick);
  }
  .stat-label lg-icon { --mdc-icon-size: 14px; }
  .stat-value {
    margin-top: 3px;
    color: var(--lg-text-primary);
    font-size: var(--lg-label);
    font-weight: 650;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(8px, 3cqi, 12px);
  }
  .control {
    min-width: 0;
    display: grid;
    justify-items: center;
    gap: 5px;
    color: var(--lg-text-secondary);
    font: inherit;
    font-size: var(--lg-tick);
  }
  .control .round-btn { margin: 0; }
  .control.primary .round-btn {
    color: #fff;
    background: linear-gradient(180deg, var(--vacuum-accent-light), var(--vacuum-accent));
    box-shadow: 0 5px 14px color-mix(in srgb, var(--vacuum-accent) 30%, transparent);
  }
  .control.primary { color: var(--lg-text-primary); font-weight: 600; }
  .control.danger .round-btn { color: var(--lg-lock-unlocked-deep); }
  .fan-speed {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .fan-title {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--lg-text-secondary);
    font-size: var(--lg-label);
    font-weight: 600;
  }
  .fan-title lg-icon { --mdc-icon-size: 16px; }
  .speed-options {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  .speed {
    min-height: 34px;
    padding: 0 12px;
    border: 0;
    border-radius: 17px;
    color: var(--lg-text-secondary);
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    font: inherit;
    font-size: var(--lg-tick);
    cursor: pointer;
  }
  .speed.selected {
    color: #fff;
    background: linear-gradient(180deg, var(--vacuum-accent-light), var(--vacuum-accent));
    box-shadow: 0 3px 10px color-mix(in srgb, var(--vacuum-accent) 24%, transparent);
  }
  .speed:focus-visible, .round-btn:focus-visible {
    outline: 2px solid var(--vacuum-accent);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .icon-well.running lg-icon, .icon-well.returning lg-icon { animation: none; }
  }
  @container (max-width: 250px) {
    .control span { display: none; }
    .controls { justify-content: space-between; }
  }
`;

interface VacuumVisual {
  icon: string;
  labelKey: string;
  accent?: string;
  light?: string;
  className?: string;
}

interface VacuumControl {
  key: string;
  icon: string;
  label: string;
  service: string;
  className?: string;
}

function visualFor(state: string): VacuumVisual {
  switch (state) {
    case "cleaning": return { icon: "mdi:robot-vacuum", labelKey: "vacuum_cleaning", accent: "#0A84FF", light: "#68C5FF", className: "running" };
    case "returning": return { icon: "mdi:home-import-outline", labelKey: "vacuum_returning", accent: "#2BB3D0", light: "#78DCEA", className: "returning" };
    case "paused": return { icon: "mdi:pause-circle-outline", labelKey: "paused", accent: "#FF9F0A", light: "#FFD06B" };
    case "docked": return { icon: "mdi:robot-vacuum-variant", labelKey: "vacuum_docked" };
    case "error": return { icon: "mdi:robot-vacuum-alert", labelKey: "vacuum_error", accent: "#FF3B30", light: "#FF8A80" };
    default: return { icon: "mdi:robot-vacuum", labelKey: "idle" };
  }
}

function numeric(value: unknown): number | undefined {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function options(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function VacuumCard({ config, hass, host }: ReactCardProps<VacuumCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);

  if (!entity || isUnavailable(entity)) {
    return <UnavailableCard
      refraction={refraction}
      variant={config.glass_variant}
      icon={config.icon ?? "mdi:robot-vacuum"}
      name={name}
      label={t("unavailable")}
      onOpen={open}
    />;
  }

  const visual = visualFor(entity.state);
  const accent = visual.accent;
  const well: WellStyle | undefined = accent
    ? { from: visual.light ?? accent, to: accent, glow: withAlpha(accent, 0.28) }
    : undefined;
  const badge: BadgeStyle | undefined = accent
    ? { color: accent, bg: withAlpha(accent, 0.18), stroke: withAlpha(accent, 0.3) }
    : undefined;
  const state = entityStateText(hass, entity, t(visual.labelKey));
  const battery = numeric(entity.attributes.battery_level);
  const cleanedArea = numeric(entity.attributes.cleaned_area);
  const areaUnit = (entity.attributes.cleaned_area_unit as string | undefined) ?? "m²";
  const fanSpeed = entity.attributes.fan_speed as string | undefined;
  const fanSpeeds = options(entity.attributes.fan_speed_list);
  const paused = entity.state === "paused";
  const call = (service: string, data: Record<string, unknown> = {}) => {
    if (!hass || !config.entity) return;
    void hass.callService("vacuum", service, { entity_id: config.entity, ...data });
  };

  const primaryControl = entity.state === "cleaning"
    ? supportsFeature(entity, VacuumFeature.PAUSE)
      ? { key: "pause", icon: "mdi:pause", label: t("vacuum_pause"), service: "pause", className: "primary" }
      : undefined
    : supportsFeature(entity, VacuumFeature.START)
      ? { key: paused ? "resume" : "start", icon: "mdi:play", label: t(paused ? "vacuum_resume" : "vacuum_start"), service: "start", className: "primary" }
      : undefined;
  const controls: VacuumControl[] = ([
    primaryControl,
    supportsFeature(entity, VacuumFeature.STOP)
      ? { key: "stop", icon: "mdi:stop", label: t("vacuum_stop"), service: "stop", className: "danger" }
      : undefined,
    supportsFeature(entity, VacuumFeature.RETURN_HOME)
      ? { key: "dock", icon: "mdi:home-import-outline", label: t("vacuum_dock"), service: "return_to_base" }
      : undefined,
    config.show_locate !== false && supportsFeature(entity, VacuumFeature.LOCATE)
      ? { key: "locate", icon: "mdi:map-marker-radius", label: t("vacuum_locate"), service: "locate" }
      : undefined,
    config.show_clean_spot === true && supportsFeature(entity, VacuumFeature.CLEAN_SPOT)
      ? { key: "spot", icon: "mdi:target", label: t("vacuum_spot"), service: "clean_spot" }
      : undefined,
  ] as Array<VacuumControl | undefined>).filter((item): item is VacuumControl => Boolean(item));

  const cardStyle = {
    display: "flex",
    position: "relative",
    "--vacuum-accent": accent ?? "#0A84FF",
    "--vacuum-accent-light": visual.light ?? "#68C5FF",
  } as CSSProperties;

  return (
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={accent}
      style={cardStyle}
    >
      <div className="header">
        <div className={`icon-well${well ? "" : " idle"}${visual.className ? ` ${visual.className}` : ""}`} style={well ? {
          "--well-from": well.from,
          "--well-to": well.to,
          "--well-glow": well.glow,
        } as CSSProperties : undefined} onClick={open} role="button">
          <Icon icon={config.icon ?? entity.attributes.icon ?? visual.icon} />
        </div>
        <CardTitle name={name} state={`${state} · ${t("since", { t: relativeTime(entity.last_changed, t) })}`} onClick={open} />
        <Badge label={state} style={badge} />
      </div>

      {config.show_stats !== false && (battery !== undefined || cleanedArea !== undefined) && (
        <div className="stats">
          {battery !== undefined && <div className="stat">
            <div className="stat-label"><Icon icon="mdi:battery" /><span>{t("vacuum_battery")}</span></div>
            <div className="stat-value">{Math.round(battery)}%</div>
          </div>}
          {cleanedArea !== undefined && <div className="stat">
            <div className="stat-label"><Icon icon="mdi:ruler-square" /><span>{t("vacuum_area")}</span></div>
            <div className="stat-value">{cleanedArea} {areaUnit}</div>
          </div>}
        </div>
      )}

      {controls.length > 0 && <div className="controls" role="group" aria-label={name}>
        {controls.map((control) => <div key={control.key} className={`control ${control.className ?? ""}`}>
          <button className="round-btn" type="button" title={control.label} onClick={() => call(control.service)}>
            <Icon icon={control.icon} />
          </button>
          <span>{control.label}</span>
        </div>)}
      </div>}

      {config.show_fan_speed !== false && supportsFeature(entity, VacuumFeature.FAN_SPEED) && fanSpeeds.length > 0 && (
        <div className="fan-speed">
          <div className="fan-title"><Icon icon="mdi:fan" /><span>{t("vacuum_fan_speed")}</span></div>
          <div className="speed-options" role="group" aria-label={t("vacuum_fan_speed")}>
            {fanSpeeds.map((speed) => <button
              key={speed}
              className={`speed${speed === fanSpeed ? " selected" : ""}`}
              type="button"
              aria-pressed={speed === fanSpeed}
              onClick={() => call("set_fan_speed", { fan_speed: speed })}
            >{speed}</button>)}
          </div>
        </div>
      )}
    </LiquidGlassSurface>
  );
}

export const LiquidGlassVacuumCard = defineLiquidGlassCard<VacuumCardConfig>({
  tagName: "liquid-glass-vacuum-card",
  component: VacuumCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles],
  getCardSize: () => 4,
  getGridOptions: () => contentGridOptions(5),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["vacuum"], hass, entities, entitiesFallback),
  }),
});
