// ─────────────────────────────────────────────────────────────
// Root Page
// Renders the interactive anniversary experience managed by
// ExperienceProvider and SceneManager.
// ─────────────────────────────────────────────────────────────

import { SceneManager } from "@/components/scenes";
import { CinematicLayer, CinematicCursor } from "@/components/ui";
import { ExperienceProvider } from "@/context";

export default function HomePage() {
  return (
    <ExperienceProvider initialScene="intro">
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full min-h-screen bg-bg-primary overflow-x-clip outline-none"
      >
        <SceneManager />
      </main>
      {/* Global cinematic polish: vignette + warm color grade + film grain + ambient particles */}
      <CinematicLayer />
      {/* Bespoke golden aura cursor for desktop fine-pointer devices */}
      <CinematicCursor />
    </ExperienceProvider>
  );
}
