# Checkpoint v7 — Slice 4: स्म-cell visual cleanup

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v6 refinement, slice 4

## What changed

User feedback: in the Atlas → Pronouns → तद्-template tables, the स्म-cells used `outline: 1px solid var(--gold)` to flag them as deviations from the राम pattern. The outline pulled the cell visually *out* of the table grid (outlines render above borders, breaking the row's gridlines). User said the border "does not look good. It should not be that big."

Fix: replace the outline with a small gold dot in the cell's top-right corner, plus the existing amber `#faedca` background tint. The cell now sits inside the grid with no border distortion; the dot is enough of a visual signal to communicate "this cell deviates from the राम pattern."

The inline `.sma-flag` chip in the lede paragraph (used to call out स्म-cells when explaining the deviation) gets a thinner bottom-border instead of full border, matching the new aesthetic.

## Why

The four स्म-cells (तस्मै, तस्मात्, तस्मिन्, ते) need to be distinguishable at a glance, but not so loud that they break the row layout. A small dot is enough — once you know which cells deviate, you don't need the cell shouting at you.

## Files touched

- [src/styles.css](src/styles.css) — `td.cell.is-sma` outline → dot via `::after`; `.sma-flag` border → bottom-only

## Verified

- `npm run build` clean (47.21 KB CSS)
- `npm test -- --run` — 71/71 passing
- Manual: tad-template tables in Atlas now show clean rows with subtle gold dots on the four स्म-cells.

## Not done in this slice

The samas-row left-border (gold, 3px) was *not* changed — it's consistent with the project's pattern (sage for vibhakti, gold for samas, saffron for finite verbs) and the user only flagged the स्म-cell case. If the samas left-border ever feels heavy in context, fix later.
