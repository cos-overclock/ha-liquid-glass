import { LitElement, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { createTranslator, type Translator } from "./i18n";
import { glassDefsFor, supportsRefraction, type GlassGeometry } from "./styles/glass-defs";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "./types";
import { friendlyName, moreInfo } from "./utils";
import { loadHaFormComponents } from "./editor/load";
import { registerAnimatableColors } from "./styles/motion";
import "./components/lg-icon";
import "./components/lg-slider";
import "./components/lg-glass-surface";

// Every card imports this module, so registering here covers all of them.
registerAnimatableColors();

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
  @state() private glassGeometry: GlassGeometry | undefined;

  protected t: Translator = createTranslator("en");
  private glassResizeObserver?: ResizeObserver;
  private glassResizeTimer?: number;
  private glassSurface?: HTMLElement;
  private lightFrame?: number;

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
    this.setAttribute("glass-variant", this.config?.glass_variant ?? "regular");
  }

  protected override firstUpdated(): void {
    const surface = this.renderRoot.querySelector<HTMLElement>(".glass");
    if (!surface || typeof ResizeObserver === "undefined") return;
    this.glassSurface = surface;
    surface.addEventListener("pointermove", this.updateLight, { passive: true });
    surface.addEventListener("pointerleave", this.resetLight, { passive: true });
    const measure = () => {
      window.clearTimeout(this.glassResizeTimer);
      this.glassResizeTimer = window.setTimeout(() => {
        const rect = surface.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return;
        const rawRadius = getComputedStyle(surface).borderTopLeftRadius;
        const parsed = Number.parseFloat(rawRadius) || 0;
        const radius = rawRadius.trim().endsWith("%") ? (parsed / 100) * Math.min(rect.width, rect.height) : parsed;
        const next = {
          width: Math.round(rect.width / 4) * 4,
          height: Math.round(rect.height / 4) * 4,
          radius: Math.round(radius / 2) * 2,
        };
        const current = this.glassGeometry;
        if (!current || current.width !== next.width || current.height !== next.height || current.radius !== next.radius) {
          this.glassGeometry = next;
        }
      }, 120);
    };
    this.glassResizeObserver = new ResizeObserver(measure);
    this.glassResizeObserver.observe(surface);
    measure();
  }

  override disconnectedCallback(): void {
    this.glassResizeObserver?.disconnect();
    this.glassSurface?.removeEventListener("pointermove", this.updateLight);
    this.glassSurface?.removeEventListener("pointerleave", this.resetLight);
    window.clearTimeout(this.glassResizeTimer);
    if (this.lightFrame !== undefined) cancelAnimationFrame(this.lightFrame);
    super.disconnectedCallback();
  }

  private updateLight = (event: PointerEvent): void => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !this.glassSurface) return;
    const { clientX, clientY } = event;
    if (this.lightFrame !== undefined) cancelAnimationFrame(this.lightFrame);
    this.lightFrame = requestAnimationFrame(() => {
      if (!this.glassSurface) return;
      const rect = this.glassSurface.getBoundingClientRect();
      this.glassSurface.style.setProperty("--lg-light-x", `${((clientX - rect.left) / rect.width) * 100}%`);
      this.glassSurface.style.setProperty("--lg-light-y", `${((clientY - rect.top) / rect.height) * 100}%`);
      this.glassSurface.style.setProperty("--lg-sheen-active", "1");
    });
  };

  private resetLight = (): void => {
    this.glassSurface?.style.removeProperty("--lg-light-x");
    this.glassSurface?.style.removeProperty("--lg-light-y");
    this.glassSurface?.style.removeProperty("--lg-sheen-active");
  };

  protected openMoreInfo = (): void => moreInfo(this, this.config?.entity);

  protected callService(domain: string, service: string, data: Record<string, unknown> = {}): void {
    if (!this.hass || !this.config?.entity) return;
    void this.hass.callService(domain, service, { entity_id: this.config.entity, ...data });
  }

  protected renderDefs(): TemplateResult | typeof nothing {
    return this.refraction ? glassDefsFor(this.glassGeometry) : nothing;
  }

  /**
   * GPU fallback for browsers without SVG-filtered backdrops. On Chromium the surface is
   * intentionally omitted so the control refracts its real track, image, or card below.
   */
  protected renderControlSurface(
    palette?: string[],
    shape: "circle" | "pill" | "roundrect" = "circle",
  ): TemplateResult | typeof nothing {
    if (this.refraction) return nothing;
    return html`<lg-glass-surface
      class="lg-control-shader"
      .shape=${shape}
      .palette=${palette ?? (this.isDark ? ["#242529", "#45474d"] : ["#ffffff", "#d8d9dc"])}
      .radius=${shape === "circle" ? 999 : 22}
      .edge=${14}
      .refraction=${0}
      .blurRadius=${3}
      .highlight=${1.25}
      .tintAlpha=${this.isDark ? 0.12 : 0.24}
    ></lg-glass-surface>`;
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
      <div class="knob-dot">${this.renderControlSurface()}</div>
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
