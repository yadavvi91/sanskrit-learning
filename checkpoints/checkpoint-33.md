# Checkpoint 33 — Auto-stub enrichment: English (Besant), Arnold, Hindi, interpretive notes

**Date:** 2026-05-09

## What changed

After landing 676 auto-stub verses last checkpoint (mool only + tier badge + warning banner), this slice fills the empty fields. The user's directive: **"EVERYTHING"** — every field on every verse, paraphrase-flagged where uncertain, audit and tighten over time.

Bulk-generated via parallel agents in chapter-range partitions:

- **English (Annie Besant 1895, PD)** — 676 entries → `verse.english`
  - File: `src/data/translations-besant.js`
- **English (Edwin Arnold 1885, PD)** — 701 entries → `references.translations` as a second translator card
  - Files: `src/data/_arnold_part{1,2,3}.js` + `translations-arnold.js` wrapper
  - ~99% PARAPHRASE-flagged (Arnold's Victorian blank-verse style retained, exact wording uncertain)
- **Hindi gloss** — modern accessible Hindi → `verse.hindi`
  - Files: `src/data/_hindi_part{1,2,3}.js` + `translations-hindi.js` wrapper
  - Style: clarity over poetry; speaker tags ("अर्जुन ने कहा —", "भगवान ने कहा —", "संजय ने कहा —")
- **Interpretive notes** — `anvaya`, `vibhaktiNotes`, `keyFights`, `vyakhya` per verse
  - Files: `src/data/_interp_part{1,2,3}.js` + `interpretive.js` wrapper

Hydrator (`src/data/hydrate.js`) extended to fill these fields on auto-stub verses at module init, gated behind `!v.<field>` so hand-decoded verses (tier='full'/'browse') are never overwritten.

## Why this approach

Generating interpretive Sanskrit grammar for 676 unfamiliar verses is high-risk for a learning app — wrong vibhakti analysis would teach wrong grammar. The user explicitly chose "Everything, paraphrase-flagged" via clarifying question, accepting that the bulk content needs auditing. Better to have a substrate to react to (and tighten over time) than empty fields and a wall of mool-only verses.

The Decode Helper UI already has an "audit and promote" workflow — verses can be moved from auto-stub → browse → full as the user works through them. Generated content there is the starting line, not the finish line.

## Architecture

Each translation/interpretive lane is split into 3 chapter-range parts to keep individual agent context manageable:

- Part 1: chapters 1–6 (~280 verses)
- Part 2: chapters 7–12 (~209 verses)
- Part 3: chapters 13–18 (~212 verses)

Wrappers (`translations-arnold.js`, `translations-hindi.js`, `interpretive.js`) compose the parts via spread:

```js
import { ARNOLD_PART_1 } from './_arnold_part1.js';
import { ARNOLD_PART_2 } from './_arnold_part2.js';
import { ARNOLD_PART_3 } from './_arnold_part3.js';
export const ARNOLD_TRANSLATIONS = { ...ARNOLD_PART_1, ...ARNOLD_PART_2, ...ARNOLD_PART_3 };
```

This lets each part file be regenerated independently without touching siblings.

## Quality / risk profile

| Field | Source quality | PARAPHRASE rate |
|---|---|---|
| Besant English | PD 1895 | Variable; flagged inline |
| Arnold English | PD 1885 | ~99% flagged (Arnold's blank verse hard to recall verbatim) |
| Hindi gloss | Modern paraphrase | Not "from a specific PD source" — written fresh |
| Anvaya, vibhakti, keyFights, vyakhya | Agent interpretation | Treat as DRAFT until audited |

## Verification

- Build: green (~846 KB raw / ~291 KB gzipped — bundle warning accepted; user runs locally)
- Tests: 473/473 passing (no regressions)
- Spot-checked Arnold ch 13-18, Hindi ch 7-12, etc. as part files landed

## What's not in this slice

- **Auditing** — most generated content needs eventual review
- **Per-verse commentary positions** (Shankara/Ramanuja/Madhva) — these stay on the 25 hand-decoded verses; generating them at scale would be irresponsibly inaccurate even with PARAPHRASE flags
- **Tier promotion** — verses stay tier='auto-stub' even after enrichment; the Decode Helper is the path to promote
