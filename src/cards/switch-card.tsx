import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { loadHaFormComponents } from "../editor/load";
import { createTranslator, relativeTime } from "../i18n";
import { CardTitle, IconWell, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineReactCard, type ReactCardProps } from "../react/define-react-card";
import { glassSurfaceStyles, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { formatNumber, friendlyName, isUnavailable, moreInfo, pickEntity } from "../utils";
import "../components/lg-icon";

export interface SwitchCardConfig extends BaseCardConfig {
  /** Optional power sensor shown in the state line while on. */
  power_entity?: string;
}

export const SWITCH_DOMAINS = [
  "switch", "input_boolean", "fan", "light", "automation", "humidifier", "siren", "remote",
];

/** How long the card must be held before it opens more-info instead of toggling. */
const HOLD_MS = 500;
/** Movement past this many pixels means the gesture was a scroll, not a tap. */
const HOLD_SLOP = 10;

const styles = `${tokens.cssText}${reactCardStyles}${glassSurfaceStyles}
  .card {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }
  .card:focus-visible {
    outline: 2px solid var(--lg-switch-accent);
    outline-offset: 2px;
  }
  /* The whole card is the control, so the title must not look separately clickable. */
  .title {
    cursor: inherit;
  }
`;

function defaultIcon(entityId: string | undefined): string {
  switch (entityId?.split(".")[0]) {
    case "fan": return "mdi:fan";
    case "light": return "mdi:lightbulb";
    case "automation": return "mdi:robot";
    default: return "mdi:power-plug";
  }
}

/** Single row: a tap anywhere toggles the entity, a hold opens more-info. */
function SwitchCard({ config, hass, host }: ReactCardProps<SwitchCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = config.name ?? friendlyName(entity, config.entity ?? "");
  const holdTimer = useRef<number | undefined>(undefined);
  const holdOrigin = useRef<{ x: number; y: number } | undefined>(undefined);
  const heldOpen = useRef(false);

  const cancelHold = () => {
    window.clearTimeout(holdTimer.current);
    holdTimer.current = undefined;
    holdOrigin.current = undefined;
  };

  useEffect(() => () => window.clearTimeout(holdTimer.current), []);

  if (!entity || isUnavailable(entity)) {
    return <>
      <style>{styles}</style>
      <UnavailableCard
        refraction={refraction}
        variant={config.glass_variant}
        icon={config.icon}
        name={name}
        label={t("unavailable")}
        onOpen={() => moreInfo(host, config.entity)}
      />
    </>;
  }

  const on = entity.state === "on";

  const toggle = () => {
    if (!config.entity || !hass) return;
    const domain = config.entity.split(".")[0];
    const target = SWITCH_DOMAINS.includes(domain) ? domain : "homeassistant";
    void hass.callService(target, "toggle", { entity_id: config.entity });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    heldOpen.current = false;
    holdOrigin.current = { x: event.clientX, y: event.clientY };
    holdTimer.current = window.setTimeout(() => {
      heldOpen.current = true;
      cancelHold();
      moreInfo(host, config.entity);
    }, HOLD_MS);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const origin = holdOrigin.current;
    if (!origin) return;
    if (Math.abs(event.clientX - origin.x) > HOLD_SLOP || Math.abs(event.clientY - origin.y) > HOLD_SLOP) {
      cancelHold();
    }
  };

  const onClick = () => {
    cancelHold();
    // A hold already opened more-info; the click that follows it must not also toggle.
    if (heldOpen.current) {
      heldOpen.current = false;
      return;
    }
    toggle();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    toggle();
  };

  const power = config.power_entity ? hass?.states[config.power_entity] : undefined;
  const since = relativeTime(entity.last_changed, t);
  const state = !on
    ? `${t("off")} · ${t("last_on")} ${since}`
    : power && !isUnavailable(power)
      ? `${t("on")} · ${t("power")} ${formatNumber(hass, Number(power.state), 0)} ${power.attributes.unit_of_measurement ?? "W"}`
      : `${t("on")} · ${t("since", { t: since })}`;

  return <>
    <style>{styles}</style>
    <LiquidGlassSurface
      className={`card row${on ? " active" : ""}`}
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={on ? "var(--lg-switch-accent)" : undefined}
      style={{ display: "flex", position: "relative" }}
      role="switch"
      aria-checked={on}
      aria-label={name}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={cancelHold}
      onPointerCancel={cancelHold}
      onPointerLeave={cancelHold}
      onContextMenu={(event) => event.preventDefault()}
    >
      <IconWell
        icon={config.icon ?? (entity.attributes.icon as string | undefined) ?? defaultIcon(config.entity)}
        style={on ? { from: "var(--lg-switch-accent-light)", to: "var(--lg-switch-accent)", glow: "rgba(10,132,255,0.24)" } : undefined}
      />
      <CardTitle name={name} state={state} />
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassSwitchCard = defineReactCard<SwitchCardConfig>({
  tagName: "liquid-glass-switch-card",
  component: SwitchCard,
  normalizeConfig: (config) => ({ refraction: "auto", theme: "auto", ...config }),
  getCardSize: () => 1,
  getConfigElement: async () => {
    await loadHaFormComponents();
    return document.createElement("liquid-glass-card-editor");
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(SWITCH_DOMAINS, hass, entities, entitiesFallback),
  }),
});
