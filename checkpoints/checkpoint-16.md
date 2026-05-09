# Checkpoint v16 — v7 Slice 4: Search across decoded corpus

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v7, slice 4

## What changed

Search input in the Verse Journey rail (under the jump-to input). Type a query → result list shows verses with matching hits + a snippet from the highest-priority hit + a `+N` indicator for additional hits in the same verse.

`searchVerses(query)` in [src/utils/verseSearch.js](src/utils/verseSearch.js) scans every searchable field across the corpus:
- मूल lines, पदच्छेद words, सन्धि / विभक्ति / विवेक: notes, अन्वय, हिंदी, English
- समास compound bank entries (compound + विग्रह + type + gloss)
- क्रिया (finite verb form, root, lakāra, puruṣa, vacana, gloss)
- References — translator + year + text + sage + school + commentary summary
- Per-verse notes from localStorage (slice 3)

Results ranked by hit count desc, then chapter.verse asc. Each result is a clickable button that switches the verse pane to that verse.

## Why

With 4 decoded verses, you remember where everything is. With 50, you don't. The Patterns matrix and Compound Bank already cover *structural* search; this covers *content* search ("the verse where I noted X about Bhīṣma being पूजार्ह" — search "पूजार्ह" or "Bhīṣma" and find it). Includes the user's own notes as a search source so the personal annotations are findable too.

## Files touched

- New: [src/utils/verseSearch.js](src/utils/verseSearch.js) — cross-field search with snippets
- New: [src/utils/verseSearch.test.js](src/utils/verseSearch.test.js) — 11 tests
- [src/components/VerseJourney.jsx](src/components/VerseJourney.jsx) — search input + `<SearchResults>` sub-component
- [src/styles.css](src/styles.css) — `.rail-search`, `.rail-search-results`, `.rail-search-item`, etc.

## Verified

- `npm run build` clean (62.45 KB CSS, 317 KB JS)
- `npm test -- --run` — **123/123 passing** (was 112; +11 search tests)
- Search exercises tested:
  - Devanāgarī text in mool (`धर्म`)
  - Translation text (`Madhusudana`, `Sanjaya`)
  - Samāsa-bank type (`बहुव्रीहि`)
  - Lakāra label (`लङ्`)
  - Root form (`√कृ`)
  - Commentary school (`अद्वैत`)
  - Per-verse notes from localStorage
  - Case-insensitive (`ARJUNA` matches lowercase)
  - Empty / whitespace queries return `[]`
  - Ranking is stable (descending hit count)

## Snippets

Snippets are 30-char-radius windows around the match, with `…` ellipsis when truncated. For matches in the multi-line `mool` array, the snippet comes from the matching line. For samāsa hits, the snippet is the structured form `compound = vigraha (type) — gloss`.

## Not done

- Search across the full 700-verse corpus once it loads (v8 — same code; just more data)
- Highlighting the matched substring in the snippet (the full snippet shows context but doesn't bold the term)
- Keyboard shortcuts (`/` to focus search would be a nice next step)
