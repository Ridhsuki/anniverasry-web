// ─────────────────────────────────────────────────────────────
// Intro Scene Data
// Structured content for Scene 1 (Intro) based on docs/references/image-map.md
// and docs/references/screenshots/intro-scene.png.
// Decoupled from JSX to satisfy clean code and CMS-readiness rules.
// ─────────────────────────────────────────────────────────────

export interface IntroPhotoItem {
  id: string;
  src: string;
  alt: string;
  rotation: number;
  variant: "gold" | "polaroid" | "classic" | "filigree";
  caption?: string;
  positionClasses: string;
  aspectRatio: "square" | "portrait" | "landscape" | "auto";
  hasButterfly?: boolean;
}

export interface IntroSceneContent {
  headline: string;
  date: string;
  salutation: string;
  coupleNames: string;
  monogram: string;
  ctaText: string;
  photos: IntroPhotoItem[];
}

export const INTRO_CONTENT: IntroSceneContent = {
  headline: "Happy Anniversary",
  date: "26-09-26",
  salutation: "Love,",
  coupleNames: "Nayyy & Keillaa",
  monogram: "N&K",
  ctaText: "TAP FOR SURPRISE",
  photos: [
    {
      id: "intro-photo-1",
      src: "/images/intro/photo-intro-couple-standing.webp",
      alt: "Nayyy & Keillaa standing together",
      rotation: -8,
      variant: "gold",
      aspectRatio: "portrait",
      positionClasses:
        "hidden md:block absolute -top-8 -left-20 lg:-left-28 w-44 lg:w-52 z-[1]",
    },
    {
      id: "intro-photo-2",
      src: "/images/intro/photo-intro-selfie-red.webp",
      alt: "Couple selfie portrait",
      rotation: 6,
      variant: "polaroid",
      aspectRatio: "square",
      positionClasses:
        "hidden md:block absolute -bottom-6 -left-16 lg:-left-24 w-40 lg:w-48 z-[2]",
      hasButterfly: true,
    },
    {
      id: "intro-photo-3",
      src: "/images/intro/photo-intro-portrait-top-right.webp",
      alt: "Romantic portrait moment",
      rotation: 10,
      variant: "gold",
      aspectRatio: "portrait",
      positionClasses:
        "hidden md:block absolute -top-10 -right-20 lg:-right-28 w-40 lg:w-48 z-[1]",
    },
    {
      id: "intro-photo-4",
      src: "/images/intro/photo-intro-portrait-cap.webp",
      alt: "Portrait with baseball cap",
      rotation: -6,
      variant: "polaroid",
      aspectRatio: "portrait",
      positionClasses:
        "hidden lg:block absolute top-28 -right-28 xl:-right-36 w-36 lg:w-44 z-[2]",
    },
    {
      id: "intro-photo-5",
      src: "/images/intro/photo-intro-portrait-bottom-right.webp",
      alt: "Playful smile portrait",
      rotation: 7,
      variant: "gold",
      aspectRatio: "square",
      positionClasses:
        "hidden md:block absolute -bottom-8 -right-16 lg:-right-24 w-40 lg:w-48 z-[2]",
    },
  ],
};
