// ─────────────────────────────────────────────────────────────
// ExperienceContext & ExperienceProvider
// Central application state provider for the interactive anniversary experience.
// Unifies active scene state, narrative progression, audio synchronization,
// and cross-scene interactions.
// ─────────────────────────────────────────────────────────────

"use client";

import { createContext, useContext, useEffect, useMemo } from "react";

import { AUDIO_TRACKS } from "@/constants/audio";
import type { SceneAudioController } from "@/constants/sceneAudio";
import { useSceneAudio } from "@/hooks/useSceneAudio";
import { useSceneController } from "@/hooks/useSceneController";
import { audioManager } from "@/lib/audio";
import { destroyLenis, initLenis, scrollTo } from "@/lib/lenis";
import type {
  SceneControllerReturn,
  SceneName,
} from "@/types/scenes";

export interface ExperienceContextValue extends SceneControllerReturn {
  audio: SceneAudioController;
  isAudioEnabled: boolean;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export interface ExperienceProviderProps {
  children: React.ReactNode;
  initialScene?: SceneName;
  syncWithUrlHash?: boolean;
  enableAudio?: boolean;
}

/**
 * ExperienceProvider
 *
 * Wraps the interactive application to provide unified scene progression,
 * narrative navigation, smooth scrolling lifecycle, and audio synchronization across all scenes.
 */
export function ExperienceProvider({
  children,
  initialScene = "intro",
  syncWithUrlHash = true,
  enableAudio = true,
}: ExperienceProviderProps) {
  const sceneController = useSceneController({
    initialScene,
    syncWithUrlHash,
  });

  const audioController = useSceneAudio(sceneController.currentScene, {
    enabled: enableAudio,
    autoSync: true,
  });

  // Initialize Lenis smooth scrolling engine synchronized with GSAP ticker
  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  // Register all canonical soundtrack tracks and interactive SFX with AudioManager
  useEffect(() => {
    if (enableAudio) {
      AUDIO_TRACKS.forEach((track) => audioManager.registerTrack(track));
    }
  }, [enableAudio]);

  // Reset scroll position immediately when changing scenes
  useEffect(() => {
    scrollTo(0, { immediate: true });
  }, [sceneController.currentScene]);

  const value = useMemo<ExperienceContextValue>(
    () => ({
      ...sceneController,
      audio: audioController,
      isAudioEnabled: enableAudio,
    }),
    [sceneController, audioController, enableAudio]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

/**
 * useExperience
 *
 * Consumer hook providing access to scene navigation, progression state,
 * and audio controls from any descendant component.
 */
export function useExperience(): ExperienceContextValue {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error(
      "useExperience must be used within an <ExperienceProvider>."
    );
  }
  return context;
}

export { ExperienceContext };
