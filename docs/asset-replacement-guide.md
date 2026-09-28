# Asset Replacement & Media Ingestion Guide

> **Document Status:** Production Ready  
> **Target Audience:** Developers, Content Curators, Couple Editors  
> **Source Documents:** `docs/asset-strategy.md`, `docs/phase-5-plan.md`, `docs/references/image-map.md`  

---

## 1. Overview & Architecture

The anniversary application implements a **Zero-Code Asset Replacement Pipeline**. All media references across the seven cinematic scenes are data-driven and resolve directly to canonical static files located in `public/images/` and `public/audio/`.

### Key Advantage
You can fully personalize this website with **your own real couple photographs, favorite songs, and custom sound effects without modifying a single line of React, TypeScript, or CSS code**. Simply replace the placeholder files in their designated directories while preserving the exact canonical filenames.

---

## 2. Directory Structure

Media assets are segregated cleanly by scene and media type:

```
public/
├── images/
│   ├── intro/          # Scene 1: Floating polaroids and gilded portraits
│   ├── journey/        # Scene 3: Hero cluster & timeline chapter photos
│   ├── gallery/        # Scene 4: Interactive 8-polaroid scrapbook grid
│   ├── playlist/       # Scene 5: Vinyl record covers & baroque altar portrait
│   ├── gift/           # Scene 6: Gift box & envelope keepsake reveal
│   ├── final-letter/   # Scene 7: Handwritten letter keepsake polaroid
│   └── photos/         # Flat compatibility mirror for all scene photos
│
└── audio/
    ├── bgm/            # Scene background soundtracks & playlist MP3s
    ├── sfx/            # Zero-latency interactive UI sound effects
    └── *.mp3           # Flat fallback mirror for audio streaming
```

> [!NOTE]
> All files are mirrored both in their scene subdirectories (e.g., `public/images/intro/`) and their flat fallback folders (`public/images/photos/` and `public/audio/`). This dual-path architecture ensures 100% backward compatibility and zero 404 broken link risks.

---

## 3. Photograph Replacement Specifications

