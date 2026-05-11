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

  it('samasNotes are derived from hyphenated padaccheda when not explicitly set', () => {
    // 2.43 has hyphenated compounds in padaccheda (काम-आत्मानः, etc.)
    // but no explicit samasNotes block in the override. The hydrator
    // should auto-derive a structural samasNotes list so the UI shows
    // a समास section below पदच्छेद on auto-stub verses.
    const v = find(2, 43);
    expect(v.tier).toBe('auto-stub');
    expect(Array.isArray(v.samasNotes)).toBe(true);
    expect(v.samasNotes.length).toBeGreaterThan(0);
    const kamatma = v.samasNotes.find((s) => s.compound === 'काम-आत्मानः');
    expect(kamatma).toBeDefined();
    expect(kamatma.vigraha).toBe('काम + आत्मानः');
    expect(kamatma.source).toBe('derived-from-padaccheda');
  });

  it('samasNotes pick up type + gloss from vibhaktiNotes (samāsa-vigraha, not just sandhi-split)', () => {
    // 2.46's vibhakti note tags सम्प्लुतोदके as a बहुव्रीहि with the
    // gloss "(in that) whose-water-is-flooded-(everywhere)". The
    // padaccheda has the hyphenated form `सम्प्लुत-उदके` — prefix
    // matching against the parsed vibhakti compound enriches the
    // derived samasNotes entry with type + gloss.
    const v = find(2, 46);
    expect(Array.isArray(v.samasNotes)).toBe(true);
    const samp = v.samasNotes.find((s) => s.compound === 'सम्प्लुत-उदके');
    expect(samp).toBeDefined();
    expect(samp.type).toBe('बहुव्रीहि');
    expect(samp.gloss.length).toBeGreaterThan(0);
    expect(samp.source).toBe('derived-from-vibhakti');
  });

  it('2.24 surfaces stacked predicate adjectives (अच्छेद्यः, अदाह्यः, नित्यः, …)', () => {
    const v = find(2, 24);
    expect(v.noFiniteVerb).toBe(true);
    expect(Array.isArray(v.predicatePPPs)).toBe(true);
    const forms = v.predicatePPPs.map((p) => p.form);
    expect(forms).toContain('अच्छेद्यः');
    expect(forms).toContain('नित्यः');
    expect(forms).toContain('स्थाणुः');
    expect(v.predicatePPPs.length).toBeGreaterThanOrEqual(8);
  });

  it('2.20 surfaces predicate adjectives EVEN WITH finite verbs present', () => {
    const v = find(2, 20);
    expect(v.finiteVerbs.length).toBeGreaterThan(0); // has जायते, म्रियते, …
    expect(Array.isArray(v.predicatePPPs)).toBe(true);
    const forms = v.predicatePPPs.map((p) => p.form);
    expect(forms).toContain('अजः');
    expect(forms).toContain('नित्यः');
    expect(forms).toContain('शाश्वतः');
    expect(forms).toContain('पुराणः');
  });

  it('1.33 surfaces predicate-PPPs (काङ्क्षितम्, अवस्थिताः) instead of generic "implied अस्ति"', () => {
    const v = find(1, 33);
    expect(v.noFiniteVerb).toBe(true);
    expect(Array.isArray(v.predicatePPPs)).toBe(true);
    expect(v.predicatePPPs.length).toBeGreaterThanOrEqual(2);
    const forms = v.predicatePPPs.map((p) => p.form);
    expect(forms).toContain('काङ्क्षितम्');
    expect(forms).toContain('अवस्थिताः');
    // Each PPP should carry the gloss extracted from its vibhakti note.
    const kanksh = v.predicatePPPs.find((p) => p.form === 'काङ्क्षितम्');
    expect(kanksh.gloss.length).toBeGreaterThan(0);
  });

  it('hand-decoded samasNotes (Gītā 2.5) are NOT overwritten by derivation', () => {
    const v = find(2, 5);
    expect(Array.isArray(v.samasNotes)).toBe(true);
    expect(v.samasNotes.length).toBeGreaterThan(0);
    // The 2.5 hand-decoded entries have a real type (बहुव्रीहि /
    // तत्पुरुष) — derivation would have left it empty.
    expect(v.samasNotes.some((s) => s.type && s.type.length > 0)).toBe(true);
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

  it('auto-stub verses in covered ranges get a Śaṅkara commentary card', () => {
    // Gītā 7.5 is auto-stub and inside the ch 7–12 range covered by
    // _shankara_part2.js. After hydration its references.commentaries
    // should have one entry from Śaṅkara (Advaita Vedānta).
    const v = find(7, 5);
    expect(v.tier).toBe('auto-stub');
    const shankara = v.references?.commentaries?.find((c) => c.sage === 'Śaṅkara');
    expect(shankara).toBeDefined();
    expect(shankara.school).toBe('Advaita Vedānta');
    expect(typeof shankara.summary).toBe('string');
    expect(shankara.summary.length).toBeGreaterThan(10);
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

  it('every auto-stub verse has a Śaṅkara commentary card after hydration', () => {
    const missing = VERSES.filter((v) => {
      if (v.tier !== 'auto-stub') return false;
      const cs = v.references?.commentaries || [];
      return !cs.some((c) => c.sage === 'Śaṅkara');
    });
    expect(missing.length, `verses missing Śaṅkara: ${missing.slice(0, 5).map(v => `${v.chapter}.${v.verse}`).join(', ')}`).toBe(0);
  });
});

describe('hydrate — dhātu enrichment passes (gitaOccurrences + futureStem)', () => {
  it('back-populates gitaOccurrences on dhātus from the corpus (the user-flagged "9 → 80" fix)', async () => {
    const { DHATUS_EXTENDED } = await import('./dhatus-extended.js');
    const inGita = DHATUS_EXTENDED.filter((d) => (d.gitaOccurrences || []).length > 0);
    // Was 9 before the back-fill (only the original hand-curated 25 had any).
    // Now should be ~80 (every dhātu whose root appears in any verse's
    // finiteVerbs after the corpus-wide hydration). Pin a strict floor so
    // accidental regressions are caught.
    expect(inGita.length).toBeGreaterThanOrEqual(70);
  });

  it('top dhātus (विद्, अस्, भू, इ, दृश्) have a meaningful Gītā-occurrence count', async () => {
    const { DHATUS_EXTENDED } = await import('./dhatus-extended.js');
    const find = (deva) => DHATUS_EXTENDED.find((d) => d.devanagari === deva);
    expect((find('विद्')?.gitaOccurrences || []).length).toBeGreaterThan(20);
    expect((find('अस्')?.gitaOccurrences || []).length).toBeGreaterThan(20);
    expect((find('भू')?.gitaOccurrences || []).length).toBeGreaterThan(15);
    expect((find('दृश्')?.gitaOccurrences || []).length).toBeGreaterThan(15);
  });

  it('futureStem fill produces लृट् conjugations on bulk-extended dhātus', async () => {
    const { conjugate } = await import('../utils/conjugator.js');
    const { DHATUS_EXTENDED } = await import('./dhatus-extended.js');
    const withFuture = DHATUS_EXTENDED.filter((d) => d.futureStem);
    // 25 hand-curated + ~54 from the agent batch = ~79 (was 25 pre-fill).
    expect(withFuture.length).toBeGreaterThanOrEqual(70);
    // Spot-check a known agent-filled dhātu — √नी (gana 1, anit, futureStem नेष्य).
    const ni = DHATUS_EXTENDED.find((d) => d.devanagari === 'नी');
    expect(ni?.futureStem).toBe('नेष्य');
    expect(conjugate(ni, 'lrt', 'P', 'prathama', 'eka')).toMatch(/नेष्य/);
  });
});
