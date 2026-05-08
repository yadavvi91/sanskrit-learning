// UI tests for ThemePicker. Covers: trigger button, popover open/close,
// palette switch updates document.documentElement.dataset.theme and
// CSS custom properties + persists to localStorage.

import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ThemePicker from './ThemePicker.jsx';
import { PALETTES, STORAGE_KEY, DEFAULT_PALETTE } from '../data/palettes.js';

afterEach(() => cleanup());

beforeEach(() => {
  try { window.localStorage.clear(); } catch {/* ignore */}
  // Reset html dataset.theme so each test starts clean.
  document.documentElement.removeAttribute('data-theme');
});

describe('ThemePicker — initial render', () => {
  it('renders the trigger button with three swatches and is collapsed by default', () => {
    const { container } = render(<ThemePicker />);
    const trigger = container.querySelector('.theme-trigger');
    expect(trigger).toBeDefined();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelectorAll('.trigger-swatch').length).toBe(3);
    // Popover is not in DOM until opened.
    expect(container.querySelector('.theme-popover')).toBeNull();
  });

  it('applies the default palette on mount', () => {
    render(<ThemePicker />);
    expect(document.documentElement.dataset.theme).toBe(DEFAULT_PALETTE);
  });

  it('uses the stored palette from localStorage on mount if present', () => {
    // Pick a non-default palette and pre-store it.
    const nonDefault = PALETTES.find((p) => p.id !== DEFAULT_PALETTE);
    window.localStorage.setItem(STORAGE_KEY, nonDefault.id);
    render(<ThemePicker />);
    expect(document.documentElement.dataset.theme).toBe(nonDefault.id);
  });
});

describe('ThemePicker — popover open/close', () => {
  it('clicking the trigger opens the popover', () => {
    const { container } = render(<ThemePicker />);
    const trigger = container.querySelector('.theme-trigger');
    fireEvent.click(trigger);
    expect(container.querySelector('.theme-popover')).toBeDefined();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('clicking the trigger again closes the popover', () => {
    const { container } = render(<ThemePicker />);
    const trigger = container.querySelector('.theme-trigger');
    fireEvent.click(trigger); // open
    fireEvent.click(trigger); // close
    expect(container.querySelector('.theme-popover')).toBeNull();
  });

  it('Escape closes an open popover', () => {
    const { container } = render(<ThemePicker />);
    fireEvent.click(container.querySelector('.theme-trigger'));
    expect(container.querySelector('.theme-popover')).not.toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(container.querySelector('.theme-popover')).toBeNull();
  });

  it('mousedown outside the popover closes it', () => {
    const { container } = render(<ThemePicker />);
    fireEvent.click(container.querySelector('.theme-trigger'));
    expect(container.querySelector('.theme-popover')).not.toBeNull();
    // mousedown on document.body (outside the picker)
    fireEvent.mouseDown(document.body);
    expect(container.querySelector('.theme-popover')).toBeNull();
  });
});

describe('ThemePicker — palette switching', () => {
  it('clicking a different palette swatch sets data-theme + persists to localStorage', () => {
    const { container } = render(<ThemePicker />);
    fireEvent.click(container.querySelector('.theme-trigger'));

    // Pick a non-default palette by name.
    const nonDefault = PALETTES.find((p) => p.id !== DEFAULT_PALETTE);
    const swatchBtn = Array.from(container.querySelectorAll('.theme-swatch'))
      .find((b) => b.querySelector('.swatch-name')?.textContent === nonDefault.name);
    expect(swatchBtn, `expected swatch for ${nonDefault.name}`).toBeDefined();
    fireEvent.click(swatchBtn);

    expect(document.documentElement.dataset.theme).toBe(nonDefault.id);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(nonDefault.id);
  });

  it('switching applies the palette CSS custom properties to <html>', () => {
    const { container } = render(<ThemePicker />);
    fireEvent.click(container.querySelector('.theme-trigger'));

    const target = PALETTES.find((p) => p.id !== DEFAULT_PALETTE);
    const swatchBtn = Array.from(container.querySelectorAll('.theme-swatch'))
      .find((b) => b.querySelector('.swatch-name')?.textContent === target.name);
    fireEvent.click(swatchBtn);

    // applyPalette sets every var on document.documentElement.style — pick
    // one that's known to vary across themes.
    const inkVar = document.documentElement.style.getPropertyValue('--ink');
    expect(inkVar.trim()).toBe(target.vars['--ink']);
  });

  it('the active palette swatch has is-active', () => {
    const { container } = render(<ThemePicker />);
    fireEvent.click(container.querySelector('.theme-trigger'));

    // The default palette's swatch should have is-active.
    const activeSwatch = container.querySelector('.theme-swatch.is-active');
    expect(activeSwatch).toBeDefined();
    expect(activeSwatch.querySelector('.swatch-name').textContent)
      .toBe(PALETTES.find((p) => p.id === DEFAULT_PALETTE).name);
  });
});
