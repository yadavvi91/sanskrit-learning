# Checkpoint v26 — v10 Words tab + sharedVocab + UX polish

**Date:** 2026-05-08 (retrospective)
**Branch:** `implement-all-plans`
**Slice:** v10 slices B + C + F + G — vocabulary, theme system, scroll/alignment

## What changed

A grab-bag of UX improvements driven by direct user feedback while exercising the workbench at scale. Three coherent threads:

### 1. Vocabulary that scales: shared dictionary + filters + pagination

**Problem:** at 4 verses the Words tab showed ~40 entries with full glosses. After adding 21 verses (250+ words), most browse-tier vocabulary surfaced with no gloss because per-word `wordParsings` was only seeded for the original 4. User flagged: "*why no glossary for terms like अभिजायते क्रोधात् etc these look like normally used words.*"

**Fix:** new [src/data/sharedVocab.js](src/data/sharedVocab.js) — a hand-curated dictionary of ~200 entries covering:

- Particles (च, हि, तु, एव, अपि, इति, यथा, तथा, यदा, तदा, …)
- Pronouns in their common case forms (अहम् / माम् / मे / मया / सः / तत् / तस्य / यः / येन / अस्मिन् / etc.)
- Vocatives (कौन्तेय, पार्थ, भारत, धनञ्जय, कृष्ण)
- Common verbs (the cause-chain trio उपजायते / सञ्जायते / अभिजायते; the 9.27 sequence करोषि / अश्नासि / जुहोषि / ददासि / तपस्यसि / कुरुष्व; the 18.66 commands व्रज / मोक्षयिष्यामि / शुचः; etc.)
- Nouns with their case forms (आत्मा / आत्मानम् / आत्मना / आत्मनः, क्रोधात् / सम्मोहात् / स्मृतिभ्रंशात् / बुद्धिनाशात्)
- Joined-surface compounds (मात्रास्पर्शाः, शीतोष्णसुखदुःखदाः, धर्मसंस्थापनार्थाय, …)
- Pre-sandhi alternate keys (the lookup helper strips hyphens; pre-sandhi forms get explicit aliases)

`buildVocabulary()` in [src/utils/vocabulary.js](src/utils/vocabulary.js) layers parsings: verse-local `wordParsings` win, the shared dictionary fills the gap. UI badges entries sourced from the dictionary with `dict`.

**Words tab UX:**

- **Pagination** — 50 rows by default, "Show 50 more" / "Show all" buttons. Page resets when filters change.
- **"Hide particles" toggle** (default ON) — particles dominate by raw count and are rarely useful vocabulary. Collapses the noise.
- **"Only words missing a gloss" toggle** — surfaces the audit gap directly.
- **Bug fix:** explicit category-filter pick now overrides the Hide-particles toggle. Was: clicking "particle (20)" with hide-particles ON filtered everything out. Fixed: explicit > catch-all.
- **"Showing N of M" counter** in the toolbar.

**Tests added** (caught both the filter-override bug and 10 dictionary gaps during development):

- [src/data/sharedVocab.test.js](src/data/sharedVocab.test.js) — 14 tests including direct entries for user-flagged words + integration test "no padaccheda word in any of 25 verses has empty gloss"
- [src/components/Vocabulary.test.jsx](src/components/Vocabulary.test.jsx) — 8 RTL tests including the exact filter-override bug

### 2. Theme system: 11 → 18 themes + collapsed picker

Added six themes:

- **Newsprint** — pure white, NYT red accent, Source Serif 4
- **Linotype** — slight cream + deep slate + teal accent
- **Editor's Mark** — bone white + cinnabar accent
- **Charcoal & Ember** (dark) — warmer counterpart to Forest
- **Nord** (dark) — Nord palette adapted for prose
- **Making Software** — Vercel Geist style: pure white, electric `#0070f3` accent, system sans (the actual values pulled from makingsoftware.com after my "from memory" first attempt was wrong — apologized for it explicitly)
- **Press** — Newsprint × Making Software hybrid: pure white + Source Serif 4 body + system sans labels + Vercel blue primary + NYT red secondary

**Theme picker collapsed** to a single icon button (three overlapping color dots showing the active palette) with a popover. Was an 80px-tall row in the masthead — user called it "valuable real estate." Reclaimed it.

### 3. UX polish: scroll, alignment, rail anchoring

- **Scroll-jump on tab change** — `useEffect` was firing the scroll-to-0 *after* paint. Switched to `useLayoutEffect` (synchronous before paint) + `history.scrollRestoration = 'manual'` (browser was auto-restoring scroll Y from history) + `document.scrollingElement` (modern API) + rAF fallback. Most-visibly affected Practice (shortest tab); fix benefits every tab change.

- **Masthead view-switcher pushed to the left** — reverted my own bad fix that added `margin-left: auto + flex-wrap` to `.view-switcher`. The original `justify-content: space-between` on `.masthead-inner` was correct.

- **Journey rail's internal scroll shifting on `<details>` toggle** — added `overflow-anchor: none` on `.journey-rail`. Browser scroll-anchoring was compensating for right-pane reflows by adjusting the rail's scrollTop. Disabling anchoring on that element fixes the side-effect.

- **Per-chapter decoded counts + jump-to-verse input** in the journey rail — designed for the 700-verse future.

## Files touched

| File | What |
|---|---|
| `src/data/sharedVocab.js` (new) | ~200 entries; `lookupSharedVocab()` with hyphen-strip + pre-sandhi aliases |
| `src/utils/vocabulary.js` | shared-dict fallback in `buildVocabulary()` |
| `src/components/Vocabulary.jsx` | pagination + filters + filter-override fix |
| `src/data/sharedVocab.test.js` (new) | 14 tests |
| `src/components/Vocabulary.test.jsx` (new) | 8 RTL tests |
| `src/data/palettes.js` | 7 new palettes |
| `src/components/ThemePicker.jsx` | collapsed to icon + popover |
| `src/App.jsx` | ScrollToTop with useLayoutEffect + scrollRestoration: 'manual' |
| `src/components/VerseJourney.jsx` | jump-to-verse input + per-chapter progress + decoded-only filter |
| `src/styles.css` | many touch-ups; `.journey-rail` overflow-anchor; theme-picker styles |

## Verified

- `npm run build` clean
- `npm test -- --run` — 203/203 passing (was 164 before this slice; +39 tests came from sharedVocab + Vocabulary)

## Tests added (would-have-caught list)

- The "particle (20) shows nothing" bug → explicit RTL test
- The "अभिजायते has no gloss" gap → integration test "no padaccheda word has empty gloss"
- 10 hidden gaps surfaced during development (pre-sandhi forms not finding their post-sandhi dictionary keys) → all fixed via alias entries
