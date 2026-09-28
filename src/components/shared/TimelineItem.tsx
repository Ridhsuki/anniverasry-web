// ─────────────────────────────────────────────────────────────
// TimelineItem
// Reusable memory point component for chronological scrapbook timelines.
// Visual benchmark: docs/references/screenshots/journey-scene.png
// ─────────────────────────────────────────────────────────────

"use client";

import Image from "next/image";
import { useState } from "react";

import { PaperCard, PhotoFrame } from "@/components/ui";
import type { JourneyMilestone } from "@/data/journey";
import { cn } from "@/utils";

export interface TimelineItemProps {
  milestone: JourneyMilestone;
  index: number;
  isEven?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
}

export function TimelineItem({
  milestone,
  index,
  isEven = false,
  isSelected = false,
  onSelect,
  className,
}: TimelineItemProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "timeline-item-container relative w-full my-6 sm:my-8 md:my-12 flex flex-col md:flex-row items-center",
        isEven ? "md:flex-row-reverse" : "md:flex-row",
        className
      )}
    >
      {/* ── 1. Central Timeline Node (Pearl & Gold Medallion) ─── */}
      <div
        aria-hidden="true"
        className={cn(
          "timeline-node absolute z-20 flex items-center justify-center",
          // Mobile: positioned on left edge
          "left-4 md:left-1/2 -translate-x-1/2",
          "w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#d9a85f] via-[#fde68a] to-[#c9904a]",
          "border-2 border-[#fff9eb]/80 shadow-[0_0_15px_rgba(246,201,78,0.45)]",
          "transition-transform duration-300 group-hover:scale-110",
          isSelected && "ring-4 ring-gold/40 scale-110"
        )}
      >
        <div className="w-3.5 h-3.5 rounded-full bg-[#3b0810] flex items-center justify-center">
          <span className="text-[0.6rem] text-gold font-serif leading-none select-none">
            {index + 1}
          </span>
        </div>
      </div>

      {/* ── 2. Memory Scrapbook Card ──────────────────────────── */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          // Mobile: indent to right of left timeline line
          "pl-12 sm:pl-14 md:pl-0",
          // Desktop: 44% width pushed to alternating sides
          "md:w-[calc(50%-2.25rem)]",
          isEven ? "md:mr-auto" : "md:ml-auto"
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect?.(milestone.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect?.(milestone.id);
            }
          }}
          className={cn(
            "group relative block text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm transition-transform duration-300 ease-out",
            "hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.55)]",
            isSelected && "-translate-y-1.5 ring-2 ring-gold/60 shadow-[0_0_24px_rgba(246,201,78,0.35)]"
          )}
        >
          <PaperCard
            variant={index % 2 === 0 ? "aged" : "plain"}
            shadow="lg"
            hasTexture={true}
            padding="sm"
            className="w-full border-[#c9904a]/35"
          >
            {/* Header: Chapter Tag & Date */}
            <div className="flex items-center justify-between border-b border-[#c9904a]/25 pb-2.5 mb-3">
              <span className="font-serif text-[0.65rem] sm:text-xs tracking-widest text-[#783e15] font-semibold uppercase px-2 py-0.5 rounded-xs bg-[#c9904a]/15 border border-[#c9904a]/30">
                {milestone.chapter}
              </span>
              <span className="font-serif text-[0.7rem] sm:text-xs tracking-wider text-[#54290e] font-medium">
                {milestone.date}
              </span>
            </div>

            {/* Layout: Content + Photograph */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
              {/* Photo Frame Container */}
              <div className="w-full sm:w-40 md:w-44 shrink-0 mx-auto sm:mx-0">
                <PhotoFrame
                  variant={milestone.photo.frameVariant}
                  rotation={milestone.photo.rotation}
                  aspectRatio={milestone.photo.aspectRatio}
                  tapeStyle={milestone.photo.tapeStyle}
                  caption={milestone.photo.caption}
                  date={milestone.photo.date}
                  className="w-full shadow-md"
                >
                  <div className="relative w-full h-full min-h-[130px] sm:min-h-[140px] bg-gradient-to-br from-[#2a1710] via-[#1a0e08] to-[#0d0704] flex flex-col items-center justify-center p-2.5 overflow-hidden">
                    {/* Background Vintage Texture */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d9a85f_1px,transparent_1px)] [background-size:8px_8px]" />
                    <div className="absolute inset-0 shadow-[inset_0_0_16px_rgba(201,144,74,0.3)]" />

                    {!imageError && milestone.photo.src ? (
                      // Next/Image with graceful fallback on error
                      <Image
                        src={milestone.photo.src}
                        alt={milestone.photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 180px"
                        loading="lazy"
                        quality={85}
                        onError={() => setImageError(true)}
                        className="relative z-10 w-full h-full object-cover rounded-xs"
                      />
                    ) : (
                      /* Artistic Skeuomorphic Photographic Fallback */
                      <div className="relative z-10 flex flex-col items-center gap-1 text-center p-2">
                        <span className="text-gold/70 text-base">✦</span>
                        <span className="font-handwriting text-gold/80 text-xs sm:text-sm tracking-wide line-clamp-2">
                          {milestone.photo.alt}
                        </span>
                        <span className="font-sans text-[0.55rem] text-gold/50 tracking-widest uppercase">
                          {milestone.photo.date ?? milestone.date}
                        </span>
                      </div>
                    )}
                  </div>
                </PhotoFrame>
              </div>

              {/* Memory Story Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-[#2a1708] font-bold tracking-tight leading-snug">
                    {milestone.title}
                  </h3>
                  <p className="font-handwriting text-base sm:text-lg text-rose/90 mt-0.5">
                    {milestone.subtitle}
                  </p>
                  <p className="font-serif text-xs sm:text-sm text-[#3d2412] leading-relaxed mt-2.5 opacity-90">
                    {milestone.description}
                  </p>
                </div>

                {/* Romantic song quote & tags */}
                {milestone.quote && (
                  <div className="mt-3.5 pt-2 border-l-2 border-[#c9904a]/60 pl-3 bg-[#c9904a]/5 py-1 rounded-r-xs">
                    <p className="font-handwriting text-sm sm:text-base text-[#5c2409] italic">
                      &ldquo;{milestone.quote}&rdquo;
                    </p>
                  </div>
                )}

                {milestone.tags && milestone.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.6rem] font-sans tracking-wider text-[#6b3512] bg-[#e8c48a]/35 px-1.5 py-0.5 rounded-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </PaperCard>
        </div>
      </div>
    </div>
  );
}
