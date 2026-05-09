# Plan v1 — React app: Verse Journey + Patterns Won (retrospective)

> **Retrospective.** Written after-the-fact to document what was built on the fly without a forward-looking plan. The actual implementation shipped in commit `52644f1` and was incrementally extended through commits `3140c85` (समास annotations) and `a706f4e` (expanded patterns) over the v1 lifetime. checkpoints/checkpoint-1.md and checkpoints/checkpoint-2.md are the contemporaneous change-log entries; this document is the would-be-plan that should have preceded them.

**Date drafted retrospectively:** 2026-05-08
**Dates the work itself happened:** 2026-05-07 (initial app + samas) → 2026-05-08 (patterns expansion)

---

## What this version is

The first runnable cut of the Sanskrit learning app, plus two in-place enhancements that landed during v1's lifetime. v1 turns v0's four markdown files into an actually-usable web app — two views, parchment aesthetic, four decoded verses live, 23 → 29 grammar patterns tracked.

If v0 was *the data*, v1 is *the surface that renders the data*.

---

## Goals (retrospectively)

1. **Make the v0 corpus browsable** — chapter/verse grid (like holy-bhagavad-gita.org's, the visual that started this whole journey), decoded cells unlock and open into the full pipeline.
2. **Make the 23 grammar patterns visible** — so each "fight won" is a tangible artefact, not just notes lost in a markdown file.
3. **Re-use the Awadhi visualizer's design language** — same parchment palette, same fonts, same emotional register.
4. **Stay simple** — Vite + React, no TypeScript, plain JSX, no router, no state management. One CSS file. Vitest declared but unused.

---

## Decisions (retrospectively recorded)

| Decision | Choice | Reason |
|---|---|---|
| Stack | Vite + React (plain JSX) | Matches Awadhi visualizer; fastest path to a runnable app |
| Routing | None — view switcher in masthead | Two views; routing would be ceremony |
| State | `useState` only, no global store | App is small; lifting state between two views is not needed |
| TypeScript | No | The grain of the project is exploration; compile-step friction not worth the safety yet |
| CSS | One `src/styles.css` | Mirrors Awadhi project; keeps everything visible |
| Tests | Declared, not written | Add when shape stabilizes; the four verses won't change much |
| Data source | Mirror v0 markdowns into JS data files | Markdowns stay canonical; JS becomes runtime form |

---

## Two views — design

### View 1 — Verse Journey

Two-column layout: left rail (sticky) + right pane.

**Left rail (sticky, scrollable):**
- "Decoded so far" — ordered list of decoded verses by `decodeIndex` (1.1 → 2.3 → 2.4 → 2.5). Each item shows the verse ref + tagline (e.g., "The WhatsApp verse — where this whole journey started"). The numbering on the rail is the *decode order*, not the canonical Gītā ordering — this is intentional. The list tells the *story* of the learning, not the structure of the text.
- "All chapters" — collapsible 18-chapter list. Each chapter expands to its verse-number grid.
- Decoded cells: saffron, clickable. Locked cells: greyed, disabled.
- Chapters 1 and 2 default open (every decoded verse so far is in those two).

**Right pane:**
- The full decode pipeline rendered as discrete sections, in this order:
  1. **मूल** — original verse, line by line
  2. **पदच्छेद** — word-split chips. The finite verb form(s) highlighted saffron.
  3. **सन्धि notes** — collapsible
  4. **समास notes** — collapsible (added in v1's lifetime — see "Extensions" below)
  5. **क्रिया** — one card per finite verb with धातु / लकार / पुरुष / वचन / gloss as discrete fields
  6. **कृदन्त** — non-finite forms listed separately so they don't get mistaken for the anchor
  7. **विभक्ति** — case-role notes
  8. **विवेकः** — the key fights won on this verse (the realisations that landed)
  9. **अन्वय** — SOV reordering
  10. **हिंदी** — Hindi translation
  11. **English** — italicized

### View 2 — Patterns Won

Single column, grouped grid.

- 4 categories, each in a parchment-deep card: Noun System / Verb System / Kṛdanta / Decode Method (initial v1).
- After patterns expansion (commit `a706f4e`): 6 additional sections — adjectives, adverbs, articles, pronouns, conjunctions, negation.
- Each pattern card: name + 1–2 sentence meaning + "unlocked by Gītā X.Y" + example token.

---

## Aesthetic

Parchment palette wired exactly to `CLAUDE.md`:

- Parchment `#faf4e8` · ink `#1c1008` · gold `#b5770d` · saffron `#c17f24` · sage `#4a5e4a`
- Parchment-deep `#f3eada` · parchment-edge `#e8dcc1`
- Subtle parchment grain via fixed background pattern

Fonts:
- **Noto Serif Devanagari** — Sanskrit/Hindi
- **Cormorant Garamond** — prose
- **Cinzel** — small caps (labels, metadata, masthead title)

Visual signals:
- Saffron = alive / clickable / decoded / finite-verb
- Greyed = locked / undecoded / not-yet
- Sage = कृदन्त accents
- Gold = समास accents (added later)

---

## Data architecture

Two mirrors:

- `verses-decoded.md`, `patterns-won.md`, `sanskrit-reference.md` — human-editable markdown, source of truth
- `src/data/verses.js`, `src/data/patterns.js`, `src/data/chapters.js` — runtime form, mirrored from the markdowns

The 18 chapters (`chapters.js`) carry only `{ number, name, verseCount }` — the grid scaffolding. Verses (`verses.js`) carry the full decoded content. Patterns (`patterns.js`) carry name + meaning + trigger.

`getVerse(chapter, verse)`, `isDecoded(chapter, verse)`, `VERSE_MAP` are exported helpers used by the two views.

---

## Files (v1 — initial)

Initial commit `52644f1` shipped:

```
package.json
package-lock.json
vite.config.js
index.html
.gitignore
CLAUDE.md                       (v0 framing)
verses-decoded.md               (v0 data)
patterns-won.md                 (v0 data)
sanskrit-reference.md           (v0 data)
checkpoints/checkpoint-1.md
src/
├── main.jsx
├── App.jsx                     (view switcher + masthead + colophon)
├── styles.css                  (one file, full parchment styling)
├── components/
│   ├── VerseJourney.jsx        (left rail + chapter grid)
│   ├── VerseDetail.jsx         (full decode pipeline)
│   └── PatternsWon.jsx         (4-category grid)
└── data/
    ├── chapters.js             (18 chapters)
    ├── verses.js               (4 decoded verses, full pipeline)
    └── patterns.js             (23 patterns across 4 categories)
```

---

## v1 extensions (in-place, during v1's lifetime)

Two enhancements landed after the initial commit but before v2 began. They were small enough not to warrant their own version, large enough to checkpoint.

### Extension 1: समास annotations on all 4 verses (commit `3140c85`, checkpoints/checkpoint-2.md)

10 compounds across 4 verses, classified by type, rendered as a collapsible `<details>` block right under पदच्छेद, mirroring how sandhi notes already work.

| Verse | Compound | विग्रह | Type |
|---|---|---|---|
| 1.1 | धर्मक्षेत्रे | धर्मस्य क्षेत्रम् | षष्ठी तत्पुरुष |
| 1.1 | कुरुक्षेत्रे | कुरूणाम् क्षेत्रम् | षष्ठी तत्पुरुष |
| 2.3 | हृदयदौर्बल्यम् | हृदयस्य दौर्बल्यम् | षष्ठी तत्पुरुष |
| 2.3 | परन्तप | परान् तापयति इति | उपपद तत्पुरुष |
| 2.4 | मधुसूदन | मधुम् सूदयति इति | उपपद तत्पुरुष |
| 2.4 | अरिसूदन | अरीन् सूदयति इति | उपपद तत्पुरुष |
| 2.4 | पूजार्हौ | पूजायाः अर्हौ | षष्ठी तत्पुरुष |
| 2.5 | महानुभावान् | महान्तः अनुभावाः येषाम् ते | बहुव्रीहि |
| 2.5 | अर्थकामान् | अर्थः च कामः च | इतरेतर द्वंद्व |
| 2.5 | रुधिरप्रदिग्धान् | रुधिरेण प्रदिग्धान् | तृतीया तत्पुरुष |

Files touched: `src/data/verses.js` (`samasNotes` array on each verse), `src/components/VerseDetail.jsx` (second `<details>` block), `src/styles.css` (samas grid styling, gold accent), `verses-decoded.md` (mirrored).

One judgement call: अर्थकामान् in 2.5 is a द्वंद्व at the root used adjectivally with बहुव्रीहि flavour. Went with **इतरेतर द्वंद्व** + a gloss note rather than "बहुव्रीहि of a द्वंद्व" — simpler analysis, surfaces the more learnable pattern.

### Extension 2: patterns-won expansion (commit `a706f4e`)

Added 6 new sections to Patterns Won — adjectives, adverbs, articles, pronouns, conjunctions, negation. These didn't have full pattern entries yet, but stub sections in the data structure to make the upcoming Grammar Atlas (v3) coverage visible inside Patterns Won. Brought the total from 23 → ~29 (depending on how stub-vs-full is counted).

---

## What v1 deliberately deferred

From checkpoints/checkpoint-1.md, restated here as the formal v1 deferral list:

1. **Browser eyeball check** — computer-use + Claude Preview MCPs were disconnected during v1; UI tuning waits for human eyes.
2. **Pattern → verse jump** — clicking a pattern's "unlocked by Gītā 2.4" should switch to Verse Journey and select that verse. Not wired.
3. **Sandhi-aware highlighting** in the मूल lines (color-coding the joins that the पदच्छेद undoes). Splits are listed but not visually anchored back to the verse.
4. **Tests.** `package.json` declares Vitest but no specs exist. The Awadhi project had golden-master tests; this one will eventually too.
5. **Cross-linking patterns to verse details.** A pattern triggered by 2.4 should also show up annotated *in* the 2.4 detail panel.
6. **Glossary popovers** — covered in v4 (Primer), not here.

---

## Verification (retrospective)

Per checkpoints/checkpoint-1.md:

- `npm install` clean, 92 packages
- `npm run build` clean, 37 modules, 447ms
- `npm run dev` Vite ready in 189ms; localhost:5173 returned HTTP 200

Per checkpoints/checkpoint-2.md (samas extension):
- `npm run build` clean, 37 modules, 444ms
- Bundle deltas: CSS +1.1 KB, JS +1.8 KB

---

## How to extend v1 (if more work lands as v1.x)

Documented in checkpoints/checkpoint-1.md, restated here:

- **Add the next decoded verse:** one new entry in `src/data/verses.js` with `decodeIndex: 5`. The journey rail and chapter grid pick it up automatically. Mirror in `verses-decoded.md`.
- **Add a new pattern:** one new entry in the right category in `src/data/patterns.js`. Mirror in `patterns-won.md`.
- **Add a new samas:** add to `samasNotes[]` of the verse. Mirror in `verses-decoded.md`.
- **Tweak palette/fonts:** all in `src/styles.css` `:root` block.

---

## Out of scope for v1

- Verb conjugation engine → v2
- Pronoun reference, समास sub-app, कारक, अव्यय → v3
- Cold-start primer → v4
- SRS / +1 practice → v5
- Sandhi rules (project-wide deferred)

---

## Relation to other versions

| Version | Relationship to v1 |
|---|---|
| v0 | v1 is a runtime rendering of v0's data. v0 markdowns remain canonical. |
| v2 (Verb sub-app) | Adds a new top-level tab to v1's masthead. Does not modify v1's two views. |
| v3 (Grammar atlas) | Adds another top-level tab. Modifies VerseDetail.jsx — renames the समास block to विग्रह as part of the decode-pipeline upgrade. |
| v4 (Primer) | Adds a fourth top-level tab + jargon `?` triggers in v1's existing components + last-visit banner. |
| v5 (Practice mode) | Adds a fifth tab + Node backend; reads v1's data layer to seed cards. |
