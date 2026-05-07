# Plan v0 — Research foundation (retrospective)

> **Retrospective.** Written after-the-fact to document what existed *before any code was written*. The actual artefacts already shipped in commit `52644f1` (the same commit as v1) but conceptually they were the v0 phase: research, decoding, organizing what would become the data layer of the app.

**Date drafted retrospectively:** 2026-05-08
**Date the work itself happened:** January – February 2026 (long claude.ai conversation, plus prior Feb 2023 Bibek Debroy reading)

---

## What this version is

The pre-code data foundation. Four artefacts that together define **what the project teaches** before any decision was made about *how to ship it*:

| Artefact | Role |
|---|---|
| `CLAUDE.md` | Framing doc — the "why," the user profile, the four threads of origin (Awadhi visualizer, school SSC trauma, Debroy 2023, the WhatsApp trigger), what the user already knows, what to build next, design language |
| `verses-decoded.md` | The decoded corpus — Gītā 1.1, 2.3, 2.4, 2.5 each fully analyzed: मूल → पदच्छेद → sandhi notes → finite verb identification → कृदन्त → विभक्ति notes → key fights → अन्वय → हिंदी → English |
| `patterns-won.md` | The 23 grammar patterns internalized while decoding those verses, grouped: Noun System (7) · Verb System (7) · Kṛdanta (4) · Decode Method (6). Each tied to the verse that triggered it. |
| `sanskrit-reference.md` | Full grammar reference: noun tables, verb tables, 5 लकार, 10 गण, bvsiitm pedagogy, Rohan Pandey's 192-dhātu chart, the SOV vs SVO frame, all 4 verses' decoding |

These four files were the output of a long claude.ai conversation that the user could not directly import into Claude Code. `CLAUDE.md` exists because of that import gap — it carries the full context, the *why*, the *how we got here* across the boundary.

---

## Inputs / origin threads

1. **Awadhi Meter Visualizer** (separate, prior project) — established the design language: parchment palette, Noto Serif Devanagari + Cormorant Garamond + Cinzel, syllabification engine architecture. Sanskrit project inherits this aesthetic.

2. **Bibek Debroy — "Bhagavad Gita for Millennials"** (Feb 2023) — the actual origin. User made handwritten notes covering SOV/SVO, पदच्छेद, अन्वय, छंद/अनुष्टुभ. Then abandoned the book due to lack of time. The latent interest produced the Awadhi visualizer first; the Sanskrit project was the same idea taking a more direct shape.

3. **WhatsApp trigger** — a depressing message in a group chat. User responded with Gītā 2.3 (क्लैब्यं मा स्म गमः पार्थ). Reading on holy-bhagavad-gita.org spilled over into 2.4 → 2.5. This wasn't the origin but it was the catalyst that gave the latent interest enough specificity to act on.

4. **bvsiitm.github.io/sanskrit-gita-learn** — the pedagogical model. Established **Known → +1 → Drill → SRS** as the core loop. Established that **sandhi comes last** (understand expected form first, then learn why it changed). Lesson 2 was where the user first formally encountered सप्तमी and प्रथमा and the राम table being filled one case at a time.

5. **@khoomeik (Rohan Pandey)'s 192-dhātu chart** — the data foundation for the eventual verb sub-app. **Top 192 dhātus = 86.1% of all verb tokens** in the Digital Corpus of Sanskrit (vidyut). Two orderings: by frequency, by गण.

---

## What the user already knew at v0 (do not re-explain)

Documented in `CLAUDE.md` and `sanskrit-reference.md`:

**Noun system (8 × 3 × 3 = 72 forms):**
- 8 विभक्ति: प्रथमा, द्वितीया, तृतीया, चतुर्थी, पञ्चमी, षष्ठी, सप्तमी, सम्बोधन
- 3 वचन × 3 लिंग
- Full राम declension table memorized
- विशेषण-विशेष्य / सामानाधिकरण्य matching

**Verb system (3 × 3 × 5 = 45 Gita-practical forms):**
- प्रथम पुरुष flip (Sanskrit प्रथम = English 3rd person)
- Full √कृ table across 5 लकार
- 5 key लकार with spotting signals
- 10 गण conceptually understood

**Kṛdanta:** PPP, absolutive, negative absolutive, infinitive

**Decode sequence:** पदच्छेद → अन्वय (SOV) → हिंदी → English

**Not yet known (deliberately):** सन्धि rules, द्वितीया/तृतीया/चतुर्थी/पञ्चमी in practice, परस्मैपद/आत्मनेपद distinction

---

## The four verses decoded in v0

Each fought through "for every single word" — the cognitive grain that this project tries to preserve.

