# Plan v14 — Coverage push to 98%, reference-link wiring, UX nav, and article voice (retrospective)

> **Retrospective.** Written after-the-fact to document the work done after [v13](v13-corpus-scale.md) shipped the 701-verse bulk import. v13 closed the coverage gap on the corpus side; v14 is the response to a long user reading-walk that surfaced engine, vocab, UX, and voice problems v13 hadn't addressed.

## Context

After [v13](v13-corpus-scale.md), the user read through verses across multiple chapters and flagged failures one at a time. The pattern was repetitive: open a verse, click a chip, see "no grammar data yet," go back, read the next, hit a different gap. v14 is the consolidating sweep that closes those gaps systematically rather than one at a time.

Five separable themes emerged from the audit, each with its own commit cluster:

1. **Engine + classifier hardening.** Mis-split sandhi blobs (`अग्निर्भस्म्` + `असात्कुरुते`, `मरीचिर्म्` + `अरुतामस्मि`), missing finite verbs (passive `-यते`, defective `√अह्`, irregular विधिलिङ् `-यात्`), no सन्धि section on Ch 3+ verses, no समास derivation, predicate-PPP verses mis-classified as "implied अस्ति."
2. **Vocab coverage push.** 953 distinct missing padas across the corpus on entry. Most were real Sanskrit forms (pronouns, noun declensions, krdantas, verb forms, compound stems) the agent-built `VOCAB_EXTENDED` had skipped.
3. **Reference-link wiring.** `तस्य` showed a "see in सर्वनाम — तद्-template" link. Most other words showed nothing. User wanted every popover to surface a useful pedagogical reference (paradigm, Verbs page, Primer section, Atlas tab).
4. **UX nav.** No prev/next between verses. Reading Gītā end-to-end required mouse-clicking each verse in the sidebar grid. Section order put grammar analysis above translations, so the user had to scroll past क्रिया / विभक्ति / विवेकः to reach अन्वय / English.
5. **Article voice + Origin page.** The existing `article.md` was journalistic-Claude-style ("compiled binary, never the source"; "most sophisticated formal generative grammars ever written"; "Two years before any code was written" framing code as the goal). User asked for first-person, heartfelt rewrite, three-part structure, plus a Short/Full toggle on the `/origin` page.

End-state targets: 98%+ pada coverage, every popover with a "see in [reference]" link, prev/next navigation that preserves scroll, article rewritten with the user's voice and structured into three explicit parts.

## Decisions locked

