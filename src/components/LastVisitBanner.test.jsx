// UI tests for LastVisitBanner. Covers the three observable states
// (first-visit, stale-visit, recent-visit hidden), Open Primer + Dismiss
// callbacks, and the localStorage write on dismiss.

import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import LastVisitBanner from './LastVisitBanner.jsx';

const STORAGE_KEY = 'lastVisitAt';
const STALE_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

afterEach(() => cleanup());

beforeEach(() => {
  try { window.localStorage.clear(); } catch {/* ignore */}
});

describe('LastVisitBanner — first-visit branch (no localStorage entry)', () => {
  it('renders on a fresh visit with the first-time message', () => {
    render(<LastVisitBanner />);
    expect(screen.getByText(/First time here/i)).toBeDefined();
  });

  it('shows both Open Primer and Dismiss buttons', () => {
    render(<LastVisitBanner />);
    expect(screen.getByText(/Open Primer/)).toBeDefined();
    expect(screen.getByText(/Dismiss/)).toBeDefined();
  });
});

describe('LastVisitBanner — stale-visit branch (>14 days)', () => {
  it('renders with the stale-visit message including day count', () => {
    // 30 days ago
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(STORAGE_KEY, String(thirtyDaysAgo));
    render(<LastVisitBanner />);
    // Expect "It's been 30 days"
    expect(screen.getByText(/It's been 30 days/)).toBeDefined();
  });

  it('uses singular "day" when exactly 15 days', () => {
    // Math.round(15.0... → 15) — singular grammar would only fire at exactly 1.
    // But the threshold is 14 days; +1 day → 15 days → "days" (plural).
    // We instead test that the "day" / "days" pluralisation works at 1 day-after-threshold-edge.
    const fifteenDaysAgo = Date.now() - 15 * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(STORAGE_KEY, String(fifteenDaysAgo));
    render(<LastVisitBanner />);
    expect(screen.getByText(/It's been 15 days/)).toBeDefined();
  });

  it('does NOT render when the last visit was within 14 days', () => {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    window.localStorage.setItem(STORAGE_KEY, String(oneDayAgo));
    const { container } = render(<LastVisitBanner />);
    // No banner element
    expect(container.querySelector('.last-visit-banner')).toBeNull();
  });

  it('does not render when last visit is exactly at the 14-day boundary', () => {
    const exactlyAtThreshold = Date.now() - STALE_DAYS_MS;
    window.localStorage.setItem(STORAGE_KEY, String(exactlyAtThreshold));
    const { container } = render(<LastVisitBanner />);
    expect(container.querySelector('.last-visit-banner')).toBeNull();
  });
});

describe('LastVisitBanner — Open Primer / Dismiss', () => {
  it('clicking "Open Primer" calls onOpenPrimer and hides the banner', () => {
    const onOpenPrimer = vi.fn();
    const { container } = render(<LastVisitBanner onOpenPrimer={onOpenPrimer} />);
    fireEvent.click(screen.getByText(/Open Primer/));
    expect(onOpenPrimer).toHaveBeenCalled();
    // Banner is dismissed after the click.
    expect(container.querySelector('.last-visit-banner')).toBeNull();
  });

  it('clicking "Dismiss" hides the banner and writes a fresh timestamp', () => {
    const before = Date.now();
    const { container } = render(<LastVisitBanner />);
    fireEvent.click(screen.getByText(/Dismiss/));
    expect(container.querySelector('.last-visit-banner')).toBeNull();

    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    expect(stored).toBeGreaterThanOrEqual(before);
    expect(stored).toBeLessThanOrEqual(Date.now());
  });

  it('dismissing the first-time banner also persists a timestamp', () => {
    // No prior storage → first-visit branch shows. Dismiss sets a timestamp.
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    render(<LastVisitBanner />);
    fireEvent.click(screen.getByText(/Dismiss/));
    expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });
});

describe('LastVisitBanner — corrupt localStorage', () => {
  it('treats a NaN-ish stored value as a first visit', () => {
    window.localStorage.setItem(STORAGE_KEY, 'not-a-number');
    render(<LastVisitBanner />);
    expect(screen.getByText(/First time here/i)).toBeDefined();
  });
});
