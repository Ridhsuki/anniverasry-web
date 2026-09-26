# Anniversary Interactive Website
# Design Specification


## 1. Project Overview

Project Type:

Interactive cinematic anniversary website.

Primary Goal:

Create an immersive digital memory experience combining:

- storytelling
- photography
- music
- animation
- emotional interaction


The website should feel like:

- opening a personal memory box
- reading a handwritten letter
- exploring a vintage scrapbook


---

# 2. Design Philosophy


## Core Concept

Vintage Romantic Cinematic Scrapbook.


## Emotional Direction

The experience should communicate:

- intimacy
- nostalgia
- warmth
- elegance
- personal connection


Avoid:

- modern SaaS style
- excessive gradients
- generic landing page appearance
- overly bright colors


---

# 3. Visual Identity


## Color Direction


Primary Background:

Dark romantic tones.

Examples:

- deep burgundy
- charcoal black
- dark brown


Accent:

- antique gold
- warm cream
- muted rose


Paper:

- aged ivory
- parchment texture



## Color Usage Rules


Background:

Used for:
- scene environment
- cinematic atmosphere


Gold:

Used for:
- important interaction
- borders
- highlights


Cream:

Used for:
- paper
- letters
- cards


Rose:

Used for:
- romantic decoration



---

# 4. Typography System


## Display Typography

Purpose:

- hero title
- scene title
- emotional moments


Style:

Elegant serif.


Reference:

Cormorant Garamond


---

## Body Typography

Purpose:

- description
- captions


Style:

Editorial serif.


Reference:

Playfair Display


---

## Handwritten Typography

Purpose:

- letter
- personal notes
- captions


Reference:

Dancing Script



---

# 5. UI Style


## Overall Style

Vintage editorial.


Characteristics:

- paper texture
- thin gold border
- soft shadow
- imperfect rotation
- physical object feeling



## Components


Buttons:

Should feel like:

- invitation card
- wax seal
- vintage label



Cards:

Should feel like:

- old photograph
- scrapbook paper



Frames:

Should feel like:

- printed photograph
- physical memory



---

# 6. Animation Direction


Animation should feel:

- slow
- cinematic
- organic
- emotional


Avoid:

- fast UI animation
- aggressive movement
- gaming style animation



## Timing


Micro interaction:

0.2 - 0.5s


UI reveal:

0.8 - 1.2s


Cinematic scene:

1.5 - 3s



## Movement


Preferred:

transform

opacity

scale

rotation



Avoid:

layout animation.



---

# 7. Scene Definition


## Scene 01 - Intro


Purpose:

First impression.


Reference:

references/screenshots/01-intro-menu.png


Main Elements:

- background atmosphere
- title
- floating decoration
- main interaction object


Mood:

Mystery and anticipation.



---

## Scene 02 - Selection


Purpose:

Allow user to choose experience path.


Elements:

- memory cards
- buttons
- decorative objects



---

## Scene 03 - Journey


Purpose:

Relationship timeline.


Elements:

- timeline
- photos
- memories



---

## Scene 04 - Gallery


Purpose:

Photo exploration.


Elements:

- scrapbook layout
- photo frames
- captions



---

## Scene 05 - Playlist


Purpose:

Music experience.


Elements:

- vinyl player
- song list
- audio controls



---

## Scene 06 - Gift


Purpose:

Reveal surprise.


Elements:

- envelope
- gift box
- letter



---

## Scene 07 - Final Letter


Purpose:

Emotional closing.


Elements:

- handwritten letter
- final message
- ending animation



---

# 8. Responsive Direction


Desktop:

Primary showcase experience.


Mobile:

Must preserve:

- readability
- animation quality
- interaction usability



Avoid:

- horizontal overflow
- excessive particle effects
- heavy assets



---

# 9. Performance Rules


Images:

Use:

- WebP
- AVIF


Animation:

Use:

- transform
- opacity


Avoid:

- large unoptimized images
- unnecessary re-render
- heavy libraries



---

# 10. Reference Files


All visual references are stored in:


docs/references/


These references are the source of truth for implementation decisions.