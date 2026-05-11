# Checkpoint 44 — Searchable dhātu picker in Stack Builder Forward

**Date:** 2026-05-11

## Trigger

> *"In the 'FORWARD - BUILD A FORM' the dropdown is too long, can we add a way to search it as well"*

After the 49 stub additions and futureStem hydration passes, the dhātu set in the Verbs page is up to ~190 entries. The Forward-mode `<select>` rendering them all is unworkable — you scroll forever to find a particular dhātu and there's no way to jump by IAST, meaning, or गण number.

## What changed

The 190-entry `<select>` is replaced with a custom `DhatuCombobox`. Trigger button shows the current selection (`भू — be (गण 1) ▾`); clicking opens a popover with:

- a **search input** at the top, auto-focused
- filter matches against **devanāgarī**, **IAST**, **first meaning**, or **गण number**
- **arrow keys** navigate filtered results; **Enter** commits
- **Escape** or **outside-click** closes
- the row layout shows `[देवनागरी] [iast] [meaning] [गण N]` per entry
- the currently-selected dhātu is highlighted; the active arrow-row gets a subtle gold tint

The other Forward pickers (गण-readonly, लकार, पद, पुरुष, वचन) stay as plain `<select>` — they have ≤ 5 options each and need no search.

## Files

- `src/components/StackBuilder.jsx` — `DhatuCombobox` component (95 lines); replaces just the dhātu picker. Other pickers untouched.
- `src/styles.css` — `.dhatu-combobox*` styles (~120 lines): trigger button, popover with shadow, search input, scrollable list with grid-rows.
- `src/components/StackBuilder.test.jsx` — Forward tests updated:
  - `'changing the dhātu picker updates the resulting form'`: now clicks the trigger, types into search, clicks first row
  - select-index assumptions shifted (`selects[0]` is now लकार, `selects[1]` is पद — since the dhātu select no longer exists)

## Tests

All 581 passing including the new combobox interaction test. JSDOM doesn't implement `scrollIntoView` — guarded with a `typeof` check so the scroll-on-arrow-key effect is a no-op in tests but works in the browser.

## Out of scope

- The Reverse mode still takes its dhātu list as `dhatus` prop and runs `decompose_reverse` against the whole set — no picker needed there.
- The Periodic Table on `/verbs` has its own filter chips (Top 10/25/50/100/192/In Gītā) that already serve the "narrow the 190-entry list" need on that surface.
