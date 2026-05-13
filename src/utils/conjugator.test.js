// Tests for the verb conjugation engine. The thematic-stem cases verify the rule
// engine; the irregular-root cases verify that overrides win over generation.

import { describe, it, expect } from 'vitest';
import { conjugate, conjugateGrid, decompose, decompose_reverse } from './conjugator.js';
import { DHATUS_TOP25, getDhatuById } from '../data/dhatus.js';

describe('conjugate — thematic regular roots (gana 1, P)', () => {
  const bhu = getDhatuById('bhu');

  it('√भू लट् P prathama eka → भवति', () => {
    expect(conjugate(bhu, 'lat', 'P', 'prathama', 'eka')).toBe('भवति');
  });

  it('√भू लट् P uttama eka → भवामि', () => {
    expect(conjugate(bhu, 'lat', 'P', 'uttama', 'eka')).toBe('भवामि');
  });

  it('√भू लट् P prathama bahu → भवन्ति', () => {
    expect(conjugate(bhu, 'lat', 'P', 'prathama', 'bahu')).toBe('भवन्ति');
  });

  it('√भू लङ् P prathama eka → अभवत् (augment + त्)', () => {
    expect(conjugate(bhu, 'lan', 'P', 'prathama', 'eka')).toBe('अभवत्');
  });

  it('√भू लङ् P uttama eka → अभवम्', () => {
    expect(conjugate(bhu, 'lan', 'P', 'uttama', 'eka')).toBe('अभवम्');
  });

  it('√भू लोट् P prathama eka → भवतु', () => {
    expect(conjugate(bhu, 'lot', 'P', 'prathama', 'eka')).toBe('भवतु');
  });

  it('√भू लोट् P prathama bahu → भवन्तु', () => {
    expect(conjugate(bhu, 'lot', 'P', 'prathama', 'bahu')).toBe('भवन्तु');
  });

  it('√भू विधिलिङ् P prathama eka → भवेत् (ए-marker absorbs inherent अ)', () => {
    expect(conjugate(bhu, 'vidhilin', 'P', 'prathama', 'eka')).toBe('भवेत्');
  });

  it('√भू विधिलिङ् P prathama bahu → भवेयुः', () => {
    expect(conjugate(bhu, 'vidhilin', 'P', 'prathama', 'bahu')).toBe('भवेयुः');
  });

  it('√भू लृट् P prathama eka → भविष्यति (uses futureStem)', () => {
    expect(conjugate(bhu, 'lrt', 'P', 'prathama', 'eka')).toBe('भविष्यति');
  });

  it('√भू लृट् P uttama eka → भविष्यामि', () => {
    expect(conjugate(bhu, 'lrt', 'P', 'uttama', 'eka')).toBe('भविष्यामि');
  });
});

describe('conjugate — suppletive present stems (gana 1)', () => {
  it('√गम् लट् P prathama eka → गच्छति (suppletive स्तेम गच्छ-)', () => {
    const gam = getDhatuById('gam');
    expect(conjugate(gam, 'lat', 'P', 'prathama', 'eka')).toBe('गच्छति');
  });

  it('√दृश् लट् P prathama eka → पश्यति (suppletive स्तेम पश्य-)', () => {
    const drsh = getDhatuById('drsh');
    expect(conjugate(drsh, 'lat', 'P', 'prathama', 'eka')).toBe('पश्यति');
  });

  it('√स्था लोट् मध्यम एक → तिष्ठ (bare stem, the basis of उत्तिष्ठ in Gītā 2.3)', () => {
    const stha = getDhatuById('stha');
    expect(conjugate(stha, 'lot', 'P', 'madhyama', 'eka')).toBe('तिष्ठ');
  });
});

describe('conjugate — overrides win over rule engine', () => {
  it('√कृ लट् P prathama eka → करोति (irregular athematic, overridden)', () => {
    const kr = getDhatuById('kr');
    expect(conjugate(kr, 'lat', 'P', 'prathama', 'eka')).toBe('करोति');
  });

  it('√कृ लङ् P प्रथम बहु → अकुर्वन् (irregular)', () => {
    const kr = getDhatuById('kr');
    expect(conjugate(kr, 'lan', 'P', 'prathama', 'bahu')).toBe('अकुर्वन्');
  });

  it('√कृ लङ् A प्रथम बहु → अकुर्वत (the Gītā 1.1 form — not the अकुर्वत that the thematic generator coincidentally produced for प्रथम एक)', () => {
    const kr = getDhatuById('kr');
    expect(conjugate(kr, 'lan', 'A', 'prathama', 'bahu')).toBe('अकुर्वत');
  });

  it('√कृ लङ् A प्रथम एक → अकुरुत (NOT अकुर्वत — that was the bug)', () => {
    const kr = getDhatuById('kr');
    expect(conjugate(kr, 'lan', 'A', 'prathama', 'eka')).toBe('अकुरुत');
  });

  it('√कृ लट् A full row matches Whitney/Kale', () => {
    const kr = getDhatuById('kr');
    expect(conjugateGrid(kr, 'lat', 'A')).toEqual({
      prathama: { eka: 'कुरुते',  dvi: 'कुर्वाते',  bahu: 'कुर्वते' },
      madhyama: { eka: 'कुरुषे',  dvi: 'कुर्वाथे',  bahu: 'कुरुध्वे' },
      uttama:   { eka: 'कुर्वे',   dvi: 'कुर्वहे',   bahu: 'कुर्महे' },
    });
  });

  it('√कृ लोट् A उत्तम row uses the strong stem करव-', () => {
    const kr = getDhatuById('kr');
    expect(conjugate(kr, 'lot', 'A', 'uttama', 'eka')).toBe('करवै');
    expect(conjugate(kr, 'lot', 'A', 'uttama', 'dvi')).toBe('करवावहै');
    expect(conjugate(kr, 'lot', 'A', 'uttama', 'bahu')).toBe('करवामहै');
  });

  it('√अस् लट् P prathama eka → अस्ति (irregular athematic)', () => {
    const as_ = getDhatuById('as');
    expect(conjugate(as_, 'lat', 'P', 'prathama', 'eka')).toBe('अस्ति');
  });

  it('√अस् लङ् P प्रथम एक → आसीत्', () => {
    const as_ = getDhatuById('as');
    expect(conjugate(as_, 'lan', 'P', 'prathama', 'eka')).toBe('आसीत्');
  });

  it('√अस् विधिलिङ् P प्रथम एक → स्यात्', () => {
    const as_ = getDhatuById('as');
    expect(conjugate(as_, 'vidhilin', 'P', 'prathama', 'eka')).toBe('स्यात्');
  });

  it('√भुज् विधिलिङ् A उत्तम एक → भुञ्जीय (the actual form in Gītā 2.5)', () => {
    const bhuj = getDhatuById('bhuj');
    expect(conjugate(bhuj, 'vidhilin', 'A', 'uttama', 'eka')).toBe('भुञ्जीय');
  });
});

