// Tests for coreVocab — covers the high-frequency words that the
// agent-built VOCAB_EXTENDED missed (येषाम्, राज्यम्, हृदयम्, etc.).
//
// User-visible failure mode without coreVocab: clicking a basic
// pronoun or noun in पदच्छेद showed "no grammar data yet" — even
// for things like अयम्, इदम्, राज्यम् that are everywhere in the Gītā.

import { describe, it, expect } from 'vitest';
import { lookupSharedVocab } from './sharedVocab.js';

describe('coreVocab — pronoun declension tables', () => {
  it.each([
    ['यः', 'यद्'], ['यम्', 'यद्'], ['येषाम्', 'यद्'], ['यानि', 'यद्'],
    ['सः', 'तद्'], ['तम्', 'तद्'], ['तेषाम्', 'तद्'], ['तस्य', 'तद्'],
    ['अयम्', 'इदम्'], ['इदम्', 'इदम्'], ['इमम्', 'इदम्'], ['एषाम्', 'इदम्'],
    ['एषः', 'एतद्'], ['एतत्', 'एतद्'], ['एतेषाम्', 'एतद्'],
    ['कः', 'किम्'], ['का', 'किम्'], ['किम्', 'किम्'], ['केन', 'किम्'],
    ['सर्वान्', 'सर्व'], ['सर्वेषाम्', 'सर्व'],
    ['अहम्', 'अस्मद्'], ['मया', 'अस्मद्'], ['नः', 'अस्मद्'],
    ['त्वम्', 'युष्मद्'], ['त्वां', 'युष्मद्'], ['तव', 'युष्मद्'],
  ])('%s resolves to root %s', (form, expectedRoot) => {
    const r = lookupSharedVocab(form);
    expect(r, `${form} not found`).toBeTruthy();
    expect(r.root).toBe(expectedRoot);
    expect(r.category).toBe('pronoun');
  });
});

describe('coreVocab — common a-stem nouns', () => {
  it.each([
    ['राज्यम्', 'राज्य', 'pra'],
    ['राज्ये',  'राज्य', 'sap'],
    ['राज्यस्य', 'राज्य', 'sha'],
    ['ज्ञानम्', 'ज्ञान', 'pra'],
    ['योगे',    'योग',   'sap'],
    ['धर्मस्य', 'धर्म',  'sha'],
    ['हृदयम्',  'हृदय',  'pra'],
    ['कामाः',   'काम',   'pra'],
  ])('%s resolves as %s in case %s', (form, root, caseCode) => {
    const r = lookupSharedVocab(form);
    expect(r, `${form} not found`).toBeTruthy();
    expect(r.root).toBe(root);
    expect(r.case).toBe(caseCode);
  });
});

describe('coreVocab — krdantas (PPPs, infinitives, absolutives)', () => {
  it.each([
    ['काङ्क्षितम्', '√काङ्क्ष्', 'past-passive'],
    ['उक्तम्',     '√वच्',     'past-passive'],
    ['कृतम्',      '√कृ',      'past-passive'],
    ['कर्तुम्',    '√कृ',      'infinitive'],
    ['हन्तुम्',    '√हन्',     'infinitive'],
    ['उक्त्वा',    '√वच्',     'absolutive'],
    ['कृत्वा',     '√कृ',      'absolutive'],
  ])('%s resolves as %s krdanta', (form, root, kind) => {
    const r = lookupSharedVocab(form);
    expect(r, `${form} not found`).toBeTruthy();
    expect(r.root).toBe(root);
    expect(r.kind).toBe(kind);
  });
});
