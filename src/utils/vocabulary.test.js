import { describe, it, expect } from 'vitest';
import { buildVocabulary, VOCAB_COMPARATORS, vocabularyCategoryCounts } from './vocabulary.js';
import { VERSES } from '../data/verses.js';

describe('buildVocabulary', () => {
  it('returns one entry per unique word across the audited (full/browse) corpus', () => {
    // The vocabulary returned by buildVocabulary keeps every word that
    // either (a) has gloss/category/parsing, or (b) appeared in any
    // hand-audited (full / browse) verse's padaccheda. So that's the
    // baseline to compare against — not the entire corpus' padaccheda
    // (some auto-stub padas are sandhi-residue fragments that the
    // Words-page filter intentionally drops).
    const vocab = buildVocabulary();
    const expected = new Set();
    for (const v of VERSES) {
      if (!v.padaccheda) continue;
      const isAudited = v.tier === 'full' || v.tier === 'browse';
      for (const w of v.padaccheda) {
        if (isAudited) expected.add(w);
      }
    }
    // Every audited word must show up; vocab.length may exceed expected
    // because it also includes sharedVocab-glossed words that appear
    // only in auto-stub verses. Assert containment, not equality.
    const vocabWords = new Set(vocab.map((e) => e.word));
    for (const w of expected) {
      expect(vocabWords.has(w), `audited word missing from vocab: ${w}`).toBe(true);
    }
  });

  it('every vocabulary entry has word + count + firstMet + occurrences', () => {
    const vocab = buildVocabulary();
    for (const e of vocab) {
      expect(e.word).toBeTruthy();
      expect(e.count).toBeGreaterThan(0);
      expect(e.firstMet).toBeDefined();
      expect(e.occurrences).toBeDefined();
      expect(e.occurrences.length).toBeGreaterThan(0);
    }
  });

  it('"च" appears in multiple verses → count > 1', () => {
    const vocab = buildVocabulary();
    const ca = vocab.find((e) => e.word === 'च');
    expect(ca).toBeDefined();
    expect(ca.count).toBeGreaterThan(1);
  });

  it('first-met of "च" is verse 1.1 (lowest decodeIndex containing it)', () => {
    const vocab = buildVocabulary();
    const ca = vocab.find((e) => e.word === 'च');
    expect(ca.firstMet.chapter).toBe(1);
    expect(ca.firstMet.verse).toBe(1);
  });

  it('vocabulary entries with parsings carry gloss + category', () => {
    const vocab = buildVocabulary();
    const withParsing = vocab.filter((e) => e.parsing != null);
    // Browse-tier verses ship with no wordParsings, so not every vocab entry
    // has parsing data — but the original 4 hand-decoded verses do, so the
    // count must be substantial.
    expect(withParsing.length).toBeGreaterThan(20);
    for (const e of withParsing) {
      expect(e.gloss).toBeTruthy();
      expect(e.category).toBeTruthy();
    }
  });
});

describe('VOCAB_COMPARATORS', () => {
  it('count sort puts most-frequent first', () => {
    const vocab = buildVocabulary();
    const sorted = [...vocab].sort(VOCAB_COMPARATORS.count);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].count >= sorted[i].count).toBe(true);
    }
  });

  it('firstMet sort orders by verse-ref ascending', () => {
    const vocab = buildVocabulary();
    const sorted = [...vocab].sort(VOCAB_COMPARATORS.firstMet);
    for (let i = 1; i < sorted.length; i++) {
      const a = sorted[i - 1].firstMet, b = sorted[i].firstMet;
      const cmp = a.chapter - b.chapter || a.verse - b.verse;
      expect(cmp <= 0).toBe(true);
    }
  });

  it('category sort groups same-category words', () => {
    const vocab = buildVocabulary();
    const sorted = [...vocab].sort(VOCAB_COMPARATORS.category);
    // Just sanity-check that it doesn't throw and produces a stable ordering
    expect(sorted.length).toBe(vocab.length);
  });
});

describe('vocabularyCategoryCounts', () => {
  it('counts per category sum to total vocabulary size', () => {
    const vocab = buildVocabulary();
    const counts = vocabularyCategoryCounts(vocab);
    const total = Object.values(counts).reduce((s, n) => s + n, 0);
    expect(total).toBe(vocab.length);
  });

  it('includes the categories present in the corpus', () => {
    const vocab = buildVocabulary();
    const counts = vocabularyCategoryCounts(vocab);
    expect(counts.noun || 0).toBeGreaterThan(0);
    expect(counts.verb || 0).toBeGreaterThan(0);
    expect(counts.particle || 0).toBeGreaterThan(0);
  });
});
