// ─────────────────────────────────────────────────────────────
// Audio Track Constants
// Defines available audio tracks.
// Register new tracks here and they'll be available via useAudio.
// ─────────────────────────────────────────────────────────────

import type { AudioTrack } from "@/lib/audio";

/**
 * Audio track registry.
 * Add entries as you add audio files to /public/audio/
 *
 * @example
 * {
 *   id: "background-music",
 *   src: ["/audio/background.mp3", "/audio/background.ogg"],
 *   loop: true,
 *   volume: 0.5,
 * }
 */
export const AUDIO_TRACKS: AudioTrack[] = [
  // Add your audio tracks here when ready.
  // Example (uncomment and fill in real paths):
  //
  // {
  //   id: "background-music",
  //   src: ["/audio/background.mp3"],
  //   loop: true,
  //   volume: 0.5,
  // },
];

/** Track IDs as a typed constant — prevents magic string usage */
export const TRACK_IDS = {
  BACKGROUND: "background-music",
  ENVELOPE_OPEN: "envelope-open",
  PAGE_TURN: "page-turn",
} as const;

export type TrackId = (typeof TRACK_IDS)[keyof typeof TRACK_IDS];
