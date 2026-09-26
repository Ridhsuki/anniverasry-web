// ─────────────────────────────────────────────────────────────
// Animation Type Definitions
// Options and parameters for GSAP and Framer Motion animation utilities.
// ─────────────────────────────────────────────────────────────

export type AnimationTarget =
  | string
  | Element
  | Element[]
  | NodeListOf<Element>
  | object
  | null;

export interface BaseAnimationOptions {
  duration?: number;
  ease?: string;
  delay?: number;
  onComplete?: () => void;
  onStart?: () => void;
}

export interface FadeInOptions extends BaseAnimationOptions {
  /** Starting vertical translation offset in px (positive moves upward on enter) */
  y?: number;
  /** Starting horizontal translation offset in px */
  x?: number;
  /** Starting scale (e.g. 0.95) */
  scale?: number;
  /** Starting opacity (defaults to 0) */
  fromOpacity?: number;
}

export interface FadeOutOptions extends BaseAnimationOptions {
  /** Ending vertical translation offset in px */
  y?: number;
  /** Ending horizontal translation offset in px */
  x?: number;
  /** Ending scale (e.g. 0.95) */
  scale?: number;
}

export interface RevealOptions extends BaseAnimationOptions {
  /** Stagger interval for multiple elements */
  stagger?: number;
  /** Direction of the reveal effect */
  direction?: "up" | "down" | "left" | "right";
  /** Distance in pixels */
  distance?: number;
}

export interface FloatingAnimationOptions extends BaseAnimationOptions {
  /** Vertical drift amplitude in px */
  yDistance?: number;
  /** Horizontal sway amplitude in px */
  xDistance?: number;
  /** Subtle rotation wiggle in degrees */
  rotationAngle?: number;
  /** Whether the animation repeats indefinitely (defaults to true) */
  repeat?: number;
  /** Whether the animation reverses smoothly on return (defaults to true) */
  yoyo?: boolean;
}

export interface BreathingAnimationOptions extends BaseAnimationOptions {
  /** Peak scale */
  scaleTo?: number;
  /** Minimum opacity */
  opacityFrom?: number;
  /** Maximum opacity */
  opacityTo?: number;
  repeat?: number;
  yoyo?: boolean;
}

export interface PhotoEntranceOptions extends BaseAnimationOptions {
  /** Initial rotation before settling (degrees) */
  initialRotation?: number;
  /** Final settled rotation (degrees) */
  finalRotation?: number;
  /** Drop distance in px */
  dropHeight?: number;
  /** Subtle bounce spring factor */
  bounce?: boolean;
}

export interface PaperRevealOptions extends BaseAnimationOptions {
  /** Unfold direction */
  direction?: "vertical" | "horizontal" | "unfold";
  /** Tilt angle during reveal */
  tilt?: number;
}

export interface SceneTransitionOptions extends BaseAnimationOptions {
  /** Transition mode */
  mode?: "fade" | "cinematic-blur" | "wipe" | "curtain";
  /** Direction if wipe/curtain */
  direction?: "left" | "right" | "top" | "bottom";
}

export interface DramaticRevealOptions extends BaseAnimationOptions {
  /** Blur dissipation amount in px (e.g. 10 -> 0) */
  blurAmount?: number;
  /** Initial letter spacing in em or px */
  trackingStart?: string;
  /** Settled letter spacing */
  trackingEnd?: string;
  /** Initial scale */
  scaleStart?: number;
}
