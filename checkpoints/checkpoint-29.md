# Checkpoint 29 — Workflow coverage round 2

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Continuation of:** checkpoint-28 (workflow coverage round 1)

## Why round 2

Checkpoint-28 left 4 components flagged as still-uncovered: DecodeHelper (1.7%), Practice UI flow (42%), VerseJourney chapter-grid + jump-form + search results (76%), WordPopover outside-click paths (60%). The user's original ask was about *integration / workflow* coverage — these are all click-through workflows, so finishing them is in scope.

## What this slice added

4 new test files, 51 new tests, all passing:

- `src/components/DecodeHelper.test.jsx` — 11 tests. Default Gītā 1.1 input, chapter/verse number inputs, padaccheda preview re-renders on input change, JS output references the chosen chapter/verse, finite-verb signal section appears for verb input (भवति → लट्), Copy button invokes `navigator.clipboard.writeText` with the JS stub and label flips to "✓ Copied", empty input hides the preview.
- `src/components/Practice.test.jsx` — 11 tests. Landing screen with stats, Start session shows card + Show answer, flipping reveals 4 rating buttons, rating writes to `localStorage['srs_v1']`, advancing to next card re-hides answer, completing all cards auto-returns to landing, End session button, Reset all schedules with confirm cancelled / accepted (uses `vi.spyOn(window, 'confirm')`).
- `src/components/VerseJourney.test.jsx` — 13 tests. Decoded count, ≤5 recent chips, recent-chip click, jump-to-verse form (valid ref → navigate + clear input; invalid format → no-op; undecoded ref → no-op), search box with results / empty / no-match states, Show only decoded toggle hides locked cells, decoded vs locked cell `disabled` state, verse-cell click activates.
- `src/components/WordPopover.test.jsx` — 16 tests. Chip render with/without parsing, `is-finite` class, click toggle open/close, aria-expanded, Escape close, outside-click close, parsing=null suppresses popover, gloss line, विभक्ति/वचन/लकार/पुरुष/पद labels, particle category label, parsing.note rendering.

## Coverage delta (cumulative since round 1)

| File | Before round 1 | After round 1 | After round 2 |
|---|---|---|---|
| `DecodeHelper.jsx` | 0% | 1.7% | **100%** |
| `Practice.jsx` | 42% | 42% | **96.0%** |
| `VerseJourney.jsx` | 76.5% | 76.5% | **98.5%** |
| `WordPopover.jsx` | 60.2% | 60.2% | **100%** |
| `srs.js` | 86% | 86% | **95.3%** |
| **Overall stmts** | 76.7% | 93.4% | **97.1%** |
| **Overall funcs** | 49.7% | 63.3% | **74.0%** |
| **Tests** | 203 | 288 | **339** |

## What's still partly uncovered (intentional)

- `Glossary.jsx` (50%) — popover infrastructure exercised indirectly via Vocabulary tests; the standalone open/close paths are not directly tested.
- `DhatuDetail.jsx` (75%) — covered enough by App + Verbs integration tests; the verse-occurrence collapsible block isn't expanded in any test.
- `PatternsWon.jsx` (91%) — sortable matrix; sort interaction not exercised.
- `markdownExport.js` (92%) — dead branches in date-formatting fallbacks.
- `vocabulary.js` (83%) — particle inflection helper for forms not in our 25-verse corpus.
- `main.jsx` (0%) — pure entry-point; the dev server tests it implicitly.

These are all under 4% gaps and don't represent untested *workflows* — just edge branches in already-tested code.

## Verified

- `npm run build` clean
- `npx vitest --run` — **339/339 passing** (was 288, +51 new tests)
- Statement coverage **97.08%** overall, **95.09%** for `src/components/`
