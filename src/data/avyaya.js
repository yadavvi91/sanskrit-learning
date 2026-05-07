// अव्यय — indeclinables. Postpositions, particles, deictics.
// The Pāṇinian three-bin taxonomy: सुबन्त (declinable) / तिङन्त (conjugable) / अव्यय (indeclinable).
// English's ~8 word classes mostly collapse into these three because case endings + agreement
// do the work English distributes across articles, prepositions, and auxiliaries.

export const POSTPOSITIONS = [
  { word: 'सह / साकम् / सार्धम्', sense: 'with',        govern: 'तृतीया' },
  { word: 'विना',                  sense: 'without',     govern: 'द्वितीया / तृतीया' },
  { word: 'उपरि',                  sense: 'above',       govern: 'षष्ठी' },
  { word: 'अधः',                   sense: 'below',       govern: 'षष्ठी' },
  { word: 'अन्तः',                 sense: 'inside',     govern: 'षष्ठी' },
  { word: 'बहिः',                  sense: 'outside',     govern: 'पञ्चमी' },
  { word: 'अग्रतः / पुरतः',         sense: 'in front of', govern: 'षष्ठी' },
  { word: 'पृष्ठतः',                sense: 'behind',      govern: 'षष्ठी' },
  { word: 'समीपे',                  sense: 'near',        govern: 'षष्ठी' },
];

// Sub-categorized particles. The Gita is saturated with च, हि, तु, एव, अपि, इति.
export const PARTICLE_GROUPS = [
  {
    title: 'High-frequency Gītā particles',
    description: 'Pragmatic flavour — missing these flattens the verse.',
    items: [
      { word: 'च',    sense: 'and (clitic)' },
      { word: 'हि',   sense: 'indeed / for / because' },
      { word: 'तु',   sense: 'but / however' },
      { word: 'एव',  sense: 'exactly / only / itself' },
      { word: 'अपि', sense: 'also / even' },
      { word: 'इति',  sense: 'thus / closing-quotation' },
      { word: 'खलु', sense: 'truly / indeed' },
      { word: 'नूनम्', sense: 'certainly' },
    ],
  },
  {
    title: 'Interrogatives',
    description: 'Question-words: not declined.',
    items: [
      { word: 'कथम्', sense: 'how?' },
      { word: 'कुत्र',  sense: 'where?' },
      { word: 'कस्मात्', sense: 'why? from what?' },
      { word: 'कदा',   sense: 'when?' },
    ],
  },
  {
    title: 'Connectives',
    description: 'Sentence-linkers.',
    items: [
      { word: 'अथ',     sense: 'now / then (sequential)' },
      { word: 'अथापि',  sense: 'even so / nevertheless' },
      { word: 'किन्तु',  sense: 'but' },
      { word: 'परन्तु', sense: 'but / however' },
      { word: 'तथापि', sense: 'still / yet' },
    ],
  },
  {
    title: 'Time / place deictics',
    description: 'Pointers in space and time.',
    items: [
      { word: 'अद्य',     sense: 'today' },
      { word: 'श्वः',      sense: 'tomorrow' },
      { word: 'ह्यः',      sense: 'yesterday' },
      { word: 'इदानीम्', sense: 'now' },
      { word: 'इह',       sense: 'here / in this world' },
      { word: 'अत्र',     sense: 'here' },
      { word: 'तत्र',     sense: 'there' },
    ],
  },
  {
    title: 'Affirmation / negation',
    description: 'Yes / no / emphasis.',
    items: [
      { word: 'न',   sense: 'not (general negation)' },
      { word: 'मा', sense: 'don\'t / not (with लोट्/लुङ्)' },
      { word: 'खलु', sense: 'truly' },
    ],
  },
];

export const NEGATIVE_SPACE = [
  {
    title: 'Articles don\'t exist',
    body:
      'Sanskrit has no equivalent of "a" / "the." Definiteness is conveyed by demonstratives ' +
      '(सः, एषः, अयम्) when needed, or simply inferred from context. ' +
      'This is the page that makes the Pāṇinian three-bin taxonomy click.',
  },
  {
    title: 'Prepositions don\'t exist as a word class',
    body:
      'The case system *is* the preposition system: "to/for the king" → राजाय (चतुर्थी); ' +
      '"from the king" → राज्ञः (पञ्चमी); "with the king" → राज्ञा (तृतीया); ' +
      '"in the king" → राज्ञि (सप्तमी). ' +
      'One word does what English needs two for. The small list above (postpositions) is the only ' +
      'preposition-like word class.',
  },
];

// Build-time auto-grow helper: scan a verse's पदच्छेद for known particles.
// Returns { particle: count, ... } across the corpus.
const KNOWN_AVYAYA_SET = new Set(
  PARTICLE_GROUPS.flatMap((g) => g.items.map((i) => i.word))
);

export function tallyParticles(verses) {
  const counts = new Map();
  const occurrences = new Map(); // particle -> Set of verse refs
  for (const v of verses) {
    for (const word of v.padaccheda || []) {
      // Strip combining hyphens that mark sandhi-split chunks like "धर्म-क्षेत्रे"
      const clean = word.replace(/-/g, '');
      if (KNOWN_AVYAYA_SET.has(clean)) {
        counts.set(clean, (counts.get(clean) || 0) + 1);
        if (!occurrences.has(clean)) occurrences.set(clean, new Set());
        occurrences.get(clean).add(`${v.chapter}.${v.verse}`);
      }
    }
  }
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count, verses: [...(occurrences.get(word) || [])] }))
    .sort((a, b) => b.count - a.count);
}
