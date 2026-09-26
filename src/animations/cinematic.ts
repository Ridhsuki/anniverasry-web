// ─────────────────────────────────────────────────────────────
// Cinematic Animation Utilities
// Pure GSAP functions for filmic chapter transitions and dramatic reveals.
// Designed for award-winning digital storytelling experiences.
// SSR-safe, no React dependency.
// ─────────────────────────────────────────────────────────────

import { gsap } from "gsap";

import { animation } from "@/constants/tokens";
import type {
  DramaticRevealOptions,
  SceneTransitionOptions,
} from "@/types/animations";

/**
 * Executes a seamless cinematic transition between two scenes.
 * Fades and softly scales out the departing scene while gracefully
 * introducing the incoming scene with cinematic easing.
 */
export function sceneTransition(
  leavingTarget: gsap.TweenTarget,
  enteringTarget: gsap.TweenTarget,
  options: SceneTransitionOptions = {}
): gsap.core.Timeline | null {
  if (typeof window === "undefined") return null;

  const {
    duration = animation.duration.slow,
    ease = animation.ease.cinematic,
    delay = 0,
    onComplete,
    onStart,
  } = options;

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
        scale: 0.96,
        duration: duration * 0.6,
        ease: "power2.inOut",
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
        scale: 1.04,
        force3D: true,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        ease,
        clearProps: "transform",
      },
      duration * 0.25 // Overlapping crossfade for seamless filmic cut
    );
  }

  return tl;
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
