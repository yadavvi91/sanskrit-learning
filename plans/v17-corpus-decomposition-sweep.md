# Plan v17 — Per-verse padaccheda fix sweep (BG 5.10 → 8.8)

**Status:** Mostly shipped. Workflow superseded by v19 (DCS integration) — the per-verse hand-fixing approach was the wrong shape of problem.

## Context

User session-by-session walkthrough of the deployed app surfaced ~150 chunks across BG 5–8 where the autoDecode splitter mis-cut. Each one was hand-flagged and patched. This plan documents the work and is kept as a historical record; v19 makes most of it redundant.

## Pattern of mis-cuts (the categories user surfaced)

1. **Visarga-र् mid-compound.** Engine applied the visarga-र् sandhi rule inside compound words (ब्रह्मनिर्वाण → ब्रह्मनिः + वाणं, स्थिरबुद्धिरसम्मूढो, सुहृन्मित्रार्युदासीनमध्यस्थद्वेष्यबन्धुषु, etc.).
2. **savarṇa-dīrgha mis-cuts.** ज्ञानविज्ञानतृप्तात्मा, ब्रह्मयोगयुक्तात्मा etc. — long bahuvrīhi compounds with -आत्मन् at the end.
3. **त् + voiced (जश्त्व) mid-word.** यज्ञाद्भवति → यज्ञात् + भवति, युञ्ज्याद्योगम् → युञ्ज्यात् + योगम्.
4. **yaṇ sandhi at word boundary.** मय्यावेशितचेतसाम् → मयि + आवेशित-चेतसाम्, मय्यासक्तमनाः → मयि + आसक्त-मनाः.
5. **Whole-chunk vocab shadowing recursive split.** इच्छाद्वेषसमुत्थेन returned whole because bulk-vocab entry blocked decomposition.
6. **नञ्-bahuvrīhi misread.** नान्यगामिना wrongly split as न + अन्यगामिना instead of one compound.
7. **Canonical visarga normalisation.** Surface -ो (sandhi result) needs to display as -ः for padaccheda.

## Verses fixed (representative)

| Verse | Issue | Fix |
|---|---|---|
| 5.10 | ब्रह्मण्याधाय wrongly kept whole | SPLITTER_OVERRIDE → ब्रह्मणि + आधाय |
| 5.13 | संन्यस्यास्ते mis-cut as संन्यस्याः + ते | SPLITTER_OVERRIDE → संन्यस्य + आस्ते |
| 5.18 | विद्याविनयसम्पन्ने opaque | KNOWN_SAMASAS chain |
| 5.21 | ब्रह्मयोगयुक्तात्मा needed decomposition | SPLITTER_OVERRIDE + KNOWN_SAMASAS |
| 5.24 | "योऽन्तःसुखोऽन्तरारामस्तथान्तर्ज्योतिरेव" giant sandhi-run | SPLITTER_OVERRIDE (6 parts) |
| 5.27 | बहिर्बाह्यांश्चक्षुश्चैवान्तरे mid-compound mis-cut | SPLITTER_OVERRIDE |
| 6.3 | आरुरुक्षोर्मुनेर्योगं | SPLITTER_OVERRIDE |
| 6.7 | परमात्मा / प्रशान्तस्य mis-cut | KNOWN_SAMASAS + override |
| 6.8 | ज्ञानविज्ञानतृप्तात्मा, समलोष्टाश्मकाञ्चनः | KNOWN_SAMASAS bahuvrīhi entries |
| 6.9 | सुहृन्मित्रार्युदासीनमध्यस्थद्वेष्यबन्धुषु | 7-element द्वंद्व chain entry |
| 6.10 | निराशीरपरिग्रहः wrong-position visarga-र् | SPLITTER_OVERRIDE |
| 6.11 | अत्युच्छ्रितं | SPLITTER_OVERRIDE (yaṇ) |
| 6.12 | युञ्ज्याद्योगम् (जश्त्व त्+य) | new sandhi rule t-jash-ya + override |
| 6.13 | कायशिरोग्रीवं, नासिकाग्रं | KNOWN_SAMASAS |
| 6.14 | प्रशान्तात्मा, मच्चित्तो | SPLITTER_OVERRIDES + bahuvrīhi entries |
| 6.15 | मत्संस्थामधिगच्छति | SPLITTER_OVERRIDE |
| 6.16 | योगोऽस्ति, चैकान्तमनश्नतः | SPLITTER_OVERRIDEs |
| 6.17 | युक्ताहारविहारस्य | KNOWN_SAMASAS |
| 6.18 | आत्मन्येवावतिष्ठते | SPLITTER_OVERRIDE |
| 6.21 | यत्तद्बुद्धिग्राह्यमतीन्द्रियम् | SPLITTER_OVERRIDE + KNOWN_SAMASAS |
| 6.23 | दुःखसंयोगवियोग as Krishna's definition of yoga | KNOWN_SAMASAS entry |
| 6.24 | मनसैवेन्द्रियग्रामं | SPLITTER_OVERRIDE |
| 6.27 | ब्रह्मभूतम् | already covered by KNOWN_SAMASAS |
| 7.1 | मय्यासक्तमनाः | SPLITTER_OVERRIDE |
| 7.15 | माययापहृतज्ञानाः (corrected: ONE bahuvrīhi, not two words) | SPLITTER_OVERRIDE |
| 7.16 | जिज्ञासुरर्थार्थी | SPLITTER_OVERRIDE |
| 7.20 | कामैस्तैस्तैर्हृतज्ञानाः | SPLITTER_OVERRIDE |
| 7.27 | इच्छाद्वेषसमुत्थेन nested compound | KNOWN_SAMASAS |
| 8.8 | नान्यगामिना as नञ्-bahuvrīhi | SPLITTER_OVERRIDE + heuristic |
| 12.7 | मृत्युसंसारसागरात्, मय्यावेशितचेतसाम् | KNOWN_SAMASAS + override |

Plus ~50 more chunks across the corpus.

## The honest assessment

This plan represents real but inefficient work. Each fix is a band-aid on the splitter's structural inability to consult a Sanskrit lexicon. The user's frustration was justified: a hand-annotated DCS dataset already exists for the entire Gītā, and using it would have made ~95% of this plan's work unnecessary.

## Verification

- 582/582 tests pass on tag `pre-dcs-migration`.
- Per-verse spot checks listed in checkpoint-49 onwards.

## Relation to other plans

- v16 was the engine-improvement plan running in parallel
- v19 (next) replaces this work's *output* with DCS data, retiring most of the SPLITTER_OVERRIDES this plan accumulated

## Lessons (kept for the post-mortem)

1. **Check for upstream tools before reinventing.** DCS, vidyut, Sanskrit Heritage Reader, dharmamitra — all exist and predate this project.
2. **Per-chunk overrides scale badly.** Each one shifts the cost from the engine to the user.
3. **Long-running per-verse hand-walks are a code smell.** When the user is QA-ing for hours, the architecture is wrong.
