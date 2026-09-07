import { createTranslator, relativeTime } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard, type BadgeStyle, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import { glassSliderStyles, GlassSlider } from "../react/glass-slider";
import { glassSwitchStyles, GlassSwitch } from "../react/glass-switch";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { useOptimisticValue } from "../react/use-optimistic-value";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { entityName, entityStateText, isUnavailable, moreInfo, pickEntity, supportsFeature } from "../utils";

export interface FanCardConfig extends BaseCardConfig {
  show_speed?: boolean;
  show_presets?: boolean;
  show_oscillation?: boolean;
  show_direction?: boolean;
}

export const FanFeature = {
  SET_SPEED: 1,
  OSCILLATE: 2,
  DIRECTION: 4,
  PRESET_MODE: 8,
  TURN_OFF: 16,
  TURN_ON: 32,
} as const;

const ownStyles = `
  .card {
    --fan-accent: #5e5ce6;
    --fan-accent-light: #9e9cff;
  }
  .card.fan-on .icon-well lg-icon { animation: lg-fan-spin 1.8s linear infinite; }
  @keyframes lg-fan-spin { to { transform: rotate(360deg); } }
  .power { flex: none; }
  .speed-control, .presets, .extras { display: flex; flex-direction: column; gap: 8px; }
  .control-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: var(--lg-text-secondary);
    font-size: var(--lg-label);
    font-weight: 600;
  }
  .control-head > span:first-child { display: inline-flex; align-items: center; gap: 6px; }
  .control-head lg-icon { --mdc-icon-size: 16px; }
  .speed-value { color: var(--fan-accent); font-weight: 700; }
  .speed-ticks {
    display: flex;
    justify-content: space-between;
    color: var(--lg-text-secondary);
    font-size: var(--lg-tick);
  }
  .preset-options { display: flex; flex-wrap: wrap; gap: 7px; }
  .preset, .extra {
    min-height: 36px;
    padding: 0 13px;
    border: 0;
    border-radius: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--lg-text-secondary);
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    font: inherit;
    font-size: var(--lg-tick);
    cursor: pointer;
  }
  .preset.selected, .extra.selected {
    color: #fff;
    background: linear-gradient(180deg, var(--fan-accent-light), var(--fan-accent));
    box-shadow: 0 3px 10px color-mix(in srgb, var(--fan-accent) 25%, transparent);
  }
  .preset:focus-visible, .extra:focus-visible {
    outline: 2px solid var(--fan-accent);
    outline-offset: 2px;
  }
  .extras { flex-direction: row; flex-wrap: wrap; }
  .extra { flex: 1 1 120px; }
  .extra lg-icon { --mdc-icon-size: 18px; }
  @media (prefers-reduced-motion: reduce) { .card.fan-on .icon-well lg-icon { animation: none; } }
`;

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function FanCard({ config, hass, host }: ReactCardProps<FanCardConfig>) {
  const { isDark, refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const reportedPercentage = Number(entity?.attributes.percentage);
  const speedValue = useOptimisticValue(Number.isFinite(reportedPercentage) ? reportedPercentage : undefined, 1);
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);

  if (!entity || isUnavailable(entity)) {
    return <UnavailableCard
      refraction={refraction}
      variant={config.glass_variant}
      icon={config.icon ?? "mdi:fan"}
      name={name}
      label={t("unavailable")}
      onOpen={open}
    />;
  }

  const on = entity.state === "on";
  const percentage = Math.max(0, Math.min(100, speedValue.value ?? (on ? 100 : 0)));
  const step = Math.max(1, Number(entity.attributes.percentage_step) || 1);
  const presetMode = entity.attributes.preset_mode as string | undefined;
  const presetModes = strings(entity.attributes.preset_modes);
  const oscillating = entity.attributes.oscillating === true;
  const direction = entity.attributes.direction as string | undefined;
  const canPower = on ? supportsFeature(entity, FanFeature.TURN_OFF) : supportsFeature(entity, FanFeature.TURN_ON);
  const accent = "#5E5CE6";
  const well: WellStyle | undefined = on
    ? { from: "#9E9CFF", to: accent, glow: "rgba(94, 92, 230, 0.3)" }
    : undefined;
  const badge: BadgeStyle | undefined = on
    ? { color: isDark ? "#B0AFFF" : accent, bg: "rgba(94, 92, 230, 0.18)", stroke: "rgba(94, 92, 230, 0.3)" }
    : undefined;
  const state = entityStateText(hass, entity, t(on ? "on" : "off"));
  const stateLine = on
    ? `${presetMode ?? `${Math.round(percentage)}%`} · ${t("since", { t: relativeTime(entity.last_changed, t) })}`
    : `${state} · ${t("last_change", { t: relativeTime(entity.last_changed, t) })}`;
  const call = (service: string, data: Record<string, unknown> = {}) => {
    if (!hass || !config.entity) return;
    void hass.callService("fan", service, { entity_id: config.entity, ...data });
  };

  return (
    <LiquidGlassSurface
      className={`card${on ? " fan-on" : ""}`}
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={accent}
      style={{ display: "flex", position: "relative" }}
    >
      <div className="header">
        <div className="fan-icon"><IconWell icon={config.icon ?? entity.attributes.icon ?? "mdi:fan"} style={well} onClick={open} /></div>
        <CardTitle name={name} state={stateLine} onClick={open} />
        <Badge label={on ? `${Math.round(percentage)}%` : state} style={badge} />
        <div className="power">
          <GlassSwitch
            checked={on}
            disabled={!canPower}
            onCheckedChange={(checked) => call(checked ? "turn_on" : "turn_off")}
            ariaLabel={`${name} ${t(on ? "off" : "on")}`}
            width={58}
            height={26}
            refraction={refraction}
            scheme={isDark ? "dark" : "light"}
            activeColor={accent}
          />
        </div>
      </div>

      {config.show_speed !== false && supportsFeature(entity, FanFeature.SET_SPEED) && (
        <div className="speed-control">
          <div className="control-head">
            <span><Icon icon="mdi:fan-chevron-up" />{t("fan_speed")}</span>
            <span className="speed-value">{Math.round(percentage)}%</span>
          </div>
          <GlassSlider
            value={percentage}
            min={0}
            max={100}
            step={step}
            refraction={refraction}
            scheme={isDark ? "dark" : "light"}
            label={t("fan_speed")}
            onInput={speedValue.setPreview}
            onChange={(value) => {
              speedValue.commit(value);
              call("set_percentage", { percentage: Math.round(value) });
            }}
          />
          <div className="speed-ticks"><span>0%</span><span>50%</span><span>100%</span></div>
        </div>
      )}

      {config.show_presets !== false && supportsFeature(entity, FanFeature.PRESET_MODE) && presetModes.length > 0 && (
        <div className="presets">
          <div className="control-head"><span><Icon icon="mdi:creation" />{t("fan_presets")}</span></div>
          <div className="preset-options" role="group" aria-label={t("fan_presets")}>
            {presetModes.map((preset) => <button
              key={preset}
              className={`preset${preset === presetMode ? " selected" : ""}`}
              type="button"
              aria-pressed={preset === presetMode}
              onClick={() => call("set_preset_mode", { preset_mode: preset })}
            >{preset}</button>)}
          </div>
        </div>
      )}

      {((config.show_oscillation !== false && supportsFeature(entity, FanFeature.OSCILLATE))
        || (config.show_direction !== false && supportsFeature(entity, FanFeature.DIRECTION))) && (
        <div className="extras">
          {config.show_oscillation !== false && supportsFeature(entity, FanFeature.OSCILLATE) && <button
            className={`extra${oscillating ? " selected" : ""}`}
            type="button"
            aria-pressed={oscillating}
            onClick={() => call("oscillate", { oscillating: !oscillating })}
          ><Icon icon="mdi:arrow-oscillating" /><span>{t("fan_oscillation")}</span></button>}
          {config.show_direction !== false && supportsFeature(entity, FanFeature.DIRECTION) && <button
            className={`extra${direction === "reverse" ? " selected" : ""}`}
            type="button"
            aria-label={t("fan_direction")}
            onClick={() => call("set_direction", { direction: direction === "reverse" ? "forward" : "reverse" })}
          ><Icon icon={direction === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"} /><span>{t(direction === "reverse" ? "fan_reverse" : "fan_forward")}</span></button>}
        </div>
      )}
    </LiquidGlassSurface>
  );
}

export const LiquidGlassFanCard = defineLiquidGlassCard<FanCardConfig>({
  tagName: "liquid-glass-fan-card",
  component: FanCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, glassSliderStyles, glassSwitchStyles, ownStyles],
  getCardSize: () => 5,
  getGridOptions: () => contentGridOptions(6),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["fan"], hass, entities, entitiesFallback),
  }),
});
