// One-shot audit: enumerate every padaccheda word whose only available
// gloss is a generic suffix-inferred template ("a-stem instrumental
// plural — \"by/with X-s\"" etc.). These are words where the suffix
// pattern fired but the stem wasn't in the dictionary, so withStemGloss
// returned null and we ship the template. The user wants these surfaced
// and fixed by adding the stem to vocab.

import { describe, it } from 'vitest';
import { VERSES } from '../data/verses.js';
import { hydrateAutoStubVerses } from '../data/hydrate.js';
import { lookupSharedVocab } from '../data/sharedVocab.js';

hydrateAutoStubVerses();

// Phrases that betray a "stem lookup failed → showing template" gloss.
// Two flavours:
//   1. Abstract-X placeholder ("a-stem instrumental plural — \"by/with X-s\"")
//      — the user's original complaint. These are now nearly all replaced.
//   2. "stem not in dictionary" honest fallback — the gloss interpolates
//      the extracted stem text but admits no dictionary entry was found
//      (e.g., "instrumental plural of \"केवल\" — \"by/with केवल-s\"
//      (a-stem; stem not in dictionary)"). Still tracked so we can keep
//      adding stems to vocab.
const TEMPLATE_MARKERS = [
  'stem not in dictionary',
  // Abstract-X templates that haven't been switched to stem-interpolation yet.
  'absolutive — "having X-ed"',
  'infinitive — "to X"',
  'past-passive participle',
  'present active participle',
  'gerundive',
  'abstract -त्व suffix',
  'adverbial -वत्',
  'adverb of multiplicity',
  'pronominal adjective —',
  'indefinite pronoun',
  '-अन ending',
  'present 3sg —',
  'present 3pl —',
  'present 1sg —',
  'present 2sg —',
  'present ātmanepada',
  'future 3sg',
  'future 3pl',
  'future 2sg',
  'future 1sg',
  'future ātmanepada',
  'imperfect 3sg',
  'imperfect 3pl',
  'optative 3sg',
  'optative 3pl',
  'optative 1pl',
  'optative 3du',
  'imperative 3pl',
  'imperative ātmanepada',
  'vocative (compound) — "O X!"',
];

function isTemplate(gloss) {
  if (!gloss) return false;
  return TEMPLATE_MARKERS.some((m) => gloss.includes(m));
}

describe('template-gloss audit', () => {
  it('lists every padaccheda word whose gloss is a generic suffix-inference template', () => {
    const misses = new Map(); // word -> { stem, refs, gloss }
    let totalSlots = 0;
    for (const v of VERSES) {
      const pad = v.padaccheda;
      if (!pad || pad.length === 0) continue;
      for (const w of pad) {
        totalSlots++;
        // Verse-level parsing always wins; skip if hand-decoded.
        if (v.wordParsings?.[w]) continue;
        const sh = lookupSharedVocab(w);
        if (!sh) continue;
        // Only flag suffix-inferred results.
        if (sh.source !== 'suffix-inferred') continue;
        if (!isTemplate(sh.gloss)) continue;
        if (!misses.has(w)) misses.set(w, { stem: sh.root || '', gloss: sh.gloss, refs: new Set() });
        misses.get(w).refs.add(`${v.chapter}.${v.verse}`);
      }
    }

    // Aggregate by stem: count how many distinct surface forms share each stem.
    const byStem = new Map();
    for (const [w, info] of misses) {
      if (!info.stem) continue;
      if (!byStem.has(info.stem)) byStem.set(info.stem, new Set());
      byStem.get(info.stem).add(w);
    }

    const sortedWords = [...misses.entries()].sort((a, b) => b[1].refs.size - a[1].refs.size || a[0].localeCompare(b[0]));
    const sortedStems = [...byStem.entries()].sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]));

    console.log('\n===TEMPLATE_GLOSS_AUDIT_START===');
    console.log(`TOTAL_SLOTS=${totalSlots}`);
    console.log(`UNIQUE_WORDS_ON_TEMPLATE=${misses.size}`);
    console.log(`TOTAL_OCCURRENCES=${[...misses.values()].reduce((a, x) => a + x.refs.size, 0)}`);
    console.log(`UNIQUE_STEMS=${byStem.size}`);
    console.log('');
    console.log('--- TOP STEMS (stem\tforms\tsample_form ---');
    for (const [stem, set] of sortedStems.slice(0, 80)) {
      const sample = [...set].slice(0, 3).join(', ');
      console.log(`${stem}\t${set.size}\t${sample}`);
    }
    console.log('');
    console.log('--- WORDS (word\toccurrences\tstem\tsample_verse) ---');
    for (const [w, info] of sortedWords) {
      console.log(`${w}\t${info.refs.size}\t${info.stem}\t${[...info.refs][0]}`);
    }
    console.log('--- ALL STEMS (full list, alphabetical) ---');
    for (const [stem, set] of [...byStem.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      console.log(`STEM\t${stem}\t${set.size}`);
    }
    console.log('===TEMPLATE_GLOSS_AUDIT_END===\n');
  });
});
