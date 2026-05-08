// UI tests for the Pronouns Atlas tab. Two layers:
//   1. Sections render with the right id attributes (so the deep-link
//      from WordPopover lands at the right place).
//   2. Mounting with a hash like /atlas/pronouns#tad scrolls the user
//      to that section.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render as rtlRender, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pronouns from './Pronouns.jsx';
import { PRONOUN_SECTION_IDS } from '../data/pronouns.js';

afterEach(() => cleanup());

function render(ui, { hash = '' } = {}) {
  return rtlRender(
    <MemoryRouter initialEntries={[`/atlas/pronouns${hash}`]}>{ui}</MemoryRouter>
  );
}

describe('Pronouns — section anchors', () => {
  it('renders an element with id="personal" (अस्मद्/युष्मद् section)', () => {
    const { container } = render(<Pronouns />);
    expect(container.querySelector('#personal')).toBeDefined();
  });

  it('renders an element with id="tad" (तद्-template section — where तान् is documented)', () => {
    const { container } = render(<Pronouns />);
    expect(container.querySelector('#tad')).toBeDefined();
  });

  it('renders an element with id="transfers" (six derived pronouns)', () => {
    const { container } = render(<Pronouns />);
    expect(container.querySelector('#transfers')).toBeDefined();
  });

  it('renders an element with id="outliers" (इदम्/अदस्)', () => {
    const { container } = render(<Pronouns />);
    expect(container.querySelector('#outliers')).toBeDefined();
  });

  it('renders an element with id="correlatives"', () => {
    const { container } = render(<Pronouns />);
    expect(container.querySelector('#correlatives')).toBeDefined();
  });

  it('renders an element with id="reflexives"', () => {
    const { container } = render(<Pronouns />);
    expect(container.querySelector('#reflexives')).toBeDefined();
  });

  it('every PRONOUN_SECTION_IDS entry has a matching DOM id', () => {
    const { container } = render(<Pronouns />);
    for (const id of PRONOUN_SECTION_IDS) {
      expect(container.querySelector(`#${id}`), `expected #${id} in DOM`).not.toBeNull();
    }
  });
});

describe('Pronouns — hash-aware scroll', () => {
  it('mounting with #tad calls scrollIntoView on the tad section', () => {
    // Spy on Element.prototype.scrollIntoView since jsdom doesn't implement it.
    const spy = vi.fn();
    Element.prototype.scrollIntoView = spy;
    // Use a synchronous rAF stub so the effect's scroll fires inside the test.
    const origRaf = global.requestAnimationFrame;
    global.requestAnimationFrame = (cb) => { cb(); return 0; };

    render(<Pronouns />, { hash: '#tad' });

    expect(spy).toHaveBeenCalled();
    global.requestAnimationFrame = origRaf;
  });

  it('mounting with no hash does not call scrollIntoView', () => {
    const spy = vi.fn();
    Element.prototype.scrollIntoView = spy;
    const origRaf = global.requestAnimationFrame;
    global.requestAnimationFrame = (cb) => { cb(); return 0; };

    render(<Pronouns />, { hash: '' });

    expect(spy).not.toHaveBeenCalled();
    global.requestAnimationFrame = origRaf;
  });

  it('mounting with an unknown hash does not call scrollIntoView', () => {
    const spy = vi.fn();
    Element.prototype.scrollIntoView = spy;
    const origRaf = global.requestAnimationFrame;
    global.requestAnimationFrame = (cb) => { cb(); return 0; };

    render(<Pronouns />, { hash: '#nonsense' });

    expect(spy).not.toHaveBeenCalled();
    global.requestAnimationFrame = origRaf;
  });
});
