import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DEFAULT_LIGHT_FAVORITES } from "../card-constants";
import { createTranslator } from "../i18n";
import { CardTitle, IconWell, UnavailableCard, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { GlassSlider, glassSliderStyles } from "../react/glass-slider";
import { GlassSwitch, glassSwitchStyles } from "../react/glass-switch";
import { useCardHost } from "../react/use-card-host";
import { useOptimisticValue } from "../react/use-optimistic-value";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { callConfiguredService, clamp, entityName, hsToRgb, isUnavailable, moreInfo, pickEntity, rgbToHex, withAlpha } from "../utils";

export interface LightPreset {
  name: string;
  icon?: string;
  scene?: string;
  brightness?: number;
  color_temp_kelvin?: number;
  rgb_color?: [number, number, number];
  hs_color?: [number, number];
  service?: string;
  data?: Record<string, unknown>;
}

export interface LightCardConfig extends BaseCardConfig {
  presets?: LightPreset[];
  favorites?: string[] | false;
  show_brightness?: boolean;
  show_color_temp?: boolean;
  show_color?: boolean;
}

export const DEFAULT_FAVORITES = DEFAULT_LIGHT_FAVORITES;

type ColorUiMode = "color" | "color_temp";

const ownStyles = `
  /* Brightness keeps its two lamps beside the bar, where a thin slider leaves room. */
  .brightness .bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .brightness .bar-row .lg-react-slider {
    flex: 1;
    min-width: 0;
  }
  .brightness .sun {
    flex: none;
    display: grid;
    color: var(--sun-color, #6b5323);
    --mdc-icon-size: 24px;
  }
  .brightness .sun-dim {
    flex: none;
    display: grid;
    color: var(--lg-text-secondary);
    --mdc-icon-size: 22px;
  }
  .temp .lg-react-slider {
    --lg-slider-track: linear-gradient(90deg, #ffa63d 0%, #ffd9a0 40%, #fff7ec 65%, #bfdbff 100%);
  }
  .hue .lg-react-slider {
    --lg-slider-track: linear-gradient(
      90deg,
      #ff3b30 0%,
      #ffcc00 17%,
      #34c759 33%,
      #32ade6 50%,
      #007aff 62%,
      #af52de 78%,
      #ff2d55 92%,
      #ff3b30 100%
    );
  }
  .sat .lg-react-slider {
    --lg-slider-track: linear-gradient(90deg, #ffffff, var(--sat-color, #b15cff));
  }
  .favorites {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .favorites .label {
    font-size: var(--lg-label);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .swatches {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
  }
  .swatch {
    flex: none;
    width: var(--lg-swatch, 32px);
    height: var(--lg-swatch, 32px);
    border: 0;
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    background: var(--swatch);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.4),
      0 2px 3px rgba(255, 255, 255, 0.55),
      0 -2px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .swatch.selected {
    box-shadow:
      inset 0 0 0 3px #fff,
      0 0 0 2px var(--swatch-glow),
      0 4px 10px var(--swatch-glow);
  }
  .swatch:active {
    transform: scale(0.92);
  }
  .swatch.add {
    background: var(--lg-track-bg);
    color: var(--lg-text-secondary);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    display: grid;
    place-items: center;
    --mdc-icon-size: calc(var(--lg-swatch, 32px) * 0.5);
  }
  .chip-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 14px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: var(--lg-tick);
    font-weight: 500;
    cursor: pointer;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-swatch: clamp(24px, 8.4cqi, 32px);
    }
  }
`;

function hexToRgbTuple(hex: string): [number, number, number] {
  const value = parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((part) => clamp(part, 0, 255)) as [number, number, number];
}

/**
 * Covers both the "Light Card" (brightness + colour temperature + presets) and the
 * "Light Card RGB" (mode segment + hue / saturation + favourites) designs; the sections
 * shown are derived from the entity's supported_color_modes.
 */
function LightCard({ config, hass, host }: ReactCardProps<LightCardConfig>) {
  const { isDark, refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [uiMode, setUiMode] = useState<ColorUiMode>();
  const lastBrightness = useRef<number | undefined>(undefined);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  const on = entity?.state === "on";
  const rawBrightness = entity?.attributes.brightness as number | undefined;
  const rawHs = entity?.attributes.hs_color as [number, number] | undefined;
  const brightnessValue = useOptimisticValue(
    on && rawBrightness !== undefined ? Math.round((rawBrightness / 255) * 100) : 0,
    1,
  );
  const kelvinValue = useOptimisticValue(entity?.attributes.color_temp_kelvin as number | undefined, 25);
  const hueValue = useOptimisticValue(rawHs?.[0], 1);
  const saturationValue = useOptimisticValue(rawHs?.[1], 1);

  useEffect(() => {
    if (on && rawBrightness !== undefined) lastBrightness.current = Math.round((rawBrightness / 255) * 100);
  }, [on, rawBrightness]);

  if (!entity || isUnavailable(entity)) {
    return <>
      <UnavailableCard
        refraction={refraction}
        variant={config.glass_variant}
        icon={config.icon}
        name={name}
        label={t("unavailable")}
        onOpen={open}
      />
    </>;
  }

  const call = (service: string, data?: Record<string, unknown>) =>
    void hass?.callService("light", service, { entity_id: config.entity, ...data });
  const attributes = entity.attributes;
  const modes = (attributes.supported_color_modes as string[] | undefined) ?? [];
  const supportsBrightness = config.show_brightness !== false && modes.some((mode) => mode !== "onoff");
  const supportsColorTemp = config.show_color_temp !== false && modes.includes("color_temp");
  const supportsColor = config.show_color !== false && modes.some((mode) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(mode));
  const mode: ColorUiMode = uiMode
    ?? (!supportsColor ? "color_temp" : !supportsColorTemp ? "color" : attributes.color_mode === "color_temp" ? "color_temp" : "color");
  const colorLike = supportsColor && mode === "color";

  const brightnessPct = brightnessValue.value ?? 0;
  const kelvinRange: [number, number] = [
    (attributes.min_color_temp_kelvin as number | undefined) ?? 2000,
    (attributes.max_color_temp_kelvin as number | undefined) ?? 6500,
  ];
  const kelvin = kelvinValue.value ?? kelvinRange[0];
  const baseHs = (attributes.hs_color as [number, number] | undefined) ?? [280, 85];
  const hue = hueValue.value ?? baseHs[0];
  const sat = saturationValue.value ?? baseHs[1];
  const rgb = attributes.rgb_color as [number, number, number] | undefined;
  const colorHex = !hueValue.optimistic && !saturationValue.optimistic && rgb
    ? rgbToHex(rgb)
    : rgbToHex(hsToRgb(hue, sat));
  const accent = colorLike ? colorHex : "var(--lg-accent)";
  const well: WellStyle | undefined = !on
    ? undefined
    : colorLike
      ? { from: rgbToHex(hsToRgb(hue, Math.min(sat, 60))), to: colorHex, glow: withAlpha(colorHex, 0.24) }
      : { from: "#FFD36B", to: "var(--lg-accent-deep)", glow: "rgba(255, 165, 48, 0.24)" };
  const fillFrom = colorLike ? rgbToHex(hsToRgb(hue, Math.min(sat, 10))) : "#FFF8EA";
  const fillTo = colorLike ? rgbToHex(hsToRgb(hue, Math.min(sat, 30))) : "#FFE2A6";
  const sunColor = colorLike ? rgbToHex(hsToRgb(hue, 60).map((part) => part * 0.5)) : "#6B5323";
  const presets = config.presets ?? [];
  const favorites = config.favorites === false ? [] : config.favorites ?? DEFAULT_FAVORITES;

  const state = !on
    ? lastBrightness.current
      ? `${t("unlit")} · ${t("last")} ${lastBrightness.current}%`
      : t("unlit")
    : [
        t("lit"),
        ...(supportsBrightness ? [`${brightnessPct}%`] : []),
        ...(colorLike ? [t("color")] : supportsColorTemp && attributes.color_temp_kelvin ? [`${Math.round(kelvin)}K`] : []),
      ].join(" · ");

  const toggle = () => call("toggle");
  const applyPreset = (preset: LightPreset) => {
    if (preset.scene) {
      void hass?.callService("scene", "turn_on", { entity_id: preset.scene });
      return;
    }
    if (preset.service) {
      callConfiguredService(hass, preset.service, {
        entity_id: config.entity,
        ...(preset.data ?? {}),
      });
      return;
    }
    const data: Record<string, unknown> = { ...(preset.data ?? {}) };
    if (preset.brightness !== undefined) data.brightness_pct = preset.brightness;
    if (preset.color_temp_kelvin !== undefined) data.color_temp_kelvin = preset.color_temp_kelvin;
    if (preset.rgb_color) data.rgb_color = preset.rgb_color;
    if (preset.hs_color) data.hs_color = preset.hs_color;
    call("turn_on", data);
  };
  return <>
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={colorLike ? colorHex : undefined}
      style={{ display: "flex", position: "relative" }}
    >
      <div className="header">
        <IconWell icon={config.icon ?? (attributes.icon) ?? "mdi:lightbulb"} style={well} onClick={toggle} />
        <CardTitle name={name} state={state} onClick={open} />
        <GlassSwitch
          checked={on}
          onCheckedChange={toggle}
          ariaLabel={name}
          activeColor={accent}
          refraction={refraction}
          scheme={isDark ? "dark" : "light"}
        />
      </div>

      {supportsColor && supportsColorTemp && <div className="segment">
        {(["color", "color_temp"] as ColorUiMode[]).map((option) => (
          <button
            key={option}
            className={mode === option ? "selected" : undefined}
            onClick={() => setUiMode(option)}
          >
            <span>{t(option === "color" ? "color" : "color_temp")}</span>
          </button>
        ))}
      </div>}

      {supportsBrightness && <div
        className="section brightness"
        style={{ "--fill-from": fillFrom, "--fill-to": fillTo, "--sun-color": on ? sunColor : "var(--lg-text-secondary)" } as CSSProperties}
      >
        <div className="label-row">
          <span className="label">{t("brightness")}</span>
          <span className="value">{brightnessPct}%</span>
        </div>
        <div className="bar-row">
          <span className="sun"><Icon icon="mdi:white-balance-sunny" /></span>
          <GlassSlider
            value={brightnessPct}
            min={0}
            max={100}
            step={1}
            showFill={on}
            refraction={refraction}
            scheme={isDark ? "dark" : "light"}
            label={t("brightness")}
            onInput={brightnessValue.setPreview}
            onChange={(next) => {
              brightnessValue.commit(next);
              call("turn_on", { brightness_pct: Math.round(next) });
            }}
          />
          <span className="sun-dim"><Icon icon="mdi:brightness-5" /></span>
        </div>
      </div>}

      {supportsColorTemp && mode === "color_temp" && <div className={`section temp${on ? "" : " dim"}`}>
        <div className="label-row">
          <span className="label">{t("color_temp")}</span>
          <span className="value">{Math.round(kelvin)}K</span>
        </div>
        <GlassSlider
          value={kelvin}
          min={kelvinRange[0]}
          max={kelvinRange[1]}
          step={50}
          showFill={false}
          refraction={refraction}
          scheme={isDark ? "dark" : "light"}
          label={t("color_temp")}
          onInput={kelvinValue.setPreview}
          onChange={(next) => {
            kelvinValue.commit(next);
            call("turn_on", { color_temp_kelvin: Math.round(next) });
          }}
        />
        <div className="ticks"><span>{kelvinRange[0]}K</span><span>{kelvinRange[1]}K</span></div>
      </div>}

      {supportsColor && mode === "color" && <>
        <div className={`section hue${on ? "" : " dim"}`}>
          <div className="label-row">
            <span className="label">{t("hue")}</span>
            <span className="value">{Math.round(hue)}°</span>
          </div>
          <GlassSlider
            value={hue}
            min={0}
            max={360}
            step={1}
            showFill={false}
            refraction={refraction}
            scheme={isDark ? "dark" : "light"}
            label={t("hue")}
            onInput={hueValue.setPreview}
            onChange={(next) => {
              hueValue.commit(next);
              call("turn_on", { hs_color: [Math.round(next), Math.round(sat)] });
            }}
          />
        </div>

        <div
          className={`section sat${on ? "" : " dim"}`}
          style={{ "--sat-color": rgbToHex(hsToRgb(hue, 100)) } as CSSProperties}
        >
          <div className="label-row">
            <span className="label">{t("saturation")}</span>
            <span className="value">{Math.round(sat)}%</span>
          </div>
          <GlassSlider
            value={sat}
            min={0}
            max={100}
            step={1}
            showFill={false}
            refraction={refraction}
            scheme={isDark ? "dark" : "light"}
            label={t("saturation")}
            onInput={saturationValue.setPreview}
            onChange={(next) => {
              saturationValue.commit(next);
              call("turn_on", { hs_color: [Math.round(hue), Math.round(next)] });
            }}
          />
        </div>

        {favorites.length > 0 && <div className={`favorites${on ? "" : " muted"}`}>
          <div className="label">{t("favorites")}</div>
          <div className="swatches">
            {favorites.map((hex) => (
              <button
                key={hex}
                className={`swatch${on && hex.toLowerCase() === colorHex.toLowerCase() ? " selected" : ""}`}
                style={{ "--swatch": hex, "--swatch-glow": withAlpha(hex, 0.5) } as CSSProperties}
                title={hex}
                onClick={() => applyPreset({ name: hex, rgb_color: hexToRgbTuple(hex) })}
              />
            ))}
            <button className="swatch add" onClick={open} title="More"><Icon icon="mdi:plus" /></button>
          </div>
        </div>}
      </>}

      {presets.length > 0 && <div className={`chips${on ? "" : " muted"}`}>
        {presets.map((preset, index) => (
          <LiquidGlassSurface
            key={`${preset.name}:${index}`}
            className="chip"
            refraction={refraction}
            variant={config.glass_variant}
            surface="compact"
            sourceAccent={accent}
            style={{ display: "flex" }}
          >
            <button className="chip-button" onClick={() => applyPreset(preset)}>
              {preset.icon && <Icon icon={preset.icon} />}
              <span>{preset.name}</span>
            </button>
          </LiquidGlassSurface>
        ))}
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassLightCard = defineLiquidGlassCard<LightCardConfig>({
  tagName: "liquid-glass-light-card",
  component: LightCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, glassSliderStyles, glassSwitchStyles, ownStyles],
  getCardSize: () => 5,
  getGridOptions: () => contentGridOptions(6),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(
      ["light"],
      hass,
      entities,
      entitiesFallback,
      (entity) => ((entity.attributes.supported_color_modes as string[] | undefined) ?? []).some((mode) => mode !== "onoff"),
    ),
  }),
});
