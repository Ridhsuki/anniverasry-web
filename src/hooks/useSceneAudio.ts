// ─────────────────────────────────────────────────────────────
// useSceneAudio Hook
// Bridges scene transitions with the AudioManager layer.
// Handles automatic crossfades between scene soundtracks, enter SFX,
// and exposes the volume control interface.
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  AUDIO_DEFAULTS,
  MAIN_BGM_TRACK_ID,
  SCENE_AUDIO_MAPPING,
  type SceneAudioController,
} from "@/constants/sceneAudio";
import { useAudio } from "@/hooks/useAudio";
import { audioManager } from "@/lib/audio";
import type { CanonicalSceneName } from "@/types/scenes";

interface UseSceneAudioOptions {
  autoSync?: boolean;
  enabled?: boolean;
}

/**
 * useSceneAudio
 *
 * Listens to active scene changes and executes audio transitions
 * based on the registered scene audio mapping.
 */
export function useSceneAudio(
  activeScene: CanonicalSceneName,
  options: UseSceneAudioOptions = {}
): SceneAudioController {
  const { autoSync = true, enabled = true } = options;
  const audio = useAudio();
  const previousSceneRef = useRef<CanonicalSceneName | null>(null);

  const syncSceneAudio = useCallback(
    (sceneName: CanonicalSceneName) => {
      if (!enabled) return;

      const mapping = SCENE_AUDIO_MAPPING[sceneName];
      if (!mapping) return;

      // Play enter SFX if registered and audio is not muted
      if (mapping.sfxOnEnterId && !audio.isMuted) {
        if (audioManager.isTrackRegistered(mapping.sfxOnEnterId)) {
          audio.playSfx(mapping.sfxOnEnterId);
        }
      }

      // Check soundtrack transition
      // IMPORTANT: Read currentTrackId directly from the audioManager singleton,
      // not from the React state (audio.currentTrackId) which can be stale by up
      // to 500ms due to polling. This prevents race conditions when the PlaylistScene
      // has already called stop() + resumeMainBgm() before the scene transition fires.
      if (mapping.soundtrackId) {
        const currentTrack = audioManager.getState().currentTrackId;
        const targetTrack = mapping.soundtrackId;

        // If target track is already current:
        if (currentTrack === targetTrack) {
          if (!audioManager.getTrack(targetTrack)?.playing()) {
            if (targetTrack === MAIN_BGM_TRACK_ID) {
              audioManager.resumeMainBgm(600);
            } else {
              audio.play(targetTrack, 600);
            }
          }
          return;
        }

        if (currentTrack !== targetTrack) {
          if (targetTrack === MAIN_BGM_TRACK_ID) {
            if (currentTrack) {
              audioManager.stop(currentTrack);
            }
            audioManager.resumeMainBgm(600);
          } else if (audioManager.isTrackRegistered(targetTrack)) {
            const crossfadeDuration =
              mapping.crossfadeDurationMs ??
              AUDIO_DEFAULTS.defaultCrossfadeDurationMs;

            const targetVolume =
              mapping.volumeMultiplier !== undefined
                ? audio.volume * mapping.volumeMultiplier
                : audio.volume;

            audio.crossfade(
              currentTrack,
              targetTrack,
              crossfadeDuration,
              targetVolume
            );
          }
        }
      }
    },
    [audio, enabled]
  );

  useEffect(() => {
    if (!autoSync || !enabled) return;

    if (previousSceneRef.current !== activeScene) {
      previousSceneRef.current = activeScene;
      syncSceneAudio(activeScene);
    }
  }, [activeScene, autoSync, enabled, syncSceneAudio]);

  return {
    currentTrackId: audio.currentTrackId,
    isPlaying: audio.isPlaying,
    isMuted: audio.isMuted,
    volume: audio.volume,
    setVolume: audio.setVolume,
    toggleMute: audio.toggleMute,
    syncSceneAudio,
    playSfx: audio.playSfx,
    pauseMainBgm: audio.pauseMainBgm,
    resumeMainBgm: audio.resumeMainBgm,
  };
}
