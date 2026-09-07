import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SLIDER_DOMAINS } from "../card-constants";
import { createTranslator } from "../i18n";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { GlassSlider, glassSliderStyles } from "../react/glass-slider";
import { reactCardStyles } from "../react/card-styles";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { clamp, darken, entityName, formatNumber, isUnavailable, lighten, moreInfo, pickEntity, withAlpha } from "../utils";

export interface SliderCardConfig extends BaseCardConfig {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  /** Line under the name. Defaults to a description of the step or level. */
  subtitle?: string;
  /** Accent hex colour for the icon well and the track fill. */
  accent?: string;
  /** Tick marks on the track: true derives a count from the steps, a number sets it. */
  ticks?: boolean | number;
  /** Show the min and max labels under the track (default true). Off saves a row. */
  show_range?: boolean;
  decimals?: number;
  /** Read the value from this attribute instead of the domain's usual place. */
  attribute?: string;
  /** "domain.service" to call on release, overriding the domain default. */
  service?: string;
  /** Key the value is sent under. Defaults to "value". */
  service_key?: string;
}

export interface SliderSpec {
  min: number;
  max: number;
  step: number;
  unit: string;
  icon: string;
  value: number | undefined;
  call?: (value: number) => [domain: string, service: string, data: Record<string, unknown>];
}

const numeric = (value: unknown): number | undefined =>
  value !== null && value !== "" && Number.isFinite(Number(value)) ? Number(value) : undefined;

/** Resolve domain conventions first, then apply explicit card configuration. */
export function resolveSliderSpec(entity: HassEntity, config: SliderCardConfig): SliderSpec {
  const attributes = entity.attributes;
  const domain = entity.entity_id.split(".")[0];
  let base: SliderSpec;

  switch (domain) {
    case "input_number":
    case "number":
      base = {
        min: numeric(attributes.min) ?? 0,
        max: numeric(attributes.max) ?? 100,
        step: numeric(attributes.step) ?? 1,
        unit: (attributes.unit_of_measurement as string) ?? "",
        icon: "mdi:tune-variant",
        value: numeric(entity.state),
        call: (value) => [domain, "set_value", { value }],
      };
      break;
    case "fan":
      base = {
        min: 0, max: 100, step: numeric(attributes.percentage_step) ?? 1, unit: "%", icon: "mdi:fan",
        value: entity.state === "on" ? numeric(attributes.percentage) ?? 0 : 0,
        call: (value) => ["fan", "set_percentage", { percentage: Math.round(value) }],
      };
      break;
    case "light":
      base = {
        min: 0, max: 100, step: 1, unit: "%", icon: "mdi:lightbulb",
        value: entity.state === "on" ? Math.round(((numeric(attributes.brightness) ?? 0) / 255) * 100) : 0,
        call: (value) => ["light", "turn_on", { brightness_pct: Math.round(value) }],
      };
      break;
    case "media_player":
      base = {
        min: 0, max: 100, step: 1, unit: "%", icon: "mdi:volume-high",
        value: Math.round((numeric(attributes.volume_level) ?? 0) * 100),
        call: (value) => ["media_player", "volume_set", { volume_level: Math.round(value) / 100 }],
      };
      break;
    case "cover":
      base = {
        min: 0, max: 100, step: 1, unit: "%", icon: "mdi:blinds-horizontal",
        value: numeric(attributes.current_position) ?? (entity.state === "closed" ? 0 : 100),
        call: (value) => ["cover", "set_cover_position", { position: Math.round(value) }],
      };
      break;
    case "valve":
      base = {
        min: 0, max: 100, step: 1, unit: "%", icon: "mdi:pipe-valve",
        value: numeric(attributes.current_position) ?? (entity.state === "closed" ? 0 : 100),
        call: (value) => ["valve", "set_valve_position", { position: Math.round(value) }],
      };
      break;
    case "humidifier":
      base = {
        min: numeric(attributes.min_humidity) ?? 0,
        max: numeric(attributes.max_humidity) ?? 100,
        step: 1, unit: "%", icon: "mdi:air-humidifier", value: numeric(attributes.humidity),
        call: (value) => ["humidifier", "set_humidity", { humidity: Math.round(value) }],
      };
      break;
    case "water_heater":
      base = {
        min: numeric(attributes.min_temp) ?? 30,
        max: numeric(attributes.max_temp) ?? 60,
        step: numeric(attributes.target_temp_step) ?? 1,
        unit: "°", icon: "mdi:water-boiler", value: numeric(attributes.temperature),
        call: (value) => ["water_heater", "set_temperature", { temperature: value }],
      };
      break;
    case "climate":
      base = {
        min: numeric(attributes.min_temp) ?? 7,
        max: numeric(attributes.max_temp) ?? 35,
        step: numeric(attributes.target_temp_step) ?? 0.5,
        unit: "°", icon: "mdi:thermostat", value: numeric(attributes.temperature),
        call: (value) => ["climate", "set_temperature", { temperature: value }],
      };
      break;
    default:
      base = {
        min: 0, max: 100, step: 1,
        unit: (attributes.unit_of_measurement as string) ?? "",
        icon: "mdi:tune-variant",
        value: numeric(entity.state),
      };
  }

  let call = base.call;
  if (config.service) {
    const separator = config.service.indexOf(".");
    call = separator > 0 && separator < config.service.length - 1
      ? (value) => [
          config.service!.slice(0, separator),
          config.service!.slice(separator + 1),
          { [config.service_key ?? "value"]: value },
        ]
      : undefined;
  }

  return {
    min: config.min ?? base.min,
    max: config.max ?? base.max,
    step: config.step ?? base.step,
    unit: config.unit ?? base.unit,
    icon: config.icon ?? (attributes.icon) ?? base.icon,
    value: config.attribute ? numeric(attributes[config.attribute]) : base.value,
    call,
  };
}

