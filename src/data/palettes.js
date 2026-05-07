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

  {
    id: 'indigo-birch',
    name: 'Indigo & Birch',
    blurb: 'Cool literary palette. Birch-pale page, deep indigo text, ochre accent, slate-blue secondary. EB Garamond + Cinzel.',
    swatches: ['#f5f0e6', '#1a2c4a', '#b87333', '#4a5878', '#8c8a82'],
    vars: {
      '--parchment':       '#f5f0e6',
      '--parchment-deep':  '#ebe5d5',
      '--parchment-edge':  '#dcd5c0',
      '--ink':             '#1a2c4a',
      '--ink-soft':        '#3a4868',
      '--ink-faint':       '#8c8a82',
      '--gold':            '#b87333',
      '--saffron':         '#c98a4a',
      '--saffron-soft':    '#e8d2b3',
      '--sage':            '#4a5878',
      '--sage-soft':       '#c2cbdb',
      '--rule':            '#cdc5b0',
      '--font-prose':      "'EB Garamond', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Cinzel', serif",
    },
  },

  {
    id: 'solarized-light',
    name: 'Solarized Light',
    blurb: 'Ethan Schoonover\'s Solarized — low-contrast cream-yellow base, dark cyan text, blue accent, olive secondary. Designed for long reading sessions; eye-strain-tested.',
    swatches: ['#fdf6e3', '#073642', '#b58900', '#268bd2', '#859900'],
    vars: {
      '--parchment':       '#fdf6e3',
      '--parchment-deep':  '#eee8d5',
      '--parchment-edge':  '#dccebd',
      '--ink':             '#073642',
      '--ink-soft':        '#586e75',
      '--ink-faint':       '#93a1a1',
      '--gold':            '#b58900',
      '--saffron':         '#cb4b16',
      '--saffron-soft':    '#fae5b3',
      '--sage':            '#859900',
      '--sage-soft':       '#cad9a1',
      '--rule':            '#d8cdb6',
      '--font-prose':      "'Source Serif 4', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Source Sans 3', 'Inter', sans-serif",
    },
  },

  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    blurb: 'Solarized\'s dark counterpart — deep base3 cyan panel, base2 cream text, same accent palette as Solarized Light. Same designed-for-long-reading feel, inverted.',
    swatches: ['#002b36', '#eee8d5', '#b58900', '#268bd2', '#859900'],
    isDark: true,
    vars: {
      '--parchment':       '#002b36',
      '--parchment-deep':  '#073642',
      '--parchment-edge':  '#0d4452',
      '--ink':             '#eee8d5',
      '--ink-soft':        '#93a1a1',
      '--ink-faint':       '#657b83',
      '--gold':            '#b58900',
      '--saffron':         '#cb4b16',
      '--saffron-soft':    '#5e4308',
      '--sage':            '#859900',
      '--sage-soft':       '#3e4a16',
      '--rule':            '#0d4452',
      '--font-prose':      "'Source Serif 4', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Source Sans 3', 'Inter', sans-serif",
    },
  },

  {
    id: 'midnight-sapphire',
    name: 'Midnight Sapphire (dark)',
    blurb: 'Deep navy panel, warm ivory text, gold accent, sapphire-blue secondary. Different mood from Forest: less library-night, more royal-manuscript-by-candle.',
    swatches: ['#0e1a2e', '#f0e9d2', '#d4a651', '#6b8aaa', '#7c7464'],
    isDark: true,
    vars: {
      '--parchment':       '#0e1a2e',
      '--parchment-deep':  '#182943',
      '--parchment-edge':  '#243b5d',
      '--ink':             '#f0e9d2',
      '--ink-soft':        '#c4bba1',
      '--ink-faint':       '#7c7464',
      '--gold':            '#d4a651',
      '--saffron':         '#e6b766',
      '--saffron-soft':    '#3a2c12',
      '--sage':            '#6b8aaa',
      '--sage-soft':       '#2c4361',
      '--rule':            '#2c3e5a',
      '--font-prose':      "'Cormorant Garamond', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Cinzel', serif",
    },
  },

  {
    id: 'tea-stained',
    name: 'Tea Stained',
    blurb: 'Aged-document palette. Tea-stained cream page, sepia text, tea-leaf-brown and umber accents. Reads like a hand-passed manuscript. Cormorant + Marcellus.',
    swatches: ['#f0e6cd', '#4a3220', '#8a4a2a', '#6b5a3e', '#a89a7c'],
    vars: {
      '--parchment':       '#f0e6cd',
      '--parchment-deep':  '#e3d6b5',
      '--parchment-edge':  '#d3c298',
      '--ink':             '#4a3220',
      '--ink-soft':        '#6b5a3e',
      '--ink-faint':       '#a89a7c',
      '--gold':            '#8a4a2a',
      '--saffron':         '#a85e36',
      '--saffron-soft':    '#deb88c',
      '--sage':            '#6b5a3e',
      '--sage-soft':       '#cbbd97',
      '--rule':            '#c5b388',
      '--font-prose':      "'Cormorant Garamond', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Marcellus', 'Cinzel', serif",
    },
  },

  {
    id: 'cobalt-cream',
    name: 'Cobalt & Cream',
    blurb: 'Vibrant miniature-painting palette. Cream page, deep cobalt text, vermillion accent, cobalt-blue secondary. Reminiscent of Pichwai / Mughal manuscript pigments.',
    swatches: ['#f5edd2', '#1d3557', '#c1272d', '#2a6f97', '#a08560'],
    vars: {
      '--parchment':       '#f5edd2',
      '--parchment-deep':  '#ece2bb',
      '--parchment-edge':  '#dccc94',
      '--ink':             '#1d3557',
      '--ink-soft':        '#3d537a',
      '--ink-faint':       '#a08560',
      '--gold':            '#c1272d',
      '--saffron':         '#d04a3a',
      '--saffron-soft':    '#f0c6b8',
      '--sage':            '#2a6f97',
      '--sage-soft':       '#bcd1de',
      '--rule':            '#cdb98a',
      '--font-prose':      "'Crimson Pro', 'Georgia', serif",
      '--font-deva':       "'Noto Serif Devanagari', serif",
      '--font-display':    "'Marcellus', 'Cinzel', serif",
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
