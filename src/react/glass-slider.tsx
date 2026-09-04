import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { clamp } from "../utils";
import { LiquidGlassSurface } from "./glass-primitives";

export interface GlassSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  refraction: boolean;
  glassVariant?: "regular" | "clear";
  showFill?: boolean;
  /** Drop the thumb for a bare progress bar, the way a seek bar reads at rest. */
  showKnob?: boolean;
  /** Fill from this value to the current one instead of from the start, for a tilt. */
  fillFrom?: number;
  /** Step marks drawn along the bar. 0 draws none. */
  ticks?: number;
  label: string;
  onInput(value: number): void;
  onChange(value: number): void;
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
  .slider-knob,
  .slider-knob-cap {
    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-knob-size)) / 2);
    width: var(--lg-effective-knob-size);
    height: var(--lg-effective-knob-size);
    border-radius: 50%;
    pointer-events: none;
    transform: scaleX(calc(1 - var(--lg-wobble, 0) * 0.1)) scaleY(calc(1 + var(--lg-wobble, 0) * 0.2));
    transition:
      left 80ms linear,
      transform 80ms ease;
  }
  /* The glass thumb carries the elevation for both states, so the cap stays flat. */
  .slider-knob {
    box-shadow: var(--lg-knob-shadow);
    transition:
      left 80ms linear,
      transform 80ms ease,
      box-shadow 200ms ease;
  }
  /*
   * A slider reads as opaque at rest and only becomes glass while it is being moved.
   * The glass knob stays mounted underneath so its filter is already warm; this cap
   * covers it and fades out the moment a drag or a key press starts.
   */
  .slider-knob-cap {
    background: var(--lg-knob-solid);
    box-shadow: inset 0 0 0 1px var(--lg-knob-solid-rim);
    transition:
      left 80ms linear,
      transform 80ms ease,
      opacity 220ms ease;
  }
  .lg-react-slider.active .slider-knob-cap {
    opacity: 0;
    transition-duration: 80ms, 80ms, 120ms;
  }
  /* Lifting the thumb while it is dragged is what sells it as a floating lens. */
  .lg-react-slider.active .slider-knob {
    box-shadow: var(--lg-knob-shadow-active);
  }
  .lg-react-slider.active .slider-knob,
  .lg-react-slider.active .slider-knob-cap {
    transform: scaleX(calc(1.06 - var(--lg-wobble, 0) * 0.1)) scaleY(calc(1.06 + var(--lg-wobble, 0) * 0.2));
  }
  @media (prefers-reduced-motion: reduce) {
    .slider-knob,
    .slider-knob-cap { transition-duration: 0.01ms !important; }
  }
