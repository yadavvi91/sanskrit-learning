# Plan v3 — Sanskrit Grammar Atlas

> The third leg of the Sanskrit learning project. [v1 app](v1-app.md) teaches **nouns** + **decode pipeline**. [v2 verb sub-app](v2-verb-system.md) teaches **verbs**. This Grammar Atlas covers **everything else**: pronouns, compounds (समास), verbal prefixes (उपसर्ग), case-roles (कारक), indeclinables (अव्यय), adjectives/adverbs, negation, numbers, discourse patterns. Source spec: `CLAUDE3.md`.

## Context

The user's vision is *one place* for the whole of Sanskrit needed to read the Gita. Three apps living under one shell:

| App | What it teaches |
|---|---|
| Parent (v1, shipping) | Noun system (8 × 3 × 3) + decode pipeline + verses + patterns won |
| Verb sub-app (planned) | 5-layer verb stack + 192 dhātus + conjugation engine |
| **Grammar Atlas (this plan)** | All remaining grammar surfaces beyond noun + verb |

CLAUDE3.md surfaces a non-obvious finding: most "missing" parts of Sanskrit grammar (articles, prepositions, most adverbs) are **already handled by systems the user knows** — case endings replace prepositions, demonstratives replace articles, frozen-case nouns replace adverbs. The genuinely new categories are **समास, उपसर्ग, अव्यय, सर्वनाम-pattern declension, कारक.** Those are this plan's real content.

**Architectural framing (non-negotiable):** the Grammar Atlas is *not* one tightly-scoped sub-app. It is a **family of reference pages + one substantive sub-app (समास)**. Reference pages should feel like opened pages of a single grammar codex — sidebar nav, cross-links, shared aesthetic. The compound analyzer is the only standalone-feeling piece, and it lives inside the same shell.

## Scope at a glance

| # | Topic | Treatment | Engineering effort | Priority |
|---|---|---|---|---|
| 1 | **Pronouns (सर्वनाम)** | Reference section: 2 personal-pronoun tables + तद्-template + 6 transfer mini-tables + correlatives page | Medium (data-heavy, simple UI) | **High — blocks Gita reading** |
| 2 | Adjectives + Adverbs | One reference page (rides on noun system) + small comparison-suffix drill widget | Low | Low |
| 3 | **समास (Compounds)** | **Standalone sub-app**: parser + classifier + Gita corpus + drill | **High — biggest real gap** | **High** |
| 4 | उपसर्ग (verbal prefixes) | Reference table + parser hook *inside the verb sub-app*, not here | Low (table) + Medium (parser integration) | High — verb sub-app blocked without it |
| 5 | कारक (semantic case-roles) | One reference page + "passive recognition" sidebar widget | Low | Medium |
| 6 | अव्यय (indeclinables) + postpositions + particles | Reference page + auto-grown Gita-specific frequency list | Medium (auto-grow scanner) | Medium |
| 7 | Negation | Paragraph in compound sub-app (नञ्-समास) + paragraph in particles ref | Trivial | Low |
| 8 | Numbers (संख्या) | One table | Trivial | Skip until needed |
| 9 | Discourse patterns | Short reference page; अनुष्टुभ् visualization links to Awadhi visualizer code | Low (ref) + High (meter port — defer) | Low |

## Decisions locked (from CLAUDE3.md)

| Decision | Rationale |
|---|---|
| **Atlas = reference pages + 1 sub-app**, not many sub-apps | Most topics ride on systems already taught. Only समास warrants standalone engineering. |
| **समास is the biggest real gap** | The Gita is saturated with compounds; visual annotations exist on 4 verses but no pedagogical surface for them. |
| **उपसर्ग lives inside the verb sub-app** | A verbal prefix is a verb's prefix. प्रतियोत्स्यामि must decompose to प्रति + √युध् + लृट् in one place. |
| **Decode pipeline gets a new step: विग्रह** | Today: पदच्छेद → अन्वय → translation. After Atlas: पदच्छेद → **विग्रह** → अन्वय → translation. The compound-splitting step belongs explicitly in the pipeline. |
| **Atlas = parchment codex aesthetic** | Inherits parent palette + fonts. Sidebar TOC. Cross-links between concepts. |
| **Auto-grown corpora over hand-curated lists** | The Gita-specific particle frequency list and the compound bank should *grow as verses are decoded*, scanned from `verses.js`. Less drift, fewer dead lists. |

