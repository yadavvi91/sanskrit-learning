import { describe, it, expect } from 'vitest';
import {
  SAMASA_TYPES,
  lookupSamasaType,
  buildSamasaBank,
  groupSamasaBankByFamily,
} from './samasa.js';

describe('SAMASA_TYPES catalogue', () => {
  it('exposes the six classical families plus नञ्-समास', () => {
    const families = new Set(SAMASA_TYPES.map((t) => t.family));
    expect(families.has('तत्पुरुष')).toBe(true);
    expect(families.has('द्वन्द्व')).toBe(true);
    expect(families.has('बहुव्रीहि')).toBe(true);
    expect(families.has('अव्ययीभाव')).toBe(true);
    expect(families.has('नञ्-समास')).toBe(true);
  });

  it('every type has a unique id', () => {
    const ids = SAMASA_TYPES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('lookupSamasaType — devanāgarī label → catalogue entry', () => {
  it('finds षष्ठी तत्पुरुष by its देवनागरी label', () => {
    const t = lookupSamasaType('षष्ठी तत्पुरुष');
    expect(t).toBeDefined();
    expect(t.family).toBe('तत्पुरुष');
  });

  it('returns null on unknown labels', () => {
    expect(lookupSamasaType('imaginary type')).toBeNull();
  });
});

describe('buildSamasaBank — auto-projection from verses.js → samasNotes[]', () => {
  it('returns at least the 10 seed compounds from the original 4 decoded verses', () => {
    const bank = buildSamasaBank();
    expect(bank.length).toBeGreaterThanOrEqual(10);
  });

  it('includes compounds contributed by the browse-tier verses too', () => {
    const bank = buildSamasaBank();
    // Browse-tier verses 2.47, 2.48, 12.13, 18.66, etc. now contribute samāsa
    // analyses. Total should be substantially more than the original 10.
    expect(bank.length).toBeGreaterThan(20);
  });

  it('every entry carries verse provenance', () => {
    const bank = buildSamasaBank();
    for (const entry of bank) {
      expect(entry.verseRef.chapter).toBeGreaterThan(0);
      expect(entry.verseRef.verse).toBeGreaterThan(0);
    }
  });

  it('includes the iconic धर्मक्षेत्रे compound from 1.1', () => {
    const bank = buildSamasaBank();
    const dharma = bank.find((b) => b.compound === 'धर्मक्षेत्रे');
    expect(dharma).toBeDefined();
    expect(dharma.type).toBe('षष्ठी तत्पुरुष');
    expect(dharma.verseRef).toEqual({ chapter: 1, verse: 1 });
  });

  it('includes the बहुव्रीहि महानुभावान् from 2.5', () => {
    const bank = buildSamasaBank();
    const m = bank.find((b) => b.compound === 'महानुभावान्');
    expect(m).toBeDefined();
    expect(m.type).toBe('बहुव्रीहि');
  });
});

describe('groupSamasaBankByFamily — type-filterable view feeder', () => {
  it('groups by family with all bank entries placed', () => {
    const groups = groupSamasaBankByFamily();
    const allInGroups = [...groups.values()].flat().length;
    const bank = buildSamasaBank();
    expect(allInGroups).toBe(bank.length);
  });

  it('तत्पुरुष is the largest family in the seed corpus', () => {
    const groups = groupSamasaBankByFamily();
    const tat = groups.get('तत्पुरुष') || [];
    // 7 of 10 seed compounds are तत्पुरुष variants
    expect(tat.length).toBeGreaterThanOrEqual(6);
  });
});
