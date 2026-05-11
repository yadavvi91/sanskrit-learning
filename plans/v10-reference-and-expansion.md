# Plan v10 — Reference catalogues, corpus expansion, polish (retrospective)

> **Retrospective.** Written after-the-fact to document the substantial post-v0.8.0 work that emerged from a tight feedback loop with the user — not a pre-planned phase. v8 closed at the Sanskrit Reading Workbench; [v9](v9-decode-helper.md) added the Decode Helper; v10 is the response to actually *using* the workbench at scale: missing data, design tensions, scaling problems, and an accumulating gap between "Atlas as verse-summary" and "Atlas as reference work."

## Context

v8 (the Reading Workbench) shipped with everything mechanically working but with two structural problems that only surfaced on use:

1. **The 4-verse problem.** The whole corpus of decoded verses was 4. Every pedagogical surface — Vocabulary, Patterns, Practice cards, Compound Bank — was implicitly capped by that. The app's pedagogical promise depends on having content.
2. **The Atlas-as-summary mistake.** The Compound Bank, Sandhi notes, and similar reference surfaces were tightly coupled to `verse.samasNotes[]` and `verse.sandhiNotes[]`. That made them inflate as more verses got decoded, but it also meant they couldn't teach the *category* — only the *instances we'd encountered.* The dhātu data had been correctly designed (top-25 dhātus regardless of which Gītā verses they appeared in); samāsa and sandhi had been built the wrong way.

