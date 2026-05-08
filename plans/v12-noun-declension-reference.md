# Plan v12 — Noun-declension reference (शब्दरूपावलिः) + popover deep-link (retrospective)

> **Retrospective.** Written after-the-fact to document the work done in commits `7b81b5f` and `9423fda`. Driven by direct user feedback while reading Gītā 2.4.

## Context

The user was reading Gītā 2.4:

```
कथं भीष्ममहं सङ्ख्ये द्रोणं च मधुसूदन।
इषुभिः प्रतियोत्स्यामि पूजार्हावरिसूदन॥
```

Clicked **भीष्मम्** in the पदच्छेद. The popover showed (post-v11): `category: noun · root: भीष्म · gender: पुं. · number: एकवचन · case: द्वितीया`. The user wrote:

> "Now I know the basics of vibhakti like devaha, devao, devaha, devam, devou, devana. Now I can see that भीष्मम् is like devam — but when I looked at the tabs where I wanted to explore this vibhakti, I could only see verbs and the primer tab which were relevant. In primer, we have vibhakti but that is just vibhakti in one minute. It's not detailed of all the cases like ram is different than Sita."

Maharashtra SSC Sanskrit teaches the राम/देव paradigm and stops. The student is left to memorize देवः/देवौ/देवाः etc. without knowing that:

- **सीता-class** (f. -आ) declines differently — चतुर्थी एकवचन is सीतायै, not सीताय
- **फल-class** (n. -अ) merges प्रथमा and द्वितीया (फलम् both)
- **मति-class** (f. -इ) has alternate forms (मतये vs मत्यै)
- **आत्मन्-class** (m. -न्) has stem alternation: आत्मा (strong) vs आत्मन्/आत्मनि (weak)
- **कर्मन्-class** (n. -न्) is what makes कर्मणि / कर्माणि / कर्मसु all from the same root
- **मनस्-class** (n. -स्) explains visarga in मनः and the consonant-cluster in मनांसि

None of this was anywhere in the Atlas. Pronouns, Compounds, Sandhi Lab, Karaka, Avyaya, Adj/Adv — but no general noun reference.

A follow-up message asked for an in-popover **link** that takes the user directly to the relevant paradigm — closing the recognition→reference loop in one click.

## Decisions locked

