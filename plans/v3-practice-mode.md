# Plan — Sanskrit Learning v3: Practice Mode (SRS + "+1")

> **Renumbered v2 → v3.** The Primer (originally drafted as v3) ships first as v2 — re-entry safety should precede daily-practice machinery. See [v2-primer.md](v2-primer.md).

## Context

The Sanskrit Learning app currently *records* what's been learned (4 decoded verses, 23 patterns) but doesn't help the user *retain* it. To actually internalize Sanskrit, the user needs:

- **Spaced repetition** so previously-won patterns and verb forms surface again at increasing intervals (preventing the same loss-of-context that happened to the Feb 2023 Bibek Debroy notes).
- **The bvsiitm "+1" pedagogy** — *Known → +1 → Drill → Repeat* — so each session introduces exactly one new concept and drills everything earned so far.
- **A persistent ledger** of what's been studied, when, and how well — surviving browser cache clears, syncing easily across the Mac mini and MacBook Pro.

This v3 adds a **Practice** tab to the existing app, backed by a small Node + SQLite service running locally next to the Vite dev server.

## Decisions locked (from clarifying questions)

| Decision | Choice |
|---|---|
| Database location | **Local Node backend + `data/sanskrit.db` file on disk** (gitignored, syncable via iCloud/Dropbox) |
| MVP card types | **Form ID** + **Verse Anchor** (Pattern Recognition + Vibhakti Drill deferred to v4) |
| Source of truth for verse content | **`src/data/*.js` stays canonical**; DB only stores progress. `npm run seed` regenerates cards idempotently. |

Algorithm: **SM-2** (Anki classic) — simple, well-understood, ~50 lines, easy to test. FSRS deferred to v4 if needed.

## High-level architecture

```
┌────────────────────────────────────────────────┐
│ npm run dev   (concurrently runs both)         │
│                                                │
│  Vite (5173) ──── /api/* proxy ────► Express (3001)
│   │                                    │       │
│   ├─ Verse Journey                     ├─ routes/
│   ├─ Patterns Won                      │   ├─ sessions.js
│   └─ Practice  ◄── new tab             │   ├─ cards.js
│                                        │   └─ stats.js
│                                        ├─ db.js (better-sqlite3)
│                                        ├─ srs.js (SM-2 pure fn)
│                                        ├─ seed.js (reads src/data)
│                                        └─ migrations/001_init.sql
│                                                │
│                                       data/sanskrit.db  ← real file
└────────────────────────────────────────────────┘
```

`src/data/verses.js` and `src/data/patterns.js` are imported by both the React app (display) **and** by `server/seed.js` (card generation). One source of truth.

## SM-2 scheduler (`server/srs.js`)

Pure function: `nextSchedule(prev, rating, now) → next`.

```js
// rating: 1=Again, 2=Hard, 3=Good, 4=Easy
function nextSchedule({ ease, intervalDays, reps, lapses }, rating, now) {
  if (rating === 1) {                              // Again
    return {
      ease: Math.max(1.3, ease - 0.2),
      intervalDays: 0,                              // re-show in this session (~1 min)
      reps: 0,                                      // demote to learning
      lapses: lapses + 1,
      dueAt: addMinutes(now, 1),
    };
  }
  let nextInterval;
  if (reps === 0) nextInterval = 1;                // first pass
  else if (reps === 1) nextInterval = 6;
  else nextInterval = Math.round(intervalDays * ease);

  let nextEase = ease;
  if (rating === 2) nextEase = Math.max(1.3, ease - 0.15);   // Hard
  if (rating === 4) { nextEase = ease + 0.15; nextInterval = Math.round(nextInterval * 1.3); } // Easy

  return {
    ease: nextEase,
    intervalDays: nextInterval,
    reps: reps + 1,
    lapses,
    dueAt: addDays(now, nextInterval),
  };
}
```

Defaults for new card: `ease=2.5, intervalDays=0, reps=0, lapses=0`.

## The "+1" rule (`POST /api/sessions`)

```
1. Pull all cards where status='review' OR status='learning' AND due_at <= now,
   ordered by due_at ASC. Cap at MAX_REVIEWS (default 30).
2. Check sessions table: has any session today already introduced a new card?
   - If NO  → fetch the next card with status='new' (ordered by decode_index, then verse, then form),
              append it to the queue, mark this session's new_card_introduced_id.
   - If YES → no new card today. Reviews only.
3. Return { sessionId, cards: [...] }.
```

