import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AudioControls } from "@/components/shared/AudioControls";
import { AUDIO_TRACKS } from "@/constants/audio";
import type { PlaylistTrack } from "@/data/playlist";
import { useAudio } from "@/hooks/useAudio";
import { useSceneAudio } from "@/hooks/useSceneAudio";
import { audioManager } from "@/lib/audio";

const mockTrack: PlaylistTrack = {
  id: "track-1",
  title: "Prologue: Once Upon a Time",
  artist: "Classical Romance",
  duration: "3:45",
  durationSeconds: 225,
  coverImage: "/images/photos/cover-golden-hour.webp",
  audioSrc: "/audio/bgm/soundtrack-prologue.mp3",
  mood: "Romantic & Nostalgic",
  metadata: {
    year: "2026",
  },
};

describe("Audio Subsystem & Interaction Flow", () => {
  it("initializes audioManager with registered tracks correctly", () => {
    // Register canonical audio tracks
    AUDIO_TRACKS.forEach((track) => audioManager.registerTrack(track));

    expect(audioManager.isTrackRegistered("soundtrack-prologue")).toBe(true);
    expect(audioManager.isTrackRegistered("sfx-wax-crack")).toBe(true);

    const state = audioManager.getState();
    expect(state.volume).toBeGreaterThan(0);
    expect(state.isMuted).toBe(false);
  });

  it("toggles mute state correctly via useAudio hook", () => {
    const { result } = renderHook(() => useAudio());

    expect(result.current.isMuted).toBe(false);

    // Mute
    act(() => {
      result.current.toggleMute();
    });
    expect(result.current.isMuted).toBe(true);

    // Unmute
    act(() => {
      result.current.toggleMute();
    });
    expect(result.current.isMuted).toBe(false);
  });

  it("handles AudioControls play/pause and mute/unmute user events", () => {
    const handleTogglePlay = vi.fn();
    const handleToggleMute = vi.fn();
    const handleNextTrack = vi.fn();
    const handlePrevTrack = vi.fn();
    const handleVolumeChange = vi.fn();
    const handleSeek = vi.fn();

    const { rerender } = render(
      <AudioControls
        track={mockTrack}
        isPlaying={false}
        isMuted={false}
        volume={0.7}
        progress={0.2}
        onTogglePlay={handleTogglePlay}
        onToggleMute={handleToggleMute}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
      />
    );

    // Click Play button
    const playBtn = screen.getByRole("button", { name: "Play track" });
    fireEvent.click(playBtn);
    expect(handleTogglePlay).toHaveBeenCalledTimes(1);

    // Click Mute button
    const muteBtn = screen.getByRole("button", { name: "Mute audio" });
    fireEvent.click(muteBtn);
    expect(handleToggleMute).toHaveBeenCalledTimes(1);

    // Change volume slider
    const volumeSlider = screen.getByRole("slider", { name: "Volume slider" });
    fireEvent.change(volumeSlider, { target: { value: "0.5" } });
    expect(handleVolumeChange).toHaveBeenCalledWith(0.5);

    // Rerender as playing and muted
    rerender(
      <AudioControls
        track={mockTrack}
        isPlaying={true}
        isMuted={true}
        volume={0}
        progress={0.4}
        onTogglePlay={handleTogglePlay}
        onToggleMute={handleToggleMute}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
      />
    );

    expect(screen.getByRole("button", { name: "Pause track" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Unmute audio" })).toBeInTheDocument();
  });

  it("updates scene soundtrack transition when active scene changes", () => {
    AUDIO_TRACKS.forEach((track) => audioManager.registerTrack(track));

    const { rerender } = renderHook(
      ({ scene }: { scene: "intro" | "gallery" }) =>
        useSceneAudio(scene, { autoSync: true, enabled: true }),
      {
        initialProps: { scene: "intro" },
      }
    );

    expect(audioManager.getState().currentTrackId).toBe("soundtrack-prologue");

    // Transition to gallery scene
    rerender({ scene: "gallery" });
    expect(audioManager.getState().currentTrackId).toBe("soundtrack-gallery");
  });
});
