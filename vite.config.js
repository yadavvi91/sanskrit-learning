import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` is configured via the VITE_BASE env var so the same codebase
// builds for two surfaces:
//   - local dev (`npm run dev`):                base = '/'
//   - GitHub Pages (`npm run build:pages`):     base = '/sanskrit-learning/'
// HashRouter in src/main.jsx keys off `import.meta.env.BASE_URL` (the
// resolved version of this value) so deep-link reloads on Pages don't 404.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
