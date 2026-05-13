// Sanskrit verb conjugation engine.
// Pure function: (dhatu, lakara, pada, purusha, vachana) → form.
// Strategy:
//   1. If dhatu has an explicit override at forms[lakara][pada][purusha][vachana], use it.
//   2. Otherwise compose: prefix (augment for लङ्) + stem + ending.
// Stems:
//   - लट्/लङ्/लोट्/विधिलिङ् use dhatu.presentStem
//   - लृट् uses dhatu.futureStem
// The endings are pre-tuned for thematic stems (gana 1, 4, 6, 10).
// Athematic / suppletive / irregular roots fill in dhatu.forms[] tables.

import { ENDINGS, AUGMENT_LAN } from './endings.js';
import { stripUpasargas } from '../data/upasargas.js';

// गण १, ४, ६, १० are thematic — their present stems end in inherent अ and
// the single ENDINGS table concatenates cleanly. Every other गण is athematic:
// the paradigm depends on strong/weak stem-grade and class-specific sandhi
// at the seam, which the simple thematic engine cannot do. For athematic
// roots we require an explicit override; if none exists we return null so
// the UI shows "—" rather than a fabricated form. लृट् is the exception —
// its futureStem (root + -इष्य- / -स्य-) is thematic regardless of गण.
const THEMATIC_GANAS = new Set([1, 4, 6, 10]);

export function conjugate(dhatu, lakara, pada, purusha, vachana) {
  const override = dhatu?.forms?.[lakara]?.[pada]?.[purusha]?.[vachana];
  if (override) return override;

  const isAthematicLakara = lakara !== 'lrt' && !THEMATIC_GANAS.has(dhatu?.gana);
  if (isAthematicLakara) return null;

  let stem;
  if (lakara === 'lrt') {
    stem = dhatu?.futureStem;
  } else {
    stem = dhatu?.presentStem;
  }
  if (!stem) return null;

  const ending = ENDINGS[lakara]?.[pada]?.[purusha]?.[vachana];
  if (ending == null) return null;

  let prefix = '';
  if (lakara === 'lan') prefix = AUGMENT_LAN;

  return prefix + stem + ending;
}

// Generate the full 3×3 grid for one (lakara, pada).
export function conjugateGrid(dhatu, lakara, pada) {
  const grid = {};
  for (const purusha of ['prathama', 'madhyama', 'uttama']) {
    grid[purusha] = {};
    for (const vachana of ['eka', 'dvi', 'bahu']) {
      grid[purusha][vachana] = conjugate(dhatu, lakara, pada, purusha, vachana);
    }
  }
  return grid;
}

// Decompose a form's recipe (for "Why this form?" tooltips).
export function decompose(dhatu, lakara, pada, purusha, vachana) {
  const stem = lakara === 'lrt' ? dhatu?.futureStem : dhatu?.presentStem;
  const augment = lakara === 'lan' ? AUGMENT_LAN : '';
  const ending = ENDINGS[lakara]?.[pada]?.[purusha]?.[vachana] ?? '';
  const wasOverridden = !!dhatu?.forms?.[lakara]?.[pada]?.[purusha]?.[vachana];
  return { stem, augment, ending, wasOverridden };
}

// Reverse-mode helper: given a form, try to identify which dhatu + cell produced it.
// Used by Stack Builder reverse mode. Quadratic but fine at our scale.
// Also tries stripping उपसर्ग prefixes — so प्रतियोत्स्यामि decomposes to
// प्रति + √युध् + लृट् + P + उत्तम + एक.
export function decompose_reverse(form, dhatus) {
  // 1. Direct match (no upasarga)
  const direct = matchAgainstAllCells(form, dhatus, []);
  if (direct.length > 0) return direct;

  // 2. Try stripping upasargas (up to 2 stacked) and matching the residue
  const { stripped, prefixes } = stripUpasargas(form);
  if (prefixes.length > 0) {
    return matchAgainstAllCells(stripped, dhatus, prefixes);
  }

  return [];
}

function matchAgainstAllCells(form, dhatus, prefixes) {
  const matches = [];
  for (const dhatu of dhatus) {
    for (const lakara of Object.keys(ENDINGS)) {
      for (const pada of ['P', 'A']) {
        for (const purusha of ['prathama', 'madhyama', 'uttama']) {
          for (const vachana of ['eka', 'dvi', 'bahu']) {
            const generated = conjugate(dhatu, lakara, pada, purusha, vachana);
            if (generated === form) {
              matches.push({ dhatu, lakara, pada, purusha, vachana, prefixes });
            }
          }
        }
      }
    }
  }
  return matches;
}
