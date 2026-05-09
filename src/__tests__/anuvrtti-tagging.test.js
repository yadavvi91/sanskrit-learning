// Regression test: verses that have finiteVerbs: null AND mention
// verb-carry-over in their notes must populate the structured
// `anuvrtti` field — otherwise the UI falls through to a generic
// "implied अस्ति" message instead of the pedagogically-correct
// "the verb is supplied from Gītā X.Y: <verb>" message.
//
// This test was written after Gītā 1.8 slipped through: the agent
// wrote "predicate carries over from verse 1.7" into keyFights but
// never set anuvrtti on the verse, so the popover lied to the user.

import { describe, it, expect } from 'vitest';
import { CH1_VERSE_OVERRIDES } from '../data/_ch1_overrides.js';
import { CH2_VERSE_OVERRIDES } from '../data/_ch2_overrides.js';

const CARRY_OVER_PHRASES = [
  /carries over/i,
  /carry-over/i,
  /carry over/i,
  /\bgapped\b/i,
  /verb-chain continues/i,
  /finite verb (?:आह|उवाच|अब्रवीत्|दध्मौ|दध्मुः|ब्रवीमि|ज्ञापयामि)/i,
  /from verse \d+\.\d+/i,
  /from \d+\.\d+/i,
  /from the (?:conch-blowing|preceding|previous) (?:verse|stanza|chain)/i,
  /predicate (?:again )?(?:from|carrying)/i,
];

function containsCarryOverHint(text) {
  if (!text) return false;
  return CARRY_OVER_PHRASES.some((re) => re.test(text));
}

function collectNullFiniteVerses(map, chapterLabel) {
  const out = [];
  for (const [key, verse] of Object.entries(map)) {
    if (verse.finiteVerbs !== null) continue;
    out.push({ key, verse, chapterLabel });
  }
  return out;
}

describe('anuvrtti tagging — verses with verb-carry-over must set the structured field', () => {
  const allNullFinite = [
    ...collectNullFiniteVerses(CH1_VERSE_OVERRIDES, 'Ch1'),
    ...collectNullFiniteVerses(CH2_VERSE_OVERRIDES, 'Ch2'),
  ];

  it('has at least some null-finite-verb verses to check (sanity)', () => {
    expect(allNullFinite.length).toBeGreaterThan(0);
  });

  for (const { key, verse, chapterLabel } of allNullFinite) {
    it(`${chapterLabel} ${key}: notes mentioning carry-over must populate anuvrtti`, () => {
      const noteSources = [
        ...(verse.keyFights || []),
        ...(verse.vibhaktiNotes || []),
        ...(verse.sandhiNotes || []),
      ];
      const hintFound = noteSources.some(containsCarryOverHint);

      if (hintFound) {
        // If any note mentions carry-over, the structured field must
        // be populated — otherwise the UI falls back to "implied अस्ति"
        // and silently drops the pedagogical insight.
        expect(verse.anuvrtti, `${key}: keyFights/notes mention verb-carry-over but anuvrtti is not set`).toBeDefined();
        expect(verse.anuvrtti.from, `${key}: anuvrtti must have a 'from' verse reference`).toBeTruthy();
        expect(verse.anuvrtti.verb, `${key}: anuvrtti must name the carried verb`).toBeTruthy();
      }
    });
  }
});
