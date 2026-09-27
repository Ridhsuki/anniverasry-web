# Technical Scene Architecture Specification

> **Document Purpose:** Defines the technical contracts, component hierarchies, state management, and animation specifications for all 7 interactive scenes in `src/components/scenes/`.

---

## 1. Global Scene Contract

All scene components strictly adhere to the `SceneProps` TypeScript interface defined in `src/types/scenes.ts`:

```typescript
export interface SceneProps {
  /** Whether this scene is currently active/visible */
  isActive?: boolean;
  /** Triggered when the scene finishes its narrative or user confirms completion */
  onComplete?: () => void;
  /** Trigger navigation to the next sequential scene */
  onNext?: () => void;
  /** Trigger navigation to the previous scene */
  onPrevious?: () => void;
  /** Optional custom CSS classes */
  className?: string;
  /** Optional child elements */
  children?: React.ReactNode;
}
```

### Component Architectural Principles
- **DOM Isolation:** Every scene renders as an independent `<section>` element tagged with a unique semantic ID (`#scene-intro`, `#scene-selection`, etc.) and `data-scene="[scene_id]"`.
- **Accessibility:** Inactive scenes receive `aria-hidden={!isActive}` and pointer events are disabled (`pointer-events-none`) when not active.
- **Composable Slots:** Every scene provides dedicated DOM slots: `.scene-header`, `.scene-stage`, and `.scene-actions`.

---

## 2. Individual Scene Specifications

---

### Scene 1: Intro (`IntroScene.tsx`)

#### 1. Purpose
The initial landing experience that establishes emotional resonance, introduces the anniversary celebration, and invites the user to begin exploring through an interactive envelope touchpoint.

#### 2. Visual Responsibility
- Render the deep burgundy radial vignette atmosphere.
- Position the central illuminated cream envelope with the folded deckle parchment card.
- Inscribe *"Happy Anniversary"*, date `26-09-26`, and dedication text.
- Scatter 5 vintage photos with gilded foil/polaroid edges at calculated tilt angles around the envelope.
- Adorn with botanical accents: red velvet roses, blush pink roses, baby's breath, and a perched red monarch butterfly.
- Present the bottom torn-edge parchment banner **"TAP FOR SURPRISE"**.

#### 3. Visual Elements (from `intro-scene.png`)
- **Background Atmosphere:** Deep crimson gradient (`#2b040a` ↔ `#100003`) with subtle bokeh spheres.
- **Main Object:** Semi-open parchment envelope with warm backlighting and oxblood double-heart wax seal.
- **Typography:**
  - *"Happy Anniversary"* (`.font-handwriting`, antique gold shimmer).
  - Date `26-09-26` (`.font-serif`, tracking `0.1em`).
- **Decorations:** Fresh roses, dried flower sprigs, and monarch butterfly.
- **Action Banner:** Torn parchment card with uppercase serif text.

#### 4. Component Hierarchy
```
IntroScene (<section id="scene-intro">)
├── VignetteLayer (.vignette-overlay)
├── SceneContainer (.max-w-4xl)
│   ├── SceneHeader (.scene-header)
│   ├── SceneStage (.scene-stage)
│   │   ├── PaperCard (Parchment envelope base)
│   │   │   ├── WaxSealButton (VintageButton variant="wax-seal")
│   │   │   └── InscriptionBlock
│   │   ├── PhotoFrame × 5 (Tilted Polaroid/Gold cards)
│   │   └── FloatingDecoration × 3 (Monarch butterfly, floating petals)
│   └── SceneActions (.scene-actions)
│       └── VintageButton (Banner CTA "TAP FOR SURPRISE")
```

#### 5. Expected State
- `isOpened: boolean` — Tracks whether the envelope has been unsealed.
- `isHovered: boolean` — Tracks interactive elevation of the envelope.

#### 6. Transition & Animation
- **Entrance:** Staggered `photoEntrance` for the 5 photos, `fadeIn` with subtle scale for the envelope.
- **Idle:** Continuous `floatingMovement` on the butterfly and envelope (`y: ±6px`, `rotation: ±1.5°`).
- **Exit:** `sceneTransition` crossfade to SelectionScene on tap.

---

