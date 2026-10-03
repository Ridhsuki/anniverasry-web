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

import { MAIN_BGM_TRACK_ID } from "@/constants/audio";

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
  private trackVolumes: Map<string, number> = new Map();
  private currentTrackId: string | null = null;
  private pausedMainBgmTrackId: string | null = null;
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
    const targetVolume = track.volume ?? this._volume;

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
      volume: targetVolume,
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
    this.trackVolumes.set(track.id, targetVolume);
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
  play(trackId: string, fadeDurationMs?: number): void {
    const howl = this.tracks.get(trackId);
    if (!howl) {
      console.warn(`[AudioManager] Track "${trackId}" not registered.`);
      return;
    }

    const isSfx = trackId.startsWith("sfx-");
    const defaultVol = this.trackVolumes.get(trackId) ?? this._volume;
    // SFX plays immediately without fading; musical tracks swell gently over 800ms by default
    const effectiveFade = isSfx ? 0 : (fadeDurationMs ?? 800);

    // If the requested track is already active and playing, simply ensure target volume and return
    if (this.currentTrackId === trackId && howl.playing()) {
      howl.off("fade");
      howl.volume(defaultVol);
      return;
    }

    if (howl.state() === "unloaded") {
      howl.load();
    }

    // Switch tracks: cleanly stop previous temporary track or pause main BGM
    if (this.currentTrackId && this.currentTrackId !== trackId) {
      const prevId = this.currentTrackId;
      const prevHowl = this.tracks.get(prevId);
      if (prevId === MAIN_BGM_TRACK_ID) {
        this.pauseMainBgm(0);
      } else if (prevHowl) {
        prevHowl.off("fade");
        prevHowl.stop();
        const def = this.trackVolumes.get(prevId) ?? this._volume;
        prevHowl.volume(def);
      }
    }

    this.currentTrackId = trackId;
    if (trackId === MAIN_BGM_TRACK_ID) {
      this.pausedMainBgmTrackId = null;
    }

    howl.off("fade");

    const startPlayback = () => {
      if (effectiveFade > 0 && !isSfx) {
        // Start at a gentle audible floor (40% volume) so user immediately hears music
        // from 0:00 without silence or needing to seek to the middle
        const initialVol = Math.max(0.15, defaultVol * 0.4);
        howl.volume(initialVol);
        if (!howl.playing()) {
          howl.play();
        }
        howl.fade(initialVol, defaultVol, Math.min(effectiveFade, 400));
        howl.once("fade", () => {
          if (!this._isMuted && this.currentTrackId === trackId) {
            howl.volume(defaultVol);
          }
        });
      } else {
        howl.volume(defaultVol);
        if (!howl.playing()) {
          howl.play();
        }
      }
    };

    if (howl.state() === "loading") {
      howl.once("load", () => {
        if (this.currentTrackId === trackId) {
          startPlayback();
        }
      });
    } else {
      startPlayback();
    }
  }

  pause(trackId?: string, fadeDurationMs: number = 0): void {
    const id = trackId ?? this.currentTrackId;
    if (!id) return;
    const howl = this.tracks.get(id);
    if (!howl) return;

    if (fadeDurationMs > 0 && howl.playing()) {
      const currentVol = (howl.volume() as number) || this._volume;
      howl.off("fade");
      howl.fade(currentVol, 0, fadeDurationMs);
      howl.once("fade", () => {
        howl.pause();
        const defaultVol = this.trackVolumes.get(id) ?? this._volume;
        howl.volume(defaultVol);
      });
      setTimeout(() => {
        if (howl.playing()) {
          howl.pause();
          const defaultVol = this.trackVolumes.get(id) ?? this._volume;
          howl.volume(defaultVol);
        }
      }, fadeDurationMs + 50);
    } else {
      howl.pause();
    }
  }

  stop(trackId?: string): void {
    const id = trackId ?? this.currentTrackId;
    if (!id) return;
    const howl = this.tracks.get(id);
    if (!howl) return;
    howl.off("fade");
    howl.stop();
    const defaultVol = this.trackVolumes.get(id) ?? this._volume;
    howl.volume(defaultVol);
    if (id === this.currentTrackId) {
      this.currentTrackId = null;
    }
  }

  /**
   * Pause continuous main BGM without resetting seek position.
   */
  pauseMainBgm(fadeDurationMs: number = 300): void {
    const mainTrackId = MAIN_BGM_TRACK_ID;
    const howl = this.tracks.get(mainTrackId);
    if (!howl) return;

    this.pausedMainBgmTrackId = mainTrackId;
    howl.off("fade");

    if (howl.playing()) {
      if (fadeDurationMs > 0) {
        const currentVol = (howl.volume() as number) || this._volume;
        howl.fade(currentVol, 0, fadeDurationMs);
        howl.once("fade", () => {
          if (this.pausedMainBgmTrackId === mainTrackId) {
            howl.pause();
            // Restore default volume so when resumed, it is not trapped at volume 0
            const defaultVol = this.trackVolumes.get(mainTrackId) ?? this._volume;
            howl.volume(defaultVol);
          }
        });
        setTimeout(() => {
          if (this.pausedMainBgmTrackId === mainTrackId && howl.playing()) {
            howl.pause();
            const defaultVol = this.trackVolumes.get(mainTrackId) ?? this._volume;
            howl.volume(defaultVol);
          }
        }, fadeDurationMs + 50);
      } else {
        howl.pause();
      }
    }
  }

  /**
   * Resume continuous main BGM from its exact previous seek position with a gentle swell.
   */
  resumeMainBgm(fadeDurationMs: number = 800): void {
    const mainTrackId = this.pausedMainBgmTrackId || MAIN_BGM_TRACK_ID;
    // Stop any temporary track (e.g. playlist vinyl track) cleanly and instantly
    if (this.currentTrackId && this.currentTrackId !== mainTrackId) {
      const tempId = this.currentTrackId;
      const tempHowl = this.tracks.get(tempId);
      if (tempHowl) {
        tempHowl.off("fade");
        tempHowl.stop();
        const def = this.trackVolumes.get(tempId) ?? this._volume;
        tempHowl.volume(def);
      }
    }
    const howl = this.tracks.get(mainTrackId);
    if (!howl) return;

    this.currentTrackId = mainTrackId;
    this.pausedMainBgmTrackId = null;
    howl.off("fade");
    if (howl.state() === "unloaded") {
      howl.load();
    }
    const targetVol = this.trackVolumes.get(mainTrackId) ?? this._volume;

    const startPlayback = () => {
      if (fadeDurationMs > 0) {
        const initialVol = Math.max(0.15, targetVol * 0.4);
        howl.volume(initialVol);
        if (!howl.playing()) {
          howl.play();
        }
        howl.fade(initialVol, targetVol, Math.min(fadeDurationMs, 400));
        howl.once("fade", () => {
          if (!this._isMuted && this.currentTrackId === mainTrackId) {
            howl.volume(targetVol);
          }
        });
      } else {
        howl.volume(targetVol);
        if (!howl.playing()) {
          howl.play();
        }
      }
    };

    if (howl.state() === "loading") {
      howl.once("load", () => {
        if (this.currentTrackId === mainTrackId) {
          startPlayback();
        }
      });
    } else {
      startPlayback();
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
    const targetVol =
      targetVolume !== undefined ? targetVolume : (this.trackVolumes.get(trackId) ?? this._volume);
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
        const defaultVol = this.trackVolumes.get(trackId) ?? this._volume;
        howl.volume(defaultVol);
      }
    });
  }

  crossfade(
    fromTrackId: string | null,
    toTrackId: string,
    durationMs: number = 1000,
    targetVolume?: number
  ): void {
    if (fromTrackId && fromTrackId !== toTrackId) {
      if (fromTrackId === MAIN_BGM_TRACK_ID) {
        this.pauseMainBgm(0);
      } else {
        this.fadeOut(fromTrackId, Math.min(durationMs, 400));
      }
    }
    this.play(toTrackId);
    if (targetVolume !== undefined) {
      this.tracks.get(toTrackId)?.volume(targetVolume);
    }
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
    this.pausedMainBgmTrackId = null;
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
