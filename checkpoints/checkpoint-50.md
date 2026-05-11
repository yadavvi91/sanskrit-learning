# Checkpoint 50 — v17 per-verse padaccheda fix sweep (BG 5.10 → 8.8)

**Date:** 2026-05-12

## Trigger

User walking the deployed app verse by verse and flagging mis-cuts. Each one needed a per-chunk fix in SPLITTER_OVERRIDES, KNOWN_SAMASAS, or both.

## What shipped

~100+ chunks across BG 5–8 received explicit overrides + KNOWN_SAMASAS annotations. Highlights:

- **5.10–5.20:** ब्रह्मण्याधाय, संन्यस्यास्ते, विद्याविनयसम्पन्ने, स्थिरबुद्धिरसम्मूढो, ब्रह्मविद्ब्रह्मणि, बाह्यस्पर्शेष्वसक्तात्मा (and ~10 others)
- **5.21–5.29:** ब्रह्मयोगयुक्तात्मा, यतेन्द्रियमनोबुद्धिर्मुनिर्मोक्षपरायणः, विगतेच्छाभयक्रोधो, सर्वलोकमहेश्वरम्, शान्तिमृच्छति
- **6.1–6.27:** ह्यसंन्यस्तसङ्कल्पो, आरुरुक्षोर्मुनेर्योगं, योगारूढ, यतचित्तेन्द्रियक्रिय, कायशिरोग्रीवं, नासिकाग्रं, प्रशान्तात्मा, मच्चित्तो, मानापमानयोः, ज्ञानविज्ञानतृप्तात्मा, समलोष्टाश्मकाञ्चनः, the 7-element सुहृत्-...-बन्धु chain, मत्संस्थाम्, नियतमानसः, निर्वाणपरमां, चैकान्तमनश्नतः, अति-स्वप्न-शील, युक्ताहारविहार, युक्तस्वप्नावबोध, आत्मन्येवावतिष्ठते, सर्व-कामेभ्यः, सोपमा, एवात्मनात्मानम्, पश्यन्नात्मनि, यत्तद्बुद्धिग्राह्यमतीन्द्रियम्, मनसैवेन्द्रियग्रामं, दुःख-संयोग-वियोग, अनिर्विण्ण-चेतस्
- **7.1–7.27:** मय्यासक्तमनाः, माययापहृतज्ञानाः (corrected to ONE nested bahuvrīhi), जिज्ञासुरर्थार्थी, कामैस्तैस्तैर्हृतज्ञानाः, नियममास्थाय, श्रद्धयार्चितुमिच्छति, आराधनमीहते, इच्छाद्वेषसमुत्थेन
- **8.8:** नान्यगामिन् as नञ्-bahuvrīhi, चेतसा kept whole

## Patterns observed (input for v19's DCS schema)

| Pattern | Frequency | Engine response |
|---|---|---|
| Visarga-र् inside compound | ~25 chunks | SPLITTER_OVERRIDE to keep whole |
| Long bahuvrīhi opaque | ~30 chunks | KNOWN_SAMASAS lookup |
| जश्त्व त् → द् before voiced | ~15 chunks | SPLITTER_OVERRIDE |
| savarṇa-dīrgha hiding boundary | ~20 chunks | SPLITTER_OVERRIDE |
| Yaṇ इ + आ → या / उ + अ → व | ~10 chunks | SPLITTER_OVERRIDE |
| Wrong negation-prefix extraction | ~10 chunks | नञ्-heuristic in recursiveSplit |

## Tests

582/582 passing.

## What's left

The user explicitly named the problem: "I have to manually do this for every freaking verse." The architectural truth: a hand-annotated DCS dataset already exists. v19 is the migration plan.
