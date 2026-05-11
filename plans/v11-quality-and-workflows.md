# Plan v11 — Test coverage push, cross-tab workflows, data-quality fixes (retrospective)

> **Retrospective.** Written after-the-fact to document the work done after [v10](v10-reference-and-expansion.md) shipped. v10 was the first reference-vs-corpus separation pass; v11 is the response to a user audit of the resulting app — finding thin test coverage, workflow gaps, and corpus inconsistencies that v10 hadn't fully closed.

## Context

After v10, the user walked the app and pointed out three uncomfortable truths:

1. **"Where are the test cases? The coverage would be what? Like 10%, 20%? For the workflows, when I'm clicking on something and going someplace, the integration tests would be incomplete."** And he was right — overall statement coverage was 76.7%, but `App.jsx` was 0%, several major components were under 1% (Samasa drill, StackBuilder, SandhiLab, ThemePicker), and `routing.test.jsx` only mounted each route without testing user clicks.
2. **"For चतुर्थी and पञ्चमी the Primer says 'not yet decoded'. I think we didn't update the primer when we added the 21 verses. If those cases genuinely don't exist, we should add another 25 verses with all data populated everywhere."** Investigation: the cases DID exist in the corpus (2.62-63 chains 6 ablatives; 4.8 has 3 datives) — they were never tagged because the 21 newer verses had no `wordParsings`.
3. **"In Gītā 2.4, when I click on भीष्मम्, the chip doesn't get highlighted as क्रिया."** Bug: the padaccheda used `प्रति-योत्स्यामि` (with a pedagogical hyphen) but `finiteVerbs[].form` used `प्रतियोत्स्यामि` (no hyphen). Strict equality missed the match.

Three different surfaces, one shared theme: **the data is correct, but the wiring isn't carrying it through to the UI**. v11 is the wiring pass.

## Decisions locked

| Decision | Choice | Reason |
|---|---|---|
| Test coverage scope | Add tests in two rounds: round 1 = the headline gaps (App, Samasa drill, StackBuilder, SandhiLab, ThemePicker, LastVisitBanner); round 2 = the rest (DecodeHelper, Practice, VerseJourney, WordPopover) | Smaller increments; commit after each round; `vitest --coverage` quantifies progress |
| Workflow tests vs unit tests | Both, in separate files. Per-component tests live next to components; cross-tab journeys live in `src/__tests__/workflows.test.jsx` | A component test cannot catch "click verse-ref in Samasa Bank → land on verse." |
| Workflow documentation | A markdown file in `docs/workflows.md` with Mermaid sequence diagrams + plain-English steps + pointers to tests | Per the user's explicit request: a sequence-diagram-driven journey reference, not just code |
| Hyphen-insensitive matching | Strip hyphens on both sides of the comparison in `VerseDetail`. Same pattern as `lookupSharedVocab` | Keeps the user's pedagogical hyphen (it conveys upasarga structure); only the recognition is robust |
| wordParsings backfill scope | All 21 verses get full per-word parsings (~250 entries), not just the case-bearing ones | User explicitly chose "All 21 newer verses" via `AskUserQuestion`. Otherwise some verse-detail popovers would be empty for some words and full for others — inconsistent feel |
| Primer update strategy | Reference real corpus words for every case + add a regression test asserting no "not yet decoded" placeholder + every case has a wordParsing entry | Prevents the same regression sneaking back in |
| Coverage tool | Add `@vitest/coverage-v8` (legacy-peer-deps) + add `coverage/` to .gitignore | The numbers were the user's question; we needed v8 coverage to answer |

## Process rules (continued from v6/v7/v8/v10)

