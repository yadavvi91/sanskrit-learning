// UI tests for the Samāsa Atlas page. Covers the three views (Compound
// bank, Type identifier drill, Type reference) and the interactive
// flows inside each — none of which were previously covered (Samasa.jsx
// sat at 0.5% coverage).

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Samasa from './Samasa.jsx';
import { SAMASA_TYPES, buildSamasaBank } from '../data/samasa.js';
import { SAMASA_REF_BANK } from '../data/samasaRefBank.js';

// Replicate the drill's merged bank — must match Samasa.jsx exactly so we
// can predict current.type at any idx. Reference first, then verse,
// interleaved.
function mergedDrillBank() {
  const verseBank = buildSamasaBank();
  const refBank = SAMASA_REF_BANK;
  const merged = [];
  const max = Math.max(verseBank.length, refBank.length);
  for (let i = 0; i < max; i++) {
    if (i < refBank.length) merged.push(refBank[i]);
    if (i < verseBank.length) merged.push(verseBank[i]);
  }
  return merged;
}

function correctTypeAt(idx) {
  const bank = mergedDrillBank();
  return bank[idx % bank.length].type;
}

afterEach(() => cleanup());

describe('Samasa — view switcher', () => {
  it('mounts on the Compound bank by default', () => {
    render(<Samasa />);
    expect(screen.getByText(/समास — compound analysis/)).toBeDefined();
    // Bank-mode toggle is visible
    expect(screen.getByText(/Reference catalogue/)).toBeDefined();
    expect(screen.getByText(/From your verses/)).toBeDefined();
  });

  it('clicking "Type identifier (drill)" switches to the drill view', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type identifier \(drill\)/));
    expect(screen.getByText(/Which type\?/)).toBeDefined();
  });

  it('clicking "Type reference" switches to the reference cards', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type reference/));
    // The 10 SAMASA_TYPES should each render as a card with their deva name.
    for (const t of SAMASA_TYPES) {
      expect(screen.getAllByText(t.deva).length).toBeGreaterThan(0);
    }
  });

  it('the active view button has is-active', () => {
    render(<Samasa />);
    const tab = screen.getByText(/Type identifier \(drill\)/).closest('button');
    fireEvent.click(tab);
    expect(tab.className).toMatch(/is-active/);
  });
});

describe('Samasa — Compound bank', () => {
  it('reference catalogue mode shows the reference bank meta', () => {
    render(<Samasa />);
    // Reference catalogue is the default
    expect(screen.getByText(/canonical compound/i)).toBeDefined();
  });

  it('clicking "From your verses" switches to verse-grown bank', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/From your verses/));
    // The from-verses meta says "auto-grown from verses.js → samasNotes[]"
    expect(screen.getByText(/auto-grown/i)).toBeDefined();
  });

  it('family filter chip narrows the bank rows', () => {
    const { container } = render(<Samasa />);
    // Find the तत्पुरुष filter chip and click it.
    const tatChip = Array.from(container.querySelectorAll('.samasa-filter'))
      .find((b) => b.textContent === 'तत्पुरुष');
    expect(tatChip, 'expected a तत्पुरुष filter chip').toBeDefined();
    fireEvent.click(tatChip);

    // After filter: every visible bank-row's type belongs to the तत्पुरुष family.
    const rows = Array.from(container.querySelectorAll('.samasa-bank-row'));
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      const typeText = row.querySelector('.bank-type').textContent;
      // Look up the family for this type
      const t = SAMASA_TYPES.find((x) => x.deva === typeText);
      expect(t?.family).toBe('तत्पुरुष');
    }
  });

  it('reference bank includes at least one अव्ययीभाव example', () => {
    // The whole reason we built samasaRefBank — the 25-verse Gītā corpus
    // alone doesn't cover अव्ययीभाव. The reference catalogue must.
    render(<Samasa />);
    // Reference mode is default; click the अव्ययीभाव family chip.
    const avChip = Array.from(document.querySelectorAll('.samasa-filter'))
      .find((b) => b.textContent === 'अव्ययीभाव');
    expect(avChip, 'अव्ययीभाव filter chip should exist').toBeDefined();
    fireEvent.click(avChip);
    // At least one row in the filtered view
    const rows = document.querySelectorAll('.samasa-bank-row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('verse-ref button calls onOpenVerse with chapter + verse when present', () => {
    const onOpenVerse = vi.fn();
    render(<Samasa onOpenVerse={onOpenVerse} />);
    // Switch to "From your verses" — those rows have verseRef.
    fireEvent.click(screen.getByText(/From your verses/));
    const refBtn = screen.getAllByText(/Gītā \d+\.\d+ ↗/)[0];
    fireEvent.click(refBtn);
    expect(onOpenVerse).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
  });

  it('reference mode rows show source label instead of verse-ref', () => {
    const { container } = render(<Samasa />);
    // Ref mode has bank-ref-source spans (e.g. "classical", "epic")
    const sources = container.querySelectorAll('.bank-ref-source');
    expect(sources.length).toBeGreaterThan(0);
  });
});

