# Plan v8 — Sanskrit Reading Workbench: sandhi engine, word-level parsing, vocabulary

> Sequels v7 (Reading & Reference). v7 made the decoded verses *durable* (references inline, notes, search, export). v8 makes the *act of decoding* faster and the *corpus of words* visible. Three pieces — a working sandhi engine, word-level interactive parsing, and a vocabulary tab — that together push the app from "log of decoded verses" toward "active reading workbench."

## Context

What's good at v0.7.0:
- 4 decoded verses with full structural data
- 16 themes, 6 tabs, 133 tests, BrowserRouter routing, Markdown export, references panel
- The bones AND the meat from v6 + v7

What's missing — the bottlenecks during actual decoding:
- **Sandhi.** The user hand-undoes sandhi. `पाण्डवाश्चैव → पाण्डवाः + च + एव` is mechanical work. CLAUDE.md flags sandhi as "deferred" project-wide; v8 stops deferring it.
- **Per-word grammar.** The verse pane shows पद chips but each chip is just a string — not interrogable. To know that `युयुत्सवः` is प्रथमा बहुवचन पुल्लिंग, the user re-reads the विभक्ति notes section. The data exists; the surface doesn't expose it per-word.
- **No vocabulary view.** Every decoded verse adds 8-15 unique पद. After 50 verses that's 500+ words met. There's no surface that shows "all words you have encountered, frequency-ranked, with links back to where you met them." The Atlas's Avyaya tally does this for indeclinables specifically; v8 generalises to all words.

## Decisions locked

| Decision | Choice | Reason |
|---|---|---|
| Sandhi engine scope | The 20–25 most common Pāṇinian sandhi rules — covers ~95% of Gītā joins | Going for completeness needs Aṣṭādhyāyī-grade rule machinery; that's months. The tail of rare sandhi is rare for a reason. |
| Sandhi engine direction | **Undo only** (split a join into its parts), not generate (combine parts into a join) | The decoder's job is splitting. Generation is for poets. |
| Per-word parsing data | Hand-curated, lives on each verse as `wordParsings: {[word]: {...}}` | We have 4 verses; hand-curation is fine. Once we have 50, the parser engine matures. |
| Vocabulary auto-grow | Build-time scan over `verses.js → padaccheda[]` + `wordParsings` | Same pattern as `samasa.js → buildSamasaBank` and `avyaya.js → tallyParticles`. |
| Sandhi Lab placement | New sub-tab in the Atlas (alongside Pronouns / Compounds / Kāraka / Avyaya / Adj-Adv) | The Atlas is the "everything-else grammar" home; sandhi belongs there. |
| Vocabulary tab placement | New top-level tab "Words" | Top-level because vocabulary is a first-class artefact of the user's reading practice, not a sub-page of the Atlas. |

## Implementation slices

### Slice 0 — This plan-doc

`plans/v8-reading-workbench.md` — committed alone before code.

### Slice 1 — Sandhi engine: rule catalogue + undo function + tests

**Files:**
- New: `src/utils/sandhi.js` — `SANDHI_RULES` catalogue + `undoSandhi(s)` that returns `[{ rule, parts }]` candidates.
- New: `src/utils/sandhi.test.js` — tests covering the 25 rules with canonical example pairs.

The 25 rules I'll start with (vowel + visarga + consonant — the high-frequency band):

