import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  Glass,
  GlassDiv,
  cubicBezier,
  deriveGlass,
  glassValue,
  rubberBand,
  useLensWobble,
  type GlassOptics,
} from "@samasante/liquid-glass";
import { clamp } from "../utils";
import {
  filterResolutionForQuality,
  opticsForQuality,
  useRefractionQuality,
} from "./refraction-quality";
import { animateGlass, holdWobble } from "./reduced-motion";

const RUBBER_OVERSHOOT = 0.05;
const RUBBER_DAMPENING = 30;
export const GLASS_SLIDER_EXPAND_ANIM = { ease: cubicBezier(0.34, 1.36, 0.42, 1), duration: 0.27 };
export const GLASS_SLIDER_COLLAPSE_ANIM = { ease: cubicBezier(0.36, 0, 0.18, 1), duration: 0.46 };

const SLIDER_BASE: Partial<GlassOptics> = {
  mapSize: 128,
  depth: 0.2,
  dispersion: 0.5,
  scaleX: 0.06,
  scaleY: 0.06,
  clipToShape: true,
  softEdge: true,
  curvature: 0.55,
  splay: 0.5,
  bend: 0.1,
  bendWidth: 0.05,
  frost: 0,
  brightness: 0.06,
  specular: 1.5,
  sheenAngle: 45,
  sheenDark: false,
  glow: 0.4,
  glowSpread: 0.5,
  glowFalloff: 1.5,
  sheen: 0,
  sheenWidth: 3,
  sheenFalloff: 1.5,
  edgeShadow: "0 2px 6px rgba(0, 0, 0, 0.16)",
  edgeInsetShadow: "0 -4px 10px rgba(0, 0, 0, 0.12)",
};

const SLIDER_DARK: Partial<GlassOptics> = {
  restEdgeShadow: "0 1.333px 5.333px rgba(0, 0, 0, 0.5)",
  scaleX: 0.133,
  scaleY: 0.135,
  brightness: 0.12,
  sheenAngle: 45,
  glowFalloff: 1.5,
  sheen: 0.5,
  sheenWidth: 1,
  sheenFalloff: 1.5,
};

const SLIDER_LIGHT: Partial<GlassOptics> = {
  restEdgeShadow: "0 1.333px 5.333px rgba(46, 15, 15, 0.12)",
  scaleX: 0.1,
  scaleY: 0.1,
  brightness: -0.02,
  sheenAngle: 30,
  glowFalloff: 2,
  sheen: 1,
  sheenWidth: 1,
  sheenFalloff: 1,
};

const SLIDER_SAFARI: Partial<GlassOptics> = { scaleY: 0.25 };
const IS_SAFARI = typeof navigator !== "undefined"
  && /^((?!chrome|chromium|android).)*safari/i.test(navigator.userAgent);

/** The reference slider's light/dark/Safari lens recipe, shared by linear and dial controls. */
export function useGlassSliderOptics(
  refraction: boolean,
  scheme: "light" | "dark",
): Partial<GlassOptics> {
  const quality = useRefractionQuality();
  return useMemo(() => opticsForQuality({
    ...SLIDER_BASE,
    ...(scheme === "dark" ? SLIDER_DARK : SLIDER_LIGHT),
    ...(IS_SAFARI ? SLIDER_SAFARI : null),
    ...(refraction ? null : {
      strength: 0,
      scaleX: 0,
      scaleY: 0,
      curvature: 0,
      dispersion: 0,
      bend: 0,
    }),
    sheenDark: scheme === "light",
  }, quality), [quality, refraction, scheme]);
}

/** Which handle a change came from. A single-value slider always reports "low". */
export type SliderHandle = "low" | "high";

