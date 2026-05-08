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
