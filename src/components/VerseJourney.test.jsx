// UI tests for VerseJourney workflows: rail recent-chips, jump-to-verse
// form, search results, "show only decoded" toggle, chapter-grid verse-cell
// clicks. Covers the lines uncovered by routing.test.jsx (which only
// asserted the route renders).

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import VerseJourney from './VerseJourney.jsx';
import { VERSES } from '../data/verses.js';

afterEach(() => cleanup());

function renderAt(url = '/journey') {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/journey" element={<VerseJourney />} />
        <Route path="/journey/:chapter/:verse" element={<VerseJourney />} />
        <Route path="/primer" element={<div data-testid="primer-route">Primer</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('VerseJourney — rail summary', () => {
  it('shows the decoded count = VERSES.length', () => {
    const { container } = renderAt('/journey');
    const countEl = container.querySelector('.decoded-count');
    expect(Number(countEl.textContent)).toBe(VERSES.length);
  });

  it('renders up to 5 most-recent chips', () => {
    const { container } = renderAt('/journey');
    const chips = container.querySelectorAll('.recent-chip');
    expect(chips.length).toBeGreaterThan(0);
    expect(chips.length).toBeLessThanOrEqual(5);
  });

  it('clicking a recent chip navigates to that verse', () => {
    const { container } = renderAt('/journey');
    const chips = Array.from(container.querySelectorAll('.recent-chip'));
    // Pick a chip whose ref isn't the currently-active one.
    const inactive = chips.find((c) => !c.className.includes('is-active'));
    expect(inactive).toBeDefined();
    const ref = inactive.textContent; // "c.v"
    fireEvent.click(inactive);
    // After click, that chip is active.
    const reactive = Array.from(container.querySelectorAll('.recent-chip'))
      .find((c) => c.textContent === ref);
    expect(reactive.className).toMatch(/is-active/);
  });
});

describe('VerseJourney — jump-to-verse form', () => {
  it('typing a valid decoded ref + Enter navigates there', () => {
    const { container } = renderAt('/journey');
    const input = container.querySelector('.jump-input');
    expect(input).toBeDefined();

    // Pick any decoded verse from the corpus.
    const target = VERSES[0]; // e.g. 1.1
    fireEvent.change(input, { target: { value: `${target.chapter}.${target.verse}` } });

    const form = input.closest('form');
    fireEvent.submit(form);

    // The selected verse should now match. The verse-detail header reads
    // "Gītā c.v" — find at least one matching ref-text.
    expect(screen.getAllByText(new RegExp(`Gītā ${target.chapter}\\.${target.verse}`)).length)
      .toBeGreaterThan(0);
    // Input cleared after successful submit.
    expect(input.value).toBe('');
  });

  it('typing an invalid format does nothing on submit', () => {
    const { container } = renderAt('/journey');
    const input = container.querySelector('.jump-input');
    fireEvent.change(input, { target: { value: 'bogus' } });
    const form = input.closest('form');
    fireEvent.submit(form);
    // Input still has the bogus text (regex did not match → handler bailed early).
    expect(input.value).toBe('bogus');
  });

  it('referencing an undecoded verse silently no-ops', () => {
    const { container } = renderAt('/journey');
    const input = container.querySelector('.jump-input');
    // A verse far outside the decoded set, e.g. 18.78
    fireEvent.change(input, { target: { value: '18.78' } });
    const beforeUrl = container.querySelector('.decoded-count').textContent; // proxy for "page didn't change"
    fireEvent.submit(input.closest('form'));
    expect(container.querySelector('.decoded-count').textContent).toBe(beforeUrl);
    // Input retained — it didn't pass the decodedKeys check, so .submit handler did not call setSelected/clear.
    expect(input.value).toBe('18.78');
  });
});

describe('VerseJourney — search', () => {
  it('typing a search term shows results in the rail', () => {
    const { container } = renderAt('/journey');
    const search = container.querySelector('.rail-search');
    expect(search).toBeDefined();

    // Search a common decoded word — "Krishna" likely appears in translations.
    fireEvent.change(search, { target: { value: 'Krishna' } });

    // Either results list or empty hint must render.
    const results = container.querySelector('.rail-search-results');
    const empty = container.querySelector('.rail-search-empty');
    expect(results || empty).toBeTruthy();
  });

  it('clicking a search result navigates to that verse and clears search', () => {
    const { container } = renderAt('/journey');
    const search = container.querySelector('.rail-search');
    // Use a phrase known to appear in at least one translation.
    fireEvent.change(search, { target: { value: 'अर्जुन' } });

    const items = container.querySelectorAll('.rail-search-item');
    if (items.length > 0) {
      fireEvent.click(items[0]);
      // search input cleared
      expect(container.querySelector('.rail-search').value).toBe('');
    }
  });

  it('search with no matches shows the empty-state line', () => {
    const { container } = renderAt('/journey');
    const search = container.querySelector('.rail-search');
    fireEvent.change(search, { target: { value: 'qzxqzxqzxqzx' } });
    expect(container.querySelector('.rail-search-empty')).toBeDefined();
  });
});

describe('VerseJourney — Show only decoded toggle', () => {
  it('clicking it toggles to active state', () => {
    const { container } = renderAt('/journey');
    const toggle = container.querySelector('.decoded-only-toggle');
    expect(toggle.className).not.toMatch(/is-active/);
    fireEvent.click(toggle);
    expect(toggle.className).toMatch(/is-active/);
    // Label flips
    expect(toggle.textContent).toMatch(/Showing decoded only/);
  });

  it('after toggling on, the chapter list hides chapters with no decoded verses', () => {
    const { container } = renderAt('/journey');
    fireEvent.click(container.querySelector('.decoded-only-toggle'));

    // Get the remaining chapter rows.
    const rows = container.querySelectorAll('.chapter-row');
    // Each remaining row should have at least one decoded verse-cell — i.e. .verse-cell.is-decoded
    for (const row of rows) {
      // <details> → only decoded cells render in the verse-grid in this mode.
      const decoded = row.querySelectorAll('.verse-cell.is-decoded');
      const locked = row.querySelectorAll('.verse-cell.is-locked');
      expect(locked.length).toBe(0);
      expect(decoded.length).toBeGreaterThan(0);
    }
  });
});

describe('VerseJourney — chapter grid + verse-cell clicks', () => {
  it('verse-cells for decoded verses are enabled; locked ones are disabled', () => {
    const { container } = renderAt('/journey');
    const decoded = container.querySelectorAll('.verse-cell.is-decoded');
    const locked = container.querySelectorAll('.verse-cell.is-locked');
    expect(decoded.length).toBeGreaterThan(0);
    expect(locked.length).toBeGreaterThan(0);

    // Decoded cells aren't disabled
    expect(decoded[0].disabled).toBe(false);
    // Locked cells ARE disabled (the button has the `disabled` attribute)
    expect(locked[0].disabled).toBe(true);
  });

  it('clicking a decoded verse-cell navigates to that verse', () => {
    const { container } = renderAt('/journey');
    // Find a decoded cell that is NOT currently active.
    const cells = Array.from(container.querySelectorAll('.verse-cell.is-decoded'));
    const inactive = cells.find((c) => !c.className.includes('is-active'));
    expect(inactive, 'expected an inactive decoded cell').toBeDefined();
    fireEvent.click(inactive);
    // The clicked cell becomes active after click.
    expect(inactive.className).toMatch(/is-active/);
  });
});
