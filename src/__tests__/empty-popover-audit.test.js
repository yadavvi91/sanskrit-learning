// Regression: every padaccheda word in every verse must have *something*
// to show in WordPopover. This mirrors WordPopover.jsx's fallback chain
// exactly (verse.wordParsings → lookupSharedVocab → decomposeCompound).
// If anything falls through, EmptyPopover would render the "no grammar
// data" dead-end — which the user explicitly flagged as annoying. We
// keep that count at zero by extending coreVocab/sharedVocab/suffix
// inference whenever a new verse adds an uncovered surface form.

import { describe, it, expect } from 'vitest';
import { VERSES } from '../data/verses.js';
import { hydrateAutoStubVerses } from '../data/hydrate.js';
import { lookupSharedVocab } from '../data/sharedVocab.js';

hydrateAutoStubVerses();

function decomposeCompound(word) {
  if (!word.includes('-')) return null;
  const parts = word.split('-').filter(Boolean);
  if (parts.length < 2) return null;
  const components = parts.map((p) => ({ form: p, parsing: lookupSharedVocab(p) }));
  if (!components.some((c) => c.parsing)) return null;
  return { components };
}

describe('empty-popover audit', () => {
  it('every padaccheda word resolves to either parsing, dictionary, or compound decomposition', () => {
    const misses = new Map();
    for (const v of VERSES) {
      const pad = v.padaccheda;
      if (!pad || pad.length === 0) continue;
      for (const w of pad) {
        if (v.wordParsings?.[w]) continue;
        if (lookupSharedVocab(w)) continue;
        if (decomposeCompound(w)) continue;
        if (!misses.has(w)) misses.set(w, new Set());
        misses.get(w).add(`${v.chapter}.${v.verse}`);
      }
    }

    if (misses.size > 0) {
      const lines = [...misses.entries()].map(([w, refs]) => `  ${w}  (${refs.size}× — ${[...refs].slice(0, 3).join(', ')})`);
      throw new Error(
        `${misses.size} padaccheda word(s) would land on <EmptyPopover/>. ` +
        `Add coverage in src/data/_vocab_extended_part9.js, src/data/coreVocab.js, ` +
        `or src/data/sharedVocab.js (inferFromSuffix).\n\n` + lines.join('\n')
      );
    }
    expect(misses.size).toBe(0);
  });
});
