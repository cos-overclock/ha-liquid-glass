// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it } from "vitest";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { defineReactCard, type ReactCardProps } from "./define-react-card";

interface TestConfig extends BaseCardConfig {
  label: string;
}

type TestElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: TestConfig): void;
  getCardSize(): number;
};

const tagName = "liquid-glass-react-adapter-test";
const reactTestScope = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean };
reactTestScope.IS_REACT_ACT_ENVIRONMENT = true;

const hass: HomeAssistant = {
  states: {},
  language: "ja",
  themes: { darkMode: false },
  callService: async () => undefined,
  callApi: async <T,>() => undefined as T,
};

afterEach(() => {
  document.body.replaceChildren();
});

describe("defineReactCard", () => {
  it("bridges config and hass updates into React and remounts after reconnect", async () => {
    const Card = defineReactCard<TestConfig>({
      tagName,
      component: ({ config, hass: currentHass }: ReactCardProps<TestConfig>) => (
        <span data-testid="content">{config.label}:{currentHass?.language ?? "none"}</span>
      ),
      normalizeConfig: (config) => ({ theme: "auto", ...config }),
      getCardSize: () => 1,
      getStubConfig: () => ({ label: "stub" }),
    });
    const element = document.createElement(tagName) as TestElement;
    element.setConfig({ type: `custom:${tagName}`, label: "first" });

    await act(async () => document.body.append(element));
    expect(element.shadowRoot?.textContent).toContain("first:none");
    expect(element.getCardSize()).toBe(1);
    expect(Card.getStubConfig?.()).toEqual({ label: "stub" });

    await act(async () => {
      element.hass = hass;
    });
    expect(element.shadowRoot?.textContent).toContain("first:ja");

    await act(async () => element.remove());
    expect(element.shadowRoot?.textContent).toBe("");

    await act(async () => document.body.append(element));
    expect(element.shadowRoot?.textContent).toContain("first:ja");
  });

  it("updates the component definition without redefining the custom element", async () => {
    const element = document.createElement(tagName) as TestElement;
    element.setConfig({ type: `custom:${tagName}`, label: "hot" });
    await act(async () => document.body.append(element));

    let UpdatedCard: ReturnType<typeof defineReactCard<TestConfig>> | undefined;
    await act(async () => {
      UpdatedCard = defineReactCard<TestConfig>({
        tagName,
        component: ({ config }: ReactCardProps<TestConfig>) => <strong>updated:{config.label}</strong>,
        getCardSize: () => 2,
      });
    });

    expect(UpdatedCard).toBe(customElements.get(tagName));
    expect(element.shadowRoot?.textContent).toContain("updated:hot");
    expect(element.getCardSize()).toBe(2);
  });

  it("re-registers when only a stale runtime constructor remains", () => {
    const staleTagName = "liquid-glass-stale-adapter-test";
    class StaleConstructor extends HTMLElement {}

    const scope = globalThis as typeof globalThis & {
      __HA_LIQUID_GLASS_REACT_CARD_RUNTIME__: {
        constructors: Map<string, CustomElementConstructor>;
      };
    };
    scope.__HA_LIQUID_GLASS_REACT_CARD_RUNTIME__.constructors.set(
      staleTagName,
      StaleConstructor,
    );

    const Card = defineReactCard<TestConfig>({
      tagName: staleTagName,
      component: ({ config }: ReactCardProps<TestConfig>) => <span>{config.label}</span>,
    });

    expect(Card).not.toBe(StaleConstructor);
    expect(customElements.get(staleTagName)).toBe(Card);
  });

  it("keeps an element already registered by an earlier resource evaluation", () => {
    const existingTagName = "liquid-glass-existing-adapter-test";
    class ExistingCard extends HTMLElement {}
    customElements.define(existingTagName, ExistingCard);

    const Card = defineReactCard<TestConfig>({
      tagName: existingTagName,
      component: ({ config }: ReactCardProps<TestConfig>) => <span>{config.label}</span>,
      getCardSize: () => 1,
    });

    expect(Card).toBe(ExistingCard);
    expect(customElements.get(existingTagName)).toBe(ExistingCard);
  });
});
