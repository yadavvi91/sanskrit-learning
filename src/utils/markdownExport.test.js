import { describe, it, expect, beforeEach } from 'vitest';
import { verseToMarkdown } from './markdownExport.js';
import { VERSES } from '../data/verses.js';

beforeEach(() => {
  if (typeof globalThis.window === 'undefined') {
    const store = {};
    globalThis.window = {
      localStorage: {
        getItem: (k) => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
      },
    };
  }
  window.localStorage.removeItem('verse_notes_v1');
});

describe('verseToMarkdown', () => {
  it('renders a verse heading with chapter, verse, title', () => {
    const md = verseToMarkdown(VERSES[0]);
    expect(md).toContain('## Gītā 1.1');
    expect(md).toContain('The anchor verse');
  });

  it('includes the source link to holy-bhagavad-gita.org', () => {
    const md = verseToMarkdown(VERSES[0]);
    expect(md).toContain('holy-bhagavad-gita.org/chapter/1/verse/1');
  });

  it('quotes the mool lines as a markdown blockquote', () => {
    const md = verseToMarkdown(VERSES[0]);
    expect(md).toMatch(/> धर्मक्षेत्रे/);
  });

  it('renders samas notes as a structured bulleted list', () => {
    const md = verseToMarkdown(VERSES[0]);
    expect(md).toMatch(/\*\*धर्मक्षेत्रे\*\* = धर्मस्य क्षेत्रम्/);
  });

  it('renders finite verbs with all 5 layers', () => {
    const md = verseToMarkdown(VERSES[0]);
    expect(md).toMatch(/\*\*अकुर्वत\*\* — √कृ, लङ्, प्रथम बहुवचन/);
  });

  it('includes references — translations + commentaries', () => {
    const md = verseToMarkdown(VERSES[0]);
    expect(md).toContain('### Translations');
    expect(md).toContain('Edwin Arnold');
    expect(md).toContain('### Commentary positions');
    expect(md).toContain('Shankara');
    expect(md).toContain('Ramanuja');
  });

  it('includes user notes when present', () => {
    window.localStorage.setItem('verse_notes_v1', JSON.stringify({
      '1.1': 'My personal note here.',
    }));
    const md = verseToMarkdown(VERSES[0]);
    expect(md).toContain('### My notes');
    expect(md).toContain('My personal note here.');
  });

  it('omits the My notes section when no notes exist', () => {
    const md = verseToMarkdown(VERSES[0]);
    expect(md).not.toContain('### My notes');
  });

  it('preserves the canonical pipeline order: मूल → पदच्छेद → सन्धि → समास → क्रिया → विभक्ति → विवेकः → अन्वय → हिंदी → English', () => {
    const md = verseToMarkdown(VERSES[0]);
    const order = ['**मूल:**', '**पदच्छेद:**', '**सन्धि:**', '**समास:**', '**क्रिया', '**विभक्ति:**', '**विवेकः', '**अन्वय:**', '**हिंदी:**', '**English:**'];
    let lastIdx = -1;
    for (const marker of order) {
      const idx = md.indexOf(marker);
      if (idx === -1) continue; // not all sections present in every verse
      expect(idx).toBeGreaterThan(lastIdx);
      lastIdx = idx;
    }
  });

  it('output ends with a single trailing newline', () => {
    const md = verseToMarkdown(VERSES[0]);
    expect(md).toMatch(/\n$/);
    expect(md).not.toMatch(/\n\n$/);
  });
});
