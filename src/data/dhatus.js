// Top dhātus by Khoomeik frequency, with metadata to feed the rule-engine in src/utils/conjugator.js.
//
// Data shape:
//   {
//     id, devanagari, iast, meanings,
//     gana (1..10), pada ('P'|'A'|'U'), thematic (bool),
//     frequencyRank, presentStem, futureStem?, perfect3sg?,
//     isSuppletive (true if presentStem ≠ root + gana rule),
//     forms?: { lakara: { P|A: { purusha: { vachana: 'override-form' } } } },
//     gitaOccurrences?: [{ chapter, verse, form, context }],
//     notes?: string
//   }
//
// For thematic regular roots (gana 1, 4, 6, 10), the conjugator generates all 45 P-cells
// from `presentStem` + `futureStem`. For athematic / irregular roots (gana 2, 3, 7, 8, 9
// and suppletives like √कृ), the full paradigm is overridden in `forms`.

const DHATUS = [
  // ────────────── 1. भू (be / become) — रुजगण १, परस्मैपद, fully thematic ──────────────
  {
    id: 'bhu',
    devanagari: 'भू',
    iast: 'bhū',
    meanings: ['be', 'become', 'exist'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 1,
    presentStem: 'भव',
    futureStem: 'भविष्य',
    perfect3sg: 'बभूव',
    isSuppletive: false,
    notes: 'Most-frequent Sanskrit dhātu. Fully regular गण १. Same root supplies the future of √अस्.',
  },

  // ────────────── 2. कृ (do / make) — गण ८, उभयपदी, irregular ──────────────
  {
    id: 'kr',
    devanagari: 'कृ',
    iast: 'kṛ',
    meanings: ['do', 'make', 'perform'],
    gana: 8,
    pada: 'U',
    thematic: false,
    frequencyRank: 2,
    presentStem: 'कुर्व', // weak stem — used in plural & weak cells
    futureStem: 'करिष्य',
    perfect3sg: 'चकार',
    isSuppletive: true,
    forms: {
      lat: {
        P: {
          prathama: { eka: 'करोति', dvi: 'कुरुतः', bahu: 'कुर्वन्ति' },
          madhyama: { eka: 'करोषि', dvi: 'कुरुथः', bahu: 'कुरुथ' },
          uttama:   { eka: 'करोमि', dvi: 'कुर्वः', bahu: 'कुर्मः' },
        },
      },
      lan: {
        P: {
          prathama: { eka: 'अकरोत्', dvi: 'अकुरुताम्', bahu: 'अकुर्वन्' },
          madhyama: { eka: 'अकरोः', dvi: 'अकुरुतम्', bahu: 'अकुरुत' },
          uttama:   { eka: 'अकरवम्', dvi: 'अकुर्व', bahu: 'अकुर्म' },
        },
      },
      lot: {
        P: {
          prathama: { eka: 'करोतु', dvi: 'कुरुताम्', bahu: 'कुर्वन्तु' },
          madhyama: { eka: 'कुरु', dvi: 'कुरुतम्', bahu: 'कुरुत' },
          uttama:   { eka: 'करवाणि', dvi: 'करवाव', bahu: 'करवाम' },
        },
      },
      vidhilin: {
        P: {
          prathama: { eka: 'कुर्यात्', dvi: 'कुर्याताम्', bahu: 'कुर्युः' },
          madhyama: { eka: 'कुर्याः', dvi: 'कुर्यातम्', bahu: 'कुर्यात' },
          uttama:   { eka: 'कुर्याम्', dvi: 'कुर्याव', bahu: 'कुर्याम' },
        },
      },
      lrt: {
        P: {
          prathama: { eka: 'करिष्यति', dvi: 'करिष्यतः', bahu: 'करिष्यन्ति' },
          madhyama: { eka: 'करिष्यसि', dvi: 'करिष्यथः', bahu: 'करिष्यथ' },
          uttama:   { eka: 'करिष्यामि', dvi: 'करिष्यावः', bahu: 'करिष्यामः' },
        },
      },
    },
    gitaOccurrences: [
      { chapter: 1, verse: 1, form: 'अकुर्वत', context: 'किमकुर्वत — "what did they do?"' },
    ],
  },

  // ────────────── 3. अस् (be) — गण २, परस्मैपद, athematic; supplied लृट् from √भू ──────────────
  {
    id: 'as',
    devanagari: 'अस्',
    iast: 'as',
    meanings: ['be', 'exist'],
    gana: 2,
    pada: 'P',
    thematic: false,
    frequencyRank: 3,
    presentStem: 'अस्',
    futureStem: 'भविष्य', // suppletive future from √भू
    perfect3sg: 'आस',
    isSuppletive: true,
    notes: 'Athematic; strong stem अस्, weak stem स्. Future is suppletive (uses √भू).',
    forms: {
      lat: {
        P: {
          prathama: { eka: 'अस्ति', dvi: 'स्तः', bahu: 'सन्ति' },
          madhyama: { eka: 'असि', dvi: 'स्थः', bahu: 'स्थ' },
          uttama:   { eka: 'अस्मि', dvi: 'स्वः', bahu: 'स्मः' },
        },
      },
      lan: {
        P: {
          prathama: { eka: 'आसीत्', dvi: 'आस्ताम्', bahu: 'आसन्' },
          madhyama: { eka: 'आसीः', dvi: 'आस्तम्', bahu: 'आस्त' },
          uttama:   { eka: 'आसम्', dvi: 'आस्व', bahu: 'आस्म' },
        },
      },
      lot: {
        P: {
          prathama: { eka: 'अस्तु', dvi: 'स्ताम्', bahu: 'सन्तु' },
          madhyama: { eka: 'एधि', dvi: 'स्तम्', bahu: 'स्त' },
          uttama:   { eka: 'असानि', dvi: 'असाव', bahu: 'असाम' },
        },
      },
      vidhilin: {
        P: {
          prathama: { eka: 'स्यात्', dvi: 'स्याताम्', bahu: 'स्युः' },
          madhyama: { eka: 'स्याः', dvi: 'स्यातम्', bahu: 'स्यात' },
          uttama:   { eka: 'स्याम्', dvi: 'स्याव', bahu: 'स्याम' },
        },
      },
      lrt: {
        P: {
          prathama: { eka: 'भविष्यति', dvi: 'भविष्यतः', bahu: 'भविष्यन्ति' },
          madhyama: { eka: 'भविष्यसि', dvi: 'भविष्यथः', bahu: 'भविष्यथ' },
          uttama:   { eka: 'भविष्यामि', dvi: 'भविष्यावः', bahu: 'भविष्यामः' },
        },
      },
    },
  },

  // ────────────── 4. गम् (go) — गण १, परस्मैपद, suppletive present stem गच्छ ──────────────
  {
    id: 'gam',
    devanagari: 'गम्',
    iast: 'gam',
    meanings: ['go', 'move'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 4,
    presentStem: 'गच्छ',
    futureStem: 'गमिष्य',
    perfect3sg: 'जगाम',
    isSuppletive: true,
    notes: 'Present stem replaces root: gam → गच्छ. After substitution, fully regular thematic.',
    gitaOccurrences: [
      { chapter: 2, verse: 3, form: 'गमः', context: 'मा स्म गमः — "do not yield" (लोट्-form negated)' },
    ],
    // Note: गमः in 2.3 is a लुङ् (aorist) form used with मा स्म — beyond our 5-lakara scope,
    // so we don't override लोट्. The presentStem suffices for the rest.
  },

  // ────────────── 5. इ (go) — गण २, परस्मैपद, athematic ──────────────
  {
    id: 'i',
    devanagari: 'इ',
    iast: 'i',
    meanings: ['go'],
    gana: 2,
    pada: 'P',
    thematic: false,
    frequencyRank: 5,
    presentStem: 'इ',
    futureStem: 'एष्य',
    perfect3sg: 'इयाय',
    isSuppletive: true,
    notes: 'Strong stem ए-, weak stem इ-. Common with उपसर्ग: अधि-इ → "to study" (अधी).',
    forms: {
      lat: {
        P: {
          prathama: { eka: 'एति', dvi: 'इतः', bahu: 'यन्ति' },
          madhyama: { eka: 'एषि', dvi: 'इथः', bahu: 'इथ' },
          uttama:   { eka: 'एमि', dvi: 'इवः', bahu: 'इमः' },
        },
      },
      lan: {
        P: {
          prathama: { eka: 'ऐत्', dvi: 'ऐताम्', bahu: 'आयन्' },
          madhyama: { eka: 'ऐः', dvi: 'ऐतम्', bahu: 'ऐत' },
          uttama:   { eka: 'आयम्', dvi: 'ऐव', bahu: 'ऐम' },
        },
      },
      lrt: {
        P: {
          prathama: { eka: 'एष्यति', dvi: 'एष्यतः', bahu: 'एष्यन्ति' },
          madhyama: { eka: 'एष्यसि', dvi: 'एष्यथः', bahu: 'एष्यथ' },
          uttama:   { eka: 'एष्यामि', dvi: 'एष्यावः', bahu: 'एष्यामः' },
        },
      },
    },
  },

  // ────────────── 6. हन् (kill) — गण २, परस्मैपद, athematic ──────────────
  {
    id: 'han',
    devanagari: 'हन्',
    iast: 'han',
    meanings: ['kill', 'strike'],
    gana: 2,
    pada: 'P',
    thematic: false,
    frequencyRank: 6,
    presentStem: 'हन्',
    futureStem: 'हनिष्य',
    perfect3sg: 'जघान',
    isSuppletive: true,
    notes: 'Athematic. Strong stem हन्, weak stem घ्न् in plural cells.',
    forms: {
      lat: {
        P: {
          prathama: { eka: 'हन्ति', dvi: 'हतः', bahu: 'घ्नन्ति' },
          madhyama: { eka: 'हंसि', dvi: 'हथः', bahu: 'हथ' },
          uttama:   { eka: 'हन्मि', dvi: 'हन्वः', bahu: 'हन्मः' },
        },
      },
      lrt: {
        P: {
          prathama: { eka: 'हनिष्यति', dvi: 'हनिष्यतः', bahu: 'हनिष्यन्ति' },
          madhyama: { eka: 'हनिष्यसि', dvi: 'हनिष्यथः', bahu: 'हनिष्यथ' },
          uttama:   { eka: 'हनिष्यामि', dvi: 'हनिष्यावः', bahu: 'हनिष्यामः' },
        },
      },
    },
  },

  // ────────────── 7. ज्ञा (know) — गण ९, परस्मैपद ──────────────
  {
    id: 'jna',
    devanagari: 'ज्ञा',
    iast: 'jñā',
    meanings: ['know', 'understand'],
    gana: 9,
    pada: 'P',
    thematic: false,
    frequencyRank: 7,
    presentStem: 'जाना',
    futureStem: 'ज्ञास्य',
    perfect3sg: 'जज्ञौ',
    isSuppletive: true,
    forms: {
      lat: {
        P: {
          prathama: { eka: 'जानाति', dvi: 'जानीतः', bahu: 'जानन्ति' },
          madhyama: { eka: 'जानासि', dvi: 'जानीथः', bahu: 'जानीथ' },
          uttama:   { eka: 'जानामि', dvi: 'जानीवः', bahu: 'जानीमः' },
        },
      },
      lrt: {
        P: {
          prathama: { eka: 'ज्ञास्यति', dvi: 'ज्ञास्यतः', bahu: 'ज्ञास्यन्ति' },
          madhyama: { eka: 'ज्ञास्यसि', dvi: 'ज्ञास्यथः', bahu: 'ज्ञास्यथ' },
          uttama:   { eka: 'ज्ञास्यामि', dvi: 'ज्ञास्यावः', bahu: 'ज्ञास्यामः' },
        },
      },
    },
  },

  // ────────────── 8. दृश् (see) — गण १, परस्मैपद, suppletive present पश्य ──────────────
  {
    id: 'drsh',
    devanagari: 'दृश्',
    iast: 'dṛś',
    meanings: ['see', 'behold'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 8,
    presentStem: 'पश्य',
    futureStem: 'द्रक्ष्य',
    perfect3sg: 'ददर्श',
    isSuppletive: true,
    notes: 'Suppletive: present pres पश्य- replaces root. लृट् uses bare root + suffix.',
  },

  // ────────────── 9. श्रु (hear) — गण ५, परस्मैपद, athematic ──────────────
  {
    id: 'shru',
    devanagari: 'श्रु',
    iast: 'śru',
    meanings: ['hear', 'listen'],
    gana: 5,
    pada: 'P',
    thematic: false,
    frequencyRank: 9,
    presentStem: 'शृणो',
    futureStem: 'श्रोष्य',
    perfect3sg: 'शुश्राव',
    isSuppletive: true,
    forms: {
      lat: {
        P: {
          prathama: { eka: 'शृणोति', dvi: 'शृणुतः', bahu: 'शृण्वन्ति' },
          madhyama: { eka: 'शृणोषि', dvi: 'शृणुथः', bahu: 'शृणुथ' },
          uttama:   { eka: 'शृणोमि', dvi: 'शृणुवः', bahu: 'शृणुमः' },
        },
      },
    },
  },

  // ────────────── 10. स्था (stand) — गण १, परस्मैपद, suppletive present तिष्ठ ──────────────
  {
    id: 'stha',
    devanagari: 'स्था',
    iast: 'sthā',
    meanings: ['stand', 'remain'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 10,
    presentStem: 'तिष्ठ',
    futureStem: 'स्थास्य',
    perfect3sg: 'तस्थौ',
    isSuppletive: true,
    notes: 'Suppletive present तिष्ठ. Met in 2.3: उद् + √स्था → उत्तिष्ठ.',
    gitaOccurrences: [
      { chapter: 2, verse: 3, form: 'उत्तिष्ठ', context: 'उत् + तिष्ठ — "rise up!" (लोट् मद्यम एक)' },
    ],
  },

  // ────────────── 11. वच् (speak) — गण २, परस्मैपद, athematic ──────────────
  {
    id: 'vach',
    devanagari: 'वच्',
    iast: 'vac',
    meanings: ['speak', 'say'],
    gana: 2,
    pada: 'P',
    thematic: false,
    frequencyRank: 11,
    presentStem: 'वच्',
    futureStem: 'वक्ष्य',
    perfect3sg: 'उवाच',
    isSuppletive: true,
    notes: 'उवाच (लिट्) is the iconic "X said" speaker tag in epic Sanskrit (धृतराष्ट्र उवाच, श्रीभगवान् उवाच).',
    forms: {
      lat: {
        P: {
          prathama: { eka: 'वक्ति', dvi: 'वक्तः', bahu: 'वचन्ति' },
          madhyama: { eka: 'वक्षि', dvi: 'वक्थः', bahu: 'वक्थ' },
          uttama:   { eka: 'वच्मि', dvi: 'वच्वः', bahu: 'वच्मः' },
        },
      },
    },
  },

  // ────────────── 12. लभ् (obtain) — गण १, आत्मनेपद ──────────────
  {
    id: 'labh',
    devanagari: 'लभ्',
    iast: 'labh',
    meanings: ['obtain', 'gain'],
    gana: 1,
    pada: 'A',
    thematic: true,
    frequencyRank: 12,
    presentStem: 'लभ',
    futureStem: 'लप्स्य',
    perfect3sg: 'लेभे',
    isSuppletive: false,
  },

  // ────────────── 13. युज् (yoke / unite) — गण ७, उभयपदी, athematic ──────────────
  {
    id: 'yuj',
    devanagari: 'युज्',
    iast: 'yuj',
    meanings: ['yoke', 'unite', 'join'],
    gana: 7,
    pada: 'U',
    thematic: false,
    frequencyRank: 13,
    presentStem: 'युञ्ज्',
    futureStem: 'योक्ष्य',
    perfect3sg: 'युयोज',
    isSuppletive: true,
    notes: 'Source of "yoga". Athematic with infix न. Strong stem युनज्, weak stem युञ्ज्.',
    forms: {
      lat: {
        P: {
          prathama: { eka: 'युनक्ति', dvi: 'युङ्क्तः', bahu: 'युञ्जन्ति' },
          madhyama: { eka: 'युनक्षि', dvi: 'युङ्क्थः', bahu: 'युङ्क्थ' },
          uttama:   { eka: 'युनज्मि', dvi: 'युञ्ज्वः', bahu: 'युञ्ज्मः' },
        },
      },
    },
  },

  // ────────────── 14. युध् (fight) — गण ४, आत्मनेपद ──────────────
  {
    id: 'yudh',
    devanagari: 'युध्',
    iast: 'yudh',
    meanings: ['fight', 'wage war'],
    gana: 4,
    pada: 'A',
    thematic: true,
    frequencyRank: 14,
    presentStem: 'युध्य',
    futureStem: 'योत्स्य',
    perfect3sg: 'युयुधे',
    isSuppletive: false,
    gitaOccurrences: [
      { chapter: 2, verse: 4, form: 'प्रतियोत्स्यामि', context: 'प्रति + √युध् — "shall fight against" (लृट् उत्तम एक)' },
    ],
  },

  // ────────────── 15. भुज् (eat / enjoy) — गण ७, उभयपदी ──────────────
  {
    id: 'bhuj',
    devanagari: 'भुज्',
    iast: 'bhuj',
    meanings: ['eat', 'enjoy'],
    gana: 7,
    pada: 'U',
    thematic: false,
    frequencyRank: 15,
    presentStem: 'भुञ्ज्',
    futureStem: 'भोक्ष्य',
    perfect3sg: 'बुभोज',
    isSuppletive: true,
    notes: 'Met in 2.5 भुञ्जीय (विधिलिङ् आत्मनेपद).',
    forms: {
      lat: {
        P: {
          prathama: { eka: 'भुनक्ति', dvi: 'भुङ्क्तः', bahu: 'भुञ्जन्ति' },
          madhyama: { eka: 'भुनक्षि', dvi: 'भुङ्क्थः', bahu: 'भुङ्क्थ' },
          uttama:   { eka: 'भुनज्मि', dvi: 'भुञ्ज्वः', bahu: 'भुञ्ज्मः' },
        },
        A: {
          prathama: { eka: 'भुङ्क्ते', dvi: 'भुञ्जाते', bahu: 'भुञ्जते' },
          madhyama: { eka: 'भुङ्क्षे', dvi: 'भुञ्जाथे', bahu: 'भुङ्ग्ध्वे' },
          uttama:   { eka: 'भुञ्जे', dvi: 'भुञ्ज्वहे', bahu: 'भुञ्ज्महे' },
        },
      },
      vidhilin: {
        A: {
          prathama: { eka: 'भुञ्जीत', dvi: 'भुञ्जीयाताम्', bahu: 'भुञ्जीरन्' },
          madhyama: { eka: 'भुञ्जीथाः', dvi: 'भुञ्जीयाथाम्', bahu: 'भुञ्जीध्वम्' },
          uttama:   { eka: 'भुञ्जीय', dvi: 'भुञ्जीवहि', bahu: 'भुञ्जीमहि' },
        },
      },
    },
    gitaOccurrences: [
      { chapter: 2, verse: 5, form: 'भुञ्जीय', context: 'विधिलिङ् आत्मनेपद उत्तम एक — "should one enjoy?"' },
    ],
  },

  // ────────────── 16. पठ् (read / recite) — गण १, परस्मैपद, fully thematic ──────────────
  {
    id: 'pathh',
    devanagari: 'पठ्',
    iast: 'paṭh',
    meanings: ['read', 'recite'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 16,
    presentStem: 'पठ',
    futureStem: 'पठिष्य',
    perfect3sg: 'पपाठ',
    isSuppletive: false,
  },

  // ────────────── 17. पच् (cook) — गण १, उभयपदी, thematic ──────────────
  {
    id: 'pach',
    devanagari: 'पच्',
    iast: 'pac',
    meanings: ['cook', 'prepare'],
    gana: 1,
    pada: 'U',
    thematic: true,
    frequencyRank: 17,
    presentStem: 'पच',
    futureStem: 'पक्ष्य',
    perfect3sg: 'पपाच',
    isSuppletive: false,
  },

  // ────────────── 18. वस् (dwell / live) — गण १, परस्मैपद ──────────────
  {
    id: 'vas',
    devanagari: 'वस्',
    iast: 'vas',
    meanings: ['dwell', 'live'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 18,
    presentStem: 'वस',
    futureStem: 'वत्स्य',
    perfect3sg: 'उवास',
    isSuppletive: false,
  },

  // ────────────── 19. नम् (bow) — गण १, परस्मैपद ──────────────
  {
    id: 'nam',
    devanagari: 'नम्',
    iast: 'nam',
    meanings: ['bow', 'salute'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 19,
    presentStem: 'नम',
    futureStem: 'नंस्य',
    perfect3sg: 'ननाम',
    isSuppletive: false,
  },

  // ────────────── 20. जीव् (live) — गण १, परस्मैपद ──────────────
  {
    id: 'jiv',
    devanagari: 'जीव्',
    iast: 'jīv',
    meanings: ['live', 'be alive'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 20,
    presentStem: 'जीव',
    futureStem: 'जीविष्य',
    perfect3sg: 'जिजीव',
    isSuppletive: false,
  },

  // ────────────── 21. त्यज् (abandon) — गण १, परस्मैपद ──────────────
  {
    id: 'tyaj',
    devanagari: 'त्यज्',
    iast: 'tyaj',
    meanings: ['abandon', 'give up'],
    gana: 1,
    pada: 'P',
    thematic: true,
    frequencyRank: 21,
    presentStem: 'त्यज',
    futureStem: 'त्यक्ष्य',
    perfect3sg: 'तत्याज',
    isSuppletive: false,
    notes: 'Source of त्यक्त्वा (absolutive — "having abandoned"), met in 2.3.',
  },

  // ────────────── 22. मन् (think) — गण ४, आत्मनेपद ──────────────
  {
    id: 'man',
    devanagari: 'मन्',
    iast: 'man',
    meanings: ['think', 'consider'],
    gana: 4,
    pada: 'A',
    thematic: true,
    frequencyRank: 22,
    presentStem: 'मन्य',
    futureStem: 'मंस्य',
    perfect3sg: 'मेने',
    isSuppletive: false,
  },

  // ────────────── 23. पद् (go, attain) — गण ४, आत्मनेपद ──────────────
  {
    id: 'pad',
    devanagari: 'पद्',
    iast: 'pad',
    meanings: ['go', 'attain', 'fall to'],
    gana: 4,
    pada: 'A',
    thematic: true,
    frequencyRank: 23,
    presentStem: 'पद्य',
    futureStem: 'पत्स्य',
    perfect3sg: 'पेदे',
    isSuppletive: false,
    gitaOccurrences: [
      { chapter: 2, verse: 3, form: 'उपपद्यते', context: 'उप + √पद् — "is fitting" (लट् आत्मनेपद प्रथम एक)' },
    ],
  },

  // ────────────── 24. दा (give) — गण ३, उभयपदी, athematic reduplicated ──────────────
  {
    id: 'da',
    devanagari: 'दा',
    iast: 'dā',
    meanings: ['give'],
    gana: 3,
    pada: 'U',
    thematic: false,
    frequencyRank: 24,
    presentStem: 'दद',
    futureStem: 'दास्य',
    perfect3sg: 'ददौ',
    isSuppletive: true,
    notes: 'Reduplicated present (गण ३). Strong stem ददा-, weak stem दद्-.',
    forms: {
      lat: {
        P: {
          prathama: { eka: 'ददाति', dvi: 'दत्तः', bahu: 'दति' },
          madhyama: { eka: 'ददासि', dvi: 'दत्थः', bahu: 'दत्थ' },
          uttama:   { eka: 'ददामि', dvi: 'दद्वः', bahu: 'दद्मः' },
        },
      },
    },
  },

  // ────────────── 25. धा (place / hold) — गण ३, उभयपदी ──────────────
  {
    id: 'dha',
    devanagari: 'धा',
    iast: 'dhā',
    meanings: ['place', 'hold', 'put'],
    gana: 3,
    pada: 'U',
    thematic: false,
    frequencyRank: 25,
    presentStem: 'दध',
    futureStem: 'धास्य',
    perfect3sg: 'दधौ',
    isSuppletive: true,
    forms: {
      lat: {
        P: {
          prathama: { eka: 'दधाति', dvi: 'धत्तः', bahu: 'दधति' },
          madhyama: { eka: 'दधासि', dvi: 'धत्थः', bahu: 'धत्थ' },
          uttama:   { eka: 'दधामि', dvi: 'दध्वः', bahu: 'दध्मः' },
        },
      },
    },
  },
];

export const DHATUS_TOP25 = DHATUS;

// Lookup helpers
const BY_ID = new Map(DHATUS.map((d) => [d.id, d]));
export function getDhatuById(id) {
  return BY_ID.get(id) ?? null;
}
export function getDhatuByDevanagari(deva) {
  return DHATUS.find((d) => d.devanagari === deva) ?? null;
}

// Coverage from Khoomeik chart (top-N → percent of all verb tokens)
export const COVERAGE_CURVE = [
  { topN: 10, percent: 27.7 },
  { topN: 25, percent: 45.0 },
  { topN: 50, percent: 58.8 },
  { topN: 100, percent: 73.0 },
  { topN: 192, percent: 86.1 },
  { topN: 500, percent: 98.5 },
];
