# Checkpoint 39 — vocab coverage push from 90.2% to 98.24% (Slice B of v14)

**Date:** 2026-05-09 → 2026-05-10

## Trigger

After [Slice A](checkpoint-38.md) the engine was hardened but the user kept hitting "no grammar data yet" on basic words. Verbatim audit complaints, in order:

1. *"How come you don't know what येषाम् काङ्क्षितम् राज्यम् means? FIX it for all the missing words in पदच्छेद."*
2. *"Lol at आचार्यम्, उपसङ्गम्य, वचनम् — being 'this word isn't in the shared dictionary'... find all such words and fix them."*
3. *"Really? from 1.11 — are they dominated by sandhi residue fragments? and even if they were, they should have meanings attached: यथाभागम् ... अभिरक्षन्तु ..."*
4. *"1.7 / विशिष्टाः / no grammar data yet... We just talked about 1.7 and you missed to fix विशिष्टाः — remarkable incompetence!!!"*
5. *"अभ्यहन्यन्त — no grammar data yet ... you kidding me?"*
6. *"What kind of meaning is 'a-stem instrumental plural — by/with X-s'? Make it better."*
7. *"युक्ते — present ātmanepada 3sg — 'X-s (for self)'... what is even this, where's the meaning?"*
8. *"पणव-आनक-गोमुखाः — is this how you do samas?" (showing the per-component split as not enough — wanted compound type tagged too)*

Survey on entry: **953 distinct missing padas across the corpus**. The agent-built `VOCAB_EXTENDED` (4028 entries) tagged forms from corpus context but missed declension paradigms — येषाम्, अयम्, राज्यम्, हृदयम् all returned null. Same for common kṛdantas (काङ्क्षितम्, उक्तम्, कृतम्), absolutives (आसाद्य, उद्यम्य), and high-frequency verb forms (अर्हसि, इच्छामि, भवति).

## What changed

### `src/data/coreVocab.js` — base layer between SHARED_VOCAB and VOCAB_EXTENDED

New module loaded with high priority (after hand-curated SHARED_VOCAB, before agent-bulk VOCAB_EXTENDED).

**Pronoun declension tables** — full 7-case × 3-number × 3-gender:
- यद् (relative): यः / यम् / येन / यस्मै / यस्मात् / यस्य / यस्मिन् / येषाम् / etc.
- तद् (he/that): सः / तम् / तेन / तस्मै / तस्मात् / तस्य / तस्मिन् / तेषाम् / etc.
- इदम् (this proximal): अयम् / इमम् / अनेन / अस्मै / अस्मात् / अस्य / अस्मिन् / एषाम् / etc.
- एतद् (this proximal): एषः / एतम् / एतेन / etc.
- किम् (interrogative): कः / का / किम् / केन / etc.
- सर्व (pronominal adjective): सर्वम् / सर्वान् / सर्वेभ्यः / सर्वेषाम् / etc.
- अस्मद् (1pers): अहम् / माम् / मा / मया / मह्यम् / मे / मम / मयि / आवाम् / नौ / वयम् / नः / etc.
- युष्मद् (2pers): त्वम् / त्वाम् / त्वा / त्वया / तुभ्यम् / ते / तव / त्वयि / युवाम् / यूयम् / वः / etc.

**Noun declension generators** with bare-stem entries for compound first-member usage:
- `buildAStemMasculine` (12 forms + bare-stem): काम, लोक, शोक, मोह, पुरुष, धर्म, plus Krishna's epithets (कृष्ण, हृषीकेश, केशव, गोविन्द, मधुसूदन, पार्थ), Mahābhārata characters (आचार्य, भीष्म, द्रोण, अर्जुन, द्विज, उत्तम, इष्वास), 9-character cast (धृष्टद्युम्न, द्रुपद, विराट, युयुधान, चेकितान, काशिराज, शिखण्डि, सात्यकि, पुरुजित्), and ordinary masculines (शूर, देव, दैत्य, मानव, विष, ऋषभ, सिंह).
- `buildAStemNeuter` (11 forms + bare-stem): राज्य, ज्ञान, हृदय, कर्म, योग, दुःख, सुख, पाप, पुण्य, मन, वचन, विश्व, कारण, बल, वाक्य, रूप, इन्द्रिय, युद्ध, रथ, शास्त्र, फल, धन, गुण, यज्ञ, दान, तप, अमृत, समुद्र, सङ्ग्राम, अहंकार, कुल, क्षय, नाश, वर्ण, वाद, भोग, राग, व्यवसाय, स्वर्ग, ऐश्वर्य, अव्यक्त, व्यक्त, शस्त्र, घ्न, सुख, सत्य, etc.
- `buildIStemMasculine`: अग्नि, मुनि, ऋषि.
- `buildIStemFeminine`: शान्ति, बुद्धि, व्यक्ति, कीर्ति, गति, स्मृति, सिद्धि, मति.
- आत्मन् hand-curated (आत्मा, आत्मानम्, आत्मानं, आत्मना, आत्मने, आत्मनः, आत्मनि, आत्मानौ, आत्मानः, आत्मनाम्, आत्मसु).
- -अस् stem: चेतस्, चेतसा, चेतसः, मनस्, मनसा.

