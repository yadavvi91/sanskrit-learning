# CLAUDE3.md — Sanskrit Grammar Atlas

## Read this first

This is the **third** spec in the Sanskrit Gita learning project, after:

1. **Parent `CLAUDE.md`** — backstory, noun system, decode pipeline, design language, the four Gita verses already fought through
2. **Verb sub-app `CLAUDE.md`** — 5-layer verb stack, 192 dhātus, गण/लकार/पद, conjugation engine

This third file covers **everything else** in classical Sanskrit grammar — the topics a learner from English/Hindi expects to find under standard headings (pronouns, adjectives, adverbs, prepositions, compounds, particles) but which Sanskrit organizes very differently. **Read both prior CLAUDE.md files first.**

The framing is **Grammar Atlas**, not a single tightly-scoped sub-app. Some topics here deserve their own React sub-app (समास, definitely); others are reference pages; others are conceptual layers that retrofit understanding into systems already covered. The build order section disentangles this.

---

## How this spec got written

A long conversation walked Vishal through, in order:

1. Adjectives + adverbs — and the discovery that they ride on the noun system, not new
2. Pronouns — personal (suppletive, hard) and सर्वनाम (तद्-template, easier than it looks)
3. The "what's missing?" audit — समास, कारक, numbers, particles, discourse patterns
4. Prepositions and articles — and the discovery that Sanskrit doesn't have them as word classes; उपसर्ग and case endings do their work
5. The declinable / indeclinable conceptual frame (अव्यय vs सुप्/तिङ्), with English parallels

The conversation surfaced that most "missing" parts of Sanskrit grammar are **already handled by systems Vishal knows** — case endings replace prepositions, demonstratives replace articles, frozen-case nouns replace adverbs. The genuinely new categories are: **समास, उपसर्ग, अव्यय, सर्वनाम-pattern declension, कारक.** Those are this spec's real content.

---

## Topic 1: Pronouns (सर्वनाम)

The largest genuinely-new system in this file. Two distinct sub-systems:

### 1A. Personal pronouns — pure memorization

अस्मद् (I/we) and युष्मद् (you). **No gender.** Suppletive — different stems per case (अहम् / माम् / मया / मम share no visible root). You memorize, you don't generate.

Each table: 7 cases × 3 numbers = 21 cells, with **enclitic alternates** in some cells (मा, मे, नौ, नः, ते, वः) — unaccented short forms that can't begin a sentence and can't follow च / वा / ह / अह / एव.

Full tables in conversation transcript; not duplicated here. **Render as two side-by-side reference cards** in the app.

### 1B. सर्वनाम pronouns — तद् as master template

तद् (he/she/it/that) is the template. Once memorized, यद् (relative), किम् (interrogative), सर्व (all), अन्य (other), एक (one), एतद् (this) all follow it with prefix swaps.

The signature deviation from राम-pattern: four **स्म-cells** in masculine/neuter singular:

| Case | राम-pattern | तद्-pattern |
|---|---|---|
| चतुर्थी sg. | -आय | **-स्मै** (तस्मै) |
| पञ्चमी sg. | -आत् | **-स्मात्** (तस्मात्) |
| सप्तमी sg. | -ए | **-स्मिन्** (तस्मिन्) |
| प्रथमा pl. | -आः | **-ए** (ते) |

Plus suppletive nominatives: **सः** (m. sg.), **सा** (f. sg.), **तत्** (n. sg.).

**Outliers (full tables, recognition-mode only):** इदम् (this, proximate — अयम्/इयम्/इदम् → अनेन/अस्मै/अस्मिन्); अदस् (that, remote — असौ/अमुम्/अमुना).

### 1C. Correlative pairs — Gita's structural backbone

