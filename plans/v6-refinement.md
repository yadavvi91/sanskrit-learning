# Plan v6 — Refinement pass: routing, scaling, UX polish

> Sequels v2 (Verb sub-app) — v3 (Grammar Atlas) — v4 (Primer) — v5 (Practice). Those four landed as working scaffolds on the `implement-all-plans` branch; walking the running app surfaced terminology mistakes, visual issues, and architectural gaps. v6 is the refinement pass that addresses them. The working-copy of this plan lives in `~/.claude/plans/if-i-want-to-cozy-garden.md`; this file is the repo-canonical version mirroring the v2–v5 plan-doc convention.

## Context

The `implement-all-plans` branch shipped 12 commits (`d4e7400` → `e50a1fd`) covering every plan v2 through v5. The build is green; 71 unit tests pass. But `npm run dev` walk-throughs surfaced concrete issues across three categories:

**Wrong calls / structural mistakes**
- "विग्रह" was used as a section label in [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx). The user reads विग्रह as belonging to *sandhi-विग्रह* in their training, not as a label for compound analysis. The compound block also got separated from sandhi when both are *un-doing* operations and belong together under पदच्छेद.
- Primer cross-references like "see Atlas → Compounds" are plain text, not clickable. They name the destination but don't go there.

**Visual problems**
- Periodic Table cells crowd the devanāgarī root with a frequency rank and a gana-number tag — three numbers competing for attention.
- Stack Builder forward formula wraps "+" inside `formula-piece` chips. The "+" is an operator, not a piece, and shouldn't have a border.
- Reverse decoder dumps a 6-line attribute list without showing layered assembly. Hard to read; the relation between उपसर्ग, stem, ending, and the input form isn't visually scaffolded.
- स्म-cell `outline: 1px solid var(--gold)` distorts the surrounding pronoun-table grid lines and reads heavy.
- Primer layout (TOC left, content right) has no visual connection between the two columns.

**Architectural / scaling**
- No router. Cross-tab navigation uses React state, so browser back/forward doesn't work — clicking "Gītā 2.5 ↗" from the Samāsa bank into Verse Journey is a one-way trip.
- "Decoded so far" rail in VerseJourney is fine for 4 verses but won't scale to 50+. Same for the dhātu Periodic Table when it grows from 25 → 192.
- Patterns Won's "unlocked by Gītā 1.1" structure won't scale — many patterns appear across many verses; "first-met" alone loses information.

## Decisions locked

| Decision | Choice | Reason |
|---|---|---|
| Scope | Full refactor incl. routing | UX + scaling + architecture all need attention; piecemeal would leave seams |
| Routing | **BrowserRouter** with full URLs | Cleaner than HashRouter; needs `historyApiFallback` in dev (Vite handles this) and rewrite rules documented for static hosting later |
| Patterns Won | Redesign as a **sortable matrix** (Pattern · Category · First met · Also seen · Example) | Four-category card grid won't scale; matrix scales with the corpus and surfaces "also seen in" counts derived from the verse data |
| विग्रह label | Revert to **समास** | User's training reads विग्रह as sandhi-विग्रह; the compound block belongs visually next to sandhi under पदच्छेद, not as a separate pipeline step |

## Process rules (locked for this work)

1. **One commit per slice** at minimum — never lump two slices together. Some slices may break into 2-3 commits if they get big; that's fine, smaller is better.
2. **Build green + tests green at every commit boundary.** Run `npm run build` and `npm test -- --run` before committing each slice.
3. **Per-slice checkpoint** — `checkpoint-N.md` files at repo root, continuing the existing numbering (`-3` is the `implement-all-plans` branch summary; `-4` onward are this refinement). Tiny visual-only slices may share a checkpoint if they're naturally a unit.
4. **This plan-doc landed first**, before any code, matching the convention used for v2–v5.

---

## Implementation slices

### Slice 0 — This plan-doc (no code)

Just `plans/v6-refinement.md` — committed alone before any code lands so the project-version timeline shows the spec preceding the work.

### Slice 1 — Revert विग्रह, co-locate sandhi + samas

Undo the standalone विग्रह `<Section>` in [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx). Move samas back inside the पदच्छेद section as a second `<details>` block right beside the sandhi `<details>`. Both labeled and styled consistently. Glossary popover for समास lives on the `<summary>`, not as its own section header. Drop `.vigraha-list` style; reuse existing `.samas` styles.