Plus a stack of UX issues that compounded after the corpus grew:
- Vocabulary tab unusable at 250+ words (scrolling through 8000 was the user's projection)
- Particle-filter category chip showed nothing because the catch-all "Hide particles" toggle overrode it
- Theme picker too tall (cost ~80px of vertical at the masthead)
- Cross-tab navigation jumped (browser auto-scroll-restoration) — most visibly going to Practice (the shortest tab)
- Masthead view-switcher pushed to the left when it wrapped (8 tabs)
- The journey rail's internal scroll position shifted on `<details>` toggle in the right pane (browser scroll-anchoring)

## Decisions locked

| Decision | Choice | Reason |
|---|---|---|
| Corpus expansion | Add 21 of the most-recognised Gītā verses as **browse-tier** (`mool` + `padaccheda` + Edwin Arnold + Annie Besant translations + brief Hindi + decodeIndex) | Realistic in one push; user can audit + extend later. Chosen for cultural recognition: 2.47, 4.7-8, 6.5, 12.13, 18.66, etc. |
| Tier distinction | "fully decoded" (the original 4 with full pipeline + `wordParsings`) vs "browse-tier" (audit-pending) | Tests gate by `wordParsings` presence. New verses don't fail the per-word parsing assertion. |
| Atlas pivot | Reference catalogue as a separate first-class layer, alongside the verse-grown auto-bank | The dhātu data is the model. samāsa + sandhi follow. |
| Compound Bank UI | Dual-mode toggle: "Reference catalogue (50)" vs "From your verses (39)" | Both are valuable, neither subsumes the other. |
| Sandhi rules | Each `SANDHI_RULES` entry carries `examples: []` (was singular `example`) | "Why aren't there many references" — addressed at the rule level, not just per-verse |
| Vocabulary scaling | Pagination (50/page) + Hide-particles toggle (default ON) + Only-missing-gloss filter | Particles dominate by raw count but are rarely useful vocabulary. |
| Missing translations | New `src/data/sharedVocab.js` — ~200 entries hand-curated, used as fallback when verse-level `wordParsings` is empty | The browse-tier corpus needs vocabulary support without re-doing per-word parsing for every verse. |
| व्याख्या (structural commentary) | New per-verse field, distinct from टिप्पणी references | The user noted "commentary" had been ambiguous between school-of-thought summaries (Shankara/Ramanuja in टिप्पणी) and structural-grammar commentary. Two surfaces, distinct names. |

## Process rules (carry from v6/v7/v8)

- Small commits, scoped to a single coherent change
- Build green + tests green at every commit boundary
- New algorithmic code gets unit tests in the same commit
- The "Words tab" filter-override bug taught us: also write **integration tests** that catch user-facing interactions, not just unit-level invariants

## Implementation slices (roughly chronological)

### Slice A — Corpus expansion + क्रिया/अन्वय backfill

- Added 21 popular Gītā verses to `src/data/verses.js`, decodeIndex 5–25
- Added `finiteVerbs[]` + `anvaya` + `nonFinite[]` per new verse (the क्रिया pipeline step)
- Added `sandhiNotes[]` for the verses with obvious sandhi instances (5 so far; pivots into the reference-catalogue work below)
- Added `samasNotes[]` for 11 of 21 verses (the Compound Bank goes from 10 → 39)
- Added `wordParsings` for the original 4 verses; browse-tier verses use the shared dictionary instead

Critical files: [src/data/verses.js](src/data/verses.js).

### Slice B — Shared dictionary (vocabulary fallback)

New file: [src/data/sharedVocab.js](src/data/sharedVocab.js). ~200 entries covering particles, pronouns in their common case forms, vocatives, frequent verbs (in all the surface forms our corpus encounters: `अभिजायते`, `क्रोधात्`, `सञ्जायते`, `कुरुष्व`, `मोक्षयिष्यामि`, etc.), nouns, and joined-surface-form compounds.

`buildVocabulary()` in [src/utils/vocabulary.js](src/utils/vocabulary.js) layers parsings: verse-local `wordParsings` win; the shared dictionary fills the gap. Vocab entries gain a `fromSharedDict: true` flag, surfaced in the UI as a small `dict` badge.

Includes a hyphen-stripping fallback for compound surface forms + pre-sandhi alternate keys (e.g., `देहअन्तरप्राप्तिः` aliases `देहान्तरप्राप्तिः`).

### Slice C — Words tab usability

[src/components/Vocabulary.jsx](src/components/Vocabulary.jsx):

- Pagination: default 50 rows, "Show 50 more" / "Show all" buttons. Page resets when filters change.
- "Hide particles" toggle (default ON). Particles dominate by raw count.
- "Only words missing a gloss" toggle. Surfaces the audit gap directly.
- "Showing N of M" counter on the toolbar.
- **Bug fix:** explicit category-filter pick now overrides the Hide-particles toggle. Was: clicking the "particle (20)" chip while hide-particles was on filtered out everything. Now: explicit > catch-all.
- "From shared dictionary" badge on rows whose parsing came from the dictionary fallback.

### Slice D — व्याख्या (structural commentary)

New verse-level field `vyakhya: [{ title, body }, ...]`. Rendered in [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) as a numbered card list with gold left-border. Distinct from टिप्पणी / References.

Seeded on 14 of the most-pedagogically-rich verses including 1.1 (the participle trap), 2.5 (three verb-looking words, ONE finite verb), 2.62-63 (the cause-chain), 6.5 (आत्मन् in 4 cases in 2 lines), 9.27 (the 5 yat + 1 tat structure with √कृ as the meta-verb).

### Slice E — Atlas reference pivot

The structural correction. New file: [src/data/samasaRefBank.js](src/data/samasaRefBank.js). 50 canonical compounds across all 10 types — including अव्ययीभाव (which doesn't appear in the Gītā 25-verse corpus but every introductory grammar teaches it). Examples drawn from classical, epic, devotional, and vedic sources, marked with their `source` tag.

[src/components/Samasa.jsx](src/components/Samasa.jsx) Compound Bank gains a mode toggle: **"Reference catalogue (50)"** vs **"From your verses (39)"**. Both filterable by family. The अव्ययीभाव chip now produces results in the reference mode.

[src/utils/sandhi.js](src/utils/sandhi.js): every `SANDHI_RULES` entry now carries `examples: []` (was singular `example`). 2–3 examples per rule, drawn from project corpus (Gītā 1.1, 2.3, 2.13, 2.14, 2.62, etc.) AND classical examples not tied to any verse.

[src/components/SandhiLab.jsx](src/components/SandhiLab.jsx): catalogue is open by default; renders all examples per rule. Plus a clarifying intro that distinguishes the Lab (interactive engine, arbitrary input) from per-verse sandhi notes (hand-curated for specific verses).

### Slice F — Theme system expansion

11 → 18 themes. Added Making Software (Vercel Geist style — pure white + electric blue), Press (Newsprint × Making Software hybrid), Charcoal & Ember, Nord. Re-fetched makingsoftware.com to get accurate values after a wrong "from memory" first attempt. Theme picker collapsed to a single icon button + popover (was an 80px-tall row).

### Slice G — UX polish

- **Scroll-jump on tab change** — `useLayoutEffect` (not `useEffect`) + `history.scrollRestoration = 'manual'` + multiple scroll-target resets + rAF fallback. Most visibly affected Practice (shortest tab).
- **Masthead view-switcher alignment** — reverted my own bad fix; the `justify-content: space-between` was correct.
- **Journey rail scroll on `<details>` toggle** — `overflow-anchor: none` on `.journey-rail`. Browser scroll-anchoring was compensating for right-pane reflows by adjusting the rail's internal scrollTop.
- **Per-chapter decoded counts** + **Jump-to-verse input** in the journey rail, designed for the 700-verse future.

### Slice H — Backfills (the user's "didn't do it thoroughly" complaint)

- `dhatu.gitaOccurrences` for √भू, √कृ, √दा, √दृश् across the new verses
- `samasNotes` per browse-tier verse (where applicable)
- `sandhiNotes` per browse-tier verse (where applicable)

## Tests added

- `src/data/sharedVocab.test.js` — covers user-flagged words, edge cases, and the integration test "no padaccheda word in any of 25 verses has empty gloss" (caught 10 real gaps during development)
- `src/components/Vocabulary.test.jsx` — RTL UI tests including the **exact filter-override bug** the user found
- Updated `src/data/samasa.test.js` — bank-size assertion now grows with the corpus
- Updated `src/data/verses.refs.test.js` — distinguishes fully-decoded from browse-tier verses

Tests: 164 → 203 (+39 across v10).

## Files

| File | Slice | Change |
|---|---|---|
| `src/data/verses.js` | A, H | +21 verses; backfilled samasNotes, sandhiNotes, finiteVerbs, anvaya, vyakhya, references |
| `src/data/sharedVocab.js` (new) | B | ~200 dictionary entries; lookup helper with hyphen-strip + pre-sandhi alternates |
| `src/data/samasaRefBank.js` (new) | E | 50 canonical compounds |
| `src/utils/vocabulary.js` | B, C | shared-dict fallback in builder |
| `src/utils/sandhi.js` | E | `examples: []` on every rule |
| `src/components/Vocabulary.jsx` | C | pagination + filters + bug fix |
| `src/components/Samasa.jsx` | E | dual-mode toggle |
| `src/components/SandhiLab.jsx` | E | catalogue open by default; multi-example rendering |
| `src/components/VerseDetail.jsx` | D | new व्याख्या section |
| `src/components/ThemePicker.jsx` | F | collapsed to icon + popover |
| `src/data/palettes.js` | F | +7 themes (Newsprint, Linotype, Editor's Mark, Charcoal & Ember, Nord, Making Software, Press) |
| `src/App.jsx` | G | ScrollToTop with useLayoutEffect + scrollRestoration: 'manual' |
| `src/styles.css` | F, G | many touch-ups; `overflow-anchor: none` on rail |
| `src/data/dhatus.js` | H | gitaOccurrences for √भू, √कृ, √दा, √दृश् |

## Out of scope (still deferred)

- Full 700-verse corpus loading (data sourcing decision the user owns)
- Hand-curated `wordParsings` for the 21 browse-tier verses (the shared dictionary covers them adequately for now)
- Patterns Won updates: `trigger.alsoIn[]` for the lakāra-spotting patterns (low-leverage given the matrix already counts)
- Backend SQLite for cross-device note sync (still localStorage)

## Relation to other plans

| Plan | Relationship |
|---|---|
| [v8-reading-workbench.md](v8-reading-workbench.md) | v10 fills in the corpus that v8 was built on; addresses the "Atlas-as-summary" design tension v8 didn't resolve |
| [v9-decode-helper.md](v9-decode-helper.md) | The Decode Helper bootstraps `wordParsings` for new verses by reaching into the same shared dictionary v10 introduces — they share a substrate |
| [v6-refinement.md](v6-refinement.md) | Theme system polish builds on v6's theme infrastructure |
| [v7-reading-reference.md](v7-reading-reference.md) | The व्याख्या field is a distinct sibling to v7's references (टिप्पणी); both surfaces present |
| [v3-grammar-atlas.md](v3-grammar-atlas.md) | Belated correction: the Atlas's reference-vs-verse-summary distinction wasn't drawn sharply enough in v3 |
