// Hindi gloss — assembled from per-range parts.
// Used by hydrate.js to fill verse.hindi on auto-stub verses.
// Modern accessible Hindi prose, paraphrase-quality. Audit and tighten.
//
// Part coverage:
//   - _hindi_part1.js: chapters 1–6   (pending)
//   - _hindi_part2.js: chapters 7–12  (loaded)
//   - _hindi_part3.js: chapters 13–18 (loaded)

import { HINDI_PART_2 } from './_hindi_part2.js';
import { HINDI_PART_3 } from './_hindi_part3.js';

export const HINDI_TRANSLATIONS = {
  ...HINDI_PART_2,
  ...HINDI_PART_3,
};
