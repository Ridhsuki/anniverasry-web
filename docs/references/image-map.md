# Screenshot Reference Mapping & Visual Audit

> **Source of Truth:** The screenshots stored in `docs/references/screenshots/` are the authoritative visual benchmark for all visual, layout, and styling decisions across the anniversary website.

---

## Overview Matrix

| File | Associated Scene | Key Visual Motifs | Primary Components |
|---|---|---|---|
| [`intro-scene.png`](file:///home/adminfid/Desktop/anniverasry-web/docs/references/screenshots/intro-scene.png) | **Scene 1: Intro** | Glowing open envelope, floating Polaroid cards with gilded edges, red/pink roses, red monarch butterfly, wax seal, parchment CTA banner | `IntroScene`, `PaperCard`, `PhotoFrame`, `VintageButton`, `FloatingDecoration` |
| [`selection-scene.png`](file:///home/adminfid/Desktop/anniverasry-web/docs/references/screenshots/selection-scene.png) | **Scene 2: Selection** | Gilded script title, 4 physical skeuomorphic artifacts (vintage camera, pocket watch with date tag, vinyl sleeve, gift box), glowing particles | `SelectionScene`, `PaperCard`, `VintageButton`, `FloatingDecoration` |
| [`journey-scene.png`](file:///home/adminfid/Desktop/anniverasry-web/docs/references/screenshots/journey-scene.png) | **Scene 3: Journey** | Ornate gilded baroque frames, vintage rangefinder camera, open treasure chest with rose petals and heart notes, glowing neon musical staff emerging from music box, green pill "BACK ◂" button | `JourneyScene`, `PhotoFrame`, `PaperCard`, `VintageButton`, `FloatingDecoration` |
| [`gallery-scene.png`](file:///home/adminfid/Desktop/anniverasry-web/docs/references/screenshots/gallery-scene.png) | **Scene 4: Gallery** | Scrapbook polaroid grid (2×4 layout) with physical tilt, warm fairy lights canopy, red velvet bows, 3D heart pins, planetary stickers, blue whale sticker, floral sprays | `GalleryScene`, `PhotoFrame`, `VintageButton`, `FloatingDecoration` |
| [`playlist-scene.png`](file:///home/adminfid/Desktop/anniverasry-web/docs/references/screenshots/playlist-scene.png) | **Scene 5: Playlist** | Draped red velvet curtains, burning pillar candles in glass votives, parchment letter bordered with fresh red rose petals, spinning vinyl record with heart play button, baroque gilded portrait frame on vintage camera | `PlaylistScene`, `PaperCard`, `PhotoFrame`, `VintageButton`, `FloatingDecoration` |
| [`gift-scene.png`](file:///home/adminfid/Desktop/anniverasry-web/docs/references/screenshots/gift-scene.png) | **Scene 6: Gift** | Sparkling script headline "Press the Envelope", sealed cream envelope with stamped "N&K" monogram wax seal, bed of rose petals with water droplets and gold flakes, ornate corner scrollwork | `GiftScene`, `PaperCard`, `VintageButton`, `FloatingDecoration` |

---

## Detailed Visual Breakdown

### 1. `intro-scene.png`

- **Scene:** Scene 1: Intro (`IntroScene.tsx`)
- **Visual Composition:**
  - **Background:** Deep crimson/burgundy radial vignette gradient (`#2b040a` transitioning to `#100003` at the outer corners) with soft ambient warm bokeh spheres floating gently.
  - **Focal Centerpiece:** An ivory parchment envelope angled in an open state, illuminated by a warm backlight glow. A deckle-edged aged paper sheet emerges from inside.
  - **Center Typography:**
    - Script headline: *"Happy Anniversary"* in flowing cursive calligraphic font with a warm antique gold gradient.
    - Commemorative date: `26-09-26` in delicate serif numerals.
    - Dedication text: *"Love, (Couple's Name - optional, let's add a stylized monogram)"* in cursive script.
  - **Wax Seal:** A dimensional deep burgundy/oxblood circular wax seal with an embossed double-heart monogram, situated on the lower flap fold.
  - **Photographs:** 5 vintage photographic prints featuring couple and solo portraits:
    - 2 photos on the left: top couple photo with torn gold foil deckle edges; lower portrait with red background.
    - 3 photos on the right: top portrait, middle portrait with baseball cap, bottom portrait.
    - Every photo has torn gold foil or vintage polaroid border treatment with individual physical angles (-5° to +8°).
  - **Natural & Botanical Accents:**
    - Clusters of deep red velvet roses and blush pink garden roses interspersed with delicate white baby's breath (*gypsophila*).
    - A vibrant red monarch butterfly perched delicately on the bottom-left photo.
    - Soft cherry blossom branch framing the top-right photo.
  - **Interactive CTA:**
    - Positioned at the bottom center: a horizontal torn-edge parchment banner with embossed serif text: **"TAP FOR SURPRISE"** in uppercase tracking.
    - Scattered loose rose petals flank the banner.
- **Animation Expectations:**
  - Subtle floating oscillation of envelope and photos (`y: ±8px`, duration 4-6s).
  - Slow particle drift of ambient bokeh and dust motes.
  - Monarch butterfly subtle wing pulsation or resting breathing loop.
  - On tap: Wax seal breaks/flashes gold, envelope opens or unfolds into the Selection Hub.

---

### 2. `selection-scene.png`

- **Scene:** Scene 2: Selection (`SelectionScene.tsx`)
- **Visual Composition:**
  - **Background:** Deep burgundy-to-crimson stage lighting with a bright center spot highlight behind the selection artifacts.
  - **Header:**
    - *"Choose the Surprise"* in large calligraphic white/gold script font spanning the top third, with glowing aura.
  - **Thematic Interactive Artifacts (Left to Right):**
    1. **"Journey":** Classic vintage rangefinder camera resting on a cluster of aged postal letters and envelopes. Script label *"Journey."* below.
    2. **"Moment":** Antique pocket watch with Roman numerals (hands pointing to ~10:08) nestled in pink blossoms and aged parchment, with a small luggage tag labeled `26-09-26`. Script label *"Moment"* with underline below.
    3. **"Playlist":** Vintage aged paper record sleeve with a black grooved vinyl disc sliding outward, surrounded by dried rose petal confetti. Script label *"Playlist"* with underline below.
    4. **"Gift":** Crimson gift box tied with a rich gold satin ribbon and an ornate cream lace bow, with a red butterfly perched on the right side. Script label *"Gift"* with underline below.
  - **Bottom Navigation:**
    - Centered underlined text button: **"TAP FOR SURPRISE"** serving as a global advance trigger.
- **Animation Expectations:**
  - Staggered entrance of artifacts from below with subtle bounce (`photoEntrance` style).
  - Individual hover/focus state: item elevates slightly (`y: -10px`, `scale: 1.05`), drops an intensified amber glow (`box-shadow: 0 0 30px rgba(246, 201, 78, 0.4)`), and script underline animates left-to-right.
  - Clicking an item triggers a cinematic scene transition to the corresponding scene:
    - *Journey* → `JourneyScene`
    - *Moment* → `GalleryScene`
    - *Playlist* → `PlaylistScene`
    - *Gift* → `GiftScene`

---

### 3. `journey-scene.png`

- **Scene:** Scene 3: Journey (`JourneyScene.tsx`)
- **Visual Composition:**
  - **Background:** Deep ruby/wine red velvet ambiance with floating translucent pink heart outlines and falling petals.
  - **Navigation:**
    - Top-right corner: Pill-shaped **"BACK ◂"** button in muted antique sage green (`#87b07c`) with bold dark slate text and rounded edges.
  - **Left Compositional Cluster:**
    - Gilded Baroque Frame: A heavy rectangular antique gold frame featuring a photo of the couple.
    - Accompanying Typography:
      - Script header: *"Our Journey: Bruno Mars - 'Risk It All'"*
      - Script subtitle: *"Our Story - Journey, Moment, Playlist, Gift"*
    - Foreground Physical Props: An embossed silver antique camera paired with an open wooden treasure chest overflowing with dried rose petals and pastel pink heart-shaped paper cutouts.
  - **Right Compositional Cluster:**
    - Two overlapping gilded gold frames with portrait photos (one upright square, one tilted rectangular frame behind it).
    - Lower Prop: An open wooden music box stamped with *"Our Soundtrack"* and a metal wind-up crank on its right side.
    - Ethereal Effect: Bright cyan/neon blue musical staff and note glyphs (`♪ ♫`) floating upward out of the music box into the air.
- **Animation Expectations:**
  - Floating hearts drifting upward at variable speeds and scales (parallax depth layers 1, 2, 3).
  - Musical notes floating in a wave motion with pulsating cyan luminescence.
  - Frames settle into place with tactile spring physics on scene entry.

---

### 4. `gallery-scene.png`

- **Scene:** Scene 4: Gallery / Moments (`GalleryScene.tsx`)
- **Visual Composition:**
  - **Atmosphere & Lighting:**
    - Top canopy: A warm string of glowing fairy lights with soft light flares draped across the top edge.
    - Deep burgundy vignette backdrop with drifting bokeh.
  - **Header & Navigation:**
    - Top center: *"Happy Anniversary"* script heading in creamy white cursive.
    - Top right: Sage green pill-shaped **"BACK ◂"** button.
  - **Center Scrapbook Grid:**
    - 8 white-bordered Polaroid photograph prints arranged in a loose 2×4 staggered layout:
      - Top row: 4 photos with individual tilt angles (-4° to +6°).
      - Bottom row: 4 photos with complementary counter-tilts.
  - **Scrapbook Embellishments & Stickers:**
    - Red glossy 3D heart pins anchored between photo corners.
    - Deep red satin ribbon bows (corners and center divider).
    - Clusters of blooming red and pink garden roses with baby's breath.
    - Playful illustrative stickers:
      - Golden Saturn with planetary rings (bottom left).
      - Cute pastel blue watercolor whale (middle right).
      - Purple swirl watercolor planet (bottom right).
      - Pair of soft pink heart stickers (bottom center).
  - **Footer:**
    - Commemorative date: `26-09-26` centered at the bottom in delicate cursive serif.
- **Animation Expectations:**
  - Fairy lights gently flicker with a soft candle-like shimmer (opacity 0.85 ↔ 1.0).
  - Photos reveal via staggered entrance from center outward with realistic paper settle.
  - Hovering a photo brings it to the top z-index with a gentle tilt-reset and shadow expansion.
  - Clicking a photo opens an expanded scrapbook lightbox view.

---

### 5. `playlist-scene.png`

- **Scene:** Scene 5: Playlist (`PlaylistScene.tsx`)
- **Visual Composition:**
  - **Atmospheric Background:** Rich draped red velvet theatre curtain folds with deep shadows and specular highlights.
  - **Lighting Elements:** 3 burning white pillar candles in glass holders on the left and right sides casting warm candlelight onto the scene. Floating warm amber heart particles and golden butterflies with sparkle trails.
  - **Header & Navigation:**
    - Top center: *"Nayyy & Keillaa"* in elegant formal cursive script with gold glow.
    - Top right: Ornate rectangular-pill **"BACK ◂"** button in dark burgundy with an inset gold border.
  - **Left Feature — Handwritten Love Letter Parchment:**
    - An aged rectangular parchment card framed completely along its perimeter with fresh red rose petals.
    - Typeset in clear editorial text with sincere Indonesian romantic narrative:
      > *"Happy anniversary, sayang. Terima kasih ya sudah mau berjalan sejauh ini sama aku, melewati banyak hal baik dan sulit sama-sama. Hadirnya kamu bikin hari-aku jauhan lebih berarti dan berwarna. Aku bersyukur banget bisa punya kamu di hidupku. Semoga kita bisa terus saling jaga... makin"*
  - **Center Action — Vinyl Turntable:**
    - A glossy black vinyl record positioned at the bottom border of the letter card.
    - Center label is a red 3D heart containing a white play triangle button (`▶`).
  - **Right Feature — Photographic Altar:**
    - An ornate baroque gilded gold frame holding a couple portrait.
    - Resting on top of a vintage camera body surrounded by a bouquet of red and pink roses.
- **Animation Expectations:**
  - Candle flames subtly flicker via micro-opacity and scale tweens.
  - Vinyl disc rotates continuously (`rotation: 360`, `repeat: -1`, `ease: "none"`) when music is playing; slows to a stop on pause.
  - Pressing the play button triggers background audio playback via `AudioManager`.
  - Floating hearts and golden butterflies drift organically upward across the curtains.

---

### 6. `gift-scene.png`

- **Scene:** Scene 6: Gift (`GiftScene.tsx`)
- **Visual Composition:**
  - **Frame & Vignette:**
    - Ornate double-line gold border with intricate floral filigree scrollwork in all four corners.
    - Very dark deep burgundy vignette focusing all light on the center.
  - **Header:**
    - *"Press the Envelope"* in dramatic, sweeping italic script with brilliant starlight lens flares sparkling at letter crests.
  - **Centerpiece — Sealed Royal Letter:**
    - A crisp, luminous cream/ivory envelope lying horizontally in a state of high illumination.
    - A thick burgundy wax seal stamped with an ornate **"N&K"** monogram set within a heart motif.
    - Two delicate red rosebuds with green leaves resting on the envelope's top-right corner.
  - **Keepsake Bed:**
    - The envelope rests on a dense, circular wreath bed of red and pink rose petals sprinkled with glistening morning dew water drops, genuine pearls, and golden fairy dust.
  - **Bottom CTA:**
    - Centered below the envelope bed: *"tap to lanjut"* in sparkling script with starburst sparkles.
- **Animation Expectations:**
  - Starburst flares on the headline shimmer with periodic scale pulses.
  - Envelope has a gentle breathing glow pulse (`box-shadow: 0 0 35px rgba(254, 230, 138, 0.4)`).
  - Hovering or tapping the envelope triggers wax seal cracking sound (SFX) and a multi-stage unfold animation leading into the final scene.

---

## Downstream Scene: `FinalLetterScene` (Derived Requirements)

*Note: While there is no standalone screenshot named `final-letter-scene.png`, the letter interaction depicted inside `playlist-scene.png` and the envelope opening sequence in `gift-scene.png` define the visual language for the full-screen Final Letter.*

- **Visual Requirements:**
  - Full-screen unfolded parchment letter (`PaperCard` variant `aged` or `deckle`).
  - Handwritten typography (`--font-dancing` / `Dancing Script`) for the complete love letter text.
  - Wax seal broken/placed as a paperweight at the corner.
  - Floating rose petals and soft candlelight ambiance.
  - A gentle closing CTA: *"Replay from beginning"* or *"Download Keepsake"*.