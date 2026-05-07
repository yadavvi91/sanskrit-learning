// Five candidate themes. Each is a CSS-variable bundle that overrides :root.
// Apply by setting `data-theme="<id>"` on <html>.
//
// All five are designed to be readable (WCAG AA contrast on body text against
// the chosen background). Fonts are paired per palette to give each its own
// voice without breaking the Devanāgarī typesetting.

export const PALETTES = [
  {
    id: 'parchment',
    name: 'Parchment (current)',
    blurb: 'Warm manuscript aesthetic. Soft ivory page, ink-brown text, gold + saffron + sage accents. Cormorant Garamond for prose, Cinzel for small caps.',
    swatches: ['#faf4e8', '#1c1008', '#b5770d', '#c17f24', '#4a5e4a'],
    vars: {
      '--parchment':       '#faf4e8',
      '--parchment-deep':  '#f3eada',
      '--parchment-edge':  '#e8dcc1',
      '--ink':             '#1c1008',
      '--ink-soft':        '#4a3a2a',
      '--ink-faint':       '#8c7558',
      '--gold':            '#b5770d',
      '--saffron':         '#c17f24',
      '--saffron-soft':    '#e6c79a',
      '--sage':            '#4a5e4a',
      '--sage-soft':       '#cfd9c8',
      '--rule':            '#d6c5a0',
      '--font-prose':      "'Cormorant Garamond', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Cinzel', serif",
    },
  },

  {
    id: 'ink-vermillion',
    name: 'Ink & Vermillion',
    blurb: 'High-contrast manuscript edition. Off-white page, deep ink, vermillion red as the rubrication accent (like the red headings in classical editions), indigo for secondary. Spectral + EB Garamond.',
    swatches: ['#fafaf7', '#0e0e0e', '#c1272d', '#1d3557', '#6b6b6b'],
    vars: {
      '--parchment':       '#fafaf7',
      '--parchment-deep':  '#f3f3ec',
      '--parchment-edge':  '#e8e8df',
      '--ink':             '#0e0e0e',
      '--ink-soft':        '#3a3a3a',
      '--ink-faint':       '#777',
      '--gold':            '#c1272d',
      '--saffron':         '#a02123',
      '--saffron-soft':    '#f3d4d5',
      '--sage':            '#1d3557',
      '--sage-soft':       '#cfd8e5',
      '--rule':            '#d6d6d0',
      '--font-prose':      "'EB Garamond', 'Georgia', serif",
      '--font-deva':       "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
      '--font-display':    "'Spectral', 'Cinzel', serif",
    },
  },

  {
    id: 'sandalwood',
    name: 'Sandalwood & Saffron',
    blurb: 'Warm religious-manuscript palette. Sandalwood-yellow page, deep umber text, saffron and crimson accents, jade-green secondary. Crimson Pro + Marcellus for the display face.',
    swatches: ['#fdf6e3', '#3a2a1a', '#d97706', '#9a3324', '#3a6b58'],
    vars: {
      '--parchment':       '#fdf6e3',
      '--parchment-deep':  '#f5edd2',
      '--parchment-edge':  '#ebdfb6',
      '--ink':             '#3a2a1a',
      '--ink-soft':        '#5e4a36',
      '--ink-faint':       '#967c5a',
      '--gold':            '#9a3324',
      '--saffron':         '#d97706',
      '--saffron-soft':    '#f4d18a',
      '--sage':            '#3a6b58',
      '--sage-soft':       '#c5d8cd',
      '--rule':            '#dec894',
      '--font-prose':      "'Crimson Pro', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Marcellus', 'Cinzel', serif",
    },
  },

  {
    id: 'slate',
    name: 'Slate Scholar',
    blurb: 'Cool modern academic edition. Near-white page, slate-gray text, single warm-amber accent. Source Serif 4 for prose, Source Sans 3 for small caps. Reads like a contemporary critical edition.',
    swatches: ['#f7f7f4', '#1f2937', '#475569', '#b45309', '#94a3b8'],
    vars: {
      '--parchment':       '#f7f7f4',
      '--parchment-deep':  '#ececea',
      '--parchment-edge':  '#dededb',
      '--ink':             '#1f2937',
      '--ink-soft':        '#475569',
      '--ink-faint':       '#94a3b8',
      '--gold':            '#b45309',
      '--saffron':         '#d97706',
      '--saffron-soft':    '#fde2b9',
      '--sage':            '#475569',
      '--sage-soft':       '#cbd5e1',
      '--rule':            '#cbd5e1',
      '--font-prose':      "'Source Serif 4', 'Georgia', serif",
      '--font-deva':       "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
      '--font-display':    "'Source Sans 3', 'Inter', sans-serif",
    },
  },

  {
    id: 'forest',
    name: 'Forest & Bone (dark)',
    blurb: 'Dark-mode option for low-strain reading. Deep forest charcoal panel, warm ivory text, brass accent, sage-olive secondary. Reads like reading by lamplight. Cormorant + Cinzel inverted.',
    swatches: ['#1a1a18', '#f5efde', '#d4a017', '#8d9b6f', '#7a7a72'],
    isDark: true,
    vars: {
      '--parchment':       '#1a1a18',
      '--parchment-deep':  '#252522',
      '--parchment-edge':  '#33332e',
      '--ink':             '#f5efde',
      '--ink-soft':        '#c9c2ad',
      '--ink-faint':       '#7a7a72',
      '--gold':            '#d4a017',
      '--saffron':         '#e0a536',
      '--saffron-soft':    '#5a4419',
      '--sage':            '#8d9b6f',
      '--sage-soft':       '#3a463a',
      '--rule':            '#3f3f3a',
      '--font-prose':      "'Cormorant Garamond', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Cinzel', serif",
    },
  },
];

export const STORAGE_KEY = 'theme_v1';
export const DEFAULT_PALETTE = 'parchment';

export function applyPalette(id) {
  const palette = PALETTES.find((p) => p.id === id) ?? PALETTES[0];
  const root = document.documentElement;
  for (const [k, v] of Object.entries(palette.vars)) {
    root.style.setProperty(k, v);
  }
  root.dataset.theme = palette.id;
  return palette;
}

export function getStoredPaletteId() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_PALETTE;
  } catch {
    return DEFAULT_PALETTE;
  }
}

export function savePaletteId(id) {
  try { window.localStorage.setItem(STORAGE_KEY, id); } catch {/* ignore */}
}
