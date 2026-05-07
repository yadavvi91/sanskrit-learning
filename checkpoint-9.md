# Checkpoint v9 — Slice 6: Patterns Won redesigned as a sortable matrix

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v6 refinement, slice 6

## What changed

User feedback: "this Patterns Won, I think it does not seem to work here. … 'unlocked by 1.1.' Okay. But there are huge number of items. Huge number of verses. How many are going [you] to add over there?"

The four-category card grid was a v1 solution that doesn't scale beyond ~20 patterns. v6 replaces it with a single sortable matrix:

| Pattern | Category | First met | Seen in | Example |
|---|---|---|---|---|

- **Search** by pattern name or meaning text.
- **Category filter chips** above the table (All · Noun · Verb · Kṛdanta · Decode · …) with per-category counts.
- **Click any column header** to sort; second click reverses direction. Sort indicator (▲/▼) appears on the active column.
- **First met** column renders the verse ref as a clickable button that jumps to Verse Journey (preserves the v1-deferred Patterns→Verse navigation).
- **Seen in** column shows total verse count (1 today; ready for growth when verses start carrying back-references via the new optional `trigger.alsoIn[]` schema).
- Row hover highlights the row in saffron-tinted parchment.

## Why

The matrix scales to 50+ patterns and 100+ verses without restructuring; the user can sort/filter/search rather than scroll cards. The "First met" + "Seen in" pair captures information the old "unlocked by 1.1" lost: a pattern that's reinforced across many verses is *learned*, not just first-seen.

The old card-grid components (`pattern-category`, `pattern-card`, etc.) remain in the CSS but are no longer used by `PatternsWon.jsx`. Leaving them in place for now to avoid risking regressions in unrelated places; a follow-up could trim.

## Files touched

- New: [src/utils/patternStats.js](src/utils/patternStats.js) — flatten + per-pattern stats + comparators (verse-aware sort: "1.1" < "1.2" < "1.10" < "2.4")
- New: [src/utils/patternStats.test.js](src/utils/patternStats.test.js) — 13 tests covering flatten, stats derivation (firstMet null when no verse, alsoIn dedup), verse-numeric sort, sort stability
- Rewrote: [src/components/PatternsWon.jsx](src/components/PatternsWon.jsx) — sortable matrix table with search + category filter
- [src/styles.css](src/styles.css) — `.patterns-toolbar`, `.cat-chip`, `.patterns-matrix`, `.patterns-th`, `.verse-link`, `.pattern-cell-*`

## Verified

- `npm test -- --run` — **84/84 passing** (was 71; +13 new patternStats tests)
- `npm run build` clean (50.58 KB CSS, 252 KB JS)
- Manual: sort by First met → patterns with no triggering verse sink to the bottom; click a Gītā ref → jumps to Verse Journey; switch category filter to "Verb System" → only verb patterns remain.

## Schema extension (forward-compatible)

`patterns.js` patterns can now optionally carry `trigger.alsoIn: [verseRef, verseRef, …]`. Today no patterns set this; the `Seen in` column shows 1 for everything that has a `firstMet`. When the corpus grows and the data starts back-referencing patterns from verses, populating `alsoIn` makes the count grow without any UI change.

## Not done in this slice

- Glossary popovers on pattern names containing Sanskrit jargon (slice 8).
- Auto-derivation of `alsoIn` by scanning verses for pattern markers — that requires the verse data to carry pattern back-refs, which it doesn't yet. Schema is ready.
