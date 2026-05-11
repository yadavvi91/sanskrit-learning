# Checkpoint v23 — v9: Decode Helper (paste mool, get a stub)

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v9 (single coherent slice — engine + UI + integration)

## What changed

A new top-level **Decode** tab (route `/decode`). Paste a verse's mool → engine produces a paste-ready JS data block for `verses.js`. Combines all three v8 engines:

1. **Sandhi-undo** — every space-separated chunk runs through `undoSandhi` → candidate `padaccheda` + `sandhiNotes`.
2. **Vocabulary lookup** — every pada matched against the corpus's `wordParsings` index → fills `wordParsings[word]` for known words; flags unknowns.
3. **Finite-verb signal detection** — pattern-matches each pada against ~12 lakāra-signal regexes (-ति, -मि, -त्, -ष्यति, -तु, -एत्, etc.) → tentative `finiteVerbs` candidates with `confidence: 'low'` and a signal hint.

UI:
- Two number inputs (chapter, verse) + a textarea for mool
- Live preview: padaccheda chips (color-coded by confidence — green for known, gray for unknown), sandhi notes, finite-verb candidates with signal explanations
- "Copy" button that places a paste-ready JS object literal on the clipboard, complete with `// TODO` markers for fields the user must fill

## Why

The blank-page problem. Every new verse currently means hand-undoing sandhi, hand-listing padaccheda, hand-tagging every word, hand-spotting the finite verb. The engines from v8 all do these things automatically — they just hadn't been composed. v9 composes them into a workflow that converts decoding from "build from scratch" to "audit a generated stub."

## Files touched

- New: [src/utils/decodeHelper.js](src/utils/decodeHelper.js) — `autoDecode(mool)` + `stubToJs(stub, opts)`
- New: [src/utils/decodeHelper.test.js](src/utils/decodeHelper.test.js) — 15 tests covering input handling, sandhi-undo composition, vocabulary lookup, finite-verb signal detection, JS-output shape
- New: [src/components/DecodeHelper.jsx](src/components/DecodeHelper.jsx) — paste-and-preview UI with copy-to-clipboard
- [src/App.jsx](src/App.jsx) — added Decode tab + `/decode` route
- [src/styles.css](src/styles.css) — `.decode-helper`, `.decode-padas`, `.decode-js`, etc.

## Verified

- `npm run build` clean (73.52 KB CSS, 349 KB JS)
- `npm test -- --run` — **179/179 passing** (was 164; +15 decode helper tests)
- Manual end-to-end: pasted *"मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय"* → engine split पाण्डवाश्चैव → 4 known words matched (मामकाः, पाण्डवाः, च, एव, सञ्जय) → flagged अकुर्वत as a likely लङ् → "Copy" produced a syntactically valid JS object literal.

## Lakāra signals supported

| Signal | Lakāra | Hint |
|---|---|---|
| -ष्यति / -ष्यन्ति / -स्यति | लृट् | future stem |
| -ष्ये / -स्ये | लृट् (Ā) | future stem ātmanepada |
| -ेत् / -ेयुः | विधिलिङ् | optative -ेत् |
| -ीय / -ीरन् / -ीमहि | विधिलिङ् (Ā) | optative ātmanepada |
| -तु / -न्तु | लोट् | imperative -तु |
| -न्ति | लट् prathama bahu | present plural |
| -ति | लट् prathama eka | present singular |
| -ते | लट् prathama eka (Ā) | present ātmanepada |
| -मि | लट् uttama eka | present 1st sg |
| अ-...-त् | लङ् | past with अ- augment |

## v9 retrospective

This was a single-slice version (engine + UI + integration). The plan-doc was 4 slices but the engine + UI + tab integration are tightly coupled — splitting them would have just been ceremony.

**Total: 1 plan-doc commit + 1 implementation commit + 1 checkpoint commit.**

Test counts since v6: 71 → 94 → 133 → 164 → **179** (+15 in v9).
