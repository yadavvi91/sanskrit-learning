# Checkpoint 30 — Cross-tab learning workflows: doc + integration tests

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Commit:** `f60e7cd`
**Slice:** Workflows-as-tests

## What changed

Per-component tests (added in checkpoints 28-29) catch interactions inside one component. They don't catch what *real users* do — multi-tab journeys like "read a verse → notice an indeclinable → cross to Atlas → return to verse." This slice writes those journeys down as both a reference document AND executable tests.

Two artifacts:

- **[`docs/workflows.md`](docs/workflows.md)** — 10 named workflows (W1-W10), each with plain-English steps, a "why this matters" pedagogical note, a Mermaid sequence diagram (renders in GitHub / Obsidian / VS Code), and a pointer to its test.
- **[`src/__tests__/workflows.test.jsx`](src/__tests__/workflows.test.jsx)** — 10 integration tests, full `<App />` mounted under `MemoryRouter`, each walking one workflow end-to-end.

The 10 workflows:

| | Workflow | Cross-tab path |
|---|---|---|
| W1 | Verse → Avyaya detour → return (the user's exact "explore an adverb" example) | Journey → Atlas → Journey |
| W2 | Sandhi confusion → Sandhi Lab → return | Journey → Atlas → Journey |
| W3 | Compound discovery: Bank → verse → context | Atlas → Journey |
| W4 | Verb deep-dive: Periodic Table → Stack Builder → reverse decode | Verbs (intra) |
| W5 | Multi-verse exploration via search + jump | Journey rail |
| W6 | Theme switch persists across navigation | Any → Any |
| W7 | Patterns Won → first-met verse → context | Patterns → Journey |
| W8 | Type Identifier drill → Type Reference → drill again | Atlas/Samasa (intra) |
| W9 | Decode Helper → paste verse → Copy clipboard | Decode (intra) |
| W10 | Practice fail → study verse → retry (SRS round-trip) | Practice → Journey → Practice |

W1 in particular implements the user's literal example — *"read a verse, look at translation, explore some adverbs, come back to the verse"* — as Verse 2.3 → Atlas/Pronouns → Atlas/Avyaya → Verse Journey → jump form to 2.3.

## Why this matters

The user flagged that the existing routing.test.jsx "only mounts each route and checks a component shows up" — it didn't exercise actual click-through journeys. This slice closes that gap. The doc itself is also a contributor reference: "what is this app supposed to do?" answered as 10 stories instead of a feature list.

## Verified

- `npm run build` clean
- 349/349 tests passing (was 339 before this slice, +10 workflow tests)
- Mermaid diagrams render correctly in GitHub markdown preview

## Out of scope

- Implementing more workflows (e.g. Decoded-so-far rail mass interactions) — the 10 cover the primary cross-tab paths
- Visual regression tests (no snapshot tooling configured)
- Browser back/forward semantics — `MemoryRouter` doesn't simulate browser history fully

## Relation to other plans

This is part of a broader quality push captured retrospectively in `plans/v11-quality-and-workflows.md`. Followed by:

- checkpoint-31 — bug fix (hyphen-insensitive क्रिया matching in 2.4) + wordParsings backfill on 21 verses + Primer update
- checkpoint-32 — Atlas → Declensions tab + popover deep-link (the major feature add)
