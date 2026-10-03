# Asset Management Guide

This document defines the conventions, directory structure, and workflows for managing all media assets in this project. Follow this guide whenever replacing, adding, or optimising images or audio files.

---

## Image Assets

### Directory Structure

```
public/images/
├── intro/          # Hero image(s) for IntroScene
├── journey/        # Timeline milestone images for JourneyScene
├── gallery/        # Gallery scene background/UI assets
├── photos/         # User gallery photos (polaroids in GalleryScene)
├── gift/           # Gift envelope and keepsake imagery
├── final-letter/   # Final letter scene decorative imagery
└── playlist/       # Vinyl / album art for PlaylistScene
```

### Naming Convention

All image files must follow this pattern:

```
<scene-prefix>-<descriptor>[-variant].<ext>
```

Examples:
```
photo-gallery-beach.webp
photo-gallery-trip.webp
photo-gallery-smile.webp
photo-gift-keepsake.webp
photo-intro-couple-standing.webp
```

Rules:
- Lowercase only, hyphen-separated words.
- No spaces or underscores.
- No version numbers or dates in the filename — use git for versioning.

### Supported Formats

| Format | Use case |
|--------|----------|
| `.webp` | Primary format for all photos and illustrations — best compression/quality ratio. |
| `.avif` | Next.js automatically generates AVIF alternatives via `<Image>` — no manual steps needed. |
| `.svg` | Decorative vector assets only (`public/decorations/`). |
| `.png` | Use only if transparency is required and WebP isn't suitable. |

### Optimization Rules

All images must be optimized before committing. Target guidelines:

| Image role | Max width | Quality |
|------------|-----------|---------|
| Hero / full-bleed | 1920 px | 85 |
| Gallery photo | 800 px | 90 |
| Thumbnail / preview | 400 px | 75 |
| Background texture | 1200 px | 80 |

**Tooling:** Use [Squoosh](https://squoosh.app/) or `sharp` CLI for batch conversion to WebP.

### Replacing a Photo

1. Prepare the new image as `.webp` at the correct dimensions and quality.
2. Name it following the naming convention above.
3. Place it in the correct `public/images/<scene>/` subdirectory.
4. Open the corresponding data file in `src/data/` and update the `src` or `image` field to the new filename.
5. Run `npm run build` to confirm no build errors.
6. Verify the image renders correctly in `npm run dev`.

> **Note:** Next.js `<Image>` components are size-aware. If the new image has a significantly different aspect ratio, check the component's `width`, `height`, or `fill` + `sizes` props and update them to avoid layout shift.

---

## Audio Assets

### Directory Structure

```
public/audio/
├── bgm/                              # Background music per-scene
│   └── (scene-specific BGM files)
├── sfx/                              # UI sound effects
│   ├── sfx-card-flip.mp3
│   ├── sfx-envelope-shimmer.mp3
│   ├── sfx-musicbox-chime.mp3
│   ├── sfx-needle-drop.mp3
│   ├── sfx-parchment-unfold.mp3
│   ├── sfx-polaroid-place.mp3
│   └── sfx-wax-crack.mp3
└── (playlist tracks at root)         # Standalone playlist songs
    ├── soundtrack-die-with-a-smile.mp3
    ├── soundtrack-blue.mp3
    ├── soundtrack-golden-hour.mp3
    ├── soundtrack-journey.mp3
    ├── soundtrack-prologue.mp3
    ├── soundtrack-risk-it-all.mp3
    ├── soundtrack-until-i-found-you.mp3
    ├── soundtrack-vinyl.mp3
    ├── soundtrack-final-letter.mp3
    ├── soundtrack-gallery.mp3
    ├── soundtrack-gift-anticipation.mp3
    └── soundtrack-selection.mp3
```

### Audio Registry

All audio tracks are **registered by ID** in:

```
src/constants/audio.ts
```

The main BGM track ID is exposed as `MAIN_BGM_TRACK_ID`. The audio manager (`src/lib/audio.ts`) uses these IDs to resolve file paths at runtime.

> ⚠️ **Critical:** Do **not** rename an audio file without updating both the `public/audio/` filename **and** the corresponding constant/data reference in `src/constants/audio.ts` or `src/data/`. A mismatch will result in silent audio failures at runtime.

---

### Replacing the Background Music (Main BGM)

The main site BGM is currently `soundtrack-die-with-a-smile.mp3`.

Steps:
1. Encode the new track as MP3 (128–192 kbps, stereo).
2. Place the file in `public/audio/` (root level, matching the current pattern).
3. Open `src/constants/audio.ts` and update `MAIN_BGM_TRACK_ID` and its associated `src` path to match the new filename.
4. Run `npm run dev` and verify audio auto-plays on intro and cross-fades correctly between scenes.

---

### Replacing a Playlist Song

Each playlist track is an independently named MP3 in `public/audio/`.

Steps:
1. Prepare the new MP3 (128–192 kbps).
2. Replace or add the file in `public/audio/` using the `soundtrack-<title>.mp3` naming convention.
3. Open `src/data/` (the playlist tracks data file) and update the `src` and `title` fields for the affected track entry.
4. If the track **ID** must change, also update `src/constants/audio.ts` and any references in `PlaylistScene.tsx`.
5. Verify playback in `npm run dev`.

---

### Replacing a Sound Effect

SFX files live in `public/audio/sfx/`.

Steps:
1. Encode the replacement as MP3 (44.1 kHz, mono or stereo as appropriate).
2. Name the file exactly the same as the file being replaced (e.g., `sfx-wax-crack.mp3`).
3. Drop it into `public/audio/sfx/` — no code changes required if the filename is identical.
4. If you must use a different filename, update `src/constants/audio.ts` accordingly.

---

### Audio Performance Notes

- Use MP3 for maximum browser compatibility.
- Preferred bitrate: 128 kbps for SFX, 192 kbps for BGM and playlist tracks.
- Avoid files larger than 8 MB per track; compress further if needed.
- Howler.js uses HTML5 Audio with Web Audio API fallback — no additional configuration required.

---

## Fonts

Custom fonts are self-hosted in `public/fonts/` and declared via `src/lib/fonts.ts` using `next/font/local`.  
Do not replace font files without verifying the new family matches the weight/style declarations in `fonts.ts`.

---

## Decorative SVGs

Decorative vector elements (ink splatters, borders, stamps, etc.) live in `public/decorations/`.  
These are referenced directly as `<img>` or CSS backgrounds.  
Replacement: overwrite the file in place — no code changes needed if the filename is preserved.
