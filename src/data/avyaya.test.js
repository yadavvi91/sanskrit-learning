import { describe, it, expect } from 'vitest';
import { tallyParticles, POSTPOSITIONS, PARTICLE_GROUPS } from './avyaya.js';
import { VERSES } from './verses.js';

describe('tallyParticles — auto-grow from decoded corpus', () => {
  it('finds च and इति in the corpus (both very common Gītā particles)', () => {
    const tally = tallyParticles(VERSES);
    const cha = tally.find((t) => t.word === 'च');
    expect(cha).toBeDefined();
    expect(cha.count).toBeGreaterThan(0);
  });

  it('strips compound-marker hyphens before matching ("धर्म-क्षेत्रे" still tallies)', () => {
    const fakeVerses = [{ chapter: 99, verse: 1, padaccheda: ['धर्म-क्षेत्रे', 'च', 'इति'] }];
    const tally = tallyParticles(fakeVerses);
    const cha = tally.find((t) => t.word === 'च');
    expect(cha).toBeDefined();
    expect(cha.count).toBe(1);
  });

  it('counts repeats correctly across multiple verses', () => {
    const fakeVerses = [
      { chapter: 1, verse: 1, padaccheda: ['च', 'च', 'हि'] },
      { chapter: 1, verse: 2, padaccheda: ['च'] },
    ];
    const tally = tallyParticles(fakeVerses);
    const cha = tally.find((t) => t.word === 'च');
    expect(cha.count).toBe(3);
    expect(cha.verses.sort()).toEqual(['1.1', '1.2']);
  });

  it('returns results sorted by descending frequency', () => {
    const fakeVerses = [{ chapter: 1, verse: 1, padaccheda: ['च', 'च', 'हि'] }];
    const tally = tallyParticles(fakeVerses);
    for (let i = 1; i < tally.length; i++) {
      expect(tally[i - 1].count >= tally[i].count).toBe(true);
    }
  });

  it('ignores words that are not in the avyaya inventory', () => {
    const fakeVerses = [{ chapter: 1, verse: 1, padaccheda: ['राम', 'गृहम्', 'गच्छति'] }];
    expect(tallyParticles(fakeVerses)).toEqual([]);
  });
});

describe('reference data shape', () => {
  it('postpositions table has at least the 9 documented entries', () => {
    expect(POSTPOSITIONS.length).toBeGreaterThanOrEqual(9);
    for (const p of POSTPOSITIONS) {
      expect(p.word).toBeTruthy();
      expect(p.sense).toBeTruthy();
      expect(p.govern).toBeTruthy();
    }
  });

  it('particle groups are non-empty and well-formed', () => {
    expect(PARTICLE_GROUPS.length).toBeGreaterThan(0);
    for (const g of PARTICLE_GROUPS) {
      expect(g.title).toBeTruthy();
      expect(g.items.length).toBeGreaterThan(0);
    }
  });
});
