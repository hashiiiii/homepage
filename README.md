# hashiiiii.com Homepage

Personal homepage built with Hono, TypeScript, and AWS.

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run test` - Run tests
- `npm run build:frontend` - Build for production
- `npm run lint` - Run linter
- `npm run typecheck` - Check TypeScript types

## Deployment

This project supports **manual deployment** to Vercel via GitHub Actions to ensure control over releases:

### Manual Deployment via GitHub Actions

**Note**: Currently disabled. To enable automated deployment:

1. Follow the setup guide: [docs/vercel-deployment-setup.md](./docs/vercel-deployment-setup.md)
2. Set up required GitHub Secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`)
3. Uncomment the workflow in `.github/workflows/deploy.yml`

Once enabled:

1. Go to the [Actions tab](../../actions) on GitHub
2. Select "Deploy to Vercel" workflow
3. Click "Run workflow" and choose:
   - **preview**: Deploy to preview environment
   - **production**: Deploy to production

### Manual Deployment via CLI

```bash
# Preview deployment
npm run deploy:preview

# Production deployment
npm run deploy

# Local development with Vercel
npm run deploy:local
```

### Automatic CI/CD

- All pushes to `main` trigger CI tests automatically
- Deployment only happens when manually triggered
- This prevents unwanted automatic deployments

## Architecture

See [CLAUDE.md](./CLAUDE.md) for detailed project documentation.
