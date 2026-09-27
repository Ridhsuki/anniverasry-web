// ─────────────────────────────────────────────────────────────
// Scene Audio Mapping & Architecture Configuration
// Connects each story scene to registered soundtrack identifiers,
// crossfade timing, volume multipliers, and interactive SFX triggers.
// (Architecture only — audio assets configured in src/constants/audio.ts)
// ─────────────────────────────────────────────────────────────

import type { CanonicalSceneName, SceneAudioConfig } from "@/types/scenes";

/**
 * Scene-to-Soundtrack Mapping Specification
 * Governs automatic audio state transitions when scenes change.
 */
export const SCENE_AUDIO_MAPPING: Record<CanonicalSceneName, SceneAudioConfig> = {
  intro: {
    soundtrackId: "soundtrack-prologue",
    sfxOnEnterId: "sfx-envelope-shimmer",
    crossfadeDurationMs: 1800,
    volumeMultiplier: 0.7,
  },
  selection: {
    soundtrackId: "soundtrack-selection",
    sfxOnEnterId: "sfx-card-flip",
    crossfadeDurationMs: 1400,
    volumeMultiplier: 0.65,
  },
  journey: {
    soundtrackId: "soundtrack-journey",
    sfxOnEnterId: "sfx-musicbox-chime",
    crossfadeDurationMs: 1600,
    volumeMultiplier: 0.75,
  },
  gallery: {
    soundtrackId: "soundtrack-gallery",
    sfxOnEnterId: "sfx-polaroid-place",
    crossfadeDurationMs: 1500,
    volumeMultiplier: 0.7,
  },
  playlist: {
    soundtrackId: "soundtrack-vinyl",
    sfxOnEnterId: "sfx-needle-drop",
    crossfadeDurationMs: 1200,
    volumeMultiplier: 0.85,
  },
  gift: {
    soundtrackId: "soundtrack-gift-anticipation",
    sfxOnEnterId: "sfx-wax-crack",
    crossfadeDurationMs: 1500,
    volumeMultiplier: 0.8,
  },
  "final-letter": {
    soundtrackId: "soundtrack-final-letter",
    sfxOnEnterId: "sfx-parchment-unfold",
    crossfadeDurationMs: 2200,
    volumeMultiplier: 0.9,
  },
};

/** Default audio system thresholds */
export const AUDIO_DEFAULTS = {
  defaultMasterVolume: 0.7,
  defaultCrossfadeDurationMs: 1500,
  minVolume: 0.0,
  maxVolume: 1.0,
  fadeDurationMs: 1200,
} as const;

/**
 * Volume Control Interface Specification
 * Standard contract for audio controllers and scene synchronization hooks.
 */
export interface SceneAudioController {
  currentTrackId: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  setVolume: (level: number) => void;
  toggleMute: () => void;
  syncSceneAudio: (sceneName: CanonicalSceneName) => void;
  playSfx: (sfxId: string) => void;
}