| Verse | Tagline | Key fight |
|---|---|---|
| **1.1** धर्मक्षेत्रे कुरुक्षेत्रे | The anchor verse | समवेताः looks like a verb but is a कृदन्त PPP agreeing with युयुत्सवः; किमकुर्वत is the actual finite verb |
| **2.3** क्लैब्यं मा स्म गमः | The WhatsApp verse | Three finite verbs (गमः, उपपद्यते, उत्तिष्ठ); त्यक्त्वा is absolutive, not finite |
| **2.4** कथं भीष्ममहं | The "how can I fight?" verse | मधुसूदन and अरिसूदन are vocatives (epithets of Krishna), not objects. लृट् spotted by -ष्य- |
| **2.5** गुरूनहत्वा हि | The hardest one | Three verb-looking words, only **one** finite verb (भुञ्जीय in विधिलिङ्); भोक्तुम् infinitive, हत्वा/अहत्वा absolutives, श्रेयः predicate adjective |

---

## The 23 patterns identified in v0

Grouped four ways:

**Noun System (7):** प्रथमा एकवचन, सम्बोधन identification, सप्तमी (locative), द्वितीया (accusative), तृतीया (instrumental), विशेषण-विशेष्य matching, सामानाधिकरण्य as triple-match (विभक्ति + वचन + लिंग)

**Verb System (7):** Finite verb as sentence anchor, लट् spotting (-ति/-मि), लङ् spotting (अ-prefix + -त्), लृट् spotting (-ष्य-), लोट् spotting (imperative), विधिलिङ् spotting (-ीय/-यात्), पुरुष flip

**Kṛdanta (4):** PPP not finite, absolutive (हत्वा), negative absolutive (अहत्वा), infinitive (भोक्तुम्)

**Decode Method (6):** पदच्छेद first, find finite verb second, अन्वय as SOV, vocatives are not in the action, हिंदी before English, "fight every word"

---

## Why this counts as v0

The v0 vs v1 split is conceptual, not git-historical. In git, everything landed in `52644f1` together. But there's a clear conceptual boundary:

- **v0 = data + framing**: research, decoding, classification. Outputs are four markdown files. Could be read as a book.
- **v1 = the app**: React, Vite, two views, parchment styling. Outputs are JS/JSX + CSS. Reads as software.

The data files are the **source of truth**; the app is a **rendering** of them. This separation is what makes the project scalable — adding the 5th decoded verse means editing `verses-decoded.md` (and its mirror in `src/data/verses.js`), not editing the app.

---

## What v0 enabled

1. **Direct path to v1** — the React app could be built as a *projection* of the markdown into UI. No design exploration needed for content; only for rendering.
2. **Clear "what to extend"** — adding a new decoded verse, a new pattern, a new compound has a known shape: add to the markdown source-of-truth + mirror to JS data.
3. **Re-entry insurance** — even if every line of code is deleted, these four markdowns retain the project's content and intent. The app is rebuildable from them.

---

## What was deliberately deferred from v0

- **Verb conjugation engine** — the data was there (192-dhātu chart noted), the implementation was not. → v2.
- **समास analysis** — sandhi was decoded per verse, samas was not. The 4 verses' compounds were noted but not classified. → added in v1's lifetime (checkpoint-2), to be expanded in v3.
- **Pronouns, कारक, अव्यय** — only briefly touched in `sanskrit-reference.md`. → v3 (Grammar Atlas).
- **SRS / spaced repetition** — bvsiitm pedagogy was acknowledged but not yet built. → v5.

---

## Files (v0 artefacts, all at repo root)

```
CLAUDE.md
verses-decoded.md
patterns-won.md
sanskrit-reference.md
```

These are read-only references after v1 ships. The JS data layer (`src/data/verses.js`, `src/data/patterns.js`) is the canonical runtime form; the markdowns are the human-editable source.

---

## Relation to later versions

| Version | What it consumes from v0 |
|---|---|
| v1 (React app) | All four files become its data + framing |
| v2 (Verb sub-app) | `sanskrit-reference.md`'s verb tables + Khoomeik chart reference are the seeds |
| v3 (Grammar atlas) | `CLAUDE3.md` (added later) extends `CLAUDE.md`'s grammar section |
| v4 (Primer) | The four files are exactly the "meta-knowledge" the primer must surface for re-entry |
| v5 (Practice mode) | The patterns + verses become the SRS card-seed corpus |

---

## Verification (retrospective)

The four markdowns existed and were complete at the moment v1 began. Specifically:
- `verses-decoded.md` had all four verses with the full decode pipeline (mool → padaccheda → sandhi notes → finite verb → kridanta → vibhakti → key fights → anvaya → hindi → english)
- `patterns-won.md` had 23 patterns across 4 categories
- `sanskrit-reference.md` had the full grammar reference (noun tables, verb tables, 5 लकार, 10 गण, Rohan Pandey data)
- `CLAUDE.md` documented the project's why and what

These were verifiably present in git from `52644f1` onward.

---

## Out of scope for v0

- Any code (deferred to v1)
- Sandhi rules (deliberately deferred project-wide)
- Vedic forms (project-wide)
- Causatives, passives, desideratives (project-wide)
