import { useEffect, useState, type CSSProperties } from "react";
import { loadHaFormComponents } from "../editor/load";
import { createTranslator, relativeTime } from "../i18n";
import { UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineReactCard, type ReactCardProps } from "../react/define-react-card";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { friendlyName, isUnavailable, moreInfo, pickEntity } from "../utils";
import "../components/lg-icon";

export interface CameraCardConfig extends BaseCardConfig {
  /** Binary sensor whose state drives the motion chip. Omit to hide it. */
  motion_entity?: string;
  /** Row under the feed with the motion chip and history button (default true). */
  show_actions?: boolean;
  /** Two-way audio button. Needs a service, since nothing sensible can be guessed. */
  show_mic?: boolean;
  mic_service?: string;
  /** "domain.service" for the snapshot button. Defaults to opening the still image. */
  snapshot_service?: string;
  /** Seconds between still refreshes (default 10). */
  refresh_interval?: number;
  /** Feed aspect ratio as width / height (default 16 / 9). */
  aspect_ratio?: number;
}

const DEFAULT_REFRESH = 10;

const styles = `${tokens.cssText}${reactCardStyles}${glassSurfaceStyles}
  .card {
    padding: 0;
    gap: 0;
  }
  .feed {
    position: relative;
    width: 100%;
    aspect-ratio: var(--lg-cam-ratio, 16 / 9);
    overflow: hidden;
    background: #0e1014;
    background-size: cover;
    background-position: center;
  }
  /* Darkens the top and bottom just enough for white text to hold up. */
  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 42%,
      rgba(0, 0, 0, 0) 62%,
      rgba(0, 0, 0, 0.65) 100%
    );
    pointer-events: none;
  }
  .bar {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 14px;
    height: 56px;
  }
  .bar.top {
    top: 0;
  }
  .bar.bottom {
    bottom: 0;
  }
  .trail {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /*
   * Controls floating on the feed carry their own dark glass. They sit over a photo,
   * so they blur the real image rather than a stand-in copy of it.
   */
  .float {
    position: relative;
    overflow: hidden;
    border: 0;
    padding: 0;
    color: #fff;
    background: rgba(11, 11, 15, 0.34);
    -webkit-backdrop-filter: blur(5px) saturate(1.35);
    backdrop-filter: blur(5px) saturate(1.35);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  }
  .round {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    --mdc-icon-size: 15px;
  }
  .round.big {
    width: 34px;
    height: 34px;
    --mdc-icon-size: 16px;
  }
  .live {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 14px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
  }
  .live .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--dot, #8e8e93);
    box-shadow: 0 0 6px var(--dot-glow, transparent);
  }

  .name {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
    cursor: pointer;
  }
  .name .who {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name .when {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
  }
  .card.offline .name .who {
    color: rgba(255, 255, 255, 0.5);
  }

  .nosignal {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.5);
    --mdc-icon-size: 32px;
  }
  .nosignal span {
    font-size: 12px;
    font-weight: 500;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
  }
  .motion {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 11px;
    border-radius: 16px;
    font-size: 11px;
    font-weight: 600;
    min-width: 0;
    background: var(--chip-bg, var(--lg-track-bg));
    box-shadow: inset 0 0 0 1px var(--chip-stroke, var(--lg-glass-stroke));
    color: var(--chip-label, var(--lg-text-secondary));
  }
  .motion .dot {
    flex: none;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--chip-dot, var(--lg-text-secondary));
    box-shadow: 0 0 6px var(--chip-glow, transparent);
  }
  .motion span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .actions .spacer {
    flex: 1;
  }
  .history {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border-radius: 16px;
    border: 0;
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    --mdc-icon-size: 14px;
  }
  .dimmed {
    opacity: 0.4;
    pointer-events: none;
  }

  @container (max-width: 260px) {
    .bar {
      height: 46px;
      padding: 0 10px;
    }
    .actions {
      padding: 12px;
    }
  }
`;

/**
 * The still from `entity_picture` under a scrim, with the name, state and controls
 * floating on top, and an optional motion / history row beneath.
 *
 * Home Assistant's live stream lives in an internal element the frontend does not expose
 * to custom cards, so the feed is the still image on a timer. Expanding opens more-info,
 * which is where the real stream plays.
 */
