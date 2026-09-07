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

/**
 * One part of a composed entity name, as Home Assistant's `entity_name` selector writes it.
 *
 * `entity` / `device` / `area` / `floor` are looked up in the registries, so the card shows
 * whatever the user renamed them to, in their own language. `text` is a literal separator
 * or prefix typed into the selector.
 */
export type EntityNameItem =
  | { type: "entity" | "device" | "area" | "floor" }
  | { type: "text"; text: string };

/** Options accepted by `hass.formatEntityName`. */
export interface EntityNameOptions {
  /** Inserted between the parts. Home Assistant defaults to a single space. */
  separator?: string;
}

/** The value a card's `name` option can hold: a plain string, or a composition. */
export type EntityName = string | EntityNameItem | EntityNameItem[];

/**
 * The Home Assistant WebSocket connection, as `hass.connection` exposes it.
 *
 * Only the subscription entry point is described here: it is the one part the cards use,
 * and typing the whole `home-assistant-js-websocket` surface would tie the bundle to a
 * dependency it deliberately does not have.
 */
export interface HassConnection {
  subscribeMessage<T>(
    callback: (message: T) => void,
    subscribeMessage: Record<string, unknown>,
    options?: { resubscribe?: boolean },
  ): Promise<() => Promise<void>>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  /**
   * Absent in tests and in any host that does not expose the socket, so every caller
   * has to keep a path that works without it.
   */
  connection?: HassConnection;
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
  /**
   * Home Assistant's own translation of a state, including the device-class wording
   * (`Detected` / `Clear`) and the translated options of a `select`. Added in 2026.4, so
   * the cards keep their built-in dictionary as the fallback.
   */
  formatEntityState?(entity: HassEntity, state?: string): string;
  /**
   * Composes a display name out of the registry: area, device and entity, exactly as the
   * built-in cards do. Added in Home Assistant 2026.4; without it a card falls back to
   * `friendly_name`. See https://developers.home-assistant.io/docs/frontend/data/
   */
  formatEntityName?(entity: HassEntity, name?: EntityName, options?: EntityNameOptions): string;
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
  /** Free text, or registry parts composed by Home Assistant's `entity_name` selector. */
  name?: EntityName;
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
