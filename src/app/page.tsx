// ─────────────────────────────────────────────────────────────
// Root Page
// Renders the interactive anniversary experience managed by
// ExperienceProvider and SceneManager.
// ─────────────────────────────────────────────────────────────

import { SceneManager } from "@/components/scenes";
import { ExperienceProvider } from "@/context";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-bg-primary overflow-x-hidden">
      <ExperienceProvider initialScene="intro">
        <SceneManager />
      </ExperienceProvider>
    </main>
  );
}
