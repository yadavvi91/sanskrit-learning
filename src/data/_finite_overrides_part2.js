// Manual finite-verb overrides — part 2.
//
// The autoDecode engine produced no finite verbs for 49 verses listed in
// chunk2.json. Each entry below is one of:
//   • an array of finite-verb objects { form, root, lakara, purusha, vachana, gloss }
//   • null — for genuine nominal sentences (implied अस्ति, descriptive lists,
//     PPP-only clauses, vocative-only enumerations).
// Inline comments explain null cases and any uncertain calls (// AUDIT).

export const FINITE_OVERRIDES_PART_2 = {
  '4.15': [
    { form: 'कुरु', root: '√कृ', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"do (perform action)!"' },
  ],
  // 4.17 — three gerundives (बोद्धव्यम्) with implied अस्ति + nominal "गहना गतिः".
  '4.17': null,
  '4.18': [
    { form: 'पश्येत्', root: '√दृश्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"would see / who sees"' },
  ],
  // 4.24 — equative nominals (X is brahman) plus gerundive गन्तव्यम्; no finite verb.
  '4.24': null,
  // 4.28 — bare list of yajña-types and the यतयः who practise them; nominal enumeration.
  '4.28': null,
  '4.42': [
    { form: 'आतिष्ठ', root: 'आ + √स्था', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"resort to / take to (yoga)!"' },
    { form: 'उत्तिष्ठ', root: 'उद् + √स्था', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"rise up!"' },
  ],
  '3.2': [
    { form: 'मोहयसि', root: '√मुह् (caus.)', lakara: 'लट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"you bewilder"' },
    { form: 'वद', root: '√वद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"speak / tell!"' },
    { form: 'आप्नुयाम्', root: 'आ + √आप्', lakara: 'विधिलिङ्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: '"I might attain"' },
  ],
  // 3.3 — प्रोक्ता is a feminine PPP agreeing with निष्ठा; sentence is nominal
  // ("the two-fold disposition [was] declared by me") with implied अस्ति.
  '3.3': null,
  '3.9': [
    { form: 'समाचर', root: 'सम् + आ + √चर्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"perform / practise!"' },
  ],
  '3.10': [
    { form: 'उवाच', root: '√वच्', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"said" (पुरा + उवाच — "spoke of old")' },
    { form: 'प्रसविष्यध्वम्', root: 'प्र + √सू', lakara: 'लृट्', purusha: 'मध्यम', vachana: 'बहुवचन', gloss: '"may you propagate / bring forth"' },
    { form: 'अस्तु', root: '√अस्', lakara: 'लोट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"let it be"' },
  ],
  '3.15': [
    { form: 'विद्धि', root: '√विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"know!"' },
  ],
  // 3.18 — twin negated nominal clauses ("there is no purpose for him in either"),
  // implied अस्ति in both halves.
  '3.18': null,
  '3.24': [
    { form: 'उत्सीदेयुः', root: 'उद् + √सद्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'बहुवचन', gloss: '"would perish / fall to ruin"' },
    { form: 'कुर्याम्', root: '√कृ', lakara: 'विधिलिङ्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: '"I should do"' },
    { form: 'स्याम्', root: '√अस्', lakara: 'विधिलिङ्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: '"I would be"' },
    { form: 'उपहन्याम्', root: 'उप + √हन्', lakara: 'विधिलिङ्', purusha: 'उत्तम', vachana: 'एकवचन', gloss: '"I would destroy"' },
  ],
  '3.26': [
    { form: 'जनयेत्', root: '√जन् (caus.)', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should produce / cause"' },
    { form: 'जोषयेत्', root: '√जुष् (caus.)', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should make (others) enjoy / engage in"' },
  ],
  '3.30': [
    { form: 'युध्यस्व', root: '√युध्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"fight!"' },
  ],
  '3.34': [
    { form: 'आगच्छेत्', root: 'आ + √गम्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should (not) come under (the sway of)"' },
  ],
  '3.37': [
    { form: 'विद्धि', root: '√विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"know!" (विद्धि + एनम् → विद्ध्येनम्)' },
  ],
  // 3.39 — आवृतम् is a neuter PPP describing ज्ञानम्; sentence is nominal with
  // implied अस्ति ("knowledge is veiled by this eternal foe…").
  '3.39': null,
  // 10.4 — pure enumeration of bhāvas (intelligence, wisdom, patience…); no verb.
  '10.4': null,
  // 10.6 — मद्भावाः मानसाः जाताः — PPP जाताः agreeing with महर्षयः/मनवः,
  // implied अस्ति; the relative येषाम् … इमाः प्रजाः is nominal too.
  '10.6': null,
  // 10.12 — Arjuna's address to Krishna: a stack of vocatives/predicates
  // ("the supreme brahman, supreme abode … art Thou") with implied अस्ति.
  '10.12': null,
  // 10.20 — "I am the self … I am the beginning, middle, end of beings" —
  // pure identification with implied अस्ति.
  '10.20': null,
  // 10.26 — "Among trees [I am] अश्वत्थ … among Devarṣis Nārada …" —
  // विभूति identification list with implied अस्मि.
  '10.26': null,
  '10.27': [
    { form: 'विद्धि', root: '√विद्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"know (me as)!"' },
  ],
  // 10.32 — विभूति identification list ("of creations I am the beginning,
  // middle and end …"); implied अस्मि.
  '10.32': null,
  // 10.35 — विभूति list ("of sāmans, the बृहत्साम; of metres, गायत्री …");
  // implied अस्मि.
  '10.35': null,
  '10.41': [
    { form: 'अवगच्छ', root: 'अव + √गम्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"understand / know!"' },
  ],
  // 10.42 — विष्टभ्य (absolutive) + स्थितः (PPP) "having pervaded … I stand";
  // PPP with implied अस्मि, no finite verb.
  '10.42': null,
  // 6.7 — समाहितः is PPP describing परमात्मा ("for one self-controlled,
  // the supreme self [is] composed …"); implied अस्ति.
  '6.7': null,
  // 6.11 — only the absolutive प्रतिष्ठाप्य; the finite verb (युञ्ज्यात्)
  // is in the next verse 6.12. This pāda by itself has no finite verb.
  '6.11': null,
  '6.12': [
    { form: 'युञ्ज्यात्', root: '√युज्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should yoke / practise (yoga)"' },
  ],
  '6.23': [
    { form: 'विद्यात्', root: '√विद्', lakara: 'विधिलिङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"should know"' },
  ],
  // 6.24 — only absolutives त्यक्त्वा and विनियम्य; the finite verb उपरमेत्
  // is in 6.25, so 6.24 alone is verb-less.
  '6.24': null,
  '6.46': [
    { form: 'भव', root: '√भू', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"be (a yogi)!"' },
  ],
  '1.3': [
    { form: 'पश्य', root: '√दृश्', lakara: 'लोट्', purusha: 'मध्यम', vachana: 'एकवचन', gloss: '"behold!" (पश्य + एताम् → पश्यैताम्)' },
  ],
  // 1.4 — list of warriors (युयुधानः, विराटः, द्रुपदः …); the governing verb
  // (अत्र … सन्ति, "here are…") is implied. Vocative-free nominal listing.
  '1.4': null,
  // 1.8 — continuation of the warrior catalogue (भीष्मः, कर्णः, कृपः …);
  // implied अस्ति/सन्ति.
  '1.8': null,
  // 1.9 — adjectival description of "many other heroes" (त्यक्तजीविताः,
  // नानाशस्त्रप्रहरणाः, युद्धविशारदाः); nominal, implied सन्ति.
  '1.9': null,
  // 1.10 — twin equational sentences: "that force of ours [is] insufficient,
  // this force of theirs [is] sufficient"; implied अस्ति.
  '1.10': null,
  '1.12': [
    { form: 'दध्मौ', root: '√ध्मा', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"blew (the conch)"' },
  ],
  '1.15': [
    { form: 'दध्मौ', root: '√ध्मा', lakara: 'लिट्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"blew (the conch)"' },
  ],
  // 1.16 — verse names conches (अनन्तविजय, सुघोष, मणिपुष्पक) and their
  // blowers; the finite verb दध्मतुः / दध्मुः is elided from the preceding
  // 1.15 catalogue and only resurfaces at 1.18 (दध्मुः). // AUDIT
  '1.16': null,
  // 1.17 — continuation of the same catalogue (काश्यः, शिखण्डी,
  // धृष्टद्युम्नः, विराटः, सात्यकिः …); verb still elided.
  '1.17': null,
  '1.19': [
    { form: 'व्यदारयत्', root: 'वि + √दॄ (caus.)', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"tore apart / rent"' },
  ],
  // 1.24 — only absolutive स्थापयित्वा and PPP एवमुक्तः; the finite verb
  // (उवाच) lands in 1.25.
  '1.24': null,
  '1.26': [
    { form: 'अपश्यत्', root: '√दृश्', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"saw" (तत्र + अपश्यत् → तत्रापश्यत्)' },
  ],
  // 1.27 — only absolutive समीक्ष्य; the finite verb अब्रवीत् is in 1.28.
  '1.27': null,
  '1.28': [
    { form: 'अब्रवीत्', root: '√ब्रू', lakara: 'लङ्', purusha: 'प्रथम', vachana: 'एकवचन', gloss: '"said / spoke"' },
  ],
  // 1.33 — काङ्क्षितम् (PPP) and अवस्थिताः (PPP) with implied अस्ति/सन्ति;
  // "those for whose sake we longed for kingdoms … stand here in battle…".
  '1.33': null,
};
