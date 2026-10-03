// ─────────────────────────────────────────────────────────────
// Audio Track Constants
// Defines available audio tracks and sound effects for the anniversary experience.
// Canonical paths map to /public/audio/bgm/ and /public/audio/sfx/
// ─────────────────────────────────────────────────────────────

import type { AudioTrack } from "@/lib/audio";

/**
 * Audio track registry.
 * Maps canonical soundtrack and sound effect IDs to media files in /public/audio/
 */
export const AUDIO_TRACKS: AudioTrack[] = [
  // ── Scene Background Soundtracks (BGM) ───────────────────────
  {
    id: "soundtrack-prologue",
    src: ["/audio/bgm/soundtrack-prologue.mp3", "/audio/soundtrack-prologue.mp3"],
    loop: true,
    volume: 0.7,
  },
  {
    id: "soundtrack-selection",
    src: ["/audio/bgm/soundtrack-selection.mp3", "/audio/soundtrack-selection.mp3"],
    loop: true,
    volume: 0.65,
  },
  {
    id: "soundtrack-journey",
    src: ["/audio/bgm/soundtrack-journey.mp3", "/audio/soundtrack-journey.mp3"],
    loop: true,
    volume: 0.75,
  },
  {
    id: "soundtrack-gallery",
    src: ["/audio/bgm/soundtrack-gallery.mp3", "/audio/soundtrack-gallery.mp3"],
    loop: true,
    volume: 0.7,
  },
  {
    id: "soundtrack-vinyl",
    src: ["/audio/bgm/soundtrack-vinyl.mp3", "/audio/soundtrack-vinyl.mp3"],
    loop: true,
    volume: 0.85,
  },
  {
    id: "soundtrack-gift-anticipation",
    src: [
      "/audio/bgm/soundtrack-gift-anticipation.mp3",
      "/audio/soundtrack-gift-anticipation.mp3",
    ],
    loop: true,
    volume: 0.8,
  },
  {
    id: "soundtrack-final-letter",
    src: [
      "/audio/bgm/soundtrack-final-letter.mp3",
      "/audio/soundtrack-final-letter.mp3",
    ],
    loop: true,
    volume: 0.9,
  },

  // ── Music Room Playlist Tracks ────────────────────────────────
  {
    id: "soundtrack-blue",
    src: ["/audio/bgm/soundtrack-blue.mp3", "/audio/soundtrack-blue.mp3"],
    loop: false,
    volume: 0.8,
  },
  {
    id: "soundtrack-until-i-found-you",
    src: [
      "/audio/bgm/soundtrack-until-i-found-you.mp3",
      "/audio/soundtrack-until-i-found-you.mp3",
    ],
    loop: false,
    volume: 0.8,
  },
  {
    id: "soundtrack-golden-hour",
    src: ["/audio/bgm/soundtrack-golden-hour.mp3", "/audio/soundtrack-golden-hour.mp3"],
    loop: false,
    volume: 0.8,
  },
  {
    id: "soundtrack-die-with-a-smile",
    src: [
      "/audio/bgm/soundtrack-die-with-a-smile.mp3",
      "/audio/soundtrack-die-with-a-smile.mp3",
    ],
    loop: true,
    volume: 0.8,
  },

  // ── Interactive Sound Effects (SFX) ──────────────────────────
  {
    id: "sfx-envelope-shimmer",
    src: ["/audio/sfx/sfx-envelope-shimmer.mp3", "/audio/sfx-envelope-shimmer.mp3"],
    loop: false,
    volume: 0.6,
  },
  {
    id: "sfx-card-flip",
    src: ["/audio/sfx/sfx-card-flip.mp3", "/audio/sfx-card-flip.mp3"],
    loop: false,
    volume: 0.6,
  },
  {
    id: "sfx-musicbox-chime",
    src: ["/audio/sfx/sfx-musicbox-chime.mp3", "/audio/sfx-musicbox-chime.mp3"],
    loop: false,
    volume: 0.6,
  },
  {
    id: "sfx-polaroid-place",
    src: ["/audio/sfx/sfx-polaroid-place.mp3", "/audio/sfx-polaroid-place.mp3"],
    loop: false,
    volume: 0.6,
  },
  {
    id: "sfx-needle-drop",
    src: ["/audio/sfx/sfx-needle-drop.mp3", "/audio/sfx-needle-drop.mp3"],
    loop: false,
    volume: 0.7,
  },
  {
    id: "sfx-wax-crack",
    src: ["/audio/sfx/sfx-wax-crack.mp3", "/audio/sfx-wax-crack.mp3"],
    loop: false,
    volume: 0.7,
  },
  {
    id: "sfx-parchment-unfold",
    src: [
      "/audio/sfx/sfx-parchment-unfold.mp3",
      "/audio/sfx-parchment-unfold.mp3",
    ],
    loop: false,
    volume: 0.6,
  },
];

/** Track IDs as a typed constant — prevents magic string usage */
export const TRACK_IDS = {
  PROLOGUE: "soundtrack-prologue",
  SELECTION: "soundtrack-selection",
  JOURNEY: "soundtrack-journey",
  GALLERY: "soundtrack-gallery",
  VINYL: "soundtrack-vinyl",
  GIFT: "soundtrack-gift-anticipation",
  FINAL_LETTER: "soundtrack-final-letter",
  BLUE: "soundtrack-blue",
  UNTIL_I_FOUND_YOU: "soundtrack-until-i-found-you",
  GOLDEN_HOUR: "soundtrack-golden-hour",
  DIE_WITH_A_SMILE: "soundtrack-die-with-a-smile",
} as const;

export type TrackId = (typeof TRACK_IDS)[keyof typeof TRACK_IDS];

/** Continuous main background soundtrack identifier */
export const MAIN_BGM_TRACK_ID = TRACK_IDS.DIE_WITH_A_SMILE;
