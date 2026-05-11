# Checkpoint 48 — Four UX bugs from today's walkthrough

**Date:** 2026-05-12

## Trigger

User walked the deployed app and surfaced four distinct issues:

1. **Latin alphabets in `root` field.** Popover for 12.7 मय्यावेशितचेतसाम् showed `root avesita-cetas` while everywhere else uses Devanagari. Found ~341 Latin-roots across the bulk-generated `_vocab_extended_part*.js` files — agent-emitted with diacritics stripped.

2. **Missing उपसर्ग context.** Popover for प्रसिद्ध्येदकर्मणः listed root √सिध् but didn't mention the प्र prefix. User: *"where does this प्र come from?"* Same UX pain on समाचर (सम् + आ + √चर्).

3. **Top 10 filter shows almost everything.** Periodic Table tier chips (Top 10 / 25 / 50 / 100 / 192) leaked the 49 stub dhātus whose `frequencyRank` is null. JavaScript's `null > 10 === false` (null coerces to 0), so unranked entries passed every threshold.

4. **Missing samāsa annotations.** User: *"I think there are A LOT of समास that are missing."* The hydrate-time detection only fired on hyphenated padaccheda entries (काम-आत्मानः, स्वर्ग-पराः). Unhyphenated compounds like कर्मयोग, आत्मशुद्धि, स्थितप्रज्ञ went undetected.

## What changed

### 1. Latin roots → Devanagari (scripts + corrections layer)

- `scripts/iast-to-deva-roots.mjs` — one-shot Latin-IAST → Devanagari transliterator. Ran across all `_vocab_extended_part*.js` and converted 341 `root: 'latin'` entries.
- `scripts/fix-roots-corrections.mjs` — hand-curated corrections layer over the mechanical pass. Fixed 37 high-value Sanskrit terms where the diacritic-stripped Latin produced misleading Devanagari (e.g., `avesita-cetas` → mechanical produced `अवेसित-चेतस्`, corrections produced the proper `आवेशित-चेतस्`; same treatment for भूत, हृषीकेश, धार्तराष्ट्र, अमृत, दुःख, ज्ञानिन्, अहङ्कार, etc.).

Imperfect for the long tail of agent-generated entries — diacritic info was lost at generation time so my mechanical converter sometimes produces unstandard forms — but every root is now Devanagari. No more visible Latin/Devanagari mixing in the popover.

### 2. उपसर्ग field rendered in popover

- `src/components/WordPopover.jsx` — new row that, when `parsing.upasarga` is a non-empty array, renders the prefixes with their senses inline. Reuses `lookupUpasarga()` from `src/data/upasargas.js`. For प्रसिद्ध्येत्: shows "उपसर्ग — प्र (forth / forward)". For समाचर: "उपसर्ग — सम् (with / together / completely) + आ (up to / hither)".
- Vocab entries updated:
  - `_vocab_extended_part5.js` — `प्रसिद्ध्येदकर्मणः` was wrongly a single-word entry papering over a splitter mis-cut. Replaced with: (a) a chunk-level vocab-hint entry (`प्रसिद्ध्येत् + अकर्मणः`, sandhi त् + अ → द् + अ); (b) `प्रसिद्ध्येत्` with `upasarga: ['प्र']`; (c) `अकर्मणः` as ablative singular.
  - `_vocab_extended_part6.js` — `समाचर` gained `upasarga: ['सम्', 'आ']`.
  - `_vocab_extended_part7.js` — `समाचरन्` gained `upasarga: ['सम्', 'आ']`.

### 3. Top 10 filter — explicit null check

`src/components/DhatuPeriodicTable.jsx` — filter now treats unranked dhātus (`frequencyRank == null`, the 49 _dhatus_extra.js stubs) as outside every Top-N tier. They still appear under "All" and "In Gītā", which is the correct behaviour. One-line fix; previously `null > 10` evaluated to false and they leaked through.

### 4. KNOWN_SAMASAS lexicon

`src/data/_known_samasas.js` (new) — 30 hand-curated entries for the most-frequent Gītā compounds that appear as single unhyphenated padaccheda words. Each entry: surface stem → { vigraha, type, gloss }. Covers all four major samāsa types:

- तत्पुरुष: कर्मयोग, कर्मसंन्यास, कर्मफल, ज्ञानयोग, भक्तियोग, ध्यानयोग, आत्मशुद्धि, ब्रह्मनिर्वाण, स्वधर्म, स्वजन, दुःखयोनि, दुःखालय, कर्मेन्द्रिय, ज्ञानेन्द्रिय
- द्वंद्व: मनोबुद्धि, योगक्षेम, सुखदुःख, शीतोष्ण, जयापजय, लाभालाभ, मानापमान
- कर्मधारय: अहङ्कार, महात्मन्, महायोग
- बहुव्रीहि: स्थितप्रज्ञ, स्थितधी, समबुद्धि, समदुःखसुख, जितेन्द्रिय, दृढव्रत, महाबाहु

`src/data/hydrate.js` — new first-pass loop that, for each padaccheda entry, looks up its vocab root and checks against KNOWN_SAMASAS. If matched, derives a samāsa note with `source: 'known-samasa-lexicon'`. Falls through to the existing hyphen-based detection for everything else. Added 48 new accurate samāsa annotations across the corpus.

(An attempted broader auto-detection from `+`-containing vocab roots was reverted — it produced too many false positives, mislabeling sandhi-joins like तेषाम्+अहम् as samāsa. The lexicon path is conservative but accurate.)

## Verification

- 582 passing tests
- Production build clean (2.5 MB / 817 KB gzipped — same as before)
- Spot-checks:
  - मय्यावेशितचेतसाम् popover root: `आवेशित-चेतस्` (was `avesita-cetas`)
  - प्रसिद्ध्येत् popover: "उपसर्ग — प्र (forth / forward)" alongside the verb fields
  - समाचर popover: "उपसर्ग — सम् (with / together / completely) + आ (up to / hither)"
  - Top 10 filter at /verbs: only 10 dhātus visible
  - 5.2 कर्मयोग popover → samāsa block: "कर्मयोगः = कर्मणि योगः (सप्तमी तत्पुरुष)"

## Files

- `scripts/iast-to-deva-roots.mjs` (new) — one-shot transliterator
- `scripts/fix-roots-corrections.mjs` (new) — hand-curated post-fix
- `src/data/_known_samasas.js` (new) — 30-entry lexicon
- `src/data/_vocab_extended_part4.js`, `_part5.js`, `_part6.js`, `_part7.js`, `_part8.js` — Devanagari roots; प्र / सम् / आ upasarga annotations
- `src/data/hydrate.js` — KNOWN_SAMASAS first pass
- `src/components/WordPopover.jsx` — उपसर्ग row
- `src/components/DhatuPeriodicTable.jsx` — null frequencyRank check

## Out of scope

- Broader samāsa auto-detection (vocab-root `+` patterns) — too many false positives without lexicon backing. Future: build a comprehensive samāsa lexicon (~hundreds of entries) and revisit.
- Mechanical transliteration accuracy for the long tail of agent-generated Latin roots — diacritic info was never present in source, so perfect reconstruction would need a Sanskrit lexicon lookup per stem. Acceptable for now; user's complaint was about visible Latin, which is resolved.
