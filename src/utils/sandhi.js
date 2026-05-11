// Sandhi engine — undo only. Given a sandhi-joined string, produce
// candidate splittings + the rules applied to make each split.
//
// Design notes:
// - Each rule is a regex on the joined string + a function that
//   produces the unjoined form. We try every rule at every position,
//   collect candidate splits, then iterate (some forms have stacked
//   sandhi: नैतत्त्वय्युपपद्यते = न + एतत् + त्वयि + उपपद्यते needs
//   3 rule applications).
// - Devanāgarī string handling: we operate on the visible-character
//   level using the matra forms a reader sees, not on Unicode codepoints
//   — the rules are written so this works.
// - Output is a list of *hypotheses*. Multiple splits may be valid; the
//   user (or a downstream pruner) decides.
//
// ═════════════════ COVERAGE INVENTORY ═════════════════
// The 21 Pāṇinian sandhi rule-families one encounters reading the Gītā.
// Update this table when you wire a new rule into RULES + UNJOIN below,
// or when you change the `auto` flag on an existing one. Status legend:
//   ✅  — wired and auto-firing in the splitter
//   ⚠️  — wired but limited/gated (one flavour only, or auto: false)
//   ❌  — not implemented; per-chunk SPLITTER_OVERRIDES used as workaround
//   📍  — handled outside sandhi.js (decodeHelper.js or pre-pass)
//
// SVARA SANDHI (vowel + vowel)
//   1.  सवर्ण-दीर्घ — अ/आ + अ/आ → आ                    ✅ aa-aa (also via devaCanonicalSavarna)
//                    इ/ई + इ/ई → ई                       📍 devaCanonicalSavarna
//                    उ/ऊ + उ/ऊ → ऊ                       📍 devaCanonicalSavarna
//   2.  गुण — अ + इ/ई → ए                              ✅ aa-ee
//             अ + उ/ऊ → ओ                              ✅ aa-uu
//             अ + ऋ → अर्                              ❌
//   3.  वृद्धि — अ + ए/ऐ → ऐ                            ✅ aa-e
//                अ + ओ/औ → औ                           ✅ aa-o
//   4.  यण् — इ + dissimilar vowel → य्                ⚠️  i-u-yan (only इ+उ form)
//             उ + dissimilar vowel → व्                ❌
//             ऋ + dissimilar vowel → र्                ❌
//   5.  अयादि — ए/ऐ/ओ/औ + vowel → अय्/आय्/अव्/आव्     ❌
//   6.  पूर्वरूप/अवग्रह — ए/ओ + अ → ए/ओ + ऽ            ✅ visarga-avagraha, avagraha-elision
//
// VYAÑJANA SANDHI (consonant + ...)
//   7.  श्चुत्व — स्/त्-series before श्/च → palatal     ⚠️  partial via visarga-ca / visarga-cha
//   8.  ष्टुत्व — स्/त्-series before ष्/ट → retroflex    ❌
//   9.  जश्त्व — final voiceless stop voices before     ⚠️  t-jash-bha/ga/ba/ya (auto: false — needs lexicon)
//                voiced sound (झलां जश् झशि, 8.4.53)
//                Narrow clusters wired (auto): त्+च→च्च,
//                त्+ज→ज्ज, त्+त→त्त, त्+द→द्द, त्+ल→ल्ल
//  10.  चर्त्व — final stop before unvoiced → unvoiced   ❌
//                unaspirated (the car-set)
//  11.  अनुस्वार — म् + consonant → ं                  ✅ m-anusvara
//  12.  परसवर्ण — anusvara → class nasal               ❌
//  13.  छत्व — त्/द् + श् → च्छ                         ❌
//  14.  लत्व — त्/द् + ल → ल्ल                         ✅ t-la (under t-jash family)
//  15.  णत्व — न् → ण् after ऋ/र्/ष्                    ❌
//
// VISARGA SANDHI (ः + ...)
//  16.  ः + अ → ो + ऽ (when preceded by अ)             ✅ visarga-avagraha
//  17.  ः + voiced consonant → ो (when preceded by अ)  ✅ visarga-aa-vowel
//  18.  ः + voiced cons/vowel → र् (preceded by other  📍 splitVisargaR in decodeHelper.js (Patterns A + B)
//        vowel than अ/आ)
//  19.  ः + क्/प् → jihvāmūlīya/upadhmānīya             ⚠️  visarga-ka/visarga-pa route to ष्क/ष्प (= rule 20)
//  20.  ः + sibilants/dentals → श्/ष्/स्               ✅ visarga-ca, visarga-cha, visarga-ta,
//                                                          visarga-tha, visarga-ka, visarga-pa
//  21.  ः + र् → preceding vowel lengthens             ❌
//
// SUMMARY (as of commit 181f375): 11 rules fully auto-firing,
// 4 partial/gated, 6 unimplemented. Missing rules are the
// systemic reason the user has been surfacing splitter mis-cuts
// (especially #4 यण् beyond इ+उ, #5 अयादि, #8 ष्टुत्व, #9 generic
// जश्त्व, #12 परसवर्ण, #15 णत्व, #21 visarga+र्). Each chunk that
// triggers one of these falls back to SPLITTER_OVERRIDES in
// decodeHelper.js.
// ═══════════════════════════════════════════════════════════

