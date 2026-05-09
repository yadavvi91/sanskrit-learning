# Checkpoint v15 — v7 Slice 3: per-verse Notes (free-form, localStorage)

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v7, slice 3

## What changed

A new **स्वमतम् / My notes** section at the bottom of every verse's detail pane. It's a textarea that auto-saves to localStorage 700 ms after the last keystroke, scoped per verse (`{chapter}.{verse}` key). Re-opening the same verse later shows the saved text; the timestamp of the last save shows in the meta row.

The save is debounced (no save on every keystroke; one save 700 ms after typing stops). Empty notes are deleted from the store rather than persisted as `""` — keeps the storage clean.

## Why

The structured fields (`vibhaktiNotes`, `keyFights`) are great for capturing grammar discoveries while decoding. But "remember to come back to this; the way Krishna addresses Arjuna here echoes 6.5" is the wrong shape for those fields. Today the user would write that in a separate notebook and lose it.

This puts free-form notes alongside the structured ones, in the same view, persisted forever.

## Files touched

- New: [src/utils/notes.js](src/utils/notes.js) — `getNote`, `setNote`, `listAllNotes`, `clearAllNotes` keyed by `{chapter}.{verse}`
- New: [src/utils/notes.test.js](src/utils/notes.test.js) — 8 tests including corruption resilience (invalid JSON in localStorage → empty fallback)
- [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — `<NotesPanel>` sub-component with debounced save
- [src/styles.css](src/styles.css) — `.notes-panel`, `.notes-textarea`, `.notes-meta`, `.notes-saved`

## Verified

- `npm run build` clean (60.73 KB CSS, 313 KB JS)
- `npm test -- --run` — **112/112 passing** (was 104; +8 notes tests)
- Manual: typed a note on 2.4 → switched to 1.1 → switched back → note still present. Reloaded the page → still present.

## Storage notes

- Key: `verse_notes_v1` in localStorage
- Resilient to corrupt JSON, disabled storage, quota errors — all degrade silently to "no notes"
- Slice 4's verseSearch will scan these as one of its sources
- Slice 5's Markdown export will include the user's notes if non-empty

## Not done in this slice

No keyboard shortcut to focus the notes textarea (could be `n` like Vim). No max-length cap. No timestamp of *first* note. All deferrable.