Sanskrit has no relative pronoun + complementizer like English "who"/"that." It uses **paired clauses**: यद्-clause sets up a referent, तद्-clause picks it up. Both pronouns agree in gender/number with their respective nouns; cases are independent (each clause's grammar dictates).

Pairs:
- यद्...तद् (who/which...that one)
- यदा...तदा (when...then)
- यत्र...तत्र (where...there)
- यथा...तथा (as...so)
- यावत्...तावत् (as long as...so long)
- यदि...तर्हि / तदा (if...then)

Half of Krishna's teachings are यद्...तद् structures. Critical pattern.

### 1D. Reflexive

- **स्व** ("own") — declines like सर्व, possessive
- **आत्मन्** ("self") — masc. -न् stem, doubles as reflexive ("oneself") and philosophical Self. Gita exploits the ambiguity deliberately (आत्मना आत्मानम् उद्धरेत्, 6.5).

### Pronouns in the app

Reference section, not a sub-app. ~6 tables + a correlative-pair page with worked Gita examples. Personal pronouns get drilled (memorization-heavy); सर्वनाम pronouns leverage the तद्-template once and unlock 7 more pronouns for free.

---

## Topic 2: Adjectives + Adverbs

Both ride on systems already in place. Brief reference pages, not sub-apps.

### Adjectives

No separate declension. Adjective stems decline using the same noun tables (राम / रमा / फल / etc.) and **agree with the noun** in विभक्ति + वचन + लिंग (विशेषण-विशेष्य भाव). Already drilled in Gita 1.1 (समवेताः युयुत्सवः) and 2.5 (महानुभावान् गुरून्).

The only new bits:
- **Comparison suffixes**: -तर (comparative), -तम (superlative). Plus ~10 irregular pairs (श्रेष्ठ, ज्यायस्, कनिष्ठ).
- **Pronominal adjectives** (सर्व, अन्य, एक, etc.) follow सर्वनाम pattern with स्म-cells, not राम pattern.

### Adverbs

Mostly **frozen case forms**:
- **Neuter accusative singular** of an adjective → adverb of manner (शीघ्रम् "quickly," सत्यम् "truly")
- **Instrumental** → manner/means (सुखेन "with ease," बलात् "by force")
- **Locative** → time/place (प्रातः "in the morning")

Plus the **-तस्** suffix ("from / -ly"): मूलतः, सर्वतः, शास्त्रतः.

Plus a small closed list of true indeclinable particles (~30–40) — covered in Topic 6.

### App scope

One reference page combining both. Comparison suffixes get a small drill widget. No sub-app.

---

## Topic 3: समास (Compounds) — the real sub-app candidate

The largest gap in what's been covered. Sanskrit aggressively compounds words, and the Gita is saturated with them: धर्मक्षेत्रे, कुरुक्षेत्रे, हृदयदौर्बल्यम्, मधुसूदन, परन्तप, अरिसूदन.

### Six classical types

| Type | Logic | Example | Internal relation |
|---|---|---|---|
| **तत्पुरुष** | Case-determined | राजपुत्रः | "king's son" (षष्ठी inside) |
| **कर्मधारय** | Adj + noun, same case | नीलोत्पलम् | "blue lotus" |
| **द्वन्द्व** | List, "X and Y" | रामलक्ष्मणौ | "Rāma and Lakṣmaṇa" |
| **बहुव्रीहि** | Possessive | पीताम्बरः | "[the one] wearing yellow garments" = Krishna |
| **अव्ययीभाव** | Adverbial | यथाशक्ति | "according to ability" |
| **द्विगु** | Numerical | पञ्चवटी | "group of five trees" |

### Why this needs its own sub-app

The same compound can mean entirely different things depending on type:
- पीताम्बरः as **तत्पुरुष** = "yellow garment"
- पीताम्बरः as **बहुव्रीहि** = "the one wearing a yellow garment" = Krishna

**विग्रह** (un-compounding) is the analytical step — splitting the compound back into its parts and naming the relation. The decode pipeline really should be:

> **पदच्छेद → विग्रह → अन्वय → translation**

The current parent app's pipeline lacks विग्रह. This sub-app fills that hole.

### Sub-app shape

- Compound parser: input compound → propose splits → user picks → app names the type
- Type-classifier drill: show compound + विग्रह → user identifies type
- Gita compound bank: every compound from decoded verses, classified, searchable
- "Build a compound" mode: pick two words + a type → app constructs the compound (sandhi-aware, eventually)

This is the most code-worthy of the topics in this file. Same architectural style as the verb sub-app: small data layer (compound corpus from Gita), rule engine for classification, multiple drill views.

---

## Topic 4: उपसर्ग (Verbal prefixes) — interfaces with verb sub-app

22 traditional prefixes that attach to dhātus and **violently change meaning**. Pāṇini: उपसर्गेण धात्वर्थो बलाद् अन्यत्र नीयते.

The 192 bare dhātus × upasarga combinations gives effectively 800–1000 attested verbs in classical Sanskrit. Vishal has already met four upasargas in the Gita verses fought through:

- **उद्** in उत्तिष्ठ (2.3) — "rise up"
- **उप** in उपपद्यते (2.3) — "be fitting"
- **प्रति** in प्रतियोत्स्यामि (2.4) — "fight against"
- **सम् + अव** in समवेताः (1.1) — "having gathered together"

### Where this lives

**Inside the verb sub-app**, not a separate one. Two integration points:

1. **Parser layer**: incoming verb form → strip upasarga → identify bare dhātu → look up paradigm. प्रतियोत्स्यामि → प्रति + √युध् + लृट् + उत्तम एक.
2. **Display layer**: Dhātu Detail page shows a "Common upasarga compounds" section listing the productive prefixed forms (अभि-युध्, सम्-युध्, प्रति-युध्) with Gita occurrences.

### Reference table (lives in verb sub-app)

22 entries, each with: prefix, sense(s), 2–3 high-frequency dhātu compounds, Gita examples where available.

---

## Topic 5: कारक — the semantic layer above विभक्ति

Conceptual upgrade, not new memorization. The fix that makes passive sentences stop looking broken.

**विभक्ति** = morphological case (the ending). **कारक** = semantic role in the action.

| कारक | Role | Default विभक्ति |
|---|---|---|
| कर्ता | agent | प्रथमा (active), तृतीया (passive) |
| कर्म | patient | द्वितीया (active), प्रथमा (passive) |
| करण | instrument | तृतीया |
| सम्प्रदान | recipient | चतुर्थी |
| अपादान | source | पञ्चमी |
| अधिकरण | location | सप्तमी |

**Why it matters:** in passive constructions, the विभक्ति assignments swap but the कारक roles stay the same. रामेण रावणः हतः — रामेण is तृतीया but कर्ता; रावणः is प्रथमा but कर्म. The Gita uses passive constantly (especially for fate, divine action, philosophical impersonals).

Pāṇini built the whole grammar around कारक, not विभक्ति. This is the deeper layer.

### App scope

One reference page in the parent app, alongside the noun reference. Includes a "passive recognition" sidebar showing how विभक्ति-कारक mappings flip.

---

## Topic 6: अव्यय (Indeclinables) — Pāṇini's third bin

The conceptual frame that makes prepositions, articles, conjunctions, and most adverbs disappear into a single coherent category.

### The Pāṇinian taxonomy

Every Sanskrit word is one of three things:

1. **सुबन्त** — ends in a case ending (nouns, pronouns, adjectives) → declinable
2. **तिङन्त** — ends in a verbal ending (finite verbs) → conjugable
3. **अव्यय** — ends in nothing that changes → indeclinable

Four bins total counting derivatives. English's ~8 word classes mostly collapse into these because case endings + agreement do the work English distributes across articles, prepositions, and auxiliaries.

### Articles and prepositions

**Articles don't exist.** Definiteness is conveyed by demonstratives (सः, एषः) when needed, or just inferred.

**Prepositions don't exist as a word class.** The case system is the preposition system:
- "to/for the king" → राजाय (चतुर्थी)
- "from the king" → राज्ञः (पञ्चमी)
- "with the king" → राज्ञा (तृतीया)
- "in the king" → राज्ञि (सप्तमी)

This is a feature, not a gap. One word does what English needs two for.

### Postpositions — the small real category

~15–20 indeclinables that follow a noun and govern a specific case. Look prepositional, behave like Hindi के साथ.

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

### Particles — the Gita-saturating set

~60–80 indeclinables that "flavor" sentences. The Gita is saturated with च, हि, तु, एव, अपि, इति. Plus interrogatives (कथम्, कुत्र, कस्मात्), correlatives (already in pronouns), connectives (अथ, अथापि, किन्तु, परन्तु, तथापि), time/place deictics (अद्य, श्वः, ह्यः, इदानीम्, इह, अत्र, तत्र), affirmation/negation (खलु, नूनम्, न, मा).

### App scope

A **frequency-ranked Gita-specific particle list** is its own useful artifact — could be auto-generated from the parent app's decoded verses as a sidebar that grows with the corpus. Otherwise: one reference page, one taxonomy explainer, one postpositions table.

---

## Topic 7: Negation

Three mechanisms, all small:

1. **न** — general negation, indeclinable particle
2. **मा** — prohibitive, used with लोट् or लुङ् (rare). Already met in Gita 2.3: मा स्म गमः.
3. **नञ्-समास** — negation as a compound prefix:
   - **अ-** before consonants: अधर्म, अहिंसा, अनासक्ति
   - **अन्-** before vowels: अनार्य, अनवद्य

The Gita is built on नञ्-समास abstractions — अधर्म, अकर्म, अनासक्ति, अनहंकार, अद्वेष, अकाम. Five-minute lesson, massive yield.

App scope: one paragraph in the compound sub-app + one in the particles reference.

---

## Topic 8: Numbers (संख्या)

Trivial scope, completionist. एक, द्वि, त्रि, चतुर् decline irregularly with gender. पञ्चन्–नवन् easier. Then दश, शत, सहस्र.

App scope: one reference table. Skip until needed.

---

## Topic 9: Discourse patterns

Sanskrit discourse conventions that look like grammar but are actually fixed formulas:

- **उवाच / अब्रवीत् + direct quotation closed by इति** — "X said: '...' (इति)." इति is the closing quotation mark. Every Gita chapter break uses this.
- **एवम् उक्तः** ("thus addressed") — frozen formula.
- **धृतराष्ट्र उवाच, सञ्जय उवाच, अर्जुन उवाच, श्रीभगवानुवाच** — speaker tags between verses.
- **अनुष्टुभ् structure** — 32 syllables, 4 pādas of 8, syntactic break usually after pāda 2. Crosses over with the existing **Awadhi Meter Visualizer** tooling — same machinery (laghu/guru, mātrā count), different meter.

App scope: short reference page. The अनुष्टुभ् visualization is a v2 cross-app feature pulling Awadhi visualizer code with new meter rules.

---

## Build order — what becomes what

| Topic | App treatment | Priority |
|---|---|---|
| Pronouns (1A–1D) | Reference section in parent app | High — blocks Gita reading |
| Adjectives + Adverbs (2) | One reference page | Low — already mostly known |
| **समास (3)** | **Standalone sub-app** | **High — biggest real gap** |
| उपसर्ग (4) | Inside verb sub-app | High — verb sub-app blocked without it |
| कारक (5) | Reference page + passive sidebar | Medium |
| अव्यय / particles / postpositions (6) | Reference page + auto-grown Gita-specific list | Medium |
| Negation (7) | Paragraph in compound sub-app + particles ref | Low |
| Numbers (8) | One table | Skip until needed |
| Discourse patterns (9) | Short reference + v2 meter visualization | Low |

**Implementation sequence:**

1. **Pronouns reference section** — fastest win, unblocks Gita verse decoding. Two big tables (अस्मद्, युष्मद्), one तद्-template grid with स्म-cells highlighted, six "transfer" mini-tables (यद्, किम्, सर्व, अन्य, एक, एतद्), correlative-pair page.
2. **उपसर्ग layer in verb sub-app** — must coexist with the dhātu engine to handle real Gita verbs.
3. **समास sub-app** — full build, parser + classifier + corpus. Largest engineering effort in this spec.
4. **कारक page + passive sidebar** — small, conceptual.
5. **Particles + postpositions** — wire to parent app's verse corpus to auto-grow the Gita-specific frequency list.
6. **Adjectives/adverbs reference page** — last; mostly already known.
7. Numbers, discourse, meter visualization — defer.

---

## Design

Inherits everything from parent project + verb sub-app:

- Parchment `#faf4e8`, ink `#1c1008`, gold `#b5770d`, saffron `#c17f24`, sage `#4a5e4a`
- Noto Serif Devanagari, Cormorant Garamond, Cinzel
- Reference pages should feel like **opened pages of a single grammar codex**, not separate apps. Sidebar nav between topics. Cross-links between related concepts (e.g., कारक page links to passive examples in verb sub-app).
- The समास sub-app is the only standalone-feeling piece — gets its own visual identity within the family aesthetic.

---

## Stack & commands

Same as parent: React + Vite + Vitest.

```bash
npm install
npm run dev
npm run build
npm test
```

Co-author trailer: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

---

## What Vishal already knows (do not re-explain)

From parent CLAUDE.md, verb sub-app, and the conversation that produced this file:

- The 8 × 3 × 3 noun system, राम table, विशेषण-विशेष्य agreement
- The 5-layer verb stack and 192-dhātu coverage logic
- कृदन्त (PPP, absolutive, infinitive)
- The four Gita verses' full decoding
- That Sanskrit has no articles or prepositions; case endings do that work
- The declinable / indeclinable conceptual frame
- That समास is the next big system to learn
- That उपसर्ग multiplies the dhātu count significantly
- The conceptual existence of कारक as semantic role distinct from विभक्ति

## Out of scope

- सन्धि — still deferred (parent project decision)
- Vedic forms — out of scope project-wide
- Causatives, passives, desideratives, intensives — verb sub-app v2
- Detailed prosody beyond अनुष्टुभ् — separate concern
- Non-Gita compound corpora — focus is Gita first; expand later