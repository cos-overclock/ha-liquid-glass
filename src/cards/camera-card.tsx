import {
  Glass,
  type GlassSurfaceLens,
} from "@samasante/liquid-glass";
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createTranslator, relativeTime } from "../i18n";
import { UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { autoHeightGridOptions } from "../react/grid-options";
import {
  glassSurfaceStyles,
  glassVideoControlOptics,
  Icon,
  LiquidGlassSurface,
} from "../react/glass-primitives";
import { opticsForQuality, useRefractionQuality } from "../react/refraction-quality";
import { useCardHost } from "../react/use-card-host";
import { useVisibleTick } from "../react/use-visible-tick";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { callConfiguredService, entityName, isUnavailable, moreInfo, pickEntity } from "../utils";

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
const CONTROL_SIZE = 32;
const SNAPSHOT_SIZE = 34;
const CONTROL_GAP = 8;

type FrameSlot = 0 | 1;
type CameraFrames = [string | undefined, string | undefined];
interface CameraFrameState {
  requested: string | undefined;
  frames: CameraFrames;
  active: FrameSlot | undefined;
}

interface CameraFrame {
  image: HTMLImageElement | undefined;
  /** Bumped once per decoded still, so the painter can tell two frames apart. */
  generation: number;
}

interface RequestedStill {
  tick: number;
  url: string | undefined;
}

/**
 * The still to request, with the refresh tick appended so each refresh is a new URL.
 *
 * Home Assistant signs `entity_picture` with a token it rotates on a schedule of its
 * own, so the base URL changes independently of the refresh timer. Pinning the URL to
 * the tick keeps those two from each pulling the camera down: a rotated token is picked
 * up by the next scheduled refresh, which is well inside the window where the previous
 * token is still accepted. The URL is rebuilt out of turn only when the answer changes
 * between "there is a still" and "there is not" — the camera going offline, or coming
 * back — since neither can wait for a tick.
 */
export function nextStillUrl(
  current: RequestedStill,
  picture: string | undefined,
  tick: number,
): RequestedStill {
  if (current.tick === tick && (picture !== undefined) === (current.url !== undefined)) return current;
  if (picture === undefined) return { tick, url: undefined };
  return { tick, url: `${picture}${picture.includes("?") ? "&" : "?"}_=${tick}` };
}

/**
 * A `<Glass draw>` painter, backed by a scaled copy of the still.
 *
 * Two things have to hold at once, and only a buffer satisfies both.
 *
 * The lens asks for a source frame on every animation frame, but a camera still only
 * changes once per refresh, so rescaling a full-size photo sixty times a second is pure
 * waste — the one piece of per-frame main-thread work this card was doing.
 *
 * The frame handed back must never be empty, though, and the canvas holding it belongs
 * to `<Glass>`, which resizes (and so clears) it from its own layout. An empty frame is
 * not merely a dropped update: the lens pass writes its own alpha, so where the surface
 * is transparent every lens still paints — as an opaque black disc over the controls,
 * which is the flicker this replaces. Relying on the canvas to keep the pixels we left
 * there last frame is what made that reachable.
 *
 * So the expensive rescale happens once per frame of camera footage, into a buffer, and
 * every animation frame blits that buffer 1:1 onto whatever surface `<Glass>` provides.
 */
export function createStillPainter(
  readFrame: () => CameraFrame,
  buffer: HTMLCanvasElement = document.createElement("canvas"),
): (context: CanvasRenderingContext2D) => void {
  let scaled: { generation: number; width: number; height: number } | undefined;

  return (context) => {
    const width = context.canvas.width;
    const height = context.canvas.height;
    if (!width || !height) return;
    const { image, generation } = readFrame();
    const stale = !scaled
      || scaled.generation !== generation
      || scaled.width !== width
      || scaled.height !== height;

    if (stale && image && image.naturalWidth && image.naturalHeight) {
      // Sizing the buffer clears it, which is what we want: the scale below covers it.
      buffer.width = width;
      buffer.height = height;
      const target = buffer.getContext("2d");
      if (!target) return;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const sourceWidth = width / scale;
      const sourceHeight = height / scale;
      target.drawImage(
        image,
        (image.naturalWidth - sourceWidth) / 2,
        (image.naturalHeight - sourceHeight) / 2,
        sourceWidth,
        sourceHeight,
        0,
        0,
        width,
        height,
      );
      scaled = { generation, width, height };
    }

    // Nothing to show yet — but `<Glass>` only mounts once a still has decoded, so this
    // is the first frame or two after a remount, not a state the lens sits in.
    if (!scaled) return;
    // Stretched, not offset, when a resize beat the next rescale: a pixel of softness
    // for one frame, rather than an uncovered strip for the lens to blacken.
    context.drawImage(buffer, 0, 0, width, height);
  };
}

const ownStyles = `
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
  }
  /*
   * The still is an element rather than a CSS background so the lens can reuse the
   * very same decode. A background image is fetched in no-cors mode, which cannot
   * share a cache entry with the cors-mode load a canvas needs — the camera would be
   * pulled twice per refresh.
   */
  .still {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /*
   * Camera refreshes are double-buffered. Keep the decoded frame visible while
   * the other image element fetches the next one; swapping the visible source
   * element exposes an empty frame to both the browser and the WebGL lens.
   */
  .still.staging {
    visibility: hidden;
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

  /* Display-only badges retain their lightweight translucent treatment. */
  .float {
    position: relative;
    overflow: hidden;
    border: 0;
    padding: 0;
    color: #fff;
    background: rgba(11, 11, 15, 0.34);
    -webkit-backdrop-filter: blur(5px) saturate(1.35);
    backdrop-filter: blur(5px) saturate(1.35);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  }
  .round {
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 50%;
    padding: 0;
    color: #fff;
    display: grid;
    place-items: center;
    cursor: pointer;
    --mdc-icon-size: 15px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));
    transition: transform 120ms ease, opacity 160ms ease;
  }
  .round:active {
    transform: scale(0.9);
  }
  .round.big {
    width: 34px;
    height: 34px;
    --mdc-icon-size: 16px;
  }
  /*
   * Like GlassVideoControls, the WebGL surface paints the lens underneath while
   * the actual control stays crisp and has no fill of its own.
   */
  .feed.glass-active .lens-control {
    overflow: visible;
    background: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    box-shadow: none;
  }
  /*
   * Everything else floating over the feed keeps its own fill, but not its blur: a
   * backdrop filter over the lens canvas makes the compositor re-read and re-blur that
   * canvas on every frame it presents, which is every frame. A denser fill reads the
   * same over a photo and costs the compositor nothing.
   */
  .feed.glass-active .float:not(.lens-control) {
    background: rgba(11, 11, 15, 0.52);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  .camera-glass-stage {
    position: absolute !important;
    inset: 0;
    width: 100%;
    height: 100%;
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
  const quality = useRefractionQuality();
  const cameraOptics = useMemo(
    () => opticsForQuality(glassVideoControlOptics, quality),
    [quality],
  );
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  const offline = isUnavailable(entity);
  const streaming = entity?.state === "streaming";
  const picture = entity?.attributes.entity_picture;
  const canRefresh = Boolean(picture && !offline);
  /** Bumped on a timer to force the browser to re-request the still. */
  const tick = useVisibleTick(
    host,
    Math.max(config.refresh_interval ?? DEFAULT_REFRESH, 1) * 1000,
    canRefresh,
  );
  /** The still to load, held steady between ticks — see `nextStillUrl`. */
  const requestRef = useRef<RequestedStill>({ tick: -1, url: undefined });
  requestRef.current = nextStillUrl(requestRef.current, canRefresh ? picture : undefined, tick);
  const still = requestRef.current.url;
  const feedRef = useRef<HTMLDivElement>(null);
  const [feedSize, setFeedSize] = useState({ width: 0, height: 0 });
  const stillRefs = useRef<[HTMLImageElement | null, HTMLImageElement | null]>([null, null]);
  const activeFrameRef = useRef<FrameSlot | undefined>(undefined);
  /** Advanced once per promoted frame; the painter redraws on nothing else. */
  const frameGenerationRef = useRef(0);
  const requestedStillRef = useRef(still);
  const [frameState, setFrameState] = useState<CameraFrameState>(() => ({
    requested: still,
    frames: still ? [still, undefined] : [undefined, undefined],
    active: undefined,
  }));
  requestedStillRef.current = still;

  // React supports adjusting state during render when a prop-derived value changes.
  // Doing it here queues the next URL before paint without adding an effect/render pass.
  if (frameState.requested !== still) {
    if (!still) {
      activeFrameRef.current = undefined;
      setFrameState({
        requested: undefined,
        frames: [undefined, undefined],
        active: undefined,
      });
    } else {
      // Never replace the visible image. Load the new URL into the other stable
      // element and promote it only from that element's load event.
      const target: FrameSlot = frameState.active === 0 ? 1 : 0;
      const frames: CameraFrames = [...frameState.frames];
      frames[target] = still;
      setFrameState({ ...frameState, requested: still, frames });
    }
  }

  const activateFrame = useCallback((slot: FrameSlot, url: string) => {
    // A slow response from an older refresh must not replace a newer request.
    if (requestedStillRef.current !== url) return;
    activeFrameRef.current = slot;
    frameGenerationRef.current += 1;
    setFrameState((current) => current.requested === url
      ? { ...current, active: slot }
      : current);
  }, []);

  const { active: activeFrame, frames } = frameState;

  useLayoutEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;
    const measure = () => setFeedSize({ width: feed.clientWidth, height: feed.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(feed);
    return () => observer.disconnect();
  }, []);

  // Glass asks for a frame on every animation frame, so reading the active slot
  // through a ref swaps its source without remounting the WebGL surface.
  const drawStill = useMemo(() => createStillPainter(() => {
    const slot = activeFrameRef.current;
    return {
      image: slot === undefined ? undefined : stillRefs.current[slot] ?? undefined,
      generation: frameGenerationRef.current,
    };
  }), []);

  if (!entity) {
    return <>
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

  const callConfigured = (service: string | undefined) =>
    callConfiguredService(hass, service, { entity_id: config.entity });

  const openSnapshot = () => {
    if (config.snapshot_service) {
      callConfigured(config.snapshot_service);
      return;
    }
    if (picture) window.open(picture, "_blank", "noopener");
  };

  const motion = config.motion_entity ? hass?.states[config.motion_entity] : undefined;
  const detected = motion?.state === "on";
  const glassReady = Boolean(
    refraction && activeFrame !== undefined && feedSize.width > 0 && feedSize.height > 0,
  );
  const compact = feedSize.width <= 260;
  const barHeight = compact ? 46 : 56;
  const sidePadding = compact ? 10 : 14;
  const expandX = feedSize.width - sidePadding - CONTROL_SIZE / 2;
  const lenses: GlassSurfaceLens[] = [
    {
      x: expandX / feedSize.width,
      y: barHeight / 2 / feedSize.height,
      w: CONTROL_SIZE,
      h: CONTROL_SIZE,
      radius: CONTROL_SIZE / 2,
    },
    ...(config.show_mic ? [{
      x: (expandX - CONTROL_SIZE - CONTROL_GAP) / feedSize.width,
      y: barHeight / 2 / feedSize.height,
      w: CONTROL_SIZE,
      h: CONTROL_SIZE,
      radius: CONTROL_SIZE / 2,
    }] : []),
    {
      x: (feedSize.width - sidePadding - SNAPSHOT_SIZE / 2) / feedSize.width,
      y: (feedSize.height - barHeight / 2) / feedSize.height,
      w: SNAPSHOT_SIZE,
      h: SNAPSHOT_SIZE,
      radius: SNAPSHOT_SIZE / 2,
    },
  ];

  const feedContents = <>
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
          className="round float lens-control"
          type="button"
          onClick={() => callConfigured(config.mic_service)}
          title={t("cam_mic")}
        >
          <Icon icon="mdi:microphone-off" />
        </button>}
        <button
          className="round float lens-control"
          type="button"
          onClick={open}
          title={t("cam_expand")}
        >
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
        className={`round big float lens-control${offline ? " dimmed" : ""}`}
        type="button"
        onClick={openSnapshot}
        title={t("cam_snapshot")}
      >
        <Icon icon="mdi:camera" />
      </button>
    </div>
  </>;

  return <>
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
      <div
        ref={feedRef}
        className={`feed${glassReady ? " glass-active" : ""}`}
      >
        {frames.map((url, slot) => url && <img
          key={slot}
          ref={(image) => { stillRefs.current[slot as FrameSlot] = image; }}
          className={`still${activeFrame === slot ? "" : " staging"}`}
          src={url}
          /*
           * Only when the lens will read the pixels back: a cors-mode request is what
           * keeps the canvas untainted, and asking for it otherwise would fail on a
           * cross-origin `entity_picture` that serves no CORS headers.
           */
          crossOrigin={refraction ? "anonymous" : undefined}
          alt=""
          decoding="async"
          onLoad={() => activateFrame(slot as FrameSlot, url)}
        />)}
        {glassReady ? <Glass
          className="camera-glass-stage"
          draw={drawStill}
          optics={cameraOptics}
          lenses={lenses}
          maxDpr={quality === "medium" ? 1 : 2}
        >
          {feedContents}
        </Glass> : feedContents}
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

export const LiquidGlassCameraCard = defineLiquidGlassCard<CameraCardConfig>({
  tagName: "liquid-glass-camera-card",
  component: CameraCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles],
  getCardSize: (config) => (config.show_actions === false ? 4 : 5),
  getGridOptions: () => autoHeightGridOptions(),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["camera"], hass, entities, entitiesFallback),
  }),
});
