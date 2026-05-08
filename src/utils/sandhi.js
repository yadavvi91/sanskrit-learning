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
  },
  {
    id: 'visarga-pa',
    category: 'visarga',
    name: 'विसर्ग + प → ष्प',
    description: 'Visarga before प becomes ष्',
    pattern: /ष्प/,
    example: 'सर्वतः + पठति → सर्वतष्पठति',
    examples: ['सर्वतः + पठति → सर्वतष्पठति'],
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
  // Consonant
  'm-anusvara':         { joined: 'ं',   parts: ['म्', ''] },
  't-cha':              { joined: 'च्च', parts: ['त्', 'च'] },
  't-ja':               { joined: 'ज्ज', parts: ['त्', 'ज'] },
  't-la':               { joined: 'ल्ल', parts: ['त्', 'ल'] },
  't-ta':               { joined: 'त्त', parts: ['त्', 'त'] },
  't-da':               { joined: 'द्द', parts: ['त्', 'द'] },
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
// small whitelist of common particles + endings — the cases where
// vowel sandhi typically happens in the Gītā corpus.
const VOWEL_LEFT_WHITELIST = new Set([
  'न', 'च', 'स', 'व', 'त', 'य', 'अ', 'क', 'ह', 'मा', 'हि', 'तु', 'सु',
  'या', 'ये', 'ने', 'ते', 'मे', 'अति', 'अपि', 'इति',
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
