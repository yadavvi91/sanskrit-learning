import { describe, it, expect } from 'vitest';
import { holyBhagavadGitaUrl, SOURCE_LINKS } from './sources.js';

describe('holyBhagavadGitaUrl', () => {
  it('builds the canonical chapter/verse URL', () => {
    expect(holyBhagavadGitaUrl(2, 47)).toBe('https://www.holy-bhagavad-gita.org/chapter/2/verse/47');
  });

  it('handles chapter and verse 1', () => {
    expect(holyBhagavadGitaUrl(1, 1)).toBe('https://www.holy-bhagavad-gita.org/chapter/1/verse/1');
  });
});

describe('SOURCE_LINKS catalogue', () => {
  it('exposes holy-bhagavad-gita with a callable url(chapter, verse)', () => {
    const entry = SOURCE_LINKS['holy-bhagavad-gita'];
    expect(entry.name).toBe('holy-bhagavad-gita.org');
    expect(typeof entry.url).toBe('function');
    expect(entry.url(2, 4)).toContain('/chapter/2/verse/4');
  });

  it('exposes sanskritlibrary with a parameterised URL', () => {
    const url = SOURCE_LINKS['sanskritlibrary'].url(2, 47);
    expect(url).toContain('Bhagavadgita');
    expect(url).toContain('2.47');
  });
});
