# Checkpoint 45 — Kill the abstract-X placeholder in suffix-inference templates

**Date:** 2026-05-11

## Trigger

> *"what sort of meaning is this — केवलैः · noun · dict — 'a-stem instrumental plural — \"by/with X-s\"' — Find out any such words that you might have — 'a-stem instrumental plural — \"by/with X-s\"' as meaning attached to them and fix them"*

The popover for केवलैः was showing a template with a literal "X" placeholder instead of a meaning. This is what `withStemGloss` does when the stem isn't in the dictionary: it falls back to the suffix-inference template string. The "X" was an abstract — meant to be a placeholder — and the user saw it as raw output.

## What changed

A two-prong fix.

### 1. Add the missing stems to vocab (`src/data/_vocab_extended_part10.js`, new)

~280 hand-curated stems that, once present in `VOCAB_EXTENDED`, let `withStemGloss` resolve every case-form automatically. Adding one stem like `केवल` unlocks केवलैः, केवलम्, केवलेन, केवले, केवलात्, केवलस्य, … in one shot.

Sample entries:
- `केवल` → "alone / only / exclusively"
- `अद्भुत` → "wondrous / marvellous"
- `अव्यय` → "imperishable / undecaying"
- `अनित्य` → "non-eternal / transient"
- `अविनाशिन` → "imperishable"
- `अनुत्तम` → "unsurpassed / supreme"
- `अपरिमेया` → "immeasurable (fem.)"
- `अप्रतिष्ठ` → "without foundation"
- `भक्ति` → "devotion"
- `भूतग्राम` → "collection of beings"
- … 270 more

Audit dropped: **726 → 391 unique words on template glosses**, **610 → 284 unique stems**.

### 2. Kill the abstract "X" placeholder in remaining templates (`src/data/sharedVocab.js`)

For the residual cases where the stem still isn't in vocab (mostly splitter fragments like `तत्ता`, `आणा`, `प्रश`), the template strings used to say:

```
a-stem instrumental plural — "by/with X-s"
a-stem genitive singular — "of X"
a-stem -म् ending — neuter nominative or masculine accusative singular (ambiguous)
pronominal ablative — "from X / for that reason"
visarga-sandhi form ending in -र् (sandhi residue of -ः)
```

…with a literal "X". I rewrote every fallback string to **interpolate the actual extracted stem** and add an honest `(stem not in dictionary)` caveat:

```
instrumental plural of "तत्ता" — "by/with तत्ता-s" (a-stem; stem not in dictionary)
genitive singular of "X-actual-stem" — "of X-actual-stem" (a-stem; stem not in dictionary)
"तत्ता" — n. nom. or m. acc. singular (a-stem; stem not in dictionary)
pronominal ablative of "तत्" — "from तत् / for that reason"
"पुनः" with visarga-sandhi (-ः → -र् before voiced sounds)
```

Now no popover anywhere in the corpus shows a literal "X" placeholder. Even when the stem is unknown, the popover prints the actual extracted text plus a "stem not in dictionary" tag — so the user sees diagnostic information rather than a placeholder.

### 3. Audit-test rescoped

`src/__tests__/template-gloss-audit.test.js` `TEMPLATE_MARKERS` updated so we track the new "stem not in dictionary" honest fallback as a future-work signal. It's a logging test (not a hard assertion) — gives a count for the next pass without breaking CI.

## Spot-checks

```
केवलैः       → "by/with alone / only / exclusively (pl)"     (was: "by/with X-s")
अद्भुतम्      → "wondrous / marvellous (nom or acc sg)"        (was: "a-stem -म् ambiguous")
अव्ययः       → "imperishable / undecaying"                    (was: "a-stem nom. sg.")
धीरः          → "the wise / steadfast one"                     (was: "a-stem nom. sg.")
तत्ताम्       → ""तत्ता" — n. nom. or m. acc. singular         (was: "a-stem -म् ambiguous")
                  (a-stem; stem not in dictionary)"
योनिः         → "womb / source / birth-place"                 (was: "a-stem nom. sg.")
भूतग्रामम्    → "collection of beings (nom or acc sg)"         (was: "a-stem -म् ambiguous")
```

## Files

- `src/data/_vocab_extended_part10.js` (new) — ~280 stem entries with hand-written glosses.
- `src/data/vocabulary-extended.js` — imports + spreads PART_10.
- `src/data/sharedVocab.js` — every template fallback rewritten to interpolate the actual extracted stem and admit "(stem not in dictionary)" rather than printing a literal "X".
- `src/__tests__/template-gloss-audit.test.js` — markers rescoped to the new honest fallback phrasing.

## Tests

582 passing. Production build clean.

## What's left

284 stems still aren't in vocab (mostly splitter mis-cuts: `अनोबुद्धिर्मा`, `यद्यद्विभूति`, `धृत्युत्साहस`, `यनेत्र`, …). The popovers for these now honestly show the splitter's extracted stem with a "stem not in dictionary" tag — diagnostic rather than misleading. The real fix for those is upstream in the autoDecode splitter, not in the popover layer.
