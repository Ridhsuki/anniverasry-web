// ─────────────────────────────────────────────────────────────
// Scene Audio Mapping & Architecture Configuration
// Connects each story scene to registered soundtrack identifiers,
// crossfade timing, volume multipliers, and interactive SFX triggers.
// (Architecture only — audio assets configured in src/constants/audio.ts)
// ─────────────────────────────────────────────────────────────

import { MAIN_BGM_TRACK_ID } from "@/constants/audio";
import type { CanonicalSceneName, SceneAudioConfig } from "@/types/scenes";

export { MAIN_BGM_TRACK_ID };

/**
 * Scene-to-Soundtrack Mapping Specification
 * Governs automatic audio state transitions when scenes change.
 * Phase 8.5D: Uses one continuous main soundtrack ("Die With A Smile") across scenes,
 * preserving emotional continuity and preventing rapid-switch fade conflicts.
 */
export const SCENE_AUDIO_MAPPING: Record<CanonicalSceneName, SceneAudioConfig> = {
  intro: {
    soundtrackId: MAIN_BGM_TRACK_ID,
    sfxOnEnterId: "sfx-envelope-shimmer",
    crossfadeDurationMs: 1800,
    volumeMultiplier: 0.8,
  },
  selection: {
    soundtrackId: MAIN_BGM_TRACK_ID,
    sfxOnEnterId: "sfx-card-flip",
    crossfadeDurationMs: 1400,
    volumeMultiplier: 0.8,
  },
  journey: {
    soundtrackId: MAIN_BGM_TRACK_ID,
    sfxOnEnterId: "sfx-musicbox-chime",
    crossfadeDurationMs: 1600,
    volumeMultiplier: 0.8,
  },
  gallery: {
    soundtrackId: MAIN_BGM_TRACK_ID,
    sfxOnEnterId: "sfx-polaroid-place",
    crossfadeDurationMs: 1500,
    volumeMultiplier: 0.8,
  },
  playlist: {
    soundtrackId: MAIN_BGM_TRACK_ID,
    sfxOnEnterId: undefined,
    crossfadeDurationMs: 1200,
    volumeMultiplier: 0.8,
  },
  gift: {
    soundtrackId: MAIN_BGM_TRACK_ID,
    sfxOnEnterId: "sfx-wax-crack",
    crossfadeDurationMs: 1500,
    volumeMultiplier: 0.8,
  },
  "final-letter": {
    soundtrackId: MAIN_BGM_TRACK_ID,
    sfxOnEnterId: "sfx-parchment-unfold",
    crossfadeDurationMs: 2200,
    volumeMultiplier: 0.85,
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
  pauseMainBgm?: (fadeDurationMs?: number) => void;
  resumeMainBgm?: (fadeDurationMs?: number) => void;
}
