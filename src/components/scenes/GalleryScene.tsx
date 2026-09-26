// ─────────────────────────────────────────────────────────────
// GalleryScene
// Scene 4: Scrapbook photo gallery with tactile polaroids & frames.
// Structural foundation only — no finalized design content.
// ─────────────────────────────────────────────────────────────

"use client";

import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

export function GalleryScene(props: SceneProps) {
  const { isActive = false, className, children } = props;

  return (
    <section
      id="scene-gallery"
      data-scene="gallery"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden py-16 px-6",
        className
      )}
    >
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl w-full flex flex-col items-center gap-12">
        <header className="scene-header text-center flex flex-col items-center gap-3" />
        <div className="scene-stage relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center min-h-[440px]">
          {children}
        </div>
        <footer className="scene-actions flex items-center justify-between w-full max-w-xl" />
      </div>
    </section>
  );
}