describe('conjugateGrid — full 3×3 paradigm', () => {
  it('produces 9 cells per (lakara, pada)', () => {
    const bhu = getDhatuById('bhu');
    const grid = conjugateGrid(bhu, 'lat', 'P');
    const cells = Object.values(grid).flatMap((row) => Object.values(row));
    expect(cells).toHaveLength(9);
    expect(cells.every((c) => typeof c === 'string' && c.length > 0)).toBe(true);
  });

  it('√भू लट् full paradigm matches the canonical पाठशाला table', () => {
    const bhu = getDhatuById('bhu');
    const grid = conjugateGrid(bhu, 'lat', 'P');
    expect(grid).toEqual({
      prathama: { eka: 'भवति', dvi: 'भवतः', bahu: 'भवन्ति' },
      madhyama: { eka: 'भवसि', dvi: 'भवथः', bahu: 'भवथ' },
      uttama:   { eka: 'भवामि', dvi: 'भवावः', bahu: 'भवामः' },
    });
  });
});

describe('decompose — layered breakdown for "Why this form?"', () => {
  it('decomposes √भू लङ् प्रथम एक into augment + stem + ending', () => {
    const bhu = getDhatuById('bhu');
    const d = decompose(bhu, 'lan', 'P', 'prathama', 'eka');
    expect(d.augment).toBe('अ');
    expect(d.stem).toBe('भव');
    expect(d.ending).toBe('त्');
    expect(d.wasOverridden).toBe(false);
  });

  it('flags overrides — √कृ लट् प्रथम एक is irregular', () => {
    const kr = getDhatuById('kr');
    const d = decompose(kr, 'lat', 'P', 'prathama', 'eka');
    expect(d.wasOverridden).toBe(true);
  });
});

describe('decompose_reverse — Stack Builder reverse mode', () => {
  it('finds अकुर्वत as √कृ लङ् A प्रथम बहु — the Gītā 1.1 form', () => {
    const matches = decompose_reverse('अकुर्वत', DHATUS_TOP25);
    const m = matches.find((x) => x.dhatu.id === 'kr');
    expect(m).toBeDefined();
    expect(m.lakara).toBe('lan');
    expect(m.pada).toBe('A');
    expect(m.purusha).toBe('prathama');
    expect(m.vachana).toBe('bahu');
  });

  it('finds भवति as √भू लट् P प्रथम एक', () => {
    const matches = decompose_reverse('भवति', DHATUS_TOP25);
    const m = matches.find((x) => x.dhatu.id === 'bhu' && x.lakara === 'lat');
    expect(m).toBeDefined();
    expect(m.purusha).toBe('prathama');
    expect(m.vachana).toBe('eka');
  });

  it('returns empty for nonsense input', () => {
    const matches = decompose_reverse('xyz', DHATUS_TOP25);
    expect(matches).toEqual([]);
  });
});

describe('engine guard — athematic cells without override must return null, not garbage', () => {
  // Before this guard the thematic-stem generator produced wrong forms for
  // athematic roots (e.g., कृ लङ् A प्रथम एक → "अकुर्वत" instead of "अकुरुत",
  // putting the correct plural form in the singular cell). Verify that
  // unmodelled athematic cells now return null so the UI renders "—".
  it('√भुज् लट् P uttama eka has an override → returns it', () => {
    const bhuj = getDhatuById('bhuj');
    expect(conjugate(bhuj, 'lat', 'P', 'uttama', 'eka')).toBe('भुनज्मि');
  });

  it('√भुज् लृट् A always uses futureStem (thematic) → engine fills it without an override', () => {
    const bhuj = getDhatuById('bhuj');
    expect(conjugate(bhuj, 'lrt', 'A', 'prathama', 'eka')).toBe('भोक्ष्यते');
  });

  it('thematic गण १ roots still generate A cells from the engine — √लभ् लट् A प्रथम एक → लभते', () => {
    // Sanity check that the guard does not over-fire on thematic roots.
    const labh = getDhatuById('labh');
    expect(conjugate(labh, 'lat', 'A', 'prathama', 'eka')).toBe('लभते');
  });
});
