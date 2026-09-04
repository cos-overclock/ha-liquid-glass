import { useEffect, useState, type CSSProperties } from "react";
import { loadHaFormComponents } from "../editor/load";
import { createTranslator } from "../i18n";
import { CardTitle, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineReactCard, type ReactCardProps } from "../react/define-react-card";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { GlassSlider, glassSliderStyles } from "../react/glass-slider";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { clamp, friendlyName, isUnavailable, moreInfo, pickEntity, supportsFeature } from "../utils";
import "../components/lg-icon";

export interface MediaCardConfig extends BaseCardConfig {
  /** Color for the source / app line (default Apple Music pink). */
  source_color?: string;
  show_volume?: boolean;
  show_device?: boolean;
}

const F = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  PREVIOUS: 16,
  NEXT: 32,
  PLAY: 16384,
  SHUFFLE: 32768,
  REPEAT: 262144,
};

function fmtTime(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const rest = total % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`
    : `${minutes}:${String(rest).padStart(2, "0")}`;
}

const styles = `${tokens.cssText}${reactCardStyles}${glassSurfaceStyles}${glassSliderStyles}
  .card {
    gap: 16px;
  }
  .device {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--lg-text-secondary);
    --mdc-icon-size: 14px;
    cursor: pointer;
  }
  .art {
    flex: none;
    width: var(--lg-art, 72px);
    height: var(--lg-art, 72px);
    border-radius: 20px;
    overflow: hidden;
    background: var(--lg-track-bg);
    background-size: cover;
    background-position: center;
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    display: grid;
    place-items: center;
    color: var(--lg-text-secondary);
    --mdc-icon-size: 28px;
  }
  .art.idle {
    box-shadow:
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .title {
    gap: 3px;
  }
  .source {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    color: var(--source-color);
    --mdc-icon-size: 12px;
  }
  .source.muted-text {
    color: var(--lg-text-secondary);
  }
  .more {
    flex: none;
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 18px;
    padding: 0;
    display: grid;
    place-items: center;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    cursor: pointer;
    --mdc-icon-size: 18px;
  }
  .progress {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  /* Playback bars carry no accent of their own, so they fill in the text colour. */
  .progress .lg-react-slider,
  .volume .lg-react-slider {
    --lg-slider-fill: color-mix(in srgb, var(--lg-text-primary) 82%, transparent);
    --fill-from: color-mix(in srgb, var(--lg-text-primary) 70%, transparent);
    --fill-to: color-mix(in srgb, var(--lg-text-primary) 82%, transparent);
  }
  /* The seek bar uses a compact instance of the same glass slider as volume. */
  .progress .lg-react-slider {
    --lg-slider-height: 14px;
    --lg-slider-bar-height: 6px;
    --lg-slider-knob-size: 18px;
    --lg-slider-thumb-height: 26px;
  }
  .times {
    display: flex;
    justify-content: space-between;
    font-family: var(--lg-font-ui);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: -0.2px;
    color: var(--lg-text-secondary);
    font-variant-numeric: tabular-nums;
  }
  .transport {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
  }
  .transport button {
    border: 0;
    background: transparent;
    padding: 0;
    color: var(--lg-text-primary);
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: opacity 0.2s ease, transform 0.1s ease;
  }
  .transport button:active {
    transform: scale(0.94);
  }
  .transport button:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .transport .aux {
    color: var(--lg-text-secondary);
    --mdc-icon-size: var(--lg-aux, 20px);
  }
  .transport .aux.on {
    color: var(--source-color);
  }
  .transport .skip {
    --mdc-icon-size: var(--lg-skip, 32px);
  }
  .play {
    flex: none;
    width: var(--lg-play, 68px);
    height: var(--lg-play, 68px);
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: var(--lg-text-primary);
    --mdc-icon-size: calc(var(--lg-play, 68px) * 0.44);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.22),
      inset 0 0 0 1.5px rgba(255, 255, 255, 0.6);
  }
  .play.idle {
    color: var(--lg-text-secondary);
  }
  .volume {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--lg-text-secondary);
    --mdc-icon-size: 20px;
  }
  .volume .lg-react-slider {
    flex: 1;
    --lg-slider-height: 26px;
    --lg-slider-bar-height: 6px;
    --lg-slider-knob-size: 20px;
    --lg-slider-thumb-height: 30px;
  }
  .dim,
  .fade {
    opacity: 0.4;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-art: clamp(48px, 19cqi, 72px);
      --lg-play: clamp(48px, 18cqi, 68px);
      --lg-skip: clamp(24px, 8.4cqi, 32px);
      --lg-aux: clamp(17px, 5.3cqi, 20px);
    }
  }
  @container (max-width: 250px) {
    .transport {
      padding: 0;
    }
  }