### Scene 2: Selection Hub (`SelectionScene.tsx`)

#### 1. Purpose
Acts as the central navigational nexus allowing the user to select from 4 tactile story chapters (Journey, Moment/Gallery, Playlist, Gift).

#### 2. Visual Responsibility
- Display the illuminated script headline *"Choose the Surprise"*.
- Lay out 4 physical artifacts horizontally with labeled script titles:
  1. *Journey* (35mm vintage camera on letters)
  2. *Moment* (Pocket watch with `26-09-26` tag & blossoms)
  3. *Playlist* (Vinyl record sliding out of vintage sleeve)
  4. *Gift* (Wrapped red box with lace ribbon & butterfly)
- Provide bottom **"TAP FOR SURPRISE"** button.

#### 3. Visual Elements (from `selection-scene.png`)
- **Background:** Rich burgundy velvet backdrop with an intense radial spotlight behind the artifacts.
- **Typography:** *"Choose the Surprise"* in large calligraphic white/gold script (`.font-handwriting` / `.font-display`).
- **Artifacts:** Skeuomorphic mechanical camera, brass watch, vinyl sleeve, and lace-tied gift box.

#### 4. Component Hierarchy
```
SelectionScene (<section id="scene-selection">)
├── VignetteLayer
├── SceneContainer (.max-w-5xl)
│   ├── SceneHeader (*"Choose the Surprise"*)
│   ├── SceneStage (.grid-cols-4)
│   │   ├── SelectionItem (id="journey", artifact="camera")
│   │   ├── SelectionItem (id="gallery", artifact="pocket-watch")
│   │   ├── SelectionItem (id="playlist", artifact="vinyl-sleeve")
│   │   └── SelectionItem (id="gift", artifact="gift-box")
│   └── SceneActions
│       └── VintageButton ("TAP FOR SURPRISE")
```

#### 5. Expected State
- `selectedChapter: SceneName | null` — Currently hovered or selected artifact.
- `completedChapters: SceneName[]` — Array of chapters already explored.

#### 6. Transition & Animation
- **Entrance:** Staggered upward reveal (`reveal`, direction `up`, stagger `0.1s`).
- **Interaction:** Hovering an artifact elevates it (`y: -12px`, `scale: 1.05`) and triggers amber halo (`shadow-glow-gold`).
- **Exit:** Selected item scales up while siblings fade out (`opacity: 0`).

---

### Scene 3: Journey (`JourneyScene.tsx`)

#### 1. Purpose
Chronological narrative storytelling recounting the couple's shared history, milestones, and soundtrack.

#### 2. Visual Responsibility
- Render top-right sage green **"BACK ◂"** navigation pill.
- Display gilded baroque picture frames with couple photos and headline *"Our Journey: Bruno Mars - 'Risk It All'"*.
- Display physical props: vintage embossed silver camera, open wooden keepsake chest overflowing with rose petals and heart notes.
- Render open music box labeled *"Our Soundtrack"* emitting glowing cyan musical notes (`♪ ♫`).

#### 3. Visual Elements (from `journey-scene.png`)
- **Background:** Crimson ambiance with floating translucent pink heart outlines.
- **Navigation:** Sage green pill button (`bg-[#87b07c]`, rounded-full).
- **Frames:** Heavy baroque gold ornate frames (`PhotoFrame` variant `filigree`).
- **Particles:** Floating pink heart cutouts and glowing cyan musical notes.

#### 4. Component Hierarchy
```
JourneyScene (<section id="scene-journey">)
├── VignetteLayer
├── TopNavigation
│   └── VintageButton ("BACK ◂", variant="secondary", className="bg-[#87b07c]")
├── SceneContainer
│   ├── LeftCluster
│   │   ├── PhotoFrame (Baroque gilded frame with headline & subtitle)
│   │   ├── KeepsakeChest (Open chest with rose petals & paper hearts)
│   │   └── VintageCameraProp
│   └── RightCluster
│       ├── OverlappingPhotoFrames × 2
│       └── MusicBoxProp ("Our Soundtrack")
│           └── FloatingDecoration (Glowing cyan notes & staff)
```

#### 5. Expected State
- `activeMilestoneIndex: number` — Currently viewed memory milestone.

