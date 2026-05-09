# Checkpoint v4 — Slice 1: revert विग्रह, co-locate sandhi + samas

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v6 refinement, slice 1

## What changed

Reverted the विग्रह relabel introduced earlier on this branch. The compound block in [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) is back inside the पदच्छेद section, as a second `<details>` block right beside the sandhi `<details>`. Both labeled and styled consistently:

- `<summary>सन्धि — N notes</summary>`
- `<summary>समास — N compounds</summary>`

The Glossary popover for समास lives on the section's पदच्छेद label (no separate section header). Stripped the unused `.vigraha-list` style from `src/styles.css`.

## Why

User feedback: in their training विग्रह specifically refers to *sandhi-विग्रह*, not compound analysis. Promoting the compound block into a standalone "विग्रह" pipeline step also separated it from sandhi — but both सन्धि and समास are *un-doing* operations: undo sandhi to recover words, undo समास to recover the components. They belong together visually as the work that happens *inside* पदच्छेद, not as separate pipeline steps.

Putting them back together also restores the layout from the earlier commit `3140c85` (the original samas-annotations release) — which is the layout the user was happy with.

## Files touched

- [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — collapsed the standalone विग्रह `<Section>` back into the पदच्छेद section
- [src/styles.css](src/styles.css) — removed `.vigraha-list`

## Verified

- `npm run build` clean (44.95 KB CSS, 247 KB JS)
- `npm test -- --run` — 71/71 passing

## Not done in this slice

This is the terminology revert only. The decode pipeline reads पदच्छेद → क्रिया → … with sandhi + samas as collapsible sub-blocks of पदच्छेद, identical to the layout the user already approved in checkpoint-2. Visual fixes (Periodic Table, formula chips, स्म-cells, primer cross-links) come in slices 2–8. Routing comes in slice 9.
