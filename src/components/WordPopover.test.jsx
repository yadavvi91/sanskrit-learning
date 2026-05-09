// UI tests for WordPopover. The chip toggles a popover with parsed
// grammar fields. Cover open/close, outside-click, Escape, finite-verb
// styling, fields rendering for each grammar facet.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WordPopover from './WordPopover.jsx';

afterEach(() => cleanup());

// WordPopover now uses useNavigate (for the paradigm link), so every
// render needs a router. Wrap helper:
function renderInRouter(ui, initialEntries = ['/journey/2/4']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
  );
}

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
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    const chip = container.querySelector('.pada');
    expect(chip).toBeDefined();
    expect(chip.textContent).toBe('ईश्वरः');
  });

  it('chip carries has-parsing class when parsing is provided', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    expect(container.querySelector('.pada').className).toMatch(/has-parsing/);
  });

  it('chip has no has-parsing class when parsing is null', () => {
    const { container } = renderInRouter(<WordPopover word="अज्ञातम्" parsing={null} />);
    expect(container.querySelector('.pada').className).not.toMatch(/has-parsing/);
  });

  it('isFinite=true adds is-finite class', () => {
    const { container } = renderInRouter(<WordPopover word="भवति" parsing={VERB_PARSING} isFinite />);
    expect(container.querySelector('.pada').className).toMatch(/is-finite/);
  });

  it('the chip is initially closed (no popover dialog)', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    expect(container.querySelector('.word-popover')).toBeNull();
  });
});

describe('WordPopover — open / close', () => {
  it('clicking the chip opens the popover and sets aria-expanded=true', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    const chip = container.querySelector('.pada');
    fireEvent.click(chip);
    expect(container.querySelector('.word-popover')).toBeDefined();
    expect(chip.getAttribute('aria-expanded')).toBe('true');
    expect(chip.className).toMatch(/is-open/);
  });

  it('clicking the chip again closes the popover', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    const chip = container.querySelector('.pada');
    fireEvent.click(chip);
    fireEvent.click(chip);
    expect(container.querySelector('.word-popover')).toBeNull();
    expect(chip.getAttribute('aria-expanded')).toBe('false');
  });

  it('Escape closes an open popover', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    const chip = container.querySelector('.pada');
    fireEvent.click(chip);
    expect(container.querySelector('.word-popover')).not.toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(container.querySelector('.word-popover')).toBeNull();
  });

  it('mousedown outside the wrapper closes the popover', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.word-popover')).not.toBeNull();
    fireEvent.mouseDown(document.body);
    expect(container.querySelector('.word-popover')).toBeNull();
  });

  it('with parsing=null and no shared-dict entry, clicking opens an EmptyPopover (not a silent no-op)', () => {
    // Use a deliberately unknown sequence so sharedVocab fallback also misses.
    const { container } = renderInRouter(<WordPopover word="ज़क़ह़ज़" parsing={null} />);
    const chip = container.querySelector('.pada');
    fireEvent.click(chip);
    const popover = container.querySelector('.word-popover');
    expect(popover).not.toBeNull();
    expect(popover.className).toContain('word-popover-empty');
    expect(popover.textContent).toContain('no grammar data yet');
  });

  it('with parsing=null but the word IS in sharedVocab, clicking opens a regular popover (dict fallback)', () => {
    // 'कृष्ण' is seeded in sharedVocab as a known vocative noun.
    const { container } = renderInRouter(<WordPopover word="कृष्ण" parsing={null} />);
    fireEvent.click(container.querySelector('.pada'));
    const popover = container.querySelector('.word-popover');
    expect(popover).not.toBeNull();
    expect(popover.className).not.toContain('word-popover-empty');
    // The dict-fallback path tags its source.
    expect(popover.textContent).toContain('dict');
  });
});