// ─────────────── Rule catalogue ───────────────

// Each rule:
//   id: stable identifier
//   name: human-readable
//   description: brief Sanskrit + English description
//   joined: the string fragment that signals this rule
//   parts: an array of replacement fragments (in order — joined → parts)
//   category: 'vowel' | 'visarga' | 'consonant'
//
// "joined" can be a literal string fragment OR a regex. When a regex,
// the function ungroups via captures.

export const SANDHI_RULES = [
  // ─────── Vowel sandhi (savarṇa-dīrgha + guṇa + vṛddhi) ───────
  {
    id: 'aa-aa',
    category: 'vowel',
    name: 'सवर्ण-दीर्घ (अ + अ → आ)',
    description: 'Two short अ\'s combine to one long आ',
    pattern: /ा/,
    example: 'गत + अहम् → गताहम्',
    examples: [
      'गत + अहम् → गताहम्',
      'अति + अधिक → अत्यधिक (with yaṇ first, then this rule on residue)',
      'तदा + अपि → तदापि',
    ],
  },
  {
    id: 'aa-ee',
    category: 'vowel',
    name: 'गुण (अ + इ → ए)',
    description: 'Short अ + short इ becomes ए',
    pattern: /े/,
    example: 'न + इति → नेति',
    examples: [
      'न + इति → नेति',
      'उप + इन्द्र → उपेन्द्र',
      'सुर + इन्द्र → सुरेन्द्र',
    ],
  },
  {
    id: 'aa-uu',
    category: 'vowel',
    name: 'गुण (अ + उ → ओ)',
    description: 'Short अ + short उ becomes ओ',
    pattern: /ो/,
    example: 'त्यक्त्वा + उत्तिष्ठ → त्यक्त्वोत्तिष्ठ',
    examples: [
      'त्यक्त्वा + उत्तिष्ठ → त्यक्त्वोत्तिष्ठ (Gītā 2.3)',
      'तदा + उक्तम् → तदोक्तम्',
      'चन्द्र + उदय → चन्द्रोदय',
    ],
  },
  {
    id: 'aa-e',
    category: 'vowel',
    name: 'वृद्धि (अ + ए → ऐ)',
    description: 'Short अ + ए becomes ऐ',
    pattern: /ै/,
    example: 'न + एतत् → नैतत्',
    examples: [
      'न + एतत् → नैतत् (Gītā 2.3)',
      'च + एव → चैव',
      'तत् + एव → तदेव (with prior consonant sandhi changing context)',
    ],
  },
  {
    id: 'aa-o',
    category: 'vowel',
    name: 'वृद्धि (अ + ओ → औ)',
    description: 'Short अ + ओ becomes औ',
    pattern: /ौ/,
    example: 'अद्य + ओदनम् → अद्यौदनम्',
    examples: [
      'अद्य + ओदनम् → अद्यौदनम्',
      'दिव्य + ओषधि → दिव्यौषधि',
    ],
  },

  // ─────── Yaṇ sandhi (इ/उ/ऋ + dissimilar vowel → semivowel) ───────
  {
    id: 'i-u-yan',
    category: 'vowel',
    name: 'यण् (इ + उ → य्यु)',
    description: 'इ + उ becomes य्यु at the junction',
    pattern: /य्यु/,
    example: 'त्वयि + उपपद्यते → त्वय्युपपद्यते',
    examples: [
      'त्वयि + उपपद्यते → त्वय्युपपद्यते (Gītā 2.3)',
      'अति + उत्तम → अत्युत्तम',
    ],
  },

  // ─────── Visarga sandhi ───────
  {
    id: 'visarga-ca',
    category: 'visarga',
    name: 'विसर्ग + च → श्च',
    description: 'Visarga before च becomes श्',
    pattern: /श्च/,
    example: 'पाण्डवाः + च → पाण्डवाश्च',
    examples: [
      'पाण्डवाः + च → पाण्डवाश्च (Gītā 1.1)',
      'अनन्याः + चिन्तयन्तः → अनन्याश्चिन्तयन्तः (Gītā 9.22)',
      'देवाः + च → देवाश्च',
    ],
  },
  {
    id: 'visarga-cha',
    category: 'visarga',
    name: 'विसर्ग + छ → श्छ',
    description: 'Visarga before छ becomes श्',
    pattern: /श्छ/,
    example: 'अधः + छाया → अधश्छाया',
    examples: [
      'अधः + छाया → अधश्छाया',
      'पुनः + छिन्द्धि → पुनश्छिन्द्धि',
    ],
    // Disabled by default — श्छ is internal in compounds like पश्छिद्र,
    // and छ-initial words after a visarga are rare. Opt-in only.
    auto: false,
  },
  {
    id: 'visarga-ta',
    category: 'visarga',
    name: 'विसर्ग + त → स्त',
    description: 'Visarga before त becomes स्',
    pattern: /स्त/,
    example: 'पुत्रः + तस्य → पुत्रस्तस्य',
    examples: [
      'पुत्रः + तस्य → पुत्रस्तस्य',
      'मात्रास्पर्शाः + तु → मात्रास्पर्शास्तु (Gītā 2.14)',
      'सङ्गः + तेषु → सङ्गस्तेषु (Gītā 2.62)',
    ],
  },
  {
    id: 'visarga-tha',
    category: 'visarga',
    name: 'विसर्ग + थ → स्थ',
    description: 'Visarga before थ becomes स्',
    pattern: /स्थ/,
    example: 'सः + थः → सस्थः',
    examples: ['सः + थः → सस्थः'],
    // Disabled by default — स्थ is a hugely common ROOT-INTERNAL cluster
    // (√स्था, स्थित, स्थिर, अवस्थितम्…). Firing this rule produces 100+
    // bogus splits in the Gītā corpus. Real visarga-थ junctions are
    // extremely rare since few Sanskrit words begin with थ-. Opt-in only.
    auto: false,
  },
  {
    id: 'visarga-ka',
    category: 'visarga',
    name: 'विसर्ग + क → ष्क',
    description: 'Visarga before क becomes ष्',
    pattern: /ष्क/,
    example: 'सर्वतः + कालः → सर्वतष्कालः',
    examples: [
      'सर्वतः + कालः → सर्वतष्कालः',
      'अन्तः + करण → अन्तष्करण (alt. spelling अन्तःकरण)',
    ],
    // Disabled by default — same reason as visarga-tha: ष्क appears
    // root-internally far more often than at sandhi junction.
    auto: false,
  },
  {
    id: 'visarga-pa',
    category: 'visarga',
    name: 'विसर्ग + प → ष्प',
    description: 'Visarga before प becomes ष्',
    pattern: /ष्प/,
    example: 'सर्वतः + पठति → सर्वतष्पठति',
    examples: ['सर्वतः + पठति → सर्वतष्पठति'],
    // Disabled by default — same reason. Opt-in only.
    auto: false,
  },
  {
    id: 'visarga-aa-vowel',
    category: 'visarga',
    name: 'अः + voiced consonant → ओ',
    description: 'अ-stem visarga before voiced consonant becomes ओ',
    pattern: /ो /,
    example: 'देवः + अपि → देवोऽपि',
    examples: [
      'देवः + अपि → देवोऽपि (note avagraha for elided अ)',
      'श्रेयः + भविष्यति → श्रेयो भविष्यति (Gītā 2.31, similar)',
      'सङ्गः + अस्तु → सङ्गोऽस्तु (Gītā 2.47)',
      'देहिनः + अस्मिन् → देहिनोऽस्मिन् (Gītā 2.13)',
    ],
  },
  {
    // Avagraha-marked elision: -ः + अ- joined with avagraha. Distinct
    // from visarga-aa-vowel (which expects a literal space). The
    // pattern ोऽ appears ONLY at sandhi junctions — no Sanskrit root
    // contains it internally — so this rule can fire safely without
    // a whitelist. Catches 164 verses' worth of junctions in the Gītā.
    id: 'visarga-avagraha',
    category: 'visarga',
    name: 'अः + अ- → ोऽ (avagraha)',
    description: 'Visarga + initial अ joined with avagraha marker',
    pattern: /ोऽ/,
    example: 'देवः + अपि → देवोऽपि',
    examples: [
      'देवः + अपि → देवोऽपि',
      'सङ्गः + अस्तु → सङ्गोऽस्तु (Gītā 2.47)',
      'त्यक्त्वा + उत्तिष्ठ → त्यक्त्वोत्तिष्ठ (different rule, no avagraha)',
    ],
  },
  {
    // Generic avagraha — covers ेऽ, ाऽ, ीऽ, ुऽ etc. (anything that
    // isn't ोऽ, which has its own visarga rule above). The ऽ marker
    // means "an अ was elided here"; restore it. Sanskrit never uses ऽ
    // root-internally so this rule is safe to fire anywhere.
    id: 'avagraha-elision',
    category: 'visarga',
    name: 'ऽ → अ (avagraha elision)',
    description: 'Avagraha marker → restore elided अ on the right side',
    pattern: /ऽ/,
    example: 'प्रवर्तन्ते + अशुचिव्रताः → प्रवर्तन्तेऽशुचिव्रताः',
    examples: [
      'प्रवर्तन्ते + अशुचिव्रताः → प्रवर्तन्तेऽशुचिव्रताः (Gītā 16.10)',
      'यतन्तः + अपि + अकृतात्मानः → यतन्तोऽप्यकृतात्मानः (Gītā 15.11; combined with -ः+ vowel rule)',
    ],
  },

  // ─────── Consonant sandhi ───────
  {
    id: 'm-anusvara',
    category: 'consonant',
    name: 'म् + consonant → ं',
    description: 'Final म् before any consonant becomes anusvāra',
    pattern: /ं/,
    example: 'क्लैब्यम् + मा → क्लैब्यंमा',
    examples: [
      'क्लैब्यम् + मा → क्लैब्यंमा',
      'कर्म + क्षेत्र → कर्मक्षेत्र (the same म् behavior internal to compounds)',
      'चञ्चलम् + हि → चञ्चलं हि (Gītā 6.34)',
    ],
    auto: false,
  },
  {
    id: 't-cha',
    category: 'consonant',
    name: 'त् + च → च्च',
    description: 'Final त् before च doubles to च्च',
    pattern: /च्च/,
    example: 'तत् + च → तच्च',
    examples: [
      'तत् + च → तच्च',
      'सन् + च → सच्च (informal)',
      'यत् + च → यच्च',
    ],
  },
  {
    id: 't-ja',
    category: 'consonant',
    name: 'त् + ज → ज्ज',
    description: 'Final त् before ज doubles to ज्ज',
    pattern: /ज्ज/,
    example: 'तत् + जयति → तज्जयति',
    examples: [
      'तत् + जयति → तज्जयति',
      'यत् + जुहोषि → यज्जुहोषि (Gītā 9.27)',
    ],
  },
  {
    id: 't-la',
    category: 'consonant',
    name: 'त् + ल → ल्ल',
    description: 'Final त् before ल doubles to ल्ल',
    pattern: /ल्ल/,
    example: 'तत् + लभते → तल्लभते',
    examples: ['तत् + लभते → तल्लभते'],
  },
  {
    id: 't-ta',
    category: 'consonant',
    name: 'त् + त → त्त',
    description: 'Final त् + त stays as त्त (gemination)',
    pattern: /त्त/,
    example: 'तत् + ते → तत्ते',
    examples: [
      'तत् + ते → तत्ते',
      'यत् + तत् → यत्तत्',
    ],
    auto: false,
  },
  {
    id: 't-da',
    category: 'consonant',
    name: 'त् + द → द्द',
    description: 'Final त् voices before द',
    pattern: /द्द/,
    example: 'तत् + दानम् → तद्दानम्',
    examples: [
      'तत् + दानम् → तद्दानम्',
      'तत् + द्रष्टव्यम् → तद्द्रष्टव्यम्',
    ],
  },
  // ─── झलां जश् झशि (Pāṇini 8.4.53) — generic word-final voicing ───
  // Word-final voiceless stop voices before any voiced sound. These rules
  // capture the underlying linguistics correctly, but the surface clusters
  // (द्भ, द्ग, द्ब, द + vowel) appear constantly INSIDE valid words and
  // compounds — लब्ध, मद्भाव, उद्भवम्, सद्भाव, मद्धरः, etc. Without a
  // lexicon to validate that both halves of the split are real words,
  // auto-firing these rules over-splits and produces fragments. They are
  // therefore `auto: false` — kept here for documentation and as a wired-in
  // base when lexicon-driven validation lands. Until then, specific chunks
  // that need this sandhi un-done are listed in SPLITTER_OVERRIDES.
  {
    id: 't-jash-bha',
    category: 'consonant',
    name: 'त् + भ → द्भ (जश्त्व)',
    description: 'Final त् voices to द् before voiced भ (auto-firing disabled — needs lexicon)',
    pattern: /द्भ/,
    example: 'यज्ञात् + भवति → यज्ञाद्भवति',
    examples: ['यज्ञात् + भवति → यज्ञाद्भवति (3.13)', 'अन्नात् + भवन्ति → अन्नाद्भवन्ति (3.13)'],
    auto: false,
  },
  {
    id: 't-jash-ga',
    category: 'consonant',
    name: 'त् + ग → द्ग (जश्त्व)',
    description: 'Final त् voices to द् before voiced ग (auto-firing disabled — needs lexicon)',
    pattern: /द्ग/,
    example: 'सत् + गुणः → सद्गुणः',
    examples: ['सत् + गुणः → सद्गुणः', 'जगत् + गुरुः → जगद्गुरुः'],
    auto: false,
  },
  {
    id: 't-jash-ba',
    category: 'consonant',
    name: 'त् + ब → द्ब (जश्त्व)',
    description: 'Final त् voices to द् before voiced ब (auto-firing disabled — needs lexicon)',
    pattern: /द्ब/,
    example: 'तत् + ब्रह्म → तद्ब्रह्म',
    examples: ['तत् + ब्रह्म → तद्ब्रह्म', 'सत् + बुद्धिः → सद्बुद्धिः'],
    auto: false,
  },
  {
    id: 't-jash-ya',
    category: 'consonant',
    name: 'त् + य → द्य (जश्त्व)',
    description: 'Final त् voices to द् before voiced य (auto-firing disabled — needs lexicon)',
    pattern: /द्य/,
    example: 'युञ्ज्यात् + योगम् → युञ्ज्याद्योगम् (BG 6.12)',
    examples: ['युञ्ज्यात् + योगम् → युञ्ज्याद्योगम् (6.12)', 'सत् + योगः → सद्योगः'],
    auto: false,
  },

  // Pre-vowel consonant doubling not handled (less common; tail rules)
];

