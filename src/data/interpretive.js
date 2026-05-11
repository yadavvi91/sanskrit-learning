// Interpretive grammar/structure notes for auto-stub verses — assembled from
// per-range part files. Used by hydrate.js to fill anvaya / vibhaktiNotes /
// keyFights / vyakhya on verses that don't already have them.
//
// Part-file shape (each `_interp_partN.js` exports an `INTERP_PART_N` object):
//
//   export const INTERP_PART_1 = {
//     '1.1': {
//       anvaya: "धृतराष्ट्रः उवाच — हे संजय, धर्मक्षेत्रे … किम् अकुर्वत?",
//       vibhaktiNotes: [ "धर्मक्षेत्रे — सप्तमी (locative): the location of the action.", ... ],
//       keyFights:     [ "समवेताः looks like a verb but is a participle …", ... ],
//       vyakhya:       [ { title: "Frame and finite anchor", body: "…" }, ... ]
//     },
//     // ...
//   };
//
// Coverage status:
//   - _interp_part1.js: chapters 1–6   (loaded — 280 entries)
//   - _interp_part2.js: chapters 7–12  (loaded — 209 entries)
//   - _interp_part3.js: chapters 13–18 (loaded — 212 entries)
// Total: 701 verses covered.
//
// All entries are paraphrase-quality and may be wrong. AUDIT before relying on
// them as canonical. The Decode Helper UI is the path to promote a verse from
// auto-stub → browse → full once content has been reviewed.

import { INTERP_PART_1 } from './_interp_part1.js';
import { INTERP_PART_2 } from './_interp_part2.js';
import { INTERP_PART_3 } from './_interp_part3.js';

export const INTERP_NOTES = {
  ...INTERP_PART_1,
  ...INTERP_PART_2,
  ...INTERP_PART_3,
};
