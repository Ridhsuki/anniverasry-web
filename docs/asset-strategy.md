# Asset Management Strategy

> **Document Purpose:** Standardizes asset organization, naming conventions, optimization rules, audio architecture, and ingestion workflows for all media assets across the website.

---

## 1. Directory Structure

All static assets are organized within the Next.js `public/` directory:

```
public/
├── images/
│   ├── photos/           # Real personal couple and individual photographs
│   ├── backgrounds/      # Environmental backdrops (curtains, textures, vignettes)
│   └── props/            # Skeuomorphic cutouts (camera, pocket watch, vinyl, box)
│
├── audio/
│   ├── music/            # Long-form streaming background soundtracks (.mp3 / .ogg)
│   └── sfx/              # Low-latency interactive sound effects (wax break, click)
│
├── decorations/
│   ├── stickers/         # Scrapbook stickers (Saturn, whale, ribbon bows, stamps)
│   ├── botanicals/       # Rose petals, flower bouquets, cherry blossom branches
│   └── icons/            # SVG vector glyphs (music notes, play arrows, starbursts)
│
└── fonts/                # Local fallback font files (if needed beyond Google Fonts)
```

---

## 2. Image Asset Strategy

### 2.1 Format Hierarchy & Optimization
1. **Next.js Image Pipeline (`next.config.ts`):**
   - Configured with `formats: ["image/avif", "image/webp"]`.
   - AVIF is served to modern browsers for maximum compression (typically 40% smaller than WebP at equivalent visual quality).
   - WebP acts as the primary fallback.
2. **Dimension Standards:**
   - **Full-Screen Backgrounds:** Max width `1920px`, quality `82`, target file size `< 180 KB`.
   - **Scrapbook Photographs (`PhotoFrame`):** Max width `800px` (or `2×` display density `1600px`), quality `85`, target file size `< 120 KB`.
   - **Skeuomorphic Props & Cutouts (Transparent PNG/WebP):** Trimmed of empty transparent padding, compressed via TinyPNG or Squoosh, target file size `< 90 KB`.
   - **Vector Illustrations & Decorative Glyphs:** Stored as clean, minified `.svg` assets.

### 2.2 Image Loading Rules in React
- **Above-the-Fold Assets (Scene 1: Intro):**
  - Must use `priority={true}` on the Next.js `<Image />` component to optimize Largest Contentful Paint (LCP).
- **Below-the-Fold & Deferred Scenes:**
  - Must use default Next.js lazy-loading (`loading="lazy"`).
  - Use `placeholder="blur"` with a low-res base64 blur hash to eliminate layout shift while loading.

---

## 3. Audio Asset Strategy

### 3.1 Architecture Overview
The audio subsystem is powered by Howler.js encapsulated within the `AudioManager` singleton (`src/lib/audio.ts`) and consumed through the `useAudio` React hook (`src/hooks/useAudio.ts`):

```
AudioManager Singleton (src/lib/audio.ts)
├── Track Registry (src/constants/audio.ts)
│   ├── Soundtrack: "background-music" (/audio/music/background.mp3)
│   ├── Song: "anniversary-soundtrack" (/audio/music/our-song.mp3)
│   ├── SFX: "wax-seal-break" (/audio/sfx/wax-seal-break.mp3)
│   └── SFX: "paper-unfold" (/audio/sfx/paper-unfold.mp3)
└── Howler HTML5 Streaming Engine (Survives React re-renders & HMR)
```

### 3.2 Audio File Standards
- **Soundtracks & Songs:**
  - Format: MP3 (`192 kbps`, 44.1 kHz, stereo) with fallback to OGG.
  - Streaming: Loaded with `html5: true` inside Howler to stream over HTTP without blocking JavaScript execution.
- **Sound Effects (SFX):**
  - Format: Short MP3/WAV (`< 1.5s`, `< 60 KB`).
  - Preloading: Loaded with `html5: false` (Web Audio API) for instant zero-latency playback on user interaction.

### 3.3 Autoplay & Mobile Audio Unlock Protocol
Modern browsers (iOS Safari, Android Chrome) block programmatic audio playback until an explicit user gesture:
- **Unlock Strategy:** The initial user tap on the **"TAP FOR SURPRISE"** button or the wax seal in `IntroScene` serves as the explicit gesture that unlocks the Howler audio context.
- Once unlocked, audio transitions smoothly between scenes without re-prompting.

---

## 4. Naming Conventions

All assets must use strict, descriptive kebab-case naming:

```
# Pattern: [category]-[scene]-[descriptor].[ext]

# Examples:
images/photos/photo-journey-couple-portrait.webp
images/photos/photo-gallery-polaroid-01.webp
images/props/prop-selection-vintage-camera.png
images/props/prop-selection-pocket-watch.png
images/props/prop-playlist-vinyl-disc.png
images/backgrounds/bg-playlist-velvet-curtains.webp
decorations/botanicals/botanical-red-rose-cluster.png
decorations/stickers/sticker-gallery-saturn-planet.png
audio/music/soundtrack-romantic-journey.mp3
audio/sfx/sfx-envelope-wax-break.mp3
```

---

## 5. Ingestion Workflow for Future AI Agents & Developers

When new personal media assets (couple photos, audio tracks) become available:

1. **Place raw files in incoming scratch directory.**
2. **Optimize Images:** Convert JPG/PNG to WebP/AVIF with a tool like Squoosh or `sharp`.
3. **Register in Codebase:**
   - Add photo metadata to `src/data/index.ts` under `storyEntries` or `gallerySections`:
     ```typescript
     {
       id: "photo-01",
       src: "/images/photos/photo-gallery-polaroid-01.webp",
       alt: "Nayyy & Keillaa in Tokyo",
       caption: "Our first trip together",
       width: 800,
       height: 1000,
       dateTaken: "2024-09-26"
     }
     ```
   - Register audio tracks in `src/constants/audio.ts` under `AUDIO_TRACKS`.
4. **Verify Build:** Run `npm run type-check && npm run build` to confirm asset references compile cleanly.
