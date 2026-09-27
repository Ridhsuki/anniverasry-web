# Interactive Cinematic Anniversary Website — Documentation

Welcome to the comprehensive specification and architectural documentation for the anniversary showcase website.

This directory serves as the **single source of truth** for all visual, technical, narrative, and engineering decisions.

---

## Documentation Index

| Document | Purpose |
|---|---|
| [`design-spec.md`](./design-spec.md) | **Visual Identity & Design Direction** — Color palettes, typography roles, skeuomorphic textures, responsive breakpoints, and performance constraints. |
| [`experience-flow.md`](./experience-flow.md) | **User Journey & Experience Narrative** — State diagrams, scene progressions, user interaction branches, and global navigation rules. |
| [`scene-architecture.md`](./scene-architecture.md) | **Technical Scene Specifications** — Component hierarchies, DOM slots, state contracts, and animation requirements for all 7 scenes. |
| [`animation-system.md`](./animation-system.md) | **Motion Philosophy & Timing Standards** — Easing curves, GSAP utilities, GPU acceleration rules, and accessibility standards. |
| [`asset-strategy.md`](./asset-strategy.md) | **Asset Management & Audio Strategy** — Directory structure, image optimization pipeline, Howler.js audio streaming, and ingestion workflows. |
| [`component-guideline.md`](./component-guideline.md) | **Component Architecture & Guidelines** — Component tiers, props typing, composition patterns, and anti-patterns. |
| [`development-guideline.md`](./development-guideline.md) | **Engineering Standards & Agent Rules** — TypeScript strict rules, code quality checklists, and operational rules for future AI coding agents. |
| [`references/image-map.md`](./references/image-map.md) | **Screenshot Reference Audit** — Compositional analysis of visual reference screenshots stored in `docs/references/screenshots/`. |

---

## Reading Order for Developers & AI Agents

1. **Orientation:** Read [`design-spec.md`](./design-spec.md) and [`references/image-map.md`](./references/image-map.md) to understand the visual target.
2. **Narrative & State Flow:** Read [`experience-flow.md`](./experience-flow.md) to grasp the user journey and scene progression.
3. **Engineering Specifications:** Read [`scene-architecture.md`](./scene-architecture.md), [`component-guideline.md`](./component-guideline.md), and [`animation-system.md`](./animation-system.md).
4. **Execution Protocol:** Review [`development-guideline.md`](./development-guideline.md) before writing or refactoring any code.
