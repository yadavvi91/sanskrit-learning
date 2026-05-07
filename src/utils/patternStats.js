// Pattern statistics — flatten PATTERN_CATEGORIES into a single ranked list
// with first-met and also-seen-count per pattern. Mirrors the auto-grow style
// of buildSamasaBank (src/data/samasa.js) and tallyParticles (src/data/avyaya.js).
//
// Today the data only carries `trigger.verse` (single first-met). The optional
// `trigger.alsoIn` array is supported for future growth — when verses start
// carrying back-references, those land in alsoIn without changing this code.

import { PATTERN_CATEGORIES } from '../data/patterns.js';

export function flattenPatterns() {
  const flat = [];
  for (const cat of PATTERN_CATEGORIES) {
    for (const p of cat.patterns) {
      flat.push({
        ...p,
        categoryId: cat.id,
        categoryTitle: cat.title,
      });
    }
  }
  return flat;
}

// Per-pattern statistics: first-met verse, also-seen verses, total count.
export function patternStats(pattern) {
  const firstMet = pattern.trigger?.verse ?? null;
  const alsoIn = Array.isArray(pattern.trigger?.alsoIn)
    ? pattern.trigger.alsoIn.filter((v) => v !== firstMet)
    : [];
  const total = (firstMet ? 1 : 0) + alsoIn.length;
  return { firstMet, alsoIn, total };
}

// Sort comparators keyed by column id. Each returns a comparator (a, b) → number.
export const COMPARATORS = {
  name: (a, b) => a.name.localeCompare(b.name, 'en'),
  category: (a, b) => a.categoryTitle.localeCompare(b.categoryTitle, 'en') || a.name.localeCompare(b.name, 'en'),
  firstMet: (a, b) => {
    const va = patternStats(a).firstMet;
    const vb = patternStats(b).firstMet;
    if (va === vb) return a.name.localeCompare(b.name, 'en');
    if (va == null) return 1;
    if (vb == null) return -1;
    return verseCompare(va, vb);
  },
  alsoSeen: (a, b) => {
    const ta = patternStats(a).total;
    const tb = patternStats(b).total;
    return tb - ta || a.name.localeCompare(b.name, 'en');
  },
};

// "1.1" < "1.2" < "2.3" < "2.4" — split on '.', numeric compare per segment.
function verseCompare(a, b) {
  const [ac, av] = a.split('.').map(Number);
  const [bc, bv] = b.split('.').map(Number);
  return ac - bc || av - bv;
}

// Public sorted helper.
export function sortedPatterns(column = 'category', direction = 'asc') {
  const arr = [...flattenPatterns()];
  const cmp = COMPARATORS[column] ?? COMPARATORS.category;
  arr.sort(cmp);
  if (direction === 'desc') arr.reverse();
  return arr;
}