### Slice 2 — Periodic Table cell redesign + filtering

[src/components/DhatuPeriodicTable.jsx](src/components/DhatuPeriodicTable.jsx): drop the visible rank number and gana tag from each cell. Cell shows large devanāgarī root + tiny IAST under it. Color tint by gana stays as the only visual signal. Add filter chips above the grid: **All · Top 10 · Top 25 · Top 50 · Top 100 · Top 192 · In Gītā**. Plus a search input that filters by devanāgarī, IAST, or English meaning. Existing fields in [src/data/dhatus.js](src/data/dhatus.js) (`frequencyRank`, `meanings`, `gitaOccurrences`) are sufficient.

### Slice 3 — Stack Builder formula + reverse-decoder rework

[src/components/StackBuilder.jsx](src/components/StackBuilder.jsx) Forward: pull "+" and "=" out of `formula-piece` chips, render as free operators between bordered chips.

Reverse: redesign the match output to mirror Forward visually:
```
[प्रति] + [√युध् → योत्स्य] + [ामि] = प्रतियोत्स्यामि
                       लृट् · P · उत्तम एकवचन
```
उपसर्ग chip when present, stem chip with the dhātu label, ending chip, then the result. Lakāra/pada/puruṣa/vacana go in a smaller annotation row beneath. No more flat 6-line attribute dump.

### Slice 4 — स्म-cell + samas-row visual cleanups

[src/styles.css](src/styles.css): replace `outline: 1px solid var(--gold)` on `td.cell.is-sma` with a subtle background-fill + a left border-color override (`border-left: 2px solid var(--gold)`) so the table grid lines don't break. Same kind of pass on `.samas-row` border-left vs surrounding card padding.

### Slice 5 — Primer ↔ Atlas real cross-links

[src/data/primer.js](src/data/primer.js): extend section schema with optional `linkToAtlas: 'pronouns' | 'samasa' | 'karaka' | 'avyaya' | 'adjadv'`.

[src/components/Primer.jsx](src/components/Primer.jsx): render the body's "see the Atlas" sentence as a real button that calls `onOpenAtlas(section)` (becomes `navigate('/atlas/' + sectionId)` after Slice 9). Sections like *compounds*, *pronouns*, *karaka*, *indeclinables* get this. Visual connection between TOC and content: dotted leader line or subtle vertical rule.

### Slice 6 — Patterns Won redesign as sortable matrix

[src/data/patterns.js](src/data/patterns.js): extend trigger schema to support multiple verses: `trigger: { firstMet: '2.4', alsoIn: ['1.1', '2.5'], example: '...' }`. Single-verse data stays for now; the schema accommodates growth.

New file: `src/utils/patternStats.js` — derive "first-met" and "also-seen-count" by scanning [src/data/verses.js](src/data/verses.js). Mirrors `tallyParticles` in [src/data/avyaya.js](src/data/avyaya.js) and `buildSamasaBank` in [src/data/samasa.js](src/data/samasa.js).

[src/components/PatternsWon.jsx](src/components/PatternsWon.jsx): replace the four-category card grid with a single sortable table — Pattern · Category · First met · Also seen · Example. Column header click toggles sort. Category filter chips above. Row hover reveals meaning + clickable verse-ref jumping into Verse Journey. Pattern names containing Sanskrit jargon use existing [src/components/Glossary.jsx](src/components/Glossary.jsx) inline triggers.

New tests: `src/utils/patternStats.test.js` — first-met derivation, also-seen counting, sort stability.

### Slice 7 — Decoded-so-far rail redesign

[src/components/VerseJourney.jsx](src/components/VerseJourney.jsx): replace the chronological "Decoded so far" `<ol>` with:
- count badge: "**N** decoded" (computed from `VERSES.length`)
- the most-recent-5 as compact chips
- "See all decoded →" filter that hides undecoded cells in the chapter grid below
- chapter grid stays as-is (already collapsible)

### Slice 8 — Glossary popovers in Patterns + Atlas headings

[src/components/PatternsWon.jsx](src/components/PatternsWon.jsx): wrap pattern names with Glossary triggers where the name contains a known glossary term. Same pass on Atlas section headings.

### Slice 9 — React Router (BrowserRouter)

