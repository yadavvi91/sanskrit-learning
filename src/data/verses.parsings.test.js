// Tests for the per-word parsings seed data.
// Catches mismatches between padaccheda and wordParsings keys.

import { describe, it, expect } from 'vitest';
import { VERSES } from './verses.js';

describe('wordParsings — coverage', () => {
  it('all 4 verses have wordParsings', () => {
    for (const v of VERSES) {
      expect(v.wordParsings).toBeDefined();
      expect(typeof v.wordParsings).toBe('object');
    }
  });

  it('every padaccheda word in every verse has a parsing entry', () => {
    for (const v of VERSES) {
      for (const word of v.padaccheda) {
        expect(v.wordParsings[word], `verse ${v.chapter}.${v.verse} missing parsing for "${word}"`).toBeDefined();
      }
    }
  });

  it('every parsing entry has a category', () => {
    for (const v of VERSES) {
      for (const [word, parsing] of Object.entries(v.wordParsings)) {
        expect(parsing.category, `${v.chapter}.${v.verse} "${word}"`).toBeTruthy();
        expect(['noun', 'adjective', 'pronoun', 'verb', 'krdanta', 'particle']).toContain(parsing.category);
      }
    }
  });

  it('every parsing entry has a gloss', () => {
    for (const v of VERSES) {
      for (const [word, parsing] of Object.entries(v.wordParsings)) {
        expect(parsing.gloss, `${v.chapter}.${v.verse} "${word}"`).toBeTruthy();
      }
    }
  });
});

describe('wordParsings — verb entries', () => {
  it('every verb has root + lakara + purusha + number', () => {
    for (const v of VERSES) {
      for (const [word, p] of Object.entries(v.wordParsings)) {
        if (p.category !== 'verb') continue;
        expect(p.root, `${v.chapter}.${v.verse} "${word}"`).toBeTruthy();
        expect(p.lakara || p.kind, `${v.chapter}.${v.verse} "${word}"`).toBeTruthy();
        expect(p.purusha, `${v.chapter}.${v.verse} "${word}"`).toBeTruthy();
        expect(p.number, `${v.chapter}.${v.verse} "${word}"`).toBeTruthy();
      }
    }
  });
});

describe('wordParsings — noun/adjective entries', () => {
  it('every noun/adjective has gender + number + case', () => {
    for (const v of VERSES) {
      for (const [word, p] of Object.entries(v.wordParsings)) {
        if (p.category !== 'noun' && p.category !== 'adjective') continue;
        expect(p.gender, `${v.chapter}.${v.verse} "${word}" missing gender`).toBeTruthy();
        expect(p.number, `${v.chapter}.${v.verse} "${word}" missing number`).toBeTruthy();
        expect(p.case, `${v.chapter}.${v.verse} "${word}" missing case`).toBeTruthy();
      }
    }
  });
});
