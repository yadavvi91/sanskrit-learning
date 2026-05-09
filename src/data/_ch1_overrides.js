// Chapter 1 (अर्जुनविषादयोग) — verse-level overrides for the 38 verses
// not yet individually hand-decoded in verses.js. Composed by an agent
// against /tmp/ch1_todo.json. Each entry is paraphrase-quality and
// audit-flagged where uncertain (// AUDIT inline). The hydrator merges
// these via a wrapper module — overrides only fill missing fields, so
// any later hand-correction in verses.js takes priority.
export const CH1_VERSE_OVERRIDES = {
  '1.6': {
    speaker: 'दुर्योधन उवाच',
    padaccheda: [
      'युधामन्युः',
      'च',
      'विक्रान्तः',
      'उत्तमौजाः',
      'च',
      'वीर्यवान्',
      'सौभद्रः',
      'द्रौपदेयाः',
      'च',
      'सर्वे',
      'एव',
      'महारथाः',
    ],
    sandhiNotes: [
      'युधामन्युश्च = युधामन्युः + च (visarga + च → श्च)',
      'विक्रान्त उत्तमौजाश्च = विक्रान्तः + उत्तमौजाः + च (-ः + अ → -अ; lopa of visarga before vowel)',
      'सौभद्रो द्रौपदेयाश्च = सौभद्रः + द्रौपदेयाः + च (-ः + द → -ो)',
      'सर्व एव = सर्वे + एव (-े + ए → -अ ए by प्रगृह्य-like split? actually sarve eva: -e remains, treated as separate word)', // AUDIT: सर्व एव — the printed संहिता shows सर्व, but पदपाठ is सर्वे + एव; -ए is प्रगृह्य before vowel, no merge
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'युधामन्युः, उत्तमौजाः, सौभद्रः → प्रथमा एकवचन — individual warriors',
      'द्रौपदेयाः, महारथाः → प्रथमा बहुवचन — collective subjects',
      'विक्रान्तः (adj. of युधामन्युः), वीर्यवान् (adj. of उत्तमौजाः) → matching प्रथमा एकवचन',
      'सर्वे एव → "all indeed" — emphatic summative',
    ],
    keyFights: [
      'Pure warrior list — a nominal sentence with no finite verb. महारथाः at the end is the predicate ("are great chariot-warriors").',
      'Each warrior is paired with an adjective: युधामन्युः-विक्रान्तः, उत्तमौजाः-वीर्यवान् (विशेषण-विशेष्य).',
    ],
    anvaya:
      'विक्रान्तः युधामन्युः च, वीर्यवान् उत्तमौजाः च, सौभद्रः, द्रौपदेयाः च — सर्वे एव महारथाः',
    hindi:
      'पराक्रमी युधामन्यु, बलवान् उत्तमौजा, सुभद्रापुत्र (अभिमन्यु) और द्रौपदी के पुत्र — ये सब के सब महारथी हैं।',
    english:
      'And the valiant Yudhāmanyu, and the mighty Uttamaujas, the son of Subhadrā (Abhimanyu), and the sons of Draupadī — all of them are great chariot-warriors.',
  },

  '1.7': {
    speaker: 'दुर्योधन उवाच',
    padaccheda: [
      'अस्माकम्',
      'तु',
      'विशिष्टाः',
      'ये',
      'तान्',
      'निबोध',
      'द्विज-उत्तम',
      'नायकाः',
      'मम',
      'सैन्यस्य',
      'संज्ञार्थम्',
      'तान्',
      'ब्रवीमि',
      'ते',
    ],
    sandhiNotes: [
      'तान्निबोध = तान् + निबोध (न्-junction, no change)',
      'द्विजोत्तम = द्विज + उत्तम (अ + उ → ओ) — सम्बोधन of आचार्य द्रोण',
      'नायका मम = नायकाः + मम (-ः + म → -ा, visarga lopa before voiced consonant)',
      'संज्ञार्थम् = संज्ञा + अर्थम् (आ + अ → ा)',
      'तान्ब्रवीमि = तान् + ब्रवीमि',
    ],
    finiteVerbs: [
      { form: 'निबोध', root: 'नि + √बुध्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"know! be aware of!" (imperative addressed to द्रोण)' },
      { form: 'ब्रवीमि', root: '√ब्रू', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'P', gloss: '"I tell, I am telling"' },
    ],
    vibhaktiNotes: [
      'अस्माकम् → षष्ठी बहुवचन = "of us, on our side"',
      'विशिष्टाः, नायकाः → प्रथमा बहुवचन — predicate of relative clause and main clause',
      'ये → प्रथमा बहुवचन (relative pronoun) — "those who are"',
      'तान् → द्वितीया बहुवचन — object of निबोध and ब्रवीमि (twice)',
      'द्विजोत्तम → सम्बोधन एकवचन — Duryodhana addressing Drona',
      'सैन्यस्य → षष्ठी एकवचन = "of the army"',
      'संज्ञार्थम् → indeclinable / द्वितीया used adverbially = "for the sake of identification"',
      'ते → चतुर्थी / षष्ठी एकवचन (enclitic of युष्मद्) = "to you / for you"',
    ],
    keyFights: [
      'Two finite verbs flank the verse: निबोध (lot — command "know!") and ब्रवीमि (lat — "I tell"). The relative pronoun ये opens a sub-clause; तान् (twice!) is the resumptive demonstrative.',
      'द्विजोत्तम is सम्बोधन — Duryodhana flatters Drona to soften the lecture about his own army.',
    ],
    anvaya:
      'द्विजोत्तम | अस्माकम् तु ये विशिष्टाः मम सैन्यस्य नायकाः | संज्ञार्थम् तान् ते ब्रवीमि | तान् निबोध',
    hindi:
      'हे द्विजश्रेष्ठ (द्रोणाचार्य)! हमारी ओर से जो श्रेष्ठ योद्धा हैं, मेरी सेना के नायक हैं — परिचय के लिए मैं उनको आपको बताता हूँ; उन्हें जान लीजिए।',
    english:
      'But, O best of the twice-born, take note of those who are the most distinguished on our side, the leaders of my army — for the sake of identification, I name them to you.',
  },

  '1.8': {
    speaker: 'दुर्योधन उवाच',
    padaccheda: [
      'भवान्',
      'भीष्मः',
      'च',
      'कर्णः',
      'च',
      'कृपः',
      'च',
      'समितिञ्जयः',
      'अश्वत्थामा',
      'विकर्णः',
      'च',
      'सौमदत्तिः',
      'तथा',
      'एव',
      'च',
    ],
    sandhiNotes: [
      'भवान्भीष्मश्च = भवान् + भीष्मः + च (-ः + च → श्च)',
      'कर्णश्च, कृपश्च = -ः + च → -श्च (visarga सन्धि)',
      'सौमदत्तिस्तथैव = सौमदत्तिः + तथा + एव (-ः + त → -स्त; आ + ए → ै)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'भवान् → प्रथमा एकवचन (honorific pronoun) = "your honour" — addresses Drona himself',
      'भीष्मः, कर्णः, कृपः, अश्वत्थामा, विकर्णः, सौमदत्तिः → प्रथमा एकवचन — list of warriors',
      'समितिञ्जयः → प्रथमा एकवचन, उपपद तत्पुरुष ("battle-conquering") = epithet of कृप',
    ],
    keyFights: [
      'Another nominal warrior-list — no finite verb; predicate carries over from verse 1.7 (these are the leaders/नायकाः).',
      'अश्वत्थामा is आ-कारान्त पुल्लिंग, prātipadika अश्वत्थामन्; the प्रथमा-एकवचन drops the final -न्.',
      'सौमदत्तिः is the matronymic-style तद्धित of सोमदत्त = Bhūriśravas son of Somadatta.',
    ],
    anvaya:
      'भवान्, भीष्मः च, कर्णः च, समितिञ्जयः कृपः च, अश्वत्थामा, विकर्णः च, तथा एव सौमदत्तिः च',
    hindi:
      'आप स्वयं, भीष्म, कर्ण, और युद्धविजयी कृपाचार्य; तथा अश्वत्थामा, विकर्ण और सोमदत्त-पुत्र (भूरिश्रवा) भी।',
    english:
      'Yourself, and Bhīṣma, and Karṇa, and Kṛpa the victor in battle; Aśvatthāmā, Vikarṇa, and likewise the son of Somadatta as well.',
  },

  '1.9': {
    speaker: 'दुर्योधन उवाच',
    padaccheda: [
      'अन्ये',
      'च',
      'बहवः',
      'शूराः',
      'मत्-अर्थे',
      'त्यक्त-जीविताः',
      'नाना-शस्त्र-प्रहरणाः',
      'सर्वे',
      'युद्ध-विशारदाः',
    ],
    sandhiNotes: [
      'शूरा मदर्थे = शूराः + मदर्थे (-ः + म → -ा, visarga lopa before voiced consonant)',
      'मदर्थे = मत् + अर्थे (mat-arthe — "for my sake"; -त् + अ kept as म in compound by सन्धि-historic)', // AUDIT: मदर्थे derivation; printed as compound, treat as one word
      'त्यक्तजीविताः = त्यक्त + जीविताः (कृदन्त compound; कर्मधारय with PPP)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'अन्ये, बहवः, शूराः, सर्वे → प्रथमा बहुवचन — subjects',
      'त्यक्तजीविताः, नानाशस्त्रप्रहरणाः, युद्धविशारदाः → प्रथमा बहुवचन — predicate adjectives',
      'मदर्थे → सप्तमी / indeclinable-like = "for my sake" — actually a तत्पुरुष compound used adverbially',
    ],
    keyFights: [
      'Heavy-compound nominal sentence. त्यक्तजीविताः is a बहुव्रीहि: "(those) by-whom-life-has-been-renounced" = "ready to give up their lives".',
      'नानाशस्त्रप्रहरणाः — बहुव्रीहि: "(those) having various weapons as their striking-instruments".',
      'युद्धविशारदाः — कर्मधारय/तत्पुरुष: "skilled in war".',
    ],
    anvaya:
      'मदर्थे त्यक्तजीविताः, नानाशस्त्रप्रहरणाः, युद्धविशारदाः, बहवः अन्ये शूराः च — सर्वे (अत्र सन्ति)',
    hindi:
      'और भी बहुत-से शूर हैं जिन्होंने मेरे लिए अपने जीवन की चिन्ता छोड़ दी है, जो अनेक प्रकार के अस्त्रों से प्रहार करनेवाले हैं और सभी युद्ध में निपुण हैं।',
    english:
      'And many other heroes too — for my sake having given up their lives, wielding many kinds of weapons, all of them skilled in warfare.',
  },

  '1.10': {
    speaker: 'दुर्योधन उवाच',
    padaccheda: [
      'अपर्याप्तम्',
      'तत्',
      'अस्माकम्',
      'बलम्',
      'भीष्म-अभिरक्षितम्',
      'पर्याप्तम्',
      'तु',
      'इदम्',
      'एतेषाम्',
      'बलम्',
      'भीम-अभिरक्षितम्',
    ],
    sandhiNotes: [
      'तदस्माकम् = तत् + अस्माकम् (त् + अ → द; junction)',
      'भीष्माभिरक्षितम् = भीष्म + अभिरक्षितम् (अ + अ → ा)',
      'त्विदम् = तु + इदम् (no merge; printed adjacent)',
      'भीमाभिरक्षितम् = भीम + अभिरक्षितम् (अ + अ → ा)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'तत्, इदम् → प्रथमा एकवचन नपुंसक (demonstratives)',
      'अस्माकम्, एतेषाम् → षष्ठी बहुवचन = "of us / of these"',
      'बलम् → प्रथमा एकवचन नपुंसक — subject (twice, in parallel halves)',
      'अपर्याप्तम्, पर्याप्तम् → प्रथमा एकवचन नपुंसक — predicate adjectives',
      'भीष्माभिरक्षितम्, भीमाभिरक्षितम् → प्रथमा एकवचन नपुंसक — कर्मधारय compounds with PPP',
    ],
    keyFights: [
      'Two parallel nominal clauses: तत् बलम् अपर्याप्तम् | इदम् बलम् पर्याप्तम्. No finite verb — implicit अस्ति.',
      'Famous interpretive crux: अपर्याप्तम् can mean "insufficient" OR "unlimited/unmeasured". Read as "(our army is) immeasurable, (theirs) limited" — Duryodhana boasts; or as "(ours is) inadequate (against Bhīṣma\'s protection), (theirs) adequate" — Duryodhana worries. AUDIT: I have rendered the boastful reading; commentaries split.', // AUDIT
      'भीष्म-अभिरक्षितम् / भीम-अभिरक्षितम् — the deliberate phonetic echo (भीष्म ~ भीम) is a poetic stroke.',
    ],
    anvaya:
      'भीष्माभिरक्षितम् अस्माकम् तत् बलम् अपर्याप्तम् | भीमाभिरक्षितम् एतेषाम् इदम् बलम् तु पर्याप्तम्',
    hindi:
      'भीष्म के द्वारा अच्छी तरह रक्षित हमारी वह सेना (शत्रु के लिए) अपर्याप्त (=अमाप्य, असीम) है; जबकि भीम के द्वारा रक्षित इनकी यह सेना सीमित (पर्याप्त) है।',
    english:
      'That army of ours, well guarded by Bhīṣma, is unlimited (or: insufficient); but this army of theirs, guarded by Bhīma, is limited (or: sufficient).',
  },

  '1.12': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'तस्य',
      'सञ्जनयन्',
      'हर्षम्',
      'कुरु-वृद्धः',
      'पितामहः',
      'सिंह-नादम्',
      'विनद्य',
      'उच्चैः',
      'शङ्खम्',
      'दध्मौ',
      'प्रतापवान्',
    ],
    sandhiNotes: [
      'सञ्जनयन्हर्षम् = सञ्जनयन् + हर्षम् (न्-junction)',
      'विनद्योच्चैः = विनद्य + उच्चैः (अ + उ → ो)',
    ],
    finiteVerbs: [
      { form: 'दध्मौ', root: '√ध्मा', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he blew" (perfect tense)' },
    ],
    vibhaktiNotes: [
      'तस्य → षष्ठी एकवचन = "his" (referring to Duryodhana)',
      'कुरुवृद्धः, पितामहः, प्रतापवान् → प्रथमा एकवचन — subject (Bhīṣma) with three epithets',
      'हर्षम्, सिंहनादम्, शङ्खम् → द्वितीया एकवचन — objects of सञ्जनयन्, विनद्य, दध्मौ respectively',
      'सञ्जनयन् → present participle (शानच्), प्रथमा एकवचन — "(while) producing"',
      'विनद्य → absolutive = "having roared"',
      'उच्चैः → indeclinable = "loudly"',
    ],
    keyFights: [
      'दध्मौ is लिट् (perfect) of √ध्मा "to blow" — easy to mistake; the reduplicated द- is the perfect marker.',
      'Three -त्/-न्/absolutive forms describe what Bhīṣma was doing: सञ्जनयन् (producing joy) + विनद्य (after roaring) + दध्मौ (blew the conch). Only दध्मौ is finite.',
      'पितामहः here = "the grandfather" = Bhīṣma, the eldest of the Kuru elders.',
    ],
    anvaya:
      'कुरुवृद्धः प्रतापवान् पितामहः | तस्य हर्षम् सञ्जनयन् | उच्चैः सिंहनादम् विनद्य | शङ्खम् दध्मौ',
    hindi:
      'कुरुवंश के वृद्ध, प्रतापी पितामह भीष्म ने उस (दुर्योधन) के हर्ष को बढ़ाते हुए, उच्च स्वर से सिंहगर्जना करके, अपना शङ्ख बजाया।',
    english:
      'Producing joy in him (Duryodhana), the aged and majestic Kuru grandsire, having roared aloud like a lion, blew his conch.',
  },

  '1.14': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'ततः',
      'श्वेतैः',
      'हयैः',
      'युक्ते',
      'महति',
      'स्यन्दने',
      'स्थितौ',
      'माधवः',
      'पाण्डवः',
      'च',
      'एव',
      'दिव्यौ',
      'शङ्खौ',
      'प्रदध्मतुः',
    ],
    sandhiNotes: [
      'श्वेतैर्हयैः = श्वेतैः + हयैः (-ः + ह → -र्)',
      'हयैर्युक्ते = हयैः + युक्ते (-ः + य → -र्)',
      'पाण्डवश्चैव = पाण्डवः + च + एव (-ः + च → -श्च; अ + ए → ै)',
    ],
    finiteVerbs: [
      { form: 'प्रदध्मतुः', root: 'प्र + √ध्मा', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'द्विवचन', pada: 'P', gloss: '"the two of them blew" (perfect dual)' },
    ],
    vibhaktiNotes: [
      'ततः → indeclinable = "then, thereafter"',
      'श्वेतैः हयैः → तृतीया बहुवचन — "by white horses" (instrumental)',
      'युक्ते महति स्यन्दने → सप्तमी एकवचन = "in the great chariot yoked (with...)"',
      'स्थितौ → प्रथमा द्विवचन (PPP, dual) — agrees with माधवः and पाण्डवः together',
      'माधवः, पाण्डवः → प्रथमा एकवचन — twin subjects',
      'दिव्यौ शङ्खौ → द्वितीया द्विवचन — pair-of-divine-conches, object',
    ],
    keyFights: [
      'द्विवचन (dual) is everywhere here: स्थितौ, दिव्यौ, शङ्खौ, प्रदध्मतुः — Krishna and Arjuna are a perfectly matched pair.',
      'प्रदध्मतुः is लिट् द्विवचन of प्र + √ध्मा. The -तुः ending = प्रथम-पुरुष द्विवचन of perfect.',
      'युक्ते is PPP of √युज् in सप्तमी, agreeing with स्यन्दने: "in the chariot which was yoked".',
    ],
    anvaya:
      'ततः | श्वेतैः हयैः युक्ते महति स्यन्दने स्थितौ | माधवः पाण्डवः च एव | दिव्यौ शङ्खौ प्रदध्मतुः',
    hindi:
      'इसके बाद, श्वेत घोड़ों से जुते हुए विशाल रथ में बैठे हुए माधव (श्रीकृष्ण) और पाण्डव (अर्जुन) — दोनों ने अपने दिव्य शङ्खों को बजाया।',
    english:
      'Then, seated in their great chariot yoked with white horses, Mādhava (Krishna) and the son of Pāṇḍu (Arjuna) blew their divine conches.',
  },

  '1.15': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'पाञ्चजन्यम्',
      'हृषीकेशः',
      'देवदत्तम्',
      'धनञ्जयः',
      'पौण्ड्रम्',
      'दध्मौ',
      'महा-शङ्खम्',
      'भीम-कर्मा',
      'वृकोदरः',
    ],
    sandhiNotes: [
      'हृषीकेशो देवदत्तम् = हृषीकेशः + देवदत्तम् (-ः + द → -ो)',
    ],
    finiteVerbs: [
      { form: 'दध्मौ', root: '√ध्मा', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he blew" (perfect; serves all three subjects distributively)' },
    ],
    vibhaktiNotes: [
      'हृषीकेशः, धनञ्जयः, वृकोदरः → प्रथमा एकवचन — three subjects (Krishna, Arjuna, Bhīma)',
      'पाञ्चजन्यम्, देवदत्तम्, पौण्ड्रम् महाशङ्खम् → द्वितीया एकवचन — names of the three conches (objects)',
      'भीमकर्मा → प्रथमा एकवचन (न्-stem, drops -न्) = "of dreadful deeds" — epithet of Bhīma',
    ],
    keyFights: [
      'One finite verb (दध्मौ) governs three subjects via distributive parallelism — each warrior blew his named conch.',
      'भीमकर्मा is a बहुव्रीहि: "(he) whose deeds are terrible" — masc. sg. of -कर्मन् stem.',
      'वृकोदरः = "wolf-bellied" (बहुव्रीहि) — Bhīma\'s standard epithet.',
    ],
    anvaya:
      'हृषीकेशः पाञ्चजन्यम् | धनञ्जयः देवदत्तम् | भीमकर्मा वृकोदरः पौण्ड्रम् महाशङ्खम् | दध्मौ',
    hindi:
      'हृषीकेश (श्रीकृष्ण) ने पाञ्चजन्य, धनञ्जय (अर्जुन) ने देवदत्त, और भयङ्कर कर्म करनेवाले वृकोदर (भीम) ने पौण्ड्र नामक महाशङ्ख बजाया।',
    english:
      'Hṛṣīkeśa blew the Pāñcajanya, Dhanañjaya the Devadatta, and Vṛkodara of dreadful deeds blew the great conch named Pauṇḍra.',
  },

  '1.16': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'अनन्त-विजयम्',
      'राजा',
      'कुन्ती-पुत्रः',
      'युधिष्ठिरः',
      'नकुलः',
      'सहदेवः',
      'च',
      'सुघोष-मणिपुष्पकौ',
    ],
    sandhiNotes: [
      'कुन्तीपुत्रो युधिष्ठिरः = कुन्तीपुत्रः + युधिष्ठिरः (-ः + य → -ो)',
      'सहदेवश्च = सहदेवः + च (-ः + च → -श्च)',
      'सुघोषमणिपुष्पकौ = सुघोष + मणिपुष्पकौ (द्वन्द्व compound, द्विवचन ending = pair of conches)',
    ],
    finiteVerbs: null, // verb दध्मौ from 1.15 / 1.18 is implicit / serves across stanzas
    vibhaktiNotes: [
      'राजा कुन्तीपुत्रः युधिष्ठिरः → प्रथमा एकवचन — subject of implicit "blew"',
      'अनन्तविजयम् → द्वितीया एकवचन — name of Yudhiṣṭhira\'s conch (object)',
      'नकुलः, सहदेवः → प्रथमा एकवचन — pair of subjects',
      'सुघोषमणिपुष्पकौ → द्वितीया द्विवचन — द्वन्द्व compound naming the two conches',
    ],
    keyFights: [
      'No overt finite verb — the दध्मौ from 1.15 is gapped across the stanza break (verb-supply by parallelism).',
      'सुघोषमणिपुष्पकौ — द्वन्द्व compound in द्विवचन: "(the conches) Sughoṣa-and-Maṇipuṣpaka". The dual ending -औ marks "exactly two".',
    ],
    anvaya:
      'कुन्तीपुत्रः राजा युधिष्ठिरः अनन्तविजयम् | नकुलः सहदेवः च सुघोषमणिपुष्पकौ (दध्मतुः)',
    hindi:
      'कुन्तीपुत्र राजा युधिष्ठिर ने अनन्तविजय (नामक शङ्ख), तथा नकुल और सहदेव ने सुघोष और मणिपुष्पक (नामक शङ्ख) बजाए।',
    english:
      'King Yudhiṣṭhira, the son of Kuntī, (blew) the Anantavijaya; and Nakula and Sahadeva (blew) the Sughoṣa and Maṇipuṣpaka.',
  },

  '1.17': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'काश्यः',
      'च',
      'परम-इष्वासः',
      'शिखण्डी',
      'च',
      'महारथः',
      'धृष्टद्युम्नः',
      'विराटः',
      'च',
      'सात्यकिः',
      'च',
      'अपराजितः',
    ],
    sandhiNotes: [
      'काश्यश्च = काश्यः + च (-ः + च → -श्च)',
      'परमेष्वासः = परम + इष्वासः (अ + इ → े)',
      'धृष्टद्युम्नो विराटः = धृष्टद्युम्नः + विराटः (-ः + व → -ो)',
      'विराटश्च = विराटः + च (-ः + च → -श्च)',
      'सात्यकिश्चापराजितः = सात्यकिः + च + अपराजितः (-ः + च → -श्च; -अ + अ → -ा)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'काश्यः, शिखण्डी, धृष्टद्युम्नः, विराटः, सात्यकिः → प्रथमा एकवचन — list of warriors',
      'परमेष्वासः ("supreme archer"), महारथः, अपराजितः → प्रथमा एकवचन — adjectival epithets',
    ],
    keyFights: [
      'Pure warrior-name list, predicate again carrying over from the conch-blowing chain (verb gapped).',
      'इष्वासः = "arrow-thrower" = bow; परम + इष्वास = "supreme archer" — कर्मधारय/उपपद compound.',
      'शिखण्डी is -इन् stem masculine; प्रथमा एकवचन drops the -न्.',
    ],
    anvaya:
      'परमेष्वासः काश्यः च, महारथः शिखण्डी च, धृष्टद्युम्नः विराटः च, अपराजितः सात्यकिः च',
    hindi:
      'श्रेष्ठ धनुर्धर काशिराज, महारथी शिखण्डी, धृष्टद्युम्न, विराट और अजेय सात्यकि (—ये सब भी अपने-अपने शङ्ख बजाने लगे)।',
    english:
      'And the supreme archer the king of Kāśī, and the great chariot-warrior Śikhaṇḍin, Dhṛṣṭadyumna and Virāṭa, and the unconquered Sātyaki...',
  },

  '1.18': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'द्रुपदः',
      'द्रौपदेयाः',
      'च',
      'सर्वशः',
      'पृथिवी-पते',
      'सौभद्रः',
      'च',
      'महा-बाहुः',
      'शङ्खान्',
      'दध्मुः',
      'पृथक्-पृथक्',
    ],
    sandhiNotes: [
      'द्रुपदो द्रौपदेयाः = द्रुपदः + द्रौपदेयाः (-ः + द → -ो)',
      'द्रौपदेयाश्च = द्रौपदेयाः + च (-ः + च → -श्च)',
      'सौभद्रश्च = सौभद्रः + च (-ः + च → -श्च)',
      'शङ्खान्दध्मुः = शङ्खान् + दध्मुः (न्-junction)',
    ],
    finiteVerbs: [
      { form: 'दध्मुः', root: '√ध्मा', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they blew" (perfect plural — finally, the verb that all the previous warrior-list verses were waiting for)' },
    ],
    vibhaktiNotes: [
      'द्रुपदः, द्रौपदेयाः, सौभद्रः → प्रथमा (एक/बहु) — subjects',
      'महाबाहुः → प्रथमा एकवचन — epithet of सौभद्र (Abhimanyu)',
      'पृथिवीपते → सम्बोधन एकवचन — Sanjaya addressing Dhṛtarāṣṭra ("O lord of the earth")',
      'शङ्खान् → द्वितीया बहुवचन — direct object',
      'सर्वशः, पृथक्पृथक् → indeclinables = "from all sides", "each separately"',
    ],
    keyFights: [
      'Finally the finite verb दध्मुः appears — closing the long warrior-list arc that began at 1.15. Reading 1.15–1.18 as one extended sentence is the key.',
      'पृथिवीपते is सम्बोधन — Sanjaya addressing Dhṛtarāṣṭra mid-narrative.',
      'पृथक्पृथक् — reduplicated indeclinable for distributive emphasis ("each one separately").',
    ],
    anvaya:
      'पृथिवीपते | द्रुपदः, द्रौपदेयाः च, महाबाहुः सौभद्रः च, सर्वशः | पृथक्पृथक् शङ्खान् दध्मुः',
    hindi:
      'हे पृथ्वीपति (धृतराष्ट्र)! द्रुपद, द्रौपदी के पुत्र, और महाबाहु सौभद्र (अभिमन्यु) — सबने सब ओर से अपने-अपने शङ्ख बजाए।',
    english:
      'O lord of the earth (Dhṛtarāṣṭra), Drupada and the sons of Draupadī, and the mighty-armed son of Subhadrā — from every side, each blew his conch separately.',
  },

  '1.19': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'सः',
      'घोषः',
      'धार्तराष्ट्राणाम्',
      'हृदयानि',
      'व्यदारयत्',
      'नभः',
      'च',
      'पृथिवीम्',
      'च',
      'एव',
      'तुमुलः',
      'व्यनुनादयन्',
    ],
    sandhiNotes: [
      'स घोषो = सः + घोषः (-ः + घ → -अ; -ः + ध → -ो)',
      'घोषो धार्तराष्ट्राणाम् = घोषः + धार्तराष्ट्राणाम् (-ः + ध → -ो)',
      'नभश्च = नभः + च (-ः + च → -श्च)',
      'पृथिवीं चैव = पृथिवीम् + च + एव (-म् + च → -ं च; अ + ए → ै)',
    ],
    finiteVerbs: [
      { form: 'व्यदारयत्', root: 'वि + √दृ (causative)', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"it tore apart, it shattered" (causative imperfect)' },
    ],
    vibhaktiNotes: [
      'सः घोषः, तुमुलः → प्रथमा एकवचन — subject ("that tumultuous sound")',
      'धार्तराष्ट्राणाम् → षष्ठी बहुवचन = "of the sons of Dhṛtarāṣṭra"',
      'हृदयानि → द्वितीया बहुवचन (नपुंसक) — direct object of व्यदारयत्',
      'नभः, पृथिवीम् → द्वितीया एकवचन — objects of व्यनुनादयन्',
      'व्यनुनादयन् → present participle (causative), प्रथमा एकवचन — "(while) making to resound"',
    ],
    keyFights: [
      'व्यदारयत् is causative imperfect (लङ् of णिच्-stem दारयति "causes to split"). The अ-augment + -त् ending = imperfect signature.',
      'व्यनुनादयन् is the present participle (शानच्) of the causative — "causing-to-resound", modifying घोषः.',
      'Two finite-vs-participle pairs again: व्यदारयत् (finite) anchors the sentence; व्यनुनादयन् describes the same sound.',
    ],
    anvaya:
      'सः तुमुलः घोषः | नभः पृथिवीम् च एव व्यनुनादयन् | धार्तराष्ट्राणाम् हृदयानि व्यदारयत्',
    hindi:
      'वह घोर तुमुल नाद आकाश और पृथ्वी को गुँजाता हुआ धृतराष्ट्र-पुत्रों के हृदयों को विदीर्ण कर गया।',
    english:
      'That tumultuous sound, making heaven and earth resound, tore apart the hearts of the sons of Dhṛtarāṣṭra.',
  },

  '1.20': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'अथ',
      'व्यवस्थितान्',
      'दृष्ट्वा',
      'धार्तराष्ट्रान्',
      'कपि-ध्वजः',
      'प्रवृत्ते',
      'शस्त्र-सम्पाते',
      'धनुः',
      'उद्यम्य',
      'पाण्डवः',
    ],
    sandhiNotes: [
      'व्यवस्थितान्दृष्ट्वा = व्यवस्थितान् + दृष्ट्वा (न्-junction)',
      'धार्तराष्ट्रान्कपिध्वजः = धार्तराष्ट्रान् + कपिध्वजः (न्-junction)',
      'धनुरुद्यम्य = धनुः + उद्यम्य (-ः + उ → -र्)',
    ],
    finiteVerbs: null, // 1.20 is a dependent clause; the finite verb आह comes in 1.21
    vibhaktiNotes: [
      'अथ → indeclinable = "then, thereupon"',
      'व्यवस्थितान् धार्तराष्ट्रान् → द्वितीया बहुवचन — object of दृष्ट्वा ("having seen the Dhārtarāṣṭras arrayed")',
      'कपिध्वजः, पाण्डवः → प्रथमा एकवचन — subject (Arjuna; the verb is in 1.21)',
      'प्रवृत्ते शस्त्रसम्पाते → सप्तमी एकवचन (locative absolute) = "the discharge of weapons having begun"',
      'धनुः → द्वितीया एकवचन — object of उद्यम्य',
      'दृष्ट्वा, उद्यम्य → absolutives ("having seen", "having raised")',
    ],
    keyFights: [
      'No finite verb in 1.20! The whole verse is set-up — three absolutives (दृष्ट्वा, उद्यम्य) and a locative absolute (प्रवृत्ते शस्त्रसम्पाते). The finite verb आह comes in 1.21.',
      'प्रवृत्ते शस्त्रसम्पाते is a classic सति-सप्तमी (locative absolute) — "with the discharge of weapons having commenced".',
      'कपिध्वजः ("monkey-bannered") is Arjuna\'s epithet — Hanumān is his banner.',
    ],
    anvaya:
      '(see 1.21 for finite verb आह) | अथ | प्रवृत्ते शस्त्रसम्पाते | कपिध्वजः पाण्डवः | व्यवस्थितान् धार्तराष्ट्रान् दृष्ट्वा | धनुः उद्यम्य ...',
    hindi:
      'इसके बाद, शस्त्रों के युद्ध के आरम्भ होने पर, कपिध्वज (अर्जुन) — व्यूह में खड़े धृतराष्ट्र-पुत्रों को देखकर, अपना धनुष उठाकर — ... (आगे 1.21 में आगे का वाक्य)।',
    english:
      'Then, when the discharge of weapons had begun, the monkey-bannered son of Pāṇḍu, having seen the Dhārtarāṣṭras drawn up, having raised his bow, ... (the finite verb continues in 1.21).',
  },

  '1.21': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'हृषीकेशम्',
      'तदा',
      'वाक्यम्',
      'इदम्',
      'आह',
      'मही-पते',
      'सेनयोः',
      'उभयोः',
      'मध्ये',
      'रथम्',
      'स्थापय',
      'मे',
      'अच्युत',
    ],
    sandhiNotes: [
      'वाक्यमिदम् = वाक्यम् + इदम् (-म् + इ → -मि)',
      'इदमाह = इदम् + आह (-म् + आ → -मा)',
      'मेऽच्युत = मे + अच्युत (-ए + अ → -एऽ; अवग्रह marks lost अ)',
    ],
    finiteVerbs: [
      { form: 'आह', root: '√अह् (defective)', lakara: 'लट्/लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he said" (defective verb, used only in the perfect with present sense)' },
      { form: 'स्थापय', root: '√स्था (causative)', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"place! (causative imperative)"' },
    ],
    vibhaktiNotes: [
      'हृषीकेशम् → द्वितीया एकवचन — addressee of आह (Krishna)',
      'वाक्यम् इदम् → द्वितीया एकवचन (नपुंसक) — content of speech',
      'महीपते, अच्युत → सम्बोधन एकवचन — first addresses Dhṛtarāṣṭra (Sanjaya speaking), second addresses Krishna (Arjuna speaking)',
      'सेनयोः उभयोः मध्ये → षष्ठी द्विवचन + मध्ये (loc.) = "in the middle of the two armies"',
      'रथम् → द्वितीया एकवचन — object of स्थापय',
      'मे → षष्ठी एकवचन (enclitic) = "my"',
    ],
    keyFights: [
      'Two finite verbs, two speakers: आह is Sanjaya\'s narrating verb (Sanjaya tells Dhṛtarāṣṭra what Arjuna said); स्थापय is Arjuna\'s direct command to Krishna.',
      'महीपते (Sanjaya → Dhṛtarāṣṭra) and अच्युत (Arjuna → Krishna) — two vocatives, two different addressees inside one verse.',
      'आह is a defective verb — only perfect forms exist, but they carry present meaning ("he says/said").',
      'स्थापय is causative imperative ("cause to stand!" = "place!") — Arjuna is precise: he wants the chariot positioned.',
    ],
    anvaya:
      'महीपते | (अर्जुनः) तदा हृषीकेशम् इदम् वाक्यम् आह — "अच्युत, उभयोः सेनयोः मध्ये मे रथम् स्थापय"',
    hindi:
      'हे महीपति (धृतराष्ट्र)! तब (अर्जुन ने) हृषीकेश से यह वाक्य कहा — "हे अच्युत, दोनों सेनाओं के बीच में मेरा रथ खड़ा कीजिए।"',
    english:
      'O lord of the earth, then he spoke these words to Hṛṣīkeśa: "O Acyuta, place my chariot between the two armies."',
  },

  '1.23': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'योत्स्यमानान्',
      'अवेक्षे',
      'अहम्',
      'ये',
      'एते',
      'अत्र',
      'समागताः',
      'धार्तराष्ट्रस्य',
      'दुर्बुद्धेः',
      'युद्धे',
      'प्रिय-चिकीर्षवः',
    ],
    sandhiNotes: [
      'अवेक्षेऽहम् = अवेक्षे + अहम् (-ए + अ → -एऽ)',
      'य एते = ये + एते (-े + ए — प्रगृह्य, no merge)',
      'एतेऽत्र = एते + अत्र (-े + अ → -एऽ)',
      'दुर्बुद्धेर्युद्धे = दुर्बुद्धेः + युद्धे (-ः + य → -र्)',
    ],
    finiteVerbs: [
      { form: 'अवेक्षे', root: 'अव + √ईक्ष्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'A', gloss: '"I look upon, I observe"' },
    ],
    vibhaktiNotes: [
      'योत्स्यमानान् → द्वितीया बहुवचन (future participle of √युध्, मध्यपद-style) — object of अवेक्षे, "those-who-will-fight"',
      'अहम् → प्रथमा एकवचन — subject',
      'ये एते → प्रथमा बहुवचन (relative + demonstrative) — "those who, these"',
      'समागताः, प्रियचिकीर्षवः → प्रथमा बहुवचन — predicate adjectives',
      'धार्तराष्ट्रस्य दुर्बुद्धेः → षष्ठी एकवचन = "of the evil-minded Dhārtarāṣṭra (Duryodhana)"',
      'युद्धे → सप्तमी एकवचन = "in the battle"',
    ],
    keyFights: [
      'योत्स्यमानान् is the future-middle-participle of √युध् ("those-about-to-fight") — द्वितीया बहुवचन; the -मान- suffix is the शानच् of आत्मनेपद future. Spotting the future infix -ष्य- inside योत्स्य- is the key.',
      'प्रियचिकीर्षवः is a desiderative-stem adjective: "wishing-to-do-pleasing-things" — चिकीर्षु is desiderative of √कृ.',
      'दुर्बुद्धेः षष्ठी agrees with धार्तराष्ट्रस्य — "of the evil-minded son of Dhṛtarāṣṭra".',
    ],
    anvaya:
      'अहम् | अत्र समागताः ये एते दुर्बुद्धेः धार्तराष्ट्रस्य युद्धे प्रियचिकीर्षवः योत्स्यमानान् | अवेक्षे',
    hindi:
      'मैं उन योद्धाओं को देख रहा हूँ — जो यहाँ इकट्ठे हुए हैं, और जो उस दुर्बुद्धि धृतराष्ट्र-पुत्र (दुर्योधन) की युद्ध में प्रसन्नता करना चाहते हैं।',
    english:
      'I observe these warriors — those gathered here, ready to fight, eager to do a service in battle for the evil-minded son of Dhṛtarāṣṭra.',
  },

  '1.24': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'एवम्',
      'उक्तः',
      'हृषीकेशः',
      'गुडाकेशेन',
      'भारत',
      'सेनयोः',
      'उभयोः',
      'मध्ये',
      'स्थापयित्वा',
      'रथ-उत्तमम्',
    ],
    sandhiNotes: [
      'एवमुक्तः = एवम् + उक्तः (-म् + उ → -मु)',
      'उक्तो हृषीकेशः = उक्तः + हृषीकेशः (-ः + ह → -ो)',
      'रथोत्तमम् = रथ + उत्तमम् (अ + उ → ो)',
    ],
    finiteVerbs: null, // 1.24 sets up; the verb उवाच is in 1.25
    vibhaktiNotes: [
      'एवम् उक्तः → प्रथमा एकवचन (PPP of √वच्) — "thus addressed", agrees with हृषीकेशः',
      'हृषीकेशः → प्रथमा एकवचन — subject of (1.25\'s) उवाच',
      'गुडाकेशेन → तृतीया एकवचन = "by Guḍākeśa (= Arjuna, conqueror of sleep)"',
      'भारत → सम्बोधन एकवचन — Sanjaya to Dhṛtarāṣṭra',
      'सेनयोः उभयोः मध्ये → as in 1.21',
      'स्थापयित्वा → absolutive of causative √स्था = "having placed"',
      'रथोत्तमम् → द्वितीया एकवचन — object of स्थापयित्वा',
    ],
    keyFights: [
      'No finite verb in 1.24 — like 1.20, the verse is dependent set-up. उक्तः (PPP) and स्थापयित्वा (absolutive) wait for उवाच in 1.25.',
      'गुडाकेशेन is तृतीया (instrumental) = "by Arjuna" — the agent of the passive PPP उक्तः.',
      'रथोत्तमम् = रथ + उत्तम — कर्मधारय compound, "(the) best-of-chariots".',
    ],
    anvaya:
      '(see 1.25 for उवाच) | भारत | गुडाकेशेन एवम् उक्तः हृषीकेशः | उभयोः सेनयोः मध्ये रथोत्तमम् स्थापयित्वा ...',
    hindi:
      'हे भारत (धृतराष्ट्र)! गुडाकेश (अर्जुन) से इस प्रकार कहे गए हृषीकेश (श्रीकृष्ण), उत्तम रथ को दोनों सेनाओं के बीच खड़ा करके — ... (1.25 में आगे)।',
    english:
      'O Bhārata, thus addressed by Guḍākeśa (Arjuna), Hṛṣīkeśa, having placed the finest chariot in the middle of the two armies, ...',
  },

  '1.25': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'भीष्म-द्रोण-प्रमुखतः',
      'सर्वेषाम्',
      'च',
      'मही-क्षिताम्',
      'उवाच',
      'पार्थ',
      'पश्य',
      'एतान्',
      'समवेतान्',
      'कुरून्',
      'इति',
    ],
    sandhiNotes: [
      'पश्यैतान् = पश्य + एतान् (अ + ए → ै)',
      'एतान्समवेतान्कुरूनिति = एतान् + समवेतान् + कुरून् + इति (न्-junctions throughout)',
    ],
    finiteVerbs: [
      { form: 'उवाच', root: '√वच्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he said" (perfect; finally completing the sentence begun in 1.24)' },
      { form: 'पश्य', root: '√दृश् (suppletive root of imperative)', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"see! look!" (Krishna\'s direct command, inside quoted speech)' },
    ],
    vibhaktiNotes: [
      'भीष्मद्रोणप्रमुखतः → indeclinable / तसिल्-formation = "in front of Bhīṣma, Droṇa and the chiefs"',
      'सर्वेषाम् महीक्षिताम् → षष्ठी बहुवचन = "of all the rulers of the earth"',
      'पार्थ → सम्बोधन — Krishna addressing Arjuna inside the quote',
      'एतान् समवेतान् कुरून् → द्वितीया बहुवचन — object of पश्य ("these gathered Kurus")',
      'इति → quotation marker = "thus" (closes the speech)',
    ],
    keyFights: [
      'उवाच (लिट् of √वच्) is the long-awaited finite verb that closes the sentence begun in 1.24. इति marks the end of Krishna\'s quoted speech.',
      'पश्य is the imperative used outside √पश् paradigm — historically suppletive: in classical Sanskrit, the present-stem of √दृश् is पश्य- (from √पश्).',
      'समवेतान् is PPP द्वितीया बहुवचन — the same form-type as 1.1\'s समवेताः, here in object case.',
    ],
    anvaya:
      'भीष्मद्रोणप्रमुखतः सर्वेषाम् महीक्षिताम् च (सम्मुखे) | (हृषीकेशः) उवाच — "पार्थ, एतान् समवेतान् कुरून् पश्य" इति',
    hindi:
      'भीष्म, द्रोण आदि और सम्पूर्ण राजाओं के सामने, श्रीकृष्ण बोले — "हे पार्थ, इन एकत्र हुए कौरवों को देखो।"',
    english:
      'In front of Bhīṣma, Droṇa, and all the rulers of the earth, he said — "O Pārtha, behold these Kurus gathered here."',
  },

  '1.26': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'तत्र',
      'अपश्यत्',
      'स्थितान्',
      'पार्थः',
      'पितॄन्',
      'अथ',
      'पितामहान्',
      'आचार्यान्',
      'मातुलान्',
      'भ्रातॄन्',
      'पुत्रान्',
      'पौत्रान्',
      'सखीन्',
      'तथा',
    ],
    sandhiNotes: [
      'तत्रापश्यत् = तत्र + अपश्यत् (अ + अ → ा)',
      'अपश्यत्स्थितान् = अपश्यत् + स्थितान् (त्-junction)',
      'पितॄनथ = पितॄन् + अथ (न्-junction)',
      'आचार्यान्मातुलान्भ्रातॄन्पुत्रान्पौत्रान्सखींस्तथा — chain of न्-junctions',
      'सखींस्तथा = सखीन् + तथा (-न् + त → -ंस्त, anusvara + sibilant insertion)',
    ],
    finiteVerbs: [
      { form: 'अपश्यत्', root: '√दृश् (पश्य-stem)', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he saw" (imperfect)' },
    ],
    vibhaktiNotes: [
      'तत्र, अथ, तथा → indeclinables = "there", "then", "likewise"',
      'पार्थः → प्रथमा एकवचन — subject',
      'स्थितान् → द्वितीया बहुवचन (PPP) — "(those who were) standing"; agrees with the entire kin-list',
      'पितॄन्, पितामहान्, आचार्यान्, मातुलान्, भ्रातॄन्, पुत्रान्, पौत्रान्, सखीन् → द्वितीया बहुवचन — kinship terms, all objects of अपश्यत्',
    ],
    keyFights: [
      'One finite verb (अपश्यत्) governs a long द्वितीया बहुवचन chain — the kinship list. The verb sits early; the objects pile up after.',
      'पितॄन्, भ्रातॄन् are ऋ-कारान्त pluralized — note the long ॄ.',
      'सखीन् is the द्वितीया-बहुवचन of सखि-stem ("friend"); irregular declension.',
      'स्थितान् (PPP, द्वितीया बहुवचन) modifies the entire kin-list — "the (relatives) standing there".',
    ],
    anvaya:
      'अथ | पार्थः | तत्र स्थितान् पितॄन्, पितामहान्, आचार्यान्, मातुलान्, भ्रातॄन्, पुत्रान्, पौत्रान्, तथा सखीन् | अपश्यत्',
    hindi:
      'फिर पार्थ ने वहाँ खड़े पितरों, पितामहों, आचार्यों, मामाओं, भाइयों, पुत्रों, पौत्रों और मित्रों को देखा।',
    english:
      'There Pārtha saw, standing in their ranks, fathers, grandfathers, teachers, maternal uncles, brothers, sons, grandsons, and friends as well.',
  },

  '1.27': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'श्वशुरान्',
      'सुहृदः',
      'च',
      'एव',
      'सेनयोः',
      'उभयोः',
      'अपि',
      'तान्',
      'समीक्ष्य',
      'सः',
      'कौन्तेयः',
      'सर्वान्',
      'बन्धून्',
      'अवस्थितान्',
    ],
    sandhiNotes: [
      'श्वशुरान्सुहृदश्चैव = श्वशुरान् + सुहृदः + च + एव (-ः + च → -श्च; अ + ए → ै)',
      'सेनयोरुभयोरपि = सेनयोः + उभयोः + अपि (-ः + उ → -र्; -ः + अ → -र्)',
      'तान्समीक्ष्य = तान् + समीक्ष्य (न्-junction)',
      'स कौन्तेयः = सः + कौन्तेयः (-ः + क → -अ; visarga lopa)',
      'सर्वान्बन्धूनवस्थितान् = सर्वान् + बन्धून् + अवस्थितान् (न्-junctions)',
    ],
    finiteVerbs: null, // 1.27 sets up; the finite clause continues into 1.28
    vibhaktiNotes: [
      'श्वशुरान्, सुहृदः, सर्वान्, बन्धून्, अवस्थितान्, तान् → द्वितीया बहुवचन — continued kinship objects (carried over from 1.26 अपश्यत् and prefiguring 1.28 अब्रवीत्)',
      'सेनयोः उभयोः अपि → षष्ठी द्विवचन + अपि = "in both armies as well"',
      'सः कौन्तेयः → प्रथमा एकवचन — subject (Arjuna)',
      'समीक्ष्य → absolutive = "having looked carefully at"',
    ],
    keyFights: [
      'No new finite verb — 1.27 is a bridge. The kin-list from 1.26 spills into 1.27; 1.27 ends with absolutive समीक्ष्य; and the finite verb अब्रवीत् arrives in 1.28.',
      'सुहृदः is sg./pl. द्वितीया of सुहृद् ("friend") — the -ः is द्वितीया-बहुवचन ending of consonant-stems.',
      'अवस्थितान् (PPP द्वितीया बहुवचन) modifies the whole kinship-cluster: "the (kinsmen) standing".',
    ],
    anvaya:
      '(continued from 1.26 to 1.28) | सः कौन्तेयः | सेनयोः उभयोः अपि अवस्थितान् श्वशुरान् सुहृदः च एव सर्वान् तान् बन्धून् | समीक्ष्य ...',
    hindi:
      'श्वशुर और मित्र भी — दोनों सेनाओं में (खड़े) — उन सब बन्धु-बान्धवों को (अर्जुन) कौन्तेय ने भली-भाँति देखकर ...',
    english:
      '...and fathers-in-law and friends as well, in both armies. Looking carefully at all those kinsmen drawn up there, that son of Kuntī ...',
  },

  '1.28': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'कृपया',
      'परया',
      'आविष्टः',
      'विषीदन्',
      'इदम्',
      'अब्रवीत्',
      'दृष्ट्वा',
      'इमम्',
      'स्व-जनम्',
      'कृष्ण',
      'युयुत्सुम्',
      'समुपस्थितम्',
    ],
    sandhiNotes: [
      'परयाविष्टः = परया + आविष्टः (आ + आ → ा)',
      'विषीदन्निदम् = विषीदन् + इदम् (न् + इ → न्नि — gemination of न्)',
      'इदमब्रवीत् = इदम् + अब्रवीत् (-म् + अ → -मा... actually -म + अ → मा is wrong; it is just -म् + अ → -मअ printed as -मब with -म becoming -म-; here it shows simple junction)', // AUDIT: the printed form is इदमब्रवीत् — anusvara + अ is simply joined with -म- bridging, no special rule needed
      'दृष्ट्वेमम् = दृष्ट्वा + इमम् (आ + इ → े)',
    ],
    finiteVerbs: [
      { form: 'अब्रवीत्', root: '√ब्रू', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he said" (imperfect; closes the long sentence begun in 1.26-27)' },
    ],
    vibhaktiNotes: [
      'कृपया परया → तृतीया एकवचन = "by/with deep compassion"',
      'आविष्टः → प्रथमा एकवचन (PPP of आ + √विश्) — "filled, overcome"; agrees with the implicit subject (कौन्तेयः from 1.27)',
      'विषीदन् → present participle (शानच्) of √सद् = "(while) drooping, dejected"',
      'इदम् → द्वितीया एकवचन (नपुंसक) — content of अब्रवीत्',
      'दृष्ट्वा → absolutive = "having seen"',
      'इमम् स्वजनम् युयुत्सुम् समुपस्थितम् → द्वितीया एकवचन — object of दृष्ट्वा (4-fold agreement: this+own-people+eager-to-fight+arrived)',
      'कृष्ण → सम्बोधन',
    ],
    keyFights: [
      'अब्रवीत् finally anchors the sentence that started two verses ago — Sanjaya is reporting what Arjuna said when he saw his kinsmen.',
      'विषीदन् (शानच्) marks the verse\'s emotional pivot — the verse name is विषाद-योग; this is the participle of "विषीद".',
      'युयुत्सुम् is the desiderative-stem adjective of √युध् in द्वितीया एकवचन — agrees with स्वजनम्.',
      'समुपस्थितम् is PPP of सम् + उप + √स्था; agrees with स्वजनम् ("the kinfolk arrived for battle").',
    ],
    anvaya:
      'कृष्ण | इमम् युयुत्सुम् समुपस्थितम् स्वजनम् दृष्ट्वा | परया कृपया आविष्टः विषीदन् | (अर्जुनः) इदम् अब्रवीत्',
    hindi:
      'हे कृष्ण! युद्ध के लिए उपस्थित अपने इन स्वजनों को देखकर, परम करुणा से भरकर, विषाद से ग्रस्त (अर्जुन ने) यह कहा।',
    english:
      'O Kṛṣṇa, having seen these kinsmen of his own arrived ready for battle, overcome by deep compassion, dejected, (Arjuna) spoke these words.',
  },

  '1.29': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'सीदन्ति',
      'मम',
      'गात्राणि',
      'मुखम्',
      'च',
      'परिशुष्यति',
      'वेपथुः',
      'च',
      'शरीरे',
      'मे',
      'रोम-हर्षः',
      'च',
      'जायते',
    ],
    sandhiNotes: [
      'वेपथुश्च = वेपथुः + च (-ः + च → -श्च)',
      'रोमहर्षश्च = रोमहर्षः + च (-ः + च → -श्च)',
    ],
    finiteVerbs: [
      { form: 'सीदन्ति', root: '√सद्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"(they) sink, give way"' },
      { form: 'परिशुष्यति', root: 'परि + √शुष्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"(it) is drying up"' },
      { form: 'जायते', root: '√जन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"(it) is born, arises"' },
    ],
    vibhaktiNotes: [
      'मम, मे → षष्ठी एकवचन — "my" (regular, then enclitic)',
      'गात्राणि → प्रथमा बहुवचन (नपुंसक) — subject of सीदन्ति',
      'मुखम् → प्रथमा एकवचन (नपुंसक) — subject of परिशुष्यति',
      'वेपथुः, रोमहर्षः → प्रथमा एकवचन — subjects of (implicit "is") and जायते',
      'शरीरे → सप्तमी एकवचन = "in (my) body"',
    ],
    keyFights: [
      'Three finite verbs, three different subjects — all describing somatic distress. The verse is a body-symptom catalogue: limbs sink, mouth dries, trembling arises, hair stands on end.',
      'सीदन्ति is the source of विषीद/विषाद — same root √सद् ("to sink"). The chapter title विषादयोग is etymologically anchored here.',
      'जायते is आत्मनेपद present of √जन् — note the -ते ending (आत्मने) vs the -ति of √सद्/√शुष् (परस्मैपद).',
    ],
    anvaya:
      'मम गात्राणि सीदन्ति | मुखम् च परिशुष्यति | मे शरीरे वेपथुः च (भवति) | रोमहर्षः च जायते',
    hindi:
      'मेरे शरीर के अंग शिथिल हो रहे हैं, मुख सूख रहा है, मेरे शरीर में काँप उठ रहा है, और रोमाञ्च हो रहा है।',
    english:
      'My limbs give way, and my mouth is parching, my body is trembling, and my hair stands on end.',
  },

  '1.30': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'गाण्डीवम्',
      'स्रंसते',
      'हस्तात्',
      'त्वक्',
      'च',
      'एव',
      'परिदह्यते',
      'न',
      'च',
      'शक्नोमि',
      'अवस्थातुम्',
      'भ्रमति',
      'इव',
      'च',
      'मे',
      'मनः',
    ],
    sandhiNotes: [
      'हस्तात्त्वक्चैव = हस्तात् + त्वक् + च + एव (-त् adjacent; -क् + च → -क्च; अ + ए → ै)',
      'शक्नोम्यवस्थातुम् = शक्नोमि + अवस्थातुम् (इ + अ → य्)',
      'भ्रमतीव = भ्रमति + इव (इ + इ → ी)',
    ],
    finiteVerbs: [
      { form: 'स्रंसते', root: '√स्रंस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"(it) is slipping"' },
      { form: 'परिदह्यते', root: 'परि + √दह् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"(it) is being burned all over"' },
      { form: 'शक्नोमि', root: '√शक्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'P', gloss: '"I am able"; here negated' },
      { form: 'भ्रमति', root: '√भ्रम्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"(it) is reeling, wandering"' },
    ],
    vibhaktiNotes: [
      'गाण्डीवम् → प्रथमा एकवचन (नपुंसक) — subject of स्रंसते',
      'हस्तात् → पञ्चमी एकवचन = "from (my) hand"',
      'त्वक् → प्रथमा एकवचन (कर्मधारय stem त्वच्) — subject of परिदह्यते',
      'अवस्थातुम् → infinitive of अव + √स्था = "to stand"; complement of शक्नोमि',
      'मे मनः → प्रथमा एकवचन — subject of भ्रमति',
      'इव → indeclinable = "as if"',
    ],
    keyFights: [
      'Four finite verbs! स्रंसते (आत्मनेपद), परिदह्यते (passive -य- infix!), शक्नोमि (उत्तम-पुरुष — Arjuna himself), भ्रमति (परस्मैपद).',
      'परिदह्यते — the -य- infix is the passive marker; the form is "(my skin) is being burned (by no agent — circumlocution)". Even without explicit agent, the passive describes a sensation.',
      'अवस्थातुम् is infinitive (-तुम्) — non-finite — and shows the standard infinitive-with-शक्नोति construction.',
      'भ्रमति इव — adding इव turns the literal "(my mind) wanders" into "(my mind) is, as it were, reeling".',
    ],
    anvaya:
      'गाण्डीवम् हस्तात् स्रंसते | त्वक् च एव परिदह्यते | (अहम्) अवस्थातुम् न च शक्नोमि | मे मनः च भ्रमति इव',
    hindi:
      'गाण्डीव हाथ से सरक रहा है, और मेरी त्वचा (मानो) सब ओर जल रही है। मैं खड़ा भी नहीं रह सकता, और मेरा मन (मानो) भ्रमित हो रहा है।',
    english:
      'The Gāṇḍīva slips from my hand, and my skin is burning all over. I cannot even stand, and my mind seems to be reeling.',
  },

  '1.31': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'निमित्तानि',
      'च',
      'पश्यामि',
      'विपरीतानि',
      'केशव',
      'न',
      'च',
      'श्रेयः',
      'अनुपश्यामि',
      'हत्वा',
      'स्व-जनम्',
      'आहवे',
    ],
    sandhiNotes: [
      'श्रेयोऽनुपश्यामि = श्रेयः + अनुपश्यामि (-ः + अ → -ोऽ)',
      'स्वजनमाहवे = स्वजनम् + आहवे (-म् + आ → -मा)',
    ],
    finiteVerbs: [
      { form: 'पश्यामि', root: '√दृश् (पश्य-stem)', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'P', gloss: '"I see"' },
      { form: 'अनुपश्यामि', root: 'अनु + √दृश्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'P', gloss: '"I foresee, I perceive (over time)"; here negated' },
    ],
    vibhaktiNotes: [
      'निमित्तानि विपरीतानि → द्वितीया बहुवचन (नपुंसक) — object of पश्यामि ("contrary omens")',
      'केशव → सम्बोधन — addressing Krishna',
      'श्रेयः → द्वितीया एकवचन (नपुंसक) — object of अनुपश्यामि = "any good"',
      'हत्वा → absolutive of √हन् = "having killed"',
      'स्वजनम् → द्वितीया एकवचन — object of हत्वा',
      'आहवे → सप्तमी एकवचन = "in battle"',
    ],
    keyFights: [
      'Two finite verbs in parallel: पश्यामि / अनुपश्यामि — first sees omens, second fails to see good. The repeated पश्य- root gives the verse rhetorical balance.',
      'हत्वा is the absolutive of √हन् — "having killed". It is non-finite — the actual finite verb is अनुपश्यामि.',
      'श्रेयः is नपुंसक एकवचन of श्रेयस् ("better") — used substantively here as "any good outcome".',
    ],
    anvaya:
      'केशव | विपरीतानि निमित्तानि च पश्यामि | आहवे स्वजनम् हत्वा श्रेयः च न अनुपश्यामि',
    hindi:
      'हे केशव! मैं विपरीत (अशुभ) निमित्तों को देख रहा हूँ; और युद्ध में स्वजनों को मारकर मुझे कोई कल्याण भी नहीं दिखाई देता।',
    english:
      'O Keśava, I see contrary omens; nor do I foresee any good in killing my own kinsmen in battle.',
  },

  '1.33': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'येषाम्',
      'अर्थे',
      'काङ्क्षितम्',
      'नः',
      'राज्यम्',
      'भोगाः',
      'सुखानि',
      'च',
      'ते',
      'इमे',
      'अवस्थिताः',
      'युद्धे',
      'प्राणान्',
      'त्यक्त्वा',
      'धनानि',
      'च',
    ],
    sandhiNotes: [
      'येषामर्थे = येषाम् + अर्थे (-म् + अ → -मा... here printed as -म-अ; effectively -मर्थे)',
      'त इमेऽवस्थिताः = ते + इमे + अवस्थिताः (-े + इ → प्रगृह्य? actually ते+इमे — "te ime" treated as separate; इमे + अवस्थिताः: -े + अ → -एऽ)',
      'प्राणांस्त्यक्त्वा = प्राणान् + त्यक्त्वा (-न् + त → -ंस्त)',
    ],
    finiteVerbs: null, // काङ्क्षितम् is PPP-predicative; अवस्थिताः is PPP — no overt finite verb (nominal sentences)
    vibhaktiNotes: [
      'येषाम् → षष्ठी बहुवचन (relative pronoun) = "of/for whom"',
      'अर्थे → सप्तमी एकवचन / postposition = "for the sake of"',
      'काङ्क्षितम् → प्रथमा एकवचन (नपुंसक PPP) = "is/was desired"; serves as predicate',
      'नः → षष्ठी बहुवचन (enclitic) = "by/of us"',
      'राज्यम्, भोगाः, सुखानि → प्रथमा (subjects of काङ्क्षितम्) — neuter sg., masc pl., neut. pl. — actually all three are what is desired',
      'ते इमे → प्रथमा बहुवचन (demonstrative pair) — those-very-people',
      'अवस्थिताः → प्रथमा बहुवचन (PPP) = "are stationed"; predicate adjective',
      'युद्धे → सप्तमी एकवचन = "in battle"',
      'प्राणान्, धनानि → द्वितीया बहुवचन — objects of त्यक्त्वा',
      'त्यक्त्वा → absolutive of √त्यज् = "having abandoned"',
    ],
    keyFights: [
      'Two nominal clauses linked by relative-correlative येषाम् ... ते इमे. No overt finite verb in either — both predicates are PPPs (काङ्क्षितम्, अवस्थिताः).',
      'काङ्क्षितम् नपुंसक एकवचन serves as singular predicate even though राज्यम्, भोगाः, सुखानि are mixed in number/gender — Sanskrit allows the PPP to default to neuter singular when subjects are mixed (इष्टम्/काङ्क्षितम् pattern).',
      'त्यक्त्वा is absolutive — the kinsmen are standing here "having abandoned" their lives and wealth.',
    ],
    anvaya:
      'येषाम् अर्थे नः राज्यम् भोगाः सुखानि च काङ्क्षितम् | ते इमे प्राणान् धनानि च त्यक्त्वा युद्धे अवस्थिताः',
    hindi:
      'जिनके लिए हम राज्य, भोग और सुख चाहते थे — वे ही ये लोग प्राणों और धनों का त्याग करके युद्ध में खड़े हैं।',
    english:
      'Those for whose sake the kingdom, enjoyments, and pleasures were desired by us — these very ones stand here in battle, having renounced their lives and wealth.',
  },

  '1.34': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'आचार्याः',
      'पितरः',
      'पुत्राः',
      'तथा',
      'एव',
      'च',
      'पितामहाः',
      'मातुलाः',
      'श्वशुराः',
      'पौत्राः',
      'श्यालाः',
      'सम्बन्धिनः',
      'तथा',
    ],
    sandhiNotes: [
      'पुत्रास्तथैव = पुत्राः + तथा + एव (-ः + त → -स्त; आ + ए → ै)',
      'सम्बन्धिनस्तथा = सम्बन्धिनः + तथा (-ः + त → -स्त)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'All listed nouns → प्रथमा बहुवचन — kinship terms in apposition (continued from 1.33; serves as expansion of ते इमे)',
    ],
    keyFights: [
      'Pure apposition list — no finite verb. Continues 1.33: ते इमे = these-very-ones = आचार्याः पितरः पुत्राः ... श्यालाः सम्बन्धिनः.',
      'Verses 1.33 and 1.34 read together: "Those for whom we wanted kingdom — they are standing here ready to die — namely teachers, fathers, sons, grandfathers, ... in-laws and relations."',
      'श्यालाः = "brothers-in-law (wife\'s brother)"; सम्बन्धिनः = "those-related-by-marriage" — nuanced kinship vocabulary.',
    ],
    anvaya:
      'आचार्याः, पितरः, पुत्राः, तथा एव च पितामहाः, मातुलाः, श्वशुराः, पौत्राः, श्यालाः, सम्बन्धिनः तथा (— अत्र अवस्थिताः सन्ति)',
    hindi:
      'आचार्य, पिता, पुत्र, और इसी तरह पितामह, मामा, श्वशुर, पौत्र, श्याल और सम्बन्धी (— ये सब यहाँ खड़े हैं)।',
    english:
      'Teachers, fathers, sons, and grandfathers as well, maternal uncles, fathers-in-law, grandsons, brothers-in-law, and other kinsmen too — (all standing here).',
  },

  '1.35': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'एतान्',
      'न',
      'हन्तुम्',
      'इच्छामि',
      'घ्नतः',
      'अपि',
      'मधुसूदन',
      'अपि',
      'त्रैलोक्य-राज्यस्य',
      'हेतोः',
      'किम्',
      'नु',
      'मही-कृते',
    ],
    sandhiNotes: [
      'हन्तुमिच्छामि = हन्तुम् + इच्छामि (-म् + इ → -मि)',
      'घ्नतोऽपि = घ्नतः + अपि (-ः + अ → -ोऽ)',
    ],
    finiteVerbs: [
      { form: 'इच्छामि', root: '√इष्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'P', gloss: '"I wish, I want"; here negated' },
    ],
    vibhaktiNotes: [
      'एतान् → द्वितीया बहुवचन — object of हन्तुम्',
      'हन्तुम् → infinitive of √हन् = "to kill"; complement of इच्छामि',
      'घ्नतः → present participle (शतृ) of √हन्, षष्ठी/द्वितीया एकवचन — "(even) of/while-(they-are)-killing"; here likely षष्ठी एकवचन of agent or a special construction', // AUDIT: घ्नतोऽपि could be षष्ठी एकवचन ("even of him who is killing") or accusative plural of शतृ — interpretation contested
      'मधुसूदन → सम्बोधन',
      'त्रैलोक्यराज्यस्य → षष्ठी एकवचन = "of three-world-kingdom"',
      'हेतोः → पञ्चमी / षष्ठी एकवचन = "for the sake of"',
      'महीकृते → चतुर्थी / dative-like = "for (the sake of) the earth"',
      'किम् नु → indeclinable interrogative pair = "what then?"',
    ],
    keyFights: [
      'One finite verb (इच्छामि) anchors the verse; हन्तुम् is its infinitive complement.',
      'घ्नतोऽपि — a tricky form. Reading: "even of those (who are) killing-(me)" — i.e., even if they were trying to kill me, I would not wish to kill them. AUDIT: the participle\'s case (षष्ठी एकवचन or द्वितीया बहुवचन) is ambiguous.',
      'त्रैलोक्यराज्यस्य हेतोः: "for the sake of the kingdom of the three worlds" — rhetorical hyperbole. किम् नु महीकृते: "—what then for (mere) earthly rule?"',
    ],
    anvaya:
      'मधुसूदन | घ्नतः अपि एतान् हन्तुम् न इच्छामि | त्रैलोक्यराज्यस्य हेतोः अपि (न), किम् नु महीकृते',
    hindi:
      'हे मधुसूदन! इन्हें मारनेवालों को भी (— बल्कि वे यदि मुझे मार रहे हों, तब भी —) मैं नहीं मारना चाहता; तीनों लोकों के राज्य के लिए भी नहीं — फिर इस पृथ्वी (के राज्य) के लिए तो (बात ही) क्या!',
    english:
      'O Madhusūdana, I do not wish to kill these — even if (they were) killing me — not even for the sovereignty of the three worlds; what then for mere earthly rule?',
  },

  '1.36': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'निहत्य',
      'धार्तराष्ट्रान्',
      'नः',
      'का',
      'प्रीतिः',
      'स्यात्',
      'जनार्दन',
      'पापम्',
      'एव',
      'आश्रयेत्',
      'अस्मान्',
      'हत्वा',
      'एतान्',
      'आततायिनः',
    ],
    sandhiNotes: [
      'धार्तराष्ट्रान्नः = धार्तराष्ट्रान् + नः (-न्-junction)',
      'स्याज्जनार्दन = स्यात् + जनार्दन (-त् + ज → -ज्ज)',
      'पापमेवाश्रयेदस्मान् = पापम् + एव + आश्रयेत् + अस्मान् (-म् + ए → -मे; आ + अ → -आ; -त् + अ → -द)',
      'हत्वैतान् = हत्वा + एतान् (आ + ए → ै)',
    ],
    finiteVerbs: [
      { form: 'स्यात्', root: '√अस्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"would be"' },
      { form: 'आश्रयेत्', root: 'आ + √श्रि', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"would attach itself, would cling to"' },
    ],
    vibhaktiNotes: [
      'निहत्य → absolutive of नि + √हन् = "having killed"',
      'धार्तराष्ट्रान्, एतान् आततायिनः → द्वितीया बहुवचन — objects of निहत्य / हत्वा',
      'नः, अस्मान् → "us" (षष्ठी/द्वितीया बहुवचन respectively, of अस्मद्)',
      'का प्रीतिः → प्रथमा एकवचन स्त्री (interrogative) = "what joy?"',
      'पापम् → प्रथमा एकवचन (नपुंसक) — subject of आश्रयेत्',
      'जनार्दन → सम्बोधन',
      'हत्वा → absolutive of √हन् = "having killed"',
    ],
    keyFights: [
      'Two विधिलिङ् verbs (स्यात्, आश्रयेत्) — Arjuna is reasoning conditionally: "(if we kill them) what joy would there be? — (rather) sin would cling to us."',
      'Two absolutives (निहत्य, हत्वा) — both from √हन्, framing the verse with the act of killing.',
      'आततायिनः = "aggressors / those-with-bow-strung" (-इन् stem); द्वितीया बहुवचन drops -न्. Classical legal category — kṣatriyas could traditionally kill आततायिन्s without sin, which is the dharmic counter-argument that Arjuna is rejecting.',
    ],
    anvaya:
      'जनार्दन | धार्तराष्ट्रान् निहत्य नः का प्रीतिः स्यात् | एतान् आततायिनः हत्वा अस्मान् पापम् एव आश्रयेत्',
    hindi:
      'हे जनार्दन! धृतराष्ट्र-पुत्रों को मारकर हमें कौन-सी प्रसन्नता मिलेगी? इन आततायी बंधु-बान्धवों को मारकर तो पाप ही हमें घेर लेगा।',
    english:
      'O Janārdana, what joy would there be for us in killing the sons of Dhṛtarāṣṭra? Sin alone would attach itself to us if we slew these aggressors.',
  },

  '1.37': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'तस्मात्',
      'न',
      'अर्हाः',
      'वयम्',
      'हन्तुम्',
      'धार्तराष्ट्रान्',
      'स्व-बान्धवान्',
      'स्व-जनम्',
      'हि',
      'कथम्',
      'हत्वा',
      'सुखिनः',
      'स्याम',
      'माधव',
    ],
    sandhiNotes: [
      'तस्मान्नार्हा = तस्मात् + न + अर्हाः (-त् + न → -न्न; अ + अ → ा; -ः + व → -अ)',
      'अर्हा वयम् = अर्हाः + वयम् (-ः + व → -अ; visarga lopa)',
      'धार्तराष्ट्रान्स्वबान्धवान् = धार्तराष्ट्रान् + स्वबान्धवान् (न्-junction)',
    ],
    finiteVerbs: [
      { form: 'स्याम', root: '√अस्', lakara: 'विधिलिङ्', purusha: 'उत्तम', vachana: 'बहुवचन', pada: 'P', gloss: '"would we be"' },
    ],
    vibhaktiNotes: [
      'तस्मात् → indeclinable / पञ्चमी = "therefore"',
      'न अर्हाः → प्रथमा बहुवचन — predicate adjective ("we are not entitled")',
      'वयम् → प्रथमा बहुवचन — subject',
      'हन्तुम् → infinitive of √हन्; complement of अर्हाः',
      'धार्तराष्ट्रान् स्वबान्धवान् → द्वितीया बहुवचन — object of हन्तुम् (with adjective: "our-own-relatives Dhārtarāṣṭras")',
      'स्वजनम् → द्वितीया एकवचन — object of हत्वा',
      'हि → indeclinable = "indeed, for"',
      'कथम् → indeclinable interrogative = "how?"',
      'हत्वा → absolutive of √हन्',
      'सुखिनः → प्रथमा बहुवचन (-इन् stem) = "happy"',
      'माधव → सम्बोधन',
    ],
    keyFights: [
      'अर्हाः + infinitive is the standard "deserve to / are entitled to" construction — adjective-based, not a finite verb.',
      'स्याम is विधिलिङ् उत्तम-पुरुष बहुवचन of √अस् — "would we be?". The interrogative कथम् makes it a rhetorical doubt.',
      'स्वबान्धवान् in apposition with धार्तराष्ट्रान् — "Dhārtarāṣṭras-our-own-kinsmen" — same case (द्वितीया बहुवचन), same gender, same number = सामानाधिकरण्य.',
    ],
    anvaya:
      'माधव | तस्मात् वयम् धार्तराष्ट्रान् स्वबान्धवान् हन्तुम् न अर्हाः | स्वजनम् हि हत्वा कथम् सुखिनः स्याम',
    hindi:
      'इसलिए हे माधव! हम धृतराष्ट्र-पुत्रों, अपने ही बन्धु-बान्धवों को मारने के योग्य नहीं हैं। स्वजनों को मारकर हम सुखी कैसे हो सकते हैं?',
    english:
      'Therefore we are not entitled to slay the sons of Dhṛtarāṣṭra, our own kinsmen. For how, O Mādhava, having killed our own people, could we be happy?',
  },

  '1.38': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'यदि',
      'अपि',
      'एते',
      'न',
      'पश्यन्ति',
      'लोभ-उपहत-चेतसः',
      'कुल-क्षय-कृतम्',
      'दोषम्',
      'मित्र-द्रोहे',
      'च',
      'पातकम्',
    ],
    sandhiNotes: [
      'यद्यप्येते = यदि + अपि + एते (इ + अ → य्; इ + ए → य्ये printed as प्ये)',
      'लोभोपहतचेतसः = लोभ + उपहत + चेतसः (अ + उ → ो; compound)',
    ],
    finiteVerbs: [
      { form: 'पश्यन्ति', root: '√दृश् (पश्य-stem)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"(they) see"; here negated' },
    ],
    vibhaktiNotes: [
      'यदि अपि → indeclinable pair = "even if"',
      'एते → प्रथमा बहुवचन — subject',
      'लोभोपहतचेतसः → प्रथमा बहुवचन (बहुव्रीहि: "those-whose-minds-are-struck-by-greed") — predicate adjective',
      'कुलक्षयकृतम् दोषम् → द्वितीया एकवचन — object of पश्यन्ति ("the fault produced by the destruction of the family")',
      'मित्रद्रोहे → सप्तमी एकवचन = "in betrayal-of-friend"',
      'पातकम् → द्वितीया एकवचन — second object of पश्यन्ति',
    ],
    keyFights: [
      'The verse is the protasis ("if") of a conditional whose apodosis comes in 1.39 ("how should we not know..."). 1.38 + 1.39 are one connected sentence.',
      'लोभोपहतचेतसः is a बहुव्रीहि compound: लोभ-उपहत-चेतस् = "having minds struck by greed" → प्रथमा बहुवचन of -अस् stem.',
      'कुलक्षयकृतम् = "produced by the destruction of the family" — कृदन्त (PPP-based) compound: कुलक्षय (तत्पुरुष: family-destruction) + कृत (PPP, "made"). The dvandva of compound types here is itself a teaching opportunity.',
    ],
    anvaya:
      'यदि अपि लोभोपहतचेतसः एते कुलक्षयकृतम् दोषम् मित्रद्रोहे च पातकम् न पश्यन्ति ...',
    hindi:
      'यदि (ये कौरव) लोभ से बुद्धि के मारे हुए हैं, और कुल के नाश से उत्पन्न दोष को तथा मित्रों के साथ विश्वासघात के पाप को नहीं देख पाते — ...',
    english:
      'Even if these, with their minds struck by greed, do not see the fault arising from the destruction of the family, nor the sin in the betrayal of friends — ...',
  },

  '1.39': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'कथम्',
      'न',
      'ज्ञेयम्',
      'अस्माभिः',
      'पापात्',
      'अस्मात्',
      'निवर्तितुम्',
      'कुल-क्षय-कृतम्',
      'दोषम्',
      'प्रपश्यद्भिः',
      'जनार्दन',
    ],
    sandhiNotes: [
      'ज्ञेयमस्माभिः = ज्ञेयम् + अस्माभिः (-म् + अ → -मा... -म-अ printed as -म्अ → मास्म)', // AUDIT: simple junction
      'पापादस्मान्निवर्तितुम् = पापात् + अस्मात् + निवर्तितुम् (-त् + अ → -द; -त् + न → -न्न)',
      'प्रपश्यद्भिर्जनार्दन = प्रपश्यद्भिः + जनार्दन (-ः + ज → -र्)',
    ],
    finiteVerbs: null, // ज्ञेयम् is gerundive (-य) — not finite; impersonal-passive construction with अस्माभिः (instrumental of agent)
    vibhaktiNotes: [
      'कथम् → indeclinable interrogative = "how?"',
      'ज्ञेयम् → गेरुन्डिव/कृत्य (-य suffix) of √ज्ञा = "is-to-be-known / should be known"; प्रथमा एकवचन (नपुंसक), used impersonally',
      'अस्माभिः → तृतीया बहुवचन — agent of the gerundive (impersonal construction: "by us is-to-be-known")',
      'पापात् अस्मात् → पञ्चमी एकवचन = "from this sin"',
      'निवर्तितुम् → infinitive of नि + √वृत् = "to turn back"',
      'कुलक्षयकृतम् दोषम् → द्वितीया एकवचन — object of प्रपश्यद्भिः',
      'प्रपश्यद्भिः → तृतीया बहुवचन (present participle of प्र + √दृश्) = "by (us) clearly seeing"; agrees with अस्माभिः',
      'जनार्दन → सम्बोधन',
    ],
    keyFights: [
      'No finite verb! ज्ञेयम् is the gerundive (कृत्य -य suffix) — "should be known". The classic impersonal construction: agent in तृतीया (अस्माभिः), gerundive in नपुंसक एकवचन.',
      'प्रपश्यद्भिः is the present participle (शतृ) in तृतीया बहुवचन — agreeing with अस्माभिः: "by us, clearly seeing".',
      'निवर्तितुम् is infinitive — complement of ज्ञेयम् = "to turn back is-to-be-known" = "(we) should know how to turn back".',
      'The 1.38–1.39 pair: "Even if they (in their greed) don\'t see the sin — how should we (who clearly see it) not know to turn back from this sin?"',
    ],
    anvaya:
      'जनार्दन | कुलक्षयकृतम् दोषम् प्रपश्यद्भिः अस्माभिः | अस्मात् पापात् निवर्तितुम् कथम् न ज्ञेयम्',
    hindi:
      'हे जनार्दन! जो हम कुल के नाश से होनेवाले दोष को स्पष्ट देख रहे हैं — हमें इस पाप से निवृत्त होने का (मार्ग) क्यों न ज्ञात हो?',
    english:
      'O Janārdana, why should it not be understood by us — who clearly see the fault arising from the destruction of the family — that (we) ought to turn back from this sin?',
  },

  '1.40': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'कुल-क्षये',
      'प्रणश्यन्ति',
      'कुल-धर्माः',
      'सनातनाः',
      'धर्मे',
      'नष्टे',
      'कुलम्',
      'कृत्स्नम्',
      'अधर्मः',
      'अभिभवति',
      'उत',
    ],
    sandhiNotes: [
      'कृत्स्नमधर्मोऽभिभवति = कृत्स्नम् + अधर्मः + अभिभवति (-म् + अ → -म; -ः + अ → -ोऽ)',
      'अभिभवत्युत = अभिभवति + उत (इ + उ → -त्यु — y-glide)',
    ],
    finiteVerbs: [
      { form: 'प्रणश्यन्ति', root: 'प्र + √नश्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"(they) perish"' },
      { form: 'अभिभवति', root: 'अभि + √भू', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"(it) overpowers, overcomes"' },
    ],
    vibhaktiNotes: [
      'कुलक्षये → सप्तमी एकवचन = "when the family is destroyed"',
      'कुलधर्माः सनातनाः → प्रथमा बहुवचन — subject of प्रणश्यन्ति',
      'धर्मे नष्टे → सप्तमी एकवचन (locative absolute) = "when dharma is destroyed"',
      'कुलम् कृत्स्नम् → द्वितीया एकवचन — object of अभिभवति',
      'अधर्मः → प्रथमा एकवचन — subject of अभिभवति',
      'उत → indeclinable emphatic particle = "indeed, surely"',
    ],
    keyFights: [
      'धर्मे नष्टे — classic सति-सप्तमी (locative absolute): "with dharma having been destroyed". The PPP नष्टे agrees with धर्मे, both सप्तमी.',
      'Two parallel clauses: कुलक्षये (locative phrase) | धर्मे नष्टे (locative absolute) — Sanskrit\'s preferred way to say "when X happens".',
      'कृत्स्नम् ("entire") is adjective of कुलम् in द्वितीया एकवचन — सामानाधिकरण्य.',
    ],
    anvaya:
      'कुलक्षये सनातनाः कुलधर्माः प्रणश्यन्ति | धर्मे नष्टे कृत्स्नम् कुलम् अधर्मः उत अभिभवति',
    hindi:
      'कुल का नाश हो जाने पर सनातन कुलधर्म नष्ट हो जाते हैं; और धर्म के नष्ट हो जाने पर सम्पूर्ण कुल को अधर्म ही ग्रस लेता है।',
    english:
      'When the family is destroyed, the eternal family-dharmas perish. And when dharma is destroyed, adharma indeed overwhelms the entire family.',
  },

  '1.41': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'अधर्म-अभिभवात्',
      'कृष्ण',
      'प्रदुष्यन्ति',
      'कुल-स्त्रियः',
      'स्त्रीषु',
      'दुष्टासु',
      'वार्ष्णेय',
      'जायते',
      'वर्ण-सङ्करः',
    ],
    sandhiNotes: [
      'अधर्माभिभवात् = अधर्म + अभिभवात् (अ + अ → ा)',
    ],
    finiteVerbs: [
      { form: 'प्रदुष्यन्ति', root: 'प्र + √दुष्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"(they) become corrupted"' },
      { form: 'जायते', root: '√जन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"(it) is born, arises"' },
    ],
    vibhaktiNotes: [
      'अधर्माभिभवात् → पञ्चमी एकवचन = "from the prevalence of adharma"',
      'कृष्ण, वार्ष्णेय → सम्बोधन — two epithets of Krishna',
      'कुलस्त्रियः → प्रथमा बहुवचन (-स्त्री- stem) — subject of प्रदुष्यन्ति',
      'स्त्रीषु दुष्टासु → सप्तमी बहुवचन (locative absolute) = "when the women are corrupted"',
      'वर्णसङ्करः → प्रथमा एकवचन — subject of जायते',
    ],
    keyFights: [
      'Another locative absolute: स्त्रीषु दुष्टासु — "the women being corrupted". दुष्टासु is the PPP स्त्री-form in सप्तमी बहुवचन.',
      'जायते (आत्मनेपद of √जन्) — same form as in 1.29; here used for the "birth" of social mixing.',
      'वर्णसङ्कर ("varṇa-mixing") is the social-anxiety crux of Arjuna\'s argument — the entire next chain of verses (1.41–1.44) hangs on this fear.',
    ],
    anvaya:
      'कृष्ण | अधर्माभिभवात् कुलस्त्रियः प्रदुष्यन्ति | वार्ष्णेय | स्त्रीषु दुष्टासु वर्णसङ्करः जायते',
    hindi:
      'हे कृष्ण! अधर्म के प्रबल होने से कुल की स्त्रियाँ दूषित हो जाती हैं; और हे वार्ष्णेय, स्त्रियों के दूषित हो जाने पर वर्णसङ्कर उत्पन्न होता है।',
    english:
      'O Kṛṣṇa, from the prevalence of adharma, the women of the family become corrupted; and when the women are corrupted, O Vārṣṇeya, varṇa-confusion arises.',
  },

  '1.42': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'सङ्करः',
      'नरकाय',
      'एव',
      'कुल-घ्नानाम्',
      'कुलस्य',
      'च',
      'पतन्ति',
      'पितरः',
      'हि',
      'एषाम्',
      'लुप्त-पिण्ड-उदक-क्रियाः',
    ],
    sandhiNotes: [
      'नरकायैव = नरकाय + एव (आ + ए → ै)',
      'पितरो हि एषाम् = पितरः + हि + एषाम् (-ः + ह → -ो)',
      'लुप्तपिण्डोदकक्रियाः = लुप्त + पिण्ड + उदक + क्रियाः (अ + उ → ो)',
    ],
    finiteVerbs: [
      { form: 'पतन्ति', root: '√पत्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"(they) fall"' },
    ],
    vibhaktiNotes: [
      'सङ्करः → प्रथमा एकवचन — subject of (implicit "is") नरकाय एव',
      'नरकाय → चतुर्थी एकवचन = "for hell" (purpose/destination)',
      'कुलघ्नानाम् कुलस्य च → षष्ठी (बहुवचन / एकवचन) = "of the destroyers-of-the-family and of the family"',
      'पितरः → प्रथमा बहुवचन — subject of पतन्ति',
      'हि → indeclinable = "for, indeed"',
      'एषाम् → षष्ठी बहुवचन = "of these (destroyers)"',
      'लुप्तपिण्डोदकक्रियाः → प्रथमा बहुवचन (बहुव्रीहि: "those-whose-piṇḍa-and-water-rites-have-ceased") — agrees with पितरः',
    ],
    keyFights: [
      'सङ्करः नरकाय एव — nominal sentence ("varṇa-confusion is just (the road) to hell"). The चतुर्थी नरकाय expresses purpose/result.',
      'लुप्तपिण्डोदकक्रियाः — heavy बहुव्रीहि: लुप्त (PPP, "ceased") + पिण्ड (rice-balls) + उदक (water) + क्रियाः ("rites"). Modifies पितरः.',
      'पितरो हि एषाम् पतन्ति — "for the ancestors of these (sinners) fall (from heaven)". The षष्ठी एषाम् is genitive-of-relation.',
    ],
    anvaya:
      'सङ्करः कुलघ्नानाम् कुलस्य च नरकाय एव | एषाम् पितरः हि लुप्तपिण्डोदकक्रियाः (सन्तः) पतन्ति',
    hindi:
      'यह वर्णसङ्कर कुलघातियों और कुल को नरक में ही ले जाता है; क्योंकि उनके पितर पिण्ड और जल देने की क्रियाओं से वंचित होकर अधोगति पाते हैं।',
    english:
      'This confusion leads only to hell — for both the family-destroyers and the family itself. Their ancestors, indeed, deprived of the offerings of rice-balls and water, fall (from their heavenly state).',
  },

  '1.43': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'दोषैः',
      'एतैः',
      'कुल-घ्नानाम्',
      'वर्ण-सङ्कर-कारकैः',
      'उत्साद्यन्ते',
      'जाति-धर्माः',
      'कुल-धर्माः',
      'च',
      'शाश्वताः',
    ],
    sandhiNotes: [
      'दोषैरेतैः = दोषैः + एतैः (-ः + ए → -र्)',
      'कुलधर्माश्च = कुलधर्माः + च (-ः + च → -श्च)',
    ],
    finiteVerbs: [
      { form: 'उत्साद्यन्ते', root: 'उत् + √सद् (causative passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'A', gloss: '"(they) are uprooted, are destroyed"' },
    ],
    vibhaktiNotes: [
      'दोषैः एतैः वर्णसङ्करकारकैः → तृतीया बहुवचन = "by these faults — (which are) varṇa-mixing-producers"',
      'कुलघ्नानाम् → षष्ठी बहुवचन = "of the family-destroyers"',
      'जातिधर्माः कुलधर्माः च शाश्वताः → प्रथमा बहुवचन — subjects of उत्साद्यन्ते (passive subject = original logical object)',
    ],
    keyFights: [
      'उत्साद्यन्ते is causative passive (-य- infix doubled by causative णिच्): "are caused-to-be-uprooted". A तृतीया-of-agent (दोषैः) construction is standard with passive verbs.',
      'वर्णसङ्करकारकैः agrees with दोषैः — both तृतीया बहुवचन: "by these varṇa-confusion-producing faults".',
      'जातिधर्म vs कुलधर्म: caste-dharma vs family-dharma — Arjuna names two distinct social orders being uprooted.',
    ],
    anvaya:
      'कुलघ्नानाम् वर्णसङ्करकारकैः एतैः दोषैः | शाश्वताः जातिधर्माः कुलधर्माः च उत्साद्यन्ते',
    hindi:
      'कुलघातियों के इन वर्णसङ्कर उत्पन्न करनेवाले दोषों के कारण सनातन जातिधर्म और कुलधर्म नष्ट हो जाते हैं।',
    english:
      'By these faults of the family-destroyers — faults that produce varṇa-confusion — the eternal caste-dharmas and family-dharmas are uprooted.',
  },

  '1.44': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'उत्सन्न-कुल-धर्माणाम्',
      'मनुष्याणाम्',
      'जनार्दन',
      'नरके',
      'अनियतम्',
      'वासः',
      'भवति',
      'इति',
      'अनुशुश्रुम',
    ],
    sandhiNotes: [
      'नरकेऽनियतम् = नरके + अनियतम् (-े + अ → -एऽ)',
      'भवतीत्यनुशुश्रुम = भवति + इति + अनुशुश्रुम (इ + इ → ी; इ + अ → य्)',
    ],
    finiteVerbs: [
      { form: 'भवति', root: '√भू', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"(it) is, becomes"' },
      { form: 'अनुशुश्रुम', root: 'अनु + √श्रु', lakara: 'लिट्', purusha: 'उत्तम', vachana: 'बहुवचन', pada: 'P', gloss: '"we have heard (continually, by tradition)"' },
    ],
    vibhaktiNotes: [
      'उत्सन्नकुलधर्माणाम् मनुष्याणाम् → षष्ठी बहुवचन = "of men whose family-dharmas have been uprooted"',
      'जनार्दन → सम्बोधन',
      'नरके → सप्तमी एकवचन = "in hell"',
      'अनियतम् → प्रथमा एकवचन (नपुंसक) — adjective of वासः ("undetermined / endless")',
      'वासः → प्रथमा एकवचन — subject of भवति ("dwelling")',
      'इति → quotation marker (closes the heard tradition)',
    ],
    keyFights: [
      'अनुशुश्रुम is लिट् उत्तम-पुरुष बहुवचन of अनु + √श्रु = "we have heard (across generations, by śruti tradition)". The reduplicated शुश्रु- + ending -म = perfect 1pl.',
      'इति marks the end of the heard tradition: "(such) is the dwelling-in-hell — thus we have heard."',
      'उत्सन्नकुलधर्माणाम् is a बहुव्रीहि: "(of men) whose-family-dharmas-are-destroyed".',
    ],
    anvaya:
      'जनार्दन | उत्सन्नकुलधर्माणाम् मनुष्याणाम् | नरके अनियतम् वासः भवति | इति अनुशुश्रुम',
    hindi:
      'हे जनार्दन! जिन मनुष्यों के कुलधर्म नष्ट हो गए हैं — उनका वास नरक में अनिश्चित (काल तक) होता है — ऐसा हम (परम्परा से) सुनते आए हैं।',
    english:
      'O Janārdana, for men whose family-dharmas have been destroyed, dwelling in hell for an indeterminate (period) is the result — so we have heard.',
  },

  '1.45': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'अहो',
      'बत',
      'महत्',
      'पापम्',
      'कर्तुम्',
      'व्यवसिताः',
      'वयम्',
      'यत्',
      'राज्य-सुख-लोभेन',
      'हन्तुम्',
      'स्व-जनम्',
      'उद्यताः',
    ],
    sandhiNotes: [
      'महत्पापम् = महत् + पापम् (-त्-junction)',
      'व्यवसिता वयम् = व्यवसिताः + वयम् (-ः + व → -अ; visarga lopa)',
      'यद्राज्यसुखलोभेन = यत् + राज्यसुखलोभेन (-त् + र → -द)',
      'स्वजनमुद्यताः = स्वजनम् + उद्यताः (-म् + उ → -मु)',
    ],
    finiteVerbs: null, // व्यवसिताः, उद्यताः are PPPs — predicate adjectives; no finite verb (implicit "we are")
    vibhaktiNotes: [
      'अहो बत → indeclinables = "alas! oh!"',
      'महत् पापम् → द्वितीया एकवचन (नपुंसक) — object of कर्तुम्',
      'कर्तुम् → infinitive of √कृ = "to do"',
      'व्यवसिताः → प्रथमा बहुवचन (PPP of वि + अव + √सो/√सि) = "(we are) determined"',
      'वयम् → प्रथमा बहुवचन — subject',
      'यत् → relative-pronominal indeclinable / conjunction = "that, in that, because"',
      'राज्यसुखलोभेन → तृतीया एकवचन = "by greed for kingdom-pleasures"',
      'हन्तुम् → infinitive of √हन्',
      'स्वजनम् → द्वितीया एकवचन — object of हन्तुम्',
      'उद्यताः → प्रथमा बहुवचन (PPP of उद् + √यम्) = "ready, set out"',
    ],
    keyFights: [
      'No finite verb! Two predicate-PPPs (व्यवसिताः, उद्यताः) take the place of a finite verb — the implicit copula "we are determined ... we are ready".',
      'Two infinitives (कर्तुम्, हन्तुम्) — both objects in द्वितीया, both complement the PPP-predicates.',
      'यत् introduces a clause of explanation: "...that we, by greed for the comforts of kingship, are set on killing our own people."',
      'अहो बत — interjection cluster for grief/regret. This is the verse where Arjuna names his own act in moral terms.',
    ],
    anvaya:
      'अहो बत | (वयम्) महत् पापम् कर्तुम् व्यवसिताः वयम् | यत् राज्यसुखलोभेन स्वजनम् हन्तुम् उद्यताः',
    hindi:
      'अहो! कितना दुर्भाग्य है — कि हम राज्य-सुख के लोभ से अपने स्वजनों को मारने के लिए तैयार हो गए हैं! हम महान् पाप करने पर उतारू हैं।',
    english:
      'Alas! What a great sin we are determined to commit — that we, out of greed for the comforts of kingship, are set on killing our own people!',
  },

  '1.46': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'यदि',
      'माम्',
      'अप्रतीकारम्',
      'अशस्त्रम्',
      'शस्त्र-पाणयः',
      'धार्तराष्ट्राः',
      'रणे',
      'हन्युः',
      'तत्',
      'मे',
      'क्षेमतरम्',
      'भवेत्',
    ],
    sandhiNotes: [
      'मामप्रतीकारमशस्त्रम् = माम् + अप्रतीकारम् + अशस्त्रम् (-म् + अ chains)',
      'हन्युस्तन्मे = हन्युः + तत् + मे (-ः + त → -स्त; -त् + म → -न्म)',
      'क्षेमतरं भवेत् = क्षेमतरम् + भवेत् (-म् + भ → -ं भ; anusvara)',
    ],
    finiteVerbs: [
      { form: 'हन्युः', root: '√हन्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"(if they) should kill"' },
      { form: 'भवेत्', root: '√भू', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"(that) would be"' },
    ],
    vibhaktiNotes: [
      'यदि → indeclinable = "if"',
      'माम् → द्वितीया एकवचन — object of हन्युः',
      'अप्रतीकारम्, अशस्त्रम् → द्वितीया एकवचन — predicate adjectives of माम् ("non-resisting, weaponless")',
      'शस्त्रपाणयः → प्रथमा बहुवचन (बहुव्रीहि: "(those) having weapons in hand") — subject',
      'धार्तराष्ट्राः → प्रथमा बहुवचन — apposition with शस्त्रपाणयः',
      'रणे → सप्तमी एकवचन = "in battle"',
      'तत् → प्रथमा एकवचन (नपुंसक, demonstrative) — subject of भवेत्',
      'मे → षष्ठी / चतुर्थी एकवचन (enclitic) = "for me"',
      'क्षेमतरम् → प्रथमा एकवचन (नपुंसक, comparative) = "more salutary"',
    ],
    keyFights: [
      'Both verbs are विधिलिङ् (optative) — perfect form for a hypothetical conditional: "if they should kill ... that would be ...". यदि + लिङ् is the standard conditional construction.',
      'शस्त्रपाणयः is a बहुव्रीहि: "(having) weapons in (their) hands" — adjective of धार्तराष्ट्राः.',
      'अप्रतीकारम्, अशस्त्रम् — the two adjectives describe the speaker as defenseless: not-resisting + not-bearing-weapon. Both द्वितीया एकवचन agreeing with माम्.',
      'क्षेमतरम् is comparative of क्षेम (-तर suffix) — "more salutary, better".',
    ],
    anvaya:
      'यदि शस्त्रपाणयः धार्तराष्ट्राः रणे माम् अप्रतीकारम् अशस्त्रम् हन्युः | तत् मे क्षेमतरम् भवेत्',
    hindi:
      'यदि शस्त्र हाथ में लिए हुए धृतराष्ट्र-पुत्र मुझ निःशस्त्र, प्रतिकार न करनेवाले को रणभूमि में मार डालें — तो वह मेरे लिए अधिक कल्याणकारी होगा।',
    english:
      'If the sons of Dhṛtarāṣṭra, weapons in hand, should kill me — me unresisting and unarmed — in the battle, that would be more salutary for me.',
  },

  '1.47': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'एवम्',
      'उक्त्वा',
      'अर्जुनः',
      'सङ्ख्ये',
      'रथ-उपस्थे',
      'उपाविशत्',
      'विसृज्य',
      'स-शरम्',
      'चापम्',
      'शोक-संविग्न-मानसः',
    ],
    sandhiNotes: [
      'एवमुक्त्वार्जुनः = एवम् + उक्त्वा + अर्जुनः (-म् + उ → -मु; आ + अ → ा)',
      'रथोपस्थ उपाविशत् = रथोपस्थे + उपाविशत् (-े + उ → -अ; printed elision)', // AUDIT: रथोपस्थ उपाविशत् — -े + उ usually → -अ-उ remaining, here treated as प्रगृह्य? actually -ए before vowel becomes -अ in संहिता
      'रथोपस्थे = रथ + उपस्थे (अ + उ → ो)',
    ],
    finiteVerbs: [
      { form: 'उपाविशत्', root: 'उप + आ + √विश्', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he sat down" (imperfect)' },
    ],
    vibhaktiNotes: [
      'एवम् → indeclinable = "thus"',
      'उक्त्वा → absolutive of √वच् = "having spoken"',
      'अर्जुनः → प्रथमा एकवचन — subject',
      'सङ्ख्ये → सप्तमी एकवचन = "in the battle"',
      'रथोपस्थे → सप्तमी एकवचन = "on the seat of the chariot"',
      'विसृज्य → absolutive of वि + √सृज् = "having cast aside"',
      'सशरम् चापम् → द्वितीया एकवचन — object of विसृज्य ("the bow, with-arrow")',
      'शोकसंविग्नमानसः → प्रथमा एकवचन (बहुव्रीहि: "his-mind-agitated-by-grief") — agrees with अर्जुनः',
    ],
    keyFights: [
      'One finite verb (उपाविशत्) closes the chapter — the great act of Arjuna sitting down in his chariot. Two absolutives bracket it (उक्त्वा, विसृज्य).',
      'सशरम् चापम् — सशर is बहुव्रीहि ("with-arrow") modifying चापम् ("bow"). The bow is dropped, but with the arrow still notched — a powerful gesture of refusal.',
      'शोकसंविग्नमानसः is a बहुव्रीहि: "(he) whose-mind-is-agitated-by-grief". The chapter\'s emotional climax — and the trigger for chapter 2.',
      'उपाविशत् has the imperfect signature: अ-augment + -त् ending. The सम्भावित नियम (3-prefix structure उप + आ + √विश्) is preserved across imperfect formation.',
    ],
    anvaya:
      'एवम् उक्त्वा | अर्जुनः | सङ्ख्ये | सशरम् चापम् विसृज्य | शोकसंविग्नमानसः | रथोपस्थे उपाविशत्',
    hindi:
      'इस प्रकार कहकर, अर्जुन शोक से व्याकुल मन वाला होकर, रणभूमि में बाण सहित धनुष को त्यागकर, रथ की पीठ पर बैठ गया।',
    english:
      'Having spoken thus, in the midst of the battle, casting aside his bow with its arrow, his mind overwhelmed by grief, Arjuna sat down on the seat of his chariot.',
  },
};