// ─────────────── Sandhi-undo function ───────────────

// Try one rule at one position. Returns undefined if not applicable;
// otherwise returns { before, replaced, after, rule }.
function applyRuleAt(s, pos, rule) {
  // We use simple substring match on the rule's `pattern`-source
  // to find candidate positions. The actual undo logic depends on
  // the rule's category — handled in the unjoin map below.
  const fragment = ruleFragment(rule);
  if (!fragment) return undefined;
  if (s.substr(pos, fragment.length) !== fragment) return undefined;
  const replacement = unjoin(rule.id, fragment);
  if (!replacement) return undefined;
  return {
    before: s.slice(0, pos),
    after: s.slice(pos + fragment.length),
    replacement,
    rule,
  };
}

function ruleFragment(rule) {
  // Pattern is a regex with a literal source we use as the fragment.
  const src = rule.pattern.source;
  // Strip trailing space placeholder for visarga-vowel rule.
  return src.replace(/\\$/, '').trim();
}

// Map rule.id → { joined: string, parts: [string, string] }
// Each entry says: when you see `joined`, restore it to `parts` joined by " ".
const UNJOIN = {
  // Vowel sandhi
  'aa-aa':  { joined: 'ा',     parts: ['', 'अ'] },     // X+ा+Y → X + अ+Y
  'aa-ee':  { joined: 'े',     parts: ['', 'इ'] },     // X+े+Y → X + इ+Y (अ assumed left)
  'aa-uu':  { joined: 'ो',     parts: ['ा', 'उ'] },     // X+ो+Y → X+ा + उ+Y (covers आ+उ; restored matra on left)
  'aa-e':   { joined: 'ै',     parts: ['', 'ए'] },     // X+ै+Y → X + ए+Y
  'aa-o':   { joined: 'ौ',     parts: ['', 'ओ'] },     // X+ौ+Y → X + ओ+Y
  // Yan: ि matra + उ → य्यु. The left side keeps य + ि (visible "यि"); the
  // right gets a free उ. Algorithm-wise, we replace "य्यु" with two pieces
  // that re-attach: "यि" to the left, "उ" to the right.
  'i-u-yan': { joined: 'य्यु', parts: ['यि', 'उ'] },
  // Visarga
  'visarga-ca':         { joined: 'श्च', parts: ['ः', 'च'] },
  'visarga-cha':        { joined: 'श्छ', parts: ['ः', 'छ'] },
  'visarga-ta':         { joined: 'स्त', parts: ['ः', 'त'] },
  'visarga-tha':        { joined: 'स्थ', parts: ['ः', 'थ'] },
  'visarga-ka':         { joined: 'ष्क', parts: ['ः', 'क'] },
  'visarga-pa':         { joined: 'ष्प', parts: ['ः', 'प'] },
  'visarga-aa-vowel':   { joined: 'ो ',  parts: ['ः', 'अ'] }, // simplistic
  'visarga-avagraha':   { joined: 'ोऽ',  parts: ['ः', 'अ'] }, // avagraha marker
  'avagraha-elision':   { joined: 'ऽ',   parts: ['', 'अ'] },  // generic avagraha → restore अ
  // Consonant
  'm-anusvara':         { joined: 'ं',   parts: ['म्', ''] },
  't-cha':              { joined: 'च्च', parts: ['त्', 'च'] },
  't-ja':               { joined: 'ज्ज', parts: ['त्', 'ज'] },
  't-la':               { joined: 'ल्ल', parts: ['त्', 'ल'] },
  't-ta':               { joined: 'त्त', parts: ['त्', 'त'] },
  't-da':               { joined: 'द्द', parts: ['त्', 'द'] },
  // जश्त्व (Pāṇini 8.4.53) — final त् voices to द् before any voiced sound.
  // The reverse here: when we see द् + voiced consonant, try splitting as
  // त् + that consonant. Lexicon plausibility filter prevents false splits.
  't-jash-bha':         { joined: 'द्भ', parts: ['त्', 'भ'] },
  't-jash-ga':          { joined: 'द्ग', parts: ['त्', 'ग'] },
  't-jash-ba':          { joined: 'द्ब', parts: ['त्', 'ब'] },
  't-jash-ya':          { joined: 'द्य', parts: ['त्', 'य'] },
  // Note: the द्-vowel case (पर्जन्यात् + अन्न → पर्जन्यादन्न) is much harder
  // — द + matra forms a perfectly normal syllable, so we can't blindly
  // split. That case stays in SPLITTER_OVERRIDES until lexicon-driven
  // splitting is in place.
};

