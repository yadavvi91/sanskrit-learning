# CLAUDE.md — Sanskrit Verb Learning Sub-App

## Read this first

This is the **verb-learning sub-app** of the larger Sanskrit Gita learning project. The parent project's `CLAUDE.md` covers the full backstory — Maharashtra SSC rote, Bibek Debroy in Feb 2023, the WhatsApp क्लैब्यं trigger, the four Gita verses fought through, the Awadhi Meter Visualizer's design language. **Read the parent CLAUDE.md first.** This file only covers verbs.

This sub-app exists because verbs are the sentence anchor. Once you can identify the finite verb in a Gita verse — its root, tense, person, number — the rest of the verse decomposes around it. The noun system was the first half of the journey. The verb system is the second.

---

## How this sub-app got specified

In a long conversation User pushed Claude through the verb-formation stack from scratch:

1. Started from the line in parent CLAUDE.md: "Verb system (3 × 3 × 5 = 45 Gita-practical forms)"
2. Unpacked the **3 × 3** = पुरुष (3) × वचन (3) = 9 cells per लकार
3. Built the full √कृ and √भू tables across all 5 लकार
4. Distinguished पाठशाला method (full paradigm per root) from modern stem-system staging
5. Added पद (परस्मैपद / आत्मनेपद / उभयपदी) as a lexical property of the root
6. Added गण (1–10) as the present-stem formation rule
7. Synthesized the **5-layer verb-formation stack** (below)
8. Imported **Khoomeik's 192-dhātu frequency chart** (Digital Corpus of Sanskrit + vidyut) as the data foundation: top 192 dhātus = 86.1% of all verb tokens

This sub-app is the executable form of that conversation.

---

## The 5-layer stack (the mental model the app teaches)

Every finite Sanskrit verb is built in 5 layers. Each layer answers one question. The app's UI must make these layers visible and manipulable.

```
धातु
 └─ गण rule → present stem (or +स्य → future stem)
     └─ लकार → selects ending set + augment/marker
         └─ पद → selects P or Ā column of that set
             └─ पुरुष × वचन → picks the exact ending
                 = finite verb form
```

| Layer | Question | Source |
|---|---|---|
| 1. **धातु** | What action? | Lexical (~192 cover 86%) |
| 2. **गण** | How is the present stem built? | Fixed per root (1–10) |
| 3. **लकार** | What tense/mood? | 5 of 10 matter for Gita |
| 4. **पद** | Which ending family? | Fixed per root (P/Ā/U) |
| 5. **पुरुष × वचन** | Which cell? | 3 × 3 = 9 |

**Critical clarifications the app must surface:**

- गण **only matters for the present system** (लट्, लङ्, लोट्, विधिलिङ्). For लृट् (future) and लिट् (perfect), गण is irrelevant — they use their own stem rules.
- पद is **lexically fixed per root** in 99% of cases. उभयपदी roots take both, sometimes with semantic shift, but in Epic/Gita Sanskrit पद choice is often metrical, not semantic.
- The **present stem** is shared across लट्, लङ्, लोट्, विधिलिङ्. So once you've built the present stem for a root, you've unlocked 4 of the 5 लकार.

---

## The 5 लकार (Gita-practical subset)

