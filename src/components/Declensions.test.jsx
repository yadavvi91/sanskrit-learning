// UI tests for the Declensions tab. Covers chip switching, paradigm
// table rendering (all 24 cells), corpus example verse-ref clicks.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render as rtlRender, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Declensions from './Declensions.jsx';
import { DECLENSIONS } from '../data/declensions.js';

afterEach(() => cleanup());

// Declensions now reads `useLocation().hash` to deep-link from the
// WordPopover paradigm link; every render needs a router.
function render(ui, { hash = '' } = {}) {
  return rtlRender(
    <MemoryRouter initialEntries={[`/atlas/declensions${hash}`]}>{ui}</MemoryRouter>
  );
}

describe('Declensions — initial render', () => {
  it('mounts with the शब्दरूपावलिः title', () => {
    render(<Declensions />);
    expect(screen.getByText(/शब्दरूपावलिः/)).toBeDefined();
  });

  it('renders one chip per paradigm', () => {
    const { container } = render(<Declensions />);
    const chips = container.querySelectorAll('.declension-chip');
    expect(chips.length).toBe(DECLENSIONS.length);
  });

  it('defaults to देव paradigm active', () => {
    const { container } = render(<Declensions />);
    const active = container.querySelector('.declension-chip.is-active');
    expect(active).toBeDefined();
    expect(active.textContent).toContain('देव');
  });

  it('renders the 24-form table for the active paradigm', () => {
    const { container } = render(<Declensions />);
    // 8 vibhakti rows × 3 vachana columns = 24 form cells.
    const formCells = container.querySelectorAll('.form-cell');
    expect(formCells.length).toBe(24);
  });

  it('the active paradigm renders all expected forms (देव default)', () => {
    const { container } = render(<Declensions />);
    const text = container.textContent;
    // Spot-check several देव forms
    for (const expected of ['देवः', 'देवम्', 'देवेन', 'देवाय', 'देवात्', 'देवस्य', 'देवे', 'देवानाम्']) {
      expect(text, `expected "${expected}" in देव paradigm`).toContain(expected);
    }
  });
});

describe('Declensions — switching paradigms', () => {
  it('clicking the सीता chip activates that paradigm and renders its table', () => {
    const { container } = render(<Declensions />);
    const sitaChip = Array.from(container.querySelectorAll('.declension-chip'))
      .find((c) => c.textContent.includes('सीता'));
    expect(sitaChip).toBeDefined();
    fireEvent.click(sitaChip);

    expect(sitaChip.className).toMatch(/is-active/);
    // The table now contains सीता forms.
    const text = container.textContent;
    expect(text).toContain('सीता');
    expect(text).toContain('सीताम्');
    expect(text).toContain('सीतायै');
  });

  it('clicking आत्मन् chip surfaces all four cases needed for Gītā 6.5', () => {
    const { container } = render(<Declensions />);
    const atmanChip = Array.from(container.querySelectorAll('.declension-chip'))
      .find((c) => c.textContent.includes('आत्मन्'));
    expect(atmanChip).toBeDefined();
    fireEvent.click(atmanChip);

    const text = container.textContent;
    // The four cases from 6.5 — आत्मना (तृतीया), आत्मानम् (द्वितीया), आत्मा (प्रथमा), आत्मनः (षष्ठी)
    expect(text).toContain('आत्मा');
    expect(text).toContain('आत्मानम्');
    expect(text).toContain('आत्मना');
    expect(text).toContain('आत्मनः');
  });

  it('switching paradigms keeps exactly one active at a time', () => {
    const { container } = render(<Declensions />);
    const phalaChip = Array.from(container.querySelectorAll('.declension-chip'))
      .find((c) => c.textContent.includes('फल'));
    fireEvent.click(phalaChip);

    const activeChips = container.querySelectorAll('.declension-chip.is-active');
    expect(activeChips.length).toBe(1);
    expect(activeChips[0]).toBe(phalaChip);
  });
});

