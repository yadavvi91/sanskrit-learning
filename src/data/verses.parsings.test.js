// Tests for the per-word parsings seed data.
// Catches mismatches between padaccheda and wordParsings keys.

import { describe, it, expect } from 'vitest';
import { VERSES } from './verses.js';

// "Fully decoded" = has wordParsings populated. "Browse-tier" verses
// (corpus-loaded but not yet hand-decoded) are exempt from these
// shape constraints — they ship with mool + padaccheda + translations
// only and `wordParsings` is undefined.
function fullyDecoded(v) {
  return v.wordParsings && Object.keys(v.wordParsings).length > 0;
}

describe('wordParsings — coverage on fully-decoded verses', () => {
  it('the original 4 hand-decoded verses (1.1, 2.3, 2.4, 2.5) all have wordParsings', () => {
    const refs = ['1.1', '2.3', '2.4', '2.5'];
    for (const ref of refs) {
      const [c, v] = ref.split('.').map(Number);
      const verse = VERSES.find((vv) => vv.chapter === c && vv.verse === v);
      expect(verse).toBeDefined();
      expect(verse.wordParsings).toBeDefined();
      expect(Object.keys(verse.wordParsings).length).toBeGreaterThan(0);
    }
  });

  it('every padaccheda word in a fully-decoded verse has a parsing entry', () => {
    for (const v of VERSES) {
      if (!fullyDecoded(v)) continue;
      for (const word of v.padaccheda) {
        expect(v.wordParsings[word], `verse ${v.chapter}.${v.verse} missing parsing for "${word}"`).toBeDefined();
      }
    }
  });

  it('every parsing entry has a category', () => {
    for (const v of VERSES) {
      if (!fullyDecoded(v)) continue;
      for (const [word, parsing] of Object.entries(v.wordParsings)) {
        expect(parsing.category, `${v.chapter}.${v.verse} "${word}"`).toBeTruthy();
        expect(['noun', 'adjective', 'pronoun', 'verb', 'krdanta', 'particle']).toContain(parsing.category);
      }
    }
  });

  it('every parsing entry has a gloss', () => {
    for (const v of VERSES) {
      if (!fullyDecoded(v)) continue;
      for (const [word, parsing] of Object.entries(v.wordParsings)) {
        expect(parsing.gloss, `${v.chapter}.${v.verse} "${word}"`).toBeTruthy();
      }
    }
  });
});

describe('wordParsings — verb entries', () => {
  it('every verb has root + lakara + purusha + number', () => {
    for (const v of VERSES) {
      if (!fullyDecoded(v)) continue;
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
      if (!fullyDecoded(v)) continue;
      for (const [word, p] of Object.entries(v.wordParsings)) {
        if (p.category !== 'noun' && p.category !== 'adjective') continue;
        expect(p.gender, `${v.chapter}.${v.verse} "${word}" missing gender`).toBeTruthy();
        expect(p.number, `${v.chapter}.${v.verse} "${word}" missing number`).toBeTruthy();
        expect(p.case, `${v.chapter}.${v.verse} "${word}" missing case`).toBeTruthy();
      }
    }
  });
});
