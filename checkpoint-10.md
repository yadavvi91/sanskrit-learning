# Checkpoint v10 — Slice 7: Decoded-so-far rail redesign for scaling

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v6 refinement, slice 7

## What changed

User feedback: "the [verbs] that you have, you have only used the reference of things that we have. How would that work? … if we keep on doing that, how do you think the UI will look? So we have what? Around 700 verses. And I'm sure you don't mean to add 'decoded so far' as a scroll inside a scroll has 700 verses in it."

The old "Decoded so far" rail rendered every decoded verse as a card-list item. Fine at 4 verses; unworkable at 50+.

New rail layout, top to bottom:

1. **Compact count summary** — `4 decoded so far` in a Cinzel-typeset header. Scales: a 700-decoded number is still one line.
2. **Recent-5 chips** — the 5 most-recently decoded verses as small clickable verse-ref chips (e.g., `1.1`, `2.3`, `2.4`, `2.5`). Beyond 5 you scroll the chapter grid below; you don't scroll a chronological list.
3. **"Show only decoded" toggle** — when enabled, the chapter grid below collapses chapters with no decoded verses entirely and hides the locked cells in chapters that do. So with 4 decoded verses spread across chapters 1 + 2, you see two compact lines of saffron cells. With 700 decoded verses across all 18 chapters, you see exactly the 700 cells, no greyed clutter.
4. **Chapter grid below** — unchanged structure (already collapsible per chapter), but now respects the `showOnlyDecoded` prop.

## Why

The chronological list was a v1 affordance that taught the *story* of the learning ("this is the order you decoded them"). After 20+ verses that story is in the user's head, not on screen. What scales is: count + recent + filterable chapter grid.

## Files touched

- [src/components/VerseJourney.jsx](src/components/VerseJourney.jsx) — replaced the `<ol className="decode-order">` rail with summary + recent-chips + toggle. Threaded `showOnlyDecoded` into `ChapterRow` to hide locked cells and skip empty chapters.
- [src/styles.css](src/styles.css) — `.decoded-summary`, `.decoded-count`, `.recent-chips`, `.recent-chip`, `.decoded-only-toggle`. Existing `.decode-order-*` styles remain unused; left in place for now.

## Verified

- `npm run build` clean (51.80 KB CSS)
- `npm test -- --run` — 84/84 passing
- Manual: toggle "Show only decoded" — chapters 3-18 disappear; chapters 1 + 2 show only their decoded cells (1.1; 2.3, 2.4, 2.5). Click a recent-5 chip — verse switches in the right pane. Click the toggle off — full chapter grid returns.

## Not done in this slice

The unused `.decode-order-*` CSS could be deleted, but leaving them avoids touching unrelated styles in a refactor commit. Easy cleanup later.

A "show only decoded" filter as a URL query param (`?decoded=1`) would round-trip with the upcoming router (slice 9). Skipping for now — the toggle state is purely visual and not worth round-tripping.
