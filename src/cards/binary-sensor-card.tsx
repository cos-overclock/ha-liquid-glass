import { loadHaFormComponents } from "../editor/load";
import { createTranslator, relativeTime, type Translator } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard, type BadgeStyle, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineReactCard, type ReactCardProps } from "../react/define-react-card";
import { glassSurfaceStyles, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { friendlyName, isUnavailable, lighten, moreInfo, pickEntity, withAlpha } from "../utils";
import "../components/lg-icon";

export interface BinarySensorCardConfig extends BaseCardConfig {
  icon_on?: string;
  icon_off?: string;
  label_on?: string;
  label_off?: string;
  /** Accent hex color used while "on". */
  accent?: string;
}

interface ClassMeta {
  iconOn: string;
  iconOff: string;
  badgeOn: string;
  badgeOff: string;
  stateOn: string;
  stateOff: string;
  accent: string;
  accentLight: string;
}

const styles = `${tokens.cssText}${reactCardStyles}${glassSurfaceStyles}`;

/** Icons, wording and accent per binary_sensor device class. */
export function binarySensorMeta(deviceClass: string | undefined, t: Translator): ClassMeta {
  const base: ClassMeta = {
    iconOn: "mdi:checkbox-marked-circle",
    iconOff: "mdi:checkbox-blank-circle-outline",
    badgeOn: t("on"),
    badgeOff: t("off"),
    stateOn: t("on"),
    stateOff: t("off"),
    accent: "#FF9F0A",
    accentLight: "#FFC96B",
  };
  switch (deviceClass) {
    case "door":
    case "garage_door":
    case "opening":
      return { ...base, iconOn: "mdi:door-open", iconOff: "mdi:door-closed", badgeOn: t("open"), badgeOff: t("closed"), stateOn: t("is_open"), stateOff: t("is_closed") };
    case "window":
      return { ...base, iconOn: "mdi:window-open-variant", iconOff: "mdi:window-closed-variant", badgeOn: t("open"), badgeOff: t("closed"), stateOn: t("is_open"), stateOff: t("is_closed") };
    case "motion":
    case "occupancy":
    case "presence":
      return {
        ...base,
        iconOn: "mdi:motion-sensor",
        iconOff: "mdi:motion-sensor-off",
        badgeOn: t("detected"),
        badgeOff: t("clear"),
        stateOn: t("detecting"),
        stateOff: t("clear"),
        accent: "#7C3AED",
        accentLight: "#B48CFF",
      };
    case "moisture":
      return { ...base, iconOn: "mdi:water-alert", iconOff: "mdi:water-off", badgeOn: t("detected"), badgeOff: t("clear"), stateOn: t("detecting"), stateOff: t("clear"), accent: "#0A84FF", accentLight: "#8FDBFF" };
    case "smoke":
    case "gas":
    case "carbon_monoxide":
    case "safety":
    case "problem":
      return { ...base, iconOn: "mdi:alert", iconOff: "mdi:shield-check", badgeOn: t("detected"), badgeOff: t("clear"), stateOn: t("detecting"), stateOff: t("clear"), accent: "#FF3B30", accentLight: "#FF8A80" };
    case "vibration":
    case "sound":
      return { ...base, iconOn: "mdi:vibrate", iconOff: "mdi:vibrate-off", badgeOn: t("detected"), badgeOff: t("clear"), stateOn: t("detecting"), stateOff: t("clear"), accent: "#7C3AED", accentLight: "#B48CFF" };
    case "connectivity":
      return { ...base, iconOn: "mdi:lan-connect", iconOff: "mdi:lan-disconnect", accent: "#0A84FF", accentLight: "#8FDBFF" };
    case "battery":
      return { ...base, iconOn: "mdi:battery-alert", iconOff: "mdi:battery", accent: "#FF3B30", accentLight: "#FF8A80" };
    case "lock":
      return { ...base, iconOn: "mdi:lock-open-variant", iconOff: "mdi:lock", badgeOn: t("unlocked"), badgeOff: t("locked"), stateOn: t("is_unlocked"), stateOff: t("is_locked"), accent: "#FF3B30", accentLight: "#FF8A80" };
    default:
      return base;
  }
}

/** Single row with a device-class aware icon, state text and status badge. */
function BinarySensorCard({ config, hass, host }: ReactCardProps<BinarySensorCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = config.name ?? friendlyName(entity, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);

  if (!entity || isUnavailable(entity)) {
    return <>
      <style>{styles}</style>
      <UnavailableCard
        refraction={refraction}
        variant={config.glass_variant}
        icon={config.icon}
        name={name}
        label={t("unavailable")}
        onOpen={open}
      />
    </>;
  }

  const on = entity.state === "on";
  const meta = binarySensorMeta(entity.attributes.device_class as string | undefined, t);
  const accent = config.accent ?? meta.accent;
  const accentLight = config.accent ? lighten(config.accent) : meta.accentLight;
  const configIcon = (on ? config.icon_on : config.icon_off) ?? config.icon ?? (entity.attributes.icon as string | undefined);
  const icon = configIcon ?? (on ? meta.iconOn : meta.iconOff);
  const well: WellStyle | undefined = on
    ? { from: accentLight, to: accent, glow: withAlpha(accent, 0.24) }
    : undefined;
  const badge: BadgeStyle | undefined = on
    ? { color: accent === "#7C3AED" ? "#A66BFF" : accent, bg: withAlpha(accent, 0.18), stroke: withAlpha(accent, 0.3) }
    : undefined;
  const since = relativeTime(entity.last_changed, t);
  const state = on
    ? `${meta.stateOn} · ${t("since", { t: since })}`
    : `${meta.stateOff} · ${t("last_change", { t: since })}`;

  return <>
    <style>{styles}</style>
    <LiquidGlassSurface
      className="card row"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={on ? accent : undefined}
      style={{ display: "flex", position: "relative" }}
    >
      <IconWell icon={icon} style={well} onClick={open} />
      <CardTitle name={name} state={state} onClick={open} />
      <Badge label={(on ? config.label_on : config.label_off) ?? (on ? meta.badgeOn : meta.badgeOff)} style={badge} />
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassBinarySensorCard = defineReactCard<BinarySensorCardConfig>({
  tagName: "liquid-glass-binary-sensor-card",
  component: BinarySensorCard,
  normalizeConfig: (config) => ({ refraction: "auto", theme: "auto", ...config }),
  getCardSize: () => 1,
  getConfigElement: async () => {
    await loadHaFormComponents();
    return document.createElement("liquid-glass-card-editor");
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["binary_sensor"], hass, entities, entitiesFallback),
  }),
});
