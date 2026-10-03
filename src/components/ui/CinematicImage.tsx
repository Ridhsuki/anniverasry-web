// ─────────────────────────────────────────────────────────────
// CinematicImage
// High-fidelity image loader featuring smooth blur-up revelation,
// ambient backdrop shimmer, zero layout shift, and full compliance
// with prefers-reduced-motion accessibility standards.
// ─────────────────────────────────────────────────────────────

"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/utils";

export interface CinematicImageProps extends ImageProps {
  wrapperClassName?: string;
}

export function CinematicImage({
  className,
  wrapperClassName,
  alt,
  onLoad,
  ...props
}: CinematicImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-gradient-to-br from-[#1c0f09] via-[#120804] to-[#080402]",
        wrapperClassName
      )}
    >
      {/* Ambient placeholder shimmer before image load */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(246,201,78,0.12)_0%,_transparent_75%)] pointer-events-none transition-opacity duration-700 ease-out",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />

      <Image
        alt={alt}
        className={cn(
          "transition-all duration-700 ease-out will-change-[filter,opacity,transform]",
          "motion-reduce:transition-none motion-reduce:filter-none motion-reduce:opacity-100 motion-reduce:transform-none",
          isLoaded
            ? "opacity-100 blur-0 scale-100 filter-none"
            : "opacity-0 blur-xl scale-[1.04]",
          className
        )}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        {...props}
      />
    </div>
  );
}
