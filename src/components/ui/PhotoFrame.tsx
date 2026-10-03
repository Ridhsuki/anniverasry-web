// ─────────────────────────────────────────────────────────────
// PhotoFrame
// Vintage photograph container for scrapbook and gallery layouts.
// Supports gold gilded frames, polaroid borders, washi tape accents,
// and handwritten romantic captions.
// ─────────────────────────────────────────────────────────────

"use client";

import { forwardRef } from "react";

import type { PhotoFrameProps } from "@/types/components";
import { cn } from "@/utils";

const frameVariantStyles: Record<
  NonNullable<PhotoFrameProps["variant"]>,
  string
> = {
  gold:
    "p-3.5 bg-gradient-to-b from-[#2a1d12] via-[#1a1209] to-[#0d0d0d] border-2 border-[#d9a85f]/60 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(217,168,95,0.15)] ring-1 ring-[#fde68a]/30",
  polaroid:
    "p-4 pb-8 sm:p-5 sm:pb-9 bg-[#fdf8f0] text-[#1a1209] border border-[#e8c48a]/30 shadow-[0_4px_24px_rgba(26,18,9,0.35),0_1px_3px_rgba(0,0,0,0.2)]",
  classic:
    "p-2.5 bg-[#141414] border border-[#c9904a]/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)]",
  filigree:
    "p-4 bg-[#1a1209] border-2 border-[#c9904a]/70 shadow-[0_8px_32px_rgba(0,0,0,0.7),inset_0_0_12px_rgba(201,144,74,0.12)] ring-1 ring-[#f6c94e]/40",
};

const aspectStyles = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  auto: "aspect-auto",
};

export const PhotoFrame = forwardRef<HTMLDivElement, PhotoFrameProps>(
  (
    {
      variant = "gold",
      rotation = 0,
      caption,
      date,
      aspectRatio = "portrait",
      tapeStyle = "none",
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const transformStyle = rotation ? `rotate(${rotation}deg)` : undefined;

    return (
      <div
        ref={ref}
        data-paper={variant === "polaroid" ? "true" : undefined}
        style={{
          transform: transformStyle,
          ...style,
        }}
        className={cn(
          "group relative inline-block transition-transform duration-300 ease-out gpu-accelerated select-none",
          frameVariantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Washi tape: Top-center accent */}
        {tapeStyle === "top-center" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 left-1/2 z-20 h-5 w-16 -translate-x-1/2 -rotate-1 bg-[#e8c48a]/70 backdrop-blur-xs shadow-xs border-y border-[#d9a85f]/40 [clip-path:polygon(3%_0%,97%_2%,100%_98%,0%_100%)] opacity-85"
          />
        )}

        {/* Washi tape: Corner accents */}
        {tapeStyle === "corners" && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 -left-3 z-20 h-4 w-10 -rotate-45 bg-[#e8c48a]/70 shadow-xs border border-[#d9a85f]/40 opacity-80"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 -right-3 z-20 h-4 w-10 rotate-45 bg-[#e8c48a]/70 shadow-xs border border-[#d9a85f]/40 opacity-80"
            />
          </>
        )}

        {/* Media container */}
        <div
          className={cn(
            "relative overflow-hidden rounded-xs bg-[#080808]",
            aspectStyles[aspectRatio]
          )}
        >
          {children}

          {/* Subtle vintage vignette glaze over the photo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_24px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* Caption & date slot */}
        {(caption || date) && (
          <div className="mt-3 text-center px-4 sm:px-6">
            {caption && (
              <p
                className={cn(
                  "font-handwriting text-base md:text-lg leading-tight tracking-wide break-words px-1",
                  variant === "polaroid" ? "text-[#2d1f10]" : "text-[#e8c48a]"
                )}
              >
                {caption}
              </p>
            )}
            {date && (
              <p
                className={cn(
                  "mt-0.5 text-[0.65rem] tracking-widest uppercase font-sans opacity-70 break-words",
                  variant === "polaroid" ? "text-[#5c4020]" : "text-[#c4a06e]"
                )}
              >
                {date}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

PhotoFrame.displayName = "PhotoFrame";