describe('Declensions — corpus examples', () => {
  it('renders the corpus-example list for the active paradigm', () => {
    const { container } = render(<Declensions />);
    // देव default — should have at least 5 corpus examples.
    const examples = container.querySelectorAll('.declension-example');
    expect(examples.length).toBeGreaterThanOrEqual(5);
  });

  it('clicking a verse-ref on a corpus example calls onOpenVerse', () => {
    const onOpenVerse = vi.fn();
    const { container } = render(<Declensions onOpenVerse={onOpenVerse} />);

    const refButton = container.querySelector('.example-ref-link');
    expect(refButton).toBeDefined();
    fireEvent.click(refButton);
    expect(onOpenVerse).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
  });

  it('without onOpenVerse, refs render as static spans (not clickable)', () => {
    const { container } = render(<Declensions />);
    // Without the prop, refs are .example-ref but NOT .example-ref-link
    const links = container.querySelectorAll('.example-ref-link');
    expect(links.length).toBe(0);
    const refs = container.querySelectorAll('.example-ref');
    expect(refs.length).toBeGreaterThan(0);
  });

  it('every corpus example reference points to a verse that the user can actually open', () => {
    const { container } = render(<Declensions />);
    // The example-ref text matches "Gītā c.v ↗" pattern
    const refs = Array.from(container.querySelectorAll('.example-ref'));
    for (const r of refs) {
      expect(r.textContent).toMatch(/^Gītā \d+\.\d+/);
    }
  });
});

describe('Declensions — bridges to user knowledge', () => {
  it('the देव paradigm description references SSC and starts with देव', () => {
    const { container } = render(<Declensions />);
    const desc = container.querySelector('.declension-description');
    expect(desc.textContent).toMatch(/SSC|देव|राम/i);
  });

  it('the देव paradigm pedagogy note explicitly mentions भीष्मम्', () => {
    // The user identified भीष्मम् as the trigger; the page must close the loop.
    const { container } = render(<Declensions />);
    const note = container.querySelector('.declension-pedagogy');
    expect(note?.textContent).toContain('भीष्मम्');
  });
});

describe('Declensions — URL hash deep-links to a specific paradigm', () => {
  // Used by WordPopover: clicking "follows आत्मन्-class" navigates to
  // /atlas/declensions#atman, which should land with the आत्मन्
  // paradigm already active (no extra click needed).

  it('mounts with #atman → आत्मन् paradigm active', () => {
    const { container } = render(<Declensions />, { hash: '#atman' });
    const active = container.querySelector('.declension-chip.is-active');
    expect(active.textContent).toContain('आत्मन्');
    // Table shows आत्मा (the strong-stem nom.sg.)
    expect(container.textContent).toContain('आत्मा');
  });

  it('mounts with #karman → कर्मन् paradigm active', () => {
    const { container } = render(<Declensions />, { hash: '#karman' });
    const active = container.querySelector('.declension-chip.is-active');
    expect(active.textContent).toContain('कर्मन्');
    expect(container.textContent).toContain('कर्मणि');
  });

  it('mounts with #manas → मनस् paradigm active', () => {
    const { container } = render(<Declensions />, { hash: '#manas' });
    const active = container.querySelector('.declension-chip.is-active');
    expect(active.textContent).toContain('मनस्');
  });

  it('mounts with #mati → मति paradigm active', () => {
    const { container } = render(<Declensions />, { hash: '#mati' });
    const active = container.querySelector('.declension-chip.is-active');
    expect(active.textContent).toContain('मति');
  });

  it('falls back to देव when the hash is unknown', () => {
    const { container } = render(<Declensions />, { hash: '#nonsense' });
    const active = container.querySelector('.declension-chip.is-active');
    expect(active.textContent).toContain('देव');
  });

  it('falls back to देव when there is no hash', () => {
    const { container } = render(<Declensions />, { hash: '' });
    const active = container.querySelector('.declension-chip.is-active');
    expect(active.textContent).toContain('देव');
  });

  it('clicking a different chip overrides the hash-derived selection', () => {
    const { container } = render(<Declensions />, { hash: '#atman' });
    expect(container.querySelector('.declension-chip.is-active').textContent).toContain('आत्मन्');

    const sitaChip = Array.from(container.querySelectorAll('.declension-chip'))
      .find((c) => c.textContent.includes('सीता'));
    fireEvent.click(sitaChip);
    expect(container.querySelector('.declension-chip.is-active').textContent).toContain('सीता');
  });
});
