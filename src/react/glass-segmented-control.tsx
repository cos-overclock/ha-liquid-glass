import {
  Glass,
  GlassDiv,
  cubicBezier,
  deriveGlass,
  glassValue,
  rubberBand,
  useLensWobble,
  type GlassAnimation,
  type GlassOptics,
} from "@samasante/liquid-glass";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Icon } from "./glass-primitives";
import {
  filterResolutionForQuality,
  opticsForQuality,
  useRefractionQuality,
} from "./refraction-quality";
import { animateGlass, holdWobble } from "./reduced-motion";

const MOVE_ANIM = {
  ease: cubicBezier(0.34, 1.36, 0.42, 1),
  duration: 0.48,
};
const EXPAND_ANIM = {
  ease: cubicBezier(0.34, 1.36, 0.42, 1),
  duration: 0.27,
};
const COLLAPSE_ANIM = {
  ease: cubicBezier(0.36, 0, 0.18, 1),
  duration: 0.46,
};

const SEGMENT_OPTICS: Partial<GlassOptics> = {
  mapSize: 256,
  depth: 0.2,
  dispersion: 0.28,
  scaleX: 0.065,
  scaleY: 0.09,
  clipToShape: true,
  softEdge: true,
  curvature: 0.48,
  splay: 0.55,
  bend: 0.1,
  bendWidth: 0.055,
  frost: 0,
  brightness: 0.01,
  specular: 1.45,
  sheenAngle: 35,
  sheenDark: false,
  glow: 0.32,
  glowSpread: 0.5,
  glowFalloff: 1.7,
  sheen: 0.75,
  sheenWidth: 1.5,
  sheenFalloff: 1.2,
  edgeShadow: "0 5px 13px rgba(0, 0, 0, 0.18)",
  edgeInsetShadow: "0 -3px 8px rgba(0, 0, 0, 0.1)",
  restEdgeShadow: "0 2px 6px rgba(0, 0, 0, 0.14)",
};

const SEGMENT_DARK: Partial<GlassOptics> = {
  scaleX: 0.085,
  scaleY: 0.115,
  brightness: 0.07,
  glow: 0.38,
  sheen: 0.52,
  restEdgeShadow: "0 2px 7px rgba(0, 0, 0, 0.42)",
};

const SEGMENT_LIGHT: Partial<GlassOptics> = {
  brightness: -0.02,
  specular: 1.55,
  glowFalloff: 2,
  sheen: 0.95,
};

const CONTROL_PADDING = 3;
const CONTROL_GAP = 2;

