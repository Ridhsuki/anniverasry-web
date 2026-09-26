# Scene Architecture Specification


## Scene System

The application consists of independent cinematic scenes.


Scene list:

- intro
- selection
- journey
- gallery
- playlist
- gift
- final-letter


---

# Scene Contract


Each scene should:

- be isolated.
- reusable.
- receive external state.
- control only its own visual behavior.


---

# Intro Scene


Component:

IntroScene.tsx


Responsibilities:

- initial atmosphere
- title animation
- main interaction object
- entrance animation



---

# Selection Scene


Component:

SelectionScene.tsx


Responsibilities:

- memory navigation
- card interaction
- transition trigger



---

# Journey Scene


Component:

JourneyScene.tsx


Responsibilities:

- timeline
- memory sequence
- photo presentation



---

# Gallery Scene


Component:

GalleryScene.tsx


Responsibilities:

- scrapbook layout
- photo frames
- captions



---

# Playlist Scene


Component:

PlaylistScene.tsx


Responsibilities:

- music interface
- vinyl interaction
- audio state



---

# Gift Scene


Component:

GiftScene.tsx


Responsibilities:

- envelope interaction
- surprise reveal



---

# Final Letter Scene


Component:

FinalLetterScene.tsx


Responsibilities:

- final message
- closing animation
