# Plan v13 — Scale the corpus from 25 verses to 701 (the full Gītā)

> **Status:** Draft, awaiting decisions before implementation. This is a forward-looking plan (not retrospective like v10-v12).

## Context

We've shipped a working learning environment over [v0](v0-foundation.md) → [v12](v12-noun-declension-reference.md) with 25 decoded verses. The pedagogical surfaces (Vocabulary, Patterns Won, Practice cards, Compound Bank, Sandhi rules, Declensions, Pronouns) all auto-grow from `verses.js`. Every increase in verse count multiplies the value of every reference surface.

Target: **the full Bhagavad Gītā = 701 verses** (chapters.js confirmed: 47+72+43+42+29+47+30+28+34+42+55+20+35+27+20+24+28+78). That's a **28× scale factor** on the corpus.

**Correction to an earlier draft of this plan:** an initial estimate said "45-90 min per fully-decoded verse" extrapolating to ~525 hours. That number was wrong. It costed the work as if a single human were writing all the Sanskrit grammar from scratch from a textbook. In practice we pair-decode — the AI proposes wordParsings / samasNotes / vyakhya with grammar accuracy, the user audits. Empirical rate from earlier in this same session: the 21-verse `wordParsings` backfill (~250 entries across 21 verses) took about 30-40 minutes — roughly **1.5-2 min/verse for browse-tier; 5-10 min/verse for full-tier (with samasNotes + vyakhya)**. The bottleneck is the user's audit attention, not raw transcription time.

Implication: the realistic per-verse rate is what makes the 28× scale tractable in the first place. The plan still needs to tier the depth of decoding, lean on `autoDecode` for batch padaccheda, and avoid blocking on translation rights — but the gross effort number is **~10-15 hours of content work**, not 80-525.

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
| Bundle strategy | **Single bundle, no lazy-load** initially. Re-evaluate when gzipped size exceeds ~3 MB | At realistic tiering, bundle is ~1.8 MB gzipped — manageable. Lazy-loading is over-engineering until we hit a concrete problem |
| Auto-stub workflow | Run `autoDecode` over all verses, save result with `tier: 'auto-stub'` flag, surface "draft — audit me" banner in UI | Reuses existing `DecodeHelper` engine; engine produces stubs with confidence levels |
| Per-tier UI | Tier badge on verse-cell + verse-detail header | User knows what to expect when clicking a cell |
| Test suite changes | Relax "exactly 25 verses" assertions → "at least N" | 50+ tests currently assume verse count |

### Proposed tier scheme

| Tier | Field set | Target count | Effort/verse | When user sees this tier |
|---|---|---|---|---|
| **Tier 1 — full** | All fields including wordParsings, samasNotes, vyakhya, references | ~50 verses | **5-10 min** pair-decoded (AI writes, user audits) | "Decoded" rail + Patterns Won + Vocabulary + drill prompts |
| **Tier 2 — browse** | mool + padaccheda + finiteVerbs + nonFinite + anvaya + hindi + english + references; selective sandhi/samasa; selective wordParsings | ~150 verses | **1.5-2 min** pair-decoded (autodecoded then audited) | Verse Detail with full pipeline; verse cell shows "browse" badge |
| **Tier 3 — auto-stub** | mool + auto-stub padaccheda + tentative finiteVerbs + 1-2 PD translations | ~501 verses (the rest) | **0 min** — bulk script output, NOT human-verified | "Draft — audit me" banner; sandhi/samasa/wordParsings absent; translations are PD bulk |
| **Tier 4 — fallback** | mool + holy-bhagavad-gita.org link only | 0 — covers gaps | n/a | "Not yet decoded — open external" link |

The current 25 verses become Tier 1 (the 4 originals 1.1, 2.3-5) + Tier 2 (the 21 newer browse-tier verses).

### Numbers

- Tier 1: 50 verses × ~13 wordParsings = ~650 entries (pair-decoded; ~5-10 min/verse) → **~6 hours**
- Tier 2: 150 verses × ~13 = ~1,950 entries (auto-decoded + audited; ~1.5-2 min/verse) → **~4 hours**
- Tier 3: 501 verses → no wordParsings; engine padaccheda only → **0 hours content**, ~6 hours scripting (one-time)
- Translations: Arnold and Besant for all 701 verses = ~1,400 PD translation entries (one-time bulk import)

Estimated total: **~25-30 hours** (10-15h content + 10-15h infra), not the 80h the earlier draft claimed.

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

### Slice E — Lazy-load by chapter (DEFERRED — likely unnecessary)

**Updated assessment.** An earlier draft of this plan called Slice E "the biggest engineering risk" and assumed the bundle would balloon to ~10MB. Re-checking the math:

