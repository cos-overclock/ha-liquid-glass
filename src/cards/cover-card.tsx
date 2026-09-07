import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { clockTime, createTranslator } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard, type BadgeStyle, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { GlassSlider, glassSliderStyles } from "../react/glass-slider";
import { useCardHost } from "../react/use-card-host";
import { useOptimisticValue } from "../react/use-optimistic-value";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, friendlyName, isUnavailable, moreInfo, pickEntity, supportsFeature } from "../utils";

export interface CoverCardConfig extends BaseCardConfig {
  /** Visual style; defaults from device_class (curtain → curtain, else blind). */
  style?: "blind" | "curtain";
  /** For curtain style: "double" (default) or "single". */
  curtain?: "double" | "single";
  show_tilt?: boolean;
}

const F = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8, SET_TILT: 128 };
const TRACK_H = 180;

const ownStyles = `
  .card {
    gap: 16px;
  }
  .position-row {
    display: flex;
    gap: 12px;
  }
  .track {
    position: relative;
    flex: 1;
    min-width: 0;
    height: var(--lg-track-h, ${TRACK_H}px);
    border-radius: 20px;
    overflow: hidden;
    background: var(--lg-track-bg);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.14),
      inset 0 0 0 1px var(--lg-glass-stroke);
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }
  .fabric,
  .panel {
    position: absolute;
    background: linear-gradient(180deg, #e6f8fc, #b9e9f3);
    box-shadow: 0 4px 10px rgba(10, 126, 164, 0.2);
    transition: height 0.25s ease, width 0.25s ease;
  }
  .fabric {
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 6px 14px;
  }
  .fabric span {
    height: 2px;
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.7);
  }
  .panel {
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    padding: 14px 8px;
  }
  .panel.left {
    left: 0;
    box-shadow: 4px 0 10px rgba(10, 126, 164, 0.2);
  }
  .panel.right {
    right: 0;
    box-shadow: -4px 0 10px rgba(10, 126, 164, 0.2);
  }
  .panel span {
    width: 2px;
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.7);
  }
  .handle {
    position: absolute;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    transition: top 0.25s ease, left 0.25s ease, right 0.25s ease;
  }
  .handle.h {
    left: 50%;
    width: 44px;
    height: 6px;
    margin-left: -22px;
  }
  .handle.v {
    top: 50%;
    width: 6px;
    height: 44px;
    margin-top: -22px;
  }
  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 0 14px 18px;
    pointer-events: none;
  }
  .overlay.top {
    justify-content: flex-start;
    padding-top: 16px;
  }
  /* Double curtains part in the middle, so the readable gap is centred. */
  .overlay.center {
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
  }
  /* A single curtain gathers on the left, leaving the right side clear. */
  .overlay.right {
    align-items: flex-end;
    padding-left: 12px;
    padding-right: 16px;
  }
  .overlay .pv {
    font-family: var(--lg-font-ui);
    font-size: var(--lg-pos, 30px);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -1px;
    color: var(--pv-color, var(--lg-text-primary));
    font-variant-numeric: tabular-nums;
  }
  .overlay .pc {
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--pc-color, var(--lg-text-secondary));
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-track-h: clamp(120px, 47cqi, ${TRACK_H}px);
      --lg-pos: clamp(20px, 8cqi, 30px);
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .round-btn.active {
    background: rgba(43, 179, 208, 0.18);
    box-shadow: inset 0 0 0 1px rgba(43, 179, 208, 0.3);
    color: var(--lg-cover-accent-deep);
  }
  .round-btn.selected {
    background: var(--lg-segment-selected);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
  }
  .round-btn.stop lg-icon {
    --mdc-icon-size: 18px;
  }
  .round-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .track:focus-visible {
    outline: 2px solid var(--lg-cover-accent-deep);
    outline-offset: 2px;
  }
  .tilt .lg-react-slider {
    --lg-slider-fill: linear-gradient(90deg, rgba(43, 179, 208, 0.35), rgba(43, 179, 208, 0.75));
    --fill-from: rgba(43, 179, 208, 0.35);
    --fill-to: rgba(43, 179, 208, 0.75);
  }
`;

/**
 * An illustrative position track (blind fabric or curtain panels) that can be dragged to
 * set the position, up / stop / down buttons, and an optional tilt slider.
 */
