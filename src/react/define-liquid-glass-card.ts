import "../components/lg-icon";
import { createElement, useLayoutEffect, type ReactElement } from "react";
import { loadHaFormComponents } from "../editor/load";
import type { BaseCardConfig } from "../types";
import { adoptCardStyles, supportsConstructedSheets } from "./card-sheets";
import {
  defineReactCard,
  type ReactCardConstructor,
  type ReactCardDefinition,
} from "./define-react-card";
import { resolveRefractionQuality } from "./platform";
import { RefractionQualityContext } from "./refraction-quality";

export type { ReactCardProps } from "./define-react-card";

type LiquidGlassCardDefinition<C extends BaseCardConfig> = Omit<
  ReactCardDefinition<C>,
  "normalizeConfig" | "getConfigElement"
> & {
  /**
   * The CSS parts this card composes, in cascade order — typically the shared token,
   * layout and surface sheets followed by the card's own rules. They are kept apart
   * so each is parsed once for the whole bundle rather than once per card instance.
   */
  styles: readonly string[];
};

const createConfigElement = async (): Promise<HTMLElement> => {
  await loadHaFormComponents();
  return document.createElement("liquid-glass-card-editor");
};

/**
 * Puts the card's CSS on its shadow root.
 *
 * `useLayoutEffect` runs before the browser paints, so adopting there shows no
 * unstyled frame. Where constructed stylesheets are unavailable the parts are joined
 * back into a plain `<style>`, which is what every card used to render.
 */
function CardStyles({ host, parts }: { host: HTMLElement; parts: readonly string[] }): ReactElement | null {
  useLayoutEffect(() => {
    adoptCardStyles(host.shadowRoot, parts);
  }, [host, parts]);

  if (supportsConstructedSheets) return null;
  return createElement("style", null, parts.join(""));
}

/** Register one of this package's cards with its shared config defaults and editor. */
export function defineLiquidGlassCard<C extends BaseCardConfig>(
  definition: LiquidGlassCardDefinition<C>,
): ReactCardConstructor<C> {
  const CardComponent = definition.component;
  const styleParts = definition.styles;
  return defineReactCard({
    ...definition,
    component: (props) => createElement(
      RefractionQualityContext.Provider,
      { value: resolveRefractionQuality(props.config.refraction_quality) },
      createElement(CardStyles, { host: props.host, parts: styleParts }),
      createElement(CardComponent, props),
    ),
    normalizeConfig: (config) => ({
      refraction: "auto",
      refraction_quality: "auto",
      theme: "auto",
      ...config,
    }),
    getConfigElement: createConfigElement,
  });
}
