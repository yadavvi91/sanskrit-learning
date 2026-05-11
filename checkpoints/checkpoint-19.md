# Checkpoint v19 — v8 Slice 2: Sandhi Lab in the Atlas

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v8, slice 2

## What changed

A new **सन्धि / Sandhi Lab** sub-tab in the Atlas (between Compounds and Case-roles). Paste any sandhi-joined string → see:

1. **The reconstructed parts** as bordered chips with `·` separators
2. **Rules applied** as an ordered list, with rule name + category + description + canonical example
3. **Full rule catalogue** as a collapsible 21-entry grid

5 preset buttons cover the canonical Gītā joins (पाण्डवाश्चैव, नैतत्, त्यक्त्वोत्तिष्ठ, त्वय्युपपद्यते, तच्च) so the user can verify the engine on known cases without typing.

When the engine can't recognise sandhi (e.g., the input is already unjoined or the sandhi happens at a position that needs lexical disambiguation), the lab shows a clear "No sandhi-junction recognised" message rather than a wrong split.

## Why

The engine from slice 1 needs a surface. The Atlas — which already houses the user's "everything-else grammar" reference — is the natural home. Bonus: the Lab provides an interactive way for the user to learn sandhi rules by experimentation, completing the Atlas's pedagogical role.

## Files touched

- New: [src/components/SandhiLab.jsx](src/components/SandhiLab.jsx) — input + presets + result panel + rule catalogue
- [src/components/Atlas.jsx](src/components/Atlas.jsx) — added `sandhi` sub-tab between Compounds and Case-roles
- [src/styles.css](src/styles.css) — `.sandhi-input`, `.sandhi-preset`, `.sandhi-result-part`, `.sandhi-rules-catalogue`, etc.

## Verified

- `npm run build` clean (66.14 KB CSS, 328 KB JS)
- `npm test -- --run` — 147/147 passing
- Manual: every preset produces the expected split; full rule catalogue renders with category chips ("opt-in" tag for त्त and ं); typing a non-sandhi string shows the "no junction recognised" message.

## Not done

The lab is **read-only on rules** — rule catalogue can be browsed but not toggled per-input. A future "advanced" mode could let the user enable opt-in rules (त्त, ं) on demand.
