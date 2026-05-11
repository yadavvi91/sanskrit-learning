# गीताध्ययनम् — a working journal of decoding the Bhagavad Gītā

A Vite + React app that walks one reader's path through the Gītā verse by verse: मूल → पदच्छेद → अन्वय → हिंदी → English, with a grammar atlas, dhātu periodic table, sandhi lab, and SRS practice attached. Built for the author's own learning, deployed publicly so anyone curious about the same path can read along.

For the full story behind this — how it grew out of a school-Sanskrit frustration, a 2023 Bibek Debroy reading, a Sundarkand recitation habit, the bvsiitm course, and Rohan Pandey's frequency data — see [`/origin`](https://yadavvi91.github.io/sanskrit-learning/#/origin) in the deployed app or [article.md](article.md) in this repo.

## Deployment

**Public URL:** [https://yadavvi91.github.io/sanskrit-learning/](https://yadavvi91.github.io/sanskrit-learning/)

The deployed site is a read-only mirror of the local app. Every feature works in the browser — popovers, theme picker, SRS, notes, the Decode Helper, Forward/Reverse stack-builder. The only thing it can't do is write back to the corpus: any verse you decode in the deployed Decode Helper produces a draft you can copy, not a file on disk.

**Your state stays local to your browser.** Per-verse notes, SRS state, last-visited verse, theme choice, decoded-chapter selections — all stored in `localStorage`. Nothing syncs across devices or browsers, and nothing is sent to a server. Clearing browser data clears your reading state.

To work on the corpus itself (add a hand-decoded verse, fix a splitter mis-cut, expand the dhātu set), clone the repo and run locally — the source data lives in `src/data/`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173 — BrowserRouter, clean URLs
npm test           # vitest, 582 tests
npm run build      # production build for any host that supports SPA fallback
```

## Build for GitHub Pages

```bash
npm run build:pages       # builds with base=/sanskrit-learning/, HashRouter
npm run preview:pages     # builds and previews at the deploy base path
```

The two `:pages` scripts differ from the plain `build` / `preview` only in setting `VITE_BASE=/sanskrit-learning/`. At runtime, `src/main.jsx` switches between `BrowserRouter` (when base is `/`) and `HashRouter` (everything else) so deep-link reloads of `/journey/2/47` etc. don't 404 against the static host.

CI handles this automatically: pushes to `main` trigger [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which runs the full test suite, builds with `npm run build:pages`, and deploys via `actions/deploy-pages@v4`. To enable the workflow on a fresh repo, go to **Settings → Pages → Source: GitHub Actions**.

## Project layout

- `src/components/` — UI: verse detail, atlas, periodic table, stack builder, primer, practice
- `src/data/` — the corpus: 188 hand-or-auto-decoded verses, 4000+ vocab entries, 190 dhātus, declension paradigms, sandhi rules
- `src/utils/` — engines: `decodeHelper.js` (sandhi splitter), `conjugator.js` (Forward/Reverse), notes, markdown export
- `article.md` — the long-form essay rendered at `/origin`
- `plans/` — versioned design docs (v1 → v15)
- `checkpoints/` — per-slice change records

## License

The code is MIT. The textual reading notes (article.md, the per-verse interpretive commentary, the dhātu notes) are © Vishal Yadav, all rights reserved.
