# Plan v13 — Scale the corpus from 25 verses to 701 (the full Gītā)

> **Status:** Draft, awaiting decisions before implementation. This is a forward-looking plan (not retrospective like v10-v12).

## Context

We've shipped a working learning environment over [v0](v0-foundation.md) → [v12](v12-noun-declension-reference.md) with 25 decoded verses. The pedagogical surfaces (Vocabulary, Patterns Won, Practice cards, Compound Bank, Sandhi rules, Declensions, Pronouns) all auto-grow from `verses.js`. Every increase in verse count multiplies the value of every reference surface.

Target: **the full Bhagavad Gītā = 701 verses** (chapters.js confirmed: 47+72+43+42+29+47+30+28+34+42+55+20+35+27+20+24+28+78). That's a **28× scale factor** on the corpus.

Naive math: at our current ~30-60 min per fully-decoded verse, 701 × 45 min ≈ 525 hours. Not realistic by hand. The plan needs to (a) tier the depth of decoding, (b) lean on the existing auto-decode engine, and (c) not block the user on translation rights.

## Scope realities

What's in `verses.js` for a single verse, fully decoded:

| Field | Required for | How produced |
|---|---|---|
| `chapter`, `verse`, `decodeIndex`, `title` | identification | trivial |
| `mool[]` | display, search, anvaya | from a corpus source (PD or fair use) |
| `padaccheda[]` | Vocabulary, popovers, finite-verb chip | undo-sandhi + word-split (`autoDecode`) |
| `sandhiNotes[]` | per-junction explanations | hand-curated; engine helps |
| `samasNotes[]` | Compound Bank | hand-curated; pattern-recognition |
| `finiteVerbs[]` | क्रिया chip + Patterns | engine-detected, hand-audited |
| `nonFinite[]` | absolutives / participles / infinitives | hand-curated |
| `wordParsings{}` | popover grammar + Vocabulary case info + Atlas paradigm classifier | per-word: category, root, gender, number, case, gloss, note (~12-15 words/verse) |
| `vibhaktiNotes[]` | optional pedagogical commentary | hand-written |
| `keyFights[]` | optional "what trips you up" | hand-written |
| `anvaya` | अन्वय section | hand-rewritten in default-SOV order |
| `hindi`, `english` | translations | from PD source or original |
| `references{translations[], commentaries[]}` | टिप्पणी block | PD translators + summarised tradition |
| `vyakhya[]` | optional structural commentary | hand-written |

**The expensive items** are `wordParsings` (12-15 entries × 701 verses = ~10,000 entries), `samasNotes`, `vyakhya`, `vibhaktiNotes`. The cheap items are `mool`, `hindi`, `english`, `references` — these can be bulk-imported.

## Decisions locked (proposed; user to confirm before implementation)

| Decision | Proposal | Rationale |
|---|---|---|
| Tiering scheme | Four tiers — see below | Honest about how much human effort each verse gets |
| Translators in bulk | Edwin Arnold (1885) + Annie Besant (1895) for all 701; both PD | We already use them on the existing 25; consistent attribution |
| Mool source | GRETIL or holy-bhagavad-gita.org or IIT Kanpur OCR — pick ONE and cite | Avoid mixing recensions silently |
| Recension | "Vulgate" 700-verse Gītā as found on holy-bhagavad-gita.org (matches `chapters.js`) | The user's existing reading + reference site |
| Bundle strategy | Lazy-load chapter chunks via dynamic `import()` | At ~28× the data, eager bundle goes 485KB → ~10MB; not acceptable |
| Auto-stub workflow | Run `autoDecode` over all verses, save result with `tier: 'auto-stub'` flag, surface "draft — audit me" banner in UI | Reuses existing `DecodeHelper` engine; engine produces stubs with confidence levels |
| Per-tier UI | Tier badge on verse-cell + verse-detail header | User knows what to expect when clicking a cell |
| Test suite changes | Relax "exactly 25 verses" assertions → "at least N" | 50+ tests currently assume verse count |

### Proposed tier scheme

| Tier | Field set | Target count | Effort/verse | When user sees this tier |
|---|---|---|---|---|
| **Tier 1 — full** | All fields including wordParsings, samasNotes, vyakhya, references | ~50 verses | 45-90 min, hand-curated | "Decoded" rail + Patterns Won + Vocabulary + drill prompts |
| **Tier 2 — browse** | mool + padaccheda + finiteVerbs + nonFinite + anvaya + hindi + english + references; selective sandhi/samasa; selective wordParsings | ~150 verses | 10-15 min, autodecoded then audited | Verse Detail with full pipeline; verse cell shows "browse" badge |
| **Tier 3 — auto-stub** | mool + auto-stub padaccheda + tentative finiteVerbs + 1-2 PD translations | ~501 verses (the rest) | 1-2 min, engine-only, NOT human-verified | "Draft — audit me" banner; sandhi/samasa/wordParsings absent; translations are PD bulk |
| **Tier 4 — fallback** | mool + holy-bhagavad-gita.org link only | 0 — covers gaps | n/a | "Not yet decoded — open external" link |

