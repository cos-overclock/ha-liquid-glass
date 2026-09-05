import {
  Glass,
  GlassDiv,
  animateGlassValue,
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

const EASE = cubicBezier(0.34, 1.36, 0.42, 1);
const SETTLE = cubicBezier(0.36, 0, 0.18, 1);
const THUMB_ANIM = { ease: EASE, duration: 0.52 };
const EXPAND_ANIM = { ease: EASE, duration: 0.26 };
const COLLAPSE_ANIM = { ease: SETTLE, duration: 0.46 };

const SWITCH_OPTICS: Partial<GlassOptics> = {
  mapSize: 256,
  depth: 0.2,
  dispersion: 0.65,
  strength: 0.19,
  clipToShape: true,
  softEdge: true,
  curvature: 0.3,
  splay: 0.6,
  bend: 0.1,
  bendWidth: 0.06,
  frost: 0,
  brightness: 0.05,
  specular: 1.2,
  sheenAngle: 45,
  sheenDark: false,
  glow: 0.05,
  glowSpread: 0.5,
  glowFalloff: 1.5,
  sheen: 0.45,
  sheenWidth: 2,
  sheenFalloff: 1.5,
  edgeShadow: "0 2px 6px rgba(0, 0, 0, 0.16)",
  edgeInsetShadow: "0 -4px 10px rgba(0, 0, 0, 0.12)",
  restEdgeShadow:
    "0 1px 3px rgba(0, 0, 0, 0.24), 0 4px 10px rgba(0, 0, 0, 0.14)",
};

const SWITCH_DARK: Partial<GlassOptics> = {
  brightness: 0.12,
  glow: 0.4,
  sheen: 0.5,
};

const SWITCH_LIGHT: Partial<GlassOptics> = {
  brightness: -0.02,
  sheenAngle: 30,
  specular: 1.5,
  glow: 0.4,
  glowSpread: 0.5,
  glowFalloff: 2,
  sheen: 1,
  sheenWidth: 1.5,
  sheenFalloff: 1,
};

const TRACK_BACKGROUND =
  "color-mix(in srgb, var(--glass-track), var(--glass-active) calc(var(--switch-progress, 0) * 100%))";

export const glassSwitchStyles = `
  .lg-glass-switch:has(> input:focus-visible) {
    outline: 2px solid var(--glass-active, var(--lg-accent));
    outline-offset: 3px;
  }
  .lg-glass-switch-static-puck {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 4px 10px rgba(0, 0, 0, 0.14);
    transform: scale(1);
    transition:
      transform 0.26s cubic-bezier(0.34, 1.36, 0.42, 1),
      background 0.26s ease,
      box-shadow 0.26s ease;
  }
  .lg-glass-switch-static-puck.expanded {
    background: rgba(255, 255, 255, 0.34);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.72),
      0 2px 6px rgba(0, 0, 0, 0.16);
    transform: scale(1.5);
  }
  @media (prefers-reduced-motion: reduce) {
    .lg-glass-switch-static-puck {
      transition-duration: 0.01ms;
    }
  }
`;

export interface GlassSwitchProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
  width?: number;
  height?: number;
  refraction?: boolean;
  scheme?: "light" | "dark";
  trackColor?: string;
  activeColor?: string;
  surface?: string;
}

/**
 * A controlled glass toggle based on the package's GlassSwitch example. Its
 * wide resting puck blooms into a lens on press and can be dragged past either
 * end with rubber-band resistance before settling with a soft overshoot.
 */
