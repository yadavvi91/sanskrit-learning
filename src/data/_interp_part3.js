// Interpretive notes — chapters 13–18, paraphrase-quality.
// Each verse gets: anvaya, vibhaktiNotes, keyFights, vyakhya.
// AUDIT EVERYTHING.
export const INTERP_PART_3 = {
  // ── Chapter 13 — Kṣetra-Kṣetrajña Vibhāga Yoga ──────────────────────
  // 13.1 — Arjuna's question (interpolated in verses.js's recension;
  // DCS omits it, so the DCS-derived enrichment can't fill it.
  // Hand-curated here.)
  '13.1': {
    anvaya: "केशव, प्रकृतिं पुरुषं च एव, क्षेत्रं क्षेत्रज्ञम् एव च, ज्ञानं ज्ञेयं च — एतत् वेदितुम् इच्छामि",
    vibhaktiNotes: [
      "केशव → सम्बोधन — Arjuna addressing Kṛṣṇa",
      "प्रकृतिम्, पुरुषम्, क्षेत्रम्, क्षेत्रज्ञम्, ज्ञानम्, ज्ञेयम् → द्वितीया (objects of वेदितुम् / इच्छामि)",
      "एतत् → द्वितीया (sums up the six topics — 'all this')"
    ],
    keyFights: [
      "इच्छामि = √इष् + लट् + उत्तम + एकवचन — \"I wish\" (the only finite verb)",
      "वेदितुम् = infinitive of √विद् — \"to know\" (governed by इच्छामि)",
      "Six द्वितीया objects all governed by the single infinitive"
    ],
    vyakhya: [
      {
        title: "Three pairs as the chapter's agenda",
        body: "Arjuna names three dyads — prakṛti / puruṣa, kṣetra / kṣetrajña, jñāna / jñeya. The chapter answers each in turn. Grammatically a single sentence: one finite verb (इच्छामि), one infinitive (वेदितुम्), six द्वितीया objects."
      },
      {
        title: "Editorial note: not in every recension",
        body: "This verse appears in the longer recension of the Gītā but is absent from the critical edition (the DCS source we use). When present, scholars count BG 13 as 35 verses; without it, 34. The numbering in this app follows the longer recension — interpretive content for the remaining verses 13.2 – 13.35 was originally authored against the shorter numbering and was shifted up by one to align."
      }
    ]
  },
  '13.2': {
    anvaya: "कौन्तेय, इदं शरीरं क्षेत्रम् इति अभिधीयते; एतद् यः वेत्ति, तं तज्ज्ञाः क्षेत्रज्ञः इति प्राहुः",
    vibhaktiNotes: [ "कौन्तेय → सम्बोधन", "इदं शरीरम् → प्रथमा (subject)", "क्षेत्रम्, क्षेत्रज्ञः → प्रथमा (predicate nominatives)" ],
    keyFights: [ "अभिधीयते and प्राहुः are the two finite verbs — both passive/indicative of naming", "इति marks the named term — \"called X\" pattern" ],
    vyakhya: [ { title: "The naming pattern with इति", body: "Sanskrit uses N1 + इति + verb-of-naming to mean \"X is called Y\". Two such frames stacked here introduce the chapter's core dyad: क्षेत्र and क्षेत्रज्ञ." } ]
  },
  '13.3': {
    anvaya: "भारत, सर्वक्षेत्रेषु क्षेत्रज्ञं माम् अपि च विद्धि; क्षेत्रक्षेत्रज्ञयोः यद् ज्ञानं तद् ज्ञानम् इति मम मतम्",
    vibhaktiNotes: [ "भारत → सम्बोधन", "सर्वक्षेत्रेषु → सप्तमी बहुवचन (locative of domain)", "क्षेत्रक्षेत्रज्ञयोः → षष्ठी द्विवचन (\"of the two\")" ],
    keyFights: [ "विद्धि is लोट् 2sg of √विद् — \"know!\"", "मतम् = past passive participle of √मन् used as neuter noun (\"my view\")" ] ,
    vyakhya: [ { title: "Dual genitive के two", body: "क्षेत्रक्षेत्रज्ञयोः is a dvandva compound in षष्ठी द्विवचन — literally \"of (the two) field-and-knower\". The dual ending -योः signals exactly two referents." } ]
  },
  '13.4': {
    anvaya: "तत् क्षेत्रं यत् च, यादृक् च, यद्विकारि, यतः च यत्, सः च यः, यत्प्रभावः च — तत् समासेन मे शृणु",
    vibhaktiNotes: [ "तत् क्षेत्रम् → प्रथमा (topic)", "समासेन → तृतीया (\"in brief\" — adverbial instrumental)", "मे → षष्ठी/चतुर्थी enclitic (\"from me\")" ],
    keyFights: [ "Six interrogative-relative pronouns stacked — यत्, यादृक्, यद्विकारि, यतः, यः, यत्प्रभावः", "शृणु is लोट् 2sg of √श्रु" ],
    vyakhya: [ { title: "Catalogue by relatives", body: "Sanskrit lists topics-to-be-explained by piling यत्/यादृक्-clauses, then closes with the imperative. Each yat- pronoun previews one question the next verses will answer." } ]
  },
  '13.5': {
    anvaya: "ऋषिभिः बहुधा गीतम्, छन्दोभिः विविधैः पृथक्, ब्रह्मसूत्रपदैः च एव हेतुमद्भिः विनिश्चितैः (गीतम्)",
    vibhaktiNotes: [ "ऋषिभिः, छन्दोभिः, ब्रह्मसूत्रपदैः → तृतीया बहुवचन (agents/instruments of singing)", "विविधैः, हेतुमद्भिः, विनिश्चितैः → तृतीया बहुवचन adjectives agreeing" ],
    keyFights: [ "गीतम् is past passive participle (कृदन्त) — \"has been sung\", not a finite verb", "बहुधा, पृथक् → indeclinable adverbs" ],
    vyakhya: [ { title: "PPP as anchor", body: "When no finite verb appears, a PPP like गीतम् + तृतीया-agent forms a complete passive sentence: \"It has been sung by the seers.\"" } ]
  },
  '13.6': {
    anvaya: "महाभूतानि, अहङ्कारः, बुद्धिः, अव्यक्तम् एव च, इन्द्रियाणि दशैकं च, पञ्च च इन्द्रियगोचराः",
    vibhaktiNotes: [ "All listed items → प्रथमा (nominative enumeration)", "इन्द्रियाणि दश + एकम् → \"ten and one\" = the eleven (10 senses + manas)" ],
    keyFights: [ "Verb-less list — implicit (सन्ति) \"are\"", "इन्द्रियगोचराः = षष्ठी तत्पुरुष (\"ranges of the senses\")" ],
    vyakhya: [ { title: "Sāṅkhya enumeration as nominative dump", body: "The verse simply lists the constituents of the kṣetra in प्रथमा with no finite verb — Sanskrit's compressed way of giving an inventory." } ]
  },
  '13.7': {
    anvaya: "इच्छा, द्वेषः, सुखम्, दुःखम्, सङ्घातः, चेतना, धृतिः — एतत् क्षेत्रं समासेन सविकारम् उदाहृतम्",
    vibhaktiNotes: [ "All listed feelings → प्रथमा एकवचन", "एतत् क्षेत्रम्, सविकारम् → प्रथमा predicate", "समासेन → तृतीया (adverbial)" ],
    keyFights: [ "उदाहृतम् = PPP of उद् + आ + √हृ — \"has been described\"", "सविकारम् = सह विकारैः (बहुव्रीहि or adverb)" ],
    vyakhya: [ { title: "Field includes feelings", body: "The kṣetra is not just material — desire, hate, pleasure, pain are themselves listed as \"field\" components, locating affect in prakṛti rather than the knower." } ]
  },
  '13.8': {
    anvaya: "अमानित्वम्, अदम्भित्वम्, अहिंसा, क्षान्तिः, आर्जवम्, आचार्योपासनम्, शौचम्, स्थैर्यम्, आत्मविनिग्रहः",
    vibhaktiNotes: [ "All items → प्रथमा एकवचन (subject of an implied predicate \"is jñāna\" continued in 13.11)" ],
    keyFights: [ "Verb-less catalogue running over multiple verses — finite verb (प्रोक्तम्) appears at 13.11", "आचार्योपासनम् = षष्ठी तत्पुरुष (\"service of the teacher\")" ],
    vyakhya: [ { title: "Long predicate awaits", body: "Verses 13.7–13.11 form one syntactic unit: a long subject-list whose predicate (\"this is called knowledge\") only arrives at 13.11." } ]
  },
  '13.9': {
    anvaya: "इन्द्रियार्थेषु वैराग्यम्, अनहङ्कारः एव च, जन्ममृत्युजराव्याधिदुःखदोषानुदर्शनम्",
    vibhaktiNotes: [ "इन्द्रियार्थेषु → सप्तमी बहुवचन (locative \"toward sense-objects\")", "Other items → प्रथमा" ],
    keyFights: [ "जन्ममृत्युजराव्याधिदुःखदोषानुदर्शनम् — six-member द्वन्द्व compounded with अनुदर्शन (gerund-noun)", "Compound depth is the fight here" ],
    vyakhya: [ { title: "Long compound parsing", body: "Long कर्मधारय/तत्पुरुष chains read left-to-right: (birth-death-age-disease)-pain-fault + perceiving = \"perceiving the suffering-defects of birth-death-age-disease\"." } ]
  },
  '13.10': {
    anvaya: "असक्तिः, पुत्रदारगृहादिषु अनभिष्वङ्गः, इष्टानिष्टोपपत्तिषु नित्यं समचित्तत्वं च",
    vibhaktiNotes: [ "पुत्रदारगृहादिषु, इष्टानिष्टोपपत्तिषु → सप्तमी बहुवचन (\"toward/in\")", "Items → प्रथमा" ],
    keyFights: [ "नित्यम् → adverb", "समचित्तत्वम् = abstract noun via -त्व suffix" ],
    vyakhya: [ { title: "Locative of relation", body: "सप्तमी here marks the domain over which (non-)attachment operates — \"non-clinging WITH-RESPECT-TO sons, wives, homes\"." } ]
  },
  '13.11': {
    anvaya: "मयि च अनन्ययोगेन अव्यभिचारिणी भक्तिः, विविक्तदेशसेवित्वम्, जनसंसदि अरतिः",
    vibhaktiNotes: [ "मयि → सप्तमी (locative of object of devotion)", "अनन्ययोगेन → तृतीया (instrumental — \"by\")", "जनसंसदि → सप्तमी" ],
    keyFights: [ "अव्यभिचारिणी = feminine participle agreeing with भक्तिः", "सेवित्वम् = -त्व abstract from agent noun सेविन्" ],
    vyakhya: [ { title: "Locative of devotion", body: "मयि (in/toward me) is the standard सप्तमी for the object of devotion — भक्तिः always takes locative for whom devotion is directed at." } ]
  },
  '13.12': {
    anvaya: "अध्यात्मज्ञाननित्यत्वम्, तत्त्वज्ञानार्थदर्शनम् — एतत् ज्ञानम् इति प्रोक्तम्; अतः अन्यथा अज्ञानं (भवति)",
    vibhaktiNotes: [ "एतत् ज्ञानम् → प्रथमा (the predicate finally arrives)", "अतः अन्यथा → adverbial (\"otherwise than this\")" ],
    keyFights: [ "प्रोक्तम् = PPP of प्र + √वच् — the long-awaited finite-equivalent", "इति marks the close of the long subject-list begun at 13.7" ],
    vyakhya: [ { title: "The predicate arrives", body: "After four verses of subject-list (7–10), 13.11 finally supplies the predicate: एतत् ज्ञानम् प्रोक्तम् — \"all that has been called knowledge.\"" } ]
  },
  '13.13': {
    anvaya: "यत् ज्ञेयं तत् प्रवक्ष्यामि, यत् ज्ञात्वा अमृतम् अश्नुते; अनादिमत् परं ब्रह्म, न सत् न असत् च उच्यते",
    vibhaktiNotes: [ "यत्, तत् → प्रथमा (relative correlation)", "अमृतम् → द्वितीया (object of अश्नुते)" ],
    keyFights: [ "प्रवक्ष्यामि → लृट् (future) — note the -ष्य- infix", "ज्ञात्वा → absolutive (\"having known\")", "अश्नुते → लट् 3sg of √अश् (Ā) — \"attains\"" ],
    vyakhya: [ { title: "Future-tense promise", body: "प्र + वक्ष्यामि shows लृट् with the characteristic -ष्य- — \"I shall declare.\" Krishna marks the discourse shift from describing kṣetra to describing the supreme jñeya." } ]
  },
  '13.14': {
    anvaya: "तत् सर्वतः पाणिपादम्, सर्वतः अक्षिशिरोमुखम्, सर्वतः श्रुतिमत् लोके सर्वम् आवृत्य तिष्ठति",
    vibhaktiNotes: [ "लोके → सप्तमी", "सर्वम् → द्वितीया (object of आवृत्य)" ],
    keyFights: [ "आवृत्य → absolutive of आ + √वृ (\"having enveloped\")", "तिष्ठति → लट् 3sg of √स्था" ],
    vyakhya: [ { title: "Bahuvrīhi pile-up", body: "पाणिपादम्, अक्षिशिरोमुखम्, श्रुतिमत् are all bahuvrīhis describing तत् — \"that-which-has hands-and-feet everywhere\"." } ]
  },
  '13.15': {
    anvaya: "सर्वेन्द्रियगुणाभासम्, सर्वेन्द्रियविवर्जितम्, असक्तं सर्वभृत् च एव, निर्गुणं गुणभोक्तृ च (तत्)",
    vibhaktiNotes: [ "All adjectives → प्रथमा एकवचन (predicates of तत्)" ],
    keyFights: [ "Paradox-stack: has-the-qualities-of-all-senses YET sense-less; without-attachment YET supporting-all", "विवर्जितम्, असक्तम् → PPPs functioning adjectivally" ],
    vyakhya: [ { title: "Paradox by juxtaposition", body: "Sanskrit drops connectives — paradox is shown by simply placing X and not-X in the same verse, both agreeing with the same subject." } ]
  },
  '13.16': {
    anvaya: "भूतानां बहिः अन्तः च, अचरं चरम् एव च, सूक्ष्मत्वात् तत् अविज्ञेयम्, दूरस्थं च अन्तिके च (तत्)",
    vibhaktiNotes: [ "भूतानाम् → षष्ठी बहुवचन (\"of beings\")", "सूक्ष्मत्वात् → पञ्चमी (ablative of cause — \"because of subtlety\")" ],
    keyFights: [ "पञ्चमी of cause: -त्वात् ending = \"because of being X\"", "अविज्ञेयम् = potential passive participle (-य)" ],
    vyakhya: [ { title: "Ablative of cause", body: "सूक्ष्मत्वात् uses पञ्चमी to give a reason: \"because of (its) subtlety, that is unknowable.\" The -त्वात् ending is a frequent Sanskrit way of saying \"due to being X\"." } ]
  },
  '13.17': {
    anvaya: "अविभक्तं च भूतेषु विभक्तम् इव च स्थितम्, भूतभर्तृ च तत् ज्ञेयम्, ग्रसिष्णु प्रभविष्णु च",
    vibhaktiNotes: [ "भूतेषु → सप्तमी बहुवचन", "तत् ज्ञेयम् → प्रथमा (potential PP — \"to be known\")" ],
    keyFights: [ "इव = simile particle (\"as if\")", "ग्रसिष्णु, प्रभविष्णु = -इष्णु tendency-suffix" ],
    vyakhya: [ { title: "-इष्णु suffix", body: "The -इष्णु formation marks habitual tendency: ग्रसिष्णु = \"one prone to devour\". A rare but elegant nominal pattern." } ]
  },
  '13.18': {
    anvaya: "तत् ज्योतिषाम् अपि तत् ज्योतिः, तमसः परम् उच्यते; ज्ञानं ज्ञेयं ज्ञानगम्यं सर्वस्य हृदि विष्ठितम्",
    vibhaktiNotes: [ "ज्योतिषाम् → षष्ठी बहुवचन (\"of lights\")", "तमसः → पञ्चमी (\"beyond darkness\")", "हृदि → सप्तमी (\"in the heart\")", "सर्वस्य → षष्ठी (\"of everyone\")" ],
    keyFights: [ "उच्यते → passive लट् of √वच्", "विष्ठितम् → PPP of वि + √स्था" ],
    vyakhya: [ { title: "Triple identification", body: "ज्ञानं ज्ञेयं ज्ञानगम्यम् — three roles around one root √ज्ञा. The supreme is simultaneously the knowing, the to-be-known, and the goal of knowledge." } ]
  },
  '13.19': {
    anvaya: "इति क्षेत्रं तथा ज्ञानं ज्ञेयं च समासतः उक्तम्; मद्भक्तः एतत् विज्ञाय मद्भावाय उपपद्यते",
    vibhaktiNotes: [ "मद्भावाय → चतुर्थी (dative of purpose — \"toward my state\")", "एतत् → द्वितीया (object of विज्ञाय)" ],
    keyFights: [ "विज्ञाय → absolutive (\"having understood\")", "उक्तम् → PPP serving as the only finite verb of the first half" ],
    vyakhya: [ { title: "Dative of purpose", body: "मद्भावाय shows चतुर्थी for goal: \"becomes fit FOR my state.\" Dative naturally encodes the toward-which of action." } ]
  },
  '13.20': {
    anvaya: "प्रकृतिं पुरुषं च एव विद्धि उभौ अपि अनादी; विकारान् च गुणान् च एव विद्धि प्रकृतिसम्भवान्",
    vibhaktiNotes: [ "प्रकृतिम्, पुरुषम् → द्वितीया (objects of विद्धि)", "विकारान्, गुणान् → द्वितीया बहुवचन" ],
    keyFights: [ "विद्धि → लोट् 2sg of √विद् (\"know!\")", "उभौ → द्विवचन (\"both two\")" ],
    vyakhya: [ { title: "Dual उभौ", body: "उभौ is dual: \"the two of them.\" Sanskrit's three-vacana system reserves dual for natural pairs — and here the prakṛti-puruṣa pair gets exactly that grammatical recognition." } ]
  },
  '13.21': {
    anvaya: "कार्यकारणकर्तृत्वे प्रकृतिः हेतुः उच्यते; पुरुषः सुखदुःखानां भोक्तृत्वे हेतुः उच्यते",
    vibhaktiNotes: [ "कार्यकारणकर्तृत्वे, भोक्तृत्वे → सप्तमी (locative of domain)", "सुखदुःखानाम् → षष्ठी बहुवचन" ],
    keyFights: [ "उच्यते repeated → passive लट्", "-त्व abstract nouns: कर्तृत्व, भोक्तृत्व" ],
    vyakhya: [ { title: "Two domains, two causes", body: "Locative -त्वे = \"in the matter of being-X\". The verse cleanly assigns prakṛti to the agency-domain and puruṣa to the experience-domain." } ]
  },
  '13.22': {
    anvaya: "पुरुषः प्रकृतिस्थः हि प्रकृतिजान् गुणान् भुङ्क्ते; गुणसङ्गः अस्य सद्-असद्-योनिजन्मसु कारणम्",
    vibhaktiNotes: [ "गुणान् → द्वितीया (object of भुङ्क्ते)", "अस्य → षष्ठी (\"his\")", "योनिजन्मसु → सप्तमी बहुवचन" ],
    keyFights: [ "भुङ्क्ते → लट् 3sg ātmanepada of √भुज्", "प्रकृतिस्थः, प्रकृतिजान् → compound adjectives" ],
    vyakhya: [ { title: "Cause located in attachment", body: "The verse names सङ्ग as the कारण — attachment-to-guṇas, not the guṇas themselves, drives rebirth in good or bad wombs." } ]
  },
  '13.23': {
    anvaya: "उपद्रष्टा अनुमन्ता च भर्ता भोक्ता महेश्वरः; परमात्मा इति च अपि उक्तः, देहे अस्मिन् पुरुषः परः",
    vibhaktiNotes: [ "देहे अस्मिन् → सप्तमी (\"in this body\")", "All epithets → प्रथमा" ],
    keyFights: [ "Five agent-noun epithets: -तृ stems (द्रष्टृ, मन्तृ, भर्तृ, भोक्तृ)", "उक्तः → PPP \"called\"" ],
    vyakhya: [ { title: "Agent-noun stack", body: "-तृ agent-nouns are Sanskrit's compact way of naming roles. Five stacked here describe the single supreme: witness, consenter, sustainer, enjoyer, lord." } ]
  },
  '13.24': {
    anvaya: "यः एवं पुरुषं प्रकृतिं च गुणैः सह वेत्ति, सर्वथा वर्तमानः अपि सः न भूयः अभिजायते",
    vibhaktiNotes: [ "गुणैः सह → तृतीया + सह (\"together with\")", "सर्वथा → adverb" ],
    keyFights: [ "वर्तमानः → present participle of √वृत् (\"abiding\")", "अभिजायते → लट् 3sg of अभि + √जन्" ],
    vyakhya: [ { title: "सह + तृतीया", body: "\"Together with\" requires तृतीया + सह — a fixed instrumental-postposition pattern that's distinct from plain instrumental." } ]
  },
  '13.25': {
    anvaya: "केचित् ध्यानेन आत्मना आत्मनि आत्मानं पश्यन्ति; अन्ये साङ्ख्येन योगेन, अन्ये कर्मयोगेन (पश्यन्ति)",
    vibhaktiNotes: [ "ध्यानेन, साङ्ख्येन योगेन, कर्मयोगेन → तृतीया (means)", "आत्मनि → सप्तमी (\"in the self\")", "आत्मना → तृतीया (\"by the self\")", "आत्मानम् → द्वितीया (object)" ],
    keyFights: [ "Triple आत्मन् in three different cases — same word, three roles", "पश्यन्ति → लट् 3pl of √दृश्" ],
    vyakhya: [ { title: "One word, three cases", body: "आत्मना (instrumental — by) + आत्मनि (locative — in) + आत्मानम् (accusative — sees) shows how Sanskrit packs subject-instrument-locus-object into one root by case alone." } ]
  },
  '13.26': {
    anvaya: "अन्ये तु एवम् अजानन्तः अन्येभ्यः श्रुत्वा उपासते; ते अपि श्रुतिपरायणाः मृत्युं अति-तरन्ति",
    vibhaktiNotes: [ "अन्येभ्यः → पञ्चमी (\"from others\")", "मृत्युम् → द्वितीया (\"death\")" ],
    keyFights: [ "अजानन्तः → present participle negated by अ-", "श्रुत्वा → absolutive", "उपासते → लट् 3pl Ā", "अतितरन्ति → लट् 3pl of अति + √तृ" ],
    vyakhya: [ { title: "Ablative of source", body: "अन्येभ्यः शृणोति — पञ्चमी for source-from-which one hears. Hearing-from is consistently ablative." } ]
  },
  '13.27': {
    anvaya: "भारतर्षभ, यावत् किञ्चित् सत्त्वं स्थावरं जङ्गमं वा सञ्जायते, तत् क्षेत्रक्षेत्रज्ञसंयोगात् (सञ्जायते) इति विद्धि",
    vibhaktiNotes: [ "भारतर्षभ → सम्बोधन", "क्षेत्रक्षेत्रज्ञसंयोगात् → पञ्चमी (ablative of source)" ],
    keyFights: [ "सञ्जायते → passive-like middle, लट् 3sg", "यावत्...तावत् correlative pair (तावत् implicit)" ],
    vyakhya: [ { title: "Ablative of origin", body: "X-संयोगात् = \"from the union of X\". Origin and source naturally take पञ्चमी; here the union itself is the source-of-being for every born thing." } ]
  },
  '13.28': {
    anvaya: "यः समं सर्वेषु भूतेषु तिष्ठन्तं परमेश्वरं विनश्यत्सु अविनश्यन्तं पश्यति, सः (एव) पश्यति",
    vibhaktiNotes: [ "सर्वेषु भूतेषु → सप्तमी बहुवचन", "विनश्यत्सु → सप्तमी बहुवचन (locative of present participle — \"in/among the perishing\")" ],
    keyFights: [ "तिष्ठन्तम्, अविनश्यन्तम् → present participles in द्वितीया (objects of पश्यति)", "Locative absolute hint with विनश्यत्सु" ],
    vyakhya: [ { title: "Participles as objects", body: "तिष्ठन्तम् (\"abiding\") and अविनश्यन्तम् (\"non-perishing\") are -अत् participles declined like nouns and serving as accusative objects of पश्यति." } ]
  },
  '13.29': {
    anvaya: "समं सर्वत्र अवस्थितम् ईश्वरं पश्यन्, हि सः आत्मना आत्मानं न हिनस्ति; ततः परां गतिं याति",
    vibhaktiNotes: [ "आत्मना → तृतीया (instrumental — by)", "आत्मानम् → द्वितीया (object — the self)", "परां गतिम् → द्वितीया (goal of याति)" ],
    keyFights: [ "पश्यन् → present participle (\"seeing\") qualifying the subject", "हिनस्ति → लट् 3sg of √हिंस्", "याति → लट् 3sg of √या" ],
    vyakhya: [ { title: "Self by self upon self", body: "आत्मना आत्मानं हिनस्ति — same word, two cases, one verb: instrumental-of-agent and accusative-of-patient. Sanskrit's reflexive elegance." } ]
  },
  '13.30': {
    anvaya: "यः च प्रकृत्या एव क्रियमाणानि कर्माणि सर्वशः पश्यति, तथा आत्मानम् अकर्तारं (पश्यति), सः (एव) पश्यति",
    vibhaktiNotes: [ "प्रकृत्या → तृतीया (instrumental of agent — \"by prakṛti\")", "कर्माणि → द्वितीया बहुवचन" ],
    keyFights: [ "क्रियमाणानि → present passive participle (\"being done\")", "अकर्तारम् → द्वितीया of अकर्तृ (\"as non-doer\")" ],
    vyakhya: [ { title: "Passive participle", body: "क्रियमाण- = present passive of √कृ — \"being-done\". The -मान- ending marks ongoing passive action, agreeing with कर्माणि as adjective." } ]
  },
  '13.31': {
    anvaya: "यदा भूतपृथग्भावम् एकस्थम् अनुपश्यति, ततः एव च विस्तारं (अनुपश्यति), तदा ब्रह्म सम्पद्यते",
    vibhaktiNotes: [ "भूतपृथग्भावम्, विस्तारम् → द्वितीया (objects)", "ततः → पञ्चमी (\"from that\")" ],
    keyFights: [ "यदा...तदा correlative", "सम्पद्यते → लट् 3sg Ā of सम् + √पद् (\"attains\")" ],
    vyakhya: [ { title: "Temporal correlation", body: "यदा (when) — तदा (then) is Sanskrit's temporal correlative pair. The verse hinges on this when/then frame." } ]
  },
  '13.32': {
    anvaya: "कौन्तेय, अनादित्वात् निर्गुणत्वात् अयं परमात्मा अव्ययः, शरीरस्थः अपि न करोति न लिप्यते",
    vibhaktiNotes: [ "अनादित्वात्, निर्गुणत्वात् → पञ्चमी (cause)", "कौन्तेय → सम्बोधन" ],
    keyFights: [ "Two ablatives of cause stacked: \"because beginningless, because guṇa-less\"", "करोति, लिप्यते → finite verbs (act, is-stained)" ],
    vyakhya: [ { title: "Stacked ablatives of cause", body: "Multiple -त्वात् ablatives in series give a chain of reasons: \"because-X, because-Y, therefore Z.\"" } ]
  },
  '13.33': {
    anvaya: "यथा सर्वगतं सौक्ष्म्यात् आकाशं न उपलिप्यते, तथा देहे सर्वत्र अवस्थितः आत्मा न उपलिप्यते",
    vibhaktiNotes: [ "सौक्ष्म्यात् → पञ्चमी (cause — \"because of subtlety\")", "देहे → सप्तमी" ],
    keyFights: [ "यथा...तथा simile pair", "उपलिप्यते → passive लट् of उप + √लिप्" ],
    vyakhya: [ { title: "Yathā-tathā simile", body: "यथा (just as) — तथा (so) is the standard Sanskrit simile frame. Both clauses share grammatical structure for didactic clarity." } ]
  },
  '13.34': {
    anvaya: "भारत, यथा एकः सूर्यः कृत्स्नं इमं लोकं प्रकाशयति, तथा क्षेत्री कृत्स्नं क्षेत्रं प्रकाशयति",
    vibhaktiNotes: [ "इमं लोकम्, कृत्स्नम् क्षेत्रम् → द्वितीया (objects)", "भारत → सम्बोधन" ],
    keyFights: [ "क्षेत्री = क्षेत्रिन् in प्रथमा (\"the field-owner\")", "प्रकाशयति → लट् causative of प्र + √काश्" ],
    vyakhya: [ { title: "-इन् possessor stem", body: "क्षेत्रिन् (\"having a field\") becomes क्षेत्री in nom.sg. — possessor-suffix that converts a noun to \"one-who-has-X\"." } ]
  },
  '13.35': {
    anvaya: "एवं ये क्षेत्रक्षेत्रज्ञयोः अन्तरं ज्ञानचक्षुषा (पश्यन्ति), भूतप्रकृतिमोक्षं च (पश्यन्ति), ते परम् यान्ति",
    vibhaktiNotes: [ "ज्ञानचक्षुषा → तृतीया (instrumental — \"with the eye of knowledge\")", "क्षेत्रक्षेत्रज्ञयोः → षष्ठी द्विवचन", "परम् → द्वितीया (goal)" ],
    keyFights: [ "Implied पश्यन्ति governs two द्वितीया objects", "यान्ति → लट् 3pl of √या" ],
    vyakhya: [ { title: "Instrumental of organ", body: "Instruments-of-perception take तृतीया: चक्षुषा (with the eye), श्रोत्रेण (with the ear). Here ज्ञानचक्षुषा is the inner organ of insight." } ]
  },

  // ── Chapter 14 — Guṇa-Traya Vibhāga Yoga ────────────────────────────
  '14.1': {
    anvaya: "परं ज्ञानानां ज्ञानम् उत्तमं भूयः प्रवक्ष्यामि, यत् ज्ञात्वा सर्वे मुनयः इतः परां सिद्धिं गताः",
    vibhaktiNotes: [ "ज्ञानानाम् → षष्ठी बहुवचन (\"of knowledges\")", "परां सिद्धिम् → द्वितीया (goal)", "इतः → ablative-adverb (\"from here\")" ],
    keyFights: [ "प्रवक्ष्यामि → लृट् (-ष्य- future)", "ज्ञात्वा → absolutive", "गताः → PPP serving as past finite (\"have gone\")" ],
    vyakhya: [ { title: "Superlative by षष्ठी", body: "ज्ञानानां ज्ञानम् = \"the knowledge of knowledges\" — Sanskrit's standard way of forming superlatives via genitive partitive." } ]
  },
  '14.2': {
    anvaya: "इदं ज्ञानम् उपाश्रित्य मम साधर्म्यम् आगताः, सर्गे अपि न उपजायन्ते, प्रलये न च व्यथन्ति",
    vibhaktiNotes: [ "इदं ज्ञानम् → द्वितीया (object of उपाश्रित्य)", "मम साधर्म्यम् → द्वितीया", "सर्गे, प्रलये → सप्तमी (\"at creation, at dissolution\")" ],
    keyFights: [ "उपाश्रित्य → absolutive (\"having taken refuge\")", "उपजायन्ते, व्यथन्ति → लट् 3pl" ],
    vyakhya: [ { title: "Locative of time", body: "सर्गे, प्रलये use सप्तमी to mark temporal locus — \"at the time of creation/dissolution.\"" } ]
  },
  '14.3': {
    anvaya: "भारत, मम योनिः महद् ब्रह्म, तस्मिन् अहं गर्भं दधामि; ततः सर्वभूतानां सम्भवः भवति",
    vibhaktiNotes: [ "तस्मिन् → सप्तमी (\"in that\")", "गर्भम् → द्वितीया", "सर्वभूतानाम् → षष्ठी बहुवचन" ],
    keyFights: [ "दधामि → लट् 1sg of √धा", "भवति → लट् 3sg of √भू" ],
    vyakhya: [ { title: "First-person finite", body: "दधामि is reduplicated present 1sg of √धा — \"I place.\" Krishna shifts to first-person agency to mark the cosmogonic claim." } ]
  },
  '14.4': {
    anvaya: "कौन्तेय, सर्वयोनिषु याः मूर्तयः सम्भवन्ति, तासां ब्रह्म महत् योनिः, अहं बीजप्रदः पिता (अस्मि)",
    vibhaktiNotes: [ "सर्वयोनिषु → सप्तमी बहुवचन", "तासाम् → षष्ठी बहुवचन feminine (\"of those\")" ],
    keyFights: [ "Relative-correlative याः...तासाम्", "सम्भवन्ति → लट् 3pl" ],
    vyakhya: [ { title: "Yā-tā agreement", body: "Relative pronouns must match antecedents in gender-number; मूर्तयः (f.pl) governs याः...तासाम् in feminine plural throughout." } ]
  },
  '14.5': {
    anvaya: "महाबाहो, सत्त्वं रजः तमः इति प्रकृतिसम्भवाः गुणाः अव्ययम् देहिनं देहे निबध्नन्ति",
    vibhaktiNotes: [ "देहिनम् → द्वितीया (object of निबध्नन्ति)", "देहे → सप्तमी", "महाबाहो → सम्बोधन" ],
    keyFights: [ "निबध्नन्ति → लट् 3pl of नि + √बन्ध्", "इति marks the named items" ],
    vyakhya: [ { title: "Three subjects, one verb", body: "Sattva-rajas-tamas function as a plural compound subject — three items but treated as one nominal group with a 3pl verb." } ]
  },
  '14.6': {
    anvaya: "अनघ, तत्र सत्त्वं निर्मलत्वात् प्रकाशकम् अनामयम्; सुखसङ्गेन ज्ञानसङ्गेन च बध्नाति",
    vibhaktiNotes: [ "अनघ → सम्बोधन", "निर्मलत्वात् → पञ्चमी (cause)", "सुखसङ्गेन, ज्ञानसङ्गेन → तृतीया (instrument)" ],
    keyFights: [ "बध्नाति → लट् 3sg of √बन्ध्", "Two तृतीया instrumentals telling HOW it binds" ],
    vyakhya: [ { title: "Instrumental of means-of-binding", body: "X-सङ्गेन बध्नाति = \"binds by means of attachment-to-X.\" तृतीया cleanly marks the binding instrument." } ]
  },
  '14.7': {
    anvaya: "कौन्तेय, रजः रागात्मकं विद्धि, तृष्णासङ्गसमुद्भवम्; तत् देहिनं कर्मसङ्गेन निबध्नाति",
    vibhaktiNotes: [ "रजः → द्वितीया (object of विद्धि)", "देहिनम् → द्वितीया", "कर्मसङ्गेन → तृतीया" ],
    keyFights: [ "विद्धि — recurring imperative \"know!\"", "रागात्मकम्, तृष्णासङ्गसमुद्भवम् → predicate adjectives" ],
    vyakhya: [ { title: "Atmaka suffix", body: "रागात्मक- = \"having-the-self-of-passion\". The -आत्मक suffix turns a noun into an adjective meaning \"of-the-nature-of-X\"." } ]
  },
  '14.8': {
    anvaya: "भारत, अज्ञानजं तु तमः सर्वदेहिनां मोहनं विद्धि; तत् प्रमादालस्यनिद्राभिः देहिनं निबध्नाति",
    vibhaktiNotes: [ "तमः → द्वितीया (object of विद्धि)", "सर्वदेहिनाम् → षष्ठी बहुवचन", "प्रमादालस्यनिद्राभिः → तृतीया बहुवचन" ],
    keyFights: [ "Three तृतीया instrumental nouns of binding", "अज्ञानजम्, मोहनम् → predicate adjectives in द्वितीया" ],
    vyakhya: [ { title: "-ज- birth-suffix", body: "X-ज = \"born of X\". अज्ञानजम् = \"born of ignorance\". Hugely productive across Sanskrit." } ]
  },
  '14.9': {
    anvaya: "भारत, सत्त्वं सुखे सञ्जयति, रजः कर्मणि (सञ्जयति); तु तमः ज्ञानम् आवृत्य प्रमादे सञ्जयति",
    vibhaktiNotes: [ "सुखे, कर्मणि, प्रमादे → सप्तमी (locative of attachment-locus)", "ज्ञानम् → द्वितीया (object of आवृत्य)" ],
    keyFights: [ "सञ्जयति → causative लट् of सम् + √जन् (\"makes-attached\")", "आवृत्य → absolutive (\"having covered\")" ],
    vyakhya: [ { title: "Locative of attachment", body: "सप्तमी marks the domain of attachment — \"binds-IN sukha, IN karma, IN heedlessness.\" Mirroring the binding domains of the three guṇas." } ]
  },
  '14.10': {
    anvaya: "भारत, रजःतमसी अभिभूय सत्त्वं भवति; तथा सत्त्वतमसी अभिभूय रजः, सत्त्वरजसी अभिभूय तमः च",
    vibhaktiNotes: [ "रजःतमसी, सत्त्वतमसी, सत्त्वरजसी → द्वितीया द्विवचन (\"the two of...\")", "Subject in प्रथमा एकवचन" ],
    keyFights: [ "अभिभूय → absolutive (\"having overcome\")", "द्विवचन three times — pairs are explicit" ],
    vyakhya: [ { title: "Dual everywhere", body: "Each guṇa overcomes \"the other two\" — and Sanskrit marks \"the other two\" with द्विवचन dvandva. The dual ending tells you exactly two." } ]
  },
  '14.11': {
    anvaya: "यदा अस्मिन् देहे सर्वद्वारेषु प्रकाशः ज्ञानम् उपजायते, तदा (विद्यात्) सत्त्वम् इति विवृद्धम् (अस्ति)",
    vibhaktiNotes: [ "अस्मिन् देहे → सप्तमी", "सर्वद्वारेषु → सप्तमी बहुवचन" ],
    keyFights: [ "उपजायते → लट् 3sg Ā", "विवृद्धम् → PPP" ],
    vyakhya: [ { title: "All-gates locative", body: "सर्वद्वारेषु = locative of \"every gate\" — the senses as gateways through which sattva-light pours out." } ]
  },
  '14.12': {
    anvaya: "भरतर्षभ, रजसि विवृद्धे लोभः प्रवृत्तिः कर्मणाम् आरम्भः अशमः स्पृहा (एते) जायन्ते",
    vibhaktiNotes: [ "रजसि विवृद्धे → सप्तमी absolute (\"when rajas has grown\")", "कर्मणाम् → षष्ठी बहुवचन" ],
    keyFights: [ "Locative absolute construction — सप्तमी noun + सप्तमी participle = \"when X is/has-become Y\"", "जायन्ते → लट् 3pl Ā" ],
    vyakhya: [ { title: "Locative absolute", body: "रजसि विवृद्धे = \"when rajas has grown\" — both noun and participle in सप्तमी, the standard Sanskrit \"when-X-has-Y'd\" construction." } ]
  },
  '14.13': {
    anvaya: "कुरुनन्दन, तमसि विवृद्धे अप्रकाशः अप्रवृत्तिः प्रमादः मोहः च एव (एते) जायन्ते",
    vibhaktiNotes: [ "तमसि विवृद्धे → सप्तमी absolute (parallel to 14.12)", "कुरुनन्दन → सम्बोधन" ],
    keyFights: [ "Same locative-absolute pattern as 14.12", "Negation by अ- prefix: अप्रकाश, अप्रवृत्ति" ],
    vyakhya: [ { title: "Pattern repetition", body: "14.11–14.13 use the same locative-absolute frame — when-X-has-grown — to give parallel diagnostic signs of each guṇa." } ]
  },
  '14.14': {
    anvaya: "यदा सत्त्वे प्रवृद्धे देहभृत् प्रलयं याति, तदा उत्तमविदां अमलान् लोकान् प्रतिपद्यते",
    vibhaktiNotes: [ "सत्त्वे प्रवृद्धे → सप्तमी absolute", "उत्तमविदाम् → षष्ठी बहुवचन (\"of the highest knowers\")", "लोकान् → द्वितीया" ],
    keyFights: [ "याति, प्रतिपद्यते → लट् finites", "देहभृत् = compound \"body-bearer\" = embodied one" ],
    vyakhya: [ { title: "Genitive of relation", body: "उत्तमविदाम् लोकान् = \"worlds of-those-who-know-the-highest\" — षष्ठी links the worlds to their inhabitants." } ]
  },
  '14.15': {
    anvaya: "रजसि प्रलयं गत्वा कर्मसङ्गिषु जायते; तथा तमसि प्रलीनः मूढयोनिषु जायते",
    vibhaktiNotes: [ "रजसि, तमसि → सप्तमी (locative of dissolution-state)", "कर्मसङ्गिषु, मूढयोनिषु → सप्तमी बहुवचन (locative of birth)" ],
    keyFights: [ "गत्वा → absolutive of √गम्", "प्रलीनः → PPP of प्र + √ली" ],
    vyakhya: [ { title: "Locative of birth-context", body: "जायते takes सप्तमी for where one is born — \"in the wombs of...\" The same case marks both dissolution-state and birth-locus." } ]
  },
  '14.16': {
    anvaya: "सात्त्विकं कर्मणः सुकृतस्य फलं निर्मलम् आहुः, राजसस्य तु फलं दुःखम्, तामसस्य फलम् अज्ञानम्",
    vibhaktiNotes: [ "कर्मणः सुकृतस्य → षष्ठी (\"of well-done action\")", "राजसस्य, तामसस्य → षष्ठी" ],
    keyFights: [ "आहुः → perfect-ish 3pl of √अह् (\"they say\")", "Three फलम् → प्रथमा (subjects of implied \"is\")" ],
    vyakhya: [ { title: "आहुः as evidential", body: "आहुः = \"they say / it is said\". Sanskrit uses this old form to introduce traditional ascriptions without naming a speaker." } ]
  },
  '14.17': {
    anvaya: "सत्त्वात् ज्ञानम् सञ्जायते, रजसः लोभः एव च; तमसः प्रमादमोहौ अज्ञानम् एव च भवति",
    vibhaktiNotes: [ "सत्त्वात्, रजसः, तमसः → पञ्चमी (ablative of source)" ],
    keyFights: [ "Three पञ्चमी ablatives — \"from sattva, from rajas, from tamas\"", "सञ्जायते, भवति → लट्" ],
    vyakhya: [ { title: "Ablative of source repeated", body: "Three sources, three ablatives, three sets of products. The verse is structurally a function-table written in case." } ]
  },
  '14.18': {
    anvaya: "सत्त्वस्थाः ऊर्ध्वं गच्छन्ति, राजसाः मध्ये तिष्ठन्ति, जघन्यगुणवृत्तिस्थाः तामसाः अधः गच्छन्ति",
    vibhaktiNotes: [ "ऊर्ध्वम्, मध्ये, अधः → adverbial directions", "Three subject groups → प्रथमा बहुवचन" ],
    keyFights: [ "गच्छन्ति, तिष्ठन्ति → लट् 3pl", "Stem-compounds: सत्त्वस्थ, राजस, तामस" ],
    vyakhya: [ { title: "Direction adverbs", body: "ऊर्ध्वम् (up), मध्ये (in the middle), अधः (down) — three directional adverbs map the three guṇas onto a vertical cosmic axis." } ]
  },
  '14.19': {
    anvaya: "यदा द्रष्टा गुणेभ्यः अन्यं कर्तारं न अनुपश्यति, गुणेभ्यः परं च (अन्यं) वेत्ति, सः मद्भावं अधिगच्छति",
    vibhaktiNotes: [ "गुणेभ्यः → पञ्चमी (\"other than the guṇas\" — ablative of comparison)", "मद्भावम् → द्वितीया" ],
    keyFights: [ "अन्यः + पञ्चमी = \"other than X\"", "अनुपश्यति, वेत्ति, अधिगच्छति → three लट् finites" ],
    vyakhya: [ { title: "Ablative of comparison", body: "अन्यः always governs पञ्चमी — \"other-than-X\". Hindi's \"X-से अलग\" reflects exactly this case logic." } ]
  },
  '14.20': {
    anvaya: "देही देहसमुद्भवान् एतान् त्रीन् गुणान् अतीत्य, जन्ममृत्युजरादुःखैः विमुक्तः अमृतम् अश्नुते",
    vibhaktiNotes: [ "त्रीन् गुणान् → द्वितीया (object of अतीत्य)", "जन्ममृत्युजरादुःखैः → तृतीया बहुवचन (instrumental — \"from\" with विमुक्त)", "अमृतम् → द्वितीया" ],
    keyFights: [ "अतीत्य → absolutive of अति + √इ", "अश्नुते → लट् 3sg Ā" ],
    vyakhya: [ { title: "Instrumental with विमुक्त", body: "विमुक्त takes तृतीया for what-one-is-freed-from — Hindi mirrors with \"X-से मुक्त\". A regular instrumental-with-PPP idiom." } ]
  },
  '14.21': {
    anvaya: "प्रभो, गुणान् एतान् अतीतः कैः लिङ्गैः (युक्तः) भवति, किम्-आचारः, कथं च त्रीन् गुणान् अति-वर्तते",
    vibhaktiNotes: [ "अर्जुन उवाच — Arjuna's question", "कैः लिङ्गैः → तृतीया बहुवचन (instrumental of mark)", "त्रीन् गुणान् → द्वितीया" ],
    keyFights: [ "Three interrogatives stacked: कैः, किम्, कथम्", "अति-वर्तते → लट् 3sg Ā of अति + √वृत्" ],
    vyakhya: [ { title: "Question by instrumental", body: "कैः लिङ्गैः = \"by what marks?\" — instrumental for diagnostic features. The question form \"by-what-X\" uses तृतीया." } ]
  },
  '14.22': {
    anvaya: "पाण्डव, सः प्रकाशं प्रवृत्तिं मोहं च प्रवृत्तानि न द्वेष्टि, निवृत्तानि न काङ्क्षति",
    vibhaktiNotes: [ "प्रकाशम्, प्रवृत्तिम्, मोहम् → द्वितीया (objects)", "प्रवृत्तानि, निवृत्तानि → द्वितीया बहुवचन neuter PPPs" ],
    keyFights: [ "Two finites: द्वेष्टि (लट् 3sg), काङ्क्षति (लट् 3sg)", "PPPs as objects in द्वितीया" ],
    vyakhya: [ { title: "PPP-as-object", body: "प्रवृत्तानि (\"things-that-have-arisen\") and निवृत्तानि (\"things-that-have-ceased\") are PPPs declined as accusative objects." } ]
  },
  '14.23': {
    anvaya: "यः उदासीनवत् आसीनः, गुणैः न विचाल्यते, गुणाः वर्तन्ते इति एव अवस्थितः न इङ्गते",
    vibhaktiNotes: [ "गुणैः → तृतीया (agent of the passive विचाल्यते)" ],
    keyFights: [ "विचाल्यते → passive लट् of वि + √चल्", "वत् suffix = \"like\"", "इति marks the inner thought" ],
    vyakhya: [ { title: "वत् simile-suffix", body: "उदासीन-वत् = \"like-an-indifferent-one\". The -वत् suffix is Sanskrit's compact \"like\" and replaces a full \"as if\" clause." } ]
  },
  '14.24': {
    anvaya: "स्वस्थः, समदुःखसुखः, समलोष्टाश्मकाञ्चनः, धीरः, तुल्यप्रियाप्रियः, तुल्यनिन्दात्मसंस्तुतिः",
    vibhaktiNotes: [ "All in प्रथमा एकवचन (epithets of the same subject)" ],
    keyFights: [ "Six bahuvrīhi compounds, each saying \"having-equal-X\"", "No finite verb — predicate continues to next verse" ],
    vyakhya: [ { title: "Bahuvrīhi cascade", body: "Each compound starts with सम/तुल्य (\"equal\") and lists what is being equated. Bahuvrīhi means the compound describes a person who possesses-this-quality." } ]
  },
  '14.25': {
    anvaya: "मानापमानयोः तुल्यः, मित्रारिपक्षयोः तुल्यः, सर्वारम्भपरित्यागी — सः गुणातीतः उच्यते",
    vibhaktiNotes: [ "मानापमानयोः, मित्रारिपक्षयोः → सप्तमी द्विवचन (locative of equality-domain)", "सर्वारम्भपरित्यागी → -इन् possessor stem in प्रथमा" ],
    keyFights: [ "उच्यते closes the long predicate (continuing from 14.22)", "तुल्यः + सप्तमी द्विवचन = \"equal in the two of X\"" ],
    vyakhya: [ { title: "Equality in dual", body: "तुल्यः X-योः = \"equal in (the dual of) X\" — the locative-dual is Sanskrit's natural way of saying \"in both X and Y\"." } ]
  },
  '14.26': {
    anvaya: "यः च माम् अव्यभिचारेण भक्तियोगेन सेवते, सः गुणान् समतीत्य ब्रह्मभूयाय कल्पते",
    vibhaktiNotes: [ "माम् → द्वितीया", "अव्यभिचारेण भक्तियोगेन → तृतीया (instrumental of means)", "ब्रह्मभूयाय → चतुर्थी (purpose)" ],
    keyFights: [ "सेवते, समतीत्य, कल्पते — Ā/middle voice prevalent", "ब्रह्मभूयाय = -भूय abstract (\"becoming-Brahman\") + dative" ],
    vyakhya: [ { title: "Dative of purpose", body: "ब्रह्मभूयाय कल्पते = \"becomes fit for Brahman-becoming\". चतुर्थी consistently encodes goal-state." } ]
  },
  '14.27': {
    anvaya: "हि अहं अमृतस्य अव्ययस्य च ब्रह्मणः, शाश्वतस्य च धर्मस्य, ऐकान्तिकस्य च सुखस्य प्रतिष्ठा (अस्मि)",
    vibhaktiNotes: [ "अमृतस्य, अव्ययस्य, ब्रह्मणः, शाश्वतस्य, धर्मस्य, सुखस्य → all षष्ठी एकवचन" ],
    keyFights: [ "Verbless predicate — Krishna identifies as प्रतिष्ठा (\"foundation\")", "Six genitives stacked = \"of X, of Y, of Z\"" ],
    vyakhya: [ { title: "Genitive cascade", body: "When Sanskrit identifies an entity as \"the X of Y of Z\", षष्ठी stacks. Krishna here is foundation of-immortal-imperishable-Brahman, of-eternal-dharma, of-absolute-bliss." } ]
  },

  // ── Chapter 15 — Puruṣottama Yoga ────────────────────────────────────
  '15.1': {
    anvaya: "ऊर्ध्वमूलम् अधःशाखम् अव्ययं अश्वत्थं प्राहुः; यस्य पर्णानि छन्दांसि, यः तं वेद सः वेदवित्",
    vibhaktiNotes: [ "अश्वत्थम् → द्वितीया (object of प्राहुः)", "यस्य → षष्ठी (\"whose\")", "तम् → द्वितीया" ],
    keyFights: [ "प्राहुः → perfect 3pl of √अह् (\"they have called\")", "Bahuvrīhis: ऊर्ध्वमूल (\"having-roots-above\"), अधःशाख (\"having-branches-below\")" ],
    vyakhya: [ { title: "Inverted-tree image", body: "The verse's grammar matches its image — bahuvrīhis literally invert direction-words to convey the upside-down cosmic tree." } ]
  },
  '15.2': {
    anvaya: "अधः च ऊर्ध्वं तस्य शाखाः प्रसृताः, गुणप्रवृद्धाः विषयप्रवालाः; मनुष्यलोके कर्मानुबन्धीनि मूलानि अनु-संततानि अधः च",
    vibhaktiNotes: [ "तस्य → षष्ठी", "मनुष्यलोके → सप्तमी" ],
    keyFights: [ "प्रसृताः, अनुसंततानि → PPPs", "विषयप्रवालाः = compound bahuvrīhi" ],
    vyakhya: [ { title: "PPP plurals as predicate", body: "The verse stacks plural PPPs (प्रसृताः, संततानि) without finite verbs — the implied \"are\" lets each participle do double duty as adjective and predicate." } ]
  },
  '15.3': {
    anvaya: "तस्य रूपं इह तथा न उपलभ्यते, न अन्तः न च आदिः न च सम्प्रतिष्ठा; इमं अश्वत्थं सुविरूढमूलं असङ्गशस्त्रेण दृढेन छित्त्वा",
    vibhaktiNotes: [ "तस्य → षष्ठी", "इमं अश्वत्थम् → द्वितीया (object of छित्त्वा)", "असङ्गशस्त्रेण → तृतीया (instrument)" ],
    keyFights: [ "छित्त्वा → absolutive of √छिद् (\"having cut\")", "उपलभ्यते → passive लट्" ],
    vyakhya: [ { title: "Instrumental of weapon", body: "असङ्गशस्त्रेण = तृतीया for the cutting tool. Sanskrit treats abstract attitudes (non-attachment) as a wieldable weapon by simply giving them a -शस्त्र compound." } ]
  },
  '15.4': {
    anvaya: "ततः तत् पदं परिमार्गितव्यं यस्मिन् गताः न निवर्तन्ति भूयः; एव च तं आद्यं पुरुषं प्रपद्ये यतः प्रवृत्तिः पुराणी प्रसृता",
    vibhaktiNotes: [ "तत् पदम् → प्रथमा (subject of परिमार्गितव्यम्)", "यस्मिन् → सप्तमी", "यतः → ablative-adverb (\"from which\")" ],
    keyFights: [ "परिमार्गितव्यम् → -तव्य potential PP (\"is-to-be-sought\")", "प्रपद्ये → लट् 1sg Ā" ],
    vyakhya: [ { title: "-तव्य obligation", body: "-तव्य marks deontic necessity — \"must be done\". Forms a passive predicate without finite verb." } ]
  },
  '15.5': {
    anvaya: "निर्मानमोहाः, जितसङ्गदोषाः, अध्यात्मनित्याः, विनिवृत्तकामाः, द्वन्द्वैः सुखदुःखसंज्ञैः विमुक्ताः, अमूढाः तत् अव्ययं पदं गच्छन्ति",
    vibhaktiNotes: [ "द्वन्द्वैः → तृतीया बहुवचन (instrumental of separation with विमुक्ताः)", "तत् पदम् → द्वितीया (goal)" ],
    keyFights: [ "Bahuvrīhi adjectives stack as subject", "गच्छन्ति → लट् 3pl" ],
    vyakhya: [ { title: "Instrumental of separation", body: "विमुक्त takes तृतीया — sukha/duḥkha-pairs are the things-from-which they are freed, marked instrumentally." } ]
  },
  '15.6': {
    anvaya: "तत् न सूर्यः, न शशाङ्कः, न पावकः भासयते, यद् गत्वा न निवर्तन्ते, तत् मम परमं धाम",
    vibhaktiNotes: [ "तत् → द्वितीया (object of भासयते)", "मम परमं धाम → प्रथमा predicate" ],
    keyFights: [ "भासयते → causative लट् 3sg (\"causes-to-shine\")", "निवर्तन्ते → लट् 3pl Ā", "गत्वा → absolutive" ],
    vyakhya: [ { title: "Three negated subjects", body: "न...न...न lists three failed candidates: even sun, moon, fire don't illuminate that abode. The triple negation is rhetorical emphasis." } ]
  },
  '15.7': {
    anvaya: "जीवलोके मम एव सनातनः अंशः जीवभूतः प्रकृतिस्थानि मनःषष्ठानि इन्द्रियाणि कर्षति",
    vibhaktiNotes: [ "जीवलोके → सप्तमी", "इन्द्रियाणि → द्वितीया (object of कर्षति)" ],
    keyFights: [ "कर्षति → लट् 3sg of √कृष् (\"draws\")", "मनःषष्ठानि = bahuvrīhi (\"having-mind-as-sixth\")" ],
    vyakhya: [ { title: "Numbered bahuvrīhi", body: "मनःषष्ठानि = \"having-manas-as-the-sixth\" — Sanskrit's elegant way of saying \"five senses + manas = six\" in a single compound." } ]
  },
  '15.8': {
    anvaya: "ईश्वरः यत् शरीरं अवाप्नोति यत् च अपि उत्क्रामति, गृहीत्वा एतानि संयाति, वायुः आशयात् गन्धान् इव",
    vibhaktiNotes: [ "शरीरम् → द्वितीया", "आशयात् → पञ्चमी (ablative — \"from the source\")", "गन्धान् → द्वितीया" ],
    keyFights: [ "गृहीत्वा → absolutive of √ग्रह्", "Simile via इव" ],
    vyakhya: [ { title: "Ablative of removal-source", body: "वायुः गन्धान् आशयात् = \"wind takes scents FROM their source.\" Removal-from = पञ्चमी." } ]
  },
  '15.9': {
    anvaya: "(अयं) श्रोत्रं चक्षुः स्पर्शनं रसनं घ्राणं मनः च एव अधिष्ठाय विषयान् उपसेवते",
    vibhaktiNotes: [ "All sense-organs → द्वितीया (objects of अधिष्ठाय)", "विषयान् → द्वितीया (object of उपसेवते)" ],
    keyFights: [ "अधिष्ठाय → absolutive (\"having presided over\")", "उपसेवते → लट् 3sg Ā" ],
    vyakhya: [ { title: "Absolutive sequence", body: "Absolutive + finite = \"having-X'd, then Y\". Here \"having-mounted (the senses), enjoys (their objects)\"." } ]
  },
  '15.10': {
    anvaya: "उत्क्रामन्तं स्थितं वा अपि भुञ्जानं गुणान्वितं विमूढाः न अनुपश्यन्ति; ज्ञानचक्षुषः पश्यन्ति",
    vibhaktiNotes: [ "उत्क्रामन्तम्, स्थितम्, भुञ्जानम् → द्वितीया participles (objects)", "ज्ञानचक्षुषः → प्रथमा बहुवचन -अस्-stem (\"having-the-eye-of-knowledge\")" ],
    keyFights: [ "Three participles in द्वितीया as object-trio", "विमूढाः vs ज्ञानचक्षुषः contrast" ],
    vyakhya: [ { title: "Participle bouquet", body: "Three different participle types stacked as objects: present (उत्क्रामन्त, भुञ्जान), past (स्थित), all in द्वितीया." } ]
  },
  '15.11': {
    anvaya: "यतन्तः योगिनः अपि एनम् आत्मनि अवस्थितं पश्यन्ति; अकृतात्मानः अचेतसः यतन्तः अपि एनं न पश्यन्ति",
    vibhaktiNotes: [ "एनम् → द्वितीया (\"this one\")", "आत्मनि → सप्तमी" ],
    keyFights: [ "यतन्तः → present participle (\"striving\")", "अकृतात्मानः = bahuvrīhi (\"having-unrefined-self\")" ],
    vyakhya: [ { title: "Same effort, different result", body: "Both groups यतन्तः (\"striving\") — but only कृतात्मन् sees. Effort alone is not enough; the self must be prepared." } ]
  },
  '15.12': {
    anvaya: "जगत् अवभासयते यत् तेजः आदित्यगतम्, यत् च चन्द्रमसि यत् च अग्नौ, तत् तेजः मामकं विद्धि",
    vibhaktiNotes: [ "जगत् → द्वितीया (object of अवभासयते)", "चन्द्रमसि, अग्नौ → सप्तमी" ],
    keyFights: [ "आदित्यगतम् = compound (\"sun-gone\" → \"in the sun\")", "विद्धि → लोट्" ],
    vyakhya: [ { title: "-गत location-suffix", body: "X-गत = \"gone-into-X\" = \"located-in-X\". A productive way to make locative-equivalents inside compounds." } ]
  },
  '15.13': {
    anvaya: "गाम् आविश्य ओजसा भूतानि धारयामि अहम्; च सोमः रसात्मकः भूत्वा सर्वाः ओषधीः पुष्णामि",
    vibhaktiNotes: [ "गाम् → द्वितीया (\"the earth\")", "ओजसा → तृतीया (instrumental \"by my power\")", "ओषधीः → द्वितीया बहुवचन" ],
    keyFights: [ "आविश्य, भूत्वा → absolutives", "धारयामि, पुष्णामि → लट् 1sg" ],
    vyakhya: [ { title: "गाम् as accusative of earth", body: "गाम् is the द्वितीया of गो/गौ — \"the earth\" (or \"cow\"). Here clearly \"the earth\" since context is cosmic sustenance." } ]
  },
  '15.14': {
    anvaya: "अहं प्राणिनां देहम् आश्रितः वैश्वानरः भूत्वा प्राणापानसमायुक्तः चतुर्विधं अन्नं पचामि",
    vibhaktiNotes: [ "प्राणिनाम् → षष्ठी बहुवचन", "देहम् → द्वितीया (object of आश्रितः)", "चतुर्विधम् अन्नम् → द्वितीया" ],
    keyFights: [ "भूत्वा → absolutive (\"having become\")", "पचामि → लट् 1sg of √पच्" ],
    vyakhya: [ { title: "First-person cosmic claim", body: "पचामि (\"I cook/digest\") in 1sg makes Krishna directly identify with the digestive fire — grammatical first-person matters theologically." } ]
  },
  '15.15': {
    anvaya: "अहं सर्वस्य हृदि सन्निविष्टः; मत्तः स्मृतिः ज्ञानम् अपोहनं च; अहं वेदैः सर्वैः वेद्यः, वेदान्तकृत् वेदविद् एव च अहम्",
    vibhaktiNotes: [ "सर्वस्य → षष्ठी", "हृदि → सप्तमी", "मत्तः → पञ्चमी (\"from me\")", "वेदैः → तृतीया बहुवचन" ],
    keyFights: [ "वेद्यः → potential PP (\"to be known\")", "Two -कृत्/-विद् compounds at end" ],
    vyakhya: [ { title: "Ablative of source", body: "मत्तः = \"from me\" — पञ्चमी of अहम्. Memory, knowledge, forgetting — all sourced ablatively from the supreme self." } ]
  },
  '15.16': {
    anvaya: "लोके इमौ द्वौ पुरुषौ — क्षरः च अक्षरः एव च; क्षरः सर्वाणि भूतानि (अस्ति), अक्षरः कूटस्थः उच्यते",
    vibhaktiNotes: [ "इमौ द्वौ पुरुषौ → प्रथमा द्विवचन", "लोके → सप्तमी" ],
    keyFights: [ "द्विवचन: द्वौ पुरुषौ — exactly two", "उच्यते → passive लट्" ],
    vyakhya: [ { title: "Dual subject, dual verb", body: "Two persons take द्विवचन, the dual ending. Sanskrit's three-vacana system ensures you cannot confuse \"two\" with \"many\"." } ]
  },
  '15.17': {
    anvaya: "तु उत्तमः पुरुषः अन्यः परमात्मा इति उदाहृतः, यः लोकत्रयम् आविश्य अव्ययः ईश्वरः बिभर्ति",
    vibhaktiNotes: [ "उत्तमः पुरुषः → प्रथमा", "लोकत्रयम् → द्वितीया" ],
    keyFights: [ "आविश्य → absolutive", "बिभर्ति → लट् 3sg of √भृ", "उदाहृतः → PPP" ],
    vyakhya: [ { title: "Reduplicated present", body: "बिभर्ति is reduplicated (class 3) present of √भृ — \"sustains\". The reduplication marks an old archaic stem-class." } ]
  },
  '15.18': {
    anvaya: "यस्मात् अहं क्षरम् अतीतः, अक्षरात् अपि च उत्तमः, तस्मात् अहं लोके वेदे च पुरुषोत्तमः इति प्रथितः",
    vibhaktiNotes: [ "यस्मात्...तस्मात् → पञ्चमी correlatives (\"because...therefore\")", "अक्षरात् → पञ्चमी (ablative of comparison)" ],
    keyFights: [ "Causal correlative pair", "प्रथितः → PPP (\"is renowned\")" ],
    vyakhya: [ { title: "Ablative correlative", body: "यस्मात् (because) — तस्मात् (therefore) — both पञ्चमी, mirroring each other to give a logical causal frame." } ]
  },
  '15.19': {
    anvaya: "भारत, यः माम् एवम् असम्मूढः पुरुषोत्तमं जानाति, सः सर्वविद् सर्वभावेन माम् भजति",
    vibhaktiNotes: [ "माम् → द्वितीया (object of जानाति, भजति)", "सर्वभावेन → तृतीया (instrumental \"with whole being\")" ],
    keyFights: [ "जानाति, भजति → लट् 3sg", "असम्मूढः = negated PPP" ],
    vyakhya: [ { title: "Instrumental of manner", body: "सर्वभावेन = \"with-the-whole-being\" — तृतीया for manner-of-action. Different from instrumental-of-tool but same case." } ]
  },
  '15.20': {
    anvaya: "अनघ, इति भारत मया गुह्यतमं इदं शास्त्रम् उक्तम्; एतत् बुद्ध्वा बुद्धिमान् कृतकृत्यः च स्यात्",
    vibhaktiNotes: [ "मया → तृतीया (instrumental of agent in passive)", "इदं शास्त्रम् → प्रथमा (subject of उक्तम्)", "एतत् → द्वितीया" ],
    keyFights: [ "उक्तम् → PPP serving as finite", "बुद्ध्वा → absolutive", "स्यात् → optional लिङ् 3sg of √अस्" ],
    vyakhya: [ { title: "Optative as conclusion", body: "स्यात् (\"may become\") closes the chapter with potential rather than fact — \"by knowing this, one may become wise.\" The mood matters." } ]
  },

  // ── Chapter 16 — Daivāsura Sampad Vibhāga Yoga ───────────────────────
  '16.1': {
    anvaya: "(श्रीभगवान् उवाच) — अभयं, सत्त्वसंशुद्धिः, ज्ञानयोगव्यवस्थितिः, दानम्, दमः च, यज्ञः च, स्वाध्यायः, तपः, आर्जवम्",
    vibhaktiNotes: [ "All listed virtues → प्रथमा (subject-list awaiting predicate)" ],
    keyFights: [ "Verb-less catalogue running 16.1–16.3", "Predicate (\"are of one born to divine heritage\") arrives at 16.3" ],
    vyakhya: [ { title: "Long catalogue, late predicate", body: "Like 13.7–13.11, this chapter opens with three verses of subject-list before the predicate lands at 16.3." } ]
  },
  '16.2': {
    anvaya: "अहिंसा, सत्यम्, अक्रोधः, त्यागः, शान्तिः, अपैशुनम्, भूतेषु दया, अलोलुप्त्वम्, मार्दवम्, ह्रीः, अचापलम्",
    vibhaktiNotes: [ "All → प्रथमा", "भूतेषु → सप्तमी (\"toward beings\")" ],
    keyFights: [ "Continued nominative cascade", "भूतेषु दया = locative-of-target with compassion" ],
    vyakhya: [ { title: "Locative of compassion-target", body: "दया + सप्तमी = \"compassion toward X\". A standard pairing — emotion plus its locative target." } ]
  },
  '16.3': {
    anvaya: "भारत, तेजः, क्षमा, धृतिः, शौचम्, अद्रोहः, न-अति-मानिता — एतानि अभिजातस्य दैवीं सम्पदम् (प्रति) भवन्ति",
    vibhaktiNotes: [ "एतानि → प्रथमा (the predicate finally arrives)", "अभिजातस्य → षष्ठी (\"of one born-to\")", "दैवीं सम्पदम् → द्वितीया" ],
    keyFights: [ "भवन्ति → लट् 3pl", "Three-verse subject-list closes here" ],
    vyakhya: [ { title: "Predicate arrives", body: "After two verses of accumulating virtues, 16.3 supplies भवन्ति — \"these are\" — closing the long opening definition of दैवी सम्पद्." } ]
  },
  '16.4': {
    anvaya: "पार्थ, दम्भः, दर्पः, अभिमानः च एव, क्रोधः, पारुष्यम् एव च, अज्ञानम् च — आसुरीं सम्पदम् अभिजातस्य (एतानि भवन्ति)",
    vibhaktiNotes: [ "पार्थ → सम्बोधन", "एतानि → प्रथमा", "आसुरीं सम्पदम् → द्वितीया" ],
    keyFights: [ "Implicit भवन्ति from 16.3 pattern", "Six demoniac qualities listed in प्रथमा" ],
    vyakhya: [ { title: "Pattern continuation", body: "16.4 mirrors 16.3 grammatically — same case-structure, same implicit verb. Sanskrit pedagogy uses parallel grammar to mark parallel content." } ]
  },
  '16.5': {
    anvaya: "पाण्डव, दैवी सम्पद् विमोक्षाय, आसुरी निबन्धाय (सम्पद्यते) मता; मा शुचः, त्वम् दैवीं सम्पदम् अभिजातः (असि)",
    vibhaktiNotes: [ "विमोक्षाय, निबन्धाय → चतुर्थी (purpose)", "त्वम् → प्रथमा" ],
    keyFights: [ "मा शुचः = मा + लोट् of √शुच् → \"do not grieve!\"", "अभिजातः → PPP" ],
    vyakhya: [ { title: "Prohibitive मा + लोट्", body: "मा शुचः is the textbook prohibitive: मा + 2sg लोट् = \"do not Y\". The form looks aorist-shaped but functions as imperative." } ]
  },
  '16.6': {
    anvaya: "पार्थ, अस्मिन् लोके भूतसर्गौ द्वौ — दैवः आसुरः च एव; दैवः विस्तरशः प्रोक्तः, आसुरं मे शृणु",
    vibhaktiNotes: [ "अस्मिन् लोके → सप्तमी", "द्वौ → प्रथमा द्विवचन", "मे → षष्ठी enclitic" ],
    keyFights: [ "Dual: द्वौ भूतसर्गौ", "शृणु → लोट् 2sg of √श्रु" ],
    vyakhya: [ { title: "Dual creation-sets", body: "Just as the two puruṣas in 15.16, here two भूतसर्गौ — Sanskrit insists on द्विवचन whenever there are exactly two." } ]
  },
  '16.7': {
    anvaya: "आसुराः जनाः प्रवृत्तिं च निवृत्तिं च न विदुः; न शौचम् न अपि च आचारः न सत्यम् तेषु विद्यते",
    vibhaktiNotes: [ "तेषु → सप्तमी (\"in them\")", "प्रवृत्तिम्, निवृत्तिम् → द्वितीया" ],
    keyFights: [ "विदुः → perfect 3pl of √विद् (\"they know\")", "विद्यते → passive-like लट् (\"is found\")" ],
    vyakhya: [ { title: "Locative of presence", body: "तेषु विद्यते = \"is found in them\". सप्तमी for the locus where something is/isn't present." } ]
  },
  '16.8': {
    anvaya: "ते जगत् असत्यम्, अप्रतिष्ठम्, अनीश्वरम्, अपरस्परसम्भूतम्, कामहैतुकम्, किम् अन्यत् इति आहुः",
    vibhaktiNotes: [ "जगत् → द्वितीया (object)", "All adjectives in द्वितीया (predicates of the object — \"call X to be Y\")" ],
    keyFights: [ "आहुः → \"they say\"", "इति marks the quoted view" ],
    vyakhya: [ { title: "Double-accusative \"call X Y\"", body: "X-म् Y-म् आहुः = \"they call X (to be) Y\". Two accusatives — verb of saying takes both object and predicate-object." } ]
  },
  '16.9': {
    anvaya: "एतां दृष्टिम् अवष्टभ्य, नष्टात्मानः, अल्पबुद्धयः, उग्रकर्माणः क्षयाय जगतः अहिताः प्रभवन्ति",
    vibhaktiNotes: [ "एतां दृष्टिम् → द्वितीया", "क्षयाय → चतुर्थी (purpose)", "जगतः → षष्ठी" ],
    keyFights: [ "अवष्टभ्य → absolutive (\"having gripped\")", "Bahuvrīhi compounds for the subjects" ],
    vyakhya: [ { title: "Dative of destructive purpose", body: "क्षयाय = \"for-destruction\". चतुर्थी here is purpose, not goal — they emerge in-order-to destroy." } ]
  },
  '16.10': {
    anvaya: "दम्भमानमदान्विताः, मोहात् असद्ग्राहान् गृहीत्वा, अशुचिव्रताः वर्तन्ते, दुष्पूरं कामम् आश्रित्य",
    vibhaktiNotes: [ "मोहात् → पञ्चमी (\"from delusion\")", "कामम् → द्वितीया (object of आश्रित्य)" ],
    keyFights: [ "गृहीत्वा, आश्रित्य → two absolutives", "वर्तन्ते → लट् 3pl Ā" ],
    vyakhya: [ { title: "Twin absolutives", body: "Two absolutives in one verse stack the prior actions: \"having-grasped (X), having-resorted (to Y), they act (Z).\" Each पूर्वकालिक precedes the finite." } ]
  },
  '16.11': {
    anvaya: "आ-मरण-अन्तां च अपरिमेयां चिन्ताम् उपाश्रिताः, कामोपभोगपरमाः, एतावत् इति निश्चिताः",
    vibhaktiNotes: [ "चिन्ताम् → द्वितीया", "एतावत् → indeclinable adverb (\"this much\")" ],
    keyFights: [ "उपाश्रिताः, निश्चिताः → PPPs as predicate adjectives", "इति marks inner content" ],
    vyakhya: [ { title: "PPP-as-finite cluster", body: "Two PPPs form the predicate without an explicit finite verb. Sanskrit happily uses PPP-cluster + implicit \"are\"." } ]
  },
  '16.12': {
    anvaya: "आशापाशशतैः बद्धाः, कामक्रोधपरायणाः, कामभोगार्थम् अन्यायेन अर्थसञ्चयान् ईहन्ते",
    vibhaktiNotes: [ "आशापाशशतैः → तृतीया बहुवचन (instrumental of binding)", "अन्यायेन → तृतीया (means)", "कामभोगार्थम् → द्वितीया-adverbial (\"for-the-sake-of\")" ],
    keyFights: [ "ईहन्ते → लट् 3pl Ā of √ईह् (\"they crave\")", "बद्धाः → PPP" ],
    vyakhya: [ { title: "Adverbial -अर्थम्", body: "X-अर्थम् = \"for-the-sake-of-X\" — accusative ending serving as a fossilised purpose-postposition." } ]
  },
  '16.13': {
    anvaya: "इदं अद्य मया लब्धम्, इमं मनोरथं प्राप्स्ये, इदं अस्ति, इदं धनम् मम पुनः अपि भविष्यति",
    vibhaktiNotes: [ "इदम् → प्रथमा/द्वितीया (subject/object)", "मया → तृतीया (agent in passive)" ],
    keyFights: [ "लब्धम् → PPP, perfect-passive", "प्राप्स्ये → लृट् 1sg Ā", "भविष्यति → लृट् 3sg" ],
    vyakhya: [ { title: "Inner monologue grammar", body: "Three tenses appear inside the demoniac mind: past (लब्धम्), future (प्राप्स्ये), present (अस्ति) — Sanskrit uses tense-shift to mark egoic time-grasping." } ]
  },
  '16.14': {
    anvaya: "असौ शत्रुः मया हतः, अन्यान् अपि च हनिष्ये; अहं ईश्वरः, अहं भोगी, अहं सिद्धः, बलवान् सुखी (अस्मि)",
    vibhaktiNotes: [ "मया → तृतीया (agent)", "अन्यान् → द्वितीया" ],
    keyFights: [ "हतः → PPP", "हनिष्ये → लृट् 1sg Ā", "अहम् five times — egoic emphasis" ],
    vyakhya: [ { title: "Aham repetition", body: "Pronoun अहम् usually elided — explicit repetition is rhetorical, marking the demoniac mind's I-fixation grammatically." } ]
  },
  '16.15': {
    anvaya: "अहं आढ्यः अभिजनवान् च (अस्मि); मया सदृशः कः अन्यः (अस्ति)? यक्ष्ये दास्यामि मोदिष्ये — इति अज्ञानविमोहिताः",
    vibhaktiNotes: [ "मया → तृतीया (\"like-me\")", "कः अन्यः → प्रथमा (interrogative)" ],
    keyFights: [ "Three लृट् futures: यक्ष्ये, दास्यामि, मोदिष्ये", "सदृशः + तृतीया = \"like X\"" ],
    vyakhya: [ { title: "Comparative with तृतीया", body: "X-सदृशः = \"like X\" requires तृतीया for X. \"Equal/similar\" predicates take instrumental rather than ablative." } ]
  },
  '16.16': {
    anvaya: "अनेकचित्तविभ्रान्ताः, मोहजालसमावृताः, कामभोगेषु प्रसक्ताः, अशुचौ नरके पतन्ति",
    vibhaktiNotes: [ "कामभोगेषु → सप्तमी बहुवचन", "अशुचौ नरके → सप्तमी" ],
    keyFights: [ "Three PPP-bahuvrīhi adjectives in प्रथमा बहुवचन", "पतन्ति → लट् 3pl" ],
    vyakhya: [ { title: "Locative of fall-destination", body: "पतन्ति + सप्तमी = \"fall into X\". Counterintuitively, \"into-which\" of falling takes locative, not accusative." } ]
  },
  '16.17': {
    anvaya: "आत्मसम्भाविताः, स्तब्धाः, धनमानमदान्विताः, दम्भेन अविधिपूर्वकम् नामयज्ञैः यजन्ते",
    vibhaktiNotes: [ "दम्भेन → तृतीया (means)", "नामयज्ञैः → तृतीया बहुवचन (\"with name-only sacrifices\")" ],
    keyFights: [ "यजन्ते → लट् 3pl Ā", "अविधिपूर्वकम् = adverb (\"contrary-to-rule\")" ],
    vyakhya: [ { title: "Compound adverb", body: "X-पूर्वकम् forms an adverb meaning \"having-X-as-precondition\" / \"with-X\". A productive adverbialiser." } ]
  },
  '16.18': {
    anvaya: "अहङ्कारं, बलं, दर्पं, कामं, क्रोधं च संश्रिताः, माम् आत्मपरदेहेषु प्रद्विषन्तः अभ्यसूयकाः (भवन्ति)",
    vibhaktiNotes: [ "All accusatives → द्वितीया (objects of संश्रिताः)", "आत्मपरदेहेषु → सप्तमी बहुवचन (locative)" ],
    keyFights: [ "संश्रिताः → PPP serving as predicate", "प्रद्विषन्तः → present participle" ],
    vyakhya: [ { title: "PPP + accusative", body: "संश्रिताः + accusative = \"having-resorted-to X\". The accusative survives even though संश्रिताः is past passive — verbal force preserved." } ]
  },
  '16.19': {
    anvaya: "तान् अहं द्विषतः क्रूरान् संसारेषु नराधमान् असुरीषु एव योनिषु अजस्रम् क्षिपामि",
    vibhaktiNotes: [ "तान्...क्रूरान्...नराधमान् → द्वितीया बहुवचन (objects of क्षिपामि)", "संसारेषु, योनिषु → सप्तमी बहुवचन (locative of throwing-into)" ],
    keyFights: [ "क्षिपामि → लट् 1sg of √क्षिप्", "द्विषतः → present participle in द्वितीया" ],
    vyakhya: [ { title: "Locative of trajectory", body: "क्षिप् takes सप्तमी for where-something-is-thrown — \"into the wombs\" is locative, not accusative. Fall-and-throw share this." } ]
  },
  '16.20': {
    anvaya: "कौन्तेय, आसुरीं योनिम् आपन्नाः मूढाः जन्मनि जन्मनि माम् अप्राप्य एव, ततः अधमां गतिम् यान्ति",
    vibhaktiNotes: [ "आसुरीं योनिम् → द्वितीया", "जन्मनि जन्मनि → सप्तमी (distributive — \"birth after birth\")", "अधमां गतिम् → द्वितीया" ],
    keyFights: [ "अप्राप्य → negated absolutive (\"without attaining\")", "Distributive locative — repetition" ],
    vyakhya: [ { title: "Distributive repetition", body: "जन्मनि जन्मनि = \"in-each-birth\". Sanskrit doubles the locative for distributive sense, like \"दिने दिने\" (day by day)." } ]
  },
  '16.21': {
    anvaya: "त्रिविधं नरकस्य इदं द्वारं आत्मनः नाशनम् — कामः, क्रोधः, तथा लोभः; तस्मात् एतत् त्रयं त्यजेत्",
    vibhaktiNotes: [ "नरकस्य → षष्ठी", "आत्मनः → षष्ठी (\"of the self\")", "एतत् त्रयम् → द्वितीया" ],
    keyFights: [ "त्यजेत् → optative विधिलिङ् 3sg of √त्यज् (\"one should abandon\")", "तस्मात् → causal ablative (\"therefore\")" ],
    vyakhya: [ { title: "Optative for prescription", body: "त्यजेत् in विधिलिङ् gives a prescriptive \"should\" — exactly the mood for ethical command. \"Therefore one should abandon.\"" } ]
  },
  '16.22': {
    anvaya: "कौन्तेय, एतैः तमोद्वारैः त्रिभिः विमुक्तः नरः आत्मनः श्रेयः आचरति, ततः परां गतिं याति",
    vibhaktiNotes: [ "एतैः तमोद्वारैः त्रिभिः → तृतीया बहुवचन (separation)", "आत्मनः → षष्ठी", "परां गतिम् → द्वितीया" ],
    keyFights: [ "विमुक्तः + तृतीया = freed-from", "आचरति, याति → लट् 3sg" ],
    vyakhya: [ { title: "Freedom by instrumental", body: "विमुक्त always pairs with तृतीया for what-one-is-freed-from. Hindi mirror: \"X-से मुक्त\"." } ]
  },
  '16.23': {
    anvaya: "यः शास्त्रविधिम् उत्सृज्य कामकारतः वर्तते, सः न सिद्धिम्, न सुखम्, न परां गतिम् अवाप्नोति",
    vibhaktiNotes: [ "शास्त्रविधिम् → द्वितीया (object of उत्सृज्य)", "कामकारतः → adverb (\"according to desire\")", "सिद्धिम्, सुखम्, गतिम् → द्वितीया" ],
    keyFights: [ "उत्सृज्य → absolutive of उत् + √सृज्", "अवाप्नोति → लट् 3sg of अव + √आप्" ],
    vyakhya: [ { title: "-तस् ablative-suffix", body: "कामकार-तः = \"by-impulse-of-desire\" — the -तस् suffix makes adverbs functioning like ablatives." } ]
  },
  '16.24': {
    anvaya: "तस्मात् ते कार्य-अकार्य-व्यवस्थितौ शास्त्रं प्रमाणम्; शास्त्रविधानोक्तं कर्म ज्ञात्वा त्वम् इह कर्तुम् अर्हसि",
    vibhaktiNotes: [ "ते → षष्ठी (\"for you\")", "कार्य-अकार्य-व्यवस्थितौ → सप्तमी (\"in determining what-should/shouldn't-be-done\")", "कर्म → द्वितीया (object of कर्तुम्)" ],
    keyFights: [ "ज्ञात्वा → absolutive", "कर्तुम् → infinitive", "अर्हसि → लट् 2sg + infinitive = \"you ought\"" ],
    vyakhya: [ { title: "अर्ह + infinitive", body: "अर्ह + tum-infinitive = \"you ought to / you are fit to do X\". A standard polite-imperative substitute." } ]
  },

  // ── Chapter 17 — Śraddhā-Traya Vibhāga Yoga ──────────────────────────
  '17.1': {
    anvaya: "(अर्जुन उवाच) — कृष्ण, ये शास्त्रविधिम् उत्सृज्य श्रद्धया अन्विताः यजन्ते, तेषां निष्ठा का — सत्त्वम् आहो रजः तमः?",
    vibhaktiNotes: [ "श्रद्धया → तृतीया", "तेषाम् → षष्ठी", "का निष्ठा → प्रथमा (interrogative)" ],
    keyFights: [ "उत्सृज्य → absolutive", "यजन्ते → लट् 3pl Ā", "Three-way interrogative" ],
    vyakhya: [ { title: "Question with implicit अस्ति", body: "तेषां निष्ठा का (अस्ति) — \"what is their standing?\" Verbless question, implied अस्ति, three predicate alternatives." } ]
  },
  '17.2': {
    anvaya: "(श्रीभगवान् उवाच) — देहिनां सा श्रद्धा त्रिविधा भवति, स्वभावजा — सात्त्विकी, राजसी, तामसी च; तां शृणु",
    vibhaktiNotes: [ "देहिनाम् → षष्ठी बहुवचन", "ताम् → द्वितीया (object of शृणु)" ],
    keyFights: [ "Feminine adjective forms: सात्त्विकी, राजसी, तामसी (agreeing with श्रद्धा)", "शृणु → लोट्" ],
    vyakhya: [ { title: "Feminine concord", body: "श्रद्धा is feminine — every modifier (सा, त्रिविधा, स्वभावजा) takes the feminine -ā ending. Concord visible at every step." } ]
  },
  '17.3': {
    anvaya: "भारत, सर्वस्य श्रद्धा सत्त्वानुरूपा भवति; पुरुषः श्रद्धामयः; यः यत् श्रद्धः सः एव सः",
    vibhaktiNotes: [ "सर्वस्य → षष्ठी", "श्रद्धामयः → -मय suffix (\"made of X\") in प्रथमा" ],
    keyFights: [ "यः...सः correlative", "Memorable maxim: यो यच्छ्रद्धः स एव सः" ],
    vyakhya: [ { title: "-मय suffix", body: "श्रद्धा-मय = \"made-of-faith\". The -मय suffix says \"composed-of-X\" — turns any noun into a substance-claim." } ]
  },
  '17.4': {
    anvaya: "सात्त्विकाः देवान् यजन्ते, राजसाः यक्षरक्षांसि, अपरे तामसाः जनाः प्रेतान् भूतगणान् च (यजन्ते)",
    vibhaktiNotes: [ "देवान्, यक्षरक्षांसि, प्रेतान्, भूतगणान् → द्वितीया (objects of यजन्ते)" ],
    keyFights: [ "यजन्ते governs all four object groups via implicit repetition", "नपुंसकलिंग बहुवचन: रक्षांसि" ],
    vyakhya: [ { title: "-स् neuter plural", body: "रक्षांसि is neuter plural of रक्षस् (-अस् stem) — note the आ-augment in plural. A common irregular pattern." } ]
  },
  '17.5': {
    anvaya: "ये अशास्त्रविहितं घोरं तपः तप्यन्ते, दम्भाहङ्कारसंयुक्ताः, कामरागबलान्विताः",
    vibhaktiNotes: [ "घोरं तपः → द्वितीया (cognate object — object-of-tapas-doing)" ],
    keyFights: [ "तपः तप्यन्ते = cognate-object construction (\"perform a perform-ance\")", "Predicate continues into 17.6" ],
    vyakhya: [ { title: "Cognate object", body: "तपः तप्यन्ते — same root noun and verb (√तप्). \"They austere-ize the austerity.\" The accusative is the same word as the action." } ]
  },
  '17.6': {
    anvaya: "अचेतसः शरीरस्थं भूतग्रामं माम् अन्तःशरीरस्थं च (अपि) कर्षयन्तः, तान् आसुरनिश्चयान् विद्धि",
    vibhaktiNotes: [ "भूतग्रामम्, माम् → द्वितीया (objects of कर्षयन्तः)", "तान् → द्वितीया (object of विद्धि)" ],
    keyFights: [ "कर्षयन्तः → causative present participle (\"making-suffer\")", "विद्धि → लोट्" ],
    vyakhya: [ { title: "Causative participle as predicate", body: "कर्षयन्तः is the causative-stem present participle: \"those-who-cause-emaciation\". The -अय- is the causative marker." } ]
  },
  '17.7': {
    anvaya: "सर्वस्य आहारः अपि त्रिविधः प्रियः भवति; तथा यज्ञः, तपः, दानम् च — तेषां इमं भेदं शृणु",
    vibhaktiNotes: [ "सर्वस्य → षष्ठी", "तेषाम् → षष्ठी बहुवचन" ],
    keyFights: [ "Repeated त्रिविध- frame", "शृणु → लोट्" ],
    vyakhya: [ { title: "त्रिविध as program", body: "Chapter 17's organising principle is त्रिविध (threefold). This verse sets up the recurring tripartite analysis." } ]
  },
  '17.8': {
    anvaya: "आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः, रस्याः, स्निग्धाः, स्थिराः, हृद्याः आहाराः सात्त्विकप्रियाः (भवन्ति)",
    vibhaktiNotes: [ "All adjectives → प्रथमा बहुवचन (agreeing with आहाराः)" ],
    keyFights: [ "Long compound -विवर्धनाः ending in agent-form", "Adjective cascade with no finite verb" ],
    vyakhya: [ { title: "Six-member dvandva", body: "आयुः-सत्त्व-बल-आरोग्य-सुख-प्रीति is a six-member द्वन्द्व — \"life, vigour, strength, health, joy, gladness\" — combined into a single compound." } ]
  },
  '17.9': {
    anvaya: "कट्वम्ललवणात्युष्णतीक्ष्णरूक्षविदाहिनः आहाराः राजसस्य इष्टाः, दुःख-शोक-आमय-प्रदाः (भवन्ति)",
    vibhaktiNotes: [ "राजसस्य → षष्ठी (\"to the rajasic\")", "इष्टाः, प्रदाः → प्रथमा बहुवचन predicates" ],
    keyFights: [ "Compound stack of taste-adjectives", "इष्ट = PPP of √इष् (\"liked\")" ],
    vyakhya: [ { title: "Genitive of preference", body: "X-स्य इष्टाः = \"dear-to-X\" — षष्ठी for whose-preference. The thing-liked is in प्रथमा agreeing with the implied subject." } ]
  },
  '17.10': {
    anvaya: "यातयामं, गतरसम्, पूति, पर्युषितम्, उच्छिष्टम्, अमेध्यं च भोजनं तामसप्रियं (भवति)",
    vibhaktiNotes: [ "All adjectives → प्रथमा एकवचन (agreeing with भोजनम्)" ],
    keyFights: [ "Six bahuvrīhi-style food-fault adjectives", "Implicit भवति" ],
    vyakhya: [ { title: "Bahuvrīhi as fault-tags", body: "गतरसम् = \"having-gone-juice\" (=tasteless). Bahuvrīhi packs a whole descriptive clause into a single adjective." } ]
  },
  '17.11': {
    anvaya: "अफलाकाङ्क्षिभिः यष्टव्यम् इति मनः समाधाय विधिदृष्टः यः इज्यते, सः यज्ञः सात्त्विकः",
    vibhaktiNotes: [ "अफलाकाङ्क्षिभिः → तृतीया बहुवचन (agent — \"by those-who-do-not-crave-fruit\")", "मनः → द्वितीया" ],
    keyFights: [ "यष्टव्यम् → -तव्य potential PP (\"is-to-be-sacrificed\")", "समाधाय → absolutive", "इज्यते → passive लट्" ],
    vyakhya: [ { title: "Inner-content इति", body: "इति marks the inner thought \"it-must-be-sacrificed\" — quoted attitude held by the sacrificers as they fix their minds." } ]
  },
  '17.12': {
    anvaya: "तु भरतश्रेष्ठ, यत् फलं अभिसन्धाय, दम्भार्थम् अपि च एव इज्यते — तत् यज्ञं राजसं विद्धि",
    vibhaktiNotes: [ "फलम् → द्वितीया (object of अभिसन्धाय)", "दम्भार्थम् → adverb-of-purpose", "तत् यज्ञम् → द्वितीया" ],
    keyFights: [ "अभिसन्धाय → absolutive (\"having-aimed-at\")", "विद्धि → लोट्" ],
    vyakhya: [ { title: "Absolutive of intention", body: "अभिसन्धाय = \"having aimed at\" — common absolutive used to mark the prior mental setting of a goal." } ]
  },
  '17.13': {
    anvaya: "विधिहीनम्, असृष्टान्नम्, मन्त्रहीनम्, अदक्षिणम्, श्रद्धाविरहितं यज्ञं तामसं परिचक्षते",
    vibhaktiNotes: [ "Five compound adjectives → द्वितीया (qualifying यज्ञम्)" ],
    keyFights: [ "परिचक्षते → लट् 3pl Ā of परि + √चक्ष् (\"they call\")", "Double-accusative: object + predicate-object" ],
    vyakhya: [ { title: "परिचक्षते double-accusative", body: "परिचक्षते = \"they call X (to be) Y\" — both object and predicate-noun take द्वितीया. Same pattern as आहुः in 16.8." } ]
  },
  '17.14': {
    anvaya: "देवद्विजगुरुप्राज्ञपूजनम्, शौचम्, आर्जवम्, ब्रह्मचर्यम्, अहिंसा च — शारीरं तपः उच्यते",
    vibhaktiNotes: [ "All five items → प्रथमा (subject-list)", "शारीरं तपः → प्रथमा predicate" ],
    keyFights: [ "उच्यते → passive लट्", "Long compound -पूजनम् with four-member dvandva inside" ],
    vyakhya: [ { title: "Embedded dvandva", body: "देव-द्विज-गुरु-प्राज्ञ is a four-member dvandva nested inside a tatpuruṣa with -पूजन. Compounds nest cleanly." } ]
  },
  '17.15': {
    anvaya: "अनुद्वेगकरम्, सत्यं, प्रियहितम्, यत् च वाक्यम्, स्वाध्यायाभ्यसनम् च एव — वाङ्मयं तपः उच्यते",
    vibhaktiNotes: [ "All adjectives → प्रथमा एकवचन (qualifying वाक्यम्)" ],
    keyFights: [ "-कर / -हित suffixes form agent-adjectives", "Implicit (वाक्यम्) is the subject" ],
    vyakhya: [ { title: "-कर agent suffix", body: "अनुद्वेग-कर = \"non-distress-causing\". -कर turns any noun into \"X-causer\" — productive across the language." } ]
  },
  '17.16': {
    anvaya: "मनःप्रसादः, सौम्यत्वम्, मौनम्, आत्मविनिग्रहः, भावसंशुद्धिः इति एतत् मानसं तपः उच्यते",
    vibhaktiNotes: [ "All items → प्रथमा", "एतत् मानसं तपः → प्रथमा predicate" ],
    keyFights: [ "Five-item nominative cascade closing with उच्यते", "इति marks the close of the list" ],
    vyakhya: [ { title: "Three austerity types", body: "Verses 14–16 give शारीर / वाङ्मय / मानस — three locations of austerity. Each verse is structurally identical: items + उच्यते." } ]
  },
  '17.17': {
    anvaya: "परया श्रद्धया तप्तं, अफलाकाङ्क्षिभिः युक्तैः नरैः त्रिविधं तत् तपः सात्त्विकं परिचक्षते",
    vibhaktiNotes: [ "श्रद्धया → तृतीया", "नरैः → तृतीया बहुवचन (agent)", "त्रिविधम् तपः → द्वितीया" ],
    keyFights: [ "तप्तम् → PPP", "परिचक्षते → \"they call\"" ],
    vyakhya: [ { title: "Instrumental triple", body: "Three तृतीयाs in one verse: by-faith (manner), by-men (agent of passive), by-three-fold (...). Each does different work." } ]
  },
  '17.18': {
    anvaya: "सत्कारमानपूजार्थं दम्भेन च एव यत् तपः क्रियते, तत् इह राजसं प्रोक्तं — चलम् अध्रुवम्",
    vibhaktiNotes: [ "सत्कारमानपूजार्थम् → adverb-of-purpose", "दम्भेन → तृतीया", "तत् → प्रथमा" ],
    keyFights: [ "क्रियते → passive लट् of √कृ", "प्रोक्तम् → PPP" ],
    vyakhya: [ { title: "Passive of √कृ", body: "क्रियते is passive present of √कृ — \"is done\". The agent goes to तृतीया, the patient to प्रथमा." } ]
  },
  '17.19': {
    anvaya: "मूढग्राहेण आत्मनः पीडया, परस्य उत्सादनार्थं वा यत् तपः क्रियते, तत् तामसम् उदाहृतम्",
    vibhaktiNotes: [ "मूढग्राहेण → तृतीया", "आत्मनः → षष्ठी", "उत्सादनार्थम् → adverb-of-purpose", "परस्य → षष्ठी" ],
    keyFights: [ "क्रियते repeated", "उदाहृतम् → PPP" ],
    vyakhya: [ { title: "Genitive of victim", body: "आत्मनः पीडया, परस्य उत्सादनार्थम् — षष्ठी marks whose-pain and whose-destruction. Genitive of victim/target." } ]
  },
  '17.20': {
    anvaya: "देशे काले च पात्रे च, अनुपकारिणे, दातव्यम् इति यत् दानं दीयते, तत् दानं सात्त्विकम् स्मृतम्",
    vibhaktiNotes: [ "देशे, काले, पात्रे → सप्तमी (locative)", "अनुपकारिणे → चतुर्थी (recipient)" ],
    keyFights: [ "दातव्यम् → -तव्य potential PP", "दीयते → passive लट् of √दा", "स्मृतम् → PPP" ],
    vyakhya: [ { title: "Dative of recipient", body: "पात्रे (locative \"in/to a worthy one\") shifts to अनुपकारिणे (dative — to-one-who-cannot-repay). Sanskrit lets either case mark recipient." } ]
  },
  '17.21': {
    anvaya: "तु यत् प्रत्युपकारार्थं, फलं उद्दिश्य, परिक्लिष्टं वा पुनः दीयते, तत् दानं राजसं स्मृतम्",
    vibhaktiNotes: [ "प्रत्युपकारार्थम् → adverb-of-purpose", "फलम् → द्वितीया (object of उद्दिश्य)" ],
    keyFights: [ "उद्दिश्य → absolutive", "परिक्लिष्टम् → PPP" ],
    vyakhya: [ { title: "Adverb stack of motive", body: "Two motive-markers: -अर्थम् (\"for the sake of\") and उद्दिश्य (\"having-aimed-at\"). Both express purpose grammatically." } ]
  },
  '17.22': {
    anvaya: "च यत् दानं अदेशकाले, अपात्रेभ्यः, असत्कृतम्, अवज्ञातं दीयते, तत् तामसम् उदाहृतम्",
    vibhaktiNotes: [ "अदेशकाले → सप्तमी", "अपात्रेभ्यः → चतुर्थी बहुवचन (recipient)" ],
    keyFights: [ "Two PPPs as predicates: असत्कृतम्, अवज्ञातम्", "उदाहृतम् → PPP" ],
    vyakhya: [ { title: "Dative plural of recipients", body: "अपात्रेभ्यः = चतुर्थी बहुवचन — \"to unworthy ones\". Recipient-plural takes -भ्यः ending." } ]
  },
  '17.23': {
    anvaya: "ॐ-तत्-सत् इति निर्देशः ब्रह्मणः त्रिविधः स्मृतः; तेन ब्राह्मणाः, वेदाः, यज्ञाः च पुरा विहिताः",
    vibhaktiNotes: [ "ब्रह्मणः → षष्ठी", "तेन → तृतीया (\"by that\")" ],
    keyFights: [ "स्मृतः, विहिताः → PPPs", "इति marks the threefold designation" ],
    vyakhya: [ { title: "Designation by इति", body: "X इति निर्देशः = \"the designation X\". इति quotes the very label being identified." } ]
  },
  '17.24': {
    anvaya: "तस्मात् ब्रह्मवादिनां विहिताः यज्ञ-दान-तप-क्रियाः सततं ॐ इति उदाहृत्य प्रवर्तन्ते",
    vibhaktiNotes: [ "ब्रह्मवादिनाम् → षष्ठी बहुवचन", "विहिताः क्रियाः → प्रथमा बहुवचन subject" ],
    keyFights: [ "उदाहृत्य → absolutive (\"having-uttered\")", "प्रवर्तन्ते → लट् 3pl Ā" ],
    vyakhya: [ { title: "Absolutive of vocal act", body: "उदाहृत्य = \"having uttered\". The absolutive captures the prior vocal action that frames every Vedic act." } ]
  },
  '17.25': {
    anvaya: "तत् इति अनभिसन्धाय फलं विविधाः यज्ञ-तपः-क्रियाः, दानक्रियाः च मोक्षकाङ्क्षिभिः क्रियन्ते",
    vibhaktiNotes: [ "मोक्षकाङ्क्षिभिः → तृतीया बहुवचन (agent of passive)", "फलम् → द्वितीया" ],
    keyFights: [ "अनभिसन्धाय → negated absolutive (\"without-aiming-at\")", "क्रियन्ते → passive लट् 3pl" ],
    vyakhya: [ { title: "Passive plural", body: "क्रियन्ते is passive 3pl of √कृ — agents go to तृतीया, the actions sit in प्रथमा. Standard passive transformation." } ]
  },
  '17.26': {
    anvaya: "सद्भावे साधुभावे च सत् इति एतत् प्रयुज्यते; तथा प्रशस्ते कर्मणि सत्-शब्दः पार्थ युज्यते",
    vibhaktiNotes: [ "सद्भावे, साधुभावे, प्रशस्ते कर्मणि → सप्तमी (locative of usage-context)", "पार्थ → सम्बोधन" ],
    keyFights: [ "प्रयुज्यते, युज्यते → passive लट्", "इति marks the word being defined" ],
    vyakhya: [ { title: "Locative of usage", body: "When defining word-usage, सप्तमी marks the context: \"in-X-context the word means Y.\"" } ]
  },
  '17.27': {
    anvaya: "यज्ञे, तपसि, दाने च स्थितिः सत् इति च उच्यते; तथा कर्म एव तदर्थीयं सत् इति एव अभिधीयते",
    vibhaktiNotes: [ "यज्ञे, तपसि, दाने → सप्तमी (locative)", "कर्म → प्रथमा" ],
    keyFights: [ "उच्यते, अभिधीयते → twin passives (\"is called\")", "तदर्थीयम् = compound \"for-that-purpose\"" ],
    vyakhya: [ { title: "Twin passive", body: "उच्यते and अभिधीयते are near-synonyms — both \"is called\". Sanskrit allows lexical variation while preserving exact grammar." } ]
  },
  '17.28': {
    anvaya: "पार्थ, अश्रद्धया हुतं, दत्तं, तपः तप्तम्, कृतं च यत्, तत् असत् इति उच्यते; न च तत् नो इह न च प्रेत्य (फलम्)",
    vibhaktiNotes: [ "अश्रद्धया → तृतीया (means)", "हुतम्, दत्तम्, तप्तम्, कृतम् → PPPs as subjects" ],
    keyFights: [ "Four PPPs in प्रथमा (\"the offered, given, austere-d, done\")", "प्रेत्य → indeclinable absolutive (\"after-death\")" ],
    vyakhya: [ { title: "PPP as substantivised subject", body: "PPPs in नपुंसकलिंग प्रथमा act as nouns: हुतम् = \"that-which-was-offered\". Action-noun by past participle." } ]
  },

  // ── Chapter 18 — Mokṣa-Sannyāsa Yoga ──────────────────────────────────
  '18.1': {
    anvaya: "(अर्जुन उवाच) — महाबाहो हृषीकेश केशिनिषूदन, संन्यासस्य तत्त्वम्, च त्यागस्य तत्त्वं पृथक् वेदितुम् इच्छामि",
    vibhaktiNotes: [ "Three सम्बोधन (vocatives) of Krishna", "संन्यासस्य, त्यागस्य → षष्ठी" ],
    keyFights: [ "वेदितुम् → infinitive of √विद्", "इच्छामि → लट् 1sg of √इष्" ],
    vyakhya: [ { title: "Infinitive of purpose", body: "इच्छामि + tum-infinitive = \"I wish to know.\" Standard volition + infinitive frame." } ]
  },
  '18.2': {
    anvaya: "(श्रीभगवान् उवाच) — कविभिः काम्यानां कर्मणां न्यासः संन्यासः इति विदुः; सर्वकर्मफलत्यागं विचक्षणाः त्यागम् प्राहुः",
    vibhaktiNotes: [ "कविभिः, विचक्षणाः → तृतीया/प्रथमा (agent)", "काम्यानां कर्मणाम् → षष्ठी बहुवचन" ],
    keyFights: [ "विदुः, प्राहुः → \"they know / they say\"", "न्यासः vs त्यागः — terminological distinction" ],
    vyakhya: [ { title: "Two terms, two definitions", body: "Two parallel definitional structures separated by तु. \"Saṁnyāsa is X / tyāga is Y\" — Sanskrit's preferred pedagogical pairing." } ]
  },
  '18.3': {
    anvaya: "एके मनीषिणः \"कर्म दोषवत् त्याज्यम्\" इति प्राहुः, अपरे \"यज्ञदानतपःकर्म न त्याज्यम्\" इति",
    vibhaktiNotes: [ "एके...अपरे → प्रथमा बहुवचन (\"some...others\")" ],
    keyFights: [ "त्याज्यम् → -य potential PP", "Two इति-quoted positions" ],
    vyakhya: [ { title: "Two इतis as debate", body: "Two इति-quotations frame two opposing scholastic positions; the structure is itself a doxography in miniature." } ]
  },
  '18.4': {
    anvaya: "भरतसत्तम पुरुषव्याघ्र, तत्र त्यागे मे निश्चयं श्रृणु; त्यागः हि त्रिविधः सम्प्रकीर्तितः",
    vibhaktiNotes: [ "Two सम्बोधन", "मे → षष्ठी", "त्यागे → सप्तमी" ],
    keyFights: [ "श्रृणु → लोट्", "सम्प्रकीर्तितः → PPP" ],
    vyakhya: [ { title: "Triple frame again", body: "Like श्रद्धा and तपस् in chapter 17, त्याग now gets three-fold analysis. The 17–18 chapters share an analytic engine." } ]
  },
  '18.5': {
    anvaya: "यज्ञ-दान-तपः कर्म न त्याज्यं, कार्यम् एव तत्; यज्ञः, दानं, तपः च एव मनीषिणां पावनानि (सन्ति)",
    vibhaktiNotes: [ "मनीषिणाम् → षष्ठी बहुवचन" ],
    keyFights: [ "त्याज्यम्, कार्यम् → -य potential PPs (\"to-be-abandoned\", \"to-be-done\")", "Implicit सन्ति in second half" ],
    vyakhya: [ { title: "Twin -य PPs", body: "त्याज्यम् vs कार्यम् sets up a deontic contrast: \"not-to-be-abandoned, but-to-be-done.\" The -य suffix marks both." } ]
  },
  '18.6': {
    anvaya: "पार्थ, एतानि अपि कर्माणि सङ्गं फलानि च त्यक्त्वा कर्तव्यानि — इति मे निश्चितम् मतम् उत्तमम्",
    vibhaktiNotes: [ "एतानि कर्माणि → प्रथमा बहुवचन", "सङ्गम्, फलानि → द्वितीया (objects of त्यक्त्वा)", "मे → षष्ठी" ],
    keyFights: [ "त्यक्त्वा → absolutive", "कर्तव्यानि → -तव्य potential PP बहुवचन", "इति marks the doctrine" ],
    vyakhya: [ { title: "Doctrine via इति", body: "The whole verse is one इति-quoted teaching: \"this is my certain best opinion.\" Quoted self-doctrine." } ]
  },
  '18.7': {
    anvaya: "नियतस्य कर्मणः संन्यासः न उपपद्यते; मोहात् तस्य परित्यागः तामसः परिकीर्तितः",
    vibhaktiNotes: [ "नियतस्य कर्मणः → षष्ठी", "मोहात् → पञ्चमी (cause)", "तस्य → षष्ठी" ],
    keyFights: [ "उपपद्यते, परिकीर्तितः → लट् passive + PPP", "Ablative of cause: मोहात्" ],
    vyakhya: [ { title: "Genitive of action", body: "नियतस्य कर्मणः संन्यासः = \"renunciation of the prescribed action\" — षष्ठी for what-is-being-renounced." } ]
  },
  '18.8': {
    anvaya: "यः दुःखम् इति एव कर्म कायक्लेशभयात् त्यजेत्, सः राजसं त्यागं कृत्वा त्यागफलं न लभेत्",
    vibhaktiNotes: [ "कर्म → द्वितीया", "कायक्लेशभयात् → पञ्चमी (cause-fear)", "त्यागम्, फलम् → द्वितीया" ],
    keyFights: [ "त्यजेत्, लभेत् → optatives (विधिलिङ्)", "कृत्वा → absolutive" ],
    vyakhya: [ { title: "Twin optatives", body: "Both verbs in विधिलिङ् — the verse describes a hypothetical/conditional pattern: \"who-should-renounce gets-no-fruit\"." } ]
  },
  '18.9': {
    anvaya: "अर्जुन, \"कर्तव्यम्\" इति एव यत् कर्म नियतं क्रियते — सङ्गं फलं च त्यक्त्वा — सः त्यागः सात्त्विकः मतः",
    vibhaktiNotes: [ "अर्जुन → सम्बोधन", "सङ्गम्, फलम् → द्वितीया" ],
    keyFights: [ "क्रियते → passive लट्", "त्यक्त्वा → absolutive", "मतः → PPP" ],
    vyakhya: [ { title: "इति-as-attitude", body: "\"कर्तव्यम्\" इति marks the inner attitude — \"with the thought 'this must be done'\". इति captures the mental disposition." } ]
  },
  '18.10': {
    anvaya: "(यः) कुशले कर्मणि न अनुषज्जते, अकुशले न द्वेष्टि — मेधावी, सत्त्वसमाविष्टः, छिन्नसंशयः त्यागी (अस्ति)",
    vibhaktiNotes: [ "कुशले कर्मणि, अकुशले → सप्तमी (locative)", "Predicate adjectives → प्रथमा" ],
    keyFights: [ "अनुषज्जते, द्वेष्टि → लट् 3sg Ā/P", "Three predicate adjectives in प्रथमा" ],
    vyakhya: [ { title: "Locative with अनुषज्ज्", body: "अनु + √सञ्ज् takes सप्तमी for what-one-clings-to. Cling-to-X uses locative, parallel to attachment-locatives in Ch 14." } ]
  },
  '18.11': {
    anvaya: "देहभृता हि सर्वशः कर्माणि त्यक्तुं न शक्यम्; तु यः कर्मफलत्यागी सः त्यागी इति अभिधीयते",
    vibhaktiNotes: [ "देहभृता → तृतीया (agent)", "कर्माणि → द्वितीया (object of infinitive)" ],
    keyFights: [ "त्यक्तुम् → infinitive", "शक्यम् → -य passive potential (\"is-possible\")", "अभिधीयते → passive लट्" ],
    vyakhya: [ { title: "Infinitive + शक्य", body: "शक्य + tum-infinitive = \"X is possible to do.\" Standard impersonal-possibility frame." } ]
  },
  '18.12': {
    anvaya: "अत्यागिनां प्रेत्य कर्मणः फलं त्रिविधं भवति — अनिष्टम्, इष्टम्, मिश्रं च; तु संन्यासिनां न क्वचित् (भवति)",
    vibhaktiNotes: [ "अत्यागिनाम्, संन्यासिनाम् → षष्ठी बहुवचन", "कर्मणः → षष्ठी", "प्रेत्य → indeclinable" ],
    keyFights: [ "Genitive of possessor of fruit", "क्वचित् = \"ever-anywhere\" (indeclinable)" ],
    vyakhya: [ { title: "Genitive of possessor", body: "अत्यागिनां फलम् = \"fruit of/for the non-renouncers\" — षष्ठी for whose-fruit it is. Possession by genitive." } ]
  },
  '18.13': {
    anvaya: "महाबाहो, मे एतानि साङ्ख्ये कृतान्ते सर्वकर्मणां सिद्धये उक्तानि कारणानि पञ्च निबोध",
    vibhaktiNotes: [ "मे → षष्ठी", "साङ्ख्ये कृतान्ते → सप्तमी (\"in the Sāṅkhya conclusion\")", "सिद्धये → चतुर्थी (purpose)" ],
    keyFights: [ "उक्तानि → PPP", "निबोध → लोट् 2sg of नि + √बुध्" ],
    vyakhya: [ { title: "Dative of accomplishment", body: "सिद्धये = चतुर्थी (\"for-the-accomplishment\"). Dative of purpose marks toward-which-end." } ]
  },
  '18.14': {
    anvaya: "अधिष्ठानं, तथा कर्ता, करणं च पृथग्विधम्, विविधाः च पृथक् चेष्टाः, दैवं च एव पञ्चमं अत्र (सन्ति)",
    vibhaktiNotes: [ "All five items → प्रथमा (subject-list)" ],
    keyFights: [ "Implicit सन्ति", "Five items naming the five कारण from 18.13" ],
    vyakhya: [ { title: "Five-fold enumeration", body: "Five items in प्रथमा = the five causes promised in 18.13. Enumeration without verb is Sanskrit-standard for lists." } ]
  },
  '18.15': {
    anvaya: "नरः शरीरवाङ्मनोभिः यत् कर्म न्याय्यं वा विपरीतं वा प्रारभते, एते पञ्च तस्य हेतवः (सन्ति)",
    vibhaktiNotes: [ "शरीरवाङ्मनोभिः → तृतीया बहुवचन (instruments)", "कर्म → द्वितीया", "तस्य → षष्ठी" ],
    keyFights: [ "प्रारभते → लट् 3sg Ā", "हेतवः = -उ stem in प्रथमा बहुवचन" ],
    vyakhya: [ { title: "Three-instrument compound", body: "शरीर-वाक्-मनस् three-fold dvandva in तृतीया plural — \"by body, speech, mind.\" The three avenues of action." } ]
  },
  '18.16': {
    anvaya: "तत्र एवं सति, अकृतबुद्धित्वात्, यः केवलं आत्मानं कर्तारं पश्यति — सः दुर्मतिः न पश्यति",
    vibhaktiNotes: [ "अकृतबुद्धित्वात् → पञ्चमी (cause)", "आत्मानम्, कर्तारम् → द्वितीया" ],
    keyFights: [ "एवं सति = locative absolute (\"this being so\")", "Two पश्यति — sees / does-not-see" ],
    vyakhya: [ { title: "Locative absolute", body: "एवं सति is the textbook locative absolute: \"this being so\". A reduced clause with both noun-and-participle in सप्तमी." } ]
  },
  '18.17': {
    anvaya: "यस्य अहङ्कृतः भावः न (अस्ति), यस्य बुद्धिः न लिप्यते — सः इमान् लोकान् हत्वा अपि न हन्ति न निबध्यते",
    vibhaktiNotes: [ "यस्य → षष्ठी (relative)", "इमान् लोकान् → द्वितीया" ],
    keyFights: [ "हत्वा → absolutive", "हन्ति, निबध्यते → लट् 3sg" ],
    vyakhya: [ { title: "Paradox of non-binding action", body: "हत्वा अपि न हन्ति = \"having killed, does not kill\". Absolutive + finite + अपि = paradoxical \"even-though-X, not-Y\"." } ]
  },
  '18.18': {
    anvaya: "ज्ञानं, ज्ञेयं, परिज्ञाता — इति त्रिविधा कर्मचोदना; करणं, कर्म, कर्ता — इति त्रिविधः कर्मसङ्ग्रहः",
    vibhaktiNotes: [ "All items → प्रथमा (definitions)" ],
    keyFights: [ "Two parallel triple definitions joined by इति", "-तृ agent suffix in परिज्ञाता, कर्ता" ],
    vyakhya: [ { title: "Six categories, two triples", body: "Two triple-noun lists structurally mirror each other — knowledge-side vs action-side. Pure Sanskrit list-pedagogy." } ]
  },
  '18.19': {
    anvaya: "गुणसङ्ख्याने ज्ञानं च, कर्म, कर्ता च — गुणभेदतः त्रिधा एव प्रोक्तं; तान् यथावत् श्रृणु",
    vibhaktiNotes: [ "गुणसङ्ख्याने → सप्तमी (\"in the Sāṅkhya analysis\")", "गुणभेदतः → -तस् ablative-adverb", "तान् → द्वितीया" ],
    keyFights: [ "प्रोक्तम् → PPP", "श्रृणु → लोट्" ],
    vyakhya: [ { title: "-तस् adverb", body: "गुणभेदतः = \"by guṇa-difference\" — the -तस् ending makes a flexible ablative-adverb, common in technical Sanskrit." } ]
  },
  '18.20': {
    anvaya: "येन सर्वभूतेषु एकं भावम् अव्ययम् ईक्षते, अविभक्तं विभक्तेषु — तत् ज्ञानं सात्त्विकं विद्धि",
    vibhaktiNotes: [ "येन → तृतीया (instrumental — \"by which\")", "सर्वभूतेषु, विभक्तेषु → सप्तमी बहुवचन" ],
    keyFights: [ "ईक्षते → लट् 3sg Ā of √ईक्ष्", "विद्धि → लोट्" ],
    vyakhya: [ { title: "Instrumental relative", body: "येन = \"by which\" — instrumental relative pronoun. The means-by-which is consistently तृतीया even in relative form." } ]
  },
  '18.21': {
    anvaya: "तु यत् ज्ञानं सर्वेषु भूतेषु पृथक्त्वेन नानाभावान् पृथग्विधान् वेत्ति, तत् ज्ञानं विद्धि राजसम्",
    vibhaktiNotes: [ "सर्वेषु भूतेषु → सप्तमी बहुवचन", "नानाभावान् → द्वितीया बहुवचन" ],
    keyFights: [ "पृथक्त्वेन → तृतीया (manner — \"by separateness\")", "वेत्ति → लट् 3sg of √विद्" ],
    vyakhya: [ { title: "Instrumental of manner", body: "पृथक्त्वेन = \"with-separateness, in-a-divided-way\". -त्व abstract noun + तृतीया = adverbial manner." } ]
  },
  '18.22': {
    anvaya: "तु यत् कृत्स्नवत् एकस्मिन् कार्ये सक्तम्, अहैतुकम्, अतत्त्वार्थवत् अल्पम् (ज्ञानम्) — तत् तामसम् उदाहृतम्",
    vibhaktiNotes: [ "एकस्मिन् कार्ये → सप्तमी (\"in one task\")", "All adjectives → प्रथमा (qualifying ज्ञानम्)" ],
    keyFights: [ "वत् simile-suffix twice: कृत्स्नवत्, अतत्त्वार्थवत्", "उदाहृतम् → PPP" ],
    vyakhya: [ { title: "वत् simile and similarity", body: "कृत्स्नवत् = \"as-if-the-whole\" — -वत् gives \"like, as\". Used twice in this verse to mark surface-similarity vs reality." } ]
  },
  '18.23': {
    anvaya: "नियतम्, सङ्गरहितम्, अरागद्वेषतः कृतम्, अफलप्रेप्सुना (कर्तृणा कृतम्) — तत् कर्म सात्त्विकम् उच्यते",
    vibhaktiNotes: [ "All adjectives → प्रथमा (qualifying कर्म)", "अफलप्रेप्सुना → तृतीया (agent)" ],
    keyFights: [ "अरागद्वेषतः → -तस् ablative-adverb (\"without-attachment-or-aversion\")", "उच्यते → passive लट्" ],
    vyakhya: [ { title: "Sattvic action by agent-quality", body: "The instrumental अफलप्रेप्सुना brings in agent-quality: not just the act, but who acts and how, defines sāttvic-ness." } ]
  },
  '18.24': {
    anvaya: "तु यत् कर्म कामेप्सुना, साहङ्कारेण वा, बहुलायासं क्रियते — तत् राजसम् उदाहृतम्",
    vibhaktiNotes: [ "कामेप्सुना, साहङ्कारेण → तृतीया (agent/manner)", "बहुलायासम् → द्वितीया-adverbial" ],
    keyFights: [ "क्रियते → passive लट्", "Three तृतीयाs giving manner/agent" ],
    vyakhya: [ { title: "Adverbial accusative", body: "बहुलायासम् in द्वितीया works adverbially — \"with-much-effort\". Accusative-of-manner is a common Sanskrit pattern." } ]
  },
  '18.25': {
    anvaya: "अनुबन्धम्, क्षयम्, हिंसाम्, पौरुषं च अनवेक्ष्य, मोहात् यत् आरभ्यते — तत् तामसम् उच्यते",
    vibhaktiNotes: [ "अनुबन्धम्, क्षयम्, हिंसाम्, पौरुषम् → द्वितीया (objects of अनवेक्ष्य)", "मोहात् → पञ्चमी (cause)" ],
    keyFights: [ "अनवेक्ष्य → negated absolutive (\"without considering\")", "आरभ्यते → passive लट्" ],
    vyakhya: [ { title: "Negated absolutive", body: "अन-अवेक्ष्य = \"without considering\" — negated absolutive cleanly expresses \"without doing X first\"." } ]
  },
  '18.26': {
    anvaya: "मुक्तसङ्गः, अनहंवादी, धृत्युत्साहसमन्वितः, सिद्ध्यसिद्ध्योः निर्विकारः — कर्ता सात्त्विकः उच्यते",
    vibhaktiNotes: [ "All adjectives → प्रथमा एकवचन (predicates of कर्ता)", "सिद्ध्यसिद्ध्योः → सप्तमी द्विवचन" ],
    keyFights: [ "Five bahuvrīhi/PPP adjectives", "निर्विकार + सप्तमी द्विवचन = unmoved-in-(the-pair)" ],
    vyakhya: [ { title: "Locative dual of indifference", body: "सिद्ध्यसिद्ध्योः = locative dual of \"success-and-failure\" — \"unmoved IN the pair\". Equanimity always uses dual locatives." } ]
  },
  '18.27': {
    anvaya: "रागी, कर्मफलप्रेप्सुः, लुब्धः, हिंसात्मकः, अशुचिः, हर्षशोकान्वितः — कर्ता राजसः परिकीर्तितः",
    vibhaktiNotes: [ "All adjectives → प्रथमा (qualifying कर्ता)" ],
    keyFights: [ "Six predicate adjectives", "परिकीर्तितः → PPP" ],
    vyakhya: [ { title: "Stack-of-predicate-adjectives", body: "When listing many qualities of one subject, Sanskrit just stacks them all in matching case (here प्रथमा एकवचन). No conjunctions needed." } ]
  },
  '18.28': {
    anvaya: "अयुक्तः, प्राकृतः, स्तब्धः, शठः, नैष्कृतिकः, अलसः, विषादी, दीर्घसूत्री च — कर्ता तामसः उच्यते",
    vibhaktiNotes: [ "All adjectives → प्रथमा एकवचन" ],
    keyFights: [ "Eight predicate adjectives", "उच्यते closes" ],
    vyakhya: [ { title: "-इन् stem", body: "विषाद-इन्, दीर्घसूत्र-इन् → -इन् possessor stem. विषादी (नोम.स्ग.) = \"having despondency\"." } ]
  },
  '18.29': {
    anvaya: "धनञ्जय, बुद्धेः गुणतः त्रिविधं भेदं, धृतेः च (त्रिविधं भेदं) अशेषेण पृथक्त्वेन प्रोच्यमानं श्रृणु",
    vibhaktiNotes: [ "बुद्धेः, धृतेः → षष्ठी", "गुणतः → -तस् ablative-adverb", "धनञ्जय → सम्बोधन" ],
    keyFights: [ "प्रोच्यमानम् → present passive participle (\"being-spoken\")", "श्रृणु → लोट्" ],
    vyakhya: [ { title: "Present passive participle", body: "प्र + उच्यमान- = \"being-uttered\". -मान suffix on passive stem. Often serves as adjective for unfolding action." } ]
  },
  '18.30': {
    anvaya: "पार्थ, या प्रवृत्तिं च निवृत्तिं च, कार्याकार्ये भयाभये, बन्धं मोक्षं च वेत्ति — सा बुद्धिः सात्त्विकी",
    vibhaktiNotes: [ "All द्वितीया objects of वेत्ति", "कार्याकार्ये, भयाभये → सप्तमी द्विवचन (locative dual)" ],
    keyFights: [ "वेत्ति → लट् 3sg of √विद्", "Six द्वितीया objects + two सप्तमी द्विवचन" ],
    vyakhya: [ { title: "Sattvic intellect knows pairs", body: "Sāttvic buddhi distinguishes opposed pairs — and Sanskrit uses dual locatives to express \"in the (pair of) X-and-Y\"." } ]
  },
  '18.31': {
    anvaya: "पार्थ, यया धर्मम् अधर्मं च, कार्यं अकार्यं च एव अयथावत् प्रजानाति — सा बुद्धिः राजसी",
    vibhaktiNotes: [ "यया → तृतीया (\"by which\")", "धर्मम्, अधर्मम्, कार्यम्, अकार्यम् → द्वितीया" ],
    keyFights: [ "अयथावत् → adverb (\"not-as-it-is\")", "प्रजानाति → लट् 3sg" ],
    vyakhya: [ { title: "Adverb of inadequacy", body: "अयथावत् = \"not-properly\". Sanskrit forms negative-manner adverbs by negating an adverb-base." } ]
  },
  '18.32': {
    anvaya: "पार्थ, या तमसा आवृता अधर्मं धर्मम् इति मन्यते, सर्वार्थान् च विपरीतान् (मन्यते) — सा बुद्धिः तामसी",
    vibhaktiNotes: [ "तमसा → तृतीया (instrumental of agent)", "अधर्मम्, धर्मम् → द्वितीया (double-accusative)" ],
    keyFights: [ "आवृता → PPP feminine", "मन्यते → लट् 3sg Ā" ],
    vyakhya: [ { title: "Double-accusative \"thinks X (to be) Y\"", body: "अधर्मम् धर्मम् मन्यते = \"thinks adharma to be dharma.\" Verbs of considering take both object and predicate-object in द्वितीया." } ]
  },
  '18.33': {
    anvaya: "पार्थ, यया अव्यभिचारिण्या धृत्या मनःप्राणेन्द्रियक्रियाः योगेन धारयते — सा धृतिः सात्त्विकी",
    vibhaktiNotes: [ "यया धृत्या → तृतीया (instrumental)", "योगेन → तृतीया", "क्रियाः → द्वितीया" ],
    keyFights: [ "धारयते → causative लट् 3sg Ā", "अव्यभिचारिण्या → feminine -इन् instrumental" ],
    vyakhya: [ { title: "Causative middle", body: "धारयते = causative \"makes-hold\" in Ā-pada — \"holds-for-oneself\". Causative-with-middle voice marks self-directed control." } ]
  },
  '18.34': {
    anvaya: "अर्जुन, यया तु धर्मकामार्थान्, फलाकाङ्क्षी प्रसङ्गेन धृत्या धारयते — सा राजसी",
    vibhaktiNotes: [ "धर्मकामार्थान् → द्वितीया बहुवचन", "फलाकाङ्क्षी → प्रथमा (subject)", "प्रसङ्गेन → तृतीया (manner)" ],
    keyFights: [ "Three-member dvandva-tatpuruṣa: धर्म-काम-अर्थ", "धारयते repeated from 18.33" ],
    vyakhya: [ { title: "Triad-as-object", body: "धर्म-काम-अर्थ as three-member compound in accusative — the puruṣārthas grouped and held-onto by rajasic dhṛti." } ]
  },
  '18.35': {
    anvaya: "पार्थ, यया दुर्मेधाः स्वप्नं भयं शोकं विषादं मदं च न विमुञ्चति — सा धृतिः तामसी",
    vibhaktiNotes: [ "स्वप्नम्, भयम्, शोकम्, विषादम्, मदम् → द्वितीया (objects of विमुञ्चति)" ],
    keyFights: [ "विमुञ्चति → लट् 3sg of वि + √मुच्", "दुर्मेधाः → प्रथमा (subject)" ],
    vyakhya: [ { title: "Five-fold object list", body: "Five द्वितीया objects of one verb. Sanskrit happily strings co-ordinated objects without explicit \"and\" (च often appears just at the end)." } ]
  },
  '18.36': {
    anvaya: "भरतर्षभ, इदानीं त्रिविधं सुखं मे श्रृणु — यत्र अभ्यासात् रमते, दुःखान्तं च निगच्छति",
    vibhaktiNotes: [ "मे → षष्ठी", "अभ्यासात् → पञ्चमी (\"from practice\")", "दुःखान्तम् → द्वितीया" ],
    keyFights: [ "रमते, निगच्छति → लट् 3sg", "श्रृणु → लोट्" ],
    vyakhya: [ { title: "Ablative of source-of-process", body: "अभ्यासात् रमते = \"finds-joy from practice\". पञ्चमी for \"by-virtue-of\" is common with verbs of state-arising." } ]
  },
  '18.37': {
    anvaya: "यत् अग्रे विषम् इव परिणामे अमृतोपमम्, आत्मबुद्धिप्रसादजं तत् सुखं सात्त्विकं प्रोक्तम्",
    vibhaktiNotes: [ "अग्रे, परिणामे → सप्तमी (\"at start, at end\")", "विषम्, अमृतोपमम् → प्रथमा predicates" ],
    keyFights: [ "इव simile particle", "प्रोक्तम् → PPP" ],
    vyakhya: [ { title: "Locative of process-stage", body: "अग्रे (at the beginning), परिणामे (at the end) — सप्तमी for stages of a process. Time-points in locative." } ]
  },
  '18.38': {
    anvaya: "विषयेन्द्रियसंयोगात् यत् अग्रे अमृतोपमम्, परिणामे विषम् इव — तत् सुखं राजसं स्मृतम्",
    vibhaktiNotes: [ "विषयेन्द्रियसंयोगात् → पञ्चमी (\"from the union of senses-and-objects\")" ],
    keyFights: [ "Mirror of 18.37 with start/end reversed", "स्मृतम् → PPP" ],
    vyakhya: [ { title: "Inverted parallel", body: "18.37 and 18.38 are structurally identical but invert the start-end values: sattvic = bitter→sweet, rajasic = sweet→bitter." } ]
  },
  '18.39': {
    anvaya: "यत् सुखं अग्रे च अनुबन्धे च आत्मनः मोहनम्, निद्रालस्यप्रमादोत्थं — तत् तामसम् उदाहृतम्",
    vibhaktiNotes: [ "अग्रे, अनुबन्धे → सप्तमी", "आत्मनः → षष्ठी" ],
    keyFights: [ "उत्थम् = -उत्थ from उद्-√स्था (\"arising-from\")", "उदाहृतम् → PPP" ],
    vyakhya: [ { title: "-उत्थ origin-suffix", body: "X-उत्थ = \"arising-from-X\" (lit. \"stood-up-from\"). Forms compounds expressing source." } ]
  },
  '18.40': {
    anvaya: "पृथिव्यां, दिवि देवेषु वा पुनः, यत् सत्त्वं प्रकृतिजैः एभिः त्रिभिः गुणैः मुक्तं स्यात् — तत् न (अस्ति)",
    vibhaktiNotes: [ "पृथिव्याम्, दिवि → सप्तमी", "देवेषु → सप्तमी बहुवचन", "त्रिभिः गुणैः → तृतीया बहुवचन" ],
    keyFights: [ "स्यात् → optative विधिलिङ्", "मुक्तम् + तृतीया = \"freed-from-X\"" ],
    vyakhya: [ { title: "Optative for non-existence", body: "स्यात् + न = \"would-not-be\". The optative softens the absolute claim into a hypothetical denial." } ]
  },
  '18.41': {
    anvaya: "परन्तप, ब्राह्मण-क्षत्रिय-विशां, शूद्राणां च कर्माणि स्वभावप्रभवैः गुणैः प्रविभक्तानि (सन्ति)",
    vibhaktiNotes: [ "ब्राह्मणक्षत्रियविशाम्, शूद्राणाम् → षष्ठी बहुवचन", "गुणैः → तृतीया बहुवचन (means)" ],
    keyFights: [ "प्रविभक्तानि → PPP बहुवचन", "Implicit सन्ति" ],
    vyakhya: [ { title: "PPP plural as predicate", body: "कर्माणि प्रविभक्तानि = \"the duties (are) divided\". PPP + implied \"are\" forms a complete passive predicate." } ]
  },
  '18.42': {
    anvaya: "ब्राह्मणानां स्वभावजं कर्म — शमः, दमः, तपः, शौचम्, क्षान्तिः, आर्जवम्, ज्ञानम्, विज्ञानम्, आस्तिक्यम्",
    vibhaktiNotes: [ "ब्राह्मणानाम् → षष्ठी बहुवचन", "All items → प्रथमा" ],
    keyFights: [ "Verb-less list (implicit अस्ति)", "Nine virtues enumerated" ],
    vyakhya: [ { title: "List as predicate", body: "After \"X's nature-born duty (is)\", Sanskrit drops the \"is\" and lists the predicate-items in प्रथमा." } ]
  },
  '18.43': {
    anvaya: "क्षात्रं कर्म स्वभावजं — शौर्यम्, तेजः, धृतिः, दाक्ष्यं, युद्धे च अपलायनम्, दानम्, ईश्वरभावः च",
    vibhaktiNotes: [ "युद्धे → सप्तमी (\"in battle\")", "All items → प्रथमा" ],
    keyFights: [ "Same list-pattern as 18.42", "अपलायनम् = negated -अन abstract noun" ],
    vyakhya: [ { title: "Locative of context", body: "युद्धे अपलायनम् = \"non-fleeing IN battle\" — सप्तमी marks the situational context for the kṣatriya quality." } ]
  },
  '18.44': {
    anvaya: "वैश्यानां स्वभावजं कर्म — कृषिगौरक्ष्यवाणिज्यम्; च शूद्राणां स्वभावजं कर्म — परिचर्यात्मकं (अस्ति)",
    vibhaktiNotes: [ "वैश्यानाम्, शूद्राणाम् → षष्ठी बहुवचन" ],
    keyFights: [ "Compound कृषि-गौरक्ष्य-वाणिज्यम् as single predicate", "परिचर्यात्मकम् = -आत्मक adjective" ],
    vyakhya: [ { title: "Compound as predicate noun", body: "कृषि-गौरक्ष्य-वाणिज्यम् is a three-member dvandva functioning as a single neuter predicate noun." } ]
  },
  '18.45': {
    anvaya: "स्वे स्वे कर्मणि अभिरतः नरः संसिद्धिं लभते; स्वकर्मनिरतः सिद्धिं यथा विन्दति, तत् श्रृणु",
    vibhaktiNotes: [ "स्वे स्वे कर्मणि → सप्तमी (distributive — \"in-each-one's-own\")", "संसिद्धिम्, सिद्धिम् → द्वितीया" ],
    keyFights: [ "अभिरतः, निरतः → PPPs", "लभते, विन्दति → लट्" ],
    vyakhya: [ { title: "Distributive locative", body: "स्वे स्वे = \"each-in-his-own\" — Sanskrit doubles a possessive in locative for distributive sense." } ]
  },
  '18.46': {
    anvaya: "यतः भूतानां प्रवृत्तिः, येन इदं सर्वं ततं — तं स्वकर्मणा अभ्यर्च्य मानवः सिद्धिं विन्दति",
    vibhaktiNotes: [ "यतः → ablative-adverb (\"from whom\")", "येन → तृतीया (\"by whom\")", "स्वकर्मणा → तृतीया" ],
    keyFights: [ "अभ्यर्च्य → absolutive (\"having worshipped\")", "ततम् → PPP of √तन्" ],
    vyakhya: [ { title: "Two relatives, two cases", body: "यतः (ablative — source) and येन (instrumental — agent) describe the same supreme in two case-roles. Multiple-case relative chain." } ]
  },
  '18.47': {
    anvaya: "विगुणः स्वधर्मः सुष्ठ्वनुष्ठितात् परधर्मात् श्रेयान्; स्वभावनियतं कर्म कुर्वन् किल्बिषं न आप्नोति",
    vibhaktiNotes: [ "परधर्मात् → पञ्चमी (ablative of comparison)", "किल्बिषम् → द्वितीया" ],
    keyFights: [ "श्रेयान् + पञ्चमी = \"better-than\"", "कुर्वन् → present participle" ],
    vyakhya: [ { title: "Ablative of comparison", body: "X श्रेयान् Y-आत् = \"X is better than Y\". पञ्चमी consistently marks the standard-of-comparison." } ]
  },
  '18.48': {
    anvaya: "कौन्तेय, सहजं कर्म सदोषम् अपि न त्यजेत्; हि सर्वारम्भाः धूमेन अग्निः इव दोषेण आवृताः (सन्ति)",
    vibhaktiNotes: [ "सहजं कर्म → द्वितीया", "धूमेन, दोषेण → तृतीया (instrument of covering)" ],
    keyFights: [ "त्यजेत् → optative विधिलिङ्", "इव simile" ],
    vyakhya: [ { title: "Simile by इव", body: "\"As fire by smoke, so all undertakings by fault are covered\". इव marks the simile, the तृतीयाs match in both halves." } ]
  },
  '18.49': {
    anvaya: "सर्वत्र असक्तबुद्धिः, जितात्मा, विगतस्पृहः नैष्कर्म्यसिद्धिं संन्यासेन परमां अधिगच्छति",
    vibhaktiNotes: [ "सर्वत्र → adverb (\"everywhere\")", "नैष्कर्म्यसिद्धिम् → द्वितीया", "संन्यासेन → तृतीया" ],
    keyFights: [ "Three bahuvrīhi adjectives in प्रथमा", "अधिगच्छति → लट् 3sg" ],
    vyakhya: [ { title: "Bahuvrīhi as character-stack", body: "असक्तबुद्धि, जितात्मन्, विगतस्पृह — three bahuvrīhis describing one subject. Each names a quality possessed." } ]
  },
  '18.50': {
    anvaya: "कौन्तेय, सिद्धिं प्राप्तः यथा ब्रह्म आप्नोति, तथा समासेन एव मे निबोध; ज्ञानस्य या निष्ठा परा (तत्)",
    vibhaktiNotes: [ "सिद्धिम् → द्वितीया", "मे → षष्ठी", "ज्ञानस्य → षष्ठी" ],
    keyFights: [ "प्राप्तः → PPP", "निबोध → लोट्" ],
    vyakhya: [ { title: "Yathā-tathā again", body: "यथा...तथा pair frames a how-question: \"how X attains Y, that I'll teach.\" Standard didactic frame." } ]
  },
  '18.51': {
    anvaya: "विशुद्धया बुद्ध्या युक्तः, धृत्या आत्मानं नियम्य, शब्दादीन् विषयान् त्यक्त्वा, रागद्वेषौ व्युदस्य",
    vibhaktiNotes: [ "बुद्ध्या, धृत्या → तृतीया", "आत्मानम्, विषयान्, रागद्वेषौ → द्वितीया (objects of absolutives)" ],
    keyFights: [ "Three absolutives: नियम्य, त्यक्त्वा, व्युदस्य", "Predicate continues to 18.53" ],
    vyakhya: [ { title: "Absolutive cascade", body: "Three absolutives stacked before the eventual finite verb (in 18.53) — Sanskrit's way of describing a long preparatory sequence." } ]
  },
  '18.52': {
    anvaya: "विविक्तसेवी, लघ्वाशी, यतवाक्कायमानसः, ध्यानयोगपरः नित्यं, वैराग्यं समुपाश्रितः (एव)",
    vibhaktiNotes: [ "All adjectives → प्रथमा एकवचन" ],
    keyFights: [ "Five bahuvrīhi/PPP predicates", "Predicate-cluster continues from 18.51" ],
    vyakhya: [ { title: "Adjective accumulation", body: "Continuation of the bahuvrīhi cascade — five more qualities of the seeker, all in nominative agreement." } ]
  },
  '18.53': {
    anvaya: "अहङ्कारं, बलं, दर्पं, कामं, क्रोधं, परिग्रहं विमुच्य, निर्ममः, शान्तः ब्रह्मभूयाय कल्पते",
    vibhaktiNotes: [ "Six द्वितीया objects of विमुच्य", "ब्रह्मभूयाय → चतुर्थी (purpose)" ],
    keyFights: [ "विमुच्य → absolutive (\"having released\")", "कल्पते → लट् 3sg Ā — finally the finite verb" ],
    vyakhya: [ { title: "Finite arrives at last", body: "After 18.51–18.52 of preparatory absolutives and adjectives, कल्पते is the long-awaited finite verb closing the three-verse syntactic unit." } ]
  },
  '18.54': {
    anvaya: "ब्रह्मभूतः, प्रसन्नात्मा (सन्) न शोचति न काङ्क्षति; सर्वेषु भूतेषु समः परां मद्भक्तिं लभते",
    vibhaktiNotes: [ "सर्वेषु भूतेषु → सप्तमी बहुवचन", "परां मद्भक्तिम् → द्वितीया" ],
    keyFights: [ "Three लट् finites: शोचति, काङ्क्षति, लभते", "ब्रह्मभूतः → PPP" ],
    vyakhya: [ { title: "Locative of equality-domain", body: "सर्वेषु भूतेषु समः = \"equal IN/AMONG all beings\". The locative marks the domain over which equality applies." } ]
  },
  '18.55': {
    anvaya: "मां भक्त्या यः च अस्मि, यावान् च अस्मि, तत्त्वतः अभिजानाति; ततः मां तत्त्वतः ज्ञात्वा तदनन्तरं विशते",
    vibhaktiNotes: [ "मां → द्वितीया", "भक्त्या, तत्त्वतः → तृतीया/-तस् (means/manner)" ],
    keyFights: [ "अभिजानाति, विशते → लट् finites", "Three-times तत्त्वतः-style adverbial precision" ],
    vyakhya: [ { title: "Two-step abhi-jñāna", body: "First तत्त्वतः अभिजानाति (knows-truly), then तत्त्वतः ज्ञात्वा (having-known-truly), then विशते (enters). Knowledge is the door to entry." } ]
  },
  '18.56': {
    anvaya: "मद्व्यपाश्रयः सर्वकर्माणि सदा अपि कुर्वाणः, मत्प्रसादात् शाश्वतम् अव्ययं पदम् अवाप्नोति",
    vibhaktiNotes: [ "सर्वकर्माणि → द्वितीया बहुवचन", "मत्प्रसादात् → पञ्चमी (\"by my grace\")", "पदम् → द्वितीया" ],
    keyFights: [ "कुर्वाणः → present participle Ā (\"doing\")", "अवाप्नोति → लट् 3sg" ],
    vyakhya: [ { title: "Ablative of grace", body: "मत्प्रसादात् = \"from-my-grace\". पञ्चमी for the source of grace; the recipient remains in nominative-as-subject." } ]
  },
  '18.57': {
    anvaya: "चेतसा सर्वकर्माणि मयि संन्यस्य, मत्परः, बुद्धियोगम् उपाश्रित्य, मच्चित्तः सततं भव",
    vibhaktiNotes: [ "चेतसा → तृतीया", "मयि → सप्तमी (\"in me\")", "बुद्धियोगम् → द्वितीया" ],
    keyFights: [ "संन्यस्य, उपाश्रित्य → absolutives", "भव → लोट् 2sg of √भू" ],
    vyakhya: [ { title: "Locative of dedication", body: "मयि संन्यस्य = \"having-renounced INTO me\". सप्तमी for where-action-is-deposited." } ]
  },
  '18.58': {
    anvaya: "मच्चित्तः (सन्) त्वं मत्प्रसादात् सर्वदुर्गाणि तरिष्यसि; अथ चेद् त्वं अहङ्कारात् न श्रोष्यसि — (तर्हि) विनङ्क्ष्यसि",
    vibhaktiNotes: [ "मत्प्रसादात्, अहङ्कारात् → पञ्चमी (\"by/from\")", "सर्वदुर्गाणि → द्वितीया बहुवचन" ],
    keyFights: [ "Three लृट् futures: तरिष्यसि, श्रोष्यसि, विनङ्क्ष्यसि — note the -ष्य- infix throughout", "Conditional चेद्" ],
    vyakhya: [ { title: "Triple future warning", body: "Three लृट् futures in one verse with characteristic -ष्य- — the conditional structure \"if-not-X then-Y\" delivered in future tense." } ]
  },
  '18.59': {
    anvaya: "यद् त्वं अहङ्कारम् आश्रित्य \"न योत्स्ये\" इति मन्यसे, सः ते निश्चयः मिथ्या; प्रकृतिः त्वां नियोक्ष्यति",
    vibhaktiNotes: [ "अहङ्कारम् → द्वितीया (object of आश्रित्य)", "ते → षष्ठी" ],
    keyFights: [ "योत्स्ये → लृट् 1sg Ā of √युध् (\"I shall fight\")", "नियोक्ष्यति → लृट् 3sg of नि + √युज्" ],
    vyakhya: [ { title: "इति-quoted intention", body: "\"न योत्स्ये\" इति मन्यसे = \"you think 'I will not fight'\". इति captures Arjuna's exact internal proposition." } ]
  },
  '18.60': {
    anvaya: "कौन्तेय, स्वभावजेन स्वेन कर्मणा निबद्धः, यद् मोहात् न इच्छसि, अवशः अपि तत् करिष्यसि",
    vibhaktiNotes: [ "स्वेन कर्मणा → तृतीया (instrumental of binding)", "मोहात् → पञ्चमी (cause)", "तत् → द्वितीया" ],
    keyFights: [ "निबद्धः → PPP", "करिष्यसि → लृट् 2sg" ],
    vyakhya: [ { title: "Forced future", body: "Krishna predicts Arjuna's action with लृट् — \"you-will-do-it.\" The future tense functions as fated-prediction here." } ]
  },
  '18.61': {
    anvaya: "अर्जुन, ईश्वरः सर्वभूतानां हृद्देशे तिष्ठति; मायया सर्वभूतानि यन्त्रारूढानि भ्रामयन् (तिष्ठति)",
    vibhaktiNotes: [ "सर्वभूतानाम् → षष्ठी बहुवचन", "हृद्देशे → सप्तमी", "मायया → तृतीया" ],
    keyFights: [ "तिष्ठति → लट् 3sg", "भ्रामयन् → causative present participle" ],
    vyakhya: [ { title: "Causative participle", body: "भ्रामयन् = causative-stem present participle of √भ्रम् (\"causing-to-revolve\"). The -अय- causative + -अत् participle gives \"making-rotate\"." } ]
  },
  '18.62': {
    anvaya: "भारत, सर्वभावेन तं एव शरणं गच्छ; तत्प्रसादात् परां शान्तिं शाश्वतं स्थानं प्राप्स्यसि",
    vibhaktiNotes: [ "सर्वभावेन → तृतीया", "तम् → द्वितीया", "तत्प्रसादात् → पञ्चमी" ],
    keyFights: [ "गच्छ → लोट् 2sg", "प्राप्स्यसि → लृट् 2sg" ],
    vyakhya: [ { title: "Imperative + future", body: "Imperative (\"go!\") + future (\"you will attain\") combine to give command-with-promise structure: \"do X, and you will get Y.\"" } ]
  },
  '18.63': {
    anvaya: "इति ते मया गुह्यात् गुह्यतरं ज्ञानं आख्यातम्; एतत् अशेषेण विमृश्य, यथा इच्छसि तथा कुरु",
    vibhaktiNotes: [ "ते → षष्ठी (\"to you\")", "मया → तृतीया (agent)", "गुह्यात् → पञ्चमी (ablative of comparison)", "एतत् → द्वितीया" ],
    keyFights: [ "आख्यातम् → PPP serving as finite", "विमृश्य → absolutive", "कुरु → लोट्" ],
    vyakhya: [ { title: "Superlative by ablative", body: "गुह्यात् गुह्यतरम् = \"more secret than the secret\". Comparative -तर + ablative gives Sanskrit superlatives." } ]
  },
  '18.64': {
    anvaya: "मे परमं वचः सर्वगुह्यतमं भूयः श्रृणु; त्वं मे दृढम् इष्टः असि, अतः ते हितं वक्ष्यामि",
    vibhaktiNotes: [ "मे → षष्ठी", "ते → षष्ठी", "हितम् → द्वितीया" ],
    keyFights: [ "वक्ष्यामि → लृट् 1sg of √वच्", "इष्टः → PPP (\"dear\")" ],
    vyakhya: [ { title: "Dative-genitive of beloved", body: "मे इष्टः असि = \"you-are dear-to-me\". षष्ठी enclitic मे here functions like a dative-of-relation (Hindi \"मुझे प्यारा है\")." } ]
  },
  '18.65': {
    anvaya: "मन्मना भव, मद्भक्तः, मद्याजी, माम् नमस्कुरु; एवं माम् एव एष्यसि — सत्यं ते प्रतिजाने, मे प्रियः असि",
    vibhaktiNotes: [ "माम् → द्वितीया", "ते → षष्ठी (\"to you\")", "मे → षष्ठी" ],
    keyFights: [ "Four imperatives in one verse: भव, [भव], [भव], नमस्कुरु", "एष्यसि → लृट् 2sg of √इ", "प्रतिजाने → लट् 1sg Ā" ],
    vyakhya: [ { title: "Imperative cascade", body: "Four imperative-equivalent phrases in one verse: \"be-mine-minded, my-devotee, my-sacrificer, bow-to-me.\" Sanskrit allows compounded vocatives as imperative-substitutes." } ]
  },
  '18.66': {
    anvaya: "सर्वधर्मान् परित्यज्य, माम् एकं शरणं व्रज; अहं त्वा सर्वपापेभ्यः मोक्षयिष्यामि — मा शुचः",
    vibhaktiNotes: [ "सर्वधर्मान् → द्वितीया बहुवचन", "माम् → द्वितीया", "सर्वपापेभ्यः → पञ्चमी बहुवचन (separation)" ],
    keyFights: [ "परित्यज्य → absolutive", "व्रज → लोट्", "मोक्षयिष्यामि → लृट् causative 1sg", "मा शुचः → prohibitive" ],
    vyakhya: [ { title: "Charama-śloka grammar", body: "The famous \"surrender-verse\". Note: absolutive (परित्यज्य) → imperative (व्रज) → future-causative (मोक्षयिष्यामि) → prohibitive (मा शुचः) — four moods in two lines." } ]
  },
  '18.67': {
    anvaya: "इदं ते कदाचन अतपस्काय, न च अभक्ताय, न च अशुश्रूषवे, न च माम् यः अभ्यसूयति, तस्मै वाच्यम् न (अस्ति)",
    vibhaktiNotes: [ "ते → षष्ठी", "अतपस्काय, अभक्ताय, अशुश्रूषवे, तस्मै → चतुर्थी (recipient)" ],
    keyFights: [ "वाच्यम् → -य passive potential (\"to-be-spoken\")", "Four datives, all negated" ],
    vyakhya: [ { title: "Dative of recipient (negated)", body: "Four चतुर्थी datives lined up — to-each-of-them \"not-to-be-spoken\". Negative recipients via dative-plus-न." } ]
  },
  '18.68': {
    anvaya: "यः परां भक्तिं मयि कृत्वा इदं परमं गुह्यं मद्भक्तेषु अभिधास्यति, सः अव्यभिचारेण मां एव एष्यति",
    vibhaktiNotes: [ "मयि → सप्तमी", "मद्भक्तेषु → सप्तमी बहुवचन", "माम् → द्वितीया" ],
    keyFights: [ "अभिधास्यति, एष्यति → लृट् futures", "कृत्वा → absolutive" ],
    vyakhya: [ { title: "Locative of devotion-target", body: "मयि भक्तिं कृत्वा = \"having made devotion in/toward me\". सप्तमी for object-of-devotion (recurring pattern from Ch 13–14)." } ]
  },
  '18.69': {
    anvaya: "मनुष्येषु तस्मात् मे प्रियकृत्तमः कश्चिद् न (अस्ति); तस्मात् भुवि अन्यः मे प्रियतरः न भविता",
    vibhaktiNotes: [ "मनुष्येषु, भुवि → सप्तमी (locative of domain)", "तस्मात् → पञ्चमी (\"than him\")", "मे → षष्ठी" ],
    keyFights: [ "तस्मात् + comparative — ablative of comparison twice", "भविता → -तृ future (\"will-be\")" ],
    vyakhya: [ { title: "-तृ future tense", body: "भविता is the periphrastic future-from-तृ-stem — distinct from -ष्य लृट्. \"Will-be\" with a fated/anticipated nuance." } ]
  },
  '18.70': {
    anvaya: "यः इमं आवयोः धर्म्यं संवादम् अध्येष्यते, तेन ज्ञानयज्ञेन अहम् इष्टः स्याम् — इति मे मतिः",
    vibhaktiNotes: [ "आवयोः → षष्ठी द्विवचन (\"of us two\")", "तेन ज्ञानयज्ञेन → तृतीया (instrument of worship)" ],
    keyFights: [ "अध्येष्यते → लृट् Ā", "स्याम् → optative विधिलिङ् 1sg" ],
    vyakhya: [ { title: "Genitive dual", body: "आवयोः = \"of us two\" — षष्ठी द्विवचन of आवाम्. Krishna and Arjuna are exactly two — hence dual." } ]
  },
  '18.71': {
    anvaya: "श्रद्धावान्, अनसूयः च, यः नरः अपि एनं श्रृणुयात्, सः अपि मुक्तः शुभान् पुण्यकर्मणां लोकान् प्राप्नुयात्",
    vibhaktiNotes: [ "एनम् → द्वितीया", "पुण्यकर्मणाम् → षष्ठी बहुवचन", "लोकान् → द्वितीया बहुवचन" ],
    keyFights: [ "श्रृणुयात्, प्राप्नुयात् → optatives विधिलिङ्", "मुक्तः → PPP" ],
    vyakhya: [ { title: "Twin optatives for hypothesis", body: "Both verbs in विधिलिङ् signal the conditional: \"who-might-hear...he-might-attain.\" Optative chain for hypothetical reward." } ]
  },
  '18.72': {
    anvaya: "पार्थ, इदं त्वया एकाग्रेण चेतसा श्रुतं कच्चित्? धनञ्जय, ते अज्ञानसम्मोहः प्रनष्टः कच्चित्?",
    vibhaktiNotes: [ "त्वया → तृतीया (agent)", "एकाग्रेण चेतसा → तृतीया (manner)", "ते → षष्ठी" ],
    keyFights: [ "श्रुतम्, प्रनष्टः → PPPs as predicates", "कच्चित् → interrogative particle (\"perhaps?\")" ],
    vyakhya: [ { title: "कच्चित् question", body: "कच्चित् marks a polite/expectant yes-no question. Krishna asks twice if Arjuna has heard and if his delusion is gone." } ]
  },
  '18.73': {
    anvaya: "(अर्जुन उवाच) — अच्युत, त्वत्प्रसादात् मे मोहः नष्टः, स्मृतिः लब्धा; गतसन्देहः स्थितः अस्मि; ते वचनं करिष्ये",
    vibhaktiNotes: [ "त्वत्प्रसादात् → पञ्चमी (\"by your grace\")", "मे → षष्ठी", "ते वचनम् → द्वितीया" ],
    keyFights: [ "नष्टः, लब्धा, स्थितः → three PPPs", "करिष्ये → लृट् 1sg Ā (\"I shall do\")" ],
    vyakhya: [ { title: "Three PPPs as resolution", body: "Three PPPs cleanly mark the inner change: moha-naṣṭa, smṛti-labdhā, sandeha-gata. Then the future verb seals the action." } ]
  },
  '18.74': {
    anvaya: "(सञ्जय उवाच) — एवम् अहं वासुदेवस्य च महात्मनः पार्थस्य च इमं अद्भुतं रोमहर्षणं संवादं अश्रौषम्",
    vibhaktiNotes: [ "वासुदेवस्य, पार्थस्य → षष्ठी", "महात्मनः → षष्ठी एकवचन (-न् stem)", "संवादम् → द्वितीया" ],
    keyFights: [ "अश्रौषम् → लुङ् (aorist) 1sg of √श्रु — \"I heard\"", "Two षष्ठी genitives mark the two speakers" ],
    vyakhya: [ { title: "Aorist of √श्रु", body: "अश्रौषम् is the लुङ् (aorist) — past-without-implication. Sanskrit's aorist is rare in classical, but standard for Sanjaya's reportage frames." } ]
  },
  '18.75': {
    anvaya: "व्यासप्रसादात्, अहं इमं परं गुह्यं योगं साक्षात् कथयतः योगेश्वरात् कृष्णात् श्रुतवान् अस्मि",
    vibhaktiNotes: [ "व्यासप्रसादात् → पञ्चमी (cause)", "योगेश्वरात् कृष्णात् → पञ्चमी (ablative of source)", "योगम् → द्वितीया" ],
    keyFights: [ "श्रुतवान् → -तवत् perfect-active participle (\"having-heard\") + अस्मि", "कथयतः → present participle in पञ्चमी" ],
    vyakhya: [ { title: "-तवत् perfect-active", body: "श्रुतवान् = \"having heard\" (active sense, unlike PPP श्रुत = \"heard\"). The -तवत् suffix gives an active perfect participle." } ]
  },
  '18.76': {
    anvaya: "राजन्, अहं केशवार्जुनयोः इमं अद्भुतं पुण्यं संवादं संस्मृत्य संस्मृत्य, मुहुः मुहुः हृष्यामि",
    vibhaktiNotes: [ "राजन् → सम्बोधन", "केशवार्जुनयोः → षष्ठी द्विवचन", "संवादम् → द्वितीया" ],
    keyFights: [ "संस्मृत्य संस्मृत्य → repeated absolutive (\"recalling-and-recalling\")", "हृष्यामि → लट् 1sg of √हृष्" ],
    vyakhya: [ { title: "Repeated absolutive", body: "X X (same absolutive twice) = \"again and again X-ing\". Sanskrit's repetition-for-iteration pattern." } ]
  },
  '18.77': {
    anvaya: "राजन्, च हरेः तत् अति-अद्भुतं रूपं संस्मृत्य संस्मृत्य, मे महान् विस्मयः (भवति), च भूयः भूयः हृष्यामि",
    vibhaktiNotes: [ "राजन् → सम्बोधन", "हरेः → षष्ठी", "मे → षष्ठी" ],
    keyFights: [ "Repeated absolutive again", "हृष्यामि repeated from 18.76" ],
    vyakhya: [ { title: "Distributive भूयः", body: "भूयः भूयः = \"again and again\". Like जन्मनि जन्मनि, repetition of an indeclinable gives distributive/iterative force." } ]
  },
  '18.78': {
    anvaya: "यत्र योगेश्वरः कृष्णः, यत्र धनुर्धरः पार्थः — तत्र श्रीः, विजयः, भूतिः, ध्रुवा नीतिः च — इति मे मतिः",
    vibhaktiNotes: [ "यत्र...तत्र → locative-correlative adverbs", "मे → षष्ठी" ],
    keyFights: [ "Famous concluding verse — verbless predicate (implicit सन्ति)", "Four प्रथमा predicates: श्री, विजय, भूति, नीति" ],
    vyakhya: [ { title: "Yatra-tatra closure", body: "यत्र (where) — तत्र (there) — locative-relative pair giving conditional location. The Gītā's famous final conclusion sits in this where-there frame." } ]
  }
};

