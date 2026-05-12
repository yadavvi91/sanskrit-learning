import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRIMER_SECTIONS } from '../data/primer.js';

// Tiny markdown-ish renderer: bold (**X**), italics (*X*), strong tags (<strong>) survive.
function renderInline(s) {
  // Already-HTML <strong> stays. Convert markdown bold/italic.
  const html = s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Primer() {
  const sectionRefs = useRef({});
  const location = useLocation();
  const navigate = useNavigate();
  const onOpenAtlas = (section) => navigate(`/atlas/${section}`);

  // Hash-based jump to section, e.g. /primer#sandhi.
  const jumpToSection = location.hash ? location.hash.replace(/^#/, '') : null;

  useEffect(() => {
    if (jumpToSection && sectionRefs.current[jumpToSection]) {
      sectionRefs.current[jumpToSection].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [jumpToSection]);

  return (
    <div className="primer">
      <header className="primer-header">
        <h2 className="primer-title">पुनरारम्भः</h2>
        <p className="primer-sub">
          Re-entry safety net — what to remember when coming back after weeks or months. Not a tutorial.
        </p>
      </header>

      <div className="primer-layout">
        <nav className="primer-toc" aria-label="Primer sections">
          {PRIMER_SECTIONS.map((sec) => (
            <a
              key={sec.id}
              href={`#primer-${sec.id}`}
              className="primer-toc-item"
              onClick={(e) => {
                e.preventDefault();
                sectionRefs.current[sec.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {sec.title}
            </a>
          ))}
        </nav>

        <div className="primer-content">
          {PRIMER_SECTIONS.map((sec) => (
            <section
              key={sec.id}
              id={`primer-${sec.id}`}
              ref={(el) => { sectionRefs.current[sec.id] = el; }}
              className="primer-section"
            >
              <h3 className="primer-section-title">
                {sec.title}
                <a
                  href={`#primer-${sec.id}`}
                  className="primer-section-anchor"
                  aria-label={`Link to "${sec.title}"`}
                  title="Copy link to this section"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.replaceState(null, '', `#primer-${sec.id}`);
                    sectionRefs.current[sec.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href).catch(() => {});
                    }
                  }}
                >
                  #
                </a>
              </h3>

              {Array.isArray(sec.body)
                ? sec.body.map((p, i) => <p key={i}>{renderInline(p)}</p>)
                : <p>{renderInline(sec.body)}</p>}

              {sec.table && (
                <table className="primer-table">
                  <thead>
                    <tr>
                      {sec.table.headers.map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => <td key={j}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {Array.isArray(sec.body2) && sec.body2.map((p, i) => <p key={`body2-${i}`}>{renderInline(p)}</p>)}

              {sec.aside && <p className="primer-aside">{renderInline(sec.aside)}</p>}

              {sec.linkToAtlas && onOpenAtlas && (
                <button
                  type="button"
                  className="primer-atlas-link"
                  onClick={() => onOpenAtlas(sec.linkToAtlas)}
                >
                  {sec.linkLabel || `Open Atlas → ${sec.linkToAtlas}`} ↗
                </button>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