## The सिद्धान्त (the "guiding theorem") this plan teaches

Every Sanskrit word is one of three Pāṇinian things:

1. **सुबन्त** — ends in a case ending → declinable (nouns, pronouns, adjectives)
2. **तिङन्त** — ends in a verbal ending → conjugable (finite verbs)
3. **अव्यय** — ends in nothing that changes → indeclinable (particles, postpositions, most adverbs, conjunctions)

The Atlas's most important conceptual page is the one that makes this taxonomy click. Once a learner sees that English's ~8 word classes collapse into 3 because case-endings + agreement do the work English distributes across articles, prepositions, and auxiliaries, *all the "missing pieces" stop feeling missing*.

---

## Phase 1 — Pronouns Reference

**Why first:** Pronouns are the largest genuinely-new system in the Atlas, and the Gita's correlative structure (यद्...तद्) is half of Krishna's teachings. Without pronouns the user is blocked on most non-trivial verses.

### Two distinct sub-systems

**1A. Personal pronouns** (अस्मद्, युष्मद्) — pure memorization. Suppletive (अहम् / माम् / मया share no visible root). 7 cases × 3 numbers = 21 cells per pronoun. **No gender.** Includes enclitic alternates (मा, मे, नौ, नः, ते, वः) — short unaccented forms with positional restrictions (cannot begin a sentence, cannot follow च / वा / ह / अह / एव).

**1B. सर्वनाम pronouns** (तद्-template). तद् is the master template; once memorized, यद् / किम् / सर्व / अन्य / एक / एतद् all follow with prefix swaps. Critical deviation from the राम table: four **स्म-cells** in masculine/neuter singular:

| Case | राम-pattern | तद्-pattern (m/n sg) |
|---|---|---|
| चतुर्थी | -आय | **-स्मै** (तस्मै) |
| पञ्चमी | -आत् | **-स्मात्** (तस्मात्) |
| सप्तमी | -ए | **-स्मिन्** (तस्मिन्) |
| प्रथमा pl | -आः | **-ए** (ते) |

Plus suppletive nominatives: **सः / सा / तत्**. Outliers (recognition-only): **इदम्** (proximate) and **अदस्** (remote).

**1C. Correlative pairs** — the structural backbone of Sanskrit philosophical prose:

| Pair | Sense |
|---|---|
| यद् … तद् | who/which … that one |
| यदा … तदा | when … then |
| यत्र … तत्र | where … there |
| यथा … तथा | as … so |
| यावत् … तावत् | as long as … so long |
| यदि … तर्हि / तदा | if … then |

Both pronouns agree in gender/number with their respective nouns; cases are independent.

**1D. Reflexive** — स्व (declines like सर्व) and आत्मन् (n-stem; doubles as reflexive *and* philosophical Self — Gita exploits this ambiguity, e.g., आत्मना आत्मानम् उद्धरेत् 6.5).

### Files (Phase 1)

| File | Purpose |
|---|---|
| `src/data/pronouns.js` | Tables for अस्मद्, युष्मद्, तद् (master), यद्/किम्/सर्व/अन्य/एक/एतद् (transfer), इदम्, अदस् (outliers), correlative pairs, reflexives |
| `src/components/Pronouns.jsx` | Renders all tables with स्म-cells highlighted; correlatives section with worked Gita examples (link back to Verse Journey) |
| `src/components/PronounTable.jsx` | Reusable 7×3 grid renderer (cases × vacanas), optional gender column for तद्-pattern |
| `src/data/glossary.js` (new) | Atlas-wide glossary; pronoun terms (सर्वनाम, स्म-cells, suppletive, enclitic) added in this phase, extended in later phases |

### View design (Phase 1)

