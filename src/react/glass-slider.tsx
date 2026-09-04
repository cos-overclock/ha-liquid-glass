import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { animateGlassValue, cubicBezier, glassValue, rubberBand, useLensWobble } from "@samasante/liquid-glass";
import { clamp } from "../utils";
import { LiquidGlassSurface } from "./glass-primitives";

/** Fraction of the track's usable travel the thumb can creep past an end while dragging. */
const RUBBER_OVERSHOOT = 0.05;
/** How hard that overshoot resists further movement — higher damps sooner. */
const RUBBER_DAMPENING = 30;
// Same motion signature as the reference glass slider: a bouncy expand into the
// lens, a slower ease-out dissolve back to the resting pill. The CSS strings drive
// the plain DOM transform/box-shadow transitions; the `animateGlassValue` configs
// drive the lens's own tint fade, which the library updates imperatively per frame.
const EXPAND_TRANSFORM = "0.27s cubic-bezier(0.34, 1.36, 0.42, 1)";
const COLLAPSE_TRANSFORM = "0.46s cubic-bezier(0.36, 0, 0.18, 1)";
const EXPAND_ANIM = { ease: cubicBezier(0.34, 1.36, 0.42, 1), duration: 0.27 };
const COLLAPSE_ANIM = { ease: cubicBezier(0.36, 0, 0.18, 1), duration: 0.46 };

/** Which handle a change came from. A single-value slider always reports "low". */
export type SliderHandle = "low" | "high";

export interface GlassSliderProps {
  value: number;
  /** Upper handle. With it the slider is a range and `value` is its lower end. */
  highValue?: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  refraction: boolean;
  glassVariant?: "regular" | "clear";
  showFill?: boolean;
  /**
   * Reveal the fill by clipping a full-width layer instead of sizing it. A gradient fill
   * then keeps its own scale, so the colour under the thumb always means the same value.
   */
  clipFill?: boolean;
  /** Drop the thumb for a bare progress bar, the way a seek bar reads at rest. */
  showKnob?: boolean;
  /** Fill from this value to the current one instead of from the start, for a tilt. */
  fillFrom?: number;
  /** Step marks drawn along the bar. 0 draws none. */
  ticks?: number;
  label: string;
  onInput(value: number, handle: SliderHandle): void;
  onChange(value: number, handle: SliderHandle): void;
}

export const glassSliderStyles = `
  .lg-react-slider {
    display: block;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .lg-react-slider.disabled { pointer-events: none; }
  /*
   * Apple's slider is a thin capsule with a round thumb riding over it, so the row
   * height here is only the touch target: the bar and the knob are centred in it.
   */
  .slider-track {
    --lg-effective-slider-height: var(--lg-slider-height, 44px);
    --lg-effective-bar-height: var(--lg-slider-bar-height, 12px);
    --lg-effective-knob-size: var(--lg-slider-knob-size, 32px);
    /* A card that paints its own fill also names its ends; the rest get the accent. */
    --lg-effective-fill-from: var(--fill-from, rgba(255, 255, 255, 0.9));
    --lg-effective-fill-to: var(--fill-to, var(--lg-accent));
    position: relative;
    width: 100%;
    height: var(--lg-effective-slider-height);
    border-radius: 999px;
    cursor: pointer;
  }
  .slider-track:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: 2px;
  }
  /* The bar carries no stroke or drop shadow of its own; it is a flat filled capsule. */
  .slider-bar {
    position: absolute;
    inset-inline: 0;
    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-bar-height)) / 2);
    height: var(--lg-effective-bar-height);
    overflow: hidden;
    border-radius: 999px;
    background: var(--lg-slider-track, var(--lg-slider-bar-bg));
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
  .lg-react-slider.active .slider-fill.clipped {
    transition: none;
  }
  /* Where a two-way fill starts from, e.g. the flat position of a tilt. */
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
  /* Step marks sit under the knob, spaced between the two positions it can reach. */
  .marks {
    position: absolute;
    inset-block: 0;
    inset-inline: calc(var(--lg-effective-knob-size) / 2 - 2px);
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
    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-knob-size)) / 2);
    width: var(--lg-effective-knob-size);
    height: var(--lg-effective-knob-size);
    border-radius: 50%;
    pointer-events: none;
    /* Coefficients match the reference glass slider's lensW/lensH squash-stretch,
       tuned for a spring-driven wobble that tops out around 0.34, not 0..1. */
    transform: scaleX(calc(1 - var(--lg-wobble, 0) * 0.2)) scaleY(calc(1 + var(--lg-wobble, 0) * 0.4));
    box-shadow: var(--lg-knob-shadow);
    transition:
      left 80ms linear,
      transform ${COLLAPSE_TRANSFORM},
      box-shadow ${COLLAPSE_TRANSFORM};
  }
  /*
   * Lifting the thumb while it is dragged is what sells it as a floating lens. The
   * pill-to-glass dissolve itself is the lens's own unstable_lens.tintOpacity
   * fading out (set in JS, alongside this box-shadow/scale crossfade).
   */
  .lg-react-slider.active .slider-knob.moving {
    box-shadow: var(--lg-knob-shadow-active);
    transform: scaleX(calc(1.06 - var(--lg-wobble, 0) * 0.2)) scaleY(calc(1.06 + var(--lg-wobble, 0) * 0.4));
    transition:
      left 80ms linear,
      transform ${EXPAND_TRANSFORM},
      box-shadow ${EXPAND_TRANSFORM};
  }
  /* A hidden probe purely for measuring the knob's own (possibly clamp()-responsive) size. */
  .knob-probe {
    position: absolute;
    visibility: hidden;
    width: var(--lg-effective-knob-size);
    height: var(--lg-effective-knob-size);
  }
  @media (prefers-reduced-motion: reduce) {
    .slider-knob { transition-duration: 0.01ms !important; }
  }
`;