This composes SM-2 (controls *when* old cards reappear) with the "+1" gate (controls *that one new thing per day enters at all*).

## Card content

Cards are plain rows with `prompt_json` + `answer_json`. The frontend renders by `type`.

**Form ID** — one card per finite verb in each decoded verse. Source of truth: `verse.finiteVerbs[]` in `src/data/verses.js`.
```json
prompt: { "type":"form_id", "form":"अकुर्वत", "verseRef":"1.1" }
answer: { "root":"√कृ", "lakara":"लङ्", "purusha":"प्रथम",
          "vachana":"बहुवचन", "gloss":"they did" }
source_ref: "form_id:1.1:अकुर्वत"
```

**Verse Anchor** — one card per decoded verse. The full decode pipeline as a recall test.
```json
prompt: { "type":"verse_anchor", "mool":["line1","line2"], "verseRef":"2.4" }
answer: { "finiteVerb":"प्रतियोत्स्यामि", "anvaya":"...",
          "hindi":"...", "english":"..." }
source_ref: "verse_anchor:2.4"
```

`source_ref UNIQUE` lets `npm run seed` use `INSERT OR IGNORE` — idempotent. Editing a verse and re-seeding adds new cards without duplicating existing ones.

## Database schema (`server/migrations/001_init.sql`)

```sql
CREATE TABLE cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_ref TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('form_id','verse_anchor')),
  prompt_json TEXT NOT NULL,
  answer_json TEXT NOT NULL,
  verse_chapter INTEGER,
  verse_verse INTEGER,
  decode_index INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK(status IN ('new','learning','review','suspended'))
);

CREATE TABLE schedules (
  card_id INTEGER PRIMARY KEY REFERENCES cards(id) ON DELETE CASCADE,
  due_at TEXT NOT NULL,
  ease REAL NOT NULL DEFAULT 2.5,
  interval_days REAL NOT NULL DEFAULT 0,
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  last_reviewed_at TEXT
);

CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ended_at TEXT,
  new_card_introduced_id INTEGER REFERENCES cards(id),
  reviews_completed INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  session_id INTEGER REFERENCES sessions(id),
  reviewed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 4),
  duration_ms INTEGER,
  prev_interval_days REAL, new_interval_days REAL,
  prev_ease REAL, new_ease REAL
);

CREATE INDEX idx_schedules_due ON schedules(due_at);
CREATE INDEX idx_cards_status ON cards(status);
CREATE INDEX idx_reviews_card ON reviews(card_id);
```