- **Header**: तद्-template card on top, with स्म-cells visually flagged (gold border around the four cells).
- **"Free" pronouns row**: 6 transfer pronouns rendered as compact 3-column grids — same visual shape as तद्, prefixes swapped. The point: *one template, six free pronouns*.
- **Personal pronoun row**: अस्मद् + युष्मद् side-by-side. Enclitic alternates in a smaller secondary cell within each suppletive cell.
- **Outliers row**: इदम् and अदस् rendered separately, labeled "Recognition-only".
- **Correlatives section**: each pair as a worked example with a Gita verse reference where applicable.
- **Reflexive section**: short paragraph + आत्मन् table.

### Verification (Phase 1)

- All 21 cells of अस्मद् match Whitney/Apte references.
- स्म-cells highlighted on तद् and propagate visually to transfer pronouns.
- Click a Gita reference in correlatives → switches to Verse Journey, opens the cited verse.
- `npm run build` clean; no console errors.

---

## Phase 2 — उपसर्ग layer (lives inside verb sub-app)

**Why this lives in the verb sub-app, not the Atlas:** a verbal prefix is a verb's prefix. The verb sub-app's parser must recognize प्रतियोत्स्यामि → प्रति + √युध् + लृट् + उत्तम एक. Splitting that across two apps would be incoherent.

**This phase is therefore a pointer, not a build target inside the Atlas.** It is listed here only because CLAUDE3.md groups it with "everything else." The actual implementation belongs in `plans/v2-verb-system.md`.

### What needs to land in the verb sub-app

1. **Reference table**: 22 traditional उपसर्ग entries — prefix, sense(s), 2–3 high-frequency dhātu compounds, Gita examples where available.
2. **Parser layer**: incoming verb form → strip उपसर्ग → identify bare dhātu → look up paradigm.
3. **Display layer**: Dhātu Detail page shows a "Common उपसर्ग compounds" section listing productive prefixed forms (अभि-युध्, सम्-युध्, प्रति-युध्) with Gita occurrences.

### Already-met उपसर्गs in decoded verses

- **उद्** in उत्तिष्ठ (2.3) — "rise up"
- **उप** in उपपद्यते (2.3) — "be fitting"
- **प्रति** in प्रतियोत्स्यामि (2.4) — "fight against"
- **सम् + अव** in समवेताः (1.1) — "having gathered together"

### Action item for the verb-system plan

Add a "उपसर्ग parser + reference table" sub-section to `plans/v2-verb-system.md` Phase 1b. Document the 22-prefix table format. Wire the parser as a pre-processing step before dhātu lookup.

---

## Phase 3 — समास Compound Sub-App (the biggest engineering piece)

**Why this is its own sub-app:** the same compound can mean entirely different things depending on type. **पीताम्बरः** as **तत्पुरुष** = "yellow garment". **पीताम्बरः** as **बहुव्रीहि** = "the one wearing a yellow garment" = Krishna. The decode pipeline today does पदच्छेद → अन्वय; it must become **पदच्छेद → विग्रह → अन्वय**, with विग्रह handled by this sub-app.

### The six classical types

| Type | Logic | Example | Internal relation |
|---|---|---|---|
| तत्पुरुष | Case-determined | राजपुत्रः | "king's son" (षष्ठी inside) |
| कर्मधारय | Adj + noun, same case | नीलोत्पलम् | "blue lotus" |
| द्वन्द्व | List, "X and Y" | रामलक्ष्मणौ | "Rāma and Lakṣmaṇa" |
| बहुव्रीहि | Possessive (whole compound qualifies an external noun) | पीताम्बरः | "[the one] wearing yellow garments" |
| अव्ययीभाव | Adverbial (whole compound is indeclinable) | यथाशक्ति | "according to ability" |
| द्विगु | Numerical (count + thing) | पञ्चवटी | "group of five trees" |

### Sub-types worth tracking

- **तत्पुरुष** subdivides by case: षष्ठी तत्पुरुष (most common), तृतीया तत्पुरुष (रुधिरप्रदिग्ध — already in 2.5), चतुर्थी, etc.
- **उपपद तत्पुरुष**: noun + verbal action ending (मधुसूदन = "Madhu-slayer", अरिसूदन = "enemy-slayer", परन्तप = "enemy-scorcher")
- **द्वन्द्व** subdivides into इतरेतर (separately enumerable, takes plural) vs. समाहार (collective, takes singular neuter)
- **नञ्-समास** (negation): अ-/अन्- prefix → अधर्म, अहिंसा, अनासक्ति, अकर्म. The Gita is saturated with these; covered also under Phase 7 (Negation).

