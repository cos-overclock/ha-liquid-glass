import type { CSSProperties } from "react";
import { Icon, LiquidGlassSurface } from "./glass-primitives";

/** Colours for a tinted icon well. Leave it out and the well renders idle. */
export interface WellStyle {
  from: string;
  to: string;
  glow: string;
}

/** Colours for a status badge. Leave it out and the badge renders neutral. */
export interface BadgeStyle {
  color: string;
  bg: string;
  stroke: string;
  glow?: string;
}

/** The round icon at the head of a card. Tinted while active, flat while idle. */
export function IconWell({
  icon,
  style,
  onClick,
}: {
  icon: string;
  style?: WellStyle;
  onClick?: () => void;
}) {
  return (
    <div
      className={`icon-well${style ? "" : " idle"}`}
      style={style ? {
        "--well-from": style.from,
        "--well-to": style.to,
        "--well-glow": style.glow,
      } as CSSProperties : undefined}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <Icon icon={icon} />
    </div>
  );
}

/** Entity name over its state line. */
export function CardTitle({
  name,
  state,
  onClick,
}: {
  name: string;
  state: string;
  onClick?: () => void;
}) {
  return (
    <div className="title" onClick={onClick}>
      <div className="name">{name}</div>
      <div className="state">{state}</div>
    </div>
  );
}

/** Pill with a leading dot, used for the state at the end of a row. */
export function Badge({ label, style }: { label: string; style?: BadgeStyle }) {
  return (
    <div
      className="badge"
      style={style ? {
        "--badge-color": style.color,
        "--badge-bg": style.bg,
        "--badge-stroke": style.stroke,
        "--badge-glow": style.glow ?? style.color,
      } as CSSProperties : undefined}
    >
      <span className="dot" />
      <span>{label}</span>
    </div>
  );
}

/**
 * What a card shows when its entity is missing or unavailable: the same header as
 * usual, with an idle well and the state line explaining why there is nothing else.
 */
export function UnavailableCard({
  refraction,
  variant,
  icon = "mdi:help-circle-outline",
  name,
  label,
  onOpen,
}: {
  refraction: boolean;
  variant?: "regular" | "clear";
  icon?: string;
  name: string;
  label: string;
  onOpen?: () => void;
}) {
  return (
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={variant}
      style={{ display: "flex", position: "relative" }}
    >
      <div className="header">
        <IconWell icon={icon} onClick={onOpen} />
        <CardTitle name={name} state={label} onClick={onOpen} />
      </div>
    </LiquidGlassSurface>
  );
}
