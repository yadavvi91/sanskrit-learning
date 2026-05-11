# Checkpoint 32 — Atlas → शब्दरूप (Declensions): noun-paradigm reference + popover deep-link

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Commits:** `7b81b5f`, `9423fda`
**Slice:** Closing the SSC-leaves-this-out gap

## What changed

User feedback that drove this:

> "I saw भीष्मम् and it is a dvitiya ekvachan pullinga. Now I know the basics of vibhakti like devaha, devao, devaha, devam, devou, devana. Now I can see that भीष्मम् is like devam — but when I looked at the tabs where I wanted to explore this vibhakti, I could only see verbs and the primer tab which were relevant. In primer, we have vibhakti but that is just vibhakti in one minute. It's not detailed of all the cases like ram is different than Sita."

SSC Sanskrit teaches the राम/देव paradigm and stops. The student is left to memorize without knowing that सीता-class, फल-class, मति-class, गुरु-class, आत्मन्-class, कर्मन्-class, मनस्-class etc. each decline differently. This slice fills that gap with two coherent pieces.

### Piece 1: Atlas → Declensions tab (`7b81b5f`)

New Atlas sub-tab **शब्दरूप** (Declensions), now the default Atlas landing page (was /atlas/pronouns). Eight paradigms covering every common-noun stem-class in the 25-verse corpus:

| Paradigm | Class | Corpus examples (clickable) |
|---|---|---|
| **देव**     | m. -अ  | भीष्मम्, सङ्गात्, धर्मस्य, योगाय, युगे, कृष्ण |
| **सीता**    | f. -आ  | जरा (2.13) |
| **फल**      | n. -अ  | कौमारम्, यौवनम्, फलेषु, समत्वम्, कौशलम्, शरणम् |
| **मति**     | f. -इ  | ग्लानिः, सिद्धि-असिद्ध्योः, प्राप्तिः |
| **गुरु**    | m. -उ  | बन्धुः, रिपुः, वायोः, हेतुः |
| **आत्मन्**  | m. -न् | आत्मा / आत्मानम् / आत्मना / आत्मनः (Gītā 6.5 in 4 cases) |
| **कर्मन्**  | n. -न् | कर्मणि (2.47), कर्माणि (2.48), कर्मसु (2.50) |
| **मनस्**    | n. -स् | मनः (6.34), वासांसि (2.22 by analogy) |

Each paradigm card has:

- The full 24-form table (8 cases × 3 numbers)
- A pedagogy note — देव's note explicitly says "*भीष्मम् in Gītā 2.4 is exactly देवम् structurally*" closing the loop on the user's trigger
- Corpus examples with `Gītā c.v ↗` buttons that navigate back to the verse via the same `onOpenVerse` callback used elsewhere

Files:
- New: `src/data/declensions.js` (paradigm data + helpers)
- New: `src/components/Declensions.jsx`
- Modified: `src/components/Atlas.jsx` (added `'declensions'` to `ATLAS_TABS`; default sub-tab now declensions)
- Modified: `src/data/primer.js` (vibhakti aside cross-links to Atlas → Declensions)
- New: `src/data/declensions.test.js` (27 tests — 24-cell completeness, corpus refs valid, pedagogical sanity checks)
- New: `src/components/Declensions.test.jsx` (14 tests — chip switching, table rendering, onOpenVerse callback)
- New workflow W11 in `docs/workflows.md` + integration test in `workflows.test.jsx`

### Piece 2: WordPopover → Declensions deep link (`9423fda`)

User's follow-up: "Can I click directly to the शब्दरूप section from the popover?" Yes. Now the popover footer reads "**follows देव-class — see all 24 forms ↗**" when the parsing classifies into a paradigm. One click → `/atlas/declensions#deva` with the right paradigm pre-selected.

Three pieces wired together:

1. **`getDeclensionForParsing(parsing)` classifier** in `declensions.js` — heuristic on the last codepoint of `root` + `gender` → paradigm id. Returns null for pronouns (own Atlas tab), verbs, particles, indeclinable kṛdantas, and stems we don't yet have paradigms for (e.g. m. -इ मुनि-class, f. -ई नदी-class).

2. **WordPopover footer link** ([WordPopover.jsx:113-122](src/components/WordPopover.jsx#L113-L122)) — renders only when the classifier returns a match. Uses `useNavigate` to deep-link to `/atlas/declensions#<paradigmId>`.

3. **Hash-aware Declensions.jsx** — reads `useLocation().hash` on mount and on hash changes; falls back to देव when missing/unknown. Smooth-scrolls the active card into view.

Tests added: 18 classifier unit tests + 6 popover-link tests + 7 hash-navigation tests = 31 new tests. W11 in workflows.md updated to use the new direct path (was 4 clicks, now 1).

## Why this matters

The recognition→reference loop is the central learning move. The user sees a word, identifies its case, then needs the full paradigm to be ready in their head. Without the link, that took 4 clicks (masthead Atlas → TOC Declensions → chip देव → done). With the link, it's 1.

The "follows X-class" phrasing also teaches the *classification step* explicitly. Every time the user sees "follows देव-class" they're being shown the m.-अ → देव mapping. That's the muscle they're building, not bypassing.

## Verified

- `npm run build` clean (bundle 466KB → 481KB, +15KB for the new tab + classifier)
- 432/432 tests passing (was 360 before this slice, +72: 27 declensions data + 14 Declensions UI + 18 classifier + 6 popover link + 7 hash-nav)
- Manual walk: click भीष्मम् in 2.4 → see "follows देव-class ↗" → click → land on `/atlas/declensions#deva` with देव table visible → click "Gītā 2.4 ↗" corpus example → back on 2.4 ✓
- Click आत्मा in 6.5 → "follows आत्मन्-class" → land on `/atlas/declensions#atman` ✓

## Out of scope

- Adjective declension nuances (विशेषण typically follows the noun's paradigm; we use the same heuristic but don't have dedicated adjective paradigms)
- Verb conjugation reference (already covered by Verbs tab)
- Pronouns (already in Atlas → Pronouns)
- Stem classes not in our corpus: मुनि (m. -इ), नदी (f. -ई), गो / पथिन् / etc.

## Relation to other plans

This is the headline feature of `plans/v12-noun-declension-reference.md`. Builds on:

- checkpoint-31's wordParsings backfill (without root + gender on every word, the classifier has nothing to classify)
- checkpoint-30's workflow doc (W11 explicitly maps to this feature)
- Atlas-as-reference principle (v10): paradigms are reference data, independent of corpus, but corpus examples ground them
