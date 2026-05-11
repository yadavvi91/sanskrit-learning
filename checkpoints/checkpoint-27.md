# Checkpoint v27 — v10 retrospective documentation: plan-doc + checkpoints

**Date:** 2026-05-08 (retrospective)
**Branch:** `implement-all-plans`
**Slice:** v10 documentation pass

## What changed

This is the meta-checkpoint. Wrote retrospective documentation for the post-v0.8.0 work that emerged from rapid feedback rather than from a pre-planned phase.

- New plan-doc: `plans/v10-reference-and-expansion.md` — the v10 canonical record, mirroring the structure of v6/v7/v8 plan-docs (Context · Decisions · Slices · Files · Verification · Out of scope · Relation to other plans)
- New checkpoints — narrative records of what shipped, organised by coherent slice rather than commit-by-commit
  - `checkpoint-24.md` — corpus expansion (21 popular verses + क्रिया/अन्वय + Atlas backfills + व्याख्या)
  - `checkpoint-25.md` — Atlas-as-reference pivot (samasaRefBank, multi-example sandhi rules, Sandhi Lab clarification)
  - `checkpoint-26.md` — Words tab + sharedVocab + theme system + scroll/alignment polish
  - `checkpoint-27.md` (this file) — the documentation pass itself

## Numbering note

There's already a `plans/v9-decode-helper.md` from a parallel feature work (commit `bfbf966`) that I wasn't directly involved in. v10 is the natural next slot for this retrospective. checkpoint-23 was also taken (the Decode Helper checkpoint) so this set picks up at -24.

## Why retrospective

The v6 / v7 / v8 plans were written *before* the slice work began — pre-planned phases with locked decisions. The post-v8 work was different: tight feedback loop with the user driving each next step. There was no plan-doc preceding the work, and it shows in the shape: 21-verse corpus, then samāsa backfills, then sandhi backfills, then sharedVocab, then the Atlas-as-reference pivot, then theme polish, then scroll fixes — each prompted by direct user feedback on the previous one.

That's a different process from the locked-plan style, but it produced substantive work. The retrospective captures it for the same purpose the forward-plans served: making the project legible to a 3-month-later reader.

## Verified

- `npm run build` clean
- `npm test -- --run` — 203/203 passing
- Working tree contains the new docs; nothing else changed

## Out of scope

- Commit-by-commit narrative (the checkpoints group by slice, not by commit; see git log for the granular history)
- Updating `MEMORY.md` (the project-level convention memory in `~/.claude/projects/...`) — already records the small-commits + checkpoint-per-meaningful-task convention
