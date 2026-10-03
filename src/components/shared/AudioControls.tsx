// ─────────────────────────────────────────────────────────────
// AudioControls
// Elegant minimal playback control bar for the anniversary vinyl player.
// Provides play/pause, prev/next, scrub bar, and volume controls.
// ─────────────────────────────────────────────────────────────

"use client";

import {
  NextTrackIcon,
  PauseIcon,
  PlayIcon,
  PrevTrackIcon,
  VolumeHighIcon,
  VolumeMuteIcon,
} from "@/components/ui/Icons";
import type { PlaylistTrack } from "@/data/playlist";
import { cn } from "@/utils";

export interface AudioControlsProps {
  track: PlaylistTrack;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  progress?: number; // 0 to 1
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek?: (newProgress: number) => void;
  className?: string;
}

export function AudioControls({
  track,
  isPlaying,
  isMuted,
  volume,
  progress = 0,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onToggleMute,
  onVolumeChange,
  onSeek,
  className,
}: AudioControlsProps) {
  // Format current elapsed time
  const currentSeconds = Math.floor(progress * track.durationSeconds);
  const curMins = Math.floor(currentSeconds / 60);
  const curSecs = String(currentSeconds % 60).padStart(2, "0");
  const timeFormatted = `${curMins}:${curSecs}`;

  return (
    <div
      className={cn(
        "audio-controls w-full max-w-md mx-auto flex flex-col items-center gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-sm select-none",
        "bg-[#1c080d]/80 border border-[#c9904a]/30 shadow-md backdrop-blur-xs",
        className
      )}
    >
      {/* ── 1. Progress Bar & Elapsed Time ────────────────────── */}
      <div className="w-full flex items-center gap-2 sm:gap-2.5">
        <span className="font-serif text-[0.65rem] sm:text-xs text-gold/70 w-7 sm:w-8 text-right font-medium">
          {timeFormatted}
        </span>

        {/* Clickable Progress Scrub Track */}
        <div
          role="slider"
          aria-label="Track progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newProg = Math.max(0, Math.min(1, clickX / rect.width));
            onSeek?.(newProg);
          }}
          className="relative flex-1 h-1.5 bg-[#3a121b] rounded-full cursor-pointer overflow-hidden group"
        >
          <div
            style={{ width: `${Math.round(progress * 100)}%` }}
            className="h-full bg-gradient-to-r from-gold/70 via-gold to-[#fef08a] rounded-full transition-all duration-150"
          />
        </div>

        <span className="font-serif text-[0.65rem] sm:text-xs text-gold/70 w-7 sm:w-8 text-left font-medium">
          {track.duration}
        </span>
      </div>

      {/* ── 2. Playback Action Buttons ────────────────────────── */}
      <div className="w-full flex items-center justify-between gap-1 sm:gap-2 px-1 sm:px-2">
        {/* Track Info Preview */}
        <div className="flex flex-col text-left min-w-0 max-w-[80px] xs:max-w-[110px] sm:max-w-[150px]">
          <span className="font-serif text-xs font-semibold text-[#fdf8f0] truncate leading-tight">
            {track.title}
          </span>
          <span className="font-sans text-[0.6rem] text-gold/60 truncate">
            {track.artist}
          </span>
        </div>

        {/* Center Control Group: Prev, Play, Next */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Previous Track */}
          <button
            type="button"
            aria-label="Previous track"
            onClick={onPrevTrack}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-gold/80 hover:text-gold hover:bg-[#380e18] transition-all active:scale-90 cursor-pointer"
          >
            <PrevTrackIcon size={12} className="sm:w-[14px] sm:h-[14px]" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            type="button"
            aria-label={isPlaying ? "Pause track" : "Play track"}
            onClick={onTogglePlay}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#d9a85f] via-[#fde68a] to-[#c9904a] text-[#1c080d] flex items-center justify-center font-bold text-sm shadow-[0_2px_12px_rgba(246,201,78,0.35)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            {isPlaying ? (
              <PauseIcon size={13} className="sm:w-[14px] sm:h-[14px]" />
            ) : (
              <PlayIcon size={13} className="translate-x-0.5 sm:w-[14px] sm:h-[14px]" />
            )}
          </button>

          {/* Next Track */}
          <button
            type="button"
            aria-label="Next track"
            onClick={onNextTrack}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-gold/80 hover:text-gold hover:bg-[#380e18] transition-all active:scale-90 cursor-pointer"
          >
            <NextTrackIcon size={12} className="sm:w-[14px] sm:h-[14px]" />
          </button>
        </div>

        {/* Volume & Mute Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            onClick={onToggleMute}
            className="text-xs text-gold/70 hover:text-gold transition-colors cursor-pointer p-0.5 sm:p-1"
          >
            {isMuted || volume === 0 ? (
              <VolumeMuteIcon size={15} className="sm:w-[16px] sm:h-[16px]" />
            ) : (
              <VolumeHighIcon size={15} className="sm:w-[16px] sm:h-[16px]" />
            )}
          </button>

          {/* Mini Volume Range */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            aria-label="Volume slider"
            className="w-11 sm:w-16 h-1 accent-gold bg-[#3a121b] rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