const ownStyles = `
  .card {
    gap: 16px;
    width: 100%;
  }
  .value {
    flex: none;
    display: flex;
    align-items: flex-end;
    gap: 2px;
    font-family: var(--lg-font-ui);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .value .num {
    font-size: var(--lg-sv, 28px);
    line-height: 1.1;
    letter-spacing: -1px;
    color: var(--lg-text-primary);
  }
  .value .unit {
    font-size: var(--lg-sv-unit, 15px);
    line-height: 1.6;
    letter-spacing: -0.2px;
    color: var(--lg-text-secondary);
  }
  .value.zero .num { color: var(--lg-text-secondary); }
  .track-wrap {
    position: relative;
    --lg-slider-height: var(--lg-track-h, 44px);
    --lg-slider-bar-height: var(--lg-bar-h, 6px);
    --lg-slider-knob-size: var(--lg-knob-size, 22px);
    --lg-slider-fill: linear-gradient(90deg, var(--fill-from), var(--fill-to));
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-sv: clamp(20px, 7.4cqi, 28px);
      --lg-sv-unit: clamp(11px, 3.9cqi, 15px);
      --lg-track-h: clamp(34px, 11.6cqi, 44px);
      --lg-bar-h: clamp(5px, 1.6cqi, 6px);
      --lg-knob-size: clamp(18px, 5.8cqi, 22px);
    }
  }
`;

function settled(spec: SliderSpec, pending: number | undefined): boolean {
  if (pending === undefined) return true;
  if (spec.value === undefined) return false;
  return Math.abs(spec.value - pending) <= Math.max(spec.step / 2, 1);
}

