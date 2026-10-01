// ─────────────────────────────────────────────────────────────
// Selection Scene Data
// Structured content and artifact descriptors for Scene 2 (Selection Hub).
// Visual benchmark: docs/references/screenshots/selection-scene.png
// ─────────────────────────────────────────────────────────────

import type { CanonicalSceneName } from "@/types/scenes";

export interface SelectionArtifactItem {
  id: string;
  targetScene: CanonicalSceneName;
  label: string;
  subtitle: string;
  tag?: string;
  ariaLabel: string;
  hasUnderline?: boolean;
}

export interface SelectionSceneContent {
  headline: string;
  ctaText: string;
  artifacts: SelectionArtifactItem[];
}

export const SELECTION_CONTENT: SelectionSceneContent = {
  headline: "Choose the Surprise",
  ctaText: "TAP FOR SURPRISE",
  artifacts: [
    {
      id: "artifact-journey",
      targetScene: "journey",
      label: "Journey.",
      subtitle: "Our Story",
      ariaLabel: "Choose Journey: Explore our relationship history and camera memories",
      hasUnderline: false,
    },
    {
      id: "artifact-moment",
      targetScene: "gallery",
      label: "Moment",
      subtitle: "Cherished Time",
      tag: "26-09-26",
      ariaLabel: "Choose Moment: View timeless gallery of cherished memories",
      hasUnderline: true,
    },
    {
      id: "artifact-playlist",
      targetScene: "playlist",
      label: "Playlist",
      subtitle: "Our Soundtrack",
      ariaLabel: "Choose Playlist: Listen to vinyl records and memorable songs",
      hasUnderline: true,
    },
    {
      id: "artifact-gift",
      targetScene: "gift",
      label: "Gift",
      subtitle: "Special Keepsake",
      ariaLabel: "Choose Gift: Open anniversary gift and surprise letter",
      hasUnderline: true,
    },
  ],
};