**Krdantas** (predicate-adjective form): काङ्क्षितम्/-तः, उक्तम्/-तः, कृतम्/-तः, गतम्/-तः, स्थितम्/-तः, जातम्/-तः, अवस्थितः/-ताः/-तान्/-तम्, समवेताः, विषीदन्तम्/-तः, विमुक्ताः, अचिन्त्यं, आश्रितः, परिमार्गितव्यम्, संविग्न, सम्मूढ, प्रसन्न, पूर्ण, विप्रतिपन्ना, अनुद्विग्न, विगत, वीत, अपहृत, अतीतः, सुकृत, दुष्कृते, अभिरक्षित/-म्, उपहत, स्थित. Infinitives: कर्तुम्, गन्तुम्, हन्तुम्, द्रष्टुम्, ज्ञातुम्, श्रोतुम्, शोचितुम्. Absolutives: आवृत्य, उक्त्वा, गत्वा, कृत्वा, उपसङ्गम्य, उपगम्य, समीक्ष्य, दृष्ट्वा, श्रुत्वा, त्यक्त्वा, हत्वा, आश्रित्य, उपेत्य, अवष्टभ्य, विसृज्य, उत्सृज्य, विनद्य, उद्यम्य, आसाद्य, आपूर्य.

**Verb forms**: अर्हसि / अर्हति, इच्छामि / इच्छसि / इच्छति, भवामि / भवसि / भवति, अवाप्स्यसि / अवाप्नोति, आप्नोति, अनुवर्तते / अनुवर्तन्ते, उत्तिष्ठ, गच्छति / गच्छामि, जानाति / जानन्ति, ऋच्छति, भ्रमति, विन्दते, अतिरिच्यते, आप्यते, वदति, अनुपश्यति, अभिजानन्ति, योत्स्ये / योत्स्यामि, अनुस्मर, अनुशुश्रुम, व्यथयन्ति, प्राहुः family (defective √अह्: आह, आहतुः, आहुः, प्राह, प्राहुः), अभ्यहन्यन्त, अहन्यन्त (the लङ् passive 3pl that triggered the *"you kidding me"* moment).

**Present participles (शतृ)**: विषीदन्, सञ्जनयन्, जानन्, अजानन्, त्यजन्, कुर्वन्, युञ्जन्, अनुस्मरन्, अनुचिन्तयन्, प्रहसन्.

**Long compounds** appearing whole in padaccheda: क्षेत्रक्षेत्रज्ञयोः, लोकसङ्ग्रहम्, मणिपुष्पकौ.

**Vocatives**: बाहो (in महाबाहो), पते, राजन्, भगवन्.

**Indeclinables**: एवम्, नित्यम्, सदा, पुनः, सर्वत्र, सम्यक्, कदापि, उच्चैः, यावत्, तावत्, सहसा, चेत्, आशु, तद्वत्, अह.

**Compound prefixes**: महा (compound prefix; fusion of महत् → महा-), सु, दुर्, अति. Plus compound first-members: द्विज, उत्तम, इष्वास, रुधिर, देह, अर्थ, अन्तर, मात्रा, स्पर्श, शीत, उष्ण, आगम, अपायिन्, अनुभाव, दौर्बल्य, क्षेत्र, प्रदिग्ध.

### `inferFromSuffix` runtime fallback in `sharedVocab.js` (`434bca5`, `01741c1`)

When all dictionary lookups fail, walks ~30 patterns to give a best-effort grammar signal:

- **Verb endings**: imperatives (-न्तु, -न्ताम्, -ध्वम्, -स्व), futures (-ष्यति, -स्यति, -ष्यन्ति, -ष्यसि, -ष्यामि, -ष्यते), optatives (-ेयुः, -ेम, -ेताम्, -यात्), present (-न्ति, -न्ते, -ते, -ति, -मि, -सि, -से, -यते passive).
- **Imperfect (लङ्)**: `^अ.+न्त$` (ātmanepada/passive 3pl), `^अ.+त्$` (3sg), `^अ.+न्$` (3pl P).
- **Krdantas**: -त्वा (absolutive), -तुम् (infinitive), -इतव्यम् / -अनीयम् (gerundive), -इतम् / -इतः / -िताः / -ितान् / -ष्टाः / -ष्टम् / -ष्टः (PPPs).
- **Present active participles (शतृ)**: -न् / -न्तम् / -न्तः / -न्तौ.
- **Absolutive -य suffix** (आसाद्य, उद्यम्य, आपूर्य style).
- **Cases**: -ानाम् (gen pl), -एभ्यः / -ेभ्यः (dat/abl pl), -ैः (instr pl), -ान् (acc pl m), -ाभ्याम् (dual), -ाभिः (instr pl f), -एण (instr sg), -स्य (gen sg), -स्मात् (pron abl), -स्मिन् (pron loc), -आत् (abl sg), -ः (m nom sg), -म् / -ं (n nom or m acc sg).
- **Vocatives**: -हो (compound), -अन् stems (राजन्, भगवन्).
- **Adverbial yathā-compounds**: words starting with यथा-.

