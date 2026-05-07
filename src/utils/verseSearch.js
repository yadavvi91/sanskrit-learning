// Search across the decoded corpus.
// Scans every searchable field on every verse + per-verse notes (from
// notes.js) + reference translation text. Returns ranked matches with
// short snippets.

import { VERSES } from '../data/verses.js';
import { getAllNotes } from './notes.js';

// Fields to scan, in display order. The 'label' is what the UI shows
// next to each match snippet so the user can tell where the hit landed.
const FIELDS = [
  { key: 'mool',          label: 'मूल',      kind: 'lines' },     // array of lines
  { key: 'padaccheda',    label: 'पदच्छेद', kind: 'words' },     // array of words
  { key: 'sandhiNotes',   label: 'सन्धि',  kind: 'lines' },
  { key: 'vibhaktiNotes', label: 'विभक्ति', kind: 'lines' },
  { key: 'keyFights',     label: 'विवेकः', kind: 'lines' },
  { key: 'anvaya',        label: 'अन्वय',   kind: 'string' },
  { key: 'hindi',         label: 'हिंदी',    kind: 'string' },
  { key: 'english',       label: 'English', kind: 'string' },
];

const SNIPPET_RADIUS = 30; // chars of context around the hit

function makeSnippet(haystack, needle) {
  const idx = haystack.toLowerCase().indexOf(needle.toLowerCase());
  if (idx === -1) return haystack.slice(0, 80);
  const start = Math.max(0, idx - SNIPPET_RADIUS);
  const end = Math.min(haystack.length, idx + needle.length + SNIPPET_RADIUS);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < haystack.length ? '…' : '';
  return prefix + haystack.slice(start, end) + suffix;
}

function searchField(needle, fieldKey, fieldKind, fieldValue, fieldLabel, hits) {
  const n = needle.toLowerCase();
  if (!fieldValue) return;

  if (fieldKind === 'string') {
    if (typeof fieldValue !== 'string') return;
    if (fieldValue.toLowerCase().includes(n)) {
      hits.push({ field: fieldKey, label: fieldLabel, snippet: makeSnippet(fieldValue, needle) });
    }
  } else if (fieldKind === 'lines') {
    for (const line of fieldValue) {
      if (typeof line === 'string' && line.toLowerCase().includes(n)) {
        hits.push({ field: fieldKey, label: fieldLabel, snippet: makeSnippet(line, needle) });
      }
    }
  } else if (fieldKind === 'words') {
    for (const word of fieldValue) {
      if (typeof word === 'string' && word.toLowerCase().includes(n)) {
        hits.push({ field: fieldKey, label: fieldLabel, snippet: word });
      }
    }
  }
}

function searchSamasNotes(needle, samasNotes, hits) {
  const n = needle.toLowerCase();
  for (const s of samasNotes ?? []) {
    const hay = `${s.compound} ${s.vigraha} ${s.type} ${s.gloss}`.toLowerCase();
    if (hay.includes(n)) {
      hits.push({
        field: 'samasNotes',
        label: 'समास',
        snippet: `${s.compound} = ${s.vigraha} (${s.type}) — ${s.gloss}`,
      });
    }
  }
}

function searchFiniteVerbs(needle, finiteVerbs, hits) {
  const n = needle.toLowerCase();
  for (const fv of finiteVerbs ?? []) {
    const hay = `${fv.form} ${fv.root} ${fv.lakara} ${fv.purusha} ${fv.vachana} ${fv.gloss}`.toLowerCase();
    if (hay.includes(n)) {
      hits.push({
        field: 'finiteVerbs',
        label: 'क्रिया',
        snippet: `${fv.form} — ${fv.root}, ${fv.lakara}, ${fv.purusha} ${fv.vachana} (${fv.gloss})`,
      });
    }
  }
}

function searchReferences(needle, references, hits) {
  if (!references) return;
  const n = needle.toLowerCase();
  for (const t of references.translations ?? []) {
    if ((t.text || '').toLowerCase().includes(n)) {
      hits.push({
        field: 'references',
        label: `${t.translator} ${t.year}`,
        snippet: makeSnippet(t.text, needle),
      });
    }
  }
  for (const c of references.commentaries ?? []) {
    const hay = `${c.sage} ${c.school} ${c.summary}`;
    if (hay.toLowerCase().includes(n)) {
      hits.push({
        field: 'references',
        label: `${c.sage} (${c.school})`,
        snippet: makeSnippet(c.summary, needle),
      });
    }
  }
}

export function searchVerses(query) {
  const needle = (query || '').trim();
  if (!needle) return [];

  const allNotes = getAllNotes();
  const out = [];

  for (const verse of VERSES) {
    const hits = [];

    for (const f of FIELDS) {
      searchField(needle, f.key, f.kind, verse[f.key], f.label, hits);
    }
    searchSamasNotes(needle, verse.samasNotes, hits);
    searchFiniteVerbs(needle, verse.finiteVerbs, hits);
    searchReferences(needle, verse.references, hits);

    // Per-verse notes from localStorage
    const noteText = allNotes[`${verse.chapter}.${verse.verse}`];
    if (noteText && noteText.toLowerCase().includes(needle.toLowerCase())) {
      hits.push({
        field: 'notes',
        label: 'My notes',
        snippet: makeSnippet(noteText, needle),
      });
    }

    if (hits.length > 0) {
      out.push({
        chapter: verse.chapter,
        verse: verse.verse,
        title: verse.title ?? null,
        hits,
      });
    }
  }

  // Rank by hit count desc, then by chapter.verse asc.
  out.sort((a, b) => b.hits.length - a.hits.length
    || a.chapter - b.chapter
    || a.verse - b.verse);

  return out;
}
