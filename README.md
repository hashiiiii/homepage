# homepage

Source code for hashiiiii.com

## Stack

- [Astro](https://astro.build/) (static site generation)
- TypeScript
- [Biome](https://biomejs.dev/) (lint / format)
- Vitest
- Deployed on Vercel

## Setup

```bash
node -v  # >= 22
npm install
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (`dist/`) |
| `npm run typecheck` | Type check |
| `npm run lint` | Lint with Biome |
| `npm run format` | Auto-format with Biome |
| `npm run test` | Run Vitest |

## Content

Blog posts live in `content/blog/` as Markdown. Zenn-compatible markdown syntax is supported.

## Deploy

- GitHub Actions runs CI (`.github/workflows/ci.yml`)
- Vercel auto-deploys from the `main` branch
