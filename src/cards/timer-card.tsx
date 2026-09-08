import { useEffect, useState } from "react";
import { createTranslator } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { entityControlStyles, useEntityService } from "../react/entity-controls";
import { contentGridOptions } from "../react/grid-options";
import { LiquidGlassSurface, glassSurfaceStyles } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { useCardVisible } from "../react/use-visible-tick";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity } from "../types";
import { entityName, entityStateText, isUnavailable, moreInfo, pickEntity } from "../utils";

export interface TimerCardConfig extends BaseCardConfig { show_finish?: boolean }

export function durationSeconds(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) && value >= 0 ? value : undefined;
  if (typeof value !== "string" || !/^\d+:\d{2}:\d{2}(?:\.\d+)?$/.test(value)) return undefined;
  const [hours, minutes, seconds] = value.split(":").map(Number);
  const total = hours * 3600 + minutes * 60 + seconds;
  return minutes < 60 && seconds < 60 && Number.isFinite(total) ? total : undefined;
}

export function timerRemaining(entity: HassEntity, now: number): number | undefined {
  if (entity.state === "active") {
    const finish = typeof entity.attributes.finishes_at === "string" ? Date.parse(entity.attributes.finishes_at) : NaN;
    return Number.isFinite(finish) ? Math.max(0, Math.ceil((finish - now) / 1000)) : undefined;
  }
  return durationSeconds(entity.state === "paused" ? entity.attributes.remaining : entity.attributes.duration);
}

export function formatTimer(seconds: number | undefined): string {
  if (seconds === undefined) return "—";
  const total = Math.max(0, Math.ceil(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = String(total % 60).padStart(2, "0");
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${remainder}` : `${minutes}:${remainder}`;
}

function TimerCard({ config, hass, host }: ReactCardProps<TimerCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const visible = useCardVisible(host, entity?.state === "active");
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!visible) return;
    const sync = () => setNow(Date.now());
    sync();
    const interval = window.setInterval(sync, 1000);
    return () => window.clearInterval(interval);
  }, [visible]);
  const service = useEntityService(hass, config.entity);
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  const icon = config.icon ?? entity?.attributes.icon ?? "mdi:timer-outline";
  if (!entity || isUnavailable(entity)) return <UnavailableCard refraction={refraction} variant={config.glass_variant} icon={icon} name={name} label={t("unavailable")} onOpen={open} />;
  const active = entity.state === "active";
  const paused = entity.state === "paused";
  const remaining = timerRemaining(entity, now);
  const duration = durationSeconds(entity.attributes.duration);
  const state = entityStateText(hass, entity, t(active ? "timer_active" : paused ? "paused" : "idle"));
  return <LiquidGlassSurface className="card" refraction={refraction} variant={config.glass_variant} sourceAccent="#FF9F0A" style={{ display: "flex", position: "relative" }}>
    <div className="header"><IconWell icon={icon} onClick={open} /><CardTitle name={name} state={state} onClick={open} /><Badge label={state} /></div>
    <div className="entity-value" role="timer" aria-label={t("timer_remaining")}>{formatTimer(remaining)}</div>
    {duration !== undefined && duration > 0 && remaining !== undefined && <progress className="entity-progress" max={duration} value={Math.min(duration, remaining)} aria-label={t("timer_remaining")} />}
    <div className="entity-controls">
      <button className="entity-button primary" type="button" disabled={service.pending} onClick={() => { void service.call(active ? "pause" : "start"); }}>{t(active ? "timer_pause" : paused ? "timer_resume" : "timer_start")}</button>
      {(active || paused) && <button className="entity-button" type="button" disabled={service.pending} onClick={() => { void service.call("cancel"); }}>{t("timer_cancel")}</button>}
      {config.show_finish === true && active && <button className="entity-button" type="button" disabled={service.pending} onClick={() => { void service.call("finish"); }}>{t("timer_finish")}</button>}
    </div>
    {service.failed && <div className="entity-error" role="alert">{t("entity_action_failed")}</div>}
  </LiquidGlassSurface>;
}

export const LiquidGlassTimerCard = defineLiquidGlassCard<TimerCardConfig>({
  tagName: "liquid-glass-timer-card", component: TimerCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, entityControlStyles],
  getCardSize: () => 3, getGridOptions: () => contentGridOptions(4),
  getStubConfig: (hass, entities, fallback) => ({ entity: pickEntity(["timer"], hass, entities, fallback) }),
});
