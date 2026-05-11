# Checkpoint 52 — v19 DCS migration shipped

**Date:** 2026-05-12

## Trigger

After the v17 sweep (BG 5.10 → 8.8 hand-fixes) and v18 polish, User called out the architectural sloppiness of the home-rolled splitter: hand-annotated Sanskrit segmentation datasets have existed for decades. The right move was not "patch one more verse" — it was "retire the engine, look up the data."

User went to sleep, asked for v19 done by morning, autonomous mode.

## What shipped

1. **`scripts/import-dcs-gita.mjs`** — full DCS Gītā ingestion pipeline:
   - CoNLL-U parser (header lines + token table; range markers skipped; speaker labels filtered by `vac`/`brū` lemma).
   - IAST→Devanāgarī transliterator with full vowel/consonant/diphthong + virama handling.
   - Pāṇinian parasvarna normaliser: anusvāra ं + stop consonant → varga-nasal + virama (so `saṃplutodake` → `सम्प्लुत-उदके`, not `संप्लुतोदके`).
   - Word-final स् → ः normaliser (so `kutas`/`sarvaśas`/`tatas` → `कुतः`/`सर्वशः`/`ततः` — the canonical citation form).
   - Content-match verse aligner: handles the BhaGī 2 unlabelled-counter range (verses 1–4 plus several scattered later) and the BG 13 recension shift (DCS omits the interpolated BG 13.1 "prakṛtim puruṣam" — the other 34 verses shift by +1 to align with verses.js's recension).
   - Per-token `Unsandhied=` extraction for canonical surface forms (preferred over the in-context `FORM` column).
   - Maps DCS FEATS → legacy app schema (`case`, `number`, `gender`, `lakara`, `purusha`, `category`) so DCS data slots into `WordPopover` and the empty-popover audit without UI changes.
   - Compound-member coalescing: tokens marked `Case=Cpd` are joined with hyphens to the final member that carries the case ending.

2. **`src/data/dcs-padaccheda.json`** — 700 verses, ~9 800 padas, 3.4 MB raw / ~500 KB gzipped. Keyed by `"chapter.verse"`, each entry has `{ padaccheda, wordParsings, finiteVerbs, sandhied }`.

3. **`src/data/hydrate.js`** — DCS lookup inserted between `VERSE_OVERRIDES` and the engine fallback. For auto-stub verses with DCS data, `v.padaccheda` and `v.finiteVerbs` and `v.wordParsings` come from DCS. The four full-tier hand decodes (BG 1.1, 2.3, 2.4, 2.5) and other hand-curated verses are untouched (they're not in the auto-stub loop).

4. **`README.md`** — data-sources section now credits DCS (CC BY-SA 4.0), Annie Besant (PD), Edwin Arnold (PD), Rohan Pandey's frequency thread. The derivative `dcs-padaccheda.json` inherits CC BY-SA per upstream license.

## Verification

- 582/582 tests pass.
- Build clean (3.95 MB JS, 1.07 MB gzipped).
- Spot-checked all user-flagged BG 5.10 → 8.8 verses: DCS produces correct decompositions natively (काय-शिरः-ग्रीवम्, सम्प्लुत-उदके, ब्रह्मणि + आधाय, इच्छा-द्वेष-समुत्थेन, etc.) without needing any SPLITTER_OVERRIDES.

## What's left (deferred)

- **Retire SPLITTER_OVERRIDES** — they're now mostly dead code for Gītā verses. Keep for one release as a safety net, then remove in a follow-up.
- **Anvaya** — DCS gives padaccheda + morphology, not anvaya ordering. The home-rolled anvaya stays (and remains a known gap).
- **`_vocab_extended_part*` files** — keep for definitional display but the engine no longer relies on them for padaccheda. Long-term these can be slimmed down.

## Files

- `scripts/import-dcs-gita.mjs` (new)
- `src/data/dcs-padaccheda.json` (new, generated)
- `src/data/hydrate.js` (DCS lookup wired in)
- `README.md` (data-sources section)
- `plans/v19-dcs-integration.md` (marked Shipped)

## Tag

`v0.10.0-dcs-integration`