export function GlassSwitch({
  checked,
  onCheckedChange,
  disabled = false,
  ariaLabel,
  width: switchWidth = 74,
  height: switchHeight = 28,
  refraction = true,
  scheme = "light",
  trackColor,
  activeColor,
  surface,
}: GlassSwitchProps) {
  const isDark = scheme === "dark";
  const thumbWidth = Math.round(0.6 * switchWidth);
  const thumbHeight = switchHeight - 6;
  const travel = switchWidth - thumbWidth - 6;
  const rubberLimit = switchWidth * 0.15;
  const rubberRange = rubberLimit * 10;
  const rootRadius = switchHeight / 2;
  const restRadius = thumbHeight / 2;
  const restHalfWidth = thumbWidth / 2;
  const restHalfHeight = thumbHeight / 2;
  const refractionTrackHeight = Math.round(0.75 * switchHeight);
  const pad = Math.ceil(0.5 * Math.max(restHalfWidth, restHalfHeight) + rubberLimit) + 2;
  const fullWidth = switchWidth + 2 * pad;
  const fullHeight = switchHeight + 2 * pad;

  const travelRef = useRef(travel);
  const thumbWidthRef = useRef(thumbWidth);
  const fullWidthRef = useRef(fullWidth);
  const padRef = useRef(pad);
  const restHalfWidthRef = useRef(restHalfWidth);
  const restHalfHeightRef = useRef(restHalfHeight);
  const restRadiusRef = useRef(restRadius);

  useLayoutEffect(() => {
    travelRef.current = travel;
    thumbWidthRef.current = thumbWidth;
    fullWidthRef.current = fullWidth;
    padRef.current = pad;
    restHalfWidthRef.current = restHalfWidth;
    restHalfHeightRef.current = restHalfHeight;
    restRadiusRef.current = restRadius;
  });

  const motion = useMemo(() => {
    const thumbX = glassValue(checked ? travelRef.current : 0);
    const lensX = deriveGlass(
      [thumbX],
      () =>
        (padRef.current + 3 + thumbWidthRef.current / 2 + thumbX.get()) /
        fullWidthRef.current,
    );
    const halfWidth = glassValue(restHalfWidthRef.current);
    const halfHeight = glassValue(restHalfHeightRef.current);
    const radius = glassValue(restRadiusRef.current);
    const tintOpacity = glassValue(1);
    const trackScaleX = glassValue(0.85);
    const trackScaleY = glassValue(0.525);
    const shadowOpacity = glassValue(0);
    const restShadowOpacity = deriveGlass(
      [shadowOpacity],
      () => 1 - shadowOpacity.get(),
    );
    const stretch = glassValue(0);
    const lensWidth = deriveGlass(
      [halfWidth, stretch],
      () => halfWidth.get() * (1 - 0.2 * stretch.get()) * 2,
    );
    const lensHeight = deriveGlass(
      [halfHeight, stretch],
      () => halfHeight.get() * (1 + 0.4 * stretch.get()) * 2,
    );
    const edgeBias = deriveGlass(
      [tintOpacity],
      () => 0.5 * tintOpacity.get(),
    );

    return {
      thumbX,
      lensX,
      halfWidth,
      halfHeight,
      radius,
      tintOpacity,
      trackScaleX,
      trackScaleY,
      shadowOpacity,
      restShadowOpacity,
      stretch,
      lensWidth,
      lensHeight,
      edgeBias,
    };
    // Motion values deliberately live for the lifetime of this mounted switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const holdRef = useRef(0);
  const kickWobbleRef = useRef<() => void>(() => {});
  useLensWobble(motion.thumbX, motion.stretch, holdRef, kickWobbleRef);

  const [expanded, setExpanded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const expand = () => {
    setExpanded(true);
    animateGlassValue(motion.halfWidth, 1.5 * restHalfWidthRef.current, EXPAND_ANIM);
    animateGlassValue(motion.halfHeight, 1.5 * restHalfHeightRef.current, EXPAND_ANIM);
    animateGlassValue(motion.radius, 1.5 * restRadiusRef.current, EXPAND_ANIM);
    animateGlassValue(motion.tintOpacity, 0, EXPAND_ANIM);
    animateGlassValue(motion.trackScaleX, 0.95, EXPAND_ANIM);
    animateGlassValue(motion.trackScaleY, 0.975, EXPAND_ANIM);
    animateGlassValue(motion.shadowOpacity, 1, EXPAND_ANIM);
  };
  const collapse = () => {
    setExpanded(false);
    animateGlassValue(motion.halfWidth, restHalfWidthRef.current, COLLAPSE_ANIM);
    animateGlassValue(motion.halfHeight, restHalfHeightRef.current, COLLAPSE_ANIM);
    animateGlassValue(motion.radius, restRadiusRef.current, COLLAPSE_ANIM);
    animateGlassValue(motion.tintOpacity, 1, COLLAPSE_ANIM);
    animateGlassValue(motion.trackScaleX, 0.85, COLLAPSE_ANIM);
    animateGlassValue(motion.trackScaleY, 0.525, COLLAPSE_ANIM);
    animateGlassValue(motion.shadowOpacity, 0, COLLAPSE_ANIM);
  };

  const stateRef = useRef<"idle" | "pending" | "hold" | "tap">("idle");
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mountedRef = useRef(true);
  const suppressRef = useRef(false);
  const wrapperRef = useRef<HTMLLabelElement>(null);
  const hitAreaRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startClientXRef = useRef(0);
  const startThumbXRef = useRef(0);
  const movedRef = useRef(false);
  const thumbAnimationRef = useRef<GlassAnimation | null>(null);

  useEffect(
    () => () => {
      mountedRef.current = false;
      clearTimeout(holdTimeoutRef.current);
      clearTimeout(collapseTimeoutRef.current);
      if (pointerIdRef.current !== null && hitAreaRef.current) {
        try {
          hitAreaRef.current.releasePointerCapture(pointerIdRef.current);
        } catch {
          // The browser may already have released pointer capture.
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (dragging || stateRef.current === "tap") return;
    thumbAnimationRef.current = animateGlassValue(
      motion.thumbX,
      checked ? travel : 0,
      THUMB_ANIM,
    );
  }, [checked, dragging, motion.thumbX, travel]);

  useLayoutEffect(() => {
    const apply = (x: number) => {
      const currentTravel = travelRef.current;
      wrapperRef.current?.style.setProperty(
        "--switch-progress",
        String(currentTravel > 0 ? Math.max(0, Math.min(1, x / currentTravel)) : 0),
      );
    };
    apply(motion.thumbX.get());
    return motion.thumbX.on("change", apply);
  }, [motion.thumbX]);

  const optics = useMemo(
    () => ({
      ...SWITCH_OPTICS,
      ...(isDark ? SWITCH_DARK : SWITCH_LIGHT),
      sheenDark: !isDark,
    }),
    [isDark],
  );

  const handleChange = (next: boolean) => {
    if (suppressRef.current) return;
    onCheckedChange?.(next);
    if (stateRef.current !== "idle") return;

    stateRef.current = "tap";
    expand();
    clearTimeout(collapseTimeoutRef.current);
    collapseTimeoutRef.current = setTimeout(collapse, 290);
    thumbAnimationRef.current = animateGlassValue(
      motion.thumbX,
      next ? travel : 0,
      {
        ...THUMB_ANIM,
        onComplete: () => {
          if (mountedRef.current && stateRef.current === "tap") {
            stateRef.current = "idle";
          }
        },
      },
    );
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== null || disabled || event.button !== 0) return;
    pointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    startClientXRef.current = event.clientX;
    startThumbXRef.current = motion.thumbX.get();
    movedRef.current = false;
    setDragging(true);
    suppressRef.current = true;
    clearTimeout(holdTimeoutRef.current);
    clearTimeout(collapseTimeoutRef.current);
    stateRef.current = "pending";
    holdTimeoutRef.current = setTimeout(() => {
      if (stateRef.current !== "pending") return;
      stateRef.current = "hold";
      thumbAnimationRef.current?.stop();
      expand();
      holdRef.current = 0.175;
      kickWobbleRef.current();
    }, 170);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    const delta = event.clientX - startClientXRef.current;
    if (!movedRef.current) {
      if (Math.abs(delta) < 3) return;
      movedRef.current = true;
      thumbAnimationRef.current?.stop();
      startThumbXRef.current = motion.thumbX.get();
      startClientXRef.current = event.clientX;
      clearTimeout(holdTimeoutRef.current);
      holdRef.current = 0;
      if (stateRef.current !== "hold") {
        stateRef.current = "hold";
        expand();
      }
    }

    let next = startThumbXRef.current + event.clientX - startClientXRef.current;
    if (next < 0) {
      next = -rubberBand(-next, rubberLimit, rubberRange);
    } else if (next > travel) {
      next = travel + rubberBand(next - travel, rubberLimit, rubberRange);
    }
    motion.thumbX.set(next);
  };

  const releasePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    pointerIdRef.current = null;
    clearTimeout(holdTimeoutRef.current);
    setDragging(false);

    if (movedRef.current) {
      stateRef.current = "idle";
      collapse();
      const next = Math.max(0, Math.min(travel, motion.thumbX.get())) > travel / 2;
      thumbAnimationRef.current = animateGlassValue(
        motion.thumbX,
        next ? travel : 0,
        THUMB_ANIM,
      );
      if (next !== checked) onCheckedChange?.(next);
      requestAnimationFrame(() => {
        suppressRef.current = false;
      });
      return;
    }

    if (stateRef.current === "pending" || stateRef.current === "tap") {
      stateRef.current = "tap";
      suppressRef.current = false;
      expand();
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = setTimeout(collapse, 290);
      thumbAnimationRef.current = animateGlassValue(
        motion.thumbX,
        checked ? 0 : travel,
        {
          ...THUMB_ANIM,
          onComplete: () => {
            if (mountedRef.current && stateRef.current === "tap") {
              stateRef.current = "idle";
            }
          },
        },
      );
      return;
    }

    stateRef.current = "idle";
    holdRef.current = 0;
    collapse();
    thumbAnimationRef.current = animateGlassValue(
      motion.thumbX,
      checked ? travel : 0,
      THUMB_ANIM,
    );
    requestAnimationFrame(() => {
      suppressRef.current = false;
    });
  };

  const cancelPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== pointerIdRef.current) return;
    pointerIdRef.current = null;
    clearTimeout(holdTimeoutRef.current);
    setDragging(false);
    holdRef.current = 0;
    stateRef.current = "idle";
    collapse();
    thumbAnimationRef.current = animateGlassValue(
      motion.thumbX,
      checked ? travel : 0,
      THUMB_ANIM,
    );
    requestAnimationFrame(() => {
      suppressRef.current = false;
    });
  };

  const hitArea = (
    <GlassDiv
      ref={hitAreaRef}
      data-lg-glass-switch-thumb=""
      x={motion.thumbX}
      style={{
        position: "absolute",
        width: thumbWidth,
        height: thumbHeight,
        top: 3,
        left: 3,
        borderRadius: restRadius,
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        willChange: "transform",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={releasePointer}
      onPointerCancel={cancelPointer}
      onDragStart={(event) => event.preventDefault()}
    >
      {!refraction && (
        <div className={`lg-glass-switch-static-puck${expanded ? " expanded" : ""}`} />
      )}
    </GlassDiv>
  );

  const resolvedTrack = trackColor ?? (isDark ? "#2a2828" : "#e1dfdf");
  const resolvedActive = activeColor ?? "#0a84ff";
  const resolvedSurface = surface ?? (isDark ? "#1f1f24" : "#ffffff");
  const track = (
    <div
      aria-hidden="true"
      style={{
        width: switchWidth,
        height: switchHeight,
        borderRadius: rootRadius,
        background: TRACK_BACKGROUND,
        position: "relative",
        overflow: "visible",
      }}
    >
      {hitArea}
    </div>
  );

  return (
    <label
      ref={wrapperRef}
      className={`toggle lg-glass-switch${checked ? " on" : ""}`}
      style={
        {
          flexShrink: 0,
          width: switchWidth,
          height: switchHeight,
          overflow: "visible",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.4 : undefined,
          borderRadius: 999,
          display: "block",
          position: "relative",
          "--glass-track": resolvedTrack,
          "--glass-active": resolvedActive,
        } as React.CSSProperties
      }
    >
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => handleChange(event.target.checked)}
        onClick={(event) => {
          if (suppressRef.current) event.preventDefault();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          handleChange(!checked);
        }}
        disabled={disabled}
        aria-label={ariaLabel}
        style={{
          whiteSpace: "nowrap",
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          pointerEvents: "none",
          border: 0,
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          position: "absolute",
          overflow: "hidden",
        }}
      />

      {!refraction ? track : (
        <Glass
          optics={optics}
          center={{ x: motion.lensX, y: 0.5 }}
          size={[motion.lensWidth, motion.lensHeight]}
          radius={motion.radius}
          unstable_lens={{
            tintColor: "white",
            tintOpacity: motion.tintOpacity,
            shadowOpacity: motion.shadowOpacity,
            restShadowOpacity: motion.restShadowOpacity,
            edgeBias: motion.edgeBias,
          }}
          filterResolution={2}
          behind={resolvedSurface}
          style={{
            width: fullWidth,
            height: fullHeight,
            overflow: "visible",
            margin: -pad,
          }}
          refract={
            <div
              style={{
                padding: pad,
                height: switchHeight,
                display: "flex",
                alignItems: "center",
                boxSizing: "content-box",
              }}
            >
              <GlassDiv
                scaleX={motion.trackScaleX}
                scaleY={motion.trackScaleY}
                style={{
                  width: switchWidth,
                  height: refractionTrackHeight,
                  borderRadius: refractionTrackHeight / 2,
                  background: TRACK_BACKGROUND,
                }}
              />
            </div>
          }
        >
          <div style={{ padding: pad }}>{track}</div>
        </Glass>
      )}
    </label>
  );
}
