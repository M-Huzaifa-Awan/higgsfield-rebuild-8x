# Framefield

Framefield is a focused recreation of the essential Higgsfield creative loop for the
8x Product Engineer assignment. It prioritizes a coherent journey—discover a direction,
configure an image or video, create a clearly labeled sample result, and revisit it in
Projects—over copying every product surface.

> No generation API is connected. Every visible output is labeled as a sample and uses
> licensed remote editorial photography from Unsplash. The interface never represents
> mocked output as real AI generation.

## Product highlights

- Curated discovery feed with one-click prompt reuse.
- Unified image and video composer.
- Model, aspect ratio, duration, upload, prompt presets, and advanced controls.
- Honest demo credit estimates and staged progress feedback.
- Project history, favorites, and sample output actions.
- Responsive desktop/mobile navigation and touch-safe controls.
- Reduced-motion support, labels, focus states, and semantic controls.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS plus semantic custom tokens
- shadcn-compatible `Button` primitive using Radix Slot and CVA
- Lucide icons and Motion
- Playwright end-to-end tests
- Vercel-ready static application

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run build
npm run test:e2e
```

The suite covers desktop and mobile prompt remixing, sample generation, project history,
bottom navigation, and horizontal overflow.

## Repository guide

- `app/` — App Router shell and global design system.
- `components/studio-shell.tsx` — complete product workflow and demo state.
- `components/ui/` — shadcn-style primitives.
- `tests/` — Playwright journeys.
- `research/` — observed reference behavior and screenshots.
- `PRODUCT_DECISIONS.md` — prioritization and deliberate exclusions.
- `CAPTURE-TEST.md` / `.agent-logs/` — verified raw agent capture history.
- `WALKTHROUGH.md` — under-five-minute recording outline.

## Known limitations

- No authentication, persistent backend, payments, or real credit deduction.
- Outputs and project state reset on refresh.
- Remote sample imagery requires internet access.
- Authenticated Higgsfield journeys were not accessed during research.
- The live reference `/video` route returned 404 and pricing remained in a loading
  skeleton during the recorded research pass; those observations are documented rather
  than silently generalized.

## Deployment

Deploy with Vercel from the repository root. No secrets or environment variables are
required for this demo.

