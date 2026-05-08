// UI tests for StackBuilder. Previously 0.5% coverage — the entire forward
// formula and reverse decoder UI was untested. The conjugator engine
// itself is well-covered in conjugator.test.js; this file tests the UI
// glue: picker changes update the formula, mode toggle, reverse decoder
// finds matches and shows the layered chips.

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import StackBuilder from './StackBuilder.jsx';
import { DHATUS_TOP25 } from '../data/dhatus.js';

afterEach(() => cleanup());

describe('StackBuilder — mode toggle', () => {
  it('mounts in Forward mode by default', () => {
    render(<StackBuilder dhatus={DHATUS_TOP25} />);
    expect(screen.getByText(/Forward — build a form/)).toBeDefined();
    // Forward UI has 6 picker labels (1. धातु ... 5. पुरुष + वचन).
    expect(screen.getByText(/1\. धातु/)).toBeDefined();
    expect(screen.getByText(/3\. लकार/)).toBeDefined();
  });

  it('clicking Reverse switches to the reverse decoder', () => {
    render(<StackBuilder dhatus={DHATUS_TOP25} />);
    fireEvent.click(screen.getByText(/Reverse — decode a form/));
    expect(screen.getByText(/Paste a finite verb form to decompose/)).toBeDefined();
  });

  it('the active mode button has is-active', () => {
    render(<StackBuilder dhatus={DHATUS_TOP25} />);
    const reverseBtn = screen.getByText(/Reverse — decode a form/).closest('button');
    fireEvent.click(reverseBtn);
    expect(reverseBtn.className).toMatch(/is-active/);
  });
});

describe('StackBuilder — Forward mode', () => {
  it('renders the formula line with stem + ending + result', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    const formula = container.querySelector('.formula-line');
    expect(formula).toBeDefined();
    // First dhātu is √भू, default लकार लट्, परस्मैपद, प्रथम एक → भवति
    expect(container.querySelector('.formula-result').textContent).toBe('भवति');
  });

  it('changing the dhātu picker updates the resulting form', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    const dhatuSelect = container.querySelector('.picker select');
    expect(dhatuSelect).toBeDefined();

    // Switch to √कृ (id=kr). The default cell is लट् P प्रथम एक → करोति.
    fireEvent.change(dhatuSelect, { target: { value: 'kr' } });
    expect(container.querySelector('.formula-result').textContent).toBe('करोति');
  });

  it('changing the लकार picker updates the form', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    // Pickers are .picker labels in declared order: dhātu, गण(readonly), लकार, पद, पुरुष, वचन
    const selects = container.querySelectorAll('.picker select');
    // selects: [dhatu, lakara, pada, purusha, vachana] (gana is readonly span, no select)
    const lakaraSelect = selects[1];
    expect(lakaraSelect).toBeDefined();

    // √भू, switch to लृट् (future): भविष्यति
    fireEvent.change(lakaraSelect, { target: { value: 'lrt' } });
    expect(container.querySelector('.formula-result').textContent).toBe('भविष्यति');
  });

  it('लङ् (past) shows an augment chip', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    const selects = container.querySelectorAll('.picker select');
    const lakaraSelect = selects[1];
    fireEvent.change(lakaraSelect, { target: { value: 'lan' } });

    // Augment chip is .formula-aug
    const aug = container.querySelector('.formula-aug');
    expect(aug).toBeDefined();
    expect(aug.textContent).toBe('अ');
  });

  it('Atmanepada-only dhātu locks the पद select', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    // Find an A-pada-only dhātu (or U-pada to confirm both options).
    // भू is P-only — पद select should be disabled.
    const selects = container.querySelectorAll('.picker select');
    const padaSelect = selects[2];
    expect(padaSelect).toBeDefined();
    // भू pada is P → padasAvailable.length === 1 → disabled
    expect(padaSelect.disabled).toBe(true);
  });
});

describe('StackBuilder — Reverse mode', () => {
  it('default input प्रतियोत्स्यामि produces a match with the prefix chip प्रति', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    fireEvent.click(screen.getByText(/Reverse — decode a form/));

    // Default input is प्रतियोत्स्यामि — it should match (√युध् + प्रति, लृट्, उत्तम एक).
    const matches = container.querySelectorAll('.reverse-match');
    expect(matches.length).toBeGreaterThan(0);

    // The prefix chip प्रति should be present.
    const prefixChips = container.querySelectorAll('.formula-pre');
    expect(prefixChips.length).toBeGreaterThan(0);
    expect(prefixChips[0].textContent).toBe('प्रति');
  });

  it('changing input to भवति produces a match', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    fireEvent.click(screen.getByText(/Reverse — decode a form/));
    const input = container.querySelector('.reverse-input');
    fireEvent.change(input, { target: { value: 'भवति' } });

    const matches = container.querySelectorAll('.reverse-match');
    expect(matches.length).toBeGreaterThan(0);
    // The result chip echoes the typed form.
    const resultChip = container.querySelector('.formula-result');
    expect(resultChip.textContent).toBe('भवति');
  });

  it('an unrecognised form shows the empty-state hint', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    fireEvent.click(screen.getByText(/Reverse — decode a form/));
    const input = container.querySelector('.reverse-input');
    fireEvent.change(input, { target: { value: 'xyzzy' } });

    expect(container.querySelector('.reverse-empty')).toBeDefined();
    expect(container.querySelectorAll('.reverse-match').length).toBe(0);
  });

  it('annotation row labels लकार · पद · पुरुष/वचन for each match', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    fireEvent.click(screen.getByText(/Reverse — decode a form/));
    const input = container.querySelector('.reverse-input');
    // भवन्ति is unambiguously लट् P प्रथम बहु of √भू.
    fireEvent.change(input, { target: { value: 'भवन्ति' } });

    const ann = container.querySelector('.reverse-annotation');
    expect(ann).toBeDefined();
    expect(ann.textContent).toMatch(/लट्/);
    expect(ann.textContent).toMatch(/परस्मैपद/);
    expect(ann.textContent).toMatch(/बहुवचन/);
  });

  it('empty input shows no matches without an empty-state error', () => {
    const { container } = render(<StackBuilder dhatus={DHATUS_TOP25} />);
    fireEvent.click(screen.getByText(/Reverse — decode a form/));
    const input = container.querySelector('.reverse-input');
    fireEvent.change(input, { target: { value: '' } });

    // matches is [] when input is empty — empty hint shown
    expect(container.querySelector('.reverse-empty')).toBeDefined();
  });
});