export const glassSegmentedControlStyles = `
  .lg-glass-segmented {
    position: relative;
    display: block;
    width: 100%;
    height: 50px;
    padding: 0;
    border: 0;
    border-radius: 20px;
    background: var(--glass-segment-track);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    isolation: isolate;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .lg-glass-segmented.compact {
    height: 40px;
  }
  @supports (container-type: inline-size) {
    .lg-glass-segmented:not(.compact) {
      height: clamp(50px, calc(14cqi + 6px), 60px);
    }
  }
  .lg-segment-refraction-source {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(120% 160% at 12% -30%, rgba(255, 255, 255, 0.2), transparent 55%),
      var(--glass-segment-track);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .lg-glass-segmented > button > span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lg-segment-lens {
    position: absolute !important;
    z-index: 1;
    overflow: visible !important;
    pointer-events: none !important;
  }
  .lg-segment-static-pill {
    position: absolute !important;
    z-index: 1;
    border-radius: 999px;
    background: var(--glass-segment-pill);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
    pointer-events: none;
  }
  .lg-segment-static-pill::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.34);
    transform: scale(var(--lg-segment-press-scale, 1));
    transition: transform 0.27s cubic-bezier(0.34, 1.36, 0.42, 1);
  }
  .lg-glass-segmented > button {
    position: absolute;
    z-index: 2;
    top: ${CONTROL_PADDING}px;
    bottom: ${CONTROL_PADDING}px;
    left: calc(${CONTROL_PADDING}px + var(--item-i) * (var(--seg-w) + ${CONTROL_GAP}px));
    width: var(--seg-w);
    min-width: 0;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 17px;
    background: transparent;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: var(--lg-text-secondary);
    font: inherit;
    font-size: var(--lg-tick);
    font-weight: 500;
    cursor: pointer;
  }
  .lg-glass-segmented > button::after {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 15px;
    pointer-events: none;
  }
  .lg-glass-segmented > button:focus-visible {
    outline: none;
  }
  .lg-glass-segmented > button.selected {
    background: transparent;
    box-shadow: none;
    color: var(--lg-text-primary);
    font-weight: 650;
  }
  .lg-glass-segmented > button.selected lg-icon {
    color: var(--selected-color);
  }
  .lg-glass-segmented > button lg-icon {
    --mdc-icon-size: clamp(15px, 4.7cqi, 18px);
  }
  .lg-glass-segmented > button:focus-visible::after {
    box-shadow: inset 0 0 0 2px var(--selected-color);
  }
  .lg-glass-segmented.compact > button {
    gap: 0;
  }
  .lg-glass-segmented.compact > button lg-icon {
    --mdc-icon-size: 17px;
  }
  @media (prefers-reduced-motion: reduce) {
    .lg-segment-static-pill::after {
      transition-duration: 0.01ms;
    }
  }
`;

export interface GlassSegmentItem {
  value: string;
  label: string;
  icon: string;
}

interface GlassSegmentedControlProps {
  items: GlassSegmentItem[];
  value: string;
  onValueChange: (value: string) => void;
  refraction: boolean;
  scheme: "light" | "dark";
  selectedColor: string;
  compact?: boolean;
  className?: string;
  ariaLabel?: string;
}

function SegmentContent({ item, compact }: { item: GlassSegmentItem; compact: boolean }) {
  return <>
    <Icon icon={item.icon} />
    {!compact && <span>{item.label}</span>}
  </>;
}

