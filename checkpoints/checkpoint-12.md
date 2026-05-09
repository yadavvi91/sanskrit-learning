# Checkpoint v12 — Slice 9: React Router (BrowserRouter) + 10 routing tests

**Date:** 2026-05-08
**Branch:** `implement-all-plans`
**Slice:** v6 refinement, slice 9 (final slice)

## What changed

Replaced state-based cross-tab navigation with **React Router 7** using `BrowserRouter`. Browser back/forward, deep links, and shareable URLs all work now.

### Routes

| URL | Component |
|---|---|
| `/` | Redirects to `/journey` |
| `/journey` | First decoded verse |
| `/journey/:chapter/:verse` | That verse selected |
| `/patterns` | Patterns Won matrix |
| `/verbs` | Periodic Table + first dhātu selected |
| `/verbs/:dhatuId` | That dhātu's Detail panel |
| `/atlas` | Atlas → Pronouns (default sub-tab) |
| `/atlas/:section` | Atlas with `pronouns` / `samasa` / `karaka` / `avyaya` / `adjadv` |
| `/primer` | Primer (no scroll) |
| `/primer#sandhi` | Primer scrolled to the `sandhi` section |
| `/practice` | Practice tab |
| `*` | 404 with a link back |

### Plumbing changes

- Masthead tabs are now `<NavLink>`s. Active state derived from URL match (matches with prefix, so `/atlas/samasa` keeps the Atlas tab visually active).
- Cross-tab navigation that used callback props (`onOpenVerse`, `onOpenAtlas`, `onOpenPrimer`) now uses `useNavigate()` directly inside each component. The components stopped accepting these as props.
- `VerseJourney`, `Verbs`, `Atlas` read `useParams()` to derive their selection from the URL.
- `Primer` reads `useLocation().hash` for the section to scroll to.
- `LastVisitBanner.onOpenPrimer` still uses a callback (banner is shell-level, not route-level).

### Tests

New: [src/__tests__/routing.test.jsx](src/__tests__/routing.test.jsx) — 10 tests covering:
- every top-level route renders the right component
- `/` redirect to `/journey`
- `/journey/2/3` selects Gītā 2.3
- `/verbs/kr` selects √कृ
- `/atlas/karaka` activates the कारक sub-tab

Required adding `@testing-library/react` + `jsdom` as dev deps and `test.environment: 'jsdom'` in `vite.config.js`.

## Why

User flagged: "you should have maintained React router approach because the back and the forward movement of the browser arrows would have worked with it." The state-based approach made cross-tab navigation a one-way trip; clicking a Samāsa Bank row to jump to a verse meant losing the bank's filter state when going back.

With BrowserRouter:
- Click "Gītā 2.5 ↗" in the Compound Bank → URL becomes `/journey/2/5`. Browser back → `/atlas/samasa`, scroll preserved.
- Click "open Atlas → Compounds ↗" in the Primer → URL becomes `/atlas/samasa`. Browser back → `/primer#compounds`.
- Open `https://…/journey/2/5` cold → lands directly on that verse. Bookmarkable, shareable.

## Files touched

- `package.json` — added `react-router-dom`, `@testing-library/react`, `jsdom` (dev deps)
- `vite.config.js` — `test.environment: 'jsdom'`
- [src/main.jsx](src/main.jsx) — wrap `<App />` with `<BrowserRouter>`
- [src/App.jsx](src/App.jsx) — masthead `<NavLink>`s + `<Routes>` with all routes; banner-handler navigates
- [src/components/VerseJourney.jsx](src/components/VerseJourney.jsx) — `useParams()` + `useNavigate()`
- [src/components/Verbs.jsx](src/components/Verbs.jsx) — `useParams()` + `useNavigate()`; selection from `:dhatuId`
- [src/components/Atlas.jsx](src/components/Atlas.jsx) — `useParams()` + `useNavigate()`; sub-tab from `:section`
- [src/components/Primer.jsx](src/components/Primer.jsx) — `useLocation().hash` for jump-to + `useNavigate()` for atlas links
- [src/components/PatternsWon.jsx](src/components/PatternsWon.jsx) — `useNavigate()` for verse + primer links
- New: [src/__tests__/routing.test.jsx](src/__tests__/routing.test.jsx) — 10 routing smoke tests

## Verified

- `npm run build` clean (51.80 KB CSS, 291 KB JS — +37 KB for react-router-dom)
- `npm test -- --run` — **94/94 passing** (was 84; +10 routing)
- Manual: Vite dev server `historyApiFallback` works automatically (deep-linking `/atlas/samasa` directly serves index.html). Vite preview also handles it.

## Static-host rewrite rules (for future deploy)

Static hosts need a fallback rule pointing all 404s to `/index.html` so deep-linking works:

- **Netlify** (`_redirects`): `/* /index.html 200`
- **Vercel** (`vercel.json`): `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Nginx**: `try_files $uri $uri/ /index.html;`
- **GitHub Pages**: not natively supported; use a 404.html that redirects, or switch to HashRouter for that host

The Vite dev server (`npm run dev`) and preview (`npm run preview`) handle this without configuration.

## Not done in this slice

- Some legacy CSS classes (`.decode-order-*`, the old `.pattern-category` card grid) remain in `src/styles.css` but are no longer used. Trim is a follow-up.
- No URL-state for the dhātu Periodic Table's tier filter or the Patterns Won search/sort. Local UI state is fine for these — they don't need to be shareable. Could revisit.
- The `LastVisitBanner` still uses a callback prop instead of internal `useNavigate`. Consistent with how it's the only shell-level component; refactoring isn't worth it.
