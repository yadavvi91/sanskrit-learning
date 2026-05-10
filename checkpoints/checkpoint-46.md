# Checkpoint 46 — Verse 5.11 splitter fix + matra-ā canonical-form bug

**Date:** 2026-05-11

## Trigger

> *"Why does the आत्मशुद्धि become अत्मशुद्धये"*

User opened the popover for what should be आत्मशुद्धये in verse 5.11 (कायेन मनसा बुद्ध्या केवलैरिन्द्रियैरपि / योगिनः कर्म कुर्वन्ति सङ्गं त्यक्त्वात्मशुद्धये), saw the surface form `अत्मशुद्धये` (with short अ, not long आ), and asked why. They worked out the right answer in conversation: it's savarṇa-dīrgha (आ + आ → आ) collapsing त्यक्त्वा + आत्मशुद्धये → त्यक्त्वात्मशुद्धये.

The popover was honest about the dictionary mapping (root आत्मशुद्धि), but the surface form was wrong — the autoDecode splitter had mis-cut the verse at the wrong vowel boundary, and a bulk-generated `// AUDIT` vocab entry had silently papered over the bug.

## What went wrong

Two compounding issues in `src/utils/decodeHelper.js`'s `devaCanonical`:

1. **Matra-ā mismapped.** `MATRA_TO_VOWEL` had `'ा': 'अ'` — the matra `ा` was getting normalized to short `अ` instead of long `आ`. Phonetically wrong (matra-ā represents long ā), and it broke savarṇa-class equality at the canonical layer.

2. **No savarṇa-dīrgha collapse in vocab-hint validation.** VOCAB_HINT_SPLITS only accepted joins where `parts.join('').canon === key.canon`. Hints whose join contracted via आ + आ → आ failed structural validation and got skipped — even when the gloss explicitly said `(त्यक्त्वा + आत्मशुद्धये)`.

Result: the engine fell through to the regular sandhi rules, which picked the WRONG split (`त्यक्त्व + अत्मशुद्धये`, both with short अ) and then a bulk-generated vocab entry `'अत्मशुद्धये'` (already flagged `// AUDIT`) made the wrong split look "covered."

## What changed

### 1. `MATRA_TO_VOWEL['ा']: 'अ' → 'आ'`

Matra-ā is long. This was a latent bug — any canonical equality test crossing matra/full-vowel forms got the wrong answer for `ा`. The fix uncovered 4 other downstream splitter mis-cuts (अचलेन, अध्यक्षेण, हेतुना, गुरुणा) — also addressed below.

### 2. Savarṇa-dīrgha aware canonical comparison

Added `collapseSavarna(arr)` + `devaCanonicalSavarna(s)` helpers. Used as a fallback in VOCAB_HINT_SPLITS validation: if the literal-canon comparison fails, try again after collapsing same-class adjacent vowel pairs (अ+अ, अ+आ, आ+अ, आ+आ → आ; same for i-class, u-class, ṛ-class). Now vocab-hint splits that the scribe contracted via अकः सवर्णे दीर्घः validate cleanly.

### 3. Fixed the `_vocab_extended_part6.js` audit entry

Removed `'अत्मशुद्धये'` (the wrong-cut entry that masked the bug). Replaced with:
- `'आत्मशुद्धये'` — the correct surface form with proper f. dative gloss ("for self-purification — तादर्थ्य चतुर्थी")
- `'त्यक्त्वात्मशुद्धये'` — vocab-hint pre-split entry whose gloss carries `(त्यक्त्वा + आत्मशुद्धये)` so VOCAB_HINT_SPLITS intercepts the whole chunk before the splitter runs

### 4. Matra-aware -ेन / -ेण / -ुना / -ुणा / -ा suffix patterns

The matra-ā fix unmasked four valid Sanskrit words that previously routed wrong: अचलेन (by the unmoving), अध्यक्षेण (by the overseer), हेतुना (by the cause), गुरुणा (by the heavy/Guru), and प्रभा (light). The existing suffix-inference patterns only had full-vowel forms (`-एण`); added matra-form variants:

- `-ेन` / `-ेण` → a-stem instrumental singular ("by X")
- `-ुना` / `-ुणा` → u-stem instrumental singular
- bare `-ा` → ā-stem feminine nominative/vocative singular (with exclusions to avoid colliding with `-त्वा`, `-स्या`, `-न्या`, `-या`, `-ुना`, `-ुणा`)

### 5. Killed the rest of the abstract-X placeholders

The previous checkpoint interpolated stems into the noun-case templates. This pass did the same for the remaining verb / krdanta / vocative / -त्व templates: every "present 3sg — 'X-s'" / "absolutive — 'having X-ed'" / "imperative 2sg — 'do (for yourself)!'" / "abstract -त्व — 'X-ness'" string now substitutes the actual extracted stem text. The literal "X" placeholder is gone everywhere in `inferFromSuffix`.

## Verification

```
verse 5.11 padaccheda before: ..., सङ्गं, त्यक्त्व, अत्मशुद्धये
verse 5.11 padaccheda after:  ..., सङ्गं, त्यक्त्वा, आत्मशुद्धये

आत्मशुद्धये popover:
  category: noun, root: आत्मशुद्धि, gender: f, number: eka, case: cha
  gloss: "for self-purification (dative of purpose — तादर्थ्य चतुर्थी)"

sandhiNotes:
  त्यक्त्वात्मशुद्धये = त्यक्त्वा + आत्मशुद्धये (vocab-hint split)
```

582/582 tests pass. Build clean.

## Files

- `src/utils/decodeHelper.js` — `MATRA_TO_VOWEL['ा']` → `'आ'`; new `collapseSavarna` + `devaCanonicalSavarna`; VOCAB_HINT_SPLITS validation now tries savarṇa-dīrgha-aware comparison as a fallback.
- `src/data/_vocab_extended_part6.js` — removed wrong `'अत्मशुद्धये'` entry; added correct `'आत्मशुद्धये'` + vocab-hint pre-split for `'त्यक्त्वात्मशुद्धये'`.
- `src/data/sharedVocab.js` — every remaining template-X placeholder rewritten to interpolate the actual extracted stem; new -ेन/-ेण/-ुना/-ुणा/-ा suffix patterns.

## Out of scope

Other savarṇa-dīrgha sandhi mis-cuts that might exist elsewhere in the corpus — the audit test (`empty-popover-audit`) will surface them as the canon machinery propagates.
