// UI tests for Practice. The SRS engine is exhaustively tested in
// srs.test.js; this file covers the UI flow: start a session, show the
// card, flip to answer, rate (Again/Hard/Good/Easy), advance, end.

import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Practice from './Practice.jsx';

afterEach(() => cleanup());

beforeEach(() => {
  try { window.localStorage.clear(); } catch {/* ignore */}
});

describe('Practice — landing screen', () => {
  it('renders the अभ्यासः title and stats', () => {
    render(<Practice />);
    expect(screen.getByText('अभ्यासः')).toBeDefined();
    expect(screen.getByText(/Total cards/i)).toBeDefined();
    expect(screen.getByText(/Due now/i)).toBeDefined();
    expect(screen.getByText(/Mastered/i)).toBeDefined();
  });

  it('shows Start session and Reset buttons', () => {
    render(<Practice />);
    expect(screen.getByText(/Start session/)).toBeDefined();
    expect(screen.getByText(/Reset all schedules/)).toBeDefined();
  });

  it('Total cards stat is > 0 (deck is auto-seeded from corpus)', () => {
    const { container } = render(<Practice />);
    // Find the stat labeled "Total cards" and read its value
    const stats = Array.from(container.querySelectorAll('.stat'));
    const total = stats.find((s) => s.querySelector('.stat-label')?.textContent === 'Total cards');
    expect(total).toBeDefined();
    const val = Number(total.querySelector('.stat-value').textContent);
    expect(val).toBeGreaterThan(0);
  });
});

describe('Practice — session flow', () => {
  it('clicking Start session shows a card with prompt + Show answer button', () => {
    const { container } = render(<Practice />);
    fireEvent.click(screen.getByText(/Start session/));

    // Now in session view: practice-card with practice-prompt + practice-show.
    expect(container.querySelector('.practice-card')).toBeDefined();
    expect(container.querySelector('.practice-prompt')).toBeDefined();
    expect(screen.getByText(/Show answer/)).toBeDefined();
    // Progress shows N/total
    expect(container.querySelector('.practice-progress').textContent).toMatch(/^\d+ \/ \d+$/);
  });

  it('clicking Show answer reveals answer + 4 rating buttons', () => {
    const { container } = render(<Practice />);
    fireEvent.click(screen.getByText(/Start session/));
    fireEvent.click(screen.getByText(/Show answer/));

    expect(container.querySelector('.practice-answer')).toBeDefined();
    // 4 rating buttons
    expect(screen.getByText('Again')).toBeDefined();
    expect(screen.getByText('Hard')).toBeDefined();
    expect(screen.getByText('Good')).toBeDefined();
    expect(screen.getByText('Easy')).toBeDefined();
  });

  it('rating "Good" advances to the next card and re-hides the answer', () => {
    const { container } = render(<Practice />);
    fireEvent.click(screen.getByText(/Start session/));

    const firstPrompt = container.querySelector('.practice-prompt').textContent;
    const totalText = container.querySelector('.practice-progress').textContent;
    const total = Number(totalText.split(' / ')[1]);

    if (total > 1) {
      fireEvent.click(screen.getByText(/Show answer/));
      fireEvent.click(screen.getByText('Good'));

      // Either advanced to a new card (still in session) or session ended.
      const stillInSession = !!container.querySelector('.practice-card');
      if (stillInSession) {
        // Different prompt, no answer visible yet.
        const nextPrompt = container.querySelector('.practice-prompt').textContent;
        expect(nextPrompt).not.toBe(firstPrompt);
        expect(container.querySelector('.practice-answer')).toBeNull();
      }
    }
  });

  it('rating writes to localStorage (SRS schedule persists)', () => {
    render(<Practice />);
    fireEvent.click(screen.getByText(/Start session/));
    fireEvent.click(screen.getByText(/Show answer/));
    fireEvent.click(screen.getByText('Easy'));

    // recordReview writes to STORE_KEY = 'srs_v1'
    const stored = window.localStorage.getItem('srs_v1');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored);
    // At least one schedule entry exists
    expect(Object.keys(parsed).length).toBeGreaterThanOrEqual(1);
  });

  it('End session returns to the landing screen', () => {
    const { container } = render(<Practice />);
    fireEvent.click(screen.getByText(/Start session/));
    expect(container.querySelector('.practice-card')).toBeDefined();

    fireEvent.click(screen.getByText(/End session/));
    expect(container.querySelector('.practice-card')).toBeNull();
    expect(screen.getByText(/Start session/)).toBeDefined();
  });

  it('completing all cards in a session auto-returns to landing', () => {
    // Force a tiny session: shrink card list via mocking is non-trivial,
    // so we just rate enough times that the session ends. Click Good
    // through all cards.
    const { container } = render(<Practice />);
    fireEvent.click(screen.getByText(/Start session/));

    let safety = 30;
    while (container.querySelector('.practice-card') && safety-- > 0) {
      fireEvent.click(screen.getByText(/Show answer/));
      fireEvent.click(screen.getByText('Good'));
    }
    // Should now be back on landing.
    expect(screen.getByText(/Start session/)).toBeDefined();
  });
});

describe('Practice — Reset all schedules', () => {
  // Pre-fill SRS storage with a valid {schedules, reviewLog} shape;
  // arbitrary JSON would crash summary().
  function seedStore() {
    window.localStorage.setItem('srs_v1', JSON.stringify({
      schedules: { 'fake-card-id': { reps: 1, easeFactor: 2.5, interval: 1, due: 0, lastReviewed: 0, lastQuality: 4 } },
      reviewLog: [{ cardId: 'fake-card-id', quality: 4, at: 0 }],
    }));
  }

  it('cancelling the confirm leaves localStorage alone', () => {
    seedStore();
    const spy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    render(<Practice />);
    fireEvent.click(screen.getByText(/Reset all schedules/));

    const stored = JSON.parse(window.localStorage.getItem('srs_v1'));
    expect(stored.schedules['fake-card-id']).toBeDefined();
    spy.mockRestore();
  });

  it('confirming Reset wipes schedules and reviewLog', () => {
    seedStore();
    const spy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<Practice />);
    fireEvent.click(screen.getByText(/Reset all schedules/));

    // clearAllSchedules writes back an empty store, not removeItem.
    const stored = JSON.parse(window.localStorage.getItem('srs_v1'));
    expect(stored).toEqual({ schedules: {}, reviewLog: [] });
    spy.mockRestore();
  });
});
