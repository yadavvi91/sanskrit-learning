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
    wordParsings: {
      'धर्म-क्षेत्रे': { category: 'noun', root: 'धर्मक्षेत्र', gender: 'n', number: 'eka', case: 'sap', gloss: 'in the field of dharma', note: 'षष्ठी तत्पुरुष compound' },
      'कुरु-क्षेत्रे': { category: 'noun', root: 'कुरुक्षेत्र', gender: 'n', number: 'eka', case: 'sap', gloss: 'in the field of the Kurus', note: 'षष्ठी तत्पुरुष compound' },
      'समवेताः':       { category: 'krdanta', root: 'सम् + अव + √इ', kind: 'past passive participle', gender: 'm', number: 'bahu', case: 'pra', gloss: 'gathered together', note: 'PPP — agrees with युयुत्सवः, not the finite verb' },
      'युयुत्सवः':     { category: 'adjective', root: '√युध् (desiderative)', gender: 'm', number: 'bahu', case: 'pra', gloss: 'desirous to fight, eager for war', note: 'desiderative-स्तेम युयुत्सु- + adjective endings' },
      'मामकाः':         { category: 'adjective', root: 'मामक', gender: 'm', number: 'bahu', case: 'pra', gloss: 'mine, my (sons)', note: 'possessive adjective from अहम्' },
      'पाण्डवाः':      { category: 'noun', root: 'पाण्डव', gender: 'm', number: 'bahu', case: 'pra', gloss: 'the sons of Pāṇḍu' },
      'च':              { category: 'particle', gloss: 'and (clitic; cannot begin a sentence)' },
      'एव':             { category: 'particle', gloss: 'only / itself / exactly (emphatic)' },
      'किम्':           { category: 'pronoun', root: 'किम्', kind: 'interrogative', gender: 'n', number: 'eka', case: 'pra', gloss: 'what?' },
      'अकुर्वत':        { category: 'verb', root: '√कृ', gana: 8, pada: 'A', lakara: 'lan', purusha: 'prathama', number: 'bahu', gloss: 'they did', note: 'sentence anchor — the only finite verb' },
      'सञ्जय':           { category: 'noun', root: 'सञ्जय', gender: 'm', number: 'eka', case: 'sam', gloss: 'O Sanjaya', note: 'सम्बोधन — vocative; not in the action' },
    },
    vyakhya: [
      {
        title: 'The participle trap (समवेताः looks like a verb — it isn\'t)',
        body: 'समवेताः is a past passive participle (कृदन्त) of सम् + अव + √इ. The -ाः ending is प्रथमा बहुवचन पुल्लिंग — same as युयुत्सवः, मामकाः, पाण्डवाः. Adjective-noun agreement (सामानाधिकरण्य) confirms it modifies युयुत्सवः, not anchors the sentence. The actual finite verb is अकुर्वत, buried at the end of the second pāda.',
      },
      {
        title: 'Vocative as frame, not participant',
        body: 'सञ्जय (सम्बोधन) addresses the listener but takes no role in the action. The participant cast is मामकाः + पाण्डवाः (subjects), and किम् (object). Recognising vocatives early kills the most common decode error.',
      },
      {
        title: 'The verse is a question — मूल structure',
        body: 'किम् + अकुर्वत = "what did they do?" The whole verse is a single Wh-question, scaffolded by locatives (where) + adjectives (in what state) + subjects + the interrogative pronoun + the finite verb. Reading the verse means finding the question.',
      },
    ],
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
    wordParsings: {
      'क्लैब्यम्':       { category: 'noun', root: 'क्लैब्य', gender: 'n', number: 'eka', case: 'dvi', gloss: 'unmanliness, cowardice', note: 'object of गमः' },
      'मा':              { category: 'particle', gloss: 'do not (prohibitive — used with लोट्/लुङ्)' },
      'स्म':             { category: 'particle', gloss: 'emphatic — strengthens मा into "definitely do not"' },
      'गमः':              { category: 'verb', root: '√गम्', kind: 'aorist (लुङ्)', purusha: 'madhyama', number: 'eka', gloss: 'go / yield', note: 'finite verb — negated by मा स्म' },
      'पार्थ':            { category: 'noun', root: 'पार्थ', gender: 'm', number: 'eka', case: 'sam', gloss: 'O son of Pṛthā (= Arjuna)' },
      'न':               { category: 'particle', gloss: 'not (general negation)' },
      'एतत्':            { category: 'pronoun', root: 'एतद्', kind: 'demonstrative (proximate)', gender: 'n', number: 'eka', case: 'pra', gloss: 'this' },
      'त्वयि':            { category: 'pronoun', root: 'युष्मद्', gender: '-', number: 'eka', case: 'sap', gloss: 'in/for you' },
      'उपपद्यते':       { category: 'verb', root: 'उप + √पद्', gana: 4, pada: 'A', lakara: 'lat', purusha: 'prathama', number: 'eka', gloss: 'is fitting, befits', note: 'finite verb' },
      'क्षुद्रम्':       { category: 'adjective', root: 'क्षुद्र', gender: 'n', number: 'eka', case: 'dvi', gloss: 'petty, mean', note: 'agrees with हृदयदौर्बल्यम्' },
      'हृदय-दौर्बल्यम्': { category: 'noun', root: 'हृदयदौर्बल्य', gender: 'n', number: 'eka', case: 'dvi', gloss: 'weakness of heart', note: 'षष्ठी तत्पुरुष compound; object of त्यक्त्वा' },
      'त्यक्त्वा':       { category: 'krdanta', root: '√त्यज्', kind: 'absolutive (gerund)', gloss: 'having abandoned', note: 'absolutive — non-finite' },
      'उत्तिष्ठ':        { category: 'verb', root: 'उद् + √स्था', gana: 1, pada: 'P', lakara: 'lot', purusha: 'madhyama', number: 'eka', gloss: 'rise up!', note: 'imperative; finite verb' },
      'परन्तप':           { category: 'noun', root: 'परन्तप', gender: 'm', number: 'eka', case: 'sam', gloss: 'O scorcher of enemies', note: 'सम्बोधन; उपपद तत्पुरुष' },
    },
    vyakhya: [
      {
        title: 'Three finite verbs, three different jobs',
        body: 'गमः (negated by मा स्म — prohibitive aorist: "do not yield"), उपपद्यते (लट् — descriptive: "is fitting"), उत्तिष्ठ (लोट् — direct command: "rise!"). The verse moves prohibition → judgment → command. Each मूड marks Krishna\'s tone shift across the three pādas.',
      },
      {
        title: 'त्यक्त्वा is absolutive — not a finite verb',
        body: 'The -त्वा ending marks an absolutive (gerund): "having abandoned." It bridges to the imperative उत्तिष्ठ but anchors nothing on its own. If you read त्यक्त्वा as a verb, you miss that the whole second pāda is one connected action: "abandon-and-rise."',
      },
      {
        title: 'मा स्म + लुङ् is the prohibitive construction',
        body: 'गमः is technically a लुङ् (aorist) form. It would be a past tense — but with मा स्म preceding it, the aorist becomes a prohibition ("do not go"). Pāṇini\'s rule: मा-particle + लुङ् augment-stripped = imperative-of-negation. Common Vedic pattern, retained in classical poetry.',
      },
    ],
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
    wordParsings: {
      'कथम्':            { category: 'particle', gloss: 'how?' },
      'भीष्मम्':          { category: 'noun', root: 'भीष्म', gender: 'm', number: 'eka', case: 'dvi', gloss: 'Bhīṣma', note: 'object of प्रतियोत्स्यामि' },
      'अहम्':             { category: 'pronoun', root: 'अस्मद्', gender: '-', number: 'eka', case: 'pra', gloss: 'I' },
      'सङ्ख्ये':          { category: 'noun', root: 'सङ्ख्य', gender: 'n', number: 'eka', case: 'sap', gloss: 'in battle' },
      'द्रोणम्':          { category: 'noun', root: 'द्रोण', gender: 'm', number: 'eka', case: 'dvi', gloss: 'Droṇa' },
      'च':                { category: 'particle', gloss: 'and' },
      'मधुसूदन':           { category: 'noun', root: 'मधुसूदन', gender: 'm', number: 'eka', case: 'sam', gloss: 'O slayer of Madhu (epithet of Krishna)', note: 'सम्बोधन; उपपद तत्पुरुष' },
      'इषुभिः':           { category: 'noun', root: 'इषु', gender: 'm', number: 'bahu', case: 'tri', gloss: 'with arrows', note: 'instrumental — means' },
      'प्रति-योत्स्यामि': { category: 'verb', root: 'प्रति + √युध्', gana: 4, pada: 'P', lakara: 'lrt', purusha: 'uttama', number: 'eka', gloss: 'I shall fight against', note: 'finite verb; future' },
      'पूजार्हौ':         { category: 'adjective', root: 'पूजार्ह', gender: 'm', number: 'dvi', case: 'dvi', gloss: 'worthy of worship (the two)', note: 'षष्ठी तत्पुरुष; agrees with भीष्मम् + द्रोणम्' },
      'अरिसूदन':           { category: 'noun', root: 'अरिसूदन', gender: 'm', number: 'eka', case: 'sam', gloss: 'O slayer of foes (epithet of Krishna)', note: 'सम्बोधन; उपपद तत्पुरुष' },
    },
    vyakhya: [
      {
        title: 'Two epithets of Krishna — both vocatives, both dripping with irony',
        body: 'मधुसूदन ("slayer of Madhu") and अरिसूदन ("slayer of foes") are उपपद-तत्पुरुष compounds. They both LOOK like accusative objects of the future verb प्रतियोत्स्यामि — but the -अ ending and the स्तेम tell you they\'re सम्बोधन (vocatives). Arjuna is addressing Krishna by his most violent epithets while pleading inability to fight. Choosing those epithets here is the rhetorical knife.',
      },
      {
        title: 'पूजार्हौ — the दlitt that locks two objects together',
        body: 'पूजार्हौ is द्वितीया द्विवचन ("worthy of worship — these two"). Same विभक्ति, वचन, लिंग as भीष्मम् + द्रोणम् (taken together). सामानाधिकरण्य locks the adjective onto both objects in parallel — Bhīṣma AND Droṇa, both worthy. The dual is precise: not "the two of them and others" but exactly these two.',
      },
      {
        title: 'लृट् spotted by -ष्य- infix',
        body: 'प्रति-योत्स्यामि = प्रति + √युध् + future-marker -स्य- (after a sandhi-converted dental) + लट्-style ending -आमि (उत्तम एकवचन). The -ष्य- in the middle is the dead giveaway. Once you see लृट्, you know the verb is future, the speaker is uncertain about the action, and the question carries weight.',
      },
    ],
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
    wordParsings: {
      'गुरून्':            { category: 'noun', root: 'गुरु', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'gurus, teachers', note: 'object of अहत्वा and हत्वा' },
      'अहत्वा':            { category: 'krdanta', root: '√हन्', kind: 'absolutive (negative)', gloss: 'without killing', note: 'अ- prefix + absolutive' },
      'हि':                { category: 'particle', gloss: 'indeed / for / because' },
      'महा-अनुभावान्':    { category: 'adjective', root: 'महानुभाव', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'noble-souled, of great spirit', note: 'बहुव्रीहि compound; agrees with गुरून्' },
      'श्रेयः':            { category: 'adjective', root: 'श्रेयस्', kind: 'comparative', gender: 'n', number: 'eka', case: 'pra', gloss: 'better, preferable', note: 'predicate adjective with implied अस्ति' },
      'भोक्तुम्':           { category: 'krdanta', root: '√भुज्', kind: 'infinitive', gloss: 'to eat / to enjoy', note: 'infinitive — non-finite' },
      'भैक्ष्यम्':         { category: 'noun', root: 'भैक्ष्य', gender: 'n', number: 'eka', case: 'dvi', gloss: 'alms, beggar\'s food', note: 'object of भोक्तुम्' },
      'अपि':              { category: 'particle', gloss: 'also / even' },
      'इह':               { category: 'particle', gloss: 'here / in this world' },
      'लोके':              { category: 'noun', root: 'लोक', gender: 'm', number: 'eka', case: 'sap', gloss: 'in the world' },
      'हत्वा':            { category: 'krdanta', root: '√हन्', kind: 'absolutive', gloss: 'having killed' },
      'अर्थ-कामान्':      { category: 'adjective', root: 'अर्थकाम', gender: 'm', number: 'bahu', case: 'dvi', gloss: '(those) driven by wealth and pleasure', note: 'इतरेतर द्वन्द्व used adjectivally; agrees with गुरून्' },
      'तु':                 { category: 'particle', gloss: 'but / however' },
      'एव':                { category: 'particle', gloss: 'only / itself / exactly' },
      'भुञ्जीय':          { category: 'verb', root: '√भुज्', gana: 7, pada: 'A', lakara: 'vidhilin', purusha: 'uttama', number: 'eka', gloss: 'should one enjoy?', note: 'optative — the rhetorical-horror mood; the only finite verb' },
      'भोगान्':             { category: 'noun', root: 'भोग', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'pleasures, enjoyments' },
      'रुधिर-प्रदिग्धान्': { category: 'adjective', root: 'रुधिरप्रदिग्ध', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'smeared with blood', note: 'तृतीया तत्पुरुष; agrees with भोगान्' },
    },
    vyakhya: [
      {
        title: 'Three verb-looking words, ONE finite verb',
        body: 'भोक्तुम् = infinitive (-तुम् ending: "to eat"). हत्वा / अहत्वा = absolutives (-त्वा ending: "having killed" / "without killing"). श्रेयः = predicate adjective with implied अस्ति. Only भुञ्जीय is conjugated for person × number — और it carries the entire verse\'s mood.',
      },
      {
        title: 'विधिलिङ् as rhetorical horror',
        body: 'भुञ्जीय = √भुज् + विधिलिङ् + आत्मनेपद + उत्तम एकवचन = "should one enjoy." The optative मूड encodes Arjuna\'s recoil — he\'s not asking "will I enjoy" or "do I enjoy"; he\'s asking "*should* one even contemplate enjoying?" The horror is grammatically baked into the verb form.',
      },
      {
        title: 'महानुभावान् गुरून् — adjective shadowing noun',
        body: 'Both द्वितीया बहुवचन पुल्लिंग — adjective + noun लोcked by सामानाधिकरण्य. Without the agreement, you might read महानुभावान् as a separate noun ("noble ones"). With it, the verse says: "[these gurus, who are] noble-souled." Same lock applies to रुधिरप्रदिग्धान् भोगान् in the second half.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // BROWSE-TIER VERSES (21 popular Gītā verses, decodeIndex 5+).
  // These ship with mool + padaccheda + Edwin Arnold + Annie Besant
  // translations + brief Hindi gloss. wordParsings, samasNotes,
  // vibhaktiNotes, keyFights, anvaya are intentionally not seeded —
  // they are the user's hand-decoding work, layered on later.
  // ──────────────────────────────────────────────────────────────────────────

  {
    chapter: 2, verse: 13,
    title: 'Childhood, youth, age — and the passing to another body',
    decodeIndex: 5,
    mool: [
      'देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा।',
      'तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥',
    ],
    padaccheda: ['देहिनः', 'अस्मिन्', 'यथा', 'देहे', 'कौमारम्', 'यौवनम्', 'जरा', 'तथा', 'देह-अन्तर-प्राप्तिः', 'धीरः', 'तत्र', 'न', 'मुह्यति'],
    finiteVerbs: [
      { form: 'मुह्यति', root: '√मुह्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'is deluded' },
    ],
    anvaya: 'यथा अस्मिन् देहे देहिनः कौमारम् यौवनम् जरा (भवति), तथा देह-अन्तर-प्राप्तिः (भवति) | धीरः तत्र न मुह्यति',
    hindi: 'जैसे जीव के इस शरीर में बालपन, जवानी और बुढ़ापा होते हैं, वैसे ही दूसरे शरीर की प्राप्ति भी होती है। धीर पुरुष इस विषय में मोहित नहीं होता।',
    english: 'As, in this body, the embodied soul passes through childhood, youth, and age — so too is the passing to another body. The wise are not deluded by it.',
    vyakhya: [
      {
        title: 'यथा / तथा — the bridge construction',
        body: 'Sanskrit has no relative pronoun like English "that." It uses paired clauses: यथा-clause sets up the analogy, तथा-clause completes it. Krishna teaches abstract metaphysics (rebirth) by yoking it to concrete experience (aging). Grammar carries pedagogy.',
      },
      {
        title: 'Three nominatives, no overt verb in the यथा-clause',
        body: 'कौमारम् + यौवनम् + जरा are all प्रथमा एकवचन — three subjects sharing an implied भवति. The यथा-clause doesn\'t need a finite verb because the तथा-clause supplies the predication and the parallel does the rest.',
      },
      {
        title: 'मुह्यति — the only finite anchor',
        body: 'धीरः तत्र न मुह्यति — the entire verse hinges on this single लट् verb. The yathā/tathā pair is *setup*; the wise person\'s non-delusion is the *point*. The structure tracks the meaning.',
      },
    ],
    references: {
      translations: [
        { translator: 'Edwin Arnold', year: 1885, work: 'The Song Celestial', license: 'public-domain', text: 'Nay, but as when one layeth His worn-out robes away, And, taking new ones, sayeth, "These will I wear to-day!" So putteth by the spirit Lightly its garb of flesh, And passeth to inherit A residence afresh.' },
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'As the dweller in the body experienceth, in the body, childhood, youth, old age, so passeth he on to another body; the steadfast one grieveth not thereat.' },
      ],
    },
  },
  {
    chapter: 2, verse: 14,
    title: 'Sense-contacts come and go — endure them',
    decodeIndex: 6,
    mool: [
      'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।',
      'आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
    ],
    padaccheda: ['मात्रा-स्पर्शाः', 'तु', 'कौन्तेय', 'शीत-उष्ण-सुख-दुःख-दाः', 'आगम-अपायिनः', 'अनित्याः', 'तान्', 'तितिक्षस्व', 'भारत'],
    finiteVerbs: [
      { form: 'तितिक्षस्व', root: '√तिज् (desid.)', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'endure!' },
    ],
    anvaya: 'कौन्तेय भारत, मात्रा-स्पर्शाः तु शीत-उष्ण-सुख-दुःख-दाः, आगम-अपायिनः, अनित्याः (सन्ति) | तान् तितिक्षस्व',
    hindi: 'हे कुन्तीपुत्र, इन्द्रिय-विषयों के स्पर्श सर्दी-गर्मी और सुख-दुःख देनेवाले हैं। ये आते-जाते हैं, अनित्य हैं — हे भारत, इन्हें सहन करो।',
    english: 'The contacts of the senses with their objects, O son of Kuntī, give rise to cold and heat, pleasure and pain. They come and go, are impermanent — endure them, O Bhārata.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'The contacts of matter, O son of Kuntī, giving cold and heat, pleasure and pain, they come and go, impermanent; endure them bravely, O Bhārata.' },
      ],
    },
  },
  {
    chapter: 2, verse: 22,
    title: 'Changing clothes — the soul changes bodies',
    decodeIndex: 7,
    mool: [
      'वासांसि जीर्णानि यथा विहाय',
      'नवानि गृह्णाति नरोऽपराणि।',
      'तथा शरीराणि विहाय जीर्णा-',
      'न्यन्यानि संयाति नवानि देही॥',
    ],
    padaccheda: ['वासांसि', 'जीर्णानि', 'यथा', 'विहाय', 'नवानि', 'गृह्णाति', 'नरः', 'अपराणि', 'तथा', 'शरीराणि', 'विहाय', 'जीर्णानि', 'अन्यानि', 'संयाति', 'नवानि', 'देही'],
    finiteVerbs: [
      { form: 'गृह्णाति', root: '√ग्रह्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'takes' },
      { form: 'संयाति',   root: 'सम् + √या', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'goes / passes into' },
    ],
    nonFinite: [
      { form: 'विहाय', kind: 'absolutive', root: 'वि + √हा', gloss: 'having cast off' },
    ],
    anvaya: 'यथा नरः जीर्णानि वासांसि विहाय अपराणि नवानि गृह्णाति, तथा देही जीर्णानि शरीराणि विहाय अन्यानि नवानि संयाति',
    hindi: 'जैसे मनुष्य पुराने वस्त्रों को त्याग कर नए वस्त्र धारण करता है, वैसे ही जीवात्मा पुराने शरीरों को त्याग कर नए शरीरों को प्राप्त होता है।',
    vyakhya: [
      {
        title: 'Perfect यथा / तथा symmetry',
        body: 'Both clauses share the SAME structure: subject (नरः / देही) + objects (जीर्णानि वासांसि / जीर्णानि शरीराणि) + विहाय (absolutive — "having cast off") + new objects (अपराणि नवानि / अन्यानि नवानि) + finite verb (गृह्णाति / संयाति). The metaphor is structural, not just lexical — Sanskrit lets you BUILD the analogy in the grammar itself.',
      },
      {
        title: 'विहाय appears twice — once per clause',
        body: 'Same absolutive in both halves. The repetition isn\'t accidental: it\'s the hinge that makes the analogy land. The man casts off worn clothes (विहाय) → the soul casts off worn bodies (विहाय). Word-for-word parallelism is a Sanskrit poetic technique with theological weight.',
      },
      {
        title: 'Two verbs of motion, two scales',
        body: 'गृह्णाति = "takes" (the everyday action — picking up a fresh shirt). संयाति = "passes into" (the cosmic action — the soul transmigrating). Same grammatical role (लट् प्रथम एकवचन) but different scales. The verse zooms out from kitchen-table to metaphysics in one step.',
      },
    ],
    english: 'As a man, casting off worn-out garments, takes new ones, so the embodied soul, casting off worn-out bodies, enters into other new ones.',
    references: {
      translations: [
        { translator: 'Edwin Arnold', year: 1885, work: 'The Song Celestial', license: 'public-domain', text: 'Nay, but as when one layeth His worn-out robes away, And, taking new ones, sayeth, "These will I wear to-day!" So putteth by the spirit Lightly its garb of flesh, And passeth to inherit A residence afresh.' },
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'As a man, casting off worn-out garments, taketh new ones, so the dweller in the body, casting off worn-out bodies, entereth into others that are new.' },
      ],
    },
  },
  {
    chapter: 2, verse: 23,
    title: 'The soul cannot be cut, burnt, drowned, or dried',
    decodeIndex: 8,
    mool: [
      'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।',
      'न चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥',
    ],
    padaccheda: ['न', 'एनम्', 'छिन्दन्ति', 'शस्त्राणि', 'न', 'एनम्', 'दहति', 'पावकः', 'न', 'च', 'एनम्', 'क्लेदयन्ति', 'आपः', 'न', 'शोषयति', 'मारुतः'],
    finiteVerbs: [
      { form: 'छिन्दन्ति',   root: '√छिद्',  lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', gloss: 'cleave / cut' },
      { form: 'दहति',         root: '√दह्',  lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'burns' },
      { form: 'क्लेदयन्ति',  root: '√क्लिद् (caus.)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', gloss: 'wet' },
      { form: 'शोषयति',      root: '√शुष् (caus.)',  lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'dries' },
    ],
    anvaya: 'एनम् न शस्त्राणि छिन्दन्ति | एनम् न पावकः दहति | एनम् न च आपः क्लेदयन्ति | (एनम्) न मारुतः शोषयति',
    hindi: 'इस आत्मा को शस्त्र काट नहीं सकते, अग्नि जला नहीं सकती, जल भिगो नहीं सकता, और वायु सुखा नहीं सकती।',
    english: 'Weapons cannot cleave it, fire cannot burn it, waters cannot wet it, nor can the wind dry it.',
    references: {
      translations: [
        { translator: 'Edwin Arnold', year: 1885, work: 'The Song Celestial', license: 'public-domain', text: 'Never the spirit was born; the spirit shall cease to be never; / Never was time it was not; End and Beginning are dreams! / Birthless and deathless and changeless remaineth the spirit for ever; / Death hath not touched it at all, dead though the house of it seems!' },
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Weapons cleave it not, nor fire burneth it, nor waters wet it, nor wind drieth it away.' },
      ],
    },
  },
  {
    chapter: 2, verse: 47,
    title: 'कर्मण्येवाधिकारस्ते — the most-quoted verse of the Gītā',
    decodeIndex: 9,
    mool: [
      'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
      'मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    ],
    padaccheda: ['कर्मणि', 'एव', 'अधिकारः', 'ते', 'मा', 'फलेषु', 'कदाचन', 'मा', 'कर्म-फल-हेतुः', 'भूः', 'मा', 'ते', 'सङ्गः', 'अस्तु', 'अकर्मणि'],
    finiteVerbs: [
      { form: 'भूः',   root: '√भू',   lakara: 'लोट् (negated by मा)', purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'be — negated: "do not be"' },
      { form: 'अस्तु', root: '√अस्', lakara: 'लोट्',                  purusha: 'प्रथम',  vachana: 'एकवचन', gloss: 'let it be — negated: "let there not be"' },
    ],
    anvaya: 'ते कर्मणि एव अधिकारः (अस्ति), फलेषु कदाचन मा (अधिकारः) | (त्वम्) कर्म-फल-हेतुः मा भूः | ते अकर्मणि सङ्गः मा अस्तु',
    hindi: 'तेरा अधिकार केवल कर्म पर है, फलों पर कभी नहीं। तू कर्म के फल का कारण मत बन; और न ही अकर्म में आसक्ति रखे।',
    vyakhya: [
      {
        title: 'Three मा prohibitions, escalating in target',
        body: '(1) मा फलेषु — implicit: don\'t (claim entitlement) over fruits. (2) मा कर्म-फल-हेतुर्भूः — direct command: don\'t BE the cause-of-fruit. (3) मा ते सङ्गोऽस्त्वकर्मणि — impersonal: let there not be attachment to inaction. The target moves from object (फलेषु) → agent (you) → an abstract state (सङ्ग). Three prohibitions, three grammatical depths.',
      },
      {
        title: 'Two finite verbs, both in लोट्',
        body: 'भूः (मा भूः — "do not be" — direct 2sg imperative) and अस्तु (मा अस्तु — "let it not be" — 3sg imperative, impersonal). The shift from 2nd to 3rd person is a register shift: Krishna moves from commanding Arjuna directly to commanding the world-state around him.',
      },
      {
        title: 'अधिकारः is supplied, not stated',
        body: 'The first half has no overt finite verb — कर्मणि एव अधिकारः ते (the implied verb is अस्ति). Then मा फलेषु कदाचन — same elision: मा फलेषु अधिकारः कदाचन (अस्तु). One predicate, structurally repeated with an implicit अस्ति/अस्तु, the way Sanskrit poetry compresses by ellipsis.',
      },
    ],
    english: 'Your right is only to action, never to its fruits. Do not be motivated by the fruits of action — yet do not be attached to inaction either.',
    references: {
      translations: [
        { translator: 'Edwin Arnold', year: 1885, work: 'The Song Celestial', license: 'public-domain', text: 'Let right deeds be Thy motive, not the fruit which comes from them. / And live in action! Labour! Make thine acts thy piety, casting all self aside, contemning gain and merit; / Equable in good or evil; equability is Yog, is piety!' },
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Thy business is with the action only, never with its fruits; so let not the fruit of action be thy motive, nor be thou to inaction attached.' },
      ],
    },
  },
  {
    chapter: 2, verse: 48,
    title: 'समत्वं योग उच्यते — equanimity is yoga',
    decodeIndex: 10,
    mool: [
      'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।',
      'सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
    ],
    padaccheda: ['योग-स्थः', 'कुरु', 'कर्माणि', 'सङ्गम्', 'त्यक्त्वा', 'धनञ्जय', 'सिद्धि-असिद्ध्योः', 'समः', 'भूत्वा', 'समत्वम्', 'योगः', 'उच्यते'],
    finiteVerbs: [
      { form: 'कुरु',     root: '√कृ',  lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'do!' },
      { form: 'उच्यते', root: '√वच्', lakara: 'लट् (passive)', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'is called' },
    ],
    nonFinite: [
      { form: 'त्यक्त्वा', kind: 'absolutive', root: '√त्यज्', gloss: 'having abandoned' },
      { form: 'भूत्वा',    kind: 'absolutive', root: '√भू',    gloss: 'having become' },
    ],
    anvaya: 'धनञ्जय, सङ्गम् त्यक्त्वा सिद्धि-असिद्ध्योः समः भूत्वा योग-स्थः (सन्) कर्माणि कुरु | समत्वम् योगः उच्यते',
    hindi: 'हे धनञ्जय, आसक्ति त्यागकर, सिद्धि-असिद्धि में समान रहकर, योग में स्थित हुआ कर्म कर। समत्व ही योग कहा जाता है।',
    english: 'Established in yoga, abandon attachment, O Dhanañjaya, perform action being even-minded in success and failure. Equanimity is called yoga.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Perform action, O Dhanañjaya, dwelling in union with the divine, renouncing attachments, and balanced evenly in success and failure: equilibrium is called yoga.' },
      ],
    },
  },
  {
    chapter: 2, verse: 50,
    title: 'योग: कर्मसु कौशलम् — skill in action is yoga',
    decodeIndex: 11,
    mool: [
      'बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।',
      'तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥',
    ],
    padaccheda: ['बुद्धि-युक्तः', 'जहाति', 'इह', 'उभे', 'सुकृत-दुष्कृते', 'तस्मात्', 'योगाय', 'युज्यस्व', 'योगः', 'कर्मसु', 'कौशलम्'],
    finiteVerbs: [
      { form: 'जहाति',     root: '√हा',     lakara: 'लट्',  purusha: 'प्रथम',  vachana: 'एकवचन', gloss: 'casts off' },
      { form: 'युज्यस्व', root: '√युज्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'yoke yourself!' },
    ],
    anvaya: 'बुद्धि-युक्तः इह उभे सुकृत-दुष्कृते जहाति | तस्मात् योगाय युज्यस्व | योगः कर्मसु कौशलम् (अस्ति)',
    hindi: 'बुद्धि से युक्त पुरुष इस लोक में सुकृत और दुष्कृत — दोनों को त्याग देता है। इसलिए योग में लग जा। योग ही कर्मों में कुशलता है।',
    english: 'United with the discriminating mind, one casts off in this world both good and evil deeds. Therefore yoke yourself to yoga. Yoga is skill in action.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'United to the pure reason one renounceth alike successful and unsuccessful results. Cleave thou to yoga; yoga is skill in action.' },
      ],
    },
  },
  {
    chapter: 2, verse: 62,
    title: 'Dwelling on objects → attachment → desire (the chain begins)',
    decodeIndex: 12,
    mool: [
      'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।',
      'सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥',
    ],
    padaccheda: ['ध्यायतः', 'विषयान्', 'पुंसः', 'सङ्गः', 'तेषु', 'उपजायते', 'सङ्गात्', 'सञ्जायते', 'कामः', 'कामात्', 'क्रोधः', 'अभिजायते'],
    finiteVerbs: [
      { form: 'उपजायते',  root: 'उप + √जन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'arises' },
      { form: 'सञ्जायते', root: 'सम् + √जन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'is born' },
      { form: 'अभिजायते', root: 'अभि + √जन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'arises forth' },
    ],
    anvaya: 'विषयान् ध्यायतः पुंसः तेषु सङ्गः उपजायते | सङ्गात् कामः सञ्जायते | कामात् क्रोधः अभिजायते',
    hindi: 'विषयों का चिन्तन करनेवाले पुरुष की उन विषयों में आसक्ति उत्पन्न होती है। आसक्ति से कामना उत्पन्न होती है, और कामना से क्रोध।',
    vyakhya: [
      {
        title: 'The विभक्ति cascade IS the philosophy',
        body: 'Each ablative (पञ्चमी) names the cause of the next nominative. विषयान्-attention → सङ्गः; सङ्गात् (from attachment) → कामः; कामात् (from desire) → क्रोधः. The grammar is a chain: each step grammatically generates the next. Sanskrit makes causation visible at the case-ending level.',
      },
      {
        title: 'Three verbs of "arising" — graded by उपसर्ग',
        body: 'उप-जायते (arises near, secondary), सम्-जायते (is born together, fully), अभि-जायते (arises forth, climactically). Same root (√जन्), same आत्मनेपद ending — but each उपसर्ग shifts the intensity. The verse spirals upward in violence: contact → attachment → desire → anger.',
      },
      {
        title: 'ध्यायतः — the genitive participle',
        body: 'ध्यायतः is genitive singular of the present participle of √ध्यै. "Of (the man) dwelling on..." It modifies पुंसः (also genitive). The construction "for the man who dwells on objects, attachment arises" — the experiencer is in the genitive, not the nominative. The agent is grammatically passive in Sanskrit, the way mental states feel in English.',
      },
    ],
    english: 'In a man dwelling on the objects of the senses, attachment to them is produced. From attachment springs desire; from desire, anger.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Man, musing on the objects of sense, conceiveth an attachment to these; from attachment ariseth desire; from desire anger cometh forth.' },
      ],
    },
  },
  {
    chapter: 2, verse: 63,
    title: 'Anger → delusion → memory-loss → ruin (the chain continues)',
    decodeIndex: 13,
    mool: [
      'क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।',
      'स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥',
    ],
    padaccheda: ['क्रोधात्', 'भवति', 'सम्मोहः', 'सम्मोहात्', 'स्मृति-विभ्रमः', 'स्मृति-भ्रंशात्', 'बुद्धि-नाशः', 'बुद्धि-नाशात्', 'प्रणश्यति'],
    finiteVerbs: [
      { form: 'भवति',     root: '√भू',         lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'arises / is' },
      { form: 'प्रणश्यति', root: 'प्र + √नश्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'perishes' },
    ],
    anvaya: 'क्रोधात् सम्मोहः भवति | सम्मोहात् स्मृति-विभ्रमः (भवति) | स्मृति-भ्रंशात् बुद्धि-नाशः (भवति) | बुद्धि-नाशात् प्रणश्यति',
    hindi: 'क्रोध से सम्मोह होता है, सम्मोह से स्मृति का विभ्रम; स्मृति-नाश से बुद्धि का नाश और बुद्धि-नाश से प्राणी का विनाश।',
    vyakhya: [
      {
        title: 'Continues the cascade from 2.62 — but now four steps',
        body: '2.62 ended at क्रोधः. 2.63 starts at क्रोधात् and continues: anger → delusion → memory-loss → intellect-destruction → person-destruction. Five nodes, four ablative-driven transitions. Read together, 2.62 + 2.63 are a seven-step ruin sequence.',
      },
      {
        title: 'Only one overt verb — the rest is implied',
        body: 'Only भवति is stated (line 1). Lines 2-3 omit it: "from delusion (comes) memory-loss; from memory-collapse (comes) intellect-destruction." The reader supplies भवति from context — Sanskrit poetry routinely elides repeated verbs. The chain is so strong it doesn\'t need to be spelled out.',
      },
      {
        title: 'प्रणश्यति breaks the pattern — and that\'s the point',
        body: 'The first three steps end in nouns (सम्मोहः, स्मृति-विभ्रमः, बुद्धि-नाशः — all प्रथमा एकवचन subjects). The final step is a finite verb: प्रणश्यति ("perishes"). The chain goes from "X arises" to "the person perishes" — verb category itself shifts as the destruction completes.',
      },
    ],
    english: 'From anger comes delusion; from delusion, confusion of memory; from confusion of memory, the destruction of intellect; from destruction of intellect — one perishes.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'From anger ariseth bewilderment, from bewilderment wandering of memory; from wandering of memory destruction of reason; from destruction of reason he perishes.' },
      ],
    },
  },
  {
    chapter: 3, verse: 21,
    title: 'The leader sets the standard',
    decodeIndex: 14,
    mool: [
      'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।',
      'स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥',
    ],
    padaccheda: ['यत्', 'यत्', 'आचरति', 'श्रेष्ठः', 'तत्', 'तत्', 'एव', 'इतरः', 'जनः', 'सः', 'यत्', 'प्रमाणम्', 'कुरुते', 'लोकः', 'तत्', 'अनुवर्तते'],
    finiteVerbs: [
      { form: 'आचरति',     root: 'आ + √चर्',  lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'practices, does' },
      { form: 'कुरुते',     root: '√कृ',        lakara: 'लट् (Ā)', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'sets, makes (for himself)' },
      { form: 'अनुवर्तते', root: 'अनु + √वृत्',  lakara: 'लट् (Ā)', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'follows' },
    ],
    anvaya: 'यत् यत् श्रेष्ठः आचरति, तत् तत् एव इतरः जनः (आचरति) | सः यत् प्रमाणम् कुरुते, लोकः तत् अनुवर्तते',
    hindi: 'जो-जो श्रेष्ठ पुरुष आचरण करता है, वही-वही आचरण साधारण लोग भी करते हैं। वह जो प्रमाण कर देता है, लोक उसी का अनुसरण करता है।',
    english: 'Whatever the great do, others follow. Whatever standard one sets, the world conforms to it.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Whatsoever a great man doeth, that other men also do; the standard he setteth up, by that the people go.' },
      ],
    },
  },
  {
    chapter: 3, verse: 35,
    title: "Better one's own dharma",
    decodeIndex: 15,
    mool: [
      'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।',
      'स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
    ],
    padaccheda: ['श्रेयान्', 'स्व-धर्मः', 'विगुणः', 'पर-धर्मात्', 'सु-अनुष्ठितात्', 'स्व-धर्मे', 'निधनम्', 'श्रेयः', 'पर-धर्मः', 'भय-आवहः'],
    finiteVerbs: [],
    keyFights: [
      'No overt finite verb — the verse is a chain of predicate-adjective copular constructions with implied अस्ति (X is श्रेयान्, Y is श्रेयः, Z is भय-आवहः).',
    ],
    anvaya: 'सु-अनुष्ठितात् पर-धर्मात् विगुणः स्व-धर्मः श्रेयान् (अस्ति) | स्व-धर्मे निधनम् श्रेयः (अस्ति) | पर-धर्मः भय-आवहः (अस्ति)',
    hindi: "अपना धर्म, गुणरहित ही क्यों न हो, दूसरे के अच्छी प्रकार से किए धर्म से श्रेष्ठ है। अपने धर्म में मरना श्रेष्ठ है; पराया धर्म भयावह है।",
    english: "Better one's own dharma, even if imperfect, than another's well-performed. Better to die in one's own dharma; another's dharma is fraught with fear.",
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: "Better one's own duty, though destitute of merits, than the duty of another well discharged. Better death in the discharge of one's own duty; the duty of another is full of danger." },
      ],
    },
  },
  {
    chapter: 4, verse: 7,
    title: 'Whenever dharma declines — I manifest',
    decodeIndex: 16,
    mool: [
      'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।',
      'अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
    ],
    padaccheda: ['यदा', 'यदा', 'हि', 'धर्मस्य', 'ग्लानिः', 'भवति', 'भारत', 'अभ्युत्थानम्', 'अधर्मस्य', 'तदा', 'आत्मानम्', 'सृजामि', 'अहम्'],
    finiteVerbs: [
      { form: 'भवति',  root: '√भू', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'arises' },
      { form: 'सृजामि', root: '√सृज्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: 'I send forth / I manifest' },
    ],
    anvaya: 'भारत, यदा यदा हि धर्मस्य ग्लानिः, अधर्मस्य अभ्युत्थानम् भवति, तदा अहम् आत्मानम् सृजामि',
    hindi: 'हे भारत, जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं स्वयं को प्रकट करता हूँ।',
    vyakhya: [
      {
        title: 'यदा … तदा — the cosmic conditional',
        body: 'यदा-clause sets the condition (whenever); तदा-clause states the consequence (then). This is the same correlative structure as यद्/तद् pronouns, but for time. The यदा is doubled (यदा यदा) for repeated/recurring conditions: "whenever, again and again, dharma declines."',
      },
      {
        title: 'Two finite verbs, one in each clause',
        body: 'भवति in the यदा-clause (the world\'s condition: "decline of dharma arises") and सृजामि in the तदा-clause (Krishna\'s response: "I send forth"). Two clauses, two verbs — both लट्. The grammar mirrors the cosmology: the condition triggers the response in the same temporal frame.',
      },
      {
        title: 'सृजामि is reflexive in effect, not in form',
        body: '"I send forth आत्मानम्" — but आत्मानम् here is "Myself," meaning Krishna\'s own self-manifestation. The verb is परस्मैपद (active form) but the meaning is reflexive ("I send Myself forth"). Sanskrit doesn\'t need a separate reflexive voice when the object pronoun (आत्मानम्) does the work.',
      },
    ],
    english: 'Whenever there is a decline of dharma, O Bhārata, and a rising of adharma — at that time I manifest Myself.',
    references: {
      translations: [
        { translator: 'Edwin Arnold', year: 1885, work: 'The Song Celestial', license: 'public-domain', text: 'When Righteousness Declines, O Bhārata! when Wickedness Is strong, I rise, from age to age, and take Visible shape, and move a man with men.' },
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Whenever there is decay of righteousness, O Bhārata, and there is exaltation of unrighteousness, then I Myself come forth.' },
      ],
    },
  },
  {
    chapter: 4, verse: 8,
    title: 'To protect the good, destroy the evil — age after age',
    decodeIndex: 17,
    mool: [
      'परित्राणाय साधूनां विनाशाय च दुष्कृताम्।',
      'धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥',
    ],
    padaccheda: ['परित्राणाय', 'साधूनाम्', 'विनाशाय', 'च', 'दुष्कृताम्', 'धर्म-संस्थापन-अर्थाय', 'सम्भवामि', 'युगे', 'युगे'],
    finiteVerbs: [
      { form: 'सम्भवामि', root: 'सम् + √भू', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: 'I come into being / I manifest' },
    ],
    anvaya: 'साधूनाम् परित्राणाय, दुष्कृताम् विनाशाय च, धर्म-संस्थापन-अर्थाय (अहम्) युगे युगे सम्भवामि',
    hindi: 'साधुओं की रक्षा के लिए, दुष्टों के विनाश के लिए और धर्म की पुनः स्थापना के लिए मैं युग-युग में प्रकट होता हूँ।',
    english: 'For the protection of the good, for the destruction of evildoers, and for the re-establishment of dharma, I come into being from age to age.',
    references: {
      translations: [
        { translator: 'Edwin Arnold', year: 1885, work: 'The Song Celestial', license: 'public-domain', text: 'For rescue of the righteous, and for crushing the wicked\'s strength, And for re-stablishing of duty, age after age I come.' },
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'For the protection of the good, for the destruction of evildoers, for the firm establishing of the law, I come forth in age after age.' },
      ],
    },
  },
  {
    chapter: 6, verse: 5,
    title: 'Lift yourself by yourself — आत्मना आत्मानम् उद्धरेत्',
    decodeIndex: 18,
    mool: [
      'उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत्।',
      'आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    ],
    padaccheda: ['उद्धरेत्', 'आत्मना', 'आत्मानम्', 'न', 'आत्मानम्', 'अवसादयेत्', 'आत्मा', 'एव', 'हि', 'आत्मनः', 'बन्धुः', 'आत्मा', 'एव', 'रिपुः', 'आत्मनः'],
    finiteVerbs: [
      { form: 'उद्धरेत्',     root: 'उद् + √हृ', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'should lift up' },
      { form: 'अवसादयेत्', root: 'अव + √सद् (caus.)', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'should let sink' },
    ],
    anvaya: 'आत्मना आत्मानम् उद्धरेत् | आत्मानम् न अवसादयेत् | हि आत्मा एव आत्मनः बन्धुः (अस्ति), आत्मा एव आत्मनः रिपुः (अस्ति)',
    hindi: 'अपने ही द्वारा अपना उद्धार करे; अपने आप को नीचे न गिराए। आत्मा ही अपना मित्र है, और आत्मा ही अपना शत्रु।',
    vyakhya: [
      {
        title: 'आत्मन् in FOUR cases in two lines',
        body: 'आत्मना (तृतीया — by the self) · आत्मानम् (द्वितीया — the self) · आत्मा (प्रथमा — the self) · आत्मनः (षष्ठी — of the self). Same word, four functions, two lines. The verse is a विभक्ति textbook for आत्मन् — and that\'s not coincidence. The philosophy IS that one self plays all the roles.',
      },
      {
        title: 'Two विधिलिङ् verbs of opposite directions',
        body: 'उद्धरेत् ("should lift up" — उद् + √हृ) and अवसादयेत् ("should let sink" — अव + √सद्). Both optatives, both 3sg. The उद् and अव prefixes are spatially opposite — up vs down. Krishna\'s instruction: lift, never let sink.',
      },
      {
        title: 'The reflexive grammar of self-effort',
        body: 'In English we\'d need a reflexive pronoun: "lift YOURSELF by YOURSELF, don\'t let YOURSELF sink." Sanskrit just uses आत्मन् in different cases — no separate reflexive needed. The verse exploits the ambiguity: आत्मन् as "self" (everyday) is also आत्मन् as "Self" (philosophical). Both readings are simultaneously alive.',
      },
    ],
    english: 'Lift yourself by yourself; let not the self sink. The self alone is one\'s friend; the self alone is one\'s enemy.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Let him raise the self by the Self, and not let the self become depressed; for verily is the Self the friend of the self, and also the Self the self\'s enemy.' },
      ],
    },
  },
  {
    chapter: 6, verse: 6,
    title: 'The self as friend or as enemy — depends on its conquest',
    decodeIndex: 19,
    mool: [
      'बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः।',
      'अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत्॥',
    ],
    padaccheda: ['बन्धुः', 'आत्मा', 'आत्मनः', 'तस्य', 'येन', 'आत्मा', 'एव', 'आत्मना', 'जितः', 'अनात्मनः', 'तु', 'शत्रुत्वे', 'वर्तेत', 'आत्मा', 'एव', 'शत्रुवत्'],
    finiteVerbs: [
      { form: 'वर्तेत', root: '√वृत्', lakara: 'विधिलिङ् (Ā)', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'would behave' },
    ],
    nonFinite: [
      { form: 'जितः', kind: 'past passive participle', root: '√जि', gloss: 'has been conquered (predicate adjective)' },
    ],
    anvaya: 'येन आत्मा एव आत्मना जितः, तस्य आत्मनः आत्मा बन्धुः (अस्ति) | अनात्मनः तु आत्मा एव शत्रुवत् शत्रुत्वे वर्तेत',
    hindi: 'जिसने अपने आप को अपने द्वारा जीत लिया है, उसके लिए आत्मा ही मित्र है। पर जिसने स्वयं को नहीं जीता, उसके लिए वह आत्मा ही शत्रुवत् रहता है।',
    english: 'For one who has conquered the self by the Self, the self is a friend; for one who has not, the self remains hostile, like an enemy.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'The Self is the friend of the self of him in whom the self by the Self is vanquished; but to the unsubdued self the Self verily becometh hostile as an enemy.' },
      ],
    },
  },
  {
    chapter: 6, verse: 30,
    title: 'Who sees Me everywhere',
    decodeIndex: 20,
    mool: [
      'यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति।',
      'तस्याहं न प्रणश्यामि स च मे न प्रणश्यति॥',
    ],
    padaccheda: ['यः', 'माम्', 'पश्यति', 'सर्वत्र', 'सर्वम्', 'च', 'मयि', 'पश्यति', 'तस्य', 'अहम्', 'न', 'प्रणश्यामि', 'सः', 'च', 'मे', 'न', 'प्रणश्यति'],
    finiteVerbs: [
      { form: 'पश्यति',      root: '√दृश् (suppl. पश्य-)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'sees' },
      { form: 'प्रणश्यामि', root: 'प्र + √नश्',  lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: 'I am lost' },
      { form: 'प्रणश्यति',  root: 'प्र + √नश्',  lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: 'is lost' },
    ],
    anvaya: 'यः माम् सर्वत्र पश्यति, सर्वम् च मयि पश्यति, तस्य अहम् न प्रणश्यामि, सः च मे न प्रणश्यति',
    hindi: 'जो मुझे सर्वत्र देखता है और सबको मुझ में देखता है, उसके लिए मैं कभी अदृश्य नहीं होता; और वह भी मेरे लिए अदृश्य नहीं होता।',
    english: 'One who sees Me everywhere and sees all in Me — I am never lost to him, nor is he lost to Me.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'He who seeth Me everywhere, and seeth everything in Me, of him will I never lose hold, and he shall never lose hold of Me.' },
      ],
    },
  },
  {
    chapter: 6, verse: 34,
    title: 'The mind is restless — Arjuna\'s honest difficulty',
    decodeIndex: 21,
    mool: [
      'चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम्।',
      'तस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम्॥',
    ],
    padaccheda: ['चञ्चलम्', 'हि', 'मनः', 'कृष्ण', 'प्रमाथि', 'बलवत्', 'दृढम्', 'तस्य', 'अहम्', 'निग्रहम्', 'मन्ये', 'वायोः', 'इव', 'सुदुष्करम्'],
    finiteVerbs: [
      { form: 'मन्ये', root: '√मन्', lakara: 'लट् (Ā)', purusha: 'उत्तम', vachana: 'एकवचन', gloss: 'I think, I deem' },
    ],
    anvaya: 'कृष्ण, मनः हि चञ्चलम् प्रमाथि बलवत् दृढम् (अस्ति) | तस्य निग्रहम् अहम् वायोः इव सुदुष्करम् मन्ये',
    hindi: 'हे कृष्ण, मन तो बड़ा चञ्चल, उद्रेक करनेवाला, बलवान् और दृढ़ है। उसका निग्रह मैं वायु को रोकने जैसा अति कठिन मानता हूँ।',
    english: 'The mind is restless, turbulent, powerful, obstinate, O Krishna. To control it is, I think, as difficult as controlling the wind.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'For the mind is verily restless, O Krishna; it is impetuous, strong, and difficult to bend. I deem it as hard to curb as the wind.' },
      ],
    },
  },
  {
    chapter: 9, verse: 22,
    title: 'योगक्षेम — for those who are constantly devoted',
    decodeIndex: 22,
    mool: [
      'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।',
      'तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    ],
    padaccheda: ['अनन्याः', 'चिन्तयन्तः', 'माम्', 'ये', 'जनाः', 'पर्युपासते', 'तेषाम्', 'नित्य-अभियुक्तानाम्', 'योग-क्षेमम्', 'वहामि', 'अहम्'],
    finiteVerbs: [
      { form: 'पर्युपासते', root: 'परि + उप + √आस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', gloss: 'they worship' },
      { form: 'वहामि',        root: '√वह्',                   lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: 'I bear, I provide' },
    ],
    nonFinite: [
      { form: 'चिन्तयन्तः', kind: 'present participle', root: '√चिन्त्',  gloss: 'thinking, meditating' },
    ],
    anvaya: 'ये जनाः अनन्याः (सन्तः) माम् चिन्तयन्तः पर्युपासते, तेषाम् नित्य-अभियुक्तानाम् योग-क्षेमम् अहम् वहामि',
    hindi: 'जो लोग अनन्य भाव से मेरा चिन्तन करते हुए मेरी उपासना करते हैं — उन नित्य-युक्त भक्तों का योग और क्षेम मैं स्वयं वहन करता हूँ।',
    english: 'Those who, with single-minded devotion, meditate on Me and worship Me — I personally bear their welfare and provide what they need.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'The men who, meditating on Me as non-separate, worship Me everywhere, to these, ever harmonised, I bring full security.' },
      ],
    },
  },
  {
    chapter: 9, verse: 27,
    title: 'Whatever you do — offer it to Me',
    decodeIndex: 23,
    mool: [
      'यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्।',
      'यत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥',
    ],
    padaccheda: ['यत्', 'करोषि', 'यत्', 'अश्नासि', 'यत्', 'जुहोषि', 'ददासि', 'यत्', 'यत्', 'तपस्यसि', 'कौन्तेय', 'तत्', 'कुरुष्व', 'मत्-अर्पणम्'],
    finiteVerbs: [
      { form: 'करोषि',     root: '√कृ',     lakara: 'लट्',  purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'you do' },
      { form: 'अश्नासि',  root: '√अश्',    lakara: 'लट्',  purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'you eat' },
      { form: 'जुहोषि',    root: '√हु',     lakara: 'लट्',  purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'you offer in sacrifice' },
      { form: 'ददासि',    root: '√दा',     lakara: 'लट्',  purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'you give' },
      { form: 'तपस्यसि', root: '√तप्',  lakara: 'लट्',  purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'you perform austerity' },
      { form: 'कुरुष्व',  root: '√कृ',    lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'do (it) — for yourself!' },
    ],
    anvaya: 'कौन्तेय, यत् करोषि, यत् अश्नासि, यत् जुहोषि, यत् ददासि, यत् तपस्यसि — तत् मत्-अर्पणम् कुरुष्व',
    hindi: 'हे कौन्तेय, तू जो भी करता है, खाता है, हवन करता है, दान देता है, और जो तप करता है — वह सब मुझे अर्पण कर के कर।',
    vyakhya: [
      {
        title: 'The यद् … तद् correlative — five subordinate clauses, one main clause',
        body: 'Five यत्-clauses set up referents: यत् करोषि, यत् अश्नासि, यत् जुहोषि, यत् ददासि, यत् तपस्यसि — "whatever you (do/eat/offer/give/perform-austerity)." The single तद्-clause picks them all up: तत् कुरुष्व मदर्पणम् — "*that*, do as an offering to Me." Among six finite verbs, exactly one sits in the main clause — कुरुष्व.',
      },
      {
        title: 'Mood marks the hierarchy: लट् vs लोट्',
        body: 'Five verbs are लट् (present indicative — descriptions of what Arjuna already does). कुरुष्व alone is लोट् (imperative — Krishna\'s actual command). The यत्-clauses are *what already happens*; कुरुष्व is *what to do with it*. Mood marks which clause is the operator.',
      },
      {
        title: '√कृ is the meta-verb',
        body: 'Krishna picks √कृ for the imperative deliberately. Eat, offer, give, perform austerity — all reduce to "doing things." √कृ is general enough to encompass all five. The same root that appears in the first यत्-clause (करोषि) also serves as the cover-imperative (कुरुष्व) for all of them. The verse is self-referential: "whatever you *do*… do *that* as an offering."',
      },
      {
        title: 'On कुरुष्व vs कुरु',
        body: 'कुरु would be परस्मैपद; कुरुष्व is आत्मनेपद. Meter forces कुरुष्व — अनुष्टुभ् needs the syllable count, कुरु would leave the pāda short. But traditional commentators read the आत्मनेपद as semantically apt: the offering returns to the agent — bhakti benefits the bhakta. Whether the choice is metrical or doctrinal is debatable; both readings are grammatically present.',
      },
    ],
    english: 'Whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give, whatever austerity you practice, O son of Kuntī — do it as an offering to Me.',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Whatsoever thou doest, whatsoever thou eatest, whatsoever thou offerest, whatsoever thou givest, whatsoever thou doest of austerity, O Kaunteya, do thou that as an offering unto Me.' },
      ],
    },
  },
  {
    chapter: 12, verse: 13,
    title: "Qualities of a devotee — friend to all beings",
    decodeIndex: 24,
    mool: [
      'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।',
      'निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥',
    ],
    padaccheda: ['अद्वेष्टा', 'सर्व-भूतानाम्', 'मैत्रः', 'करुणः', 'एव', 'च', 'निर्ममः', 'निरहङ्कारः', 'सम-दुःख-सुखः', 'क्षमी'],
    finiteVerbs: [],
    keyFights: [
      'No overt finite verb — the verse is a list of qualities (predicate adjectives) of the ideal devotee. The predicate "is dear to Me" is supplied by the next verse (12.14): यो मद्भक्तः स मे प्रियः.',
    ],
    anvaya: 'सर्व-भूतानाम् अद्वेष्टा मैत्रः करुणः एव च निर्ममः निरहङ्कारः सम-दुःख-सुखः क्षमी (मे प्रियः — see 12.14)',
    hindi: 'जो किसी प्राणी से द्वेष नहीं करता, सबसे मित्रता और करुणा रखता है, ममता और अहङ्कार से रहित है, सुख-दुःख में समान है, और क्षमाशील है।',
    vyakhya: [
      {
        title: 'NO finite verb in the entire verse',
        body: 'Eight predicate adjectives in a row, no overt verb anywhere. This is grammatically possible because the actual predicate ("is dear to Me") is supplied by the NEXT verse: यो मद्भक्तः स मे प्रियः (12.14). Sanskrit allows verb-less verses when the predication continues across the शlokas — the sentence spans the verse-boundary.',
      },
      {
        title: 'नञ्-समास compounds describe absences',
        body: 'अद्वेष्टा (a-dveṣṭā — "non-hater"), निर्ममः (nir-mama — "without mine"), निरहङ्कारः (nir-ahaṅkāra — "without ego"). All formed by negative prefix (अ-, निर्-) on a positive concept. The devotee is described as much by what they lack as by what they possess. Three of the eight qualities are negative — and the negation is *grammatical*, not adverbial.',
      },
      {
        title: 'Compound adjectives capture pairs',
        body: 'सम-दुःख-सुखः ("equal-in-sorrow-and-joy") is a single बहुव्रीहि compound — three words fused into one possessive adjective. "He whose sorrow and joy are equal." Sanskrit lets you build a personality trait into a single word.',
      },
    ],
    english: 'One who hates no being, friendly and compassionate to all, free from "mine"-ness and ego, equal in pleasure and pain, forgiving — [is dear to Me].',
    references: {
      translations: [
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'He who beareth no ill-will to any being, friendly and compassionate, without attachment and egoism, balanced in pleasure and pain, and forgiving...' },
      ],
    },
  },
  {
    chapter: 18, verse: 66,
    title: 'चरम-श्लोक — abandon all dharmas, take refuge in Me alone',
    decodeIndex: 25,
    mool: [
      'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।',
      'अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    ],
    padaccheda: ['सर्व-धर्मान्', 'परित्यज्य', 'माम्', 'एकम्', 'शरणम्', 'व्रज', 'अहम्', 'त्वा', 'सर्व-पापेभ्यः', 'मोक्षयिष्यामि', 'मा', 'शुचः'],
    finiteVerbs: [
      { form: 'व्रज',                  root: '√व्रज्',   lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'go!' },
      { form: 'मोक्षयिष्यामि', root: '√मुच् (caus.)', lakara: 'लृट्', purusha: 'उत्तम',  vachana: 'एकवचन', gloss: 'I will liberate' },
      { form: 'शुचः',                root: '√शुच्',     lakara: 'लुङ् (negated by मा)', purusha: 'मध्यम', vachana: 'एकवचन', gloss: 'grieve — negated: "do not grieve"' },
    ],
    nonFinite: [
      { form: 'परित्यज्य', kind: 'absolutive', root: 'परि + √त्यज्', gloss: 'having abandoned' },
    ],
    anvaya: 'सर्व-धर्मान् परित्यज्य माम् एकम् शरणम् व्रज | अहम् त्वा सर्व-पापेभ्यः मोक्षयिष्यामि | मा शुचः',
    hindi: 'सब धर्मों को त्याग कर केवल मेरी ही शरण में आ। मैं तुझे सब पापों से मुक्त कर दूँगा। शोक मत कर।',
    vyakhya: [
      {
        title: 'Three commands + one promise',
        body: 'परित्यज्य (absolutive — "having abandoned"; sets up the action), व्रज (लोट् — "go!"), मा शुचः (लुङ् negated — "do not grieve!"). Then the promise: मोक्षयिष्यामि (लृट् — "I will liberate"). Three imperatives in one half, one future in the other. The single लृट् is the only verb that\'s NOT a command — and it\'s the verse\'s reassurance.',
      },
      {
        title: 'सर्वधर्मान् as one tatpurusha',
        body: 'सर्व-धर्मान् ("all dharmas") is treated as a single object — one तत्पुरुष in द्वितीया बहुवचन. The verse doesn\'t list dharmas one by one; it bundles them. Krishna isn\'t saying "abandon ritual dharma, social dharma, varna dharma separately"; he\'s saying abandon-the-whole-class. The grammar collapses many duties into one objective.',
      },
      {
        title: 'मा शुचः — the prohibitive aorist',
        body: 'शुचः is technically a लुङ् (aorist) form of √शुच्. With मा preceding it, the aorist becomes a prohibition: "do not grieve." Same construction as 2.3 (मा स्म गमः). Compare: मा शुचः ends a verse — and ends the entire Bhagavad Gītā\'s structured teaching. The Lord\'s last directive to Arjuna is grammatically a prohibition: don\'t.',
      },
    ],
    english: 'Abandoning all dharmas, take refuge in Me alone. I will liberate you from all sins. Do not grieve.',
    references: {
      translations: [
        { translator: 'Edwin Arnold', year: 1885, work: 'The Song Celestial', license: 'public-domain', text: 'Cast off all duties — come to Me, the One Refuge! I will release thee from all sins; / Be not afraid!' },
        { translator: 'Annie Besant', year: 1895, work: 'The Bhagavad-Gītā', license: 'public-domain', text: 'Abandoning all duties, come unto Me alone for shelter; sorrow not, I will liberate thee from all sins.' },
      ],
    },
  },
];

const verseKey = (ch, v) => `${ch}.${v}`;

export const VERSE_MAP = new Map(VERSES.map((v) => [verseKey(v.chapter, v.verse), v]));

export const getVerse = (chapter, verse) => VERSE_MAP.get(verseKey(chapter, verse)) || null;

export const isDecoded = (chapter, verse) => VERSE_MAP.has(verseKey(chapter, verse));