function CameraCard({ config, hass, host }: ReactCardProps<CameraCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  /** Bumped on a timer to force the browser to re-request the still. */
  const [tick, setTick] = useState(0);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = config.name ?? friendlyName(entity, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);

  useEffect(() => {
    const seconds = Math.max(config.refresh_interval ?? DEFAULT_REFRESH, 1);
    const timer = window.setInterval(() => setTick((value) => value + 1), seconds * 1000);
    return () => window.clearInterval(timer);
  }, [config.refresh_interval]);

  if (!entity) {
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

  const offline = isUnavailable(entity);
  const streaming = entity.state === "streaming";
  const picture = entity.attributes.entity_picture as string | undefined;
  /**
   * The still, with the tick appended so each refresh is a new URL. Home Assistant signs
   * `entity_picture` with a rotating token, so the base URL changes on its own as well.
   */
  const still = offline || !picture
    ? undefined
    : `${picture}${picture.includes("?") ? "&" : "?"}_=${tick}`;

  const callConfigured = (service: string | undefined) => {
    if (!service) return;
    const [domain, name] = service.split(".");
    void hass?.callService(domain, name, { entity_id: config.entity });
  };

  const openSnapshot = () => {
    if (config.snapshot_service) {
      callConfigured(config.snapshot_service);
      return;
    }
    if (picture) window.open(picture, "_blank", "noopener");
  };

  const motion = config.motion_entity ? hass?.states[config.motion_entity] : undefined;
  const detected = motion?.state === "on";

  return <>
    <style>{styles}</style>
    <LiquidGlassSurface
      className={`card${offline ? " offline" : ""}`}
      refraction={refraction}
      variant={config.glass_variant}
      style={{
        display: "flex",
        position: "relative",
        // Glass keeps its container overflow visible; the feed has to be clipped to
        // the card's corners, so state it where the library cannot overrule it.
        overflow: "hidden",
        "--lg-cam-ratio": String(config.aspect_ratio ?? 16 / 9),
      } as CSSProperties}
    >
      <div className="feed" style={still ? { backgroundImage: `url("${still}")` } : undefined}>
        <div className="scrim" />

        <div className="bar top">
          {offline ? <span /> : <span
            className="live float"
            style={streaming
              ? { "--dot": "#FF453A", "--dot-glow": "#FF453A" } as CSSProperties
              : { "--dot": "#8E8E93" } as CSSProperties}
          >
            <span className="dot" />
            <span className="live-label">{t(streaming ? "cam_live" : "cam_still")}</span>
          </span>}
          <div className={`trail${offline ? " dimmed" : ""}`}>
            {config.show_mic && <button
              className="round float"
              onClick={() => callConfigured(config.mic_service)}
              title={t("cam_mic")}
            >
              <Icon icon="mdi:microphone-off" />
            </button>}
            <button className="round float" onClick={open} title={t("cam_expand")}>
              <Icon icon="mdi:arrow-expand" />
            </button>
          </div>
        </div>

        {offline && <div className="nosignal">
          <Icon icon="mdi:video-off" />
          <span>{t("cam_no_signal")}</span>
        </div>}

        <div className="bar bottom">
          <div className="name" onClick={open}>
            <span className="who">{name}</span>
            <span className="when">{offline ? t("cam_offline_state") : relativeTime(entity.last_updated, t)}</span>
          </div>
          <button
            className={`round big float${offline ? " dimmed" : ""}`}
            onClick={openSnapshot}
            title={t("cam_snapshot")}
          >
            <Icon icon="mdi:camera" />
          </button>
        </div>
      </div>

      {config.show_actions !== false && <div className="actions">
        {offline
          ? <div className="motion" style={{
              "--chip-bg": "rgba(255, 69, 58, 0.18)",
              "--chip-stroke": "rgba(255, 69, 58, 0.3)",
              "--chip-label": "#FF453A",
              "--chip-dot": "#FF453A",
            } as CSSProperties}>
              <span className="dot" />
              <span>{t("cam_offline")}</span>
            </div>
          : motion && <div className="motion" style={detected ? {
              "--chip-bg": "rgba(255, 159, 10, 0.18)",
              "--chip-stroke": "rgba(255, 159, 10, 0.3)",
              "--chip-label": "var(--lg-motion-label)",
              "--chip-dot": "#E08600",
              "--chip-glow": "#FF9F0A",
            } as CSSProperties : undefined}>
              <span className="dot" />
              <span>{detected ? `${t("cam_motion")} · ${relativeTime(motion.last_changed, t)}` : t("cam_no_motion")}</span>
            </div>}
        <div className="spacer" />
        <button className={`history${offline ? " dimmed" : ""}`} onClick={open}>
          <Icon icon="mdi:bell-outline" />
          <span>{t("cam_history")}</span>
        </button>
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassCameraCard = defineReactCard<CameraCardConfig>({
  tagName: "liquid-glass-camera-card",
  component: CameraCard,
  normalizeConfig: (config) => ({ refraction: "auto", theme: "auto", ...config }),
  getCardSize: (config) => (config.show_actions === false ? 4 : 5),
  getConfigElement: async () => {
    await loadHaFormComponents();
    return document.createElement("liquid-glass-card-editor");
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["camera"], hass, entities, entitiesFallback),
  }),
});
