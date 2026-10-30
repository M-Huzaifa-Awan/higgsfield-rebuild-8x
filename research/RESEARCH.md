# Higgsfield product research

Research date: 2026-10-31 (Asia/Karachi)

## Method and access

- Opened the mandatory capture instructions before implementation.
- Used Playwright with the locally installed Chrome browser against the live public site.
- Captured desktop pages in `research/screenshots/`.
- Used Higgsfield's current public pages and help content for product and pricing facts.
- Browser-control infrastructure was unavailable, so no authenticated account was created.
- No paid feature, billing flow, or generation endpoint was bypassed or represented as tested.

## Journeys observed

### Discovery / homepage

The homepage is a dense, dark discovery feed. A slim global navigation exposes Explore,
Image, Video, Audio, MCP, API, several named products, Pricing, Login, and Sign up. The
page prioritizes large launch cards, promotional offers, model-specific galleries, and
community work. Acid-lime actions and headings create strong brand recognition.

The page is exciting but cognitively expensive: product families, models, studios,
promotions, and community content all compete at the same level. Several gallery areas
remain as dark loading placeholders during a full-page capture.

### Image creation

The public `/image` surface leads with a hero and an embedded generator containing:

- a prompt field;
- attachment affordance;
- model selection (shown as Nano Banana Pro);
- aspect ratio selection;
- a prominent Generate action.

The supporting content emphasizes legible text, image-to-video reuse, character
consistency, access to multiple models, native 4K, and regional editing. The journey is
well framed but mixes marketing and creation in one very long page.

### Video creation

The public `/video` URL returned a branded 404 during research. Video capabilities are
instead distributed through model pages and named studios. This is a discoverability
problem: the global navigation label suggests a stable canonical workflow that the URL
does not currently provide.

### Pricing and credits

The pricing page uses subscription cards, monthly/annual controls, generation estimates,
and a large model comparison. In the Playwright capture it remained in a skeleton state,
which makes a complex purchase decision feel unreliable. Current public content describes
credits, concurrency, model access, free generations, and temporary “Unlimited” windows;
the number of overlapping concepts is high.

### Account, history, and projects

Login and sign-up entry points are visible publicly, but authenticated surfaces were not
accessed. Generation history, project details, upload reuse, and paid credit deductions
are therefore documented as expected journeys, not tested behavior.

## Friction and opportunities

1. Replace the catalogue-first experience with one obvious “create” path.
2. Keep inspiration close, but let a user move any example into the editor in one click.
3. Make model, cost, format, and expected output visible together before generation.
4. Use a single project rail for outputs instead of separating creation and history.
5. Show useful progress stages rather than an indefinite skeleton.
6. Label simulated/demo output honestly when no generation API is connected.
7. Preserve the confident black-and-lime identity while reducing navigation density.
8. Treat mobile creation as the primary workflow, not a compressed desktop gallery.

## Screenshots

- `home-desktop.png` — live discovery homepage and long-form gallery.
- `image-workflow.png` — public image generator marketing surface.
- `video-workflow.png` — observed branded 404 at `/video`.
- `pricing.png` — pricing skeleton state observed during capture.

