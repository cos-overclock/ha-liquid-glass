// @vitest-environment jsdom
import { act } from "./test-act";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useOptimisticRecord, useOptimisticValue } from "./use-optimistic-value";


let root: Root | undefined;
let container: HTMLElement | undefined;

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

describe("useOptimisticValue", () => {
  type Api = ReturnType<typeof useOptimisticValue>;
  let api: Api;

  function Probe({ reported, tolerance = 0.005 }: { reported?: number; tolerance?: number }) {
    api = useOptimisticValue(reported, tolerance);
    return null;
  }

  const render = (reported?: number) => act(() => root?.render(<Probe reported={reported} />));

  it("shows the reported value while nothing is in flight", () => {
    render(0.4);
    expect(api.value).toBe(0.4);
    expect(api.optimistic).toBe(false);
  });

  it("shows the dragged preview above everything else", () => {
    render(0.4);
    act(() => api.setPreview(0.9));
    expect(api.value).toBe(0.9);
    expect(api.optimistic).toBe(true);
  });

  /*
   * The point of the hook: after the finger lifts, the old attribute must not flash
   * back before Home Assistant has answered with the new one.
   */
  it("keeps the committed value until the entity reports it back", () => {
    render(0.4);
    act(() => api.commit(0.8));
    expect(api.value).toBe(0.8);

    render(0.4); // A state push that still carries the old value.
    expect(api.value).toBe(0.8);

    render(0.8);
    expect(api.value).toBe(0.8);
    expect(api.optimistic).toBe(false);
  });

  it("accepts a report within tolerance as the value arriving", () => {
    render(0.4);
    act(() => api.commit(0.8));
    render(0.803);
    expect(api.optimistic).toBe(false);
    expect(api.value).toBe(0.803);
  });

  it("gives up on a value the device never takes", () => {
    render(0.4);
    act(() => api.commit(0.8));
    expect(api.value).toBe(0.8);

    act(() => void vi.advanceTimersByTime(4000));
    expect(api.value).toBe(0.4);
    expect(api.optimistic).toBe(false);
  });

  it("drops preview and hold together on reset", () => {
    render(0.4);
    act(() => api.commit(0.8));
    act(() => api.setPreview(0.9));
    act(() => api.reset());
    expect(api.value).toBe(0.4);
    expect(api.optimistic).toBe(false);
  });
});

describe("useOptimisticRecord", () => {
  type Key = "low" | "high";
  type Api = ReturnType<typeof useOptimisticRecord<Key>>;
  let api: Api;

  function Probe({ reported }: { reported: Partial<Record<Key, number>> }) {
    api = useOptimisticRecord<Key>(reported, 0.25);
    return null;
  }

  const render = (reported: Partial<Record<Key, number>>) =>
    act(() => root?.render(<Probe reported={reported} />));

  it("falls through to the reported value, then to the fallback", () => {
    render({ low: 18 });
    expect(api.value("low", 7)).toBe(18);
    expect(api.value("high", 35)).toBe(35);
  });

  it("holds a sent value over the reported one", () => {
    render({ low: 18 });
    act(() => api.hold("low", 21));
    render({ low: 18 });
    expect(api.value("low", 7)).toBe(21);
  });

  /*
   * A range thermostat answers its two setpoints in separate state pushes, so the hold
   * must survive the first of them.
   */
  it("waits for every held key before releasing", () => {
    render({ low: 18, high: 24 });
    act(() => {
      api.hold("low", 20);
      api.hold("high", 26);
    });

    render({ low: 20, high: 24 });
    expect(api.value("low", 7)).toBe(20);
    expect(api.value("high", 35)).toBe(26);

    render({ low: 20, high: 26 });
    expect(api.pending).toBeUndefined();
  });

  it("gives up on setpoints the thermostat never takes", () => {
    render({ low: 18 });
    act(() => api.hold("low", 21));
    act(() => void vi.advanceTimersByTime(4000));
    expect(api.value("low", 7)).toBe(18);
    expect(api.pending).toBeUndefined();
  });

  it("does not release while a held key is still unreported", () => {
    render({});
    act(() => api.hold("low", 21));
    render({});
    expect(api.value("low", 7)).toBe(21);
  });
});
