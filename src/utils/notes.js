// Per-verse free-form notes — localStorage-keyed by `chapter.verse`.
// Mirrors the storage style of src/utils/srs.js: try/catch on every read so
// stale localStorage data, JSON parse errors, or storage-disabled environments
// degrade gracefully to "no notes" rather than crashing the verse view.

const STORE_KEY = 'verse_notes_v1';

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(store) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {/* ignore quota / disabled */}
}

const verseKey = (chapter, verse) => `${chapter}.${verse}`;

export function getNote(chapter, verse) {
  return readStore()[verseKey(chapter, verse)] ?? '';
}

export function setNote(chapter, verse, text) {
  const store = readStore();
  const key = verseKey(chapter, verse);
  if (text == null || text === '') {
    delete store[key];
  } else {
    store[key] = text;
  }
  writeStore(store);
}

export function getAllNotes() {
  return readStore();
}

// For verseSearch (slice 4) — a flat list of [verseRef, text] pairs.
export function listAllNotes() {
  return Object.entries(readStore()).map(([key, text]) => {
    const [chapter, verse] = key.split('.').map(Number);
    return { chapter, verse, text };
  });
}

export function clearAllNotes() {
  writeStore({});
}
