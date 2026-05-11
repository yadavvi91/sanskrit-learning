# Checkpoint v17 — v7 Slice 5: Markdown export per verse (final v7 slice)

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v7, slice 5 (final)

## What changed

A "Copy as Markdown" button next to the holy-bhagavad-gita.org link in each verse header. Clicking it puts the verse on the clipboard as a self-contained Markdown block, paste-portable into Obsidian, a draft email, or the project's own `verses-decoded.md`.

Output mirrors the pipeline order: heading → source link → मूल → पदच्छेद → सन्धि → समास → क्रिया → कृदन्त → विभक्ति → विवेकः → अन्वय → हिंदी → English → references (translations + commentaries) → my notes (if any).

Sections that are empty for a verse are omitted (no "**विवेकः** (key fights):" header with nothing under it). Translations are quoted with translator + year + work + license tag. Commentaries are quoted with sage + school. User's per-verse notes (slice 3) are included verbatim if present.

Button label feedback: shows "✓ Copied" for 2 seconds after a successful copy, "✗ Failed" if the clipboard call rejects.

## Why

The user described a specific failure mode in `CLAUDE.md`: the February 2023 Bibek Debroy notes that fell out of memory after a few months because there was nothing to come back to. v7 has been about *durability* — references inline (slice 2), notes inline (slice 3), search inline (slice 4). Slice 5 closes the loop the other way: a decoded verse can *leave* the app as a self-contained artefact. If the project gets archived, if the user wants to email a verse to someone, if they want to compile a personal commentary in Obsidian — one click and the verse is portable.

The Markdown shape deliberately mirrors `verses-decoded.md` (the v0 source-of-truth artefact) so the output is also re-importable as the canonical record.

## Files touched

- New: [src/utils/markdownExport.js](src/utils/markdownExport.js) — `verseToMarkdown(verse)` + `copyVerseMarkdown(verse)`
- New: [src/utils/markdownExport.test.js](src/utils/markdownExport.test.js) — 10 tests
- [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — `<CopyMarkdownButton>` in the verse header
- [src/styles.css](src/styles.css) — `.verse-export-link`

## Verified

- `npm run build` clean (62.82 KB CSS, 320 KB JS)
- `npm test -- --run` — **133/133 passing** (was 123; +10 markdown export tests including pipeline-order assertion)
- Manual: clicked the button on each verse → pasted into a markdown editor → renders cleanly with all decode-pipeline sections intact, references included, source link clickable.

## v7 retrospective

5 slices, 5 commits, 5 checkpoints (`-13` through `-17`). All deferred items from the original v7 plan-doc except one are deferred to v8 (the 700-verse corpus). The exception: slice 1 went exactly as planned.

Total tests added during v7: **35** (4 sources + 6 references-shape + 8 notes + 11 verseSearch + 10 markdownExport).

The bones now have meat: references for context, notes for the user's voice, search for finding things later, export for taking work elsewhere.
