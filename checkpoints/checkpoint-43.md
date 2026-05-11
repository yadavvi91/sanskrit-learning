# Checkpoint 43 — Zero empty-popovers across the corpus

**Date:** 2026-05-11

## Trigger

User, after seeing the "no grammar data yet / candidate for the Decode Helper queue" message one too many times:

> *"can't you just do a search for all the 'This word isn't in the shared dictionary, and the verse hasn't been hand-decoded. It's a candidate for the Decode Helper queue' and fix them? how many time will I have to manually go and ask you to fix them"*

The complaint is that every dead-end popover is a UX bug the user has to surface one-by-one. The fix needs to be systemic, not reactive.

## What changed

A four-layer sweep across the popover fallback chain. Result: **zero of the 8407 padaccheda word-slots in the corpus now land on `<EmptyPopover/>` via the no-data dead-end branch.**

### 1. Audit test as the source of truth (`src/__tests__/empty-popover-audit.test.js`)

New regression test that walks every verse's `padaccheda`, simulates `WordPopover`'s exact fallback chain (`verse.wordParsings` → `lookupSharedVocab` → `decomposeCompound`), and fails CI if any word would land on the empty branch. Future verses that add an uncovered surface form will fail this test until coverage is added — no more silent re-introduction of the dead-end.

Initial audit run: **126 unique misses across 146 occurrences** (1.7% of all word-slots).

### 2. Suffix-inference extensions (`src/data/sharedVocab.js`)

Added ~11 new patterns to `inferFromSuffix`. Each pattern catches a *class* of words rather than individual entries:

- **`-वत्`** → adverbial particle "like X" (आदित्यवत्, अग्निवत्)
- **`-धा`** → particle of multiplicity (अनेकधा, बहुधा, शतधा)
- **`-दृक् / -दृशम्`** → pronominal adjective (यादृक्, तादृक्, ईदृक्)
- **`-त्व / -त्वम्`** → abstract noun (-ness; सूक्ष्मत्व, धर्मत्व)
- **`-चित्`** → indefinite pronoun (कस्यचित्, केनचित्, कस्मिंश्चित्)
- **`-अन`** → a-stem nom-sg n. / vocative
- **`-या`** → ā-stem feminine instrumental ("by X" / "with X")
- **`-ोः`** → genitive/locative dual ("of two X" / "in two X")
- **`-ुः`** → u-stem masculine nom-sg
- **`-आनि / -ानि`** → -अन्/-न् stem neuter nom/acc plural (नामानि, कर्माणि, भूतानि, आनानि — the matra variant matters)
- **`-र्`** → visarga-sandhi residue of -ः (पुनर्, अन्तर्)
- **`-क्`** → consonant-stem nominative (दिक्, यादृक्)

These knocked the count from **126 → 105** unique misses.

### 3. Per-word coverage (`src/data/_vocab_extended_part9.js`)

For the residual long tail — ~100 words that no suffix class catches — a manual file with two distinct categories:

**(a) Real words the bulk parts 1–8 missed.** ~50 entries with honest grammar:
- `यद्`, `पुनर्`, `यादृक्`, `कस्यचित्`, `केशिनिषूदन`, `अनेकधा`, `अरूपेण`, `अकारेण`, `अघायुः`, `अनहङ्कार`, `अनन्तरूप`, `अनन्यभाक्`, `अनुप्रपन्ना`, `अन्विच्छ`, `अभिमुखा`, `अभोगेषु`, `अवाप्स्यथ`, `अवेक्षे`, `अशेषेण`, `आदित्यवत्`, `आपन्ना`, `आवयोः`, `आश्रयेत्`, `आहवे`, `इष्ट्वा`, `क्षामये`, `जनसंसदि`, `जीवितेन`, `द्यावापृथिव्योः`, `ध्रुवा`, `पीडया`, `रणसमुद्यमे`, `लुब्धो`, `विजयो`, `संन्यासेन`, `स्थाणुः`, `दक्ष`, `हनिष्ये`, `लब्धा`, `अधुक्`, …

**(b) Splitter mis-cuts — splitter-residue glosses.** ~50 entries marked with the probable reconstruction the autoDecode engine *should* have produced:
- `अहर्यद्ब्रह्मणो` → "अहः + यद् + ब्रह्मणः — splitter target"
- `इत्येतत्तपो` → "इति + एतत् + तपः — splitter target"
- `अनेनैव` → "अनेन + एव — splitter target"
- `आगच्छेत्तौ` → "आगच्छेत् + तौ — splitter target"
- `सम्यगुभयोः` → "सम्यक् + उभयोः — splitter target"
- `नियम्यैतदात्मन्येव` → "नियम्य + एतद् + आत्मनि + एव — splitter target"
- … plus pure 1- and 2-character fragments labelled `category: 'fragment'` with a "splitter residue" explanation

These don't fix the autoDecode engine's underlying mis-cuts, but they replace the dead-end "no grammar data" popover with an honest "this is a splitter artefact — probable original X + Y + Z" hint. The user still gets *something* to read.

### 4. EmptyPopover hardened to a shape-hint surface (`src/components/WordPopover.jsx`)

Even if the four prior layers all miss, `EmptyPopover` no longer shows the "candidate for the Decode Helper queue" copy. New `shapeHint(word)` helper inspects the Devanagari surface form and emits a best-effort note:

- length ≤ 1 → "Single character — almost certainly a splitter residue (likely an आ-/अ- prefix detached from its host word)."
- length === 2 → "Two-character fragment — likely a splitter residue. Read the verse line for the surrounding context."
- contains a hyphen → "Hyphenated compound with no resolved components — the head probably carries the case."
- starts with a vowel-mark (matra) → "Begins with a vowel-mark — splitter cut at the wrong place; the leading consonant was absorbed by the previous word."
- ends in विराम (्) → "Ends in विराम — consonant-stem form; check the verse text for the larger compound this belongs to."
- otherwise → "No dictionary entry or suffix pattern matched. Likely either an uncommon compound or a splitter mis-cut — check the verse line for context."

The category chip in the empty popover changes from "no grammar data yet" to "best-effort shape hint" to match.

## Files

- `src/__tests__/empty-popover-audit.test.js` (new) — regression test asserting zero empty popovers across the corpus.
- `src/data/_vocab_extended_part9.js` (new) — ~100 real-word + splitter-residue entries.
- `src/data/vocabulary-extended.js` — imports + spreads PART_9.
- `src/data/sharedVocab.js` — 11 new patterns inside `inferFromSuffix`.
- `src/components/WordPopover.jsx` — new `shapeHint` helper; `EmptyPopover` rewritten to surface shape hints rather than the dead-end message.
- `src/components/WordPopover.test.jsx` — updated assertion ("best-effort shape hint" instead of "no grammar data yet").

## Tests

All 581 passing. The new audit test (581st test) is the canary — it will fail the build the moment a future verse, override, or autoDecode change re-introduces an uncovered surface form.

## What's left

The autoDecode engine's underlying mis-cuts (e.g., `इत्येतत्तपो`, `अहर्यद्ब्रह्मणो`) are still bugs — the splitter-residue entries label them honestly but don't fix the upstream cause. A follow-up pass can add proper VOCAB_HINT_SPLITS entries (key the original chunk → correct decomposition) so the splitter never produces these in the first place. The user sees clean popovers now; the engine still mis-cuts.
