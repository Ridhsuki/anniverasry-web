# Documentation Index

This directory contains all technical, architectural, and operational documentation for the Interactive Cinematic Anniversary Website.

---

## Reading Order

### For New Developers / AI Agents
1. [`design-spec.md`](./design-spec.md) — visual identity, color palette, typography, and texture system.
2. [`experience-flow.md`](./experience-flow.md) — user journey, scene progression, and navigation rules.
3. [`scene-architecture.md`](./scene-architecture.md) — component hierarchies, state contracts, and scene specs.
4. [`animation-system.md`](./animation-system.md) — GSAP motion philosophy, easing standards, GPU rules.
5. [`component-guideline.md`](./component-guideline.md) — component tiers, props typing, composition patterns.
6. [`development-guideline.md`](./development-guideline.md) — TypeScript rules, code quality checklist, AI agent rules.

### For Maintenance / Operations
- [`ASSET-MANAGEMENT.md`](./ASSET-MANAGEMENT.md) — replacing images, audio, fonts, and decorative assets.
- [`DEPLOYMENT-GUIDE.md`](./DEPLOYMENT-GUIDE.md) — Netlify CI/CD setup, verification checklist, rollback.
- [`MAINTENANCE-GUIDE.md`](./MAINTENANCE-GUIDE.md) — dependency updates, debugging common issues, adding new scenes.

### Audit & Release Reports
- [`phase-9-release-report.md`](./phase-9-release-report.md) — final production validation: Lighthouse scores, test results, QA sign-off.
- [`phase-6-audit.md`](./phase-6-audit.md) — Phase 6 production hardening audit.
- [`final-qa-checklist.md`](./final-qa-checklist.md) — QA checklist used prior to public release.
- [`release-notes.md`](./release-notes.md) — cumulative release notes by phase.

---

## Full Document Reference

### Architecture Docs

| Document | Purpose |
|----------|---------|
| [`design-spec.md`](./design-spec.md) | Visual identity, color, typography, textures, responsive breakpoints |
| [`experience-flow.md`](./experience-flow.md) | User journey state diagram, navigation branches, global rules |
| [`scene-architecture.md`](./scene-architecture.md) | Per-scene component spec, DOM slots, state contracts, animation requirements |
| [`animation-system.md`](./animation-system.md) | GSAP usage standards, easing curves, GPU acceleration, `prefers-reduced-motion` |
| [`asset-strategy.md`](./asset-strategy.md) | Original asset ingestion strategy and Howler.js audio architecture |
| [`component-guideline.md`](./component-guideline.md) | Component tiers, props API, composition rules, anti-patterns |

### Development Docs

| Document | Purpose |
|----------|---------|
| [`development-guideline.md`](./development-guideline.md) | Engineering standards, strict TypeScript rules, AI agent execution protocol |
| [`ASSET-MANAGEMENT.md`](./ASSET-MANAGEMENT.md) | Asset naming conventions, optimization targets, replacement workflows |
| [`DEPLOYMENT-GUIDE.md`](./DEPLOYMENT-GUIDE.md) | Netlify deployment setup, environment config, rollback procedures |
| [`MAINTENANCE-GUIDE.md`](./MAINTENANCE-GUIDE.md) | Routine maintenance, adding scenes, debugging playbook |

### Audit & Release Docs

| Document | Purpose |
|----------|---------|
| [`phase-9-release-report.md`](./phase-9-release-report.md) | Final production validation — Lighthouse, validate pipeline, QA |
| [`phase-6-audit.md`](./phase-6-audit.md) | Phase 6 hardening audit results |
| [`final-qa-checklist.md`](./final-qa-checklist.md) | Pre-release QA checklist |
| [`release-notes.md`](./release-notes.md) | Phase-by-phase release notes |
| [`final-audit.md`](./final-audit.md) | Cumulative final audit summary |

### Reference Material

| Document | Purpose |
|----------|---------|
| [`references/image-map.md`](./references/image-map.md) | Screenshot reference audit — compositional analysis of design references |