`;

/** Pointer and keyboard accessible slider with a @samasante/liquid-glass thumb. */
export function GlassSlider({
  value,
  min,
  max,
  step,
  disabled = false,
  refraction,
  glassVariant = "regular",
  showFill = true,
  showKnob = true,
  fillFrom,
  ticks = 0,
  label,
  onInput,
  onChange,
}: GlassSliderProps) {
  const [dragValue, setDragValue] = useState<number>();
  /** Keeps the glass exposed for a beat after a key press, the way a drag does. */
  const [keyActive, setKeyActive] = useState(false);
  const keyTimer = useRef<number | undefined>(undefined);
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const wobble = useRef(0);
  const wobbleTarget = useRef(0);
  const wobbleFrame = useRef<number | undefined>(undefined);
  const currentValue = dragValue ?? value;
  const active = dragValue !== undefined || keyActive;
  const span = max - min || 1;
  const ratio = clamp((currentValue - min) / span, 0, 1);
  // The knob is the only thing that travels, so it sets the reachable span.
  const travel = showKnob ? "(100% - var(--lg-effective-knob-size))" : "100%";

  useEffect(() => () => {
    if (wobbleFrame.current !== undefined) cancelAnimationFrame(wobbleFrame.current);
    window.clearTimeout(keyTimer.current);
  }, []);

  const valueFromPointer = (clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return value;
    // The knob centre stops half a knob in from either end, so that is the dead margin.
    const pad = showKnob ? (knobRef.current?.offsetWidth || rect.height) / 2 : 0;
    const usable = Math.max(1, rect.width - pad * 2);
    const pointerRatio = clamp((clientX - rect.left - pad) / usable, 0, 1);
    let next = min + pointerRatio * (max - min);
    if (step > 0) next = Math.round(next / step) * step;
    return clamp(next, min, max);
  };

  const animateWobble = (target: number) => {
    const reducedMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    wobbleTarget.current = reducedMotion ? 0 : target;
    if (wobbleTarget.current === 0 && wobble.current === 0) return;
    if (wobbleFrame.current !== undefined) return;
    const tick = () => {
      wobble.current += (wobbleTarget.current - wobble.current) * 0.24;
      wobbleTarget.current *= dragValue !== undefined ? 0.9 : 0.72;
      trackRef.current?.style.setProperty("--lg-wobble", wobble.current.toFixed(4));
      if (Math.abs(wobbleTarget.current - wobble.current) > 0.004 || wobbleTarget.current > 0.004) {
        wobbleFrame.current = requestAnimationFrame(tick);
      } else {
        wobble.current = 0;
        trackRef.current?.style.removeProperty("--lg-wobble");
        wobbleFrame.current = undefined;
      }
    };
    wobbleFrame.current = requestAnimationFrame(tick);
  };

  const updateDrag = (next: number) => {
    setDragValue(next);
    onInput(next);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const next = valueFromPointer(event.clientX);
    lastPointerX.current = event.clientX;
    lastPointerTime.current = event.timeStamp;
    updateDrag(next);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragValue === undefined) return;
    const elapsed = Math.max(1, event.timeStamp - lastPointerTime.current);
    const speed = Math.abs(event.clientX - lastPointerX.current) / elapsed;
    lastPointerX.current = event.clientX;
    lastPointerTime.current = event.timeStamp;
    animateWobble(clamp(speed / 1.4, 0, 1));
    const next = valueFromPointer(event.clientX);
    if (next !== dragValue) updateDrag(next);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragValue === undefined) return;
    const next = valueFromPointer(event.clientX);
    setDragValue(undefined);
    animateWobble(0);
    onChange(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const increment = step > 0 ? step : (max - min) / 20;
    let next = value;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next += increment;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= increment;
    else if (event.key === "Home") next = min;
    else if (event.key === "End") next = max;
    else return;
    event.preventDefault();
    setKeyActive(true);
    window.clearTimeout(keyTimer.current);
    keyTimer.current = window.setTimeout(() => setKeyActive(false), 320);
    onChange(clamp(next, min, max));
  };

  const anchor = fillFrom === undefined ? undefined : clamp((fillFrom - min) / span, 0, 1);
  const fillStyle: CSSProperties = anchor !== undefined
    ? {
        left: `calc(var(--lg-effective-knob-size) / 2 + ${travel} * ${Math.min(anchor, ratio)})`,
        width: `calc(${travel} * ${Math.abs(ratio - anchor)})`,
      }
    : {
        width: showKnob
          ? `calc(var(--lg-effective-knob-size) / 2 + ${travel} * ${ratio})`
          : `${(ratio * 100).toFixed(3)}%`,
      };
  const knobStyle: CSSProperties = {
    display: "block",
    position: "absolute",
    // Glass sizes itself to its content when it has no refraction source, so the
    // knob has to state its width where the library cannot overrule it.
    width: "var(--lg-effective-knob-size)",
    left: `calc(${travel} * ${ratio})`,
  };
  // What the thumb has behind it: the card, crossed by the band of bar it covers.
  const band = !showFill || ratio <= 0
    ? "linear-gradient(var(--lg-slider-bar-bg), var(--lg-slider-bar-bg))"
    : ratio >= 1
      ? "linear-gradient(90deg, var(--lg-effective-fill-from), var(--lg-effective-fill-to))"
      : "linear-gradient(90deg, var(--lg-effective-fill-from) 0%, var(--lg-effective-fill-to) 46%, var(--lg-slider-bar-bg) 54%)";
  const sourceBackground = `${band} center / 100% 38% no-repeat,
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.28))`;

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
        aria-valuenow={currentValue}
        aria-disabled={disabled}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={onKeyDown}
      >
        <div className="slider-bar">
          {showFill && <div className="slider-fill" style={fillStyle} />}
        </div>
        {anchor !== undefined && <div
          className="slider-anchor"
          style={{ left: `calc(var(--lg-effective-knob-size) / 2 + ${travel} * ${anchor})` }}
          aria-hidden="true"
        />}
        {ticks > 0 && <div className="marks" aria-hidden="true">
          {Array.from({ length: ticks }, (_, index) => <span key={index} />)}
        </div>}
        {showKnob && <>
          <LiquidGlassSurface
            className="slider-knob"
            refraction={refraction}
            variant={glassVariant}
            surface="control"
            sourceBackground={sourceBackground}
            style={knobStyle}
          />
          <div ref={knobRef} className="slider-knob-cap" style={knobStyle} aria-hidden="true" />
        </>}
      </div>
    </div>
  );
}
