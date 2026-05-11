// Helper: scan a string for any known GLOSSARY term and wrap the first
// occurrence with a <Glossary> trigger. Returns an array of React nodes.
//
// Used by PatternsWon (pattern names) and could be applied elsewhere.
// Single-occurrence-only is intentional: avoids `?` clutter when a term
// repeats, and keeps the pattern name visually scannable.

import React from 'react';
import { GLOSSARY } from '../data/glossary.js';
import Glossary from '../components/Glossary.jsx';

// Sort terms by length descending so we prefer "विधिलिङ्" over "लिङ्" etc.
const TERMS_BY_LENGTH = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

export function withGlossary(text, onOpenPrimer) {
  if (!text || typeof text !== 'string') return text;

  for (const term of TERMS_BY_LENGTH) {
    const idx = text.indexOf(term);
    if (idx === -1) continue;

    const before = text.slice(0, idx);
    const after = text.slice(idx + term.length);

    return (
      <>
        {before}
        <Glossary term={term} onOpenPrimer={onOpenPrimer}>{term}</Glossary>
        {after}
      </>
    );
  }

  return text;
}
