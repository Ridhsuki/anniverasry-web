// ─────────────────────────────────────────────────────────────
// Animation Barrel Export
// Central entry point for all GSAP animation utilities, Framer Motion
// transitions, and timeline builders.
// ─────────────────────────────────────────────────────────────

export * from "./fade";
export * from "./floating";
export * from "./scrapbook";
export * from "./cinematic";
export * from "./transitions";

export {
  gsap,
  ScrollTrigger,
  registerGSAPPlugins,
  createScrollAnimation,
  killTweens,
  EASE,
  DURATION,
  staggerReveal,
} from "./gsap";
