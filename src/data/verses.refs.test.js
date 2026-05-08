// Smoke tests for the references seed data on decoded verses.
// Catches accidental shape regressions when adding more decoded verses.

import { describe, it, expect } from 'vitest';
import { VERSES } from './verses.js';

// "Fully decoded" = original 4 hand-decoded verses (1.1, 2.3, 2.4, 2.5).
// They carry both translations AND commentaries. Browse-tier verses (popular
// ones loaded for browsing/reading) carry translations only.
const FULLY_DECODED_REFS = ['1.1', '2.3', '2.4', '2.5'];
function isFullyDecoded(v) {
  return FULLY_DECODED_REFS.includes(`${v.chapter}.${v.verse}`);
}

describe('verse references — seed data shape', () => {
  it('every verse carries a references field (translations at minimum)', () => {
    for (const v of VERSES) {
      expect(v.references).toBeDefined();
      expect(v.references.translations).toBeDefined();
      expect(v.references.translations.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('fully-decoded verses (the original 4) have at least 2 translations', () => {
    for (const v of VERSES) {
      if (!isFullyDecoded(v)) continue;
      expect(v.references.translations.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('fully-decoded verses have commentary positions for Shankara + Ramanuja', () => {
    for (const v of VERSES) {
      if (!isFullyDecoded(v)) continue;
      const sages = new Set((v.references.commentaries || []).map((c) => c.sage));
      expect(sages.has('Shankara')).toBe(true);
      expect(sages.has('Ramanuja')).toBe(true);
    }
  });

  it('every translation entry is well-formed', () => {
    for (const v of VERSES) {
      for (const t of v.references.translations) {
        expect(t.translator).toBeTruthy();
        expect(t.year).toBeGreaterThan(1700);
        expect(t.year).toBeLessThan(2100);
        expect(t.text).toBeTruthy();
        expect(t.license).toBeTruthy();
      }
    }
  });

  it('every commentary entry (where present) is well-formed', () => {
    for (const v of VERSES) {
      for (const c of v.references.commentaries || []) {
        expect(c.sage).toBeTruthy();
        expect(c.school).toBeTruthy();
        expect(c.summary.length).toBeGreaterThan(20);
      }
    }
  });

  it('only public-domain translations are seeded today', () => {
    for (const v of VERSES) {
      for (const t of v.references.translations) {
        expect(t.license).toBe('public-domain');
      }
    }
  });
});
