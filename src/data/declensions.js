// Noun declension paradigms (शब्दरूपावलिः) — the 24-form tables every
// student needs in addition to the राम / देव paradigm taught at school.
//
// Each paradigm covers one stem-class. Together, the 8 paradigms below
// classify every common noun in the 25-verse corpus.
//
// Pedagogical note: SSC Sanskrit only teaches राम; everything else
// (आत्मन्, कर्मन्, मनस्, मति, गुरु etc.) is left as a memorization gap.
// This reference fills that gap.
//
// Data shape:
//   {
//     id, name, deva, gender ('m'|'f'|'n'), ending,
//     description, sample,
//     forms: { pra: { eka, dvi, bahu }, ..., sam: {...} },
//     corpusExamples: [{ word, parsing, gloss, verseRef: { chapter, verse } }],
//     pedagogyNote (optional),
//   }

import { VERSES } from './verses.js';

export const DECLENSIONS = [
  {
    id: 'deva',
    name: 'देव',
    deva: 'देव-गणः',
    gender: 'm',
    ending: '-अ',
    description: 'Masculine -अ stem — the most common paradigm, taught first at SSC. ' +
      'Covers proper names ending in -अ (राम, कृष्ण, भीष्म, द्रोण), abstract concepts (धर्म, सङ्ग, क्रोध, काम, मोह), and most common masculine nouns.',
    sample: 'देव (god)',
    forms: {
      pra: { eka: 'देवः',     dvi: 'देवौ',         bahu: 'देवाः' },
      dvi: { eka: 'देवम्',    dvi: 'देवौ',         bahu: 'देवान्' },
      tri: { eka: 'देवेन',    dvi: 'देवाभ्याम्', bahu: 'देवैः' },
      cha: { eka: 'देवाय',    dvi: 'देवाभ्याम्', bahu: 'देवेभ्यः' },
      pan: { eka: 'देवात्',   dvi: 'देवाभ्याम्', bahu: 'देवेभ्यः' },
      sha: { eka: 'देवस्य',   dvi: 'देवयोः',       bahu: 'देवानाम्' },
      sap: { eka: 'देवे',      dvi: 'देवयोः',       bahu: 'देवेषु' },
      sam: { eka: 'देव',       dvi: 'देवौ',         bahu: 'देवाः' },
    },
    corpusExamples: [
      { word: 'भीष्मम्',  parsing: 'द्वितीया एकवचन', gloss: 'Bhīṣma',    verseRef: { chapter: 2, verse: 4 } },
      { word: 'द्रोणम्',  parsing: 'द्वितीया एकवचन', gloss: 'Droṇa',     verseRef: { chapter: 2, verse: 4 } },
      { word: 'सङ्गात्',  parsing: 'पञ्चमी एकवचन',   gloss: 'from attachment', verseRef: { chapter: 2, verse: 62 } },
      { word: 'कामात्',   parsing: 'पञ्चमी एकवचन',   gloss: 'from desire',     verseRef: { chapter: 2, verse: 62 } },
      { word: 'क्रोधात्', parsing: 'पञ्चमी एकवचन',   gloss: 'from anger',      verseRef: { chapter: 2, verse: 63 } },
      { word: 'धर्मस्य',  parsing: 'षष्ठी एकवचन',     gloss: 'of dharma',  verseRef: { chapter: 4, verse: 7 } },
      { word: 'योगाय',    parsing: 'चतुर्थी एकवचन',   gloss: 'for yoga (purpose)', verseRef: { chapter: 2, verse: 50 } },
      { word: 'युगे',     parsing: 'सप्तमी एकवचन',    gloss: 'in age',     verseRef: { chapter: 4, verse: 8 } },
      { word: 'कृष्ण',    parsing: 'सम्बोधन एकवचन', gloss: 'O Krishna', verseRef: { chapter: 6, verse: 34 } },
    ],
    pedagogyNote: 'भीष्मम् in Gītā 2.4 is exactly देवम् structurally — द्वितीया एकवचन पुल्लिंग. Same paradigm, different word.',
  },

  {
    id: 'sita',
    name: 'सीता',
    deva: 'सीता-गणः',
    gender: 'f',
    ending: '-आ',
    description: 'Feminine -आ stem. Covers feminine proper names (सीता, गीता) and most -आ ending feminines (जरा, सेना, माला, श्रद्धा).',
    sample: 'सीता (Sītā)',
    forms: {
      pra: { eka: 'सीता',       dvi: 'सीते',         bahu: 'सीताः' },
      dvi: { eka: 'सीताम्',    dvi: 'सीते',         bahu: 'सीताः' },
      tri: { eka: 'सीतया',     dvi: 'सीताभ्याम्', bahu: 'सीताभिः' },
      cha: { eka: 'सीतायै',   dvi: 'सीताभ्याम्', bahu: 'सीताभ्यः' },
      pan: { eka: 'सीतायाः', dvi: 'सीताभ्याम्', bahu: 'सीताभ्यः' },
      sha: { eka: 'सीतायाः', dvi: 'सीतयोः',     bahu: 'सीतानाम्' },
      sap: { eka: 'सीतायाम्', dvi: 'सीतयोः',     bahu: 'सीतासु' },
      sam: { eka: 'सीते',       dvi: 'सीते',         bahu: 'सीताः' },
    },
    corpusExamples: [
      { word: 'जरा', parsing: 'प्रथमा एकवचन', gloss: 'old age', verseRef: { chapter: 2, verse: 13 } },
    ],
    pedagogyNote: 'Note the divergences from देव: चतुर्थी एकवचन is सीतायै (not सीताय), and सम्बोधन एकवचन is सीते (not सीता).',
  },

  {
    id: 'phala',
    name: 'फल',
    deva: 'फल-गणः',
    gender: 'n',
    ending: '-अ',
    description: 'Neuter -अ stem. Critical: प्रथमा and द्वितीया are IDENTICAL in all three numbers — neuter nouns don\'t distinguish subject from object morphologically. Word order or context decides.',
    sample: 'फल (fruit)',
    forms: {
      pra: { eka: 'फलम्',  dvi: 'फले',           bahu: 'फलानि' },
      dvi: { eka: 'फलम्',  dvi: 'फले',           bahu: 'फलानि' },
      tri: { eka: 'फलेन',  dvi: 'फलाभ्याम्', bahu: 'फलैः' },
      cha: { eka: 'फलाय',  dvi: 'फलाभ्याम्', bahu: 'फलेभ्यः' },
      pan: { eka: 'फलात्', dvi: 'फलाभ्याम्', bahu: 'फलेभ्यः' },
      sha: { eka: 'फलस्य', dvi: 'फलयोः',       bahu: 'फलानाम्' },
      sap: { eka: 'फले',    dvi: 'फलयोः',       bahu: 'फलेषु' },
      sam: { eka: 'फल',     dvi: 'फले',           bahu: 'फलानि' },
    },
    corpusExamples: [
      { word: 'कौमारम्',     parsing: 'प्रथमा एकवचन',  gloss: 'childhood', verseRef: { chapter: 2, verse: 13 } },
      { word: 'यौवनम्',      parsing: 'प्रथमा एकवचन',  gloss: 'youth',      verseRef: { chapter: 2, verse: 13 } },
      { word: 'फलेषु',         parsing: 'सप्तमी बहुवचन', gloss: 'in the fruits', verseRef: { chapter: 2, verse: 47 } },
      { word: 'समत्वम्',     parsing: 'प्रथमा एकवचन',  gloss: 'equanimity', verseRef: { chapter: 2, verse: 48 } },
      { word: 'कौशलम्',      parsing: 'प्रथमा एकवचन',  gloss: 'skill',       verseRef: { chapter: 2, verse: 50 } },
      { word: 'अभ्युत्थानम्', parsing: 'प्रथमा एकवचन',  gloss: 'rising',      verseRef: { chapter: 4, verse: 7 } },
      { word: 'निधनम्',       parsing: 'प्रथमा एकवचन',  gloss: 'death',       verseRef: { chapter: 3, verse: 35 } },
      { word: 'शरणम्',        parsing: 'द्वितीया एकवचन', gloss: 'as refuge',  verseRef: { chapter: 18, verse: 66 } },
    ],
    pedagogyNote: 'Neuter -अ is identical to देव EXCEPT in प्रथमा/द्वितीया/सम्बोधन (which have फलम्/फले/फलानि instead of देवः/देवौ/देवाः). All other cases match.',
  },

  {
    id: 'mati',
    name: 'मति',
    deva: 'मति-गणः',
    gender: 'f',
    ending: '-इ',
    description: 'Feminine -इ stem. Covers most abstract feminine nouns (बुद्धि, स्मृति, सिद्धि, ग्लानि, प्राप्ति, शक्ति).',
    sample: 'मति (intellect, opinion)',
    forms: {
      pra: { eka: 'मतिः',  dvi: 'मती',         bahu: 'मतयः' },
      dvi: { eka: 'मतिम्', dvi: 'मती',         bahu: 'मतीः' },
      tri: { eka: 'मत्या', dvi: 'मतिभ्याम्', bahu: 'मतिभिः' },
      cha: { eka: 'मतये',  dvi: 'मतिभ्याम्', bahu: 'मतिभ्यः' },
      pan: { eka: 'मतेः',   dvi: 'मतिभ्याम्', bahu: 'मतिभ्यः' },
      sha: { eka: 'मतेः',   dvi: 'मत्योः',     bahu: 'मतीनाम्' },
      sap: { eka: 'मतौ',   dvi: 'मत्योः',     bahu: 'मतिषु' },
      sam: { eka: 'मते',    dvi: 'मती',         bahu: 'मतयः' },
    },
    corpusExamples: [
      { word: 'देह-अन्तर-प्राप्तिः', parsing: 'प्रथमा एकवचन', gloss: 'attainment of another body', verseRef: { chapter: 2, verse: 13 } },
      { word: 'सिद्धि-असिद्ध्योः', parsing: 'सप्तमी द्विवचन', gloss: 'in success and non-success', verseRef: { chapter: 2, verse: 48 } },
      { word: 'ग्लानिः',            parsing: 'प्रथमा एकवचन', gloss: 'decline',                     verseRef: { chapter: 4, verse: 7 } },
    ],
    pedagogyNote: 'चतुर्थी/पञ्चमी/षष्ठी singular have alternate forms (मत्यै/मत्याः/मत्याः) used when emphasizing femininity — but मतये/मतेः/मतेः are the default.',
  },

  {
    id: 'guru',
    name: 'गुरु',
    deva: 'गुरु-गणः',
    gender: 'm',
    ending: '-उ',
    description: 'Masculine -उ stem. Covers कinship (बन्धु, शत्रु, रिपु), elements (वायु — in genitive वायोः), and abstract -उ nouns (हेतु, शिशु, साधु).',
    sample: 'गुरु (teacher, heavy)',
    forms: {
      pra: { eka: 'गुरुः',    dvi: 'गुरू',         bahu: 'गुरवः' },
      dvi: { eka: 'गुरुम्',  dvi: 'गुरू',         bahu: 'गुरून्' },
      tri: { eka: 'गुरुणा',  dvi: 'गुरुभ्याम्', bahu: 'गुरुभिः' },
      cha: { eka: 'गुरवे',    dvi: 'गुरुभ्याम्', bahu: 'गुरुभ्यः' },
      pan: { eka: 'गुरोः',    dvi: 'गुरुभ्याम्', bahu: 'गुरुभ्यः' },
      sha: { eka: 'गुरोः',    dvi: 'गुर्वोः',     bahu: 'गुरूणाम्' },
      sap: { eka: 'गुरौ',     dvi: 'गुर्वोः',     bahu: 'गुरुषु' },
      sam: { eka: 'गुरो',     dvi: 'गुरू',         bahu: 'गुरवः' },
    },
    corpusExamples: [
      { word: 'कर्म-फल-हेतुः', parsing: 'प्रथमा एकवचन', gloss: 'cause-of-the-fruit-of-action', verseRef: { chapter: 2, verse: 47 } },
      { word: 'बन्धुः',          parsing: 'प्रथमा एकवचन', gloss: 'friend',  verseRef: { chapter: 6, verse: 5 } },
      { word: 'रिपुः',           parsing: 'प्रथमा एकवचन', gloss: 'enemy',   verseRef: { chapter: 6, verse: 5 } },
      { word: 'वायोः',           parsing: 'षष्ठी एकवचन',  gloss: 'of wind', verseRef: { chapter: 6, verse: 34 } },
    ],
    pedagogyNote: 'गुरु, साधु etc. have a vowel-strengthening pattern — गुर- becomes गुरु/गुरो (guṇa/vṛddhi) in different cells.',
  },

  {
    id: 'atman',
    name: 'आत्मन्',
    deva: 'आत्मन्-गणः',
    gender: 'm',
    ending: '-न्',
    description: 'Masculine consonant-stem ending in -न्. The stem alternates between strong (आत्मान्) in nominative-direct cases and weak (आत्मन्/आत्म) in oblique cases. Covers आत्मन्, राजन्, ब्रह्मन्.',
    sample: 'आत्मन् (self, soul)',
    forms: {
      pra: { eka: 'आत्मा',     dvi: 'आत्मानौ',     bahu: 'आत्मानः' },
      dvi: { eka: 'आत्मानम्', dvi: 'आत्मानौ',     bahu: 'आत्मनः' },
      tri: { eka: 'आत्मना',   dvi: 'आत्मभ्याम्', bahu: 'आत्मभिः' },
      cha: { eka: 'आत्मने',   dvi: 'आत्मभ्याम्', bahu: 'आत्मभ्यः' },
      pan: { eka: 'आत्मनः',   dvi: 'आत्मभ्याम्', bahu: 'आत्मभ्यः' },
      sha: { eka: 'आत्मनः',   dvi: 'आत्मनोः',     bahu: 'आत्मनाम्' },
      sap: { eka: 'आत्मनि',   dvi: 'आत्मनोः',     bahu: 'आत्मसु' },
      sam: { eka: 'आत्मन्',    dvi: 'आत्मानौ',     bahu: 'आत्मानः' },
    },
    corpusExamples: [
      { word: 'आत्मा',     parsing: 'प्रथमा एकवचन',  gloss: 'the self (subject)',   verseRef: { chapter: 6, verse: 5 } },
      { word: 'आत्मानम्', parsing: 'द्वितीया एकवचन', gloss: 'the self (object)',  verseRef: { chapter: 6, verse: 5 } },
      { word: 'आत्मना',  parsing: 'तृतीया एकवचन',   gloss: 'by the self',          verseRef: { chapter: 6, verse: 5 } },
      { word: 'आत्मनः',  parsing: 'षष्ठी एकवचन',     gloss: 'of the self',           verseRef: { chapter: 6, verse: 5 } },
      { word: 'आत्मनि',  parsing: 'सप्तमी एकवचन',    gloss: 'in the self',           verseRef: null },
    ],
    pedagogyNote: 'Gītā 6.5 is the showcase verse for आत्मन् — it appears in FOUR cases simultaneously: आत्मना (तृतीया) · आत्मानम् (द्वितीया) · आत्मा (प्रथमा) · आत्मनः (षष्ठी). The verse is a paradigm in motion.',
  },

  {
    id: 'karman',
    name: 'कर्मन्',
    deva: 'कर्मन्-गणः',
    gender: 'n',
    ending: '-न्',
    description: 'Neuter consonant-stem ending in -न्. Like आत्मन् but neuter — प्रथमा/द्वितीया share forms. Covers कर्मन्, नामन्, जन्मन्, ब्रह्मन् (when neuter).',
    sample: 'कर्मन् (action)',
    forms: {
      pra: { eka: 'कर्म',    dvi: 'कर्मणी',     bahu: 'कर्माणि' },
      dvi: { eka: 'कर्म',    dvi: 'कर्मणी',     bahu: 'कर्माणि' },
      tri: { eka: 'कर्मणा', dvi: 'कर्मभ्याम्', bahu: 'कर्मभिः' },
      cha: { eka: 'कर्मणे', dvi: 'कर्मभ्याम्', bahu: 'कर्मभ्यः' },
      pan: { eka: 'कर्मणः', dvi: 'कर्मभ्याम्', bahu: 'कर्मभ्यः' },
      sha: { eka: 'कर्मणः', dvi: 'कर्मणोः',     bahu: 'कर्मणाम्' },
      sap: { eka: 'कर्मणि', dvi: 'कर्मणोः',     bahu: 'कर्मसु' },
      sam: { eka: 'कर्म(न्)', dvi: 'कर्मणी',     bahu: 'कर्माणि' },
    },
    corpusExamples: [
      { word: 'कर्मणि',  parsing: 'सप्तमी एकवचन',   gloss: 'in action',     verseRef: { chapter: 2, verse: 47 } },
      { word: 'अकर्मणि', parsing: 'सप्तमी एकवचन',   gloss: 'in inaction',   verseRef: { chapter: 2, verse: 47 } },
      { word: 'कर्माणि', parsing: 'द्वितीया बहुवचन', gloss: 'actions (object)', verseRef: { chapter: 2, verse: 48 } },
      { word: 'कर्मसु',   parsing: 'सप्तमी बहुवचन',  gloss: 'in actions',    verseRef: { chapter: 2, verse: 50 } },
    ],
    pedagogyNote: 'कर्म-words appear three times in Gītā 2.47-50 — कर्मणि, कर्माणि, कर्मसु — each in a different number/case. Learning this paradigm unlocks all three at once.',
  },

  {
    id: 'manas',
    name: 'मनस्',
    deva: 'मनस्-गणः',
    gender: 'n',
    ending: '-स्',
    description: 'Neuter consonant-stem ending in -स्. Stem-final visarga in many cells. Covers मनस् (mind), यशस् (fame), तेजस् (radiance), and वासस् (garment) by analogy.',
    sample: 'मनस् (mind)',
    forms: {
      pra: { eka: 'मनः',    dvi: 'मनसी',          bahu: 'मनांसि' },
      dvi: { eka: 'मनः',    dvi: 'मनसी',          bahu: 'मनांसि' },
      tri: { eka: 'मनसा',  dvi: 'मनोभ्याम्',  bahu: 'मनोभिः' },
      cha: { eka: 'मनसे',  dvi: 'मनोभ्याम्',  bahu: 'मनोभ्यः' },
      pan: { eka: 'मनसः', dvi: 'मनोभ्याम्',  bahu: 'मनोभ्यः' },
      sha: { eka: 'मनसः', dvi: 'मनसोः',        bahu: 'मनसाम्' },
      sap: { eka: 'मनसि', dvi: 'मनसोः',        bahu: 'मनःसु' },
      sam: { eka: 'मनः',    dvi: 'मनसी',          bahu: 'मनांसि' },
    },
    corpusExamples: [
      { word: 'मनः',     parsing: 'प्रथमा एकवचन',  gloss: 'the mind (subject)', verseRef: { chapter: 6, verse: 34 } },
      { word: 'वासांसि', parsing: 'द्वितीया बहुवचन', gloss: 'garments (object) — same paradigm as मनस्', verseRef: { chapter: 2, verse: 22 } },
    ],
    pedagogyNote: 'The -स् stem visarga (मनः ← मनस्) is identical to the visarga of देवः ← देव-स् historically — both are word-final -स् surfacing as ः. Different stem class, same surface phenomenon.',
  },
];