**Vowel sandhi (savarṇa-dīrgha, guṇa, vṛddhi, yan, ayādi, pūrvarūpa, prakṛti):**
1. `अ + अ → आ` (e.g., अपि + अहम् → अप्यहम्… well, that's yan; let me pick स + अहम् → साहम्)
2. `अ + आ → आ`
3. `अ + इ → ए` (अ + इति → एति)
4. `अ + उ → ओ` (अ + उपपद्यते → ओपपद्यते)
5. `अ + ऋ → अर्`
6. `अ + ए → ऐ` (न + एतत् → नैतत्)
7. `अ + ओ → औ`
8. `इ/ई + अ → य् + अ` (त्वयि + उपपद्यते → त्वय्युपपद्यते — this is yaṇ)
9. `उ/ऊ + vowel → व् + vowel` (yaṇ)
10. `ऋ + vowel → र् + vowel` (yaṇ)
11. `आ + उ → ओ` (त्यक्त्वा + उत्तिष्ठ → त्यक्त्वोत्तिष्ठ)

**Visarga sandhi:**
12. `ः + voiced consonant → ओ` (देवः + अपि → देवोऽपि — but this is for अ-stem)
13. `ः + क/ख → ष्क/ष्ख` (...)
14. `ः + च/छ → श्च/श्छ` (पाण्डवाः + च → पाण्डवाश्च)
15. `ः + त/थ → स्त/स्थ`
16. `ः + प/फ → ष्प/ष्फ`
17. `ः + at end → ः stays` or visarga drops before vowel

**Consonant sandhi:**
18. `त् + च → च्च` (अनेकान्त + च → अनेकान्तच्च)
19. `त् + ल → ल्ल`
20. `न् + च → ंश्च` (anusvara)
21. `म् + consonant → ं + consonant`
22. `त् + ज → ज्ज` (तत् + जयति → तज्जयति)

**Pre-pause / final-stop:**
23. `Final consonant before vowel: regressive assimilation` (...)

The engine: each rule has a regex pattern + a description. `undoSandhi(s)` tries each pattern; returns ranked hypotheses. For a string like `पाण्डवाश्चैव` it should return `["पाण्डवाः च एव"]` (chained: visarga-च rule + अ-ए vowel rule).

### Slice 2 — Sandhi Lab in the Atlas

**Files:**
- New: `src/components/SandhiLab.jsx` — paste a junction, see candidates
- [src/components/Atlas.jsx](src/components/Atlas.jsx) — add `sandhi` sub-tab
- `src/styles.css` — Sandhi Lab styles

UI: textarea with the input, a "split" button, and a result list:
```
पाण्डवाश्चैव
   ┌──> पाण्डवाः · च · एव
   │     • visarga + च → श्च
   │     • अ + ए → ऐ
```

### Slice 3 — Per-word parsings on the 4 decoded verses

**Files:**
- [src/data/verses.js](src/data/verses.js) — add `wordParsings: { [pada]: WordParsing }` per verse
- [src/components/VerseDetail.jsx](src/components/VerseDetail.jsx) — wrap each पद chip in a click-to-expand popover
- New: `src/components/WordPopover.jsx`

WordParsing shape:
```js
{
  root: string?,           // 'धर्म', '√कृ' (with prefix for verbs)
  category: 'noun'|'verb'|'adj'|'pronoun'|'particle'|'krdanta',
  gender: 'm'|'f'|'n'|'-',
  number: 'eka'|'dvi'|'bahu'|'-',
  case: 'pra'|'dvi'|...|'-',
  lakara: 'lat'|'lan'|...|'-',
  purusha: 'prathama'|...|'-',
  gloss: string,
}
```

Each पद chip becomes click-to-toggle-popover. Popover shows root + structured grammar fields + gloss.

### Slice 4 — Vocabulary tab: "Words I've Met"

**Files:**
- New: `src/utils/vocabulary.js` — `buildVocabulary()` scans VERSES.padaccheda + wordParsings; returns ranked list.
- New: `src/components/Vocabulary.jsx` — table view with sort (alpha / frequency / first-met), filter by category (noun/verb/etc.), clickable row → opens the verse where first met.
- [src/App.jsx](src/App.jsx) — add **Words** tab to masthead (route `/words`).
- New: `src/utils/vocabulary.test.js`

Columns: word · category · root · count · first met · gloss. Click a count → see all verses where it appears. Click first-met → jump to that verse.

### Slice 5 — Vocabulary cards into Practice (bonus)

**File:** [src/utils/srs.js](src/utils/srs.js) — extend `seedCards()` with a `vocab_recall` card type. Prompt: "What does X mean?" (where X is a पद from the corpus); answer: gloss + root.

## Verification

Per slice: build green + tests green.

End-to-end after slice 5:
1. Atlas → Sandhi Lab → paste `पाण्डवाश्चैव` → see "पाण्डवाः · च · एव" with the two rules.
2. Verse 1.1 → click the पद chip "युयुत्सवः" → popover shows root + प्रथमा बहुवचन पुल्लिंग + gloss.
3. New "Words" tab → see ~40 unique पद from the 4 decoded verses, frequency-ranked. Click a row → jump to the first verse where met.
4. Practice → start a session → see at least one vocab_recall card.

## Files

| File | Slice | Change |
|---|---|---|
| `plans/v8-reading-workbench.md` (new) | 0 | This plan |
| `src/utils/sandhi.js` (new) | 1 | Rule catalogue + undoSandhi() |
| `src/utils/sandhi.test.js` (new) | 1 | 25-rule test suite |
| `src/components/SandhiLab.jsx` (new) | 2 | Atlas sub-tab |
| `src/components/Atlas.jsx` | 2 | Mount the new sub-tab |
| `src/data/verses.js` | 3 | Add `wordParsings` per verse |
| `src/components/VerseDetail.jsx` | 3 | Click-to-popover पद chips |
| `src/components/WordPopover.jsx` (new) | 3 | Popover shape |
| `src/utils/vocabulary.js` (new) | 4 | Auto-grow vocabulary builder |
| `src/utils/vocabulary.test.js` (new) | 4 | Tests |
| `src/components/Vocabulary.jsx` (new) | 4 | Words tab |
| `src/App.jsx` | 4 | Add /words route + masthead tab |
| `src/utils/srs.js` | 5 | New `vocab_recall` card type |
| `src/styles.css` | 1, 2, 3, 4 | New section styles |
| `checkpoint-18.md` … `checkpoint-22.md` | per slice | Narrative |

## Out of scope (v9+)

- Full 700-verse corpus loading (still — depends on a sourcing decision the user owns)
- Auto-decode wizard (paste a verse → engine produces a stub decoded structure)
- Real-time grammatical parser using vidyut or similar
- Audio chant playback / TTS
- Sandhi *generation* (combining parts into joined form)
- Causative / passive / desiderative / intensive verb stems

## Process rules (locked, same as v6/v7)

1 commit per slice; build green + tests green at every commit; checkpoint-N.md per slice; plan-doc lands first.
