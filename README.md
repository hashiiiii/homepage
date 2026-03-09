# homepage

Source code for [hashiiiii.com](https://hashiiiii.com)

## Stack

- [Bun](https://bun.sh/) (>= 1.3)
- [Astro](https://astro.build/) (Static Site Generation)
- TypeScript (strict)
- [Biome](https://biomejs.dev/) (lint / format)
- [Vitest](https://vitest.dev/)
- [Husky](https://typicode.github.io/husky/) (Git hooks)
- [Vercel](https://vercel.com/) (hosting)
- [zenn-markdown-html](https://github.com/zenn-dev/zenn-editor) (Markdown rendering)

## Setup

```bash
bun install
```

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build (`dist/`) |
| `bun run typecheck` | Type check (`astro check` + `tsc --noEmit`) |
| `bun run lint` | Lint with Biome |
| `bun run format` | Auto-format with Biome |
| `bun run test` | Run Vitest |

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/blog` | Blog index with tag filtering |
| `/blog/[slug]` | Blog post detail |
| `/resume` | Resume |

## Blog

Blog posts live in `content/blog/` as Markdown with the following frontmatter:

```yaml
---
title: 'Post Title'
excerpt: 'Short description'
date: 'YYYY-MM-DD'
tags: ['Tag1', 'Tag2']
readTime: '5 min'
published: true
---
```

Zenn-compatible markdown syntax is supported. Articles from [Zenn](https://zenn.dev/hashiiiii) are also fetched via RSS and displayed alongside local posts.

## Project Structure

```
├── content/blog/       # Markdown blog posts
├── docs/               # Project documentation
├── public/images/      # Static assets
└── src/
    ├── components/     # Astro components
    ├── layouts/        # Base layout
    ├── lib/            # Blog logic + tests
    ├── pages/          # Routes
    ├── styles/         # Global CSS
    └── types/          # TypeScript type definitions
```

## CI/CD

- **GitHub Actions** runs lint, typecheck, test, and build on push/PR to `main`
- **Vercel** auto-deploys from the `main` branch
- **Husky** pre-commit hook runs `bun run format`

## License

[MIT](LICENSE.md)