export const DECLENSION_BY_ID = new Map(DECLENSIONS.map((d) => [d.id, d]));

export function getDeclensionById(id) {
  return DECLENSION_BY_ID.get(id) || null;
}

// All 8 cases in canonical order (matching how they're taught)
export const VIBHAKTI_ORDER = [
  { id: 'pra', deva: 'प्रथमा',     en: 'Nominative',   sense: 'subject' },
  { id: 'dvi', deva: 'द्वितीया',    en: 'Accusative',   sense: 'object' },
  { id: 'tri', deva: 'तृतीया',     en: 'Instrumental', sense: 'by/with' },
  { id: 'cha', deva: 'चतुर्थी',     en: 'Dative',       sense: 'for/to' },
  { id: 'pan', deva: 'पञ्चमी',     en: 'Ablative',     sense: 'from' },
  { id: 'sha', deva: 'षष्ठी',       en: 'Genitive',     sense: 'of' },
  { id: 'sap', deva: 'सप्तमी',     en: 'Locative',     sense: 'in/at' },
  { id: 'sam', deva: 'सम्बोधन', en: 'Vocative',     sense: 'O!' },
];

export const VACHANA_ORDER = [
  { id: 'eka',  deva: 'एकवचन',    en: 'sg.' },
  { id: 'dvi',  deva: 'द्विवचन',  en: 'du.' },
  { id: 'bahu', deva: 'बहुवचन',   en: 'pl.' },
];

// Sanity helper: confirm every paradigm has all 24 cells filled.
export function validateParadigm(decl) {
  const missing = [];
  for (const v of VIBHAKTI_ORDER) {
    for (const n of VACHANA_ORDER) {
      if (!decl.forms?.[v.id]?.[n.id]) missing.push(`${v.id}/${n.id}`);
    }
  }
  return missing;
}

// Validate corpus references — every verseRef must point at a real verse.
export function validateCorpusRefs(decl) {
  const bad = [];
  for (const ex of decl.corpusExamples || []) {
    if (!ex.verseRef) continue; // null is allowed (illustrative only)
    const found = VERSES.some((v) => v.chapter === ex.verseRef.chapter && v.verse === ex.verseRef.verse);
    if (!found) bad.push(`${ex.word} → ${ex.verseRef.chapter}.${ex.verseRef.verse}`);
  }
  return bad;
}
