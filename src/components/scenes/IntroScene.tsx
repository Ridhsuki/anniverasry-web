// ─────────────────────────────────────────────────────────────
// IntroScene
// Scene 1: Interactive envelope opening & cinematic entrance.
// Structural foundation only — no finalized design content.
// ─────────────────────────────────────────────────────────────

"use client";

import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

export function IntroScene(props: SceneProps) {
  const { isActive = false, className, children } = props;

  return (
    <section
      id="scene-intro"
      data-scene="intro"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 text-center select-none",
        className
      )}
    >
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl w-full flex flex-col items-center justify-center gap-8">
        <header className="scene-header flex flex-col items-center gap-3" />
        <div className="scene-stage relative w-full flex items-center justify-center min-h-[320px]">
          {children}
        </div>
        <footer className="scene-actions flex items-center justify-center gap-4" />
      </div>
    </section>
  );
}
