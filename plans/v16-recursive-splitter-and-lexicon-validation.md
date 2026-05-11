# Plan v16 — Recursive lexicon-validated splitter + sandhi rule completeness

**Status:** Shipped. Tagged at `pre-dcs-migration`. Superseded by v19 (DCS integration).

## Context

After v14 (coverage + voice) and v15 (Pages deploy), the app shipped at https://yadavvi91.github.io/sanskrit-learning/ — but the autoDecode splitter was still producing mis-cuts on hundreds of chunks. The user was hand-flagging mis-cuts verse by verse over many sessions; every fix landed as a per-chunk `SPLITTER_OVERRIDES` entry plus optional KNOWN_SAMASAS annotation. The workflow wasn't scaling.

This plan covers the engineering moves taken to lift more of the work onto the engine and off per-chunk patches.

## Decisions locked (proposed; user-confirmed)

| Decision | Outcome |
|---|---|
| Build a recursive lexicon-validated splitter | Shipped (`recursiveSplit` in `decodeHelper.js`) |
| Wire all 21 Pāṇinian sandhi rule families | Catalogue complete in `sandhi.js`; 11 auto-firing, 10 gated `auto: false` |
| Expand KNOWN_SAMASAS lexicon | +60 hand-curated compound entries (now ~120 total) |
| Replace bulk-generated Latin roots with Devanāgarī | 469 conversions (`scripts/iast-to-deva-roots*.mjs`) |
| नञ्-bahuvrīhi heuristic in splitter | Shipped (skip `न + अ-X` splits for chunks ≥6 chars) |
| Canonical -ः visarga normalisation | Generic post-pass in `extractPadas` (e.g., `योगो → योगः`) |

## Implementation slices (all shipped)

### Slice 1 — `isPlausibleSplit` lexicon validation (`06ae0e4`, `11321f0`)

New `partHasRealVocab(part)` helper that checks lookupSharedVocab for non-suffix-inferred entries. `isPlausibleSplit` now requires at least one part of any multi-part split to have real vocab. Propagated into `splitNasalCompound`'s ELIDED_A/ELIDED_MATRA branches.

### Slice 2 — Recursive lexicon-validated splitter (`b44d45c`, `f56393a`)

New `recursiveSplit(chunk, depth)` function:
- Base case: chunk-as-whole in lexicon → return whole.
- Long chunks (≥12 chars): try undoSandhi candidates first, prefer the deepest split where all parts resolve recursively.
- Memoized via `RECURSIVE_SPLIT_CACHE`; bounded `depth ≤ 4`.
- Wired between vocab-hint and old undoSandhi loop in `extractPadas`.

### Slice 3 — Sandhi rule catalogue completed (`8f1054c`)

All 21 Pāṇinian sandhi families now have entries in `RULES` + `UNJOIN`:
- 5 अयादि (ay-adi)
- 8 ष्टुत्व (shtutva)
- 9 generic जश्त्व — t-jash-bha/ga/ba/ya (auto:false)
- 10 चर्त्व (cartva)
- 12 परसवर्ण (parasavarna)
- 13 छत्व (chatva)
- 15 णत्व (natva)
- 21 visarga+र् (visarga-r)
Newly added rules are gated `auto: false` consistent with the जश्त्व family — they need lexicon-validated splitting to fire safely without over-cutting intra-compound clusters.

Inventory comment at the top of `sandhi.js` is the running tracker.

### Slice 4 — नञ्-bahuvrīhi heuristic (`1a7c24a`)

In `recursiveSplit`, candidate splits where `parts[0] === 'न'` and `parts[1]` starts with `अ/आ` and the chunk is ≥6 chars are skipped. This is the नञ्-समास Sanskrit convention: `न-` before vowel-initial member forms one compound, not two words.

### Slice 5 — Canonical visarga normaliser (`c300bc2`)

Post-pass in `extractPadas`: chunks ending in `-ो` get normalised to `-ः` (canonical form) unless they're on a small whitelist of legit `-ो` words (गो, द्यो, भो, अहो, अथो, नो, सो). Resolves dozens of "योगो vs योगः" complaints in one rule.

### Slice 6 — KNOWN_SAMASAS expansion (`8f1054c`)

+60 hand-curated entries spanning:
- तत्पुरुष chains (ब्रह्मचर्य, ब्रह्मभूत, ब्रह्मसंस्पर्श, धर्मक्षेत्र, कुरुक्षेत्र, सर्व-धर्म/कर्म/भूत/गत, etc.)
- सम-X bahuvrīhi (सम-दर्शिन्, सम-चित्त, सम-बुद्धि, सम-दुःख-सुख, etc.)
- नित्य- prefixes
- -चेतस्/-आत्मन्/-हृदय family (विगत-स्पृह, विगत-ज्वर, विगत-भी, गत-व्यथ, गत-असु, etc.)
- द्वंद्व pairs (काम-क्रोध, राग-द्वेष, etc.)
- Ego/self compounds (अहम्-कार, आत्मवश्य, आत्मसंस्थ, etc.)
- Epithets (कुरुनन्दन, भरतर्षभ, पुरुषोत्तम, महात्मा, etc.)
- 5 Pandava conches (पाञ्चजन्य, देवदत्त, पौण्ड्र, अनन्त-विजय, सुघोष, मणिपुष्पक)

### Slice 7 — Latin-roots sweep (`5464d32`, `79b71c1`, `34e938b`)

Two scripts (`scripts/iast-to-deva-roots*.mjs`) converted 469 Latin-only `root:` fields across `_vocab_extended_part1-10.js` to Devanāgarī. Pass 1: 341 entries (Latin-leading). Pass 2: 126 entries (√-prefixed Latin like `√bhu` → `√भू`). Mop-up: 2 hyphen-prefixed fragments (`-ti`, `-tra`). Plus 37 hand-corrections for diacritic-stripped mistakes (`avesita-cetas` → `आवेशित-चेतस्`, etc.).

### Slice 8 — Corpus-wide hand-fix sweep (multiple commits, BG 5.10 through 8.8)

User-flagged per-verse decompositions, accumulated over many sessions:
- 5.10–5.20 (15+ overrides) → ब्रह्मण्याधाय, पद्मपत्रमिवाम्भसा, संन्यस्यास्ते, etc.
- 6.1–6.20 (many overrides) → योगारूढ, यतचित्तेन्द्रियक्रिय, etc.
- 6.21–6.27 → शान्तिमृच्छति, ज्ञानविज्ञानतृप्तात्मा, etc.
- 7.1, 7.14–7.27 → मय्यासक्तमनाः, मायया-अपहृत-ज्ञान, etc.
- 8.8 → नान्यगामिन् as नञ्-bahuvrīhi
- 12.7 → मृत्युसंसारसागरात्, मय्यावेशितचेतसाम्
- 17.x, 18.x → various

## Verification

- 582/582 tests pass.
- Production build clean.
- Tag `pre-dcs-migration` placed at `1a7c24a` for rollback if needed.

## What this plan did NOT solve

The fundamental problem is unchanged: the home-rolled splitter is making decisions a hand-annotated dataset has already made correctly. Every SPLITTER_OVERRIDES entry is a workaround for the splitter being a stand-in for the real lexicon work that DCS / vidyut already do. The recursive splitter helps but doesn't eliminate this.

## Relation to other plans

- v15 deployed the app
- v16 (this plan) tried to make the home-rolled splitter competent enough to be the long-term answer
- v19 (next) acknowledges the home-rolled splitter as architectural dead-end and migrates to DCS as primary