#### 6. Transition & Animation
- **Entrance:** Parallax slide-in of left and right clusters with `photoEntrance`.
- **Idle:** Continuous floating of hearts (`floatingMovement`, `yDistance: 20px`) and waving cyan music notes.
- **Exit:** Soft crossfade back to SelectionScene when "BACK ◂" is clicked.

---

### Scene 4: Gallery / Moments (`GalleryScene.tsx`)

#### 1. Purpose
Interactive visual scrapbook showcasing 8 candid photographs with authentic physical mounting aesthetics.

#### 2. Visual Responsibility
- String warm glowing fairy lights across the top border.
- Lay out 8 white-bordered Polaroid photograph prints in a staggered 2×4 grid.
- Mount with red wax heart pins, velvet ribbons, planetary stickers, and floral sprays.
- Display bottom centered date `26-09-26`.

#### 3. Visual Elements (from `gallery-scene.png`)
- **Lighting:** Draped warm fairy lights canopy with shimmering bulbs.
- **Grid:** 8 Polaroid photo prints (`PhotoFrame` variant `polaroid`) with physical tilt angles (-4° to +6°).
- **Stickers:** Gold Saturn, cute blue watercolor whale, purple watercolor galaxy, satin ribbons.
- **Header/Footer:** Script *"Happy Anniversary"* top, date `26-09-26` bottom.

#### 4. Component Hierarchy
```
GalleryScene (<section id="scene-gallery">)
├── FairyLightsCanopy (.absolute-top)
├── TopNavigation ("BACK ◂")
├── SceneContainer (.max-w-6xl)
│   ├── SceneHeader (*"Happy Anniversary"*)
│   ├── PhotoGrid (.grid-cols-4)
│   │   └── PhotoFrame × 8 (with tapeStyle="corners", custom stickers)
│   └── SceneFooter (Date "26-09-26")
└── LightboxModal (Conditional render on photo click)
```

#### 5. Expected State
- `selectedPhotoId: string | null` — ID of photo currently opened in full lightbox view.

#### 6. Transition & Animation
- **Entrance:** Staggered polaroid drop (`photoEntrance`, bounce `true`, stagger `0.08s`).
- **Hover:** Hovered photo brings to front (`z-index: 30`, `rotation: 0deg`, `scale: 1.08`).
- **Fairy Lights:** Micro-opacity breathing loop (`breathingAnimation`, `opacityFrom: 0.8`, `opacityTo: 1.0`).

---

### Scene 5: Playlist (`PlaylistScene.tsx`)

#### 1. Purpose
A romantic music room celebrating the couple's soundtrack, featuring a playable vinyl record and personal anniversary message.

#### 2. Visual Responsibility
- Render draped red velvet theatre curtains with warm candlelight from burning white pillar candles.
- Display couple's names *"Nayyy & Keillaa"* in glowing script calligraphy.
- Render aged parchment letter card edged completely in fresh red rose petals with Indonesian romantic narrative.
- Center the grooved vinyl disc with a red heart play button (`▶`).
- Display gilded portrait frame resting on a vintage camera on the right.

#### 3. Visual Elements (from `playlist-scene.png`)
- **Background:** Velvet drapery with realistic folds and shadows.
- **Candlelight:** 3 glass-encased pillar candles with animated flame glows.
- **Letter Card:** `PaperCard` with rose petal border and handwritten typography.
- **Vinyl Player:** Rotating black vinyl disc with 3D heart play button.
- **Header:** *"Nayyy & Keillaa"* with gold glow.

#### 4. Component Hierarchy
```
PlaylistScene (<section id="scene-playlist">)
├── VelvetCurtainsBackdrop
├── TopNavigation ("BACK ◂" with gold border)
├── SceneContainer
│   ├── SceneHeader (*"Nayyy & Keillaa"*)
│   ├── SceneStage (.flex-row)
│   │   ├── LeftLetterCard (PaperCard with rose petal border & text)
│   │   ├── CenterTurntable (VinylRecord disc + HeartPlayButton)
│   │   └── RightAltar (PhotoFrame gold baroque + Vintage camera prop)
│   └── FloatingDecoration × 4 (Candle flickers, heart particles, gold butterflies)
```