The current 25 verses become Tier 1 (the 4 originals 1.1, 2.3-5) + Tier 2 (the 21 newer browse-tier verses).

### Numbers

- Tier 1: 50 verses → 50 × ~13 wordParsings = ~650 entries (hand-curated)
- Tier 2: 150 verses → 150 × ~13 = ~1,950 entries (auto-decoded + audited; ~8 min/verse to audit)
- Tier 3: 501 verses → no wordParsings; engine padaccheda only
- Translations: Arnold and Besant for all 701 verses = ~1,400 PD translation entries (one-time bulk import)

Estimated bulk-ingest scripting + audit work: **~80 hours total** vs ~525 hours fully manual. The infra is the leverage.

## Process rules (continued)

- Small commits per coherent slice (corpus-import is a separate commit from UI tier-badge etc.)
- Build green + tests green at every commit boundary
- Per-meaningful-task `checkpoint-N.md`
- New algorithmic code (importer, tier-router, chunk-loader) gets unit tests in the same commit
- Bulk text-data commits don't need per-line tests; relaxed-count tests + sanity tests are enough

## Implementation slices

Substantial scope. Each slice is one or more commits.

### Slice A — Source decision + sample import (no code changes yet)

- Pick ONE source for the 701 mool. Audit a sample (e.g. 10 verses across 5 chapters) for typos and recension-drift relative to our existing `verses.js`. Document the choice in `plans/v13-corpus-scale.md` Appendix.
- Pick PD translation sources: Arnold (already have for 5 verses), Besant (already have for 12). Confirm both are present for all 701 in some accessible digital corpus — e.g., archive.org or a curated text dump.

**Out:** No code changes. Document and commit.

### Slice B — Importer scripts (one-shot, not shipped in app bundle)

**Files (new, in `scripts/`):**
- `scripts/import-mool.mjs` — fetch (or read from local cache) the 701 mool, write a JSON file `data-import/mool.json` keyed by `chapter.verse`.
- `scripts/import-translations.mjs` — same for Arnold + Besant.
- `scripts/run-autodecode.mjs` — for each verse, call existing `autoDecode(mool)` from `src/utils/decodeHelper.js`, capture the stub, persist to `data-import/auto-stubs.json`.

**Output:** Three JSON files in `data-import/` (gitignored). Not yet wired to the app.

**Tests:** Smoke tests that (a) the JSON shapes match what verses.js expects, (b) every chapter:verse pair from `chapters.js` is covered.

### Slice C — Tier system in the data shape

**Files:**
- `src/data/verses.js` — extend the verse object schema with optional `tier: 'full' | 'browse' | 'auto-stub' | 'fallback'`. Default = `'browse'` for backward compat. The 4 originals get `tier: 'full'`; the 21 newer verses get `tier: 'browse'`.
- `src/data/chapters.js` — already has `verseCount`; no change needed.
- New helper `getVerseTier(chapter, verse)` returning the tier string.

**UI changes:**
- `VerseDetail.jsx` — render a small tier badge in the header (e.g. "decoded fully" / "browse-tier" / "auto-stub draft").
- Verse-cell in chapter grid — colour-code by tier (saffron = full, saffron-soft = browse, parchment-deep = auto-stub, locked = fallback).

**Tests:** Existing assertions like "no padaccheda word has empty gloss" need to gate on tier ('full' + 'browse' must have glosses; 'auto-stub' is exempt).

### Slice D — Bulk merge of all 701 mool + translations + auto-stubs into verses.js

**Files:**
- `src/data/verses.js` — adds 676 new verses, all at `tier: 'auto-stub'` initially. Each entry has: `chapter`, `verse`, `decodeIndex` (sequential continuation), `mool`, `padaccheda` (from autoDecode), `finiteVerbs` (from autoDecode), and a `references` block with Arnold + Besant from the translation imports. Other fields (samasa/vyakhya/wordParsings/etc.) are absent.

**Bundle impact:** estimate +6-9MB raw, ~1-1.5MB gzipped. **Not acceptable as one bundle.**

### Slice E — Lazy-load by chapter

