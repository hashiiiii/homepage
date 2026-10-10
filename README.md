# homepage

Source code for [hashiiiii.com](https://hashiiiii.com), a personal website and blog.

Built with [Eleventy (11ty)](https://www.11ty.dev/) v3, [Liquid](https://liquidjs.com/) templates, and TypeScript in strict mode.

## Development

Requires [Bun](https://bun.sh/) 1.4.2 or later.

```bash
bun install
bun run dev
```

| Command | Description |
| --- | --- |
| `bun run dev` | Start the local server |
| `bun run build` | Build the static site in `_site/` |
| `bun run typecheck` | Check TypeScript types without emitting files |
| `bun run lint` | Check formatting and lint rules with [Biome](https://biomejs.dev/) |
| `bun run format` | Apply Biome fixes and formatting |
| `bun run test` | Run the [Vitest](https://vitest.dev/) suite once |

## Content

### Pages

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/blog` | Blog index with tag filtering |
| `/blog/[slug]` | Local blog post |
| `/resume` | Resume |

### Blog posts

Create Markdown posts in `content/` with this frontmatter:

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

The filename becomes the URL slug: `content/example.md` generates `/blog/example/`. Set `published: false` to hide a post.

Posts use [zenn-markdown-html](https://github.com/zenn-dev/zenn-editor) for Zenn-compatible Markdown syntax.
The build fetches articles from [Zenn](https://zenn.dev/hashiiiii) via RSS and lists them alongside local posts, newest first.
Zenn entries link to the original articles.

## Project structure

| Path | Contents |
| --- | --- |
| `content/` | Local Markdown posts |
| `lib/` | Blog loading, validation, rendering, RSS fetching, and tests |
| `src/` | Liquid pages, layouts, and partials |
| `src/_data/blog.ts` | Global blog data |
| `src/_data/resume.json` | Resume data |
| `css/` | Site styles |
| `public/` | Images and favicons |
| `_site/` | Generated site |

## Automation

- [GitHub Actions](.github/workflows/ci.yml) runs lint, type checking, tests, and the build for pushes and pull requests to `main`.
- [Vercel](https://vercel.com/) hosts `_site/`. The [deployment workflow](.github/workflows/deploy.yml) supports manual preview and production deployments.
- The [Husky](https://typicode.github.io/husky/) pre-commit hook runs `bun run format`.

## License

[MIT](LICENSE.md)
