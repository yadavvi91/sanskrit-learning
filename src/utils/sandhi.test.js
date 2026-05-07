import { describe, it, expect } from 'vitest';
import { undoSandhi, SANDHI_RULES, describeRule } from './sandhi.js';

describe('SANDHI_RULES catalogue', () => {
  it('contains 18+ rules covering vowel + visarga + consonant categories', () => {
    expect(SANDHI_RULES.length).toBeGreaterThanOrEqual(18);
    const cats = new Set(SANDHI_RULES.map((r) => r.category));
    expect(cats.has('vowel')).toBe(true);
    expect(cats.has('visarga')).toBe(true);
    expect(cats.has('consonant')).toBe(true);
  });

  it('every rule has id, name, description, category, example', () => {
    for (const r of SANDHI_RULES) {
      expect(r.id).toBeTruthy();
      expect(r.name).toBeTruthy();
      expect(r.category).toMatch(/^(vowel|visarga|consonant)$/);
      expect(r.example).toContain('→');
    }
  });

  it('rule ids are unique', () => {
    const ids = SANDHI_RULES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('undoSandhi — input handling', () => {
  it('returns [] on empty / whitespace / non-string input', () => {
    expect(undoSandhi('')).toEqual([]);
    expect(undoSandhi('   ')).toEqual([]);
    expect(undoSandhi(null)).toEqual([]);
    expect(undoSandhi(undefined)).toEqual([]);
  });

  it('returns the input as a single part when no rule fires', () => {
    const r = undoSandhi('कमल');
    expect(r[0].parts).toEqual(['कमल']);
    expect(r[0].rules).toEqual([]);
  });
});

describe('undoSandhi — visarga + च (the canonical Gītā 1.1 case)', () => {
  it('पाण्डवाश्च → पाण्डवाः + च', () => {
    const r = undoSandhi('पाण्डवाश्च');
    expect(r[0].parts).toContain('पाण्डवाः');
    expect(r[0].parts).toContain('च');
    expect(r[0].rules.some((rule) => rule.id === 'visarga-ca')).toBe(true);
  });
});

describe('undoSandhi — vowel sandhi (Gītā 2.3 cases)', () => {
  it('नैतत् → न + एतत् (अ + ए → ऐ)', () => {
    const r = undoSandhi('नैतत्');
    expect(r[0].parts).toEqual(['न', 'एतत्']);
    expect(r[0].rules.some((rule) => rule.id === 'aa-e')).toBe(true);
  });

  it('त्यक्त्वोत्तिष्ठ → त्यक्त्वा + उत्तिष्ठ (आ + उ → ओ — handled by aa-uu)', () => {
    const r = undoSandhi('त्यक्त्वोत्तिष्ठ');
    expect(r[0].parts.some((p) => p.includes('उत्तिष्ठ'))).toBe(true);
    expect(r[0].rules.some((rule) => rule.id === 'aa-uu')).toBe(true);
  });
});

describe('undoSandhi — yaṇ (इ + उ → य्यु)', () => {
  it('त्वय्युपपद्यते → त्वयि + उपपद्यते', () => {
    const r = undoSandhi('त्वय्युपपद्यते');
    expect(r[0].parts).toContain('त्वयि');
    expect(r[0].parts).toContain('उपपद्यते');
    expect(r[0].rules.some((rule) => rule.id === 'i-u-yan')).toBe(true);
  });
});

describe('undoSandhi — consonant sandhi', () => {
  it('तच्च → तत् + च (त् + च → च्च)', () => {
    const r = undoSandhi('तच्च');
    expect(r[0].parts).toContain('तत्');
    expect(r[0].parts).toContain('च');
  });

  it('तज्जयति → तत् + जयति (त् + ज → ज्ज)', () => {
    const r = undoSandhi('तज्जयति');
    expect(r[0].parts.some((p) => p.includes('जयति'))).toBe(true);
  });
});

describe('describeRule — lookup helper', () => {
  it('returns the rule for a known id', () => {
    const r = describeRule('visarga-ca');
    expect(r).toBeDefined();
    expect(r.category).toBe('visarga');
  });

  it('returns undefined for unknown ids', () => {
    expect(describeRule('not-a-rule')).toBeUndefined();
  });
});

describe('undoSandhi — chained sandhi (multi-rule stack)', () => {
  it('पाण्डवाश्चैव → पाण्डवाः + च + एव (visarga + च, then अ + ए → ऐ)', () => {
    // पाण्डवाश्चैव = पाण्डवाः + च + एव. The engine should detect both
    // sandhi-च (visarga-ca: श्च) and the अ-ए vowel sandhi (aa-e: ै).
    const r = undoSandhi('पाण्डवाश्चैव');
    expect(r[0].parts).toContain('पाण्डवाः');
    // After both rules fire, "च" + "एव" should appear as separate parts.
    const joined = r[0].parts.join(' ');
    expect(joined).toContain('एव');
    expect(r[0].rules.length).toBeGreaterThanOrEqual(2);
  });
});
