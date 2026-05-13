import { describe, it, expect } from 'vitest';
import { getReferenceLink } from './referenceLinks.js';

describe('getReferenceLink — verb category carries cell coordinates', () => {
  it('अकुर्वत (√कृ लङ् A प्रथम बहु) → /verbs/कृ with full search params', () => {
    const link = getReferenceLink({
      category: 'verb',
      root: '√कृ',
      gana: 8,
      pada: 'A',
      lakara: 'lan',
      purusha: 'prathama',
      number: 'bahu',
    });
    expect(link.url).toBe('/verbs/कृ?lakara=lan&pada=A&purusha=prathama&vachana=bahu');
  });

  it('omits pada when उभयपदी ambiguity is implied (parsing pada=U) — Verbs page picks the default', () => {
    const link = getReferenceLink({
      category: 'verb',
      root: '√कृ',
      pada: 'U',
      lakara: 'lat',
      purusha: 'prathama',
      number: 'eka',
    });
    expect(link.url).toBe('/verbs/कृ?lakara=lat&purusha=prathama&vachana=eka');
  });

  it('falls back to bare /verbs/<root> when parsing has no cell coordinates', () => {
    const link = getReferenceLink({
      category: 'verb',
      root: '√भू',
    });
    expect(link.url).toBe('/verbs/भू');
  });
});
