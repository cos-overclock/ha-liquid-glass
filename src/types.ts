export interface HassEntityAttributes {
  friendly_name?: string;
  icon?: string;
  unit_of_measurement?: string;
  device_class?: string;
  supported_features?: number;
  entity_picture?: string;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale?: { language?: string; number_format?: string; time_format?: string };
  themes?: { darkMode?: boolean };
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
  callApi<T>(method: string, path: string, params?: Record<string, unknown>): Promise<T>;
  formatEntityState?(entity: HassEntity): string;
}

export interface BaseCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  /** "auto" | true | false: use SVG refraction backdrop filter (Chromium only). */
  refraction?: "auto" | boolean;
  /** Force theme: "auto" | "light" | "dark". */
  theme?: "auto" | "light" | "dark";
  language?: string;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: BaseCardConfig): void;
  getCardSize?(): number;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
