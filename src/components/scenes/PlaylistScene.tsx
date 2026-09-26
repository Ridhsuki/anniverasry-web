// ─────────────────────────────────────────────────────────────
// PlaylistScene
// Scene 5: Vinyl record player & memorable songs playlist.
// Structural foundation only — no finalized design content.
// ─────────────────────────────────────────────────────────────

"use client";

import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

export function PlaylistScene(props: SceneProps) {
  const { isActive = false, className, children } = props;

  return (
    <section
      id="scene-playlist"
      data-scene="playlist"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 select-none",
        className
      )}
    >
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl w-full flex flex-col items-center gap-10">
        <header className="scene-header text-center flex flex-col items-center gap-2" />
        <div className="scene-stage relative w-full flex flex-col md:flex-row items-center justify-center gap-8 min-h-[360px]">
          {children}
        </div>
        <footer className="scene-actions flex items-center justify-between w-full max-w-xl" />
      </div>
    </section>
  );
}