`package.json`: add `react-router-dom@^7`.

[src/main.jsx](src/main.jsx): wrap `<App />` with `<BrowserRouter>`.

[src/App.jsx](src/App.jsx): masthead becomes `<NavLink>`s; main content becomes `<Routes>`:
- `/` → redirect to `/journey`
- `/journey` and `/journey/:chapter/:verse`
- `/patterns`
- `/verbs` and `/verbs/:dhatuId`
- `/atlas/:section?` (default `pronouns`)
- `/primer` (with `useLocation().hash` to scroll)
- `/practice`
- `*` → 404

Each cross-tab navigation that currently calls a state setter becomes a `navigate(path)` call. Components stop receiving these as props.

[vite.config.js](vite.config.js): confirm `historyApiFallback` works in dev + preview. Document static-host rewrite rules in the checkpoint.

New tests: `src/__tests__/routing.test.js` — RTL + MemoryRouter + an assertion per top-level route.

---

## Existing utilities to reuse (don't reinvent)

- [`Glossary.jsx`](src/components/Glossary.jsx) — popover already wired to Primer; reuse for PatternsWon and Atlas labels.
- `buildSamasaBank` in [src/data/samasa.js](src/data/samasa.js) and `tallyParticles` in [src/data/avyaya.js](src/data/avyaya.js) — auto-grow scanners that walk `VERSES`. New `patternStats.js` follows the same pattern.
- `conjugate` and `decompose_reverse` in [src/utils/conjugator.js](src/utils/conjugator.js) — engine unchanged; only the reverse-decoder UI changes.
- `stripUpasargas` in [src/data/upasargas.js](src/data/upasargas.js) — reused; surfaces in the new visual layout.
- [`LastVisitBanner.jsx`](src/components/LastVisitBanner.jsx) — keep mounted above main content.

---

## Verification

**Per slice (CI-equivalent):**
- `npm test -- --run` — green at every commit
- `npm run build` — clean at every commit

**End-to-end (manual `npm run dev` walk-through after Slice 9):**
1. `/` → lands on `/journey` with first decoded verse
2. Click a Samāsa Bank row in `/atlas/samasa` → navigates to `/journey/2/5`. Browser back → returns to `/atlas/samasa`
3. Paste **प्रतियोत्स्यामि** in `/verbs/yudh` Stack Builder reverse mode → see prefix chip [प्रति] + stem [√युध् → योत्स्य] + ending [ामि] = result. Annotation reads "लृट् · P · उत्तम एकवचन"
4. Open `/primer#compounds` → click "see Atlas → Compounds" → navigates to `/atlas/samasa`. Browser back → returns to primer at the same scroll
5. In Periodic Table at `/verbs`, click "Top 10" → grid culls to 10 cells; URL unchanged (filter is local UI state)
6. `/patterns` → click "First met" column header → table sorts by verse ref. Click a verse cell → navigates to `/journey/c/v`
7. Stress test: temporarily edit `verses.js` to simulate >50 decoded verses → confirm rail stays compact, chapter grid stays usable

---

## Out of scope (still deferred to v7+)

- Top-25 → top-192 dhātu data ingestion (data-only; this UI scales to it)
- Build-a-Compound view in Samāsa
- SQLite backend for Practice (still localStorage; iCloud sync is stable for the user's two-Mac setup)
- सन्धि between उपसर्ग and root (parser limitation)
- Translation of UI strings to Marathi/Hindi (project-wide deferral)

---

## Relation to other plans

| Plan | Relationship |
|---|---|
| [v1-app.md](v1-app.md) | Decoded-so-far rail redesign closes a v1 deferred item ("won't scale to 100+ verses"). |
| [v2-verb-system.md](v2-verb-system.md) | Refines the Verbs tab (cell redesign, formula polish, reverse-decoder UI). Does *not* expand the dhātu corpus — that's data work for v7+. |
| [v3-grammar-atlas.md](v3-grammar-atlas.md) | Reverts the विग्रह relabel introduced in v3's compound-pipeline-step proposal. The user's terminology takes precedence. |
| [v4-primer.md](v4-primer.md) | Closes the Primer↔Atlas cross-link gap that v4 originally specified but v4-shipping deferred. |
| [v5-practice-mode.md](v5-practice-mode.md) | No direct change. SQLite backend remains deferred. |
