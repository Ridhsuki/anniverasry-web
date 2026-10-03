// ─────────────────────────────────────────────────────────────
// Scene Type Definitions
// Defines identifiers, states, and props for all interactive scenes.
// ─────────────────────────────────────────────────────────────

import type React from "react";

/** Available interactive scene identifiers in order of storytelling flow */
export type SceneName =
  | "intro"
  | "selection"
  | "journey"
  | "gallery"
  | "playlist"
  | "gift"
  | "final-letter"
  | "final";

/** Canonical scene sequence representing the primary storytelling progression */
export const SCENE_ORDER = [
  "intro",
  "selection",
  "journey",
  "gallery",
  "playlist",
  "gift",
  "final-letter",
] as const;

export type CanonicalSceneName = (typeof SCENE_ORDER)[number];

/** Normalize scene name aliases (e.g. "final" -> "final-letter") */
export function normalizeSceneName(scene: SceneName): CanonicalSceneName {
  if (scene === "final") return "final-letter";
  return scene;
}

export interface SceneMeta {
  id: CanonicalSceneName;
  index: number;
  title: string;
  subtitle?: string;
  soundtrackId?: string;
  sfxOnEnterId?: string;
}

export interface SceneProps {
  /** Whether this scene is currently active/visible */
  isActive?: boolean;
  /** Whether this scene is currently playing its exit crossfade transition */
  isExiting?: boolean;
  /** Triggered when the scene finishes its narrative or user confirms completion */
  onComplete?: () => void;
  /** Trigger navigation to the next sequential scene */
  onNext?: () => void;
  /** Trigger navigation to the previous scene */
  onPrevious?: () => void;
  /** Optional custom CSS classes */
  className?: string;
  /** Optional child elements */
  children?: React.ReactNode;
}

export type SceneTransitionState =
  | "idle"
  | "entering"
  | "active"
  | "exiting"
  | "hidden";

/** Audio configuration for an individual scene */
export interface SceneAudioConfig {
  /** Registered soundtrack identifier to play or crossfade to */
  soundtrackId?: string;
  /** Optional sound effect played immediately upon entering the scene */
  sfxOnEnterId?: string;
  /** Crossfade duration in milliseconds (defaults to 1500) */
  crossfadeDurationMs?: number;
  /** Volume multiplier for this scene's audio (0.0 to 1.0) */
  volumeMultiplier?: number;
}

export interface SceneControllerState {
  currentScene: CanonicalSceneName;
  previousScene: CanonicalSceneName | null;
  transitionState: SceneTransitionState;
  isTransitioning: boolean;
  history: CanonicalSceneName[];
  completedScenes: CanonicalSceneName[];
}

export interface SceneControllerActions {
  goToScene: (target: SceneName, options?: { skipTransition?: boolean }) => void;
  nextScene: () => void;
  prevScene: () => void;
  resetToStart: () => void;
  markSceneCompleted: (scene: SceneName) => void;
  setTransitionState: (state: SceneTransitionState) => void;
}

export type SceneControllerReturn = SceneControllerState & SceneControllerActions;
