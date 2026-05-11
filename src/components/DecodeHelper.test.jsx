// UI tests for DecodeHelper. The autoDecode/stubToJs engine is fully
// covered by decodeHelper.test.js; this file covers the UI: input change,
// chapter/verse number inputs, stub preview, copy button.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import DecodeHelper from './DecodeHelper.jsx';

afterEach(() => cleanup());

describe('DecodeHelper — initial render', () => {
  it('mounts with the सङ्केतकः title and the default Gītā 1.1 input', () => {
    const { container } = render(<DecodeHelper />);
    expect(screen.getByText('सङ्केतकः')).toBeDefined();
    expect(container.querySelector('.decode-input').value)
      .toBe('मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय');
  });

  it('renders chapter and verse number inputs defaulting to 1, 1', () => {
    const { container } = render(<DecodeHelper />);
    const numInputs = container.querySelectorAll('.decode-num');
    expect(numInputs.length).toBe(2);
    expect(numInputs[0].value).toBe('1');
    expect(numInputs[1].value).toBe('1');
  });

  it('shows the stub preview for the default input', () => {
    const { container } = render(<DecodeHelper />);
    // The default input parses → preview is visible.
    expect(container.querySelector('.decode-preview')).toBeDefined();
    // पदच्छेद section
    expect(screen.getByText(/पदच्छेद \(\d+ words\)/)).toBeDefined();
  });

  it('renders the JS output block with the paste-ready stub', () => {
    const { container } = render(<DecodeHelper />);
    expect(container.querySelector('.decode-js')).toBeDefined();
    // The output should reference verses.js conventions.
    expect(container.querySelector('.decode-js').textContent.length).toBeGreaterThan(50);
  });
});

describe('DecodeHelper — input changes', () => {
  it('typing a new mūla string updates the padaccheda preview', () => {
    const { container } = render(<DecodeHelper />);
    const textarea = container.querySelector('.decode-input');
    const beforePadas = container.querySelectorAll('.decode-pada').length;

    // Replace with a longer/different verse — 2.3 partial
    fireEvent.change(textarea, { target: { value: 'क्लैब्यं मा स्म गमः पार्थ' } });

    // The pada list should re-render (different word count)
    const afterPadas = container.querySelectorAll('.decode-pada').length;
    expect(afterPadas).toBeGreaterThan(0);
    // Different length is the most we can reliably assert without
    // reproducing the engine here.
    expect(afterPadas).not.toBe(beforePadas);
  });

  it('changing chapter input updates the JS output block', () => {
    const { container } = render(<DecodeHelper />);
    const numInputs = container.querySelectorAll('.decode-num');
    const beforeJs = container.querySelector('.decode-js').textContent;

    fireEvent.change(numInputs[0], { target: { value: '2' } });

    const afterJs = container.querySelector('.decode-js').textContent;
    expect(afterJs).not.toBe(beforeJs);
    // Should now reference chapter 2.
    expect(afterJs).toMatch(/chapter:\s*2/);
  });

  it('changing verse input updates the JS output block', () => {
    const { container } = render(<DecodeHelper />);
    const numInputs = container.querySelectorAll('.decode-num');
    fireEvent.change(numInputs[1], { target: { value: '47' } });

    const js = container.querySelector('.decode-js').textContent;
    expect(js).toMatch(/verse:\s*47/);
  });
});

describe('DecodeHelper — finite verb signal detection', () => {
  it('input containing भवति shows a क्रिया section with the लट् candidate', () => {
    const { container } = render(<DecodeHelper />);
    const textarea = container.querySelector('.decode-input');
    fireEvent.change(textarea, { target: { value: 'सः भवति' } });

    const fvSection = Array.from(container.querySelectorAll('.decode-section'))
      .find((s) => s.querySelector('h4')?.textContent.includes('क्रिया'));
    expect(fvSection, 'expected a क्रिया (finite verb) section for "सः भवति"').toBeDefined();
    const items = fvSection.querySelectorAll('.decode-fv');
    expect(items.length).toBeGreaterThan(0);
    // The component renders fv.lakara as the raw key ("lat"), not the deva label.
    expect(fvSection.textContent).toMatch(/\blat\b/);
    // signal hint surfaces too
    expect(fvSection.textContent).toMatch(/present|signal/);
  });
});

describe('DecodeHelper — copy button', () => {
  it('clicking Copy invokes navigator.clipboard.writeText with the JS stub', async () => {
    // Stub navigator.clipboard.writeText
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    const { container } = render(<DecodeHelper />);
    const copyBtn = container.querySelector('.decode-copy');
    expect(copyBtn).toBeDefined();
    fireEvent.click(copyBtn);

    // Allow the await to flush
    await new Promise((r) => setTimeout(r, 0));

    expect(writeText).toHaveBeenCalled();
    // The argument should be the full JS stub.
    const arg = writeText.mock.calls[0][0];
    expect(typeof arg).toBe('string');
    expect(arg.length).toBeGreaterThan(50);
  });

  it('after a successful copy, button label switches to "✓ Copied"', async () => {
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    const { container } = render(<DecodeHelper />);
    const copyBtn = container.querySelector('.decode-copy');
    expect(copyBtn.textContent).toBe('Copy');

    fireEvent.click(copyBtn);
    // The setCopied(true) happens after the awaited writeText resolves.
    await new Promise((r) => setTimeout(r, 0));

    expect(copyBtn.textContent).toBe('✓ Copied');
  });
});

describe('DecodeHelper — empty input edge case', () => {
  it('with empty textarea, the stub preview hides', () => {
    const { container } = render(<DecodeHelper />);
    const textarea = container.querySelector('.decode-input');
    fireEvent.change(textarea, { target: { value: '' } });

    // autoDecode('') → null → preview block conditional renders nothing
    expect(container.querySelector('.decode-preview')).toBeNull();
    expect(container.querySelector('.decode-output')).toBeNull();
  });
});
