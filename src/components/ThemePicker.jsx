import { useEffect, useMemo, useRef, useState } from 'react';
import {
  PALETTES, PALETTE_GROUPS, applyPalette, getStoredPaletteId, savePaletteId,
} from '../data/palettes.js';

// Collapsed by default — single icon button in the masthead corner.
// Click to open a small popover with the 5 swatches.
// Closes on outside-click and Escape.
export default function ThemePicker() {
  const [paletteId, setPaletteId] = useState(() => getStoredPaletteId());
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    applyPalette(paletteId);
    savePaletteId(paletteId);
  }, [paletteId]);

  useEffect(() => {
    if (!open) return;
    function close(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
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

  const active = PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0];

  return (
    <div className="theme-picker" ref={wrapRef}>
      <button
        type="button"
        className="theme-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Theme: ${active.name}. Click to change.`}
        title={`Theme: ${active.name}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="trigger-swatch" style={{ background: active.swatches[0] }} />
        <span className="trigger-swatch" style={{ background: active.swatches[1] }} />
        <span className="trigger-swatch" style={{ background: active.swatches[2] }} />
      </button>

      {open && (
        <div className="theme-popover" role="dialog" aria-label="Pick a theme">
          <div className="theme-popover-label">Theme · {PALETTES.length} options</div>
          {PALETTE_GROUPS.map((g) => {
            const inGroup = PALETTES.filter((p) => p.group === g.id);
            if (inGroup.length === 0) return null;
            return (
              <ThemeGroup
                key={g.id}
                group={g}
                palettes={inGroup}
                activeId={paletteId}
                onPick={setPaletteId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function ThemeGroup({ group, palettes, activeId, onPick }) {
  const containsActive = useMemo(
    () => palettes.some((p) => p.id === activeId),
    [palettes, activeId]
  );
  // Default-expanded only for the group containing the active palette;
  // all others collapsed so the popover stays short.
  const [expanded, setExpanded] = useState(containsActive);

  return (
    <details className="theme-group" open={expanded} onToggle={(e) => setExpanded(e.target.open)}>
      <summary className="theme-group-summary">
        <span className="theme-group-label">{group.label}</span>
        <span className="theme-group-count">{palettes.length}</span>
      </summary>
      <div className="theme-group-body">
        {palettes.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`theme-swatch ${activeId === p.id ? 'is-active' : ''}`}
            onClick={() => onPick(p.id)}
            title={p.blurb}
          >
            <span className="swatch-bg" style={{ background: p.swatches[0] }} />
            <span className="swatch-fg" style={{ background: p.swatches[1] }} />
            <span className="swatch-accent" style={{ background: p.swatches[2] }} />
            <span className="swatch-name">{p.name}</span>
          </button>
        ))}
      </div>
    </details>
  );
}
