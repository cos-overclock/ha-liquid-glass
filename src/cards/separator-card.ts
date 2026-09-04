import { css, html, nothing } from "lit";
import { LiquidGlassBaseCard } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig } from "../types";

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

/** Decorative section heading matching the three separator components in design.pen. */
export class LiquidGlassSeparatorCard extends LiquidGlassBaseCard<SeparatorCardConfig> {
  static override styles = [
    tokens,
    glassStyles,
    css`
      :host {
        min-width: 0;
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
      .chevron > lg-icon {
        flex: none;
      }

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
        .pill-row {
          gap: 8px;
        }
        .pill {
          padding-inline: 11px;
        }
        .header-row {
          gap: 9px;
        }
      }
    `,
  ];

  static override getStubConfig() {
    return { title: "Section", icon: "mdi:lightbulb-outline", style: "pill" };
  }

  override getCardSize(): number {
    return 1;
  }

  private get heading(): string {
    return this.config.title ?? this.config.name ?? this.t("sep_title");
  }

  private get icon(): string {
    return this.config.icon ?? "mdi:lightbulb-outline";
  }

  private get hasCount(): boolean {
    return this.config.count !== undefined && this.config.count !== null && this.config.count !== "";
  }

  private renderPlain() {
    return html`<div class="separator plain">
      <lg-icon .icon=${this.icon}></lg-icon>
      <span class="plain-title">${this.heading}</span>
      <span class="line" aria-hidden="true"></span>
      ${this.hasCount ? html`<span class="plain-count">${this.config.count}</span>` : nothing}
    </div>`;
  }

  private renderPill() {
    return html`${this.renderDefs()}
      <div class="separator pill-row">
        <div class="glass pill">
          <lg-icon .icon=${this.icon}></lg-icon>
          <span class="pill-title">${this.heading}</span>
          ${this.hasCount ? html`<span class="pill-count">${this.config.count}</span>` : nothing}
        </div>
        <span class="line" aria-hidden="true"></span>
      </div>`;
  }

  private renderHeader() {
    return html`${this.renderDefs()}
      <div class="separator header-row">
        <span class="glass header-well"><lg-icon .icon=${this.icon}></lg-icon></span>
        <span class="header-text">
          <span class="header-title">${this.heading}</span>
          ${this.config.subtitle ? html`<span class="header-subtitle">${this.config.subtitle}</span>` : nothing}
        </span>
        <span class="chevron" aria-hidden="true"><lg-icon icon="mdi:chevron-up"></lg-icon></span>
      </div>`;
  }

  override render() {
    switch (this.config.style) {
      case "plain":
        return this.renderPlain();
      case "header":
        return this.renderHeader();
      default:
        return this.renderPill();
    }
  }
}

if (!customElements.get("liquid-glass-separator-card")) {
  customElements.define("liquid-glass-separator-card", LiquidGlassSeparatorCard);
}
