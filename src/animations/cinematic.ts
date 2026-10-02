// ─────────────────────────────────────────────────────────────
// Cinematic Animation Utilities
// Pure GSAP functions for filmic chapter transitions, scene enter/exit,
// and dramatic headline reveals.
// Designed for award-winning digital storytelling experiences.
// SSR-safe, no React dependency.
// ─────────────────────────────────────────────────────────────

import { gsap } from "gsap";

import { animation } from "@/constants/tokens";
import type {
  DramaticRevealOptions,
  SceneEnterOptions,
  SceneExitOptions,
  SceneTransitionOptions,
} from "@/types/animations";

/**
 * Animates a scene container into view.
 * Uses GPU-accelerated opacity, scale, and subtle translation.
 */
export function animateSceneEnter(
  target: gsap.TweenTarget,
  options: SceneEnterOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.slow,
    ease = animation.ease.cinematic,
    delay = 0,
    scaleStart = 1.04,
    yOffset = 0,
    onComplete,
    onStart,
  } = options;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      scale: scaleStart,
      y: yOffset,
      force3D: true,
      visibility: "visible",
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration,
      ease,
      delay,
      onStart,
      onComplete,
      clearProps: "transform",
    }
  );
}

/**
 * Animates a scene container out of view.
 * Softly scales down and fades out without jarring layout shifts.
 */
export function animateSceneExit(
  target: gsap.TweenTarget,
  options: SceneExitOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.moderate,
    ease = "power2.inOut",
    delay = 0,
    scaleEnd = 0.96,
    yOffset = 0,
    onComplete,
    onStart,
  } = options;

  return gsap.to(target, {
    opacity: 0,
    scale: scaleEnd,
    y: yOffset,
    duration,
    ease,
    delay,
    force3D: true,
    onStart,
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });
}

/**
 * Builds an overlapping timeline linking exit of departing scene
 * with entrance of the incoming scene.
 */
export function createSceneTransitionTimeline(
  leavingTarget: gsap.TweenTarget,
  enteringTarget: gsap.TweenTarget,
  options: SceneTransitionOptions = {}
): gsap.core.Timeline | null {
  if (typeof window === "undefined") return null;

  const {
    duration = animation.duration.slow,
    ease = animation.ease.cinematic,
    delay = 0,
    overlapOffset,
    onEnterStart,
    onComplete,
    onStart,
  } = options;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const exitDuration = prefersReduced ? 0.15 : duration * 0.55;
  const enterDuration = prefersReduced ? 0.15 : duration;
  const overlap = prefersReduced ? 0 : (overlapOffset ?? duration * 0.25);

  const tl = gsap.timeline({
    delay,
    onStart,
    onComplete,
  });

  if (leavingTarget) {
    tl.to(
      leavingTarget,
      {
        opacity: 0,
        scale: prefersReduced ? 1 : 0.96,
        duration: exitDuration,
        ease: prefersReduced ? "none" : "power2.inOut",
        force3D: true,
      },
      0
    );
  }

  if (enteringTarget) {
    tl.fromTo(
      enteringTarget,
      {
        opacity: 0,
        scale: prefersReduced ? 1 : 1.04,
        force3D: true,
        visibility: "visible",
      },
      {
        opacity: 1,
        scale: 1,
        duration: enterDuration,
        ease: prefersReduced ? "none" : ease,
        clearProps: "transform",
        onStart: () => {
          if (onEnterStart) onEnterStart();
        },
      },
      overlap
    );
  }

  return tl;
}

/**
 * Executes a seamless cinematic transition between two scenes.
 * Primary convenience wrapper around createSceneTransitionTimeline.
 */
export function sceneTransition(
  leavingTarget: gsap.TweenTarget,
  enteringTarget: gsap.TweenTarget,
  options: SceneTransitionOptions = {}
): gsap.core.Timeline | null {
  return createSceneTransitionTimeline(leavingTarget, enteringTarget, options);
}

/**
 * Dramatic typographic / headline reveal:
 * Combines slow letter-spacing expansion, soft scale settle, and opacity rise.
 * Perfect for scene chapter titles, love letter openings, and commemorative dates.
 */
export function dramaticReveal(
  target: gsap.TweenTarget,
  options: DramaticRevealOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.cinematic,
    ease = "power3.out",
    delay = 0,
    scaleStart = 0.94,
    trackingStart = "0.25em",
    trackingEnd = "0.08em",
    onComplete,
    onStart,
  } = options;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      scale: scaleStart,
      letterSpacing: trackingStart,
      y: 18,
      force3D: true,
    },
    {
      opacity: 1,
      scale: 1,
      letterSpacing: trackingEnd,
      y: 0,
      duration,
      ease,
      delay,
      onStart,
      onComplete,
    }
  );
}
