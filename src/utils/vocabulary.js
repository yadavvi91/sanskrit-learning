// Vocabulary builder — auto-grow "Words I've Met" from the decoded corpus.
// Mirrors the auto-projection style of buildSamasaBank (samasa.js) and
// tallyParticles (avyaya.js): walk every verse's padaccheda + wordParsings,
// flatten into a vocabulary list with frequency, occurrences, and parsing.

import { VERSES } from '../data/verses.js';

// Returns: array of vocabulary entries, sorted alphabetically by default.
//   [{ word, count, firstMet, occurrences[], category, root, gloss, ... }, ...]
//
// "occurrences" is the list of {chapter, verse} where the word appears.
// "firstMet" is the {chapter, verse} of the verse with smallest decodeIndex
//   that contains the word.
export function buildVocabulary() {
  const map = new Map(); // word → entry

  for (const verse of VERSES) {
    const ref = { chapter: verse.chapter, verse: verse.verse };
    const seenInThisVerse = new Set();
    for (const word of verse.padaccheda || []) {
      const key = word;
      if (seenInThisVerse.has(key)) {
        // count once per verse for "occurrences"; but keep total count
        const e = map.get(key);
        if (e) e.count++;
        continue;
      }
      seenInThisVerse.add(key);

      if (!map.has(key)) {
        const parsing = verse.wordParsings?.[word] ?? null;
        map.set(key, {
          word: key,
          count: 1,
          firstMet: { ...ref, decodeIndex: verse.decodeIndex },
          occurrences: [ref],
          category: parsing?.category ?? null,
          root: parsing?.root ?? null,
          gloss: parsing?.gloss ?? null,
          parsing,
        });
      } else {
        const e = map.get(key);
        e.count++;
        e.occurrences.push(ref);
        // Update firstMet if this verse decodes earlier
        if (verse.decodeIndex < e.firstMet.decodeIndex) {
          e.firstMet = { ...ref, decodeIndex: verse.decodeIndex };
        }
        // Fill in parsing if we previously had none
        if (!e.parsing && verse.wordParsings?.[word]) {
          e.parsing = verse.wordParsings[word];
          e.category = e.parsing.category;
          e.root = e.parsing.root;
          e.gloss = e.parsing.gloss;
        }
      }
    }
  }

  return [...map.values()];
}

// Comparators keyed by sort-column.
export const VOCAB_COMPARATORS = {
  word: (a, b) => a.word.localeCompare(b.word, 'en'),
  count: (a, b) => b.count - a.count || a.word.localeCompare(b.word, 'en'),
  firstMet: (a, b) => {
    const va = a.firstMet, vb = b.firstMet;
    return va.chapter - vb.chapter || va.verse - vb.verse;
  },
  category: (a, b) => {
    const ca = a.category ?? 'zzz', cb = b.category ?? 'zzz';
    return ca.localeCompare(cb, 'en') || a.word.localeCompare(b.word, 'en');
  },
};

// Returns category counts for the filter chips.
export function vocabularyCategoryCounts(vocab) {
  const counts = {};
  for (const v of vocab) {
    const k = v.category ?? 'unknown';
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return counts;
}