| Decision | Choice | Reason |
|---|---|---|
| New module for declension + pronoun tables | `src/data/coreVocab.js` between `SHARED_VOCAB` and `VOCAB_EXTENDED` in lookup priority | Hand-curated base layer wins over agent-bulk; agent-bulk wins over suffix-inferred fallback |
| Suffix-pattern fallback at runtime | New `inferFromSuffix(word)` in `sharedVocab.js`, ~30 patterns covering verb endings, krdantas, noun cases | Lifts coverage from 90.6% to 98.24% in one commit; entries tagged `source: 'suffix-inferred'` so callers can distinguish authoritative vs best-guess |
| Stem-aware fallback glosses | When a suffix matches, strip and lookup the bare stem to produce real glosses ("by horses") instead of generic templates ("by/with X-s") | The generic templates were nearly as bad as showing nothing |
| Compound popover priority over suffix-inferred | When a hyphenated word's parsing is `source: 'suffix-inferred'`, prefer `decomposeCompound` (per-component popover) over the generic Popover | `परम-इष्वासः` was showing "a-stem nominative singular (m)" instead of "परम (supreme) + इष्वासः (archer)" |
| `samasNotes` derivation tier | Two-tier: 1) parse vibhaktiNotes for `<compound> → ... <type> "<gloss>"` patterns; 2) fall back to per-component vocab lookup with a heuristic type tag (3+ noun parts → इतरेतर द्वंद्व) | Hand-decoded entries (Ch 1/2) keep their type+gloss; auto-stub Ch 3+ verses get derived entries with at least per-component meanings |
| Reference-link unifier | New `getReferenceLink(parsing)` helper routing every category to a meaningful target (paradigm / pronoun anchor / Verbs page / Primer section / Atlas tab) | Previously only nouns + pronouns had links; verbs / krdantas / particles / suffix-inferred entries dumped to the same EmptyPopover |
| Verbs-page existence check | `referenceLinks` consults `DHATU_REGISTRY` (Set built from `DHATUS_EXTENDED`) before linking; missing dhatus route to `/primer#lakara` with a clear "(√X not in the top-192 list yet)" notice | Previously `/verbs/ध्मा` silently fell back to `/verbs/भू` — confusing |
| Dhatu stub generation | Auto-generated `_dhatus_extra.js` with 49 stubs from vocab evidence (id, devanagari, meanings, gana, pada) | Real verbs whose dhātu wasn't in the top-192 list now have a Verbs-page landing instead of a Primer dump |
| Verse navigation UI | Floating `‹ ›` chevrons on left/right edges of viewport, vertically centered, opacity 0.55 | User feedback rejected bulky horizontal bars at top/bottom — vertical space too expensive. Also added arrow-key keyboard nav |
| Scroll preservation across prev/next | Skip `ScrollToTop` when both prev and current pathnames start with `/journey/` | Reading flow: stay on the अन्वय / English section as you advance through verses |
| Section order in VerseDetail | Reading flow first (मूल → पदच्छेद → अन्वय → हिंदी → English), grammar analysis below (क्रिया → विभक्ति → विवेकः → व्याख्या) | Casual read flows top-to-bottom; deep grammar work is on demand |
| Origin page Short/Full | Two-tab toggle: "Short version" (6 sections, 4 images) default; "Full essay" loads `article.md` | User wanted both views explicitly, not stacked |
| Article voice rewrite | First person, no Claude-as-character, no journalistic flourish, no design-DNA / parchment / React aesthetic talk, no superlatives the user can't back up | Direct user feedback: "Main dil nikaal ke rakh raha hu aur tujhe react ki padi hai" |
| Article structure | Three explicit parts with H1 headers: Part 1 (history), Part 2 (pedagogy + data in detail), Part 3 (project itself) | User: "I don't want to mix the project design / progress versus the pedagogy or the historical inspiration" |

## Implementation slices

Five coherent slices, each with its own checkpoint.

### Slice A — engine + classifier hardening ([checkpoints/checkpoint-38.md](../checkpoints/checkpoint-38.md))

- **Patterns + engine signals**: passive `-यते` / `-यन्ते`, defective `√अह्` (आह / आहुः / प्राह / प्राहुः) hard-coded lookup, irregular विधिलिङ् `-यात्`, आत्मनेपद imperative endings (-स्व, -ध्वम्, -न्ताम्, -ताम्). 6 new entries in `patterns.js` + matching docs in `patterns-won.md`.
- **Ch 2 (साङ्ख्ययोग) hand-decoded** via `_ch2_overrides.js` (60 entries, both batches). Wired into `verse-overrides.js`.
- **Splitter fixes**: LEFT-conjunct guard on Pattern B/C (kills `-र्म` / `-श्म` / `-ष्म` mis-cuts); `BOGUS_SHORT_FRAGMENTS` set (kills `तदस्ति → तदः + ति` hallucinated visarga); Tier-1b override when suffix is a vocab-recognized verb form (frees `अस्मि` from `मरुतामस्मि`); vocab-trust length guard 14 → 25.
- **Vocab-hint pre-pass**: `VOCAB_HINT_SPLITS` map built at module load by parsing `(X + Y)` parentheticals out of `VOCAB_EXTENDED` glosses. Validated by canonical-form join equality (90 → 121 hint splits after anusvara `ं ↔ म्` canonical fix).
- **Visarga-र् sandhi**: two patterns (Pattern A `र+्+voiced-cons`; Pattern B `र+V-matra` with matra absorption). Catches `मरीचिर्मरुताम् ← मरीचिः + मरुताम्` and `पराण्याहुरिन्द्रियेभ्यः ← पराण्याहुः + इन्द्रियेभ्यः`.
- **Upasarga-aware verb classifier**: `classifyFiniteVerb` falls back to `stripUpasargas + lookupSharedVocab(stripped)` so `उपसेवते → उप + √सेव्` resolves.
- **`autoDecode` second-pass classifier**: tries each split pada AND each original chunk, so verbs that split into smaller un-classified pieces still surface a क्रिया card from the joined-blob vocab entry.
- **`sandhiNotes` plumbed from autoDecode**: was dropped on the floor in `hydrate.js`. Ch 3+ सन्धि coverage 0% → 87.6%.
- **`samasNotes` derivation**: from hyphenated padaccheda + extract type/gloss from vibhaktiNotes when available.
- **`anuvrtti` tagging regression test**: catches the bug class where agent batches put carry-over insights in `keyFights` text but forget the structured field.
- **Predicate-PPP / predicate-adjective surfacing**: `parsePredicatePPPsFromVibhakti` extracts kṛdanta predicates from vibhaktiNotes when `finiteVerbs: null`. Renders a sage-bordered sub-block with explainer ("English forces 'was X', Sanskrit lets a PPP carry the predicate force directly"). Auto-fires on 2.20 (4 stacked), 2.24 (9 stacked), 1.33 (काङ्क्षितम् + अवस्थिताः).
- **विभूति chain-starter (10.20)**: `implicitVerb: 'अस्मि'` so the chain renders correctly.
- **Section order in VerseDetail**: reading flow first, grammar analysis below.
- **Primer section**: "Verb-displacement patterns" + "Obscure points" reference table covering every gotcha that surfaced.

