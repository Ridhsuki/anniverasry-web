Please improve the Markdown formatting of this file if it doesn’t yet follow best practices to make it easier for the AI agent to process. I’ve also included the rough draft at the end. 

# Final Audit Findings

## Overview

This document contains visual, UX, animation, and asset issues discovered during manual verification.

The purpose is to guide Phase 5 refinement.

---

# Global Issues


## Issue: Smooth Scroll

Category:
UX / Interaction

Priority:
High

Description:

The current experience still uses default browser scrolling.
Implement a cinematic smooth scrolling experience using Lenis while maintaining GSAP compatibility.


---

## Issue: Browser Scrollbar

Category:
UI

Priority:
Medium

Description:

Multiple scrollbars appear.
Replace default scrollbar with custom styled scrollbar or hide when appropriate.


---

## Issue: System Emoji

Category:
Visual Consistency

Priority:
Medium

Description:

Remove system emojis.
Replace with custom icons, SVG, or design-consistent decorations.


---

# Intro Scene


## Issue:
Envelope composition is not visually correct.

Description:

The envelope top and bottom sections appear clipped and disconnected.

Expected:

A complete physical envelope object with proper depth and composition.


---

# Global Paper Layout


## Issue:
Paper/card margin and padding inconsistency.

Description:

Paper-based components have inconsistent spacing.

Expected:

Unified spacing system based on design tokens.


---

# Gallery Scene


## Issue:
Photo opening transition lacks cinematic feeling.

Expected:

When clicking photo:
- dramatic expansion
- smooth reveal
- background focus effect


---

# Gift Scene


## Issue:
Envelope opening light effect is weak.

Problems:
- light radius too small
- rectangular shape visible
- insufficient cinematic glow


Expected:

Organic light burst with better blending.


---

# Transition System


## Issue:
Post-transition flicker.

Description:

After GSAP scene transition, some elements appear late causing blinking.

Expected:

Synchronize:
- scene mounting
- GSAP lifecycle
- initial hidden states


---

# Assets


## Issue:
Final photo and music integration.

Requirement:

Move sample assets from root directory.

Create final asset structure.

Duplicate and rename files according to scene requirements.

Prepare easy replacement workflow.


# Draft
- Amplop di awal belum bagus, masih terpotong antara bagian ats dan bagian bawah nya
- Smooth scroll akan lebih baik
- Margin padding pada bagian2 kertas belum rapih
- jangan pakai Emoji bawaan sistem 
- Scroll bar masih ada yang double bawaan browser da juga scroll bar bawaan, jadi hide dan atau custom saja dengan style yang baik dan sesuai
- Pada bagian Gallery, ketika foto di klik, tidak ada transisi muncul nya, buat lebih dramati dan aestehtic
- pada bagian gift, sinar sata press envelop terlalu kecil dan masih kelihatan kotak nya, sinar nya juga kurang bagus
- antara transisi dan juga kemunculan elemen masih ada kedip2 pada setiap pasca transisi/gsap yang telat pasca transisi atau sebaiknya tidak perlu gsap? bug 
- FInalize photo dan music (mandiri by dev), saya menyediakan sample photo, dan music, nanti di duplicate dan di rename saja sesuai dengan part2 nya agr nanti saya dapat dengan mudah mengganti nya dengan yang lain, untuk sample nya saat ini ada di root directory, nanti pindahkan sesuai dengan tempatnya dan duplicaet sesui dengan nama nya saja

