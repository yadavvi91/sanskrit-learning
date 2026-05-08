// Edwin Arnold "The Song Celestial" 1885 (PD) — assembled from per-range parts.
// Used by hydrate.js to fill references.translations on auto-stub verses.
// Parts are added incrementally as the parallel agent batch completes.
//
// Part coverage:
//   - _arnold_part1.js: chapters 1–6   (loaded)
//   - _arnold_part2.js: chapters 7–12  (loaded)
//   - _arnold_part3.js: chapters 13–18 (loaded)
//
// Most entries are flagged // PARAPHRASE inline — Arnold's exact 1885 wording
// is not reliably recalled. Audit and tighten over time.

import { ARNOLD_PART_1 } from './_arnold_part1.js';
import { ARNOLD_PART_2 } from './_arnold_part2.js';
import { ARNOLD_PART_3 } from './_arnold_part3.js';

export const ARNOLD_TRANSLATIONS = {
  ...ARNOLD_PART_1,
  ...ARNOLD_PART_2,
  ...ARNOLD_PART_3,
};
