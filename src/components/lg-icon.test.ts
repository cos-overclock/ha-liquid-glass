// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { LgIcon } from "./lg-icon";

describe("lg-icon", () => {
  it("forwards property and attribute updates to Home Assistant's icon", () => {
    const icon = new LgIcon();
    const haIcon = icon.shadowRoot?.querySelector("ha-icon") as (HTMLElement & { icon?: string }) | null;

    icon.icon = "mdi:lightbulb";
    expect(haIcon?.icon).toBe("mdi:lightbulb");

    icon.setAttribute("icon", "mdi:fan");
    expect(icon.icon).toBe("mdi:fan");
    expect(haIcon?.icon).toBe("mdi:fan");
  });
});
