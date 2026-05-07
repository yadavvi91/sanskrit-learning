// Smoke tests for the references seed data on decoded verses.
// Catches accidental shape regressions when adding more decoded verses.

import { describe, it, expect } from 'vitest';
import { VERSES } from './verses.js';

describe('verse references — seed data shape', () => {
  it('all 4 currently-decoded verses carry a references field', () => {
    expect(VERSES.length).toBe(4);
    for (const v of VERSES) {
      expect(v.references).toBeDefined();
    }
  });

  it('each verse has at least 2 translations', () => {
    for (const v of VERSES) {
      expect(v.references.translations.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('each verse has commentary positions for at least Shankara and Ramanuja', () => {
    for (const v of VERSES) {
      const sages = new Set(v.references.commentaries.map((c) => c.sage));
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

  it('every commentary entry is well-formed', () => {
    for (const v of VERSES) {
      for (const c of v.references.commentaries) {
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
