// ─────────────────────────────────────────────────────────────
// Root Page
// Renders the interactive anniversary experience managed by
// ExperienceProvider and SceneManager.
// ─────────────────────────────────────────────────────────────

import { SceneManager } from "@/components/scenes";
import { CinematicLayer } from "@/components/ui";
import { ExperienceProvider } from "@/context";

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="w-full min-h-screen bg-bg-primary overflow-x-hidden outline-none"
    >
      <ExperienceProvider initialScene="intro">
        <SceneManager />
        {/* Global cinematic polish: vignette + warm color grade + film grain */}
        <CinematicLayer />
      </ExperienceProvider>
    </main>
  );
}
