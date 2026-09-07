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

/** Rendering quality used while refraction is enabled. */
export type RefractionQuality = "medium" | "high";

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

/** Confirmation options accepted by Home Assistant's dashboard action handler. */
export interface ActionConfirmation {
  text?: string;
  title?: string;
  confirm_text?: string;
  dismiss_text?: string;
  exemptions?: Array<{ user: string }>;
}

/**
 * A Lovelace dashboard action. The card forwards this object to Home Assistant, which
 * keeps confirmation dialogs, navigation, Assist and service calls aligned with core cards.
 */
export interface ActionConfig {
  action:
    | "more-info"
    | "toggle"
    | "perform-action"
    | "call-service"
    | "navigate"
    | "url"
    | "assist"
    | "fire-dom-event"
    | "none";
  entity?: string;
  perform_action?: string;
  /** Legacy spelling retained because Home Assistant still accepts it. */
  service?: string;
  data?: Record<string, unknown>;
  /** Legacy spelling retained because Home Assistant still accepts it. */
  service_data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  navigation_path?: string;
  navigation_replace?: boolean;
  url_path?: string;
  pipeline_id?: string;
  start_listening?: boolean;
  confirmation?: boolean | ActionConfirmation;
  [key: string]: unknown;
}

export interface BaseCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  /** "auto" | true | false: auto disables costly refraction in embedded WebViews. */
  refraction?: "auto" | boolean;
  /** Auto uses medium quality on Android and high quality elsewhere. */
  refraction_quality?: "auto" | RefractionQuality;
  /** Force theme: "auto" | "light" | "dark". */
  theme?: "auto" | "light" | "dark";
  /** Optical material: regular for legibility, clear for media-rich backgrounds. */
  glass_variant?: "regular" | "clear";
  language?: string;
  /** Action performed on a short pointer tap or Enter / Space. */
  tap_action?: ActionConfig;
  /** Action performed after holding the card for 500 ms. */
  hold_action?: ActionConfig;
  /** Action performed when the card is tapped twice in quick succession. */
  double_tap_action?: ActionConfig;
}

/** Sizing rules returned to Home Assistant's 12-column Sections grid. */
export interface LovelaceGridOptions {
  rows?: number;
  min_rows?: number;
  max_rows?: number;
  columns?: number | "full";
  min_columns?: number;
  max_columns?: number;
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
  getGridOptions?(): LovelaceGridOptions;
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