function SliderCard({ config, hass, host }: ReactCardProps<SliderCardConfig>) {
  const { isDark, refraction } = useCardHost(host, config, hass);
  const [preview, setPreview] = useState<number>();
  const [pending, setPending] = useState<number>();
  const pendingTimer = useRef<number | undefined>(undefined);
  const language = config.language ?? hass?.locale?.language ?? hass?.language;
  const t = createTranslator(language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;

  useEffect(() => () => window.clearTimeout(pendingTimer.current), []);

  const spec = entity && !isUnavailable(entity) ? resolveSliderSpec(entity, config) : undefined;
  const isSettled = spec ? settled(spec, pending) : true;

  useEffect(() => {
    if (pending !== undefined && isSettled) {
      window.clearTimeout(pendingTimer.current);
      setPending(undefined);
    }
  }, [isSettled, pending]);

  if (!entity || isUnavailable(entity) || !spec) {
    const name = entityName(hass, entity, config.name, config.entity ?? "");
    return <>
      <LiquidGlassSurface
        className="card"
        refraction={refraction}
        variant={config.glass_variant}
        sourceAccent="var(--lg-slider-accent)"
        style={{ display: "flex", position: "relative" }}
      >
        <div className="header">
          <div className="icon-well idle" onClick={() => moreInfo(host, config.entity)} role="button">
            <Icon icon={config.icon ?? "mdi:help-circle-outline"} />
          </div>
          <div className="title" onClick={() => moreInfo(host, config.entity)}>
            <div className="name">{name}</div>
            <div className="state">{t("unavailable")}</div>
          </div>
        </div>
      </LiquidGlassSurface>
    </>;
  }

  const rawValue = preview ?? (isSettled ? spec.value : pending) ?? spec.min;
  const value = clamp(rawValue, spec.min, spec.max);
  const zero = spec.min === 0 && value <= 0;
  const decimals = config.decimals ?? (Number.isInteger(spec.step) ? 0 : 1);
  const accent = config.accent;
  const wellFrom = accent ? lighten(accent, 0.4) : "var(--lg-slider-accent-light)";
  const wellTo = accent ? darken(accent, 0.3) : "var(--lg-slider-accent-deep)";
  const wellGlow = accent ? withAlpha(accent, 0.3) : "rgba(94, 92, 230, 0.3)";
  const fillFrom = accent ? lighten(accent, 0.55) : "var(--lg-slider-fill-light)";
  const fillTo = accent ?? "var(--lg-slider-accent)";
  const levels = spec.step > 0 ? Math.round((spec.max - spec.min) / spec.step) : 0;
  const subtitle = config.subtitle !== undefined
    ? config.subtitle
    : spec.min === 0 && value <= 0
      ? t("slider_off")
      : levels >= 2 && levels <= 12
        ? t("slider_levels", { n: levels, i: Math.round((value - spec.min) / spec.step) })
        : t("slider_step", { s: `${formatNumber(hass, spec.step)}${spec.unit}` });
  const tickCount = typeof config.ticks === "number"
    ? clamp(Math.round(config.ticks), 0, 20)
    : config.ticks === true && levels >= 2 && levels <= 12 ? levels : 0;
  const format = (next: number) => formatNumber(hass, next, decimals);

  const commit = (next: number) => {
    setPreview(undefined);
    if (!spec.call || !hass) return;
    setPending(next);
    window.clearTimeout(pendingTimer.current);
    pendingTimer.current = window.setTimeout(() => setPending(undefined), 4000);
    const [domain, service, data] = spec.call(next);
    void hass.callService(domain, service, { entity_id: config.entity, ...data });
  };

  const cardStyle = {
    display: "flex",
    position: "relative",
    "--fill-from": fillFrom,
    "--fill-to": fillTo,
  } as CSSProperties;

  return <>
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={fillTo}
      style={cardStyle}
    >
      <div className="header">
        <div
          className={`icon-well${zero ? " idle" : ""}`}
          style={zero ? undefined : {
            "--well-from": wellFrom,
            "--well-to": wellTo,
            "--well-glow": wellGlow,
          } as CSSProperties}
          onClick={() => moreInfo(host, config.entity)}
          role="button"
        >
          <Icon icon={spec.icon} />
        </div>
        <div className="title" onClick={() => moreInfo(host, config.entity)}>
          <div className="name">{entityName(hass, entity, config.name, config.entity ?? "")}</div>
          <div className="state">{subtitle}</div>
        </div>
        <div className={`value${zero ? " zero" : ""}`}>
          <span className="num">{format(value)}</span>
          {spec.unit && <span className="unit">{spec.unit}</span>}
        </div>
      </div>

      <div className="track-wrap">
        <GlassSlider
          value={value}
          min={spec.min}
          max={spec.max}
          step={spec.step}
          disabled={!spec.call}
          refraction={refraction}
          scheme={isDark ? "dark" : "light"}
          showFill={!zero}
          ticks={tickCount}
          label={entityName(hass, entity, config.name, config.entity ?? "")}
          onInput={setPreview}
          onChange={commit}
        />
      </div>

      {config.show_range !== false && <div className="ticks">
        <span>{format(spec.min)}{spec.unit}</span>
        <span>{format(spec.max)}{spec.unit}</span>
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassSliderCard = defineLiquidGlassCard<SliderCardConfig>({
  tagName: "liquid-glass-slider-card",
  component: SliderCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, glassSliderStyles, ownStyles],
  getCardSize: () => 2,
  getGridOptions: (config) => contentGridOptions(config.show_range === false ? 2 : 3),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(SLIDER_DOMAINS, hass, entities, entitiesFallback),
  }),
});
