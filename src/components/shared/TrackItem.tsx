// ─────────────────────────────────────────────────────────────
// TrackItem
// Reusable track selector card for the anniversary soundtrack.
// Displays metadata, active track highlight, and tactile play response.
// ─────────────────────────────────────────────────────────────

"use client";

import { CinematicImage } from "@/components/ui/CinematicImage";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";
import type { PlaylistTrack } from "@/data/playlist";
import { cn } from "@/utils";

export interface TrackItemProps {
  track: PlaylistTrack;
  index: number;
  isActiveTrack: boolean;
  isPlaying: boolean;
  onSelectTrack: (track: PlaylistTrack) => void;
  className?: string;
}

export function TrackItem({
  track,
  index,
  isActiveTrack,
  isPlaying,
  onSelectTrack,
  className,
}: TrackItemProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Select track: ${track.title} by ${track.artist}`}
      onClick={() => onSelectTrack(track)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectTrack(track);
        }
      }}
      className={cn(
        "track-item group relative w-full flex items-center justify-between p-2.5 sm:p-3 rounded-sm cursor-pointer select-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        "bg-[#1c080d]/60 border border-[#c9904a]/30 hover:border-gold/60 hover:bg-[#2e0c15]/70 hover:-translate-y-0.5 shadow-sm",
        isActiveTrack && "bg-[#380e18] border-gold ring-1 ring-gold/50 shadow-[0_0_16px_rgba(246,201,78,0.25)]",
        className
      )}
    >
      {/* Left: Index & Metadata */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Index or Animated Sound Waves */}
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          {isActiveTrack && isPlaying ? (
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 bg-gold rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
              <span className="w-1 bg-gold rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-4" />
              <span className="w-1 bg-gold rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-3" />
            </div>
          ) : (
            <span className="font-serif text-xs text-gold/70 font-semibold">
              {formattedIndex}
            </span>
          )}
        </div>

        {/* Album Cover Thumbnail */}
        {track.coverImage && (
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xs overflow-hidden shrink-0 border border-[#c9904a]/40 shadow-xs">
            <CinematicImage
              src={track.coverImage}
              alt={`${track.title} cover`}
              fill
              sizes="36px"
              loading="lazy"
              quality={80}
              className="object-cover"
            />
          </div>
        )}

        {/* Title & Artist */}
        <div className="flex flex-col min-w-0 text-left">
          <span
            className={cn(
              "font-serif text-xs sm:text-sm font-semibold truncate transition-colors duration-200",
              isActiveTrack ? "text-[#fdf8f0] drop-shadow-sm" : "text-[#f4e4cf] group-hover:text-gold"
            )}
          >
            {track.title}
          </span>
          <span className="font-sans text-[0.65rem] sm:text-xs text-gold/60 truncate">
            {track.artist}
          </span>
        </div>
      </div>

      {/* Right: Duration & Mood Tag */}
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <span className="text-[0.65rem] font-serif text-[#c9904a]/80">
          {track.duration}
        </span>
        <span
          className={cn(
            "text-xs transition-transform duration-200 flex items-center justify-center",
            isActiveTrack ? "text-gold scale-110" : "text-white/30 group-hover:text-gold/70"
          )}
        >
          {isActiveTrack && isPlaying ? (
            <PauseIcon size={12} />
          ) : (
            <PlayIcon size={12} className="translate-x-0.5" />
          )}
        </span>
      </div>
    </div>
  );
}
