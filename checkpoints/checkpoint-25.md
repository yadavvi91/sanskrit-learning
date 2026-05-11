# Checkpoint v25 — v10 Atlas-as-reference pivot

**Date:** 2026-05-08 (retrospective)
**Branch:** `implement-all-plans`
**Slice:** v10 slice E — the structural correction

## What changed

The Compound Bank had been tightly coupled to `verse.samasNotes[]` since v3 (Grammar Atlas). That coupling made the bank a *verse-summary*, not a *reference*. The user named the design tension directly:

> "Why are you doing piecemeal additions? At least for references. Example, the verb, the nouns that we have, we never thought of only adding those references which belong to the verses that we have read. We've added almost all of the mappings that we could. That is what we want. This is Atlas. This is a reference. This is not something that is only related to the whatever comes in Gita."

This slice corrects the design. Two changes:

### 1. `src/data/samasaRefBank.js` (new) — 50 canonical compounds

A reference catalogue that lives independent of the project's verse corpus. Examples drawn from classical, epic, devotional, and vedic Sanskrit, each marked with a `source` tag. **All 10 types covered**, including अव्ययीभाव (which doesn't appear in our 25-verse Gītā corpus but every introductory grammar teaches it):

- तत्पुरुष family (षष्ठी / द्वितीया / तृतीया / चतुर्थी / पञ्चमी / सप्तमी / उपपद / कर्मधारय / द्विगु)
- द्वन्द्व family (इतरेतर / समाहार)
- बहुव्रीहि (पीताम्बरः, चक्रपाणिः, दशाननः, चन्द्रशेखरः, महाबाहुः)
- **अव्ययीभाव** (यथाशक्ति, यथाक्रमम्, यथाविधि, अनुगङ्गम्, उपगिरि, प्रत्यक्षम्, सायम्प्रातः) — **previously had zero entries; the family-filter chip now produces results**
- नञ्-समास (अधर्मः, अहिंसा, अनासक्तिः, अनार्यः, अकर्म)

Compound Bank UI now toggles between two layers:

| Mode | Source | Count | Purpose |
|---|---|---|---|
| **Reference catalogue** | `samasaRefBank.js` | 50 | Atlas-as-reference: type-complete, learn the categories |
| **From your verses** | auto-grown from `verses.js → samasNotes[]` | 39 | "Compounds I've personally encountered" |

Both filterable by family. The two views are complementary, not redundant — like the dhātu data has always been (top-25 dhātus regardless of Gītā coverage).

### 2. `SANDHI_RULES` — multiple examples per rule

Every rule in [src/utils/sandhi.js](src/utils/sandhi.js) now carries `examples: []` (was a singular `example`). Most have 2–3 examples each, drawn from both:

- **The project corpus** — explicit Gītā references (1.1, 2.3, 2.13, 2.14, 2.62, 9.22, 9.27)
- **Classical examples** not tied to any specific verse (देवः+अपि → देवोऽपि, सुर+इन्द्र → सुरेन्द्र, अति+उत्तम → अत्युत्तम, etc.)

[src/components/SandhiLab.jsx](src/components/SandhiLab.jsx) catalogue is now **open by default** and renders all examples per rule, not just the first.

### 3. Sandhi Lab purpose clarified

Added a callout at the top of the Lab distinguishing its role from per-verse sandhi notes:

> **Verse Detail → सन्धि block** — hand-curated notes for a specific decoded verse. Read-only. The "what splits where" answer for the verse you're looking at.
>
> **Sandhi Lab (this)** — interactive engine. Paste arbitrary input from anywhere and see the engine's analysis with rule names. For junctions the verse's own notes don't cover.

User had asked "what is the Sandhi lab for? And the decode that yours showing us, that is for, again, the same, Sandhi?" — the answer was already in the architecture, just not in the UI text.

## Why

The user's framing — "Atlas is a reference, this is not something that is only related to whatever comes in Gita" — is correct as a design principle. The dhātu data had always been built that way (top-25 by frequency, regardless of which Gītā verses they appear in). Samāsa and sandhi should be the same. This slice belatedly applies the principle.

## Files touched

- New: [src/data/samasaRefBank.js](src/data/samasaRefBank.js) — 50 entries + helper for family counts
- [src/components/Samasa.jsx](src/components/Samasa.jsx) — dual-mode toggle ("Reference" / "From your verses")
- [src/utils/sandhi.js](src/utils/sandhi.js) — `examples: []` on every rule
- [src/components/SandhiLab.jsx](src/components/SandhiLab.jsx) — clarifying intro + multi-example rendering + catalogue open by default
- [src/styles.css](src/styles.css) — `.samasa-mode-toggle`, `.samasa-mode-btn`, `.bank-ref-source` for the new UI
- [src/data/samasa.test.js](src/data/samasa.test.js) — bank-size assertion now grows with the corpus instead of being hard-pinned

## Verified

- `npm run build` clean
- `npm test -- --run` — 203/203 passing
- Manual: Atlas → Compounds → "Reference catalogue" → click अव्ययीभाव chip → 7 entries appear (was 0 in the verse-grown bank)
- Sandhi Lab → catalogue is open, every rule shows 2–3 worked examples

## Not done

- Comprehensive sandhi reference catalogue independent of `SANDHI_RULES` (current solution multiplies examples per rule, which is enough)
- Cross-linking from Lab examples back to Verse Journey for the corpus-derived ones (would need verse-ref tags on examples)
