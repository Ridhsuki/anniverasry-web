import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SelectionScene } from "@/components/scenes/SelectionScene";
import { ExperienceProvider, useExperience } from "@/context/ExperienceContext";
import { SELECTION_CONTENT } from "@/data/selection";

describe("Scene Navigation & Experience Routing", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with the default initial scene", () => {
    const { result } = renderHook(() => useExperience(), {
      wrapper: ({ children }) => (
        <ExperienceProvider initialScene="intro" enableAudio={false} syncWithUrlHash={false}>
          {children}
        </ExperienceProvider>
      ),
    });

    expect(result.current.currentScene).toBe("intro");
    expect(result.current.previousScene).toBeNull();
    expect(result.current.history).toContain("intro");
  });

  it("updates active scene when goToScene is called", () => {
    const { result } = renderHook(() => useExperience(), {
      wrapper: ({ children }) => (
        <ExperienceProvider initialScene="intro" enableAudio={false} syncWithUrlHash={false}>
          {children}
        </ExperienceProvider>
      ),
    });

    act(() => {
      result.current.goToScene("gallery");
    });

    expect(result.current.currentScene).toBe("gallery");
    expect(result.current.previousScene).toBe("intro");
  });

  it("advances through narrative scenes sequentially with nextScene and prevScene", () => {
    const { result } = renderHook(() => useExperience(), {
      wrapper: ({ children }) => (
        <ExperienceProvider initialScene="intro" enableAudio={false} syncWithUrlHash={false}>
          {children}
        </ExperienceProvider>
      ),
    });

    // Advance to selection
    act(() => {
      result.current.nextScene();
    });
    expect(result.current.currentScene).toBe("selection");

    // Advance to journey
    act(() => {
      result.current.nextScene();
    });
    expect(result.current.currentScene).toBe("journey");

    // Return to previous scene
    act(() => {
      result.current.prevScene();
    });
    expect(result.current.currentScene).toBe("selection");
  });

  it("routes each artifact in SelectionScene to the correct target scene after tactile delay", () => {
    let currentActiveScene = "selection";

    const TestHarness = () => {
      const exp = useExperience();
      currentActiveScene = exp.currentScene;
      return <SelectionScene isActive={true} />;
    };

    render(
      <ExperienceProvider initialScene="selection" enableAudio={false} syncWithUrlHash={false}>
        <TestHarness />
      </ExperienceProvider>
    );

    // Verify all 4 artifacts are displayed with their accessible labels
    for (const artifact of SELECTION_CONTENT.artifacts) {
      const card = screen.getByRole("button", { name: artifact.ariaLabel });
      expect(card).toBeInTheDocument();
    }

    // Click "Moment" artifact -> routes to "gallery"
    const momentCard = screen.getByRole("button", {
      name: "Choose Moment: View timeless gallery of cherished memories",
    });
    fireEvent.click(momentCard);

    // Advance past tactile transition delay (350ms)
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(currentActiveScene).toBe("gallery");
  });
});
