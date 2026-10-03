# Deployment Guide

This document covers the full deployment workflow for the anniversary web application on **Netlify**, including initial setup, CI/CD configuration, environment variables, and rollback procedures.

---

## Prerequisites

- A Netlify account (free tier is sufficient).
- The project repository hosted on GitHub (or GitLab / Bitbucket).
- Node.js ≥ 22 and npm ≥ 11 confirmed working locally (`npm run validate` passes).

---

## Initial Setup: Connect Repository to Netlify

1. **Log in** to [Netlify](https://app.netlify.com).
2. Click **"Add new site" → "Import an existing project"**.
3. Choose **GitHub** as the Git provider and authorise Netlify.
4. Select the repository (`anniverasry-web` or your fork name).

---

## Build Configuration

Netlify reads build settings from `netlify.toml` at the repository root:

```toml
[build]
  command   = "npm run build"
  publish   = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

| Setting | Value | Purpose |
|---------|-------|---------|
| `command` | `npm run build` | Runs Next.js production build via Turbopack |
| `publish` | `.next` | Output directory read by the Netlify adapter |
| Plugin | `@netlify/plugin-nextjs` | Enables server-side features and static optimisation |

No manual override of build settings in the Netlify dashboard is required — `netlify.toml` takes precedence.

---

## Environment Variables

The base application requires **no secret environment variables**.

If you add integrations (e.g., analytics, a CMS, contact form backend), set variables in:  
**Netlify Dashboard → Site Settings → Environment Variables**

Then reference them in code as `process.env.NEXT_PUBLIC_<NAME>` (for client-accessible values) or `process.env.<NAME>` (for server-only values).

---

## Automatic Deployment (CI/CD)

Once the repository is connected:

1. Every push to the **`main` branch** triggers a production deployment automatically.
2. Every push to any **other branch** creates a **deploy preview** at a unique URL — useful for QA before merging.
3. Deploy status is reported directly in GitHub pull requests (if the Netlify GitHub App is installed).

### Deploy Flow

```
git push origin main
       │
       ▼
Netlify detects push
       │
       ▼
npm install → npm run build
       │
  ┌────┴────┐
  │ success │──▶ New production URL promoted
  └────┬────┘
       │ failure
       ▼
Previous deployment remains live
(build log available in Netlify dashboard)
```

---

## Manual Deployment

To trigger a deployment without a code push:

1. **Netlify Dashboard → Deploys → "Trigger deploy"**.

Or via Netlify CLI:

```bash
npx netlify deploy --prod
```

---

## Production Verification Checklist

After each deployment, verify:

- [ ] Home page (`/`) loads without console errors.
- [ ] All seven scenes are reachable via navigation.
- [ ] Audio plays on the intro scene (main BGM).
- [ ] Playlist scene can switch tracks and audio is audible.
- [ ] Gallery lightbox opens and closes correctly.
- [ ] Gift reveal animation completes without errors.
- [ ] Final letter renders with correct typography.
- [ ] Custom cursor is visible and adapts over paper elements.
- [ ] Mobile layout (375 px) shows no horizontal overflow.
- [ ] `robots.txt` returns 200 at `/robots.txt`.
- [ ] `sitemap.xml` returns 200 at `/sitemap.xml`.
- [ ] Web App Manifest returns 200 at `/manifest.webmanifest`.

---

## Rollback Strategy

### Instant Rollback via Netlify Dashboard

1. Go to **Netlify Dashboard → Deploys**.
2. Find the last known-good deploy in the list.
3. Click it → **"Publish deploy"**.

The previous deployment goes live in seconds — no rebuild required.

### Git-based Rollback

```bash
# Revert the last commit and push
git revert HEAD
git push origin main
```

This triggers a new Netlify build from the reverted codebase.

### Branch-based Staging

For risky changes, push to a feature branch first and review the Netlify deploy preview URL before merging to `main`.

---

## Custom Domain

To attach a custom domain:

1. **Netlify Dashboard → Domain Management → "Add a domain"**.
2. Enter the domain and follow DNS verification steps.
3. Netlify provisions a free TLS certificate via Let's Encrypt automatically.

---

## Netlify CLI Reference

```bash
# Install
npm install -g netlify-cli

# Login
netlify login

# Link to existing site
netlify link

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod

# Open site in browser
netlify open
```
