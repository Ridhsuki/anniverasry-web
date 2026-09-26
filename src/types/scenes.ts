// ─────────────────────────────────────────────────────────────
// Scene Type Definitions
// Defines identifiers, states, and props for all interactive scenes.
// ─────────────────────────────────────────────────────────────

/** Available interactive scene identifiers in order of storytelling flow */
export type SceneName =
  | "intro"
  | "selection"
  | "journey"
  | "gallery"
  | "playlist"
  | "gift"
  | "final";

export interface SceneMeta {
  id: SceneName;
  index: number;
  title: string;
  subtitle?: string;
  soundtrackId?: string;
}

export interface SceneProps {
  /** Whether this scene is currently active/visible */
  isActive?: boolean;
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