### Slice B — vocab coverage push ([checkpoints/checkpoint-39.md](../checkpoints/checkpoint-39.md))

- **`src/data/coreVocab.js`**: full pronoun declension tables (यद्, तद्, इदम्, एतद्, किम्, सर्व, अस्मद्, युष्मद्), आत्मन् declension, i-stem masculine + feminine generators (अग्नि, मुनि, ऋषि, शान्ति, बुद्धि, व्यक्ति, मति), 30+ a-stem masculines and neuters (राज्य, ज्ञान, हृदय, कर्म, योग, दुःख, सुख, पाप, पुण्य, मन, काम, लोक, शोक, मोह, पुरुष, धर्म, plus Krishna's epithets and Mahābhārata characters), common kṛdantas, indeclinables.
- **Suffix-pattern fallback** (`inferFromSuffix` in `sharedVocab.js`): ~30 patterns. Verb endings (-न्तु / -न्ताम् / -ध्वम् / -स्व / -ष्यति / -स्यति / -ष्यन्ति / -ष्यसि / -ष्यामि / -ष्यते / -न्ति / -न्ते / -ते / -ति / -मि / -सि / -से / -यते passive), लङ् (`^अ.+न्त$` / `^अ.+त्$` / `^अ.+न्$`), krdantas (-त्वा / -तुम् / -इतव्यम् / -अनीयम् / -इतम् / -इतः / -िताः / -ितान् / -ष्टाः / -ष्टम् / -ष्टः / -न्तौ / -न्तः / -न्तम् / -न् / -य), case endings (-ानाम् / -एभ्यः / -ेभ्यः / -ैः / -ान् / -आभ्याम् / -ाभिः / -एण / -स्य / -स्मात् / -स्मिन् / -आत् / -ः / -म् / -ं), vocative (-हो, -अन्), indeclinable yathā-compounds.
- **Stem-aware glosses**: `withStemGloss(suffix, casePrefix)` strips the suffix → looks up the stem → produces real glosses ("by horses (pl)") instead of templates ("by/with X-s").
- **Locative -े before verb -ते**: priority fix so `युक्ते` resolves as PPP loc sg of √युज्, not as ātmanepada present 3sg.
- **Bare-stem entries** in a-stem builders (`राज्य` resolves alongside `राज्यम्` / `राज्यः`) — fixes hyphenated-compound first-member lookup.
- **Compound prefixes**: महा, सु, दुर्, अति. **Compound first-members**: द्विज, उत्तम, इष्वास, रुधिर, देह, अर्थ, अन्तर, मात्रा, स्पर्श, शीत, उष्ण, आगम, अपायिन्, अनुभाव, दौर्बल्य, क्षेत्र, प्रदिग्ध.
- **Targeted user-flagged words**: विशिष्टाः, यथाभागम्, अभिरक्षन्तु, हर्षम्, विनद्य, दध्मौ, परम, धृष्टद्युम्न and 8 other Mahābhārata characters, हय, युक्त + 5 other PPP stems, हर्ष, पितामह, सिंहनाद, शङ्ख, उच्चैः, प्रतापवान्, आह / आहतुः / आहुः / प्राह / प्राहुः (defective √अह् family), अभ्यहन्यन्त, and ~50 short-stem fillers (पर, भय, सम, जय, लाभ, रस, जन, गत, अगत, कृत, शुभ, …).

End-state: **98.24% pada coverage** across the corpus (8398 padas, 148 still missing — dominated by short sandhi-residue fragments below the inferrer's length threshold).

### Slice C — reference-link wiring + dhatu stubs ([checkpoints/checkpoint-40.md](../checkpoints/checkpoint-40.md))

- **`src/data/referenceLinks.js`**: `getReferenceLink(parsing)` helper routing every category to a target. Noun/adjective → paradigm-class if classifiable else `/atlas/declensions`; pronoun → tad-template anchor else `/atlas/pronouns`; krdanta → kind-aware `/primer#krdanta` (absolutive / infinitive / gerundive / past-passive / present-active); verb → `/verbs/<root>` if dhatu exists else `/primer#lakara` with explicit "(not in top-192 list yet)" notice; particle → `/atlas/avyaya`.
- **WordPopover wiring**: generic reference-link fallback fires when neither paradigm nor pronoun-anchor produced a link. Every word gets one outbound pedagogical link.
- **`Verbs.jsx` getDhatuById** matches by id first, then by devanagari (with/without virama). So `/verbs/ध्मा` resolves correctly.
- **`_dhatus_extra.js` (49 entries)**: auto-generated stubs for every verb root referenced in vocab but missing from the top-192 list. √ध्मा, √जन्, √ब्रू, √चर्, √बन्ध्, √भाष्, √रभ्, √हा, √कथ्, √हृष्, √ईक्ष्, √व्यथ्, √जागृ, √काङ्क्ष्, √भास्, √आस्, √आप्, √आह्, √सू, √विज्, √व्रज् + 28 others. Total dhatu count: 141 → 190.
- **समास derivation heuristic types**: 3+ noun parts → `इतरेतर द्वंद्व (inferred)`; 2 noun parts → `तत्पुरुष? (inferred — best guess)`. Both flagged "(inferred)" to distinguish from authoritative vibhakti-extracted types.
- **लङ् patterns added** to `inferFromSuffix` (`-न्त` ātmanepada/passive 3pl, `-त्` 3sg, `-न्` 3pl). Catches `अभ्यहन्यन्त ← अभि + √हन्`.

### Slice D — UX nav and scroll preservation ([checkpoints/checkpoint-41.md](../checkpoints/checkpoint-41.md))

- **Floating chevron prev/next**: `‹` on left edge, `›` on right edge, both `position: fixed`, vertically centered, 30×30, opacity 0.55 default → 1.0 on hover. Wraps across chapter boundaries.
- **Arrow-key navigation**: window-level keyboard listener, ignores text inputs and modifier-key combos, `e.preventDefault()` so the page doesn't horizontally scroll.
- **Scroll preservation**: `ScrollToTop` in `App.jsx` skips the reset when prev and current pathnames both start with `/journey/`. (The actual fix — first attempt only added `requestAnimationFrame` calls in `VerseJourney`, but `App.jsx`'s ScrollToTop ran AFTER and overrode them.)
- **Compound-popover priority**: when a hyphenated word's parsing is `source: 'suffix-inferred'`, prefer `decomposeCompound`'s per-component popover over the generic suffix-fallback. `परम-इष्वासः` now shows the per-component breakdown instead of the bare "a-stem nominative singular (m)" template.

### Slice E — Origin page + article voice + three-part restructure ([checkpoints/checkpoint-42.md](../checkpoints/checkpoint-42.md))

- **`/origin` Short/Full toggle**: tab-style selector in the header. "Short version" renders a 6-section card with 4 images (Debroy notes ×2, holy-bhagavad-gita grid, Khoomeik chart). "Full essay" renders `article.md` via ReactMarkdown.
- **Article voice rewrite**: removed Claude-as-character framing, removed journalistic flourishes ("नवनीत means butter", "compiled binary, never the source", "most sophisticated formal generative grammars ever written"), removed design-DNA / React + Vite / parchment aesthetic talk, replaced "Two years before any code was written" framing.
- **Sundarkand thread reframed**: from "the same obsession sublimated sideways" to "the longer route that brought me here." Honest framing: the user's 4+ years of Sundarkand reading practice (with the [sundarkand.yadavvi.com](https://sundarkand.yadavvi.com/) reciter app) trained the ear for metre that the अनुष्टुभ work in the Gītā draws on. The Awadhi Meter Visualizer came out of that reading practice. They complete each other; they're not predecessors or parallel-but-separate.
- **Three-part structure** with H1 headers: Part 1 (history — 2006 SSC → Feb 2023 Debroy → Sundarkand → brief mention of bvsiitm + Khoomeik → WhatsApp trigger → four verses → grammar emerged); Part 2 (pedagogy + data in detail — full bvsiitm 5-principles, Quantum Country lineage, Khoomeik coverage curve); Part 3 (the project itself — decision to build, growth arc v1-v13, trust crisis, engine, mission, examples-first).

## Verification

- **Vocab coverage**: 90.2% → 98.24% (8398 padas, 148 still missing — sandhi-residue fragments).
- **Tests**: 494 → 580 passing across 40 test files (added regression tests for anuvrtti tagging, predicate-PPP extraction, suffix patterns, reference links, splitter bugs).
- **Build**: clean at every commit boundary.
- **Per-verse smoke tests**: 1.7 (द्विज-उत्तम), 1.11 (यथाभागम्, अभिरक्षन्तु), 1.12 (हर्षम्, विनद्य, दध्मौ + 8 other words), 1.33 (predicate-PPPs काङ्क्षितम् + अवस्थिताः), 2.4 (परम-इष्वासः popover), 2.20 (4 stacked predicate adjectives + 4 finite verbs), 2.24 (9 stacked predicate adjectives), 2.46 (सम्प्लुत-उदके samas), 3.42 (पराण्याहुः sandhi split), 4.37 (कुरुते), 9.6 (उपधारय), 10.20 (विभूति chain-starter), 10.21+ (अस्मि), 10.42 (विष्टभ्याहमिदं split), 15.9 (उपसेवते), 18.3 (प्राहुर्मनीषिणः), 18.40 (स्यात्त्रिभिर्गुणैः).

## Out of scope (still deferred)

- **Splitter coverage on yan-chain + visarga-r combined sandhi** (e.g., the deeper splits inside `मरीचिर्मरुताम्` → `मरीचिः + मरुताम्`). Vocab-direct on the full blob covers these for क्रिया-card purposes; full padaccheda decomposition needs more sandhi rules.
- **Implicit-virama drop in continuous writing for -त् + consonant** (`भस्मसात्कुरुते` stays a blob; the `-त् + क` boundary in writing convention isn't yet a sandhi rule).
- **240 still-missing padas** are short sandhi-residue fragments below the suffix-inferrer's 2-char minimum. These need splitter fixes, not vocab additions.
- **Detailed type tagging on derived `samasNotes`**: heuristic gives `(inferred)` types for 3+ noun and 2-noun cases; specific cases (षष्ठी तत्पुरुष vs तृतीया तत्पुरुष vs कर्मधारय) still need vibhakti annotation.
- **Hand-decoded chapter overrides for Ch 3-9 and Ch 11-18** beyond what the suffix-fallback + samas-derivation already produce.

## Relation to other plans

- Builds on [v13](v13-corpus-scale.md)'s 701-verse bulk import — closes the audit gaps that surfaced once the bulk corpus was actually walked.
- Continues the [v9](v9-decode-helper.md) decode-engine work and [v10](v10-reference-and-expansion.md) declension-paradigm work.
- The article + Origin rewrite (Slice E) extends the [`v0` foundation document](v0-foundation.md) story-telling into a public-facing form.
