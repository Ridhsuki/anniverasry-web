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
  play: (trackId: string) => void;
  pause: (trackId?: string) => void;
  stop: (trackId?: string) => void;
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

  // Sync state with AudioManager every 500ms
  // (Howler does not expose a unified change event)
  useEffect(() => {
    const interval = setInterval(() => {
      setState(audioManager.getState());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const play = useCallback((trackId: string) => {
    audioManager.play(trackId);
    setState(audioManager.getState());
  }, []);

  const pause = useCallback((trackId?: string) => {
    audioManager.pause(trackId);
    setState(audioManager.getState());
  }, []);

  const stop = useCallback((trackId?: string) => {
    audioManager.stop(trackId);
    setState(audioManager.getState());
  }, []);

  const fadeIn = useCallback((trackId: string, durationMs?: number, targetVolume?: number) => {
    audioManager.fadeIn(trackId, durationMs, targetVolume);
    setState(audioManager.getState());
  }, []);

  const fadeOut = useCallback((trackId: string, durationMs?: number) => {
    audioManager.fadeOut(trackId, durationMs);
    setState(audioManager.getState());
  }, []);

  const crossfade = useCallback(
    (
      fromTrackId: string | null,
      toTrackId: string,
      durationMs?: number,
      targetVolume?: number
    ) => {
      audioManager.crossfade(fromTrackId, toTrackId, durationMs, targetVolume);
      setState(audioManager.getState());
    },
    []
  );

  const playSfx = useCallback((sfxId: string) => {
    audioManager.playSfx(sfxId);
  }, []);

  const toggleMute = useCallback(() => {
    audioManager.toggleMute();
    setState(audioManager.getState());
  }, []);

  const setVolume = useCallback((volume: number) => {
    audioManager.setVolume(volume);
    setState(audioManager.getState());
  }, []);

  const registerTrack = useCallback((track: AudioTrack) => {
    audioManager.registerTrack(track);
  }, []);

  return {
    ...state,
    play,
    pause,
    stop,
    fadeIn,
    fadeOut,
    crossfade,
    playSfx,
    toggleMute,
    setVolume,
    registerTrack,
  };
}