| Decision | Choice | Reason |
|---|---|---|
| Where the reference lives | New Atlas sub-tab `Declensions` (शब्दरूप). Default Atlas landing now `/atlas/declensions` (was pronouns) | Atlas-as-reference principle from v10. Most-needed → makes it the default |
| Number of paradigms | 8 — covering every common-noun stem-class in the 25-verse corpus | Comprehensiveness without paradigm-paralysis. Excludes m.-इ (मुनि), f.-ई (नदी), f.-ऊ (वधू) — none in our corpus yet |
| Paradigm presentation | One paradigm at a time — chip row to switch, full 24-form table for the active one | Mirrors the Verbs tab's Periodic Table → DhatuDetail pattern |
| Corpus example wiring | Each paradigm carries hand-curated `corpusExamples[]` with `verseRef` for clickable navigation | Matches Compound Bank's `Gītā c.v ↗` convention. Also makes the reference *grounded* — these aren't theoretical paradigms, they're the words you've already met |
| Pedagogy notes | One per paradigm — explicitly cites the trigger word when relevant (देव's note mentions भीष्मम् in 2.4) | Closes the loop on the user's recognition. Also teaches the classification step explicitly |
| Popover → paradigm link | In-popover footer "follows X-class — see all 24 forms ↗" when the parsing classifies | Closes the user's literal request. Pedagogically: shows the m.-अ → देव classification step, building muscle |
| Deep-link mechanism | URL hash `/atlas/declensions#<paradigmId>` | Same pattern as `/primer#sectionId`. Restorable via bookmark, browser back works |
| Classifier scope | Heuristic on `root` (last codepoint) + `gender`. Pronouns / verbs / particles / indeclinable kṛdantas → null | Pronouns have their own Atlas tab. Verbs aren't declensions. Indeclinables don't decline |

## Process rules (continued)

- Small commits per coherent slice
- Build green + tests green at every commit boundary
- Per-meaningful-task `checkpoint-N.md`
- New code (data + UI) gets tests in the same commit
- Workflow doc updated when new cross-tab paths land

## Implementation slices

### Slice A — Atlas → Declensions tab (`7b81b5f`, part of checkpoint-32)

#### Data: `src/data/declensions.js`

8 paradigms. Each entry has:
```js
{
  id, name, deva, gender, ending, description, sample,
  forms: { pra: { eka, dvi, bahu }, ... sam: {...} },  // all 24 cells
  corpusExamples: [{ word, parsing, gloss, verseRef }],
  pedagogyNote
}
```

Plus exported helpers:
- `VIBHAKTI_ORDER` — 8 cases in canonical order with deva / en / sense labels
- `VACHANA_ORDER` — eka / dvi / bahu
- `getDeclensionById(id)` — paradigm lookup
- `validateParadigm(decl)` / `validateCorpusRefs(decl)` — used by tests

The 8 paradigms with corpus examples:

| Paradigm | Class | Corpus examples |
|---|---|---|
| **देव**     | m. -अ  | भीष्मम्, सङ्गात्, धर्मस्य, योगाय, युगे, कृष्ण |
| **सीता**    | f. -आ  | जरा (2.13) |
| **फल**      | n. -अ  | कौमारम्, यौवनम्, फलेषु, समत्वम्, कौशलम्, शरणम् |
| **मति**     | f. -इ  | ग्लानिः, सिद्धि-असिद्ध्योः, प्राप्तिः |
| **गुरु**    | m. -उ  | बन्धुः, रिपुः, वायोः, हेतुः |
| **आत्मन्**  | m. -न् | आत्मा / आत्मानम् / आत्मना / आत्मनः (Gītā 6.5 in 4 cases) |
| **कर्मन्**  | n. -न् | कर्मणि (2.47), कर्माणि (2.48), कर्मसु (2.50) |
| **मनस्**    | n. -स् | मनः (6.34), वासांसि (2.22 by analogy) |

#### Component: `src/components/Declensions.jsx`

Receives `onOpenVerse` callback (matches the Compound Bank's contract). Renders:
- Title + lede + aside explaining "why multiple paradigms"
- Chip row — one chip per paradigm with name + gender + ending; click to switch
- Active paradigm card:
  - Header: deva name + gender label + ending pattern + sample word
  - Description prose
  - 24-form table (8 rows × 3 cols, plus row header column)
  - Pedagogy note (saffron left-border callout)
  - Corpus examples list — clickable verse-refs

#### Atlas wiring: `src/components/Atlas.jsx`

Added `'declensions'` to `ATLAS_TABS` as the first entry. Default sub-tab when no `:section` param: now `'declensions'` (was `'pronouns'`).

#### Primer cross-link: `src/data/primer.js`

vibhakti aside extended with: *"Need the FULL declension table (8 cases × 3 numbers) for any paradigm? See Atlas → शब्दरूप (Declensions)."* Also added `linkToAtlas: 'declensions'` so future Primer tooling can render it as a button.

#### Tests
- `src/data/declensions.test.js` (27 tests) — 24-cell completeness via `validateParadigm`, every `verseRef` exists via `validateCorpusRefs`, every example word actually appears in that verse's padaccheda, pedagogical sanity (देवम् matches the user's example, neuter pra=dvi merge, आत्मन् stem alternation, कर्मणि matches 2.47)
- `src/components/Declensions.test.jsx` (14 tests) — chip switching, 24 form-cells rendered, paradigm switches activate correctly, onOpenVerse callback fires, pedagogy note explicitly mentions भीष्मम्

#### Workflow + integration test

New W11 in `docs/workflows.md` + integration test in `workflows.test.jsx`: `/journey/2/4` → click Atlas in masthead → click Declensions sub-tab → confirm देव is active and pedagogy mentions भीष्मम् → click the corpus-example verse-ref → land back on 2.4.

Also updated existing tests asserting Atlas default sub-tab was `pronouns` to expect `declensions`.

Test count: 360 → 402 (+42).

### Slice B — WordPopover → Declensions deep link (`9423fda`, part of checkpoint-32)

User follow-up: "Can I click directly to the शब्दरूप section from the popover?"

#### Classifier: `getDeclensionForParsing(parsing)` in `src/data/declensions.js`

```
input: { category, root, gender, kind?, ... }
output: paradigmId | null
```

Heuristic on the last codepoint of `root` + `gender`:
- VIRAMA at end → consonant-final stem; second-to-last char distinguishes -न् vs -स्
- VOWEL_AA → -आ stem (gender f → सीता)
- VOWEL_I → -इ stem (gender f → मति; m → null since मुनि-class isn't in our 8)
- VOWEL_II → -ई stem → null (नदी-class not in our 8)
- VOWEL_U → -उ stem (gender m → गुरु)
- consonant codepoint → implicit -अ stem (m → देव; n → फल)
- otherwise → null

Returns null for `category: 'pronoun' | 'verb' | 'particle'` and for indeclinable kṛdantas (absolutive / infinitive).

#### WordPopover footer link: `src/components/WordPopover.jsx`

```jsx
const paradigm = getDeclensionForParsing(parsing) ? getDeclensionById(...) : null;
{paradigm && (
  <button className="wp-paradigm-link" onClick={() => navigate(`/atlas/declensions#${paradigm.id}`)}>
    follows <strong>{paradigm.name}</strong>-class — see all 24 forms ↗
  </button>
)}
```

Uses `useNavigate` from react-router (already mounted under `Routes`). The link is a button, styled with subtle parchment background + saffron arrow.

#### Hash-aware Declensions: `src/components/Declensions.jsx`

Reads `useLocation().hash` on mount and via `useEffect` when the hash changes. Falls back to `'deva'` when missing or unknown. Smooth-scrolls the active card into view on hash-driven activation.

```js
const [activeId, setActiveId] = useState(() => paradigmFromHash(location.hash) || 'deva');
useEffect(() => {
  const fromHash = paradigmFromHash(location.hash);
  if (fromHash && fromHash !== activeId) {
    setActiveId(fromHash);
    requestAnimationFrame(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
}, [location.hash]);
```

#### Tests
- 18 classifier unit tests in `declensions.test.js` — every paradigm + every excluded category + classifies भीष्मम्'s exact parsing
- 6 popover-link tests in `WordPopover.test.jsx` — m.-अ → देव, m.-न् → आत्मन्, n.-न् → कर्मन्; no link for pronouns / verbs / particles
- 7 hash-navigation tests in `Declensions.test.jsx` — `#atman` → आत्मन्, `#karman` → कर्मन्, fallback to देव when hash missing or unknown, click-to-override hash

Workflow W11 in `docs/workflows.md` updated to use the new direct path (was 4 clicks to navigate; now 1).

Test count: 402 → 432 (+30).

## Critical files

| File | Slice | Change |
|---|---|---|
| `src/data/declensions.js` (new) | A, B | 8 paradigms × 24 forms + classifier helper |
| `src/components/Declensions.jsx` (new) | A, B | Chip switcher + 24-form table + corpus examples + hash-aware selection |
| `src/components/Atlas.jsx` | A | Added `'declensions'` to TABS; default sub-tab = declensions |
| `src/data/primer.js` | A | vibhakti aside cross-links to Atlas → Declensions |
| `src/components/WordPopover.jsx` | B | `getDeclensionForParsing` + footer link via `useNavigate` |
| `src/styles.css` | A, B | `.declension-*` styles + `.wp-paradigm-link` |
| `src/data/declensions.test.js` (new) | A, B | 27 + 18 = 45 tests (data integrity + classifier) |
| `src/components/Declensions.test.jsx` (new) | A, B | 14 + 7 = 21 tests (UI + hash nav) |
| `src/components/WordPopover.test.jsx` | B | + 6 popover-link tests; existing tests wrapped in MemoryRouter |
| `src/__tests__/{routing,app.integration,workflows}.test.jsx` | A | Atlas-default-tab assertions updated |
| `docs/workflows.md` | A, B | New W11; updated for direct-link path |

## Verification

**End-to-end manual walk:**

1. Open `/journey/2/4` → see Gītā 2.4 ✓
2. Click भीष्मम् chip in पदच्छेद → popover shows grammar fields ✓
3. Read popover footer: "follows **देव**-class — see all 24 forms ↗" ✓
4. Click footer link → URL becomes `/atlas/declensions#deva` ✓
5. Page renders with देव chip already active and देव's 24-form table visible ✓
6. Read pedagogy note: explicitly cites भीष्मम् in 2.4 ✓
7. Scroll to corpus examples → see "Gītā 2.4 ↗" for भीष्मम् ✓
8. Click it → return to /journey/2/4 ✓ (loop closed)
9. Repeat for आत्मना in 6.5 → "follows **आत्मन्**-class" → `#atman` ✓
10. Repeat for कर्मणि in 2.47 → "follows **कर्मन्**-class" → `#karman` ✓
11. Repeat for अहम् (pronoun) → no link rendered ✓
12. Repeat for भवति (verb) → no link rendered ✓

**Automated:** 432/432 tests passing. `npm run build` clean.

## Out of scope (deferred)

- Stem classes not in our 25-verse corpus: मुनि (m. -इ), नदी (f. -ई), वधू (f. -ऊ), गो / पथिन् / etc.
- Adjective-specific paradigms (currently adjectives use the noun's classification by gender)
- विशेषण-नियम (which adjective declines like which paradigm) as a UI feature
- Pronoun declensions (already in `Atlas → Pronouns`)
- Verb conjugations (already in `Verbs` tab)
- Cross-paradigm comparison view (e.g. "show देव vs सीता side-by-side") — defer until user asks
- Auto-classifying every padaccheda word at corpus-load and showing paradigm in the Vocabulary tab — defer

## Relation to other plans

- **Builds on v11.** Without v11's wordParsings backfill, the classifier would have no `root` + `gender` to act on for most verses. The Primer regression test from v11 ensured every case was actually represented; v12 makes those representations clickable into a paradigm.
- **Builds on v3** (Grammar Atlas). Adds a major sub-tab; sets a new default landing.
- **Echoes v2** (Verb System). Verbs has a Periodic Table + Stack Builder + Coverage; Nouns now has Declensions with paradigm-by-paradigm tables. Symmetry between the two grammar engines.

## Checkpoints in this plan

- `checkpoint-32.md` — Slice A + B (Declensions tab + popover deep-link)
