// One-time hydration of auto-stub verses with engine-generated padaccheda
// + finite-verb candidates. Runs autoDecode (which does sandhi-undo +
// dictionary lookups) over each tier='auto-stub' verse on app boot, so
// the user sees clickable word chips instead of a wall of mool text.
//
// Why a separate module: avoids the cycle if we put the import directly
// in verses.js (verses → decodeHelper → vocabulary → verses). Here we
// import both, but only call the function from App.jsx after all modules
// have fully loaded.

import { VERSES } from './verses.js';
import { autoDecode } from '../utils/decodeHelper.js';
import { BESANT_TRANSLATIONS } from './translations-besant.js';

let done = false;

export function hydrateAutoStubVerses() {
  if (done) return;
  done = true;

  for (const v of VERSES) {
    if (v.tier !== 'auto-stub') continue;

    if (!v.padaccheda || v.padaccheda.length === 0) {
      try {
        const stub = autoDecode((v.mool || []).join(' '));
        if (stub) {
          v.padaccheda = stub.padaccheda;
          if (!v.finiteVerbs || v.finiteVerbs.length === 0) {
            v.finiteVerbs = stub.finiteVerbs;
          }
        }
      } catch {
        // Skip — the verse just renders without padaccheda.
      }
    }

    if (!v.english) {
      const t = BESANT_TRANSLATIONS[`${v.chapter}.${v.verse}`];
      if (t) v.english = t;
    }
  }
}
