import { describe, it, expect, beforeEach } from 'vitest';
import { getNote, setNote, listAllNotes, clearAllNotes, getAllNotes } from './notes.js';

describe('per-verse notes (localStorage)', () => {
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
    clearAllNotes();
  });

  it('getNote returns empty string when no note exists', () => {
    expect(getNote(1, 1)).toBe('');
  });

  it('setNote then getNote round-trips', () => {
    setNote(2, 4, 'Note about Bhīṣma being पूजार्ह');
    expect(getNote(2, 4)).toBe('Note about Bhīṣma being पूजार्ह');
  });

  it('setNote with empty string deletes the entry', () => {
    setNote(2, 4, 'something');
    setNote(2, 4, '');
    expect(getAllNotes()['2.4']).toBeUndefined();
  });

  it('setNote with null also deletes', () => {
    setNote(2, 4, 'something');
    setNote(2, 4, null);
    expect(getNote(2, 4)).toBe('');
  });

  it('multiple verses keep separate notes', () => {
    setNote(1, 1, 'A');
    setNote(2, 4, 'B');
    setNote(2, 5, 'C');
    expect(getNote(1, 1)).toBe('A');
    expect(getNote(2, 4)).toBe('B');
    expect(getNote(2, 5)).toBe('C');
  });

  it('listAllNotes returns flattened {chapter, verse, text}', () => {
    setNote(1, 1, 'A');
    setNote(2, 4, 'B');
    const list = listAllNotes();
    expect(list).toHaveLength(2);
    const a = list.find((n) => n.chapter === 1 && n.verse === 1);
    expect(a.text).toBe('A');
  });

  it('clearAllNotes empties the store', () => {
    setNote(1, 1, 'A');
    clearAllNotes();
    expect(listAllNotes()).toEqual([]);
  });
});

describe('notes corruption resilience', () => {
  it('returns empty when localStorage holds invalid JSON', () => {
    if (typeof globalThis.window === 'undefined') {
      const store = { verse_notes_v1: '{not valid json' };
      globalThis.window = {
        localStorage: {
          getItem: (k) => (k in store ? store[k] : null),
          setItem: (k, v) => { store[k] = String(v); },
          removeItem: (k) => { delete store[k]; },
        },
      };
    } else {
      window.localStorage.setItem('verse_notes_v1', '{not valid json');
    }
    expect(getNote(1, 1)).toBe('');
  });
});
