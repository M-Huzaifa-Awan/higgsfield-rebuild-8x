# Five-minute walkthrough outline

## 0:00–0:40 — Product understanding

Higgsfield is an AI-native creative suite that brings image and video models, references,
and outputs into one workspace. The core user problem is moving from a rough visual idea
to a usable creative direction without learning and subscribing to many separate tools.

## 0:40–1:20 — Product decisions

Show `PRODUCT_DECISIONS.md`. Explain that the recreation prioritizes the complete loop:
discover, reuse a direction, configure, generate, and revisit. Mention the deliberate
exclusion of authentication, billing, and unapproved generation APIs. Emphasize that every
sample output is labeled honestly.

## 1:20–3:30 — Live demonstration

1. Start on Discover and point out the simplified three-destination navigation.
2. Open “Afterhours atelier” to move its prompt directly into Create.
3. Switch between Image and Video; change model, ratio, and duration.
4. Add a prompt preset, open advanced controls, and optionally choose a reference file.
5. Create a sample and narrate the staged progress states.
6. Point out the “Sample output · not AI generated” label.
7. Open Projects, favorite an output, and filter to Favorites.
8. Resize to mobile and show the bottom navigation and compact composer.

## 3:30–4:20 — Architecture

Describe the Next.js App Router shell, TypeScript state model, reusable shadcn-style button,
semantic CSS tokens, Motion transitions, and the single replaceable generation boundary.
Show the Playwright suite covering the vertical slice on desktop and mobile.

## 4:20–5:00 — Improvements and tradeoffs

The strongest improvement is collapsing a catalogue of model pages into one creation
surface while keeping inspiration actionable. Cost and settings are visible before the
action; loading states explain progress; projects preserve context. The main limitation is
intentional: generation is a clearly labeled interactive demo. Next priorities would be an
approved generation API, persistent projects, authentication, and transparent real credit
estimates.

Do not claim a walkthrough video was recorded; this file is the recording outline only.
