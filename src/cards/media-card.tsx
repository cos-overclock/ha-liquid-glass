import { type CSSProperties } from "react";
import { createTranslator } from "../i18n";
import { UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions } from "../react/grid-options";
import {
  glassSurfaceStyles,
  GlassVideoControlLens,
  Icon,
  LiquidGlassSurface,
} from "../react/glass-primitives";
import { GlassSlider, glassSliderStyles } from "../react/glass-slider";
import { useCardHost } from "../react/use-card-host";
import { useVisibleTick } from "../react/use-visible-tick";
import { useOptimisticValue } from "../react/use-optimistic-value";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { clamp, entityName, entityStateText, isUnavailable, moreInfo, pickEntity, supportsFeature } from "../utils";

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

const ownStyles = `
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
  .media-control-glass {
    flex: none;
    border-radius: 50%;
    overflow: hidden;
    background: none;
    box-shadow: none;
  }
  .media-control-glass[data-lg-static-lens=""] {
    background: rgba(255, 255, 255, 0.08);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow:
      0 5px 14px rgba(0, 0, 0, 0.22),
      inset 1px 1px 0 rgba(255, 255, 255, 0.36),
      inset -1px -1px 0 rgba(0, 0, 0, 0.14);
  }
  .more-glass {
    width: 36px;
    height: 36px;
  }
  .more {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: inherit;
    padding: 0;
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--lg-text-primary);
    cursor: pointer;
    --mdc-icon-size: 18px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.32));
    transition: transform 120ms ease;
  }
  .more:active {
    transform: scale(0.9);
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
  .play-glass {
    flex: none;
    width: var(--lg-play, 68px);
    height: var(--lg-play, 68px);
    border-radius: 50%;
    color: var(--lg-text-primary);
  }
  .play {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: inherit;
    --mdc-icon-size: calc(var(--lg-play, 68px) * 0.44);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.32));
  }
  .play-glass.idle {
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
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const open = () => moreInfo(host, config.entity);
  const playing = entity?.state === "playing" || entity?.state === "buffering";
  // Redraws the progress bar each second, but only while the card is on screen.
  useVisibleTick(host, 1000, playing);
  const reportedProgress = entity ? position(entity, playing) : undefined;
  const seekValue = useOptimisticValue(
    reportedProgress ? reportedProgress.pos / reportedProgress.duration : undefined,
    reportedProgress ? Math.max(1 / reportedProgress.duration, 0.005) : 0.005,
  );
  const volumeValue = useOptimisticValue(entity?.attributes.volume_level as number | undefined, 0.005);

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
    void hass?.callService("media_player", service, { entity_id: config.entity, ...data });

  const attributes = entity.attributes;
  const paused = entity.state === "paused";
  const idle = !playing && !paused;
  const sourceColor = config.source_color ?? "#FF375F";
  const art = idle ? undefined : (attributes.entity_picture);
  const title = idle
    ? t("not_playing")
    : (attributes.media_title as string | undefined) ?? name;
  const artistParts = [attributes.media_artist, attributes.media_album_name].filter(Boolean) as string[];
  // Nothing is playing, so the line below the title carries the player's state instead —
  // Home Assistant tells Idle, Standby and Off apart, where the card only had one word.
  const artist = idle
    ? entityStateText(hass, entity, t("standby"))
    : artistParts.join(" — ") || ((attributes.source as string | undefined) ?? "");
  const source = (attributes.app_name as string | undefined) ?? (attributes.source as string | undefined);
  const progress = reportedProgress;
  const seekRatio = seekValue.value ?? 0;
  const elapsed = progress ? seekRatio * progress.duration : 0;
  const remaining = progress ? progress.duration - elapsed : 0;
  const volume = volumeValue.value ?? 0.5;
  const shuffle = Boolean(attributes.shuffle);
  const repeat = (attributes.repeat as string | undefined) ?? "off";
  const canSeek = supportsFeature(entity, F.SEEK) && Boolean(progress) && !idle;
  const showVolume = config.show_volume !== false && supportsFeature(entity, F.VOLUME_SET);

  return <>
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
            ? <div className="source muted-text"><Icon icon="mdi:pause" /><span>{entityStateText(hass, entity, t("paused"))}</span></div>
            : !idle && source
              ? <div className="source"><Icon icon="mdi:waveform" /><span>{source}</span></div>
              : null}
        </div>
        <GlassVideoControlLens
          className="media-control-glass more-glass"
          refraction={refraction}
          frost={5}
        >
          <button className="more" type="button" onClick={open} title="More">
            <Icon icon="mdi:dots-horizontal" />
          </button>
        </GlassVideoControlLens>
      </div>

      <div className={`progress${idle ? " dim" : ""}`}>
        <GlassSlider
          value={idle ? 0.003 : seekRatio}
          min={0}
          max={1}
          step={0}
          disabled={!canSeek}
          refraction={refraction}
          scheme={isDark ? "dark" : "light"}
          label={title}
          onInput={seekValue.setPreview}
          onChange={(next) => {
            seekValue.commit(next);
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
        <GlassVideoControlLens
          className={`media-control-glass play-glass${idle ? " idle" : ""}`}
          refraction={refraction}
          frost={5}
        >
          <button
            className="play"
            type="button"
            title="Play / Pause"
            onClick={() => {
              if (idle && !supportsFeature(entity, F.PLAY)) return;
              call("media_play_pause");
            }}
          >
            <Icon icon={playing ? "mdi:pause" : "mdi:play-outline"} />
          </button>
        </GlassVideoControlLens>
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
          scheme={isDark ? "dark" : "light"}
          label={t("ed_show_volume")}
          onInput={volumeValue.setPreview}
          onChange={(next) => {
            volumeValue.commit(next);
            call("volume_set", { volume_level: Math.round(next * 100) / 100 });
          }}
        />
        <Icon icon="mdi:volume-high" />
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassMediaCard = defineLiquidGlassCard<MediaCardConfig>({
  tagName: "liquid-glass-media-card",
  component: MediaCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, glassSliderStyles, ownStyles],
  getCardSize: () => 4,
  getGridOptions: () => contentGridOptions(6),
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["media_player"], hass, entities, entitiesFallback),
  }),
});