### Data model (`src/data/samasa.js`)

```ts
type SamasType =
  | 'tatpurusha-genitive'    // षष्ठी तत्पुरुष
  | 'tatpurusha-instrumental'// तृतीया तत्पुरुष
  | 'tatpurusha-accusative'  // द्वितीया तत्पुरुष
  | 'tatpurusha-dative'      // चतुर्थी तत्पुरुष
  | 'tatpurusha-ablative'    // पञ्चमी तत्पुरुष
  | 'tatpurusha-locative'    // सप्तमी तत्पुरुष
  | 'tatpurusha-upapada'     // उपपद तत्पुरुष
  | 'karmadharaya'           // कर्मधारय
  | 'dvigu'                  // द्विगु
  | 'dvandva-itaretara'      // इतरेतर द्वन्द्व
  | 'dvandva-samahara'       // समाहार द्वन्द्व
  | 'bahuvrihi'              // बहुव्रीहि
  | 'avyayibhava'            // अव्ययीभाव
  | 'nan-samasa';            // नञ्-समास

interface Samasa {
  id: string;                       // 'dharma-kshetra'
  compound: string;                 // 'धर्मक्षेत्रे'
  vigraha: string;                  // 'धर्मस्य क्षेत्रम्'
  type: SamasType;
  components: string[];             // ['धर्म', 'क्षेत्र']
  gloss: string;                    // 'field of dharma'
  gitaOccurrences: VerseRef[];      // [{ chapter:1, verse:1 }]
  notes?: string;                   // edge cases, "boundary judgement" entries
}
```

The 10 samas already annotated on 4 verses (committed in `3140c85`) are the seed corpus. Migrate from `verse.samasNotes[]` to `src/data/samasa.js`, leaving `samasNotes` on verses as a *projection* into the verse-detail UI.

### Sub-app views

#### View 1 — Compound Bank

Searchable, type-filterable list of every compound in the decoded corpus. Auto-grown: a build-time script scans `verses.js → samasNotes[]` and feeds the bank. Each row: compound · विग्रह · type-pill · gloss · "as seen in Gītā 1.1".

#### View 2 — विग्रह Detail

For one compound: components broken out, type explained ("a षष्ठी तत्पुरुष takes the genitive of its left member implicitly"), Gita occurrences with click-through to Verse Journey. Sister-compounds (same type) shown for transfer.

#### View 3 — Type Identifier (drill)

Show compound + विग्रह → user picks the type from 6+sub-type chips. Track accuracy per type. Re-surfaces weak types (most users mis-identify बहुव्रीहि as तत्पुरुष — flag this in feedback).

#### View 4 — "Build a compound"

Pick two words + a type → app constructs the compound, naming the rules applied. Sandhi-aware *eventually* (sandhi is project-wide deferred; phase 4 of this sub-app once parent project unblocks sandhi).

### Files (Phase 3)

| File | Purpose |
|---|---|
| `src/data/samasa.js` | Migrated + extended compound corpus |
| `src/data/samasaTypes.js` | Type metadata: name, विग्रह pattern, classification rule, examples |
| `src/components/Samasa.jsx` | Sub-app shell: tabs for the 4 views |
| `src/components/CompoundBank.jsx` | View 1 |
| `src/components/VigrahaDetail.jsx` | View 2 |
| `src/components/SamasaIdentifier.jsx` | View 3 (drill) |
| `src/components/SamasaBuilder.jsx` | View 4 |
| `src/utils/samasaScanner.js` | Build-time: scan verses, project to bank |

### Decode-pipeline integration

Modify `src/components/VerseDetail.jsx`: rename the existing "समास" `<details>` block to **विग्रह**, position it explicitly between पदच्छेद and क्रिया as *its own pipeline step*. Each row in विग्रह links to the compound's VigrahaDetail page in the sub-app.

### Verification (Phase 3)

