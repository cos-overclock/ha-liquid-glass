import { createElement, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { BaseCardConfig, HomeAssistant, LovelaceGridOptions } from "../types";
import { installCardActionHandler } from "./card-actions";

export interface ReactCardProps<C extends BaseCardConfig> {
  config: C;
  hass?: HomeAssistant;
  host: HTMLElement;
}

export interface ReactCardDefinition<C extends BaseCardConfig> {
  tagName: `${string}-${string}`;
  component: ComponentType<ReactCardProps<C>>;
  normalizeConfig?: (config: C) => C;
  /** `host` is the custom element, for a card whose size depends on runtime state. */
  getCardSize?: (config: C, host: HTMLElement) => number;
  /** Sizing rules for Home Assistant's 12-column Sections view. */
  getGridOptions?: (config: C, host: HTMLElement) => LovelaceGridOptions;
  getConfigElement?: () => HTMLElement | Promise<HTMLElement>;
  getStubConfig?: (
    hass?: HomeAssistant,
    entities?: string[],
    entitiesFallback?: string[],
  ) => Record<string, unknown>;
}

export interface ReactCardConstructor<C extends BaseCardConfig> extends CustomElementConstructor {
  new (): HTMLElement & {
    hass?: HomeAssistant;
    setConfig(config: C): void;
    getCardSize(): number;
    getGridOptions(): LovelaceGridOptions;
  };
  getConfigElement?: () => HTMLElement | Promise<HTMLElement>;
  getStubConfig?: ReactCardDefinition<C>["getStubConfig"];
}

interface RuntimeInstance {
  requestRender(): void;
}

interface ReactCardRuntime {
  constructors: Map<string, CustomElementConstructor>;
  definitions: Map<string, ReactCardDefinition<BaseCardConfig>>;
  instances: Map<string, Set<RuntimeInstance>>;
}

const runtimeKey = "__HA_LIQUID_GLASS_REACT_CARD_RUNTIME__";
const runtimeScope = globalThis as typeof globalThis & Record<string, unknown>;
const runtime = (runtimeScope[runtimeKey] ??= {
  constructors: new Map(),
  definitions: new Map(),
  instances: new Map(),
}) as ReactCardRuntime;

/**
 * Register a Home Assistant custom card whose view is a React component.
 *
 * Home Assistant still owns an HTMLElement and writes `config`/`hass` through its
 * imperative card contract. The element is deliberately only an adapter: React owns
 * everything inside its shadow root. Definitions live in a global registry so Vite
 * hot updates can replace a component without attempting to redefine the custom element.
 */
export function defineReactCard<C extends BaseCardConfig>(
  definition: ReactCardDefinition<C>,
): ReactCardConstructor<C> {
  const tagName = definition.tagName;
  const runtimeDefinition = definition as unknown as ReactCardDefinition<BaseCardConfig>;
  runtime.definitions.set(tagName, runtimeDefinition);

  const registered = runtime.constructors.get(tagName);
  const defined = customElements.get(tagName);
  if (registered && defined === registered) {
    const constructor = defined as ReactCardConstructor<C>;
    constructor.getConfigElement = definition.getConfigElement;
    constructor.getStubConfig = definition.getStubConfig;
    for (const instance of runtime.instances.get(tagName) ?? []) instance.requestRender();
    return constructor;
  }

  // A dashboard resource can be evaluated again without a full page reload. Keep the
  // element that the browser actually knows about instead of aborting the rest of the
  // bundle when the module-level runtime cache and CustomElementRegistry diverge.
  if (defined) {
    const constructor = defined as ReactCardConstructor<C>;
    runtime.constructors.set(tagName, constructor);
    constructor.getConfigElement = definition.getConfigElement;
    constructor.getStubConfig = definition.getStubConfig;
    for (const instance of runtime.instances.get(tagName) ?? []) instance.requestRender();
    return constructor;
  }

  // The global runtime can outlive the CustomElementRegistry that originally received
  // its constructor (for example during HA preview/resource reloads). A cached
  // constructor is therefore not proof that document.createElement() can use the card.
  runtime.constructors.delete(tagName);

  class ReactCardElement extends HTMLElement implements RuntimeInstance {
    private configValue?: BaseCardConfig;
    private hassValue?: HomeAssistant;
    private root?: Root;
    private readonly mountNode: HTMLDivElement;
    private readonly cardShadowRoot: ShadowRoot;
    private actionCleanup?: () => void;
    private renderQueued = false;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      this.cardShadowRoot = shadowRoot;
      this.mountNode = document.createElement("div");
      this.mountNode.setAttribute("part", "root");
      shadowRoot.append(this.mountNode);
    }

    get hass(): HomeAssistant | undefined {
      return this.hassValue;
    }

    set hass(value: HomeAssistant | undefined) {
      if (this.hassValue === value) return;
      this.hassValue = value;
      this.requestRender();
    }

    setConfig(config: BaseCardConfig): void {
      if (!config || typeof config !== "object") throw new Error("Invalid configuration");
      const currentDefinition = this.currentDefinition();
      this.configValue = currentDefinition.normalizeConfig?.(config) ?? config;
      this.requestRender();
    }

    getCardSize(): number {
      if (!this.configValue) return 3;
      return this.currentDefinition().getCardSize?.(this.configValue, this) ?? 3;
    }

    getGridOptions(): LovelaceGridOptions {
      if (!this.configValue) return { columns: 12 };
      return this.currentDefinition().getGridOptions?.(this.configValue, this) ?? { columns: 12 };
    }

    connectedCallback(): void {
      const instances = runtime.instances.get(tagName) ?? new Set<RuntimeInstance>();
      instances.add(this);
      runtime.instances.set(tagName, instances);
      this.actionCleanup ??= installCardActionHandler(
        this.cardShadowRoot,
        this,
        () => this.configValue,
      );
      this.requestRender();
    }

    disconnectedCallback(): void {
      runtime.instances.get(tagName)?.delete(this);
      this.actionCleanup?.();
      this.actionCleanup = undefined;
      this.root?.unmount();
      this.root = undefined;
    }

    requestRender(): void {
      if (!this.isConnected || !this.configValue || this.renderQueued) return;
      this.renderQueued = true;
      // HA may assign config and hass back-to-back. Render only their latest
      // values once instead of reconciling the full card twice in one task.
      queueMicrotask(() => {
        this.renderQueued = false;
        if (!this.isConnected || !this.configValue) return;
        this.root ??= createRoot(this.mountNode);
        const currentDefinition = this.currentDefinition();
        this.root.render(
          createElement(currentDefinition.component, {
            config: this.configValue,
            hass: this.hassValue,
            host: this,
          }),
        );
      });
    }

    private currentDefinition(): ReactCardDefinition<BaseCardConfig> {
      const current = runtime.definitions.get(tagName);
      if (!current) throw new Error(`React card definition for "${tagName}" is unavailable`);
      return current;
    }
  }

  const constructor = ReactCardElement as ReactCardConstructor<C>;
  if (definition.getConfigElement) constructor.getConfigElement = definition.getConfigElement;
  if (definition.getStubConfig) constructor.getStubConfig = definition.getStubConfig;

  runtime.constructors.set(tagName, constructor);
  customElements.define(tagName, constructor);
  return constructor;
}
