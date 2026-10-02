// ─────────────────────────────────────────────────────────────
// GalleryLightbox
// Cinematic modal dialog for viewing enlarged scrapbook photographs.
// Features smooth GSAP spring expansion, backdrop vignette blur,
// staggered metadata reveal, and graceful closing transitions.
// ─────────────────────────────────────────────────────────────

"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { PaperCard } from "@/components/ui/PaperCard";
import type { GalleryPhotoItem } from "@/data/gallery";
import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/utils";

export interface GalleryLightboxProps {
  photo: GalleryPhotoItem | null;
  onClose: () => void;
  className?: string;
}

/** Delicate antique location pin SVG */
function LocationPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-3.5 h-3.5", className)}
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 10.193 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function GalleryLightbox({ photo, onClose, className }: GalleryLightboxProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    if (containerRef.current && cardRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          onClose();
        },
      });

      tl.to(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 15,
        duration: 0.25,
        ease: "power2.in",
      }).to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power1.in",
        },
        "-=0.1"
      );
    } else {
      onClose();
    }
  }, [isClosing, onClose]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  // Track previous photo id to synchronously reset stale state on photo change.
  // This avoids calling setState inside a useEffect body (react-hooks/set-state-in-effect).
  const prevPhotoIdRef = useRef<string | undefined>(undefined);
  if (photo?.id !== prevPhotoIdRef.current) {
    prevPhotoIdRef.current = photo?.id;
    if (isClosing) setIsClosing(false);
    if (imageError) setImageError(false);
  }

  // GSAP Entrance Timeline
  useGSAP(
    () => {
      if (!photo || !cardRef.current || !containerRef.current) return;

      const tl = gsap.timeline();

      // 1. Backdrop fade in
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // 2. Card spring expansion
      tl.fromTo(
        cardRef.current,
        { scale: 0.85, opacity: 0, y: 25 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "back.out(1.2)",
        },
        "-=0.15"
      );

      // 3. Staggered metadata reveal
      tl.fromTo(
        ".lightbox-meta-item",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.2"
      );
    },
    [photo],
    containerRef
  );

  if (!photo) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view: ${photo.caption}`}
      onClick={handleClose}
      className={cn(
        "gallery-lightbox-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md select-none",
        className
      )}
    >
      <div
        ref={cardRef}
        className="relative max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <PaperCard
          variant="plain"
          shadow="xl"
          hasTexture={true}
          padding="md"
          className="w-full bg-[#fdf8f0] border-[#c9904a]/50 text-[#1a1209] shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
        >
          {/* Modal Close Button */}
          <button
            type="button"
            aria-label="Close photo preview"
            onClick={handleClose}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#3b0d14] text-gold hover:bg-[#520f1c] hover:text-[#fde68a] flex items-center justify-center font-serif text-sm transition-transform active:scale-90 shadow-md cursor-pointer border border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#3b0d14]"
          >
            ✕
          </button>

          {/* Enlarged Photo Container */}
          <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-[#160b06] shadow-inner mb-4">
            {!imageError && photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                quality={90}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-gold/80 text-2xl mb-1">✦</span>
                <span className="font-handwriting text-gold text-lg">{photo.caption}</span>
              </div>
            )}
          </div>

          {/* Title & Date */}
          <div className="lightbox-meta-item flex items-center justify-between border-b border-[#c9904a]/30 pb-2 mb-3">
            <h3 className="font-serif text-xl sm:text-2xl text-[#2a1708] font-bold">
              {photo.caption}
            </h3>
            <span className="font-serif text-xs text-[#6e3712] tracking-wider uppercase font-semibold">
              {photo.date}
            </span>
          </div>

          {/* Story Narrative */}
          {photo.storySnippet && (
            <p className="lightbox-meta-item font-serif text-sm text-[#3d2412] leading-relaxed mb-3">
              {photo.storySnippet}
            </p>
          )}

          {/* Location Badge */}
          {photo.location && (
            <div className="lightbox-meta-item flex items-center gap-1.5 text-xs text-[#8c4918] font-sans">
              <LocationPinIcon className="text-[#8c4918]" />
              <span className="tracking-wide font-medium">{photo.location}</span>
            </div>
          )}
        </PaperCard>
      </div>
    </div>
  );
}
