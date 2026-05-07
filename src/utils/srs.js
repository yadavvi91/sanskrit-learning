// SM-2 spaced repetition + card seeding + localStorage persistence.
// Pure functions where possible; storage layer is isolated so it can be swapped
// for a SQLite-backed server implementation later (per plans/v5-practice-mode.md)
// without touching the algorithm or the UI.

import { VERSES } from '../data/verses.js';
import { PATTERN_CATEGORIES } from '../data/patterns.js';
import { DHATUS_TOP25 } from '../data/dhatus.js';
import { conjugate } from './conjugator.js';
import { LAKARA_META } from './endings.js';

const STORE_KEY = 'srs_v1';
const DAY_MS = 24 * 60 * 60 * 1000;

// ─────────────────────────── Card seeding ───────────────────────────

export function seedCards() {
  const cards = [];

  // 1. form_id cards from verses' finite verbs
  for (const v of VERSES) {
    for (const fv of v.finiteVerbs || []) {
      cards.push({
        id: `verb-form-${v.chapter}.${v.verse}-${fv.form}`,
        type: 'form_id',
        prompt: `Identify the grammar of: ${fv.form}`,
        answer: `${fv.root}, ${fv.lakara}, ${fv.purusha} ${fv.vachana} — "${fv.gloss}"`,
        meta: { verseRef: `${v.chapter}.${v.verse}`, form: fv.form },
      });
    }
  }

  // 2. verse_anchor cards: padaccheda → which is the finite verb
  for (const v of VERSES) {
    const finiteForms = (v.finiteVerbs || []).map((f) => f.form);
    if (finiteForms.length === 0) continue;
    cards.push({
      id: `verse-anchor-${v.chapter}.${v.verse}`,
      type: 'verse_anchor',
      prompt: `In Gītā ${v.chapter}.${v.verse}: ${(v.padaccheda || []).join(' | ')} — which is the finite verb?`,
      answer: finiteForms.join(' / '),
      meta: { verseRef: `${v.chapter}.${v.verse}` },
    });
  }

  // 3. pattern_recall cards from patterns.js
  for (const cat of PATTERN_CATEGORIES) {
    for (const p of cat.patterns) {
      cards.push({
        id: `pattern-${cat.id}-${p.name}`,
        type: 'pattern_recall',
        prompt: `What does the pattern "${p.name}" mean?`,
        answer: p.meaning,
        meta: { category: cat.title, trigger: p.trigger },
      });
    }
  }

  // 4. dhatu_drill cards: 3sg present for top dhātus (the "canonical" form)
  for (const d of DHATUS_TOP25) {
    const pada = d.pada === 'A' ? 'A' : 'P';
    const form = conjugate(d, 'lat', pada, 'prathama', 'eka');
    if (!form) continue;
    cards.push({
      id: `dhatu-lat-3sg-${d.id}`,
      type: 'dhatu_drill',
      prompt: `Fill the cell: √${d.devanagari} (gana ${d.gana}, ${pada === 'P' ? 'परस्मैपद' : 'आत्मनेपद'}), लट् प्रथम एकवचन = ?`,
      answer: form,
      meta: { dhatuId: d.id, lakara: 'lat', purusha: 'prathama', vachana: 'eka', pada },
    });
  }

  // 5. lakara_signal cards: spotting signal recognition
  for (const [lakara, meta] of Object.entries(LAKARA_META)) {
    cards.push({
      id: `lakara-${lakara}`,
      type: 'lakara_signal',
      prompt: `Which लकार is signalled by: ${meta.signal}?`,
      answer: `${meta.devanagari} — ${meta.label}`,
      meta: { lakara },
    });
  }

  return cards;
}

// ─────────────────────────── SM-2 scheduling ───────────────────────────
// Quality 0-5 (5 = perfect, 0 = total fail). UI maps Again→2, Hard→3, Good→4, Easy→5.

export function nextSchedule(prev, quality, now = Date.now()) {
  const ef0 = prev?.easeFactor ?? 2.5;
  const reps = prev?.repetitions ?? 0;

  if (quality < 3) {
    return {
      easeFactor: Math.max(1.3, ef0),
      repetitions: 0,
      interval: 1,
      due: now + DAY_MS,
      lastReviewed: now,
      lastQuality: quality,
    };
  }

  // SM-2 ease update
  const ef1 = Math.max(1.3, ef0 + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  let interval;
  if (reps === 0) interval = 1;
  else if (reps === 1) interval = 6;
  else interval = Math.round((prev.interval ?? 1) * ef1);

  return {
    easeFactor: ef1,
    repetitions: reps + 1,
    interval,
    due: now + interval * DAY_MS,
    lastReviewed: now,
    lastQuality: quality,
  };
}

export const QUALITY = { Again: 2, Hard: 3, Good: 4, Easy: 5 };

// ─────────────────────────── Storage (localStorage) ───────────────────────────

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : { schedules: {}, reviewLog: [] };
  } catch {
    return { schedules: {}, reviewLog: [] };
  }
}

function writeStore(store) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {/* ignore */}
}

export function getScheduleFor(cardId) {
  return readStore().schedules[cardId] ?? null;
}

export function recordReview(cardId, quality) {
  const store = readStore();
  const prev = store.schedules[cardId] ?? null;
  const now = Date.now();
  const sched = nextSchedule(prev, quality, now);
  store.schedules[cardId] = sched;
  store.reviewLog.push({ cardId, quality, at: now });
  writeStore(store);
  return sched;
}

export function clearAllSchedules() {
  writeStore({ schedules: {}, reviewLog: [] });
}

// ─────────────────────────── Queue selection ───────────────────────────
// "+1" pedagogy: max one new card per session, plus all cards due today,
// plus a few "weak" (low ease) cards re-surfaced.

export function buildQueue(allCards, sessionLimit = 12) {
  const store = readStore();
  const now = Date.now();
  const queue = [];

  // 1. Due cards (already-seen, due now or earlier)
  const due = [];
  const newCards = [];
  for (const card of allCards) {
    const s = store.schedules[card.id];
    if (s == null) {
      newCards.push(card);
    } else if (s.due <= now) {
      due.push({ card, due: s.due, ease: s.easeFactor });
    }
  }

  // Sort due by oldest first, with low-ease tiebreaker
  due.sort((a, b) => a.due - b.due || a.ease - b.ease);
  for (const d of due) {
    if (queue.length >= sessionLimit) break;
    queue.push(d.card);
  }

  // 2. One new card per session ("+1")
  if (newCards.length > 0 && queue.length < sessionLimit) {
    queue.push(newCards[0]);
  }

  return queue;
}

export function summary(allCards) {
  const store = readStore();
  const now = Date.now();
  let learned = 0, due = 0, mastered = 0;
  for (const card of allCards) {
    const s = store.schedules[card.id];
    if (!s) continue;
    learned++;
    if (s.due <= now) due++;
    if (s.repetitions >= 3 && s.easeFactor >= 2.4) mastered++;
  }
  return {
    total: allCards.length,
    learned,
    due,
    mastered,
    new: allCards.length - learned,
    reviews: store.reviewLog?.length ?? 0,
  };
}
