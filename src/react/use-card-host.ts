import { useLayoutEffect } from "react";
import type { BaseCardConfig, HomeAssistant } from "../types";

/** Keep Home Assistant theme/config state on the custom-element host for shadow CSS. */
export function useCardHost(
  host: HTMLElement,
  config: BaseCardConfig,
  hass?: HomeAssistant,
): { isDark: boolean; refraction: boolean } {
  const isDark =
    config.theme === "dark" ||
    (config.theme !== "light" && Boolean(hass?.themes?.darkMode));
  const refraction = config.refraction !== false;

  useLayoutEffect(() => {
    host.toggleAttribute("dark", isDark);
    host.toggleAttribute("refraction", refraction);
    host.setAttribute("glass-variant", config.glass_variant ?? "regular");
  }, [config.glass_variant, host, isDark, refraction]);

  return { isDark, refraction };
}
