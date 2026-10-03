// ─────────────────────────────────────────────────────────────
// Audio Manager — Howler.js Integration Layer
// Provides a singleton AudioManager class for controlling
// background music and sound effects throughout the app.
//
// ARCHITECTURE NOTE:
// - This file should only be imported in client components
// - Use the useAudio hook for React integration
// - Actual audio files are NOT configured here — add them
//   in src/constants/audio.ts and pass to AudioManager
// ─────────────────────────────────────────────────────────────

import { Howl, Howler } from "howler";

// ── Types ──────────────────────────────────────────────────────
export interface AudioTrack {
  id: string;
  src: string[];
  loop?: boolean;
  volume?: number;
  autoplay?: boolean;
  html5?: boolean;
  preload?: boolean | "metadata";
}

export interface AudioManagerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrackId: string | null;
}

// ── AudioManager Singleton ─────────────────────────────────────
class AudioManager {
  private tracks: Map<string, Howl> = new Map();
  private currentTrackId: string | null = null;
  private _isMuted: boolean = false;
  private _volume: number = 0.7;
  private _unlocked: boolean = false;

  // ── Initialisation ───────────────────────────────────────────
  /**
   * Register audio tracks with optimal streaming and preload strategies.
   * - SFX: Web Audio API (html5: false), preloaded for zero-latency instant playback.
   * - BGM: HTML5 streaming (html5: true), lazy-loaded on demand to preserve bandwidth.
   */
  registerTrack(track: AudioTrack): void {
    if (this.tracks.has(track.id)) return;

    const isSfx = track.id.startsWith("sfx-");
    const useHtml5 = track.html5 ?? !isSfx;
    const shouldPreload = track.preload ?? false;

    // Multi-source array in Howler is strictly intended for format negotiation (e.g. webm, mp3).
    // Deduplicate identical file extensions to ensure Howler does not combine duplicate URLs.
    const seenExtensions = new Set<string>();
    const sanitizedSrc = (Array.isArray(track.src) ? track.src : [track.src]).filter(
      (sourceUrl) => {
        const extMatch = /\.([^.?#]+)(?:[?#]|$)/.exec(sourceUrl);
        const ext = extMatch ? extMatch[1].toLowerCase() : "";
        if (!ext || seenExtensions.has(ext)) return false;
        seenExtensions.add(ext);
        return true;
      }
    );

    const howl = new Howl({
      src: sanitizedSrc.length > 0 ? sanitizedSrc : track.src,
      loop: track.loop ?? false,
      volume: track.volume ?? this._volume,
      autoplay: false,
      preload: shouldPreload,
      html5: useHtml5,
      onloaderror: (_id, error) => {
        console.error(`[AudioManager] Failed to load track "${track.id}":`, error);
      },
      onplayerror: (_id, error) => {
        console.error(`[AudioManager] Failed to play track "${track.id}":`, error);
        // Attempt to unlock audio context on mobile
        howl.once("unlock", () => howl.play());
      },
    });

    this.tracks.set(track.id, howl);
  }

  /**
   * Unlock audio context on mobile browsers upon user interaction.
   */
  unlockAudio(): void {
    if (this._unlocked || typeof window === "undefined") return;
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      Howler.ctx.resume().then(() => {
        this._unlocked = true;
      });
    } else {
      this._unlocked = true;
    }
  }

  // ── Playback Controls ────────────────────────────────────────
  play(trackId: string): void {
    const howl = this.tracks.get(trackId);
    if (!howl) {
      console.warn(`[AudioManager] Track "${trackId}" not registered.`);
      return;
    }

    if (howl.state() === "unloaded") {
      howl.load();
    }

    // Stop current track before switching
    if (this.currentTrackId && this.currentTrackId !== trackId) {
      this.stop(this.currentTrackId);
    }

    this.currentTrackId = trackId;
    if (!howl.playing()) {
      howl.play();
    }
  }

  pause(trackId?: string): void {
    const id = trackId ?? this.currentTrackId;
    if (!id) return;
    this.tracks.get(id)?.pause();
  }

  stop(trackId?: string): void {
    const id = trackId ?? this.currentTrackId;
    if (!id) return;
    this.tracks.get(id)?.stop();
    if (id === this.currentTrackId) {
      this.currentTrackId = null;
    }
  }

  // ── Fade Controls ────────────────────────────────────────────
  fadeIn(trackId: string, durationMs: number = 2000, targetVolume?: number): void {
    const howl = this.tracks.get(trackId);
    if (!howl) return;
    howl.off("fade");
    if (howl.state() === "unloaded") {
      howl.load();
    }
    const currentVol = howl.playing() ? (howl.volume() as number) : 0;
    const targetVol = targetVolume !== undefined ? targetVolume : this._volume;
    if (!howl.playing()) {
      howl.volume(0);
      howl.play();
    }
    howl.fade(currentVol, targetVol, durationMs);
  }

  fadeOut(trackId: string, durationMs: number = 2000): void {
    const howl = this.tracks.get(trackId);
    if (!howl) return;
    howl.off("fade");
    const currentVol = howl.volume() as number;
    howl.fade(currentVol, 0, durationMs);
    howl.once("fade", () => {
      if ((howl.volume() as number) === 0) {
        howl.stop();
      }
    });
  }

  crossfade(
    fromTrackId: string | null,
    toTrackId: string,
    durationMs: number = 1500,
    targetVolume?: number
  ): void {
    if (fromTrackId && fromTrackId !== toTrackId) {
      this.fadeOut(fromTrackId, durationMs);
    }
    this.currentTrackId = toTrackId;
    this.fadeIn(toTrackId, durationMs, targetVolume);
  }

  playSfx(sfxId: string): void {
    const howl = this.tracks.get(sfxId);
    if (!howl) {
      return;
    }
    if (howl.state() === "unloaded") {
      howl.load();
    }
    howl.play();
  }

  getTrack(trackId: string): Howl | undefined {
    return this.tracks.get(trackId);
  }

  isTrackRegistered(trackId: string): boolean {
    return this.tracks.has(trackId);
  }

  // ── Volume ───────────────────────────────────────────────────
  setVolume(value: number): void {
    this._volume = Math.max(0, Math.min(1, value));
    Howler.volume(this._volume);
  }

  get volume(): number {
    return this._volume;
  }

  // ── Mute ─────────────────────────────────────────────────────
  mute(): void {
    this._isMuted = true;
    Howler.mute(true);
  }

  unmute(): void {
    this._isMuted = false;
    Howler.mute(false);
  }

  toggleMute(): void {
    if (this._isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  get isMuted(): boolean {
    return this._isMuted;
  }

  // ── State ─────────────────────────────────────────────────────
  getState(): AudioManagerState {
    const howl = this.currentTrackId
      ? this.tracks.get(this.currentTrackId)
      : null;

    return {
      isPlaying: howl?.playing() ?? false,
      isMuted: this._isMuted,
      volume: this._volume,
      currentTrackId: this.currentTrackId,
    };
  }

  // ── Cleanup ───────────────────────────────────────────────────
  destroy(): void {
    this.tracks.forEach((howl) => howl.unload());
    this.tracks.clear();
    this.currentTrackId = null;
  }
}

// ── Singleton Export ──────────────────────────────────────────
// Export a single shared instance for the entire application.
// Guards against double-instantiation in development HMR.
const globalWithAudio = global as typeof global & {
  __audioManager?: AudioManager;
};

export const audioManager: AudioManager =
  globalWithAudio.__audioManager ??
  (globalWithAudio.__audioManager = new AudioManager());

export default audioManager;
