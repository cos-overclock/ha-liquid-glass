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
  /**
   * `target` and `returnResponse` are needed for services that answer back, such as
   * `weather.get_forecasts`. The reply arrives as `{ response: { [entity_id]: ... } }`.
   */
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
    notifyOnError?: boolean,
    returnResponse?: boolean,
  ): Promise<{ response?: unknown } | undefined>;
  callApi<T>(method: string, path: string, params?: Record<string, unknown>): Promise<T>;
  formatEntityState?(entity: HassEntity): string;
}

export interface BaseCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  /** "auto" | true | false: enable refraction (cross-browser on React cards). */
  refraction?: "auto" | boolean;
  /** Force theme: "auto" | "light" | "dark". */
  theme?: "auto" | "light" | "dark";
  /** Optical material: regular for legibility, clear for media-rich backgrounds. */
  glass_variant?: "regular" | "clear";
  language?: string;
}

/** Any Lovelace card config: ours or a built-in one nested inside the group card. */
export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: BaseCardConfig): void;
  getCardSize?(): number;
}

export interface LovelaceCardSuggestion {
  label?: string;
  config: {
    type: string;
    [key: string]: unknown;
  };
}

export interface CustomCardRegistration {
  type: string;
  name: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
  getEntitySuggestion?: (
    hass: HomeAssistant,
    entityId: string,
  ) => LovelaceCardSuggestion | LovelaceCardSuggestion[] | null;
}

/** Home Assistant's card factory, used by stack-like cards to build their children. */
export interface CardHelpers {
  createCardElement(config: LovelaceCardConfig): LovelaceCard;
}

declare global {
  interface Window {
    customCards?: CustomCardRegistration[];
    loadCardHelpers?: () => Promise<CardHelpers>;
  }
}
