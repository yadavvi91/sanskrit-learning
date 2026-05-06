# Checkpoint v1 — App scaffolded

**Date:** 2026-05-07
**Stack:** Vite + React 18 (no TypeScript), CSS in one file, Vitest declared but unused.

## What this version is

The first runnable cut of the Sanskrit learning app described in `CLAUDE.md`. Two views, all four already-decoded Gītā verses, all 23 already-internalized grammar patterns, parchment aesthetic.

## Files added

```
package.json
vite.config.js
index.html
.gitignore
src/
├── main.jsx
├── App.jsx
├── styles.css
├── components/
│   ├── VerseJourney.jsx
│   ├── VerseDetail.jsx
│   └── PatternsWon.jsx
└── data/
    ├── chapters.js
    ├── verses.js
    └── patterns.js
checkpoint-1.md
```

## What works

### Verse Journey (`src/components/VerseJourney.jsx`)
- Left rail lists the four decoded verses **in decode order** (1.1 → 2.3 → 2.4 → 2.5), each with its tagline ("The WhatsApp verse — where this whole journey started" etc.).
- Below that: a collapsible list of all 18 chapters, each opening into a verse-number grid. Decoded cells render saffron and are clickable; the rest are greyed and locked. Chapters 1 and 2 default open.
- Right pane shows the selected verse via `VerseDetail`.

### Verse Detail (`src/components/VerseDetail.jsx`)
Full decode pipeline rendered as discrete sections per `verses-decoded.md`:

1. **मूल** — original verse, line by line.
2. **पदच्छेद** — word-split chips. The finite verb form(s) are highlighted saffron so the sentence anchor pops on sight.
3. **सन्धि notes** — collapsible.
4. **क्रिया** — one card per finite verb with धातु / लकार / पुरुष / वचन / gloss as discrete fields, not prose. कृदन्त (absolutive, infinitive, predicate adjective) listed separately so they don't get mistaken for the anchor.
5. **विभक्ति** — case-role notes.
6. **विवेकः** — the key fights won on this verse (the realisations that landed).
7. **अन्वय** — SOV reordering.
8. **हिंदी** — Hindi.
9. **English** — last, in italics.

### Patterns Won (`src/components/PatternsWon.jsx`)
All 23 patterns from `patterns-won.md`, grouped: **Noun System (7)** · **Verb System (7)** · **Kṛdanta (4)** · **Decode Method (6)**. Each card: name + meaning + the verse that unlocked it (with the example token).

### Aesthetic
Parchment palette wired exactly to the values in `CLAUDE.md`:
- parchment `#faf4e8`, ink `#1c1008`, gold `#b5770d`, saffron `#c17f24`, sage `#4a5e4a`
- Noto Serif Devanagari for Sanskrit/Hindi, Cormorant Garamond for prose, Cinzel for small caps
- Subtle parchment grain via a fixed background pattern.

## Verified

- `npm install` — clean, 92 packages.
- `npm run build` — clean, 37 modules, 447ms.
- `npm run dev` — Vite ready in 189ms; localhost:5173 returned HTTP 200.

## Not done in v1 (deliberate)

- **Browser eyeball check.** I couldn't render the page myself this session (computer-use + Claude Preview MCPs were disconnected). UI tuning waits for human eyes.
- **Pattern → verse jump.** Clicking a pattern's "unlocked by Gītā 2.4" should switch to Verse Journey and select that verse. Not wired yet.
- **Sandhi-aware highlighting** in the मूल lines (color-coding the joins that the पदच्छेद undoes). Currently the splits are listed but not visually anchored back to the verse.
- **Tests.** `package.json` declares Vitest but no specs exist. The Awadhi project had golden-master tests; this one will eventually too.
- **Cross-linking patterns to verse details.** A pattern triggered by 2.4 should also show up annotated *in* the 2.4 detail panel.

## How to extend

- **Add the next decoded verse:** one new entry in `src/data/verses.js` with `decodeIndex: 5`. The journey rail and the chapter grid pick it up automatically.
- **Add a new pattern:** one new entry in the right category in `src/data/patterns.js`.
- **Tweak palette/fonts:** all in `src/styles.css` `:root` block.