**Files:**
- `src/data/verses/` — split `verses.js` into 18 chapter files, e.g. `src/data/verses/01.js`, `02.js` ... `18.js`. Each exports a `CHAPTER_VERSES` array.
- `src/data/verses.js` — becomes a thin orchestrator: provides `getVerse(c, v)` that does dynamic `import('./verses/' + cc + '.js')` and caches.
- `getVerse` becomes async. Every consumer needs to handle Promise.

**Async cascade:** every component that calls `getVerse(c, v)` synchronously becomes a hook with a useEffect. ~7 components affected (VerseJourney, VerseDetail, PatternsWon if it does verse lookup, Vocabulary, Vocabulary tests, etc.).

**Migration path:**
1. Keep `getVerse` synchronous-by-cache: on first call to chapter N, fire async load + return null; on the next render the cache is populated and the call returns the verse. Use a small cache hit indicator.
2. OR: bulk-load chapter on first hit of any verse from that chapter — simpler for verse-detail (which already shows a single verse), trickier for vocabulary/patterns (which need ALL verses).
3. OR: pre-load chapter 1 + 2 (most common) on app boot, lazy others.

**This slice is the biggest engineering risk.** Likely 2-4 commits + extensive test changes.

### Slice F — Vocabulary tab scaling

**Files:**
- `src/components/Vocabulary.jsx` — already paginated at 50 rows; verify behaviour at ~3,000 entries. Add a chapter filter chip row (chapter 1 / 2 / .../ 18) to narrow.
- `src/utils/vocabulary.js` — auto-grow scanner already exists; with 701 verses and 13 words/verse = ~9,000 candidate words, after de-duplication probably ~3,500 unique words. Verify performance.

**Tests:** `vocabulary.test.js` assertions about word count gain a `>= N` check.

### Slice G — Search scaling

**Files:**
- `src/utils/verseSearch.js` — existing implementation iterates all verses. Verify acceptable performance at 701. If not, add basic indexing.

### Slice H — Tier-aware UI affordances

**Files:**
- Verse cell colour-coding (Slice C extends this)
- Verse Detail header — "decoded fully" / "browse-tier" / "auto-stub — please audit" badge
- "Audit this verse" button on auto-stub verses → opens DecodeHelper pre-populated with this verse's mool + chapter/verse
- `<details>` blocks for `samasNotes`, `vyakhya`, etc. — render only if present (already the case for most; verify)
- "How to upgrade a verse from auto-stub to browse" doc snippet

### Slice I — Promote N verses from auto-stub → browse → full

The actual content work. Not a single commit but a flow of small commits, each promoting one verse:

- Pick a verse from auto-stub
- Open in DecodeHelper, audit padaccheda, write samasNotes, write wordParsings
- Update its `tier` field to `'browse'` or `'full'`
- Commit "promote 5.18 from auto-stub to browse"

This becomes ongoing maintenance work; the plan ships the *capacity* to do it efficiently.

### Slice J — Test-suite relaxation

**Files:**
- `src/data/sharedVocab.test.js` — "no padaccheda word has empty gloss" is currently corpus-wide; needs to gate on tier (only 'full' + 'browse' enforced, not 'auto-stub').
- `src/data/primer.test.js` — "every case has a wordParsing entry" still holds (we have wordParsings on 25 verses already).
- `src/components/VerseDetail.test.jsx` — corpus-wide finite-verb-chip test; gate on tier.
- `src/__tests__/app.integration.test.jsx` — verse-cell click tests likely use chapter 1 / 2 verses; should still work.
- `src/utils/vocabulary.test.js` — assertion about exact word counts becomes `>=`.
- All test changes preserve the current 25 strict checks; just gate the broader assertions.

### Slice K — Documentation + checkpoint trail

- `docs/workflows.md` — update affected workflows; add "audit-an-auto-stub" workflow.
- `CLAUDE.md` — explain the tier system + how to promote a verse.
- Per-slice `checkpoint-N.md`.
- After all of A-J ship, write `plans/v13-corpus-scale.md` retrospective sections (currently this file is forward-looking).

## Critical files (modification summary)

