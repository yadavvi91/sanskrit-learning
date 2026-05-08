// Tests for the v13 tier system. Pins:
//   - tier field is set on every verse currently in the corpus
//   - the original 4 are 'full', the 21 added in v10 are 'browse'
//   - getVerseTier returns the right tier for known + unknown verses
//   - tierCounts adds up

import { describe, it, expect } from 'vitest';
import {
  VERSES,
  TIER,
  TIER_META,
  getVerseTier,
  tierCounts,
} from './verses.js';

describe('verses.js — tier field on every entry', () => {
  it('every VERSES entry has a tier', () => {
    for (const v of VERSES) {
      expect(v.tier, `${v.chapter}.${v.verse} should have a tier`).toBeDefined();
    }
  });

  it('the original 4 (1.1, 2.3, 2.4, 2.5) are tier full', () => {
    for (const [c, vNum] of [[1, 1], [2, 3], [2, 4], [2, 5]]) {
      expect(getVerseTier(c, vNum)).toBe('full');
    }
  });

  it('every other current entry is tier browse (the v10 backfill set)', () => {
    const fullKeys = new Set(['1.1', '2.3', '2.4', '2.5']);
    for (const v of VERSES) {
      const key = `${v.chapter}.${v.verse}`;
      if (fullKeys.has(key)) continue;
      expect(v.tier, `${key} should be browse`).toBe('browse');
    }
  });
});

describe('getVerseTier', () => {
  it('returns the explicit tier on a tagged verse', () => {
    expect(getVerseTier(1, 1)).toBe('full');
    expect(getVerseTier(2, 13)).toBe('browse');
  });

  it('returns "fallback" for any chapter:verse without an entry', () => {
    expect(getVerseTier(1, 2)).toBe('fallback');
    expect(getVerseTier(11, 50)).toBe('fallback');
    expect(getVerseTier(99, 99)).toBe('fallback');
  });
});

describe('tierCounts', () => {
  it('returns counts grouped by tier that sum to VERSES.length', () => {
    const counts = tierCounts();
    expect(counts.full + counts.browse + counts['auto-stub']).toBe(VERSES.length);
  });

  it('full count matches the 4 original verses', () => {
    expect(tierCounts().full).toBe(4);
  });
});

describe('TIER + TIER_META constants', () => {
  it('TIER constant has all four tier ids', () => {
    expect(TIER.FULL).toBe('full');
    expect(TIER.BROWSE).toBe('browse');
    expect(TIER.AUTOSTUB).toBe('auto-stub');
    expect(TIER.FALLBACK).toBe('fallback');
  });

  it('TIER_META has a label + en + badgeClass for every tier', () => {
    for (const id of ['full', 'browse', 'auto-stub', 'fallback']) {
      expect(TIER_META[id], `TIER_META[${id}] missing`).toBeDefined();
      expect(TIER_META[id].label).toBeTruthy();
      expect(TIER_META[id].en).toBeTruthy();
      expect(TIER_META[id].badgeClass).toBeTruthy();
    }
  });
});
