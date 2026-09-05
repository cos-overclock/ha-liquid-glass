import { useEffect, useRef, useState, type CSSProperties } from "react";
import { loadHaFormComponents } from "../editor/load";
import { clockTime, createTranslator, relativeTime, type Translator } from "../i18n";
import { defineReactCard, type ReactCardProps } from "../react/define-react-card";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { GlassSlider, glassSliderStyles } from "../react/glass-slider";
import { reactCardStyles } from "../react/card-styles";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { friendlyName, isUnavailable, moreInfo, pickEntity } from "../utils";
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

const styles = `${tokens.cssText}${reactCardStyles}${glassSurfaceStyles}${glassSliderStyles}
  .card {
    gap: 16px;
    width: 100%;
  }
  .lock-control {
    position: relative;
    display: grid;
    gap: 6px;
    --lg-slider-height: var(--lg-lock-track-h, 54px);
    --lg-slider-bar-height: var(--lg-lock-bar-h, 42px);
    --lg-slider-thumb-width: var(--lg-lock-thumb-w, 58px);
    --lg-slider-thumb-height: var(--lg-lock-thumb-h, 44px);
  }
  .lock-control .slider-track:focus-visible {
    outline-color: var(--thumb-color);
  }
  .lock-control .slider-anchor { display: none; }
  .lock-control .slider-bar,
  .lock-control .slider-refraction-bar {
    border: 1px solid var(--lg-glass-stroke);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.46),
      inset 0 -1px 0 rgba(255,255,255,0.1),
      0 4px 14px rgba(0,0,0,0.05);
    -webkit-backdrop-filter: blur(10px) saturate(1.25);
    backdrop-filter: blur(10px) saturate(1.25);
  }
  .lock-instruction {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: var(--lg-hint, 14px);
    line-height: 20px;
    font-weight: 600;
    color: var(--lg-text-secondary);
    pointer-events: none;
    white-space: nowrap;
  }
  .lock-instruction::before {
    content: "";
    width: 5px;
    height: 5px;
    flex: none;
    border-radius: 50%;
    background: var(--thumb-color);
    box-shadow: 0 0 8px color-mix(in srgb, var(--thumb-color) 70%, transparent);
  }
  .lock-instruction > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lock-instruction lg-icon {
    flex: none;
    --mdc-icon-size: 16px;
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
    .lock-instruction lg-icon { display: none; }
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-hint: clamp(11.5px, 3.7cqi, 14px);
      --lg-lock-track-h: clamp(48px, 14.2cqi, 54px);
      --lg-lock-bar-h: clamp(38px, 11.1cqi, 42px);
      --lg-lock-thumb-w: clamp(52px, 15.3cqi, 58px);
      --lg-lock-thumb-h: clamp(40px, 11.6cqi, 44px);
    }
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
      thumbColor: "var(--lg-warn)",
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
      thumbColor: "var(--lg-lock-locked)",
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
    thumbColor: "var(--lg-lock-unlocked)",
    hint: t("slide_to_lock"),
    state: entity.state === "unlocking" ? t("unlocking") : `${t("is_unlocked")} · ${rel}`,
  };
}

function LockCard({ config, hass, host }: ReactCardProps<LockCardConfig>) {
  const { isDark, refraction } = useCardHost(host, config, hass);
  const [preview, setPreview] = useState<number>();
  const [pending, setPending] = useState<"lock" | "unlock">();
  const pendingTimer = useRef<number | undefined>(undefined);
  const language = config.language ?? hass?.locale?.language ?? hass?.language;
  const t = createTranslator(language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const lockState = entity?.state;

  useEffect(() => () => window.clearTimeout(pendingTimer.current), []);
  useEffect(() => {
    if ((pending === "lock" && lockState === "locked") || (pending === "unlock" && lockState === "unlocked")) {
      window.clearTimeout(pendingTimer.current);
      setPending(undefined);
    }
  }, [lockState, pending]);

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

  const locked = entity.state === "locked" || entity.state === "locking";
  const jammed = entity.state === "jammed";
  const busy = pending !== undefined || entity.state === "locking" || entity.state === "unlocking";
  const visual = visualFor(entity, locked, jammed, t);

  const trigger = (service: "lock" | "unlock") => {
    if (!hass || !config.entity) return;
    setPending(service);
    void hass.callService("lock", service, { entity_id: config.entity });
    window.clearTimeout(pendingTimer.current);
    pendingTimer.current = window.setTimeout(() => setPending(undefined), 4000);
  };

  const commit = (value: number) => {
    setPreview(undefined);
    if (locked && value >= 0.8) trigger("unlock");
    else if (!locked && value <= 0.2) trigger("lock");
  };

  const runButton = (button: LockActionButton) => {
    const separator = button.service.indexOf(".");
    if (!hass || separator < 1 || separator === button.service.length - 1) return;
    const domain = button.service.slice(0, separator);
    const service = button.service.slice(separator + 1);
    void hass.callService(domain, service, { entity_id: config.entity, ...(button.data ?? {}) });
  };

  const controlStyle = { "--thumb-color": visual.thumbColor } as CSSProperties;

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

      <div className={`lock-control ${locked ? "locked" : "unlocked"}${jammed ? " jammed" : ""}`} style={controlStyle}>
        <div className="lock-instruction" aria-hidden="true">
          {!locked && !jammed && <Icon icon="mdi:chevron-double-left" />}
          <span>{visual.hint}</span>
          {locked && !jammed && <Icon icon="mdi:chevron-double-right" />}
        </div>
        <GlassSlider
          value={preview ?? (pending === "unlock" ? 1 : pending === "lock" ? 0 : locked ? 0 : 1)}
          min={0}
          max={1}
          step={0.01}
          keyboardStep={1}
          disabled={jammed || busy}
          refraction={refraction}
          glassVariant={config.glass_variant}
          scheme={isDark ? "dark" : "light"}
          label={visual.hint}
          valueText={visual.badgeLabel}
          showFill={false}
          onInput={setPreview}
          onChange={commit}
        />
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
