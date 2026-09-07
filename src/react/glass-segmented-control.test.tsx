// @vitest-environment jsdom
import { act } from "./test-act";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GlassSegmentedControl, type GlassSegmentItem } from "./glass-segmented-control";


class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

const ITEMS: GlassSegmentItem[] = [
  { value: "heat", label: "Heat", icon: "mdi:fire" },
  { value: "cool", label: "Cool", icon: "mdi:snowflake" },
  { value: "off", label: "Off", icon: "mdi:power" },
];

let root: Root | undefined;
let container: HTMLElement | undefined;

interface Harness {
  buttons: HTMLButtonElement[];
  group: HTMLElement;
  onValueChange: ReturnType<typeof vi.fn>;
}

/**
 * Renders as a controlled parent would: a reported change is fed straight back in as
 * the new `value`, which is what decides whether the next change is a no-op.
 */
function render(value: string, options: { compact?: boolean; items?: GlassSegmentItem[] } = {}): Harness {
  const items = options.items ?? ITEMS;
  let current = value;
  const onValueChange = vi.fn((next: string) => {
    current = next;
    draw();
  });
  const draw = () => act(() => root?.render(
    <GlassSegmentedControl
      items={items}
      value={current}
      onValueChange={onValueChange}
      refraction={false}
      scheme="light"
      selectedColor="#ff8a1f"
      compact={options.compact}
      ariaLabel="HVAC mode"
    />,
  ));
  draw();

  const group = container?.querySelector<HTMLElement>("[role=group]");
  if (!group) throw new Error("segmented control did not render");
  return {
    group,
    get buttons() {
      return [...container?.querySelectorAll<HTMLButtonElement>("button") ?? []];
    },
    onValueChange,
  };
}

function press(node: HTMLElement, key: string): void {
  act(() => void node.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true })));
}

function click(node: HTMLElement): void {
  act(() => void node.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true })));
}

beforeEach(() => {
  vi.useFakeTimers();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root?.unmount());
  container?.remove();
  vi.useRealTimers();
});

describe("GlassSegmentedControl accessibility", () => {
  it("is a labelled group of labelled buttons", () => {
    const { group, buttons } = render("heat");
    expect(group.getAttribute("aria-label")).toBe("HVAC mode");
    expect(buttons).toHaveLength(3);
    expect(buttons.map((button) => button.getAttribute("aria-label"))).toEqual(["Heat", "Cool", "Off"]);
  });

  it("marks exactly the selected segment as pressed", () => {
    const { buttons } = render("cool");
    expect(buttons.map((button) => button.getAttribute("aria-pressed")))
      .toEqual(["false", "true", "false"]);
  });

  it("presses nothing when the value matches no segment", () => {
    const { buttons } = render("dry");
    expect(buttons.every((button) => button.getAttribute("aria-pressed") === "false")).toBe(true);
  });

  /* Inside a form-less shadow root a bare <button> would still default to submit. */
  it("declares every segment a plain button", () => {
    const { buttons } = render("heat");
    expect(buttons.every((button) => button.type === "button")).toBe(true);
  });

  it("keeps the label as a tooltip when the compact layout hides the text", () => {
    const { buttons } = render("heat", { compact: true });
    expect(buttons[0].title).toBe("Heat");
    expect(buttons[0].textContent).toBe("");
  });

  it("shows the text in the roomy layout", () => {
    const { buttons } = render("heat");
    expect(buttons[0].textContent).toContain("Heat");
  });
});

describe("GlassSegmentedControl selection", () => {
  it("reports the value of a clicked segment", () => {
    const { buttons, onValueChange } = render("heat");
    click(buttons[1]);
    expect(onValueChange).toHaveBeenCalledWith("cool");
  });

  /* Re-picking the current mode is not a change, and must not re-issue the service call. */
  it("says nothing when the segment already selected is clicked", () => {
    const { buttons, onValueChange } = render("heat");
    click(buttons[0]);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe("GlassSegmentedControl keyboard", () => {
  it("moves along the row with both arrow axes", () => {
    const { buttons, onValueChange } = render("heat");
    press(buttons[0], "ArrowRight");
    expect(onValueChange).toHaveBeenLastCalledWith("cool");

    press(buttons[1], "ArrowDown");
    expect(onValueChange).toHaveBeenLastCalledWith("off");

    press(buttons[1], "ArrowLeft");
    expect(onValueChange).toHaveBeenLastCalledWith("heat");

    press(buttons[2], "ArrowUp");
    expect(onValueChange).toHaveBeenLastCalledWith("cool");
  });

  it("jumps to the ends with Home and End", () => {
    const { buttons, onValueChange } = render("cool");
    press(buttons[1], "Home");
    expect(onValueChange).toHaveBeenLastCalledWith("heat");
    press(buttons[1], "End");
    expect(onValueChange).toHaveBeenLastCalledWith("off");
  });

  it("stops at the ends instead of wrapping round", () => {
    const first = render("heat");
    press(first.buttons[0], "ArrowLeft");
    expect(first.onValueChange).not.toHaveBeenCalled();

    const last = render("off");
    press(last.buttons[2], "ArrowRight");
    expect(last.onValueChange).not.toHaveBeenCalled();
  });

  it("ignores keys that are not navigation", () => {
    const { buttons, onValueChange } = render("heat");
    press(buttons[0], "a");
    press(buttons[0], "Escape");
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe("GlassSegmentedControl edge cases", () => {
  it("renders a single segment without dividing by zero", () => {
    const { buttons } = render("only", { items: [{ value: "only", label: "Only", icon: "mdi:circle" }] });
    expect(buttons).toHaveLength(1);
    expect(buttons[0].getAttribute("aria-pressed")).toBe("true");
  });

  it("renders nothing to press when given no items", () => {
    const { buttons } = render("heat", { items: [] });
    expect(buttons).toHaveLength(0);
  });
});
