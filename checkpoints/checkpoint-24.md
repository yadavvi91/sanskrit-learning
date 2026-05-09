# Checkpoint v24 — v10 corpus expansion: 21 popular Gītā verses + backfills

**Date:** 2026-05-08 (retrospective)
**Branch:** `implement-all-plans`
**Slice:** v10 slices A + H — corpus + backfills

## What changed

Loaded **21 of the most-recognised Gītā verses** (decodeIndex 5–25). Every new verse ships with:

- मूल (canonical Devanāgarī)
- पदच्छेद (best-effort split)
- `finiteVerbs[]` — the क्रिया anchor with full breakdown per verb (form, root, लकार, पुरुष, वचन, gloss)
- `anvaya` — SOV reordering
- `nonFinite[]` (कृदन्त) where applicable
- हिंदी + English
- `references` — Edwin Arnold (1885) + Annie Besant (1895), both PD
- `samasNotes[]` for 11 of 21 verses (where compounds are present)
- `sandhiNotes[]` for 5 of 21 verses (others to be backfilled)
- `vyakhya` (structural commentary) for the most-pedagogically-rich among them

The verses chosen are the cultural "greatest hits": **2.13** (childhood/youth/age), **2.14** (sense-contacts come and go), **2.22-23** (changing-clothes; soul cannot be cut), **2.47** (कर्मण्येवाधिकारस्ते — the most-quoted verse), **2.48** (समत्वं योग), **2.50** (योगः कर्मसु कौशलम्), **2.62-63** (the cause-chain: dwelling → attachment → desire → anger → delusion → ruin), **3.21** (leader sets the standard), **3.35** (better one's own dharma), **4.7-8** (यदा यदा हि / परित्राणाय साधूनां), **6.5-6** (आत्मना आत्मानम्), **6.30** (who sees Me everywhere), **6.34** (mind is restless), **9.22** (योगक्षेम), **9.27** (offer everything), **12.13** (qualities of a devotee), **18.66** (चरम-श्लोक).

Corpus now **25 verses** spread across **8 chapters** (1, 2, 3, 4, 6, 9, 12, 18).

## Tier distinction (locked in code via tests)

The original 4 verses (1.1, 2.3, 2.4, 2.5) remain "**fully decoded**" — full pipeline plus hand-curated `wordParsings` and Shankara/Ramanuja commentary positions. The 21 new verses are "**browse-tier**" — corpus-loaded but audit-pending. Tests gate by `wordParsings` presence so browse-tier verses don't fail per-word parsing assertions.

## Backfills (the user's "didn't do it thoroughly" complaint)

After the initial 21-verse drop, several Atlas surfaces were still showing only the original-4-verse data. Closed three gaps:

- **Compound Bank** (Atlas → Samāsa) — added `samasNotes[]` to 11 of the 21 verses. Bank goes 10 → 39 entries.
- **"Met in Gītā"** in Verbs sub-app — added `gitaOccurrences` for top-25 dhātus that appear in the new verses: √भू (4 verses), √कृ (5), √दा, √दृश्.
- **Sandhi notes** for 5 verses with obvious sandhi instances (the rest of the gap closes via the rule-level reference catalogue in checkpoint-25).

Vocabulary auto-grew (Words tab now ~250 entries was ~40); particle tally auto-grew; Practice card-seeder auto-grew; Verse Journey grid shows 25 saffron cells across 8 chapters.

## व्याख्या (structural commentary) — new verse-level field

Added `vyakhya: [{title, body}, ...]` to verses where the grammar reveals what the verse is doing. Distinct from टिप्पणी (References, which are translations + Shankara/Ramanuja school readings). Seeded on **14 verses**: 1.1 (the participle trap), 2.3 (three finite verbs three jobs), 2.4 (vocatives masquerading as objects), 2.5 (three verb-looking words ONE finite verb), 2.13 (yathā/tathā bridge), 2.22 (perfect parallelism), 2.47 (three escalating मा prohibitions), 2.62 (विभक्ति cascade), 2.63 (chain continues), 4.7 (cosmic conditional), 6.5 (आत्मन् in 4 cases), 9.27 (the five यत्-clauses + तत् structure with √कृ as meta-verb), 12.13 (no finite verb across the शloka boundary), 18.66 (three commands + one promise).

## Files touched

- [src/data/verses.js](src/data/verses.js) — 21 new entries + backfills on existing 4 (samasNotes, vyakhya)
- [src/data/dhatus.js](src/data/dhatus.js) — gitaOccurrences for √भू / √कृ / √दा / √दृश्
- [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — new <Vyakhya> sub-component renders the new section
- [src/styles.css](src/styles.css) — `.vyakhya-list`, `.vyakhya-card`, `.vyakhya-title`, `.vyakhya-body`
- Tests updated in `verses.refs.test.js` and `verses.parsings.test.js` to distinguish fully-decoded from browse-tier

## Verified

- `npm run build` clean
- `npm test -- --run` — 203/203 passing

## Not done in this slice

- Per-word `wordParsings` for the 21 browse-tier verses — covered instead by the shared dictionary (checkpoint-25)
- Shankara/Ramanuja summaries for browse-tier verses — only the original 4 carry these
- Detailed `keyFights` for browse-tier verses — only seeded where the structural insight is sharp (3.35, 12.13)
- 16 of the 21 verses don't yet have sandhiNotes — the rule-level reference catalogue in checkpoint-25 partially compensates