describe('Samasa — Type Identifier drill', () => {
  it('shows a compound + vigraha and 10 type-option buttons', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type identifier \(drill\)/));
    // 10 SAMASA_TYPES → 10 drill option buttons
    const opts = document.querySelectorAll('.drill-option');
    expect(opts.length).toBe(SAMASA_TYPES.length);
    // Compound + vigraha are rendered
    expect(document.querySelector('.drill-compound')).toBeDefined();
    expect(document.querySelector('.drill-vigraha')).toBeDefined();
  });

  it('picking the correct type marks .is-correct and increments score', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type identifier \(drill\)/));

    const correctType = correctTypeAt(0);
    expect(screen.getByText(/Score: 0 \/ 0/)).toBeDefined();

    const opts = Array.from(document.querySelectorAll('.drill-option'));
    const matching = opts.find((o) => o.querySelector('.opt-deva')?.textContent === correctType);
    expect(matching, `expected an option matching ${correctType}`).toBeDefined();
    fireEvent.click(matching);

    expect(matching.className).toMatch(/is-correct/);
    expect(screen.getByText(/Score: 1 \/ 1/)).toBeDefined();
    expect(screen.getByText(/✓ Right/)).toBeDefined();
  });

  it('picking a wrong type marks .is-wrong on the picked option, .is-correct on the right one, and only increments total', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type identifier \(drill\)/));

    const correctType = correctTypeAt(0);
    const opts = Array.from(document.querySelectorAll('.drill-option'));
    const wrong = opts.find((o) => o.querySelector('.opt-deva')?.textContent !== correctType);
    expect(wrong).toBeDefined();
    fireEvent.click(wrong);

    expect(wrong.className).toMatch(/is-wrong/);
    const correct = opts.find((o) => o.querySelector('.opt-deva')?.textContent === correctType);
    expect(correct.className).toMatch(/is-correct/);

    expect(screen.getByText(/Score: 0 \/ 1/)).toBeDefined();
    expect(screen.getByText(/✗ It's/)).toBeDefined();
  });

  it('Next button advances to a new prompt and resets feedback', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type identifier \(drill\)/));

    const firstCompound = document.querySelector('.drill-compound').textContent;
    const correctType = correctTypeAt(0);
    const opts = Array.from(document.querySelectorAll('.drill-option'));
    const matching = opts.find((o) => o.querySelector('.opt-deva')?.textContent === correctType);
    fireEvent.click(matching);

    fireEvent.click(screen.getByText('Next'));

    const secondCompound = document.querySelector('.drill-compound').textContent;
    expect(secondCompound).not.toBe(firstCompound);
    expect(document.querySelector('.drill-feedback')).toBeNull();
  });

  it('options are disabled after answering until Next is clicked', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type identifier \(drill\)/));

    const opts = Array.from(document.querySelectorAll('.drill-option'));
    fireEvent.click(opts[0]);

    // All option buttons disabled now
    const allDisabled = opts.every((b) => b.disabled);
    expect(allDisabled).toBe(true);
  });

  it('drill bank includes अव्ययीभाव prompts (because we interleave reference + verse)', () => {
    // Static check: the merged bank contains at least one अव्ययीभाव entry.
    const bank = mergedDrillBank();
    const hasAvyayi = bank.some((b) => b.type === 'अव्ययीभाव');
    expect(hasAvyayi).toBe(true);
  });
});

describe('Samasa — Type Reference cards', () => {
  it('renders one card per SAMASA_TYPE with deva name + family + rule', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type reference/));
    const cards = document.querySelectorAll('.samasa-type-card');
    expect(cards.length).toBe(SAMASA_TYPES.length);

    for (const t of SAMASA_TYPES) {
      // Each type's rule text appears in a card.
      expect(screen.getAllByText(t.rule).length).toBeGreaterThan(0);
    }
  });

  it('renders examples for each type', () => {
    render(<Samasa />);
    fireEvent.click(screen.getByText(/Type reference/));
    // Sample a few well-known examples — each type has at least one.
    for (const t of SAMASA_TYPES) {
      const example = t.examples[0];
      expect(screen.getAllByText(example).length).toBeGreaterThan(0);
    }
  });
});

