import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { loadHaFormComponents } from "../editor/load";
import { clockTime, createTranslator, relativeTime, type Translator } from "../i18n";
import { defineReactCard, type ReactCardProps } from "../react/define-react-card";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { glassStyles } from "../styles/glass";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { clamp, friendlyName, isUnavailable, moreInfo, pickEntity } from "../utils";
import "../components/lg-icon";

export interface LockActionButton {
  name: string;
  icon?: string;
  /** "domain.service" */
  service: string;
  data?: Record<string, unknown>;
}

export interface LockCardConfig extends BaseCardConfig {
  /** Optional chip buttons under the slider (e.g. open door, activity). */
  buttons?: LockActionButton[];
}

interface LockVisual {
  icon: string;
  well: { from: string; to: string; glow: string };
  badge: { color: string; background: string; stroke: string; glow?: string };
  badgeLabel: string;
  thumbColor: string;
  hint: string;
  state: string;
}

const THUMB = 64;
const PAD = 0;

const styles = `${tokens.cssText}${glassStyles.cssText}${glassSurfaceStyles}
  .card {
    gap: 16px;
    width: 100%;
  }
  .slide {
    --thumb: ${THUMB}px;
    position: relative;
    height: calc(var(--thumb) + ${PAD * 2}px);
    border-radius: 999px;
    padding: ${PAD}px;
    background: var(--lg-track-bg);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.14),
      inset 0 0 0 1px var(--lg-glass-stroke);
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    overflow: hidden;
  }
  .slide.disabled {
    opacity: 0.55;
    pointer-events: none;
  }
  .hint {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0 var(--thumb);
    font-size: var(--lg-hint, 14px);
    font-weight: 500;
    color: var(--lg-text-secondary);
    pointer-events: none;
    transition: opacity 0.15s ease;
    white-space: nowrap;
  }
  .hint > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hint lg-icon {
    flex: none;
    --mdc-icon-size: 18px;
  }
  .thumb {
    top: ${PAD}px;
    width: var(--thumb);
    height: var(--thumb);
    border-radius: 50%;
    place-items: center;
    cursor: grab;
    color: var(--thumb-color);
    transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    --mdc-icon-size: calc(var(--thumb) * 0.43);
  }
  .thumb.dragging {
    transition: none;
    cursor: grabbing;
  }
  .thumb > lg-icon {
    position: relative;
    z-index: 1;
  }
  .chips .chip {
    flex: 1;
    justify-content: center;
    padding: 0;
    border-radius: 22px;
  }
  .chip-button {
    width: 100%;
    min-width: 0;
    min-height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px 10px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: var(--lg-label);
    font-weight: 600;
    cursor: pointer;
  }
  .chip-button > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chip-button lg-icon {
    --mdc-icon-size: clamp(15px, 4.7cqi, 18px);
    width: clamp(15px, 4.7cqi, 18px);
    height: clamp(15px, 4.7cqi, 18px);
  }
  @container (max-width: 300px) {
    .hint lg-icon { display: none; }
  }
  @supports (container-type: inline-size) {
    .slide { --thumb: clamp(40px, 16.8cqi, ${THUMB}px); }
    .card { --lg-hint: clamp(11.5px, 3.7cqi, 14px); }
  }
`;

