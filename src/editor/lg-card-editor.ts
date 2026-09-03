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

    for (const name of fieldNames(schemaFor(config.type, this.t))) {
      if (DEFAULT_ON.has(name)) data[name] = rest[name] !== false;
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
    if (out.refraction === "on") out.refraction = true;
    else if (out.refraction === "off") out.refraction = false;
    else delete out.refraction;
    if (out.theme === "auto") delete out.theme;
    // A ticked box is the card's own default, so it need not be written out.
    for (const name of DEFAULT_ON) if (out[name] === true) delete out[name];
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
      .schema=${schemaFor(this.config.type, this.t)}
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