#### 5. Expected State
- `isPlaying: boolean` — Whether the vinyl audio track is currently playing.
- `playbackProgress: number` — Progress (0 to 1) for the spinning disc and audio scrub.

#### 6. Transition & Animation
- **Playback State:** When `isPlaying === true`, vinyl rotates indefinitely (`rotation: 360`, `repeat: -1`, `ease: "none"`). When paused, decelerates with `power2.out`.
- **Audio:** Calls `AudioManager.play("anniversary-song")` and `AudioManager.pause()`.

---

### Scene 6: Gift (`GiftScene.tsx`)

#### 1. Purpose
The ceremonial unboxing moment where the user taps an illuminated sealed royal envelope to unlock the final love letter.

#### 2. Visual Responsibility
- Render double-line gold border with ornate corner filigree scrollwork.
- Display dramatic headline *"Press the Envelope"* with starlight flares.
- Center the glowing ivory envelope sealed with the burgundy **"N&K"** monogram wax seal.
- Form a dense circular wreath bed of red and pink rose petals with glistening water droplets, pearls, and gold dust.
- Provide bottom script CTA *"tap to lanjut"*.

#### 3. Visual Elements (from `gift-scene.png`)
- **Border:** Gilded filigree ornamental frame enclosing the viewport.
- **Envelope:** Cream envelope with warm celestial backlighting.
- **Wax Seal:** Dimensional burgundy stamp embossed with "N&K" in a heart.
- **Petal Bed:** Circular wreath with dew drops, pearls, and glitter.
- **CTA:** *"tap to lanjut"* flanked by twinkling stars.

#### 4. Component Hierarchy
```
GiftScene (<section id="scene-gift">)
├── OrnateFiligreeFrame (.pointer-events-none)
├── SceneContainer (.max-w-3xl)
│   ├── SceneHeader (*"Press the Envelope"*)
│   ├── SceneStage
│   │   ├── EnvelopeKeepsake (Sealed envelope with "N&K" wax seal)
│   │   ├── PetalWreathBed (Roses, dew droplets, pearls)
│   │   └── FloatingDecoration (Starlight lens flares)
│   └── SceneActions
│       └── InteractiveCTA (*"tap to lanjut"*)
```

#### 5. Expected State
- `isUnlocking: boolean` — Triggers wax breaking particle burst and flap unfold animation.

#### 6. Transition & Animation
- **Idle:** Gentle envelope breathing glow (`breathingAnimation`, duration 3s). Starlight flares pulse scale.
- **Trigger:** Tapping envelope triggers wax seal breaking sound (`AudioManager`), gold particle flash, and unfolding 3D perspective transition into `FinalLetterScene`.

---

### Scene 7: Final Letter (`FinalLetterScene.tsx`)

#### 1. Purpose
The intimate emotional culmination of the entire anniversary website: a full-screen handwritten letter expressing eternal love and gratitude.

#### 2. Visual Responsibility
- Present an expansive, full-screen unfolded deckle-edge parchment sheet.
- Display the complete handwritten message rendered in Dancing Script typography.
- Scatter loose red rose petals slowly floating downward across the screen.
- Provide a discreet **"Replay Journey"** action.

#### 3. Component Hierarchy
```
FinalLetterScene (<section id="scene-final-letter">)
├── VignetteLayer
├── SceneContainer (.max-w-3xl)
│   ├── LetterParchment (PaperCard variant="deckle", shadow="xl")
│   │   ├── LetterHeader (Salutation: "Dearest Keillaa,")
│   │   ├── LetterBody (Handwritten paragraphs)
│   │   └── LetterSignoff (Signature & Broken wax seal keepsake)
│   └── SceneActions
│       └── VintageButton ("Replay Journey", variant="ghost")
└── FloatingDecoration (Slowly falling rose petals)
```

#### 4. Expected State
- `isRead: boolean` — Enables completion telemetry or replay prompt after reading.

#### 5. Transition & Animation
- **Entrance:** Smooth `paperReveal` (unfolding perspective and gentle tilt settling).
- **Petals:** Continuous downward drift with horizontal sway (`preset="drift"`).
- **Audio:** Soundtrack reaches its emotional conclusion.
