# Checkpoint 28 — Workflow / integration test coverage pass

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Triggered by:** user flagged that test coverage felt thin, especially for click-through workflows ("when I'm clicking on something and going someplace … the integration test, even those would be incomplete")

## What was missing

Ran `npx vitest --coverage` for the first time. Honest baseline (before this slice):

- Overall: **76.7%** statements, **49.7%** functions
- `App.jsx` and `main.jsx`: **0%** — the router + masthead navigation logic was never mounted in any test
- `Samasa.jsx`: **0.5%** — drill, bank toggle, type-reference cards untested
- `StackBuilder.jsx`: **0.5%** — forward formula + reverse decoder UI untested (engine itself was well-covered)
- `SandhiLab.jsx`: **7.8%** — input/presets/rule list untested
- `ThemePicker.jsx`: **0%**, `LastVisitBanner.jsx`: **0%**, `Avyaya.jsx` / `AdjAdv.jsx`: ~1.3%

The existing `src/__tests__/routing.test.jsx` only mounted each route under a `MemoryRouter` and asserted "the right component shows up" — it did not exercise: clicking a Samāsa Bank row to navigate to a verse, switching Atlas sub-tabs by clicking the TOC, switching Verbs sub-tabs, the drill score increment, the StackBuilder reverse decoder finding a match, or theme switching writing to the DOM.

## What this slice added

6 new test files, 85 new tests, all passing:

- `src/__tests__/app.integration.test.jsx` — 23 tests. Full `<App />` mount under `MemoryRouter`. Masthead → click each tab → assert URL + content. Deep-link tests for every route. Cross-tab flows: Samāsa Bank `Gītā c.v ↗` → `/journey/c/v`, Atlas TOC click → sub-tab change, Verbs Periodic Table cell click → DhatuDetail switches, Verbs sub-tab clicks. 404 fallback. Active-tab `is-active` class.
- `src/components/Samasa.test.jsx` — 18 tests. View switcher (bank/identifier/types). Compound bank: reference vs verse-grown toggle, family filter narrows correctly, अव्ययीभाव filter has rows (the user's flagged gap), `onOpenVerse` callback fires with chapter/verse. Type Identifier drill: correct pick → `is-correct` + score 1/1, wrong pick → `is-wrong` + correct option highlighted + score 0/1, Next advances and resets feedback, options disabled after answering, drill bank includes अव्ययीभाव prompts. Type Reference: 10 cards rendered with rules and examples.
- `src/components/StackBuilder.test.jsx` — 13 tests. Forward: dhātu select → form recomputes (√भू → भवति, √कृ → करोति), लकार change → form recomputes (लट् → लृट् → भविष्यति), लङ् adds augment chip, P-only dhātu locks पद select. Reverse: default प्रतियोत्स्यामि matches with प्रति prefix chip, भवति matches, unrecognised input shows empty hint, annotation row labels लकार · पद · पुरुष/वचन. Mode toggle is-active class.
- `src/components/SandhiLab.test.jsx` — 11 tests. Default input shows split parts + applied rules. Catalogue lists all `SANDHI_RULES.length` rules. Multi-example rendering (post-v8 enhancement) verified. Typing changes the result. Preset click loads input. All 5 presets render.
- `src/components/ThemePicker.test.jsx` — 10 tests. Trigger button + 3 swatches, popover collapsed by default. Default palette applied on mount. Stored palette restored from localStorage. Trigger toggle, Escape close, outside-click close. Switching palette writes `data-theme`, sets `--ink` CSS var, persists to localStorage. Active swatch has `is-active`.
- `src/components/LastVisitBanner.test.jsx` — 10 tests. First-visit branch (no localStorage), stale-visit branch (>14 days, with day count), recent-visit hidden, exactly-at-14-day-boundary not stale. Open Primer callback + dismiss-side-effect. Dismiss persists fresh timestamp. Corrupt localStorage treated as first visit.

## Coverage delta

| File | Before | After |
|---|---|---|
| `App.jsx` | 0% | **93.5%** |
| `Atlas.jsx` | 100% | 100% |
| `Avyaya.jsx` | 1.3% | **100%** |
| `AdjAdv.jsx` | 1.4% | **100%** |
| `Verbs.jsx` | 65% | **100%** |
| `Samasa.jsx` | 0.5% | **98.4%** |
| `StackBuilder.jsx` | 0.5% | **97.8%** |
| `SandhiLab.jsx` | 7.8% | **100%** |
| `ThemePicker.jsx` | 0% | **100%** |
| `LastVisitBanner.jsx` | 0% | **89.5%** |
| **Overall stmts** | **76.7%** | **93.4%** |
| **Overall funcs** | **49.7%** | **63.3%** |

## Tooling change

- Added `@vitest/coverage-v8` (devDep) so `npm test -- --coverage` produces a v8 coverage report.
- Added `@testing-library/dom` as an explicit devDep — was previously a transitive of `@testing-library/react` but the `--legacy-peer-deps` resolution chain dropped it.
- Ignored `coverage/` directory.

## Still uncovered (deliberate, for now)

- `DecodeHelper.jsx` (1.7%) — large standalone tool; needs its own dedicated test file (next slice).
- `WordPopover.jsx` (60%) — popover open/close behavior is exercised by Vocabulary tests but the click-outside / escape paths aren't.
- `Practice.jsx` (42%) — SRS engine is exhaustively tested in `srs.test.js`; the UI rendering flow (showing card, flipping, rating, persisting) is the gap.
- `VerseJourney.jsx` (76%) — the chapter-grid `<details>` open/close on chapter > 2 isn't exercised; SearchResults UI partially covered.
- `main.jsx` (0%) — pure entry-point; tested implicitly by the dev server running.

## Verified

- `npm run build` clean
- `npx vitest --run` — **288/288 passing** (was 203/203, +85 new tests)
- `npx vitest --coverage --run` — coverage report regenerated, numbers above
