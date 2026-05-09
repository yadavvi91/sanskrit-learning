# Checkpoint v21 — v8 Slice 4: Vocabulary tab — "Words I've Met"

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v8, slice 4

## What changed

A new top-level **Words** tab (route `/words`). Auto-grown from `verses.js → padaccheda[]` + `wordParsings`. Every unique word the user has met across the decoded corpus is tracked with:

- the word itself
- category (noun / verb / adjective / pronoun / particle / kṛdanta)
- root + gloss
- first met (link to that verse)
- count + the full list of verse-refs where it appears (each clickable)

Sortable by Word / Category / First met / Count. Searchable by word, root, or gloss. Category filter chips with per-category counts.

## Why

After 4 verses, the user has met ~40 unique words. After 50 verses, ~500. There's no surface today that says "show me every word I've encountered, where I met it, how often." This is the core artefact of a reading practice — the personal vocabulary built one verse at a time. Auto-grown means it scales: adding a 5th decoded verse adds its new words automatically, no manual Anki-deck-tending.

## Files touched

- New: [src/utils/vocabulary.js](src/utils/vocabulary.js) — `buildVocabulary()` + comparators + category counts
- New: [src/utils/vocabulary.test.js](src/utils/vocabulary.test.js) — 10 tests covering build, sort, category counts, parsing-pickup
- New: [src/components/Vocabulary.jsx](src/components/Vocabulary.jsx) — sortable matrix + search + category filter
- [src/App.jsx](src/App.jsx) — added Words tab + `/words` route
- [src/styles.css](src/styles.css) — `.vocabulary`, `.vocab-matrix`, `.vocab-word`, etc.

## Verified

- `npm run build` clean (69.52 KB CSS, 341 KB JS)
- `npm test -- --run` — **163/163 passing** (was 153; +10 vocabulary tests)
- Manual: `/words` shows the auto-grown vocabulary; `च` shows count > 1 with chapter.verse refs `1.1, 2.4, 2.5`; clicking any ref jumps to that verse.

## Sort + filter mechanics

- Default sort: by First met asc → reading order
- Click any column header to sort by that column; click again to reverse
- Category filter narrows the matrix to one part-of-speech
- Search hits word + root + gloss (case-insensitive substring)

## Coupling with other features

- Slice 5 (next): vocabulary entries seed `vocab_recall` SRS cards in Practice
- Future: when corpus expands, this tab also serves as the index for "have I seen this word before?"
