// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it } from "vitest";
import type { HomeAssistant } from "../types";
import { type SeparatorCardConfig } from "./separator-card";
import "./separator-card";

type SeparatorElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: SeparatorCardConfig): void;
  getCardSize(): number;
};

const reactTestScope = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean };
reactTestScope.IS_REACT_ACT_ENVIRONMENT = true;

class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = ResizeObserverStub;

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-separator-card", () => {
  it("registers a card-picker entry and an entity-first Community suggestion", async () => {
    window.customCards = [];
    await import("../index");

    const registration = window.customCards.find(
      (card) => card.type === "liquid-glass-separator-card",
    );
    expect(registration).toMatchObject({
      type: "liquid-glass-separator-card",
      name: "Liquid Glass Separator",
      preview: true,
    });
    expect(
      registration?.getEntitySuggestion?.({} as HomeAssistant, "light.example"),
    ).toEqual({
      config: {
        type: "custom:liquid-glass-separator-card",
        title: "Section",
        icon: "mdi:lightbulb-outline",
        style: "pill",
      },
    });
  });

  it("renders through React and follows Home Assistant theme/config updates", async () => {
    const element = document.createElement("liquid-glass-separator-card") as SeparatorElement;
    element.setConfig({
      type: "custom:liquid-glass-separator-card",
      title: "照明",
      style: "pill",
      count: 4,
    });

    await act(async () => document.body.append(element));
    expect(element.shadowRoot?.querySelector(".pill-title")?.textContent).toBe("照明");
    expect(element.shadowRoot?.querySelector(".pill-count")?.textContent).toBe("4");
    expect((element.shadowRoot?.querySelector(".pill") as HTMLElement).style.display).toBe("flex");
    expect(element.shadowRoot?.querySelector(".pill")?.getAttribute("data-liquid-glass")).toBe("");
    expect(element.shadowRoot?.querySelector(".pill [data-lg-refraction-source='copy']")).toBeTruthy();
    expect(element.getCardSize()).toBe(1);

    await act(async () => {
      element.hass = {
        states: {},
        language: "ja",
        themes: { darkMode: true },
        callService: async () => undefined,
        callApi: async <T,>() => undefined as T,
      };
    });
    expect(element.hasAttribute("dark")).toBe(true);

    await act(async () => {
      element.setConfig({
        type: "custom:liquid-glass-separator-card",
        title: "空調",
        style: "pill",
        refraction: false,
      });
    });
    expect(element.shadowRoot?.querySelector(".pill")?.getAttribute("data-liquid-glass")).toBe("material");
    expect(element.shadowRoot?.querySelector("[data-lg-refraction-source='copy']")).toBeNull();

    await act(async () => {
      element.setConfig({
        type: "custom:liquid-glass-separator-card",
        title: "空調",
        style: "plain",
        refraction: false,
      });
    });
    expect(element.shadowRoot?.querySelector(".plain-title")?.textContent).toBe("空調");
    expect(element.shadowRoot?.querySelector(".pill")).toBeNull();
    expect(element.hasAttribute("refraction")).toBe(false);
  });
});