- Small commits per coherent slice
- Build green + all tests green at every commit boundary
- Per-meaningful-task `checkpoint-N.md` at repo root
- New testable code gets tests in the same commit
- Integration tests for any user-facing click-through gap (lesson from v10's particle-filter bug)

## Implementation slices

### Slice A — Workflow coverage round 1 (`2542a9a`, checkpoints/checkpoint-28)

Coverage push for the highest-value gaps. New test files:

- `src/__tests__/app.integration.test.jsx` (23 tests) — full `<App />` mount under MemoryRouter; masthead nav clicks; deep links; cross-tab flows like Samāsa Bank → verse navigation
- `src/components/Samasa.test.jsx` (18 tests) — view switcher, Compound Bank dual-mode, Type Identifier drill flow (correct/wrong/score/Next), Type Reference cards
- `src/components/StackBuilder.test.jsx` (13 tests) — forward formula picker changes, augment chip on लङ्, reverse decoder matches with prefix chips
- `src/components/SandhiLab.test.jsx` (11 tests) — input → result, presets, multi-example catalogue, rule details
- `src/components/ThemePicker.test.jsx` (10 tests) — popover open/close, Escape, outside-click, palette switch → DOM `data-theme` + localStorage
- `src/components/LastVisitBanner.test.jsx` (10 tests) — first-visit / stale-visit / inside-window / dismiss persistence

Tooling: `@vitest/coverage-v8` added (legacy-peer-deps to resolve a downstream conflict); `coverage/` in `.gitignore`.

Coverage delta after Slice A:
- Overall stmts: 76.7% → 93.4%
- Function coverage: 49.7% → 63.3%
- Per-component: App 0→93.5%, Samasa 0.5→98.4%, StackBuilder 0.5→97.8%, SandhiLab 7.8→100%, ThemePicker 0→100%, LastVisitBanner 0→89.5%

### Slice B — Workflow coverage round 2 (`47caa71`, checkpoints/checkpoint-29)

Filling the remaining workflow holes flagged in Slice A's checkpoint:

- `src/components/DecodeHelper.test.jsx` (11 tests) — input → preview → JS stub → Copy invokes clipboard
- `src/components/Practice.test.jsx` (11 tests) — start session → flip → rate → next → end; SRS persists; Reset confirms
- `src/components/VerseJourney.test.jsx` (13 tests) — jump form (valid / invalid / undecoded), search, recent chips, decoded-only toggle, verse-cell `disabled` state
- `src/components/WordPopover.test.jsx` (16 tests) — open/close, Escape, outside-click, all grammar-field labels

Coverage delta after Slice B:
- Overall stmts: 93.4% → 97.1%
- DecodeHelper 1.7→100%, Practice 42→96%, VerseJourney 76.5→98.5%, WordPopover 60→100%
- Test count: 288 → 339

### Slice C — Cross-tab workflows: doc + integration tests (`f60e7cd`, checkpoints/checkpoint-30)

The user explicitly asked for "a markdown file noting all these workflows, enhanced with sequence diagrams in Mermaid JS, and finally test those workflows." Two artifacts:

- **[`docs/workflows.md`](../docs/workflows.md)** — 10 named workflows (W1-W10), each with steps + "why this matters" + Mermaid sequence diagram + pointer to test. Mermaid renders in GitHub / Obsidian / VS Code preview.
- **`src/__tests__/workflows.test.jsx`** — one integration test per workflow, full App mount, cross-tab walks

Workflows W1-W10 (see `docs/workflows.md` for full doc):
- W1: Verse → Avyaya detour → return (the user's exact "explore an adverb" example)
- W2: Sandhi confusion → Sandhi Lab → return
- W3: Compound discovery: Bank → verse → context
- W4: Verb deep-dive: Periodic Table → Stack Builder → reverse
- W5: Multi-verse exploration via search + jump
- W6: Theme switch persists across navigation
- W7: Patterns Won → first-met verse → context
- W8: Type Identifier drill → Type Reference → drill again
- W9: Decode Helper → paste verse → Copy clipboard
- W10: Practice fail → study verse → retry

Test count: 339 → 349.

### Slice D — Hyphen-insensitive क्रिया matching (`f75cf92`, part of checkpoints/checkpoint-31)

Bug fix: in 2.4 the padaccheda has `प्रति-योत्स्यामि` but `finiteVerbs[].form` is `प्रतियोत्स्यामि`. Strict-equality match in `VerseDetail.jsx` failed → no `is-finite` class → user couldn't see which word was the verb.

Fix: `stripHyphens()` helper, applied on both sides of the comparison. Same pattern `lookupSharedVocab` uses.

Regression test: `src/components/VerseDetail.test.jsx` walks every decoded verse and asserts that each padaccheda chip's `is-finite` class equals what the hyphen-stripped finite-verb match says. Catches future verses that introduce a similar prefix-hyphen + finite-verb pairing.

### Slice E — wordParsings backfill on 21 verses + Primer with real examples (`7808c0a`, part of checkpoints/checkpoint-31)

The Primer's vibhakti table had `'— (not yet decoded)'` placeholders for चतुर्थी and पञ्चमी even though the corpus was full of both — they just weren't tagged because the 21 newer verses had no `wordParsings` at all (only 4 of 25 verses had them).

Backfilled `wordParsings` on all 21 verses — ~250 entries with the full schema (`category`, `root`, `gender`, `number`, `case` for nouns; `gana`, `pada`, `lakara`, `purusha` for verbs; `gloss`, `note` everywhere useful). 2.62-63 alone showcases six पञ्चमी ablatives chained as a cause-of-arising sequence; 4.8 has three चतुर्थी datives-of-purpose. 6.5 has आत्मन् in four cases.

Updated the Primer:
- `vibhakti` table — every row now references 2-4 real corpus examples
- `lakara` table — same
- vibhakti aside — adds the chain explanation + the dative-of-purpose explanation

New test suite `src/data/primer.test.js` (7 tests) pins three invariants:
1. No "(not yet decoded)" placeholder anywhere
2. Every example word in the tables actually exists in some verse
3. Every of the 8 cases has at least one `wordParsing` entry

Test count: 353 → 360.

## Critical files

| File | Slice | Change |
|---|---|---|
| `src/__tests__/app.integration.test.jsx` (new) | A | Full App mount + masthead nav + cross-tab flows |
| `src/__tests__/workflows.test.jsx` (new) | C | 10 cross-tab journey tests |
| `src/components/{Samasa,StackBuilder,SandhiLab,ThemePicker,LastVisitBanner,DecodeHelper,Practice,VerseJourney,WordPopover}.test.jsx` (new) | A, B | Per-component UI tests |
| `src/components/VerseDetail.jsx` | D | `stripHyphens()` helper + use it in finite-verb match |
| `src/components/VerseDetail.test.jsx` (new) | D | Regression test walking every verse |
| `src/data/verses.js` | E | wordParsings backfill on 21 verses (~250 entries) |
| `src/data/primer.js` | E | vibhakti + lakara tables now reference real corpus |
| `src/data/primer.test.js` (new) | E | Three integrity invariants |
| `docs/workflows.md` (new) | C | 10 workflows with Mermaid diagrams |
| `package.json` | A | + `@vitest/coverage-v8`, + `@testing-library/dom` |
| `.gitignore` | A | + `coverage/` |

## Verification

**Per-slice CI (run before every commit):**
- `npm test -- --run` — must pass
- `npm run build` — must be clean
- `npx vitest --coverage` — for slices A & B, also confirm the coverage delta

**End-to-end after Slice E:**
1. Open `/journey/2/4` — click भीष्मम् → popover shows full grammar with `विभक्ति: द्वितीया (Acc.)` ✓
2. Open `/journey/2/62` — click सङ्गात् → see `विभक्ति: पञ्चमी (Abl.)` ✓
3. Open `/journey/4/8` — click परित्राणाय → see `विभक्ति: चतुर्थी (Dat.)` ✓
4. Open Primer → vibhakti table — every row has 2-4 corpus refs ✓
5. Open `/atlas/samasa` → see Compound Bank ✓ (sanity carried over from v10)

## Out of scope (deferred)

- Cross-linking from popover → Atlas Declensions (deferred to v12 — needs the Declensions tab to exist)
- Adding more verses (corpus stays at 25; v12's reference data fills the noun-paradigm gap instead)
- More verbose Primer sections (v11 only fixed the placeholders, didn't expand depth)
- Visual regression tests / snapshot testing — not configured

## Relation to other plans

- **Builds on v10** (corpus expansion + sharedVocab + samasaRefBank). v10 added the data; v11 fixes how the data is *wired* through to the UI.
- **Sets up v12** (noun-declension reference). Without the wordParsings backfill in slice E, the v12 paradigm classifier would have nothing to classify — most popovers would lack `root` + `gender`.

## Checkpoints in this plan

- `checkpoints/checkpoint-28.md` — Slice A (workflow coverage round 1)
- `checkpoints/checkpoint-29.md` — Slice B (workflow coverage round 2)
- `checkpoints/checkpoint-30.md` — Slice C (cross-tab workflows doc + tests)
- `checkpoints/checkpoint-31.md` — Slices D + E (hyphen fix + wordParsings backfill + Primer)
