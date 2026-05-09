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
import { ARNOLD_TRANSLATIONS } from './translations-arnold.js';
import { HINDI_TRANSLATIONS } from './translations-hindi.js';
import { INTERP_NOTES } from './interpretive.js';
import { SHANKARA_SUMMARIES } from './commentaries-shankara.js';
import { FINITE_OVERRIDES } from './finite-overrides.js';

let done = false;

export function hydrateAutoStubVerses() {
  if (done) return;
  done = true;

  for (const v of VERSES) {
    if (v.tier !== 'auto-stub') continue;
    const key = `${v.chapter}.${v.verse}`;

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

    // Hand-decoded finite-verb overrides:
    //   - null      → mark verse.noFiniteVerb = true (nominal sentence)
    //   - [items]   → replace v.finiteVerbs with the curated entries
    //                 (used both to fill empties AND to correct engine
    //                 mis-classifications, e.g., the future-stem regex
    //                 firing on the denominative नमस्यन्ति in 11.36)
    const override = FINITE_OVERRIDES[key];
    if (override === null) {
      // null = "this verse has no finite verb, period". Clears any
      // engine false-positive (निर्योगक्षेम wrongly matching विधिलिङ्
      // -एम) and marks the verse as nominal-by-design.
      v.finiteVerbs = [];
      v.noFiniteVerb = true;
    } else if (Array.isArray(override) && override.length > 0) {
      v.finiteVerbs = override;
    }

    if (!v.english) {
      const t = BESANT_TRANSLATIONS[key];
      if (t) v.english = t;
    }

    if (!v.hindi) {
      const t = HINDI_TRANSLATIONS[key];
      if (t) v.hindi = t;
    }

    const arnold = ARNOLD_TRANSLATIONS[key];
    if (arnold) {
      if (!v.references) v.references = { translations: [], commentaries: [] };
      if (!Array.isArray(v.references.translations)) v.references.translations = [];
      const already = v.references.translations.some((t) => t.translator === 'Edwin Arnold');
      if (!already) {
        v.references.translations.push({
          translator: 'Edwin Arnold',
          year: 1885,
          license: 'public-domain',
          work: 'The Song Celestial',
          text: arnold,
        });
      }
    }

    const shankara = SHANKARA_SUMMARIES[key];
    if (shankara) {
      if (!v.references) v.references = { translations: [], commentaries: [] };
      if (!Array.isArray(v.references.commentaries)) v.references.commentaries = [];
      const already = v.references.commentaries.some((c) => c.sage === 'Śaṅkara');
      if (!already) {
        v.references.commentaries.push({
          sage: 'Śaṅkara',
          school: 'Advaita Vedānta',
          summary: shankara,
        });
      }
    }

    const interp = INTERP_NOTES[key];
    if (interp) {
      if (interp.anvaya && !v.anvaya) v.anvaya = interp.anvaya;
      if (Array.isArray(interp.vibhaktiNotes) && (!v.vibhaktiNotes || v.vibhaktiNotes.length === 0)) {
        v.vibhaktiNotes = interp.vibhaktiNotes;
      }
      if (Array.isArray(interp.keyFights) && (!v.keyFights || v.keyFights.length === 0)) {
        v.keyFights = interp.keyFights;
      }
      if (Array.isArray(interp.vyakhya) && (!v.vyakhya || v.vyakhya.length === 0)) {
        v.vyakhya = interp.vyakhya;
      }
    }
  }

  // Second pass: fill MISSING fields on full / browse-tier verses too.
  // Hand-decoded verses keep all their curated content (gated on
  // `!v.<field>` so the override never overwrites). This catches cases
  // like 18.66 (browse-tier hand-decoded with rich anvaya/vyakhya but
  // no vibhaktiNotes/keyFights — interp data fills the gap).
  for (const v of VERSES) {
    if (v.tier === 'auto-stub') continue;
    const key = `${v.chapter}.${v.verse}`;
    const interp = INTERP_NOTES[key];
    if (!interp) continue;
    if (interp.anvaya && !v.anvaya) v.anvaya = interp.anvaya;
    if (Array.isArray(interp.vibhaktiNotes) && (!v.vibhaktiNotes || v.vibhaktiNotes.length === 0)) {
      v.vibhaktiNotes = interp.vibhaktiNotes;
    }
    if (Array.isArray(interp.keyFights) && (!v.keyFights || v.keyFights.length === 0)) {
      v.keyFights = interp.keyFights;
    }
    if (Array.isArray(interp.vyakhya) && (!v.vyakhya || v.vyakhya.length === 0)) {
      v.vyakhya = interp.vyakhya;
    }
  }
}
