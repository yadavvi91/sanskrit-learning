// Primer content — re-entry safety net. Aimed at re-entry, not first-time learning.
// Each section: { id, title, body (string or array of paragraphs), examples?, table? }

export const PRIMER_SECTIONS = [
  {
    id: 'why-hard',
    title: 'Why Sanskrit is hard to read at first',
    body: [
      'Three structural facts you have to keep in mind:',
      '1. **Free word order** — case endings carry the grammatical meaning that English word order carries. Word order in Sanskrit is shuffled for poetry, not parsing.',
      '2. **Sandhi joins words** — the boundaries between words can be invisible in the written form, because adjacent sounds fuse.',
      '3. **Aggressive compounding** — Sanskrit smashes multiple words into one (समास). The compound looks like a single word; it isn\'t.',
      'The decoder\'s job is to undo all three before reading the sentence as a sentence.',
    ],
  },
  {
    id: 'sov-svo',
    title: 'Word order — free, but with a default',
    body: [
      'Sanskrit\'s word order is **free**: case endings (विभक्ति) mark who-did-what-to-whom, so reordering doesn\'t change meaning. *रामः रावणं हन्ति*, *रावणं रामः हन्ति*, and *हन्ति रामः रावणम्* all mean "Rāma kills Rāvaṇa." The `-ः` (nom.) on रामः and the `-म्` (acc.) on रावणम् carry the grammar; their position doesn\'t. **Poets exploit this freedom for metre.**',
      'But Sanskrit also has a **default / unmarked order: SOV** (Subject + Object + Verb). It\'s not a *rule*; it\'s the order Sanskrit reaches for when nothing rhetorical or metrical is forcing a different choice. Hindi inherits the default and is much stricter about it: *मैं एक सेब खाता हूँ* / *अहं सेबं खादामि*.',
      'English by contrast is **SVO** and *needs* that order — *I eat an apple* and *an apple eats I* are different sentences in English. Sanskrit doesn\'t have that constraint.',
      '**अन्वय restores the default SOV order.** The verse may scramble words for metre; अन्वय untangles them back to "Subject + qualifiers, Object + qualifiers, Verb." That\'s why अन्वय is a teaching tool, not a translation tool — it shows you the unmarked sentence the metre hid.',
    ],
    aside: 'Bibek Debroy, in *Bhagavad Gita for Millennials*, emphasises the freedom side: "word order doesn\'t matter, the endings do the work." That\'s correct about *grammar* (the case endings disambiguate). But there is still a *typological* default — SOV — which अन्वय reveals. Both halves are true; they\'re answering different questions.',
  },
  {
    id: 'decode-sequence',
    title: 'The decode sequence',
    body: [
      'Four arrows, every time:',
      '**पदच्छेद → अन्वय → हिंदी → English**',
      '1. **पदच्छेद** — split the verse into individual words (undo sandhi, undo compound).',
      '2. **अन्वय** — reorder those words into SOV.',
      '3. **हिंदी** — translate to Hindi (closer to Sanskrit grammatically — sanity-check first).',
      '4. **English** — translate to English last.',
      'The Hindi step is the truth-telling step. If your Hindi makes sense, your decoding is right. If your English makes sense but your Hindi doesn\'t, you\'ve hidden a mistake under English\'s flexible grammar.',
    ],
  },
  {
    id: 'finite-verb',
    title: 'Finding the finite verb',
    body: [
      'The finite verb is the **sentence anchor**. Everything else orbits it.',
      'Endings to scan for:',
    ],
    table: {
      headers: ['लकार', 'Spotting signal', 'Example'],
      rows: [
        ['लट् (present)',     '-ति / -मि',          'भवति, उपपद्यते (Gītā 2.3)'],
        ['लङ् (past)',        'अ- prefix + -त्',     'अकुर्वत (Gītā 1.1)'],
        ['लृट् (future)',     '-ष्य- / -स्य- infix', 'प्रतियोत्स्यामि (Gītā 2.4)'],
        ['लोट् (imperative)', '-तु / bare / -अन्तु',  'उत्तिष्ठ (Gītā 2.3)'],
        ['विधिलिङ् (optative)', '-ेत् / -ेयुः',         'भुञ्जीय (Gītā 2.5)'],
      ],
    },
    aside:
      'Giveaway test: remove a word — does the sentence still hold? If yes, that word is not the finite verb. ' +
      'A finite verb is the only word the sentence cannot lose.',
  },
  {
    id: 'vibhakti',
    title: 'विभक्ति in one minute',
    body: [
      'Eight cases × three numbers = 24 forms per declension. The endings tell you the grammatical role; you don\'t need a preposition.',
    ],
    table: {
      headers: ['विभक्ति', 'Case', 'Sense', 'As seen in'],
      rows: [
        ['प्रथमा',   'Nominative',     'subject',          'युयुत्सवः (1.1), सङ्गः (2.62)'],
        ['द्वितीया',  'Accusative',     'object',           'भीष्मम् (2.4), विषयान् (2.62)'],
        ['तृतीया',   'Instrumental',   'by / with',        'इषुभिः (2.4), आत्मना (6.5 — by the self)'],
        ['चतुर्थी',   'Dative',         'for / to',         'परित्राणाय (4.8 — for the protection), योगाय (2.50 — for yoga)'],
        ['पञ्चमी',   'Ablative',       'from',             'सङ्गात् (2.62 — from attachment), क्रोधात् (2.63 — from anger), पर-धर्मात् (3.35), सर्व-पापेभ्यः (18.66)'],
        ['षष्ठी',     'Genitive',       'of / belonging to', 'धर्मस्य (4.7), साधूनाम् (4.8), आत्मनः (6.5)'],
        ['सप्तमी',   'Locative',       'in / at / on',     'सङ्ख्ये (2.4), कर्मणि (2.47), स्व-धर्मे (3.35)'],
        ['सम्बोधन', 'Vocative',       'O!',               'पार्थ (2.3), कौन्तेय (2.14), धनञ्जय (2.48)'],
      ],
    },
    aside: 'सम्बोधन is never part of the action. It addresses someone; it isn\'t a participant. ' +
      'पञ्चमी is the cause-of-arising case — Gītā 2.62-63 chains four ablatives in two verses (सङ्गात् → कामात् → क्रोधात् → सम्मोहात्). ' +
      'चतुर्थी is the dative-of-purpose — परित्राणाय / विनाशाय / अर्थाय are the textbook -आय endings. ' +
      'Need the FULL declension table (8 cases × 3 numbers) for any paradigm — देव, सीता, फल, मति, गुरु, आत्मन्, कर्मन्, मनस्? See Atlas → शब्दरूप (Declensions).',
    linkToAtlas: 'declensions',
  },
  {
    id: 'lakara',
    title: 'लकार in one minute',
    body: [
      'Five tense-moods cover ~95% of the Gītā\'s finite verbs. Each has a spotting signal — once you can see the signal, the लकार names itself.',
    ],
    table: {
      headers: ['लकार', 'Function', 'Signal', 'Example'],
      rows: [
        ['लट्',     'Present',     '-ति / -मि',        'उपपद्यते (2.3), भवति (2.63), पश्यति (6.30)'],
        ['लङ्',     'Past',        'अ- prefix + -त्',  'अकुर्वत (1.1)'],
        ['लृट्',    'Future',      '-ष्य- infix',       'प्रतियोत्स्यामि (2.4), मोक्षयिष्यामि (18.66)'],
        ['लोट्',    'Imperative',  '-तु / -हि / bare',  'उत्तिष्ठ (2.3), कुरु (2.48), तितिक्षस्व (2.14), व्रज (18.66)'],
        ['विधिलिङ्', 'Optative',   '-ेत् / -ेयुः',       'भुञ्जीय (2.5), उद्धरेत् (6.5), वर्तेत (6.6)'],
      ],
    },
    aside:
      'विधिलिङ् ("should/ought") is the rhetorical mood. Arjuna in 2.5 doesn\'t say "I will enjoy" — ' +
      'he says "should one enjoy?" The mood encodes his horror grammatically.',
  },
  {
    id: 'krdanta',
    title: 'कृदन्त — what\'s NOT the finite verb',
    body: [
      'The #1 trap: a verb-looking word that isn\'t the finite verb. It looks active, but it can\'t anchor a sentence.',
    ],
    table: {
      headers: ['Type', 'Pattern', 'Example', 'Translation'],
      rows: [
        ['Past passive participle (PPP)', '-त / -न ending, declines like an adjective', 'समवेताः (1.1)', '"gathered" (describes warriors)'],
        ['Absolutive',                     '-त्वा / -य ending, indeclinable',           'त्यक्त्वा (2.3)', '"having abandoned"'],
        ['Negative absolutive',           'अ- prefix + absolutive',                     'अहत्वा (2.5)',  '"without killing"'],
        ['Infinitive',                     '-तुम् ending',                                'भोक्तुम् (2.5)',  '"to eat"'],
      ],
    },
    aside:
      'Mistaking a कृदन्त for the finite verb is the most common decoding error. ' +
      'The cure: ask "is this conjugated for person × number?" Only the finite verb is.',
  },
  {
    id: 'adjectives',
    title: 'विशेषण-विशेष्य — adjectives shadow their nouns',
    body: [
      'Adjectives don\'t live in their own dimension. They <strong>sāmānādhikaraṇa</strong> — share the same address — with their noun, matching it in:',
      '- **लिंग** (gender)',
      '- **वचन** (number)',
      '- **विभक्ति** (case)',
      'Triple match. Example: in Gītā 2.5 *महानुभावान् गुरून्* — both द्वितीया, both बहुवचन, both पुंलिंग — confirms महानुभावान् is the adjective on गुरून्, not a separate noun.',
    ],
  },
  {
    id: 'sandhi',
    title: 'Sandhi — just enough',
    body: [
      'Sandhi rules are **deliberately deferred** in this project. The decoder undoes sandhi visually (the सन्धि notes per verse) without you needing to know the rules to make the joins.',
      'When you re-enter, don\'t worry about deriving why पाण्डवाश्चैव becomes पाण्डवाः + च + एव. Trust the सन्धि notes; learn the rules later.',
    ],
  },
  {
    id: 'purusha-flip',
    title: 'पुरुष flip',
    body: [
      'One sentence, trips everyone the first three times: **Sanskrit प्रथम पुरुष = English third person.**',
      'प्रथम (literally "first") = he/she/it/they.',
      'मध्यम (literally "middle") = you.',
      'उत्तम (literally "highest") = I/we.',
      'In Pāṇini\'s framing the most distant participant is named first; English flips this to put the speaker first.',
    ],
  },
  {
    id: 'compounds',
    title: 'समास — compound types',
    linkToAtlas: 'samasa',
    linkLabel: 'Open Atlas → Compounds',
    body: [
      'Quick reference:',
      '- **तत्पुरुष** — case-determined (षष्ठी inside: राजपुत्रः = "king\'s son")',
      '- **कर्मधारय** — adj + noun (नीलोत्पलम् = "blue lotus")',
      '- **द्वन्द्व** — list (रामलक्ष्मणौ = "Rāma and Lakṣmaṇa")',
      '- **बहुव्रीहि** — possessive ("the one who has X" — पीताम्बरः = Krishna)',
      '- **अव्ययीभाव** — adverbial (यथाशक्ति = "according to ability")',
      '- **द्विगु** — numerical (पञ्चवटी = "group of five trees")',
    ],
  },
  {
    id: 'pronouns',
    title: 'Pronouns',
    linkToAtlas: 'pronouns',
    linkLabel: 'Open Atlas → Pronouns',
    body: [
      'Personal pronouns (अस्मद्, युष्मद्) are pure memorization — suppletive, no gender, with enclitic alternates.',
      'सर्वनाम pronouns (तद्, यद्, किम्, सर्व, अन्य, एक, एतद्) all share one template with four <strong>स्म-cells</strong> deviating from the राम pattern.',
    ],
  },
  {
    id: 'karaka',
    title: 'कारक — semantic case-roles',
    linkToAtlas: 'karaka',
    linkLabel: 'Open Atlas → Case-roles',
    body: [
      'विभक्ति is morphological case. कारक is the semantic role. They usually align, but in passive constructions the विभक्ति assignments swap while the कारक roles do not.',
    ],
  },
  {
    id: 'indeclinables',
    title: 'अव्यय — indeclinables',
    linkToAtlas: 'avyaya',
    linkLabel: 'Open Atlas → Indeclinables',
    body: [
      'Pāṇini\'s third bin: words that don\'t change form. Particles (च, हि, तु, एव), postpositions (सह, विना, उपरि), most adverbs.',
      'Articles and prepositions don\'t exist as word classes — case endings do their work.',
    ],
  },
];
