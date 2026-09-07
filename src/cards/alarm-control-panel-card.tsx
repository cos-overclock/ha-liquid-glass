import { useState, type CSSProperties } from "react";
import { createTranslator, relativeTime } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard, type BadgeStyle, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { entityName, entityStateText, isUnavailable, moreInfo, pickEntity, supportsFeature, withAlpha } from "../utils";

export interface AlarmControlPanelCardConfig extends BaseCardConfig {
  show_trigger?: boolean;
}
export const AlarmFeature = { ARM_HOME: 1, ARM_AWAY: 2, ARM_NIGHT: 4, TRIGGER: 8, ARM_CUSTOM_BYPASS: 16, ARM_VACATION: 32 } as const;

const ownStyles = `
  .modes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .mode { min-height: 44px; padding: 0 12px; border: 0; border-radius: 18px; display: flex; align-items: center; justify-content: center; gap: 7px; color: var(--lg-text-secondary); background: var(--lg-track-bg); box-shadow: inset 0 0 0 1px var(--lg-glass-stroke); font: inherit; font-size: var(--lg-label); cursor: pointer; }
  .mode.selected { color: #fff; background: linear-gradient(180deg, var(--alarm-light), var(--alarm-accent)); box-shadow: 0 4px 12px color-mix(in srgb, var(--alarm-accent) 28%, transparent); }
  .mode.trigger { width: 100%; color: var(--lg-lock-unlocked-deep); }
  .mode:disabled { opacity: .42; cursor: not-allowed; }
  .mode:focus-visible, .code:focus-visible { outline: 2px solid var(--alarm-accent); outline-offset: 2px; }
  .mode lg-icon { --mdc-icon-size: 19px; }
  .code { width: 100%; height: 44px; border: 0; border-radius: 18px; padding: 0 15px; color: var(--lg-text-primary); background: var(--lg-track-bg); box-shadow: inset 0 0 0 1px var(--lg-glass-stroke); font: inherit; letter-spacing: .18em; }
`;

const stateColors: Record<string, [string, string]> = {
  disarmed: ["#30D158", "#7BE495"], armed_home: ["#0A84FF", "#68C5FF"], armed_away: ["#5E5CE6", "#9E9CFF"], armed_night: ["#5856D6", "#8E8CE8"], armed_vacation: ["#2BB3D0", "#78DCEA"], armed_custom_bypass: ["#FF9F0A", "#FFD06B"], pending: ["#FF9F0A", "#FFD06B"], arming: ["#FF9F0A", "#FFD06B"], disarming: ["#FF9F0A", "#FFD06B"], triggered: ["#FF3B30", "#FF8A80"],
};

function AlarmCard({ config, hass, host }: ReactCardProps<AlarmControlPanelCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const [code, setCode] = useState("");
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  if (!entity || isUnavailable(entity)) return <UnavailableCard refraction={refraction} variant={config.glass_variant} icon={config.icon ?? "mdi:shield-home-outline"} name={name} label={t("unavailable")} onOpen={open} />;

  const [accent, light] = stateColors[entity.state] ?? ["#0A84FF", "#68C5FF"];
  const state = entityStateText(hass, entity, entity.state.replaceAll("_", " "));
  const well: WellStyle = { from: light, to: accent, glow: withAlpha(accent, .28) };
  const badge: BadgeStyle = { color: accent, bg: withAlpha(accent, .18), stroke: withAlpha(accent, .3) };
  const codeFormat = entity.attributes.code_format as string | undefined;
  const armCodeRequired = entity.attributes.code_arm_required !== false && Boolean(codeFormat);
  const call = (service: string, requiresCode: boolean) => {
    if (!hass || !config.entity || (requiresCode && !code)) return;
    void hass.callService("alarm_control_panel", service, { entity_id: config.entity, ...(code ? { code } : {}) });
    setCode("");
  };
  const modes = [
    { state: "disarmed", feature: 0, service: "alarm_disarm", label: t("alarm_disarm"), icon: "mdi:shield-off-outline", arm: false },
    { state: "armed_home", feature: AlarmFeature.ARM_HOME, service: "alarm_arm_home", label: t("alarm_home"), icon: "mdi:home-lock", arm: true },
    { state: "armed_away", feature: AlarmFeature.ARM_AWAY, service: "alarm_arm_away", label: t("alarm_away"), icon: "mdi:shield-lock-outline", arm: true },
    { state: "armed_night", feature: AlarmFeature.ARM_NIGHT, service: "alarm_arm_night", label: t("alarm_night"), icon: "mdi:weather-night", arm: true },
    { state: "armed_vacation", feature: AlarmFeature.ARM_VACATION, service: "alarm_arm_vacation", label: t("alarm_vacation"), icon: "mdi:palm-tree", arm: true },
    { state: "armed_custom_bypass", feature: AlarmFeature.ARM_CUSTOM_BYPASS, service: "alarm_arm_custom_bypass", label: t("alarm_bypass"), icon: "mdi:shield-half-full", arm: true },
  ].filter((mode) => mode.feature === 0 || supportsFeature(entity, mode.feature));

  return <LiquidGlassSurface className="card" refraction={refraction} variant={config.glass_variant} sourceAccent={accent} style={{ display: "flex", position: "relative", "--alarm-accent": accent, "--alarm-light": light } as CSSProperties}>
    <div className="header"><IconWell icon={config.icon ?? entity.attributes.icon ?? (entity.state === "triggered" ? "mdi:shield-alert" : "mdi:shield-home")} style={well} onClick={open} /><CardTitle name={name} state={`${state} · ${t("since", { t: relativeTime(entity.last_changed, t) })}`} onClick={open} /><Badge label={state} style={badge} /></div>
    {codeFormat && <input className="code" type={codeFormat === "number" ? "password" : "text"} inputMode={codeFormat === "number" ? "numeric" : "text"} autoComplete="one-time-code" placeholder={t("alarm_code")} aria-label={t("alarm_code")} value={code} onInput={(event) => setCode(event.currentTarget.value)} />}
    <div className="modes">{modes.map((mode) => <button key={mode.state} className={`mode${entity.state === mode.state ? " selected" : ""}`} type="button" disabled={(mode.arm ? armCodeRequired : Boolean(codeFormat)) && !code} onClick={() => call(mode.service, mode.arm ? armCodeRequired : Boolean(codeFormat))}><Icon icon={mode.icon} /><span>{mode.label}</span></button>)}</div>
    {config.show_trigger === true && supportsFeature(entity, AlarmFeature.TRIGGER) && <button className="mode trigger" type="button" onClick={() => call("alarm_trigger", false)}><Icon icon="mdi:alarm-light" />{t("alarm_trigger")}</button>}
  </LiquidGlassSurface>;
}

export const LiquidGlassAlarmControlPanelCard = defineLiquidGlassCard<AlarmControlPanelCardConfig>({ tagName: "liquid-glass-alarm-control-panel-card", component: AlarmCard, styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles], getCardSize: () => 4, getGridOptions: () => contentGridOptions(5), getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({ entity: pickEntity(["alarm_control_panel"], hass, entities, entitiesFallback) }) });
