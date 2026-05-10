# Plan v15 — Deploy the read-only app to GitHub Pages

> **Status:** Forward-looking plan. Awaiting decision on a couple of items (custom domain vs username.github.io subpath, conversation/ directory inclusion) before implementation.

## Context

The app is a Vite + React SPA. All persistent state is already client-side (localStorage: per-verse notes, SRS state, last-visit banner). No backend, no fetch calls to a server, no write-back to the source code. Decode Helper produces a copyable JS draft but never writes to disk. So the "read-only" version the user wants is essentially **the existing app, deployed**.

What's blocking a clean GitHub Pages deploy today:

1. **`BrowserRouter` (history mode).** The app uses [`react-router-dom`'s `BrowserRouter`](../src/main.jsx). GitHub Pages serves static files — a hard-reload of `/journey/2/3` returns 404 because the path doesn't map to a real file. Needs either `HashRouter` (URLs become `/#/journey/2/3`) or a 404.html SPA fallback.
2. **Vite `base` path.** [`vite.config.js`](../vite.config.js) has no `base` set — defaults to `/`. GitHub Pages serves a user-pages repo at `https://<user>.github.io/<repo>/`, which means every absolute asset path needs the `/<repo>/` prefix prepended at build time.
3. **No deploy pipeline.** No GitHub Actions workflow, no `gh-pages` branch, no `npm run deploy` script.
4. **`article-images/` is already in `public/`** and works correctly. But `conversation/` (the source HTML transcripts at the repo root) is NOT in `public/` and is linked from the article's Appendix — those links would 404 on the deployed site.
5. **`?raw` imports for `article.md`** — Vite bundles these at build time, so they ship correctly. No action needed.

## Decisions locked (proposed; user to confirm before implementation)

| Decision | Proposal | Rationale |
|---|---|---|
| Hosting target | `https://yadavvi91.github.io/sanskrit-learning/` (repo-pages, subpath deploy) | Simplest. Custom domain can be added later without invalidating the routing changes. |
| Vite `base` | Set via env var: `base: process.env.VITE_BASE ?? '/'`. Production build sets `VITE_BASE=/sanskrit-learning/` | Local dev (`npm run dev`) keeps `/`. Production build correctly prefixes assets. |
| SPA routing fallback | **`HashRouter`** for the deployed build, gated by the same env var. Local dev keeps `BrowserRouter`. | The 404.html-redirect trick works but introduces a brief flash. HashRouter is simpler, robust against hard-reloads, and acceptable for a personal reading journal. |
| Deploy pipeline | GitHub Actions workflow: `actions/setup-node` + `npm ci` + `npm test -- --run` + `npm run build` + `actions/deploy-pages@v4` | Standard pattern. Tests gate the deploy. |
| `conversation/` directory | **Exclude from deploy**, update the Appendix link to "available in the [repo](https://github.com/yadavvi91/sanskrit-learning/tree/main/conversation)" | The transcripts are 5-10 MB of raw HTML + assets; not worth bundling. The repo link is the canonical reference anyway. |
| `dist/` size budget | Currently 2.2 MB JS + 88 KB CSS, gzipped 728 KB + 13 KB. Acceptable. | Lighthouse / GitHub Pages bandwidth is not the bottleneck for a personal app. |
| Decode Helper on the deployed app | Keep enabled (it's read-only — produces a draft the user can copy from the browser). No file-system writes happen. | Matches the "read-only" contract; the user explicitly said "at least the part where I'm not supposed to write." |
| localStorage state | Keep — it's per-browser, doesn't touch the corpus. Notes, SRS state, last-visit, theme picker, decoded chapters all persist locally. | A reader on the deployed site can take notes and run SRS without affecting anyone else. |

## Implementation slices

### Slice A — Vite + Router configuration

Files: `vite.config.js`, `src/main.jsx`, `package.json`.

- `vite.config.js`: read `VITE_BASE` env var, default `/`. Pass into `defineConfig({ base })`.
- `src/main.jsx`: import `HashRouter` AND `BrowserRouter`; pick based on `import.meta.env.BASE_URL` (Vite's resolved base — `/` in dev, `/sanskrit-learning/` in production). Use HashRouter when base isn't `/`.
- `package.json` scripts:
  ```json
  "build:pages": "VITE_BASE=/sanskrit-learning/ vite build",
  "preview:pages": "VITE_BASE=/sanskrit-learning/ vite build && vite preview --base /sanskrit-learning/"
  ```
- Verify: `npm run preview:pages` serves a working build at the expected base path with HashRouter URLs.

### Slice B — Routing audit (any hard-coded `/path` strings?)

Files: any `<a href="/...">`, `navigate('/...')` calls.

- All `navigate()` calls in the app are relative-from-root (e.g., `navigate('/journey/' + ch + '/' + vs)`). React Router handles these correctly when wrapped in HashRouter — they become `#/journey/...`. No code changes likely needed; verify by clicking through the deployed preview.
- Any `<img src="/article-images/...">` — these should already work because Vite resolves `/article-images/` relative to `base`. The `ArticleImage` component in `src/components/Origin.jsx` rewrites `article-images/...` (no leading slash) to `/article-images/...`; that prefix gets the base path applied automatically.
- Any direct `<a href="...">` to repo-root paths (e.g., `conversation/`) need updating — see Slice D.

### Slice C — GitHub Actions deploy workflow

File: `.github/workflows/pages.yml` (new).

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm test -- --run
      - run: npm run build:pages
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- Enable GitHub Pages for the repo (Settings → Pages → Source: GitHub Actions).

### Slice D — Conversation/ Appendix link rewrite

File: `article.md` (Appendix section).

- Current Appendix references `conversation/...html` files at the repo root. On the deployed site these 404.
- Rewrite the Appendix link from local-relative to GitHub-relative: `[conversation/ directory in the repo](https://github.com/yadavvi91/sanskrit-learning/tree/main/conversation)`.
- Same fix on the `[`source`](https://github.com/yadavvi91/sanskrit-learning-xstate-ts)` style links elsewhere — most are already absolute GitHub URLs, so likely just the Appendix needs touching.

### Slice E — README + deployment note

File: `README.md`.

- Add a "Deployment" section with the public URL, the "all state is local to your browser" disclaimer (notes, SRS state, theme don't sync across devices), and a "for the source / write the data, work locally" pointer.

## Verification

- `npm run build:pages` produces a `dist/` that `vite preview --base /sanskrit-learning/` serves correctly: deep URLs work, chip clicks work, prev/next chevrons work, popovers work, the `/origin` toggle works, the article images load.
- All 580 tests still pass under the production build (router change doesn't break tests because tests use `MemoryRouter` from React Router — independent of which Router the app mounts).
- Lighthouse score ≥ 90 on the deployed site (loaded over GitHub Pages CDN).
- A hard-reload of `https://yadavvi91.github.io/sanskrit-learning/#/journey/2/47` lands on the right verse without 404.

## Out of scope

- **Custom domain.** Possible follow-up; doesn't change anything else.
- **Server-side persistence / sync across devices.** Different project (would need a backend).
- **Comments / community features.** Different project.
- **Search engine indexing.** GitHub Pages serves with a sane `robots.txt` by default; if SEO ever matters, add a sitemap.
- **Bundle-size optimisation.** 728 KB gzipped is fine for a personal reading app; revisit only if Lighthouse complains.

## Relation to other plans

- Doesn't change app behavior — just makes the existing app deployable. Independent of [v13](v13-corpus-scale.md) (the 701-verse import) and [v14](v14-coverage-and-voice.md) (coverage + voice). The app is already content-complete enough to ship.
