import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createSceneTransitionTimeline } from "@/animations/cinematic";
import { breathingAnimation, floatingMovement } from "@/animations/floating";
import { FloatingDecoration } from "@/components/ui/FloatingDecoration";

describe("Reduced Motion Accessibility Compliance", () => {
  const originalMatchMedia = window.matchMedia;

  const setReducedMotion = (enabled: boolean) => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? enabled : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  beforeEach(() => {
    setReducedMotion(true);
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("suppresses continuous floating movement loop when prefers-reduced-motion is active", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);

    const tween = floatingMovement(el);
    expect(tween).toBeNull();

    document.body.removeChild(el);
  });

  it("suppresses infinite breathing scale animation and sets static opacity when reduced motion is active", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);

    const tween = breathingAnimation(el, { opacityTo: 1 });
    expect(tween).toBeNull();
    // Element should be set to target opacity without infinite scaling
    expect(el.style.opacity).toBe("1");

    document.body.removeChild(el);
  });

  it("creates instant/calm scene transition without scale displacement when reduced motion is active", () => {
    const leaving = document.createElement("div");
    const entering = document.createElement("div");
    document.body.appendChild(leaving);
    document.body.appendChild(entering);

    const timeline = createSceneTransitionTimeline(leaving, entering, {
      duration: 1.4,
    });

    expect(timeline).not.toBeNull();
    // In reduced motion, transition duration is shortened to 0.15s
    expect(timeline?.duration()).toBeLessThanOrEqual(0.3);

    document.body.removeChild(leaving);
    document.body.removeChild(entering);
  });

  it("renders FloatingDecoration children safely when reduced motion is enabled", () => {
    render(
      <FloatingDecoration preset="drift" className="test-float">
        <span data-testid="floating-child">Preserved Keepsake Element</span>
      </FloatingDecoration>
    );

    const child = screen.getByTestId("floating-child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Preserved Keepsake Element");
  });

  it("resumes standard cinematic animations when reduced motion is disabled", () => {
    setReducedMotion(false);

    const el = document.createElement("div");
    document.body.appendChild(el);

    const tween = floatingMovement(el);
    expect(tween).not.toBeNull();
    tween?.kill();

    const breathTween = breathingAnimation(el);
    expect(breathTween).not.toBeNull();
    breathTween?.kill();

    document.body.removeChild(el);
  });
});