/** Pointer and keyboard accessible slider with a @samasante/liquid-glass thumb. */
export function GlassSlider({
  value,
  highValue,
  min,
  max,
  step,
  disabled = false,
  refraction,
  glassVariant = "regular",
  showFill = true,
  clipFill = false,
  showKnob = true,
  fillFrom,
  ticks = 0,
  label,
  onInput,
  onChange,
}: GlassSliderProps) {
  const [drag, setDrag] = useState<{ handle: SliderHandle; value: number; overdragPx: number }>();
  /** Keeps the glass exposed for a beat after a key press, the way a drag does. */
  const [keyActive, setKeyActive] = useState(false);
  const keyTimer = useRef<number | undefined>(undefined);
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  // Velocity-driven squash/stretch spring, same primitive the reference glass
  // slider uses: `pos` only ever feeds the spring's own velocity sampling.
  // `tintOpacity` is the lens's own white veil — 1 is the resting solid pill, 0
  // dissolves it into clear glass, same mechanism as the reference component.
  const motion = useMemo(() => ({ pos: glassValue(0), stretch: glassValue(0), tintOpacity: glassValue(1) }), []);
  const holdRef = useRef(0);
  const kickWobbleRef = useRef<() => void>(() => {});
  useLensWobble(motion.pos, motion.stretch, holdRef, kickWobbleRef);
  const isRange = highValue !== undefined;
  const low = drag?.handle === "low" ? drag.value : value;
  const high = drag?.handle === "high" ? drag.value : highValue ?? value;
  const active = drag !== undefined || keyActive;
  const span = max - min || 1;
  const asRatio = (raw: number): number => clamp((raw - min) / span, 0, 1);
  const lowRatio = asRatio(low);
  const highRatio = asRatio(high);
  // The knob is the only thing that travels, so it sets the reachable span.
  const travel = showKnob ? "(100% - var(--lg-effective-knob-size))" : "100%";
  /** Distance from the bar's left edge to a handle's centre. */
  const centre = (ratio: number) =>
    showKnob ? `calc(var(--lg-effective-knob-size) / 2 + ${travel} * ${ratio})` : `${(ratio * 100).toFixed(3)}%`;

  useEffect(() => {
    const detach = motion.stretch.on("change", (next) => {
      const reducedMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (next === 0 || reducedMotion) trackRef.current?.style.removeProperty("--lg-wobble");
      else trackRef.current?.style.setProperty("--lg-wobble", next.toFixed(4));
    });
    return () => {
      detach();
      window.clearTimeout(keyTimer.current);
    };
  }, [motion.stretch]);

  /** Pointer position resolved against the track: the clamped value plus how far
   *  past an end the finger has dragged, for the rubber-band overshoot. */
  const resolvePointer = (clientX: number): { value: number; overdragPx: number } => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return { value, overdragPx: 0 };
    // The knob centre stops half a knob in from either end, so that is the dead margin.
    const pad = showKnob ? (knobRef.current?.offsetWidth || rect.height) / 2 : 0;
    const usable = Math.max(1, rect.width - pad * 2);
    const rawPx = clientX - rect.left - pad;
    const pointerRatio = clamp(rawPx / usable, 0, 1);
    let next = min + pointerRatio * (max - min);
    if (step > 0) next = Math.round(next / step) * step;
    const limit = usable * RUBBER_OVERSHOOT;
    const range = limit * RUBBER_DAMPENING;
    const overdragPx = rawPx < 0
      ? -rubberBand(-rawPx, limit, range)
      : rawPx > usable ? rubberBand(rawPx - usable, limit, range) : 0;
    return { value: clamp(next, min, max), overdragPx };
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const { value: next, overdragPx } = resolvePointer(event.clientX);
    // A range grabs whichever end the pointer landed nearer to, and keeps it for the drag.
    const handle: SliderHandle = isRange && Math.abs(next - high) < Math.abs(next - low) ? "high" : "low";
    motion.pos.set(event.clientX);
    holdRef.current = 0.175;
    kickWobbleRef.current();
    animateGlassValue(motion.tintOpacity, 0, EXPAND_ANIM);
    setDrag({ handle, value: next, overdragPx });
    onInput(next, handle);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    motion.pos.set(event.clientX);
    const { value: next, overdragPx } = resolvePointer(event.clientX);
    if (next !== drag.value) onInput(next, drag.handle);
    if (next !== drag.value || overdragPx !== drag.overdragPx) setDrag({ ...drag, value: next, overdragPx });
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    const { value: next } = resolvePointer(event.clientX);
    const handle = drag.handle;
    setDrag(undefined);
    holdRef.current = 0;
    animateGlassValue(motion.tintOpacity, 1, COLLAPSE_ANIM);
    onChange(next, handle);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // A range has two ends and one focus ring; the keys would be ambiguous.
    if (disabled || isRange) return;
    const increment = step > 0 ? step : (max - min) / 20;
    let next = value;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next += increment;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= increment;
    else if (event.key === "Home") next = min;
    else if (event.key === "End") next = max;
    else return;
    event.preventDefault();
    setKeyActive(true);
    animateGlassValue(motion.tintOpacity, 0, EXPAND_ANIM);
    window.clearTimeout(keyTimer.current);
    keyTimer.current = window.setTimeout(() => {
      setKeyActive(false);
      animateGlassValue(motion.tintOpacity, 1, COLLAPSE_ANIM);
    }, 320);
    onChange(clamp(next, min, max), "low");
  };

  const anchor = fillFrom === undefined ? undefined : clamp((fillFrom - min) / span, 0, 1);
  // Where the fill starts and stops: an anchor, the lower handle, or the bar's own start.
  const from = anchor !== undefined ? Math.min(anchor, highRatio) : isRange ? lowRatio : 0;
  const to = anchor !== undefined ? Math.max(anchor, highRatio) : highRatio;
  const fillStyle: CSSProperties = clipFill
    ? { clipPath: `inset(0 calc(100% - ${centre(to)}) 0 ${isRange || anchor !== undefined ? centre(from) : "0px"} round 999px)` }
    : anchor !== undefined || isRange
      ? {
          left: centre(from),
          width: `calc(${travel} * ${to - from})`,
        }
      : { width: centre(to) };
  const knobStyle = (ratio: number, overdragPx = 0): CSSProperties => ({
    display: "block",
    position: "absolute",
    // Glass sizes itself to its content when it has no refraction source, so the
    // knob has to state its width where the library cannot overrule it.
    width: "var(--lg-effective-knob-size)",
    // The dragged handle can creep a rubber-banded amount past either end.
    left: overdragPx ? `calc(${travel} * ${ratio} + ${overdragPx.toFixed(2)}px)` : `calc(${travel} * ${ratio})`,
  });
  // What the thumb has behind it: the card, crossed by the band of bar it covers.
  const band = (ratio: number) => (!showFill || (ratio <= 0 && !isRange)
    ? "linear-gradient(var(--lg-slider-bar-bg), var(--lg-slider-bar-bg))"
    : ratio >= 1
      ? "linear-gradient(90deg, var(--lg-effective-fill-from), var(--lg-effective-fill-to))"
      : "linear-gradient(90deg, var(--lg-effective-fill-from) 0%, var(--lg-effective-fill-to) 46%, var(--lg-slider-bar-bg) 54%)");
  const sourceBackground = (ratio: number) => `${band(ratio)} center / 100% 38% no-repeat,
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.28))`;

  const handles: Array<{ key: SliderHandle; ratio: number }> = isRange
    ? [{ key: "low", ratio: lowRatio }, { key: "high", ratio: highRatio }]
    : [{ key: "low", ratio: highRatio }];

  return (
    <div className={`lg-react-slider${active ? " active" : ""}${disabled ? " disabled" : ""}`}>
      <div
        ref={trackRef}
        className="slider-track"
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={isRange ? undefined : high}
        aria-valuetext={isRange ? `${low}–${high}` : undefined}
        aria-disabled={disabled}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={onKeyDown}
      >
        <div className="slider-bar">
          {showFill && <div className={`slider-fill${clipFill ? " clipped" : ""}`} style={fillStyle} />}
        </div>
        {anchor !== undefined && <div
          className="slider-anchor"
          style={{ left: centre(anchor) }}
          aria-hidden="true"
        />}
        {ticks > 0 && <div className="marks" aria-hidden="true">
          {Array.from({ length: ticks }, (_, index) => <span key={index} />)}
        </div>}
        {showKnob && <div ref={knobRef} className="knob-probe" aria-hidden="true" />}
        {showKnob && handles.map(({ key, ratio }) => {
          // Only one handle can be under the finger, so only that one lifts and clears.
          const moving = drag ? drag.handle === key : !isRange || key === "low";
          const overdragPx = drag?.handle === key ? drag.overdragPx : 0;
          return (
            <LiquidGlassSurface
              key={key}
              className={`slider-knob${moving ? " moving" : ""}`}
              refraction={refraction}
              variant={glassVariant}
              surface="slider"
              sourceBackground={sourceBackground(ratio)}
              style={knobStyle(ratio, overdragPx)}
              unstable_lens={{ tintColor: "var(--lg-knob-solid)", tintOpacity: moving ? motion.tintOpacity : 1 }}
            />
          );
        })}
      </div>
    </div>
  );
}
