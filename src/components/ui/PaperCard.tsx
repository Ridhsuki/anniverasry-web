// ─────────────────────────────────────────────────────────────
// PaperCard
// Tactile aged paper container inspired by vintage love letters,
// journal entries, and scrapbook sheets.
// Supports rotation tilt, aged parchment textures, and layered drop shadows.
// ─────────────────────────────────────────────────────────────

"use client";

import { forwardRef } from "react";

import type { PaperCardProps } from "@/types/components";
import { cn } from "@/utils";

const shadowClasses: Record<NonNullable<PaperCardProps["shadow"]>, string> = {
  none: "shadow-none",
  sm: "shadow-[0_1px_3px_rgba(26,18,9,0.2),0_2px_8px_rgba(26,18,9,0.15)]",
  md: "shadow-[0_2px_6px_rgba(26,18,9,0.25),0_6px_20px_rgba(26,18,9,0.2),0_0_24px_rgba(201,144,74,0.06)]",
  lg: "shadow-[0_4px_12px_rgba(26,18,9,0.3),0_12px_36px_rgba(26,18,9,0.25),0_0_48px_rgba(201,144,74,0.1)]",
  xl: "shadow-[0_8px_20px_rgba(26,18,9,0.35),0_20px_60px_rgba(26,18,9,0.3),0_0_72px_rgba(201,144,74,0.14)]",
};

const variantClasses: Record<NonNullable<PaperCardProps["variant"]>, string> = {
  plain:
    "bg-[#fdf8f0] text-[#1a1209] border border-[#e8c48a]/30",
  aged:
    "bg-gradient-to-br from-[#f9edd8] via-[#f2dbb4] to-[#e8c48a]/70 text-[#2d1f10] border border-[#c9904a]/30",
  torn:
    "bg-[#f9edd8] text-[#2d1f10] border-l-2 border-r-2 border-t border-b border-[#c9904a]/40 [clip-path:polygon(0%_1%,100%_0%,99%_98%,1%_100%)]",
  deckle:
    "bg-gradient-to-b from-[#fdf8f0] to-[#f2dbb4] text-[#2d1f10] rounded-sm border border-[#c9904a]/25",
};

const paddingClasses: Record<NonNullable<PaperCardProps["padding"]>, string> = {
  none: "p-0",
  sm: "px-4 py-3.5 sm:px-5 sm:py-4",
  md: "px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8",
  lg: "px-7 py-8 sm:px-10 sm:py-9 md:px-14 md:py-11",
};

export const PaperCard = forwardRef<HTMLDivElement, PaperCardProps>(
  (
    {
      variant = "aged",
      shadow = "md",
      rotation = 0,
      hasTexture = true,
      hasBorder = true,
      padding = "md",
      contentClassName,
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
        style={{
          transform: transformStyle,
          ...style,
        }}
        className={cn(
          "relative overflow-hidden rounded-sm transition-transform duration-300 ease-out gpu-accelerated",
          variantClasses[variant],
          shadowClasses[shadow],
          !hasBorder && "border-none",
          className
        )}
        {...props}
      >
        {/* Tactile paper texture layer (aged fiber vignette & inset depth) */}
        {hasTexture && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply bg-[radial-gradient(#c9904a_0.75px,transparent_0.75px)] [background-size:12px_12px]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 shadow-[inset_0_1px_4px_rgba(26,18,9,0.18),inset_0_0_24px_rgba(201,144,74,0.08)]"
            />
          </>
        )}

        {/* Content slot */}
        <div
          className={cn(
            "relative z-10",
            paddingClasses[padding],
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

PaperCard.displayName = "PaperCard";
