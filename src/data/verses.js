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
    samasNotes: [
      {
        compound: 'धर्मक्षेत्रे',
        vigraha: 'धर्मस्य क्षेत्रम्',
        type: 'षष्ठी तत्पुरुष',
        gloss: 'field of dharma',
      },
      {
        compound: 'कुरुक्षेत्रे',
        vigraha: 'कुरूणाम् क्षेत्रम्',
        type: 'षष्ठी तत्पुरुष',
        gloss: 'field of the Kurus',
      },
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
    references: {
      translations: [
        {
          translator: 'Edwin Arnold',
          year: 1885,
          work: 'The Song Celestial',
          license: 'public-domain',
          text: 'Ranged thus for battle on the sacred plain — On Kurukshetra — say, Sanjaya! say what wrought my people, and the Pandavas?',
        },
        {
          translator: 'Annie Besant',
          year: 1895,
          work: 'The Bhagavad-Gītā',
          license: 'public-domain',
          text: 'On the holy plain, on the field of the Kurus, gathered together, desirous to fight, what did my people and the Pāṇḍavas, O Saṅjaya?',
        },
      ],
      commentaries: [
        {
          sage: 'Shankara',
          school: 'अद्वैत (Advaita)',
          summary: 'The word धर्मक्षेत्र is loaded — the field is itself a place of dharma. The question implicitly asks who upheld dharma. Sets the stage by foregrounding the moral terrain before any combat begins.',
        },
        {
          sage: 'Ramanuja',
          school: 'विशिष्टाद्वैत (Viśiṣṭādvaita)',
          summary: 'Reads धर्मक्षेत्र-कुरुक्षेत्र as a single locus of cosmic significance — the field of the Kurus is the very field of dharma where the Lord will manifest. Dhṛtarāṣṭra\'s anxious question frames everything that follows.',
        },
      ],
    },
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
    samasNotes: [
      {
        compound: 'हृदयदौर्बल्यम्',
        vigraha: 'हृदयस्य दौर्बल्यम्',
        type: 'षष्ठी तत्पुरुष',
        gloss: 'weakness of the heart',
      },
      {
        compound: 'परन्तप',
        vigraha: 'परान् तापयति इति',
        type: 'उपपद तत्पुरुष',
        gloss: 'one who scorches enemies — epithet of Arjuna',
      },
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
    references: {
      translations: [
        {
          translator: 'Edwin Arnold',
          year: 1885,
          work: 'The Song Celestial',
          license: 'public-domain',
          text: 'Yield not to unmanliness, O son of Pritha! It does not become thee. Cast off this petty faintheartedness; arise, O scourge of foes!',
        },
        {
          translator: 'Annie Besant',
          year: 1895,
          work: 'The Bhagavad-Gītā',
          license: 'public-domain',
          text: 'Yield not to impotence, O Pārtha! it doth not befit thee. Shaking off this paltry faint-heartedness stand up, O Parantapa!',
        },
      ],
      commentaries: [
        {
          sage: 'Shankara',
          school: 'अद्वैत (Advaita)',
          summary: 'क्लैब्य (cowardice) is identified with delusion (मोह) — the immediate target of the entire teaching that follows. Shankara reads मा स्म गमः as the Lord\'s first imperative: stop this. The whole Gītā unfolds as the medicine for this single ailment.',
        },
        {
          sage: 'Ramanuja',
          school: 'विशिष्टाद्वैत (Viśiṣṭādvaita)',
          summary: 'The address पार्थ (son of Kuntī) and परन्तप (scorcher of foes) together remind Arjuna of his lineage and his vocation. The petty weakness of heart is unworthy of both. Krishna\'s tenderness here is as significant as his command.',
        },
      ],
    },
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
    samasNotes: [
      {
        compound: 'मधुसूदन',
        vigraha: 'मधुम् सूदयति इति',
        type: 'उपपद तत्पुरुष',
        gloss: 'slayer of Madhu — epithet of Krishna',
      },
      {
        compound: 'अरिसूदन',
        vigraha: 'अरीन् सूदयति इति',
        type: 'उपपद तत्पुरुष',
        gloss: 'slayer of enemies — epithet of Krishna',
      },
      {
        compound: 'पूजार्हौ',
        vigraha: 'पूजायाः अर्हौ',
        type: 'षष्ठी तत्पुरुष',
        gloss: 'worthy of worship (dual)',
      },
    ],
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
    references: {
      translations: [
        {
          translator: 'Edwin Arnold',
          year: 1885,
          work: 'The Song Celestial',
          license: 'public-domain',
          text: 'How can I, in the battle, shoot with shafts on Bhishma, or on Drona — O thou Chief! — both worshipful, both honourable men?',
        },
        {
          translator: 'Annie Besant',
          year: 1895,
          work: 'The Bhagavad-Gītā',
          license: 'public-domain',
          text: 'How, O Madhusūdana, shall I in battle contend with arrows against Bhīṣma and Droṇa, who are worthy of reverence, O slayer of foes?',
        },
      ],
      commentaries: [
        {
          sage: 'Shankara',
          school: 'अद्वैत (Advaita)',
          summary: 'Arjuna\'s objection is not strategic but ethical: how does one direct violence at the worthy-of-worship? Shankara notes the address of Krishna by two killing-epithets (मधुसूदन, अरिसूदन) is itself a plea — "you who slay enemies, surely you see why I cannot."',
        },
        {
          sage: 'Ramanuja',
          school: 'विशिष्टाद्वैत (Viśiṣṭādvaita)',
          summary: 'पूजार्ह establishes that Bhīṣma and Droṇa are not merely teachers but the proper objects of veneration. The verse foregrounds dharmic duty toward elders — a tension only divine knowledge can resolve.',
        },
      ],
    },
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
    samasNotes: [
      {
        compound: 'महानुभावान्',
        vigraha: 'महान्तः अनुभावाः येषाम् ते',
        type: 'बहुव्रीहि',
        gloss: 'those of great spirit / dignity (qualifying गुरून्)',
      },
      {
        compound: 'अर्थकामान्',
        vigraha: 'अर्थः च कामः च',
        type: 'इतरेतर द्वंद्व',
        gloss: 'wealth and desire — used adjectivally: gurus driven by wealth and pleasure',
      },
      {
        compound: 'रुधिरप्रदिग्धान्',
        vigraha: 'रुधिरेण प्रदिग्धान्',
        type: 'तृतीया तत्पुरुष',
        gloss: 'smeared with blood (qualifying भोगान्)',
      },
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
    references: {
      translations: [
        {
          translator: 'Edwin Arnold',
          year: 1885,
          work: 'The Song Celestial',
          license: 'public-domain',
          text: 'Better to live on beggar\'s bread with those we love alive, than taste their blood in rich feasts spread, and guiltily survive!',
        },
        {
          translator: 'Annie Besant',
          year: 1895,
          work: 'The Bhagavad-Gītā',
          license: 'public-domain',
          text: 'Better in this world to eat even the beggar\'s crust, than to slay these most noble Gurus. Slaying these Gurus, our well-wishers, I should taste of blood-besprinkled feasts.',
        },
      ],
      commentaries: [
        {
          sage: 'Shankara',
          school: 'अद्वैत (Advaita)',
          summary: 'The विधिलिङ् form भुञ्जीय ("should one enjoy?") is the rhetorical heart of the verse. Shankara reads Arjuna\'s horror as the proper response of an unenlightened mind — exactly the state the Lord must lift him out of. The verse names the problem the Gītā exists to solve.',
        },
        {
          sage: 'Ramanuja',
          school: 'विशिष्टाद्वैत (Viśiṣṭādvaita)',
          summary: 'अर्थकामान् ("driven by wealth and pleasure") shows Arjuna trying to morally devalue the gurus to make killing them tractable — and immediately recoiling from the attempt. Ramanuja sees the contradiction Arjuna can\'t escape on his own as the precise opening for revealed knowledge.',
        },
      ],
    },
  },
];

const verseKey = (ch, v) => `${ch}.${v}`;

export const VERSE_MAP = new Map(VERSES.map((v) => [verseKey(v.chapter, v.verse), v]));

export const getVerse = (chapter, verse) => VERSE_MAP.get(verseKey(chapter, verse)) || null;

export const isDecoded = (chapter, verse) => VERSE_MAP.has(verseKey(chapter, verse));