function CoverCard({ config, hass, host }: ReactCardProps<CoverCardConfig>) {
  const { isDark, refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [dragPos, setDragPos] = useState<number>();
  /** Which panel of a double curtain the pointer grabbed, held for the whole drag. */
  const dragSide = useRef<"left" | "right">("left");
  const trackRef = useRef<HTMLDivElement>(null);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const positionValue = useOptimisticValue(entity?.attributes.current_position as number | undefined, 1);
  const tiltValue = useOptimisticValue(entity?.attributes.current_tilt_position as number | undefined, 1);
  const name = config.name ?? friendlyName(entity, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);

  if (!entity || isUnavailable(entity)) {
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

  const call = (service: string, data?: Record<string, unknown>) =>
    void hass?.callService("cover", service, { entity_id: config.entity, ...data });

  const attributes = entity.attributes;
  const position = dragPos ?? positionValue.value ?? (entity.state === "closed" ? 0 : 100);
  const isCurtain = (config.style ?? (attributes.device_class === "curtain" ? "curtain" : "blind")) === "curtain";
  const singleCurtain = isCurtain && (config.curtain ?? "double") === "single";
  const moving = entity.state === "opening" || entity.state === "closing" ? entity.state : undefined;
  const canSetPosition = supportsFeature(entity, F.SET_POSITION);
  const canOpen = supportsFeature(entity, F.OPEN) || canSetPosition;
  const canClose = supportsFeature(entity, F.CLOSE) || canSetPosition;
  const canStop = supportsFeature(entity, F.STOP);
  const hasTilt = config.show_tilt !== false
    && supportsFeature(entity, F.SET_TILT)
    && attributes.current_tilt_position !== undefined;

  const posFromEvent = (event: PointerEvent<HTMLDivElement>): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return position;
    // `closed` is how much of the track the cover hides: 0 = fully open, 1 = fully closed.
    // It is measured so the edge the user grabs follows the pointer.
    let closedRatio: number;
    if (!isCurtain) {
      // Fabric hangs from the top; its lower edge sits at `closed` of the height.
      closedRatio = (event.clientY - rect.top) / rect.height;
    } else if (singleCurtain) {
      // One panel anchored left; its right edge sits at `closed` of the width.
      closedRatio = (event.clientX - rect.left) / rect.width;
    } else {
      // Two panels meeting in the middle; each is `closed / 2` wide, so the grabbed
      // panel's inner edge sits at the pointer's distance from that panel's own side.
      // The side is latched at pointerdown: measuring from whichever side is nearer
      // would flip to the other panel once the pointer crosses the centre, which reads
      // as the curtain re-opening just as it finishes closing.
      const fromOwnSide = dragSide.current === "right" ? rect.right - event.clientX : event.clientX - rect.left;
      closedRatio = (2 * fromOwnSide) / rect.width;
    }
    return Math.round(clamp(1 - closedRatio, 0, 1) * 100);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!canSetPosition || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const rect = event.currentTarget.getBoundingClientRect();
    dragSide.current = event.clientX < rect.left + rect.width / 2 ? "left" : "right";
    setDragPos(posFromEvent(event));
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPos === undefined) return;
    setDragPos(posFromEvent(event));
  };
  const setPosition = (next: number) => {
    positionValue.commit(next);
    call("set_cover_position", { position: next });
  };
  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPos === undefined) return;
    const next = posFromEvent(event);
    setDragPos(undefined);
    setPosition(next);
  };
  const onTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!canSetPosition) return;
    let next = position;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next += 5;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= 5;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 100;
    else return;
    event.preventDefault();
    setPosition(Math.round(clamp(next, 0, 100)));
  };
  const moveToBoundary = (opening: boolean) => {
    const directFeature = opening ? F.OPEN : F.CLOSE;
    if (supportsFeature(entity, directFeature)) call(opening ? "open_cover" : "close_cover");
    else if (canSetPosition) setPosition(opening ? 100 : 0);
  };

  const closed = position === 0 && !moving;
  const closedRatio = 1 - position / 100;
  const well: WellStyle | undefined = closed
    ? undefined
    : { from: "#8FE3F4", to: "var(--lg-cover-accent-deep)", glow: "rgba(43,179,208,0.24)" };
  const badge: BadgeStyle | undefined = closed
    ? undefined
    : { color: "var(--lg-cover-badge)", bg: "rgba(43,179,208,0.18)", stroke: "rgba(43,179,208,0.3)" };
  const icon = config.icon
    ?? (attributes.icon)
    ?? (isCurtain ? "mdi:curtains" : "mdi:blinds-horizontal");
  const [upIcon, downIcon] = isCurtain
    ? singleCurtain
      ? ["mdi:chevron-double-left", "mdi:chevron-double-right"]
      : ["mdi:arrow-expand-horizontal", "mdi:arrow-collapse-horizontal"]
    : ["mdi:chevron-up", "mdi:chevron-down"];
  const state = moving
    ? `${t(moving)} · ${position}% → ${moving === "opening" ? 100 : 0}%`
    : entity.state === "closed" || position === 0
      ? `${t("is_closed")} · ${t("last_change", { t: clockTime(entity.last_changed) })}`
      : `${t("position")} ${position}% · ${t("stopped")}`;
  const caption = moving ? `${t(moving)}…` : closed ? t("is_closed") : t("is_open");
  // Fully closed means the cover itself sits behind the readout, whatever the style,
  // so the text has to flip to the dark ink that reads against the fabric.
  const overlayOnFabric = closed || (!isCurtain && moving === "opening" && position < 60);
  const overlayTop = !isCurtain && moving === "opening" && position < 60 && !closed;
  const tilt = tiltValue.value ?? 50;
  const panelWidth = `${(closedRatio * 100) / 2}%`;

  return <>
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent="var(--lg-cover-accent)"
      style={{ display: "flex", position: "relative" }}
    >
      <div className="header">
        <IconWell icon={icon} style={well} onClick={open} />
        <CardTitle name={name} state={state} onClick={open} />
        <Badge label={moving ? t("moving") : closed ? t("closed") : t("open")} style={badge} />
      </div>

      <div className="position-row">
        <div
          ref={trackRef}
          className="track"
          role="slider"
          tabIndex={canSetPosition ? 0 : -1}
          aria-label={`${name} ${t("position")}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={position}
          aria-disabled={!canSetPosition}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onKeyDown={onTrackKeyDown}
        >
          {!isCurtain ? <>
            {/* Percentages, not pixels: the track height scales with the card width. */}
            <div className="fabric" style={{ height: `${closedRatio * 100}%` }}>
              {[0, 1, 2, 3, 4].map((index) => <span key={index} />)}
            </div>
            {position > 0 && <div className="handle h" style={{ top: `max(4px, calc(${closedRatio * 100}% - 13px))` }} />}
          </> : singleCurtain ? <>
            <div className="panel left" style={{ width: `${closedRatio * 100}%` }}>
              {[0, 1, 2].map((index) => <span key={index} />)}
            </div>
            <div className="handle v" style={{ left: `calc(${closedRatio * 100}% - 13px)` }} />
          </> : <>
            <div className="panel left" style={{ width: panelWidth }}>
              {[0, 1, 2].map((index) => <span key={index} />)}
            </div>
            <div className="panel right" style={{ width: panelWidth }}>
              {[0, 1, 2].map((index) => <span key={index} />)}
            </div>
            <div className="handle v" style={{ left: `calc(${panelWidth} - 13px)` }} />
            <div className="handle v" style={{ right: `calc(${panelWidth} - 13px)` }} />
          </>}

          <div
            className={`overlay${isCurtain && !singleCurtain ? " center" : ""}${singleCurtain ? " right" : ""}${overlayTop ? " top" : ""}`}
            style={overlayOnFabric
              ? { "--pv-color": "#0B3A46", "--pc-color": "rgba(11,58,70,0.7)" } as CSSProperties
              : undefined}
          >
            <span className="pv">{position}%</span>
            <span className="pc">{caption}</span>
          </div>
        </div>

        <div className="buttons">
          <button
            className={`round-btn${moving === "opening" ? " active" : ""}`}
            disabled={!canOpen}
            onClick={() => moveToBoundary(true)}
            title="Open"
          >
            <Icon icon={upIcon} />
          </button>
          <button
            className={`round-btn stop${moving ? " selected" : ""}`}
            disabled={!canStop}
            onClick={() => call("stop_cover")}
            title="Stop"
          >
            <Icon icon="mdi:square-outline" />
          </button>
          <button
            className={`round-btn${moving === "closing" ? " active" : ""}`}
            disabled={!canClose}
            onClick={() => moveToBoundary(false)}
            title="Close"
          >
            <Icon icon={downIcon} />
          </button>
        </div>
      </div>

      {hasTilt && <div className="section tilt">
        <div className="label-row">
          <span className="label">{t("tilt")}</span>
          <span className="value">{Math.round((tilt / 100) * 180 - 90)}°</span>
        </div>
        <GlassSlider
          value={tilt}
          min={0}
          max={100}
          step={1}
          fillFrom={50}
          showFill={!closed}
          refraction={refraction}
          scheme={isDark ? "dark" : "light"}
          label={t("tilt")}
          onInput={tiltValue.setPreview}
          onChange={(next) => {
            tiltValue.commit(next);
            call("set_cover_tilt_position", { tilt_position: Math.round(next) });
          }}
        />
        <div className="ticks"><span>−90°</span><span>0°</span><span>90°</span></div>
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassCoverCard = defineLiquidGlassCard<CoverCardConfig>({
  tagName: "liquid-glass-cover-card",
  component: CoverCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, glassSliderStyles, ownStyles],
  getCardSize: () => 4,
  getGridOptions: () => contentGridOptions(5),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(
      ["cover"],
      hass,
      entities,
      entitiesFallback,
      (entity) => Boolean(((entity.attributes.supported_features as number) ?? 0) & F.SET_POSITION),
    ),
  }),
});