- All 10 already-annotated compounds present in the bank.
- Type filter works: filter to बहुव्रीहि → see महानुभावान् from 2.5 only.
- Drill mode: prompt with धर्मक्षेत्रे + विग्रह "धर्मस्य क्षेत्रम्" → user picks "षष्ठी तत्पुरुष" → success counted.
- Click "as seen in Gītā 2.5" on रुधिरप्रदिग्धान् → switches to Verse Journey, opens 2.5.
- `npm run build` clean.

---

## Phase 4 — कारक overlay + passive sidebar

**Why this is small but important:** **कारक is not new memorization** — it's a conceptual upgrade. विभक्ति = morphological case (the ending). कारक = semantic role in the action. Pāṇini built the whole grammar around कारक, not विभक्ति.

The fix this delivers: passive constructions stop looking broken. **रामेण रावणः हतः** — रामेण is *तृतीया* but कर्ता; रावणः is *प्रथमा* but कर्म. The endings swap, the roles don't. The Gita uses passive constantly (especially for fate, divine action, philosophical impersonals).

### The 6 कारक

| कारक | Role | Default विभक्ति (active) | Default विभक्ति (passive) |
|---|---|---|---|
| कर्ता | agent | प्रथमा | तृतीया |
| कर्म | patient | द्वितीया | प्रथमा |
| करण | instrument | तृतीया | तृतीया |
| सम्प्रदान | recipient | चतुर्थी | चतुर्थी |
| अपादान | source | पञ्चमी | पञ्चमी |
| अधिकरण | location | सप्तमी | सप्तमी |

### Files (Phase 4)

| File | Purpose |
|---|---|
| `src/data/karaka.js` | The 6 कारक definitions + active-vs-passive विभक्ति mappings + Gita examples |
| `src/components/Karaka.jsx` | One-page reference: table + worked example + passive-recognition mini-widget |

### Passive recognition widget

User pastes a sentence-like fragment with a -त (PPP) or -य (passive stem) verb-form → widget identifies which word is the कर्म-in-प्रथमा and which is the कर्ता-in-तृतीया. Small, but high-yield.

### Verification (Phase 4)

- Karaka page renders the 6×2 table cleanly.
- Passive widget on हनुमान् रामेण प्रेरितः → identifies हनुमान् as कर्म and रामेण as कर्ता.

---

## Phase 5 — अव्यय (indeclinables): postpositions + particles

**Why this matters:** the Gita is saturated with the small-but-frequent particles च, हि, तु, एव, अपि, इति. Each carries pragmatic weight (हि = "indeed/because", तु = "but", एव = "exactly/only"). Missing these flattens the verse.

### Three sub-categories

**5A. Postpositions** — ~15–20 indeclinables that follow a noun and govern a specific case. Look prepositional, behave like Hindi *के साथ*. Closed list:

| Word | Sense | Case |
|---|---|---|
| सह / साकम् / सार्धम् | with | तृतीया |
| विना | without | द्वितीया / तृतीया |
| उपरि | above | षष्ठी |
| अधः | below | षष्ठी |
| अन्तः | inside | षष्ठी |
| बहिः | outside | पञ्चमी |
| अग्रतः / पुरतः | in front of | षष्ठी |
| पृष्ठतः | behind | षष्ठी |
| समीपे | near | षष्ठी |

**5B. Particles** — ~60–80 indeclinables that "flavor" sentences:

- **High-frequency Gita particles**: च, हि, तु, एव, अपि, इति, खलु, नूनम्
- **Interrogatives**: कथम्, कुत्र, कस्मात्, किम्
- **Connectives**: अथ, अथापि, किन्तु, परन्तु, तथापि
- **Time/place deictics**: अद्य, श्वः, ह्यः, इदानीम्, इह, अत्र, तत्र
- **Affirmation/negation**: न, मा, खलु, नूनम्

**5C. Articles + prepositions** — *deliberately negative space*. The reference page must explicitly say: **articles don't exist** (definiteness via demonstratives or inferred); **prepositions don't exist as a word class** (case endings + postpositions do their work). This is the page that makes the Pāṇinian three-bin taxonomy click.

### Auto-grown Gita-specific list

