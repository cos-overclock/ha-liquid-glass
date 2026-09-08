import { createTranslator, relativeTime } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { rowGridOptions } from "../react/grid-options";
import { LiquidGlassSurface, glassSurfaceStyles } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { useVisibleTick } from "../react/use-visible-tick";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig } from "../types";
import { entityName, entityStateText, isUnavailable, moreInfo, pickEntity } from "../utils";

export interface PersonCardConfig extends BaseCardConfig {
  show_entity_picture?: boolean;
  show_last_changed?: boolean;
}

const ownStyles = `
  .person-avatar { position: relative; flex: none; }
  .person-avatar img { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
`;

function PersonCard({ config, hass, host }: ReactCardProps<PersonCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  useVisibleTick(host, 60000, config.show_last_changed !== false && !!entity && !isUnavailable(entity));
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  const icon = config.icon ?? entity?.attributes.icon ?? (config.entity?.startsWith("device_tracker.") ? "mdi:cellphone-marker" : "mdi:account");
  if (!entity || isUnavailable(entity)) return <UnavailableCard row refraction={refraction} variant={config.glass_variant} icon={icon} name={name} label={t("unavailable")} onOpen={open} />;
  const home = entity.state === "home";
  const state = entityStateText(hass, entity, home ? t("person_home") : entity.state === "not_home" ? t("person_away") : entity.state);
  const picture = config.show_entity_picture !== false ? entity.attributes.entity_picture : undefined;
  return <LiquidGlassSurface className="card row" refraction={refraction} variant={config.glass_variant} sourceAccent={home ? "#34C759" : "#8E8E93"} style={{ display: "flex", position: "relative" }}>
    <div className="header">
      <div className="person-avatar" onClick={open}>
        <IconWell icon={icon} style={home ? { from: "#82DF9C", to: "#248A3D", glow: "rgba(52,199,89,.25)" } : undefined} />
        {picture && <img key={picture} src={picture} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
      </div>
      <CardTitle name={name} state={config.show_last_changed !== false ? `${state} · ${t("since", { t: relativeTime(entity.last_changed, t) })}` : state} onClick={open} />
      <Badge label={state} icon={home ? "mdi:home" : "mdi:map-marker"} />
    </div>
  </LiquidGlassSurface>;
}

export const LiquidGlassPersonCard = defineLiquidGlassCard<PersonCardConfig>({
  tagName: "liquid-glass-person-card", component: PersonCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles],
  getCardSize: () => 1, getGridOptions: () => rowGridOptions(),
  getStubConfig: (hass, entities, fallback) => ({ entity: pickEntity(["person", "device_tracker"], hass, entities, fallback) }),
});
