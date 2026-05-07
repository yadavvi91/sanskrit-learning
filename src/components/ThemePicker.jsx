import { useEffect, useState } from 'react';
import {
  PALETTES, applyPalette, getStoredPaletteId, savePaletteId,
} from '../data/palettes.js';

// Compact theme switcher: row of 5 swatches with the palette's name on hover.
// Lives at top-right of the masthead so it's always reachable.
export default function ThemePicker() {
  const [paletteId, setPaletteId] = useState(() => getStoredPaletteId());

  useEffect(() => {
    applyPalette(paletteId);
    savePaletteId(paletteId);
  }, [paletteId]);

  return (
    <div className="theme-picker" aria-label="Theme">
      <span className="theme-picker-label">Theme</span>
      <div className="theme-picker-row">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`theme-swatch ${paletteId === p.id ? 'is-active' : ''}`}
            onClick={() => setPaletteId(p.id)}
            title={`${p.name}\n${p.blurb}`}
            aria-label={p.name}
          >
            <span className="swatch-bg" style={{ background: p.swatches[0] }} />
            <span className="swatch-fg" style={{ background: p.swatches[1] }} />
            <span className="swatch-accent" style={{ background: p.swatches[2] }} />
            <span className="swatch-name">{p.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
