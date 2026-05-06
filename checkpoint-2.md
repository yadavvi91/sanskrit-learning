# Checkpoint v2 — समास annotations

**Date:** 2026-05-07

## What changed

Added compound (समास) analysis for every existing decoded verse. Sandhi was already there; samas was the missing half of the पदच्छेद story.

Tucked-in by design: rendered as a collapsible `<details>` block right under पदच्छेद, mirroring how sandhi notes already work. The verse view stays clean by default; readers expand it when they want the analysis.

## What was added

10 compounds across 4 verses:

| Verse | Compound | विग्रह | Type |
|---|---|---|---|
| 1.1 | धर्मक्षेत्रे | धर्मस्य क्षेत्रम् | षष्ठी तत्पुरुष |
| 1.1 | कुरुक्षेत्रे | कुरूणाम् क्षेत्रम् | षष्ठी तत्पुरुष |
| 2.3 | हृदयदौर्बल्यम् | हृदयस्य दौर्बल्यम् | षष्ठी तत्पुरुष |
| 2.3 | परन्तप | परान् तापयति इति | उपपद तत्पुरुष |
| 2.4 | मधुसूदन | मधुम् सूदयति इति | उपपद तत्पुरुष |
| 2.4 | अरिसूदन | अरीन् सूदयति इति | उपपद तत्पुरुष |
| 2.4 | पूजार्हौ | पूजायाः अर्हौ | षष्ठी तत्पुरुष |
| 2.5 | महानुभावान् | महान्तः अनुभावाः येषाम् ते | बहुव्रीहि |
| 2.5 | अर्थकामान् | अर्थः च कामः च | इतरेतर द्वंद्व |
| 2.5 | रुधिरप्रदिग्धान् | रुधिरेण प्रदिग्धान् | तृतीया तत्पुरुष |

## Files touched

- `src/data/verses.js` — `samasNotes` array on each verse: `{ compound, vigraha, type, gloss }`.
- `src/components/VerseDetail.jsx` — second `<details>` block after sandhi, rendering each row as compound · = · विग्रह · type-pill · gloss.
- `src/styles.css` — `.samas` mirrors `.sandhi`; rows use a 4-column grid with the gloss spanning underneath. Gold accent border to differentiate from the green sage of sandhi.
- `verses-decoded.md` — the same notes mirrored in the markdown source-of-truth so the JS data and the markdown stay aligned.

## Verified

- `npm run build` — clean (37 modules, 444ms).
- Bundle deltas: CSS +1.1 KB (samas grid styling), JS +1.8 KB (data).

## One judgement call

अर्थकामान् in 2.5 is a द्वंद्व at the root used adjectivally with बहुव्रीहि flavour ("gurus *whose* drive is wealth-and-desire"). I went with **इतरेतर द्वंद्व** + a gloss note rather than "बहुव्रीहि of a द्वंद्व" — simpler analysis, surfaces the more learnable pattern. Easy to switch later.

## Not in this version (deliberate)

- No samas analysis for derivations like क्लैब्यम् (taddhita), युयुत्सवः (desiderative), भैक्ष्यम् — they aren't compounds, they're suffix-derived nouns. Out of scope for *समास*.
- No new view or pedagogy around compounds — they're collapsed reference data on existing verses, not a new learning surface. The future Primer (v2 plan) is where compound *types* would be explained on their own page.
- CLAUDE.md was not updated. The "Not yet known" list still says samas is untracked; this checkpoint adds reference data, not a claim that User has "won" the samas patterns.
