// ─────────────────────────────────────────────────────────────
// SceneManager
// Central scene renderer and animation lifecycle orchestrator.
// Coordinates cinematic transitions between narrative chapters, manages
// outgoing and incoming scene DOM elements, and integrates with GSAP.
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef, useState } from "react";

import { createSceneTransitionTimeline } from "@/animations/cinematic";
import { FinalLetterScene } from "@/components/scenes/FinalLetterScene";
import { GalleryScene } from "@/components/scenes/GalleryScene";
import { GiftScene } from "@/components/scenes/GiftScene";
import { IntroScene } from "@/components/scenes/IntroScene";
import { JourneyScene } from "@/components/scenes/JourneyScene";
import { PlaylistScene } from "@/components/scenes/PlaylistScene";
import { SelectionScene } from "@/components/scenes/SelectionScene";
import { useExperience } from "@/context/ExperienceContext";
import { useGSAP } from "@/hooks/useGSAP";
import { getLenis, scrollTo } from "@/lib/lenis";
import type { SceneTransitionOptions } from "@/types/animations";
import type { CanonicalSceneName, SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

const SCENE_COMPONENTS: Record<
  CanonicalSceneName,
  React.ComponentType<SceneProps>
> = {
  intro: IntroScene,
  selection: SelectionScene,
  journey: JourneyScene,
  gallery: GalleryScene,
  playlist: PlaylistScene,
  gift: GiftScene,
  "final-letter": FinalLetterScene,
};

const SCENE_ANNOUNCEMENTS: Record<CanonicalSceneName, string> = {
  intro: "Introduction chapter: Anniversary invitation",
  selection: "Selection chapter: Choose a surprise",
  journey: "Our Journey chapter: Timeline and milestones",
  gallery: "Moments chapter: Scrapbook photo gallery",
  playlist: "Our Soundtrack chapter: Music room and playlist",
  gift: "Gift chapter: Unboxing celebration",
  "final-letter": "Final chapter: Handwritten love letter keepsake",
};

export interface SceneManagerProps {
  className?: string;
  transitionOptions?: SceneTransitionOptions;
  onSceneTransitionStart?: (
    from: CanonicalSceneName | null,
    to: CanonicalSceneName
  ) => void;
  onSceneTransitionComplete?: (activeScene: CanonicalSceneName) => void;
}

interface SceneSlot {
  scene: CanonicalSceneName;
  key: string;
}

/**
 * SceneManager
 *
 * Renders the active narrative scene, orchestrates GSAP timeline transitions
 * between exiting and entering scenes, and connects the animation lifecycle.
 */
export function SceneManager({
  className,
  transitionOptions,
  onSceneTransitionStart,
  onSceneTransitionComplete,
}: SceneManagerProps) {
  const {
    currentScene,
    previousScene,
    nextScene,
    prevScene,
    markSceneCompleted,
    setTransitionState,
  } = useExperience();

  const containerRef = useRef<HTMLDivElement>(null);
  const activeSlotRef = useRef<HTMLDivElement>(null);
  const exitingSlotRef = useRef<HTMLDivElement>(null);

  // Track previous scene to detect changes during render without cascading effects
  const [prevTrackedScene, setPrevTrackedScene] =
    useState<CanonicalSceneName>(currentScene);

  const [activeSlot, setActiveSlot] = useState<SceneSlot>({
    scene: currentScene,
    key: `scene-${currentScene}`,
  });
  const [exitingSlot, setExitingSlot] = useState<SceneSlot | null>(null);
  const [exitingScrollY, setExitingScrollY] = useState(0);

  const [transitionCount, setTransitionCount] = useState(0);

  // Adjust state directly during rendering when currentScene changes (official React pattern)
  if (currentScene !== prevTrackedScene) {
    const nextCount = transitionCount + 1;
    const currentScrollY =
      typeof window !== "undefined"
        ? (getLenis()?.scroll ?? window.scrollY ?? 0)
        : 0;
    setExitingScrollY(currentScrollY);
    setPrevTrackedScene(currentScene);
    setTransitionCount(nextCount);
    setExitingSlot(activeSlot);
    setActiveSlot({
      scene: currentScene,
      key: `scene-${currentScene}-${nextCount}`,
    });
  }

  // Execute GSAP timeline transition when slots change
  useGSAP(
    () => {
      if (!exitingSlot) {
        // Initial mount or resting active scene
        setTransitionState("active");
        return;
      }

      onSceneTransitionStart?.(previousScene, currentScene);

      const leavingElement = exitingSlotRef.current;
      const enteringElement = activeSlotRef.current;

      if (!enteringElement) return;

      // Reset scroll position cleanly under the pinned exiting element
      scrollTo(0, { immediate: true });
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }

      const timeline = createSceneTransitionTimeline(
        leavingElement,
        enteringElement,
        {
          duration: transitionOptions?.duration ?? 1.4,
          ease: transitionOptions?.ease,
          onStart: () => {
            setTransitionState("exiting");
          },
          onEnterStart: () => {
            setTransitionState("entering");
            // Reinforce scroll position as entering scene begins
            scrollTo(0, { immediate: true });
            if (typeof window !== "undefined") {
              window.scrollTo(0, 0);
            }
          },
          onComplete: () => {
            setExitingSlot(null);
            setTransitionState("active");
            markSceneCompleted(exitingSlot.scene);
            onSceneTransitionComplete?.(currentScene);
          },
        }
      );

      return () => {
        timeline?.kill();
      };
    },
    [activeSlot.key, exitingSlot],
    containerRef
  );

  const ActiveComponent = SCENE_COMPONENTS[activeSlot.scene];
  const ExitingComponent = exitingSlot
    ? SCENE_COMPONENTS[exitingSlot.scene]
    : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-screen overflow-x-clip bg-bg-primary select-none",
        className
      )}
    >
      {/* Accessible live region for screen readers announcing scene transitions */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {SCENE_ANNOUNCEMENTS[currentScene] ?? `${currentScene} scene`}
      </div>

      {/* Exiting Scene (Rendered during crossfade transition, pinned in-place) */}
      {exitingSlot && ExitingComponent && (
        <div
          ref={exitingSlotRef}
          key={exitingSlot.key}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: exitingScrollY > 0 ? `-${exitingScrollY}px` : 0,
            left: 0,
            right: 0,
            width: "100%",
          }}
          className="z-20 pointer-events-none gpu-accelerated overflow-hidden"
        >
          <ExitingComponent
            isActive={false}
            onComplete={nextScene}
            onNext={nextScene}
            onPrevious={prevScene}
          />
        </div>
      )}

      {/* Active Scene */}
      <div
        ref={activeSlotRef}
        key={activeSlot.key}
        className={cn(
          "relative z-10 w-full min-h-screen gpu-accelerated",
          exitingSlot ? "pointer-events-none opacity-0" : "pointer-events-auto"
        )}
      >
        <ActiveComponent
          isActive={true}
          onComplete={nextScene}
          onNext={nextScene}
          onPrevious={prevScene}
        />
      </div>
    </div>
  );
}
