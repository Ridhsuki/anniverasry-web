// ─────────────────────────────────────────────────────────────
// Floating Animation Utilities
// Pure GSAP functions for organic floating movement and breathing loops.
// Optimized for decorative elements: petals, butterflies, sparkles, paper items.
// SSR-safe, no React dependency.
// ─────────────────────────────────────────────────────────────

import { gsap } from "gsap";

import type {
  BreathingAnimationOptions,
  FloatingAnimationOptions,
} from "@/types/animations";

/**
 * Creates a continuous organic floating movement (oscillation in Y, X, and subtle rotation).
 * Ideal for petals, dust, stars, or floating scrapbook photos.
 */
export function floatingMovement(
  target: gsap.TweenTarget,
  options: FloatingAnimationOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  // Respect user preference for reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  const {
    duration = 4,
    ease = "sine.inOut",
    delay = 0,
    yDistance = 14,
    xDistance = 6,
    rotationAngle = 2.5,
    repeat = -1,
    yoyo = true,
    onComplete,
    onStart,
  } = options;

  return gsap.to(target, {
    y: `+=${yDistance}`,
    x: `+=${xDistance}`,
    rotation: `+=${rotationAngle}`,
    duration,
    ease,
    delay,
    repeat,
    yoyo,
    force3D: true,
    onStart,
    onComplete,
  });
}

/**
 * Creates a gentle breathing pulse animation (subtle scale and opacity modulation).
 * Gives life to static elements, glowing seals, or background lights.
 */
export function breathingAnimation(
  target: gsap.TweenTarget,
  options: BreathingAnimationOptions = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  const {
    duration = 3.2,
    ease = "sine.inOut",
    delay = 0,
    scaleTo = 1.035,
    opacityFrom = 0.85,
    opacityTo = 1,
    repeat = -1,
    yoyo = true,
    onComplete,
    onStart,
  } = options;

  // Respect user preference for reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(target, { opacity: opacityTo, scale: 1, force3D: true });
    return null;
  }

  // Set initial opacity baseline
  gsap.set(target, { opacity: opacityFrom, force3D: true });

  return gsap.to(target, {
    scale: scaleTo,
    opacity: opacityTo,
    duration,
    ease,
    delay,
    repeat,
    yoyo,
    force3D: true,
    onStart,
    onComplete,
  });
}
