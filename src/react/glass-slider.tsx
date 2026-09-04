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
  .slider-track {
    --lg-effective-slider-height: var(--lg-slider-height, 40px);
    position: relative;
    width: 100%;
    height: var(--lg-effective-slider-height);
    overflow: hidden;
    border-radius: 999px;
    background: var(--lg-slider-track, var(--lg-track-bg));
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.14),
      inset 0 0 0 1px var(--lg-glass-stroke);
    cursor: pointer;
  }
  .slider-track:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: 2px;
  }
  .slider-fill {
    position: absolute;
    inset-block: 0;
    left: 0;
    background: var(--lg-slider-fill, linear-gradient(90deg, #fff8ea, #ffe2a6));
    pointer-events: none;
  }
  .slider-knob {
    top: 0;
    width: var(--lg-effective-slider-height);
    height: var(--lg-effective-slider-height);
    border-radius: 50%;
    pointer-events: none;
    transform: scaleX(calc(1 - var(--lg-wobble, 0) * 0.1)) scaleY(calc(1 + var(--lg-wobble, 0) * 0.2));
    transition:
      left 80ms linear,
      transform 80ms ease;
  }
  .lg-react-slider.dragging .slider-knob {
    transform: scaleX(calc(1.06 - var(--lg-wobble, 0) * 0.1)) scaleY(calc(1.06 + var(--lg-wobble, 0) * 0.2));
  }
  @media (prefers-reduced-motion: reduce) {
    .slider-knob { transition-duration: 0.01ms !important; }
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
  label,
  onInput,
  onChange,
}: GlassSliderProps) {
  const [dragValue, setDragValue] = useState<number>();
  const trackRef = useRef<HTMLDivElement>(null);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const wobble = useRef(0);
  const wobbleTarget = useRef(0);
  const wobbleFrame = useRef<number | undefined>(undefined);
  const currentValue = dragValue ?? value;
  const span = max - min || 1;
  const ratio = clamp((currentValue - min) / span, 0, 1);
  const travel = "(100% - var(--lg-effective-slider-height))";

  useEffect(() => () => {
    if (wobbleFrame.current !== undefined) cancelAnimationFrame(wobbleFrame.current);
  }, []);

  const valueFromPointer = (clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return value;
    const pad = rect.height / 2;
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
    onChange(clamp(next, min, max));
  };

  const fillStyle: CSSProperties = {
    width: `calc(var(--lg-effective-slider-height) / 2 + ${travel} * ${ratio})`,
  };
  const knobStyle: CSSProperties = {
    display: "block",
    position: "absolute",
    left: `calc(${travel} * ${ratio})`,
  };
  const sourceBackground = !showFill || ratio <= 0
    ? "var(--lg-slider-track, var(--lg-track-bg))"
    : ratio >= 1
      ? "linear-gradient(90deg, var(--fill-from), var(--fill-to))"
      : "linear-gradient(90deg, var(--fill-from) 0%, var(--fill-to) 48%, rgba(var(--lg-glass-tint), 0.18) 52%, var(--lg-slider-track, var(--lg-track-bg)) 100%)";

  return (
    <div className={`lg-react-slider${dragValue !== undefined ? " dragging" : ""}${disabled ? " disabled" : ""}`}>
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
        {showFill && <div className="slider-fill" style={fillStyle} />}
        <LiquidGlassSurface
          className="slider-knob"
          refraction={refraction}
          variant={glassVariant}
          surface="control"
          sourceBackground={sourceBackground}
          style={knobStyle}
        />
      </div>
    </div>
  );
}
