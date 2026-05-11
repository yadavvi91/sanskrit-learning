import { useEffect, useRef, useState } from 'react';
import { GLOSSARY } from '../data/glossary.js';

// Inline trigger: <Glossary term="कृदन्त">कृदन्त</Glossary>
// Renders the children + a small `?` superscript that toggles a popover.
export default function Glossary({ term, children, onOpenPrimer }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const entry = GLOSSARY[term];

  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function key(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  if (!entry) return <>{children ?? term}</>;

  return (
    <span className="glossary-wrap" ref={ref}>
      <span>{children ?? term}</span>
      <button
        type="button"
        className="glossary-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        title={`What is ${term}?`}
      >?</button>
      {open && (
        <span className="glossary-popover" role="dialog">
          <strong className="glossary-popover-term">{term}</strong>
          <span className="glossary-popover-def">{entry.shortDef}</span>
          {onOpenPrimer && entry.section && (
            <button
              type="button"
              className="glossary-popover-link"
              onClick={() => { onOpenPrimer(entry.section); setOpen(false); }}
            >
              open primer →
            </button>
          )}
        </span>
      )}
    </span>
  );
}
