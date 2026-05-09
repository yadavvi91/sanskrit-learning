// Hand-decoded क्रिया overrides for verses where the autoDecode engine
// either missed the finite verb (engine failure — needed help) or where
// the verse genuinely has no overt finite verb (nominal sentence with
// implied अस्ति — NOT an engine failure, just the way the verse is).
//
// Used by hydrate.js:
//   - Array value → fills verse.finiteVerbs (overrides autoDecode output)
//   - null value  → marks verse.noFiniteVerb = true so the audit UI
//                   doesn't flag it as needing क्रिया audit
//
// Coverage status:
//   - _finite_overrides_part1.js: 49 verses (loaded — 34 null, 15 with verbs)
//   - _finite_overrides_part2.js: 49 verses (loaded — 26 null, 23 with verbs)
//   - _finite_overrides_part3.js: 48 verses (loaded — 31 null, 17 with verbs)
// Total: 146 verses hand-classified. ~63% are genuinely nominal
// (descriptive lists, all-participles, vibhūti enumerations); ~37%
// are real engine misses caught here. After this lands, the audit-
// needed count drops from 146 to roughly zero.

import { FINITE_OVERRIDES_PART_1 } from './_finite_overrides_part1.js';
import { FINITE_OVERRIDES_PART_2 } from './_finite_overrides_part2.js';
import { FINITE_OVERRIDES_PART_3 } from './_finite_overrides_part3.js';
import { FINITE_OVERRIDES_PART_4 } from './_finite_overrides_part4.js';

export const FINITE_OVERRIDES = {
  ...FINITE_OVERRIDES_PART_1,
  ...FINITE_OVERRIDES_PART_2,
  ...FINITE_OVERRIDES_PART_3,
  ...FINITE_OVERRIDES_PART_4,
};