A build-time scanner walks every verse's पदच्छेद and emits a frequency-ranked list of particles/postpositions actually seen in the decoded corpus. As more verses are decoded, the list grows. This is the *useful* output, distinct from the canonical reference table.

### Files (Phase 5)

| File | Purpose |
|---|---|
| `src/data/avyaya.js` | Static reference: postpositions table, particles by sub-category, taxonomy explainer |
| `src/utils/avyayaScanner.js` | Build-time: walk `verses.js` → `padaccheda[]`, match against avyaya inventory, count occurrences |
| `src/components/Avyaya.jsx` | Reference page: taxonomy + postpositions + particles + auto-grown frequency sidebar |

### Verification (Phase 5)

- Particle frequency sidebar shows च, इति, हि, मा, अपि (or whatever appears) ordered by count from the 4 currently-decoded verses.
- Click a particle → see all verses where it appears.

---

## Phase 6 — Adjectives + Adverbs

**Why this is small:** both ride on systems already in place.

### Adjectives

No separate declension. Adjective stems decline using the same noun tables and **agree with the noun** in विभक्ति + वचन + लिंग (विशेषण-विशेष्य). The user has already drilled this on Gita 1.1 (समवेताः युयुत्सवः) and 2.5 (महानुभावान् गुरून्). New material:

- **Comparison suffixes**: -तर (comparative), -तम (superlative). Plus ~10 irregular pairs (श्रेष्ठ, ज्यायस्, कनिष्ठ).
- **Pronominal adjectives** (सर्व, अन्य, एक) follow सर्वनाम pattern with स्म-cells, *not* राम pattern. Already handled by Phase 1 transfer table.

### Adverbs

Mostly **frozen case forms** of adjectives:

- **Neuter accusative singular** → adverb of manner: शीघ्रम् ("quickly"), सत्यम् ("truly"), क्षिप्रम् ("rapidly")
- **Instrumental** → manner/means: सुखेन ("with ease"), बलात् ("by force")
- **Locative** → time/place: प्रातः ("in the morning")
- **-तस् suffix** ("from / -ly"): मूलतः, सर्वतः, शास्त्रतः

### Files (Phase 6)

| File | Purpose |
|---|---|
| `src/data/adjectivesAdverbs.js` | Comparison suffix rules + irregular pairs + adverb-formation patterns |
| `src/components/AdjectivesAdverbs.jsx` | One reference page; small comparison drill (adjective → -तर / -तम form) |

---

## Phase 7 — Negation, Numbers, Discourse (defer or short reference)

### Negation

Three mechanisms, all small:

1. **न** — general negation, indeclinable particle.
2. **मा** — prohibitive, used with लोट् or लुङ् (rare). Already met in Gita 2.3: मा स्म गमः.
3. **नञ्-समास** — negation as a compound prefix: **अ-** before consonants (अधर्म, अहिंसा, अनासक्ति), **अन्-** before vowels (अनार्य, अनवद्य). Massive yield in Gita context.

**Lives:** one paragraph in compound sub-app (नञ्-समास) + one paragraph in particles ref (न, मा).

### Numbers (संख्या)

एक, द्वि, त्रि, चतुर् decline irregularly with gender. पञ्चन्–नवन् easier. Then दश, शत, सहस्र.

**Lives:** one reference table in `src/data/numbers.js`. Skip building a UI until needed.

### Discourse patterns

- **उवाच / अब्रवीत् + direct quotation closed by इति** — every Gita chapter break uses this.
- **एवम् उक्तः** ("thus addressed") — frozen formula.
- **Speaker tags**: धृतराष्ट्र उवाच, सञ्जय उवाच, अर्जुन उवाच, श्रीभगवानुवाच.
- **अनुष्टुभ् structure** — 32 syllables, 4 pādas of 8, syntactic break usually after pāda 2.

**Lives:** short reference page. **The अनुष्टुभ् visualization is a v2 cross-app feature** that ports the Awadhi Meter Visualizer's laghu/guru machinery to Sanskrit. Defer until verb sub-app and pronoun reference both ship.

---

## Cross-cutting concerns

### Decode pipeline upgrade

Today: **पदच्छेद → अन्वय → हिंदी → English**.

After Atlas Phase 3: **पदच्छेद → विग्रह → अन्वय → हिंदी → English**.

