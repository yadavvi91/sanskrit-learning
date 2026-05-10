# Checkpoint 38 — engine and classifier hardening (Slice A of v14)

**Date:** 2026-05-09 → 2026-05-10

## Trigger

Continuation of the post-[v13](../plans/v13-corpus-scale.md) audit. The bulk-imported 701-verse corpus produced visible failures across every reading session:

1. **Mis-split sandhi blobs** producing garbage padas (`अग्निर्भस्म्` + `असात्कुरुते`, `मरीचिर्म्` + `अरुतामस्मि`, `तदः` + `ति`).
2. **Missing finite-verb classes**: passive `-यते`, defective `√अह्` (आहुः / प्राहुः), irregular विधिलिङ् `-यात्`, आत्मनेपद imperatives.
3. **No सन्धि section on Ch 3+ verses** — the autoDecode engine WAS producing `sandhiNotes` for auto-stub verses, but the hydrator silently dropped them.
4. **No समास derivation**: hand-decoded verses (Ch 1, 2.5) showed proper समासविग्रह; auto-stub verses showed nothing.
5. **Predicate-PPP verses mis-classified** as "implied अस्ति" — the verse 1.33 has काङ्क्षितम् + अवस्थिताः as predicates, but the popover showed the generic nominal-sentence message.
6. **विभूति योग chain-starter (10.20)** showing "implied अस्ति" instead of the actual implicit `अस्मि` from the अहम् subject.
7. **Section order in VerseDetail** put क्रिया + विभक्ति + विवेकः above अन्वय / English. Reading flow needed translation right after the split.
8. **Anuvrtti regression bug**: 1.8 (Duryodhana's warrior list) had a "predicate carries over from verse 1.7" note in `keyFights` text but no structured `anuvrtti` field, so the popover showed generic "implied अस्ति" instead of "carry-over from 1.7's ब्रवीमि."

## What changed

### Patterns + engine signals

- New entries in `patterns.js` + matching docs in `patterns-won.md`: passive voice (-यते), defective verb √अह्, यथा-तथा structure (verb governs across the simile), अनुवृत्ति-within-a-verse (विभूति योग अस्मि carry-over), आत्मनेपद लट् -ते ending.
- `decodeHelper.js` LAKARA_SIGNALS extended: `-यते` / `-यन्ते` (passive), `-यात्` (irregular विधिलिङ्), आत्मनेपद imperatives `-स्व` / `-ध्वम्` / `-न्ताम्` / `-ताम्`.
- `DEFECTIVE_AH_FORMS` map at the top of `classifyFiniteVerb` — hard-codes आह / आहतुः / आहुः / प्राह / प्राहुः as लिट्, bypassing both vocab and regex.

### Ch 2 hand-decoded

- Background agent landed `_ch2_overrides.js` with all 60 entries (साङ्ख्ययोग verses minus the 13 inline-decoded). Wired into `verse-overrides.js`.

### Splitter fixes

- **LEFT-conjunct guard** on `splitMakaraCompound` Pattern B + Pattern C: skip when `chunk[i-1]` is a virama. The म in -र्म-, -श्म-, -ष्म- is conjunct-internal, so the prefix `slice + '्'` would be junk like `मरीचिर्म्`. Real -м् pada-endings come from a vowel/matra immediately before म.
- **Tier-1b override** when suffix is a vocab-recognized verb form. Frees `अस्मि` from `मरुतामस्मि`.
- **`BOGUS_SHORT_FRAGMENTS`** in `isPlausibleSplit`: `ति`, `सि`, `मि`, `ष्य`, `स्य`, `त्व`. Verbal-ending fragments that are never standalone padas. Kills `तदस्ति → तदः + ति` hallucinated visarga.
- **Vocab-trust length guard** bumped 14 → 25. The agent vocab has correct embedded-verb tagging on sandhi blobs the splitter can't yet decompose (पराण्याहुरिन्द्रियेभ्यः → √अह् लिट्); the old guard rejected useful identifications.

### Vocab-hint pre-pass (`d884cf5`, then improved in `9b69663`)

`VOCAB_HINT_SPLITS` map built once at module load by parsing `(X + Y)` parentheticals out of `VOCAB_EXTENDED` glosses. Validated by canonical-form join equality (viramas + avagraha + candrabindu stripped, matras mapped to vowel-letters, anusvara `ं` → `म`). 90 valid hints initially, jumped to 121 after the anusvara canonical fix (catches `विष्टभ्याहमिदं ↔ विष्टभ्याहमिदम्`).

### Visarga-र् sandhi splitter (`91e4e1a`)

- **Pattern A**: `र + ् + voiced-consonant` (visarga before consonant). LEFT-conjunct guard prevents conjunct-internal -्र- (द्र, ब्र, ग्र) from mis-splitting.
- **Pattern B**: `र + V-matra` (visarga before vowel-letter — the next word's initial vowel attaches as a matra on the joining र; no virama written). Catches `पराण्याहुरिन्द्रियेभ्यः → पराण्याहुः + इन्द्रियेभ्यः`.
- Validation: either half lexicon-recognized OR both ≥5 chars on a ≥15-char chunk. Internal -र-`<matra>` false-positive cases (कुरुते, मरुत्, पुरुष, ब्रह्मनिर्वाणम्, अन्तर्यामी) all have one half <5 chars, so the length filter rejects them.

### Upasarga-aware verb classifier (`91e4e1a`)

`classifyFiniteVerb` falls back to `stripUpasargas + lookupSharedVocab(stripped)`. On match, prepends the prefixes to the displayed root. `उपसेवते → उप + √सेव्`.

### autoDecode second-pass classifier

When the splitter further decomposes a chunk that the agent vocab knew as a joined verb form (`स्यात्त्रिभिर्गुणैः → स्यात्त्रिभिः + गुणैः`), neither half classifies but the original chunk does. Try the chunk too so the क्रिया card survives the deeper split.

### sandhiNotes plumbed from autoDecode (`7acf9cd`)

Was dropped on the floor in `hydrate.js` — the engine produced sandhi notes but the hydrator only pulled `padaccheda` and `finiteVerbs`. Plumbed through. **Ch 3+ सन्धि coverage 0% → 87.6%** (510 / 582 verses).

### samasNotes derivation (`d45a82d`, `dd950fd`)

Two-tier derivation in the hydrator:
1. **Vibhakti-extracted**: `parseSamasaFromVibhakti` walks each verse's vibhaktiNotes for type-tagged compounds matching `<compound> → <vibhakti> ... <type> "<gloss>"` patterns. Recognises तत्पुरुष / बहुव्रीहि / द्वंद्व / कर्मधारय / अव्ययीभाव plus case-prefixed variants. Hyphenated padaccheda entries prefix-matched against the parsed list (handles sandhi-modified visible forms: `सम्प्लुत-उदके` ↔ `सम्प्लुतोदके`).
2. **Bare structural derivation**: when no vibhakti type-tag matches, generate compound entry from hyphenated padas with empty type (later upgraded with per-component glosses + heuristic type in [Slice C](checkpoint-40.md)).

### Anuvrtti tagging regression test (`2760c24`)

`anuvrtti-tagging.test.js` walks every `finiteVerbs: null` verse and asserts: if any of the narrative notes (keyFights / vibhaktiNotes / sandhiNotes) contain phrasing like "carries over", "gapped", "from verse X.Y", "verb-chain continues", the structured `anuvrtti` field MUST be populated. Caught 3 misses (1.8, 1.34, 2.43); all fixed.

### Predicate-PPP / predicate-adjective surfacing (`7e9077e`, `9394ae1`)

`parsePredicatePPPsFromVibhakti` extracts kṛdanta predicates from vibhaktiNotes. Pattern: any note containing both "PPP" / "past-passive" / "predicate adjective" / "gerundive" AND "predicate" / "serves as". `VerseDetail` renders a sage-bordered sub-block with explainer ("English forces 'was X', Sanskrit lets a PPP carry the predicate force directly") when finiteVerbs is null. Auto-fires on 1.33 (काङ्क्षितम् + अवस्थिताः), 2.20 (4 stacked: अजः नित्यः शाश्वतः पुराणः), 2.24 (9 stacked: अच्छेद्यः अदाह्यः अक्लेद्यः अशोष्यः नित्यः सर्वगतः स्थाणुः अचलः सनातनः).

### विभूति chain-starter tagging (`9e9b151`)

`_ch10_overrides.js` for 10.20 with `implicitVerb: 'अस्मि'` + `implicitVerbMeaning: 'I am — 1st-person singular of √अस्'` + keyFights notes flagging the chain-starter status. 10.21+ already classify cleanly because each repeats अस्मि.

### Section reorder in VerseDetail (`10be08a`)

Reading flow first (मूल → पदच्छेद → अन्वय → हिंदी → English), grammar analysis below (क्रिया → विभक्ति → विवेकः → व्याख्या). Casual read flows top-to-bottom; deep grammar work is on demand.

### Primer additions (`9387d64`, `9394ae1`)

- **"Verb-displacement patterns"** section (between *Finding the finite verb* and *विभक्ति*) — four-row table covering Predicate PPP / अनुवृत्ति / यथा-तथा / Defective √अह्.
- **"Obscure points — gotchas worth bookmarking"** reference table — 15 rows with full provenance (rule / what's happening / verse · word / why it's easy to miss). Covers compound declension follows उत्तरपद, defective √अह्, both visarga-र् patterns, implicit virama drop, anusvara ↔ -म्, predicate-PPP stacking, अनुवृत्ति, यथा-तथा, आत्मनेपद imperatives, passive -यते, irregular विधिलिङ् -यात्, एक-वाक्यता vs अनुवृत्ति, कर्म as -न् stem, periphrastic future.

## Tests

580 passing across 40 files. New regression tests:
- `splitter-bugs.test.js` — locks in correct behavior on 6 audit-flagged verses (3.42, 4.37, 9.6, 10.21, 18.3, 18.40), the LEFT-conjunct guard preserves धर्मक्षेत्रे, the vocab-validated split frees अस्मि.
- `anuvrtti-tagging.test.js` — guards against future agent batches forgetting the structured field.
- `coreVocab.test.js` — pronoun decl. lookups, common a-stem nouns, krdanta classifications.
- Extended `hydrate.test.js` with samasNotes-derivation, predicate-PPP extraction, vibhakti-extracted vs derived-from-padaccheda source distinction.

## What's left for later slices

- 953 distinct missing padas after Slice A. Vocab buildout in [Slice B](checkpoint-39.md).
- Many verbs whose root isn't in the top-192 list still dump to `/primer#lakara`. Stub-generation in [Slice C](checkpoint-40.md).
- Compound popover priority over suffix-inferred parsing (परम-इष्वासः bug). Fixed in [Slice D](checkpoint-41.md).
