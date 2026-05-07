# Plan v7 — Reading & Reference: making decoded verses durable artefacts

> Sequels v6 (refinement). At v0.6.0 the app's structure is right; the remaining gap is *workflow density during decoding*. Today, decoding a Gītā verse means context-switching to holy-bhagavad-gita.org for the canonical translations and to physical books for Ramanuja/Shankara commentaries. v7 closes that loop: pull the reference layer into the verse view, let the user write per-verse notes, and make the corpus searchable. Plus a one-click export so a decoded verse can leave the app as a self-contained Markdown artefact.

## Context

What's working at v0.6.0:
- Decode pipeline (मूल → पदच्छेद → क्रिया → विभक्ति → अन्वय → हिंदी → English) is the right shape — surfaced in [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx).
- The user has decoded 4 verses with serious effort. Each took an hour or more.
- The user's external workflow uses [holy-bhagavad-gita.org](https://www.holy-bhagavad-gita.org/) for translations and physical/online sources for commentaries (Ramanuja, Shankara, Madhva, etc.).

What's the limiting reagent on shipping more decoded verses:
1. **Context-switching cost.** Each new verse means flipping between holy-bhagavad-gita.org, the project, and reference books. The decode-pipeline UI is great for *recording* what you decoded, but doesn't help while you're in the act.
2. **No per-verse free-form notes.** The structured fields (vibhaktiNotes, keyFights) are great for grammar discoveries; they're not the right shape for "this verse landed for me because of X" or "remember to come back and check Y." Those land in a separate notebook outside the project, which is exactly the failure mode `CLAUDE.md` warns about.
3. **No way to find a verse later.** With 4 decoded verses, scanning is fine. At 50, the Patterns matrix and Samāsa Bank cover *grammar* search but not *content* search ("the verse where Krishna talks about अकर्म" — where is that?).
4. **No corpus exit.** Decoded verses live only inside the app. Markdown export means a decoded verse can be paste-portable: into Obsidian, into a draft, into a class email.

## Decisions locked

| Decision | Choice | Reason |
|---|---|---|
| Reference data source | Public-domain translations (Edwin Arnold 1885, Sir Charles Wilkins 1785) + summarised commentary positions | Avoids licensing minefield. The Sanskrit text itself is public domain; old translations are PD; modern translations (Easwaran, Debroy) get *paraphrased summaries* with citations rather than copies. Ramanuja/Shankara commentary positions get summaries based on widely-published understandings. |
| External link target | holy-bhagavad-gita.org/chapter/N/verse/M | The user's stated reference site. One-click jump out preserves their existing workflow. |
| Notes persistence | localStorage, keyed by verse ref | Same pattern as the SRS schedules. iCloud-sync friendly, no backend. |
| Corpus search scope | Decoded verses only (today). Extend to all-700 once the corpus is loaded (out of scope for v7). | Searching 4 verses is cheap; searching 700 needs an index. Defer. |
| Markdown export shape | One verse → one self-contained `.md` file with all decode-pipeline sections | Pasteable. Mirrors the source-of-truth `verses-decoded.md` exactly so the export can also be re-imported as the canonical record. |

## Process rules (locked, same as v6)

- One commit per slice; build green + tests green at every commit.
- Per-slice `checkpoint-N.md` (continuing from `-12`).
- Plan doc lands first.

---

## Implementation slices

### Slice 0 — This plan-doc (no code)

`plans/v7-reading-reference.md` (this file). Committed alone before code.

### Slice 1 — External-link button per verse

