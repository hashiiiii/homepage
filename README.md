# homepage

Internal guide for maintaining hashiiiii.com

## Stack

- React 19 with TypeScript and strict compilation
- Vite for bundling and local dev server
- React Router 7 for client-side routing
- Tailwind CSS with a custom design system in `src/styles/design-system.ts`
- Markdown content sourced from `content/blog`; processed by `src/lib/build-blog.ts`

## Prerequisites

- Node.js 18 or newer (development is done with 20.x)
- npm (comes with Node.js)

## Setup

```bash
npm install
```

Clone the repository as usual before running the installation if this is a new environment.

## Local development

- `npm run dev` starts the Vite dev server on http://localhost:3000.
- `npm run lint` runs Prettier (in write mode) and ESLint. Commit after verifying unwanted files were not reformatted.
- `npm run test` performs a TypeScript check and runs Vitest with coverage reporting to `coverage/`.
- `npm run build` regenerates blog JSON via `tsx src/lib/build-blog.ts` and builds the production bundle in `dist/`.

## Content workflow

- Add markdown files under `content/blog`. File names are used as post IDs unless `id` is set in front matter.
- Required front matter fields: `title`, `date` (YYYY-MM-DD), `tags` array. Optional: `excerpt`, `readTime`.
- Run `npm run build` after editing content to refresh `src/generated/blog-posts.json` and `src/generated/blog-metadata.json`. Commit the regenerated files with the content changes.
- Markdown is rendered with GitHub-flavored extensions, KaTeX, Mermaid, and highlight.js; preview with the dev server to confirm formatting.

## Deployment

- GitHub Actions (`.github/workflows/ci.yml`) runs lint, build, and tests on pushes and pull requests targeting `main`.
- Vercel deploys from the `main` branch. Required repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
- Manual deployment: trigger the "Deploy to Vercel" workflow in GitHub Actions and select the desired environment (preview or production).
- For a local production check, run `npm run build` and serve `dist/` with `npx serve dist` or any static file server.
