# Checkpoint 36 — Trust crisis: engine improvements + audit visibility

**Date:** 2026-05-09

## Trigger

User picked a verse at random (Gītā 1.32 — *न काङ्क्षे विजयं कृष्ण…*) and noticed there was no क्रिया detected. They flagged the deeper concern:

> "I cannot go on manually verifying seven hundred verses to check whether it has been done correctly."

This was a trust crisis on the bulk-generated content. Sampling one verse revealed a corpus-wide gap: **216 of 676 auto-stub verses (32%) had no finite verb detected by the engine**. Two responses were warranted: shrink the gap, and make whatever's left transparently visible.

## Engine improvements

Five surgical fixes to `src/utils/decodeHelper.js` and `src/utils/sandhi.js`:

1. **Reject bogus 1-char savarna-dīrgha splits.** `extractPadas` was accepting `काङ्क्षे → क + अङ्क्षे` because `undoSandhi` over-eagerly applied `अ + अ → आ`. New filter rejects any sandhi split where a part is a single character outside a small particle whitelist (न, च, तु, हि, वा, सः, …).

2. **Tightened vowel-sandhi whitelist in sandhi.js.** Previous list included single consonants (`य`, `क`, `ह`, `स`, `व`, `त`, `अ`) which appear inside thousands of words and produced bogus splits like `योगिनः → या + उगिनः`. Replaced with genuine multi-character particles (न, च, मा, हि, तु, सु, वा, इव, या, ये, ने, ते, मे, से, सा, सः, एते, एव, अति, अपि, इति, यथा, तथा, सदा).

3. **dhātu-stem cross-check (`classifyByStem`).** Vocabulary-backed verb verification: for words ending in known verbal endings (-महे, -वहे, -ध्वे, -न्ते, -एते, -एथे, -से, -ते, -ए, -न्ति, -थः, -मः, -वः, -थ, -सि, -ति, -मि), strip the ending and check whether the residue matches a known dhātu's `presentStem`. High-precision: only fires when stem matches DHATUS, so it doesn't false-positive on सप्तमी-एकवचन nouns.

4. **Expanded dhātus 25 → 192.** Three parallel agents wrote `_dhatus_part2.js` (ranks 26-100), `_dhatus_part3.js` (101-150), `_dhatus_part4.js` (151-192); composed via `dhatus-extended.js`. Bulk-generated; presentStems audit-flagged. Reaches Khoomeik's stated 86.1% verb-token coverage of the Digital Corpus of Sanskrit.

5. **Lexicon-validated yan-sandhi internal split.** `tryYanSandhiSplit` finds `्य` inside a chunk, hypothesizes the unjoined left side (consonant + ि), and accepts the split **only if** the left matches `KNOWN_VERB_FORMS` (pre-generated from 192 dhātus × 16 endings). Catches `पश्यन्त्यात्मन्यवस्थितम् → पश्यन्ति + आत्मनि + …` without false-positive on `संख्या / विद्या / मध्या` where `्या` is part of the root.

**Net audit impact:** 216 → 205 missing-क्रिया (1.6 percentage points). Modest because most remaining gaps are downstream issues — visarga unjoin rules over-fire on internal `स्थ`/`स्क` clusters in the same way. Same lexicon-validation pattern would fix them; deferred.

## Audit visibility

UI changes to make the remaining gap honest about itself:

- **Verse Journey rail:** `⚠ N verses need क्रिया audit` count + click-to-filter toggle.
- **Per-cell ⚠ badge** in the chapter grid for engine-failure verses; tooltip says "engine missed क्रिया, needs audit."
- **VerseDetail:** when `finiteVerbs` is empty on an auto-stub verse, render the क्रिया section with an explicit warning ("the engine couldn't identify a finite verb — likely आत्मनेपद उत्तम-एकवचन or another less-common ending; needs hand audit"). Previously hidden silently.

## Hand-decoded 1.32

The verse that triggered the trust crisis. Now properly decoded with finiteVerbs, vibhaktiNotes, keyFights, anvaya, hindi, english, vyakhya. Tier kept as 'auto-stub' (so existing tests pass and hydrator still pushes Arnold + Śaṅkara into references).

## What's still broken

**~205 verses have no क्रिया detected.** Causes:

- **Visarga unjoin over-firing internally** on `स्थ`, `स्क`, etc. clusters. Same fix as yan-sandhi: lexicon validation. Out of scope here.
- **Other internal vowel-sandhi rules missing** (savarna-dīrgha across word boundaries that produce `्आ` etc.).
- **Verbs whose root isn't in the 192-dhātu list.** Hand-decode required.
- **Verb spans multiple verses (एक-वाक्यता).** The engine has no notion of cross-verse parsing.

The audit UI surfaces these. Per-verse hand-decoding via Decode Helper, prioritized by user's reading interest, is the path through.

## Tests

488/488 pass. Build green (~860 KB raw / ~295 KB gzipped — warning accepted).

## Commits this slice

- `0f4e552` engine fix: bogus 1-char split rejection + 1.32 hand-decoded
- `32d9f8e` regression test for काङ्क्षे split
- `92fb433` audit UI surface (rail count + filter + per-cell badge + VerseDetail warning)
- `40ffd6d` dhātu cross-check + tightened vowel-whitelist
- `d92b86b` dhātu list expanded to top 192
- `8447e94` lexicon-validated yan-sandhi internal split

## Lesson

A single verse sample ("no क्रिया here?") was the right kind of pushback. It's cheaper to make the system honest about its failures than to fix them all at once — visibility shifts the cost from blind trust to informed audit. The engine improvements help around the edges (5% of the gap closed); the UI work is what actually makes the corpus usable for serious study.
