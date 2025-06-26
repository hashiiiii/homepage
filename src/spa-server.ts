import { serve } from '@hono/node-server';
import { app } from './spa-app';
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.PORT || '3000');
const host = process.env.HOST || 'localhost';

if (process.env.NODE_ENV !== 'test') {
  serve({
    fetch: app.fetch,
    port,
    hostname: host,
  });

  // eslint-disable-next-line no-console
  console.log(`🚀 Hono + React SPA Server running on http://${host}:${port}`);
  // eslint-disable-next-line no-console
  console.log(`📱 Frontend: http://${host}:${port}`);
  // eslint-disable-next-line no-console
  console.log(`🔌 API: http://${host}:${port}/api/health`);
}
