# Production Deployment & Operations Guide

> **Document Status:** Complete Production Release Guide  
> **Evaluation Date:** October 2026  
> **Target Release:** Version 1.0.0 Production  
> **Governing Specifications:** `docs/development-guideline.md`, `docs/design-spec.md`, `docs/final-qa-checklist.md`

---

## 1. Overview & Architecture

The anniversary website is a high-performance, single-page interactive showcase built on Next.js 16 (App Router), React 19, Tailwind CSS v4, and GSAP 3. It utilizes client-side audio streaming via Howler.js and hardware-accelerated animations scoped via `@gsap/react`.

### Production Targets
- **Recommended Platform:** **Vercel** (Zero-configuration native Next.js 16 runtime, Turbopack, edge routing, and AVIF/WebP image optimization).
- **Secondary Platform:** **Netlify** (Pre-configured via `netlify.toml` with `@netlify/plugin-nextjs`).
- **Container / Self-Hosted:** Node.js 18.18+ or 20+ runtime via `npm start`.
- **Static S3 / GitHub Pages:** Compatible if `output: "export"` and `images.unoptimized: true` are enabled in `next.config.ts`.

---

## 2. Environment Requirements

### 2.1 Runtime & Engine
- **Node.js:** `>= 18.18.0` (LTS 20.x or 22.x recommended)
- **Package Manager:** `npm >= 9.x`

### 2.2 Environment Variables
Configure the following in your hosting provider's dashboard or in `.env.local` for local production testing:

| Variable | Type | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_APP_NAME` | string | `"Anniversary"` | Application brand title used in headers, OpenGraph, and PWA manifest. |
| `NEXT_PUBLIC_APP_URL` | string | `https://localhost:3000` | Canonical production URL (used for absolute OpenGraph, Twitter, and sitemap URLs). |
| `NEXT_PUBLIC_ENABLE_AUDIO` | boolean | `true` | Enables/disables the Howler audio subsystem globally. |
| `NEXT_PUBLIC_ENABLE_ANIMATIONS` | boolean | `true` | Feature flag for GSAP animations. |

---

## 3. Step-by-Step Deployment Instructions

### Option A: Vercel (Recommended)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the Vercel Dashboard, select **Add New Project** and import the repository.
3. Configure settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Add Environment Variables:
   - `NEXT_PUBLIC_APP_NAME`: `Nayyy & Keillaa — Anniversary Keepsake`
   - `NEXT_PUBLIC_APP_URL`: `https://your-custom-domain.com`
5. Click **Deploy**. Vercel will automatically optimize images, cache static audio assets at the edge, and enforce security headers.

### Option B: Netlify
1. Connect repository in Netlify Dashboard.
2. The repository includes `netlify.toml`, which configures:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```
3. Set environment variables in **Site configuration > Environment variables**.
4. Trigger deploy.[![Netlify Status](https://api.netlify.com/api/v1/badges/86cf6b4b-5348-443e-99c1-fe7f81c645da/deploy-status)](https://app.netlify.com/projects/anniverasry-web/deploys) [live demo](https://anniverasry-web.netlify.app/)


### Option C: Self-Hosted Docker / Node Server
1. Clone the repository on the target server.
2. Install production dependencies and validate:
   ```bash
   npm ci
   npm run validate
   ```
3. Start the production server on port 3000:
   ```bash
   NODE_ENV=production npm start
   ```
4. Set up a reverse proxy (e.g. NGINX, Caddy, or Cloudflare Tunnel) pointing to `localhost:3000` with SSL/TLS termination.

---

## 4. Security & Caching Headers

The production configuration in `next.config.ts` automatically serves standard security headers:
- `X-Content-Type-Options: nosniff` (MIME sniffing prevention)
- `X-Frame-Options: SAMEORIGIN` (Clickjacking prevention)
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Static media files (`/images/*`, `/audio/*`) are served with immutable cache-control headers:
```http
Cache-Control: public, max-age=31536000, immutable
```

---

## 5. Maintenance & Content Replacement Workflow

### Replacing Photographic Memories
1. Prepare high-resolution WebP photographs. Recommended dimensions:
   - Portrait Polaroids: $800 \times 1067\text{ px}$ (3:4 aspect ratio)
   - Square Polaroids: $800 \times 800\text{ px}$ (1:1 aspect ratio)
   - Landscape Polaroids: $1067 \times 800\text{ px}$ (4:3 aspect ratio)
2. Place new files into both:
   - Specific scene folder: `public/images/[scene]/`
   - Compatibility mirror: `public/images/photos/`
3. Update captions, dates, and dimensions in `src/data/` if needed.
4. Run validation:
   ```bash
   npm run validate
   ```

### Updating Music & Audio Tracks
1. Place streaming `.mp3` tracks into `public/audio/bgm/`.
2. Place sound effects into `public/audio/sfx/`.
3. Configure metadata in `src/constants/audio.ts` and `src/data/playlist.ts`.
4. Ensure soundtrack duration and cover artwork are synchronized.

---

## 6. Pre-Flight Verification Checklist

Before releasing to production or pointing a custom domain, execute:

```bash
npm run validate
```

Confirm that:
1. `tsc --noEmit` outputs **0 errors**.
2. `eslint` outputs **0 errors / 0 warnings**.
3. `vitest run` passes **19 / 19 tests**.
4. `next build` generates static routes with zero warnings.