/** Apple-style segmented control whose selected platter becomes a moving lens. */
export function GlassSegmentedControl({
  items,
  value,
  onValueChange,
  refraction,
  scheme,
  selectedColor,
  compact = false,
  className,
  ariaLabel,
}: GlassSegmentedControlProps) {
  const quality = useRefractionQuality();
  const selectedItemIndex = items.findIndex((item) => item.value === value);
  const hasSelectedValue = selectedItemIndex >= 0;
  const selectedIndex = Math.max(selectedItemIndex, 0);
  const [visualIndex, setVisualIndex] = useState(selectedIndex);
  const [selectionVisible, setSelectionVisible] = useState(hasSelectedValue);
  const [dimensions, setDimensions] = useState({ width: 300, height: compact ? 40 : 50 });
  const [pressed, setPressed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerIdRef = useRef<number | null>(null);
  const startClientXRef = useRef(0);
  const startPositionRef = useRef(0);
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const activeAnimationRef = useRef<GlassAnimation | null>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const interactingRef = useRef(false);

  const count = Math.max(items.length, 1);
  const segmentWidth = Math.max(
    1,
    (dimensions.width - CONTROL_PADDING * 2 - CONTROL_GAP * (count - 1)) / count,
  );
  const stepWidth = segmentWidth + CONTROL_GAP;
  const pillHeight = Math.max(1, dimensions.height - CONTROL_PADDING * 2);
  const rubberLimit = dimensions.width * 0.045;
  const rubberRange = rubberLimit * 24;
  const lensPad = Math.ceil(Math.max(segmentWidth / 2, pillHeight / 2) * 0.3 + rubberLimit) + 4;
  const lensSurfaceWidth = dimensions.width + lensPad * 2;
  const lensSurfaceHeight = dimensions.height + lensPad * 2;

  const geometryRef = useRef({
    segmentWidth,
    stepWidth,
    pillHeight,
    lensPad,
    lensSurfaceWidth,
  });
  const restTintRef = useRef(scheme === "dark" ? 0.18 : 0.38);
  useLayoutEffect(() => {
    geometryRef.current = {
      segmentWidth,
      stepWidth,
      pillHeight,
      lensPad,
      lensSurfaceWidth,
    };
    restTintRef.current = scheme === "dark" ? 0.18 : 0.38;
  });

  const motion = useMemo(() => {
    const position = glassValue(selectedIndex * geometryRef.current.stepWidth);
    const halfWidth = glassValue(geometryRef.current.segmentWidth / 2);
    const halfHeight = glassValue(geometryRef.current.pillHeight / 2);
    const radius = glassValue(geometryRef.current.pillHeight / 2);
    const tintOpacity = glassValue(restTintRef.current);
    const shadowOpacity = glassValue(0);
    const restShadowOpacity = deriveGlass(
      [shadowOpacity],
      () => 1 - shadowOpacity.get(),
    );
    const stretch = glassValue(0);
    const lensWidth = deriveGlass(
      [halfWidth, stretch],
      () => halfWidth.get() * (1 - 0.16 * stretch.get()) * 2,
    );
    const lensHeight = deriveGlass(
      [halfHeight, stretch],
      () => halfHeight.get() * (1 + 0.34 * stretch.get()) * 2,
    );
    const lensX = deriveGlass(
      [position, halfWidth],
      () =>
        (
          geometryRef.current.lensPad +
          CONTROL_PADDING +
          geometryRef.current.segmentWidth / 2 +
          position.get()
        ) / geometryRef.current.lensSurfaceWidth,
    );
    return {
      position,
      halfWidth,
      halfHeight,
      radius,
      tintOpacity,
      shadowOpacity,
      restShadowOpacity,
      stretch,
      lensWidth,
      lensHeight,
      lensX,
    };
    // Signals are stable for the lifetime of the mounted control.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const holdRef = useRef(0);
  const kickWobbleRef = useRef<() => void>(() => {});
  useLensWobble(motion.position, motion.stretch, holdRef, kickWobbleRef);
  const previousSelectedIndexRef = useRef(selectedIndex);
  const previousStepWidthRef = useRef(stepWidth);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const rect = root.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions((current) =>
          current.width === rect.width && current.height === rect.height
            ? current
            : { width: rect.width, height: rect.height },
        );
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (interactingRef.current) return;
    const selectionChanged = previousSelectedIndexRef.current !== selectedIndex;
    const geometryChanged = previousStepWidthRef.current !== stepWidth;
    previousSelectedIndexRef.current = selectedIndex;
    previousStepWidthRef.current = stepWidth;
    setVisualIndex(selectedIndex);
    setSelectionVisible(hasSelectedValue);
    activeAnimationRef.current?.stop();
    const nextPosition = selectedIndex * stepWidth;
    if (geometryChanged && !selectionChanged) {
      // Resizing is geometry correction, not a user transition. Snapping here
      // prevents the lens appearing offset while the first measurement settles.
      motion.position.set(nextPosition);
    } else {
      activeAnimationRef.current = animateGlass(
        motion.position,
        nextPosition,
        MOVE_ANIM,
      );
    }
  }, [hasSelectedValue, motion.position, selectedIndex, stepWidth]);

  useEffect(() => {
    if (interactingRef.current) return;
    motion.halfWidth.set(segmentWidth / 2);
    motion.halfHeight.set(pillHeight / 2);
    motion.radius.set(pillHeight / 2);
  }, [motion, pillHeight, segmentWidth]);

  useEffect(
    () => () => {
      activeAnimationRef.current?.stop();
      clearTimeout(collapseTimeoutRef.current);
      if (pointerIdRef.current !== null && rootRef.current) {
        try {
          rootRef.current.releasePointerCapture(pointerIdRef.current);
        } catch {
          // Pointer capture may already have been released.
        }
      }
    },
    [],
  );

  const optics = useMemo(
    () => opticsForQuality({
      ...SEGMENT_OPTICS,
      ...(scheme === "dark" ? SEGMENT_DARK : SEGMENT_LIGHT),
      sheenDark: scheme !== "dark",
    }, quality),
    [quality, scheme],
  );

  const expand = () => {
    clearTimeout(collapseTimeoutRef.current);
    setPressed(true);
    const geometry = geometryRef.current;
    animateGlass(motion.halfWidth, geometry.segmentWidth * 0.62, EXPAND_ANIM);
    animateGlass(motion.halfHeight, geometry.pillHeight * 0.59, EXPAND_ANIM);
    animateGlass(motion.radius, geometry.pillHeight * 0.59, EXPAND_ANIM);
    animateGlass(motion.tintOpacity, 0.08, EXPAND_ANIM);
    animateGlass(motion.shadowOpacity, 1, EXPAND_ANIM);
    holdWobble(holdRef, kickWobbleRef);
  };

  const collapse = () => {
    setPressed(false);
    holdRef.current = 0;
    const geometry = geometryRef.current;
    animateGlass(motion.halfWidth, geometry.segmentWidth / 2, COLLAPSE_ANIM);
    animateGlass(motion.halfHeight, geometry.pillHeight / 2, COLLAPSE_ANIM);
    animateGlass(motion.radius, geometry.pillHeight / 2, COLLAPSE_ANIM);
    animateGlass(motion.tintOpacity, restTintRef.current, COLLAPSE_ANIM);
    animateGlass(motion.shadowOpacity, 0, COLLAPSE_ANIM);
  };

  const settleOn = (index: number, collapseImmediately: boolean) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, index));
    const next = items[nextIndex];
    if (!next) return;
    setVisualIndex(nextIndex);
    setSelectionVisible(true);
    activeAnimationRef.current?.stop();
    activeAnimationRef.current = animateGlass(
      motion.position,
      nextIndex * geometryRef.current.stepWidth,
      MOVE_ANIM,
    );
    if (collapseImmediately) {
      collapse();
    } else {
      collapseTimeoutRef.current = setTimeout(collapse, 260);
    }
    if (next.value !== value) onValueChange(next.value);
  };

  const indexAtClientX = (clientX: number) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return visualIndex;
    const local = Math.max(0, Math.min(rect.width - 0.001, clientX - rect.left));
    return Math.max(0, Math.min(items.length - 1, Math.floor((local / rect.width) * items.length)));
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || pointerIdRef.current !== null || items.length < 2) return;
    pointerIdRef.current = event.pointerId;
    interactingRef.current = true;
    movedRef.current = false;
    suppressClickRef.current = false;
    startClientXRef.current = event.clientX;
    startPositionRef.current = motion.position.get();
    activeAnimationRef.current?.stop();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is unavailable in a few test/embedded environments.
    }
    expand();
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    const delta = event.clientX - startClientXRef.current;
    if (!movedRef.current && Math.abs(delta) < 3) return;
    movedRef.current = true;
    let next = startPositionRef.current + delta;
    const maxPosition = Math.max(0, (items.length - 1) * geometryRef.current.stepWidth);
    if (next < 0) {
      next = -rubberBand(-next, rubberLimit, rubberRange);
    } else if (next > maxPosition) {
      next = maxPosition + rubberBand(next - maxPosition, rubberLimit, rubberRange);
    }
    motion.position.set(next);
    const nearest = Math.max(
      0,
      Math.min(items.length - 1, Math.round(next / geometryRef.current.stepWidth)),
    );
    if (nearest !== visualIndex) setVisualIndex(nearest);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    pointerIdRef.current = null;
    interactingRef.current = false;
    suppressClickRef.current = true;
    requestAnimationFrame(() => {
      suppressClickRef.current = false;
    });
    if (movedRef.current) {
      const nearest = Math.round(motion.position.get() / geometryRef.current.stepWidth);
      settleOn(nearest, true);
    } else {
      const target = indexAtClientX(event.clientX);
      if (target === visualIndex) {
        collapse();
      } else {
        settleOn(target, false);
      }
    }
  };

  const onPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    pointerIdRef.current = null;
    interactingRef.current = false;
    suppressClickRef.current = true;
    requestAnimationFrame(() => {
      suppressClickRef.current = false;
    });
    setVisualIndex(selectedIndex);
    setSelectionVisible(hasSelectedValue);
    activeAnimationRef.current = animateGlass(
      motion.position,
      selectedIndex * geometryRef.current.stepWidth,
      MOVE_ANIM,
    );
    collapse();
  };

  const chooseFromKeyboard = (index: number) => {
    expand();
    settleOn(index, false);
    buttonRefs.current[index]?.focus();
  };

  const classNames = [
    className,
    "lg-glass-segmented",
    compact ? "compact" : "",
    refraction ? "" : "static",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={rootRef}
      className={classNames}
      role="group"
      aria-label={ariaLabel}
      data-lg-segment-pressed={pressed ? "" : undefined}
      style={
        {
          "--n": String(count),
          "--seg-w": `calc((100% - ${CONTROL_PADDING * 2}px - ${(count - 1) * CONTROL_GAP}px) / ${count})`,
          "--selected-color": selectedColor,
          "--glass-segment-track": scheme === "dark" ? "#2a2828" : "#e1dfdf",
          "--glass-segment-pill": scheme === "dark" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.62)",
          "--lg-segment-press-scale": pressed ? "1.18" : "1",
        } as React.CSSProperties
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onContextMenu={(event) => event.preventDefault()}
    >
      {refraction ? (
        <Glass
          className="lg-segment-lens"
          optics={optics}
          center={{ x: motion.lensX, y: 0.5 }}
          size={[motion.lensWidth, motion.lensHeight]}
          radius={motion.radius}
          unstable_lens={{
            tintColor: "white",
            tintOpacity: motion.tintOpacity,
            shadowOpacity: motion.shadowOpacity,
            restShadowOpacity: motion.restShadowOpacity,
          }}
          filterResolution={filterResolutionForQuality(quality)}
          behind={scheme === "dark" ? "#1f1f24" : "#ffffff"}
          style={{
            left: -lensPad,
            top: -lensPad,
            width: lensSurfaceWidth,
            height: lensSurfaceHeight,
            opacity: selectionVisible ? 1 : 0,
          }}
          refract={
            <div style={{ padding: lensPad, width: dimensions.width, height: dimensions.height }}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <div className="lg-segment-refraction-source" aria-hidden="true" />
              </div>
            </div>
          }
        />
      ) : (
        <GlassDiv
          className="lg-segment-static-pill"
          x={motion.position}
          aria-hidden="true"
          style={{
            left: CONTROL_PADDING,
            top: CONTROL_PADDING,
            width: segmentWidth,
            height: pillHeight,
            opacity: selectionVisible ? 1 : 0,
          }}
        />
      )}

      {items.map((item, index) => (
        <button
          ref={(node) => { buttonRefs.current[index] = node; }}
          key={item.value}
          type="button"
          className={selectionVisible && index === visualIndex ? "selected" : undefined}
          style={{ "--item-i": String(index) } as React.CSSProperties}
          title={item.label}
          aria-label={item.label}
          aria-pressed={selectionVisible && index === visualIndex}
          onClick={() => {
            if (suppressClickRef.current) {
              suppressClickRef.current = false;
              return;
            }
            chooseFromKeyboard(index);
          }}
          onKeyDown={(event) => {
            let next = index;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(items.length - 1, index + 1);
            else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(0, index - 1);
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = items.length - 1;
            else return;
            event.preventDefault();
            chooseFromKeyboard(next);
          }}
        >
          <SegmentContent item={item} compact={compact} />
        </button>
      ))}
    </div>
  );
}
