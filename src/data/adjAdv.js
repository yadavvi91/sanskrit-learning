// Adjectives + adverbs reference. Both ride on systems already in place.

export const COMPARISON_SUFFIXES = [
  {
    suffix: '-तर',
    name: 'Comparative',
    note: '"more X" — comparison between two.',
    examples: [
      { base: 'श्रेष्ठ',  derived: 'श्रेष्ठतर', en: 'better (between two)' },
      { base: 'गुरु',    derived: 'गुरुतर',    en: 'heavier' },
      { base: 'दीर्घ',  derived: 'दीर्घतर',  en: 'longer' },
    ],
  },
  {
    suffix: '-तम',
    name: 'Superlative',
    note: '"most X" — comparison among many.',
    examples: [
      { base: 'श्रेष्ठ',  derived: 'श्रेष्ठतम', en: 'best (among all)' },
      { base: 'गुरु',    derived: 'गुरुतम',    en: 'heaviest' },
      { base: 'दीर्घ',  derived: 'दीर्घतम',  en: 'longest' },
    ],
  },
];

export const IRREGULAR_COMPARISONS = [
  { positive: 'श्रेष्ठ ("good")', comparative: 'ज्यायस् / श्रेयस्', superlative: 'श्रेष्ठ / ज्येष्ठ' },
  { positive: 'अल्प ("little")', comparative: 'कनीयस्',           superlative: 'कनिष्ठ' },
  { positive: 'गुरु ("heavy")',  comparative: 'गरीयस्',           superlative: 'गरिष्ठ' },
  { positive: 'दीर्घ ("long")',  comparative: 'द्राघीयस्',         superlative: 'द्राघिष्ठ' },
];

export const ADVERB_PATTERNS = [
  {
    title: 'Neuter accusative singular → adverb of manner',
    note: 'Take any adjective stem, render it as neuter accusative singular: that is the adverb.',
    examples: [
      { source: 'शीघ्र (quick)',   adverb: 'शीघ्रम्',  en: 'quickly' },
      { source: 'सत्य (true)',     adverb: 'सत्यम्',   en: 'truly' },
      { source: 'क्षिप्र (rapid)',  adverb: 'क्षिप्रम्', en: 'rapidly' },
      { source: 'सुख (happy)',    adverb: 'सुखम्',   en: 'happily' },
    ],
  },
  {
    title: 'Instrumental → manner / means',
    note: 'Frozen तृतीया forms become adverbs of manner.',
    examples: [
      { source: 'सुख',  adverb: 'सुखेन',  en: 'with ease, easily' },
      { source: 'बल',   adverb: 'बलात्',  en: 'by force, forcibly' },
      { source: 'भक्ति', adverb: 'भक्त्या', en: 'with devotion' },
    ],
  },
  {
    title: 'Locative → time / place',
    note: 'Frozen सप्तमी forms become adverbs of time/place.',
    examples: [
      { source: 'प्रातः',  adverb: 'प्रातः',  en: 'in the morning' },
      { source: 'सायम्', adverb: 'सायम्', en: 'in the evening' },
    ],
  },
  {
    title: '-तस् suffix → "from / -ly"',
    note: 'Productive suffix turning nouns and adjectives into adverbs.',
    examples: [
      { source: 'मूल (root)',        adverb: 'मूलतः',   en: 'fundamentally / from the root' },
      { source: 'सर्व (all)',        adverb: 'सर्वतः',  en: 'from all sides / wholly' },
      { source: 'शास्त्र (treatise)', adverb: 'शास्त्रतः', en: 'according to the śāstras' },
    ],
  },
];