The विग्रह step gets its own section in `VerseDetail.jsx`, sandwiched between पदच्छेद and क्रिया. The existing collapsible `samasNotes` block becomes the rendering for this new pipeline step (renamed appropriately). Cross-links from each compound row → VigrahaDetail page in the समास sub-app.

### Atlas navigation

A unified Atlas shell with sidebar TOC:

```
Pronouns
  ├─ Personal (अस्मद् / युष्मद्)
  ├─ तद्-template + free pronouns
  ├─ Outliers (इदम् / अदस्)
  └─ Correlatives + Reflexives
समास (sub-app)
  ├─ Compound Bank
  ├─ विग्रह Detail
  ├─ Type Identifier (drill)
  └─ Build a Compound
कारक
अव्यय (postpositions + particles)
Adjectives + Adverbs
Numbers (sparse)
Discourse patterns
```

The Atlas occupies one top-level tab in the masthead alongside Verse Journey, Patterns Won, (eventual) Verbs.

### Cross-linking taxonomy

Every Gita reference in the Atlas is a click-through to Verse Journey. Every Atlas concept name in Verse Detail and Patterns Won (पदच्छेद, अन्वय, विभक्ति, लकार, कृदन्त, समास, कारक, अव्यय) is a `<Glossary>` trigger that opens the matching Atlas page. The glossary popover infrastructure is also specified in `plans/v4-primer.md` — whichever plan ships first owns the component; the other reuses it.

### Auto-grown corpora

Two such corpora across the Atlas:

1. **Compound bank** — scanned from `verse.samasNotes[]` at build time → `src/data/samasa.js` (samasa records keyed by compound id, gita refs as projection).
2. **Particle frequency list** — scanned from `verse.padaccheda[]` at build time, matched against the `avyaya.js` inventory.

Both auto-grow as verses are decoded. No manual list-tending required.

---

## Build order (locked)

1. **Phase 1: Pronouns Reference** — fastest win, unblocks Gita reading.
2. **Phase 4: कारक page** — small, conceptual, slots in cleanly. *Promoted ahead of समास because it's cheap and unblocks passive Gita verses.*
3. **Phase 3: समास Sub-App** — biggest engineering, but needs the existing seed corpus + Phase 4's कारक vocabulary in some places (तत्पुरुष types echo कारक roles).
4. **Phase 5: अव्यय reference + auto-grown particle list** — leverages the same scanner infrastructure as Phase 3.
5. **Phase 6: Adjectives + Adverbs** — last reference page; mostly already known.
6. **Phase 7: Negation + Numbers + Discourse** — defer or short reference only.
7. **Phase 2: उपसर्ग** — handed off to the verb sub-app's own plan; not built here.

The verb sub-app (`plans/v2-verb-system.md`) and this Atlas can be built in parallel after Phase 1 lands. They have one cross-cutting integration: उपसर्ग parsing must precede dhātu lookup in the verb sub-app, but Atlas Phase 1 (Pronouns) does not depend on the verb sub-app.

---

## Verification matrix

| Phase | Smoke test |
|---|---|
| 1 (Pronouns) | All 21 cells of अस्मद् match Whitney; स्म-cells highlighted on तद्; correlative click → Verse Journey opens cited verse |
| 4 (कारक) | 6×2 table renders; passive widget identifies कर्ता / कर्म from a -त PPP sentence |
| 3 (समास) | 10 seed compounds in bank; type filter works; drill scores correctly; विग्रह step appears in VerseDetail |
| 5 (अव्यय) | Auto-grown particle list shows correct counts from 4 decoded verses |
| 6 (Adj/Adv) | Comparison drill: रम्य → रम्यतर → रम्यतम |

---

## Critical files: modification summary

**Existing files (modified):**
- `src/App.jsx` — Add **Atlas** tab to masthead view switcher.
- `src/components/VerseDetail.jsx` — Rename समास block to **विग्रह**; cross-link compound rows to Atlas Phase 3.
- `src/styles.css` — Add Atlas codex styles (sidebar TOC, table grid, drill widget) sharing the parchment palette.
- `src/data/verses.js` — `samasNotes[]` becomes the read-only seed for the build-time scanner; eventually rename to `vigraha[]` to align with the renamed pipeline step.

