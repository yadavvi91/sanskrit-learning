// Hand-decoded क्रिया overrides for verses where the autoDecode engine
// either missed the finite verb or where the verse genuinely has none.
// Used by hydrate.js to fill verse.finiteVerbs and (for null entries)
// suppress the audit warning.
//
// Each finite-verb object: {form, root, lakara, purusha, vachana, gloss}
//   form: actual surface form as it appears in mool (post-sandhi OK)
//   root: dhātu in Devanagari with viraama (e.g., 'पच्', 'भू', 'गम्')
//   lakara: 'लट्' | 'लङ्' | 'लृट्' | 'लोट्' | 'विधिलिङ्' | 'लिट्' | etc.
//   purusha: 'प्रथम' | 'मध्यम' | 'उत्तम'
//   vachana: 'एकवचन' | 'द्विवचन' | 'बहुवचन'
//   gloss: short English meaning ("you are able", "they go", etc.)
export const FINITE_OVERRIDES_PART_1 = {
  '15.2': null,  // nominal — branches/roots described via PPPs (प्रसृताः, अनुसन्ततानि), no finite verb
  '15.15': null,  // nominal — equational "I am X", वेद्यः is gerundive, no finite verb in this verse
  '15.17': [
    { form: 'बिभर्ति', root: 'भृ', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"sustains/supports (the three worlds)"' }
  ],
  '12.14': null,  // nominal — qualities-of-bhakta description, ends "स मे प्रियः" (implied अस्ति)
  '12.16': null,  // nominal — qualities-of-bhakta description, ends "स मे प्रियः" (implied अस्ति)
  '12.18': null,  // nominal — qualities-of-bhakta description (समः... समः), implied अस्ति
  '12.19': null,  // nominal — qualities-of-bhakta description, ends "प्रियो नरः" (implied अस्ति)
  '16.1': null,  // nominal — daiva-sampad list of qualities, no finite verb
  '16.2': null,  // nominal — daiva-sampad list of qualities continued, no finite verb
  '16.4': null,  // nominal — asuri-sampad list of qualities, no finite verb
  '16.6': [
    { form: 'शृणु', root: 'श्रु', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"hear/listen!"' }
  ],
  '16.18': null,  // nominal — description of asuras (संश्रिताः, प्रद्विषन्तः, अभ्यसूयकाः all participial); finite verb is in 16.19
  '17.6': [
    { form: 'विद्धि', root: 'विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"know (them as asura-resolved)!"' }
  ],
  '17.8': null,  // nominal — description of sattvic foods (आहाराः सात्त्विकप्रियाः), implied अस्ति
  '17.9': null,  // nominal — description of rajasic foods (आहाराः... इष्टाः), implied अस्ति
  '14.24': null,  // nominal — qualities of guṇātīta described nominally, implied अस्ति
  '8.4': null,  // nominal — equational definitions (अधिभूतं X, पुरुषः Y, अधियज्ञः अहम् एव), implied अस्ति
  '8.7': [
    { form: 'अनुस्मर', root: 'स्मृ', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"remember (me)!"' },
    { form: 'युध्य', root: 'युध्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"fight!"' },
    { form: 'एष्यसि', root: 'इ', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"you will come/attain (me)"' }
  ],
  '8.9': [
    { form: 'अनुस्मरेत्', root: 'स्मृ', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should meditate on/remember"' }
  ],
  '8.12': null,  // nominal — absolutives (संयम्य, निरुध्य, आधाय) and PPP (आस्थितः); finite verb resolves in 8.13
  '8.22': null,  // nominal — पुरुषः... लभ्यः (gerundive), ततम् (PPP), no finite verb
  '5.18': null,  // nominal — पण्डिताः समदर्शिनः, implied अस्ति/भवन्ति
  '5.20': [
    { form: 'प्रहृष्येत्', root: 'हृष्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should rejoice (negated: should not rejoice)"' },
    { form: 'उद्विजेत्', root: 'विज्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should be agitated (negated: should not be agitated)"' }
  ],
  '5.23': [
    { form: 'शक्नोति', root: 'शक्', lakara: 'लट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"is able (to bear)"' }
  ],
  '5.28': null,  // nominal — मुनिः... मुक्तः एव सः, implied अस्ति
  '7.6': [
    { form: 'उपधारय', root: 'धृ', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"understand/know (thus)!"' }
  ],
  '13.3': [
    { form: 'विद्धि', root: 'विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"know (me also as the kṣetrajña)!"' }
  ],
  '13.4': [
    { form: 'शृणु', root: 'श्रु', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"hear (briefly from me)!"' }
  ],
  '13.5': null,  // nominal — गीतम् (PPP) describes how it has been sung; no finite verb (implied अस्ति with the PPP)
  '13.6': null,  // nominal — list of kṣetra constituents (mahābhūtas, ahaṅkāra, buddhi, avyakta...), no finite verb
  '13.7': null,  // nominal — list continues, उदाहृतम् is PPP, implied अस्ति
  '13.8': null,  // nominal — jñāna qualities list (amānitva, adambhitva...), no finite verb
  '13.9': null,  // nominal — jñāna qualities list continues, no finite verb
  '13.10': null,  // nominal — jñāna qualities list continues, no finite verb
  '13.11': null,  // nominal — jñāna qualities list continues, no finite verb
  '13.15': null,  // nominal — description of jñeya brahman, all participial/adjectival, no finite verb
  '13.16': null,  // nominal — description of brahman (अचरम्, चरम्, दूरस्थम्, अन्तिके), no finite verb
  '13.17': null,  // nominal — स्थितम् (PPP), ज्ञेयम् (gerundive), descriptive, no finite verb
  '13.20': [
    { form: 'विद्धि', root: 'विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"know (prakṛti and puruṣa as both beginningless)!"' },
    { form: 'विद्धि', root: 'विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"know (the modifications and guṇas as prakṛti-born)!"' }
  ],
  '9.2': null,  // nominal — description of rāja-vidyā (पवित्रम्, उत्तमम्, सुसुखम्), कर्तुम् is infinitive, implied अस्ति
  '9.4': null,  // nominal — ततम् (PPP), अवस्थितः (PPP); equational with implied अस्मि/अस्ति
  '9.5': [
    { form: 'पश्य', root: 'दृश्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"behold (my divine yoga)!"' }
  ],
  '9.12': null,  // nominal — श्रिताः (PPP) describes the deluded; no finite verb in this verse
  '9.16': null,  // nominal — pure equational (अहं क्रतुः, अहं यज्ञः...), implied अस्मि
  '9.17': null,  // nominal — pure equational (पिता अहम्, माता, धाता, पितामहः...), implied अस्मि
  '9.33': [
    { form: 'भजस्व', root: 'भज्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"worship/devote yourself (to me)!"' }
  ],
  '4.5': [
    { form: 'वेद', root: 'विद्', lakara: 'लट्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: '"I know (them all)" (perfective form, present sense)' },
    { form: 'वेत्थ', root: 'विद्', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"you do not know" (perfective form, present sense)' }
  ],
  '4.10': null,  // nominal — all PPPs (उपाश्रिताः, पूताः, आगताः) describing devotees; no finite verb in this verse
  '4.13': [
    { form: 'विद्धि', root: 'विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"know (me as its non-doer too)!"' }
  ]
};
