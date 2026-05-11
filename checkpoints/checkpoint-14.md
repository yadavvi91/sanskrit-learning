# Checkpoint v14 — v7 Slice 2: References panel (translations + commentaries)

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v7, slice 2

## What changed

Each of the 4 decoded verses now carries a `references` field containing:
- **Two public-domain English translations** — Edwin Arnold (*The Song Celestial*, 1885) and Annie Besant (1895)
- **Two commentary positions** — Shankara (अद्वैत) and Ramanuja (विशिष्टाद्वैत)

Rendered in a new **टिप्पणी / References** section at the bottom of the decode pipeline. Each entry is a collapsible `<details>` card; translations have a saffron left-border, commentary positions have a sage left-border. The translator/sage line shows the year + a small "PD" license tag for translations and the school for commentaries.

A disclaimer at the bottom of each commentary card explicitly notes the summary is "based on the well-known [sage]-tradition reading; not a direct quotation" — the school's classical reading is summarised rather than quoted from any modern English rendition of Ramanuja/Shankara, which would have its own copyright.

## Why

The user reads on holy-bhagavad-gita.org during decoding for both translations and commentaries. Slice 1 added an external link; slice 2 brings two well-known PD translations + the two major commentary positions inline so the reference layer is right there.

The PD-only constraint matters: it means future expansion to all 700 verses can ship without per-translation licensing.

## Files touched

- [src/data/verses.js](src/data/verses.js) — added `references` to all 4 verses
- New: [src/data/verses.refs.test.js](src/data/verses.refs.test.js) — 6 shape-validation tests
- [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — new `<References>` sub-component, mounted as a final pipeline section
- [src/styles.css](src/styles.css) — `.references`, `.ref-card`, `.ref-translation`, `.ref-commentary`, etc.

## Verified

- `npm run build` clean (60.08 KB CSS, 312 KB JS)
- `npm test -- --run` — **104/104 passing** (was 98; +6 verse-references shape tests)
- Manual: opened each of the 4 verses → expanded each translation card → text reads correctly; expanded each commentary card → school + summary + disclaimer all render.

## Translation choices

- **Edwin Arnold (1885)** — *The Song Celestial*, the most-quoted Victorian Sanskrit→English Gītā translation, fully public domain via Wikisource.
- **Annie Besant (1895)** — slightly more literal than Arnold, also public domain. Useful complement.

Both shipped with `license: 'public-domain'`. Test asserts no non-PD translations sneak in unintentionally.

## Future expansion

The `references` shape supports `license: 'public-domain' | '<other>'`. Adding modern translations (Easwaran, Debroy) would change the test, force a license-flag review, and add a "Used with permission" or other compliance label. For now, PD-only is the simplest path.
