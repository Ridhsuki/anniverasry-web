// ─────────────────────────────────────────────────────────────
// Fade Animation Utilities
// Pure GSAP functions for fade in, fade out, and staggered reveals.
// Optimized for GPU acceleration (transform + opacity).
// SSR-safe, no React dependency.
// ─────────────────────────────────────────────────────────────

import { gsap } from "gsap";

import { animation } from "@/constants/tokens";
import type {
  FadeInOptions,
  FadeOutOptions,
  RevealOptions,
} from "@/types/animations";

/**
 * Fade an element in with optional directional slide and scale.
 * Uses GPU-accelerated transform3d and opacity.
 */
export function fadeIn(
  target: gsap.TweenTarget,
  options: FadeInOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.moderate,
    ease = animation.ease.smooth,
    delay = 0,
    y = 24,
    x = 0,
    scale = 1,
    fromOpacity = 0,
    onComplete,
    onStart,
  } = options;

  return gsap.fromTo(
    target,
    {
      opacity: fromOpacity,
      y,
      x,
      scale: scale !== 1 ? scale : undefined,
      force3D: true,
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
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
 * Fade an element out with optional directional slide.
 */
export function fadeOut(
  target: gsap.TweenTarget,
  options: FadeOutOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = animation.duration.normal,
    ease = animation.ease.snap,
    delay = 0,
    y = -16,
    x = 0,
    scale = 0.98,
    onComplete,
    onStart,
  } = options;

  return gsap.to(target, {
    opacity: 0,
    y,
    x,
    scale,
    duration,
    ease,
    delay,
    force3D: true,
    onStart,
    onComplete,
  });
}

/**
 * Stagger reveal a list of elements or text blocks.
 * Directional slide + opacity reveal for titles, cards, or galleries.
 */
export function reveal(
  targets: gsap.TweenTarget,
  options: RevealOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !targets) return null;

  const {
    duration = animation.duration.moderate,
    ease = animation.ease.smooth,
    delay = 0,
    stagger = animation.stagger.normal,
    direction = "up",
    distance = 32,
    onComplete,
    onStart,
  } = options;

  let x = 0;
  let y = 0;

  switch (direction) {
    case "up":
      y = distance;
      break;
    case "down":
      y = -distance;
      break;
    case "left":
      x = distance;
      break;
    case "right":
      x = -distance;
      break;
  }

  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y,
      x,
      force3D: true,
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      ease,
      delay,
      stagger,
      onStart,
      onComplete,
      clearProps: "transform",
    }
  );
}