function unjoin(ruleId, _fragment) {
  return UNJOIN[ruleId] ?? null;
}

// Public: undoSandhi(s) → array of hypothesis objects.
//   { parts: [...]  rules: [{id, name}, ...] }
//
// Two-pass algorithm:
//   Pass A — visarga + consonant rules only (unambiguous). Iterate
//            until no more rules fire. These categories can fire
//            anywhere in the string without a lexicon.
//   Pass B — vowel + yaṇ rules. Fire on the parts produced by pass A.
//            Vowel rules constrained to a small particle whitelist;
//            yaṇ fires structurally on the visible य्यु pattern.
//
// This avoids over-recursion into already-split words like पाण्डवाः
// (where the inner ा matra would otherwise be misinterpreted as a junction).
export function undoSandhi(s) {
  if (typeof s !== 'string' || !s.trim()) return [];

  let parts = [s.trim()];
  const rules = [];

  // Pass A: iterate visarga + consonant rules until convergence.
  let changed = true;
  let safety = 50;
  while (changed && safety-- > 0) {
    changed = false;
    const next = [];
    for (const p of parts) {
      const split = findFirstJoin(p, { allowVowel: false });
      if (!split) {
        next.push(p);
      } else {
        const leftFinal = (split.before + split.parts[0]).trim();
        const rightStart = (split.parts[1] + split.after).trim();
        if (leftFinal) next.push(leftFinal);
        rules.push({ id: split.rule.id, name: split.rule.name });
        if (rightStart) next.push(rightStart);
        changed = true;
      }
    }
    parts = next;
  }

  // Pass B: try vowel rules once on each part (no recursion).
  const passB = [];
  for (const p of parts) {
    const split = findFirstJoin(p, { allowVowel: true });
    if (!split || (split.rule.category !== 'vowel')) {
      passB.push(p);
    } else {
      const leftFinal = (split.before + split.parts[0]).trim();
      const rightStart = (split.parts[1] + split.after).trim();
      if (leftFinal) passB.push(leftFinal);
      rules.push({ id: split.rule.id, name: split.rule.name });
      if (rightStart) passB.push(rightStart);
    }
  }
  parts = passB.filter(Boolean);

  return [{ parts, rules }];
}

