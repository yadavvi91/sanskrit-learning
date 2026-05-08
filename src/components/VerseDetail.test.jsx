// Regression tests for VerseDetail. The motivating bug was Gītā 2.4:
// padaccheda contains the pedagogically-hyphenated "प्रति-योत्स्यामि" but
// finiteVerbs[0].form is "प्रतियोत्स्यामि" (no hyphen). The chip's
// is-finite class was lost because the comparison was string-equality.
// Fix: hyphen-insensitive comparison.

import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import VerseDetail from './VerseDetail.jsx';
import { getVerse, VERSES } from '../data/verses.js';

afterEach(() => cleanup());

describe('VerseDetail — finite-verb chip highlighting', () => {
  it('Gītā 2.4 — प्रति-योत्स्यामि (hyphenated padaccheda) gets is-finite', () => {
    const verse = getVerse(2, 4);
    expect(verse).toBeDefined();
    // Sanity: the data is shaped the way the bug report describes.
    expect(verse.padaccheda).toContain('प्रति-योत्स्यामि');
    expect(verse.finiteVerbs[0].form).toBe('प्रतियोत्स्यामि'); // no hyphen

    const { container } = render(<VerseDetail verse={verse} />);
    // Find the chip whose textContent is the hyphenated form.
    const chips = Array.from(container.querySelectorAll('.padaccheda .pada'));
    const verbChip = chips.find((c) => c.textContent === 'प्रति-योत्स्यामि');
    expect(verbChip, 'expected the प्रति-योत्स्यामि chip to render').toBeDefined();
    expect(verbChip.className).toMatch(/is-finite/);
  });

  it('Gītā 1.1 — अकुर्वत (no hyphen) still gets is-finite', () => {
    // Sanity test for the non-hyphen path — make sure the new logic
    // didn't break the simple case.
    const verse = getVerse(1, 1);
    const { container } = render(<VerseDetail verse={verse} />);
    const chips = Array.from(container.querySelectorAll('.padaccheda .pada'));
    const verbChip = chips.find((c) => c.textContent === 'अकुर्वत');
    expect(verbChip).toBeDefined();
    expect(verbChip.className).toMatch(/is-finite/);
    // And किम् is NOT finite (it's an interrogative particle).
    const kim = chips.find((c) => c.textContent === 'किम्');
    expect(kim).toBeDefined();
    expect(kim.className).not.toMatch(/is-finite/);
  });

  it('non-verb chips do not get is-finite', () => {
    const verse = getVerse(2, 4);
    const { container } = render(<VerseDetail verse={verse} />);
    const chips = Array.from(container.querySelectorAll('.padaccheda .pada'));
    // पूजार्हौ is an adjective, not a finite verb.
    const adjChip = chips.find((c) => c.textContent === 'पूजार्हौ');
    expect(adjChip).toBeDefined();
    expect(adjChip.className).not.toMatch(/is-finite/);
  });

  it('every padaccheda word matching a finiteVerb form (hyphen-insensitive) is highlighted', () => {
    // Walk every decoded verse: the chip text equals the padaccheda entry,
    // and a chip is_finite iff its hyphen-stripped form matches some
    // finiteVerb's hyphen-stripped form. This catches regressions where
    // a future verse adds a similar prefix-hyphen + finite-verb pairing.
    const stripHyphens = (s) => s.replace(/-/g, '');

    let checked = 0;
    for (const verse of VERSES) {
      const finiteSet = new Set((verse.finiteVerbs || []).map((v) => stripHyphens(v.form)));
      const { container } = render(<VerseDetail verse={verse} />);
      const chips = Array.from(container.querySelectorAll('.padaccheda .pada'));

      for (let i = 0; i < verse.padaccheda.length; i++) {
        const word = verse.padaccheda[i];
        const expected = finiteSet.has(stripHyphens(word));
        const chip = chips[i]; // 1-to-1 with padaccheda order
        const got = /is-finite/.test(chip.className);
        expect(got, `verse ${verse.chapter}.${verse.verse} word "${word}": expected is-finite=${expected}, got ${got}`)
          .toBe(expected);
        checked++;
      }

      cleanup();
    }
    expect(checked).toBeGreaterThan(0);
  });
});