function visualFor(entity: HassEntity, locked: boolean, jammed: boolean, t: Translator): LockVisual {
  const rel = relativeTime(entity.last_changed, t);
  if (jammed) {
    return {
      icon: "mdi:alert",
      well: { from: "#FFE66B", to: "var(--lg-warn-deep)", glow: "rgba(255,214,10,0.24)" },
      badge: {
        color: "var(--lg-warn-text)",
        background: "rgba(255,214,10,0.24)",
        stroke: "rgba(230,168,0,0.3)",
        glow: "var(--lg-warn)",
      },
      badgeLabel: t("jammed"),
      thumbColor: "var(--lg-warn-text)",
      hint: t("cannot_operate"),
      state: t("jammed_state"),
    };
  }
  if (locked) {
    return {
      icon: "mdi:lock",
      well: { from: "#7EE8A0", to: "var(--lg-lock-locked-deep)", glow: "rgba(48,209,88,0.24)" },
      badge: {
        color: "var(--lg-lock-locked-deep)",
        background: "rgba(30,158,74,0.18)",
        stroke: "rgba(30,158,74,0.3)",
      },
      badgeLabel: t("locked"),
      thumbColor: "var(--lg-lock-locked-deep)",
      hint: t("slide_to_unlock"),
      state: entity.state === "locking"
        ? t("locking")
        : `${t("is_locked")} · ${t("auto_locked_at", { t: clockTime(entity.last_changed) })}`,
    };
  }
  return {
    icon: "mdi:lock-open-variant",
    well: { from: "var(--lg-lock-unlocked)", to: "var(--lg-lock-unlocked-deep)", glow: "rgba(255,59,48,0.24)" },
    badge: {
      color: "var(--lg-lock-unlocked-deep)",
      background: "rgba(255,59,48,0.18)",
      stroke: "rgba(255,59,48,0.3)",
    },
    badgeLabel: t("unlocked"),
    thumbColor: "var(--lg-lock-unlocked-deep)",
    hint: t("slide_to_lock"),
    state: entity.state === "unlocking" ? t("unlocking") : `${t("is_unlocked")} · ${rel}`,
  };
}

