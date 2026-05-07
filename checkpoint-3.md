# Checkpoint v3 — Verbs + Atlas + Primer + Practice on `implement-all-plans` branch

**Date:** 2026-05-08
**Branch:** `implement-all-plans` (not yet merged to `main`)

## What this version is

A working v1 of every plan in `plans/v2-v5`. Six top-level tabs, working build at every commit boundary, 59 unit tests passing. Shipped as 7 small commits rather than one large dump — the deliberate process the user pushed for after the first attempt.

## Commits on this branch

```
(latest)  viग्रह rename + checkpoint-3 update
e2743f5   v1 follow-up: wire Patterns → Verse Journey cross-link
6a94535   v2 follow-up: उपसर्ग parser for Stack Builder reverse mode (12 new tests)
11861fb   cross-tab navigation: Atlas/Verbs → Verse Journey
91fb352   checkpoint-3: branch summary
7a1bd4c   v4 follow-up: wire Glossary popovers into VerseDetail section labels
c6147bc   v5: Practice tab — SM-2 SRS + "+1" pedagogy + browser persistence
f6f4fe5   v4: Primer tab + Glossary popover + last-visit banner
921129a   v3 part 2/N: Atlas tab — pronouns + samāsa + kāraka + avyaya + adj/adv
239247c   v3 part 1/N: grammar atlas data + scanners + tests
cc2ed35   v2 part 2/N: Verbs tab — Periodic Table + Dhātu Detail + Stack Builder
d4e7400   v2 part 1/N: verb conjugation engine + top-25 dhātu dataset + tests
```

## What works

### Tab 1 — Verse Journey (unchanged from v1)
Existing functionality preserved. The four section labels (पदच्छेद, क्रिया, विभक्ति, अन्वय) now carry `?` glossary triggers that open the Primer to the right section.

### Tab 2 — Patterns Won (unchanged from v1)

### Tab 3 — Verbs (new, v2 plan)
- **Periodic Table:** 25 top-frequency dhātus, color-coded by गण (10 distinct backgrounds), togglable between frequency and गण ordering, ✦ marker on roots already met in decoded verses.
- **Dhātu Detail:** click any dhātu cell → 5 लकार tabs (लट्/लङ्/लृट्/लोट्/विधिलिङ्), 3×3 conjugation grid for the selected (lakara, pada). Click a cell → "Why this form?" panel with the 5-layer recipe + a colored formula breakdown (augment + stem + ending = result). Plus a "Met in Gītā" panel listing every verse where this root's finite form has been decoded.
- **Stack Builder:** Forward mode — pick the 5 layers, watch the form assemble. Reverse mode — paste a form, see all matching decompositions across the 25-dhātu corpus.
- **Coverage:** Khoomeik frequency curve with reached tiers highlighted in sage. Top-25 = ~45% of all classical Sanskrit verb tokens.

### Tab 4 — Atlas (new, v3 plan)
Sticky-TOC sidebar with five sub-sections:

- **Pronouns:** अस्मद् + युष्मद् paradigms with enclitic alternates (मा, मे, नौ, नः, ते, वः) rendered in a smaller secondary cell. तद्-template across m/f/n with स्म-cells visually flagged (gold border + amber fill). Six "free" pronouns (यद् / किम् / सर्व / अन्य / एक / एतद्) shown as a transfer table. Outliers इदम्/अदस् as recognition-only. Six correlative pairs with Gītā references.
- **Samāsa (compounds):** three views.
  - *Compound Bank* — auto-grown from `verses.js → samasNotes[]`, filterable by family (तत्पुरुष / द्वन्द्व / बहुव्रीहि / अव्ययीभाव / नञ्-समास). Shows all 10 seed compounds across the four decoded verses with verse provenance.
  - *Type Identifier (drill)* — random compound + विग्रह; pick the type from 10 chips; immediate ✓/✗ feedback; running session score.
  - *Type Reference* — 10-type catalogue with rule, pattern, examples per type.
- **Kāraka:** 6 कारक × {active, passive} विभक्ति table with the key insight callout, plus worked active/passive example pairs per role.
- **Avyaya:** auto-grown particle frequency from your decoded corpus (currently shows the actual particles from the four decoded verses), the "what Sanskrit doesn't have" page (no articles, no preposition word class), 9-row postpositions table, 5-group particle reference.
- **Adj/Adv:** -तर / -तम comparison drill seeds, irregular pairs (श्रेष्ठ → ज्यायस् → श्रेष्ठ etc.), 4 adverb-formation patterns.

### Tab 5 — Primer (new, v4 plan)
- 16 sections in a sticky-TOC layout. Re-entry-safety content: SOV/SVO, decode sequence, finite verb spotting, विभक्ति/लकार in one minute, कृदन्त trap, adjective agreement, sandhi (deferred note), पुरुष flip, plus pointers to Atlas for compounds/pronouns/kāraka/indeclinables.
- **Glossary popover** infrastructure used by Verse Detail: 1-line definition + "open primer →" link.
- **Last-visit banner:** localStorage `lastVisitAt`, 14-day staleness threshold, surfaces above all views.

