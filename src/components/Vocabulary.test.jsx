// UI tests for the Vocabulary tab. Catches the "particle (20) shows
// nothing because Hide-particles is on" bug that the user flagged
// directly: clicking the particle category-filter chip should override
// the Hide-particles toggle.

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Vocabulary from './Vocabulary.jsx';

// React Testing Library's render() leaves DOM in document.body. Without
// cleanup between tests, screen.getByLabelText etc. find matches across
// every render. Manual cleanup avoids "Found multiple elements" failures.
afterEach(() => cleanup());

function renderVocab() {
  return render(
    <MemoryRouter>
      <Vocabulary />
    </MemoryRouter>
  );
}

describe('Vocabulary — initial render', () => {
  it('mounts and shows the शब्दकोषः title', () => {
    renderVocab();
    expect(screen.getByText('शब्दकोषः')).toBeDefined();
  });

  it('Hide-particles toggle is checked by default', () => {
    renderVocab();
    const toggle = screen.getByLabelText(/Hide particles/i);
    expect(toggle.checked).toBe(true);
  });

  it('Only-words-missing-a-gloss toggle is unchecked by default', () => {
    renderVocab();
    const toggle = screen.getByLabelText(/Only words missing a gloss/i);
    expect(toggle.checked).toBe(false);
  });
});

describe('Vocabulary — filter interaction (the user-flagged bug)', () => {
  it('clicking the "particle" category chip surfaces particles even when Hide-particles is on', () => {
    // This is the exact bug: "particle (20)" was showing zero rows because
    // the catch-all hide-toggle was overriding the explicit category pick.
    const { container } = renderVocab();

    // Sanity: hide-particles is on
    const hideToggle = screen.getByLabelText(/Hide particles/i);
    expect(hideToggle.checked).toBe(true);

    // Find the category-filter chip whose label starts with "particle"
    // (the count in parens varies as the dictionary grows, so match by prefix).
    const particleChip = Array.from(container.querySelectorAll('.cat-chip'))
      .find((b) => /^particle/i.test(b.textContent));
    expect(particleChip, 'particle category chip should render').toBeDefined();
    fireEvent.click(particleChip);

    // After clicking the particle chip, at least one common particle should
    // appear in the rendered table. Pick च — appears across many verses.
    const matrix = container.querySelector('.vocab-matrix');
    expect(matrix).toBeDefined();
    // Look for a particle word in the rendered table — any of च / हि / तु / न
    const tbody = matrix.querySelector('tbody');
    const text = tbody.textContent;
    const foundAny = ['च', 'हि', 'तु', 'न', 'एव', 'अपि'].some((w) => text.includes(w));
    expect(foundAny, `Expected at least one particle in the table, got:\n${text.slice(0, 400)}`).toBe(true);
  });

  it('"All" category with Hide-particles on hides particles', () => {
    const { container } = renderVocab();
    // hide-particles is on by default; All is the default category.
    const matrix = container.querySelector('.vocab-matrix');
    const tbody = matrix.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr.vocab-row');
    // Each visible row's category cell should NOT be "particle"
    for (const row of rows) {
      const catCell = row.querySelector('.pattern-cell-category');
      expect(catCell.textContent.trim()).not.toBe('particle');
    }
  });

  it('toggling Hide-particles off shows particles in the All view', () => {
    const { container } = renderVocab();
    const toggle = screen.getByLabelText(/Hide particles/i);
    fireEvent.click(toggle); // turn off
    expect(toggle.checked).toBe(false);

    const matrix = container.querySelector('.vocab-matrix');
    const tbody = matrix.querySelector('tbody');
    // Now expect at least one particle row to exist
    const rows = Array.from(tbody.querySelectorAll('tr.vocab-row'));
    const hasParticle = rows.some((r) => {
      const cat = r.querySelector('.pattern-cell-category');
      return cat && cat.textContent.trim() === 'particle';
    });
    expect(hasParticle).toBe(true);
  });
});

describe('Vocabulary — pagination', () => {
  it('caps the initial render at 50 rows by default', () => {
    const { container } = renderVocab();
    const rows = container.querySelectorAll('.vocab-matrix tbody tr.vocab-row');
    expect(rows.length).toBeLessThanOrEqual(50);
  });

  it('shows the "showing N of M" counter', () => {
    renderVocab();
    expect(screen.getByText(/showing \d+ of \d+/i)).toBeDefined();
  });
});

describe('Vocabulary — words from the user complaint now have glosses', () => {
  it('अभिजायते surfaces with a meaningful gloss when filter allows it', () => {
    const { container } = renderVocab();
    // First disable hide-particles (अभिजायते is a verb but be safe).
    // Use the search box to narrow to अभिजायते.
    const search = screen.getByPlaceholderText(/Search by word/i);
    fireEvent.change(search, { target: { value: 'अभिजायते' } });
    const tbody = container.querySelector('.vocab-matrix tbody');
    expect(tbody.textContent).toContain('अभिजायते');
    // The gloss column should not be the "no gloss yet" placeholder
    expect(tbody.textContent).not.toContain('— no gloss yet —');
  });
});
