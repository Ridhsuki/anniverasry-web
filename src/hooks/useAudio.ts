// ─────────────────────────────────────────────────────────────
// useAudio Hook
// React integration for AudioManager / Howler.js.
// Manages state syncing and provides a clean API for components.
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useEffect, useState } from "react";

import { audioManager } from "@/lib/audio";
import type { AudioManagerState, AudioTrack } from "@/lib/audio";

interface UseAudioReturn extends AudioManagerState {
  play: (trackId: string, fadeDurationMs?: number) => void;
  pause: (trackId?: string, fadeDurationMs?: number) => void;
  stop: (trackId?: string) => void;
  pauseMainBgm: (fadeDurationMs?: number) => void;
  resumeMainBgm: (fadeDurationMs?: number) => void;
  fadeIn: (trackId: string, durationMs?: number, targetVolume?: number) => void;
  fadeOut: (trackId: string, durationMs?: number) => void;
  crossfade: (
    fromTrackId: string | null,
    toTrackId: string,
    durationMs?: number,
    targetVolume?: number
  ) => void;
  playSfx: (sfxId: string) => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  registerTrack: (track: AudioTrack) => void;
  unlockAudio: () => void;
}

/**
 * useAudio
 *
 * Provides reactive audio controls backed by AudioManager singleton.
 * State updates are driven by polling on a short interval to avoid
 * coupling deeply into Howler's event system.
 *
 * @example
 * const { play, pause, toggleMute, isPlaying, isMuted } = useAudio();
 * useEffect(() => { play("background-music"); }, []);
 */
export function useAudio(): UseAudioReturn {
  const [state, setState] = useState<AudioManagerState>(() =>
    audioManager.getState()
  );

  const syncState = useCallback(() => {
    const next = audioManager.getState();
    setState((prev) => {
      if (
        prev.isPlaying === next.isPlaying &&
        prev.isMuted === next.isMuted &&
        prev.volume === next.volume &&
        prev.currentTrackId === next.currentTrackId
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  // Sync state with AudioManager every 500ms
  // (Howler does not expose a unified change event)
  useEffect(() => {
    const interval = setInterval(syncState, 500);
    return () => clearInterval(interval);
  }, [syncState]);

  const play = useCallback((trackId: string, fadeDurationMs?: number) => {
    audioManager.play(trackId, fadeDurationMs);
    syncState();
  }, [syncState]);

  const pause = useCallback((trackId?: string, fadeDurationMs?: number) => {
    audioManager.pause(trackId, fadeDurationMs);
    syncState();
  }, [syncState]);

  const stop = useCallback((trackId?: string) => {
    audioManager.stop(trackId);
    syncState();
  }, [syncState]);

  const pauseMainBgm = useCallback((fadeDurationMs?: number) => {
    audioManager.pauseMainBgm(fadeDurationMs);
    syncState();
  }, [syncState]);

  const resumeMainBgm = useCallback((fadeDurationMs?: number) => {
    audioManager.resumeMainBgm(fadeDurationMs);
    syncState();
  }, [syncState]);

  const fadeIn = useCallback((trackId: string, durationMs?: number, targetVolume?: number) => {
    audioManager.fadeIn(trackId, durationMs, targetVolume);
    syncState();
  }, [syncState]);

  const fadeOut = useCallback((trackId: string, durationMs?: number) => {
    audioManager.fadeOut(trackId, durationMs);
    syncState();
  }, [syncState]);

  const crossfade = useCallback(
    (
      fromTrackId: string | null,
      toTrackId: string,
      durationMs?: number,
      targetVolume?: number
    ) => {
      audioManager.crossfade(fromTrackId, toTrackId, durationMs, targetVolume);
      syncState();
    },
    [syncState]
  );

  const playSfx = useCallback((sfxId: string) => {
    audioManager.playSfx(sfxId);
  }, []);

  const toggleMute = useCallback(() => {
    audioManager.toggleMute();
    syncState();
  }, [syncState]);

  const setVolume = useCallback((volume: number) => {
    audioManager.setVolume(volume);
    syncState();
  }, [syncState]);

  const registerTrack = useCallback((track: AudioTrack) => {
    audioManager.registerTrack(track);
  }, []);

  const unlockAudio = useCallback(() => {
    audioManager.unlockAudio();
  }, []);

  return {
    ...state,
    play,
    pause,
    stop,
    pauseMainBgm,
    resumeMainBgm,
    fadeIn,
    fadeOut,
    crossfade,
    playSfx,
    toggleMute,
    setVolume,
    registerTrack,
    unlockAudio,
  };
}