function LockCard({ config, hass, host }: ReactCardProps<LockCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const [dragRatio, setDragRatio] = useState<number>();
  const [pending, setPending] = useState(false);
  const pendingTimer = useRef<number | undefined>(undefined);
  const trackRef = useRef<HTMLDivElement>(null);
  const language = config.language ?? hass?.locale?.language ?? hass?.language;
  const t = createTranslator(language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;

  useEffect(() => () => window.clearTimeout(pendingTimer.current), []);

  if (!entity || isUnavailable(entity)) {
    const name = config.name ?? friendlyName(entity, config.entity ?? "");
    return <>
      <style>{styles}</style>
      <LiquidGlassSurface
        className="card"
        refraction={refraction}
        variant={config.glass_variant}
        sourceAccent="var(--lg-warn)"
        style={{ display: "flex", position: "relative" }}
      >
        <div className="header">
          <div className="icon-well idle" onClick={() => moreInfo(host, config.entity)} role="button">
            <Icon icon={config.icon ?? "mdi:help-circle-outline"} />
          </div>
          <div className="title" onClick={() => moreInfo(host, config.entity)}>
            <div className="name">{name}</div>
            <div className="state">{t("unavailable")}</div>
          </div>
        </div>
      </LiquidGlassSurface>
    </>;
  }

  const lockState = entity.state;
  const locked = lockState === "locked" || lockState === "locking";
  const jammed = lockState === "jammed";
  const busy = pending || lockState === "locking" || lockState === "unlocking";
  const visual = visualFor(entity, locked, jammed, t);
  const dragging = dragRatio !== undefined;
  const ratio = dragging ? dragRatio : locked ? 0 : 1;
  const hintOpacity = dragging ? 1 - Math.abs(ratio - (locked ? 0 : 1)) * 1.6 : 1;

  const ratioFromPointer = (clientX: number): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const thumb = (track.querySelector<HTMLElement>(".thumb")?.offsetWidth) || THUMB;
    const usable = rect.width - PAD * 2 - thumb;
    if (usable <= 0) return 0;
    return clamp((clientX - rect.left - PAD - thumb / 2) / usable, 0, 1);
  };

  const trigger = (service: "lock" | "unlock") => {
    if (!hass || !config.entity) return;
    setPending(true);
    void hass.callService("lock", service, { entity_id: config.entity });
    window.clearTimeout(pendingTimer.current);
    pendingTimer.current = window.setTimeout(() => setPending(false), 4000);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (jammed || busy || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDragRatio(ratioFromPointer(event.clientX));
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRatio === undefined) return;
    setDragRatio(ratioFromPointer(event.clientX));
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRatio === undefined) return;
    const finalRatio = ratioFromPointer(event.clientX);
    setDragRatio(undefined);
    if (locked && finalRatio >= 0.8) trigger("unlock");
    else if (!locked && finalRatio <= 0.2) trigger("lock");
  };

  const runButton = (button: LockActionButton) => {
    const separator = button.service.indexOf(".");
    if (!hass || separator < 1 || separator === button.service.length - 1) return;
    const domain = button.service.slice(0, separator);
    const service = button.service.slice(separator + 1);
    void hass.callService(domain, service, { entity_id: config.entity, ...(button.data ?? {}) });
  };

  const thumbStyle: CSSProperties & Record<"--thumb-color", string> = {
    display: "grid",
    position: "absolute",
    left: `calc(${PAD}px + (100% - ${PAD * 2}px - var(--thumb)) * ${ratio})`,
    "--thumb-color": visual.thumbColor,
  };

  return <>
    <style>{styles}</style>
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={visual.thumbColor}
      style={{ display: "flex", position: "relative" }}
    >
      <div className="header">
        <div
          className="icon-well"
          style={{
            "--well-from": visual.well.from,
            "--well-to": visual.well.to,
            "--well-glow": visual.well.glow,
          } as CSSProperties}
          onClick={() => moreInfo(host, config.entity)}
          role="button"
        >
          <Icon icon={config.icon ?? visual.icon} />
        </div>
        <div className="title" onClick={() => moreInfo(host, config.entity)}>
          <div className="name">{config.name ?? friendlyName(entity, config.entity ?? "")}</div>
          <div className="state">{visual.state}</div>
        </div>
        <div
          className="badge"
          style={{
            "--badge-color": visual.badge.color,
            "--badge-bg": visual.badge.background,
            "--badge-stroke": visual.badge.stroke,
            "--badge-glow": visual.badge.glow ?? visual.badge.color,
          } as CSSProperties}
        >
          <span className="dot" /><span>{visual.badgeLabel}</span>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`slide${jammed || busy ? " disabled" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="hint" style={{ opacity: clamp(hintOpacity, 0, 1) }}>
          {!locked && !jammed && <Icon icon="mdi:chevron-double-left" />}
          <span>{visual.hint}</span>
          {locked && !jammed && <Icon icon="mdi:chevron-double-right" />}
        </div>
        <LiquidGlassSurface
          className={`thumb${dragging ? " dragging" : ""}`}
          refraction={refraction}
          variant={config.glass_variant}
          surface="control"
          sourceBackground={`linear-gradient(90deg, var(--lg-track-bg), color-mix(in srgb, ${visual.thumbColor} 72%, transparent))`}
          style={thumbStyle}
        >
          <Icon icon={visual.icon} />
        </LiquidGlassSurface>
      </div>

      {config.buttons?.length ? <div className="chips">
        {config.buttons.map((button, index) => (
          <LiquidGlassSurface
            className="chip"
            key={`${button.service}:${button.name}:${index}`}
            refraction={refraction}
            variant={config.glass_variant}
            surface="compact"
            sourceAccent={visual.thumbColor}
            style={{ display: "flex", position: "relative" }}
          >
            <button className="chip-button" onClick={() => runButton(button)}>
              {button.icon && <Icon icon={button.icon} />}
              <span>{button.name}</span>
            </button>
          </LiquidGlassSurface>
        ))}
      </div> : null}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassLockCard = defineReactCard<LockCardConfig>({
  tagName: "liquid-glass-lock-card",
  component: LockCard,
  normalizeConfig: (config) => ({ refraction: "auto", theme: "auto", ...config }),
  getCardSize: () => 2,
  getConfigElement: async () => {
    await loadHaFormComponents();
    return document.createElement("liquid-glass-card-editor");
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["lock"], hass, entities, entitiesFallback),
  }),
});
