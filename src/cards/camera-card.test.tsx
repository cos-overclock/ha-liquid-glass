// @vitest-environment jsdom

import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { createStillPainter, LiquidGlassCameraCard, nextStillUrl, type CameraCardConfig } from "./camera-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: CameraCardConfig): void;
  getCardSize(): number;
};


class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = ResizeObserverStub;

function entity(entityId: string, state: string, attributes: HassEntity["attributes"] = {}): HassEntity {
  const stamp = new Date(Date.now() - 120_000).toISOString();
  return { entity_id: entityId, state, attributes, last_changed: stamp, last_updated: stamp };
}

function createHass(states: HassEntity[], callService: HomeAssistant["callService"]): HomeAssistant {
  return {
    states: Object.fromEntries(states.map((item) => [item.entity_id, item])),
    language: "ja",
    locale: { language: "ja" },
    themes: { darkMode: false },
    callService,
    callApi: async <T,>() => undefined as T,
  };
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-camera-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-camera-card")).toBe(LiquidGlassCameraCard);
  });

  it("shows the still, the motion chip and the snapshot service", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const camera = entity("camera.porch", "streaming", {
      friendly_name: "珄関",
      entity_picture: "/api/camera_proxy/camera.porch?token=abc",
    });
    const motion = entity("binary_sensor.porch_motion", "on", {});
    const element = document.createElement("liquid-glass-camera-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-camera-card",
      entity: camera.entity_id,
      motion_entity: motion.entity_id,
      snapshot_service: "camera.snapshot",
    });
    element.hass = createHass([camera, motion], callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector<HTMLImageElement>(".still")?.getAttribute("src")).toContain("/api/camera_proxy/camera.porch");
    expect(root.querySelector(".live-label")?.textContent).toBe("ライブ");
    expect(root.querySelector(".motion")?.textContent).toContain("検知");
    expect(root.querySelectorAll(".lens-control")).toHaveLength(2);
    expect(element.getCardSize()).toBe(5);

    await act(async () => root.querySelector<HTMLElement>(".round.big")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("camera", "snapshot", { entity_id: camera.entity_id });
  });

  it("marks an unavailable camera as offline", async () => {
    const camera = entity("camera.porch", "unavailable", { friendly_name: "珄関" });
    const element = document.createElement("liquid-glass-camera-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-camera-card", entity: camera.entity_id });
    element.hass = createHass([camera], async () => undefined);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".card")?.classList.contains("offline")).toBe(true);
    expect(root.querySelector(".nosignal")).toBeTruthy();
    expect(root.querySelector(".still")).toBeNull();
  });

  /*
   * The still used to be a CSS background *and* a `new Image()` with
   * `crossOrigin`. Those are no-cors and cors requests for the same URL, which the
   * HTTP cache keeps apart, so every refresh pulled the camera down twice.
   */
  it("loads each still exactly once, in the mode the lens needs", async () => {
    const camera = entity("camera.porch", "idle", {
      friendly_name: "玄関",
      entity_picture: "/api/camera_proxy/camera.porch?token=abc",
    });
    const element = document.createElement("liquid-glass-camera-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-camera-card",
      entity: camera.entity_id,
      refraction: true,
    });
    element.hass = createHass([camera], async () => undefined);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;

    const stills = root.querySelectorAll<HTMLImageElement>(".still");
    expect(stills).toHaveLength(1);
    expect(stills[0].crossOrigin).toBe("anonymous");
    // No second, background-image copy of the same frame.
    expect(root.querySelector<HTMLElement>(".feed")?.style.backgroundImage).toBe("");
  });

  it("keeps the still out of cors mode when nothing reads its pixels", async () => {
    const camera = entity("camera.porch", "idle", {
      friendly_name: "玄関",
      entity_picture: "/api/camera_proxy/camera.porch?token=abc",
    });
    const element = document.createElement("liquid-glass-camera-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-camera-card",
      entity: camera.entity_id,
      refraction: false,
    });
    element.hass = createHass([camera], async () => undefined);

    await act(async () => document.body.append(element));
    const still = element.shadowRoot!.querySelector<HTMLImageElement>(".still");
    expect(still).toBeTruthy();
    expect(still?.crossOrigin).toBeNull();
  });

  it("keeps the decoded frame visible until the refreshed still has loaded", async () => {
    vi.useFakeTimers();
    try {
      const camera = entity("camera.porch", "idle", {
        friendly_name: "玄関",
        entity_picture: "/api/camera_proxy/camera.porch?token=abc",
      });
      const element = document.createElement("liquid-glass-camera-card") as CardElement;
      element.setConfig({
        type: "custom:liquid-glass-camera-card",
        entity: camera.entity_id,
        refraction: true,
        refresh_interval: 1,
      });
      element.hass = createHass([camera], async () => undefined);

      await act(async () => document.body.append(element));
      const root = element.shadowRoot!;
      const first = root.querySelector<HTMLImageElement>(".still")!;
      expect(first.classList.contains("staging")).toBe(true);

      await act(async () => first.dispatchEvent(new Event("load")));
      expect(first.classList.contains("staging")).toBe(false);
      const firstUrl = first.getAttribute("src");

      await act(async () => vi.advanceTimersByTime(1_000));
      const pending = [...root.querySelectorAll<HTMLImageElement>(".still")]
        .find((image) => image !== first)!;
      expect(first.classList.contains("staging")).toBe(false);
      expect(pending.classList.contains("staging")).toBe(true);
      expect(pending.getAttribute("src")).not.toBe(firstUrl);

      await act(async () => pending.dispatchEvent(new Event("load")));
      expect(first.classList.contains("staging")).toBe(true);
      expect(pending.classList.contains("staging")).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("createStillPainter", () => {
  /** jsdom has no 2D backend, so both canvases are recording stubs. */
  function surface(width: number, height: number) {
    const calls: string[] = [];
    const canvas = { width, height } as HTMLCanvasElement;
    const context = {
      canvas,
      clearRect: () => calls.push("clear"),
      drawImage: (source: unknown) => calls.push(source === canvas ? "self" : "draw"),
    } as unknown as CanvasRenderingContext2D;
    return { calls, canvas, context };
  }
  function bufferStub() {
    const scales: string[] = [];
    const canvas = {
      width: 0,
      height: 0,
      getContext: () => ({
        drawImage: (_i: unknown, _sx: number, _sy: number, _sw: number, _sh: number, _dx: number, _dy: number, w: number, h: number) =>
          scales.push(`${w}x${h}`),
      }),
    };
    return { scales, buffer: canvas as unknown as HTMLCanvasElement };
  }
  const still = { naturalWidth: 1280, naturalHeight: 720 } as HTMLImageElement;

  it("rescales once per frame of footage but blits on every animation frame", () => {
    const { scales, buffer } = bufferStub();
    const target = surface(320, 180);
    let frame = { image: still as HTMLImageElement | undefined, generation: 1 };
    const paint = createStillPainter(() => frame, buffer);

    paint(target.context);
    paint(target.context);
    paint(target.context);
    // The costly rescale ran once; the surface was painted all three times, because an
    // empty surface makes the lens paint opaque black discs over the controls.
    expect(scales).toEqual(["320x180"]);
    expect(target.calls).toEqual(["draw", "draw", "draw"]);

    frame = { image: still, generation: 2 };
    paint(target.context);
    expect(scales).toEqual(["320x180", "320x180"]);
    expect(target.calls).toHaveLength(4);
  });

  it("rescales again when Glass hands over a resized surface", () => {
    const { scales, buffer } = bufferStub();
    const target = surface(320, 180);
    const paint = createStillPainter(() => ({ image: still, generation: 1 }), buffer);

    paint(target.context);
    target.canvas.width = 480;
    target.canvas.height = 270;
    paint(target.context);
    expect(scales).toEqual(["320x180", "480x270"]);
  });

  it("keeps painting the last scaled frame while the next still decodes", () => {
    const { scales, buffer } = bufferStub();
    const target = surface(320, 180);
    let frame = { image: still as HTMLImageElement | undefined, generation: 1 };
    const paint = createStillPainter(() => frame, buffer);
    paint(target.context);

    // A promoted frame whose image is not decodable yet must not blank the surface.
    frame = { image: { naturalWidth: 0, naturalHeight: 0 } as HTMLImageElement, generation: 2 };
    paint(target.context);
    expect(scales).toEqual(["320x180"]);
    expect(target.calls).toEqual(["draw", "draw"]);
  });

  it("paints nothing before the first still has decoded", () => {
    const { scales, buffer } = bufferStub();
    const target = surface(320, 180);
    const paint = createStillPainter(() => ({ image: undefined, generation: 1 }), buffer);
    paint(target.context);
    expect(scales).toEqual([]);
    expect(target.calls).toEqual([]);
  });
});

describe("nextStillUrl", () => {
  const token = (n: number) => `/api/camera_proxy/camera.porch?token=t${n}`;

  it("pulls the camera once per tick, whatever the token does in between", () => {
    let request = nextStillUrl({ tick: -1, url: undefined }, token(1), 0);
    expect(request.url).toBe(`${token(1)}&_=0`);

    // Home Assistant rotates the signing token on its own schedule. Between ticks that
    // must not start a second fetch — the identical object is what keeps the <img> put.
    expect(nextStillUrl(request, token(2), 0)).toBe(request);
    expect(nextStillUrl(request, token(2), 0)).toBe(request);

    // The next scheduled refresh is what picks the rotated token up.
    request = nextStillUrl(request, token(2), 1);
    expect(request.url).toBe(`${token(2)}&_=1`);
  });

  it("does not wait for a tick to drop or restore the still", () => {
    const request = nextStillUrl({ tick: -1, url: undefined }, token(1), 4);
    const offline = nextStillUrl(request, undefined, 4);
    expect(offline.url).toBeUndefined();
    expect(nextStillUrl(offline, undefined, 4)).toBe(offline);

    const back = nextStillUrl(offline, token(3), 4);
    expect(back.url).toBe(`${token(3)}&_=4`);
  });

  it("separates the tick with a question mark when the picture carries no query", () => {
    expect(nextStillUrl({ tick: -1, url: undefined }, "/local/porch.jpg", 2).url)
      .toBe("/local/porch.jpg?_=2");
  });
});
