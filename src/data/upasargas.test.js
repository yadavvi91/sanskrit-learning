import { describe, it, expect } from 'vitest';
import { UPASARGAS, lookupUpasarga, stripUpasargas } from './upasargas.js';
import { decompose_reverse } from '../utils/conjugator.js';
import { DHATUS_TOP25 } from './dhatus.js';

describe('UPASARGAS catalogue', () => {
  it('includes 22 traditional prefixes', () => {
    expect(UPASARGAS.length).toBe(22);
  });

  it('every entry has prefix, iast, and sense', () => {
    for (const u of UPASARGAS) {
      expect(u.prefix).toBeTruthy();
      expect(u.iast).toBeTruthy();
      expect(u.sense).toBeTruthy();
    }
  });
});

describe('lookupUpasarga — devanāgarī prefix → entry', () => {
  it('finds प्रति', () => {
    expect(lookupUpasarga('प्रति')?.iast).toBe('prati');
  });

  it('returns null on unknown prefixes', () => {
    expect(lookupUpasarga('xyz')).toBeNull();
  });
});

describe('stripUpasargas — peel prefixes off the front of a form', () => {
  it('strips प्रति from प्रतियोत्स्यामि', () => {
    const { stripped, prefixes } = stripUpasargas('प्रतियोत्स्यामि');
    expect(stripped).toBe('योत्स्यामि');
    expect(prefixes.map((p) => p.prefix)).toEqual(['प्रति']);
  });

  it('returns the form unchanged when no prefix matches', () => {
    const { stripped, prefixes } = stripUpasargas('भवति');
    expect(stripped).toBe('भवति');
    expect(prefixes).toEqual([]);
  });

  it('tries longer prefixes first (प्रति before प्र)', () => {
    // प्रतियोत्स्यामि must strip प्रति, not just प्र (which would leave तियोत्स्यामि).
    const { prefixes } = stripUpasargas('प्रतियोत्स्यामि');
    expect(prefixes[0].prefix).toBe('प्रति');
  });

  it('peels up to 2 stacked prefixes', () => {
    // Synthetic case: "प्रतिप्रसादति" — strip प्रति then प्र.
    // (Not a real word, but tests the stacking logic.)
    const { stripped, prefixes } = stripUpasargas('प्रतिप्रसादति');
    expect(prefixes.length).toBe(2);
    expect(prefixes[0].prefix).toBe('प्रति');
    expect(prefixes[1].prefix).toBe('प्र');
    expect(stripped).toBe('सादति');
  });

  it('does not strip a prefix when it would consume the entire string', () => {
    // Bare "प्र" alone — stripping would leave nothing. Refuse.
    const { stripped, prefixes } = stripUpasargas('प्र');
    expect(stripped).toBe('प्र');
    expect(prefixes).toEqual([]);
  });

  it('strips greedily; whether the residue is a real word is decided downstream', () => {
    // "प्रति" → strips प्र (since 4 chars > 2-char prefix), leaving "ति".
    // The stripper is intentionally permissive; decompose_reverse's match
    // step is what filters meaningful results from coincidental prefixes.
    const { stripped, prefixes } = stripUpasargas('प्रति');
    expect(stripped).toBe('ति');
    expect(prefixes[0].prefix).toBe('प्र');
  });
});

describe('decompose_reverse with upasarga stripping', () => {
  it('decodes प्रतियोत्स्यामि as प्रति + √युध् + लृट् + P + उत्तम + एक (the actual Gītā 2.4 form)', () => {
    const matches = decompose_reverse('प्रतियोत्स्यामि', DHATUS_TOP25);
    const m = matches.find((x) => x.dhatu.id === 'yudh');
    expect(m).toBeDefined();
    expect(m.lakara).toBe('lrt');
    expect(m.purusha).toBe('uttama');
    expect(m.vachana).toBe('eka');
    expect(m.prefixes.map((p) => p.prefix)).toEqual(['प्रति']);
  });

  it('still decodes plain forms without prefixes', () => {
    const matches = decompose_reverse('भवति', DHATUS_TOP25);
    const m = matches.find((x) => x.dhatu.id === 'bhu' && x.lakara === 'lat');
    expect(m).toBeDefined();
    expect(m.prefixes).toEqual([]);
  });
});
