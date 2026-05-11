// Śaṅkara (Advaita Vedānta) commentary position summaries for auto-stub
// verses — assembled from per-range part files. Used by hydrate.js to fill
// references.commentaries with one Śaṅkara card per verse.
//
// Part-file shape (each `_shankara_partN.js` exports a SHANKARA_PART_N object
// keyed by `${chapter}.${verse}` → string summary):
//
//   export const SHANKARA_PART_1 = {
//     '1.1': "धर्मक्षेत्रे and कुरुक्षेत्रे frame the action as both a moral and …",
//     // ...
//   };
//
// Coverage status:
//   - _shankara_part1.js: chapters 1–6   (loaded — 280 entries)
//   - _shankara_part2.js: chapters 7–12  (loaded — 209 entries)
//   - _shankara_part3.js: chapters 13–18 (loaded — 212 entries)
// Total: 701 verses covered.
//
// All entries are PARAPHRASE-quality summaries — NOT direct quotations from
// Śaṅkara's Gītā-bhāṣya. The disclaimer "Summary based on the well-known
// {sage}-tradition reading; not a direct quotation" is rendered by
// VerseDetail.jsx for every commentary card. Audit and tighten over time.

import { SHANKARA_PART_1 } from './_shankara_part1.js';
import { SHANKARA_PART_2 } from './_shankara_part2.js';
import { SHANKARA_PART_3 } from './_shankara_part3.js';

export const SHANKARA_SUMMARIES = {
  ...SHANKARA_PART_1,
  ...SHANKARA_PART_2,
  ...SHANKARA_PART_3,
};
