// Regression tests for primer.js. The motivating bug: the vibhakti table
// hardcoded "— (not yet decoded)" placeholders for चतुर्थी and पञ्चमी, but
// the corpus actually had plenty of examples — they just weren't tagged
// with case info because 21 verses lacked wordParsings.
//
// These tests pin two invariants:
//   1. No "(not yet decoded)" placeholder anywhere in PRIMER.
//   2. Each example string in the vibhakti / lakara tables actually
//      points to a word that exists in some verse's padaccheda or
//      finiteVerbs (so the references can't silently rot).

import { describe, it, expect } from 'vitest';
import { PRIMER_SECTIONS as PRIMER } from './primer.js';
import { VERSES } from './verses.js';

describe('primer — vibhakti table', () => {
  const vibhakti = PRIMER.find((s) => s.id === 'vibhakti');

  it('exists', () => {
    expect(vibhakti).toBeDefined();
    expect(vibhakti.table).toBeDefined();
  });

  it('no row contains the "not yet decoded" placeholder', () => {
    for (const row of vibhakti.table.rows) {
      const example = row[3];
      expect(example, `row "${row[0]}" should not be a placeholder`).not.toMatch(/not yet decoded/i);
    }
  });

  it('every example in the table points to a real word in the corpus', () => {
    // Each "As seen in" cell can list multiple examples like
    // "X (1.1), Y (2.62)". Extract the words and confirm each appears
    // in some verse's padaccheda or finiteVerbs[].form.
    for (const row of vibhakti.table.rows) {
      const cell = row[3];
      const matches = [...cell.matchAll(/([ऀ-ॿ-]+)(?:\s*\([^)]*\))?/g)];
      expect(matches.length, `row ${row[0]} has at least one example`).toBeGreaterThan(0);

      for (const m of matches) {
        const word = m[1];
        if (!word || word.length < 2) continue;
        const found = VERSES.some((v) =>
          (v.padaccheda || []).includes(word) ||
          (v.finiteVerbs || []).some((fv) => fv.form === word)
        );
        expect(found, `vibhakti row "${row[0]}": word "${word}" should exist in some verse`).toBe(true);
      }
    }
  });

  it('चतुर्थी (dative) and पञ्चमी (ablative) have non-empty examples', () => {
    const cha = vibhakti.table.rows.find((r) => r[0] === 'चतुर्थी');
    const pan = vibhakti.table.rows.find((r) => r[0] === 'पञ्चमी');
    expect(cha[3].length).toBeGreaterThan(5);
    expect(pan[3].length).toBeGreaterThan(5);
  });
});

describe('primer — lakara table', () => {
  const lakara = PRIMER.find((s) => s.id === 'lakara');

  it('exists', () => {
    expect(lakara).toBeDefined();
  });

  it('every example word appears as some finiteVerb form in the corpus', () => {
    for (const row of lakara.table.rows) {
      const cell = row[3];
      const matches = [...cell.matchAll(/([ऀ-ॿ-]+)(?:\s*\([^)]*\))?/g)];
      for (const m of matches) {
        const word = m[1];
        if (!word || word.length < 2) continue;
        const found = VERSES.some((v) =>
          (v.finiteVerbs || []).some((fv) => fv.form === word)
        );
        expect(found, `lakara row "${row[0]}": word "${word}" should appear in some verse's finiteVerbs`).toBe(true);
      }
    }
  });
});

describe('primer — case coverage from the wordParsings backfill', () => {
  // After the 21-verse wordParsings backfill, the corpus should now have
  // at least one wordParsing for every case — including चतुर्थी and पञ्चमी
  // which were previously absent.
  const allCases = ['pra', 'dvi', 'tri', 'cha', 'pan', 'sha', 'sap', 'sam'];

  it('every case is now represented by at least one wordParsing', () => {
    const cases = new Set();
    for (const v of VERSES) {
      for (const wp of Object.values(v.wordParsings || {})) {
        if (wp.case) cases.add(wp.case);
      }
    }
    for (const c of allCases) {
      expect(cases.has(c), `case "${c}" should appear in some wordParsing`).toBe(true);
    }
  });
});
