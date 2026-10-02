import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GalleryLightbox } from "@/components/shared/GalleryLightbox";
import type { GalleryPhotoItem } from "@/data/gallery";

const mockPhotoA: GalleryPhotoItem = {
  id: "photo-a",
  src: "/images/photos/photo-gallery-trip.webp",
  alt: "Trip to Kyoto",
  caption: "First trip together in Kyoto",
  date: "2024-05-12",
  location: "Kyoto, Japan",
  rotation: -2,
  frameVariant: "polaroid",
  aspectRatio: "square",
  tapeStyle: "top-center",
};

const mockPhotoB: GalleryPhotoItem = {
  id: "photo-b",
  src: "/images/photos/photo-gallery-beach.webp",
  alt: "Sunset at Bali beach",
  caption: "Walking on the beach at sunset",
  date: "2025-08-20",
  location: "Bali, Indonesia",
  rotation: 3,
  frameVariant: "polaroid",
  aspectRatio: "square",
  tapeStyle: "corners",
};

describe("Gallery Lightbox Component Lifecycle", () => {
  it("Scenario A: renders opened photo details and closes on close button click", async () => {
    const handleClose = vi.fn();

    const { rerender } = render(
      <GalleryLightbox photo={mockPhotoA} onClose={handleClose} />
    );

    // Verify modal is visible with accessible role
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");

    // Verify photo content and metadata are displayed
    expect(screen.getByText("First trip together in Kyoto")).toBeInTheDocument();
    expect(screen.getByText("Kyoto, Japan")).toBeInTheDocument();
    expect(screen.getByText("2024-05-12")).toBeInTheDocument();

    // Click close button
    const closeBtn = screen.getByRole("button", { name: "Close photo preview" });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });

    // Rerender as closed (photo=null)
    rerender(<GalleryLightbox photo={null} onClose={handleClose} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Scenario A (Keyboard): closes modal when Escape key is pressed", async () => {
    const handleClose = vi.fn();

    render(<GalleryLightbox photo={mockPhotoA} onClose={handleClose} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it("Scenario B: sequential opening (Photo A -> Close -> Photo B -> Close) resets state cleanly", async () => {
    const handleClose = vi.fn();

    // 1. Open Photo A
    const { rerender } = render(
      <GalleryLightbox photo={mockPhotoA} onClose={handleClose} />
    );
    expect(screen.getByText("First trip together in Kyoto")).toBeInTheDocument();
    expect(screen.getByText("Kyoto, Japan")).toBeInTheDocument();

    // 2. Close Photo A
    const closeBtn = screen.getByRole("button", { name: "Close photo preview" });
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    // 3. Unmount / set photo to null
    rerender(<GalleryLightbox photo={null} onClose={handleClose} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // 4. Open Photo B
    rerender(<GalleryLightbox photo={mockPhotoB} onClose={handleClose} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Verify Photo B content is rendered and not Photo A
    expect(screen.queryByText("First trip together in Kyoto")).not.toBeInTheDocument();
    expect(screen.getByText("Walking on the beach at sunset")).toBeInTheDocument();
    expect(screen.getByText("Bali, Indonesia")).toBeInTheDocument();
    expect(screen.getByText("2025-08-20")).toBeInTheDocument();

    // 5. Close Photo B
    const closeBtnB = screen.getByRole("button", { name: "Close photo preview" });
    fireEvent.click(closeBtnB);
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(2);
    });
  });
});
