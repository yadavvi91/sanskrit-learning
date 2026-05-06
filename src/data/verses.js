// Verses fought through, in order of decoding.
// Source of truth: verses-decoded.md
//
// Each verse has the full decode pipeline so VerseDetail can render every step:
//   मूल → पदच्छेद → sandhi notes → finite verb(s) → विभक्ति notes → अन्वय → हिंदी → English
// `keyFights` captures the realisations that landed for User on this verse.

export const VERSES = [
  {
    chapter: 1,
    verse: 1,
    speaker: 'धृतराष्ट्र उवाच',
    title: 'The anchor verse',
    decodeIndex: 1,
    mool: [
      'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।',
      'मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥',
    ],
    padaccheda: [
      'धर्म-क्षेत्रे',
      'कुरु-क्षेत्रे',
      'समवेताः',
      'युयुत्सवः',
      'मामकाः',
      'पाण्डवाः',
      'च',
      'एव',
      'किम्',
      'अकुर्वत',
      'सञ्जय',
    ],
    sandhiNotes: [
      'पाण्डवाश्चैव = पाण्डवाः + च + एव (visarga + च → श्च)',
    ],
    finiteVerbs: [
      {
        form: 'अकुर्वत',
        root: '√कृ',
        lakara: 'लङ्',
        purusha: 'प्रथम',
        vachana: 'बहुवचन',
        gloss: 'they did',
      },
    ],
    vibhaktiNotes: [
      'मामकाः, पाण्डवाः, युयुत्सवः, समवेताः → प्रथमा बहुवचन = subjects/adjective',
      'धर्मक्षेत्रे, कुरुक्षेत्रे → सप्तमी = "in the field of dharma, in Kurukshetra"',
      'सञ्जय → सम्बोधन = "O Sanjaya" — not in the action',
      'किम् → indeclinable = "what"',
    ],
    keyFights: [
      'समवेताः looks like a verb ("gathered") but is a past passive participle (कृदन्त) agreeing with युयुत्सवः — both प्रथमा बहुवचन पुल्लिंग. It describes the warriors, it does not anchor the sentence. किमकुर्वत is the finite verb.',
    ],
    anvaya:
      'सञ्जय | धर्मक्षेत्रे कुरुक्षेत्रे | समवेताः युयुत्सवः मामकाः पाण्डवाः च | किम् | अकुर्वत',
    hindi:
      'हे सञ्जय, धर्मक्षेत्र कुरुक्षेत्र में एकत्र हुए युद्ध की इच्छा रखनेवाले मेरे और पाण्डु के पुत्रों ने क्या किया?',
    english:
      'O Sanjaya, gathered on the sacred field of Kurukshetra, eager to fight — what did my sons and the sons of Pandu do?',
  },
  {
    chapter: 2,
    verse: 3,
    speaker: 'श्रीभगवानुवाच',
    title: 'The WhatsApp verse — where this whole journey started',
    decodeIndex: 2,
    mool: [
      'क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।',
      'क्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप॥',
    ],
    padaccheda: [
      'क्लैब्यम्',
      'मा',
      'स्म',
      'गमः',
      'पार्थ',
      'न',
      'एतत्',
      'त्वयि',
      'उपपद्यते',
      'क्षुद्रम्',
      'हृदय-दौर्बल्यम्',
      'त्यक्त्वा',
      'उत्तिष्ठ',
      'परन्तप',
    ],
    sandhiNotes: [
      'नैतत् = न + एतत् (अ + ए → ऐ)',
      'त्वय्युपपद्यते = त्वयि + उपपद्यते (इ + उ → य्यु)',
      'त्यक्त्वोत्तिष्ठ = त्यक्त्वा + उत्तिष्ठ (आ + उ → ओ)',
    ],
    finiteVerbs: [
      {
        form: 'गमः',
        root: '√गम्',
        lakara: 'लोट्',
        purusha: 'मध्यम',
        vachana: 'एकवचन',
        gloss: 'go/yield — negated by मा स्म = "do not yield"',
      },
      {
        form: 'उपपद्यते',
        root: 'उप + √पद्',
        lakara: 'लट्',
        purusha: 'प्रथम',
        vachana: 'एकवचन',
        gloss: 'is fitting',
      },
      {
        form: 'उत्तिष्ठ',
        root: '√स्था',
        lakara: 'लोट्',
        purusha: 'मध्यम',
        vachana: 'एकवचन',
        gloss: 'rise up! (imperative)',
      },
    ],
    nonFinite: [
      { form: 'त्यक्त्वा', kind: 'absolutive', root: '√त्यज्', gloss: 'having abandoned' },
    ],
    vibhaktiNotes: [
      'पार्थ, परन्तप → सम्बोधन — addressing Arjuna, not in action',
      'क्लैब्यम् → द्वितीया — object of गमः',
      'त्वयि → सप्तमी — "in you / for you"',
      'एतत् → प्रथमा, subject of उपपद्यते',
      'क्षुद्रम् हृदयदौर्बल्यम् → द्वितीया, both matching — object of त्यक्त्वा',
    ],
    keyFights: [
      'Three finite verbs in one verse — गमः (negated imperative), उपपद्यते (present), उत्तिष्ठ (imperative). त्यक्त्वा is the only non-finite — an absolutive setting up उत्तिष्ठ.',
    ],
    anvaya:
      'पार्थ | क्लैब्यम् मा स्म गमः | एतत् त्वयि न उपपद्यते | परन्तप | क्षुद्रम् हृदयदौर्बल्यम् त्यक्त्वा | उत्तिष्ठ',
    hindi:
      'हे पार्थ, नपुंसकता को प्राप्त मत हो — यह तुम्हें शोभा नहीं देता। हे परन्तप, हृदय की इस तुच्छ दुर्बलता को त्यागकर उठ खड़े हो।',
    english:
      'Do not yield to unmanliness, O Partha — this does not befit you. Having abandoned this petty weakness of heart, rise up, O scorcher of enemies.',
  },
  {
    chapter: 2,
    verse: 4,
    speaker: 'अर्जुन उवाच',
    title: 'The "how can I fight?" verse',
    decodeIndex: 3,
    mool: [
      'कथं भीष्ममहं सङ्ख्ये द्रोणं च मधुसूदन।',
      'इषुभिः प्रतियोत्स्यामि पूजार्हावरिसूदन॥',
    ],
    padaccheda: [
      'कथम्',
      'भीष्मम्',
      'अहम्',
      'सङ्ख्ये',
      'द्रोणम्',
      'च',
      'मधुसूदन',
      'इषुभिः',
      'प्रति-योत्स्यामि',
      'पूजार्हौ',
      'अरिसूदन',
    ],
    sandhiNotes: [],
    finiteVerbs: [
      {
        form: 'प्रतियोत्स्यामि',
        root: 'प्रति + √युध्',
        lakara: 'लृट्',
        purusha: 'उत्तम',
        vachana: 'एकवचन',
        gloss: 'I shall fight against',
      },
    ],
    vibhaktiNotes: [
      'अहम् → प्रथमा = subject (I)',
      'भीष्मम्, द्रोणम् → द्वितीया = objects of प्रतियोत्स्यामि',
      'इषुभिः → तृतीया = "with arrows"',
      'मधुसूदन, अरिसूदन → सम्बोधन = "O Krishna" (two epithets)',
      'पूजार्हौ → द्वितीया द्विवचन = "these two worthy of worship" (qualifying भीष्मम् + द्रोणम्)',
      'सङ्ख्ये → सप्तमी = "in battle"',
      'कथम् → indeclinable = "how"',
    ],
    keyFights: [
      'मधुसूदन and अरिसूदन look like they could be objects but they are सम्बोधन (vocatives) — two epithets of Krishna, not participants in the action. भीष्मम् and द्रोणम् are the actual objects (द्वितीया).',
      'The -ष्य- infix in प्रतियोत्स्यामि flags it as लृट् (future) on sight.',
    ],
    anvaya:
      'अहम् | सङ्ख्ये | पूजार्हौ भीष्मम् द्रोणम् च | इषुभिः | कथम् प्रतियोत्स्यामि — मधुसूदन, अरिसूदन?',
    hindi:
      'हे मधुसूदन, हे अरिसूदन — मैं युद्ध में पूजा के योग्य भीष्म और द्रोण से बाणों द्वारा कैसे लड़ूँगा?',
    english:
      'O Madhusudana, O Arisudana — how shall I fight in battle against Bhishma and Drona, who are worthy of worship, with arrows?',
  },
  {
    chapter: 2,
    verse: 5,
    speaker: 'अर्जुन उवाच',
    title: 'The hardest verse so far',
    decodeIndex: 4,
    mool: [
      'गुरूनहत्वा हि महानुभावान्',
      'श्रेयो भोक्तुं भैक्ष्यमपीह लोके।',
      'हत्वार्थकामांस्तु गुरूनिहैव',
      'भुञ्जीय भोगान् रुधिरप्रदिग्धान्॥',
    ],
    padaccheda: [
      'गुरून्',
      'अहत्वा',
      'हि',
      'महा-अनुभावान्',
      'श्रेयः',
      'भोक्तुम्',
      'भैक्ष्यम्',
      'अपि',
      'इह',
      'लोके',
      'हत्वा',
      'अर्थ-कामान्',
      'तु',
      'गुरून्',
      'इह',
      'एव',
      'भुञ्जीय',
      'भोगान्',
      'रुधिर-प्रदिग्धान्',
    ],
    sandhiNotes: [
      'गुरूनहत्वा = गुरून् + अहत्वा',
      'महानुभावान् = महा + अनुभावान्',
      'श्रेयो = श्रेयः (visarga → o before voiced)',
      'भैक्ष्यमपीह = भैक्ष्यम् + अपि + इह',
      'हत्वार्थकामांस्तु = हत्वा + अर्थकामान् + तु',
      'गुरूनिहैव = गुरून् + इह + एव',
      'रुधिरप्रदिग्धान् = रुधिर + प्र + दिग्ध + आन्',
    ],
    finiteVerbs: [
      {
        form: 'भुञ्जीय',
        root: '√भुज्',
        lakara: 'विधिलिङ्',
        purusha: 'प्रथम',
        vachana: 'एकवचन',
        gloss: 'should one enjoy',
      },
    ],
    nonFinite: [
      { form: 'अहत्वा', kind: 'negative absolutive', root: '√हन्', gloss: 'without killing' },
      { form: 'हत्वा', kind: 'absolutive', root: '√हन्', gloss: 'having killed' },
      { form: 'भोक्तुम्', kind: 'infinitive', root: '√भुज्', gloss: 'to eat / to enjoy' },
      { form: 'श्रेयः', kind: 'predicate adjective', gloss: '"is better" (with implied अस्ति)' },
    ],
    vibhaktiNotes: [
      'महानुभावान् गुरून् → both द्वितीया बहुवचन पुल्लिंग — adjective + noun, objects of अहत्वा',
      'भैक्ष्यम् → द्वितीया — object of भोक्तुम्',
      'लोके → सप्तमी — "in the world"',
      'अर्थकामान् गुरून् → द्वितीया, objects of हत्वा',
      'रुधिरप्रदिग्धान् भोगान् → both द्वितीया बहुवचन पुल्लिंग — adjective + noun, objects of भुञ्जीय',
    ],
    keyFights: [
      'The verse has THREE verb-looking words but only ONE finite verb. भोक्तुम् is an infinitive ("to eat"), हत्वा/अहत्वा are absolutives ("having killed / without killing"), श्रेयः is a predicate adjective with implied अस्ति. भुञ्जीय alone is conjugated for person/number/mood.',
      'महानुभावान् गुरून् — both द्वितीया बहुवचन पुल्लिंग, so the adjective belongs to that noun. Same logic for रुधिरप्रदिग्धान् भोगान्.',
      'विधिलिङ् isn\'t "I will enjoy" — it\'s "should one enjoy?" The mood encodes Arjuna\'s horror rhetorically. Grammatically baked in.',
    ],
    anvaya:
      'महानुभावान् गुरून् अहत्वा इह लोके भैक्ष्यम् अपि भोक्तुम् श्रेयः हि — अर्थकामान् गुरून् हत्वा इहैव रुधिरप्रदिग्धान् भोगान् भुञ्जीय?',
    hindi:
      'इन महानुभाव गुरुओं को बिना मारे, इस लोक में भिक्षा का अन्न भी खाना श्रेयस्कर है — अर्थ और काम में लिप्त इन गुरुओं को मारकर, रक्त से सने हुए भोगों को यहीं भोगना चाहिए क्या?',
    english:
      'Indeed, not killing these noble gurus, to eat even alms here in this world is better — having killed gurus who desire wealth and pleasure, should one enjoy pleasures smeared in blood right here?',
  },
];

const verseKey = (ch, v) => `${ch}.${v}`;

export const VERSE_MAP = new Map(VERSES.map((v) => [verseKey(v.chapter, v.verse), v]));

export const getVerse = (chapter, verse) => VERSE_MAP.get(verseKey(chapter, verse)) || null;

export const isDecoded = (chapter, verse) => VERSE_MAP.has(verseKey(chapter, verse));
