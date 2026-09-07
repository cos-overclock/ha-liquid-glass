import type { KeyboardEvent } from "react";
import { createTranslator } from "../i18n";
import { Badge, type BadgeStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { glassSurfaceStyles, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { entityName, entityStateText, isUnavailable, moreInfo } from "../utils";

export interface EntityBadgeConfig extends BaseCardConfig {
  show_icon?: boolean;
  show_name?: boolean;
  show_state?: boolean;
  color?: string;
}

const ownStyles = `
  :host {
    display: inline-block;
    width: auto;
    max-width: 100%;
    container-type: normal;
  }
  .card {
    width: auto;
    min-width: 36px;
    min-height: 36px;
    padding: 0;
    border-radius: 18px;
  }
  .card:focus-visible {
    outline: 2px solid var(--badge-color, var(--lg-cool-deep));
    outline-offset: 2px;
  }
  .badge {
    min-height: 36px;
    max-width: min(320px, 80vw);
    padding: 0 12px;
    border-radius: inherit;
    background: transparent;
    box-shadow: none;
    font-size: var(--ha-badge-font-size, 12px);
  }
`;

const toggleDomains = new Set([
  "alarm_control_panel",
  "automation",
  "binary_sensor",
  "climate",
  "cover",
  "fan",
  "humidifier",
  "input_boolean",
  "light",
  "lock",
  "media_player",
  "remote",
  "siren",
  "switch",
  "vacuum",
]);

const inactiveStates = new Set([
  "closed",
  "disarmed",
  "idle",
  "locked",
  "not_home",
  "off",
  "paused",
  "standby",
  "unavailable",
  "unknown",
]);

const domainIcons: Record<string, string> = {
  alarm_control_panel: "mdi:shield-home-outline",
  automation: "mdi:robot",
  binary_sensor: "mdi:radiobox-marked",
  climate: "mdi:thermostat",
  cover: "mdi:blinds",
  device_tracker: "mdi:map-marker-radius",
  fan: "mdi:fan",
  humidifier: "mdi:air-humidifier",
  light: "mdi:lightbulb",
  lock: "mdi:lock",
  media_player: "mdi:play-circle-outline",
  person: "mdi:account",
  sensor: "mdi:gauge",
  switch: "mdi:toggle-switch-outline",
  todo: "mdi:format-list-checks",
  update: "mdi:package-up",
  vacuum: "mdi:robot-vacuum",
};

function badgeIcon(entity: HassEntity, configured: string | undefined): string {
  if (configured) return configured;
  if (entity.attributes.icon) return entity.attributes.icon;
  return domainIcons[entity.entity_id.split(".")[0]] ?? "mdi:information-outline";
}

function stateLabel(hass: HomeAssistant | undefined, entity: HassEntity): string {
  const unit = entity.attributes.unit_of_measurement;
  const fallback = `${entity.state}${unit ? ` ${unit}` : ""}`;
  return entityStateText(hass, entity, fallback);
}

function stateStyle(entity: HassEntity, color: string | undefined): BadgeStyle | undefined {
  const domain = entity.entity_id.split(".")[0];
  const active = color || (toggleDomains.has(domain) && !inactiveStates.has(entity.state));
  if (!active) return undefined;
  const accent = color ?? "#0a84ff";
  return {
    color: accent,
    bg: `color-mix(in srgb, ${accent} 18%, transparent)`,
    stroke: `color-mix(in srgb, ${accent} 30%, transparent)`,
    glow: `color-mix(in srgb, ${accent} 55%, transparent)`,
  };
}

function EntityBadge({ config, hass, host }: ReactCardProps<EntityBadgeConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "Entity");
  const unavailable = isUnavailable(entity);
  const state = entity ? stateLabel(hass, entity) : t("unavailable");
  const showIcon = config.show_icon !== false;
  const showName = config.show_name === true;
  const showState = config.show_state !== false;
  const label = [showName ? name : undefined, showState ? state : undefined]
    .filter((part): part is string => Boolean(part))
    .join(" · ");
  const tapDisabled = config.tap_action?.action === "none";
  const open = () => {
    if (!tapDisabled) moreInfo(host, config.entity);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (tapDisabled || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    open();
  };

  return (
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      surface="compact"
      sourceAccent={config.color}
      role={tapDisabled ? undefined : "button"}
      tabIndex={tapDisabled ? undefined : 0}
      aria-label={`${name}: ${state}`}
      onClick={open}
      onKeyDown={onKeyDown}
      style={{ display: "flex", position: "relative" }}
    >
      <Badge
        label={label || undefined}
        icon={showIcon && entity ? badgeIcon(entity, config.icon) : undefined}
        style={entity ? stateStyle(entity, unavailable ? undefined : config.color) : undefined}
      />
    </LiquidGlassSurface>
  );
}

export const LiquidGlassEntityBadge = defineLiquidGlassCard<EntityBadgeConfig>({
  tagName: "liquid-glass-entity-badge",
  component: EntityBadge,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles],
  getCardSize: () => 1,
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: entities?.[0]
      ?? entitiesFallback?.[0]
      ?? Object.keys(hass?.states ?? {}).find((entityId) => !isUnavailable(hass?.states[entityId]))
      ?? "sensor.example",
  }),
});
