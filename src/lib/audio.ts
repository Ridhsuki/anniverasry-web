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

  // ── Initialisation ───────────────────────────────────────────
  /**
   * Register audio tracks without loading them.
   * Tracks are loaded lazily on first play.
   */
  registerTrack(track: AudioTrack): void {
    if (this.tracks.has(track.id)) return;

    const howl = new Howl({
      src: track.src,
      loop: track.loop ?? false,
      volume: track.volume ?? this._volume,
      autoplay: false,
      preload: true,
      html5: true, // Use HTML5 audio for long tracks (streaming)
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

  // ── Playback Controls ────────────────────────────────────────
  play(trackId: string): void {
    const howl = this.tracks.get(trackId);
    if (!howl) {
      console.warn(`[AudioManager] Track "${trackId}" not registered.`);
      return;
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
  fadeIn(trackId: string, durationMs: number = 2000): void {
    const howl = this.tracks.get(trackId);
    if (!howl) return;
    howl.volume(0);
    if (!howl.playing()) howl.play();
    howl.fade(0, this._volume, durationMs);
  }

  fadeOut(trackId: string, durationMs: number = 2000): void {
    const howl = this.tracks.get(trackId);
    if (!howl) return;
    howl.fade(howl.volume() as number, 0, durationMs);
    howl.once("fade", () => howl.stop());
  }

  crossfade(
    fromTrackId: string | null,
    toTrackId: string,
    durationMs: number = 1500
  ): void {
    if (fromTrackId && fromTrackId !== toTrackId) {
      this.fadeOut(fromTrackId, durationMs);
    }
    this.currentTrackId = toTrackId;
    this.fadeIn(toTrackId, durationMs);
  }

  playSfx(sfxId: string): void {
    const howl = this.tracks.get(sfxId);
    if (!howl) {
      return;
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
