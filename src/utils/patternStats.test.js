import { describe, it, expect } from 'vitest';
import {
  flattenPatterns,
  patternStats,
  sortedPatterns,
  COMPARATORS,
} from './patternStats.js';

describe('flattenPatterns', () => {
  it('returns one entry per pattern, with category metadata attached', () => {
    const flat = flattenPatterns();
    expect(flat.length).toBeGreaterThan(0);
    for (const p of flat) {
      expect(p.name).toBeTruthy();
      expect(p.meaning).toBeTruthy();
      expect(p.categoryId).toBeTruthy();
      expect(p.categoryTitle).toBeTruthy();
    }
  });

  it('includes patterns from every defined category', () => {
    const flat = flattenPatterns();
    const ids = new Set(flat.map((p) => p.categoryId));
    expect(ids.has('noun')).toBe(true);
    expect(ids.has('verb')).toBe(true);
  });
});

describe('patternStats', () => {
  it('reports firstMet from trigger.verse when present', () => {
    const stats = patternStats({ name: 'X', trigger: { verse: '2.4' } });
    expect(stats.firstMet).toBe('2.4');
    expect(stats.alsoIn).toEqual([]);
    expect(stats.total).toBe(1);
  });

  it('returns null firstMet when the pattern has no triggering verse', () => {
    const stats = patternStats({ name: 'X', trigger: { label: 'Lesson 2' } });
    expect(stats.firstMet).toBeNull();
    expect(stats.total).toBe(0);
  });

  it('counts alsoIn verses excluding firstMet duplicates', () => {
    const stats = patternStats({
      name: 'X',
      trigger: { verse: '1.1', alsoIn: ['1.1', '2.5', '2.4'] },
    });
    expect(stats.firstMet).toBe('1.1');
    expect(stats.alsoIn.sort()).toEqual(['2.4', '2.5']);
    expect(stats.total).toBe(3);
  });
});

describe('COMPARATORS — sort behaviour', () => {
  it('verse-aware sort places "1.1" before "2.4"', () => {
    const a = { name: 'A', trigger: { verse: '2.4' } };
    const b = { name: 'B', trigger: { verse: '1.1' } };
    expect(COMPARATORS.firstMet(a, b)).toBeGreaterThan(0);
    expect(COMPARATORS.firstMet(b, a)).toBeLessThan(0);
  });

  it('verse sort is numeric per segment ("1.10" > "1.2")', () => {
    const a = { name: 'A', trigger: { verse: '1.10' } };
    const b = { name: 'B', trigger: { verse: '1.2' } };
    expect(COMPARATORS.firstMet(a, b)).toBeGreaterThan(0);
  });

  it('patterns with no firstMet sort to the end', () => {
    const a = { name: 'A', trigger: { verse: '2.4' } };
    const b = { name: 'B', trigger: { label: 'Lesson 2' } };
    expect(COMPARATORS.firstMet(a, b)).toBeLessThan(0);
  });

  it('category sort breaks ties by name', () => {
    const a = { name: 'B', categoryTitle: 'Noun System' };
    const b = { name: 'A', categoryTitle: 'Noun System' };
    expect(COMPARATORS.category(a, b)).toBeGreaterThan(0);
  });

  it('also-seen sort puts higher counts first (descending by total)', () => {
    const a = { name: 'A', trigger: { verse: '1.1', alsoIn: ['2.4'] } };
    const b = { name: 'B', trigger: { verse: '1.1' } };
    expect(COMPARATORS.alsoSeen(a, b)).toBeLessThan(0);
  });
});

describe('sortedPatterns', () => {
  it('returns a non-empty array of flattened patterns', () => {
    const arr = sortedPatterns('name');
    expect(arr.length).toBeGreaterThan(0);
  });

  it('default sort by category leaves all patterns in place', () => {
    const arr = sortedPatterns();
    const flat = flattenPatterns();
    expect(arr).toHaveLength(flat.length);
  });

  it('descending direction is the reverse of ascending', () => {
    const asc = sortedPatterns('name', 'asc').map((p) => p.name);
    const desc = sortedPatterns('name', 'desc').map((p) => p.name);
    expect(desc).toEqual([...asc].reverse());
  });
});
