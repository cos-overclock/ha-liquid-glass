// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GlassSwitch, type GlassSwitchProps } from "./glass-switch";

const reactTestScope = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean };
reactTestScope.IS_REACT_ACT_ENVIRONMENT = true;

class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

const WIDTH = 52;
const HEIGHT = 32;

let root: Root | undefined;
let container: HTMLElement | undefined;

interface Harness {
  input: HTMLInputElement;
  hit: HTMLElement;
  onCheckedChange: ReturnType<typeof vi.fn>;
}

function render(props: Partial<GlassSwitchProps> = {}): Harness {
  const onCheckedChange = vi.fn();
  act(() => root?.render(
    <GlassSwitch
      checked={false}
      refraction={false}
      ariaLabel="Desk lamp"
      width={WIDTH}
      height={HEIGHT}
      onCheckedChange={onCheckedChange}
      {...props}
    />,
  ));

  const input = container?.querySelector<HTMLInputElement>("input[type=checkbox]");
  const hit = container?.querySelector<HTMLElement>("[data-lg-glass-switch-thumb]");
  if (!input || !hit) throw new Error("switch did not render its control");
  for (const node of [hit]) {
    Object.defineProperty(node, "setPointerCapture", { value: () => undefined, configurable: true });
    Object.defineProperty(node, "hasPointerCapture", { value: () => true, configurable: true });
    Object.defineProperty(node, "releasePointerCapture", { value: () => undefined, configurable: true });
  }
  return { input, hit, onCheckedChange };
}

function pointer(node: HTMLElement, type: string, clientX: number, pointerId = 1): void {
  const event = new Event(type, { bubbles: true, cancelable: true }) as Event & Record<string, unknown>;
  event.pointerId = pointerId;
  event.clientX = clientX;
  event.clientY = HEIGHT / 2;
  event.button = 0;
  act(() => void node.dispatchEvent(event));
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

describe("GlassSwitch accessibility", () => {
  /*
   * The visible control is a stack of canvas and div layers. A real, labelled checkbox
   * behind it is what makes the switch reachable by keyboard and readable to a screen
   * reader at all.
   */
  it("is backed by a labelled checkbox with switch semantics", () => {
    const { input } = render({ checked: true });
    expect(input.getAttribute("role")).toBe("switch");
    expect(input.getAttribute("aria-label")).toBe("Desk lamp");
    expect(input.checked).toBe(true);
  });

  it("reflects the controlled value rather than its own", () => {
    const { input } = render({ checked: false });
    expect(input.checked).toBe(false);
    act(() => root?.render(<GlassSwitch checked refraction={false} onCheckedChange={() => {}} />));
    expect(container?.querySelector<HTMLInputElement>("input")?.checked).toBe(true);
  });

  it("disables the checkbox along with the switch", () => {
    const { input } = render({ disabled: true });
    expect(input.disabled).toBe(true);
  });
});

describe("GlassSwitch keyboard", () => {
  it("toggles on Enter, which a plain checkbox ignores", () => {
    const { input, onCheckedChange } = render({ checked: false });
    act(() => void input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    ));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles on the checkbox's own change, which is what Space produces", () => {
    const { input, onCheckedChange } = render({ checked: false });
    act(() => input.click());
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("ignores keys that are not activations", () => {
    const { input, onCheckedChange } = render();
    act(() => void input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true }),
    ));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});

/*
 * A tap and a drag commit by different routes. The tap leaves the browser's own click
 * on the label to reach the hidden checkbox; the drag decides from the thumb position
 * and suppresses that click so the switch does not toggle twice. jsdom does not
 * synthesise the click, so a tap is a pointer pair followed by the click itself.
 */
describe("GlassSwitch pointer", () => {
  it("lets a tap through to the checkbox, toggling once", () => {
    const { hit, input, onCheckedChange } = render({ checked: false });
    pointer(hit, "pointerdown", 10);
    pointer(hit, "pointerup", 10);
    act(() => input.click());
    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles the other way from on", () => {
    const { hit, input, onCheckedChange } = render({ checked: true });
    pointer(hit, "pointerdown", 10);
    pointer(hit, "pointerup", 10);
    act(() => input.click());
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  /*
   * The first move past the 3px threshold only re-bases the drag origin, so travel
   * needs a second move — the same shape a real pointer stream has.
   */
  it("takes a drag across the track as a switch on", () => {
    const { hit, onCheckedChange } = render({ checked: false });
    pointer(hit, "pointerdown", 5);
    pointer(hit, "pointermove", 20);
    pointer(hit, "pointermove", 20 + WIDTH);
    pointer(hit, "pointerup", 20 + WIDTH);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  /* Dragging back to where it started is a change of mind, not a toggle. */
  it("does not toggle when a drag ends on the side it began", () => {
    const { hit, onCheckedChange } = render({ checked: false });
    pointer(hit, "pointerdown", 5);
    pointer(hit, "pointermove", 20);
    pointer(hit, "pointermove", 20 + WIDTH);
    pointer(hit, "pointermove", 20);
    pointer(hit, "pointerup", 20);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("does nothing while disabled", () => {
    const { hit, onCheckedChange } = render({ disabled: true });
    pointer(hit, "pointerdown", 10);
    pointer(hit, "pointerup", 10);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("ignores a pointer other than the one holding the switch", () => {
    const { hit, onCheckedChange } = render({ checked: false });
    pointer(hit, "pointerdown", 10, 1);
    pointer(hit, "pointerup", 10, 2);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("leaves nothing stuck when the pointer is cancelled", () => {
    const { hit, input, onCheckedChange } = render({ checked: false });
    pointer(hit, "pointerdown", 10);
    pointer(hit, "pointercancel", 10);
    expect(onCheckedChange).not.toHaveBeenCalled();

    // A fresh tap still works, so the drag state really was released.
    pointer(hit, "pointerdown", 10);
    pointer(hit, "pointerup", 10);
    act(() => input.click());
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("commits nothing while the finger is still down", () => {
    const { hit, onCheckedChange } = render({ checked: false });
    pointer(hit, "pointerdown", 10);
    act(() => void vi.advanceTimersByTime(500));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  /*
   * Holding past 170ms enters the "hold" state, which blooms the lens to be looked at
   * rather than to be switched. Releasing from there suppresses the click, so the
   * switch stays where it was.
   */
  it("treats a press and hold as a look, not a toggle", () => {
    const { hit, input, onCheckedChange } = render({ checked: false });
    pointer(hit, "pointerdown", 10);
    act(() => void vi.advanceTimersByTime(500));
    pointer(hit, "pointerup", 10);
    act(() => input.click());
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});

describe("GlassSwitch teardown", () => {
  it("unmounts cleanly mid-drag without leaving timers behind", () => {
    const { hit } = render({ checked: false });
    pointer(hit, "pointerdown", 10);
    expect(() => {
      act(() => root?.unmount());
      root = undefined;
      vi.advanceTimersByTime(2000);
    }).not.toThrow();
  });
});
