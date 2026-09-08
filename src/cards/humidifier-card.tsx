import { createTranslator } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { entityControlStyles, finiteNumber, useEntityService } from "../react/entity-controls";
import { contentGridOptions } from "../react/grid-options";
import { GlassSlider, glassSliderStyles } from "../react/glass-slider";
import { GlassSwitch, glassSwitchStyles } from "../react/glass-switch";
import { LiquidGlassSurface, glassSurfaceStyles } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { useOptimisticValue } from "../react/use-optimistic-value";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig } from "../types";
import { entityName, entityStateText, isUnavailable, moreInfo, pickEntity, supportsFeature } from "../utils";

export interface HumidifierCardConfig extends BaseCardConfig {
  show_current_humidity?: boolean;
  show_modes?: boolean;
}

export const HumidifierFeature = { MODES: 1 } as const;

function HumidifierCard({ config, hass, host }: ReactCardProps<HumidifierCardConfig>) {
  const { isDark, refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  const target = useOptimisticValue(finiteNumber(entity?.attributes.humidity), 1);
  const service = useEntityService(hass, config.entity);
  const icon = config.icon ?? entity?.attributes.icon ?? (entity?.attributes.device_class === "dehumidifier" ? "mdi:air-humidifier-off" : "mdi:air-humidifier");
  if (!entity || isUnavailable(entity)) return <UnavailableCard refraction={refraction} variant={config.glass_variant} icon={icon} name={name} label={t("unavailable")} onOpen={open} />;
  const on = entity.state === "on";
  const min = Math.max(0, finiteNumber(entity.attributes.min_humidity) ?? 0);
  const max = Math.min(100, finiteNumber(entity.attributes.max_humidity) ?? 100);
  const step = Math.max(1, finiteNumber(entity.attributes.target_humidity_step) ?? 1);
  const current = finiteNumber(entity.attributes.current_humidity);
  const modes = Array.isArray(entity.attributes.available_modes) ? entity.attributes.available_modes.filter((mode): mode is string => typeof mode === "string") : [];
  const state = entityStateText(hass, entity, t(on ? "on" : "off"));
  const action = typeof entity.attributes.action === "string" ? t(`humidifier_${entity.attributes.action}`) : state;
  return <LiquidGlassSurface className="card" refraction={refraction} variant={config.glass_variant} sourceAccent="#30B0C7" style={{ display: "flex", position: "relative" }}>
    <div className="header">
      <IconWell icon={icon} onClick={open} style={on ? { from: "#70D9DB", to: "#007D91", glow: "rgba(48,176,199,.3)" } : undefined} />
      <CardTitle name={name} state={action} onClick={open} />
      <Badge label={state} />
      <GlassSwitch checked={on} disabled={service.pending} onCheckedChange={(checked) => { void service.call(checked ? "turn_on" : "turn_off"); }} ariaLabel={`${name} ${t(on ? "off" : "on")}`} width={58} height={26} refraction={refraction} scheme={isDark ? "dark" : "light"} activeColor="#007D91" />
    </div>
    {config.show_current_humidity !== false && current !== undefined && <div className="entity-caption">{t("humidity_current")}: {current}%</div>}
    {target.value !== undefined && max > min && <>
      <div className="entity-caption">{t("humidity_target")} <strong>{target.value}%</strong></div>
      <GlassSlider value={Math.min(max, Math.max(min, target.value))} min={min} max={max} step={step} disabled={service.pending} label={t("humidity_target")} refraction={refraction} scheme={isDark ? "dark" : "light"} onInput={target.setPreview} onChange={(value) => { target.commit(value); void service.call("set_humidity", { humidity: value }).then((ok) => { if (!ok) target.reset(); }); }} />
    </>}
    {config.show_modes !== false && supportsFeature(entity, HumidifierFeature.MODES) && modes.length > 0 && <div className="entity-controls" role="group" aria-label={t("humidity_modes")}>
      {modes.map((mode) => <button key={mode} type="button" className="entity-button" aria-pressed={entity.attributes.mode === mode} disabled={service.pending} onClick={() => { void service.call("set_mode", { mode }); }}>{mode}</button>)}
    </div>}
    {service.failed && <div className="entity-error" role="alert">{t("entity_action_failed")}</div>}
  </LiquidGlassSurface>;
}

export const LiquidGlassHumidifierCard = defineLiquidGlassCard<HumidifierCardConfig>({
  tagName: "liquid-glass-humidifier-card",
  // A preview held for one device must never be displayed on another device.
  component: (props) => <HumidifierCard key={props.config.entity} {...props} />,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, glassSliderStyles, glassSwitchStyles, entityControlStyles],
  getCardSize: () => 4,
  getGridOptions: () => contentGridOptions(5),
  getStubConfig: (hass, entities, fallback) => ({ entity: pickEntity(["humidifier"], hass, entities, fallback) }),
});
