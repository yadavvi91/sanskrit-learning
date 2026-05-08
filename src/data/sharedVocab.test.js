// Tests for the shared Sanskrit dictionary + the vocabulary builder's
// fallback into it. These would have caught the gap that prompted the
// "why no glossary for अभिजायते क्रोधात्" complaint.

import { describe, it, expect } from 'vitest';
import { SHARED_VOCAB, lookupSharedVocab } from './sharedVocab.js';
import { buildVocabulary } from '../utils/vocabulary.js';

describe('SHARED_VOCAB — coverage of words flagged by the user', () => {
  // The exact words the user said had no glossary.
  it('covers अभिजायते (the climactic chain verb in 2.62)', () => {
    expect(SHARED_VOCAB['अभिजायते']).toBeDefined();
    expect(SHARED_VOCAB['अभिजायते'].gloss).toBeTruthy();
  });

  it('covers क्रोधात् (ablative — "from anger" — opens 2.63)', () => {
    expect(SHARED_VOCAB['क्रोधात्']).toBeDefined();
    expect(SHARED_VOCAB['क्रोधात्'].gloss).toBeTruthy();
  });

  it('covers the full 2.62 cause-chain trio (उपजायते / सञ्जायते / अभिजायते)', () => {
    expect(SHARED_VOCAB['उपजायते']).toBeDefined();
    expect(SHARED_VOCAB['सञ्जायते']).toBeDefined();
    expect(SHARED_VOCAB['अभिजायते']).toBeDefined();
  });

  it('covers the 2.63 ablative chain (क्रोधात् / सम्मोहात् / स्मृतिभ्रंशात् / बुद्धिनाशात्)', () => {
    expect(SHARED_VOCAB['क्रोधात्']).toBeDefined();
    expect(SHARED_VOCAB['सम्मोहात्']).toBeDefined();
    expect(SHARED_VOCAB['स्मृतिभ्रंशात्']).toBeDefined();
    expect(SHARED_VOCAB['बुद्धिनाशात्']).toBeDefined();
  });

  it('covers the 9.27 verb sequence (करोषि / अश्नासि / जुहोषि / ददासि / तपस्यसि / कुरुष्व)', () => {
    for (const w of ['करोषि', 'अश्नासि', 'जुहोषि', 'ददासि', 'तपस्यसि', 'कुरुष्व']) {
      expect(SHARED_VOCAB[w], `missing dictionary entry for ${w}`).toBeDefined();
      expect(SHARED_VOCAB[w].gloss).toBeTruthy();
    }
  });

  it('covers the 18.66 charama-shloka verbs (व्रज / मोक्षयिष्यामि / शुचः)', () => {
    for (const w of ['व्रज', 'मोक्षयिष्यामि', 'शुचः']) {
      expect(SHARED_VOCAB[w], `missing dictionary entry for ${w}`).toBeDefined();
    }
  });

  it('every dictionary entry is well-formed: has category and gloss', () => {
    for (const [word, entry] of Object.entries(SHARED_VOCAB)) {
      expect(entry.category, `${word} missing category`).toBeTruthy();
      expect(entry.gloss, `${word} missing gloss`).toBeTruthy();
    }
  });
});

describe('lookupSharedVocab — hyphen-stripping fallback', () => {
  it('finds an exact-key match', () => {
    const r = lookupSharedVocab('अभिजायते');
    expect(r).toBeTruthy();
    expect(r.gloss).toBeTruthy();
  });

  it('strips hyphens to find compound-form keys', () => {
    // padaccheda surface form uses hyphens; dictionary uses joined form.
    const r = lookupSharedVocab('मात्रा-स्पर्शाः');
    expect(r).toBeTruthy();
    expect(r.gloss).toMatch(/sense-contacts|matter-touches/i);
  });

  it('returns null for unknown words', () => {
    expect(lookupSharedVocab('नोपस्थितः')).toBeNull();
  });

  it('handles falsy input safely', () => {
    expect(lookupSharedVocab('')).toBeNull();
    expect(lookupSharedVocab(null)).toBeNull();
    expect(lookupSharedVocab(undefined)).toBeNull();
  });
});

describe('buildVocabulary — every padaccheda word now has a gloss', () => {
  // The integration test for the original complaint: after sharedVocab
  // landed, every word the user sees should have a meaning attached
  // (either from a verse's wordParsings or from the shared dictionary).
  it('no padaccheda word from any of the 25 verses appears with empty gloss', () => {
    const vocab = buildVocabulary();
    const missing = vocab.filter((e) => !e.gloss);
    expect(missing, `${missing.length} words still without gloss: ${missing.map((m) => m.word).join(', ')}`).toEqual([]);
  });

  it('अभिजायते specifically (the user-flagged word) carries a gloss', () => {
    const vocab = buildVocabulary();
    const e = vocab.find((v) => v.word === 'अभिजायते');
    expect(e).toBeDefined();
    expect(e.gloss).toBeTruthy();
  });

  it('क्रोधात् specifically carries a gloss', () => {
    const vocab = buildVocabulary();
    const e = vocab.find((v) => v.word === 'क्रोधात्');
    expect(e).toBeDefined();
    expect(e.gloss).toBeTruthy();
  });
});
