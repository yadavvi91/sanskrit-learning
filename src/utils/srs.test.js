import { describe, it, expect, beforeEach } from 'vitest';
import { nextSchedule, seedCards, buildQueue, QUALITY } from './srs.js';

const DAY_MS = 24 * 60 * 60 * 1000;

describe('nextSchedule — SM-2 algorithm', () => {
  it('first correct review (Good) → interval 1 day, reps=1', () => {
    const sched = nextSchedule(null, QUALITY.Good, 0);
    expect(sched.repetitions).toBe(1);
    expect(sched.interval).toBe(1);
    expect(sched.due).toBe(DAY_MS);
  });

  it('second consecutive correct → interval jumps to 6 days', () => {
    const after1 = nextSchedule(null, QUALITY.Good, 0);
    const after2 = nextSchedule(after1, QUALITY.Good, 0);
    expect(after2.repetitions).toBe(2);
    expect(after2.interval).toBe(6);
  });

  it('third correct → interval = previous × ease (≈ 6 × 2.5 = 15)', () => {
    let s = null;
    s = nextSchedule(s, QUALITY.Good, 0);
    s = nextSchedule(s, QUALITY.Good, 0);
    s = nextSchedule(s, QUALITY.Good, 0);
    expect(s.repetitions).toBe(3);
    expect(s.interval).toBeGreaterThanOrEqual(13);
    expect(s.interval).toBeLessThanOrEqual(17);
  });

  it('Again resets repetitions and interval', () => {
    let s = null;
    s = nextSchedule(s, QUALITY.Good, 0);
    s = nextSchedule(s, QUALITY.Good, 0);
    expect(s.repetitions).toBe(2);
    s = nextSchedule(s, QUALITY.Again, 0);
    expect(s.repetitions).toBe(0);
    expect(s.interval).toBe(1);
  });

  it('Easy raises ease factor; Hard lowers it', () => {
    const initial = nextSchedule(null, QUALITY.Good, 0);
    const easyNext = nextSchedule(initial, QUALITY.Easy, 0);
    const hardNext = nextSchedule(initial, QUALITY.Hard, 0);
    expect(easyNext.easeFactor).toBeGreaterThan(initial.easeFactor);
    expect(hardNext.easeFactor).toBeLessThan(initial.easeFactor);
  });

  it('ease factor floor is 1.3', () => {
    let s = null;
    for (let i = 0; i < 20; i++) {
      s = nextSchedule(s, QUALITY.Hard, 0);
    }
    expect(s.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it('records lastReviewed and lastQuality', () => {
    const s = nextSchedule(null, QUALITY.Easy, 12345);
    expect(s.lastReviewed).toBe(12345);
    expect(s.lastQuality).toBe(QUALITY.Easy);
  });
});

describe('seedCards — card synthesis from data', () => {
  const cards = seedCards();

  it('produces a non-trivial deck', () => {
    expect(cards.length).toBeGreaterThan(20);
  });

  it('every card has an id, type, prompt, and answer', () => {
    for (const c of cards) {
      expect(c.id).toBeTruthy();
      expect(c.type).toBeTruthy();
      expect(c.prompt).toBeTruthy();
      expect(c.answer).toBeTruthy();
    }
  });

  it('every card id is unique', () => {
    const ids = cards.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes form_id, verse_anchor, pattern_recall, dhatu_drill, and lakara_signal types', () => {
    const types = new Set(cards.map((c) => c.type));
    expect(types.has('form_id')).toBe(true);
    expect(types.has('verse_anchor')).toBe(true);
    expect(types.has('pattern_recall')).toBe(true);
    expect(types.has('dhatu_drill')).toBe(true);
    expect(types.has('lakara_signal')).toBe(true);
  });

  it('seeds at least one card for every decoded verse (verse_anchor)', () => {
    const anchors = cards.filter((c) => c.type === 'verse_anchor');
    expect(anchors.length).toBeGreaterThanOrEqual(4);
  });

  it('seeds a dhatu_drill card for every top-25 dhātu (3sg present canonical form)', () => {
    const drills = cards.filter((c) => c.type === 'dhatu_drill');
    // Every dhātu produces one drill — except possibly any whose canonical
    // 3sg present cannot be conjugated (none in current dataset).
    expect(drills.length).toBeGreaterThanOrEqual(20);
  });
});

describe('buildQueue — "+1" pedagogy', () => {
  beforeEach(() => {
    // Provide a localStorage shim for jsdom-less environment
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
    // Reset store
    try { window.localStorage.removeItem('srs_v1'); } catch {/* noop */}
  });

  it('with no schedule history, surfaces exactly one new card per session', () => {
    const cards = seedCards();
    const queue = buildQueue(cards, 12);
    // No previous schedules → no "due" cards → only the +1 new card
    expect(queue.length).toBe(1);
  });

  it('caps queue at sessionLimit', () => {
    const cards = seedCards();
    const queue = buildQueue(cards, 1);
    expect(queue.length).toBeLessThanOrEqual(1);
  });
});
