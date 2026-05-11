# Plan v19 — Migrate to DCS (Digital Corpus of Sanskrit) hand-annotated padaccheda

**Status:** In progress (this session, overnight).

## Context (the why)

The home-rolled splitter in `sandhi.js` + `decodeHelper.js` has been the source of the bulk of user-flagged QA issues across v16 and v17. Every per-verse SPLITTER_OVERRIDE represents the splitter failing where a hand-annotated dataset already has the correct answer. The user — rightfully — called this out as architectural sloppiness: external Sanskrit segmentation tools (DCS, vidyut, Sanskrit Heritage Reader, dharmamitra) have been around for decades.

The accurate framing: **we should not be computing padaccheda for the Gītā.** Scholars have already done it. We should look it up.

## Source of truth

- **DCS (Digital Corpus of Sanskrit)** by Oliver Hellwig (Heidelberg)
- Repo: https://github.com/OliverHellwig/sanskrit
- Specifically: `dcs-data/data/conllu/files/Mahābhārata/Bhagavadgītā/` (CoNLL-U format)
- License: CC BY-SA 4.0
- Coverage: every Gītā verse, segmented + lemmatised + morphologically tagged by humans

Each verse in DCS is a CoNLL-U sentence with columns:
1. ID (per-word index)
2. FORM (surface)
3. LEMMA (root / stem)
4. UPOSTAG (universal POS)
5. XPOSTAG (Sanskrit-specific morphology — case/number/gender/lakāra/etc.)
6. FEATS (additional features)
7. HEAD, DEPREL, DEPS, MISC

We need columns 2 (FORM = the padaccheda surface form) and 3 (LEMMA = the root field for our popovers), plus 5 (XPOSTAG → maps to our category/case/number/gender/etc).

## Decisions (proposed, autonomous in auto-mode)

| Decision | Choice | Rationale |
|---|---|---|
| Distribution | Pre-process DCS into a JSON file shipped with the app | Static deploy on Pages; no runtime fetch; offline-capable |
| Format | `src/data/dcs-padaccheda.json` keyed by `"chapter.verse"` | Direct lookup in `hydrate.js` |
| Coverage scope | All 700 verses of the Gītā | DCS covers them all |
| Fallback strategy | Home-rolled splitter retained as fallback for chunks DCS doesn't have (effectively none for the Gītā) | Defensive |
| Authority order | DCS data > hand `_ch1_overrides.js` > engine output | DCS is the new ground truth |
| When to retire | SPLITTER_OVERRIDES + most of vocab_extended become unnecessary after migration | But keep for now; remove in a follow-up after verifying no regression |

## Implementation slices

### Slice 1 — Acquire DCS Gītā data

Fetch the CoNLL-U files for the Gītā from the DCS GitHub repo. Either:
- Download the entire repo locally (large; ~GBs)
- Cherry-pick just the Gītā subdirectory via sparse-checkout or curl-per-file

Cherry-pick is the right call (smaller, faster). 18 chapters × ~40 verses = ~720 files. Each one is small (a few KB).

### Slice 2 — Parse and normalise

Build a Node script (`scripts/import-dcs-gita.mjs`) that:
1. Reads each CoNLL-U file
2. Extracts per-verse padaccheda (FORM column) + lemma (LEMMA) + morphology (XPOSTAG)
3. Maps DCS morphology codes (e.g., `n.s.m.`, `cas.acc`) to our internal schema (`number: 'eka'`, `case: 'dvi'`, etc.)
4. Writes `src/data/dcs-padaccheda.json` as `{ "1.1": { padaccheda: [...], wordParsings: {...} }, ... }`

### Slice 3 — Wire into hydrate.js

In `hydrate.js` `hydrateAutoStubVerses()`, before the existing autoDecode call:
1. Look up `dcs-padaccheda.json[chapter.verse]`
2. If present, use it verbatim for `verse.padaccheda` + `verse.wordParsings`
3. Mark `verse.padacchedaSource = 'dcs'` so the UI / audit can show this
4. Falls back to autoDecode only if DCS doesn't have the verse

### Slice 4 — Verify on user-flagged regression cases

Walk every chunk listed in v17's table and confirm DCS produces the correct decomposition. Adjust the schema-mapping in slice 2 if needed.

### Slice 5 — Retire (or downgrade) SPLITTER_OVERRIDES + bulk vocab

After DCS coverage is verified:
- `SPLITTER_OVERRIDES` becomes a fallback for non-Gītā Sanskrit (kept for completeness but probably dead code for this app)
- `_vocab_extended_part*.js` files keep the lemma/gloss data but the engine no longer relies on them for padaccheda — they're consulted only for definitional display
- `_known_samasas.js` keeps its semantic vigraha annotations (DCS gives padaccheda + morphology, not vigraha) — this is genuine added value
- `KNOWN_SAMASAS` becomes the *only* hand-curated dataset we keep growing; everything else retires

### Slice 6 — Documentation + handoff

- `README.md` deployment section updated to credit DCS (CC BY-SA attribution)
- `CLAUDE.md` updated with the new data-flow diagram
- This plan marked Shipped
- Tag v0.10.0 — "dcs-integration"

## Verification

- All 582 existing tests pass.
- Spot-check the user-flagged BG 5.10 → 8.8 chunks: DCS-produced padaccheda should match (or be cleaner than) the hand-overrides.
- Empty-popover audit count drops to ~0 (lemmas come from DCS).
- Template-gloss audit count drops substantially.

## Risk + rollback

- Tagged at `pre-dcs-migration`. If DCS integration introduces regressions worse than expected, revert to that tag.
- DCS morphology coding has known gaps (some passive forms, some compound boundaries marked differently than expected). Note them in the import script and let them surface in audits rather than silently masked.

## Out of scope

- Non-Gītā Sanskrit. The DCS data is rich but we only need the Gītā subset.
- vidyut WASM integration. DCS data is sufficient; vidyut would be the right call if we needed runtime computation (we don't).
- Anvaya generation. DCS gives padaccheda + morphology, not anvaya ordering — that stays computed (and remains a known gap).

## Relation to other plans

- v16 + v17 + v18 represent the home-rolled engine reaching its practical ceiling
- v19 (this plan) is the architectural correction
- All future plans should default to "look up existing scholarly datasets" before building from scratch
