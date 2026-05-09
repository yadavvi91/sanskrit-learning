// Vocabulary builder — auto-grow "Words I've Met" from the decoded corpus.
// Mirrors the auto-projection style of buildSamasaBank (samasa.js) and
// tallyParticles (avyaya.js): walk every verse's padaccheda + wordParsings,
// flatten into a vocabulary list with frequency, occurrences, and parsing.
//
// Fallback layering: when a verse doesn't carry per-word parsing for a
// given पद, the builder reaches into SHARED_VOCAB (a hand-curated
// dictionary of common Sanskrit words). Browse-tier verses gain meaningful
// entries via the dictionary; fully-decoded verses' own wordParsings still
// take precedence.

import { VERSES } from '../data/verses.js';
import { lookupSharedVocab } from '../data/sharedVocab.js';

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
        // Verse-local parsing wins; fall back to the shared dictionary
        // for browse-tier verses that don't carry their own wordParsings.
        const parsing = verse.wordParsings?.[word] ?? lookupSharedVocab(word) ?? null;
        map.set(key, {
          word: key,
          count: 1,
          firstMet: { ...ref, decodeIndex: verse.decodeIndex },
          occurrences: [ref],
          category: parsing?.category ?? null,
          root: parsing?.root ?? null,
          gloss: parsing?.gloss ?? null,
          parsing,
          fromSharedDict: !verse.wordParsings?.[word] && !!parsing,
        });
      } else {
        const e = map.get(key);
        e.count++;
        e.occurrences.push(ref);
        // Update firstMet if this verse decodes earlier
        if (verse.decodeIndex < e.firstMet.decodeIndex) {
          e.firstMet = { ...ref, decodeIndex: verse.decodeIndex };
        }
        // Upgrade: if verse has a richer parsing than what we have, take it.
        // Verse-local parsings beat shared-dict parsings.
        const verseLocal = verse.wordParsings?.[word];
        if (verseLocal && (e.fromSharedDict || !e.parsing)) {
          e.parsing = verseLocal;
          e.category = verseLocal.category;
          e.root = verseLocal.root;
          e.gloss = verseLocal.gloss;
          e.fromSharedDict = false;
        } else if (!e.parsing) {
          // Try the shared dict as a last resort
          const shared = lookupSharedVocab(word);
          if (shared) {
            e.parsing = shared;
            e.category = shared.category;
            e.root = shared.root;
            e.gloss = shared.gloss;
            e.fromSharedDict = true;
          }
        }
      }
    }
  }

  // Filter out agent-tagged sandhi-residue fragments — words with no
  // parsing AND no shared-dict gloss are engine artifacts (the agents
  // explicitly marked these as null in VOCAB_EXTENDED). They'd otherwise
  // clutter the Words page as misleading "— no gloss yet —" entries
  // that can never be glossed because they aren't standalone words.
  return [...map.values()].filter((e) => e.gloss || e.category || e.parsing);
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
