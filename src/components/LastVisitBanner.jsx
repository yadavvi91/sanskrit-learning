import { useEffect, useState } from 'react';

const STORAGE_KEY = 'lastVisitAt';
const STALE_THRESHOLD_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export default function LastVisitBanner({ onOpenPrimer }) {
  const [show, setShow] = useState(false);
  const [daysAway, setDaysAway] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    let last;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      last = stored ? Number(stored) : null;
    } catch {
      last = null;
    }
    const now = Date.now();
    if (last == null || Number.isNaN(last)) {
      setIsFirstVisit(true);
      setShow(true);
    } else {
      const diff = now - last;
      if (diff > STALE_THRESHOLD_MS) {
        setDaysAway(Math.round(diff / (24 * 60 * 60 * 1000)));
        setShow(true);
      }
    }

    const updateLastVisit = () => {
      try {
        window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {/* ignore */}
    };
    window.addEventListener('beforeunload', updateLastVisit);
    return () => window.removeEventListener('beforeunload', updateLastVisit);
  }, []);

  function dismiss() {
    setShow(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {/* ignore */}
  }

  if (!show) return null;

  return (
    <div className="last-visit-banner" role="status">
      <span className="banner-icon">📜</span>
      <span className="banner-msg">
        {isFirstVisit
          ? 'First time here? Open the Primer for a 2-minute orient.'
          : `It's been ${daysAway} day${daysAway === 1 ? '' : 's'} — open the Primer for a quick refresher?`}
      </span>
      <div className="banner-actions">
        <button type="button" className="banner-btn-primary" onClick={() => { onOpenPrimer?.(); dismiss(); }}>
          Open Primer
        </button>
        <button type="button" className="banner-btn-secondary" onClick={dismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