| File | Slice | Change |
|---|---|---|
| `scripts/import-mool.mjs` (new) | B | One-shot importer |
| `scripts/import-translations.mjs` (new) | B | One-shot importer |
| `scripts/run-autodecode.mjs` (new) | B | Bulk auto-stub generation |
| `src/data/verses/01.js` … `18.js` (new) | E | Per-chapter splits |
| `src/data/verses.js` | C, D, E | Tier field + becomes orchestrator |
| `src/data/chapters.js` | — | Unchanged |
| `src/components/VerseDetail.jsx` | C, H | Tier badge + audit button + async-aware |
| `src/components/VerseJourney.jsx` | E, H | Async verse load + tier-coloured cells |
| `src/components/DecodeHelper.jsx` | H | Pre-populate from verse mool when invoked from "audit this verse" |
| `src/utils/vocabulary.js` | F | Verify scaling |
| `src/utils/verseSearch.js` | G | Verify scaling |
| `src/data/{primer,patterns,glossary}.js` | C | "Decoded so far" counts derive from `tier in ['full', 'browse']` |
| Test files (multiple) | J | Tier-gated assertions; relaxed counts |

## Verification

**Per-slice CI:**
- `npm test -- --run` — all relaxed but green
- `npm run build` — bundle size monitored; alert at >800KB pre-lazy-load, >300KB initial chunk after lazy-load

**End-to-end after Slice E (lazy-load):**
- Click verse 11.50 (a chapter-11 verse not previously loaded) → renders within 100ms
- Open Vocabulary tab → all 3000+ words eventually accessible
- Search "धर्म" → finds across all chapters

**End-to-end after Slice H (tier-aware UI):**
- Open an auto-stub verse → see "draft — audit me" banner
- Click "Audit" button → DecodeHelper opens with that verse's mool pre-populated
- Promote a verse to 'browse' → see Vocabulary entries appear

## Out of scope (explicitly deferred)

- Tier 1 promotion of more than 50 verses initially — incremental work after the infrastructure ships
- Translations beyond Arnold + Besant — Eknath Easwaran, Bibek Debroy, Adi Shankara, Madhusudana Sarasvati commentaries are NOT public domain; would need licensing
- Audio (recitation) per verse
- Mobile / iOS app — separate concern
- Mahābhārata, Rāmāyaṇa, Upaniṣads — Gītā only

## Open questions for the user (before implementation)

1. **Source of mool text:** GRETIL (academic, well-attested) vs holy-bhagavad-gita.org (matches our reference link) vs IIT Kanpur OCR (matches the user's earlier IIT Kanpur Sundarkand work)?
2. **Tier 1 target count:** 50 looks reasonable; could be 25 (just keep current) or 100 (more substantive). Trade-off is hand-curation hours.
3. **Lazy-load strategy:** synchronous-by-cache, eager-on-chapter-hit, or pre-load-chapter-1+2 + lazy others?
4. **Bundle ceiling:** What's the acceptable gzipped size? (Current 153KB; target ~250-300KB initial chunk + chapter chunks 50-100KB each?)
5. **Additional translations:** stick to Arnold + Besant, or chase down a third PD translator (e.g. Sir Edwin Arnold has a competitor in J. Cockburn Thomson 1855)?
6. **Auto-stub UI tone:** "auto-stub draft" feels engineering. Alternatives: "computer-aided", "preliminary", "audit-pending"?
7. **External-link fallback:** Tier 4 just shows a holy-bhagavad-gita.org link; OK?
8. **Promotion workflow:** Should "audit-this-verse" land in DecodeHelper, or open a new editor surface with the existing fields pre-populated?

## Relation to other plans

- **Builds on v9** (Decode Helper). The autoDecode engine becomes the bulk-import workhorse. v9's per-verse audit becomes the per-verse promotion path.
- **Builds on v10** (sharedVocab + samasaRefBank). The reference data is independent of corpus size — those don't scale.
- **Builds on v11** (test coverage + workflows). Test relaxation in Slice J leans on the existing test infrastructure.
- **Builds on v12** (declensions). The classifier already covers nouns; works on any new wordParsings entries automatically.
- **Doesn't supersede anything.** Pure expansion.

## Estimated total effort (rough)

| Slice | Effort |
|---|---|
| A — source pick + sample audit | 2 hours |
| B — importer scripts | 4-6 hours |
| C — tier field + UI badge | 2-3 hours |
| D — bulk merge into verses.js | 1 hour (after B) |
| E — lazy-load by chapter | **8-12 hours** (riskiest) |
| F — vocabulary scaling | 1-2 hours |
| G — search scaling | 1 hour |
| H — tier-aware UI affordances | 3-4 hours |
| I — promote N verses | ongoing; ~10 min/verse for browse, 60 min/verse for full |
| J — test-suite relaxation | 3-4 hours |
| K — docs + checkpoints | 2 hours |
| **Total infra (A-H + J + K)** | **~30-40 hours** |

The user does the Slice I content work over time; the plan provides infrastructure that makes it efficient.
