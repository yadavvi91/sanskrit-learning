# Plan v18 — Latin-roots sweep, Pages-deploy polish, chapter sidebar, searchable dhātu picker

**Status:** Shipped. Operational polish that accumulated alongside v16/v17.

## Context

A grab-bag of UI/data fixes that landed between v15 (Pages deploy) and the v19 (DCS migration). Documented retrospectively for the project-version timeline.

## Slices

### Slice 1 — Latin roots → Devanāgarī (`5464d32`, `79b71c1`, `34e938b`)

The bulk-vocab files (`_vocab_extended_part1-10.js`) had ~470 entries with `root:` fields in Latin (IAST without diacritics, like `'avesita-cetas'`, `'√bhu'`, etc.). Two one-shot transliteration scripts converted them all to Devanāgarī.

- `scripts/iast-to-deva-roots.mjs` — pass 1 (Latin-leading): 341 conversions
- `scripts/fix-roots-corrections.mjs` — hand-corrections for diacritic-stripped mistakes (37 fixes: `अवेसित-चेतस्` → `आवेशित-चेतस्`, `भुत` → `भूत`, etc.)
- `scripts/iast-to-deva-roots-pass2.mjs` — pass 2 (√-prefixed Latin): 126 conversions
- Final mop-up: 2 hyphen-prefixed fragments

Final state: 0 Latin-only roots across all data files.

### Slice 2 — Searchable dhātu picker in StackBuilder (`8b4d299`)

The 190-entry `<select>` in Forward mode was unworkable. Replaced with `DhatuCombobox`: trigger button, search input filters by devanāgarī / IAST / meaning / गण number, arrow keys + Enter/Escape/outside-click.

### Slice 3 — Verbs page auto-tier on deep-link (`be12a7d`)

Deep-linking to `/verbs/<id>` could land the user on a Periodic Table tier that excluded the selection. `defaultTierFor(dhatu)` auto-widens to the narrowest tier containing the selected dhātu; doesn't override a user-widened view.

### Slice 4 — WordPopover पद Devanagari labels + Top-10 filter (`be12a7d`)

- WordPopover पद row now maps `'Kr'` → "कर्मणि (passive)" and `'U'` → "उभयपद" alongside `P/A`.
- DhatuPeriodicTable null-frequency-rank filter fix (49 stub dhātus were leaking through every Top-N tier because `null > N` evaluates false in JS).

### Slice 5 — Chapter sidebar: open only active chapter by default (`5543aea`)

VerseJourney chapter sidebar previously hardcoded chapters 1–2 to always be open. Replaced with: only the chapter containing the active verse opens by default; user-manually-opened chapters stay open across navigations via local `userToggled` state.

### Slice 6 — Empty-popover audit + zero-empty regression test (`394af6d`, `c300bc2` and related)

`src/__tests__/empty-popover-audit.test.js` walks every padaccheda word across the corpus and fails CI if any would land on `<EmptyPopover/>`. Used as a canary for vocab gaps. The generic `-ो → -ः` visarga normaliser was the biggest single improvement.

### Slice 7 — Splitter-bugs audit script (`5d6d85c`)

`scripts/find-splitter-bugs.mjs` — walks every verse, runs autoDecode, flags padas matching splitter-fragment heuristics. Used to scope SPLITTER_OVERRIDES work.

### Slice 8 — Sandhi rule inventory comment (`913148a`)

Comment block at the top of `sandhi.js` listing all 21 Pāṇinian sandhi families with status tags (✅/⚠️/❌/📍). Updated as new rules get wired.

## Verification

- 582/582 tests pass.
- All scripts in `scripts/` are idempotent and committed.
- Tagged at `pre-dcs-migration`.
