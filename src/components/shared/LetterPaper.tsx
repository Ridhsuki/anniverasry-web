// ─────────────────────────────────────────────────────────────
// LetterPaper
// Physical aged parchment letter component for the final love letter.
// Renders deckle edges, aged fiber textures, gold rule margins,
// handwritten typography, and an embedded keepsake photograph.
// ─────────────────────────────────────────────────────────────

"use client";

import { CinematicImage, PhotoFrame } from "@/components/ui";
import type { LetterPhotoMetadata } from "@/data/finalLetter";
import { cn } from "@/utils";

export interface LetterPaperProps {
  greeting: string;
  paragraphs: string[];
  photo: LetterPhotoMetadata;
  children?: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

const letterPaddingClasses: Record<"none" | "sm" | "md" | "lg", string> = {
  none: "p-0",
  sm: "px-6 py-6 sm:px-10 sm:py-8",
  md: "px-6 py-8 sm:px-12 sm:py-12 md:px-16 md:py-14 lg:px-20",
  lg: "px-8 py-10 sm:px-14 sm:py-14 md:px-20 md:py-16 lg:px-24",
};

export function LetterPaper({
  greeting,
  paragraphs,
  photo,
  children,
  padding = "md",
  className,
}: LetterPaperProps) {
  return (
    <article
      data-paper="true"
      className={cn(
        "letter-paper-sheet relative w-full max-w-2xl mx-auto select-none",
        letterPaddingClasses[padding],
        "bg-gradient-to-b from-[#fdfbf7] via-[#f7f0e4] to-[#f0e2cd] text-[#2d1c10]",
        "rounded-sm border border-[#c9904a]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(201,144,74,0.15)]",
        className
      )}
    >
      {/* ── 1. Tactile Paper Textures & Watermarks ─────────────── */}
      {/* Aged Paper Grain Fiber */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(#c9904a_0.75px,transparent_0.75px)] [background-size:10px_10px]"
      />
      {/* Inset Vignette Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_2px_8px_rgba(45,28,16,0.15),inset_0_0_32px_rgba(201,144,74,0.1)]"
      />
      {/* Subtle Horizontal Crease Line Across Center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#c9904a]/25 to-transparent"
      />

      {/* ── 2. Delicate Gold Double-Line Inner Margin ─────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2.5 sm:inset-4 border border-[#c9904a]/30 rounded-xs"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3.5 sm:inset-5 border border-[#d9a85f]/15 rounded-xs"
      />

      {/* ── 3. Inner Editorial Content Stage ─────────────────── */}
      <div className="paper-content-inner px-3 sm:px-6 md:px-8 py-2">
        {/* Embedded Corner Keepsake Polaroid Photo */}
        <div className="sm:float-right mx-auto sm:mx-0 sm:ml-6 mb-5 w-28 sm:w-36 md:w-40 shrink-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] flex justify-center">
          <PhotoFrame
            variant="polaroid"
            rotation={photo.rotation}
            aspectRatio="portrait"
            tapeStyle="top-center"
            caption={photo.caption}
            date={photo.date}
            className="w-full"
          >
            <div className="relative w-full h-full min-h-[110px] sm:min-h-[130px] bg-gradient-to-br from-[#2a1710] to-[#0a0503] flex flex-col items-center justify-center p-2 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d9a85f_1px,transparent_1px)] [background-size:8px_8px]" />
              <div className="absolute inset-0 shadow-[inset_0_0_16px_rgba(201,144,74,0.3)] pointer-events-none z-20" />
              {photo.src ? (
                <CinematicImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="180px"
                  loading="lazy"
                  quality={85}
                  className="relative z-10 w-full h-full object-cover rounded-xs"
                />
              ) : (
                <>
                  <span className="text-gold/80 text-base mb-0.5">♥</span>
                  <span className="font-handwriting text-gold text-xs sm:text-sm tracking-wide line-clamp-2">
                    {photo.caption}
                  </span>
                </>
              )}
            </div>
          </PhotoFrame>
        </div>

        {/* Handwritten Salutation */}
        <header className="relative z-10 mb-6 sm:mb-8">
          <h2 className="letter-greeting font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#3b180d] font-normal leading-tight tracking-wide drop-shadow-xs">
            {greeting}
          </h2>
        </header>

        {/* Letter Paragraphs Flow */}
        <section className="relative z-10 flex flex-col gap-4 sm:gap-6 font-serif text-sm sm:text-base leading-[1.95] sm:leading-[2.2] text-[#331c0e] text-left sm:text-justify tracking-wide opacity-95">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="letter-paragraph indent-5 sm:indent-8">
              {p}
            </p>
          ))}
        </section>

        {/* Children Slot (SignatureBlock & Closing) */}
        <div className="relative z-10 mt-8 sm:mt-10 clear-both">{children}</div>
      </div>
    </article>
  );
}
