// Per-chapter hand-decoded verse overrides, composed into a single
// VERSE_OVERRIDES map keyed by `${chapter}.${verse}`. The hydrator
// merges each entry into the corresponding auto-stub verse, filling
// any missing fields. Existing fields on a verse (set in verses.js)
// are NEVER overwritten — so an in-place fix in verses.js takes
// priority over a batch chapter override.
//
// Coverage as it grows:
//   - _ch1_overrides.js: 38 entries — Ch 1's remaining verses (the
//     9 already in verses.js inline are: 1.1, 1.2, 1.3, 1.4, 1.5,
//     1.11, 1.13, 1.22, 1.32).
//   - _ch2_overrides.js: 60 entries — all of साङ्ख्ययोग except the
//     13 hand-decoded inline (2.3, 2.4, 2.5, 2.13, 2.14, 2.18, 2.22,
//     2.23, 2.47, 2.48, 2.50, 2.62, 2.63).
//
// Future chapters land here the same way as agents work through them.

import { CH1_VERSE_OVERRIDES } from './_ch1_overrides.js';
import { CH2_VERSE_OVERRIDES } from './_ch2_overrides.js';

export const VERSE_OVERRIDES = {
  ...CH1_VERSE_OVERRIDES,
  ...CH2_VERSE_OVERRIDES,
};
