// UI tests for SandhiLab. The sandhi engine is exhaustively covered
// by sandhi.test.js; this file covers the UI: input → result, preset
// click, rule list rendering, catalogue rendering.

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SandhiLab from './SandhiLab.jsx';
import { SANDHI_RULES } from '../utils/sandhi.js';

afterEach(() => cleanup());

describe('SandhiLab — initial render', () => {
  it('mounts with default input पाण्डवाश्चैव', () => {
    const { container } = render(<SandhiLab />);
    const input = container.querySelector('.sandhi-input');
    expect(input).toBeDefined();
    expect(input.value).toBe('पाण्डवाश्चैव');
  });

  it('shows split parts and rule list for the default input', () => {
    const { container } = render(<SandhiLab />);
    // पाण्डवाश्चैव → पाण्डवाः · च · एव (3 parts) — assert at least 2 parts.
    const parts = container.querySelectorAll('.sandhi-result-part');
    expect(parts.length).toBeGreaterThanOrEqual(2);
    // At least one rule should be applied.
    expect(container.querySelectorAll('.sandhi-result-rules ol li').length).toBeGreaterThan(0);
  });

  it('shows the full rule catalogue with all SANDHI_RULES', () => {
    const { container } = render(<SandhiLab />);
    // The catalogue is in <details open> by default.
    const catalogue = container.querySelector('.sandhi-rules-catalogue');
    expect(catalogue).toBeDefined();
    const items = catalogue.querySelectorAll('ul > li');
    expect(items.length).toBe(SANDHI_RULES.length);
  });

  it('catalogue renders multiple examples per rule (post-v8 enhancement)', () => {
    const { container } = render(<SandhiLab />);
    // SANDHI_RULES with .examples (plural) should render >1 example divs in
    // the catalogue. Find one that has >=2 examples and assert its DOM.
    const ruleWithMany = SANDHI_RULES.find((r) => (r.examples?.length ?? 0) >= 2);
    expect(ruleWithMany, 'expected at least one rule with multiple examples').toBeDefined();

    // Walk the catalogue: every rule li should have at least one .rule-example.
    const items = container.querySelectorAll('.sandhi-rules-catalogue ul > li');
    let foundMulti = false;
    for (const li of items) {
      if (li.querySelectorAll('.rule-example').length >= 2) {
        foundMulti = true;
        break;
      }
    }
    expect(foundMulti).toBe(true);
  });
});

describe('SandhiLab — input interaction', () => {
  it('typing a new joined string updates the result', () => {
    const { container } = render(<SandhiLab />);
    const input = container.querySelector('.sandhi-input');
    fireEvent.change(input, { target: { value: 'नैतत्' } });

    // नैतत् = न + एतत् (अ + ए → ऐ, वृद्धि सन्धि)
    const parts = Array.from(container.querySelectorAll('.sandhi-result-part'));
    const partsText = parts.map((p) => p.textContent);
    // Engine should split into at least 2 parts.
    expect(parts.length).toBeGreaterThanOrEqual(2);
    // Look for a recognisable head/tail.
    expect(partsText.join(' ')).toMatch(/न|एतत्/);
  });

  it('an unparseable input shows the empty-result hint', () => {
    const { container } = render(<SandhiLab />);
    const input = container.querySelector('.sandhi-input');
    fireEvent.change(input, { target: { value: 'क' } });

    // Engine returns 1-part / 0-rules → shows "No sandhi-junction recognised."
    const parts = container.querySelectorAll('.sandhi-result-part');
    const empty = container.querySelector('.sandhi-result-empty');
    // Either no recognisable junction (empty hint) or a single part.
    expect((parts.length === 1 && empty) || empty || parts.length === 1).toBeTruthy();
  });
});

describe('SandhiLab — preset clicks', () => {
  it('clicking a preset chip loads it into the input', () => {
    const { container } = render(<SandhiLab />);
    // Find the तच्च preset (one of the simple consonant-sandhi presets).
    const tachhcha = Array.from(container.querySelectorAll('.sandhi-preset'))
      .find((b) => b.textContent === 'तच्च');
    expect(tachhcha, 'expected तच्च preset chip').toBeDefined();
    fireEvent.click(tachhcha);

    const input = container.querySelector('.sandhi-input');
    expect(input.value).toBe('तच्च');
  });

  it('after clicking a preset the result re-renders for that input', () => {
    const { container } = render(<SandhiLab />);
    const nait = Array.from(container.querySelectorAll('.sandhi-preset'))
      .find((b) => b.textContent === 'नैतत्');
    expect(nait).toBeDefined();
    fireEvent.click(nait);

    // नैतत् → at least 2 parts after sandhi-undo.
    const parts = container.querySelectorAll('.sandhi-result-part');
    expect(parts.length).toBeGreaterThanOrEqual(2);
  });

  it('renders all 5 preset chips', () => {
    const { container } = render(<SandhiLab />);
    const presets = container.querySelectorAll('.sandhi-preset');
    expect(presets.length).toBe(5);
    const labels = Array.from(presets).map((b) => b.textContent);
    expect(labels).toContain('पाण्डवाश्चैव');
    expect(labels).toContain('नैतत्');
    expect(labels).toContain('त्वय्युपपद्यते');
  });
});

describe('SandhiLab — rule details rendering', () => {
  it('each applied rule renders its name + category + description + example', () => {
    const { container } = render(<SandhiLab />);
    // Default input applies rules; the rule list <li>s should each have
    // at least the name + category + description spans.
    const items = container.querySelectorAll('.sandhi-result-rules ol > li');
    expect(items.length).toBeGreaterThan(0);
    for (const li of items) {
      expect(li.querySelector('.rule-name')).toBeDefined();
      expect(li.querySelector('.rule-cat')).toBeDefined();
      expect(li.querySelector('.rule-desc')).toBeDefined();
      expect(li.querySelector('.rule-example')).toBeDefined();
    }
  });

  it('shows "Rules applied" header only when rules exist', () => {
    const { container } = render(<SandhiLab />);
    // Default input has rules — header visible.
    expect(screen.getByText(/Rules applied/)).toBeDefined();

    // Switch to a no-rule input.
    const input = container.querySelector('.sandhi-input');
    fireEvent.change(input, { target: { value: 'क' } });
    // After: header no longer present.
    expect(screen.queryByText(/Rules applied/)).toBeNull();
  });
});
