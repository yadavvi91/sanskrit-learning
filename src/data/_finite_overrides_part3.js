// Finite verb overrides — part 3 (48 verses)
// Each entry is either an array of finite-verb objects or null (genuine nominal sentence with implied अस्ति).

export const FINITE_OVERRIDES_PART_3 = {
  // 1.34 — list of relatives (आचार्याः पितरः...). Pure nominal enumeration, implied सन्ति/एते.
  '1.34': null,

  // 1.36 — स्यात् (optative of √अस्), आश्रयेत् (optative of आ+√श्रि)
  '1.36': [
    { form: 'स्यात्', root: 'अस्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would be"' },
    { form: 'आश्रयेत्', root: 'श्रि', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would resort to / cling to"' },
  ],

  // 1.39 — ज्ञेयम् is gerundive (कृत्य), not finite. The clause is gerundive + implied अस्ति. Genuine nominal.
  '1.39': null,

  // 1.44 — भवति (लट् of √भू), अनुशुश्रुम (लिट् of अनु+√श्रु, उत्तम बहुवचन)
  '1.44': [
    { form: 'भवति', root: 'भू', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"becomes / is"' },
    { form: 'अनुशुश्रुम', root: 'श्रु', lakara: 'लिट्', purusha: 'उत्तम', vachana: 'बहुवचन', gloss: '"we have heard (by tradition)"' },
  ],

  // 1.45 — व्यवसिताः and उद्यताः are PPPs (krudanta) agreeing with वयम्/स्वजनम्. Implied स्मः. Nominal.
  '1.45': null,

  // 1.47 — उपाविशत् (लङ् of उप+आ+√विश्, प्रथम एकवचन = "he sat down")
  '1.47': [
    { form: 'उपाविशत्', root: 'विश्', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"sat down"' },
  ],

  // 11.1 — उक्तम् is PPP (krudanta), विगतः is also PPP. Both with implied अस्ति. Nominal.
  '11.1': null,

  // 11.5 — पश्य (लोट् of √दृश्, मध्यम एकवचन = "see / behold!")
  '11.5': [
    { form: 'पश्य', root: 'दृश्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"behold!"' },
  ],

  // 11.6 — पश्य twice (imperatives)
  '11.6': [
    { form: 'पश्य', root: 'दृश्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"behold!"' },
  ],

  // 11.9 — दर्शयामास is periphrastic perfect (लिट् of √दृश् causative, प्रथम एकवचन = "he showed")
  '11.9': [
    { form: 'दर्शयामास', root: 'दृश्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"showed (forth)"' },
  ],

  // 11.10 — pure description (anekavaktra... etc.) — accusative epithets of रूपम् from 11.9. No finite verb in this verse.
  '11.10': null,

  // 11.11 — continuation of accusative epithets describing the form. Nominal.
  '11.11': null,

  // 11.12 — भवेत् (विधिलिङ् of √भू), स्यात् (विधिलिङ् of √अस्)
  '11.12': [
    { form: 'भवेत्', root: 'भू', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would arise / would be"' },
    { form: 'स्यात्', root: 'अस्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would be (comparable)"' },
  ],

  // 11.14 — अभाषत (लङ् आत्मनेपद of √भाष्, प्रथम एकवचन = "he spoke")
  '11.14': [
    { form: 'अभाषत', root: 'भाष्', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"spoke"' },
  ],

  // 11.18 — मतः is PPP ("are considered"); वेदितव्यम् is gerundive. Both predicate-nominals with implied अस्ति. Nominal.
  '11.18': null,

  // 11.26 — describing who enters Krishna's mouths; verb (विशन्ति) is in 11.27. This verse is nominal/listing.
  '11.26': null,

  // 11.35 — आह (लिट् of √ब्रू/√अह्, प्रथम एकवचन = "he said")
  '11.35': [
    { form: 'आह', root: 'अह्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"said"' },
  ],

  // 11.47 — दर्शितम् is PPP ("has been shown") with implied अस्ति. दृष्टपूर्वम् also nominal compound. Nominal.
  '11.47': null,

  // 11.48 — शक्यः ("able/possible to be seen"); द्रष्टुम् is infinitive. Predicate adjective + implied अस्मि. Nominal.
  '11.48': null,

  // 11.54 — शक्यः again, predicate adjective with implied अस्मि. Infinitives ज्ञातुम्/द्रष्टुम्/प्रवेष्टुम्. Nominal.
  '11.54': null,

  // 18.5 — त्याज्यम्, कार्यम् are gerundives (krudanta) with implied अस्ति. Listing. Nominal.
  '18.5': null,

  // 18.14 — list of the 5 causes of action. Pure enumeration with implied सन्ति. Nominal.
  '18.14': null,

  // 18.27 — परिकीर्तितः is PPP ("is called"). Implied अस्ति. Nominal.
  '18.27': null,

  // 18.29 — शृणु (लोट् of √श्रु, मध्यम एकवचन = "hear!")
  '18.29': [
    { form: 'शृणु', root: 'श्रु', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"hear!"' },
  ],

  // 18.37 — प्रोक्तम् is PPP ("is declared"). Implied अस्ति. Nominal.
  '18.37': null,

  // 18.38 — स्मृतम् is PPP ("is remembered/declared"). Implied अस्ति. Nominal.
  '18.38': null,

  // 18.39 — उदाहृतम् is PPP ("is called"). Implied अस्ति. Nominal.
  '18.39': null,

  // 18.41 — प्रविभक्तानि is PPP ("have been distinguished"). Implied सन्ति. Nominal.
  '18.41': null,

  // 18.42 — list of brahmin qualities; predicate नominals with implied अस्ति/भवति. Nominal.
  '18.42': null,

  // 18.43 — list of kshatriya qualities. Nominal enumeration with implied अस्ति.
  '18.43': null,

  // 18.44 — vaishya/shudra duties. Nominal enumeration.
  '18.44': null,

  // 18.51 — participial chain (युक्तः, नियम्य, त्यक्त्वा, व्युदस्य) leading to verb in 18.53 (कल्पते). This verse alone has no finite verb.
  '18.51': null,

  // 18.52 — continuation of the participial chain begun in 18.51. Predicate adjectives. Nominal.
  '18.52': null,

  // 18.57 — भव (लोट् of √भू, मध्यम एकवचन = "be!")
  '18.57': [
    { form: 'भव', root: 'भू', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"be!"' },
  ],

  // 18.69 — भविता is periphrastic future (लुट्) of √भू, प्रथम एकवचन = "will be"
  '18.69': [
    { form: 'भविता', root: 'भू', lakara: 'लुट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"will be"' },  // AUDIT — लुट् (periphrastic future) is rare; common parser may misread as agentive noun
  ],

  // 18.71 — शृणुयात् (विधिलिङ् of √श्रु), प्राप्नुयात् (विधिलिङ् of प्र+√आप्)
  '18.71': [
    { form: 'शृणुयात्', root: 'श्रु', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should hear"' },
    { form: 'प्राप्नुयात्', root: 'आप्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would attain"' },
  ],

  // 18.75 — श्रुतवान् is perfect active participle (-वत् krudanta), not finite. कथयतः is genitive of present participle. No finite verb. Nominal (implied अस्मि).
  '18.75': null,

  // 18.78 — declares "where K and Arjuna are, there..." — predicate nominal pattern with implied अस्ति/भविष्यति. Nominal.
  '18.78': null,

  // 2.1 — उवाच (लिट् of √वच्, प्रथम एकवचन = "he said")
  '2.1': [
    { form: 'उवाच', root: 'वच्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"said"' },
  ],

  // 2.2 — समुपस्थितम् is PPP. Question "whence has this come upon you?" with implied अस्ति. Nominal.
  '2.2': null,

  // 2.10 — उवाच (लिट् of √वच्, प्रथम एकवचन = "he said")
  '2.10': [
    { form: 'उवाच', root: 'वच्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"said"' },
  ],

  // 2.24 — string of predicate adjectives describing आत्मा (अच्छेद्यः, अदाह्यः, नित्यः...). Implied अस्ति. Nominal.
  '2.24': null,

  // 2.28 — predicate नominals about भूतानि; question "का परिदेवना" (what lament?). Implied अस्ति. Nominal.
  '2.28': null,

  // 2.41 — predicate nominal description of buddhi. Implied अस्ति/सन्ति. Nominal.
  '2.41': null,

  // 2.46 — yāvān...tāvān correlative; both halves predicate nominals with implied अस्ति. Nominal.
  '2.46': null,

  // 2.49 — अन्विच्छ (लोट् of अनु+√इष्, मध्यम एकवचन = "seek!")
  '2.49': [
    { form: 'अन्विच्छ', root: 'इष्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"seek!"' },
  ],

  // 2.54 — प्रभाषेत (विधिलिङ् of प्र+√भाष्), आसीत (विधिलिङ् of √आस्), व्रजेत (विधिलिङ् of √व्रज्)
  '2.54': [
    { form: 'प्रभाषेत', root: 'भाष्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would speak"' },
    { form: 'आसीत', root: 'आस्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would sit"' },
    { form: 'व्रजेत', root: 'व्रज्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would walk"' },
  ],

  // 2.68 — निगृहीतानि and प्रतिष्ठिता are PPPs with implied सन्ति/अस्ति. Nominal.
  '2.68': null,
};
