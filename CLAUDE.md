# CLAUDE.md — Sanskrit Learning Project

## Read this first

This file exists because User had a long, rich conversation with Claude on claude.ai that cannot be directly imported here. This file carries the full context — not just a spec, but the *why*, the *how we got here*, the *evolution of ideas*, and the emotional weight of this project. Read it fully before touching any code.

---

## The person

User. Software engineer, Mumbai. Mac mini + MacBook Pro setup. Broad intellectual interests — economics, geopolitics, Indian policy, languages, cultural history. Direct, candid communicator. Responds in English unless he says otherwise.

---

## The evolution of ideas — how we got here

### Thread 1: The Awadhi Meter Visualizer (already built, separate project)

User previously built a React + Vite app — the **Awadhi Meter Visualizer** — for Sundarkand/Ramcharitmanas. It visually breaks Awadhi verse lines into laghu/guru syllables and shows the यति (singing pause). It has:
- A Devanagari syllabification engine with Awadhi-specific mātrā rules
- A 4-step animated widget: Full Line → Syllables → Laghu/Guru → Mātrā count + Yati
- All 60 Sundarkand sections from IIT Kanpur corpus
- Vitest tests, golden-master accuracy (~71.7% chaupai)
- Parchment aesthetic: Noto Serif Devanagari, Cormorant Garamond, Cinzel

This Sanskrit learning project shares that design language and stack. Different project, same aesthetic.

### Thread 2: School Sanskrit — what was lost

