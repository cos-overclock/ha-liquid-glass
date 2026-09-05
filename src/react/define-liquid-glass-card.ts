import "../components/lg-icon";
import { loadHaFormComponents } from "../editor/load";
import type { BaseCardConfig } from "../types";
import {
  defineReactCard,
  type ReactCardConstructor,
  type ReactCardDefinition,
} from "./define-react-card";

export type { ReactCardProps } from "./define-react-card";

type LiquidGlassCardDefinition<C extends BaseCardConfig> = Omit<
  ReactCardDefinition<C>,
  "normalizeConfig" | "getConfigElement"
>;

const createConfigElement = async (): Promise<HTMLElement> => {
  await loadHaFormComponents();
  return document.createElement("liquid-glass-card-editor");
};

/** Register one of this package's cards with its shared config defaults and editor. */
export function defineLiquidGlassCard<C extends BaseCardConfig>(
  definition: LiquidGlassCardDefinition<C>,
): ReactCardConstructor<C> {
  return defineReactCard({
    ...definition,
    normalizeConfig: (config) => ({ refraction: "auto", theme: "auto", ...config }),
    getConfigElement: createConfigElement,
  });
}