describe('WordPopover — popover content', () => {
  it('renders gloss in the wp-gloss line', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-gloss').textContent).toContain('lord');
  });

  it('renders the human-readable विभक्ति label for case=pra', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.word-popover').textContent).toMatch(/प्रथमा/);
  });

  it('renders the human-readable वचन label for number=eka', () => {
    const { container } = renderInRouter(<WordPopover word="ईश्वरः" parsing={NOUN_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.word-popover').textContent).toMatch(/एकवचन/);
  });

  it('renders verb-specific fields (root, गण, पद, लकार, पुरुष)', () => {
    const { container } = renderInRouter(<WordPopover word="करोति" parsing={VERB_PARSING} />);
    fireEvent.click(container.querySelector('.pada'));
    const text = container.querySelector('.word-popover').textContent;
    expect(text).toContain('√कृ');         // root
    expect(text).toMatch(/गण/);             // gana label
    expect(text).toMatch(/परस्मैपद/);     // pada P → परस्मैपद
    expect(text).toMatch(/लट्/);            // lakara=lat → लट् (present)
    expect(text).toMatch(/प्रथम/);          // purusha
  });

  it('shows the category label "अव्यय (particle)" for category=particle', () => {
    const { container } = renderInRouter(
      <WordPopover word="हि" parsing={{ category: 'particle', gloss: 'indeed' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-category').textContent).toMatch(/अव्यय/);
  });

  it('renders parsing.note when present', () => {
    const { container } = renderInRouter(
      <WordPopover word="ईश्वरः" parsing={{ ...NOUN_PARSING, note: 'a note about the form' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-note').textContent).toBe('a note about the form');
  });
});

describe('WordPopover — paradigm link (popover → Atlas/Declensions)', () => {
  it('shows "follows देव-class" link for भीष्मम् (m. -अ noun)', () => {
    const { container } = renderInRouter(
      <WordPopover word="भीष्मम्" parsing={{ category: 'noun', root: 'भीष्म', gender: 'm', number: 'eka', case: 'dvi', gloss: 'Bhīṣma' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    const link = container.querySelector('.wp-paradigm-link');
    expect(link).toBeDefined();
    expect(link.textContent).toMatch(/देव/);
    expect(link.textContent).toMatch(/24 forms/);
  });

  it('shows "follows आत्मन्-class" link for आत्मना (m. -न् noun)', () => {
    const { container } = renderInRouter(
      <WordPopover word="आत्मना" parsing={{ category: 'noun', root: 'आत्मन्', gender: 'm', number: 'eka', case: 'tri', gloss: 'by the self' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-paradigm-link').textContent).toMatch(/आत्मन्/);
  });

  it('shows "follows कर्मन्-class" link for कर्मणि (n. -न् noun)', () => {
    const { container } = renderInRouter(
      <WordPopover word="कर्मणि" parsing={{ category: 'noun', root: 'कर्मन्', gender: 'n', number: 'eka', case: 'sap', gloss: 'in action' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-paradigm-link').textContent).toMatch(/कर्मन्/);
  });

  it('shows सर्वनाम link for pronoun तान् → /atlas/pronouns#tad (the user-flagged gap)', () => {
    const { container } = renderInRouter(
      <WordPopover word="तान्" parsing={{ category: 'pronoun', root: 'तद्', gender: 'm', number: 'bahu', case: 'dvi', gloss: 'them' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    const links = container.querySelectorAll('.wp-paradigm-link');
    expect(links.length).toBe(1);
    expect(links[0].textContent).toMatch(/सर्वनाम/);
    expect(links[0].textContent).toMatch(/तद्-template/);
  });

  it('shows सर्वनाम link for अहम् → personal section', () => {
    const { container } = renderInRouter(
      <WordPopover word="अहम्" parsing={{ category: 'pronoun', root: 'अस्मद्', gender: '-', number: 'eka', case: 'pra', gloss: 'I' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    const link = container.querySelector('.wp-paradigm-link');
    expect(link).toBeDefined();
    expect(link.textContent).toMatch(/personal/);
  });

  it('shows सर्वनाम link for यः (relative) → transfers section', () => {
    const { container } = renderInRouter(
      <WordPopover word="यः" parsing={{ category: 'pronoun', root: 'यद्', gender: 'm', number: 'eka', case: 'pra', gloss: 'who' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-paradigm-link').textContent).toMatch(/transfer/);
  });

  it('shows सर्वनाम link for एनम् → tad section', () => {
    const { container } = renderInRouter(
      <WordPopover word="एनम्" parsing={{ category: 'pronoun', root: 'एनद्', gender: 'm', number: 'eka', case: 'dvi', gloss: 'this one' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-paradigm-link').textContent).toMatch(/तद्-template/);
  });

  it('shows ONLY the noun-paradigm link for nouns (does not double-render a pronoun link)', () => {
    const { container } = renderInRouter(
      <WordPopover word="भीष्मम्" parsing={{ category: 'noun', root: 'भीष्म', gender: 'm', number: 'eka', case: 'dvi', gloss: 'Bhīṣma' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    const links = container.querySelectorAll('.wp-paradigm-link');
    expect(links.length).toBe(1);
    expect(links[0].textContent).toMatch(/देव/);
  });

  it('does NOT show paradigm link for verbs', () => {
    const { container } = renderInRouter(
      <WordPopover word="भवति" parsing={{ category: 'verb', root: '√भू', gana: 1, lakara: 'lat' }} isFinite />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-paradigm-link')).toBeNull();
  });

  it('does NOT show paradigm link for particles', () => {
    const { container } = renderInRouter(
      <WordPopover word="हि" parsing={{ category: 'particle', gloss: 'indeed' }} />
    );
    fireEvent.click(container.querySelector('.pada'));
    expect(container.querySelector('.wp-paradigm-link')).toBeNull();
  });
});
