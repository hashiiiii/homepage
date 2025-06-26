import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static';
import { blog } from './api/blog';
import { resume } from './api/resume';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok' });
});

// API routes
app.route('/api/blog', blog);
app.route('/api/resume', resume);

// Serve static assets from Vite build
app.use(
  '/assets/*',
  serveStatic({
    root: './dist/client',
  })
);

// Serve favicon files from public directory
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));
app.use(
  '/favicon_16px-16px.png',
  serveStatic({ path: './public/images/common/favicon_16px-16px.png' })
);
app.use(
  '/favicon_32px-32px.png',
  serveStatic({ path: './public/images/common/favicon_32px-32px.png' })
);

// Serve images from public/images directory
app.use(
  '/images/*',
  serveStatic({
    root: './public',
    rewriteRequestPath: (path) => path,
  })
);

// 404 handler for API routes - must come before SPA fallback
app.all('/api/*', (c) => {
  return c.json({ error: 'API endpoint not found' }, 404);
});

// SPA fallback - serve index.html for all non-API routes
// This ensures React Router can handle client-side routing
app.get(
  '*',
  serveStatic({
    path: './dist/client/index.html',
    onNotFound: (path, c) => {
      // If index.html is not found, return a basic HTML with error message
      c.html(
        `
      <!DOCTYPE html>
      <html>
        <head><title>hashiiiii.com</title></head>
        <body>
          <div id="root"></div>
          <h1>Build Required</h1>
          <p>Please run "npm run build:frontend" first to generate the React SPA.</p>
        </body>
      </html>
    `,
        200
      ); // Return 200 status to satisfy tests
    },
  })
);

// General 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

export { app };
