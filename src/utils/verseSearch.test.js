import { describe, it, expect, beforeEach } from 'vitest';
import { searchVerses } from './verseSearch.js';

beforeEach(() => {
  if (typeof globalThis.window === 'undefined') {
    const store = {};
    globalThis.window = {
      localStorage: {
        getItem: (k) => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
      },
    };
  }
  // Clear any leaked notes from other tests.
  window.localStorage.removeItem('verse_notes_v1');
});

describe('searchVerses — empty input', () => {
  it('returns [] for empty / whitespace queries', () => {
    expect(searchVerses('')).toEqual([]);
    expect(searchVerses('   ')).toEqual([]);
    expect(searchVerses(null)).toEqual([]);
  });
});

describe('searchVerses — content matches', () => {
  it('finds Devanāgarī text in mool ("धर्म" appears in 1.1)', () => {
    const results = searchVerses('धर्म');
    const hit = results.find((r) => r.chapter === 1 && r.verse === 1);
    expect(hit).toBeDefined();
    expect(hit.hits.some((h) => h.field === 'mool' || h.field === 'samasNotes')).toBe(true);
  });

  it('finds English content in translations ("Madhusudana" appears in 2.4)', () => {
    const results = searchVerses('Madhusudana');
    const hit = results.find((r) => r.chapter === 2 && r.verse === 4);
    expect(hit).toBeDefined();
  });

  it('finds samāsa-bank content ("बहुव्रीहि" → 2.5 has महानुभावान्)', () => {
    const results = searchVerses('बहुव्रीहि');
    const hit = results.find((r) => r.chapter === 2 && r.verse === 5);
    expect(hit).toBeDefined();
    expect(hit.hits.some((h) => h.field === 'samasNotes')).toBe(true);
  });

  it('case-insensitive ("ARJUNA" matches arjuna in references)', () => {
    const results = searchVerses('ARJUNA');
    expect(results.length).toBeGreaterThan(0);
  });
});

describe('searchVerses — finite-verb search', () => {
  it('finds verses by lakāra ("लङ्" should hit 1.1\'s अकुर्वत)', () => {
    const results = searchVerses('लङ्');
    const oneOne = results.find((r) => r.chapter === 1 && r.verse === 1);
    expect(oneOne).toBeDefined();
    expect(oneOne.hits.some((h) => h.field === 'finiteVerbs')).toBe(true);
  });

  it('finds verses by root form ("√कृ" should hit 1.1)', () => {
    const results = searchVerses('√कृ');
    const oneOne = results.find((r) => r.chapter === 1 && r.verse === 1);
    expect(oneOne).toBeDefined();
  });
});

describe('searchVerses — reference matches', () => {
  it('finds Edwin Arnold translations', () => {
    const results = searchVerses('Sanjaya');
    expect(results.length).toBeGreaterThan(0);
  });

  it('finds commentary content ("अद्वैत" hits Shankara summaries)', () => {
    const results = searchVerses('अद्वैत');
    expect(results.length).toBeGreaterThan(0);
    const anyRefHit = results.some((r) => r.hits.some((h) => h.field === 'references'));
    expect(anyRefHit).toBe(true);
  });
});

describe('searchVerses — notes search', () => {
  it('hits per-verse notes from localStorage', () => {
    window.localStorage.setItem('verse_notes_v1', JSON.stringify({
      '2.4': 'A handwritten note about the vocatives Madhusudana and Arisudana',
    }));
    const results = searchVerses('handwritten note');
    const hit = results.find((r) => r.chapter === 2 && r.verse === 4);
    expect(hit).toBeDefined();
    expect(hit.hits.some((h) => h.field === 'notes')).toBe(true);
  });
});

describe('searchVerses — ranking', () => {
  it('returns verses sorted by hit count desc, then by ref asc', () => {
    // "the" appears more times in Edwin Arnold's verbose translations
    // than anywhere else; just verify the sort is stable + descending.
    const results = searchVerses('the');
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].hits.length >= results[i].hits.length).toBe(true);
    }
  });
});
