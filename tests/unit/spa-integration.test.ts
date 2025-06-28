import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { serve } from '@hono/node-server';
import type { ServerType } from '@hono/node-server';

// Test for Hono + React SPA integration
describe('Hono + React SPA Integration', () => {
  let server: ServerType;
  let baseUrl: string;

  beforeAll(async () => {
    // This will be the integrated Hono app
    const { app } = await import('../../src/spa-app');
    const port = 3002; // Test port
    baseUrl = `http://localhost:${port}`;

    server = serve({
      fetch: app.fetch,
      port,
    });
  });

  afterAll(async () => {
    if (server) {
      server.close();
    }
  });

  describe('Static File Serving', () => {
    it('should serve the React SPA index.html for root path', async () => {
      const response = await fetch(`${baseUrl}/`);
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('text/html');

      const html = await response.text();
      expect(html).toContain('<div id="root"></div>');
      expect(html).toContain('hashiiiii.com');
    });

    it('should serve React SPA for any client-side route (SPA fallback)', async () => {
      const routes = ['/blog', '/resume', '/non-existent-route'];

      for (const route of routes) {
        const response = await fetch(`${baseUrl}${route}`);
        expect(response.status).toBe(200);
        expect(response.headers.get('content-type')).toContain('text/html');

        const html = await response.text();
        expect(html).toContain('<div id="root"></div>');
      }
    });

    it('should serve static assets (CSS, JS) from /assets/', async () => {
      // This will test if Vite-built assets are served correctly
      const response = await fetch(`${baseUrl}/assets/`);
      // Should either serve index or 404 for directory listing
      expect([200, 404, 403].includes(response.status)).toBe(true);
    });
  });

  describe('API Routes', () => {

    it('should serve blog API endpoint', async () => {
      const response = await fetch(`${baseUrl}/api/blog`);
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('application/json');

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

  });

  describe('SPA Routing Behavior', () => {
    it('should not trigger server requests for client-side navigation', async () => {
      // Test that all routes return the same HTML (SPA behavior)
      const [homeResponse, blogResponse, resumeResponse] = await Promise.all([
        fetch(`${baseUrl}/`),
        fetch(`${baseUrl}/blog`),
        fetch(`${baseUrl}/resume`),
      ]);

      const [homeHtml, blogHtml, resumeHtml] = await Promise.all([
        homeResponse.text(),
        blogResponse.text(),
        resumeResponse.text(),
      ]);

      // All should return the same SPA HTML shell
      expect(homeHtml).toBe(blogHtml);
      expect(blogHtml).toBe(resumeHtml);

      // All should contain the React app bundle
      expect(homeHtml).toContain('<script type="module"');
      expect(homeHtml).toContain('/assets/main-');
    });
  });

  describe('Performance & Caching', () => {
    it('should set appropriate cache headers for static assets', async () => {
      const response = await fetch(`${baseUrl}/`);

      // Check that HTML is not heavily cached (for SPA updates)
      const cacheControl = response.headers.get('cache-control');
      if (cacheControl) {
        expect(cacheControl).not.toContain('max-age=31536000'); // Not cached for a year
      }
    });
  });

  describe('Development Experience', () => {
    it('should serve content immediately without build step in development', async () => {
      // This tests that the integration doesn't break development workflow
      const startTime = Date.now();
      const response = await fetch(`${baseUrl}/`);
      const endTime = Date.now();

      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(5000); // Should respond quickly
    });
  });

  describe('Tokyo Night Theme Integration', () => {
    it('should serve the Tokyo Night themed SPA without theme loss', async () => {
      const response = await fetch(`${baseUrl}/`);
      const html = await response.text();

      // Check that the HTML contains the React app structure
      expect(html).toContain('<div id="root"></div>');
      expect(html).toContain('<script type="module"');

      // Check that CSS file is linked (Tokyo Night theme will be in the CSS)
      expect(html).toContain('rel="stylesheet"');
      expect(html).toContain('/assets/main-');

      // Check that the page title is correctly set
      expect(html).toContain('hashiiiii.com');
    });
  });
});
