// UI tests for WordPopover. The chip toggles a popover with parsed
// grammar fields. Cover open/close, outside-click, Escape, finite-verb
// styling, fields rendering for each grammar facet.

import { describe, it, expect, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import WordPopover from './WordPopover.jsx';

afterEach(() => cleanup());

const NOUN_PARSING = {
  category: 'noun',
  gloss: 'lord, master',
  case: 'pra',
  number: 'eka',
  gender: 'm',
};

const VERB_PARSING = {
  category: 'verb',
  gloss: 'do, make',
  root: '√कृ',
  gana: 8,
  pada: 'P',
  lakara: 'lat',
  purusha: 'prathama',
  number: 'eka',
};

describe('WordPopover — render states', () => {
  it('renders the chip with the given word', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    const chip = container.querySelector('.pada');
    expect(chip).toBeDefined();
    expect(chip.textContent).toBe('ईश्वरः');
  });

  it('chip carries has-parsing class when parsing is provided', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    expect(container.querySelector('.pada').className).toMatch(/has-parsing/);
  });

  it('chip has no has-parsing class when parsing is null', () => {
    const { container } = render(<WordPopover word="अज्ञातम्" parsing={null} />);
    expect(container.querySelector('.pada').className).not.toMatch(/has-parsing/);
  });

  it('isFinite=true adds is-finite class', () => {
    const { container } = render(<WordPopover word="भवति" parsing={VERB_PARSING} isFinite />);
    expect(container.querySelector('.pada').className).toMatch(/is-finite/);
  });

  it('the chip is initially closed (no popover dialog)', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    expect(container.querySelector('.word-popover')).toBeNull();
  });
});

describe('WordPopover — open / close', () => {
  it('clicking the chip opens the popover and sets aria-expanded=true', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    const chip = container.querySelector('.pada');
    fireEvent.click(chip);
    expect(container.querySelector('.word-popover')).toBeDefined();
    expect(chip.getAttribute('aria-expanded')).toBe('true');
    expect(chip.className).toMatch(/is-open/);
  });

  it('clicking the chip again closes the popover', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    const chip = container.querySelector('.pada');
    fireEvent.click(chip);
    fireEvent.click(chip);
    expect(container.querySelector('.word-popover')).toBeNull();
    expect(chip.getAttribute('aria-expanded')).toBe('false');
  });

  it('Escape closes an open popover', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    const chip = container.querySelector('.pada');
    fireEvent.click(chip);
    expect(container.querySelector('.word-popover')).not.toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(container.querySelector('.word-popover')).toBeNull();
  });

  it('mousedown outside the wrapper closes the popover', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.word-popover')).not.toBeNull();
    fireEvent.mouseDown(document.body);
    expect(container.querySelector('.word-popover')).toBeNull();
  });

  it('with parsing=null, clicking opens but the popover dialog is suppressed', () => {
    const { container } = render(<WordPopover word="अज्ञातम्" parsing={null} />);
    const chip = container.querySelector('.pada');
    fireEvent.click(chip);
    // open=true but {parsing} is falsy → <Popover /> not rendered.
    expect(container.querySelector('.word-popover')).toBeNull();
  });
});

describe('WordPopover — popover content', () => {
  it('renders gloss in the wp-gloss line', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-gloss').textContent).toContain('lord');
  });

  it('renders the human-readable विभक्ति label for case=pra', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.word-popover').textContent).toMatch(/प्रथमा/);
  });

  it('renders the human-readable वचन label for number=eka', () => {
    const { container } = render(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.word-popover').textContent).toMatch(/एकवचन/);
  });

  it('renders verb-specific fields (root, गण, पद, लकार, पुरुष)', () => {
    const { container } = render(<WordPopover word="करोति" parsing={VERB_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    const text = container.querySelector('.word-popover').textContent;
    expect(text).toContain('√कृ');         // root
    expect(text).toMatch(/गण/);             // gana label
    expect(text).toMatch(/परस्मैपद/);     // pada P → परस्मैपद
    expect(text).toMatch(/लट्/);            // lakara=lat → लट् (present)
    expect(text).toMatch(/प्रथम/);          // purusha
  });

  it('shows the category label "अव्यय (particle)" for category=particle', () => {
    const { container } = render(
      <WordPopover word="हि" parsing={{ category: 'particle', gloss: 'indeed' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-category').textContent).toMatch(/अव्यय/);
  });

  it('renders parsing.note when present', () => {
    const { container } = render(
      <WordPopover word="ईश्वरः" parsing={{ ...NOUN_PARSING, note: 'a note about the form' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-note').textContent).toBe('a note about the form');
  });
});
