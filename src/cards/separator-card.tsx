import { Glass, type GlassOptics } from "@samasante/liquid-glass";
import { createElement } from "react";
import { loadHaFormComponents } from "../editor/load";
import { createTranslator } from "../i18n";
import { defineReactCard, type ReactCardProps } from "../react/define-react-card";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig } from "../types";
import "../components/lg-icon";

export type SeparatorStyle = "plain" | "pill" | "header";

export interface SeparatorCardConfig extends BaseCardConfig {
  /** Heading text. `name` is accepted as an alias for consistency with entity cards. */
  title?: string;
  /** plain | pill | header. Defaults to pill, as used in the dashboard design. */
  style?: SeparatorStyle;
  /** Optional item count shown by the plain and pill variants. */
  count?: number | string;
  /** Secondary line shown by the header variant. */
  subtitle?: string;
}

const flatOptics: Partial<GlassOptics> = {
  strength: 0,
  curvature: 0,
  dispersion: 0,
  bend: 0,
};

const styles = `${tokens.cssText}
  * { box-sizing: border-box; }
  :host {
    display: block;
    min-width: 0;
    container-type: inline-size;
    color: var(--lg-text-primary);
    font-family: var(--lg-font-jp);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }
  .separator {
    width: 100%;
    min-width: 0;
    display: flex;
    align-items: center;
    color: var(--lg-text-primary);
  }
  .separator > lg-icon,
  .pill > lg-icon,
  .header-well > lg-icon,
  .chevron > lg-icon { flex: none; }
  .plain {
    gap: 10px;
    padding: 16px 6px 10px;
    color: var(--lg-text-secondary);
  }
  .plain > lg-icon {
    --mdc-icon-size: 16px;
    width: 16px;
    height: 16px;
  }
  .plain-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0.6px;
  }
  .line {
    flex: 1 1 24px;
    min-width: 12px;
    height: 1px;
    background: var(--lg-separator-line);
  }
  .plain-count {
    flex: none;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .pill-row {
    gap: 10px;
    padding: 10px 0;
  }
  .pill {
    flex: none;
    position: relative;
    min-width: 0;
    max-width: calc(100% - 22px);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 20px;
    color: var(--lg-text-primary);
    background: rgba(var(--lg-glass-tint), var(--lg-glass-tint-alpha));
    box-shadow:
      0 4px 14px -2px var(--lg-shadow-glass),
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .pill > lg-icon {
    --mdc-icon-size: 15px;
    width: 15px;
    height: 15px;
  }
  .pill-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
  }
  .pill-count {
    flex: none;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: var(--lg-track-bg);
    color: var(--lg-text-secondary);
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .header-row {
    gap: 12px;
    padding: 14px 4px 8px;
  }
  .header-well {
    flex: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--lg-text-primary);
    background: rgba(var(--lg-glass-tint), var(--lg-glass-tint-alpha));
    box-shadow:
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .header-well > lg-icon {
    --mdc-icon-size: 15px;
    width: 15px;
    height: 15px;
  }
  .header-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .header-title,
  .header-subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .header-title {
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
  }
  .header-subtitle {
    color: var(--lg-text-secondary);
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
  }
  .chevron {
    flex: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--lg-text-secondary);
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .chevron > lg-icon {
    --mdc-icon-size: 15px;
    width: 15px;
    height: 15px;
  }
  @container (max-width: 230px) {
    .plain,
    .pill-row { gap: 8px; }
    .pill { padding-inline: 11px; }
    .header-row { gap: 9px; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;

function Icon({ icon }: { icon: string }) {
  return createElement("lg-icon", { icon, "aria-hidden": "true" });
}

function SeparatorCard({ config, hass, host }: ReactCardProps<SeparatorCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const language = config.language ?? hass?.locale?.language ?? hass?.language;
  const t = createTranslator(language);
  const heading = config.title ?? config.name ?? t("sep_title");
  const icon = config.icon ?? "mdi:lightbulb-outline";
  const hasCount = config.count !== undefined && config.count !== null && config.count !== "";
  const optics = refraction ? undefined : flatOptics;

  let content;
  switch (config.style) {
    case "plain":
      content = (
        <div className="separator plain">
          <Icon icon={icon} />
          <span className="plain-title">{heading}</span>
          <span className="line" aria-hidden="true" />
          {hasCount && <span className="plain-count">{config.count}</span>}
        </div>
      );
      break;
    case "header":
      content = (
        <div className="separator header-row">
          <Glass className="header-well" optics={optics} style={{ display: "grid" }}>
            <Icon icon={icon} />
          </Glass>
          <span className="header-text">
            <span className="header-title">{heading}</span>
            {config.subtitle && <span className="header-subtitle">{config.subtitle}</span>}
          </span>
          <span className="chevron" aria-hidden="true"><Icon icon="mdi:chevron-up" /></span>
        </div>
      );
      break;
    default:
      content = (
        <div className="separator pill-row">
          <Glass className="pill" optics={optics} style={{ display: "flex" }}>
            <Icon icon={icon} />
            <span className="pill-title">{heading}</span>
            {hasCount && <span className="pill-count">{config.count}</span>}
          </Glass>
          <span className="line" aria-hidden="true" />
        </div>
      );
  }

  return <><style>{styles}</style>{content}</>;
}

export const LiquidGlassSeparatorCard = defineReactCard<SeparatorCardConfig>({
  tagName: "liquid-glass-separator-card",
  component: SeparatorCard,
  normalizeConfig: (config) => ({ refraction: "auto", theme: "auto", ...config }),
  getCardSize: () => 1,
  getConfigElement: async () => {
    await loadHaFormComponents();
    return document.createElement("liquid-glass-card-editor");
  },
  getStubConfig: () => ({
    title: "Section",
    icon: "mdi:lightbulb-outline",
    style: "pill",
  }),
});
