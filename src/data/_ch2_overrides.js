// Chapter 2 (साङ्ख्ययोग) — verse-level overrides for the 60 verses
// not yet individually hand-decoded in verses.js. Composed by an agent
// against /tmp/ch2_todo.json. Each entry is paraphrase-quality and
// audit-flagged where uncertain (// AUDIT inline). The hydrator merges
// these via verse-overrides.js — overrides only fill missing fields,
// so any later hand-correction in verses.js takes priority.
export const CH2_VERSE_OVERRIDES = {
  '2.1': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'तम्',
      'तथा',
      'कृपया',
      'आविष्टम्',
      'अश्रु-पूर्ण-आकुल-ईक्षणम्',
      'विषीदन्तम्',
      'इदम्',
      'वाक्यम्',
      'उवाच',
      'मधुसूदनः',
    ],
    sandhiNotes: [
      'कृपयाविष्टम् = कृपया + आविष्टम् (आ + आ → ा)',
      'अश्रुपूर्णाकुलेक्षणम् = अश्रुपूर्ण + आकुल + ईक्षणम् (आ + आ → ा; अ + ई → े)',
      'विषीदन्तमिदम् = विषीदन्तम् + इदम् (-म् + इ → -मि)',
      'वाक्यमुवाच = वाक्यम् + उवाच (-म् + उ → -मु)',
    ],
    finiteVerbs: [
      { form: 'उवाच', root: '√वच्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he said" (perfect with present sense — the standard narrative verb of the Gītā)' },
    ],
    vibhaktiNotes: [
      'तम् → द्वितीया एकवचन — "him" (Arjuna), object of उवाच',
      'तथा → indeclinable = "thus, in that state"',
      'कृपया → तृतीया एकवचन = "by pity / with compassion" (instrumental of cause)',
      'आविष्टम्, विषीदन्तम् → द्वितीया एकवचन (PPP / present participle) — agreeing with तम्',
      'अश्रुपूर्णाकुलेक्षणम् → द्वितीया एकवचन — बहुव्रीहि "(him) whose eyes were full of tears and troubled"',
      'इदम् वाक्यम् → द्वितीया एकवचन (नपुंसक) — content of speech',
      'मधुसूदनः → प्रथमा एकवचन — subject (Krishna)',
    ],
    keyFights: [
      'A long chain of द्वितीया participles (आविष्टम्, विषीदन्तम्) all describe the single object तम् (Arjuna). The ending agreement is what holds the cascade together.',
      'अश्रुपूर्णाकुलेक्षणम् is a बहुव्रीहि compound — describes the possessor (Arjuna) by his eyes\' state, not the eyes themselves.',
      'कृपया (तृतीया) reads as instrumental-of-cause: "overcome BY pity" — the pity is the agent of the takeover.',
    ],
    anvaya:
      'मधुसूदनः | तथा कृपया आविष्टम् अश्रुपूर्णाकुलेक्षणम् विषीदन्तम् तम् | इदम् वाक्यम् उवाच',
    hindi:
      'मधुसूदन (श्रीकृष्ण) ने उस — करुणा से अभिभूत, आँसुओं से भरे और व्याकुल नेत्रोंवाले, विषाद-ग्रस्त (अर्जुन) से — यह वाक्य कहा।',
    english:
      'To him (Arjuna) — thus overcome by pity, his eyes full of tears and troubled, sinking down in despair — Madhusūdana spoke these words.',
  },

  '2.2': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'कुतः',
      'त्वा',
      'कश्मलम्',
      'इदम्',
      'विषमे',
      'समुपस्थितम्',
      'अनार्य-जुष्टम्',
      'अस्वर्ग्यम्',
      'अकीर्ति-करम्',
      'अर्जुन',
    ],
    sandhiNotes: [
      'कुतस्त्वा = कुतः + त्वा (-ः + त → -स्त)',
      'कश्मलमिदम् = कश्मलम् + इदम् (-म् + इ → -मि)',
      'अनार्यजुष्टमस्वर्ग्यम् = अनार्यजुष्टम् + अस्वर्ग्यम् (-म् + अ → -म)',
      'अकीर्तिकरमर्जुन = अकीर्तिकरम् + अर्जुन (-म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'समुपस्थितम्', root: 'सम् + उप + √स्था', lakara: null, purusha: null, vachana: null, pada: 'P', gloss: '"has come upon" (PPP used predicatively with implicit अस्ति) — not a finite verb proper' }, // AUDIT: treated as predicate-PPP; the only "verb-feel" word in the verse, but technically a PPP
    ],
    vibhaktiNotes: [
      'कुतः → indeclinable = "from where? whence?"',
      'त्वा → द्वितीया एकवचन (enclitic of त्वम्) = "you" (object of समुपस्थितम् in the sense "fallen upon you")',
      'कश्मलम् इदम् → प्रथमा एकवचन (नपुंसक) — subject ("this faintness")',
      'विषमे → सप्तमी एकवचन = "in (this) crisis / difficult moment"',
      'समुपस्थितम्, अनार्यजुष्टम्, अस्वर्ग्यम्, अकीर्तिकरम् → प्रथमा एकवचन (नपुंसक) — chain of predicate adjectives qualifying कश्मलम्',
      'अर्जुन → सम्बोधन एकवचन',
    ],
    keyFights: [
      'A nominal sentence dressed up as a question: कुतः... समुपस्थितम् with implicit अस्ति. The PPP समुपस्थितम् ("come upon") carries the predicate weight.',
      'Three negations in a row: अनार्यजुष्टम् (un-Aryan-frequented), अस्वर्ग्यम् (un-heaven-leading), अकीर्तिकरम् (un-fame-causing) — Krishna stacks the disqualifications.',
      'अनार्यजुष्टम् = अनार्य + जुष्ट (PPP of √जुष् "to enjoy/resort to") — "frequented by un-Āryans".',
    ],
    anvaya:
      'अर्जुन | विषमे (काले) इदम् कश्मलम् त्वा कुतः समुपस्थितम् | अनार्यजुष्टम् अस्वर्ग्यम् अकीर्तिकरम्',
    hindi:
      'हे अर्जुन! इस विषम (संकट) के समय तुझ पर यह कायरता / मोह कहाँ से आ पड़ी? यह तो अनार्यों द्वारा सेवित है, स्वर्ग देनेवाली नहीं, और अकीर्ति करनेवाली है।',
    english:
      'O Arjuna, whence has this faintheartedness come upon you in this critical hour — un-Āryan, leading not to heaven, productive of dishonour?',
  },

  '2.6': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'न',
      'च',
      'एतत्',
      'विद्मः',
      'कतरत्',
      'नः',
      'गरीयः',
      'यत्',
      'वा',
      'जयेम',
      'यदि',
      'वा',
      'नः',
      'जयेयुः',
      'यान्',
      'एव',
      'हत्वा',
      'न',
      'जिजीविषामः',
      'ते',
      'अवस्थिताः',
      'प्रमुखे',
      'धार्तराष्ट्राः',
    ],
    sandhiNotes: [
      'चैतद् = च + एतत् (अ + ए → ै)',
      'कतरन्नो = कतरत् + नः (त् + न → न्न)',
      'गरीयो यद्वा = गरीयः + यद्वा (-ः + य → -ो)',
      'जिजीविषामस्तेऽवस्थिताः = जिजीविषामः + ते + अवस्थिताः (-ः + त → -स्त; -े + अ → -एऽ)',
    ],
    finiteVerbs: [
      { form: 'विद्मः', root: '√विद्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'बहुवचन', pada: 'P', gloss: '"we know" (irregular लट् of √विद्, sense of present though formally perfect)' },
      { form: 'जयेम', root: '√जि', lakara: 'विधिलिङ्', purusha: 'उत्तम', vachana: 'बहुवचन', pada: 'P', gloss: '"we should/might conquer"' },
      { form: 'जयेयुः', root: '√जि', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they should/might conquer"' },
      { form: 'जिजीविषामः', root: '√जीव् (desiderative)', lakara: 'लट्', purusha: 'उत्तम', vachana: 'बहुवचन', pada: 'P', gloss: '"we wish to live" (desiderative)' },
    ],
    vibhaktiNotes: [
      'एतत्, कतरत्, गरीयः → प्रथमा एकवचन (नपुंसक) — "this, which-of-the-two, weightier"',
      'नः → षष्ठी / चतुर्थी बहुवचन (enclitic of अस्मद्) = "for us / of us"',
      'यान् → द्वितीया बहुवचन (relative pronoun) — antecedent of ते, object of हत्वा',
      'ते धार्तराष्ट्राः, अवस्थिताः → प्रथमा बहुवचन — main subject (correlative)',
      'प्रमुखे → सप्तमी एकवचन = "in front (of us)"',
      'हत्वा → absolutive ("having killed")',
    ],
    keyFights: [
      'Two विधिलिङ् verbs (जयेम / जयेयुः) frame the central uncertainty — "should we win, or should they win?" The optative is precisely how Sanskrit registers the unknown future of a contest.',
      'जिजीविषामः is desiderative of √जीव् — "we-wish-to-live". The reduplication जि-जी and -ष- desid-marker are the spotting cues.',
      'यान् एव हत्वा... ते अवस्थिताः — relative-correlative: "those-very-ones whom (yān), having killed (we would not wish to live)... they (te) stand before (us)".',
    ],
    anvaya:
      'न च एतत् विद्मः | नः कतरत् गरीयः (इति) | यद् वा (वयं) जयेम, यदि वा नः जयेयुः | यान् एव हत्वा न जिजीविषामः | ते धार्तराष्ट्राः प्रमुखे अवस्थिताः',
    hindi:
      'और हम यह भी नहीं जानते कि हमारे लिए कौनसी (बात) श्रेष्ठ है — हम जीतेंगे या वे हमको जीतेंगे? जिनको मारकर हम जीना ही नहीं चाहते, वे ही धृतराष्ट्र-पुत्र हमारे सामने खड़े हैं।',
    english:
      'And we do not know which is better for us — that we should conquer them, or that they should conquer us. The very sons of Dhṛtarāṣṭra, after slaying whom we would not wish to live, stand before us in array.',
  },

  '2.7': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'कार्पण्य-दोष-उपहत-स्वभावः',
      'पृच्छामि',
      'त्वाम्',
      'धर्म-सम्मूढ-चेताः',
      'यत्',
      'श्रेयः',
      'स्यात्',
      'निश्चितम्',
      'ब्रूहि',
      'तत्',
      'मे',
      'शिष्यः',
      'ते',
      'अहम्',
      'शाधि',
      'माम्',
      'त्वाम्',
      'प्रपन्नम्',
    ],
    sandhiNotes: [
      'कार्पण्यदोषोपहतस्वभावः = कार्पण्य-दोष + उपहत + स्वभावः (अ + उ → ो)',
      'यच्छ्रेयः = यत् + श्रेयः (त् + श → च्छ)',
      'स्यान्निश्चितम् = स्यात् + निश्चितम् (त् + न → न्न)',
      'तन्मे = तत् + मे (त् + म → न्म)',
      'शिष्यस्तेऽहम् = शिष्यः + ते + अहम् (-ः + त → -स्त; -े + अ → -एऽ)',
    ],
    finiteVerbs: [
      { form: 'पृच्छामि', root: '√प्रच्छ्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'P', gloss: '"I ask"' },
      { form: 'स्यात्', root: '√अस्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"would be / might be"' },
      { form: 'ब्रूहि', root: '√ब्रू', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"speak! tell!" (imperative)' },
      { form: 'शाधि', root: '√शास्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"instruct! command!" (imperative; irregular -धि ending)' },
    ],
    vibhaktiNotes: [
      'कार्पण्यदोषोपहतस्वभावः, धर्मसम्मूढचेताः → प्रथमा एकवचन — predicative descriptors of अहम् (Arjuna himself); both बहुव्रीहि',
      'त्वाम्, माम् → द्वितीया एकवचन — objects of पृच्छामि / शाधि',
      'यत्...तत् → प्रथमा/द्वितीया एकवचन (नपुंसक) relative-correlative for the content "what is good"',
      'श्रेयः, निश्चितम् → प्रथमा एकवचन (नपुंसक); निश्चितम् is adverbial = "definitively"',
      'मे, ते → षष्ठी/चतुर्थी एकवचन (enclitic) = "to me / yours"',
      'शिष्यः → प्रथमा एकवचन — predicate ("I am your student")',
      'प्रपन्नम् → द्वितीया एकवचन (PPP of प्र + √पद्) — agrees with माम्, "(me) who has surrendered"',
    ],
    keyFights: [
      'The crucial moment of शिष्यत्व-acceptance: शिष्यः ते अहम् ("I am your student") + शाधि माम् ("instruct me!") + प्रपन्नम् ("the surrendered one"). Arjuna formally enters discipleship — the Gītā\'s pivot.',
      'Four finite verbs in a single verse: पृच्छामि (lat), स्यात् (vidhilin), ब्रूहि / शाधि (lot, lot). The optative स्यात् inside the relative clause specifies what Arjuna asks ABOUT — the indefinite "what would be best".',
      'शाधि is the irregular लोट् of √शास् — second-singular imperative drops the -त् and takes -धि (cf. जुहुधि, श्रुधि).',
      'Both कार्पण्यदोषोपहतस्वभावः and धर्मसम्मूढचेताः are बहुव्रीहि compounds describing Arjuna himself — they are technically predicates, but read as appositional self-descriptions.',
    ],
    anvaya:
      'कार्पण्यदोषोपहतस्वभावः धर्मसम्मूढचेताः (अहम्) त्वाम् पृच्छामि | यत् श्रेयः निश्चितम् स्यात् तत् मे ब्रूहि | अहम् ते शिष्यः | त्वाम् प्रपन्नम् माम् शाधि',
    hindi:
      'दीनता-दोष से उपहत स्वभाववाला, धर्म के विषय में सम्मूढ-चित्तवाला (मैं) आपसे पूछता हूँ — जो निश्चित रूप से श्रेय हो वह मुझे कहिए। मैं आपका शिष्य हूँ, आपकी शरण में आए हुए मुझको शिक्षा दीजिए।',
    english:
      'My nature struck down by the taint of pity, my mind bewildered about duty, I ask You — tell me with certainty what would be the highest good. I am Your disciple; instruct me, who have taken refuge in You.',
  },

  '2.8': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'न',
      'हि',
      'प्रपश्यामि',
      'मम',
      'अपनुद्यात्',
      'यत्',
      'शोकम्',
      'उच्छोषणम्',
      'इन्द्रियाणाम्',
      'अवाप्य',
      'भूमौ',
      'असपत्नम्',
      'ऋद्धम्',
      'राज्यम्',
      'सुराणाम्',
      'अपि',
      'च',
      'आधिपत्यम्',
    ],
    sandhiNotes: [
      'ममापनुद्यात् = मम + अपनुद्यात् (अ + अ → ा)',
      'यच्छोकम् = यत् + शोकम् (त् + श → च्छ)',
      'उच्छोषणमिन्द्रियाणाम् = उच्छोषणम् + इन्द्रियाणाम् (-म् + इ → -मि)',
      'भूमावसपत्नम् = भूमौ + असपत्नम् (-ौ + अ → -ाव्)',
      'सुराणामपि = सुराणाम् + अपि (-म् + अ → -म)',
      'चाधिपत्यम् = च + आधिपत्यम् (अ + आ → ा)',
    ],
    finiteVerbs: [
      { form: 'प्रपश्यामि', root: 'प्र + √दृश्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'P', gloss: '"I see / foresee"' },
      { form: 'अपनुद्यात्', root: 'अप + √नुद्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"would dispel / would drive away"' },
    ],
    vibhaktiNotes: [
      'मम → षष्ठी एकवचन = "of/from me"',
      'यत् → प्रथमा एकवचन (नपुंसक relative) — subject of अपनुद्यात्; "(that) which (would dispel)"',
      'शोकम्, उच्छोषणम् → द्वितीया एकवचन — object of अपनुद्यात्; उच्छोषणम् in apposition = "(this) shrivelling-up"',
      'इन्द्रियाणाम् → षष्ठी बहुवचन = "of the senses"',
      'भूमौ → सप्तमी एकवचन = "on earth"',
      'असपत्नम् ऋद्धम् राज्यम् → द्वितीया एकवचन — object of अवाप्य ("rivalless, prosperous kingdom")',
      'सुराणाम् → षष्ठी बहुवचन = "of the gods"',
      'आधिपत्यम् → द्वितीया एकवचन — second object of अवाप्य',
      'अवाप्य → absolutive = "having attained"',
    ],
    keyFights: [
      'The relative clause यत् ... अपनुद्यात् is the heart: "(I see nothing) which-would-dispel..." — विधिलिङ् inside the relative carries the conditional/hypothetical "would".',
      'अवाप्य भूमौ असपत्नम् ऋद्धम् राज्यम् — even attaining a rival-less kingdom on earth, plus आधिपत्यम् (lordship over gods themselves) — Arjuna escalates the hypothesis to its absolute limit.',
      'उच्छोषणम् इन्द्रियाणाम् — कर्तृ-genitive: "(this grief) which is the drying-up of the senses" — a striking somatic metaphor.',
    ],
    anvaya:
      'भूमौ असपत्नम् ऋद्धम् राज्यम् | सुराणाम् आधिपत्यम् अपि च | अवाप्य | यत् मम इन्द्रियाणाम् उच्छोषणम् शोकम् अपनुद्यात् | (तत्) न हि प्रपश्यामि',
    hindi:
      'पृथ्वी पर निष्कण्टक एवं समृद्ध राज्य पाकर, और देवताओं का आधिपत्य पाकर भी — जो मेरे इस इन्द्रियों को सुखा देनेवाले शोक को दूर कर सके — ऐसा (कोई उपाय) मैं नहीं देखता।',
    english:
      'For I do not see what could dispel this grief that withers up my senses — even were I to win on earth a prosperous, rival-less kingdom, and even sovereignty over the gods themselves.',
  },

  '2.9': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'एवम्',
      'उक्त्वा',
      'हृषीकेशम्',
      'गुडाकेशः',
      'परन्तपः',
      'न',
      'योत्स्ये',
      'इति',
      'गोविन्दम्',
      'उक्त्वा',
      'तूष्णीम्',
      'बभूव',
      'ह',
    ],
    sandhiNotes: [
      'एवमुक्त्वा = एवम् + उक्त्वा (-म् + उ → -मु)',
      'योत्स्य इति = योत्स्ये + इति (-े + इ — प्रगृह्य; merge avoided)',
      'गोविन्दमुक्त्वा = गोविन्दम् + उक्त्वा (-म् + उ → -मु)',
    ],
    finiteVerbs: [
      { form: 'योत्स्ये', root: '√युध्', lakara: 'लृट्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'A', gloss: '"I shall fight" — Arjuna\'s declared refusal (negated by न)' },
      { form: 'बभूव', root: '√भू', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"became / fell" (perfect)' },
    ],
    vibhaktiNotes: [
      'हृषीकेशम्, गोविन्दम् → द्वितीया एकवचन — objects of (1st) उक्त्वा and (2nd) उक्त्वा',
      'गुडाकेशः परन्तपः → प्रथमा एकवचन — subject (Arjuna with two epithets)',
      'न योत्स्ये → embedded direct quotation (with इति marking it)',
      'इति → indeclinable = quotation marker',
      'तूष्णीम् → indeclinable = "silent(ly)"',
      'ह → indeclinable particle (emphatic, narrative-marker — "indeed, it is said")',
      'उक्त्वा (twice) → absolutives',
    ],
    keyFights: [
      'The most loaded लृट् of the Gītā: न योत्स्ये ("I shall NOT fight") — the future tense + the negation = Arjuna\'s declared withdrawal. Spotted by the -ष्य- infix and -ए ending of आत्मनेपद उत्तम-एकवचन.',
      'Two absolutives उक्त्वा flank the verse — Arjuna says X to Hṛṣīkeśa AND THEN says "I shall not fight" to Govinda AND THEN became silent.',
      'बभूव (लिट् of √भू) + तूष्णीम् = idiom "fell silent" — the perfect aspect captures the completed action.',
      'ह is a Vedic-flavoured emphatic particle — Sanjaya\'s tone of "and so it happened, indeed".',
    ],
    anvaya:
      'परन्तपः गुडाकेशः | हृषीकेशम् एवम् उक्त्वा | "न योत्स्ये" इति गोविन्दम् उक्त्वा | तूष्णीम् बभूव ह',
    hindi:
      'परन्तप गुडाकेश (अर्जुन) — हृषीकेश से इस प्रकार कहकर, "मैं नहीं लड़ूँगा" — ऐसा गोविन्द से कहकर, चुप हो गया।',
    english:
      'Having spoken thus to Hṛṣīkeśa, Guḍākeśa the scorcher of foes, having said to Govinda "I shall not fight!", became silent.',
  },

  '2.10': {
    speaker: 'सञ्जय उवाच',
    padaccheda: [
      'तम्',
      'उवाच',
      'हृषीकेशः',
      'प्रहसन्',
      'इव',
      'भारत',
      'सेनयोः',
      'उभयोः',
      'मध्ये',
      'विषीदन्तम्',
      'इदम्',
      'वचः',
    ],
    sandhiNotes: [
      'तमुवाच = तम् + उवाच (-म् + उ → -मु)',
      'प्रहसन्निव = प्रहसन् + इव (न् + इ → न्नि, doubling of न् before vowel)',
      'सेनयोरुभयोर्मध्ये = सेनयोः + उभयोः + मध्ये (-ः + उ → -र्; -ः + म → -र्)',
      'विषीदन्तमिदम् = विषीदन्तम् + इदम् (-म् + इ → -मि)',
    ],
    finiteVerbs: [
      { form: 'उवाच', root: '√वच्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"he said" (perfect, narrative present sense)' },
    ],
    vibhaktiNotes: [
      'तम् → द्वितीया एकवचन — Arjuna, addressee of उवाच',
      'हृषीकेशः → प्रथमा एकवचन — subject',
      'प्रहसन् → प्रथमा एकवचन (शानच् present participle) — "(while) smiling/laughing-mildly"',
      'इव → indeclinable = "as it were, almost"',
      'भारत → सम्बोधन एकवचन — Sanjaya to Dhṛtarāṣṭra',
      'सेनयोः उभयोः मध्ये → "in the middle of the two armies" (षष्ठी द्विवचन + loc. phrase, as in 1.21)',
      'विषीदन्तम् → द्वितीया एकवचन — agrees with तम् (Arjuna), "(him) sinking down"',
      'इदम् वचः → द्वितीया एकवचन (नपुंसक) — content of speech',
    ],
    keyFights: [
      'प्रहसन्निव — the "almost smiling / as if smiling" — one of the most-quoted half-pādas of the Gītā. The participle prepares the tonal contrast: Arjuna in despair, Krishna with the faintest smile.',
      'Same frame as 2.1 (Krishna addresses Arjuna सेनयोः उभयोः मध्ये), but now with the smile inserted. The symmetry is intentional: Krishna\'s reply opens here.',
      'विषीदन्तम् echoes 2.1\'s विषीदन्तम् — Sanjaya brackets Arjuna\'s collapse with the same participle.',
    ],
    anvaya:
      'भारत | हृषीकेशः | सेनयोः उभयोः मध्ये विषीदन्तम् तम् | प्रहसन् इव | इदम् वचः उवाच',
    hindi:
      'हे भारत (धृतराष्ट्र)! दोनों सेनाओं के बीच विषाद-ग्रस्त उस (अर्जुन) से हृषीकेश (श्रीकृष्ण) ने मानो हँसते हुए यह वचन कहा।',
    english:
      'O Bhārata, to him, sinking in despair between the two armies, Hṛṣīkeśa, as it were smiling, spoke these words.',
  },

  '2.11': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अशोच्यान्',
      'अन्वशोचः',
      'त्वम्',
      'प्रज्ञा-वादान्',
      'च',
      'भाषसे',
      'गत-असून्',
      'अगत-असून्',
      'च',
      'न',
      'अनुशोचन्ति',
      'पण्डिताः',
    ],
    sandhiNotes: [
      'अशोच्याननशोचस्त्वम् = अशोच्यान् + अन्वशोचः + त्वम् (न्-junction; -ः + त → -स्त)',
      'प्रज्ञावादांश्च = प्रज्ञावादान् + च (न् + च → ंश्च, anusvara + च with palatal sibilant insertion)',
      'गतासूनगतासूंश्च = गतासून् + अगतासून् + च (न्-junction; -न् + च → -ंश्च)',
      'नानुशोचन्ति = न + अनुशोचन्ति (अ + अ → ा)',
    ],
    finiteVerbs: [
      { form: 'अन्वशोचः', root: 'अनु + √शुच्', lakara: 'लङ्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you have grieved over" (imperfect — completed past lament)' },
      { form: 'भाषसे', root: '√भाष्', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'A', gloss: '"you speak"' },
      { form: 'अनुशोचन्ति', root: 'अनु + √शुच्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they grieve" (negated)' },
    ],
    vibhaktiNotes: [
      'अशोच्यान् → द्वितीया बहुवचन (gerundive of √शुच् with neg.) = "those-not-to-be-grieved-for"',
      'त्वम् → प्रथमा एकवचन — subject of अन्वशोचः and भाषसे',
      'प्रज्ञावादान् → द्वितीया बहुवचन — object of भाषसे = "wisdom-words"',
      'गतासून् ("life-departed" = dead) and अगतासून् ("life-not-departed" = living) → द्वितीया बहुवचन — objects of अनुशोचन्ति, बहुव्रीहि',
      'पण्डिताः → प्रथमा बहुवचन — subject of अनुशोचन्ति',
    ],
    keyFights: [
      'The famous opening of Krishna\'s discourse. The juxtaposition अशोच्यान् अन्वशोचः ("the un-grievable you have grieved-for") + प्रज्ञावादान् भाषसे ("yet you speak wise words") = Krishna\'s diagnostic punch.',
      'अन्वशोचः is लङ् (imperfect) — augment अ- + -त्/-ः ending = past tense. Spotting the augment is the key.',
      'गतासून् / अगतासून् are paired बहुव्रीहि compounds: "(those) whose breath has gone / has not gone". The प्राण - असु equivalence is poetic shorthand.',
      'पण्डिताः at the end is the predicate-anchor: "the wise grieve for neither (dead nor living)".',
    ],
    anvaya:
      'त्वम् | अशोच्यान् अन्वशोचः | प्रज्ञावादान् च भाषसे | (किन्तु) पण्डिताः गतासून् अगतासून् च न अनुशोचन्ति',
    hindi:
      'तुमने उनके लिए शोक किया है जो शोक के योग्य नहीं हैं, और साथ ही ज्ञान की बातें भी कर रहे हो। पण्डित (= विवेकी) न तो मरे हुओं के लिए शोक करते हैं, न जीवितों के लिए।',
    english:
      'You have grieved for those not to be grieved for — and yet you speak words of wisdom. The wise grieve neither for the dead nor for the living.',
  },

  '2.12': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'न',
      'तु',
      'एव',
      'अहम्',
      'जातु',
      'न',
      'आसम्',
      'न',
      'त्वम्',
      'न',
      'इमे',
      'जन-अधिपाः',
      'न',
      'च',
      'एव',
      'न',
      'भविष्यामः',
      'सर्वे',
      'वयम्',
      'अतः',
      'परम्',
    ],
    sandhiNotes: [
      'न त्वेवाहम् = न + तु + एव + अहम् (अ + ए → ै ; followed by अ + अ → ा)',
      'जातु नासम् = जातु + न + आसम् (अ + आ → ा)',
      'नेमे = न + इमे (अ + इ → े)',
      'न चैव = न + च + एव (अ + ए → ै)',
    ],
    finiteVerbs: [
      { form: 'आसम्', root: '√अस्', lakara: 'लङ्', purusha: 'उत्तम', vachana: 'एकवचन', pada: 'P', gloss: '"I was" (imperfect — "I existed")' },
      { form: 'भविष्यामः', root: '√भू', lakara: 'लृट्', purusha: 'उत्तम', vachana: 'बहुवचन', pada: 'P', gloss: '"we shall be / exist"' },
    ],
    vibhaktiNotes: [
      'अहम्, त्वम्, इमे जनाधिपाः, सर्वे वयम् → प्रथमा (एकवचन / बहुवचन) — successive subjects',
      'जातु → indeclinable = "ever, at any time"',
      'अतः परम् → indeclinable phrase = "from now onward, hereafter"',
      'न ... न ... न ... न ... — five negations across one verse: stacking denials of non-existence',
    ],
    keyFights: [
      'Two finite verbs anchor the verse: आसम् (लङ्, past — "I existed") and भविष्यामः (लृट्, future — "we shall exist"). Together with implicit अस्ति (present), Krishna covers all three tenses of the soul\'s existence.',
      'The double negation न ... न आसम् = "it is not the case that I was not" = "I have always been". Sanskrit\'s "double negation = strong affirmation" idiom in operation.',
      'जातु ("ever") strengthens the negation: "never at any time was I not" — eternal pre-existence.',
      'इमे जनाधिपाः ("these lords-of-people") = the assembled kings — Krishna gestures at the visible battlefield to ground the metaphysics.',
    ],
    anvaya:
      'न तु एव जातु अहम् न आसम् | न त्वम् | न इमे जनाधिपाः | न च एव सर्वे वयम् अतः परम् न भविष्यामः',
    hindi:
      'ऐसा कभी नहीं था कि मैं न रहा होऊँ; न ऐसा कि तुम न रहे होओ; न ही ये राजा-लोग न रहे हों। और इसके आगे (भविष्य में) भी हम सब न रहेंगे — ऐसा भी नहीं है।',
    english:
      'Never was there a time when I did not exist, nor you, nor these lords of men; nor will any of us cease to be hereafter.',
  },

  '2.15': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'यम्',
      'हि',
      'न',
      'व्यथयन्ति',
      'एते',
      'पुरुषम्',
      'पुरुष-ऋषभ',
      'सम-दुःख-सुखम्',
      'धीरम्',
      'सः',
      'अमृतत्वाय',
      'कल्पते',
    ],
    sandhiNotes: [
      'व्यथयन्त्येते = व्यथयन्ति + एते (-इ + ए → -ये)',
      'पुरुषर्षभ = पुरुष + ऋषभ (अ + ऋ → ार्)',
      'सोऽमृतत्वाय = सः + अमृतत्वाय (-ः + अ → -ोऽ)',
    ],
    finiteVerbs: [
      { form: 'व्यथयन्ति', root: '√व्यथ् (causative)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they (do not) trouble / agitate" (causative present)' },
      { form: 'कल्पते', root: '√कॢप्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is fit for / qualifies for"' },
    ],
    vibhaktiNotes: [
      'यम् ... पुरुषम् → द्वितीया एकवचन (relative + noun) — object of व्यथयन्ति',
      'एते → प्रथमा बहुवचन — subject of व्यथयन्ति, refers to "these (sense-contacts)" of 2.14',
      'पुरुषर्षभ → सम्बोधन एकवचन = "O bull-among-men" (Arjuna)',
      'समदुःखसुखम्, धीरम् → द्वितीया एकवचन — agreeing with पुरुषम्; बहुव्रीहि "(him for whom) pain and pleasure are equal"',
      'सः → प्रथमा एकवचन (correlative) — subject of कल्पते',
      'अमृतत्वाय → चतुर्थी एकवचन = "for immortality" (purpose)',
    ],
    keyFights: [
      'Classic relative-correlative: यम् ... पुरुषम् ... सः ... कल्पते — "the man whom (these) do not trouble — HE is fit for immortality."',
      'समदुःखसुखम् is a बहुव्रीहि: "(him) for-whom-pain-and-pleasure-are-equal" — द्वन्द्व inside a बहुव्रीहि. The neuter singular -अम् ending agrees with पुरुषम्.',
      'अमृतत्वाय (चतुर्थी) is purpose-dative — "(qualifies) for-the-sake-of immortality". The चतुर्थी for purpose/goal is a Gītā-recurring move.',
      'व्यथयन्ति is the causative of √व्यथ् ("to tremble"); -अय- causative + -न्ति लट् बहुवचन = "(they) cause-to-tremble".',
    ],
    anvaya:
      'पुरुषर्षभ | समदुःखसुखम् धीरम् यम् पुरुषम् एते (इन्द्रिय-संयोगाः) न व्यथयन्ति हि | सः अमृतत्वाय कल्पते',
    hindi:
      'हे पुरुषश्रेष्ठ (अर्जुन)! जिस धीर पुरुष को — जो सुख-दुःख में सम है — ये (इन्द्रिय-स्पर्श) व्याकुल नहीं करते, वही (पुरुष) अमृतत्व (मोक्ष) के योग्य होता है।',
    english:
      'O bull among men, the steady man whom these (sense-contacts) do not disturb, for whom pain and pleasure are equal — he is fit for immortality.',
  },

  '2.16': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'न',
      'असतः',
      'विद्यते',
      'भावः',
      'न',
      'अभावः',
      'विद्यते',
      'सतः',
      'उभयोः',
      'अपि',
      'दृष्टः',
      'अन्तः',
      'तु',
      'अनयोः',
      'तत्त्व-दर्शिभिः',
    ],
    sandhiNotes: [
      'नासतो = न + असतः (अ + अ → ा; -ः + व → -ो)',
      'भावो नाभावो = भावः + न + अभावः (-ः + न → -ो; अ + अ → ा; -ः + व → -ो)',
      'दृष्टोऽन्तस्त्वनयोः = दृष्टः + अन्तः + तु + अनयोः (-ः + अ → -ोऽ; -ः + त → -स्त; -उ + अ → -व्)',
      'तत्त्वदर्शिभिः — final word, no junction',
    ],
    finiteVerbs: [
      { form: 'विद्यते', root: '√विद् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is found / exists" (passive of √विद् "to know" used impersonally as "to exist", appearing twice)' },
    ],
    vibhaktiNotes: [
      'असतः, सतः → षष्ठी एकवचन = "of the unreal / of the real"',
      'भावः, अभावः → प्रथमा एकवचन — "being / non-being" (subjects of विद्यते)',
      'उभयोः, अनयोः → षष्ठी द्विवचन = "of both, of these two"',
      'दृष्टः → प्रथमा एकवचन (PPP, predicative) = "(has been) seen"',
      'अन्तः → प्रथमा एकवचन — subject ("the conclusion / final-truth")',
      'तत्त्वदर्शिभिः → तृतीया बहुवचन = "by the seers-of-truth"',
    ],
    keyFights: [
      'The classic Sāṅkhya formula: असत् has no भाव (existence); सत् has no अभाव (non-existence). The chiasmus is exact and metrical.',
      'विद्यते twice — both formally passive of √विद्, but used impersonally = "is-found / exists". A defining Gītā-Upaniṣad existential idiom.',
      'दृष्टः अन्तः तत्त्वदर्शिभिः: कर्मणि-construction with तृतीया-agent — "the conclusion has-been-seen by the seers-of-truth". The PPP + instrumental-of-agent is the Sanskrit passive proper.',
    ],
    anvaya:
      'असतः भावः न विद्यते | सतः अभावः न विद्यते | अनयोः उभयोः अपि अन्तः तु तत्त्वदर्शिभिः दृष्टः',
    hindi:
      'असत् (अनित्य) का अस्तित्व नहीं है, और सत् (नित्य) का अभाव नहीं है। तत्त्वदर्शियों ने इन दोनों का (यही) निष्कर्ष देख लिया है।',
    english:
      'Of the unreal there is no being; of the real there is no non-being. The conclusion regarding both has been seen by those who perceive the truth.',
  },

  '2.17': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अविनाशि',
      'तु',
      'तत्',
      'विद्धि',
      'येन',
      'सर्वम्',
      'इदम्',
      'ततम्',
      'विनाशम्',
      'अव्ययस्य',
      'अस्य',
      'न',
      'कश्चित्',
      'कर्तुम्',
      'अर्हति',
    ],
    sandhiNotes: [
      'तद्विद्धि = तत् + विद्धि (त् + व → द्व)',
      'सर्वमिदम् = सर्वम् + इदम् (-म् + इ → -मि)',
      'विनाशमव्ययस्यास्य = विनाशम् + अव्ययस्य + अस्य (-म् + अ → -म; अ + अ → ा)',
      'कश्चित्कर्तुम् = कश्चित् + कर्तुम् (त्-junction)',
    ],
    finiteVerbs: [
      { form: 'विद्धि', root: '√विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"know! understand!" (imperative)' },
      { form: 'अर्हति', root: '√अर्ह्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"is able / has the power to" (with infinitive)' },
    ],
    vibhaktiNotes: [
      'अविनाशि, तत् → द्वितीया एकवचन (नपुंसक) — object of विद्धि',
      'येन → तृतीया एकवचन (relative) = "by which", instrumental of pervasion',
      'सर्वम् इदम् → प्रथमा एकवचन (नपुंसक) — subject of ततम्',
      'ततम् → प्रथमा एकवचन (PPP of √तन्) = "(has been) spread/pervaded"',
      'विनाशम् → द्वितीया एकवचन — object of कर्तुम्',
      'अव्ययस्य अस्य → षष्ठी एकवचन = "of this imperishable"',
      'कश्चित् → प्रथमा एकवचन (indef. pronoun) = "anyone"',
      'कर्तुम् → infinitive ("to do/cause") — complement of अर्हति',
    ],
    keyFights: [
      'विद्धि (lot of √विद्) is the imperative-of-instruction Krishna uses constantly: "know! understand!". The relative येन ततम् defines what tat is — "(that) by which all-this has been spread".',
      'ततम् is PPP of √तन् (to spread/stretch), not of √तत्. Easy to mistake; here it means "pervaded".',
      'अर्हति + infinitive (कर्तुम्) = "is able to do" — the standard Sanskrit "can/may" construction (modal + infinitive).',
      'अव्ययस्य and अस्य share षष्ठी एकवचन — षष्ठी-agreement marks the single referent: "of-this imperishable-one".',
    ],
    anvaya:
      'येन सर्वम् इदम् ततम् | तत् तु अविनाशि (इति) विद्धि | अस्य अव्ययस्य विनाशम् कर्तुम् कश्चित् न अर्हति',
    hindi:
      'जिससे यह सम्पूर्ण (जगत्) व्याप्त है, उसको अविनाशी जान। इस अव्यय (आत्मा) का विनाश करने में कोई समर्थ नहीं।',
    english:
      'Know that to be indestructible by which all this is pervaded; no one can bring about the destruction of this imperishable one.',
  },

  '2.18': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अन्तवन्तः',
      'इमे',
      'देहाः',
      'नित्यस्य',
      'उक्ताः',
      'शरीरिणः',
      'अनाशिनः',
      'अप्रमेयस्य',
      'तस्मात्',
      'युध्यस्व',
      'भारत',
    ],
    sandhiNotes: [
      'अन्तवन्त इमे = अन्तवन्तः + इमे (-ः + इ → -अ; visarga lopa before vowel; प्रथमा बहुवचन ending)',
      'देहा नित्यस्योक्ताः = देहाः + नित्यस्य + उक्ताः (-ः + न → -ा; अ + उ → ो)',
      'अनाशिनोऽप्रमेयस्य = अनाशिनः + अप्रमेयस्य (-ः + अ → -ोऽ)',
      'तस्माद्युध्यस्व = तस्मात् + युध्यस्व (त् + य → द्य)',
    ],
    finiteVerbs: [
      { form: 'उक्ताः', root: '√वच्', lakara: null, purusha: null, vachana: null, pada: 'P', gloss: '"have been said/declared" (PPP used predicatively with implicit अस्ति) — not a finite verb proper' }, // AUDIT: PPP with implicit copula
      { form: 'युध्यस्व', root: '√युध्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'A', gloss: '"fight!" (imperative; आत्मनेपद since √युध् is आ-pada)' },
    ],
    vibhaktiNotes: [
      'अन्तवन्तः, इमे, देहाः → प्रथमा बहुवचन — subjects ("these bodies, having an end")',
      'उक्ताः → प्रथमा बहुवचन (PPP) — predicate ("are said-to-be")',
      'नित्यस्य, अनाशिनः, अप्रमेयस्य, शरीरिणः → षष्ठी एकवचन — "of the eternal, indestructible, immeasurable embodied-one"',
      'तस्मात् → indeclinable / पञ्चमी = "therefore"',
      'भारत → सम्बोधन एकवचन',
    ],
    keyFights: [
      'युध्यस्व — the FIRST imperative-to-fight in the Gītā. लोट् of √युध्, आत्मनेपद (the स्व-ending = म-पुरुष एकवचन of आत्मनेपद imperative). Krishna\'s prescriptive turn begins.',
      'A chain of four षष्ठी singulars (नित्यस्य, अनाशिनः, अप्रमेयस्य, शरीरिणः) all agreeing — "of-the-eternal, of-the-indestructible, of-the-immeasurable embodied-one". The षष्ठी-agreement is what holds the descriptive cascade.',
      'The structural opposition: देहाः (प्रथमा बहुवचन — "bodies") vs. शरीरिणः (षष्ठी एकवचन — "of-the-embodied-one"). The bodies end; their owner does not.',
    ],
    anvaya:
      'भारत | नित्यस्य अनाशिनः अप्रमेयस्य शरीरिणः | इमे देहाः अन्तवन्तः उक्ताः | तस्मात् युध्यस्व',
    hindi:
      'हे भारत! नित्य, अविनाशी और अप्रमेय शरीरी (आत्मा) के ये शरीर अन्तवान् कहे गए हैं। इसलिए युद्ध कर।',
    english:
      'These bodies of the eternal, indestructible, immeasurable embodied-one are said to come to an end. Therefore, O Bhārata, fight!',
  },

  '2.19': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'यः',
      'एनम्',
      'वेत्ति',
      'हन्तारम्',
      'यः',
      'च',
      'एनम्',
      'मन्यते',
      'हतम्',
      'उभौ',
      'तौ',
      'न',
      'विजानीतः',
      'न',
      'अयम्',
      'हन्ति',
      'न',
      'हन्यते',
    ],
    sandhiNotes: [
      'य एनम् = यः + एनम् (-ः + ए → -अ; visarga lopa before vowel)',
      'यश्चैनम् = यः + च + एनम् (-ः + च → -श्च; अ + ए → ै)',
      'विजानीतो नायम् = विजानीतः + न + अयम् (-ः + न → -ो; अ + अ → ा)',
    ],
    finiteVerbs: [
      { form: 'वेत्ति', root: '√विद्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"knows / believes (it to be)"' },
      { form: 'मन्यते', root: '√मन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"thinks / considers (it as)"' },
      { form: 'विजानीतः', root: 'वि + √ज्ञा', lakara: 'लट्', purusha: 'प्रथम', vachana: 'द्विवचन', pada: 'P', gloss: '"the two of them know / understand" (negated)' },
      { form: 'हन्ति', root: '√हन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"slays" (negated)' },
      { form: 'हन्यते', root: '√हन् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is slain" (passive, negated)' },
    ],
    vibhaktiNotes: [
      'यः ... यः च → प्रथमा एकवचन (relative, twice) — two competing knowers',
      'एनम् → द्वितीया एकवचन (enclitic of इदम्/एतद्) — object ("him", the आत्मन्)',
      'हन्तारम्, हतम् → द्वितीया एकवचन — predicate-objects ("(as) slayer", "(as) slain")',
      'उभौ तौ → प्रथमा द्विवचन = "those two together" (correlative subject of विजानीतः)',
      'अयम् → प्रथमा एकवचन — subject of हन्ति and हन्यते',
    ],
    keyFights: [
      'Five finite verbs in one verse (a Gītā record). Two relative clauses (यः ... वेत्ति | यः च ... मन्यते) → one main clause (तौ न विजानीतः) → one explanatory clause (न ... हन्ति न ... हन्यते).',
      'विजानीतः is the rare प्रथम-पुरुष द्विवचन of √ज्ञा with वि-: "the two of them do not understand". Spotting -तः as the dual ending is the key.',
      'हन्ति (active) vs. हन्यते (passive) — the same root √हन् in two voices in successive padas: "neither slays nor is slain". The passive marker -य- + आत्मनेपद endings is the spotting cue.',
      'Echoes Kaṭha Upaniṣad 1.2.19 almost verbatim — Krishna quotes śruti.',
    ],
    anvaya:
      'यः एनम् हन्तारम् वेत्ति | यः च एनम् हतम् मन्यते | तौ उभौ न विजानीतः | अयम् न हन्ति, (अयम्) न हन्यते',
    hindi:
      'जो इसको मारनेवाला समझता है, और जो इसको मारा गया मानता है — वे दोनों ही नहीं जानते। न यह (कभी) मारता है, न मारा जाता है।',
    english:
      'He who thinks this (Self) the slayer, and he who thinks it slain — neither of them understands. It neither slays nor is slain.',
  },

  '2.20': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'न',
      'जायते',
      'म्रियते',
      'वा',
      'कदाचित्',
      'न',
      'अयम्',
      'भूत्वा',
      'भविता',
      'वा',
      'न',
      'भूयः',
      'अजः',
      'नित्यः',
      'शाश्वतः',
      'अयम्',
      'पुराणः',
      'न',
      'हन्यते',
      'हन्यमाने',
      'शरीरे',
    ],
    sandhiNotes: [
      'कदाचिन्नायम् = कदाचित् + न + अयम् (त् + न → न्न; अ + अ → ा)',
      'अजो नित्यः = अजः + नित्यः (-ः + न → -ो)',
      'शाश्वतोऽयम् = शाश्वतः + अयम् (-ः + अ → -ोऽ)',
    ],
    finiteVerbs: [
      { form: 'जायते', root: '√जन् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is born" (negated)' },
      { form: 'म्रियते', root: '√मृ', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"dies" (negated)' },
      { form: 'भविता', root: '√भू', lakara: 'लुट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"will (not) come-to-be" (periphrastic future, negated)' }, // AUDIT: लुट् (peripr. future) is rare; -ता ending is the cue
      { form: 'हन्यते', root: '√हन् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is slain" (passive, negated)' },
    ],
    vibhaktiNotes: [
      'अयम् → प्रथमा एकवचन — subject (the आत्मन्), repeated twice',
      'अजः, नित्यः, शाश्वतः, पुराणः → प्रथमा एकवचन — predicate adjectives',
      'कदाचित्, भूयः → indeclinables = "ever, again"',
      'भूत्वा → absolutive of √भू = "having become"',
      'हन्यमाने शरीरे → सप्तमी एकवचन (locative absolute) — passive present participle of √हन् = "the body being slain"',
    ],
    keyFights: [
      'Four negated finite verbs across one verse — न जायते, (न) म्रियते, न भविता, न हन्यते. Each negation maps to one tense/voice axis: birth, death, future-becoming, being-slain. The metrical weight of repeated न is intentional.',
      'भविता is लुट् (periphrastic future, "the one-who-will-be") — the rare lakāra. The -ता ending + standalone use = future. Most translations smooth this to लृट्, but लुट् is the formal lakāra.', // AUDIT: lut vs. lrt
      'हन्यमाने शरीरे — locative absolute (सति-सप्तमी) with passive present participle: "while the body is being slain (the soul is not slain)". The simultaneity is grammatically encoded.',
      'Echoes Kaṭha Upaniṣad 1.2.18 — Krishna paraphrases śruti.',
    ],
    anvaya:
      'अयम् कदाचित् न जायते (न) म्रियते वा | अयम् भूत्वा न भविता | भूयः वा न | अयम् अजः नित्यः शाश्वतः पुराणः | शरीरे हन्यमाने न हन्यते',
    hindi:
      'यह (आत्मा) न कभी जन्मता है, न मरता है। यह न तो (पहले) होकर फिर (न रहनेवाला) है, और न आगे (नया) होगा। यह अज, नित्य, शाश्वत और पुरातन है। शरीर के मारे जाने पर भी यह नहीं मारा जाता।',
    english:
      'It is not born, nor does it ever die; nor having once been will it cease to be again. Unborn, eternal, everlasting, ancient — it is not slain when the body is slain.',
  },

  '2.21': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'वेद',
      'अविनाशिनम्',
      'नित्यम्',
      'यः',
      'एनम्',
      'अजम्',
      'अव्ययम्',
      'कथम्',
      'सः',
      'पुरुषः',
      'पार्थ',
      'कम्',
      'घातयति',
      'हन्ति',
      'कम्',
    ],
    sandhiNotes: [
      'वेदाविनाशिनम् = वेद + अविनाशिनम् (अ + अ → ा)',
      'य एनम् = यः + एनम् (-ः + ए → -अ)',
      'एनमजमव्ययम् = एनम् + अजम् + अव्ययम् (-म् + अ → -म; -म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'वेद', root: '√विद्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"knows" (perfect with present sense — the standard "to know")' },
      { form: 'घातयति', root: '√हन् (causative)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"causes-to-be-slain"' },
      { form: 'हन्ति', root: '√हन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"slays"' },
    ],
    vibhaktiNotes: [
      'अविनाशिनम्, नित्यम्, एनम्, अजम्, अव्ययम् → द्वितीया एकवचन — chain of objects of वेद, all agreeing',
      'यः, सः पुरुषः → प्रथमा एकवचन (relative + correlative) — subject',
      'पार्थ → सम्बोधन एकवचन',
      'कथम् → indeclinable = "how?"',
      'कम् ... कम् → द्वितीया एकवचन (interrogative, twice) — objects of घातयति, हन्ति',
    ],
    keyFights: [
      'Causative-vs-active distinction in one pāda: कम् घातयति ("whom does he cause-to-be-slain") vs. कम् हन्ति ("whom does he slay"). Krishna distinguishes Arjuna\'s two possible roles — the orderer-of-killing (king) and the killer (warrior).',
      'वेद is लिट् (perfect) of √विद् with present sense — "knows" (cf. वेद = "knowledge"). The form looks unmarked but the lakāra is technically perfect.',
      'A chain of four द्वितीया-एकवचन descriptors of एनम् (अविनाशिनम्, नित्यम्, अजम्, अव्ययम्) — द्वितीया-agreement is the binding glue.',
    ],
    anvaya:
      'पार्थ | यः एनम् अविनाशिनम् नित्यम् अजम् अव्ययम् वेद | सः पुरुषः कथम् कम् घातयति | (कथम्) कम् हन्ति',
    hindi:
      'हे पार्थ! जो पुरुष इस (आत्मा) को अविनाशी, नित्य, अजन्मा और अव्यय जानता है — वह कैसे किसको मरवाता है? और कैसे किसको मारता है?',
    english:
      'O Pārtha, the man who knows this (Self) as indestructible, eternal, unborn, and undecaying — how can he slay anyone, or cause anyone to be slain?',
  },

  '2.24': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अच्छेद्यः',
      'अयम्',
      'अदाह्यः',
      'अयम्',
      'अक्लेद्यः',
      'अशोष्यः',
      'एव',
      'च',
      'नित्यः',
      'सर्व-गतः',
      'स्थाणुः',
      'अचलः',
      'अयम्',
      'सनातनः',
    ],
    sandhiNotes: [
      'अच्छेद्योऽयम् = अच्छेद्यः + अयम् (-ः + अ → -ोऽ)',
      'अदाह्योऽयम् = अदाह्यः + अयम् (-ः + अ → -ोऽ)',
      'अक्लेद्योऽशोष्य = अक्लेद्यः + अशोष्यः (-ः + अ → -ोऽ; second visarga before एव → -ः + ए → -अ)',
      'स्थाणुरचलोऽयम् = स्थाणुः + अचलः + अयम् (-ः + अ → -र्; -ः + अ → -ोऽ)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'अच्छेद्यः, अदाह्यः, अक्लेद्यः, अशोष्यः → प्रथमा एकवचन (gerundives with अ-prefix) — predicate adjectives',
      'अयम् (thrice) → प्रथमा एकवचन — subject (the आत्मन्)',
      'नित्यः, सर्वगतः, स्थाणुः, अचलः, सनातनः → प्रथमा एकवचन — predicate adjectives',
    ],
    keyFights: [
      'Pure nominal sentence — no finite verb. Implicit अस्ति. Nine predicate adjectives stack on अयम्.',
      'Four "un-able-to-be-X" gerundives (अच्छेद्य, अदाह्य, अक्लेद्य, अशोष्य): √छिद्/√दह्/√क्लिद्/√शुष् + -य suffix (कृत्य) + neg. अ-. Each maps to one element: cannot be cut (sword), burnt (fire), wet (water), dried (wind).',
      'स्थाणुः अचलः — synonymous pair: "stable, immovable". The metrical doubling is for emphasis.',
    ],
    anvaya:
      'अयम् अच्छेद्यः | अयम् अदाह्यः | अयम् अक्लेद्यः अशोष्यः एव च | अयम् नित्यः सर्वगतः स्थाणुः अचलः सनातनः',
    hindi:
      'यह (आत्मा) न काटा जा सकता है, न जलाया जा सकता है, न भिगोया जा सकता है, न सुखाया जा सकता है; यह नित्य, सर्वव्यापी, स्थिर, अचल और सनातन है।',
    english:
      'This (Self) cannot be cut, cannot be burned, cannot be wetted, nor dried up; eternal, all-pervading, stable, immovable, and everlasting is this.',
  },

  '2.25': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अव्यक्तः',
      'अयम्',
      'अचिन्त्यः',
      'अयम्',
      'अविकार्यः',
      'अयम्',
      'उच्यते',
      'तस्मात्',
      'एवम्',
      'विदित्वा',
      'एनम्',
      'न',
      'अनुशोचितुम्',
      'अर्हसि',
    ],
    sandhiNotes: [
      'अव्यक्तोऽयम् = अव्यक्तः + अयम् (-ः + अ → -ोऽ)',
      'अचिन्त्योऽयम् = अचिन्त्यः + अयम् (-ः + अ → -ोऽ)',
      'अविकार्योऽयमुच्यते = अविकार्यः + अयम् + उच्यते (-ः + अ → -ोऽ; -म् + उ → -मु)',
      'तस्मादेवम् = तस्मात् + एवम् (त् + ए → द्ए)',
      'विदित्वैनम् = विदित्वा + एनम् (आ + ए → ै)',
      'नानुशोचितुमर्हसि = न + अनुशोचितुम् + अर्हसि (अ + अ → ा; -म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'उच्यते', root: '√वच् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is said / is called" (passive)' },
      { form: 'अर्हसि', root: '√अर्ह्', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you ought / are fit" (with infinitive)' },
    ],
    vibhaktiNotes: [
      'अव्यक्तः, अचिन्त्यः, अविकार्यः → प्रथमा एकवचन — predicate adjectives of अयम्',
      'अयम् (thrice) → प्रथमा एकवचन — subject',
      'तस्मात् → indeclinable / पञ्चमी = "therefore"',
      'एवम् → indeclinable = "thus"',
      'विदित्वा → absolutive ("having known")',
      'एनम् → द्वितीया एकवचन — object of विदित्वा',
      'अनुशोचितुम् → infinitive ("to grieve") — complement of अर्हसि (negated)',
    ],
    keyFights: [
      'न अनुशोचितुम् अर्हसि — Krishna\'s recurring formula across 2.25 / 2.26 / 2.27 / 2.30: "you-ought-not to grieve". The infinitive + अर्हसि (with negation) is a polite-prohibition idiom.',
      'Three more "un-X-able" gerundive-like adjectives: अव्यक्त (un-manifest), अचिन्त्य (un-thinkable), अविकार्य (un-modifiable). The अ- + -य pattern stacks across 2.24–2.25.',
      'विदित्वा is the absolutive of √विद् ("having known") — pairs with अर्हसि as the dependent setup: "having-known-thus, you ought not to grieve".',
    ],
    anvaya:
      'अयम् अव्यक्तः | अयम् अचिन्त्यः | अयम् अविकार्यः उच्यते | तस्मात् एनम् एवम् विदित्वा | (त्वम्) न अनुशोचितुम् अर्हसि',
    hindi:
      'यह (आत्मा) अव्यक्त, अचिन्त्य और अविकारी कहा जाता है। इसलिए इसको ऐसा जानकर तुझे शोक करना उचित नहीं।',
    english:
      'This is called unmanifest, unthinkable, unchangeable. Therefore, knowing it as such, you ought not to grieve.',
  },

  '2.26': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अथ',
      'च',
      'एनम्',
      'नित्य-जातम्',
      'नित्यम्',
      'वा',
      'मन्यसे',
      'मृतम्',
      'तथा',
      'अपि',
      'त्वम्',
      'महा-बाहो',
      'न',
      'एवम्',
      'शोचितुम्',
      'अर्हसि',
    ],
    sandhiNotes: [
      'चैनम् = च + एनम् (अ + ए → ै)',
      'तथापि = तथा + अपि (आ + अ → ा)',
      'महाबाहो — सम्बोधन, no junction',
      'नैवम् = न + एवम् (अ + ए → ै)',
      'शोचितुमर्हसि = शोचितुम् + अर्हसि (-म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'मन्यसे', root: '√मन्', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'A', gloss: '"you think / consider"' },
      { form: 'अर्हसि', root: '√अर्ह्', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you ought" (with infinitive, negated)' },
    ],
    vibhaktiNotes: [
      'एनम्, नित्यजातम्, मृतम् → द्वितीया एकवचन — object + predicate-objects of मन्यसे',
      'नित्यम् → adverb / द्वितीया एकवचन = "constantly"',
      'त्वम् → प्रथमा एकवचन — subject',
      'महाबाहो → सम्बोधन एकवचन',
      'शोचितुम् → infinitive — complement of अर्हसि',
    ],
    keyFights: [
      'A concessive structure: अथ च ... मन्यसे ... तथा अपि ... न अर्हसि = "even-if you think... still you-ought-not". Krishna grants the materialist hypothesis for argument\'s sake.',
      'Two predicate-objects (नित्यजातम्, मृतम्) hang on the single object एनम् in द्वितीया-agreement: "(consider) it (as) constantly-born, (as) dead".',
      'Repeats the formula शोचितुम् अर्हसि (negated) — Krishna\'s drumbeat.',
    ],
    anvaya:
      'महाबाहो | अथ च त्वम् एनम् नित्यजातम् नित्यम् वा मृतम् मन्यसे | तथा अपि एवम् शोचितुम् न अर्हसि',
    hindi:
      'और यदि तू इस (आत्मा) को नित्य-जन्मवाला, अथवा नित्य मरनेवाला भी मानता है, तो भी हे महाबाहो, तुझे इस प्रकार शोक करना उचित नहीं।',
    english:
      'And even if you should think it constantly born and constantly dying, even then, mighty-armed one, you ought not to grieve like this.',
  },

  '2.27': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'जातस्य',
      'हि',
      'ध्रुवः',
      'मृत्युः',
      'ध्रुवम्',
      'जन्म',
      'मृतस्य',
      'च',
      'तस्मात्',
      'अपरिहार्ये',
      'अर्थे',
      'न',
      'त्वम्',
      'शोचितुम्',
      'अर्हसि',
    ],
    sandhiNotes: [
      'ध्रुवो मृत्युर्ध्रुवम् = ध्रुवः + मृत्युः + ध्रुवम् (-ः + म → -ो; -ः + ध → -र्)',
      'तस्मादपरिहार्येऽर्थे = तस्मात् + अपरिहार्ये + अर्थे (त् + अ → द्अ; -े + अ → -एऽ)',
    ],
    finiteVerbs: [
      { form: 'अर्हसि', root: '√अर्ह्', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you ought" (with infinitive, negated)' },
    ],
    vibhaktiNotes: [
      'जातस्य, मृतस्य → षष्ठी एकवचन (PPP) = "of-the-born, of-the-dead"',
      'ध्रुवः मृत्युः → प्रथमा एकवचन — predicate ("certain (is) death")',
      'ध्रुवम् जन्म → प्रथमा एकवचन (नपुंसक) — predicate ("certain (is) birth")',
      'तस्मात् → indeclinable / पञ्चमी = "therefore"',
      'अपरिहार्ये अर्थे → सप्तमी एकवचन = "in an unavoidable matter"',
      'त्वम् → प्रथमा एकवचन — subject of अर्हसि',
      'शोचितुम् → infinitive',
    ],
    keyFights: [
      'A perfectly chiastic nominal aphorism: जातस्य ध्रुवः मृत्युः | ध्रुवम् जन्म मृतस्य च = "(For) the born, certain (is) death; (and) certain (is) birth (for) the dead". The षष्ठी-नित्य-pair drives both halves.',
      'अपरिहार्ये अर्थे (सप्तमी) — "in (this) unavoidable matter" — locative of circumstance. The गेरुन्डीve अपरिहार्य ("not-to-be-avoided") is the philosophical hinge.',
      'Third repetition of न शोचितुम् अर्हसि — Krishna\'s anaphoric refrain through 2.25 / 2.26 / 2.27.',
    ],
    anvaya:
      'जातस्य हि ध्रुवः मृत्युः | मृतस्य च ध्रुवम् जन्म | तस्मात् अपरिहार्ये अर्थे त्वम् शोचितुम् न अर्हसि',
    hindi:
      'क्योंकि जो जन्म लेता है उसकी मृत्यु निश्चित है, और जो मरता है उसका जन्म भी निश्चित है। इसलिए इस अपरिहार्य विषय में तुझे शोक करना उचित नहीं।',
    english:
      'For the born, death is certain; and for the dead, birth is certain. Therefore, in a matter that cannot be avoided, you should not grieve.',
  },

  '2.28': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अव्यक्त-आदीनि',
      'भूतानि',
      'व्यक्त-मध्यानि',
      'भारत',
      'अव्यक्त-निधनानि',
      'एव',
      'तत्र',
      'का',
      'परिदेवना',
    ],
    sandhiNotes: [
      'अव्यक्तादीनि = अव्यक्त + आदीनि (अ + आ → ा)',
      'अव्यक्तनिधनान्येव = अव्यक्तनिधनानि + एव (-इ + ए → -ये)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'अव्यक्तादीनि, व्यक्तमध्यानि, अव्यक्तनिधनानि → प्रथमा बहुवचन (नपुंसक) — predicate adjectives, all बहुव्रीहि',
      'भूतानि → प्रथमा बहुवचन (नपुंसक) — subject ("beings")',
      'भारत → सम्बोधन एकवचन',
      'तत्र → indeclinable = "in that case, regarding that"',
      'का → प्रथमा एकवचन (स्त्रीलिंग interrogative)',
      'परिदेवना → प्रथमा एकवचन (स्त्रीलिंग) — subject of implicit अस्ति',
    ],
    keyFights: [
      'Three parallel बहुव्रीहि compounds — (those) whose-beginning-is-unmanifest, whose-middle-is-manifest, whose-end-is-unmanifest. The neuter-plural -आनि agreement chains them all to भूतानि.',
      'A nominal-rhetorical question: का परिदेवना ("what (is) the lamentation?"). The interrogative pronoun + implicit अस्ति is the Sanskrit "why grieve at all?" idiom.',
      'अव्यक्त ... व्यक्त ... अव्यक्त — the chiastic A-B-A frame mirrors the soul\'s appearance-disappearance arc.',
    ],
    anvaya:
      'भारत | भूतानि अव्यक्तादीनि व्यक्तमध्यानि अव्यक्तनिधनानि एव | तत्र का परिदेवना',
    hindi:
      'हे भारत! सभी प्राणी आदि में अव्यक्त, मध्य में व्यक्त और अन्त में अव्यक्त ही (होते) हैं। फिर इसमें (व्यर्थ) शोक क्या?',
    english:
      'Beings are unmanifest in their beginnings, manifest in their middles, and unmanifest again in their ends, O Bhārata. What lamenting (is there) in this?',
  },

  '2.29': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'आश्चर्यवत्',
      'पश्यति',
      'कश्चित्',
      'एनम्',
      'आश्चर्यवत्',
      'वदति',
      'तथा',
      'एव',
      'च',
      'अन्यः',
      'आश्चर्यवत्',
      'च',
      'एनम्',
      'अन्यः',
      'शृणोति',
      'श्रुत्वा',
      'अपि',
      'एनम्',
      'वेद',
      'न',
      'च',
      'एव',
      'कश्चित्',
    ],
    sandhiNotes: [
      'कश्चिदेनम् = कश्चित् + एनम् (त् + ए → द्ए)',
      'तथैव = तथा + एव (आ + ए → ै)',
      'चान्यः = च + अन्यः (अ + अ → ा)',
      'आश्चर्यवच्चैनम् = आश्चर्यवत् + च + एनम् (त् + च → च्च; अ + ए → ै)',
      'श्रुत्वाप्येनम् = श्रुत्वा + अपि + एनम् (आ + अ → ा; -इ + ए → -ये)',
      'चैव = च + एव (अ + ए → ै)',
    ],
    finiteVerbs: [
      { form: 'पश्यति', root: '√दृश्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"sees"' },
      { form: 'वदति', root: '√वद्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"speaks (of it)"' },
      { form: 'शृणोति', root: '√श्रु', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"hears"' },
      { form: 'वेद', root: '√विद्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"knows" (perfect, present sense; negated)' },
    ],
    vibhaktiNotes: [
      'आश्चर्यवत् (thrice) → indeclinable = "as a wonder"',
      'कश्चित् ... अन्यः ... अन्यः ... कश्चित् → प्रथमा एकवचन — successive subjects ("someone... another... another... anyone")',
      'एनम् (four times) → द्वितीया एकवचन — recurring object (the आत्मन्)',
      'श्रुत्वा → absolutive',
      'अपि → indeclinable = "even"',
    ],
    keyFights: [
      'Four finite verbs, four perceptual modes: पश्यति (sees) | वदति (tells) | शृणोति (hears) | वेद (knows). Each sense-channel can register the आत्मन् as wondrous, but knowing it is denied to all.',
      'The repeated एनम् (four times!) is the द्वितीया-glue — it is the same object across all four clauses. Sanskrit\'s topic-tracking via case is on full display.',
      'श्रुत्वा अपि एनम् वेद न च एव कश्चित् — "even having heard, no one really knows" — the absolutive + न च एव is a strong "and yet" rhetorical move.',
    ],
    anvaya:
      'कश्चित् एनम् आश्चर्यवत् पश्यति | अन्यः च तथा एव आश्चर्यवत् वदति | अन्यः च एनम् आश्चर्यवत् शृणोति | श्रुत्वा अपि एनम् कश्चित् न च एव वेद',
    hindi:
      'कोई इसको आश्चर्य की तरह देखता है, कोई आश्चर्य की तरह कहता है, कोई आश्चर्य की तरह सुनता है, और कोई तो सुनकर भी इसको नहीं जान पाता।',
    english:
      'Someone perceives it as a wonder, another speaks of it as a wonder, yet another hears of it as a wonder; and even having heard, no one really knows it.',
  },

  '2.30': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'देही',
      'नित्यम्',
      'अवध्यः',
      'अयम्',
      'देहे',
      'सर्वस्य',
      'भारत',
      'तस्मात्',
      'सर्वाणि',
      'भूतानि',
      'न',
      'त्वम्',
      'शोचितुम्',
      'अर्हसि',
    ],
    sandhiNotes: [
      'नित्यमवध्योऽयम् = नित्यम् + अवध्यः + अयम् (-म् + अ → -म; -ः + अ → -ोऽ)',
      'तस्मात्सर्वाणि = तस्मात् + सर्वाणि (त्-junction)',
      'न त्वं शोचितुमर्हसि = standard chain (-म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'अर्हसि', root: '√अर्ह्', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you ought" (with infinitive, negated)' },
    ],
    vibhaktiNotes: [
      'देही → प्रथमा एकवचन (-इन् stem, drops -न्) = "the embodied-one (Self)"',
      'अयम् → प्रथमा एकवचन — apposition with देही',
      'अवध्यः → प्रथमा एकवचन (gerundive) = "not-to-be-slain" — predicate',
      'नित्यम् → adverb / द्वितीया एकवचन = "always"',
      'देहे → सप्तमी एकवचन = "in the body"',
      'सर्वस्य → षष्ठी एकवचन = "of every (being)"',
      'भारत → सम्बोधन एकवचन',
      'तस्मात् → पञ्चमी / indeclinable',
      'सर्वाणि भूतानि → द्वितीया बहुवचन (नपुंसक) — object of शोचितुम् (= "to grieve over all beings")',
      'त्वम् → प्रथमा एकवचन — subject',
      'शोचितुम् → infinitive',
    ],
    keyFights: [
      'देही ("the embodied-one") is the -इन् stem masc., प्रथमा एकवचन (drops -न्). Distinguish from देहे (body, सप्तमी) — the same Sanskrit phonology, opposite metaphysics. Krishna packs both into one pāda.',
      'अवध्यः is the gerundive (कृत्य) of √वध् with अ-: "not-to-be-killed". The गेरुन्डीve carries the deontic force.',
      'सर्वाणि भूतानि is द्वितीया-of-respect with शोचितुम् — "to-grieve over-all-beings". Final closing of the शोचितुम् अर्हसि formula begun at 2.25.',
    ],
    anvaya:
      'भारत | अयम् देही सर्वस्य देहे नित्यम् अवध्यः | तस्मात् सर्वाणि भूतानि (अधि) त्वम् शोचितुम् न अर्हसि',
    hindi:
      'हे भारत! सबके शरीर में स्थित यह देही (आत्मा) सदा अवध्य है। इसलिए तुझे (किसी भी) प्राणी के लिए शोक करना उचित नहीं।',
    english:
      'This embodied Self is forever indestructible in the body of every being, O Bhārata. Therefore, you ought not to grieve over any beings.',
  },

  '2.31': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'स्व-धर्मम्',
      'अपि',
      'च',
      'अवेक्ष्य',
      'न',
      'विकम्पितुम्',
      'अर्हसि',
      'धर्म्यात्',
      'हि',
      'युद्धात्',
      'श्रेयः',
      'अन्यत्',
      'क्षत्रियस्य',
      'न',
      'विद्यते',
    ],
    sandhiNotes: [
      'स्वधर्ममपि = स्वधर्मम् + अपि (-म् + अ → -म)',
      'चावेक्ष्य = च + अवेक्ष्य (अ + अ → ा)',
      'न विकम्पितुमर्हसि = न + विकम्पितुम् + अर्हसि (-म् + अ → -म)',
      'धर्म्याद्धि = धर्म्यात् + हि (त् + ह → द्ध; voicing + aspirate redistribution)',
      'युद्धाच्छ्रेयोऽन्यत् = युद्धात् + श्रेयः + अन्यत् (त् + श → च्छ; -ः + अ → -ोऽ)',
    ],
    finiteVerbs: [
      { form: 'अर्हसि', root: '√अर्ह्', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you ought" (with infinitive, negated)' },
      { form: 'विद्यते', root: '√विद् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is found / exists" (negated)' },
    ],
    vibhaktiNotes: [
      'स्वधर्मम् → द्वितीया एकवचन — object of अवेक्ष्य',
      'अवेक्ष्य → absolutive ("having considered")',
      'विकम्पितुम् → infinitive ("to waver")',
      'धर्म्यात् युद्धात् → पञ्चमी एकवचन = "than a righteous battle" (ablative-of-comparison)',
      'श्रेयः अन्यत् → प्रथमा एकवचन (नपुंसक) — subject of विद्यते ("anything-better")',
      'क्षत्रियस्य → षष्ठी एकवचन = "for the warrior"',
    ],
    keyFights: [
      'पञ्चमी-of-comparison: धर्म्यात् युद्धात् श्रेयः ... न विद्यते = "(anything) better-than a-righteous-war does-not-exist". The ablative is the standard Sanskrit "than" in comparative clauses.',
      'विकम्पितुम् + अर्हसि (negated) = "you ought not to waver". The infinitive replaces शोचितुम् in this verse — Krishna shifts from "do not grieve" to "do not falter".',
      'स्वधर्मम् ... क्षत्रियस्य — the verse opens with "your-own-duty" and closes with "warrior\'s" — Krishna locks Arjuna into his वर्ण-identity grammatically.',
    ],
    anvaya:
      'स्वधर्मम् अपि च अवेक्ष्य | (त्वम्) विकम्पितुम् न अर्हसि | क्षत्रियस्य धर्म्यात् युद्धात् हि अन्यत् श्रेयः न विद्यते',
    hindi:
      'अपने स्वधर्म को देखकर भी तुझे विचलित होना उचित नहीं। क्षत्रिय के लिए धर्मयुक्त युद्ध से बढ़कर अन्य कोई कल्याणकर वस्तु नहीं है।',
    english:
      'Looking, moreover, to your own duty, you ought not to waver. For nothing better than a battle in accord with dharma exists for a warrior.',
  },

  '2.32': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'यदृच्छया',
      'च',
      'उपपन्नम्',
      'स्वर्ग-द्वारम्',
      'अपावृतम्',
      'सुखिनः',
      'क्षत्रियाः',
      'पार्थ',
      'लभन्ते',
      'युद्धम्',
      'ईदृशम्',
    ],
    sandhiNotes: [
      'चोपपन्नम् = च + उपपन्नम् (अ + उ → ो)',
      'स्वर्गद्वारमपावृतम् = स्वर्गद्वारम् + अपावृतम् (-म् + अ → -म)',
      'युद्धमीदृशम् = युद्धम् + ईदृशम् (-म् + ई → -मी)',
    ],
    finiteVerbs: [
      { form: 'लभन्ते', root: '√लभ्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'A', gloss: '"they obtain"' },
    ],
    vibhaktiNotes: [
      'यदृच्छया → तृतीया एकवचन = "by chance, accidentally"',
      'उपपन्नम्, अपावृतम् → द्वितीया एकवचन (PPP) — agreeing with युद्धम् ईदृशम् ("come-by-itself, opened-up")',
      'स्वर्गद्वारम् → द्वितीया एकवचन (नपुंसक) — apposition with युद्धम् ("(such-a-war is) heaven\'s-door")',
      'सुखिनः क्षत्रियाः → प्रथमा बहुवचन — subject ("happy warriors")',
      'पार्थ → सम्बोधन एकवचन',
      'युद्धम् ईदृशम् → द्वितीया एकवचन — object of लभन्ते ("such a battle")',
    ],
    keyFights: [
      'सुखिनः ("happy") is -इन् stem masc., प्रथमा बहुवचन (drops -न्). The understated word at the verse-front does the work: "(only the) happy warriors get such a war".',
      'अपावृतम् स्वर्गद्वारम् — apposition: "(this battle is) an opened-up door of heaven". The PPP अपावृत of अप + √वृ (to cover/uncover) means "uncovered, opened".',
      'यदृच्छया (तृतीया) — "by chance" — instrumental of manner. Krishna frames the war as a windfall.',
    ],
    anvaya:
      'पार्थ | यदृच्छया च उपपन्नम् अपावृतम् स्वर्गद्वारम् ईदृशम् युद्धम् | सुखिनः क्षत्रियाः लभन्ते',
    hindi:
      'हे पार्थ! जो स्वतः ही (अपने आप) प्राप्त हुआ है, स्वर्ग का खुला हुआ द्वार जैसा है — ऐसा युद्ध सुखी (= भाग्यवान्) क्षत्रियों को ही मिलता है।',
    english:
      'O Pārtha, happy are the warriors who obtain such a battle as this — come of itself, an open gateway to heaven.',
  },

  '2.33': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अथ',
      'चेत्',
      'त्वम्',
      'इमम्',
      'धर्म्यम्',
      'सङ्ग्रामम्',
      'न',
      'करिष्यसि',
      'ततः',
      'स्व-धर्मम्',
      'कीर्तिम्',
      'च',
      'हित्वा',
      'पापम्',
      'अवाप्स्यसि',
    ],
    sandhiNotes: [
      'चेत्त्वम् = चेत् + त्वम् (त्-junction)',
      'त्वमिमं = त्वम् + इमम् (-म् + इ → -मि; -म् + ध → -ं)',
      'पापमवाप्स्यसि = पापम् + अवाप्स्यसि (-म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'करिष्यसि', root: '√कृ', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you will do" (future, negated)' },
      { form: 'अवाप्स्यसि', root: 'अव + √आप्', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you will incur / obtain" (future)' },
    ],
    vibhaktiNotes: [
      'अथ चेत् → indeclinable conditional = "if, however"',
      'त्वम् → प्रथमा एकवचन — subject',
      'इमम् धर्म्यम् सङ्ग्रामम् → द्वितीया एकवचन — object of करिष्यसि',
      'ततः → indeclinable = "then, in that case"',
      'स्वधर्मम्, कीर्तिम् → द्वितीया एकवचन — objects of हित्वा',
      'हित्वा → absolutive of √हा = "having abandoned"',
      'पापम् → द्वितीया एकवचन — object of अवाप्स्यसि',
    ],
    keyFights: [
      'A conditional with two future-tense verbs: अथ चेत् ... करिष्यसि ... अवाप्स्यसि = "if you will-not-do ..., (then) you will-incur ...". The -ष्य- futures (करि-ष्य-सि, अवाप्-स्य-सि) are the spotting cues.',
      'हित्वा (absolutive of √हा "to abandon") is sandwiched between the two futures — the consequence-chain: refuse-to-fight → abandon-स्वधर्म-and-fame → incur-sin.',
      'धर्म्यम् सङ्ग्रामम् ("dharma-aligned battle") + स्वधर्मम् ("own-duty") + पापम् ("sin") — the धर्म-vocabulary saturates the verse.',
    ],
    anvaya:
      'अथ चेत् त्वम् इमम् धर्म्यम् सङ्ग्रामम् न करिष्यसि | ततः स्वधर्मम् कीर्तिम् च हित्वा पापम् अवाप्स्यसि',
    hindi:
      'और यदि तू इस धर्मयुक्त संग्राम को नहीं करेगा, तो स्वधर्म और कीर्ति को छोड़कर पाप को प्राप्त करेगा।',
    english:
      'But if you will not wage this righteous battle, then, having forsaken your own duty and your fame, you will incur sin.',
  },

  '2.34': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अकीर्तिम्',
      'च',
      'अपि',
      'भूतानि',
      'कथयिष्यन्ति',
      'ते',
      'अव्ययाम्',
      'सम्भावितस्य',
      'च',
      'अकीर्तिः',
      'मरणात्',
      'अतिरिच्यते',
    ],
    sandhiNotes: [
      'चापि = च + अपि (अ + अ → ा)',
      'तेऽव्ययाम् = ते + अव्ययाम् (-े + अ → -एऽ)',
      'चाकीर्तिर्मरणात् = च + अकीर्तिः + मरणात् (अ + अ → ा; -ः + म → -र्)',
    ],
    finiteVerbs: [
      { form: 'कथयिष्यन्ति', root: '√कथ् (denominative)', lakara: 'लृट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they will tell / narrate" (future)' },
      { form: 'अतिरिच्यते', root: 'अति + √रिच् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is exceeded by / is worse than" (passive)' },
    ],
    vibhaktiNotes: [
      'अकीर्तिम् अव्ययाम् → द्वितीया एकवचन (स्त्रीलिंग) — object of कथयिष्यन्ति',
      'च अपि → indeclinables ("and even, moreover")',
      'भूतानि → प्रथमा बहुवचन (नपुंसक) — subject of कथयिष्यन्ति',
      'ते → षष्ठी / चतुर्थी एकवचन (enclitic of युष्मद्) = "of you / for you"',
      'सम्भावितस्य → षष्ठी एकवचन (PPP) = "of an honoured-one"',
      'अकीर्तिः → प्रथमा एकवचन (स्त्रीलिंग) — subject of अतिरिच्यते',
      'मरणात् → पञ्चमी एकवचन = "than death" (ablative-of-comparison)',
    ],
    keyFights: [
      'अतिरिच्यते is the passive of अति + √रिच् — "is-exceeded-(in-bad-ness)". The construction X मरणात् अतिरिच्यते = "X is-worse-than-death" / "exceeds death (in pain)". A pure ablative-of-comparison.',
      'अव्ययाम् ("undecaying", -आम् ending = स्त्री द्वितीया) agrees with अकीर्तिम् — "(your) imperishable disgrace". The feminine ending is critical.',
      'सम्भावितस्य ("of one held-in-honour") + अकीर्तिः — Krishna lands the blade: for the honoured man, dishonour is heavier than death.',
    ],
    anvaya:
      'भूतानि च अपि ते अव्ययाम् अकीर्तिम् कथयिष्यन्ति | सम्भावितस्य च अकीर्तिः मरणात् अतिरिच्यते',
    hindi:
      'और लोग तेरी (इस) अमिट अपकीर्ति को कहेंगे; तथा सम्मानित पुरुष के लिए अपकीर्ति मृत्यु से भी अधिक (दुःखद) होती है।',
    english:
      'Moreover, people will recount your unending dishonour; and for one held in honour, dishonour is worse than death.',
  },

  '2.35': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'भयात्',
      'रणात्',
      'उपरतम्',
      'मंस्यन्ते',
      'त्वाम्',
      'महारथाः',
      'येषाम्',
      'च',
      'त्वम्',
      'बहु-मतः',
      'भूत्वा',
      'यास्यसि',
      'लाघवम्',
    ],
    sandhiNotes: [
      'भयाद्रणात् = भयात् + रणात् (त् + र → द्र)',
      'रणादुपरतम् = रणात् + उपरतम् (त् + उ → द्उ)',
      'मंस्यन्ते — direct form, no junction inside',
    ],
    finiteVerbs: [
      { form: 'मंस्यन्ते', root: '√मन्', lakara: 'लृट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'A', gloss: '"they will think / consider" (future, आत्मनेपद)' },
      { form: 'यास्यसि', root: '√या', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you will go (to)" (future)' },
    ],
    vibhaktiNotes: [
      'भयात् → पञ्चमी एकवचन = "from fear" (ablative-of-cause)',
      'रणात् → पञ्चमी एकवचन = "from the battle"',
      'उपरतम् → द्वितीया एकवचन (PPP of उप + √रम्) = "(having) withdrawn"; agrees with त्वाम्',
      'त्वाम् → द्वितीया एकवचन — object of मंस्यन्ते',
      'महारथाः → प्रथमा बहुवचन — subject of मंस्यन्ते',
      'येषाम् → षष्ठी बहुवचन (relative) = "of/in-the-eyes-of whom"',
      'त्वम् → प्रथमा एकवचन — subject of यास्यसि',
      'बहुमतः → प्रथमा एकवचन (PPP) = "(having been) much-respected"',
      'भूत्वा → absolutive of √भू = "having become"',
      'लाघवम् → द्वितीया एकवचन — object of यास्यसि = "into contempt / lightness"',
    ],
    keyFights: [
      'मंस्यन्ते is लृट् of √मन् — आत्मनेपद future (-स्य- infix + -न्ते plural ending). Pairs with the second लृट् यास्यसि.',
      'भयात् रणात् उपरतम् — three पञ्चमी-flavoured words tracking causation: "withdrawn from-the-battle (because) of-fear". The ablative-of-cause is a Gītā-typical reasoning move.',
      'बहुमतः भूत्वा — absolutive-of-prior-state: "having-been-(once)-much-honoured" — the contrastive concessive against लाघवम् ("into lightness/contempt") that follows.',
    ],
    anvaya:
      'महारथाः त्वाम् भयात् रणात् उपरतम् (इति) मंस्यन्ते | येषाम् च त्वम् बहुमतः भूत्वा लाघवम् यास्यसि',
    hindi:
      'महारथी लोग तुझको — डरकर युद्ध से हट गया (समझकर) — मानेंगे। तथा जिनकी दृष्टि में तू बहुत-सम्मानित था, उन्हीं की दृष्टि में तू तुच्छता को प्राप्त होगा।',
    english:
      'The great chariot-warriors will think that you have withdrawn from the battle out of fear; and you will fall into contempt in the eyes of those by whom you were once highly esteemed.',
  },

  '2.36': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'अवाच्य-वादान्',
      'च',
      'बहून्',
      'वदिष्यन्ति',
      'तव',
      'अहिताः',
      'निन्दन्तः',
      'तव',
      'सामर्थ्यम्',
      'ततः',
      'दुःखतरम्',
      'नु',
      'किम्',
    ],
    sandhiNotes: [
      'अवाच्यवादांश्च = अवाच्यवादान् + च (न् + च → ंश्च)',
      'बहून्वदिष्यन्ति = बहून् + वदिष्यन्ति (न्-junction)',
      'तवाहिताः = तव + अहिताः (अ + अ → ा)',
      'निन्दन्तस्तव = निन्दन्तः + तव (-ः + त → -स्त)',
    ],
    finiteVerbs: [
      { form: 'वदिष्यन्ति', root: '√वद्', lakara: 'लृट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they will say / utter" (future)' },
    ],
    vibhaktiNotes: [
      'अवाच्यवादान् बहून् → द्वितीया बहुवचन — object of वदिष्यन्ति ("many unspeakable words")',
      'तव → षष्ठी एकवचन (twice) = "your, of you"',
      'अहिताः → प्रथमा बहुवचन — subject ("your enemies")',
      'निन्दन्तः → प्रथमा बहुवचन (शानच् present participle) = "(while) censuring"',
      'सामर्थ्यम् → द्वितीया एकवचन (नपुंसक) — object of निन्दन्तः',
      'ततः → indeclinable / पञ्चमी = "than that"',
      'दुःखतरम् → प्रथमा एकवचन (नपुंसक comparative) = "more-painful"',
      'नु किम् → indeclinable interrogative phrase = "what (could be)?"',
    ],
    keyFights: [
      'वदिष्यन्ति — third लृट् in the 2.33–2.36 sequence (alongside करिष्यसि, अवाप्स्यसि, मंस्यन्ते, यास्यसि). Krishna piles future-consequence on future-consequence — the लृट् infix -ष्य- saturates this stretch.',
      'दुःखतरम् — comparative degree (-तर) suffix attached to दुःख. ततः ... दुःखतरम् किम् ("what (could be) more-painful than-that?") — the rhetorical climax of the dishonour-argument.',
      'निन्दन्तः (प्रथमा बहुवचन शानच्) modifies the subject (अहिताः) — "(while) blaming your-strength, (your enemies will speak)".',
    ],
    anvaya:
      'तव अहिताः | तव सामर्थ्यम् निन्दन्तः | अवाच्यवादान् च बहून् वदिष्यन्ति | ततः नु दुःखतरम् किम्',
    hindi:
      'तेरे शत्रु तेरी सामर्थ्य की निन्दा करते हुए तेरे विषय में बहुत-से न कहने योग्य कटु वचन कहेंगे। उससे (बढ़कर) अधिक दुःखद और क्या होगा?',
    english:
      'And your enemies, vilifying your strength, will utter many unspeakable words. What greater pain than that could there be?',
  },

  '2.37': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'हतः',
      'वा',
      'प्राप्स्यसि',
      'स्वर्गम्',
      'जित्वा',
      'वा',
      'भोक्ष्यसे',
      'महीम्',
      'तस्मात्',
      'उत्तिष्ठ',
      'कौन्तेय',
      'युद्धाय',
      'कृत-निश्चयः',
    ],
    sandhiNotes: [
      'हतो वा = हतः + वा (-ः + व → -ो)',
      'तस्मादुत्तिष्ठ = तस्मात् + उत्तिष्ठ (त् + उ → द्उ)',
    ],
    finiteVerbs: [
      { form: 'प्राप्स्यसि', root: 'प्र + √आप्', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you will obtain" (future)' },
      { form: 'भोक्ष्यसे', root: '√भुज्', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'A', gloss: '"you will enjoy" (future, आत्मनेपद)' },
      { form: 'उत्तिष्ठ', root: 'उत् + √स्था', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"rise up!" (imperative — echoes 2.3)' },
    ],
    vibhaktiNotes: [
      'हतः → प्रथमा एकवचन (PPP) — predicate adjective on Arjuna ("(if) slain")',
      'जित्वा → absolutive of √जि = "having conquered"',
      'स्वर्गम्, महीम् → द्वितीया एकवचन — objects of प्राप्स्यसि / भोक्ष्यसे',
      'तस्मात् → indeclinable / पञ्चमी = "therefore"',
      'कौन्तेय → सम्बोधन एकवचन',
      'युद्धाय → चतुर्थी एकवचन = "for battle" (purpose-dative)',
      'कृतनिश्चयः → प्रथमा एकवचन (बहुव्रीहि) = "(having) determination-made" = "with mind made up"',
    ],
    keyFights: [
      'A perfect either-or with two लृट् verbs: हतः वा प्राप्स्यसि स्वर्गम् | जित्वा वा भोक्ष्यसे महीम् = "either slain — you-will-attain heaven; or, having-conquered — you-will-enjoy the-earth". The vā ... vā parallelism is the rhetorical clinch.',
      'उत्तिष्ठ — the लोट् of उत् + √स्था — directly echoes Gita 2.3\'s त्यक्त्वोत्तिष्ठ. Krishna closes the loop: the same imperative re-issued after 35 verses of argument.',
      'युद्धाय (चतुर्थी) — purpose-dative: "for-the-purpose-of-battle". Standard Sanskrit goal-marking.',
      'कृतनिश्चयः — बहुव्रीहि: "(one) by-whom-determination-has-been-made". The कृत-X compound type is a Sanskrit workhorse.',
    ],
    anvaya:
      'कौन्तेय | (त्वम्) हतः वा स्वर्गम् प्राप्स्यसि | जित्वा वा महीम् भोक्ष्यसे | तस्मात् कृतनिश्चयः युद्धाय उत्तिष्ठ',
    hindi:
      'हे कौन्तेय! या तो मारा जाकर तू स्वर्ग को प्राप्त करेगा, या जीतकर पृथ्वी का भोग करेगा। इसलिए निश्चय करके युद्ध के लिए उठ खड़ा हो।',
    english:
      'Either, slain, you will attain heaven; or, victorious, you will enjoy the earth. Therefore, O son of Kuntī, with mind resolved, stand up to fight!',
  },

  '2.38': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'सुख-दुःखे',
      'समे',
      'कृत्वा',
      'लाभ-अलाभौ',
      'जय-अजयौ',
      'ततः',
      'युद्धाय',
      'युज्यस्व',
      'न',
      'एवम्',
      'पापम्',
      'अवाप्स्यसि',
    ],
    sandhiNotes: [
      'लाभालाभौ = लाभ + अलाभौ (अ + अ → ा)',
      'जयाजयौ = जय + अजयौ (अ + अ → ा)',
      'नैवम् = न + एवम् (अ + ए → ै)',
      'पापमवाप्स्यसि = पापम् + अवाप्स्यसि (-म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'युज्यस्व', root: '√युज्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'A', gloss: '"engage yourself! ready yourself!" (आत्मनेपद imperative)' },
      { form: 'अवाप्स्यसि', root: 'अव + √आप्', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you will incur" (future, negated)' },
    ],
    vibhaktiNotes: [
      'सुखदुःखे → द्वितीया द्विवचन (नपुंसक) — द्वन्द्व compound, "pleasure-and-pain"',
      'समे → द्वितीया द्विवचन — predicate adjective on सुखदुःखे',
      'कृत्वा → absolutive of √कृ = "having made"',
      'लाभालाभौ, जयाजयौ → द्वितीया द्विवचन (पुल्लिंग) — द्वन्द्व compounds, more objects of कृत्वा',
      'ततः → indeclinable = "then, thereafter"',
      'युद्धाय → चतुर्थी एकवचन (purpose-dative)',
      'पापम् → द्वितीया एकवचन — object of अवाप्स्यसि',
    ],
    keyFights: [
      'Three द्वन्द्व-pairs in द्विवचन (the dual-number is the d.) gleam together: सुखदुःखे, लाभालाभौ, जयाजयौ — pleasure-pain, gain-loss, victory-defeat. Krishna\'s "equanimity-triplet" gets its first formal grammatical airing here.',
      'समे कृत्वा — "having-made-equal". The construction X समे कृत्वा = "treating X as equal" — कृत्वा (absolutive of √कृ) + द्वितीया-predicate is the standard "making-X-into-Y" idiom.',
      'युज्यस्व is आत्मनेपद imperative of √युज् ("yoke"); takes चतुर्थी for the activity engaged-in. The form is the Gītā\'s key verb — "engage yourself in yoga".',
      'न एवम् पापम् अवाप्स्यसि — directly answers 2.33\'s threat: there, "you-will-incur sin"; here, "you-will-not-incur sin (by fighting in this spirit)".',
    ],
    anvaya:
      'सुखदुःखे समे कृत्वा | लाभालाभौ जयाजयौ (समौ कृत्वा) | ततः युद्धाय युज्यस्व | एवम् पापम् न अवाप्स्यसि',
    hindi:
      'सुख-दुःख, लाभ-हानि, और जय-पराजय को समान मानकर — फिर युद्ध के लिए तैयार हो जा। इस प्रकार करने से तू पाप को नहीं प्राप्त होगा।',
    english:
      'Treating pleasure and pain, gain and loss, victory and defeat as equal, then prepare yourself for battle — thus you will not incur sin.',
  },

  '2.39': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'एषा',
      'ते',
      'अभिहिता',
      'साङ्ख्ये',
      'बुद्धिः',
      'योगे',
      'तु',
      'इमाम्',
      'शृणु',
      'बुद्ध्या',
      'युक्तः',
      'यया',
      'पार्थ',
      'कर्म-बन्धम्',
      'प्रहास्यसि',
    ],
    sandhiNotes: [
      'तेऽभिहिता = ते + अभिहिता (-े + अ → -एऽ)',
      'योगे त्विमाम् = योगे + तु + इमाम् (-उ + इ → -व्)',
      'बुद्धिर्योगे = बुद्धिः + योगे (-ः + य → -र्)',
    ],
    finiteVerbs: [
      { form: 'अभिहिता', root: 'अभि + √धा', lakara: null, purusha: null, vachana: null, pada: 'P', gloss: '"has been declared" (PPP used predicatively with implicit अस्ति) — not a finite verb proper' }, // AUDIT: PPP-as-predicate
      { form: 'शृणु', root: '√श्रु', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"hear! listen!" (imperative)' },
      { form: 'प्रहास्यसि', root: 'प्र + √हा', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you will abandon" (future)' },
    ],
    vibhaktiNotes: [
      'एषा बुद्धिः → प्रथमा एकवचन (स्त्रीलिंग) — subject ("this understanding")',
      'ते → षष्ठी एकवचन (enclitic) = "to you"',
      'अभिहिता → प्रथमा एकवचन (PPP स्त्री) — agrees with बुद्धिः',
      'साङ्ख्ये, योगे → सप्तमी एकवचन = "in (the) Sāṅkhya, in (the) Yoga"',
      'इमाम् → द्वितीया एकवचन (स्त्री) — object of शृणु ("hear THIS one")',
      'बुद्ध्या → तृतीया एकवचन = "by/with (this) understanding"',
      'युक्तः → प्रथमा एकवचन (PPP) — predicate adj. of (implicit) त्वम् = "(being) yoked, equipped"',
      'यया → तृतीया एकवचन (relative) = "by which" — refers back to बुद्ध्या',
      'पार्थ → सम्बोधन एकवचन',
      'कर्मबन्धम् → द्वितीया एकवचन — object of प्रहास्यसि',
    ],
    keyFights: [
      'The pivot-verse of Chapter 2: साङ्ख्ये बुद्धिः (already given) → योगे (now to come). The सप्तमी-pair साङ्ख्ये / योगे frames the two-stage doctrine.',
      'बुद्ध्या युक्तः ... यया — relative-correlative with तृतीया: "yoked WITH-(that)-understanding by-which (you-will-cast-off karma-bondage)". The तृतीया is instrumental-of-means.',
      'प्रहास्यसि (लृट् of प्र + √हा) — "(you-)will-cast-off". The future indicates the Yoga-path\'s coming benefit.',
      'अभिहिता (PPP) is feminine because it agrees with बुद्धिः (स्त्री); the -ता ending + visarga-less feminine declension = the spotting cue.',
    ],
    anvaya:
      'पार्थ | एषा साङ्ख्ये बुद्धिः ते अभिहिता | योगे तु इमाम् शृणु | यया बुद्ध्या युक्तः कर्मबन्धम् प्रहास्यसि',
    hindi:
      'हे पार्थ! यह बुद्धि (तत्त्व-ज्ञान) तुझसे साङ्ख्य के विषय में कही गई। अब (कर्म-)योग के विषय में इसको सुन — जिस बुद्धि से युक्त होकर तू कर्म-बन्ध से छूट जाएगा।',
    english:
      'This understanding has been declared to you according to Sāṅkhya; now hear of it according to Yoga, equipped with which understanding, O Pārtha, you will cast off the bondage of action.',
  },

  '2.40': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'न',
      'इह',
      'अभिक्रम-नाशः',
      'अस्ति',
      'प्रत्यवायः',
      'न',
      'विद्यते',
      'सु-अल्पम्',
      'अपि',
      'अस्य',
      'धर्मस्य',
      'त्रायते',
      'महतः',
      'भयात्',
    ],
    sandhiNotes: [
      'नेहाभिक्रमनाशोऽस्ति = न + इह + अभिक्रमनाशः + अस्ति (अ + इ → े; अ + अ → ा; -ः + अ → -ोऽ)',
      'स्वल्पमप्यस्य = स्वल्पम् + अपि + अस्य (-म् + अ → -म; -इ + अ → -य्)',
    ],
    finiteVerbs: [
      { form: 'अस्ति', root: '√अस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"is / exists" (negated)' },
      { form: 'विद्यते', root: '√विद् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is found / exists" (negated)' },
      { form: 'त्रायते', root: '√त्रै', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"protects, saves"' },
    ],
    vibhaktiNotes: [
      'इह → indeclinable = "here (in this Yoga)"',
      'अभिक्रमनाशः → प्रथमा एकवचन — subject ("loss-of-effort")',
      'प्रत्यवायः → प्रथमा एकवचन — subject ("reverse-effect, demerit")',
      'स्वल्पम् → प्रथमा एकवचन (नपुंसक) — subject of त्रायते ("(even) a-very-little")',
      'अस्य धर्मस्य → षष्ठी एकवचन = "of this dharma"',
      'महतः भयात् → पञ्चमी एकवचन = "from great fear/danger"',
    ],
    keyFights: [
      'A famous double-negative opening: न इह अभिक्रमनाशः अस्ति | प्रत्यवायः न विद्यते = "in this (yoga) there is no loss-of-effort; (no) reverse-effect either". The two negated existentials are the structural pillars.',
      'अभिक्रमनाशः is a तत्पुरुष: "destruction-of-undertaking" = "wasted effort". A lexicalized term in Yoga discourse.',
      'त्रायते महतः भयात् — verb + पञ्चमी-of-source/cause: "protects from great fear". The ablative is standard for the source-of-protection.',
      'स्वल्पम् अपि अस्य धर्मस्य — षष्ठी attached to धर्मस्य: "(even-a-little) OF-this-dharma". The षष्ठी-partitive is the structural detail beginners miss.',
    ],
    anvaya:
      'इह अभिक्रमनाशः न अस्ति | प्रत्यवायः न विद्यते | अस्य धर्मस्य स्वल्पम् अपि महतः भयात् त्रायते',
    hindi:
      'इस (कर्मयोग) में आरम्भ का नाश नहीं है, और न ही (विपरीत) दोष है। इस धर्म का थोड़ा-सा भी (पालन) महान् भय से रक्षा करता है।',
    english:
      'In this (Yoga), no effort is lost, nor is any contrary effect produced. Even a little of this dharma protects (one) from great fear.',
  },

  '2.41': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'व्यवसाय-आत्मिका',
      'बुद्धिः',
      'एका',
      'इह',
      'कुरु-नन्दन',
      'बहु-शाखाः',
      'हि',
      'अनन्ताः',
      'च',
      'बुद्धयः',
      'अव्यवसायिनाम्',
    ],
    sandhiNotes: [
      'व्यवसायात्मिका = व्यवसाय + आत्मिका (अ + आ → ा)',
      'बुद्धिरेकेह = बुद्धिः + एका + इह (-ः + ए → -र्; आ + इ → े)',
      'बहुशाखा ह्यनन्ताश्च = बहुशाखाः + हि + अनन्ताः + च (-ः + ह → -ा; visarga lopa; -ः + अ → -ा with hi-junction; -ः + च → -श्च)', // AUDIT: bahuśākhā hi reading; metrical
      'बुद्धयोऽव्यवसायिनाम् = बुद्धयः + अव्यवसायिनाम् (-ः + अ → -ोऽ)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'व्यवसायात्मिका → प्रथमा एकवचन (स्त्री) = "(having) determination-as-its-essence" (बहुव्रीहि)',
      'बुद्धिः → प्रथमा एकवचन — subject',
      'एका → प्रथमा एकवचन (स्त्री) — predicate ("(is) one")',
      'इह → indeclinable',
      'कुरुनन्दन → सम्बोधन एकवचन',
      'बहुशाखाः, अनन्ताः → प्रथमा बहुवचन — predicate adjectives',
      'बुद्धयः → प्रथमा बहुवचन — subject',
      'अव्यवसायिनाम् → षष्ठी बहुवचन = "of the un-resolute" (-इन् stem genitive plural)',
    ],
    keyFights: [
      'A pure nominal antithesis: एका बुद्धिः (singular, of-the-resolute) vs. अनन्ताः बुद्धयः (plural, of-the-irresolute). The एका / अनन्ताः contrast is grammatically the ultimate one — singular vs. infinite-plural.',
      'व्यवसायात्मिका is a feminine बहुव्रीहि (-आत्मिका = "having-as-its-essence"). The -आत्मक/-आत्मिका is a Sanskrit workhorse for "consisting of, characterized by".',
      'अव्यवसायिनाम् — षष्ठी बहुवचन of the -इन् stem; the -आम् ending after -इन is the Pāṇinian regular form (cf. योगिनाम्, मनीषिणाम्).',
    ],
    anvaya:
      'कुरुनन्दन | इह व्यवसायात्मिका बुद्धिः एका | अव्यवसायिनाम् बुद्धयः बहुशाखाः अनन्ताः च हि',
    hindi:
      'हे कुरुनन्दन! इस (कर्मयोग) में निश्चयात्मिका बुद्धि एक ही होती है। (किन्तु) अनिश्चय-वालों की बुद्धियाँ बहु-शाखाओं वाली और अनन्त होती हैं।',
    english:
      'Here, O joy of the Kurus, the determined understanding is one; the understandings of the irresolute are many-branched and endless.',
  },

  '2.42': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'याम्',
      'इमाम्',
      'पुष्पिताम्',
      'वाचम्',
      'प्रवदन्ति',
      'अविपश्चितः',
      'वेद-वाद-रताः',
      'पार्थ',
      'न',
      'अन्यत्',
      'अस्ति',
      'इति',
      'वादिनः',
    ],
    sandhiNotes: [
      'यामिमां = याम् + इमाम् (-म् + इ → -मि; -म् + प → -ं)',
      'प्रवदन्त्यविपश्चितः = प्रवदन्ति + अविपश्चितः (-इ + अ → -य्)',
      'नान्यदस्ति = न + अन्यत् + अस्ति (अ + अ → ा; त् + अ → द्अ)',
    ],
    finiteVerbs: [
      { form: 'प्रवदन्ति', root: 'प्र + √वद्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they utter / proclaim"' },
      { form: 'अस्ति', root: '√अस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"is, exists" — embedded inside the इति-quotation, negated' },
    ],
    vibhaktiNotes: [
      'याम् इमाम् पुष्पिताम् वाचम् → द्वितीया एकवचन (स्त्री) — object of प्रवदन्ति',
      'अविपश्चितः → प्रथमा बहुवचन (s-stem!) = "the unwise / unlearned" — subject of प्रवदन्ति', // AUDIT: अविपश्चित् is -त् stem; nom.pl. = -तः
      'वेदवादरताः → प्रथमा बहुवचन (PPP) = "(those) attached-to-veda-utterances"',
      'पार्थ → सम्बोधन एकवचन',
      'न अन्यत् अस्ति इति वादिनः → "(those) saying \'nothing-else exists\'" — वादिनः प्रथमा बहुवचन (-इन् stem)',
      'इति → quotation marker',
    ],
    keyFights: [
      'A self-contained quotation: न अन्यत् अस्ति इति वादिनः = "(those) saying \'there is nothing else\'". The इति is the grammatical glue that turns the embedded sentence (with अस्ति) into the object-content of "saying".',
      'पुष्पिताम् वाचम् ("flowery speech") — पुष्पिता is the PPP of the denominative पुष्पय "to flower". Krishna\'s scornful adjective for ritualistic Vedic-utterance.',
      'अविपश्चितः and वादिनः are both प्रथमा बहुवचन but from different stem-types: अविपश्चित् is a -त् stem (its nominative-plural ends -तः with no further change), वादिन् is -इन् (drops -न्). The agreement is ad sensum — both subjects of the same proclamation.',
    ],
    anvaya:
      'पार्थ | अविपश्चितः वेदवादरताः | "न अन्यत् अस्ति" इति वादिनः | याम् इमाम् पुष्पिताम् वाचम् प्रवदन्ति',
    hindi:
      'हे पार्थ! अविवेकी, वेद-वाणी में आसक्त, और "(स्वर्ग के अतिरिक्त) कुछ और नहीं है" ऐसा कहनेवाले — जो (लोग) इस पुष्पिता (दिखावटी) वाणी को बोलते हैं —',
    english:
      'O Pārtha, the unwise, attached to the words of the Veda, declaring "there is nothing else" — they speak this flowery speech...',
  },

  '2.43': {
    speaker: 'श्रीभगवानुवाच',
    anuvrtti: { from: '2.42', verb: 'प्रवदन्ति', meaning: 'they declare / utter (the flowery speech)', note: 'एक-वाक्यता with 2.42 — Krishna\'s critique of the Vedist ritualists spans 2.42-2.43 as one syntactic unit. The द्वितीया-singular feminine adjectives (जन्मकर्मफलप्रदाम् etc.) all qualify वाचम् from 2.42, governed by प्रवदन्ति.' },
    padaccheda: [
      'काम-आत्मानः',
      'स्वर्ग-पराः',
      'जन्म-कर्म-फल-प्रदाम्',
      'क्रिया-विशेष-बहुलाम्',
      'भोग-ऐश्वर्य-गतिम्',
      'प्रति',
    ],
    sandhiNotes: [
      'कामात्मानः = काम + आत्मानः (अ + आ → ा)',
      'भोगैश्वर्यगतिम् = भोग + ऐश्वर्य + गतिम् (अ + ऐ → ै)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'कामात्मानः → प्रथमा बहुवचन — predicate-apposition with the subjects of 2.42 ("(they being) desire-souled")',
      'स्वर्गपराः → प्रथमा बहुवचन (बहुव्रीहि) = "(those) intent-on-heaven"',
      'जन्मकर्मफलप्रदाम्, क्रियाविशेषबहुलाम् → द्वितीया एकवचन (स्त्री) — agreeing with वाचम् (from 2.42)',
      'भोगैश्वर्यगतिम् → द्वितीया एकवचन — object of प्रति',
      'प्रति → indeclinable / postposition (governs द्वितीया) = "towards, with respect to"',
    ],
    keyFights: [
      'This verse is grammatically dependent on 2.42 — it has no finite verb of its own. The द्वितीया-singular feminine adjectives (जन्मकर्मफलप्रदाम् etc.) all agree with वाचम् in 2.42.',
      'A heavily-compounded तत्पुरुष cluster: जन्म-कर्म-फल-प्रदाम् ("(speech) which-bestows the-fruits-of-actions-(leading-to)-rebirth"). The compounding-density is Krishna\'s rhetorical mimicry of the Vedist style he criticizes.',
      'भोगैश्वर्यगतिम् प्रति — द्वितीया governed by प्रति: "directed-towards (the goal-of) enjoyment-and-power". प्रति is the standard Sanskrit "towards/regarding" postposition.',
    ],
    anvaya:
      '(2.42 continued) | कामात्मानः स्वर्गपराः | जन्मकर्मफलप्रदाम् क्रियाविशेषबहुलाम् भोगैश्वर्यगतिम् प्रति | (पुष्पिताम् वाचम् प्रवदन्ति)',
    hindi:
      '(वे लोग) कामनाओं से भरे हुए, स्वर्ग को ही श्रेष्ठ माननेवाले — जन्म और कर्म-फल देनेवाली, अनेक प्रकार की क्रियाओं से भरी हुई, भोग और ऐश्वर्य की गति की ओर ले जानेवाली (वाणी कहते हैं)।',
    english:
      'Full of desires, holding heaven as the highest goal, (they declare a speech) — productive of fruits-of-action-leading-to-rebirth, abounding in elaborate rites, directed toward the attainment of enjoyment and lordship.',
  },

  '2.44': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'भोग-ऐश्वर्य-प्रसक्तानाम्',
      'तया',
      'अपहृत-चेतसाम्',
      'व्यवसाय-आत्मिका',
      'बुद्धिः',
      'समाधौ',
      'न',
      'विधीयते',
    ],
    sandhiNotes: [
      'भोगैश्वर्यप्रसक्तानाम् = भोग + ऐश्वर्य + प्रसक्तानाम् (अ + ऐ → ै)',
      'तयापहृतचेतसाम् = तया + अपहृत + चेतसाम् (आ + अ → ा)',
      'व्यवसायात्मिका = व्यवसाय + आत्मिका (अ + आ → ा)',
    ],
    finiteVerbs: [
      { form: 'विधीयते', root: 'वि + √धा (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is established / is fixed" (passive, negated)' },
    ],
    vibhaktiNotes: [
      'भोगैश्वर्यप्रसक्तानाम् → षष्ठी बहुवचन (PPP) = "of (those) attached-to-pleasure-and-power"',
      'तया → तृतीया एकवचन (स्त्री) = "by that (speech)"',
      'अपहृतचेतसाम् → षष्ठी बहुवचन (बहुव्रीहि) = "(of those) whose-mind-has-been-stolen-away"',
      'व्यवसायात्मिका बुद्धिः → प्रथमा एकवचन (स्त्री) — subject',
      'समाधौ → सप्तमी एकवचन = "in (the) समाधि (concentration)"',
    ],
    keyFights: [
      'विधीयते is the passive of वि + √धा — "is-established / is-prescribed". The -ी- (long vowel marker of passive) + -य- + आत्मनेपद ending = unmistakable passive of -धा-class roots.',
      'Two षष्ठी बहुवचन groups (भोगैश्वर्यप्रसक्तानाम् + अपहृतचेतसाम्) frame the verse — "of the attached, of the mind-stolen". The षष्ठी-of-disadvantage: "the determined-buddhi is not established FOR (such people)".',
      'समाधौ (सप्तमी) — locative of state: "in (the state of) concentration". Krishna ties बुद्धि to समाधि — they need each other.',
    ],
    anvaya:
      'भोगैश्वर्यप्रसक्तानाम् तया अपहृतचेतसाम् | व्यवसायात्मिका बुद्धिः समाधौ न विधीयते',
    hindi:
      'भोग और ऐश्वर्य में आसक्त — और उस (वाणी) से जिनके चित्त हर लिए गए हैं, ऐसे लोगों की निश्चयात्मिका बुद्धि समाधि में स्थिर नहीं होती।',
    english:
      'For those attached to enjoyment and lordship, whose minds have been carried away by that (speech), the determined understanding is not established in concentration.',
  },

  '2.45': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'त्रै-गुण्य-विषयाः',
      'वेदाः',
      'निस्त्रैगुण्यः',
      'भव',
      'अर्जुन',
      'निर्द्वन्द्वः',
      'नित्य-सत्त्व-स्थः',
      'निर्योग-क्षेमः',
      'आत्मवान्',
    ],
    sandhiNotes: [
      'निस्त्रैगुण्यो भवार्जुन = निस्त्रैगुण्यः + भव + अर्जुन (-ः + भ → -ो; अ + अ → ा)',
      'निर्द्वन्द्वो नित्यसत्त्वस्थो = निर्द्वन्द्वः + नित्यसत्त्वस्थः (-ः + न → -ो twice in chain)',
      'निर्योगक्षेम आत्मवान् = निर्योगक्षेमः + आत्मवान् (-ः + आ → -अ; visarga lopa)',
    ],
    finiteVerbs: [
      { form: 'भव', root: '√भू', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"be! become!" (imperative)' },
    ],
    vibhaktiNotes: [
      'त्रैगुण्यविषयाः → प्रथमा बहुवचन (बहुव्रीहि) = "(those) whose-domain-is-the-three-guṇas"',
      'वेदाः → प्रथमा बहुवचन — subject of implicit अस्ति',
      'निस्त्रैगुण्यः, निर्द्वन्द्वः, नित्यसत्त्वस्थः, निर्योगक्षेमः, आत्मवान् → प्रथमा एकवचन — predicate adjectives, all addressed to Arjuna',
      'अर्जुन → सम्बोधन एकवचन',
    ],
    keyFights: [
      'भव — a single लोट् drives the entire imperative-cascade. Krishna issues five "be-X!" descriptors that all hang on this one short verb.',
      'Four नि-र्/नि-स्-prefixed बहुव्रीहि: निस्त्रैगुण्यः (without-the-three-guṇas), निर्द्वन्द्वः (without-pairs-of-opposites), निर्योगक्षेमः (without-acquisition-and-preservation), आत्मवान् (with-the-Self). The negative प्रिविटिवे चा prefix is the structural marker.',
      'त्रैगुण्यविषयाः वेदाः — the audacious claim: "the Vedas operate within the three-guṇas (= phenomenal world)". Krishna acknowledges the limit of the Vedas\' applicability before pushing past them.',
      'नित्यसत्त्वस्थः — कर्मधारय: "always-(in)-sattva-abiding". A pivot from negation (निर्-X) to positive prescription.',
    ],
    anvaya:
      'अर्जुन | वेदाः त्रैगुण्यविषयाः | (त्वम्) निस्त्रैगुण्यः निर्द्वन्द्वः नित्यसत्त्वस्थः निर्योगक्षेमः आत्मवान् भव',
    hindi:
      'हे अर्जुन! वेद त्रिगुणात्मक विषयों के बारे में हैं। तू त्रिगुणों से अतीत हो; द्वन्द्वों से रहित हो; नित्य सत्त्व में स्थित हो; योग-क्षेम की चिन्ता से रहित हो; और आत्मवान् बन।',
    english:
      'The Vedas have the three-guṇas as their domain. Be, O Arjuna, beyond the three guṇas, free from the pairs of opposites, ever abiding in sattva, free from anxiety about acquisition and preservation, and possessed of the Self.',
  },

  '2.46': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'यावान्',
      'अर्थः',
      'उदपाने',
      'सर्वतः',
      'सम्प्लुत-उदके',
      'तावान्',
      'सर्वेषु',
      'वेदेषु',
      'ब्राह्मणस्य',
      'विजानतः',
    ],
    sandhiNotes: [
      'यावानर्थ = यावान् + अर्थः (न्-junction; -ः + उ → -अ; visarga lopa before vowel)',
      'उदपाने सर्वतः सम्प्लुतोदके = उदपाने + सर्वतः + सम्प्लुतोदके (no internal merge)',
      'सम्प्लुतोदके = सम्प्लुत + उदके (अ + उ → ो)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'यावान्, तावान् → प्रथमा एकवचन (correlative quantifier-pair) = "as-much-as ... so-much"',
      'अर्थः → प्रथमा एकवचन — subject ("purpose / utility")',
      'उदपाने → सप्तमी एकवचन = "in a (small) water-tank"',
      'सर्वतः → indeclinable = "on all sides"',
      'सम्प्लुतोदके → सप्तमी एकवचन (बहुव्रीहि) = "(in that) whose-water-is-flooded-(everywhere)" = "in a great-flood-of-water"',
      'सर्वेषु वेदेषु → सप्तमी बहुवचन = "in all the Vedas"',
      'ब्राह्मणस्य विजानतः → षष्ठी एकवचन (-त् stem) = "of a knowing-Brahmaṇa"',
    ],
    keyFights: [
      'A famous उपमा-aphorism. Pure nominal sentence — no finite verb; the यावान् ... तावान् correlative + implicit अस्ति carries the comparison.',
      'सम्प्लुतोदके is a बहुव्रीहि सप्तमी: "(in) one whose-water-is-everywhere-flooded" = "in a flood-of-water". The compound\'s saptamī ending gives away its locative role.',
      'विजानतः — षष्ठी एकवचन of the शानच् present participle (-त् stem) of वि + √ज्ञा. The षष्ठी links it to ब्राह्मणस्य as a single referent: "of a knowing-brahmin".',
    ],
    anvaya:
      'सर्वतः सम्प्लुतोदके (सति) उदपाने यावान् अर्थः | (तावान्) विजानतः ब्राह्मणस्य सर्वेषु वेदेषु तावान् (अर्थः)',
    hindi:
      'जब चारों ओर जलप्लावन हो जाए, तब छोटे जलाशय (कुएँ-तालाब) में जितना प्रयोजन रह जाता है — उतना ही प्रयोजन तत्त्वज्ञानी ब्राह्मण के लिए सब वेदों में रहता है।',
    english:
      'As much purpose as remains in a small water-tank when there is a flood of water on every side — just so much (purpose) is there in all the Vedas for a Brāhmaṇa who knows.',
  },

  '2.49': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'दूरेण',
      'हि',
      'अवरम्',
      'कर्म',
      'बुद्धि-योगात्',
      'धनञ्जय',
      'बुद्धौ',
      'शरणम्',
      'अन्विच्छ',
      'कृपणाः',
      'फल-हेतवः',
    ],
    sandhiNotes: [
      'दूरेण ह्यवरम् = दूरेण + हि + अवरम् (-इ + अ → -य्)',
      'बुद्धियोगाद्धनञ्जय = बुद्धियोगात् + धनञ्जय (त् + ध → द्ध)',
      'शरणमन्विच्छ = शरणम् + अन्विच्छ (-म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'अन्विच्छ', root: 'अनु + √इष्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"seek! search after!" (imperative)' },
    ],
    vibhaktiNotes: [
      'दूरेण → तृतीया एकवचन (adverbial) = "by far"',
      'अवरम् कर्म → प्रथमा एकवचन (नपुंसक) — subject of implicit अस्ति ("(mere) action is far inferior")',
      'बुद्धियोगात् → पञ्चमी एकवचन = "(inferior) to the buddhi-yoga" (ablative-of-comparison)',
      'धनञ्जय → सम्बोधन एकवचन',
      'बुद्धौ → सप्तमी एकवचन = "in buddhi"',
      'शरणम् → द्वितीया एकवचन — object of अन्विच्छ',
      'कृपणाः → प्रथमा बहुवचन = "wretched / pitiable" — predicate',
      'फलहेतवः → प्रथमा बहुवचन (बहुव्रीहि) = "(those) whose-motive-is-the-fruit"',
    ],
    keyFights: [
      'पञ्चमी-of-comparison again: अवरम् कर्म बुद्धियोगात् = "action is inferior TO-(the)-buddhi-yoga". Pairs with 2.31\'s धर्म्यात् ... श्रेयः ... न विद्यते.',
      'बुद्धौ शरणम् अन्विच्छ — सप्तमी (state-locative) + द्वितीया (object) + लोट्: "seek refuge IN buddhi". The सप्तमी-of-resting-place is the structural detail.',
      'फलहेतवः कृपणाः — a stark predicate-line: "(those) whose-motive-is-fruit (are) pitiable". The बहुव्रीहि flips the cause-and-effect: a fruit-motivated agent is grammatically defined as one whose-cause-is-(merely)-the-fruit.',
    ],
    anvaya:
      'धनञ्जय | बुद्धियोगात् कर्म दूरेण हि अवरम् | (त्वम्) बुद्धौ शरणम् अन्विच्छ | फलहेतवः कृपणाः',
    hindi:
      'हे धनञ्जय! बुद्धियोग की तुलना में (फलाकांक्षायुक्त) कर्म बहुत निकृष्ट है। (अतः) तू बुद्धि का आश्रय ढूँढ। फल को (ही) हेतु बनानेवाले (लोग) कृपण (= क्षुद्र) हैं।',
    english:
      'Far inferior, indeed, is (mere) action to the yoga of understanding, O Dhanañjaya. Seek refuge in understanding! Pitiable are those whose motive is the fruit.',
  },

  '2.51': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'कर्म-जम्',
      'बुद्धि-युक्ताः',
      'हि',
      'फलम्',
      'त्यक्त्वा',
      'मनीषिणः',
      'जन्म-बन्ध-विनिर्मुक्ताः',
      'पदम्',
      'गच्छन्ति',
      'अनामयम्',
    ],
    sandhiNotes: [
      'गच्छन्त्यनामयम् = गच्छन्ति + अनामयम् (-इ + अ → -य्)',
    ],
    finiteVerbs: [
      { form: 'गच्छन्ति', root: '√गम्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they go / attain"' },
    ],
    vibhaktiNotes: [
      'कर्मजम् फलम् → द्वितीया एकवचन (नपुंसक) — object of त्यक्त्वा ("the fruit born-of-action")',
      'बुद्धियुक्ताः, मनीषिणः, जन्मबन्धविनिर्मुक्ताः → प्रथमा बहुवचन — subject + predicates',
      'त्यक्त्वा → absolutive of √त्यज् = "having abandoned"',
      'पदम् अनामयम् → द्वितीया एकवचन (नपुंसक) — object of गच्छन्ति ("the disease-free state")',
    ],
    keyFights: [
      'मनीषिणः — प्रथमा बहुवचन of the -इन् stem (drops -न्). Same as 2.11\'s पण्डिताः grammatically; this is Krishna\'s favourite class-noun for the "wise".',
      'जन्मबन्धविनिर्मुक्ताः — heavy तत्पुरुष + PPP: "(those) freed-from the-bondage-of-birth". The कृदन्त PPP विनिर्मुक्त < वि + निर् + √मुच्.',
      'पदम् अनामयम् — द्वितीया-pair: "the disease-free state". पद here = "state, status, abode". A common Vedānta-flavored word.',
    ],
    anvaya:
      'बुद्धियुक्ताः मनीषिणः | कर्मजम् फलम् त्यक्त्वा | जन्मबन्धविनिर्मुक्ताः (सन्तः) | अनामयम् पदम् गच्छन्ति',
    hindi:
      'बुद्धियुक्त मनीषी कर्म से उत्पन्न फल को त्यागकर — जन्म-बन्धन से मुक्त होकर — निर्दोष (अनामय) पद को प्राप्त कर लेते हैं।',
    english:
      'For the wise, endowed with understanding, having abandoned the fruit born of action, freed from the bondage of birth, attain the state that is free from all ill.',
  },

  '2.52': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'यदा',
      'ते',
      'मोह-कलिलम्',
      'बुद्धिः',
      'व्यतितरिष्यति',
      'तदा',
      'गन्ता',
      'असि',
      'निर्वेदम्',
      'श्रोतव्यस्य',
      'श्रुतस्य',
      'च',
    ],
    sandhiNotes: [
      'बुद्धिर्व्यतितरिष्यति = बुद्धिः + व्यतितरिष्यति (-ः + व → -र्)',
      'गन्तासि = गन्ता + असि (आ + अ → ा; periphrastic future)',
    ],
    finiteVerbs: [
      { form: 'व्यतितरिष्यति', root: 'व्यति + √तॄ', lakara: 'लृट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"will cross over / will pass beyond" (future)' },
      { form: 'गन्तासि', root: '√गम्', lakara: 'लुट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you-will-be-going / shall-go" (periphrastic future, गन्ता + असि)' }, // AUDIT: lut periphrastic
    ],
    vibhaktiNotes: [
      'यदा ... तदा → indeclinable correlative = "when ... then"',
      'ते → षष्ठी एकवचन (enclitic) = "your"',
      'मोहकलिलम् → द्वितीया एकवचन (नपुंसक) — object of व्यतितरिष्यति',
      'बुद्धिः → प्रथमा एकवचन — subject',
      'निर्वेदम् → द्वितीया एकवचन — object of गन्तासि',
      'श्रोतव्यस्य, श्रुतस्य → षष्ठी एकवचन (gerundive + PPP) = "of (what is) to-be-heard, of (what is already) heard"',
    ],
    keyFights: [
      'गन्तासि — periphrastic future (लुट्) of √गम्. The form गन्ता (nom-sg of the agent-noun गन्तृ) + असि (2sg of √अस्) = "you-will-be-(a)-goer". A rare and delicious Sanskrit construction. Most translations smooth it to a simple future.',
      'मोहकलिलम् — कलिल = "thicket, dense entanglement"; मोह + कलिलम् = "the thicket of delusion". A vivid कर्मधारय compound.',
      'श्रोतव्यस्य ... श्रुतस्य च — gerundive (कृत्य, "to-be-heard") + PPP (कर्मणि, "(having-been)-heard"); both in षष्ठी एकवचन agreeing with implicit object of निर्वेदम्. The pair = "(disgust) regarding both what-is-yet-to-be-heard and what-has-already-been-heard".',
    ],
    anvaya:
      'यदा ते बुद्धिः मोहकलिलम् व्यतितरिष्यति | तदा (त्वम्) श्रोतव्यस्य श्रुतस्य च निर्वेदम् गन्तासि',
    hindi:
      'जब तेरी बुद्धि मोह-रूपी सघन वन को पार कर जाएगी, तब तू सुनी हुई और सुनी जानेवाली (दोनों) (शास्त्र-वार्ता) के प्रति निर्वेद (वैराग्य) को प्राप्त होगा।',
    english:
      'When your understanding crosses beyond the thicket of delusion, then you will go to indifference toward what has been heard and what is yet to be heard.',
  },

  '2.53': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'श्रुति-विप्रतिपन्ना',
      'ते',
      'यदा',
      'स्थास्यति',
      'निश्चला',
      'समाधौ',
      'अचला',
      'बुद्धिः',
      'तदा',
      'योगम्',
      'अवाप्स्यसि',
    ],
    sandhiNotes: [
      'समाधावचला = समाधौ + अचला (-ौ + अ → -आव्)',
      'बुद्धिस्तदा = बुद्धिः + तदा (-ः + त → -स्त)',
    ],
    finiteVerbs: [
      { form: 'स्थास्यति', root: '√स्था', lakara: 'लृट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"will stand / will become fixed" (future)' },
      { form: 'अवाप्स्यसि', root: 'अव + √आप्', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', pada: 'P', gloss: '"you will obtain / attain" (future)' },
    ],
    vibhaktiNotes: [
      'श्रुतिविप्रतिपन्ना → प्रथमा एकवचन (स्त्री, PPP) = "(once) bewildered-by-śruti"',
      'ते → षष्ठी एकवचन (enclitic) = "your"',
      'निश्चला, अचला → प्रथमा एकवचन (स्त्री) — predicate adjectives of बुद्धिः',
      'समाधौ → सप्तमी एकवचन = "in (samādhi)"',
      'बुद्धिः → प्रथमा एकवचन — subject',
      'योगम् → द्वितीया एकवचन — object of अवाप्स्यसि',
    ],
    keyFights: [
      'A clean यदा ... तदा conditional with two futures: स्थास्यति (श्रुतिवाक्यों से व्याकुल बुद्धि STANDS-still in समाधि) → अवाप्स्यसि (you-OBTAIN yoga). The temporal correlative + double-लृट् locks the cause-effect.',
      'श्रुतिविप्रतिपन्ना — feminine PPP, "bewildered-by-the-conflicting-śrutis". वि + प्रति + √पद् = "go-against, conflict-with"; the PPP -न्ना stems from the अद्ध्यात्मिक sense of being-pulled-different-ways by competing scriptural claims.',
      'निश्चला + अचला — synonymous pair, both प्रथमा एकवचन स्त्री, both negative-prefixed (नि-, अ-). Sanskrit\'s metrical synonym-doubling for emphasis.',
    ],
    anvaya:
      'ते श्रुतिविप्रतिपन्ना बुद्धिः | यदा समाधौ निश्चला अचला स्थास्यति | तदा (त्वम्) योगम् अवाप्स्यसि',
    hindi:
      'जब (विभिन्न) श्रुति-वाक्यों से विचलित हुई तेरी बुद्धि समाधि में निश्चल और अचल हो जाएगी — तब तू योग को प्राप्त कर लेगा।',
    english:
      'When your understanding, bewildered by the (conflicting) Vedic teachings, shall stand unmoving and steady in concentration, then you will attain yoga.',
  },

  '2.54': {
    speaker: 'अर्जुन उवाच',
    padaccheda: [
      'स्थित-प्रज्ञस्य',
      'का',
      'भाषा',
      'समाधि-स्थस्य',
      'केशव',
      'स्थित-धीः',
      'किम्',
      'प्रभाषेत',
      'किम्',
      'आसीत',
      'व्रजेत',
      'किम्',
    ],
    sandhiNotes: [
      'किमासीत = किम् + आसीत (-म् + आ → -मा)',
    ],
    finiteVerbs: [
      { form: 'प्रभाषेत', root: 'प्र + √भाष्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"would speak / how would (he) speak" (optative)' },
      { form: 'आसीत', root: '√आस्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"would sit" (optative)' },
      { form: 'व्रजेत', root: '√व्रज्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"would walk / would move" (optative)' },
    ],
    vibhaktiNotes: [
      'स्थितप्रज्ञस्य, समाधिस्थस्य → षष्ठी एकवचन (बहुव्रीहि) = "of-the-stable-wisdomed-one, of-the-समाधि-abiding-one"',
      'का भाषा → प्रथमा एकवचन (स्त्री) — subject of implicit अस्ति ("what (is) the description?")',
      'केशव → सम्बोधन एकवचन',
      'स्थितधीः → प्रथमा एकवचन (बहुव्रीहि) — subject of the three optatives ("the stable-minded one")',
      'किम् (thrice) → indeclinable / प्रथमा एकवचन — interrogative',
    ],
    keyFights: [
      'Three विधिलिङ् verbs in succession (प्रभाषेत, आसीत, व्रजेत) — the optative carries the descriptive-hypothetical force: "how would (such a one) speak, sit, walk?". Arjuna asks for behaviour-pattern, not facts.',
      'स्थितप्रज्ञ ("stable-wisdomed") is one of the most-quoted Gītā-terms. Its first appearance, here, is what triggers Krishna\'s long descriptive section 2.55–2.72.',
      'का भाषा — "what (is) the description?" with implicit अस्ति. भाषा here = "speech-style, way-of-talking" = "how is such a one described / spoken of?".',
      'आसीत is the optative of √आस् ("to sit"); the -ीत ending = प्रथम-पुरुष एकवचन आत्मनेपद optative.',
    ],
    anvaya:
      'केशव | समाधिस्थस्य स्थितप्रज्ञस्य का भाषा | स्थितधीः किम् प्रभाषेत | किम् आसीत | किम् व्रजेत',
    hindi:
      'हे केशव! समाधि में स्थित स्थित-प्रज्ञ पुरुष का लक्षण क्या है? वह स्थित-बुद्धिवाला कैसे बोलता है? कैसे बैठता है? कैसे चलता है?',
    english:
      'O Keśava, what is the description of one of stable wisdom, established in concentration? How does the steady-minded man speak, how sit, how walk?',
  },

  '2.55': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'प्रजहाति',
      'यदा',
      'कामान्',
      'सर्वान्',
      'पार्थ',
      'मनः-गतान्',
      'आत्मनि',
      'एव',
      'आत्मना',
      'तुष्टः',
      'स्थित-प्रज्ञः',
      'तदा',
      'उच्यते',
    ],
    sandhiNotes: [
      'कामान्सर्वान् = कामान् + सर्वान् (न्-junction)',
      'सर्वान्पार्थ = सर्वान् + पार्थ (न्-junction)',
      'मनोगतान् = मनः + गतान् (-ः + ग → -ो)',
      'आत्मन्येवात्मना = आत्मनि + एव + आत्मना (-इ + ए → -य्; आ + आ → ा)',
      'स्थितप्रज्ञस्तदोच्यते = स्थितप्रज्ञः + तदा + उच्यते (-ः + त → -स्त; आ + उ → ो)',
    ],
    finiteVerbs: [
      { form: 'प्रजहाति', root: 'प्र + √हा', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"casts off / abandons"' },
      { form: 'उच्यते', root: '√वच् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is called" (passive)' },
    ],
    vibhaktiNotes: [
      'यदा ... तदा → indeclinable correlative',
      'कामान् सर्वान् मनोगतान् → द्वितीया बहुवचन — object of प्रजहाति ("all desires that are mind-resident")',
      'पार्थ → सम्बोधन एकवचन',
      'आत्मनि → सप्तमी एकवचन = "in the Self"',
      'आत्मना → तृतीया एकवचन = "by/with the Self"',
      'तुष्टः → प्रथमा एकवचन (PPP) = "(being) satisfied"',
      'स्थितप्रज्ञः → प्रथमा एकवचन — predicate of उच्यते',
    ],
    keyFights: [
      'Krishna\'s answer to 2.54: स्थितप्रज्ञः ... उच्यते = "(such a one) is-called (a) sthitaprajña". The passive उच्यते is the standard "is-called" (definitional copula).',
      'आत्मनि एव आत्मना तुष्टः — सप्तमी (locus) + तृतीया (instrument) + PPP-predicate: "satisfied IN-the-Self BY-the-Self". The locative-instrumental pair is the structural showpiece.',
      'मनोगतान् — कर्मधारय: "(those) gone-(=residing)-in-the-mind". The PPP गत of √गम् in compound = "X-residing", a Gītā idiom.',
    ],
    anvaya:
      'पार्थ | यदा (स पुरुषः) मनोगतान् सर्वान् कामान् प्रजहाति | आत्मना आत्मनि एव तुष्टः | तदा स्थितप्रज्ञः (इति) उच्यते',
    hindi:
      'हे पार्थ! जब (पुरुष) मन में स्थित सब कामनाओं को त्याग देता है, और आत्मा से ही आत्मा में सन्तुष्ट हो जाता है — तब वह स्थित-प्रज्ञ कहलाता है।',
    english:
      'O Pārtha, when one casts off all desires that dwell in the mind, content in the Self by the Self alone — then is he called of stable wisdom.',
  },

  '2.56': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'दुःखेषु',
      'अनुद्विग्न-मनाः',
      'सुखेषु',
      'विगत-स्पृहः',
      'वीत-राग-भय-क्रोधः',
      'स्थित-धीः',
      'मुनिः',
      'उच्यते',
    ],
    sandhiNotes: [
      'दुःखेष्वनुद्विग्नमनाः = दुःखेषु + अनुद्विग्नमनाः (-उ + अ → -व्)',
      'स्थितधीर्मुनिरुच्यते = स्थितधीः + मुनिः + उच्यते (-ः + म → -र्; -ः + उ → -र्)',
    ],
    finiteVerbs: [
      { form: 'उच्यते', root: '√वच् (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is called" (passive)' },
    ],
    vibhaktiNotes: [
      'दुःखेषु, सुखेषु → सप्तमी बहुवचन = "in (the case of) sorrows / pleasures"',
      'अनुद्विग्नमनाः → प्रथमा एकवचन (बहुव्रीहि, -मनस् stem) = "(one) whose-mind-is-not-agitated"',
      'विगतस्पृहः → प्रथमा एकवचन (बहुव्रीहि) = "(one) whose-longing-has-departed"',
      'वीतरागभयक्रोधः → प्रथमा एकवचन (बहुव्रीहि) = "(one) whose-passion-fear-and-anger-have-passed-away"',
      'स्थितधीः → प्रथमा एकवचन (बहुव्रीहि) = "(one) whose-thought-is-stable"',
      'मुनिः → प्रथमा एकवचन — predicate ("muni / sage")',
    ],
    keyFights: [
      'Four parallel बहुव्रीहि, all प्रथमा एकवचन, all describing the implicit subject. The compound-cascade is the descriptive payload; उच्यते is the only finite anchor.',
      'अनुद्विग्नमनाः and स्थितधीः both end in stem-final consonants (-स् for मनस्, -ई for धी): the प्रथमा एकवचन shows the visarga + the long-vowel respectively, sandhi-flagging the stem-class.',
      'वीतरागभयक्रोधः — द्वन्द्व embedded in बहुव्रीहि: "(one in whom) passion-fear-and-anger have-departed". Three-fold vice-cluster. Cf. Buddhist trio rāga-dveṣa-moha.',
    ],
    anvaya:
      'दुःखेषु अनुद्विग्नमनाः | सुखेषु विगतस्पृहः | वीतरागभयक्रोधः | (एवं) स्थितधीः मुनिः उच्यते',
    hindi:
      'दुःख में जिसका मन उद्विग्न नहीं होता, सुख में जिसकी स्पृहा नहीं रहती, राग, भय और क्रोध से रहित — ऐसा (पुरुष) स्थित-बुद्धिवाला मुनि कहलाता है।',
    english:
      'He whose mind is unagitated in sorrows, who has no longing for pleasures, from whom passion, fear, and anger have departed — he, the steady-minded one, is called a sage.',
  },

  '2.57': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'यः',
      'सर्वत्र',
      'अनभिस्नेहः',
      'तत्-तत्',
      'प्राप्य',
      'शुभ-अशुभम्',
      'न',
      'अभिनन्दति',
      'न',
      'द्वेष्टि',
      'तस्य',
      'प्रज्ञा',
      'प्रतिष्ठिता',
    ],
    sandhiNotes: [
      'यः सर्वत्रानभिस्नेहस्तत्तत्प्राप्य = यः + सर्वत्र + अनभिस्नेहः + तत्तत् + प्राप्य (अ + अ → ा; -ः + त → -स्त)',
      'शुभाशुभम् = शुभ + अशुभम् (अ + अ → ा)',
      'नाभिनन्दति = न + अभिनन्दति (अ + अ → ा)',
    ],
    finiteVerbs: [
      { form: 'अभिनन्दति', root: 'अभि + √नन्द्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"rejoices in / welcomes" (negated)' },
      { form: 'द्वेष्टि', root: '√द्विष्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"hates / dislikes" (negated)' },
    ],
    vibhaktiNotes: [
      'यः → प्रथमा एकवचन (relative)',
      'सर्वत्र → indeclinable = "everywhere, in every case"',
      'अनभिस्नेहः → प्रथमा एकवचन (बहुव्रीहि) = "(one) without-fond-attachment"',
      'तत् तत् → द्वितीया एकवचन (नपुंसक) — distributive: "this and that, each thing"',
      'शुभाशुभम् → द्वितीया एकवचन (नपुंसक) — द्वन्द्व ("good and bad") in apposition with तत् तत्',
      'प्राप्य → absolutive of प्र + √आप् = "having attained / encountering"',
      'तस्य → षष्ठी एकवचन (correlative) = "his"',
      'प्रज्ञा प्रतिष्ठिता → प्रथमा एकवचन (स्त्री) — subject + predicate ("(his) wisdom (is) firmly-established")',
    ],
    keyFights: [
      'The first appearance of the तस्य प्रज्ञा प्रतिष्ठिता formula — a refrain that recurs at 2.58, 2.61, 2.68. The relative-correlative (यः ... तस्य) holds the long descriptive sentence together.',
      'तत् तत् — reduplicated demonstrative for distributive: "(encountering) this-thing-or-that-thing". Sanskrit\'s standard "each-and-every" idiom.',
      'अनभिस्नेहः — three-prefix stack: अ- (negative) + अभि- + स्नेह. The compound type is बहुव्रीहि read as "(one) without (अ-) close-attachment (अभिस्नेह)".',
    ],
    anvaya:
      'यः सर्वत्र अनभिस्नेहः | तत् तत् शुभाशुभम् प्राप्य | न अभिनन्दति न द्वेष्टि | तस्य प्रज्ञा प्रतिष्ठिता',
    hindi:
      'जो सर्वत्र (अनासक्त रहकर) किसी से विशेष स्नेह नहीं रखता; जो शुभ या अशुभ — जो भी प्राप्त हो — उसका न अभिनन्दन करता है, न द्वेष करता है — उसकी प्रज्ञा प्रतिष्ठित है।',
    english:
      'He who is everywhere without fond attachment; who, encountering this or that — whether good or bad — neither rejoices nor hates: his wisdom is firmly established.',
  },

  '2.58': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'यदा',
      'संहरते',
      'च',
      'अयम्',
      'कूर्मः',
      'अङ्गानि',
      'इव',
      'सर्वशः',
      'इन्द्रियाणि',
      'इन्द्रिय-अर्थेभ्यः',
      'तस्य',
      'प्रज्ञा',
      'प्रतिष्ठिता',
    ],
    sandhiNotes: [
      'चायम् = च + अयम् (अ + अ → ा)',
      'कूर्मोऽङ्गानीव = कूर्मः + अङ्गानि + इव (-ः + अ → -ोऽ; -इ + इ → -ी)',
      'इन्द्रियाणीन्द्रियार्थेभ्यस्तस्य = इन्द्रियाणि + इन्द्रियार्थेभ्यः + तस्य (-इ + इ → -ी; -ः + त → -स्त)',
    ],
    finiteVerbs: [
      { form: 'संहरते', root: 'सम् + √हृ', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"draws-together / withdraws" (आत्मनेपद)' },
    ],
    vibhaktiNotes: [
      'यदा → indeclinable',
      'अयम् → प्रथमा एकवचन — subject ("this (sage)")',
      'कूर्मः → प्रथमा एकवचन — subject of (implicit) सम्हरते in the simile',
      'अङ्गानि → द्वितीया बहुवचन (नपुंसक) — object inside the simile',
      'इव → indeclinable = "as, like"',
      'सर्वशः → indeclinable = "in every way, completely"',
      'इन्द्रियाणि → द्वितीया बहुवचन (नपुंसक) — object of संहरते (main clause)',
      'इन्द्रियार्थेभ्यः → पञ्चमी बहुवचन = "from the sense-objects" (ablative of withdrawal)',
      'तस्य प्रज्ञा प्रतिष्ठिता → repeat of 2.57\'s refrain',
    ],
    keyFights: [
      'The famous tortoise simile. The simile is grammatically structured: कूर्मः अङ्गानि इव sandwiched into the main sentence (अयम् इन्द्रियाणि संहरते इन्द्रियार्थेभ्यः) — the इव holds the analogy.',
      'पञ्चमी-of-withdrawal: इन्द्रियार्थेभ्यः ... संहरते = "withdraws (the senses) FROM the-sense-objects". The ablative is the standard "source" case in withdrawal verbs.',
      'संहरते — आत्मनेपद of सम् + √हृ; the -ते ending = प्रथम-एकवचन आत्मनेपद. The reflexive (आ-pada) sense fits the self-withdrawing tortoise.',
    ],
    anvaya:
      'अयम् च यदा | कूर्मः अङ्गानि इव सर्वशः | इन्द्रियाणि इन्द्रियार्थेभ्यः संहरते | तस्य प्रज्ञा प्रतिष्ठिता',
    hindi:
      'जब यह (पुरुष) कछुए के समान — जैसे कछुआ अपने अंगों को सिकोड़ लेता है — सब ओर से अपनी इन्द्रियों को इन्द्रिय-विषयों से समेट लेता है, तब उसकी प्रज्ञा प्रतिष्ठित है।',
    english:
      'And when, like a tortoise drawing in its limbs, this man wholly withdraws his senses from the objects of sense — his wisdom is firmly established.',
  },

  '2.59': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'विषयाः',
      'विनिवर्तन्ते',
      'निर्-आहारस्य',
      'देहिनः',
      'रस-वर्जम्',
      'रसः',
      'अपि',
      'अस्य',
      'परम्',
      'दृष्ट्वा',
      'निवर्तते',
    ],
    sandhiNotes: [
      'विषया विनिवर्तन्ते = विषयाः + विनिवर्तन्ते (-ः + व → -ा)',
      'रसोऽप्यस्य = रसः + अपि + अस्य (-ः + अ → -ोऽ; -इ + अ → -य्)',
      'दृष्ट्वा निवर्तते — no internal sandhi',
    ],
    finiteVerbs: [
      { form: 'विनिवर्तन्ते', root: 'वि + नि + √वृत्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'A', gloss: '"turn-back / fall-away" (आत्मनेपद)' },
      { form: 'निवर्तते', root: 'नि + √वृत्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"turns-back / departs" (आत्मनेपद)' },
    ],
    vibhaktiNotes: [
      'विषयाः → प्रथमा बहुवचन — subject ("the sense-objects")',
      'निराहारस्य देहिनः → षष्ठी एकवचन (-इन् stem) = "of the abstaining-embodied-one"',
      'रसवर्जम् → indeclinable / द्वितीया-adverbial (अव्ययी-भाव) = "with-the-exception-of (the underlying) relish"',
      'रसः → प्रथमा एकवचन — subject of निवर्तते',
      'अस्य → षष्ठी एकवचन = "of him"',
      'परम् → द्वितीया एकवचन / adverbial = "the supreme (Brahman)" — object of दृष्ट्वा',
      'दृष्ट्वा → absolutive of √दृश् = "having seen"',
    ],
    keyFights: [
      'रसवर्जम् is the rare अव्ययीभाव compound — frozen as an adverb meaning "with-the-exception-of-relish". The -अम् ending here is adverbial-accusative, not predicate.',
      'Two finite verbs from the same root √वृत् with different prefixes: विनिवर्तन्ते (sense-objects fall-away) vs. निवर्तते (relish-itself departs). The grammatical doubling tracks the philosophical two-stage detachment.',
      'परम् दृष्ट्वा — the absolutive\'s object: "having-seen the-Supreme". The bare द्वितीया परम् is short for परं तत्त्वम् or परं ब्रह्म.',
      'निराहारस्य — षष्ठी of the बहुव्रीहि निराहार ("(one) without-food/intake"): describes the deprived-of-objects person whose senses are not yet really renounced.',
    ],
    anvaya:
      'निराहारस्य देहिनः रसवर्जम् विषयाः विनिवर्तन्ते | अस्य रसः अपि परम् दृष्ट्वा निवर्तते',
    hindi:
      'व्रत आदि से इन्द्रिय-निरोध करनेवाले देही (साधक) से (केवल) विषय हटते हैं — किन्तु उनका (अन्तर्गत) रस (आसक्ति) नहीं हटता। (परन्तु) इस (स्थित-प्रज्ञ) पुरुष का रस भी परम-तत्त्व (ब्रह्म) के दर्शन से निवृत्त हो जाता है।',
    english:
      'For the embodied man who abstains, the sense-objects fall away — except the relish itself. But for him (the wise one), even that relish departs, having seen the Supreme.',
  },

  '2.60': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'यततः',
      'हि',
      'अपि',
      'कौन्तेय',
      'पुरुषस्य',
      'विपश्चितः',
      'इन्द्रियाणि',
      'प्रमाथीनि',
      'हरन्ति',
      'प्रसभम्',
      'मनः',
    ],
    sandhiNotes: [
      'यततो ह्यपि = यततः + हि + अपि (-ः + ह → -ो; -इ + अ → -य्)',
    ],
    finiteVerbs: [
      { form: 'हरन्ति', root: '√हृ', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they snatch / carry away"' },
    ],
    vibhaktiNotes: [
      'यततः → षष्ठी एकवचन (शानच् present participle of √यत्) = "of (one who is) striving"',
      'पुरुषस्य विपश्चितः → षष्ठी एकवचन (-त् stem) = "of a wise man"',
      'कौन्तेय → सम्बोधन एकवचन',
      'इन्द्रियाणि → प्रथमा बहुवचन (नपुंसक) — subject',
      'प्रमाथीनि → प्रथमा बहुवचन (नपुंसक, -इन् stem) = "agitating, churning"',
      'मनः → द्वितीया एकवचन (नपुंसक) — object of हरन्ति',
      'प्रसभम् → indeclinable / adverbial = "by force, violently"',
    ],
    keyFights: [
      'Three षष्ठी-एकवचन-of-disadvantage all stack: यततः पुरुषस्य विपश्चितः = "(even) of a striving, of a wise, of a man". The triple genitive is a Sanskrit poetic device — "even from such a one (the senses snatch the mind)".',
      'विपश्चितः — षष्ठी एकवचन of -त् stem (विपश्चित्). The -तः ending after -चित् is the regular masculine-genitive-singular of -त् stems.',
      'प्रमाथीनि — प्रथमा बहुवचन of -इन् stem (प्रमाथिन्), agreeing with neuter इन्द्रियाणि. The neuter -ईनि ending after -इन् stems is the irregular form.',
      'A whole verse builds the contrast: even with all the rationale of effort + wisdom (the षष्ठी chain), the senses (प्रमाथीनि indriyāṇi) FORCIBLY (प्रसभम्) snatch (हरन्ति) the mind (मनः). Krishna grants the difficulty.',
    ],
    anvaya:
      'कौन्तेय | यततः हि अपि विपश्चितः पुरुषस्य | प्रमाथीनि इन्द्रियाणि मनः प्रसभम् हरन्ति',
    hindi:
      'हे कौन्तेय! प्रयत्नशील विवेकी पुरुष की भी इन्द्रियाँ अत्यन्त मथन-कर्त्री होकर मन को बलात् हर लेती हैं।',
    english:
      'For, O son of Kuntī, even of a striving and discerning man, the turbulent senses forcibly carry away the mind.',
  },

  '2.61': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'तानि',
      'सर्वाणि',
      'संयम्य',
      'युक्तः',
      'आसीत',
      'मत्-परः',
      'वशे',
      'हि',
      'यस्य',
      'इन्द्रियाणि',
      'तस्य',
      'प्रज्ञा',
      'प्रतिष्ठिता',
    ],
    sandhiNotes: [
      'युक्त आसीत = युक्तः + आसीत (-ः + आ → -अ; visarga lopa before vowel)',
      'मत्परः — compound, no junction',
      'यस्येन्द्रियाणि = यस्य + इन्द्रियाणि (-अ + इ → -य्)',
    ],
    finiteVerbs: [
      { form: 'आसीत', root: '√आस्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"should sit / should be settled" (optative)' },
    ],
    vibhaktiNotes: [
      'तानि सर्वाणि → द्वितीया बहुवचन (नपुंसक) — object of संयम्य ("having-restrained all of those (senses)")',
      'संयम्य → absolutive of सम् + √यम् = "having reined-in"',
      'युक्तः → प्रथमा एकवचन (PPP) = "(being) yoked, controlled"',
      'मत्परः → प्रथमा एकवचन (बहुव्रीहि) = "(one) whose-supreme-(goal)-is-Me"',
      'वशे → सप्तमी एकवचन = "in (his) control"',
      'यस्य ... तस्य → षष्ठी एकवचन (relative-correlative) = "of-whom ... of-him"',
      'इन्द्रियाणि → प्रथमा बहुवचन — subject of implicit अस्ति',
      'प्रज्ञा प्रतिष्ठिता → as in 2.57',
    ],
    keyFights: [
      'विधिलिङ् आसीत carries the prescriptive force: "(he) SHOULD-sit". One of Krishna\'s key optatives in the स्थित-प्रज्ञ description.',
      'मत्परः — Krishna\'s self-referential बहुव्रीहि: "(one) whose-supreme-(refuge)-is-Me". The first time in Chapter 2 Krishna names himself as goal — a foreshadowing of Chapter 9-10 भक्ति-language.',
      'यस्य ... वशे ... इन्द्रियाणि — षष्ठी relative + सप्तमी locus: "in-whose control (the senses are)". An idiomatic possessive-of-power construction.',
      'The तस्य प्रज्ञा प्रतिष्ठिता refrain reappears (cf. 2.57, 2.58, 2.68) — Krishna\'s anaphoric closing of each स्थित-प्रज्ञ-vignette.',
    ],
    anvaya:
      'तानि सर्वाणि (इन्द्रियाणि) संयम्य | युक्तः मत्परः (सन्) आसीत | यस्य हि वशे इन्द्रियाणि (वर्तन्ते) | तस्य प्रज्ञा प्रतिष्ठिता',
    hindi:
      'उन सब (इन्द्रियों) को संयम में रखकर मेरे परायण होकर युक्त बैठे। जिसकी इन्द्रियाँ वश में होती हैं, उसी की प्रज्ञा प्रतिष्ठित है।',
    english:
      'Having restrained all those (senses), let him sit yoked, intent on Me. For he whose senses are under control — his wisdom is firmly established.',
  },

  '2.64': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'राग-द्वेष-वियुक्तैः',
      'तु',
      'विषयान्',
      'इन्द्रियैः',
      'चरन्',
      'आत्म-वश्यैः',
      'विधेय-आत्मा',
      'प्रसादम्',
      'अधिगच्छति',
    ],
    sandhiNotes: [
      'रागद्वेषवियुक्तैस्तु = रागद्वेषवियुक्तैः + तु (-ः + त → -स्त)',
      'विषयानिन्द्रियैश्चरन् = विषयान् + इन्द्रियैः + चरन् (न्-junction; -ः + च → -श्च)',
      'आत्मवश्यैर्विधेयात्मा = आत्मवश्यैः + विधेयात्मा (-ः + व → -र्)',
      'प्रसादमधिगच्छति = प्रसादम् + अधिगच्छति (-म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'अधिगच्छति', root: 'अधि + √गम्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"attains / reaches"' },
    ],
    vibhaktiNotes: [
      'रागद्वेषवियुक्तैः, आत्मवश्यैः → तृतीया बहुवचन — agreeing with इन्द्रियैः ("(by senses) freed-from-passion-and-aversion, (and) self-controlled")',
      'विषयान् → द्वितीया बहुवचन — object of चरन्',
      'इन्द्रियैः → तृतीया बहुवचन = "by/with (his) senses" (instrumental of accompaniment)',
      'चरन् → प्रथमा एकवचन (शानच्) = "(while) moving-among"',
      'विधेयात्मा → प्रथमा एकवचन (बहुव्रीहि) = "(one) whose-self-is-disciplined"',
      'प्रसादम् → द्वितीया एकवचन — object of अधिगच्छति',
    ],
    keyFights: [
      'A long तृतीया-instrumental cascade: रागद्वेषवियुक्तैः ... इन्द्रियैः ... आत्मवश्यैः (three तृतीया plurals) — all agreeing, describing HOW the wise one moves through sense-objects. Sanskrit\'s "by means of" stack.',
      'विधेयात्मा is a -आत्मन् stem masc. प्रथमा एकवचन (the -आत्मा ending). बहुव्रीहि: "(one in whom) the-self-is-(to-be)-disciplined".',
      'चरन् + विषयान् — present participle + द्वितीया = "moving among the sense-objects". The Gītā\'s key concession: the wise one doesn\'t WITHDRAW from sense-objects, he MOVES through them, but with controlled instruments.',
    ],
    anvaya:
      'विधेयात्मा तु | रागद्वेषवियुक्तैः आत्मवश्यैः इन्द्रियैः | विषयान् चरन् | प्रसादम् अधिगच्छति',
    hindi:
      'राग और द्वेष से मुक्त, और स्व-वश इन्द्रियों के द्वारा विषयों में विचरते हुए — विधेय-आत्मा (साधक) प्रसाद (= चित्त की प्रसन्नता) को प्राप्त करता है।',
    english:
      'But the disciplined one, moving among the sense-objects with senses freed from attraction and aversion, and brought under his own control — attains tranquillity.',
  },

  '2.65': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'प्रसादे',
      'सर्व-दुःखानाम्',
      'हानिः',
      'अस्य',
      'उपजायते',
      'प्रसन्न-चेतसः',
      'हि',
      'आशु',
      'बुद्धिः',
      'पर्यवतिष्ठते',
    ],
    sandhiNotes: [
      'हानिरस्योपजायते = हानिः + अस्य + उपजायते (-ः + अ → -र्; अ + उ → ो)',
      'प्रसन्नचेतसो ह्याशु = प्रसन्नचेतसः + हि + आशु (-ः + ह → -ो; -इ + आ → -या)',
    ],
    finiteVerbs: [
      { form: 'उपजायते', root: 'उप + √जन्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"arises / comes-into-being"' },
      { form: 'पर्यवतिष्ठते', root: 'परि + अव + √स्था', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"becomes thoroughly established"' },
    ],
    vibhaktiNotes: [
      'प्रसादे → सप्तमी एकवचन = "in (the state of) prasāda"',
      'सर्वदुःखानाम् → षष्ठी बहुवचन = "of all sorrows"',
      'हानिः → प्रथमा एकवचन (स्त्री) — subject ("(the) destruction")',
      'अस्य → षष्ठी एकवचन = "of his / for him"',
      'प्रसन्नचेतसः → षष्ठी एकवचन (-स् stem) = "of (one whose) mind-is-tranquil"',
      'आशु → indeclinable = "swiftly"',
      'बुद्धिः → प्रथमा एकवचन — subject of पर्यवतिष्ठते',
    ],
    keyFights: [
      'Two locative-cause structures: प्रसादे ... हानिः अस्य उपजायते = "IN the (state of) tranquillity, his sorrows-destruction arises". The सप्तमी = locative-of-condition.',
      'सर्वदुःखानाम् हानिः — षष्ठी + प्रथमा: "the destruction OF-all-sorrows". The षष्ठी-objective: hāni governs its content via षष्ठी.',
      'पर्यवतिष्ठते — triple-prefixed आत्मनेपद of √स्था: "thoroughly-firmly-stands". The compound prefixes परि + अव intensify "stands established all-around".',
      'प्रसन्नचेतसः — षष्ठी एकवचन of -स् stem (चेतस्). The -सः ending is the spotting cue.',
    ],
    anvaya:
      'प्रसादे (सति) अस्य सर्वदुःखानाम् हानिः उपजायते | प्रसन्नचेतसः हि आशु बुद्धिः पर्यवतिष्ठते',
    hindi:
      'चित्त-प्रसाद (तृप्ति) होने पर इस (साधक) के सब दुःखों का नाश हो जाता है। प्रसन्न-चित्तवाले की बुद्धि शीघ्र ही (परमात्मा में) भली-भाँति स्थिर हो जाती है।',
    english:
      'In tranquillity, the destruction of all his sorrows comes about; for of one whose mind is tranquil, the understanding swiftly becomes thoroughly established.',
  },

  '2.66': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'न',
      'अस्ति',
      'बुद्धिः',
      'अयुक्तस्य',
      'न',
      'च',
      'अयुक्तस्य',
      'भावना',
      'न',
      'च',
      'अभावयतः',
      'शान्तिः',
      'अशान्तस्य',
      'कुतः',
      'सुखम्',
    ],
    sandhiNotes: [
      'नास्ति = न + अस्ति (अ + अ → ा)',
      'बुद्धिरयुक्तस्य = बुद्धिः + अयुक्तस्य (-ः + अ → -र्)',
      'चायुक्तस्य = च + अयुक्तस्य (अ + अ → ा)',
      'चाभावयतः = च + अभावयतः (अ + अ → ा)',
      'शान्तिरशान्तस्य = शान्तिः + अशान्तस्य (-ः + अ → -र्)',
    ],
    finiteVerbs: [
      { form: 'अस्ति', root: '√अस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"is / exists" (negated, opening word)' },
    ],
    vibhaktiNotes: [
      'अयुक्तस्य → षष्ठी एकवचन (twice) = "of the un-yoked"',
      'अभावयतः → षष्ठी एकवचन (शानच् of √भू-causative) = "of (one who is) not-meditating"',
      'अशान्तस्य → षष्ठी एकवचन = "of the un-peaceful"',
      'बुद्धिः, भावना, शान्तिः → प्रथमा एकवचन (स्त्री) — successive subjects of implicit अस्ति',
      'सुखम् → प्रथमा एकवचन (नपुंसक) — subject of implicit अस्ति in the कुतः-question',
      'कुतः → indeclinable interrogative = "whence?"',
    ],
    keyFights: [
      'A four-fold negation chain: न अस्ति बुद्धिः | न च भावना | न च शान्तिः | (अशान्तस्य) कुतः सुखम् — "no understanding, no contemplation, no peace; (and) for the unpeaceful, whence happiness?". The chain culminates in a rhetorical-कुतः (a beloved Sanskrit move).',
      'A षष्ठी-of-disadvantage cascade: अयुक्तस्य ... अयुक्तस्य ... अभावयतः ... अशान्तस्य. Each negative-genitive specifies the disqualified person.',
      'अभावयतः — षष्ठी एकवचन शानच् of the causative-stem भावय- (from √भू "to bring-into-being"). Spotting the causative + present-participle + genitive is a layered identification.',
    ],
    anvaya:
      'अयुक्तस्य बुद्धिः न अस्ति | अयुक्तस्य च भावना न (अस्ति) | अभावयतः शान्तिः न (अस्ति) च | अशान्तस्य सुखम् कुतः',
    hindi:
      'जो (इन्द्रिय-)संयम से रहित है, उसकी बुद्धि (विवेकशीलता) नहीं होती; उसकी भावना (एकाग्र-चिन्तन) भी नहीं होती; जो भावना नहीं करता, उसकी शान्ति नहीं होती; और अशान्त को सुख कहाँ से?',
    english:
      'There is no understanding for the unyoked; nor for the unyoked is there contemplation; nor for the un-meditating is there peace; and for the unpeaceful, whence happiness?',
  },

  '2.67': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'इन्द्रियाणाम्',
      'हि',
      'चरताम्',
      'यत्',
      'मनः',
      'अनुविधीयते',
      'तत्',
      'अस्य',
      'हरति',
      'प्रज्ञाम्',
      'वायुः',
      'नावम्',
      'इव',
      'अम्भसि',
    ],
    sandhiNotes: [
      'यन्मनोऽनुविधीयते = यत् + मनः + अनुविधीयते (त् + म → न्म; -ः + अ → -ोऽ)',
      'तदस्य = तत् + अस्य (त् + अ → द्अ)',
      'वायुर्नावमिवाम्भसि = वायुः + नावम् + इव + अम्भसि (-ः + न → -र्; -म् + इ → -मि; आ + अ → ा)',
    ],
    finiteVerbs: [
      { form: 'अनुविधीयते', root: 'अनु + वि + √धा (passive)', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'A', gloss: '"is conformed-to / follows after" (passive)' },
      { form: 'हरति', root: '√हृ', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"carries away / steals"' },
    ],
    vibhaktiNotes: [
      'इन्द्रियाणाम् → षष्ठी बहुवचन = "of the senses"',
      'चरताम् → षष्ठी बहुवचन (शानच्) = "of (those) wandering"',
      'यत् ... तत् → प्रथमा/द्वितीया एकवचन (नपुंसक) — relative-correlative; refers to "(that) mind which..."',
      'मनः → प्रथमा एकवचन — subject of अनुविधीयते',
      'अस्य → षष्ठी एकवचन = "his"',
      'प्रज्ञाम् → द्वितीया एकवचन (स्त्री) — object of हरति',
      'वायुः → प्रथमा एकवचन — subject of (implicit) हरति in the simile',
      'नावम् → द्वितीया एकवचन (स्त्री) — object inside the simile',
      'अम्भसि → सप्तमी एकवचन = "in the water"',
    ],
    keyFights: [
      'Beautiful boat-and-wind simile. The structure: relative-clause (यत् मनः इन्द्रियाणाम् ... अनुविधीयते) + correlative-main (तत् अस्य प्रज्ञाम् हरति) + simile (वायुः नावम् इव अम्भसि). Three clauses interlocked by नपुंसक-correlatives and a clear इव.',
      'अनुविधीयते — passive of अनु + वि + √धा. The triple-prefix construction = "is-arranged-to-follow", i.e., "yields-itself-to". Spotting the passive (-य- + आत्मनेपद) is the key.',
      'इन्द्रियाणाम् हि चरताम् — षष्ठी-of-the-senses-wandering: when the mind follows even ONE wandering sense, it loses the प्रज्ञा. The षष्ठी doubles up (genitive of possession + genitive of agent of शानच्).',
    ],
    anvaya:
      'चरताम् इन्द्रियाणाम् यत् मनः अनुविधीयते | वायुः अम्भसि नावम् इव | तत् अस्य प्रज्ञाम् हरति',
    hindi:
      'चरती हुई इन्द्रियों के पीछे जो मन चलता है — जैसे जल में हवा नौका को (बहाकर ले जाती है) — वैसे ही वह (मन) इस (पुरुष) की प्रज्ञा को हर लेता है।',
    english:
      'For the mind which yields itself to the wandering senses — that carries away his understanding, just as the wind carries off a boat upon the waters.',
  },

  '2.68': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'तस्मात्',
      'यस्य',
      'महा-बाहो',
      'निगृहीतानि',
      'सर्वशः',
      'इन्द्रियाणि',
      'इन्द्रिय-अर्थेभ्यः',
      'तस्य',
      'प्रज्ञा',
      'प्रतिष्ठिता',
    ],
    sandhiNotes: [
      'तस्माद्यस्य = तस्मात् + यस्य (त् + य → द्य)',
      'इन्द्रियाणीन्द्रियार्थेभ्यस्तस्य = इन्द्रियाणि + इन्द्रियार्थेभ्यः + तस्य (-इ + इ → -ी; -ः + त → -स्त)',
    ],
    finiteVerbs: null,
    vibhaktiNotes: [
      'तस्मात् → indeclinable / पञ्चमी = "therefore"',
      'यस्य ... तस्य → षष्ठी एकवचन (relative-correlative)',
      'महाबाहो → सम्बोधन एकवचन',
      'निगृहीतानि → प्रथमा बहुवचन (नपुंसक PPP) = "(have been) restrained" — predicate of इन्द्रियाणि',
      'सर्वशः → indeclinable = "in every way, completely"',
      'इन्द्रियाणि → प्रथमा बहुवचन — subject',
      'इन्द्रियार्थेभ्यः → पञ्चमी बहुवचन = "from the sense-objects" (ablative-of-withdrawal)',
      'प्रज्ञा प्रतिष्ठिता → standard refrain',
    ],
    keyFights: [
      'No finite verb! निगृहीतानि is PPP-as-predicate ("(senses) have-been-restrained"); प्रतिष्ठिता is again PPP-as-predicate. Both with implicit अस्ति.',
      'Final and most concentrated repetition of तस्य प्रज्ञा प्रतिष्ठिता (cf. 2.57, 2.58, 2.61) — Krishna closes the स्थित-प्रज्ञ description-cycle.',
      'पञ्चमी-of-withdrawal again: इन्द्रियाणि इन्द्रियार्थेभ्यः निगृहीतानि = "(the senses are) restrained FROM the sense-objects". Same structure as 2.58.',
    ],
    anvaya:
      'तस्मात् | महाबाहो | यस्य इन्द्रियाणि सर्वशः इन्द्रियार्थेभ्यः निगृहीतानि | तस्य प्रज्ञा प्रतिष्ठिता',
    hindi:
      'इसलिए, हे महाबाहो! जिसकी इन्द्रियाँ इन्द्रिय-विषयों से सब प्रकार से निग्रहीत हैं, उसी की प्रज्ञा प्रतिष्ठित है।',
    english:
      'Therefore, O mighty-armed one, he whose senses are wholly restrained from the objects of sense — his wisdom is firmly established.',
  },

  '2.69': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'या',
      'निशा',
      'सर्व-भूतानाम्',
      'तस्याम्',
      'जागर्ति',
      'संयमी',
      'यस्याम्',
      'जाग्रति',
      'भूतानि',
      'सा',
      'निशा',
      'पश्यतः',
      'मुनेः',
    ],
    sandhiNotes: [
      'पश्यतो मुनेः = पश्यतः + मुनेः (-ः + म → -ो)',
    ],
    finiteVerbs: [
      { form: 'जागर्ति', root: '√जागृ', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"is awake / wakes" (intensive-stem)' },
      { form: 'जाग्रति', root: '√जागृ', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"are awake" (plural)' },
    ],
    vibhaktiNotes: [
      'या ... तस्याम् → प्रथमा/सप्तमी एकवचन (स्त्री) — relative-correlative #1',
      'यस्याम् ... सा → सप्तमी/प्रथमा एकवचन (स्त्री) — relative-correlative #2',
      'निशा (twice) → प्रथमा एकवचन (स्त्री) — subject',
      'सर्वभूतानाम् → षष्ठी बहुवचन = "of all beings"',
      'संयमी → प्रथमा एकवचन (-इन् stem) = "the self-controlled (one)"',
      'भूतानि → प्रथमा बहुवचन (नपुंसक) — subject of जाग्रति',
      'पश्यतः मुनेः → षष्ठी एकवचन = "of the seeing-sage" (शानच् + noun)',
    ],
    keyFights: [
      'A perfect chiastic relative-correlative: या निशा सर्वभूतानाम् | तस्याम् जागर्ति संयमी ‖ यस्याम् जाग्रति भूतानि | सा निशा पश्यतः मुनेः. The structure inverts: night-(of)-all → (in)-it the-yogi-wakes ‖ (in)-which the-(others)-wake → that-night for-the-seer.',
      'जागर्ति vs जाग्रति — same root √जागृ, singular vs. plural. The intensive स्तेम जाग्र- with -र्ति/-न्ति endings is a Vedic-flavoured form Krishna deploys for poetic effect.',
      'पश्यतः मुनेः — षष्ठी एकवचन of the शानच् present participle of √दृश्. The -तः ending after -अत् stems is the regular masculine genitive-singular.',
    ],
    anvaya:
      'या सर्वभूतानाम् निशा | तस्याम् संयमी जागर्ति | यस्याम् भूतानि जाग्रति | सा पश्यतः मुनेः निशा',
    hindi:
      'जो सब प्राणियों के लिए रात (= अज्ञान) है, उसमें संयमी (योगी) जागता है। और जिसमें प्राणी जागते हैं — वह (बाह्य व्यवहार) तत्त्व-दर्शी मुनि के लिए रात है।',
    english:
      'What is night to all beings, in that the self-controlled one is awake; and in what (other beings) are awake, that is night to the seeing sage.',
  },

  '2.70': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'आपूर्यमाणम्',
      'अचल-प्रतिष्ठम्',
      'समुद्रम्',
      'आपः',
      'प्रविशन्ति',
      'यद्वत्',
      'तद्वत्',
      'कामाः',
      'यम्',
      'प्रविशन्ति',
      'सर्वे',
      'सः',
      'शान्तिम्',
      'आप्नोति',
      'न',
      'काम-कामी',
    ],
    sandhiNotes: [
      'समुद्रमापः = समुद्रम् + आपः (-म् + आ → -मा)',
      'तद्वत्कामा यं = तद्वत् + कामाः + यम् (त्-junction; -ः + य → -ा)',
      'सर्वे स = सर्वे + सः (final visarga lopa before consonant)',
      'शान्तिमाप्नोति = शान्तिम् + आप्नोति (-म् + आ → -मा)',
    ],
    finiteVerbs: [
      { form: 'प्रविशन्ति', root: 'प्र + √विश्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', pada: 'P', gloss: '"they enter" (twice — once for waters, once for desires)' },
      { form: 'आप्नोति', root: '√आप्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"obtains, attains"' },
    ],
    vibhaktiNotes: [
      'आपूर्यमाणम् अचलप्रतिष्ठम् समुद्रम् → द्वितीया एकवचन — object of प्रविशन्ति in the simile',
      'आपः → प्रथमा बहुवचन (स्त्री, irregular) — subject in the simile',
      'यद्वत् ... तद्वत् → indeclinable correlative = "just as ... so"',
      'कामाः → प्रथमा बहुवचन — subject of प्रविशन्ति in the main clause',
      'यम् → द्वितीया एकवचन (relative) — object of प्रविशन्ति',
      'सर्वे → प्रथमा बहुवचन — agreeing with कामाः',
      'सः → प्रथमा एकवचन — correlative subject of आप्नोति',
      'शान्तिम् → द्वितीया एकवचन — object of आप्नोति',
      'कामकामी → प्रथमा एकवचन (बहुव्रीहि, -इन् stem) = "(one) whose-desire-is-for-desires"',
    ],
    keyFights: [
      'Magnificent ocean simile, with twin प्रविशन्ति. यद्वत् ... तद्वत् holds the analogy. आपूर्यमाणम् ("being-filled-up") is the present passive participle of आ + √पॄ — Sanskrit\'s elegant present-passive form.',
      'अचलप्रतिष्ठम् — कर्मधारय: "(one) of-unmoving-establishment". Describes the ocean: even as the rivers pour in, the sea remains brimful and steady.',
      'कामकामी — a paranomastic बहुव्रीहि: "desirer-of-desires". The verb-of-action contained inside the noun is itself the noun. Krishna\'s closing zinger.',
      'आपः is irregularly only-plural-feminine; प्रथमा बहुवचन ends in -ः directly. A common stumbling block.',
    ],
    anvaya:
      'आपूर्यमाणम् अचलप्रतिष्ठम् समुद्रम् | आपः प्रविशन्ति यद्वत् | तद्वत् सर्वे कामाः यम् प्रविशन्ति | सः शान्तिम् आप्नोति | न कामकामी',
    hindi:
      'जैसे (नदियों के) जल समुद्र में — जो भरता रहता है पर अचल बना रहता है — प्रवेश करते हैं; उसी प्रकार जिसमें सब कामनाएँ प्रवेश कर (समा) जाती हैं, वही शान्ति को प्राप्त करता है — कामनाओं की कामना करनेवाला (= काम-कामी) नहीं।',
    english:
      'As the waters enter the ocean — which, ever filling, yet stays motionless and full — so do all desires enter him: he attains peace, not the desirer of desires.',
  },

  '2.71': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'विहाय',
      'कामान्',
      'यः',
      'सर्वान्',
      'पुमान्',
      'चरति',
      'निःस्पृहः',
      'निर्ममः',
      'निरहङ्कारः',
      'सः',
      'शान्तिम्',
      'अधिगच्छति',
    ],
    sandhiNotes: [
      'कामान्यः = कामान् + यः (न्-junction)',
      'सर्वान्पुमान् = सर्वान् + पुमान् (न्-junction; -ान् ending of पुम्-stem)',
      'पुमांश्चरति = पुमान् + चरति (न् + च → ंश्च)',
      'शान्तिमधिगच्छति = शान्तिम् + अधिगच्छति (-म् + अ → -म)',
    ],
    finiteVerbs: [
      { form: 'चरति', root: '√चर्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"moves about / lives"' },
      { form: 'अधिगच्छति', root: 'अधि + √गम्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"attains"' },
    ],
    vibhaktiNotes: [
      'विहाय → absolutive of वि + √हा = "having abandoned"',
      'कामान् सर्वान् → द्वितीया बहुवचन — object of विहाय',
      'यः ... सः → प्रथमा एकवचन (relative-correlative)',
      'पुमान् → प्रथमा एकवचन (पुम्-stem, irregular) = "man, person"',
      'निःस्पृहः, निर्ममः, निरहङ्कारः → प्रथमा एकवचन (बहुव्रीहि triple) — predicate adjectives',
      'शान्तिम् → द्वितीया एकवचन — object of अधिगच्छति',
    ],
    keyFights: [
      'Three negative-prefixed बहुव्रीहि: निःस्पृहः (without-longing), निर्ममः (without-mine-ness), निरहङ्कारः (without-I-ness). The तृ-pada of the verse is structurally a triple-list of predicate-attributes.',
      'पुमान् is the prātipadika पुम् ("man") in irregular प्रथमा एकवचन. The form पुमांश्चरति shows the rare retention of -ंस् before palatal — a phonological cue. The dual पुमांसौ and plural पुमांसः share the same stem-quirk.',
      'विहाय is absolutive of वि + √हा (वि-prefix doesn\'t take त्वा-suffix; uses -य): "having-cast-off". A Sanskrit absolutive-of-prefix-verbs basic.',
      'Closes the long स्थित-प्रज्ञ description with the matching शान्तिम् अधिगच्छति from 2.70 — the parallel verb-pair caps the section.',
    ],
    anvaya:
      'यः पुमान् | सर्वान् कामान् विहाय | निःस्पृहः निर्ममः निरहङ्कारः (सन्) चरति | सः शान्तिम् अधिगच्छति',
    hindi:
      'जो मनुष्य सब कामनाओं को त्यागकर — स्पृहा-रहित, ममत्व-रहित और अहङ्कार-रहित होकर — विचरण करता है, वही शान्ति को प्राप्त होता है।',
    english:
      'The man who, casting off all desires, walks free from longing, free from "mine"-ness, free from egotism — he attains peace.',
  },

  '2.72': {
    speaker: 'श्रीभगवानुवाच',
    padaccheda: [
      'एषा',
      'ब्राह्मी',
      'स्थितिः',
      'पार्थ',
      'न',
      'एनाम्',
      'प्राप्य',
      'विमुह्यति',
      'स्थित्वा',
      'अस्याम्',
      'अन्त-काले',
      'अपि',
      'ब्रह्म-निर्वाणम्',
      'ऋच्छति',
    ],
    sandhiNotes: [
      'नैनाम् = न + एनाम् (अ + ए → ै)',
      'स्थित्वास्याम् = स्थित्वा + अस्याम् (आ + अ → ा)',
      'अन्तकालेऽपि = अन्तकाले + अपि (-े + अ → -एऽ)',
      'ब्रह्मनिर्वाणमृच्छति = ब्रह्मनिर्वाणम् + ऋच्छति (-म् + ऋ → -म)',
    ],
    finiteVerbs: [
      { form: 'विमुह्यति', root: 'वि + √मुह्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"becomes deluded" (negated)' },
      { form: 'ऋच्छति', root: '√ऋ', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', pada: 'P', gloss: '"reaches, attains" (irregular -च्छ- present)' },
    ],
    vibhaktiNotes: [
      'एषा ब्राह्मी स्थितिः → प्रथमा एकवचन (स्त्री) — subject of implicit अस्ति',
      'पार्थ → सम्बोधन एकवचन',
      'एनाम् → द्वितीया एकवचन (स्त्री) — object of प्राप्य',
      'प्राप्य → absolutive of प्र + √आप् = "having attained"',
      'स्थित्वा → absolutive of √स्था = "having stood / having abided"',
      'अस्याम् → सप्तमी एकवचन (स्त्री) = "in this (state)"',
      'अन्तकाले → सप्तमी एकवचन = "at the time-of-end (death)"',
      'ब्रह्मनिर्वाणम् → द्वितीया एकवचन (नपुंसक) — object of ऋच्छति',
    ],
    keyFights: [
      'The closing verse of Chapter 2. एषा ब्राह्मी स्थितिः ("this is the brahma-state") — एषा the topic-pronoun, ब्राह्मी the तद्धित feminine adjective from ब्रह्मन्. Both प्रथमा एकवचन स्त्री in agreement with स्थितिः.',
      'Two absolutives → one finite verb structure repeated: एनाम् प्राप्य ... विमुह्यति | अस्याम् स्थित्वा ... ऋच्छति. The absolutives create the conditional setup; the finite verb delivers the result.',
      'अन्तकाले अपि — सप्तमी + एमphatic अपि: "EVEN at the time of death". The Gītā\'s philosophical wager: even last-moment establishment in this state delivers ब्रह्म-निर्वाण.',
      'ब्रह्मनिर्वाणम् — कर्मधारय: "the brahma-extinction". An adapted-from-Buddhism term that Krishna domesticates into the Vedānta vocabulary.',
      'ऋच्छति is the irregular -च्छ-stem present of √ऋ (cf. गच्छति from √गम्). The -च्छ- present-stem from a vowel-final root is a rare Sanskrit form.',
    ],
    anvaya:
      'पार्थ | एषा ब्राह्मी स्थितिः | एनाम् प्राप्य न विमुह्यति | अस्याम् अन्तकाले अपि स्थित्वा | ब्रह्मनिर्वाणम् ऋच्छति',
    hindi:
      'हे पार्थ! यह ब्राह्मी स्थिति है। इसको प्राप्त करके (मनुष्य) मोह को नहीं प्राप्त होता। अन्त-काल (मृत्यु-समय) में भी इसमें स्थित होकर वह ब्रह्म-निर्वाण को प्राप्त कर लेता है।',
    english:
      'This is the state of Brahman, O Pārtha; having attained it, one is no longer deluded. Standing fast in it even at the hour of death, one attains absorption in Brahman.',
  },

};
