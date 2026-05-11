# Checkpoint 49 — v16 recursive splitter + lexicon validation shipped

**Date:** 2026-05-12

## Trigger

After v14/v15 shipped, the user surfaced hundreds of splitter mis-cuts across BG 5–8. The home-rolled `sandhi.js` + `decodeHelper.js` were producing fragments whenever the engine encountered chunks with mid-compound sandhi clusters (visarga-र्, savarṇa-dīrgha, jaśtva). Each user-flagged mis-cut was getting patched as a per-chunk SPLITTER_OVERRIDE — the workflow wasn't scaling.

## What shipped

1. **partHasRealVocab + isPlausibleSplit lexicon validation** (`06ae0e4`, `11321f0`).
   New helper checks `lookupSharedVocab` for non-suffix-inferred entries. `isPlausibleSplit` now requires at least one part of any multi-part split to be a real word. Propagated into `splitNasalCompound`'s ELIDED_A/ELIDED_MATRA branches.

2. **Recursive lexicon-validated splitter** (`b44d45c`, `f56393a`).
   `recursiveSplit(chunk)` tries every undoSandhi candidate, recursively splitting each part. Accepts only splits where every part resolves (directly via lexicon or via further recursion). For long chunks (≥12 chars), tries splits FIRST and prefers the deepest valid split.

3. **नञ्-bahuvrīhi heuristic** (`1a7c24a`).
   When a candidate split is `न + अ-X` and the chunk is ≥6 chars, skip the split. Catches नान्यगामिन्, नात्यश्नतः-style compounds.

4. **Canonical visarga -ो → -ः normaliser** (`c300bc2`).
   Post-pass in `extractPadas`. Chunks ending in `-ो` get normalised to `-ः` unless on a small whitelist of legit `-ो` words.

## Files

- `src/utils/decodeHelper.js` — major refactor: `partHasRealVocab`, `recursiveSplit`, lexicon-validated splits, generic visarga normaliser
- `src/utils/sandhi.js` — 6 new rule entries (अयादि, ष्टुत्व, चर्त्व, परसवर्ण, छत्व, णत्व, visarga-र्) + inventory comment updated

## Tests

582/582 passing.

## What's left in v16

The recursive splitter helps but doesn't eliminate per-chunk overrides — the home-rolled approach has a structural ceiling (no real lexicon backing the validation). v19 (DCS migration) is the next move.
