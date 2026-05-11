# Checkpoint v5 — Slice 2: Periodic Table cell redesign + filtering

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v6 refinement, slice 2

## What changed

[src/components/DhatuPeriodicTable.jsx](src/components/DhatuPeriodicTable.jsx) and the corresponding CSS in [src/styles.css](src/styles.css):

**Cell redesign.** Each dhātu cell used to render three numbers (frequency rank in the corner, gana number tag in the other corner, and the devanāgarī root in the middle). User said it "did not look good" — three numbers competing with the root for attention. Now:
- Cell shows large devanāgarī root + small italic IAST under it.
- Frequency rank lives only in the title-attribute tooltip.
- Gana number tag is gone; गण is communicated by the existing background tint (the legend at the bottom maps tints → gana numbers).
- "✦" Gītā marker stays in the corner but moved to `::after` so it sits visually correctly.

**Filtering.** Added a search input + tier filter chips above the grid:
- Search filters by devanāgarī, IAST, or English meaning (case-insensitive substring).
- Tier chips: All · Top 10 · Top 25 · Top 50 · Top 100 · Top 192 · In Gītā.
- A small "N / total" count shows how the current filter has narrowed the result.
- Empty-state message when no dhātus match.

## Why

User flagged the cell layout as ugly and asked how the UI would scale to 192 dhātus. The cell redesign reduces visual noise; the filtering makes a 192-cell grid usable (top-N is the natural pedagogical narrowing).

## Files touched

- [src/components/DhatuPeriodicTable.jsx](src/components/DhatuPeriodicTable.jsx) — added search + tier-chip state + filter logic, removed rank + gana-tag from cell render
- [src/styles.css](src/styles.css) — new `.dhatu-search`, `.dhatu-tier-row`, `.tier-chip`, `.dhatu-result-count`, `.dhatu-empty`; rewrote `.dhatu-cell` from a 2×2 grid to a centered flex column

## Verified

- `npm run build` clean (46.21 KB CSS, 248 KB JS)
- `npm test -- --run` — 71/71 passing
- Cell layout exercised manually in dev: `npm run dev`, click each tier, type into search, confirm result count updates

## Not done in this slice

The dhātu data is still 25 entries. When the dataset grows past ~50, the 5-column grid may want to become 6-column; that's a follow-up. Existing scrolling behavior is fine for the current sizes.
