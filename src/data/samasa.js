// समास compound corpus — auto-projected from `verses.js → samasNotes[]`.
// As more verses are decoded with samasNotes, this bank grows automatically.

import { VERSES } from './verses.js';

// Six classical types + key sub-types we already use in the seed corpus.
export const SAMASA_TYPES = [
  {
    id: 'tat-sha',
    deva: 'षष्ठी तत्पुरुष',
    en: 'Genitive Tatpuruṣa',
    family: 'तत्पुरुष',
    rule: 'Left member is in the genitive (possessive) relation to the right.',
    pattern: 'X-Y = Y of X',
    examples: ['राजपुत्रः = राज्ञः पुत्रः ("king\'s son")'],
  },
  {
    id: 'tat-tri',
    deva: 'तृतीया तत्पुरुष',
    en: 'Instrumental Tatpuruṣa',
    family: 'तत्पुरुष',
    rule: 'Left member is in the instrumental relation.',
    pattern: 'X-Y = Y by/with X',
    examples: ['रुधिरप्रदिग्ध = रुधिरेण प्रदिग्ध ("smeared with blood")'],
  },
  {
    id: 'tat-upa',
    deva: 'उपपद तत्पुरुष',
    en: 'Upapada Tatpuruṣa (compound with verbal action)',
    family: 'तत्पुरुष',
    rule: 'Right member is a verbal action; left member is its (typically accusative) object.',
    pattern: 'X-Y = "doer/acter of Y on X"',
    examples: ['मधुसूदन = मधुम् सूदयति इति ("Madhu-slayer")', 'परन्तप = परान् तापयति इति ("enemy-scorcher")'],
  },
  {
    id: 'karma',
    deva: 'कर्मधारय',
    en: 'Karmadhāraya',
    family: 'तत्पुरुष',
    rule: 'Adjective + noun (or noun in apposition) — both in the same case.',
    pattern: 'X-Y = X-kind-of-Y',
    examples: ['नीलोत्पलम् = नीलम् उत्पलम् ("blue lotus")'],
  },
  {
    id: 'dvigu',
    deva: 'द्विगु',
    en: 'Dvigu (numerical)',
    family: 'तत्पुरुष',
    rule: 'Number + noun → group of N things.',
    examples: ['पञ्चवटी = पञ्च + वटी ("group of five trees")'],
  },
  {
    id: 'dvandva-iter',
    deva: 'इतरेतर द्वन्द्व',
    en: 'Itaretara Dvandva (enumerable list)',
    family: 'द्वन्द्व',
    rule: 'List "X and Y," takes the gender/number of the last member, plural by default.',
    pattern: 'X-Y = X and Y',
    examples: ['रामलक्ष्मणौ = रामः च लक्ष्मणः च ("Rāma and Lakṣmaṇa")'],
  },
  {
    id: 'dvandva-sam',
    deva: 'समाहार द्वन्द्व',
    en: 'Samāhāra Dvandva (collective)',
    family: 'द्वन्द्व',
    rule: 'List taken collectively, takes the singular neuter.',
    examples: ['पाणिपादम् = पाणी च पादौ च ("hands-and-feet")'],
  },
  {
    id: 'bahuvrihi',
    deva: 'बहुव्रीहि',
    en: 'Bahuvrīhi (possessive)',
    family: 'बहुव्रीहि',
    rule: 'The whole compound qualifies an external noun: "[the one] possessing X."',
    pattern: 'X-Y = "[one] whose Y is X"',
    examples: ['पीताम्बरः = पीतम् अम्बरम् यस्य सः ("[the one] wearing yellow garments" = Krishna)'],
  },
  {
    id: 'avyayi',
    deva: 'अव्ययीभाव',
    en: 'Avyayībhāva (adverbial)',
    family: 'अव्ययीभाव',
    rule: 'The whole compound becomes an indeclinable adverb.',
    examples: ['यथाशक्ति = "according to ability"'],
  },
  {
    id: 'nan',
    deva: 'नञ्-समास',
    en: 'Negation prefix',
    family: 'नञ्-समास',
    rule: 'Negation by prefix: अ- before consonants, अन्- before vowels.',
    examples: ['अधर्म = न + धर्म', 'अनार्य = न + आर्य'],
  },
];

const TYPE_BY_DEVA = new Map(SAMASA_TYPES.map((t) => [t.deva, t]));
export function lookupSamasaType(deva) {
  return TYPE_BY_DEVA.get(deva) ?? null;
}

// Project: walk every verse's samasNotes[] and emit a flat bank.
export function buildSamasaBank() {
  const bank = [];
  for (const v of VERSES) {
    for (const s of v.samasNotes || []) {
      bank.push({
        compound: s.compound,
        vigraha: s.vigraha,
        type: s.type,
        gloss: s.gloss,
        verseRef: { chapter: v.chapter, verse: v.verse },
      });
    }
  }
  return bank;
}

// Group bank by type for the type-filterable view.
export function groupSamasaBankByFamily() {
  const bank = buildSamasaBank();
  const groups = new Map();
  for (const entry of bank) {
    const type = lookupSamasaType(entry.type);
    const familyKey = type?.family || 'other';
    if (!groups.has(familyKey)) groups.set(familyKey, []);
    groups.get(familyKey).push(entry);
  }
  return groups;
}
