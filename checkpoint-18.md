# Checkpoint v18 — v8 Slice 1: Sandhi engine

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v8, slice 1

## What changed

A working sandhi-undo engine in `src/utils/sandhi.js`. Given a sandhi-joined string, returns candidate splits + the rules applied. Handles:

**21 rules across 3 categories:**
- **Visarga** (8): `श्च`, `श्छ`, `स्त`, `स्थ`, `ष्क`, `ष्प`, `ओ` (visarga before voiced)
- **Consonant** (6): `च्च`, `ज्ज`, `ल्ल`, `द्द` auto + `त्त`, `ं` (anusvāra) opt-in
- **Vowel + Yaṇ** (7): savarṇa-dīrgha, guṇa, vṛddhi, yaṇ — all opt-in via whitelist

**Two-pass algorithm:**
1. Visarga + consonant rules iterate until convergence (unambiguous; safe to fire anywhere)
2. Vowel rules + yaṇ fire once per part, gated by a left-context whitelist (न, च, स, …) or an absolutive-ending heuristic (`-त्व`)

**The lexical-ambiguity problem:** without a Sanskrit lexicon, the engine can't tell sandhi-junctions from internal matras (e.g., the `ा` in `पाण्डवाः` vs the `ा` in a sandhi `अ + अ → ा`). The whitelist + ending heuristics handle the common Gītā cases; documented limitations point users to the Sandhi Lab (slice 2) for explicit interrogation.

## Why

The user has been hand-undoing sandhi on every decoded verse. CLAUDE.md flags it as "deliberately deferred" project-wide; this slice stops deferring. With the engine, decode tooling can run sandhi-suggestion automatically on the mool string and present the user with a candidate `padaccheda`.

## Verified against the canonical Gītā cases

- `पाण्डवाश्च` → `पाण्डवाः · च` ✓ (visarga-ca)
- `पाण्डवाश्चैव` → `पाण्डवाः · च · एव` ✓ (visarga-ca + aa-e)
- `नैतत्` → `न · एतत्` ✓ (aa-e)
- `त्यक्त्वोत्तिष्ठ` → `त्यक्त्वा · उत्तिष्ठ` ✓ (aa-uu, fired via `-त्व` ending)
- `त्वय्युपपद्यते` → `त्वयि · उपपद्यते` ✓ (yaṇ)
- `तच्च` → `तत् · च` ✓ (t-cha)
- `तज्जयति` → `तत् · जयति` ✓ (t-ja)
- `पाण्डवाः` (no sandhi) → `पाण्डवाः` ✓ (correctly unchanged)

## Files touched

- New: [src/utils/sandhi.js](src/utils/sandhi.js) — rule catalogue + `undoSandhi()` + `describeRule()`
- New: [src/utils/sandhi.test.js](src/utils/sandhi.test.js) — 14 tests covering each rule category, the canonical Gītā joins, error inputs, chaining

## Verified

- `npm run build` clean (62.82 KB CSS, 319 KB JS)
- `npm test -- --run` — **147/147 passing** (was 133; +14 sandhi tests)

## Known limitations (documented, deferred)

- Internal gemination ambiguity for `त्त`, `ं` — opt-in only. Sandhi Lab will let users force-fire.
- Vowel sandhi outside the whitelist won't auto-detect (e.g., a hypothetical `रामो उवाच` form). User can opt-in via Sandhi Lab.
- Sandhi *generation* (combining parts to a join) — out of scope per plan-doc.