### Tab 6 — Practice (new, v5 plan)
- **SM-2 algorithm** with proper interval progression (1 → 6 → ease × prev) and ease-factor floor at 1.3.
- **Card seeding** from existing data — 61 cards from the current 25-dhātu / 4-verse / 23-pattern corpus across 5 card types: form_id, verse_anchor, pattern_recall, dhatu_drill, lakara_signal.
- **"+1" pedagogy** — buildQueue surfaces all-due cards plus exactly one new card per session.
- **Stats dashboard:** Total / Learned / Due now / Mastered / New / Reviews.
- **Persistence:** localStorage. The plan's SQLite-backed Node service is reachable later as a single-module storage swap (the algorithm + card-seeding logic above are deliberately decoupled from persistence).

## Tests

`npm test` — **71 passing** across 5 files:

- `src/utils/conjugator.test.js` — 27 tests covering thematic regular paradigms (full √भू grid match), suppletive present stems (√गम् → गच्छ-, √दृश् → पश्य-, √स्था → तिष्ठ-), override priority over generation (√कृ, √अस्), the actual Gītā 2.5 form भुञ्जीय, decompose for "Why this form?" tooltips, and decompose_reverse for Stack Builder reverse mode.
- `src/data/samasa.test.js` — 10 tests covering catalogue shape, type lookup, bank auto-projection from verses, family grouping.
- `src/data/avyaya.test.js` — 7 tests covering tallyParticles (hyphen-stripping, frequency sort, repeat counting, inventory filtering), reference-data shape.
- `src/utils/srs.test.js` — 15 tests covering SM-2 properties (initial intervals, ease updates, floor), card seeding (uniqueness, type coverage, per-verse + per-dhātu counts), and queue building (+1 cap, sessionLimit honored).
- `src/data/upasargas.test.js` — 12 tests covering catalogue shape, lookup, greedy stripping (longer prefixes before shorter, refusal to strip whole-string), and the actual Gītā 2.4 form प्रतियोत्स्यामि decomposing to प्रति + √युध् + लृट् + P + उत्तम + एक.

## Verified

- `npm run build` clean at every commit boundary.
- `npm test -- --run` clean at every commit boundary.
- Final bundle: 244 KB JS / 45 KB CSS (gzip: 79 / 7 KB).
- All four already-decoded Gītā verses cross-link to dhātus and compounds correctly.

## What landed in the follow-up commits (after checkpoint-3 first draft)

- **Cross-tab navigation** (commit 11861fb): Samāsa Compound Bank rows and Verbs Dhātu-Detail "Met in Gītā" entries are now clickable buttons that jump to the cited verse in Verse Journey.
- **उपसर्ग parser** (commit 6a94535): Stack Builder reverse mode now handles prefixed forms. प्रतियोत्स्यामि decomposes to प्रति + √युध् + लृट् + P + उत्तम + एक. 12 new tests, total 71.
- **Patterns → Verse cross-link** (commit e2743f5): Closed a v1 deferred item; pattern cards' "unlocked by Gītā 2.4" now jumps to the cited verse.
- **विग्रह pipeline rename** (this commit): The compound block in VerseDetail is now its own first-class pipeline section between पदच्छेद and क्रिया, labeled विग्रह per the v3 plan, with a Glossary popover for समास.

## Deliberately deferred (still not done)

- **Verb sub-app**: top 25 dhātus only, not the planned 192. Coverage view notes the curve. Adding more is a data-only commit (no engine change).
- **Verb sub-app**: drill view (View 4 in the plan) is not built. Practice mode covers the equivalent for लट् 3sg via dhatu_drill cards.
- **Atlas — Build-a-Compound view (View 4 of Samāsa sub-app)**: deferred. Compound Bank, Identifier drill, and Type Reference all ship.
- **Practice — SQLite + Node service**: localStorage instead. iCloud-syncs Safari localStorage automatically across the user's two Macs, which was the user's stated motivation. Plan v5's exact backend is reachable as a single storage-module swap.
- **Practice — UI tests**: only engine has tests (SM-2 + seeding). Drill UI not yet exercised by automated tests.
- **उपसर्ग reference table inside the verb sub-app**: parser ships, but the 22-prefix reference page inside Dhātu Detail (per the v2 plan) isn't built yet.
- **Sandhi between उपसर्ग and root**: e.g., उद् + त्था → उत्तिष्ठ requires sandhi rules the project hasn't tackled. The current parser only handles plain string prefixes.
- **Glossary popovers in PatternsWon**: only VerseDetail wired. PatternsWon labels would need a similar pass.
- **Browser eyeball check.** I couldn't render the page myself this session.

## How to extend

- **Add the next decoded verse:** entry in `src/data/verses.js` with `decodeIndex: 5`. Mirror in `verses-decoded.md`. Auto-grows the Compound Bank, particle tally, and verse_anchor SRS cards.
- **Add a new dhātu:** entry in `src/data/dhatus.js`. Auto-grows the Periodic Table and dhatu_drill SRS cards. If irregular, add explicit `forms[lakara][pada]` overrides; the rule engine uses overrides before generation.
- **Add a new samāsa type:** entry in `SAMASA_TYPES` in `src/data/samasa.js`. Picked up automatically by the Identifier drill chip list and the Type Reference grid.
- **Add a new primer section:** entry in `PRIMER_SECTIONS` in `src/data/primer.js`. TOC and content render automatically.

## Branch state

`implement-all-plans` is **not yet merged to main**. Worth a manual review of each tab in a browser before merging.
