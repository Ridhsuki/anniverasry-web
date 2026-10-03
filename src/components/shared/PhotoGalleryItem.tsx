// ─────────────────────────────────────────────────────────────
// PhotoGalleryItem
// Reusable individual photograph element for scrapbook galleries.
// Renders physical Polaroid prints with authentic tilt, washi tape,
// 3D red heart pins, and handwritten caption chin.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";

import { CinematicImage, PhotoFrame } from "@/components/ui";
import type { GalleryPhotoItem } from "@/data/gallery";
import { cn } from "@/utils";

/** 3D Glossy Red Heart Pushpin */
export function RedHeartPin({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 w-7 h-7 select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="pinRed" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="40%" stopColor="#dc2626" />
            <stop offset="85%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
        </defs>
        {/* Heart Pin Head */}
        <path
          d="M16 28 C9 21, 2 15, 2 9 C2 4.5, 6 2, 10.5 2 C13.5 2, 15 3.5, 16 5 C17 3.5, 18.5 2, 21.5 2 C26 2, 30 4.5, 30 9 C30 15, 23 21, 16 28 Z"
          fill="url(#pinRed)"
          stroke="#450a0a"
          strokeWidth="0.75"
        />
        {/* Specular Highlight */}
        <ellipse cx="11" cy="7" rx="3" ry="2" fill="#ffffff" opacity="0.6" transform="rotate(-30 11 7)" />
      </svg>
    </div>
  );
}

export interface PhotoGalleryItemProps {
  photo: GalleryPhotoItem;
  index: number;
  isSelected?: boolean;
  onClick?: (photo: GalleryPhotoItem) => void;
  className?: string;
}

export function PhotoGalleryItem({
  photo,
  index,
  isSelected = false,
  onClick,
  className,
}: PhotoGalleryItemProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open memory: ${photo.caption} (${photo.date})`}
      onClick={() => onClick?.(photo)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(photo);
        }
      }}
      className={cn(
        "gallery-photo-card group relative block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xs transition-all duration-300 ease-out select-none",
        "hover:-translate-y-2 hover:scale-[1.03] hover:z-30",
        isSelected && "z-30 -translate-y-2 scale-[1.03] ring-2 ring-gold/70 shadow-[0_0_24px_rgba(246,201,78,0.4)]",
        className
      )}
    >
      {/* 3D Glossy Red Heart Pushpin (if assigned) */}
      {photo.pinVariant === "red-heart" && <RedHeartPin />}

      <PhotoFrame
        variant={photo.frameVariant}
        rotation={photo.rotation}
        aspectRatio={photo.aspectRatio}
        tapeStyle={photo.tapeStyle}
        caption={photo.caption}
        date={photo.date}
        className={cn(
          "w-full shadow-[0_6px_20px_rgba(0,0,0,0.45)] transition-shadow duration-300 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.65)]",
          photo.pinVariant === "red-heart" && "pt-2"
        )}
      >
        <div className="relative w-full h-full min-h-[140px] sm:min-h-[160px] bg-gradient-to-br from-[#24140b] via-[#160b06] to-[#0a0503] flex flex-col items-center justify-center p-2 overflow-hidden">
          {/* Subtle vintage texture overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d9a85f_1px,transparent_1px)] [background-size:8px_8px]" />
          <div className="absolute inset-0 shadow-[inset_0_0_18px_rgba(201,144,74,0.25)]" />

          {!imageError && photo.src ? (
            // Photographic memory image
            <CinematicImage
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
              loading="lazy"
              quality={85}
              onError={() => setImageError(true)}
              className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* Photographic Placeholder Artwork */
            <div className="relative z-10 flex flex-col items-center gap-1.5 text-center p-2">
              <span className="text-gold/70 text-lg">✦</span>
              <span className="font-handwriting text-gold text-sm sm:text-base tracking-wide line-clamp-2 px-1">
                {photo.caption}
              </span>
              <span className="font-sans text-[0.6rem] text-gold/50 tracking-widest uppercase">
                {photo.date}
              </span>
            </div>
          )}

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 z-20 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
            <span className="font-serif text-[0.65rem] sm:text-xs text-[#fff9eb] tracking-widest uppercase bg-black/60 px-2.5 py-1 rounded-xs backdrop-blur-xs border border-gold/40">
              Lihat Kenangan
            </span>
          </div>
        </div>
      </PhotoFrame>

      {/* Hidden screen-reader index */}
      <span className="sr-only">Memory {index + 1} of 8</span>
    </div>
  );
}
