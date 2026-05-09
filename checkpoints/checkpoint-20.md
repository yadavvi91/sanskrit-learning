# Checkpoint v20 — v8 Slice 3: word-level interactive parsings

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v8, slice 3

## What changed

Every पद chip in the verse-detail view is now click-to-expand. Click any word in the पदच्छेद → a popover opens showing the full grammatical analysis: root, category, gender, number, case (or लकार/पुरुष/वचन for verbs), gloss, plus an optional structural note.

Implementation:
- Each verse data record gets a new `wordParsings: { [pada]: WordParsing }` field
- All 4 decoded verses fully populated — every word in every padaccheda has a parsing
- New `<WordPopover>` component handles click-toggle, click-outside-close, Escape-close
- Parsed chips show a subtle saffron dot in the corner ("this word is interrogable")
- Finite verbs still get the saffron-fill highlight; the dot recolors to parchment for contrast

## Why

The structured fields (vibhaktiNotes, finiteVerbs) are great summaries but force the user to scroll between पदच्छेद and the analysis. Per-word popovers put the analysis exactly where the eye is — on the chip the user is reading. This is the surface that finally answers "what is this word doing here?" without leaving the verse.

## Word-parsing shape

```js
{
  category: 'noun' | 'adjective' | 'pronoun' | 'verb' | 'krdanta' | 'particle',
  root?: string,           // 'धर्मक्षेत्र', '√कृ', 'युष्मद्'
  gender?: 'm' | 'f' | 'n' | '-',
  number?: 'eka' | 'dvi' | 'bahu' | '-',
  case?: 'pra' | 'dvi' | 'tri' | 'cha' | 'pan' | 'sha' | 'sap' | 'sam',
  gana?: 1..10,            // verbs only
  pada?: 'P' | 'A' | 'U',  // verbs only
  lakara?: 'lat' | 'lan' | 'lrt' | 'lot' | 'vidhilin',
  purusha?: 'prathama' | 'madhyama' | 'uttama',
  kind?: string,           // free-form for kṛdanta types, etc.
  gloss: string,
  note?: string,           // structural note
}
```

## Files touched

- [src/data/verses.js](src/data/verses.js) — added wordParsings to all 4 verses (~50 entries total)
- New: [src/components/WordPopover.jsx](src/components/WordPopover.jsx) — click-toggle popover with rich grammar display
- [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — wraps each पद chip
- [src/styles.css](src/styles.css) — `.word-popover-wrap`, `.word-popover`, `.wp-fields`, etc.
- New: [src/data/verses.parsings.test.js](src/data/verses.parsings.test.js) — 6 shape-validation tests (every padaccheda word covered, every entry has gloss + category, verbs have all required fields, nouns/adjectives have gender + number + case)

## Verified

- `npm run build` clean (67.75 KB CSS, 337 KB JS)
- `npm test -- --run` — **153/153 passing** (was 147; +6 parsings shape tests)
- The shape tests caught a real issue during development: padaccheda used hyphen-separated forms (`महा-अनुभावान्`) but my keys used the joined form (`महानुभावान्`). Fixed.

## Known limitations

- Hand-curated; no auto-derivation. Adding a 5th decoded verse means adding ~10-15 wordParsing entries.
- Click-only (no hover) — chosen for mobile-friendliness; desktop hover would be a follow-up.