- Today: 25 verses ≈ 153 KB gzipped (the full app)
- 701 verses if EVERY verse were fully decoded: ~3-4 MB gzipped (substantial)
- 701 verses with realistic tiering (50 full + 150 browse + 501 auto-stub): **~1.8 MB gzipped**

1.8 MB gzipped is fine for a personal-learning SPA on desktop. Modern apps routinely ship that. Mobile on slow connections would feel it; desktop won't notice. **This is over-engineering at this scale.**

**Deferral conditions** — implement Slice E later if and only if one of these is hit:
- Bundle gzipped size exceeds ~3 MB (would happen if Tier 1 grows past 200 verses, or Tier 2 past 400)
- First-paint time on user's primary devices exceeds 2s on a typical 4G connection
- Vite build emits warnings about chunk size

**If we eventually do it** — sketch retained for reference:
- `src/data/verses/01.js` … `18.js` per chapter; `src/data/verses.js` becomes a thin orchestrator with cached dynamic `import()`.
- Three migration strategies: (1) sync-by-cache (return null first call, populate by next render), (2) bulk-load chapter on first hit, (3) pre-load chapters 1-2 + lazy others.
- ~7 consumer components need to handle the async transition.

For v13, assume single-bundle. Re-evaluate after the Tier 3 bulk import lands and we can measure actual gzipped size.

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
| `src/data/verses.js` | C, D | Tier field + bulk-merged 676 new verses |
| `src/data/chapters.js` | — | Unchanged |
| `src/components/VerseDetail.jsx` | C, H | Tier badge + audit button |
| `src/components/VerseJourney.jsx` | H | Tier-coloured cells |
| `src/components/DecodeHelper.jsx` | H | Pre-populate from verse mool when invoked from "audit this verse" |
| `src/utils/vocabulary.js` | F | Verify scaling |
| `src/utils/verseSearch.js` | G | Verify scaling |
| `src/data/{primer,patterns,glossary}.js` | C | "Decoded so far" counts derive from `tier in ['full', 'browse']` |
| Test files (multiple) | J | Tier-gated assertions; relaxed counts |
| `src/data/verses/01.js` … `18.js` (new) | E (deferred) | Per-chapter splits — only if bundle exceeds ~3 MB gzipped |

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

Three questions were resolved during this revision (pair-decoded rate makes the content work tractable; bundle math doesn't justify lazy-load yet; effort estimate corrected). The remaining open questions:

1. **Source of mool text:** GRETIL (academic, well-attested) vs holy-bhagavad-gita.org (matches our reference link) vs IIT Kanpur OCR (matches the user's earlier IIT Kanpur Sundarkand work)?
2. **Tier 1 target count:** 50 looks reasonable; could be 25 (just keep current) or 100 (more substantive). Trade-off is pair-decoding hours (~5-10 min × N).
3. **Additional translations:** stick to Arnold + Besant, or chase down a third PD translator (e.g. J. Cockburn Thomson 1855)?
4. **Auto-stub UI tone:** "auto-stub draft" feels engineering. Alternatives: "computer-aided", "preliminary", "audit-pending"?
5. **External-link fallback:** Tier 4 just shows a holy-bhagavad-gita.org link; OK?
6. **Promotion workflow:** Should "audit-this-verse" land in DecodeHelper, or open a new editor surface with the existing fields pre-populated?

Resolved by the v13 revision (was Q3, Q4, and the effort question):
- ~~Lazy-load strategy~~ → DEFERRED. Single bundle until measured size exceeds ~3 MB gzipped.
- ~~Bundle ceiling~~ → ~3 MB gzipped is the alarm threshold. Initial bundle estimated at ~1.8 MB.
- ~~"Are these effort numbers right?"~~ → No, they were costed as solo-from-textbook work. Pair-decoded numbers (1.5-10 min/verse depending on tier) are now reflected in the slice table.

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
| E — lazy-load by chapter | **DEFERRED** — only if bundle exceeds ~3 MB gzipped |
| F — vocabulary scaling | 1-2 hours |
| G — search scaling | 1 hour |
| H — tier-aware UI affordances | 3-4 hours |
| I — promote N verses (Tier 1: ~5-10 min/verse · Tier 2: ~1.5-2 min/verse · pair-decoded) | **~10-15 hours total content work** |
| J — test-suite relaxation | 3-4 hours |
| K — docs + checkpoints | 2 hours |
| **Total infra (A-D + F-H + J + K)** | **~15-20 hours** |
| **Total infra + content (everything except deferred Slice E)** | **~25-30 hours** |

The plan provides infrastructure that makes content work efficient. The pair-decoded rate (us working together; AI proposes, user audits) is what keeps the per-verse cost low. The earlier "525 hours" / "80 hours" numbers were costed as solo-from-textbook work, which doesn't reflect how this project actually operates.
