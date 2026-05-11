# Checkpoint v22 — v8 Slice 5: vocab_recall cards in Practice (final v8 slice)

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v8, slice 5 (final v8 slice)

## What changed

Added a sixth card type — `vocab_recall` — to the SRS deck. The deck-seeder now walks the auto-grown vocabulary (slice 4) and creates one card per unique word with a gloss:

```
Prompt: What does "युयुत्सवः" mean?
Answer: desirous to fight, eager for war (root: √युध् (desiderative))
```

The card type label "Vocabulary" appears in the Practice session's card-type chip.

The card seeder now produces six types (was 5):
1. `form_id` — finite-verb grammar identification
2. `verse_anchor` — pick the finite verb out of a पदच्छेद
3. `pattern_recall` — what a pattern means
4. `dhatu_drill` — fill the 3sg present cell
5. `lakara_signal` — name the लकार from its signal
6. **`vocab_recall`** — what a word from the corpus means *(new)*

## Why

The user's reading practice produces vocabulary as a free byproduct. Without SRS scheduling, that vocabulary fades. Slice 4's Words tab makes it *visible*; slice 5 makes it *retainable*. Each unique word goes into the SM-2 schedule alongside the structural cards already drilled.

## Files touched

- [src/utils/srs.js](src/utils/srs.js) — imports `buildVocabulary`, adds card-type 5 in seedCards
- [src/components/Practice.jsx](src/components/Practice.jsx) — added 'Vocabulary' label to the cardTypeLabel map
- [src/utils/srs.test.js](src/utils/srs.test.js) — extended type-coverage test to expect vocab_recall + a dedicated vocab-shape test

## Verified

- `npm run build` clean (69.52 KB CSS, 342 KB JS)
- `npm test -- --run` — **164/164 passing** (was 163; +1 srs vocab-shape test, the type-coverage test extended to 6)
- Manual: `/practice` → start session → vocab_recall cards appear interleaved with the other types; the prompt + answer come straight from the wordParsings data.

## v8 retrospective

5 slices, 6 commits (slices 1–5 + plan-doc), 5 checkpoints (`-18` through `-22`).

The bones (v6) had meat (v7). v8 added muscles:
- **Sandhi engine** (slice 1) — 21 rules, 2-pass algorithm with whitelist+ending heuristics. All canonical Gītā joins handled.
- **Sandhi Lab** (slice 2) — surface to interrogate any joined string with full rule explanations.
- **Word-level parsings** (slice 3) — every पद clickable, full grammar in a popover. ~50 entries hand-curated across 4 verses.
- **Vocabulary tab** (slice 4) — auto-grown "Words I've Met" with sort, filter, search, click-through to verses.
- **vocab_recall cards** (slice 5) — vocabulary scheduled in the SM-2 deck.

Total tests added in v8: **31** (14 sandhi + 6 verse-parsings + 10 vocabulary + 1 srs-vocab).

The user can now decode a verse, immediately interrogate every word, see new vocabulary populate automatically, schedule it in Practice, and hit the Sandhi Lab when a junction stumps them — all without leaving the app. That's the workbench.
