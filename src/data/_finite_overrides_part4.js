// Top-up overrides for verses where the new (post-suppression) engine
// returns no finite verb but the original FINITE_OVERRIDES (parts 1-3)
// didn't cover them — they previously had a regex-false-positive
// classification that's now correctly suppressed.
//
// Vast majority are genuinely nominal sentences (qualities lists,
// नाम lists, vibhūti enumerations). A handful have real verbs the
// engine + vocab still miss.
export const FINITE_OVERRIDES_PART_4 = {
  // Engine-missed verbs:
  '16.8': [
    { form: 'आहुः', root: 'आह्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'बहुवचन', gloss: '"they call/declare" (perfect tense, used as present)' },
  ],
  '11.37': [
    { form: 'नमेरन्', root: 'नम्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'बहुवचन', gloss: '"how should they not bow?" (rhetorical optative)' },
  ],
  '11.39': [
    { form: 'अस्तु', root: 'अस्', lakara: 'लोट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"let it be" (नमः नमः ते अस्तु — "salutation be unto you")' },
  ],

  // अस्ति sandhi-merged across these — engine doesn't yet split before
  // a word-internal अस्ति, so the verb is buried in the surface chunk.
  '7.7': [
    { form: 'अस्ति', root: 'अस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"is/exists" — buried in नान्यत्किञ्चिदस्ति' },
  ],
  '3.22': [
    { form: 'अस्ति', root: 'अस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"is/exists" — buried in पार्थास्ति' },
  ],
  '10.40': [
    { form: 'अस्ति', root: 'अस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"is/exists" — buried in नान्तोऽस्ति' },
  ],
  '6.16': [
    { form: 'अस्ति', root: 'अस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"is/exists" — Krishna\'s yoga-prescription "योगो\'अस्ति"' },
  ],
  '2.66': [
    { form: 'अस्ति', root: 'अस्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"is" — नास्ति "(there) is not" (न + अस्ति)' },
  ],
  '8.26': [
    { form: 'याति', root: 'या', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"goes" / "attains"' },
    { form: 'आवर्तते', root: 'वृत्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"returns" (आ + वर्त्) — buried in अन्ययावर्तते' },
  ],

  '11.36': [
    { form: 'द्रवन्ति', root: 'द्रु', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', gloss: '"they flee / rush"' },
    { form: 'नमस्यन्ति', root: 'नमस्य्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'बहुवचन', gloss: '"they bow / honour" (denominative from नमस्)' },
  ],

  // Cross-verse एक-वाक्यता: 1.20 is a long participle phrase that
  // resolves at 1.21 ("...आह वाक्यमिदम्"). No overt finite verb in 1.20.
  '1.20': null,
  // निर्योगक्षेम is an adjective stem ("free from acquisition-and-
  // preservation"), not a विधिलिङ् verb. Engine regex matched -एम wrongly.
  '2.45': null,

  // Nominal sentences (implied अस्ति):
  '1.5':  null,  // name list of warriors
  '1.6':  null,  // name list of warriors
  '2.43': null,  // descriptive — "those whose self is desire, intent on heaven, ..."
  '5.13': null,  // pres-participles only (कुर्वन्, कारयन्); implied अस्ति
  '5.19': null,  // PPP-only (जितः, स्थिताः); copula implied
  '5.27': null,  // absolutive-only (कृत्वा); finite resolves at 5.28
  '6.13': null,  // pres-participles (धारयन्, अनवलोकयन्); implied अस्ति
  '7.4':  null,  // eight-fold prakriti enumeration
  '7.18': null,  // PPP-only (मतम्, आस्थितः)
  '9.18': null,  // epithet list (gati, bhartā, prabhuḥ, …)
  '10.34': null, // viभूति identification ("I am Death...")
  '11.2': null,  // PPP-only (श्रुतौ); copula implied
  '11.20': null, // PPPs (व्याप्तम्, प्रव्यथितम्); implied अस्ति
  '11.23': null, // PPPs (प्रव्यथिताः, अहम्); copula implied
  '11.41': null, // PPP/absolutive (यदुक्तम्, मत्वा)
  '13.12': null, // PPP (प्रोक्तम्); definitional sentence
  '13.23': null, // PPP (चाप्युक्तः) + epithet list
  '14.27': null, // identification "I am the foundation of Brahman..."
  '16.11': null, // qualities list (चिन्ताम्...परमाः...निश्चिताः)
  '17.10': null, // tāmasic-food enumeration
  '17.23': null, // definitional (PPPs only — स्मृतः, विहिताः)
  '18.6':  null, // gerundive + PPP (कर्तव्यानि, मतम्, त्यक्त्वा)
  '18.18': null, // categorization list (त्रिविधा, त्रिविधः)
  '18.22': null, // PPP-only (उदाहृतम्); definitional
  '18.72': null, // implied अस्ति (श्रुतम्...प्रनष्टः...धनञ्जय)
};