**New top-level files:**
- `src/components/Atlas.jsx` — Atlas shell + sidebar TOC routing
- `src/data/glossary.js` — Atlas-wide glossary (extended progressively across phases)

**New per-phase files:**
- Phase 1: `pronouns.js`, `Pronouns.jsx`, `PronounTable.jsx`
- Phase 3: `samasa.js`, `samasaTypes.js`, `Samasa.jsx`, `CompoundBank.jsx`, `VigrahaDetail.jsx`, `SamasaIdentifier.jsx`, `SamasaBuilder.jsx`, `samasaScanner.js`
- Phase 4: `karaka.js`, `Karaka.jsx`
- Phase 5: `avyaya.js`, `avyayaScanner.js`, `Avyaya.jsx`
- Phase 6: `adjectivesAdverbs.js`, `AdjectivesAdverbs.jsx`
- Phase 7: `numbers.js`, `discoursePatterns.js` (data only; no UI until needed)

---

## Design

Inherits parent project + verb sub-app:

- Parchment `#faf4e8`, ink `#1c1008`, gold `#b5770d`, saffron `#c17f24`, sage `#4a5e4a`
- Noto Serif Devanagari (Sanskrit), Cormorant Garamond (prose), Cinzel (labels)
- **Atlas-specific:** sidebar TOC navigation between topics; shared grid-table styling for declension paradigms; the समास sub-app is the only standalone-feeling piece — gets a slightly more saturated gold accent within the family aesthetic.
- स्म-cells in तद्-pattern: gold border + subtle background fill. The visual signal "this cell deviates from राम pattern" must be unmistakable.

---

## Out of scope

- सन्धि rules — still deferred project-wide.
- Vedic forms — out of scope project-wide.
- Causatives, desideratives, intensives, denominatives — verb sub-app v2 territory.
- Non-Gita compound corpora — focus is Gita first; expand later.
- अनुष्टुभ् visualizer port from Awadhi project — defer until after verb sub-app + pronouns ship.
- Detailed prosody beyond अनुष्टुभ् — separate concern.
- Audio pronunciation of paradigms.
- Localization of jargon explanations into Marathi or other Indian languages.

---

## Relation to other plans

| Plan | Relationship |
|---|---|
| `plans/v2-verb-system.md` | Atlas Phase 2 (उपसर्ग) lives there, not here. Verb sub-app and Atlas otherwise independent. |
| `plans/v4-primer.md` | Atlas glossary popovers should reuse the `<Glossary>` component the Primer plan specifies. The Primer's "what is समास?" callout deep-links into Atlas Phase 3. |
| `plans/v5-practice-mode.md` | Atlas drill modes (समास type identifier, comparison-suffix drill, kāraka recognition) seed the SRS engine via the existing card-type schema. |
| Parent app (v1, shipping) | Decode pipeline gains a विग्रह step. `samasNotes[]` becomes the seed corpus for the compound bank. Patterns Won gets new entries as Atlas concepts land (one pattern per कारक, one per major समास type, etc.). |

---

## Open questions / boundary judgements

Items that may need a decision before or during implementation:

1. **तद्-pattern across genders** — should the master table show m/f/n side-by-side (heavy) or default to masculine with a gender-switcher (lighter)? Recommended: switcher.
2. **उपपद तत्पुरुष as standalone type or substring of तत्पुरुष** — already used in seed corpus as standalone (मधुसूदन). Keep as standalone.
3. **द्वन्द्व compounded with बहुव्रीहि** — surfaced in 2.5 with अर्थकामान् (committed call: इतरेतर द्वन्द्व + adjectival use, not "बहुव्रीहि of a द्वन्द्व"). Document the precedent in `samasaTypes.js` notes.
4. **Glossary popover ownership** — Atlas needs it for cross-linking; Primer (v2) also needs it. Build it once, owned by whichever plan ships first.
5. **Scanner output: build-time vs. runtime** — recommended build-time (Vite plugin or pre-build script) for stable bundle output. Runtime scan would force every page-load to re-scan.

These are flagged here so they don't get re-discovered mid-build.
