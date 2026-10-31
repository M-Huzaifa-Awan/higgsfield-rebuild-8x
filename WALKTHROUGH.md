# Framefield walkthrough recording script

Target length: **4 minutes 30 seconds to 5 minutes**

Recording requirements: **camera on, microphone on, and screen shared**

## Before recording

Open these tabs in this order:

1. Live app: `https://framefield-8x-studio.mhuzaifaawan7.chatgpt.site`
2. `PRODUCT_DECISIONS.md` on GitHub
3. `components/studio-shell.tsx` on GitHub
4. `tests/creative-flow.spec.ts` on GitHub

Set the live app to a desktop-sized window. Keep the browser zoom at 100%.

The text below is written so you can read it almost word for word. Speak naturally and
do not worry if your wording changes slightly.

---

## 0:00–0:35 — Introduction and product understanding

### On screen

Show the live application homepage. Keep your camera visible.

### Say

> Hi, I’m Muhammad Huzaifa Awan, and this is Framefield, my submission for the 8x
> Product Engineer assignment.
>
> Higgsfield is an AI-native creative suite for producing images and videos with
> multiple models. After researching the public product, I found that the real user job
> is larger than simply running an AI model. A creator needs to find a direction, turn
> it into a prompt, configure the output, compare the result, and find that work again
> later.
>
> I focused my recreation on making that complete loop fast and easy to understand.

---

## 0:35–1:05 — Product decisions

### On screen

Switch briefly to `PRODUCT_DECISIONS.md`. Point to the P0 journey and deliberate
exclusions. Do not read the whole document.

### Say

> I deliberately did not try to reproduce every Higgsfield model, marketing page, or
> secondary AI tool. That would create a large collection of incomplete screens.
>
> Instead, I prioritized three destinations: Discover, Create, and Projects. Together,
> they form one working vertical slice from inspiration to saved output.
>
> I also excluded authentication, billing, and real AI generation because no approved
> production credentials were available. The application clearly labels every generated
> result as a sample, so mocked output is never presented as real AI functionality.

Switch back to the live application.

---

## 1:05–1:45 — Discover and reuse an idea

### On screen

1. Scroll slightly through the Discover page.
2. Show the “Steal the direction. Make it yours.” section.
3. Click the **Afterhours atelier** card.

### Say

> The first part of the experience is Discover. The reference product has a very large
> catalogue, so I simplified it into a curated feed of useful starting points.
>
> The important product decision is that these cards are not decorative. Every card is
> actionable. I’ll select Afterhours atelier.

After the Create screen opens, point to the populated prompt.

> The selected creative direction is transferred directly into the prompt editor. This
> removes blank-canvas anxiety and shortens the path between seeing something inspiring
> and making your own version.

---

## 1:45–2:35 — Configure the creation

### On screen

1. Point to the Image and Video tabs.
2. Switch to **Video**.
3. Change the model.
4. Change the aspect ratio to `9:16`.
5. Change the duration.
6. Click one prompt preset.
7. Open **Advanced direction** and move one slider.
8. Point to **Add reference**, but do not open the system file picker unless you want to.

### Say

> Image and video creation share the same focused composer, so the user does not need to
> learn two separate products.
>
> When I switch to Video, the relevant models and duration control appear. I can choose a
> model, set a vertical aspect ratio for social content, change the duration, add a prompt
> preset, and adjust advanced creative direction.
>
> A user can also attach a reference image. The estimated demo cost is visible beside the
> main action, so important information is available before generation rather than after
> the user commits.

Switch back to **Image** before continuing so the result appears quickly and predictably.

---

## 2:35–3:05 — Generate and inspect the result

### On screen

1. Make sure the prompt is not empty.
2. Click **Create image**.
3. Pause while the staged progress messages appear.
4. Point to the sample label when the result appears.
5. Click the heart icon.

### Say

> I’ll create an image now.
>
> Instead of an indefinite spinner, the interface explains what is happening through
> clear stages: reading the direction, composing the scene, and finishing details.
>
> This assignment does not connect to a real generation API, so the completed result is
> explicitly labeled “Sample output — not AI generated.” That keeps the demo useful
> without misrepresenting its functionality.
>
> I can favorite the result or open the source image from the result actions.

---

## 3:05–3:35 — Projects and history

### On screen

1. Click **Projects** in the top navigation.
2. Show the newly created project at the start of the grid.
3. Click **Favorites**.
4. Return to **All work**.

### Say

> Every completed sample is added to Projects immediately. This gives the user a simple
> creative memory instead of leaving outputs scattered across separate tools.
>
> The project card keeps the media, creation type, model, prompt, and favorite state
> together. I can filter the collection to the directions I marked as favorites and then
> return to all work.

---

## 3:35–4:00 — Responsive experience

### On screen

Narrow the browser window to approximately phone width. Show the bottom navigation, then
tap **Create** and scroll a little through the composer.

### Say

> The workflow is responsive rather than being a compressed desktop page. On mobile, the
> main destinations move into a touch-friendly bottom navigation, controls stack into a
> single column, and primary actions remain easy to reach.
>
> Interactive targets are at least 44 pixels, keyboard focus is visible, and reduced
> motion preferences are supported.

Return the browser to desktop width if it is quick to do so.

---

## 4:00–4:30 — Architecture and testing

### On screen

Switch to `components/studio-shell.tsx`, then to `tests/creative-flow.spec.ts`. Scroll only
enough to show the structure; do not explain individual lines.

### Say

> The application uses Next.js App Router, React, TypeScript, Tailwind, Motion, Lucide,
> and a reusable shadcn-style button primitive.
>
> The creative workflow is modeled with small, explicit state boundaries, so the sample
> generation function can later be replaced by an approved API without redesigning the
> interface.
>
> Playwright tests cover prompt remixing, generation, project history, mobile navigation,
> and horizontal overflow on desktop and mobile. The production build passes, and the
> public deployment was verified in a fresh unauthenticated browser.

---

## 4:30–4:55 — Tradeoffs and closing

### On screen

Return to the live application homepage.

### Say

> The main tradeoff was choosing depth over breadth. I shipped one coherent and polished
> creative journey instead of partially copying every Higgsfield feature.
>
> With more time, my next priorities would be an approved generation API, persistent
> projects, authentication, and real credit estimates.
>
> Thank you for reviewing Framefield and my 8x Product Engineer submission.

Stop the recording.

---

## If something goes wrong during recording

- If an image loads slowly, continue speaking; remote sample imagery may take a moment.
- If you accidentally clear the prompt, return to Discover and select a card again.
- If you create the wrong mode, switch back to Image and click Create image.
- If the result is already favorited, click once to remove it and once again to show the
  interaction.
- If resizing the browser is awkward, skip the live resize and show
  `research/screenshots/build-mobile.png` in the GitHub repository instead.
- Do not claim that a real AI model generated the displayed sample.

## Final upload check

After uploading the recording:

1. Open the video link in an incognito window.
2. Confirm it plays without requesting access.
3. Confirm your camera is visible and your voice is audible.
4. Confirm the screen text is readable.
5. Confirm the link begins with `https://`.