| लकार | Function | Spotting signal | Stem |
|---|---|---|---|
| **लट्** | Present | -ति / -सि / -मि | Present stem |
| **लङ्** | Past | अ- prefix + -त् / -न् | Present stem + augment |
| **लृट्** | Future | -ष्य- / -स्य- infix | Future stem (root + स्य) |
| **लोट्** | Imperative (Krishna's commands) | -तु / -अ (2sg) / -अन्तु | Present stem |
| **विधिलिङ्** | Optative (should/ought, rhetorical) | -ए- infix → -एत् / -एयुः | Present stem + ए |

लिट् (perfect, reduplicated — चकार, बभूव, उवाच, जगाम) is **recognition-only** in the app. Common forms drilled as a flashcard set, not built from rules.

---

## The 10 गण (with stem-formation rule)

| # | Name | Rule | Example |
|---|---|---|---|
| 1 | भ्वादि | guṇa + अ | भू → भव-ति |
| 2 | अदादि | root itself, no addition | अद् → अत्-ति |
| 3 | जुहोत्यादि | reduplicate | हु → जुहो-ति |
| 4 | दिवादि | + य | दिव् → दीव्य-ति |
| 5 | स्वादि | + नु / नो | सु → सुनो-ति |
| 6 | तुदादि | + अ (no guṇa) | तुद् → तुद-ति |
| 7 | रुधादि | infix न | रुध् → रुणद्-धि |
| 8 | तनादि | + उ / ओ | तन् → तनो-ति |
| 9 | क्र्यादि | + ना / नी | क्री → क्रीणा-ति |
| 10 | चुरादि | + अय | चुर् → चोरय-ति |

**Thematic vs athematic:**
- गण 1, 4, 6, 10 are **thematic** (stem ends in -अ-) — endings attach uniformly. Easy.
- गण 2, 3, 7 are **athematic** — endings attach to consonants, triggering sandhi, with strong/weak stem alternation. Hard.

For Gita reading, the 6 athematic roots that cannot be avoided: **√अस्** (be, 2), **√इ** (go, 2), **√हन्** (kill, 2), **√ज्ञा** (know, 9), **√शृ/शृणु** (hear, 5), **√कृ** (do, 8). Drill these harder than the rest.

---

## The data foundation: Khoomeik's 192 dhātus

[**@khoomeik**](https://x.com/khoomeik) (Rohan Pandey) used **vidyut** (ambuda-org/vidyut) to identify dhātus across the Digital Corpus of Sanskrit (~988k verb tokens). Frequency curve:

| Top N dhātus | Coverage |
|---|---|
| 10 | 27.7% |
| 50 | 58.8% |
| 100 | 73.0% |
| **192** | **86.1%** |
| 500 | 98.5% |

The published chart provides per-root:
- Devanagari root form (e.g., भू)
- गण (color-coded; legend at chart bottom)
- Meaning(s) in English
- 3rd-person singular present form (e.g., भवति) — which **implicitly encodes पद** since -ति = P, -ते = Ā

He also published a second ordering — **same 192 grouped by गण** — which is the more pedagogically useful version (one stem-rule unlocks all roots in that color).

**What the chart does NOT give us (per-root metadata we must add):**
- Explicit P / Ā / उभयपदी tag
- Suppletive present stems (दृश् → पश्य-, गम् → गच्छ-, स्था → तिष्ठ-, सद् → सीद-)
- लिट् (perfect) form, especially the 3sg
- Common irregular forms / sandhi quirks
- Frequency rank (we have the order, not the absolute weight)
- Gita-specific frequency (subset relevance — likely much narrower)

**Sourcing strategy:**
- Roots, गण, meaning, 3sg present → Khoomeik chart (manual transcription or OCR pipeline)
- पद → derive from 3sg ending where unambiguous; mark उभयपदी manually for the ~30 known cases
- Suppletive stems, लिट् forms → Monier-Williams + Whitney's *Roots* + manual entry for the top 50
- Gita-subset frequency → run vidyut over Bhagavad Gita corpus separately (this is its own task; defer)

---

## Data model

```ts
type Padaka = 'P' | 'A' | 'U';     // परस्मैपद / आत्मनेपद / उभयपदी
type Gana = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Dhatu {
  id: string;                       // 'kr', 'bhu', 'gam'
  devanagari: string;               // 'कृ'
  iast: string;                     // 'kṛ'
  meanings: string[];               // ['do', 'make']
  gana: Gana;
  pada: Padaka;
  thematic: boolean;                // gana 1,4,6,10 → true
  frequencyRank: number;            // 1..192 from Khoomeik
  presentStem: string;              // 'कुरु-' / 'भव-' / 'पश्य-'
  isSuppletive: boolean;            // true if present stem ≠ root + gana rule
  futureStem?: string;              // 'करिष्य-' (deriveable, but cache common ones)
  perfect3sg?: string;              // 'चकार', 'बभूव' — recognition-only
  forms: {
    [lakara in 'lat' | 'lan' | 'lrt' | 'lot' | 'vidhilin']: {
      [pada in 'P' | 'A']?: ConjugationTable;  // 3x3 grid
    };
  };
  gitaOccurrences?: VerseRef[];     // populated as verses are decoded
  notes?: string;                   // edge cases, sandhi warnings
}

interface ConjugationTable {
  // 3 puruṣa × 3 vacana = 9 cells
  prathama: { eka: string; dvi: string; bahu: string };  // 3rd person
  madhyama: { eka: string; dvi: string; bahu: string };  // 2nd person
  uttama:   { eka: string; dvi: string; bahu: string };  // 1st person
}
```

**Generation strategy:** rather than pre-computing all 45 forms × 192 roots × 2 पद = up to ~17k cells, **generate on demand** using a rule engine (गण rule + लकार ending set + पद selector + augment/marker). Cache. This mirrors Pāṇini's generative approach and avoids drift errors from manual entry.

For irregular forms (suppletives, athematic strong/weak alternations), override with an explicit table in the `Dhatu` record. The rule engine consults the override first, falls back to generation.

---

## Pedagogy (inherited from bvsiitm + extended)

The parent project's principle is **Known → +1 → Drill → SRS**. For verbs specifically:

**Stage 1 — The 3×3 grid (one root, one लकार)**
- Start with √भू in लट्. Why √भू: regular गण 1, परस्मैपदी, semantically transparent ("be / become"), and it's the chart's #1 frequency rank.
- 9 cells, chanted aloud पाठशाला-style. Audio playback (Devanagari TTS or recorded).
- Drill: random cell prompt → user types ending → check.

**Stage 2 — Same root, all 5 लकार**
- √भू across लट्, लङ्, लोट्, विधिलिङ्, लृट्. 45 cells.
- The pedagogical move: show how लट्/लङ्/लोट्/विधिलिङ् share the present stem (भव-) — only the endings + augment + mood-marker change. Then लृट् introduces the future stem.
- Drill: full paradigm recall. Spaced repetition on weakest cells.

**Stage 3 — Same गण, multiple roots**
- Once √भू is solid, add √गम्, √पठ्, √जीव्, √वस्, √नम् (all गण 1, all P).
- Insight: same stem-formation rule, same endings, same paradigm shape. The 45 cells of √भू transfer almost completely. Only the stem prefix changes.
- This is where the cost of learning collapses.

**Stage 4 — Different गण**
- Introduce √तुद् (गण 6, thematic but no guṇa) → contrast with गण 1.
- Then √कृ (गण 8, athematic, उभयपदी) → introduces पद switching and strong/weak stem alternation.
- Then √अस् (गण 2) — the irregular giant. Chant अस्ति/स्तः/सन्ति separately.

**Stage 5 — Suppletives and high-frequency irregulars**
- दृश् → पश्यति, गम् → गच्छति, स्था → तिष्ठति. Memorize as exceptions.

**Stage 6 — लिट् recognition pack**
- 10–15 cards: उवाच, बभूव, चकार, जगाम, ददर्श, बभाष, ययौ, आह, जज्ञे, विदाञ्चकार. Recognition-only, no drilling on building them from rules.

**Stage 7 — Verse-anchored practice**
- For each Gita verse decoded in the parent project, the finite verb's full conjugation is exposed. "Why is it अकुर्वत and not अकरोत्?" — answered by tapping the form to see the full table, with the chosen cell highlighted.

**SRS layer:** every cell, every dhātu, every लकार is an SRS item. Drill rotation prioritizes (a) lowest accuracy, (b) highest Gita frequency, (c) longest since last review.

---

## App views

### View 1 — Dhātu Periodic Table
- 192-cell grid, color-coded by गण (matching Khoomeik's chart aesthetic)
- Two orderings togglable: **by frequency** (Khoomeik's primary) and **by गण** (Khoomeik's secondary)
- Cell shows: Devanagari root, 3sg present, meaning
- Click → opens Dhātu Detail

### View 2 — Dhātu Detail
- Header: root, गण, पद, frequency rank
- Tabs for the 5 लकार, each showing the 3×3 grid (or 3×3×2 for उभयपदी)
- Tappable cell → highlights the breakdown: stem | augment | mood-marker | ending
- "Why this form?" inline explanation pulling the 5-layer stack
- Section: Gita occurrences — every verse where this root's finite form appears (links back to parent app's Verse Journey)

### View 3 — The Stack Builder (interactive)
- The 5-layer pipeline as a UI: pick a धातु → pick a लकार → pick पद (if उभयपदी) → pick पुरुष × वचन → see the form built layer by layer with each step explained
- Inverse mode: paste a verb form → app decomposes it back to its 5 layers (अनकुर्वत → √कृ + लङ् + augment अ- + present stem कुरु- + P + प्रथम बहु)

### View 4 — Drill / SRS
- Multiple modes: "complete the cell," "identify the लकार," "decompose the form," "translate the form"
- Adaptive: pulls from weakest items + Gita-frequency-weighted

### View 5 — Coverage Progress
- Visual: the Khoomeik frequency curve, with user's mastery overlaid
- "You know 23 dhātus → 47% coverage of the Gita verb tokens you've seen"
- Motivational, but honest

---

## Design

Inherits everything from the parent project / Awadhi Meter Visualizer:
- Parchment `#faf4e8`, ink `#1c1008`, gold `#b5770d`, saffron `#c17f24`, sage `#4a5e4a`
- Noto Serif Devanagari (Sanskrit), Cormorant Garamond (prose), Cinzel (labels)
- गण colors: keep Khoomeik's palette so the periodic table feels familiar to anyone who's seen the original chart

---

## Stack & commands

Same as parent: React + Vite + Vitest.

```bash
npm install
npm run dev        # localhost:5173
npm run build
npm test
```

Co-author trailer: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

---

## What User already knows (do not re-teach)

From the parent CLAUDE.md and the conversation that produced this file:
- The 3 × 3 × 5 = 45 finite-form skeleton, including पाठशाला chanting method
- Full √कृ and √भू paradigms in लट्, lookup-confident in लङ्, लोट्, विधिलिङ्, लृट्
- All 5 लकार spotting signals
- 10 गण conceptually + the thematic/athematic distinction
- पद as lexical (P/Ā/U), not voice in the English sense; semantic load mostly metrical in Epic Sanskrit
- The 5-layer stack as a mental model
- Khoomeik's 192-dhātu chart and the 86.1% coverage claim
- कृदन्त (PPP, absolutive, infinitive) — covered in parent project

## What this app is responsible for teaching

- Per-root: present stem (especially suppletives), पद, गण, full paradigm
- The cross-root pattern transfer (gana → group of roots conjugating identically)
- लिट् recognition pack (10–15 high-frequency perfect forms)
- Gita-anchored consolidation: every finite verb in every decoded verse traces back to a Dhātu Detail page

## Explicitly out of scope

- सन्धि (sandhi) — deferred per parent project
- वैदिक forms (subjunctive, injunctive, etc.)
- Causatives, desideratives, intensives, denominatives — these are **derived stems** layered on top of roots; a v2 sub-app
- Passive voice (-य- stem) — also v2

---

## Build order

1. Manual data ingestion: top 50 dhātus from Khoomeik chart with full metadata (root, गण, पद, meaning, present stem, 3sg present, suppletive flag)
2. Rule engine: generate 5-लकार × 3×3 grid from metadata; verify against known forms
3. View 2 (Dhātu Detail) for one root end-to-end → verify with √भू, √कृ, √गम्, √दृश्
4. View 1 (Periodic Table) wrapping all 50
5. View 3 (Stack Builder) — the pedagogical centerpiece
6. SRS layer + View 4
7. Expand to 192
8. Wire to parent app's verse decoder (View 5 + Gita occurrences)