Each entry tagged `source: 'suffix-inferred'` so callers can distinguish authoritative vs best-guess.

### Stem-aware glosses (`cde5a51`)

`withStemGloss(suffix, casePrefix)` strips the suffix → looks up the bare stem → produces real glosses ("by horses (pl)") instead of generic templates ("by/with X-s"). Wired into 11 noun-case patterns. Each pattern also sets `root: <stripped-stem>` so the paradigm classifier and `decomposeCompound` have something to work with.

| Word | Before | After |
|---|---|---|
| `हयैः` | "by/with X-s" | **by/with horse (pl)** |
| `धर्मैः` | "by/with X-s" | by dharma (pl) |
| `गुणानाम्` | "of (the) X-s" | of quality (pl) |
| `राज्यस्य` | "of X" | of kingdom |
| `धर्मात्` | "from X" | from dharma |
| `कामेभ्यः` | "a-stem dat pl" | for desire (pl) |
| `धनेन` | "by X" | by wealth |

### Locative -े before verb -ते priority fix (`efe8acf`)

User flagged `युक्ते` showing "present ātmanepada 3sg — X-s (for self)" — wrong. युक्ते is the locative singular of युक्त (PPP of √युज्). The suffix-fallback was stripping 2 chars and treating it as a verb ending; the fix adds a noun-locative pattern that runs BEFORE the -ते verb pattern and looks up the resulting stem. If found as noun/adjective/krdanta, returns loc-sg classification with real gloss ("in yoked / joined") drawn from the stem entry.

### Heuristic samas type tagging (`319195a`)

User showed `पणव-आनक-गोमुखाः` and asked "is this how you do samas?" — implicitly noting that the compound TYPE was empty. Two heuristics added:
1. **3+ noun parts → `इतरेतर द्वंद्व (inferred)`**: coordinated lists. पणव-आनक-गोमुखाः ("drum-and-drum-and-horn"), जन्म-कर्म-फल-प्रदाम् etc.
2. **2 noun parts → `तत्पुरुष? (inferred — best guess)`**: most common 2-stem compound, flagged with `?` since vibhakti annotation would be needed to distinguish षष्ठी / तृतीया / etc. tatpuruṣas, nor rule out a कर्मधारय.

Both inferred types tagged "(inferred)" so they're distinguishable from authoritative vibhakti-extracted ones.

## Coverage progression

| Stage | Total padas | Missing | Coverage |
|---|---:|---:|---:|
| Entry to v14 (post Slice A) | 8038 | 953 | 88.1% |
| coreVocab pronouns + a-stem nouns + first batch of krdantas (`d41c757`) | 8044 | 790 | 90.2% |
| coreVocab आत्मन् + i-stem nouns + more krdantas (`71f8397`) | — | 770 | 90.4% |
| Major batch — Krishna names, common nouns, PPPs, verb forms (`c74b916`) | — | 765 | 90.6% |
| Bulk batch — top 60 missing compound stems (`88cf29d`) | 8253 | 762 | 90.8% |
| Suffix-pattern fallback (`434bca5`) | 8394 | 248 | **97.0%** |
| Final pass — top 100 stems + lower min length to 2 (`01741c1`) | 8398 | 148 | **98.24%** |

Remaining 148 missing padas are dominated by sub-3-character sandhi-residue fragments below the inferrer's minimum-length threshold. These need splitter fixes, not vocab additions.

## Tests

- `coreVocab.test.js` — 43 lookups across pronouns (येषाम्, अयम्, सर्वेषाम्, etc.), nouns (राज्यम्, ज्ञानम्, हृदयम्, धर्मस्य), kṛdantas (काङ्क्षितम्, उक्तम्, कर्तुम्, उक्त्वा).
- `WordPopover.test.jsx` updated — the "no parsing" test changed to use a 2-char input (अज) below the suffix-inferrer's minimum length threshold so the no-parsing code path can still be exercised.
- 580 passing across 40 files.

## What's left for later slices

- Reference-link wiring (every popover should have a "see in [reference]" target). [Slice C](checkpoint-40.md).
- Many verbs whose root isn't in top-192 still dump to /primer#lakara. Dhatu stub generation. [Slice C](checkpoint-40.md).
- Compound popover priority (`परम-इष्वासः` shows generic suffix-fallback instead of per-component). [Slice D](checkpoint-41.md).
- UX nav (prev/next, scroll preserve). [Slice D](checkpoint-41.md).