### 3.1 Recommended Image Standards
- **Format:** WebP (`.webp`) is standard. High-quality JPEG (`.jpg`) or PNG (`.png`) converted to WebP via [Squoosh.app](https://squoosh.app) or `cwebp`.
- **Quality:** `82% - 85%` compression quality (optimal balance of crisp detail and fast loading).
- **Target File Size:** `< 120 KB` per photo.
- **Color Profile:** sRGB.

---

### 3.2 Canonical Photo Tables by Scene

#### Scene 1: Intro Scene (`public/images/intro/`)
| Canonical Filename | Role / Description | Aspect Ratio | Target Dimensions | Visual Frame |
| :--- | :--- | :---: | :---: | :--- |
| `photo-intro-couple-standing.webp` | Standing couple portrait (top-left) | 3:4 Portrait | 800 × 1067 px | Baroque Gold Frame |
| `photo-intro-selfie-red.webp` | Close-up selfie (bottom-left) | 1:1 Square | 800 × 800 px | Polaroid with Butterfly |
| `photo-intro-portrait-top-right.webp` | Candid laughing portrait (top-right) | 3:4 Portrait | 800 × 1067 px | Ornate Gold Frame |
| `photo-intro-portrait-cap.webp` | Casual outdoor portrait (middle-right)| 1:1 Square | 800 × 800 px | Classic Polaroid |
| `photo-intro-portrait-bottom-right.webp` | Romantic golden hour portrait (bottom-right) | 3:4 Portrait | 800 × 1067 px | Baroque Gold Frame |

#### Scene 3: Journey Scene (`public/images/journey/`)
| Canonical Filename | Role / Description | Aspect Ratio | Target Dimensions | Visual Frame |
| :--- | :--- | :---: | :---: | :--- |
| `photo-journey-hero-left.webp` | Hero gilded couple portrait (left cluster) | 3:4 Portrait | 900 × 1200 px | Filigree Gold Frame |
| `photo-journey-right-back.webp` | Soundtrack background photo (right cluster) | 3:4 Portrait | 800 × 1067 px | Tilted Gold Frame |
| `photo-journey-right-front.webp` | Soundtrack foreground candid (right cluster) | 1:1 Square | 800 × 800 px | Filigree Polaroid |
| `photo-journey-first-meet.webp` | Chapter 01: First date & beginning | 3:4 Portrait | 800 × 1067 px | Filigree Frame |
| `photo-journey-walk.webp` | Chapter 02: Adventures & daily walks | 3:4 Portrait | 800 × 1067 px | Polaroid with Tape |
| `photo-journey-anniversary.webp` | Chapter 03: Milestone celebration | 3:4 Portrait | 800 × 1067 px | Gold Frame |
| `photo-journey-future.webp` | Chapter 04: Looking towards the future | 3:4 Portrait | 800 × 1067 px | Filigree Frame |

#### Scene 4: Gallery Scene (`public/images/gallery/`)
| Canonical Filename | Scrapbook Slot | Aspect Ratio | Target Dimensions | Pin / Tape Style |
| :--- | :--- | :---: | :---: | :--- |
| `photo-gallery-smile.webp` | Polaroid 1: First smile | 3:4 Portrait | 800 × 1067 px | Red Heart Pin & Corner Tape |
| `photo-gallery-coffee.webp` | Polaroid 2: Coffee & Cafe date | 1:1 Square | 800 × 800 px | Gold Pin & Corner Tape |
| `photo-gallery-sunset.webp` | Polaroid 3: Sunset silhouette | 4:3 Landscape | 1067 × 800 px | Gold Pin & Top Tape |
| `photo-gallery-selfie.webp` | Polaroid 4: Playful selfie | 1:1 Square | 800 × 800 px | Red Heart Pin & Corner Tape |
| `photo-gallery-beach.webp` | Polaroid 5: Beach holiday | 3:4 Portrait | 800 × 1067 px | Red Heart Pin & Corner Tape |
| `photo-gallery-city.webp` | Polaroid 6: City lights night walk | 4:3 Landscape | 1067 × 800 px | Gold Pin & Top Tape |
| `photo-gallery-trip.webp` | Polaroid 7: Road trip adventure | 1:1 Square | 800 × 800 px | Gold Pin & Corner Tape |
| `photo-gallery-anniversary.webp` | Polaroid 8: Milestone celebration | 3:4 Portrait | 800 × 1067 px | Red Heart Pin & Corner Tape |

#### Scene 5: Playlist Scene (`public/images/playlist/`)
| Canonical Filename | Role / Track | Aspect Ratio | Target Dimensions | Visual Context |
| :--- | :--- | :---: | :---: | :--- |
| `photo-playlist-altar.webp` | Altar couple photo | 3:4 Portrait | 800 × 1067 px | Baroque Gold Frame next to letter |
| `cover-risk-it-all.webp` | Vinyl Album: "Risk It All" | 1:1 Square | 600 × 600 px | Center Vinyl Record Label |
| `cover-until-i-found-you.webp` | Vinyl Album: "Until I Found You" | 1:1 Square | 600 × 600 px | Center Vinyl Record Label |
| `cover-golden-hour.webp` | Vinyl Album: "Golden Hour" | 1:1 Square | 600 × 600 px | Center Vinyl Record Label |
| `cover-die-with-a-smile.webp` | Vinyl Album: "Die With A Smile" | 1:1 Square | 600 × 600 px | Center Vinyl Record Label |

#### Scene 6: Gift Scene (`public/images/gift/`)
| Canonical Filename | Role / Description | Aspect Ratio | Target Dimensions | Visual Context |
| :--- | :--- | :---: | :---: | :--- |
| `photo-gift-keepsake.webp` | Keepsake reveal photo | 1:1 Square or 3:4 | 800 × 800 px | Unveiled inside the gift envelope |

#### Scene 7: Final Letter Scene (`public/images/final-letter/`)
| Canonical Filename | Role / Description | Aspect Ratio | Target Dimensions | Visual Context |
| :--- | :--- | :---: | :---: | :--- |
| `photo-letter-keepsake.webp` | Floating keepsake polaroid | 1:1 Square | 800 × 800 px | Clipped with wax seal on parchment |

---

## 4. Audio Replacement Specifications

### 4.1 Recommended Audio Standards
- **Format:** MP3 (`.mp3`), 44.1 kHz, 16-bit stereo.
- **Bitrate:**
  - Background Music (BGM): `192 kbps` (CBR or VBR).
  - Sound Effects (SFX): `128 kbps` or `192 kbps`.
- **Target File Size:**
  - BGM: `2.0 MB - 6.0 MB` per full-length track.
  - SFX: `< 60 KB` per effect.

---

### 4.2 Canonical Audio Tracks by Scene

#### Scene Background Soundtracks (`public/audio/bgm/`)
| Canonical Filename | Track ID | Scene Associated | Playback Mode | Default Vol |
| :--- | :--- | :--- | :---: | :---: |
| `soundtrack-prologue.mp3` | `soundtrack-prologue` | Scene 1: Intro | Loop | 70% |
| `soundtrack-selection.mp3` | `soundtrack-selection` | Scene 2: Selection | Loop | 65% |
| `soundtrack-journey.mp3` | `soundtrack-journey` | Scene 3: Journey | Loop | 75% |
| `soundtrack-gallery.mp3` | `soundtrack-gallery` | Scene 4: Gallery | Loop | 70% |
| `soundtrack-vinyl.mp3` | `soundtrack-vinyl` | Scene 5: Playlist Ambient | Loop | 85% |
| `soundtrack-gift-anticipation.mp3` | `soundtrack-gift-anticipation` | Scene 6: Gift | Loop | 80% |
| `soundtrack-final-letter.mp3` | `soundtrack-final-letter` | Scene 7: Final Letter | Loop | 90% |

#### Music Room Playlist Tracks (`public/audio/bgm/`)
| Canonical Filename | Track ID | Song Title | Artist | Default Vol |
| :--- | :--- | :--- | :--- | :---: |
| `soundtrack-risk-it-all.mp3` | `soundtrack-risk-it-all` | Risk It All | Bruno Mars | 80% |
| `soundtrack-until-i-found-you.mp3` | `soundtrack-until-i-found-you` | Until I Found You | Stephen Sanchez | 80% |
| `soundtrack-golden-hour.mp3` | `soundtrack-golden-hour` | Golden Hour | JVKE | 80% |
| `soundtrack-die-with-a-smile.mp3` | `soundtrack-die-with-a-smile` | Die With A Smile | Lady Gaga & Bruno Mars | 80% |

#### Interactive Sound Effects (`public/audio/sfx/`)
| Canonical Filename | SFX ID | Trigger Event | Length |
| :--- | :--- | :--- | :---: |
| `sfx-envelope-shimmer.mp3` | `sfx-envelope-shimmer` | Hovering intro wax seal / sparkles | ~0.8s |
| `sfx-card-flip.mp3` | `sfx-card-flip` | Hovering memory artifact cards | ~0.4s |
| `sfx-musicbox-chime.mp3` | `sfx-musicbox-chime` | Gift scene hover & ambient bell | ~1.2s |
| `sfx-polaroid-place.mp3` | `sfx-polaroid-place` | Polaroid card settle & modal click | ~0.5s |
| `sfx-needle-drop.mp3` | `sfx-needle-drop` | Playing vinyl record in playlist room | ~1.0s |
| `sfx-wax-crack.mp3` | `sfx-wax-crack` | Unsealing wax seal buttons | ~0.6s |
| `sfx-parchment-unfold.mp3` | `sfx-parchment-unfold` | Opening letters or expanding drawers | ~0.7s |

---

## 5. Step-by-Step Replacement Instructions (Zero Code)

### Step 1: Prepare Your Personal Files
1. Collect your favorite couple photos and songs.
2. Crop and resize the photos to match the recommended aspect ratios in Section 3.
3. Convert your photos to `.webp` format (free online tools like [Squoosh](https://squoosh.app) work great).
4. Export or convert your audio tracks to `.mp3` format at 192 kbps.

### Step 2: Rename Files
Rename each photo or audio file to match the exact filename listed in the tables above. For example:
- Your favorite couple portrait $\rightarrow$ `photo-intro-couple-standing.webp`
- Your first date photo $\rightarrow$ `photo-journey-first-meet.webp`
- Your couple song $\rightarrow$ `soundtrack-risk-it-all.mp3`

### Step 3: Overwrite Files in `public/`
Copy your renamed files into the respective folders in your project:
```bash
# Example copying photos into scene folders
cp my-photo.webp public/images/intro/photo-intro-couple-standing.webp
cp my-song.mp3 public/audio/bgm/soundtrack-risk-it-all.mp3
```

> [!TIP]
> For maximum compatibility, you can also copy the photo into `public/images/photos/` and the audio track into `public/audio/`.

### Step 4: Preview Instantly
Start your development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Your personalized photos and music will immediately appear with all cinematic animations, filters, and frames applied automatically!

---

## 6. Customizing Text, Dates, & Captions (Optional)

If you wish to change names, anniversary dates, or heartfelt messages to match your personal story, all textual content is cleanly isolated in `src/data/`:

| File | Content Controlled |
| :--- | :--- |
| `src/data/intro.ts` | Headline ("Happy Anniversary"), couple names ("Nayyy & Keillaa"), date ("26-09-26") |
| `src/data/selection.ts` | The 4 artifact titles, subtitles, and descriptions |
| `src/data/journey.ts` | Chapter dates, titles, descriptions, quotes, and milestone tags |
| `src/data/gallery.ts` | Captions, dates, pins, and memory snippets for each polaroid |
| `src/data/playlist.ts` | Handwritten love letter, song titles, artist names, personal memories |
| `src/data/gift.ts` | Sender/recipient names, occasion, and the unsealed keepsake message |
| `src/data/finalLetter.ts` | Greeting, complete heartfelt paragraphs, closing vows, and signature |

Editing these text strings does not require touching any layout or animation code.
