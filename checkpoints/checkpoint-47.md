# Checkpoint 47 — Ship to GitHub Pages

**Date:** 2026-05-11

## Trigger

> *"Can you create a github dot io website out of this?"*

Plan was already on file in [`plans/v15-github-pages-deploy.md`](../plans/v15-github-pages-deploy.md). This checkpoint executes it.

## What changed

The app is now buildable for GitHub Pages with one extra script. Pushing to `main` triggers a CI workflow that runs tests, builds with the right base path, and deploys to `https://yadavvi91.github.io/sanskrit-learning/`.

### Slice A — Vite + router config

- **[`vite.config.js`](../vite.config.js):** `base` now reads from `VITE_BASE` env var (default `/`). Production-pages build sets `VITE_BASE=/sanskrit-learning/`.
- **[`src/main.jsx`](../src/main.jsx):** picks `HashRouter` when `import.meta.env.BASE_URL !== '/'`, else `BrowserRouter`. Local dev gets clean URLs; the deployed Pages build uses `#/journey/2/47`-style URLs so deep-link reloads against the static host don't 404.
- **[`package.json`](../package.json):** two new scripts — `build:pages` (sets the env var and builds) and `preview:pages` (builds and previews at the deploy base path so you can sanity-check before pushing).

### Slice B — Routing audit

Only one hard-coded `<a href="/journey">` was found (in [`App.jsx`](../src/App.jsx) `NotFound`). Replaced with a `<button onClick={() => navigate('/journey')}>` styled as a link so it works identically under BrowserRouter and HashRouter.

All other navigation already uses React Router's `navigate()` or `<NavLink>` — those automatically respect the active router and base.

### Slice C — GitHub Actions workflow

**[`.github/workflows/pages.yml`](../.github/workflows/pages.yml):** standard pattern. On push to `main` (or manual dispatch):

1. `actions/checkout@v4`
2. `actions/setup-node@v4` with Node 20 and npm cache
3. `npm ci`
4. `npm test -- --run` — full 582-test suite gates the deploy
5. `npm run build:pages`
6. `actions/configure-pages@v5` + `actions/upload-pages-artifact@v3`
7. `actions/deploy-pages@v4`

Concurrency group `pages` with `cancel-in-progress: false` so rapid-fire commits queue cleanly without losing the latest one.

### Slice D — Appendix link rewrite

The `article.md` Appendix used to point at the relative path `conversation/` (the source HTML transcripts at the repo root, ~5–10 MB, deliberately not bundled into the dist). On the deployed site that path 404s. Rewrote the link to the absolute GitHub URL: `https://github.com/yadavvi91/sanskrit-learning/tree/main/conversation`. Repo-relative reading still works because Markdown renderers (GitHub, the in-app `<ReactMarkdown>`) both follow absolute URLs.

### Slice E — README

Created [`README.md`](../README.md) with: project description, deployed URL, "all state is local to your browser" disclaimer, run-locally commands, build-for-pages commands, project layout, license note.

## Verification

```
npm test -- --run          → 582 passed (582)
npm run build:pages        → dist/ produced with /sanskrit-learning/ asset prefixes
                              dist/index.html has src="/sanskrit-learning/assets/..."
```

## Handoff: enabling Pages in the repo

Two things the user has to do once in the GitHub UI (one-time setup; CI handles everything else automatically afterward):

1. **Push the branch.** When `main` is up to date with these changes, the `pages.yml` workflow will trigger on the next push.
2. **Settings → Pages → Source: GitHub Actions.** This tells the repo to serve from the `actions/deploy-pages` artifact rather than from a `gh-pages` branch. After the first successful workflow run, the deployed URL appears on that settings page.

## Out of scope

- **Custom domain.** Would only need a `CNAME` file in `public/` and a DNS record — no other code changes. Deferred.
- **Bundle splitting.** Current build is 2.5 MB / 817 KB gzipped — within GitHub Pages' bandwidth budget for a personal app. Lighthouse-tier optimisation can come later if it matters.
- **Server-side persistence / cross-device sync.** Different project; would need a backend.
