# Checkpoint 31 — Hyphen-insensitive क्रिया + wordParsings backfill on 21 verses + Primer with real examples

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Commits:** `f75cf92`, `7808c0a`
**Slice:** Data quality across the corpus + Primer realignment

## What changed

Two related fixes, bundled because both are about *the corpus telling the Primer the truth*.

### 1. Hyphen-insensitive क्रिया chip highlighting (`f75cf92`)

The bug: in Gītā 2.4, the padaccheda contains `प्रति-योत्स्यामि` (with a pedagogical hyphen marking the upasarga boundary, the same convention used for samāsa entries elsewhere — `देह-अन्तर-प्राप्तिः`, `मात्रा-स्पर्शाः`, `कर्म-फल-हेतुः`). But `finiteVerbs[0].form` is `प्रतियोत्स्यामि` (no hyphen, mirroring the textual form). The strict-equality check in [VerseDetail.jsx:9](src/components/VerseDetail.jsx#L9) missed the match → the chip never got the `is-finite` class → the user looking for "which word is the verb" couldn't see it.

Fix: strip hyphens on both sides of the comparison. Same approach `lookupSharedVocab` already uses for the dictionary fallback ([sharedVocab.js:11](src/data/sharedVocab.js#L11)). Keeps the user's pedagogical hyphen in the data; just makes recognition robust.

Regression test in `src/components/VerseDetail.test.jsx` walks every decoded verse and asserts each padaccheda chip's `is-finite` class equals what the hyphen-stripped finite-verb match says. Catches future verses that introduce a similar prefix-hyphen + finite-verb pairing.

### 2. wordParsings backfill on 21 verses + Primer with real examples (`7808c0a`)

The deeper bug: only 4 of 25 decoded verses (1.1, 2.3, 2.4, 2.5) had `wordParsings`. The 21 verses added in the v10 corpus expansion had `padaccheda` + `finiteVerbs` but no per-word grammar tagging. Symptoms:

- Click any non-finite word in 2.13-18.66 → empty popover
- Vocabulary tab couldn't display case info for those verses
- Primer's vibhakti table fell back to "— (not yet decoded)" for **चतुर्थी** and **पञ्चमी** even though the corpus was full of them

The cases were always there in the text, just untagged. 2.62-63 alone has six पञ्चमी ablatives chained:

> सङ्गात् → कामात् → क्रोधात् → सम्मोहात् → स्मृति-भ्रंशात् → बुद्धि-नाशात्

And 4.8 has three चतुर्थी datives-of-purpose: परित्राणाय, विनाशाय, धर्म-संस्थापन-अर्थाय.

Backfilled wordParsings on all 21 verses — ~250 entries with `category`, `root`, `gender`, `number`, `case` (or `gana`/`pada`/`lakara`/`purusha` for verbs), `gloss`, and a pedagogical `note` where useful. Also updated the Primer's vibhakti table to reference real corpus examples for every case, and the lakara table similarly.

New test suite `src/data/primer.test.js` (7 tests) pins three invariants:

1. No "(not yet decoded)" placeholder anywhere in `PRIMER`
2. Every example word in the vibhakti / lakara tables actually exists in some verse's padaccheda or finiteVerbs
3. Every of the 8 cases has at least one `wordParsing` entry across the corpus (closes the "did we actually backfill it?" loop)

## Why this matters

These two fixes share a theme: **when the popover or the Primer says nothing about a word/case, it's not because the word isn't there — it's because nobody told the data**. Both bugs were invisible until a user said "wait, why is this not showing up?". Both fixes wire the data through to where the UI can reach it.

The Primer regression-test invariants are the bigger win. The "not yet decoded" placeholder is now a test failure, not a silent rot.

## Verified

- `npm run build` clean (bundle: 436KB → 466KB, +30KB from the wordParsings data — expected)
- 360/360 tests passing (was 349 before this slice, +11: 4 VerseDetail regression + 7 primer integrity)
- Click any noun in 2.62 → see `विभक्ति: पञ्चमी` ✓
- Click परित्राणाय in 4.8 → see `विभक्ति: चतुर्थी` ✓
- Open Primer → vibhakti table has 2-4 real corpus refs per row ✓

## Out of scope

- Adding more verses (corpus stays at 25 — checkpoint-32 fills the gap with reference data instead)
- Cross-linking specific Primer rows to specific Atlas paradigms (deferred to checkpoint-32 + 33's deep-link work)

## Relation to other plans

Part of `plans/v11-quality-and-workflows.md`. Sets the data foundation that checkpoint-32 (Declensions tab) and 33 (deep-link from popover) build on — without `wordParsings` everywhere, the Declensions classifier wouldn't have anything to classify.
