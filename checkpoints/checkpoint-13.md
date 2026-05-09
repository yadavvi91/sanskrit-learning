# Checkpoint v13 — v7 Slice 1: external link to holy-bhagavad-gita.org

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v7, slice 1

## What changed

The verse header now has a small saffron-bordered link button "holy-bhagavad-gita.org ↗" that opens the canonical page for the current verse in a new tab. One-click jump out preserves the user's existing reference workflow without forcing them to type the URL.

URL builder lives in `src/utils/sources.js` along with a small catalogue of other open-canonical Sanskrit sources (GRETIL, Sanskrit Library) for future "open in" extensions.

## Why

The user uses [holy-bhagavad-gita.org](https://www.holy-bhagavad-gita.org/) as their primary external reference for translations and commentaries. Today, going from "I'm reading verse 2.4 in the app" to "let me check the canonical translation" means typing `holy-bhagavad-gita.org/chapter/2/verse/4` by hand. One click replaces that.

This is the smallest possible win that removes a real friction point.

## Files touched

- New: [src/utils/sources.js](src/utils/sources.js) — `holyBhagavadGitaUrl(chapter, verse)` + a `SOURCE_LINKS` catalogue
- New: [src/utils/sources.test.js](src/utils/sources.test.js) — 4 tests
- [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — added `<a>` in the header
- [src/styles.css](src/styles.css) — `.verse-source-link` styling

## Verified

- `npm run build` clean (58.19 KB CSS, 306 KB JS)
- `npm test -- --run` — **98/98 passing** (was 94; +4 source URL tests)
- Manual: clicked the link from each of the 4 decoded verses → opened the right page in a new tab.
