# homepage

Source code for [hashiiiii.com](https://hashiiiii.com)

## Stack

- [Bun](https://bun.sh/) (>= 1.3)
- [Eleventy (11ty)](https://www.11ty.dev/) v3 — Static Site Generation
- HTML + [Liquid](https://liquidjs.com/) templates
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
| `bun run build` | Production build (`_site/`) |
| `bun run typecheck` | Type check (`tsc`) |
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

Blog posts live in `content` as Markdown with the following frontmatter:

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
├── content/            # Markdown blog posts
├── lib/                # Blog logic + tests
├── types/              # TypeScript type definitions
├── css/                # CSS (global.css, pages.css)
├── public/             # Static assets (images, favicon)
└── src/                # 11ty templates only
    ├── _data/          # Global data files (blog.ts, resume.ts)
    ├── _includes/      # Layouts and partials (base.html, header.html)
    ├── blog/           # Blog pages (index.html, post.html)
    ├── index.html      # Landing page
    └── resume.html     # Resume page
```

## CI/CD

- **GitHub Actions** runs lint, typecheck, test, and build on push/PR to `main`
- **Vercel** auto-deploys from the `main` branch
- **Husky** pre-commit hook runs `bun run format`

## License

[MIT](LICENSE.md)