export interface GlassSliderProps {
  value: number;
  /** Upper handle. With it the slider is a range and `value` is its lower end. */
  highValue?: number;
  min: number;
  max: number;
  step: number;
  /** Optional coarser keyboard increment for controls whose drag range is continuous. */
  keyboardStep?: number;
  /** Thumb tint opacity while idle. Defaults to the solid reference-slider appearance. */
  restTintOpacity?: number;
  disabled?: boolean;
  refraction: boolean;
  scheme?: "light" | "dark";
  showFill?: boolean;
  /** Keep a full-width gradient stationary and reveal it with a clip. */
  clipFill?: boolean;
  /** A disabled/progress-only control can omit the lens thumb. */
  showKnob?: boolean;
  /** Fill from this value to the current one instead of from the start. */
  fillFrom?: number;
  /** Step marks drawn along the bar. 0 draws none. */
  ticks?: number;
  label: string;
  valueText?: string;
  /** Accessible names for the lower and upper handles of a range slider. */
  rangeLabels?: readonly [low: string, high: string];
  /** Decorative, non-interactive content rendered inside the slider track. */
  trackContent?: ReactNode;
  /** Optional content carried by the thumb, such as an icon for a binary control. */
  thumbContent?: ReactNode;
  /* Property signatures, not methods: these are callbacks, never called with a `this`. */
  onInput: (value: number, handle: SliderHandle) => void;
  onChange: (value: number, handle: SliderHandle) => void;
}

export const glassSliderStyles = `
  .lg-react-slider {
    --lg-effective-slider-height: var(--lg-slider-height, 44px);
    --lg-effective-bar-height: var(--lg-slider-bar-height, 6px);
    --lg-effective-thumb-width: var(--lg-slider-thumb-width, var(--lg-slider-knob-size, 22px));
    --lg-effective-thumb-height: var(--lg-slider-thumb-height, 34px);
    position: relative;
    display: block;
    width: 100%;
    height: var(--lg-slider-height, 44px);
    overflow: visible;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .lg-react-slider.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .slider-glass {
    position: absolute !important;
    overflow: visible !important;
  }
  .slider-content,
  .slider-refraction-content { box-sizing: content-box; }
  .slider-refraction-content {
    display: flex;
    align-items: center;
  }
  .slider-track {
    position: relative;
    width: 100%;
    height: var(--lg-effective-slider-height);
    border-radius: 999px;
    cursor: pointer;
    touch-action: none;
  }
  .lg-react-slider.disabled .slider-track { cursor: not-allowed; }
  .slider-track:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: 2px;
  }
  .slider-range-handle {
    position: absolute;
    z-index: 5;
    top: 0;
    width: var(--lg-effective-thumb-width);
    height: 100%;
    transform: translateX(-50%);
    border-radius: 999px;
    pointer-events: none;
  }
  .slider-range-handle:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: 2px;
  }
  .slider-bar,
  .slider-refraction-bar {
    position: absolute;
    inset-inline: 0;
    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-bar-height)) / 2);
    height: var(--lg-effective-bar-height);
    overflow: hidden;
    border-radius: 999px;
    background: var(--lg-slider-track, var(--lg-slider-bar-bg));
  }
  .slider-refraction-bar {
    position: relative;
    inset: auto;
    top: auto;
    transform-origin: center;
  }
  .slider-fill {
    position: absolute;
    inset-block: 0;
    left: 0;
    border-radius: inherit;
    background: var(--lg-slider-fill, linear-gradient(90deg, #fff8ea, #ffe2a6));
    pointer-events: none;
  }
  .slider-fill.clipped {
    inset-inline: 0;
    transition: clip-path 0.35s cubic-bezier(0.3, 0.8, 0.3, 1);
  }
  .lg-react-slider.active .slider-fill.clipped { transition: none; }
  .slider-anchor {
    position: absolute;
    top: 50%;
    width: 2px;
    height: calc(var(--lg-effective-bar-height) + 6px);
    margin-left: -1px;
    transform: translateY(-50%);
    border-radius: 1px;
    background: var(--lg-slider-mark);
    pointer-events: none;
  }
  .marks {
    position: absolute;
    inset-block: 0;
    inset-inline: calc(var(--lg-effective-thumb-width) / 2 - 2px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
  }
  .marks span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--lg-slider-mark);
  }
  .slider-knob {
    position: absolute;
    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-thumb-height)) / 2);
    left: 0;
    width: var(--lg-effective-thumb-width);
    height: var(--lg-effective-thumb-height);
    border-radius: 999px;
    pointer-events: none;
  }
  .slider-knob.static {
    background: var(--lg-knob-solid);
    box-shadow: var(--lg-knob-shadow);
  }
  .knob-probe {
    position: absolute;
    visibility: hidden;
    width: var(--lg-effective-thumb-width);
    height: var(--lg-effective-thumb-height);
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .slider-fill.clipped { transition-duration: 0.01ms !important; }
  }
`;

