# Tracking

Astro static site for switching tracking script environments and browsing pre-fetched Wikipedia reference pages.

## Requirements

- Node.js 20+
- npm

## Development

```bash
npm install
npm run fetch:wikipedia
npm run dev
```

The dev server is available at `http://localhost:4321/tracking/` when `VITE_REPOSITORY_NAME=tracking`.

## Build

```bash
npm run build
```

`npm run build` first fetches Wikipedia data with Node.js and writes `src/data/wikipedia.json`, then generates a static Astro site in `dist/`.

## Preview

```bash
npm run preview
```

## Environment

```env
VITE_REPOSITORY_NAME=tracking
VITE_SITE_NAME=トラッキング
```

`VITE_REPOSITORY_NAME` is used as the Astro base path, so static assets and links are generated under `/tracking/`.
