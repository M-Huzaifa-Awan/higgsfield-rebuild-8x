# Product decisions

## Primary user and job

The primary user is a social creator, marketer, or small creative team trying to turn a
rough visual idea into a usable image or short video without learning several model-specific
tools. Their real job is not “run a model”; it is explore a direction, make a result,
compare iterations, and reuse the winner.

## What makes the reference useful

Higgsfield combines discovery, frontier models, references, cinematic controls, and
project outputs in one visual workspace. Its strongest advantage is the bridge from an
inspiring example to a model-backed creation flow.

## Priority journeys

### P0 — shipped

1. Browse a curated discovery feed.
2. Reuse an inspiration prompt in one click.
3. Configure image or video generation in one editor.
4. Understand model, format, duration, and demo cost before running.
5. See honest staged progress and a clearly labeled sample result.
6. Revisit results in a responsive project/history view.

### P1 — simplified

- Image upload and preview reuse.
- Prompt presets and creative direction chips.
- Favorite state and project filtering.
- Video-specific duration and motion settings.

### Deliberately excluded

- Real AI generation without approved credentials.
- Authentication, billing, subscriptions, or credit purchase.
- Audio, lipsync, influencer, face-swap, advanced canvas, and API tooling.
- A clone of every model and promotional landing page.
- Public social posting or community profiles.

## UX improvements

- A three-destination structure: Discover, Create, Projects.
- One studio for image and video instead of scattered product pages.
- Cost and output settings beside the Generate action.
- Progress copy that describes queued, composing, and finishing stages.
- Demo results labeled “Sample output” everywhere.
- Inspiration cards that populate the editor instead of ending at a detail page.
- A compact mobile composer with touch-safe controls and a persistent bottom navigation.

## Scope rationale

The assignment rewards a coherent vertical slice over breadth. This scope demonstrates
the full creative loop—discover, configure, generate, inspect, and revisit—without
pretending that a visual mock is a production AI service. The architecture leaves a
single generation boundary that can later be replaced with an approved API.