[src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — add an "Open on holy-bhagavad-gita.org ↗" link in the verse header. Helper in `src/utils/sources.js` builds the URL. Smallest possible win.

### Slice 2 — References panel: translations + commentary summaries

- Extend the verse data shape with an optional `references` field: `{ translations: [{translator, text, license}], commentaries: [{sage, summary, school}] }`.
- Seed the 4 decoded verses with public-domain translations (Edwin Arnold 1885 — verse 2.3 is the famous "Yield not to unmanliness, O son of Pritha!") + summary commentaries (Ramanuja's विशिष्टाद्वैत reading, Shankara's अद्वैत reading).
- New section in VerseDetail: **टिप्पणी / References** with a collapsible `<details>` block per source (translation or commentary), like the existing सन्धि / समास blocks.
- New tests: that the seed data parses; that the rendering doesn't blow up if `references` is missing.

### Slice 3 — Per-verse Notes (free-form, localStorage)

- New file: `src/utils/notes.js` — `getNote(verseRef)`, `setNote(verseRef, text)`, both keyed by `chapter.verse`.
- New section in VerseDetail: **टिप्पणी (मेरी) / My notes** — a collapsible `<details>` containing a `<textarea>` that auto-saves on blur (debounced).
- Tests: getNote/setNote round-trip; debounce mechanics; corruption resilience (parse errors fall back to empty).

### Slice 4 — Search across decoded corpus

- New file: `src/utils/verseSearch.js` — `searchVerses(query)`: returns `[{ verse, matches: [{field, snippet}] }]`. Searches mool / padaccheda / sandhiNotes / samasNotes / vibhaktiNotes / keyFights / anvaya / hindi / english + notes (from slice 3) + references.translations.text.
- VerseJourney rail: search input below the jump-to input. Results appear as a temporary list under the rail's chapter accordion.
- Click a result → navigate to the verse with the snippet highlighted in the detail pane.
- Tests: search hits across each searchable field; case-insensitive; Devanāgarī search works; empty query returns nothing.

### Slice 5 — Markdown export per verse

- New file: `src/utils/markdownExport.js` — `verseToMarkdown(verse, notes?, references?)` → string mirroring `verses-decoded.md` shape.
- VerseDetail header: "Copy as Markdown" button → puts the result on the clipboard.
- Tests: round-trip a known verse against a snapshot string; format stable.

---

## Existing utilities to reuse

- The collapsible `<details>` pattern (sandhi, samas, krdanta, gita-occurrences) — slices 2 + 3 reuse this directly.
- localStorage helpers from [src/utils/srs.js](src/utils/srs.js) (`readStore` / `writeStore` style) — slice 3 follows the same robust try/catch shape.
- `useNavigate` from react-router — slice 4's search-result clicks use it.

## Out of scope (v8+)

- Loading the full 700-verse corpus (mūla + transliteration only) so undecoded verses become *browsable* not just locked. Big effort; legitimate v8.
- Decoding-helper wizard (a structured workflow that walks through pipeline steps and writes the data file).
- Audio chant playback.
- Multi-user / shared annotations (project-wide deferral).
- Sandhi rules / उपसर्ग+root sandhi parser.

## Verification

Per slice: `npm run build` + `npm test -- --run`, both green.

End-to-end after slice 5:
1. Open any verse → click "Open on holy-bhagavad-gita.org" → opens the corresponding canonical page in a new tab.
2. References section: expand any source → see a public-domain translation or commentary summary cited correctly.
3. My notes: expand → type a note → blur → reload page → note still there.
4. Rail search: type "Madhu" → finds 2.4 (मधुसूदन). Type "field" → finds 1.1 (धर्मक्षेत्रे). Click a result → opens the verse.
5. "Copy as Markdown" → paste into a `.md` file → renders the full decode pipeline cleanly.

## Critical files

| File | Slice | Change |
|---|---|---|
| `plans/v7-reading-reference.md` (new) | 0 | This plan |
| `src/utils/sources.js` (new) | 1 | URL builders for holy-bhagavad-gita.org |
| `src/components/VerseDetail.jsx` | 1, 2, 3, 5 | External link, references section, notes section, copy-as-md button |
| `src/data/verses.js` | 2 | Add `references` field on the 4 decoded verses |
| `src/utils/notes.js` (new) | 3 | localStorage-keyed per-verse notes |
| `src/utils/verseSearch.js` (new) | 4 | Cross-field search |
| `src/utils/verseSearch.test.js` (new) | 4 | Search tests |
| `src/components/VerseJourney.jsx` | 4 | Search input + result list |
| `src/utils/markdownExport.js` (new) | 5 | verseToMarkdown |
| `src/utils/markdownExport.test.js` (new) | 5 | Snapshot tests |
| `src/styles.css` | 1–5 | Section styles for references, notes, search results, export button |
| `checkpoint-13.md` … `checkpoint-17.md` | per slice | Narrative per slice |

---

## Relation to other plans

| Plan | Relationship |
|---|---|
| [v1-app.md](v1-app.md) | The decode pipeline section ordering is preserved; v7 only adds two new sections (references, notes) at the end. |
| [v3-grammar-atlas.md](v3-grammar-atlas.md) | Search infrastructure here is corpus-text search; the Atlas already has structural search (Compound Bank filter, particle tally). They're complementary, not redundant. |
| [v4-primer.md](v4-primer.md) | Slice 5's Markdown export shape mirrors `verses-decoded.md`, which is the v0 canonical artefact the Primer references. |
| Future v8 | Once the full 700-verse corpus loads (v8 task), the search built in v7 trivially extends to the full corpus. |
