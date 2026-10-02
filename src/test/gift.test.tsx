import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GiftScene } from "@/components/scenes/GiftScene";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { GIFT_CONTENT } from "@/data/gift";

describe("Gift Interaction & Reveal Flow", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the sealed gift envelope initially with unsealed CTA", () => {
    render(
      <ExperienceProvider initialScene="gift" enableAudio={false} syncWithUrlHash={false}>
        <GiftScene isActive={true} />
      </ExperienceProvider>
    );

    // Verify sealed envelope button is present
    const envelope = screen.getByRole("button", {
      name: "Open sealed royal anniversary envelope",
    });
    expect(envelope).toBeInTheDocument();

    // Verify initial CTA button is present
    const ctaButton = screen.getByRole("button", {
      name: "Unseal the anniversary gift envelope",
    });
    expect(ctaButton).toBeInTheDocument();

    // Keepsake content should NOT be visible yet
    expect(
      screen.queryByText(GIFT_CONTENT.revealMessage.heading)
    ).not.toBeInTheDocument();
  });

  it("clicking the wax seal envelope triggers unsealing sequence and reveals keepsake content", () => {
    render(
      <ExperienceProvider initialScene="gift" enableAudio={false} syncWithUrlHash={false}>
        <GiftScene isActive={true} />
      </ExperienceProvider>
    );

    const envelope = screen.getByRole("button", {
      name: "Open sealed royal anniversary envelope",
    });

    // Click envelope
    fireEvent.click(envelope);

    // Advance past reveal bloom duration (1400ms)
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Verify revealed dedication card is now visible
    expect(
      screen.getByText(GIFT_CONTENT.revealMessage.heading)
    ).toBeInTheDocument();
    expect(screen.getByText(GIFT_CONTENT.revealMessage.body)).toBeInTheDocument();

    // Verify advance CTA button to final letter is present
    const advanceBtn = screen.getByRole("button", {
      name: "Advance to the Final Love Letter scene",
    });
    expect(advanceBtn).toBeInTheDocument();
  });

  it("advances to the next narrative chapter when revealed advance button is clicked", () => {
    const handleNext = vi.fn();

    render(
      <ExperienceProvider initialScene="gift" enableAudio={false} syncWithUrlHash={false}>
        <GiftScene isActive={true} onNext={handleNext} />
      </ExperienceProvider>
    );

    // Click envelope to unseal
    const envelope = screen.getByRole("button", {
      name: "Open sealed royal anniversary envelope",
    });
    fireEvent.click(envelope);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Click revealed forward CTA
    const advanceBtn = screen.getByRole("button", {
      name: "Advance to the Final Love Letter scene",
    });
    fireEvent.click(advanceBtn);

    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});
