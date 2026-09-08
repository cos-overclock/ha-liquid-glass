import { useEffect, useRef, useState } from "react";
import { createTranslator } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { entityControlStyles, useEntityService } from "../react/entity-controls";
import { autoHeightGridOptions } from "../react/grid-options";
import { LiquidGlassSurface, glassSurfaceStyles, Icon } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { useCardVisible, useTickWhile } from "../react/use-visible-tick";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig } from "../types";
import { entityName, isUnavailable, moreInfo, pickEntity, supportsFeature } from "../utils";

export interface TodoCardConfig extends BaseCardConfig {
  show_completed?: boolean;
  show_add?: boolean;
}
export const TodoFeature = { CREATE: 1, DELETE: 2, UPDATE: 4 } as const;
interface TodoItem { uid: string; summary: string; status: "needs_action" | "completed" }

const ownStyles = `
  .todo-items { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; max-height: 360px; overflow: auto; }
  .todo-item { display: flex; align-items: center; gap: 8px; }
  .todo-item label { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; font-size: var(--lg-label); overflow-wrap: anywhere; }
  .todo-item input { width: 20px; height: 20px; flex: none; accent-color: #007d91; }
  .todo-item.completed span { text-decoration: line-through; color: var(--lg-text-secondary); }
  .todo-item .entity-button { flex: none; padding: 8px; }
  .todo-add { display: flex; gap: 8px; flex-wrap: wrap; }
  .todo-add input { flex: 1 1 100px; width: 100%; }
`;

function TodoCard({ config, hass, host }: ReactCardProps<TodoCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entityId = config.entity;
  const entity = entityId ? hass?.states[entityId] : undefined;
  const available = !!entity && !isUnavailable(entity);
  const visible = useCardVisible(host, available);
  const tick = useTickWhile(visible, 30000);
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState<{ entityId: string; items: TodoItem[]; failed: boolean }>();
  const [draft, setDraft] = useState({ entityId, text: "" });
  const text = draft.entityId === entityId ? draft.text : "";
  const latestHass = useRef(hass);
  latestHass.current = hass;
  const service = useEntityService(hass, entityId);
  const updated = entity?.last_updated;
  const count = entity?.state;
  const connection = hass?.connection;
  useEffect(() => {
    if (!visible || !entityId || !latestHass.current) return;
    let cancelled = false;
    const load = async () => {
      try {
        const response = await latestHass.current!.callService("todo", "get_items", {}, { entity_id: entityId }, false, true);
        const payload = response?.response as Record<string, { items?: unknown }> | undefined;
        const items = payload?.[entityId]?.items;
        if (!Array.isArray(items)) throw new Error("Invalid to-do response");
        const valid = items.filter((item): item is TodoItem => !!item && typeof item.uid === "string" && typeof item.summary === "string" && (item.status === "needs_action" || item.status === "completed"));
        if (!cancelled) setResult({ entityId, items: valid, failed: false });
      } catch {
        if (!cancelled) setResult({ entityId, items: [], failed: true });
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [entityId, updated, count, connection, visible, tick, revision]);

  const name = entityName(hass, entity, config.name, entityId ?? "");
  const open = () => moreInfo(host, entityId);
  const icon = config.icon ?? entity?.attributes.icon ?? "mdi:cart-outline";
  if (!available) return <UnavailableCard refraction={refraction} variant={config.glass_variant} icon={icon} name={name} label={t("unavailable")} onOpen={open} />;
  const data = result?.entityId === entityId ? result : undefined;
  const items = data?.items.filter((item) => config.show_completed !== false || item.status !== "completed") ?? [];
  const mutate = async (action: string, fields: Record<string, unknown>) => {
    if (!await service.call(action, fields)) return;
    if (action === "add_item") setDraft((value) => value.entityId === entityId && value.text === text ? { entityId, text: "" } : value);
    setRevision((value) => value + 1);
  };
  return <LiquidGlassSurface className="card" refraction={refraction} variant={config.glass_variant} sourceAccent="#30B0C7" style={{ display: "flex", position: "relative" }}>
    <div className="header"><IconWell icon={icon} onClick={open} /><CardTitle name={name} state={t("todo_remaining", { n: entity.state })} onClick={open} /><Badge label={entity.state} /></div>
    {!data && <div className="entity-caption" role="status">{t("todo_loading")}</div>}
    {data?.failed && <div role="alert" className="entity-error">{t("todo_load_failed")} <button className="entity-button" type="button" onClick={() => setRevision((value) => value + 1)}>{t("entity_retry")}</button></div>}
    {data && !data.failed && items.length === 0 && <div className="entity-caption">{t("todo_empty")}</div>}
    <ul className="todo-items" aria-label={name}>
      {items.map((item) => <li key={item.uid} className={`todo-item${item.status === "completed" ? " completed" : ""}`}>
        <label><input type="checkbox" checked={item.status === "completed"} disabled={service.pending || !supportsFeature(entity, TodoFeature.UPDATE)} onChange={() => { void mutate("update_item", { item: item.uid, status: item.status === "completed" ? "needs_action" : "completed" }); }} /><span>{item.summary}</span></label>
        {supportsFeature(entity, TodoFeature.DELETE) && <button className="entity-button" type="button" disabled={service.pending} aria-label={t("todo_delete", { item: item.summary })} onClick={() => { void mutate("remove_item", { item: item.uid }); }}><Icon icon="mdi:delete-outline" /></button>}
      </li>)}
    </ul>
    {config.show_add !== false && supportsFeature(entity, TodoFeature.CREATE) && <form className="todo-add" onSubmit={(event) => { event.preventDefault(); if (text.trim()) void mutate("add_item", { item: text.trim() }); }}>
      <input className="entity-input" value={text} aria-label={t("todo_new_item")} placeholder={t("todo_new_item")} onChange={(event) => setDraft({ entityId, text: event.currentTarget.value })} />
      <button className="entity-button primary" type="submit" disabled={service.pending || !text.trim()}>{t("todo_add")}</button>
    </form>}
    {service.failed && <div className="entity-error" role="alert">{t("entity_action_failed")}</div>}
  </LiquidGlassSurface>;
}

export const LiquidGlassTodoCard = defineLiquidGlassCard<TodoCardConfig>({
  tagName: "liquid-glass-todo-card", component: TodoCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, entityControlStyles, ownStyles],
  getCardSize: () => 5, getGridOptions: () => autoHeightGridOptions(),
  getStubConfig: (hass, entities, fallback) => ({ entity: pickEntity(["todo"], hass, entities, fallback) }),
});
