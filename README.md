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
- `plans/` — versioned design docs (v1 → v19)
- `checkpoints/` — per-slice change records

## Data sources

The padaccheda + morphology in this app is looked up from external scholarly corpora — not computed from scratch. The list of resources used or worth knowing about:

### Primary data we ship

- **[Digital Corpus of Sanskrit (DCS)](https://github.com/OliverHellwig/sanskrit)** — Oliver Hellwig, Heidelberg. CoNLL-U files with surface form, lemma, and Universal Dependencies morphology for every token. **Covers:** Ṛgveda, Atharvaveda, Mahābhārata (incl. the Gītā), Rāmāyaṇa, the Aṣṭādhyāyī, dozens of Purāṇas and Upaniṣads, kāvya, śāstra works. **License:** CC BY-SA 4.0 — derivative work (the JSON file) inherits this license. The 700 Gītā verses are pre-processed into `src/data/dcs-padaccheda.json` by `scripts/import-dcs-gita.mjs`.
- **Translations** — Annie Besant (1905, public domain), Edwin Arnold (*The Song Celestial*, 1885, public domain). Hindi translation set is the author's hand work.
- **Commentaries** — Śaṅkara summaries are paraphrases of the standard Advaita reading, the author's own writing.
- **Dhātu frequency data** — [Rohan Pandey's @khoomeik thread](https://twitter.com/khoomeik) on the top-192 Sanskrit dhātus by frequency, derived from DCS via vidyut.

### Worth knowing about (not used here, but cite if you build something Sanskrit-related)

- **[DCS web interface](http://www.sanskrit-linguistics.org/dcs/)** — searchable browser UI for the same data: text lookup, lemma index, KWIC concordance.
- **[vidyut](https://github.com/ambuda-org/vidyut)** (ambuda-org) — Rust + WASM Sanskrit toolkit. Sandhi engine, conjugator, lemmatizer. What Khoomeik used to derive the dhātu coverage curve.
- **[Sanskrit Heritage Site](https://sanskrit.inria.fr/)** (INRIA — Gérard Huet) — pioneering computational Sanskrit project (since ~2000). Web segmenter, declension tables, conjugator. Heritage Dictionary integrated.
- **[Sanskrit Computational Linguistics](https://sanskrit.uohyd.ac.in/)** (Univ. of Hyderabad / IIT-H) — Amba Kulkarni's group. Tools for sandhi-vicchedaka, samāsa-vigraha, kāraka analyser, anvaya generator. Also hosts the Sanskrit Wordnet.
- **[The Sanskrit Library](http://sanskritlibrary.org/)** (Brown University — Peter Scharf) — annotated digital corpus with segmentation tools, Aṣṭādhyāyī interlinear, multiple dictionaries (Monier-Williams, Apte, Macdonell).
- **[Ambuda](https://ambuda.org/)** — Sanskrit text library with parsed editions of the Mahābhārata, Rāmāyaṇa, Purāṇas. Sister project to vidyut. Built for read-along.
- **[bvsiitm.github.io/sanskrit-gita-learn](https://bvsiitm.github.io/sanskrit-gita-learn/)** — BV Srinivasan's Gītā course (IITM). Pedagogy that influenced this app: *known → +1 → drill → SRS*, sandhi-last, frequency-first dhātus.
- **[holy-bhagavad-gita.org](https://www.holy-bhagavad-gita.org/)** — the chapter/verse grid that triggered this project. Per-verse word-by-word glosses, multiple translations, Śaṅkara/Rāmānuja commentaries.
- **[Internet Sacred Text Archive](https://www.sacred-texts.com/hin/index.htm)** — public-domain editions of Vedic and classical Sanskrit texts. Arnold's *Song Celestial* (used here) is hosted there.
- **[sanskritdocuments.org](https://sanskritdocuments.org/)** — vast Sanskrit text repository (ITRANS/Devanagari): Vedas, Upaniṣads, Bhāgavatam, Yogasūtra, stotras, classical literature. Community-maintained.

## License

The code is MIT. The textual reading notes (article.md, the per-verse interpretive commentary, the dhātu notes) are © Vishal Yadav, all rights reserved. The DCS-derived `src/data/dcs-padaccheda.json` is CC BY-SA 4.0 per the upstream license — credit Oliver Hellwig if you reuse it.
