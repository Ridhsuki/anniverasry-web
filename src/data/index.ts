// ─────────────────────────────────────────────────────────────
// Data — Central Barrel Export
// Structured content for narrative scenes and interactive modules.
// ─────────────────────────────────────────────────────────────

import type { DecorativeElement, GallerySection, StoryEntry } from "@/types";

export * from "./intro";
export * from "./selection";

/** Story timeline entries — fill in with real dates and text */
export const storyEntries: StoryEntry[] = [];

/** Gallery sections — fill in with real photos */
export const gallerySections: GallerySection[] = [];

/** Floating decorative elements — fill with SVG/PNG paths */
export const decorativeElements: DecorativeElement[] = [];
