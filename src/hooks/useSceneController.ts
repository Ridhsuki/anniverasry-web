// ─────────────────────────────────────────────────────────────
// useSceneController Hook
// Core state coordinator for the 7 interactive story scenes.
// Manages active scene state, history, linear and branch transitions,
// and browser URL hash synchronization.
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useEffect, useState } from "react";

import {
  SCENE_ORDER,
  normalizeSceneName,
  type CanonicalSceneName,
  type SceneControllerReturn,
  type SceneName,
  type SceneTransitionState,
} from "@/types/scenes";

interface UseSceneControllerOptions {
  initialScene?: SceneName;
  syncWithUrlHash?: boolean;
}

/**
 * useSceneController
 *
 * Central coordinator hook for scene progression, chapter branching,
 * and narrative sequencing.
 */
export function useSceneController(
  options: UseSceneControllerOptions = {}
): SceneControllerReturn {
  const { initialScene = "intro", syncWithUrlHash = true } = options;

  // Deterministic initial scene across SSR and client to ensure perfect hydration matching
  const [currentScene, setCurrentScene] = useState<CanonicalSceneName>(() =>
    normalizeSceneName(initialScene)
  );

  const [previousScene, setPreviousScene] = useState<CanonicalSceneName | null>(
    null
  );
  const [transitionState, setTransitionState] =
    useState<SceneTransitionState>("active");
  const [history, setHistory] = useState<CanonicalSceneName[]>([currentScene]);
  const [completedScenes, setCompletedScenes] = useState<CanonicalSceneName[]>(
    []
  );

  const isTransitioning =
    transitionState === "entering" || transitionState === "exiting";

  const goToScene = useCallback(
    (target: SceneName, options: { skipTransition?: boolean } = {}) => {
      const canonicalTarget = normalizeSceneName(target);

      if (canonicalTarget === currentScene && !options.skipTransition) {
        return;
      }

      setPreviousScene(currentScene);
      setCurrentScene(canonicalTarget);
      setHistory((prev) => [...prev, canonicalTarget]);

      if (options.skipTransition) {
        setTransitionState("active");
      } else {
        setTransitionState("exiting");
      }

      if (syncWithUrlHash && typeof window !== "undefined") {
        const targetHash = `#${canonicalTarget}`;
        if (window.location.hash !== targetHash) {
          window.history.pushState(null, "", targetHash);
        }
      }
    },
    [currentScene, syncWithUrlHash]
  );

  const nextScene = useCallback(() => {
    const currentIndex = SCENE_ORDER.indexOf(currentScene);
    if (currentIndex >= 0 && currentIndex < SCENE_ORDER.length - 1) {
      goToScene(SCENE_ORDER[currentIndex + 1]);
    }
  }, [currentScene, goToScene]);

  const prevScene = useCallback(() => {
    // If we branched from selection, standard back returns to selection
    const chapterScenes: CanonicalSceneName[] = [
      "journey",
      "gallery",
      "playlist",
      "gift",
    ];

    if (chapterScenes.includes(currentScene)) {
      goToScene("selection");
      return;
    }

    const currentIndex = SCENE_ORDER.indexOf(currentScene);
    if (currentIndex > 0) {
      goToScene(SCENE_ORDER[currentIndex - 1]);
    }
  }, [currentScene, goToScene]);

  const resetToStart = useCallback(() => {
    goToScene("intro");
    setHistory(["intro"]);
  }, [goToScene]);

  const markSceneCompleted = useCallback((scene: SceneName) => {
    const canonical = normalizeSceneName(scene);
    setCompletedScenes((prev) =>
      prev.includes(canonical) ? prev : [...prev, canonical]
    );
  }, []);

  // Listen to initial hash post-hydration and browser popstate (e.g. back/forward buttons)
  useEffect(() => {
    if (!syncWithUrlHash || typeof window === "undefined") return;

    let rafId: number | null = null;
    const initialHash = window.location.hash.replace("#", "") as SceneName;
    if (initialHash && SCENE_ORDER.includes(normalizeSceneName(initialHash))) {
      const canonical = normalizeSceneName(initialHash);
      if (canonical !== normalizeSceneName(initialScene)) {
        rafId = requestAnimationFrame(() => {
          setCurrentScene(canonical);
          setHistory((prev) => (prev.includes(canonical) ? prev : [...prev, canonical]));
        });
      }
    }

    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "") as SceneName;
      if (SCENE_ORDER.includes(normalizeSceneName(hash))) {
        const canonical = normalizeSceneName(hash);
        setCurrentScene((curr) => {
          if (curr !== canonical) {
            setPreviousScene(curr);
            setTransitionState("exiting");
            return canonical;
          }
          return curr;
        });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("popstate", handlePopState);
    };
  }, [initialScene, syncWithUrlHash]);

  return {
    currentScene,
    previousScene,
    transitionState,
    isTransitioning,
    history,
    completedScenes,
    goToScene,
    nextScene,
    prevScene,
    resetToStart,
    markSceneCompleted,
    setTransitionState,
  };
}
