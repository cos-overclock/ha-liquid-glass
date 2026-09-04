import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { createTranslator } from "../i18n";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { fireEvent } from "../utils";
import { DEFAULT_FAVORITES } from "../cards/light-card";
import { cardKind, schemaFor, fieldNames, DEFAULT_ON, HELPERS, type FormSchema } from "./schema";

type FormData = Record<string, unknown>;

/**
 * Visual editor shared by every Liquid Glass card.
 *
 * Home Assistant hands the editor the full card config, so the form picks its own schema
 * from `config.type` and one registered element serves all eight cards.
 */
export class LiquidGlassCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config: BaseCardConfig | undefined;

  static override styles = css`
    :host {
      display: block;
    }
  `;

  setConfig(config: BaseCardConfig): void {
    this.config = config;
  }

  /**
   * Config → form values. `refraction` becomes a three-way dropdown, and the favorite
   * colors are seeded with the defaults the card actually renders so the list the editor
   * shows matches the card.
   */
  private toForm(config: BaseCardConfig): FormData {
    const { refraction, theme, ...rest } = config as unknown as FormData;
    const data: FormData = { ...rest };
    data.refraction = refraction === true ? "on" : refraction === false ? "off" : "auto";
    data.theme = theme ?? "auto";
    // "full" is the weather card's default layout; show it rather than an empty dropdown.
    if (cardKind(config.type) === "weather") data.layout = (rest.layout as string | undefined) ?? "full";
    // The original climate dial remains the default; make that explicit in the selector.
    if (cardKind(config.type) === "climate") {
      const design = rest.design as string | undefined;
      data.design = design === "a" ? "compact" : design ?? "classic";
    }

    for (const name of fieldNames(schemaFor(config.type, this.t, data))) {
      if (!DEFAULT_ON.has(name)) continue;
      const compactFan = cardKind(config.type) === "climate" && data.design === "compact" && name === "show_fan_mode";
      data[name] = compactFan ? rest[name] === true : rest[name] !== false;
    }

    if (cardKind(config.type) === "light") {
      const favorites = rest.favorites as string[] | false | undefined;
      data.favorites = favorites === false ? [] : favorites ?? DEFAULT_FAVORITES;
    }
    return data;
  }

  /** Form values → config, dropping the keys that carry no meaning. */
  private fromForm(data: FormData): BaseCardConfig {
    const out: FormData = { ...data };
    const compactClimate = cardKind(out.type as string | undefined) === "climate" && (out.design === "compact" || out.design === "a");
    const current = this.config as (BaseCardConfig & { design?: string; show_fan_mode?: boolean }) | undefined;
    const currentCompact = current?.design === "compact" || current?.design === "a";
    // ha-form includes the old design's seeded checkbox value in the same event as a
    // design change. Do not mistake that seed for an explicit fan-control choice.
    if (current && compactClimate !== currentCompact && current.show_fan_mode === undefined) delete out.show_fan_mode;

    // A toggle sitting at the card's own default carries no information. This runs before
    // refraction becomes a boolean, since there both true and false are real choices.
    for (const [key, value] of Object.entries(out)) {
      if (typeof value !== "boolean") continue;
      if (compactClimate && key === "show_fan_mode") {
        if (value === false) delete out[key];
        continue;
      }
      if (value === DEFAULT_ON.has(key)) delete out[key];
    }

    if (out.refraction === "on") out.refraction = true;
    else if (out.refraction === "off") out.refraction = false;
    else delete out.refraction;
    if (out.theme === "auto") delete out.theme;
    if (out.layout === "full") delete out.layout;
    if (out.design === "classic") delete out.design;
    // Same for the swatches: the editor seeds them so the list is visible, but an
    // untouched list is what the card shows anyway.
    const favorites = out.favorites;
    if (Array.isArray(favorites) && favorites.join() === DEFAULT_FAVORITES.join()) delete out.favorites;

    for (const [key, value] of Object.entries(out)) {
      if (value === undefined || value === null || value === "") delete out[key];
      // An empty favorites list is a deliberate "hide the swatches"; every other empty
      // list just means the option was never set.
      else if (Array.isArray(value) && value.length === 0 && key !== "favorites") delete out[key];
    }
    return out as unknown as BaseCardConfig;
  }

  private computeLabel = (schema: FormSchema): string => this.t(`ed_${schema.name}`);

  private computeHelper = (schema: FormSchema): string | undefined => {
    const key = HELPERS[schema.name];
    return key ? this.t(key) : undefined;
  };

  private get t() {
    return createTranslator(this.config?.language ?? this.hass?.locale?.language ?? this.hass?.language);
  }

  private valueChanged = (ev: CustomEvent<{ value: FormData }>): void => {
    ev.stopPropagation();
    fireEvent(this, "config-changed", { config: this.fromForm(ev.detail.value) });
  };

  override render() {
    if (!this.hass || !this.config) return nothing;
    return html`<ha-form
      .hass=${this.hass}
      .data=${this.toForm(this.config)}
      .schema=${schemaFor(this.config.type, this.t, this.config as unknown as FormData)}
      .computeLabel=${this.computeLabel}
      .computeHelper=${this.computeHelper}
      @value-changed=${this.valueChanged}
    ></ha-form>`;
  }
}

if (!customElements.get("liquid-glass-card-editor")) {
  customElements.define("liquid-glass-card-editor", LiquidGlassCardEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    "liquid-glass-card-editor": LiquidGlassCardEditor;
  }
}