interface Geometry {
  trackW: number;
  controlH: number;
  thumbW: number;
  thumbH: number;
  pad: number;
  fullW: number;
  fullH: number;
  travel: number;
  refractionTrackH: number;
}

const geometryFor = (trackW: number, controlH: number, thumbW: number, thumbH: number): Geometry => {
  const travel = Math.max(0, trackW - thumbW);
  const rubberLimit = trackW * RUBBER_OVERSHOOT;
  const pad = Math.ceil(0.5 * Math.max(thumbW / 2, thumbH / 2) + rubberLimit) + 2;
  return {
    trackW,
    controlH,
    thumbW,
    thumbH,
    pad,
    fullW: trackW + 2 * pad,
    fullH: controlH + 2 * pad,
    travel,
    refractionTrackH: Math.round(0.75 * thumbH),
  };
};

const DEFAULT_GEOMETRY = geometryFor(240, 44, 22, 34);
const sameGeometry = (a: Geometry, b: Geometry): boolean =>
  a.trackW === b.trackW
  && a.controlH === b.controlH
  && a.thumbW === b.thumbW
  && a.thumbH === b.thumbH
  && a.pad === b.pad;

/** Responsive, range-capable adaptation of the reference GlassSlider example. */
export function GlassSlider({
  value,
  highValue,
  min,
  max,
  step,
  keyboardStep,
  restTintOpacity = 1,
  disabled = false,
  refraction,
  scheme = "light",
  showFill = true,
  clipFill = false,
  showKnob = true,
  fillFrom,
  ticks = 0,
  label,
  valueText,
  rangeLabels,
  trackContent,
  thumbContent,
  onInput,
  onChange,
}: GlassSliderProps) {
  const quality = useRefractionQuality();
  const optics = useGlassSliderOptics(refraction, scheme);
  const isRange = highValue !== undefined;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const startClientXRef = useRef(0);
  const startThumbXRef = useRef(0);
  const activeHandleRef = useRef<SliderHandle>("low");
  const geometryRef = useRef(DEFAULT_GEOMETRY);
  const valuesRef = useRef({ value, highValue, min, max, step });
  valuesRef.current = { value, highValue, min, max, step };
  const restTintOpacityRef = useRef(restTintOpacity);
  restTintOpacityRef.current = restTintOpacity;

  const [geometry, setGeometry] = useState(DEFAULT_GEOMETRY);
  const [activeHandle, setActiveHandle] = useState<SliderHandle>("low");
  const [drag, setDrag] = useState<{ handle: SliderHandle; value: number }>();
  const [keyActive, setKeyActive] = useState(false);
  const keyTimer = useRef<number | undefined>(undefined);

  const valueToX = useCallback((raw: number, current = geometryRef.current): number => {
    const span = valuesRef.current.max - valuesRef.current.min;
    return span > 0 ? ((raw - valuesRef.current.min) / span) * current.travel : 0;
  }, []);

  const xToValue = useCallback((x: number, current = geometryRef.current): number => {
    const { min: lower, max: upper, step: increment } = valuesRef.current;
    const clampedX = clamp(x, 0, current.travel);
    const raw = current.travel > 0 ? lower + (clampedX / current.travel) * (upper - lower) : lower;
    const snapped = increment > 0 ? Math.round((raw - lower) / increment) * increment + lower : raw;
    return clamp(snapped, lower, upper);
  }, []);

  const initialValueRef = useRef(value);
  const motion = useMemo(() => {
    const initial = DEFAULT_GEOMETRY.travel * clamp(
      (initialValueRef.current - valuesRef.current.min) / (valuesRef.current.max - valuesRef.current.min || 1),
      0,
      1,
    );
    const thumbX = glassValue(initial);
    const surfaceW = glassValue(DEFAULT_GEOMETRY.fullW);
    const pad = glassValue(DEFAULT_GEOMETRY.pad);
    const thumbW = glassValue(DEFAULT_GEOMETRY.thumbW);
    const halfW = glassValue(DEFAULT_GEOMETRY.thumbW / 2);
    const halfH = glassValue(DEFAULT_GEOMETRY.thumbH / 2);
    const radius = glassValue(Math.min(DEFAULT_GEOMETRY.thumbW, DEFAULT_GEOMETRY.thumbH) / 2);
    const tintOpacity = glassValue(restTintOpacityRef.current);
    const trackScaleX = glassValue(0.85);
    const trackScaleY = glassValue(0.525);
    const shadowOpacity = glassValue(0);
    const restShadowOpacity = deriveGlass([shadowOpacity], () => 1 - shadowOpacity.get());
    const stretch = glassValue(0);
    const lensX = deriveGlass(
      [thumbX, surfaceW, pad, thumbW],
      () => (pad.get() + thumbW.get() / 2 + thumbX.get()) / surfaceW.get(),
    );
    const lensW = deriveGlass(
      [halfW, stretch],
      () => halfW.get() * (1 - 0.2 * stretch.get()) * 2,
    );
    const lensH = deriveGlass(
      [halfH, stretch],
      () => halfH.get() * (1 + 0.4 * stretch.get()) * 2,
    );
    return {
      thumbX,
      surfaceW,
      pad,
      thumbW,
      halfW,
      halfH,
      radius,
      tintOpacity,
      trackScaleX,
      trackScaleY,
      shadowOpacity,
      restShadowOpacity,
      stretch,
      lensX,
      lensW,
      lensH,
    };
  }, []);

  const holdRef = useRef(0);
  const kickWobbleRef = useRef<() => void>(() => {});
  const idleWobblePosition = useMemo(() => glassValue(0), []);
  useLensWobble(refraction ? motion.thumbX : idleWobblePosition, motion.stretch, holdRef, kickWobbleRef);

  const syncGeometry = useCallback(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const probe = probeRef.current;
    if (!wrapper || !track || !probe) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const probeRect = probe.getBoundingClientRect();
    const previous = geometryRef.current;
    const next = geometryFor(
      wrapperRect.width || trackRect.width || previous.trackW,
      trackRect.height || previous.controlH,
      probeRect.width || probe.offsetWidth || previous.thumbW,
      probeRect.height || probe.offsetHeight || previous.thumbH,
    );
    geometryRef.current = next;
    motion.surfaceW.set(next.fullW);
    motion.pad.set(next.pad);
    motion.thumbW.set(next.thumbW);
    if (!draggingRef.current) {
      motion.halfW.set(next.thumbW / 2);
      motion.halfH.set(next.thumbH / 2);
      motion.radius.set(Math.min(next.thumbW, next.thumbH) / 2);
      const currentValue = activeHandleRef.current === "high" ? highValue ?? value : value;
      motion.thumbX.set(valueToX(currentValue, next));
    }
    setGeometry((current) => sameGeometry(current, next) ? current : next);
  }, [highValue, motion, value, valueToX]);

  useLayoutEffect(() => {
    syncGeometry();
    if (typeof ResizeObserver === "undefined" || !wrapperRef.current) return;
    const observer = new ResizeObserver(syncGeometry);
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [syncGeometry]);

  useEffect(() => {
    if (draggingRef.current || !showKnob) return;
    const currentValue = activeHandleRef.current === "high" ? highValue ?? value : value;
    motion.thumbX.set(valueToX(currentValue));
  }, [highValue, motion.thumbX, showKnob, value, valueToX]);

  useEffect(() => () => {
    window.clearTimeout(keyTimer.current);
    const pointerId = pointerIdRef.current;
    if (pointerId !== null && trackRef.current?.hasPointerCapture?.(pointerId)) {
      trackRef.current.releasePointerCapture(pointerId);
    }
  }, []);

  const expand = useCallback(() => {
    if (!refraction) return;
    animateGlass(motion.halfW, 1.5 * geometryRef.current.thumbW / 2, GLASS_SLIDER_EXPAND_ANIM);
    animateGlass(motion.halfH, 1.5 * geometryRef.current.thumbH / 2, GLASS_SLIDER_EXPAND_ANIM);
    animateGlass(motion.radius, 1.5 * Math.min(geometryRef.current.thumbW, geometryRef.current.thumbH) / 2, GLASS_SLIDER_EXPAND_ANIM);
    animateGlass(motion.tintOpacity, 0, GLASS_SLIDER_EXPAND_ANIM);
    animateGlass(motion.trackScaleX, 0.95, GLASS_SLIDER_EXPAND_ANIM);
    animateGlass(motion.trackScaleY, 0.975, GLASS_SLIDER_EXPAND_ANIM);
    animateGlass(motion.shadowOpacity, 1, GLASS_SLIDER_EXPAND_ANIM);
  }, [motion, refraction]);

  const collapse = useCallback(() => {
    if (!refraction) return;
    animateGlass(motion.halfW, geometryRef.current.thumbW / 2, GLASS_SLIDER_COLLAPSE_ANIM);
    animateGlass(motion.halfH, geometryRef.current.thumbH / 2, GLASS_SLIDER_COLLAPSE_ANIM);
    animateGlass(motion.radius, Math.min(geometryRef.current.thumbW, geometryRef.current.thumbH) / 2, GLASS_SLIDER_COLLAPSE_ANIM);
    animateGlass(motion.tintOpacity, restTintOpacityRef.current, GLASS_SLIDER_COLLAPSE_ANIM);
    animateGlass(motion.trackScaleX, 0.85, GLASS_SLIDER_COLLAPSE_ANIM);
    animateGlass(motion.trackScaleY, 0.525, GLASS_SLIDER_COLLAPSE_ANIM);
    animateGlass(motion.shadowOpacity, 0, GLASS_SLIDER_COLLAPSE_ANIM);
  }, [motion, refraction]);

  const beginInteraction = useCallback(() => {
    expand();
    if (!refraction) return;
    holdWobble(holdRef, kickWobbleRef);
  }, [expand, refraction]);

  const displayedLow = drag?.handle === "low" ? drag.value : value;
  const displayedHigh = drag?.handle === "high" ? drag.value : highValue ?? value;

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || !showKnob || event.button !== 0 || pointerIdRef.current !== null) return;
    event.preventDefault();
    syncGeometry();
    pointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    draggingRef.current = true;
    event.currentTarget.focus({ preventScroll: true });
    const rect = event.currentTarget.getBoundingClientRect();
    const raw = event.clientX - rect.left - geometryRef.current.thumbW / 2;
    const x = clamp(raw, 0, geometryRef.current.travel);
    const next = xToValue(x);
    const handle: SliderHandle = isRange
      && Math.abs(next - displayedHigh) < Math.abs(next - displayedLow) ? "high" : "low";
    activeHandleRef.current = handle;
    setActiveHandle(handle);
    motion.thumbX.set(x);
    setDrag({ handle, value: next });
    startClientXRef.current = event.clientX;
    startThumbXRef.current = x;
    beginInteraction();
    onInput(next, handle);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    let x = startThumbXRef.current + event.clientX - startClientXRef.current;
    const rubberLimit = geometryRef.current.trackW * RUBBER_OVERSHOOT;
    const rubberRange = rubberLimit * RUBBER_DAMPENING;
    if (x < 0) x = -rubberBand(-x, rubberLimit, rubberRange);
    else if (x > geometryRef.current.travel) {
      x = geometryRef.current.travel
        + rubberBand(x - geometryRef.current.travel, rubberLimit, rubberRange);
    }
    motion.thumbX.set(x);
    const next = xToValue(x);
    const handle = activeHandleRef.current;
    setDrag({ handle, value: next });
    onInput(next, handle);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    const handle = activeHandleRef.current;
    const settledX = clamp(motion.thumbX.get(), 0, geometryRef.current.travel);
    const next = xToValue(settledX);
    pointerIdRef.current = null;
    draggingRef.current = false;
    holdRef.current = 0;
    setDrag(undefined);
    animateGlass(motion.thumbX, settledX, GLASS_SLIDER_COLLAPSE_ANIM);
    collapse();
    onChange(next, handle);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>, handle: SliderHandle = "low") => {
    if (disabled || !showKnob) return;
    const increment = keyboardStep ?? (step > 0 ? step : (max - min) / 20);
    const lower = isRange && handle === "high" ? displayedLow : min;
    const upper = isRange && handle === "low" ? displayedHigh : max;
    let next = handle === "high" ? displayedHigh : displayedLow;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next += increment;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= increment;
    else if (event.key === "Home") next = lower;
    else if (event.key === "End") next = upper;
    else return;
    event.preventDefault();
    event.stopPropagation();
    next = clamp(next, lower, upper);
    activeHandleRef.current = handle;
    setActiveHandle(handle);
    motion.thumbX.set(valueToX(next));
    setKeyActive(true);
    beginInteraction();
    window.clearTimeout(keyTimer.current);
    keyTimer.current = window.setTimeout(() => {
      holdRef.current = 0;
      setKeyActive(false);
      collapse();
    }, 320);
    onChange(next, handle);
  };

  const span = max - min || 1;
  const asRatio = (raw: number): number => clamp((raw - min) / span, 0, 1);
  const lowRatio = asRatio(displayedLow);
  const highRatio = asRatio(displayedHigh);
  const travelCss = showKnob ? "(100% - var(--lg-effective-thumb-width))" : "100%";
  const centre = (ratio: number) => showKnob
    ? `calc(var(--lg-effective-thumb-width) / 2 + ${travelCss} * ${ratio})`
    : `${(ratio * 100).toFixed(3)}%`;
  const anchor = fillFrom === undefined ? undefined : clamp((fillFrom - min) / span, 0, 1);
  const from = anchor !== undefined ? Math.min(anchor, highRatio) : isRange ? lowRatio : 0;
  const to = anchor !== undefined ? Math.max(anchor, highRatio) : highRatio;
  const fillStyle: CSSProperties = clipFill
    ? {
        clipPath: `inset(0 calc(100% - ${centre(to)}) 0 ${isRange || anchor !== undefined ? centre(from) : "0px"} round 999px)`,
      }
    : anchor !== undefined || isRange
      ? { left: centre(from), width: `calc(${travelCss} * ${to - from})` }
      : { width: centre(to) };

  const handles: Array<{ key: SliderHandle; ratio: number }> = isRange
    ? [{ key: "low", ratio: lowRatio }, { key: "high", ratio: highRatio }]
    : [{ key: "low", ratio: highRatio }];
  const active = drag !== undefined || keyActive;

  const trackContents = (
    <div
      ref={trackRef}
      className="slider-track"
      role={isRange ? "group" : "slider"}
      tabIndex={isRange || disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={isRange ? undefined : min}
      aria-valuemax={isRange ? undefined : max}
      aria-valuenow={isRange ? undefined : displayedHigh}
      aria-valuetext={isRange ? undefined : valueText}
      aria-disabled={disabled}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onKeyDown={isRange ? undefined : onKeyDown}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="slider-bar">
        {showFill && <div className={`slider-fill${clipFill ? " clipped" : ""}`} style={fillStyle} />}
      </div>
      {trackContent}
      {anchor !== undefined && <div className="slider-anchor" style={{ left: centre(anchor) }} aria-hidden="true" />}
      {ticks > 0 && <div className="marks" aria-hidden="true">
        {Array.from({ length: ticks }, (_, index) => <span key={index} />)}
      </div>}
      {isRange && showKnob && ([
        { handle: "low" as const, ratio: lowRatio, current: displayedLow, lower: min, upper: displayedHigh },
        { handle: "high" as const, ratio: highRatio, current: displayedHigh, lower: displayedLow, upper: max },
      ]).map(({ handle, ratio, current, lower, upper }, index) => (
        <div
          key={`a11y-${handle}`}
          className="slider-range-handle"
          style={{ left: centre(ratio) }}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={rangeLabels?.[index] ?? `${label} ${handle}`}
          aria-valuemin={lower}
          aria-valuemax={upper}
          aria-valuenow={current}
          aria-disabled={disabled}
          onKeyDown={(event) => onKeyDown(event, handle)}
        />
      ))}
      {showKnob && <div ref={probeRef} className="knob-probe" aria-hidden="true" />}
      {showKnob && handles
        .filter(({ key }) => key !== activeHandle)
        .map(({ key, ratio }) => (
          <div
            key={key}
            className="slider-knob static"
            style={{ left: `calc(${travelCss} * ${ratio})` }}
            aria-hidden="true"
          >{thumbContent}</div>
        ))}
      {showKnob && (
        <GlassDiv
          x={motion.thumbX}
          className={`slider-knob moving${refraction ? "" : " static"}`}
          aria-hidden="true"
        >{thumbContent}</GlassDiv>
      )}
    </div>
  );

  if (!showKnob || !refraction) {
    return (
      <div ref={wrapperRef} className={`lg-react-slider${active ? " active" : ""}${disabled ? " disabled" : ""}`}>
        {trackContents}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={`lg-react-slider${active ? " active" : ""}${disabled ? " disabled" : ""}`}>
      <Glass
        className="slider-glass"
        optics={optics}
        center={{ x: motion.lensX, y: 0.5 }}
        size={[motion.lensW, motion.lensH]}
        radius={motion.radius}
        unstable_lens={{
          tintColor: "var(--lg-knob-solid)",
          tintOpacity: motion.tintOpacity,
          shadowOpacity: motion.shadowOpacity,
          restShadowOpacity: motion.restShadowOpacity,
        }}
        filterResolution={filterResolutionForQuality(quality)}
        behind={scheme === "dark" ? "#1f1f24" : "#ffffff"}
        style={{
          left: -geometry.pad,
          top: -geometry.pad,
          width: geometry.fullW,
          height: geometry.fullH,
        }}
        refract={refraction ? (
          <div
            className="slider-refraction-content"
            data-lg-refraction-source="copy"
            aria-hidden="true"
            style={{
              padding: geometry.pad,
              width: geometry.trackW,
              height: geometry.controlH,
            }}
          >
            <GlassDiv
              className="slider-refraction-bar"
              scaleX={motion.trackScaleX}
              scaleY={motion.trackScaleY}
              style={{
                width: geometry.trackW,
                height: geometry.refractionTrackH,
                borderRadius: geometry.refractionTrackH / 2,
              }}
            >
              {showFill && <div className={`slider-fill${clipFill ? " clipped" : ""}`} style={fillStyle} />}
            </GlassDiv>
          </div>
        ) : undefined}
      >
        <div className="slider-content" style={{ padding: geometry.pad }}>
          {trackContents}
        </div>
      </Glass>
    </div>
  );
}
