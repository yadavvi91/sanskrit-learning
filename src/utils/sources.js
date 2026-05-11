// External-source URL builders. The user's stated workflow uses
// holy-bhagavad-gita.org as the canonical reference site.

export function holyBhagavadGitaUrl(chapter, verse) {
  return `https://www.holy-bhagavad-gita.org/chapter/${chapter}/verse/${verse}`;
}

// Open-canonical alternates worth knowing about. Not currently surfaced
// in the UI but kept here so a future "open in" dropdown can reference
// them without re-deriving the URL shape.
export const SOURCE_LINKS = {
  'holy-bhagavad-gita': {
    name: 'holy-bhagavad-gita.org',
    blurb: 'Verse + transliteration + word-by-word + multiple translations + commentaries (Ramanuja, Shankara, Madhva, etc.)',
    url: holyBhagavadGitaUrl,
  },
  'gretil': {
    name: 'GRETIL',
    blurb: 'Göttingen Register of Electronic Texts in Indian Languages — academic Sanskrit text archive',
    url: () => 'http://gretil.sub.uni-goettingen.de/gretil/corpustei/transformations/html/sa_bhagavadgItA.htm',
  },
  'sanskritlibrary': {
    name: 'sanskritlibrary.org',
    blurb: 'Word-by-word grammatical analysis. Useful for verifying samāsa / sandhi calls.',
    url: (chapter, verse) => `https://sanskritlibrary.org/integratedScripts/scriptHelp.html?text=Bhagavadgita&loc=${chapter}.${verse}`,
  },
};
