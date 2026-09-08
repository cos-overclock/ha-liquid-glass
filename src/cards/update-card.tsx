import { createTranslator } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { entityControlStyles, finiteNumber, useEntityService } from "../react/entity-controls";
import { autoHeightGridOptions } from "../react/grid-options";
import { LiquidGlassSurface, glassSurfaceStyles } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig } from "../types";
import { entityName, entityStateText, isUnavailable, moreInfo, pickEntity, supportsFeature } from "../utils";

export interface UpdateCardConfig extends BaseCardConfig {
  show_release_notes?: boolean;
  show_skip?: boolean;
}
export const UpdateFeature = { INSTALL: 1, PROGRESS: 4, RELEASE_NOTES: 16 } as const;

const ownStyles = `
  .release-summary { max-height: 120px; overflow: auto; white-space: pre-wrap; }
`;

function UpdateCard({ config, hass, host }: ReactCardProps<UpdateCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  const service = useEntityService(hass, config.entity);
  const icon = config.icon ?? entity?.attributes.icon ?? "mdi:package-up";
  if (!entity || isUnavailable(entity)) return <UnavailableCard refraction={refraction} variant={config.glass_variant} icon={icon} name={name} label={t("unavailable")} onOpen={open} />;
  const attrs = entity.attributes;
  const available = entity.state === "on";
  // Older integrations encode progress directly in in_progress, including numeric zero.
  const installing = attrs.in_progress === true || typeof attrs.in_progress === "number";
  const percentage = finiteNumber(attrs.update_percentage) ?? (typeof attrs.in_progress === "number" ? finiteNumber(attrs.in_progress) : undefined);
  const progress = percentage === undefined ? undefined : Math.max(0, Math.min(100, percentage));
  const skipped = typeof attrs.skipped_version === "string" && !!attrs.skipped_version;
  const state = installing ? t("update_installing") : entityStateText(hass, entity, t(available ? "update_available" : skipped ? "update_skipped" : "update_current"));
  const disabled = service.pending || installing;
  return <LiquidGlassSurface className="card" refraction={refraction} variant={config.glass_variant} sourceAccent="#0A84FF" style={{ display: "flex", position: "relative" }}>
    <div className="header"><IconWell icon={icon} onClick={open} /><CardTitle name={name} state={state} onClick={open} /><Badge label={installing && progress !== undefined ? `${progress}%` : state} /></div>
    <div className="entity-caption">{t("update_installed")}: {typeof attrs.installed_version === "string" ? attrs.installed_version : "—"}</div>
    <div className="entity-caption">{t("update_latest")}: {typeof attrs.latest_version === "string" ? attrs.latest_version : "—"}</div>
    {installing && <progress className="entity-progress" max={100} value={progress} aria-label={t("update_installing")} />}
    {config.show_release_notes !== false && typeof attrs.release_summary === "string" && attrs.release_summary && <div className="entity-caption release-summary">{attrs.release_summary}</div>}
    <div className="entity-controls">
      {available && supportsFeature(entity, UpdateFeature.INSTALL) && <button className="entity-button primary" type="button" disabled={disabled} onClick={() => { void service.call("install"); }}>{t("update_install")}</button>}
      {config.show_skip !== false && available && !attrs.auto_update && <button className="entity-button" type="button" disabled={disabled} onClick={() => { void service.call("skip"); }}>{t("update_skip")}</button>}
      {config.show_skip !== false && skipped && <button className="entity-button" type="button" disabled={disabled} onClick={() => { void service.call("clear_skipped"); }}>{t("update_clear_skipped")}</button>}
      {config.show_release_notes !== false && (supportsFeature(entity, UpdateFeature.RELEASE_NOTES) || typeof attrs.release_url === "string") && <button className="entity-button" type="button" onClick={open}>{t("update_release_notes")}</button>}
    </div>
    {service.failed && <div className="entity-error" role="alert">{t("entity_action_failed")}</div>}
  </LiquidGlassSurface>;
}

export const LiquidGlassUpdateCard = defineLiquidGlassCard<UpdateCardConfig>({
  tagName: "liquid-glass-update-card", component: UpdateCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, entityControlStyles, ownStyles],
  getCardSize: () => 4, getGridOptions: () => autoHeightGridOptions(6),
  getStubConfig: (hass, entities, fallback) => ({ entity: pickEntity(["update"], hass, entities, fallback) }),
});
