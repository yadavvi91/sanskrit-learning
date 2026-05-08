// Data-integrity tests for the noun-declension paradigms.
// Every paradigm must have a complete 24-form table; every corpus
// example must reference a verse that actually exists.

import { describe, it, expect } from 'vitest';
import {
  DECLENSIONS,
  VIBHAKTI_ORDER,
  VACHANA_ORDER,
  validateParadigm,
  validateCorpusRefs,
  getDeclensionById,
  getDeclensionForParsing,
} from './declensions.js';
import { VERSES } from './verses.js';

describe('declensions — paradigm coverage', () => {
  it('exports at least 8 paradigms', () => {
    expect(DECLENSIONS.length).toBeGreaterThanOrEqual(8);
  });

  it('has all the noun classes that appear in the corpus (m-अ, f-आ, n-अ, f-इ, m-उ, m-न्, n-न्, n-स्)', () => {
    const ids = new Set(DECLENSIONS.map((d) => d.id));
    for (const id of ['deva', 'sita', 'phala', 'mati', 'guru', 'atman', 'karman', 'manas']) {
      expect(ids.has(id), `paradigm "${id}" should be defined`).toBe(true);
    }
  });

  it('VIBHAKTI_ORDER lists all 8 cases in canonical order', () => {
    expect(VIBHAKTI_ORDER.map((v) => v.id)).toEqual(['pra', 'dvi', 'tri', 'cha', 'pan', 'sha', 'sap', 'sam']);
  });

  it('VACHANA_ORDER lists three numbers (eka, dvi, bahu)', () => {
    expect(VACHANA_ORDER.map((v) => v.id)).toEqual(['eka', 'dvi', 'bahu']);
  });
});

describe('declensions — every paradigm has a complete 24-form table', () => {
  it.each(DECLENSIONS.map((d) => [d.id, d]))('%s — has all 24 forms filled', (_id, decl) => {
    const missing = validateParadigm(decl);
    expect(missing, `${decl.name} is missing cells: ${missing.join(', ')}`).toEqual([]);
  });
});

describe('declensions — corpus examples reference real verses', () => {
  it.each(DECLENSIONS.map((d) => [d.id, d]))('%s — every verseRef exists in VERSES', (_id, decl) => {
    const bad = validateCorpusRefs(decl);
    expect(bad, `${decl.name} has bad refs: ${bad.join(', ')}`).toEqual([]);
  });

  it('every non-null corpus example word appears in some verse padaccheda', () => {
    for (const decl of DECLENSIONS) {
      for (const ex of decl.corpusExamples || []) {
        if (!ex.verseRef) continue;
        const verse = VERSES.find((v) => v.chapter === ex.verseRef.chapter && v.verse === ex.verseRef.verse);
        expect(verse, `verse ${ex.verseRef.chapter}.${ex.verseRef.verse} should exist`).toBeDefined();
        expect(verse.padaccheda.includes(ex.word), `word "${ex.word}" should appear in padaccheda of ${ex.verseRef.chapter}.${ex.verseRef.verse}`).toBe(true);
      }
    }
  });
});

describe('declensions — getDeclensionById', () => {
  it('returns the matching paradigm', () => {
    expect(getDeclensionById('deva')?.name).toBe('देव');
    expect(getDeclensionById('atman')?.name).toBe('आत्मन्');
  });

  it('returns null for an unknown id', () => {
    expect(getDeclensionById('nonsense')).toBeNull();
  });
});

describe('declensions — pedagogical sanity checks', () => {
  it('देव paradigm has देवम् as the द्वितीया एकवचन (the form भीष्मम् mirrors)', () => {
    const deva = getDeclensionById('deva');
    expect(deva.forms.dvi.eka).toBe('देवम्');
  });

  it('आत्मन् paradigm distinguishes strong (आत्मा) from weak (आत्मना/आत्मनः) stems', () => {
    const atman = getDeclensionById('atman');
    expect(atman.forms.pra.eka).toBe('आत्मा');
    expect(atman.forms.tri.eka).toBe('आत्मना');
    expect(atman.forms.sha.eka).toBe('आत्मनः');
  });

  it('फल (n. -अ) has identical प्रथमा/द्वितीया (a key feature of neuter)', () => {
    const phala = getDeclensionById('phala');
    expect(phala.forms.pra.eka).toBe(phala.forms.dvi.eka);
    expect(phala.forms.pra.dvi).toBe(phala.forms.dvi.dvi);
    expect(phala.forms.pra.bahu).toBe(phala.forms.dvi.bahu);
  });

  it('कर्मन् paradigm has कर्मणि as सप्तमी एकवचन (matching Gītā 2.47)', () => {
    const karman = getDeclensionById('karman');
    expect(karman.forms.sap.eka).toBe('कर्मणि');
  });
});

