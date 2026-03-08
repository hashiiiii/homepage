# homepage

Source code for hashiiiii.com

## Stack

- TypeScript
- [Bun](https://bun.sh/) (runtime / package manager)
- [Astro](https://astro.build/) (static site generation)
- [Biome](https://biomejs.dev/) (lint / format)
- [Vitest](https://vitest.dev/) (testing)
- Vercel (hosting)

## Setup

```bash
bun --version  # >= 1.3
bun install
```

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build (`dist/`) |
| `bun run typecheck` | Type check |
| `bun run lint` | Lint with Biome |
| `bun run format` | Auto-format with Biome |
| `bun run test` | Run Vitest |

## Content

Blog posts live in `content/blog/` as Markdown. Zenn-compatible markdown syntax is supported.

## Deploy

- GitHub Actions runs CI (`.github/workflows/ci.yml`)
- Vercel auto-deploys from the `main` branch
