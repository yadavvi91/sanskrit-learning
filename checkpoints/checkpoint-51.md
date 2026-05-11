# Checkpoint 51 — v18 ops polish: Latin-roots sweep + UI fixes + audit scripts

**Date:** 2026-05-12

## Trigger

A grab-bag of UI / data quality issues that accumulated alongside v16/v17.

## What shipped

1. **Latin roots → Devanāgarī sweep.** 469 entries across `_vocab_extended_part1-10.js` converted via three scripts:
   - `scripts/iast-to-deva-roots.mjs` — pass 1 (Latin-leading): 341
   - `scripts/fix-roots-corrections.mjs` — hand-corrections: 37
   - `scripts/iast-to-deva-roots-pass2.mjs` — pass 2 (√-prefixed): 126
   - Mop-up: 2 hyphen-prefixed fragments
   - Final state: 0 Latin-only roots across all data files

2. **Searchable dhātu picker in StackBuilder.** 190-entry `<select>` replaced with `DhatuCombobox`. Filters by devanāgarī / IAST / meaning / गण number; arrow keys + Enter/Escape/outside-click.

3. **Verbs page auto-tier on deep-link.** Deep-linking to `/verbs/<id>` now auto-widens the Periodic Table tier to the narrowest containing the selection.

4. **WordPopover पद Devanagari labels.** `'Kr'` → "कर्मणि (passive)" and `'U'` → "उभयपद" alongside `P/A`.

5. **Top-10 / Top-N filter null leak fix.** The 49 _dhatus_extra.js stubs (frequencyRank=null) were leaking through every tier due to `null > N === false`. Explicit null-check in the filter.

6. **Chapter sidebar auto-open behavior.** Only the chapter containing the active verse opens by default; user-manually-opened chapters stay open across navigations via local `userToggled` state.

7. **Empty-popover audit regression test.** `src/__tests__/empty-popover-audit.test.js` walks all padaccheda words across the corpus and fails CI if any would land on `<EmptyPopover/>`.

8. **Splitter-bugs audit script.** `scripts/find-splitter-bugs.mjs` — surfaces verses likely to have splitter mis-cuts. Used to scope SPLITTER_OVERRIDES work.

9. **Sandhi inventory comment.** Comment block at the top of `sandhi.js` listing all 21 Pāṇinian sandhi families with status tags. Living document — update when wiring or flipping `auto` flags.

## Files

- `scripts/iast-to-deva-roots.mjs` (new)
- `scripts/iast-to-deva-roots-pass2.mjs` (new)
- `scripts/fix-roots-corrections.mjs` (new)
- `scripts/find-splitter-bugs.mjs` (new)
- `src/components/StackBuilder.jsx` — DhatuCombobox
- `src/components/Verbs.jsx` — auto-tier
- `src/components/DhatuPeriodicTable.jsx` — null-rank filter
- `src/components/WordPopover.jsx` — पद labels
- `src/components/VerseJourney.jsx` — chapter sidebar logic
- `src/utils/sandhi.js` — inventory comment
- `src/__tests__/empty-popover-audit.test.js` (new)

## Tests

582/582 passing.