// Without a lexicon we can't fully disambiguate vowel sandhi from
// internal matras (e.g., "पाण्डवाः" has an internal -ा- matra that
// looks identical to a sandhi-junction -ा-). Pragmatic compromise:
// vowel sandhi rules fire only when the *left context* matches a
// small whitelist of REAL multi-character particles. Single-consonant
// entries like 'य', 'क', 'ह', 'स', 'व' were previously here but they
// occur inside thousands of words (योगिनः, काङ्क्षे, …) and produced
// massive bogus splits. Restricting to genuine particle words fixes
// 100+ verses with mis-split padaccheda.
const VOWEL_LEFT_WHITELIST = new Set([
  // Indeclinable particles ending in अ that legitimately sandhi with
  // a following vowel-initial word.
  'न', 'च', 'मा', 'हि', 'तु', 'सु', 'वा', 'इव',
  // Pronominal forms ending in ए or अ that sandhi with following vowel.
  'या', 'ये', 'ने', 'ते', 'मे', 'से', 'सा', 'सः', 'एते', 'एव',
  // Common avyaya prefixes that act as full preverbs.
  'अति', 'अपि', 'इति', 'यथा', 'तथा', 'सदा',
  // Locative/temporal adverbs that often start a verse-line and sandhi
  // with the next word's vowel: तत्र (there), यत्र (where), अत्र (here),
  // सर्वत्र (everywhere), अन्यत्र (elsewhere).
  'तत्र', 'यत्र', 'अत्र', 'सर्वत्र', 'अन्यत्र',
]);

