// ─────────────────────────────────────────────────────────────
// Scrapbook Animation Utilities
// Pure GSAP functions for tangible paper and photograph physical effects:
// - photo entrance (tactile drop & settle)
// - paper reveal (unfold & settle)
// - rotation effect (tactile tilt & peel)
// Optimized for 60fps GPU acceleration.
// SSR-safe, no React dependency.
// ─────────────────────────────────────────────────────────────

import { gsap } from "gsap";

import { animation } from "@/constants/tokens";
import type {
  BaseAnimationOptions,
  PaperRevealOptions,
  PhotoEntranceOptions,
} from "@/types/animations";

/**
 * Animate a photograph or card landing into a scrapbook:
 * Drops from slight elevation, scales down slightly, and settles into its vintage rotation.
 */
export function photoEntrance(
  target: gsap.TweenTarget,
  options: PhotoEntranceOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.slow,
    delay = 0,
    initialRotation = -6,
    finalRotation = -1.5,
    dropHeight = 40,
    bounce = true,
    onComplete,
    onStart,
  } = options;

  const ease = bounce ? "back.out(1.4)" : animation.ease.smooth;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: -dropHeight,
      scale: 1.08,
      rotation: initialRotation,
      force3D: true,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: finalRotation,
      duration,
      ease,
      delay,
      onStart,
      onComplete,
    }
  );
}

/**
 * Simulates unfolding or revealing a paper letter/card:
 * Combines vertical expansion with subtle tilt settling.
 */
export function paperReveal(
  target: gsap.TweenTarget,
  options: PaperRevealOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.moderate,
    ease = "power2.out",
    delay = 0,
    direction = "unfold",
    tilt = 1.2,
    onComplete,
    onStart,
  } = options;

  const fromVars: gsap.TweenVars = {
    opacity: 0,
    force3D: true,
  };

  if (direction === "unfold") {
    fromVars.scaleY = 0.6;
    fromVars.rotationX = -20;
    fromVars.transformOrigin = "top center";
  } else if (direction === "vertical") {
    fromVars.y = 30;
    fromVars.rotation = -tilt;
  } else {
    fromVars.x = -30;
    fromVars.rotation = tilt;
  }

  return gsap.fromTo(
    target,
    fromVars,
    {
      opacity: 1,
      scaleY: 1,
      rotationX: 0,
      rotation: 0,
      y: 0,
      x: 0,
      duration,
      ease,
      delay,
      onStart,
      onComplete,
    }
  );
}

/**
 * Applies an interactive tactile rotation/peel effect (e.g. for hover or selection):
 * Tilts the card slightly and raises it toward the viewer.
 */
export function rotationEffect(
  target: gsap.TweenTarget,
  degrees: number = 2.5,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.normal,
    ease = "power2.out",
    delay = 0,
    onComplete,
    onStart,
  } = options;

  return gsap.to(target, {
    rotation: degrees,
    scale: 1.02,
    duration,
    ease,
    delay,
    force3D: true,
    onStart,
    onComplete,
  });
}

/**
 * Resets the rotation effect back to resting orientation.
 */
export function resetRotation(
  target: gsap.TweenTarget,
  restingDegrees: number = 0,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.normal,
    ease = "power2.out",
    delay = 0,
    onComplete,
    onStart,
  } = options;

  return gsap.to(target, {
    rotation: restingDegrees,
    scale: 1,
    duration,
    ease,
    delay,
    force3D: true,
    onStart,
    onComplete,
  });
}