## API surface

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/sessions` | Start a session. Returns `{ sessionId, cards, newCardIntroduced }`. |
| `POST` | `/api/cards/:id/review` | Body `{ rating, durationMs, sessionId }`. Inserts review, updates schedule, returns new schedule. Promotes status `new`→`learning`→`review`. |
| `PATCH` | `/api/sessions/:id/end` | Mark session ended; record `reviews_completed`. |
| `GET` | `/api/stats` | `{ totalCards, dueNow, dueToday, newRemaining, streakDays, lastReviewedAt }`. |

(No `POST /api/seed` endpoint — seeding is a CLI: `npm run seed`.)

## Frontend changes

| File | Action |
|---|---|
| [src/App.jsx](src/App.jsx) | Add a third tab: `Practice`. Add a small "X due" badge in the masthead, fed by `GET /api/stats`. |
| `src/api.js` (new) | Tiny fetch wrapper: `startSession()`, `submitReview()`, `endSession()`, `getStats()`. |
| `src/components/Practice.jsx` (new) | Owns session state. "Start session" → fetch queue → render cards one-by-one → `SessionSummary` at end. |
| `src/components/CardPrompt.jsx` (new) | Switches on `card.type`: renders Form ID prompt or Verse Anchor prompt. Parchment-styled like existing components. |
| `src/components/CardAnswer.jsx` (new) | "Show answer" reveals `answer_json`. 4 rating buttons (Again / Hard / Good / Easy) → calls `submitReview`. Tracks `durationMs` from prompt-shown to rating-clicked. |
| `src/components/SessionSummary.jsx` (new) | End-of-session screen: N reviewed, new card introduced (if any), next due in X. |
| [vite.config.js](vite.config.js) | Add `server.proxy: { '/api': 'http://localhost:3001' }`. |
| [src/styles.css](src/styles.css) | Add styles for Practice components, reusing the existing `.parchment` palette / fonts. |

## Backend files (all new)

| File | Action |
|---|---|
| `server/index.js` | Express app: parse JSON, mount routes, listen on 3001. ~30 lines. |
| `server/db.js` | Open `data/sanskrit.db`, run any pending migrations from `server/migrations/*.sql`, expose `db` singleton. |
| `server/srs.js` | Pure `nextSchedule(prev, rating, now)`. No DB imports. |
| `server/srs.test.js` | Vitest specs: first-pass intervals (0→1, 1→6, n→round(n*ease)); ease floor 1.3; Again resets reps + bumps lapses; Easy multiplier 1.3. |
| `server/seed.js` | Imports `src/data/verses.js`. Generates Form ID + Verse Anchor cards. `INSERT OR IGNORE` on `source_ref`. Inserts a default schedule row per new card with `due_at = now`. CLI: `node server/seed.js`. |
| `server/routes/sessions.js` | `POST /` (create + queue), `PATCH /:id/end`. |
| `server/routes/cards.js` | `POST /:id/review`. Wraps SM-2 call + DB update + status promotion in a transaction. |
| `server/routes/stats.js` | `GET /` — single SQL query for the dashboard numbers. |
| `server/migrations/001_init.sql` | The DDL above. |

## `package.json` updates

- **deps:** `express`, `better-sqlite3`
- **devDeps:** `concurrently` (already have `vitest`)
- **scripts:**
  ```
  "dev:client": "vite",
  "dev:server": "node --watch server/index.js",
  "dev": "concurrently -n vite,api -c blue,green \"npm:dev:client\" \"npm:dev:server\"",
  "seed": "node server/seed.js",
  "test": "vitest run",
  "build": "vite build"
  ```

## `.gitignore` additions

```
data/
*.db
*.db-journal
```

## Verification (end-to-end smoke test)

1. `npm install` — pulls express, better-sqlite3, concurrently.
2. `npm run seed` — creates `data/sanskrit.db`, runs migrations, inserts cards. Expected: ~5 Form ID cards (अकुर्वत, गमः, उपपद्यते, उत्तिष्ठ, प्रतियोत्स्यामि, भुञ्जीय = 6 actually) + 4 Verse Anchor cards = ~10 cards.
3. `npm run test` — Vitest runs `server/srs.test.js`. All pass.
4. `npm run dev` — both Vite (5173) and Express (3001) come up. Open `http://localhost:5173`.
5. Click **Practice** tab. Click **Start session**. Expected: queue has 1 card (the +1 new card, since nothing is due yet on day 1).
6. Read prompt, click **Show answer**, click **Good**. Card disappears. Session summary shows "1 new introduced, next due in 1 day".
7. Inspect: `sqlite3 data/sanskrit.db "SELECT id, type, source_ref FROM cards"` — confirm rows. `SELECT * FROM reviews` — confirm one review row.
8. Refresh page; masthead badge shows `0 due today` (correct — that card is scheduled for tomorrow).
9. Hand-test on second visit (or set system clock forward) — same card reappears, plus a NEW +1 card.

## Open questions / future iterations (v4+)

- **Pattern Recognition + Vibhakti Drill cards** — schema already supports new types; just add a `type` value, a seed function, and a `CardPrompt` switch case.
- **Backup script** — `npm run db:backup` copies `data/sanskrit.db` to `~/Documents/sanskrit-learning-backups/sanskrit-YYYY-MM-DD.db`.
- **Sync between Mac mini and MacBook Pro** — easiest: keep `data/sanskrit.db` symlinked into iCloud Drive. No code change.
- **Streak tracking + heatmap** in the masthead, GitHub-contribution-style. The `reviews` table has every timestamp.
- **Pattern → Verse linking** in the existing Verse Journey — show "review due" dots on chapter grid cells.
- **FSRS migration** if SM-2 over- or under-schedules in practice. Replace `srs.js` only; schema unchanged.