// Vowel sandhi can also happen at characteristic word-endings —
// most commonly the absolutive marker "-त्वा" (which loses its -ा via
// sandhi and presents as just "-त्व" in the joined form).
const VOWEL_LEFT_ENDINGS = ['त्व'];

function isVowelLeftAcceptable(before) {
  if (VOWEL_LEFT_WHITELIST.has(before)) return true;
  for (const ending of VOWEL_LEFT_ENDINGS) {
    if (before.endsWith(ending) && before.length >= ending.length) return true;
  }
  return false;
}

// Yaṇ rule: structural — fires whenever ि or ु meet a dissimilar vowel.
// Doesn't need a particle whitelist; the y/u/r-form tells us where it
// applied.
function isStructuralRule(rule) {
  return rule.id === 'i-u-yan';
}

function findFirstJoin(s, opts = {}) {
  const allowVowel = opts.allowVowel === true;
  const allowOptIn = opts.allowOptIn === true;

  for (const rule of SANDHI_RULES) {
    if (rule.category === 'vowel' && !allowVowel) continue;
    if (rule.auto === false && !allowOptIn) continue;
    const u = UNJOIN[rule.id];
    if (!u) continue;
    const idx = s.indexOf(u.joined);
    if (idx === -1) continue;
    const before = s.slice(0, idx);
    const after = s.slice(idx + u.joined.length);
    if (rule.category === 'vowel') {
      if (!before || !after) continue;
      // Whitelist + ending check (vowel rules) — skipped for structural rules.
      if (!isStructuralRule(rule) && !isVowelLeftAcceptable(before)) continue;
    }
    return { rule, before, after, parts: u.parts };
  }
  return null;
}

// Public: humanise rule list for UI display.
export function describeRule(ruleId) {
  return SANDHI_RULES.find((r) => r.id === ruleId);
}
