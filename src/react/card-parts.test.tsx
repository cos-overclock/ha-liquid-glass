// @vitest-environment jsdom

import { act } from "./test-act";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CardTitle, IconWell } from "./card-parts";


let root: Root | undefined;
let container: HTMLElement | undefined;

function render(node: React.ReactNode): HTMLElement {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  void act(() => root?.render(node));
  return container;
}

afterEach(() => {
  void act(() => root?.unmount());
  container?.remove();
  root = undefined;
  container = undefined;
});

function press(element: Element, key: string): void {
  void act(() => {
    element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  });
}

describe("CardTitle", () => {
  it("is a keyboard-operable button when it has an action", () => {
    const onClick = vi.fn();
    const title = render(<CardTitle name="Desk" state="On" onClick={onClick} />)
      .querySelector(".title") as HTMLElement;

    expect(title.getAttribute("role")).toBe("button");
    expect(title.tabIndex).toBe(0);

    press(title, "Enter");
    press(title, " ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("carries the visible name and state as its accessible name", () => {
    const title = render(<CardTitle name="Desk" state="On" onClick={() => {}} />)
      .querySelector(".title") as HTMLElement;

    expect(title.textContent).toBe("DeskOn");
  });

  it("ignores keys that do not activate a button", () => {
    const onClick = vi.fn();
    const title = render(<CardTitle name="Desk" state="On" onClick={onClick} />)
      .querySelector(".title") as HTMLElement;

    press(title, "a");
    press(title, "ArrowDown");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("stays a plain label with no action, so it is not a tab stop", () => {
    const title = render(<CardTitle name="Desk" state="On" />)
      .querySelector(".title") as HTMLElement;

    expect(title.getAttribute("role")).toBeNull();
    expect(title.hasAttribute("tabindex")).toBe(false);
    expect(title.className).not.toContain("tappable");
  });
});

describe("IconWell", () => {
  /*
   * The well's click always repeats an action the header already offers, so it must
   * not claim button semantics it cannot honour: a role without a tab stop announces
   * a control that keyboard users can never reach.
   */
  it("never announces itself as a button", () => {
    const well = render(<IconWell icon="mdi:lightbulb" onClick={() => {}} />)
      .querySelector(".icon-well") as HTMLElement;

    expect(well.getAttribute("role")).toBeNull();
    expect(well.hasAttribute("tabindex")).toBe(false);
  });

  it("still takes a pointer click and shows it is tappable", () => {
    const onClick = vi.fn();
    const well = render(<IconWell icon="mdi:lightbulb" onClick={onClick} />)
      .querySelector(".icon-well") as HTMLElement;

    expect(well.className).toContain("tappable");
    void act(() => well.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is not marked tappable without an action", () => {
    const well = render(<IconWell icon="mdi:lightbulb" />)
      .querySelector(".icon-well") as HTMLElement;

    expect(well.className).not.toContain("tappable");
  });
});
