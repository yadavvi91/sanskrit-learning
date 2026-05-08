// Tests for the pronoun-anchor classifier — the parallel of
// getDeclensionForParsing for nouns. Used by WordPopover to render
// "see in सर्वनाम" links from any pronoun chip.

import { describe, it, expect } from 'vitest';
import { getPronounAnchor, PRONOUN_SECTION_IDS } from './pronouns.js';

describe('getPronounAnchor — pronoun root → Atlas section', () => {
  it('maps तद् → tad section (where तान् in 2.14 belongs)', () => {
    const r = getPronounAnchor({ category: 'pronoun', root: 'तद्' });
    expect(r?.anchor).toBe('tad');
    expect(r?.label).toMatch(/तद्-template/);
  });

  it('maps एनद् (anaphoric) → tad section', () => {
    expect(getPronounAnchor({ category: 'pronoun', root: 'एनद्' })?.anchor).toBe('tad');
  });

  it('maps अस्मद् + युष्मद् → personal section', () => {
    expect(getPronounAnchor({ category: 'pronoun', root: 'अस्मद्' })?.anchor).toBe('personal');
    expect(getPronounAnchor({ category: 'pronoun', root: 'युष्मद्' })?.anchor).toBe('personal');
  });

  it('maps यद् / किम् / सर्व / अन्य / एतद् → transfers section', () => {
    for (const root of ['यद्', 'किम्', 'सर्व', 'अन्य', 'एतद्']) {
      const r = getPronounAnchor({ category: 'pronoun', root });
      expect(r?.anchor, `${root} should map to transfers`).toBe('transfers');
    }
  });

  it('maps इदम् / अदस् → outliers section', () => {
    expect(getPronounAnchor({ category: 'pronoun', root: 'इदम्' })?.anchor).toBe('outliers');
    expect(getPronounAnchor({ category: 'pronoun', root: 'अदस्' })?.anchor).toBe('outliers');
  });

  it('returns null for non-pronoun categories', () => {
    expect(getPronounAnchor({ category: 'noun',     root: 'भीष्म' })).toBeNull();
    expect(getPronounAnchor({ category: 'verb',     root: '√भू' })).toBeNull();
    expect(getPronounAnchor({ category: 'particle', root: 'च' })).toBeNull();
  });

  it('returns null for an unmapped pronoun root (we cover only roots that appear in the corpus)', () => {
    expect(getPronounAnchor({ category: 'pronoun', root: 'अदृष्ट' })).toBeNull();
  });

  it('returns null when the parsing is missing or malformed', () => {
    expect(getPronounAnchor(null)).toBeNull();
    expect(getPronounAnchor()).toBeNull();
    expect(getPronounAnchor({ category: 'pronoun' })).toBeNull(); // no root
  });
});

describe('PRONOUN_SECTION_IDS', () => {
  it('includes every anchor referenced by PRONOUN_ANCHORS', () => {
    // All known anchors used in the mapping. If we add a new pronoun in
    // pronouns.js the SECTION_IDS list must include its anchor.
    for (const id of ['personal', 'tad', 'transfers', 'outliers', 'reflexives', 'correlatives']) {
      expect(PRONOUN_SECTION_IDS, `expected "${id}" in PRONOUN_SECTION_IDS`).toContain(id);
    }
  });
});
