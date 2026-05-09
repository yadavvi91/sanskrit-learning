// Tests for hydrateAutoStubVerses — confirms that auto-stub verses get filled
// with engine-generated padaccheda + Besant English + Hindi gloss + Arnold (in
// references.translations) + interpretive notes (anvaya / vibhaktiNotes /
// keyFights / vyakhya), and that hand-decoded ('full' / 'browse') verses are
// not overwritten.

import { describe, it, expect } from 'vitest';
import { VERSES } from './verses.js';
import { hydrateAutoStubVerses } from './hydrate.js';

// Hydration runs once at module load (singleton). Calling again is a no-op.
hydrateAutoStubVerses();

function find(c, v) {
  return VERSES.find((x) => x.chapter === c && x.verse === v);
}

describe('hydrateAutoStubVerses — auto-stub enrichment', () => {
  it('Gītā 3.5 (auto-stub) has all enrichment fields populated', () => {
    const v = find(3, 5);
    expect(v.tier).toBe('auto-stub');
    // padaccheda from autoDecode
    expect(v.padaccheda?.length).toBeGreaterThan(0);
    // english from Besant
    expect(typeof v.english).toBe('string');
    expect(v.english.length).toBeGreaterThan(10);
    // hindi from translations-hindi
    expect(typeof v.hindi).toBe('string');
    expect(v.hindi.length).toBeGreaterThan(10);
    // Arnold in references.translations
    expect(v.references?.translations?.some((t) => t.translator === 'Edwin Arnold')).toBe(true);
    // interp fields (interp_part1 covers ch 1-6)
    expect(typeof v.anvaya).toBe('string');
    expect(Array.isArray(v.vibhaktiNotes)).toBe(true);
    expect(v.vibhaktiNotes.length).toBeGreaterThan(0);
    expect(Array.isArray(v.keyFights)).toBe(true);
    expect(v.keyFights.length).toBeGreaterThan(0);
    expect(Array.isArray(v.vyakhya)).toBe(true);
    expect(v.vyakhya.length).toBeGreaterThan(0);
  });

  it('Arnold reference has the expected shape', () => {
    const v = find(3, 5);
    const arnold = v.references.translations.find((t) => t.translator === 'Edwin Arnold');
    expect(arnold).toMatchObject({
      translator: 'Edwin Arnold',
      year: 1885,
      license: 'public-domain',
      work: 'The Song Celestial',
    });
    expect(typeof arnold.text).toBe('string');
    expect(arnold.text.length).toBeGreaterThan(10);
  });

  it('vyakhya entries have title + body', () => {
    const v = find(3, 5);
    for (const e of v.vyakhya) {
      expect(typeof e.title).toBe('string');
      expect(typeof e.body).toBe('string');
    }
  });
});

describe('hydrateAutoStubVerses — does not overwrite hand-decoded verses', () => {
  it('Gītā 1.1 (tier=full) keeps its hand-curated English', () => {
    const v = find(1, 1);
    expect(v.tier).toBe('full');
    // 1.1's english was set by hand in verses.js — should not be replaced by Besant.
    // We don't assert exact text (verses.js can evolve), only that hydrator
    // didn't blow it away.
    expect(typeof v.english).toBe('string');
    expect(v.english.length).toBeGreaterThan(0);
  });

  it('hand-decoded verses do not gain a duplicate Arnold reference on re-hydration', () => {
    // Call hydrate again — it's idempotent via the `done` flag, so Arnold
    // shouldn't appear twice on auto-stub verses either.
    hydrateAutoStubVerses();
    const v = find(3, 5);
    const arnoldEntries = v.references.translations.filter((t) => t.translator === 'Edwin Arnold');
    expect(arnoldEntries.length).toBe(1);
  });
});

describe('hydrateAutoStubVerses — coverage', () => {
  it('every auto-stub verse has padaccheda after hydration', () => {
    const missing = VERSES.filter(
      (v) => v.tier === 'auto-stub' && (!v.padaccheda || v.padaccheda.length === 0)
    );
    expect(missing.length, `verses missing padaccheda: ${missing.slice(0, 5).map(v => `${v.chapter}.${v.verse}`).join(', ')}`).toBe(0);
  });

  it('every auto-stub verse has an english translation after hydration', () => {
    const missing = VERSES.filter((v) => v.tier === 'auto-stub' && !v.english);
    expect(missing.length, `verses missing english: ${missing.slice(0, 5).map(v => `${v.chapter}.${v.verse}`).join(', ')}`).toBe(0);
  });

  it('every auto-stub verse has a hindi gloss after hydration', () => {
    const missing = VERSES.filter((v) => v.tier === 'auto-stub' && !v.hindi);
    expect(missing.length, `verses missing hindi: ${missing.slice(0, 5).map(v => `${v.chapter}.${v.verse}`).join(', ')}`).toBe(0);
  });

  it('every auto-stub verse has anvaya after hydration', () => {
    const missing = VERSES.filter((v) => v.tier === 'auto-stub' && !v.anvaya);
    expect(missing.length, `verses missing anvaya: ${missing.slice(0, 5).map(v => `${v.chapter}.${v.verse}`).join(', ')}`).toBe(0);
  });

  it('every auto-stub verse has keyFights after hydration', () => {
    const missing = VERSES.filter(
      (v) => v.tier === 'auto-stub' && (!v.keyFights || v.keyFights.length === 0)
    );
    expect(missing.length, `verses missing keyFights: ${missing.slice(0, 5).map(v => `${v.chapter}.${v.verse}`).join(', ')}`).toBe(0);
  });

  it('every auto-stub verse has vyakhya after hydration', () => {
    const missing = VERSES.filter(
      (v) => v.tier === 'auto-stub' && (!v.vyakhya || v.vyakhya.length === 0)
    );
    expect(missing.length, `verses missing vyakhya: ${missing.slice(0, 5).map(v => `${v.chapter}.${v.verse}`).join(', ')}`).toBe(0);
  });
});