`;

/** Where playback has reached, advanced locally between state updates. */
function position(entity: HassEntity, playing: boolean): { pos: number; duration: number } | undefined {
  const attributes = entity.attributes;
  const duration = attributes.media_duration as number | undefined;
  let pos = attributes.media_position as number | undefined;
  if (!duration || pos === undefined) return undefined;
  if (playing && attributes.media_position_updated_at) {
    pos += (Date.now() - new Date(attributes.media_position_updated_at as string).getTime()) / 1000;
  }
  return { pos: clamp(pos, 0, duration), duration };
}

/**
 * Album art, title / artist / source, seekable progress, transport controls with a
 * liquid-glass play button, and a volume slider.
 */
function MediaCard({ config, hass, host }: ReactCardProps<MediaCardConfig>) {
  const { isDark, refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [, setTick] = useState(0);
  const [seekPreview, setSeekPreview] = useState<number>();
  const [volumePreview, setVolumePreview] = useState<number>();
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = config.name ?? friendlyName(entity, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  const playing = entity?.state === "playing" || entity?.state === "buffering";

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  if (!entity || isUnavailable(entity)) {
    return <>
      <style>{styles}</style>
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
    void hass?.callService("media_player", service, { entity_id: config.entity, ...data });

  const attributes = entity.attributes;
  const paused = entity.state === "paused";
  const idle = !playing && !paused;
  const sourceColor = config.source_color ?? "#FF375F";
  const art = idle ? undefined : (attributes.entity_picture as string | undefined);
  const title = idle
    ? t("not_playing")
    : (attributes.media_title as string | undefined) ?? (attributes.friendly_name as string | undefined) ?? "";
  const artistParts = [attributes.media_artist, attributes.media_album_name].filter(Boolean) as string[];
  const artist = idle ? t("standby") : artistParts.join(" — ") || ((attributes.source as string | undefined) ?? "");
  const source = (attributes.app_name as string | undefined) ?? (attributes.source as string | undefined);
  const progress = position(entity, playing);
  const seekRatio = seekPreview ?? (progress ? progress.pos / progress.duration : 0);
  const elapsed = progress ? (seekPreview !== undefined ? seekPreview * progress.duration : progress.pos) : 0;
  const remaining = progress ? progress.duration - elapsed : 0;
  const volume = volumePreview ?? ((attributes.volume_level as number | undefined) ?? 0.5);
  const shuffle = Boolean(attributes.shuffle);
  const repeat = (attributes.repeat as string | undefined) ?? "off";
  const canSeek = supportsFeature(entity, F.SEEK) && Boolean(progress) && !idle;
  const showVolume = config.show_volume !== false && supportsFeature(entity, F.VOLUME_SET);

  return <>
    <style>{styles}</style>
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={sourceColor}
      style={{ display: "flex", position: "relative", "--source-color": sourceColor } as CSSProperties}
    >
      {config.show_device !== false && <div className="device" onClick={open}>
        <Icon icon="mdi:speaker" />
        <span>{name}</span>
      </div>}

      <div className="header">
        <div
          className={`art${art ? "" : " idle"}`}
          style={art ? { backgroundImage: `url("${art}")` } : undefined}
          onClick={open}
        >
          {!art && <Icon icon="mdi:music" />}
        </div>
        <div className="title" onClick={open}>
          <div className="name">{title}</div>
          <div className="state">{artist}</div>
          {paused
            ? <div className="source muted-text"><Icon icon="mdi:pause" /><span>{t("paused")}</span></div>
            : !idle && source
              ? <div className="source"><Icon icon="mdi:waveform" /><span>{source}</span></div>
              : null}
        </div>
        <button className="more" onClick={open} title="More"><Icon icon="mdi:dots-horizontal" /></button>
      </div>

      <div className={`progress${idle ? " dim" : ""}`}>
        <GlassSlider
          value={idle ? 0.003 : seekRatio}
          min={0}
          max={1}
          step={0}
          disabled={!canSeek}
          refraction={refraction}
          glassVariant={config.glass_variant}
          scheme={isDark ? "dark" : "light"}
          label={title}
          onInput={setSeekPreview}
          onChange={(next) => {
            setSeekPreview(undefined);
            if (progress) call("media_seek", { seek_position: Math.round(next * progress.duration) });
          }}
        />
        <div className="times">
          <span>{progress ? fmtTime(elapsed) : "0:00"}</span>
          <span>−{progress ? fmtTime(remaining) : "0:00"}</span>
        </div>
      </div>

      <div className="transport">
        <button
          className={`aux${shuffle ? " on" : ""}${idle ? " fade" : ""}`}
          disabled={!supportsFeature(entity, F.SHUFFLE)}
          onClick={() => call("shuffle_set", { shuffle: !shuffle })}
          title="Shuffle"
        >
          <Icon icon="mdi:shuffle-variant" />
        </button>
        <button
          className={`skip${idle ? " fade" : ""}`}
          disabled={!supportsFeature(entity, F.PREVIOUS)}
          onClick={() => call("media_previous_track")}
          title="Previous"
        >
          <Icon icon="mdi:skip-previous-outline" />
        </button>
        <LiquidGlassSurface
          className={`play${idle ? " idle" : ""}`}
          refraction={refraction}
          variant={config.glass_variant}
          surface="control"
          sourceAccent={sourceColor}
          style={{ display: "grid" }}
          role="button"
          title="Play / Pause"
          onClick={() => {
            if (idle && !supportsFeature(entity, F.PLAY)) return;
            call("media_play_pause");
          }}
        >
          <Icon icon={playing ? "mdi:pause" : "mdi:play-outline"} />
        </LiquidGlassSurface>
        <button
          className={`skip${idle ? " fade" : ""}`}
          disabled={!supportsFeature(entity, F.NEXT)}
          onClick={() => call("media_next_track")}
          title="Next"
        >
          <Icon icon="mdi:skip-next-outline" />
        </button>
        <button
          className={`aux${repeat !== "off" ? " on" : ""}${idle ? " fade" : ""}`}
          disabled={!supportsFeature(entity, F.REPEAT)}
          onClick={() => call("repeat_set", { repeat: repeat === "off" ? "all" : repeat === "all" ? "one" : "off" })}
          title="Repeat"
        >
          <Icon icon={repeat === "one" ? "mdi:repeat-once" : "mdi:repeat"} />
        </button>
      </div>

      {showVolume && <div className="volume">
        <Icon icon="mdi:volume-low" />
        <GlassSlider
          value={volume}
          min={0}
          max={1}
          step={0.01}
          refraction={refraction}
          glassVariant={config.glass_variant}
          scheme={isDark ? "dark" : "light"}
          label={t("ed_show_volume")}
          onInput={setVolumePreview}
          onChange={(next) => {
            setVolumePreview(undefined);
            call("volume_set", { volume_level: Math.round(next * 100) / 100 });
          }}
        />
        <Icon icon="mdi:volume-high" />
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassMediaCard = defineReactCard<MediaCardConfig>({
  tagName: "liquid-glass-media-card",
  component: MediaCard,
  normalizeConfig: (config) => ({ refraction: "auto", theme: "auto", ...config }),
  getCardSize: () => 4,
  getConfigElement: async () => {
    await loadHaFormComponents();
    return document.createElement("liquid-glass-card-editor");
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["media_player"], hass, entities, entitiesFallback),
  }),
});
