import { useEffect, useMemo, useState } from 'react';
import { seedCards, buildQueue, recordReview, summary, QUALITY, clearAllSchedules } from '../utils/srs.js';

export default function Practice() {
  const allCards = useMemo(() => seedCards(), []);
  const [stats, setStats] = useState(() => summary(allCards));
  const [session, setSession] = useState(null); // { queue: [], idx: 0, answered: [] }
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setStats(summary(allCards));
  }, [allCards]);

  function startSession() {
    const queue = buildQueue(allCards, 12);
    if (queue.length === 0) {
      // No due cards — pull a sample of new ones
      const newOnes = allCards.slice(0, 8);
      setSession({ queue: newOnes, idx: 0, answered: [] });
    } else {
      setSession({ queue, idx: 0, answered: [] });
    }
    setShowAnswer(false);
  }

  function endSession() {
    setSession(null);
    setShowAnswer(false);
    setStats(summary(allCards));
  }

  function answer(quality) {
    if (!session) return;
    const card = session.queue[session.idx];
    recordReview(card.id, quality);
    const next = session.idx + 1;
    if (next >= session.queue.length) {
      endSession();
    } else {
      setSession({ ...session, idx: next, answered: [...session.answered, { cardId: card.id, quality }] });
      setShowAnswer(false);
    }
  }

  if (session) {
    const card = session.queue[session.idx];
    return (
      <div className="practice">
        <header className="practice-header">
          <h2 className="practice-title">अभ्यासः</h2>
          <span className="practice-progress">
            {session.idx + 1} / {session.queue.length}
          </span>
        </header>

        <div className="practice-card">
          <span className="practice-card-type">{cardTypeLabel(card.type)}</span>
          <p className="practice-prompt">{card.prompt}</p>

          {showAnswer ? (
            <>
              <div className="practice-answer">{card.answer}</div>
              <div className="practice-rating">
                <button type="button" className="rate-btn rate-again" onClick={() => answer(QUALITY.Again)}>
                  Again
                </button>
                <button type="button" className="rate-btn rate-hard"  onClick={() => answer(QUALITY.Hard)}>
                  Hard
                </button>
                <button type="button" className="rate-btn rate-good"  onClick={() => answer(QUALITY.Good)}>
                  Good
                </button>
                <button type="button" className="rate-btn rate-easy"  onClick={() => answer(QUALITY.Easy)}>
                  Easy
                </button>
              </div>
            </>
          ) : (
            <button type="button" className="practice-show" onClick={() => setShowAnswer(true)}>
              Show answer
            </button>
          )}
        </div>

        <button type="button" className="practice-end" onClick={endSession}>
          End session
        </button>
      </div>
    );
  }

  return (
    <div className="practice">
      <header className="practice-header">
        <h2 className="practice-title">अभ्यासः</h2>
        <p className="practice-sub">
          Spaced repetition + "+1" — Known → +1 new → Drill → Repeat. SM-2 algorithm.
        </p>
      </header>

      <section className="practice-stats">
        <Stat label="Total cards"       value={stats.total} />
        <Stat label="Learned"            value={stats.learned} />
        <Stat label="Due now"            value={stats.due} highlight />
        <Stat label="Mastered"          value={stats.mastered} />
        <Stat label="New (untouched)"  value={stats.new} />
        <Stat label="Reviews to date"  value={stats.reviews} />
      </section>

      <div className="practice-actions">
        <button type="button" className="practice-start" onClick={startSession}>
          Start session
        </button>
        <button
          type="button"
          className="practice-reset"
          onClick={() => {
            if (confirm('Reset all SRS schedules? Cannot be undone.')) {
              clearAllSchedules();
              setStats(summary(allCards));
            }
          }}
        >
          Reset all schedules
        </button>
      </div>

      <p className="practice-aside">
        Cards are seeded from your decoded verses (finite-verb identification, anchor-verb recognition),
        the patterns in <em>Patterns Won</em>, the top {25} dhātus' canonical 3sg present forms, and the
        5 लकार spotting-signals. As more verses + patterns + dhātus are added, the deck grows.
      </p>
      <p className="practice-aside">
        Schedules persist in <code>localStorage</code> on this device. Plan v5 ships a SQLite-backed
        backend for cross-device sync; the SM-2 algorithm and card-seeding logic above are the same
        either way.
      </p>
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div className={`stat ${highlight ? 'is-highlight' : ''}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function cardTypeLabel(type) {
  const labels = {
    form_id: 'Form-ID',
    verse_anchor: 'Verse anchor',
    pattern_recall: 'Pattern recall',
    dhatu_drill: 'Dhātu drill',
    lakara_signal: 'Lakāra signal',
  };
  return labels[type] ?? type;
}
