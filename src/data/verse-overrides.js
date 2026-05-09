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
//
// Future chapters land here the same way as agents work through them.

import { CH1_VERSE_OVERRIDES } from './_ch1_overrides.js';

export const VERSE_OVERRIDES = {
  ...CH1_VERSE_OVERRIDES,
};