User's school Sanskrit was Maharashtra SSC — Navneet's शब्द धातु रूपावलिः. Pure rote. देवः देवौ देवाः memorized without understanding why. Zero verb knowledge. Zero derivation logic. He was handed the compiled binary and asked to memorize it. The source code (Panini's generative grammar) was never shown.

The Panini irony: the ~2500-year-old Ashtadhyayi is one of the most sophisticated formal grammars ever written — a generative rule system that *derives* forms from roots. Maharashtra SSC taught its exact opposite.

### Thread 3: Bibek Debroy — "Bhagavad Gita for Millennials" (February 2023)

This is where the real origin is. User started Bibek Debroy's "Bhagavad Gita for Millennials" in February 2023, made serious handwritten notes, then abandoned it due to lack of time. But something stuck. The idea of learning Sanskrit through the Gita — understanding it structurally, not just devotionally — had been brewing since then.

That latent interest is what produced the **Awadhi Meter Visualizer** — a related but sideways expression of the same underlying obsession with Indian literary prosody and language structure. The Awadhi project was the faint idea taking a shape it could actually finish.

The WhatsApp message (क्लैब्यं मा स्म गमः पार्थ) was not the origin — it was a trigger. The thread that this project is trying to implement was already forming. The conversation with Claude gave it enough clarity to finally know what to build.

From the February 2023 reading, User made handwritten notes covering:

**SOV vs SVO — the core structural insight:**
- Sanskrit and Hindi are **SOV** (Subject-Object-Verb) languages: मैं एक सेब खाता हूँ
- English is **SVO** (Subject-Verb-Object): I eat an apple
- This is why अन्वय (logical reordering) always produces SOV — that's Sanskrit's natural order
- Word order in Sanskrit is *free* for poetic/metrical reasons, but the underlying logic is always SOV

**पदच्छेद** — word splitting. Undoing sandhi and समास to get individual words back. The notes covered how Sanskrit aggressively compounds and joins words, and पदच्छेद is the act of reversing that.

**अन्वय** — logical ordering. After पदच्छेद, reorder into the parseable SOV sequence: Subject + qualifiers + Object + qualifiers + Verb.

**छंद / metre** — the notes covered this in detail:
- अनुष्टुभ metre (the Gita's primary metre) — 8 syllables × 4 pādas = 32 syllables per verse
- The six वेदांग (limbs of the Vedas), including छंद शास्त्र
- Laghu (light, 1 mātrā) and guru (heavy, 2 mātrās) — the same system underlying the Awadhi meter visualizer
- How metre constrains word order — poets scramble SOV for metrical fit, अन्वय unscrambles it

**The key realisation from Debroy:** Because Sanskrit has विभक्ति (case endings), word order is free. The endings carry the grammatical meaning that English word order carries. This is what makes Sanskrit simultaneously hard to read (scrambled order) and precise (endings never lie).

This prior reading meant that when User started the learning conversation, he already had the SOV/SVO mental model and the पदच्छेद/अन्वय vocabulary — he just needed the verb system and the actual decoding practice.

### Thread 4: The WhatsApp trigger — not the origin, but the spark

Someone in a group chat posted something depressing. User responded with:

> क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।
> क्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप॥

(Gita 2.3 — "Do not yield to unmanliness, O Partha — rise up, O scorcher of enemies.") They asked for the meaning. He looked it up on holy-bhagavad-gita.org, saw the chapter/verse grid layout, kept reading. 2.3 → 2.4 → 2.5.

This wasn't the origin — the idea had been brewing since February 2023. But this was the moment the faint thread became specific enough to act on. The conversation with Claude that followed gave it structure: what to track, how to track it, what the app should feel like.

### Thread 5: The Rohan Pandey / bvsiitm connection

User came across @khoomeik (Rohan Pandey) on Twitter — ex-OpenAI, now working on Sanskrit OCR, runs a weekly Sanskrit reading group in SF reading the Gita. Rohan posted a thread with:

1. **Top 192 Sanskrit Dhātus by Frequency** — color-coded by गण, ordered by frequency from Digital Corpus of Sanskrit
2. **Dhātu Coverage Curve** — the key data:
   - Top 10 dhātus = 27.7% of all verb usage
   - Top 50 = 58.8%
   - Top 100 = 73.0%
   - **Top 192 = 86.1%**
   - Top 500 = 98.5%
   - Total corpus: 987,819 matched verb tokens via vidyut from DCS CoNLL-U
3. Same 192 dhātus ordered by गण (second ordering)

Rohan used **vidyut** (ambuda-org/vidyut) for dhātu identification — the same library User had looked at for the Awadhi meter project. This data inspired **bvsiitm.github.io/sanskrit-gita-learn**.

### Thread 6: The bvsiitm course — the pedagogical model

bvsiitm.github.io/sanskrit-gita-learn is a React+Vite app teaching Sanskrit through the Gita. From its explainer.html, the pedagogy is:

- **Known → +1 → Drill → SRS** — always start from what the student knows, add exactly one new idea, drill on it
- Opens with **धृतराष्ट्र उवाच** — two words encoding Vibhakti + Lakāra + Dhātu + Sandhi simultaneously
- **Sandhi comes last** — understand the expected form first, *then* learn why it changed
- 192 dhātus → 86.1% coverage — frequency-first is the most direct path

The course lesson 2 (bvsiitm.github.io/sanskrit-gita-learn/lesson/2) is where User first formally encountered सप्तमी (locative), प्रथमा (nominative), and the राम declension table being filled in one case at a time.

### Thread 7: The learning — fights won in this conversation

Over one long conversation, User fought through four Gita verses. "It is like I am fighting for every single word." That's how he retains things.

**Gita 1.1 — धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः...**
The big fight: समवेताः *looks* like a verb ("gathered") but is a past passive participle (कृदन्त) agreeing with युयुत्सवः. Both प्रथमा बहुवचन पुल्लिंग — the matching endings confirm they belong together. किमकुर्वत is the finite verb (√कृ, लङ्, प्रथम, बहुवचन = "they did").

**Gita 2.3 — क्लैब्यं मा स्म गमः पार्थ...** (The WhatsApp verse)
Three finite verbs: गमः (√गम्, लोट्, negated by मा स्म = "do not yield"), उपपद्यते (√पद्, लट् = "is fitting"), उत्तिष्ठ (√स्था, लोट् = "rise up!"). त्यक्त्वा is absolutive ("having abandoned").

**Gita 2.4 — कथं भीष्ममहं सङ्ख्ये द्रोणं च मधुसूदन...**
Key fight: मधुसूदन and अरिसूदन look like objects but are सम्बोधन (vocatives) — two epithets of Krishna, not participants in the action. भीष्मम् and द्रोणम् are the द्वितीया objects. प्रतियोत्स्यामि is लृट् (future), spotted by the -ष्य- infix (प्रति + √युध्, उत्तम, एकवचन = "I shall fight against").

**Gita 2.5 — गुरूनहत्वा हि महानुभावान्...** (The hardest)
Three verb-looking words, one finite verb. भोक्तुम् = infinitive ("to eat"), हत्वा/अहत्वा = absolutives ("having killed / without killing"), श्रेयः = predicate adjective with implied अस्ति ("is better"). Only भुञ्जीय is finite (√भुज्, विधिलिङ्, "should one enjoy?" — Arjuna's rhetorical horror, grammatically baked into the mood). Also: महानुभावान् गुरून् — सामानाधिकरण्य: both द्वितीया बहुवचन पुल्लिंग, so the adjective belongs to that noun.

### Thread 8: The project idea

User wanted to not lose this. The idea:

**Track the learning journey as it happens:**
- Every verse decoded: मूल + पदच्छेद + finite verb identified + अन्वय + हिंदी + English
- Every grammar pattern won: what it is, what it means, which verse triggered it

**Make it a web app** — not just markdown files. Something he can actually use going forward. Same stack as the Awadhi visualizer. Same aesthetic.

**The frustration:** Claude.ai conversations can't be imported into Cowork/Claude Code. This CLAUDE.md is the workaround.

---

## What to build

React + Vite web app. Two views:

### View 1 — Verse Journey
- A chapter/verse grid (like holy-bhagavad-gita.org — that grid is what started everything)
- Click a decoded verse → see मूल → पदच्छेद → finite verb highlighted → अन्वय → हिंदी → English
- Undecoded verses greyed out / locked
- The sequence of unlocking tells the story of the learning
- Data source: `verses-decoded.md`

### View 2 — Patterns Won
- Visual tracker of internalized grammar patterns
- Grouped: Noun System / Verb System / Kṛdanta / Decode Method
- Each entry: pattern name + what it means + verse that triggered it
- Should feel like unlocking achievements — because that's what they are
- Data source: `patterns-won.md`

### Design
- Parchment aesthetic — identical to Awadhi Meter Visualizer
- Fonts: Noto Serif Devanagari (Sanskrit), Cormorant Garamond (prose), Cinzel (labels)
- Colors: parchment `#faf4e8`, ink `#1c1008`, gold `#b5770d`, saffron `#c17f24`, sage `#4a5e4a`
- Devanagari must render cleanly

---

## Grammar — what User knows (do not re-explain)

**Noun system (8 × 3 = 24 forms):**
- 8 विभक्ति: प्रथमा (subject), द्वितीया (object), तृतीया (by/with), चतुर्थी (for), पञ्चमी (from), षष्ठी (of), सप्तमी (in/at), सम्बोधन (O! — never in the action)
- 3 वचन: एकवचन, द्विवचन, बहुवचन
- 3 लिंग: पुल्लिंग, स्त्रीलिंग, नपुंसकलिंग
- Full राम declension table memorized
- विशेषण-विशेष्य / सामानाधिकरण्य: adjective matches noun in all three
- Endings narrow candidates; meaning picks the final match

**Verb system (3 × 3 × 5 = 45 Gita-practical forms):**
- प्रथम पुरुष flip: Sanskrit प्रथम = English 3rd person
- Full √कृ table across 5 लकार
- 5 key लकार with spotting signals:
  - लट् → -ति/-मि (present)
  - लङ् → अ- prefix + -त् (past)
  - लृट् → -ष्य-/-स्य- infix (future)
  - लोट् → imperative endings (Krishna's instructions)
  - विधिलिङ् → -यात्/-ीय (should/ought — rhetorical/philosophical)
- Finite verb = sentence anchor. Everything else orbits it.
- 10 गण conceptually understood

**Kṛdanta:**
- Past passive participle — verb-derived adjective, agrees with noun, never anchors sentence
- Absolutive (हत्वा) — "having done"
- Negative absolutive (अहत्वा) — "without doing"
- Infinitive (भोक्तुम्) — "to do"

**Decode sequence:** पदच्छेद → अन्वय (SOV) → हिंदी → English
- अन्वय always SOV — Hindi before English

**Not yet known:** सन्धि rules (deliberately deferred), द्वितीया/तृतीया/चतुर्थी/पञ्चमी in practice, परस्मैपद/आत्मनेपद

---

## Reference files

| File | Contents |
|------|---------|
| `sanskrit-reference.md` | Full grammar reference — all tables, all 4 verses, 10 गण, bvsiitm pedagogy, Rohan Pandey data |
| `verses-decoded.md` | Gita 1.1, 2.3, 2.4, 2.5 — full पदच्छेद + अन्वय + हिंदी + English |
| `patterns-won.md` | 20 patterns across 4 categories, each with triggering verse |

---

## Commands

```bash
npm install
npm run dev        # localhost:5173
npm run build
npm test
```

Co-author trailer: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`