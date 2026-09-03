import { html, css } from "lit";
import { LiquidGlassBaseCard, type BadgeStyle, type IconWellStyle } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { relativeTime } from "../i18n";
import { isUnavailable, lighten, pickEntity, withAlpha } from "../utils";

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

/**
 * Binary sensor card: single row with device-class aware icon, state text and status badge.
 */
export class LiquidGlassBinarySensorCard extends LiquidGlassBaseCard<BinarySensorCardConfig> {
  static override styles = [
    tokens,
    glassStyles,
    css``,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["binary_sensor"], hass, entities, entitiesFallback) };
  }

  override getCardSize(): number {
    return 1;
  }

  private meta(): ClassMeta {
    const t = this.t;
    const dc = this.entity?.attributes.device_class as string | undefined;
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
    switch (dc) {
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

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const on = entity.state === "on";
    const meta = this.meta();
    const accent = this.config.accent ?? meta.accent;
    const accentLight = this.config.accent ? lighten(this.config.accent) : meta.accentLight;
    const t = this.t;
    const rel = relativeTime(entity.last_changed, t);

    const icon = on ? this.config.icon_on ?? this.config.icon ?? entity.attributes.icon ?? meta.iconOn : this.config.icon_off ?? this.config.icon ?? entity.attributes.icon ?? meta.iconOff;
    const well: IconWellStyle | undefined = on ? { from: accentLight, to: accent, glow: withAlpha(accent, 0.24) } : undefined;
    const badge: BadgeStyle | undefined = on ? { color: accent === "#7C3AED" ? "#A66BFF" : accent, bg: withAlpha(accent, 0.18), stroke: withAlpha(accent, 0.3) } : undefined;
    const stateText = on
      ? `${meta.stateOn} · ${t("since", { t: rel })}`
      : `${meta.stateOff} · ${t("last_change", { t: rel })}`;

    return html`${this.renderDefs()}
      <div class="glass card row">
        ${this.renderIconWell(icon, well)}
        ${this.renderTitle(this.entityName, stateText)}
        ${this.renderBadge(on ? this.config.label_on ?? meta.badgeOn : this.config.label_off ?? meta.badgeOff, badge)}
      </div>`;
  }
}


if (!customElements.get("liquid-glass-binary-sensor-card")) customElements.define("liquid-glass-binary-sensor-card", LiquidGlassBinarySensorCard);
