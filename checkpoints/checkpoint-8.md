# Checkpoint v8 — Slice 5: Primer ↔ Atlas real cross-links + column rule

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v6 refinement, slice 5

## What changed

User feedback: "you've given an example of a sandhi. But for [more], you ask to read the Atlas compounds thing. But there's no link between the two."

Four primer sections (compounds, pronouns, kāraka, indeclinables) used to *mention* "see the Atlas → X" in plain prose. Now they each carry a `linkToAtlas: 'samasa' | 'pronouns' | 'karaka' | 'avyaya'` field and render a clickable button at the end of the section that calls `onOpenAtlas(sectionId)`. Clicking switches the view to Atlas and opens the right sub-section.

Plumbing:
- `App.jsx` adds `openAtlas(sectionId)` callback + `atlasJumpTo` state, mirroring the existing `openPrimer` / `openVerse` pattern. (Slice 9 will replace this state-based plumb with router navigation.)
- `Atlas.jsx` accepts a `jumpToSection` prop and switches sub-tab via `useEffect` when it changes.
- `primer.js` extends section schema with optional `linkToAtlas` + `linkLabel`.

Plus a small visual fix flagged in the same feedback: the Primer's TOC + content columns "had no connection." Added a subtle vertical rule (gradient from transparent → rule color → transparent) between the columns so they read as one document with a navigation gutter, not as two unrelated panels.

## Why

The primer's whole purpose is to be a re-entry safety net that *connects* to the rest of the app, not a dead reference. Real cross-links make "see the Atlas" mean what it says. The vertical rule makes the layout read as one piece.

## Files touched

- [src/data/primer.js](src/data/primer.js) — `linkToAtlas` + `linkLabel` on 4 sections; trimmed the now-redundant "open the Atlas" prose
- [src/components/Primer.jsx](src/components/Primer.jsx) — render button when `linkToAtlas` present, accept `onOpenAtlas` prop
- [src/components/Atlas.jsx](src/components/Atlas.jsx) — accept `jumpToSection` prop, sync to local tab state via `useEffect`
- [src/App.jsx](src/App.jsx) — `openAtlas(sectionId)` callback + `atlasJumpTo` state
- [src/styles.css](src/styles.css) — `.primer-atlas-link` button, `.primer-layout::before` vertical rule

## Verified

- `npm run build` clean (47.92 KB CSS)
- `npm test -- --run` — 71/71 passing
- Manual: open Primer → "Compounds" section → click "Open Atlas → Compounds ↗" → Atlas mounts on the Samāsa sub-tab. Same flow works for Pronouns, कारक, अव्यय.

## Not done in this slice

The Atlas-to-Primer reverse link (e.g., from a Compound Bank row, "open the relevant Primer section") is not added — the existing Glossary popovers in VerseDetail already cover the equivalent jump. The Primer→Atlas direction was the gap.

State-based plumbing here will be replaced by router `<Link>` / `useNavigate` calls in slice 9. The component prop names (`onOpenAtlas`, `jumpToSection`) will be dropped at that point.
