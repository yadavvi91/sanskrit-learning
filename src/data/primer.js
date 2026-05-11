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
    id: 'verb-displacement',
    title: 'When the verb isn\'t where you expect it',
    body: [
      'Sanskrit — especially Gītā Sanskrit — frequently builds sentences that *look* verbless or whose verb sits somewhere odd. The English translation usually hides this: it inserts "is", "are", "say" because English requires finite verbs. Sanskrit does not.',
      'Four patterns to recognise:',
    ],
    table: {
      headers: ['Pattern', 'What\'s happening', 'Where to look', 'Gītā examples'],
      rows: [
        [
          'Predicate PPP / adjective + implied अस्ति',
          'A प्रथमा-case PPP (कृदन्त) or adjective IS the predicate. Implicit अस्ति links it to the subject. English spells this out as "was X / is X".',
          'No finite verb anywhere; a stack of प्रथमा adjectives describing one subject',
          '1.33 (काङ्क्षितम्, अवस्थिताः); 2.20 (अजः, नित्यः, शाश्वतः, पुराणः); 2.24 (अच्छेद्यः, अदाह्यः, अक्लेद्यः, अशोष्यः — nine adjectives describing the आत्मन्)',
        ],
        [
          'अनुवृत्ति (verb carries across verses)',
          'A finite verb in verse N governs the syntactic skeleton of verses N+1, N+2, …. Drop one verse out of context and it looks fragmentary.',
          'The verb appears once and gets mentally supplied throughout',
          '1.16-1.18 borrow दध्मौ from 1.15; the entire विभूति योग (10.20+) runs on अस्मि stated once and carried across ~30 manifestation verses',
        ],
        [
          'यथा-तथा structure',
          'Two-half simile. The verb in the तथा-half (second half) governs both halves. The यथा-half is grammatically complete *only because* of the तथा-half\'s verb.',
          'यथा at the start of one half + तथा at the start of the other',
          '2.22 (यथा... गृह्णाति | तथा... संयाति — "as a man takes new clothes, so the soul takes new bodies"); 9.6 (verb उपधारय in line 2 governs the आकाश-वायु simile of line 1)',
        ],
        [
          'Defective verb आहुः / प्राहुः',
          'The root √अह् ("to say") exists ONLY in लिट् (perfect tense). आहुः = "they say"; प्राहुः = "the wise declare". Used everywhere in the Gītā for narrative dialogue and authoritative pronouncements. Recognise on sight — no other tense exists.',
          'Verbal endings -अहुः / -आहुः on otherwise narrative-feeling verses',
          '3.42 (...पराण्याहुः... — "they call the senses higher"); 4.1 (विवस्वान्... प्राह — "Vivasvān told it [to Manu]"); 18.3 (...त्याज्यं प्राहुर्मनीषिणः — "the wise call action worth-discarding")',
        ],
      ],
    },
    aside:
      'Why these matter: when you see a verse with no obvious finite verb, you\'re not reading it wrong — Sanskrit is using one of these displacement patterns. The translation will name an English verb, but the Sanskrit grammar keeps the verb implicit, displaced, or stretched across stanzas. Once you can name the pattern, the verse stops looking broken.',
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
    id: 'prefixes-suffixes',
    title: 'उपसर्ग / प्रत्यय — prefixes and suffixes',
    body: [
      'Sanskrit builds words by attaching small word-shaping pieces — <strong>उपसर्ग</strong> (prefixes) in front of verbal roots and other elements, and <strong>प्रत्यय</strong> (suffixes) at the end. Both can <em>completely change</em> the meaning of a root. Pāṇini\'s aphorism is direct about this: <strong>उपसर्गेण धात्वर्थो बलाद् अन्यत्र नीयते</strong> — "by a prefix, the meaning of the root is forcibly led elsewhere."',
      '<strong>Three families of prefix show up in the Gītā:</strong>',
      '<strong>1. The 22 traditional verbal prefixes (उपसर्ग).</strong> These attach to a verbal root and shift its meaning — sometimes intensifying, sometimes inverting, sometimes specializing. The table below shows the most frequent ones.',
    ],
    table: {
      headers: ['Prefix', 'Sense', 'Bare root', 'Prefixed form', 'Meaning shift'],
      rows: [
        ['प्र',     'forth / forward',              '√सिध् "succeed"',     'प्रसिद्ध्येत् (3.8)',  'thoroughly succeed / be fully accomplished'],
        ['सम्',    'with / together / completely', '√चर् "go, act"',       'समाचर (3.9, 3.19)',    'carry out / observe / perform fully'],
        ['आ',     'up to / hither',               '√चर् "go"',            'आचर "approach"',       'come towards / move into'],
        ['अनु',   'after / following',            '√वृत् "turn"',         'अनुवर्तते (3.21)',     'follow / conform to'],
        ['अधि',   'over / above / on',            '√स्था "stand"',        'अधितिष्ठति',           'preside over / occupy'],
        ['अति',   'beyond / very',                '√रिच् "leave"',        'अतिरिच्यते',           'is surpassed / excels (passive)'],
        ['अभि',   'towards / against',            '√जि "win"',            'अभिजायते',             'is born towards / arises'],
        ['प्रति',  'against / back',               '√युध् "fight"',         'प्रतियोत्स्यामि (2.4)','I will fight back against'],
        ['परा',   'away / off',                   '√भू "be"',             'पराभवति',              'is overthrown / perishes'],
        ['वि',    'apart / variously',            '√जि "win"',            'विजयते',               'is victorious (decisively)'],
        ['नि',    'down / into',                  '√यम् "restrain"',      'नियच्छति',             'controls / holds in'],
        ['उद् / उत्', 'up / out',                 '√स्था',                'उत्तिष्ठ (2.3)',       'rise up! get up!'],
        ['उप',    'near / under',                 '√सद् "sit"',           'उपासते',               'sit near / worship'],
        ['अव',    'down / off',                   '√ईक्ष् "see"',          'अवेक्षे (1.23)',       'survey / look down upon'],
        ['अप',    'away / off',                   '√हृ "carry"',          'अपहृत- (apahṛta-)',    'carried away / stolen'],
        ['निस् / निर्', 'out / without',          'भय / काम',             'निर्भय / निष्काम',     'without fear / desireless'],
        ['दुस् / दुर्', 'badly / hard',            '√कृ "do"',             'दुष्कृत- (4.8)',       'badly-done / evil'],
        ['परि',   'around / about',               '√त्यज् "abandon"',     'परित्यज्य (18.66)',    'completely give up'],
      ],
    },
    body2: [
      '<strong>2. The negation prefix (नञ्).</strong> Independent of the 22 above. <strong>अ-</strong> before a consonant; <strong>अन्-</strong> before a vowel — same rule as English "a/an". It negates the word it attaches to and forms a कर्मधारय compound called <em>नञ्तत्पुरुष</em>:',
      '— <strong>अ + कर्म</strong> → अकर्म "inaction" (3.8, 4.18)',
      '— <strong>अ + ज्ञान</strong> → अज्ञान "ignorance"',
      '— <strong>अ + भय</strong> → अभय "fearlessness" (16.1)',
      '— <strong>अ + सत्</strong> → असत् "unreal" (2.16)',
      '— <strong>अ + हिंसा</strong> → अहिंसा "non-violence" (13.7)',
      '— <strong>अन् + आदि</strong> → अनादि "beginningless" (10.3) <em>(vowel-initial → अन्)</em>',
      '— <strong>अन् + अन्त</strong> → अनन्त "endless" (10.13)',
      '<strong>3. The augment (अ-).</strong> A <em>different</em> अ-. The past-tense लङ् (imperfect) prepends <strong>अ-</strong> to the verb stem as a grammatical marker, not a semantic one. <em>अकुर्वत</em> (1.1) = अ- + कुर्व + अत. This is purely structural; it tells you "past tense" the same way English -ed does. Don\'t confuse this अ- with the negation अ-: negation अ- attaches to nouns/adjectives; augment अ- attaches to verb stems for past tense.',
      '<strong>Suffixes (प्रत्यय).</strong> Sanskrit\'s suffix system is enormous — Pāṇini classifies hundreds. Four families recur in the Gītā:',
      '— <strong>तिङ्</strong> — finite-verb endings (-ति, -न्ति, -मि, -ष्यति, -त्…). See लकार section above.',
      '— <strong>सुप्</strong> — noun case endings (-ः, -म्, -ेण, -ात्, -स्य, -े…). See विभक्ति section above.',
      '— <strong>कृत्</strong> — root-deriving suffixes that build participles/nouns from verbs: -त (past passive: कृत), -त्वा (absolutive: कृत्वा), -तुम् (infinitive: कर्तुम्), -अनीय / -तव्य (gerundive: करणीयम्), -शतृ (present active: कुर्वन्). See कृदन्त section above.',
      '— <strong>तद्धित</strong> — secondary-derivative suffixes that build new words from nouns: -त्व / -त्वम् (abstract: धर्मत्व "dharma-ness"), -मत् / -वत् (possessive: बुद्धिमत् "intelligent"), -इन् (agent: योगिन् "yogi").',
      '<strong>The honest sandhi caveat.</strong> Prefix + root often involves sandhi at the join (आ + एति → ऐति "comes"; उद् + स्था → उत्तिष्ठ "rise"; निस् + काम → निष्काम "desire-less"). This is the same sandhi machinery as elsewhere — the prefix doesn\'t get special treatment, but the join can hide what\'s underneath. When you see an opaque verb form, try peeling off a prefix candidate first.',
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
  {
    id: 'obscure-points',
    title: 'Obscure points — gotchas worth bookmarking',
    body: [
      'Edge cases and non-obvious rules that have surfaced while decoding the Gītā. Each row names the rule, gives a concrete verse + word it appeared on, and the sandhi or grammatical mechanism in play. When you hit one of these in the wild and it looks "broken", check this index — odds are it\'s on the list.',
    ],
    table: {
      headers: ['Rule / pattern', 'What\'s happening', 'Verse · word', 'Why it\'s easy to miss'],
      rows: [
        [
          'Compound declension follows उत्तरपद',
          'Inside a समास, only the LAST member\'s gender + stem-class determine the declension. The first member is just a stem; its standalone class doesn\'t apply.',
          '1.1 · कुरुक्षेत्रे (n. -अ stem → फल-class). Standalone कुरु is m. u-stem (कुरूणाम्) — but inside the compound that doesn\'t carry over.',
          'Same surface fragment "कुरु" appears in two completely different paradigms depending on whether it\'s standalone or compound-internal.',
        ],
        [
          'Defective √अह् (only लिट्)',
          '√अह् ("to say") exists ONLY in the perfect tense. आह = he said, आहुः = they say, प्राहुः = the wise declare. No लट्/लङ्/लृट्/लोट् forms exist.',
          '3.42 · पराण्याहुः ("they call them higher"); 4.1 · प्राह (विवस्वान्...प्राह); 18.3 · प्राहुर्मनीषिणः ("the wise call action…")',
          'Recognise on sight — no other tense available, so trying to derive a "present" आहति is wasted effort.',
        ],
        [
          'Visarga-र् sandhi (Pattern A: before voiced consonant)',
          '-ः + voiced consonant → -र् + cons (with virama written: र्). The visarga turns into an actual र्.',
          '10.21 · मरीचिर्मरुताम् ← मरीचिः + मरुताम्; 18.3 · प्राहुर्मनीषिणः ← प्राहुः + मनीषिणः',
          'र् + ् + cons looks structurally distinct, but visually blends into compound-internal -र्C- clusters; lexicon validation needed.',
        ],
        [
          'Visarga-र् sandhi (Pattern B: before vowel-letter)',
          '-ः + vowel → -र् + vowel-as-matra. The next word\'s initial vowel attaches as a matra on र; NO virama written. र+ि / र+े / र+ो look identical to internal syllables.',
          '3.42 · पराण्याहुरिन्द्रियेभ्यः ← पराण्याहुः + इन्द्रियेभ्यः (the इ became ि matra on र)',
          'Internal -र+matra- is everywhere (कुरुते, मरुत्, पुरुष, etc.). The boundary is invisible without lexicon hints.',
        ],
        [
          'Implicit virama drop (continuous writing)',
          '-म् or -त् or -न् + vowel-letter often drops the virama in writing — pure typographic convention. The hyphenless string covers a real word boundary.',
          '1.2 · आचार्यमुपसङ्गम्य = आचार्यम् + उपसङ्गम्य; 4.37 · भस्मसात्कुरुते = भस्मसात् + कुरुते',
          'Looks like one long word; only vocab/hint validation reveals the boundary.',
        ],
        [
          'Anusvara ं ↔ -म् equivalence',
          'Word-final ं (anusvara) and -म् (consonant + virama) are phonologically identical. Sanskrit prints them inconsistently: इदं vs इदम्, हृदं vs हृदम्.',
          '10.42 · विष्टभ्याहमिदं ↔ canonical विष्टभ्याहमिदम् (= विष्टभ्य + अहम् + इदम्)',
          'Same word looks different across editions; vocab lookup must canonicalise across both.',
        ],
        [
          'Predicate PPP / adjective + implied अस्ति',
          'A प्रथमा-case PPP or adjective IS the predicate; implicit अस्ति links it to the subject. English forces "is/was X" — Sanskrit doesn\'t.',
          '1.33 · काङ्क्षितम् ("was desired") + अवस्थिताः ("are stationed"); 2.20 · अजः नित्यः शाश्वतः पुराणः (4 stacked); 2.24 · अच्छेद्यः अदाह्यः अक्लेद्यः अशोष्यः नित्यः सर्वगतः स्थाणुः अचलः सनातनः (9 stacked!)',
          'No finite verb anywhere; the verse looks "incomplete" until you recognise the PPP/adjective IS the verb.',
        ],
        [
          'अनुवृत्ति — verb spans verses',
          'A finite verb in verse N governs the syntactic skeleton of verses N+1, N+2, …. Drop one verse out of context and it looks fragmentary.',
          '1.15 दध्मौ → 1.16-1.18 (no verb shown; mentally supply दध्मौ); 10.19/10.20 अहम् + implicit अस्मि → 10.21-10.42 entire विभूति योग chain',
          'Verse incomplete in isolation — only makes sense in sequence. Modern editions sometimes break the chain visually, hiding the connection.',
        ],
        [
          'यथा-तथा structure',
          'Two-half simile. Verb in the तथा-half (second half) governs both halves. The यथा-half is grammatically complete *only because* of the तथा-half\'s verb.',
          '2.22 · यथा...गृह्णाति | तथा...संयाति ("just as a man takes new clothes, so the soul takes new bodies"); 9.6 · यथाकाशस्थितो...वायुः | तथा सर्वाणि भूतानि...उपधारय',
          'First half looks verbless; second half\'s verb is the anchor for both.',
        ],
        [
          'आत्मनेपद imperative endings',
          'लोट् मध्यम-एकवचन आत्मनेपद = -स्व (not the परस्मैपद -हि). Other आत्मनेपद imperatives: -ध्वम् (2pl), -न्ताम् (3pl), -ताम् (3sg).',
          '2.18 · युध्यस्व ("fight!" — √युध् gaṇa 4 आत्मनेपद)',
          'Looks like noun ending in -व; only the verb-stem context reveals the imperative.',
        ],
        [
          'Passive voice -यते (कर्मणि लट्)',
          'The -यते infix-ending marks passive: subject is acted upon. उच्यते = "is called", ज्ञायते = "is known", दृश्यते = "is seen". Distinct from आत्मनेपद -ते: passive inserts -य- before the ending.',
          '8.3 · अध्यात्ममुच्यते ("is called अध्यात्म")',
          'Looks like आत्मनेपद on first glance; the inserted -य- is the passive marker.',
        ],
        [
          'Irregular विधिलिङ् of √अस् → -यात्',
          '√अस् (अदादिगण) takes -यात् in optative-3sg, not the regular -एत्. स्यात्, स्याताम्, स्युः.',
          '18.40 · स्यात्त्रिभिर्गुणैः ("could be by three guṇas")',
          'Standard verb-class regex for विधिलिङ् expects -एत् ending; -यात् is the irregular signal.',
        ],
        [
          'एक-वाक्यता vs अनुवृत्ति',
          'एक-वाक्यता = single sentence spanning multiple verses (one syntactic unit broken across stanzas by metre). अनुवृत्ति = the supply rule that lets you continue a verb/word implicitly. Both produce "verbless" verses; अनुवृत्ति specifically names which verb is being supplied.',
          '1.20 → 1.21 (एक-वाक्यता; the अनुवृत्ति verb is आह in 1.21); 2.42 → 2.43 (एक-वाक्यता; प्रवदन्ति from 2.42 governs both)',
          'Both feel "broken" mid-thought; naming the mechanism (which verb? from where?) is what unblocks reading.',
        ],
        [
          'कर्म as -न् stem (mixed paradigm)',
          'कर्म looks like a -अ neuter stem (कर्म, कर्मणि, कर्माणि), but it\'s actually a -न् stem (kṛn-suffix → कर्मन्). Strong cases drop the -न् (कर्म), weak cases keep it (कर्मणा, कर्मणि).',
          'Many Gītā verses · कर्म, कर्मणा, कर्मणि, कर्मणाम्',
          'Looks identical to -अ stem in some cases; differs sharply in others (कर्मणाम् not *कर्मानाम्).',
        ],
        [
          'Defective verb गाम् / गन्तृ irregularity',
          'गम्-related forms have unusual stem alternations. The -ता form (गन्तासि "you will go") is the लुट् periphrastic future, not the लृट्.',
          '2.52 · गन्तासि ("you will go beyond")',
          'Periphrastic future is a tense regex doesn\'t catch — easy to misclassify as a noun in -ता.',
        ],
      ],
    },
    aside:
      'This page grows over time. Each entry was a moment of "wait, why is this not parsing?" — captured here so you don\'t hit the same wall twice.',
  },
];
