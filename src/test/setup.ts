import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock window.matchMedia for responsive and reduced-motion checks
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

// Mock ResizeObserver for Lenis and responsive containers
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.ResizeObserver = ResizeObserverMock;

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;


// Mock HTMLMediaElement methods for audio testing (play, pause, load)
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();
window.HTMLMediaElement.prototype.load = vi.fn();

// Mock Howler for headless environment
vi.mock("howler", () => {
  class HowlMock {
    private _volume = 1;
    private _muted = false;
    private _playing = false;

    constructor(options?: { volume?: number }) {
      if (options?.volume !== undefined) {
        this._volume = options.volume;
      }
    }

    play = vi.fn().mockImplementation(() => {
      this._playing = true;
      return 1;
    });

    pause = vi.fn().mockImplementation(() => {
      this._playing = false;
      return this;
    });

    stop = vi.fn().mockImplementation(() => {
      this._playing = false;
      return this;
    });

    fade = vi.fn().mockImplementation((_from: number, to: number) => {
      this._volume = to;
      return this;
    });

    volume = vi.fn().mockImplementation((vol?: number) => {
      if (vol !== undefined) {
        this._volume = vol;
        return this;
      }
      return this._volume;
    });

    mute = vi.fn().mockImplementation((muted?: boolean) => {
      if (muted !== undefined) {
        this._muted = muted;
        return this;
      }
      return this._muted;
    });

    seek = vi.fn().mockReturnValue(0);
    duration = vi.fn().mockReturnValue(180);
    state = vi.fn().mockReturnValue("loaded");
    playing = vi.fn().mockImplementation(() => this._playing);
    on = vi.fn().mockReturnThis();
    off = vi.fn().mockReturnThis();
    once = vi.fn().mockReturnThis();
    unload = vi.fn();
    load = vi.fn().mockReturnThis();
  }

  const HowlerMock = {
    mute: vi.fn(),
    volume: vi.fn(),
    stop: vi.fn(),
    unload: vi.fn(),
    ctx: {
      state: "running",
      resume: vi.fn().mockResolvedValue(undefined),
    },
  };

  return {
    Howl: HowlMock,
    Howler: HowlerMock,
  };
});
