# Checkpoint v11 — Slice 8: Glossary popovers in pattern names

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v6 refinement, slice 8

## What changed

Added a small `withGlossary(text, onOpenPrimer)` helper that scans a string for any known glossary term (longest-first to prefer "विधिलिङ्" over "लिङ्") and wraps the first occurrence with a `<Glossary>` trigger. Single-occurrence-only is intentional — avoids `?` clutter when the same term repeats and keeps the pattern row visually scannable.

Applied to the **Pattern** column of the matrix in [src/components/PatternsWon.jsx](src/components/PatternsWon.jsx). Pattern names like *"प्रथमा = nominative"*, *"लट् लकार identification"*, *"विधिलिङ् spotting"* now carry an inline `?` superscript that opens the glossary popover with a "open primer →" link.

## Why

The matrix made the patterns more navigable, but the names themselves are still terse Sanskrit jargon. After 3 months away, the user might forget what कृदन्त means but recognize the row exists. The glossary popover lets them reload the concept in one click without leaving the matrix.

## Files touched

- New: `src/utils/withGlossary.jsx` — single-occurrence wrap helper
- [src/components/PatternsWon.jsx](src/components/PatternsWon.jsx) — pattern-cell-name uses `withGlossary(pattern.name, onOpenPrimer)`

## Verified

- `npm run build` clean (51.80 KB CSS, 253 KB JS)
- `npm test -- --run` — 84/84 passing
- Manual: pattern names containing सम्बोधन / लट् / विधिलिङ् / etc. show the `?` superscript; clicking opens the popover with the matching glossary entry.

## Not done in this slice

- **Atlas page concept popovers** — the plan included applying `withGlossary` to Atlas h3 titles too. Skipped: most Atlas headings are English (e.g., "Personal pronouns — pure memorization") and don't contain glossary terms; the few Sanskrit-bearing ledes (e.g., the तद्-template intro) would need prose-parsing to wrap inline terms, which is heavier work for marginal value. Marking as a follow-up.
- **Recursive multi-term wrapping** in `withGlossary` — only first term wrapped today. If a pattern name contains two terms (e.g., "विधिलिङ् लकार"), only the first is wrapped. Single-occurrence-only keeps things scannable, but the helper could grow.
