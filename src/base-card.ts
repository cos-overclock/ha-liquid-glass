import { LitElement, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { createTranslator, type Translator } from "./i18n";
import { glassDefs, supportsRefraction } from "./styles/glass-defs";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "./types";
import { friendlyName, moreInfo } from "./utils";
import { loadHaFormComponents } from "./editor/load";
import "./components/lg-icon";
import "./components/lg-slider";

export interface IconWellStyle {
  from: string;
  to: string;
  glow: string;
}

export interface BadgeStyle {
  color: string;
  bg: string;
  stroke: string;
  glow?: string;
}

/**
 * Common behaviour for all Liquid Glass cards: config/hass plumbing, dark mode detection,
 * refraction feature flag, i18n, and the shared header / badge / toggle templates.
 */
export abstract class LiquidGlassBaseCard<C extends BaseCardConfig = BaseCardConfig> extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() protected config!: C;

  protected t: Translator = createTranslator("en");

  /**
   * Every card shares one editor element, which reads its schema from `config.type`.
   * Statics are inherited, so each card gets this for free.
   */
  static async getConfigElement(): Promise<HTMLElement> {
    await loadHaFormComponents();
    return document.createElement("liquid-glass-card-editor");
  }

  static getStubConfig(
    _hass?: HomeAssistant,
    _entities?: string[],
    _entitiesFallback?: string[],
  ): Record<string, unknown> {
    return {};
  }

  setConfig(config: C): void {
    if (!config) throw new Error("Invalid configuration");
    this.config = { refraction: "auto", theme: "auto", ...config };
    this.applyRefraction();
  }

  getCardSize(): number {
    return 3;
  }

  protected get entity(): HassEntity | undefined {
    return this.config?.entity ? this.hass?.states[this.config.entity] : undefined;
  }

  protected get entityName(): string {
    return this.config?.name ?? friendlyName(this.entity, this.config?.entity ?? "");
  }

  protected get isDark(): boolean {
    if (this.config?.theme === "dark") return true;
    if (this.config?.theme === "light") return false;
    return Boolean(this.hass?.themes?.darkMode);
  }

  protected get refraction(): boolean {
    return this.hasAttribute("refraction");
  }

  private applyRefraction(): void {
    const setting = this.config?.refraction ?? "auto";
    const on = setting === true || (setting === "auto" && supportsRefraction());
    this.toggleAttribute("refraction", on);
  }

  protected override willUpdate(): void {
    const lang = this.config?.language ?? this.hass?.locale?.language ?? this.hass?.language;
    this.t = createTranslator(lang);
    this.toggleAttribute("dark", this.isDark);
  }

  protected openMoreInfo = (): void => moreInfo(this, this.config?.entity);

  protected callService(domain: string, service: string, data: Record<string, unknown> = {}): void {
    if (!this.hass || !this.config?.entity) return;
    void this.hass.callService(domain, service, { entity_id: this.config.entity, ...data });
  }

  protected renderDefs(): TemplateResult | typeof nothing {
    return this.refraction ? glassDefs : nothing;
  }

  /**
   * `onClick` defaults to opening more-info. Pass `null` when an ancestor already handles
   * the click, so the well stays inert and the event reaches it exactly once.
   */
  protected renderIconWell(icon: string, style: IconWellStyle | undefined, onClick?: (() => void) | null): TemplateResult {
    const idle = !style;
    const handler = onClick === null ? undefined : onClick ?? this.openMoreInfo;
    return html`<div
      class=${classMap({ "icon-well": true, idle })}
      style=${idle ? nothing : styleMap({ "--well-from": style.from, "--well-to": style.to, "--well-glow": style.glow })}
      @click=${handler}
      role=${handler ? "button" : nothing}
    >
      <lg-icon .icon=${icon}></lg-icon>
    </div>`;
  }

  protected renderTitle(name: string, state: string): TemplateResult {
    return html`<div class="title" @click=${this.openMoreInfo}>
      <div class="name">${name}</div>
      <div class="state">${state}</div>
    </div>`;
  }

  protected renderBadge(label: string, style: BadgeStyle | undefined): TemplateResult {
    return html`<div
      class="badge"
      style=${style
        ? styleMap({ "--badge-color": style.color, "--badge-bg": style.bg, "--badge-stroke": style.stroke, "--badge-glow": style.glow ?? style.color })
        : nothing}
    >
      <span class="dot"></span><span>${label}</span>
    </div>`;
  }

  protected renderToggle(on: boolean, color: string, onToggle: () => void): TemplateResult {
    return html`<div
      class=${classMap({ toggle: true, on })}
      style=${styleMap({ "--toggle-color": color })}
      role="switch"
      aria-checked=${on}
      tabindex="0"
      @click=${onToggle}
      @keydown=${(e: KeyboardEvent) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div class="knob-dot"></div>
    </div>`;
  }

  protected renderUnavailable(): TemplateResult {
    return html`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config?.icon ?? "mdi:help-circle-outline", undefined)}
          ${this.renderTitle(this.entityName, this.t("unavailable"))}
        </div>
      </div>`;
  }
}