describe('declensions — getDeclensionForParsing classifier', () => {
  // The bridge from a verse-popover to the right Atlas paradigm.
  // Cases are derived from the actual roots in the 25-verse corpus.

  it('m. -अ stem (भीष्म) → देव', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'भीष्म', gender: 'm' })).toBe('deva');
  });

  it('m. -अ stem (सङ्ग) → देव', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'सङ्ग', gender: 'm' })).toBe('deva');
  });

  it('n. -अ stem (कौमार) → फल', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'कौमार', gender: 'n' })).toBe('phala');
  });

  it('f. -आ stem (जरा) → सीता', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'जरा', gender: 'f' })).toBe('sita');
  });

  it('f. -इ stem (ग्लानि) → मति', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'ग्लानि', gender: 'f' })).toBe('mati');
  });

  it('m. -उ stem (वायु) → गुरु', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'वायु', gender: 'm' })).toBe('guru');
  });

  it('m. -न् stem (आत्मन्) → आत्मन्', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'आत्मन्', gender: 'm' })).toBe('atman');
  });

  it('n. -न् stem (कर्मन्) → कर्मन्', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'कर्मन्', gender: 'n' })).toBe('karman');
  });

  it('n. -स् stem (मनस्) → मनस्', () => {
    expect(getDeclensionForParsing({ category: 'noun', root: 'मनस्', gender: 'n' })).toBe('manas');
  });

  it('adjective in m. -अ context → देव (अधिकार-class adjectives use noun paradigm)', () => {
    expect(getDeclensionForParsing({ category: 'adjective', root: 'धीर', gender: 'm' })).toBe('deva');
  });

  it('returns null for pronouns (they have their own Atlas tab)', () => {
    expect(getDeclensionForParsing({ category: 'pronoun', root: 'इदम्', gender: 'm' })).toBeNull();
    expect(getDeclensionForParsing({ category: 'pronoun', root: 'तद्', gender: 'm' })).toBeNull();
    expect(getDeclensionForParsing({ category: 'pronoun', root: 'अस्मद्', gender: '-' })).toBeNull();
  });

  it('returns null for verbs', () => {
    expect(getDeclensionForParsing({ category: 'verb', root: '√भू' })).toBeNull();
  });

  it('returns null for particles (no declension)', () => {
    expect(getDeclensionForParsing({ category: 'particle', root: 'च' })).toBeNull();
  });

  it('returns null for absolutives (indeclinable)', () => {
    expect(getDeclensionForParsing({ category: 'krdanta', root: '√त्यज्', kind: 'absolutive' })).toBeNull();
  });

  it('returns null when root or gender is missing', () => {
    expect(getDeclensionForParsing({ category: 'noun', gender: 'm' })).toBeNull();
    expect(getDeclensionForParsing({ category: 'noun', root: 'भीष्म' })).toBeNull();
    expect(getDeclensionForParsing(null)).toBeNull();
    expect(getDeclensionForParsing()).toBeNull();
  });

  it('returns null for stems we don\'t yet have a paradigm for', () => {
    // f. -ई (नदी-class) — not in the 8.
    expect(getDeclensionForParsing({ category: 'noun', root: 'नदी', gender: 'f' })).toBeNull();
    // m. -इ (मुनि-class) — not in the 8.
    expect(getDeclensionForParsing({ category: 'noun', root: 'मुनि', gender: 'm' })).toBeNull();
  });

  it('classifies भीष्मम्\'s actual parsing from verses.js correctly', () => {
    // The exact parsing the user clicked on in the verse.
    const parsing = { category: 'noun', root: 'भीष्म', gender: 'm', number: 'eka', case: 'dvi', gloss: 'Bhīṣma' };
    expect(getDeclensionForParsing(parsing)).toBe('deva');
  });
});
