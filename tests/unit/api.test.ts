import { describe, it, expect, beforeAll } from 'vitest';
import type { Hono } from 'hono';

// Test for API endpoints that will be served by the integrated Hono app
describe('Integrated API Endpoints', () => {
  let app: Hono;

  beforeAll(async () => {
    const { app: spaApp } = await import('../../src/spa-app');
    app = spaApp;
  });

  describe('Blog API', () => {
    it('should return blog posts list', async () => {
      const res = await app.request('/api/blog');
      expect(res.status).toBe(200);

      const posts = await res.json();
      expect(Array.isArray(posts)).toBe(true);

      if (posts.length > 0) {
        const post = posts[0];
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('excerpt');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('tags');
        expect(post).toHaveProperty('readTime');
      }
    });

    it('should return specific blog post by id', async () => {
      const res = await app.request('/api/blog/4');
      expect(res.status).toBe(200);

      const post = await res.json();
      expect(post).toHaveProperty('id', '4');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('content');
    });

    it('should return 404 for non-existent blog post', async () => {
      const res = await app.request('/api/blog/999999');
      expect(res.status).toBe(404);
    });
  });

  describe('API Error Handling', () => {
    it('should return 404 for unknown API endpoints', async () => {
      const res = await app.request('/api/non-existent');
      expect(res.status).toBe(404);
    });

    it('should handle API errors gracefully', async () => {
      const res = await app.request('/api/blog/invalid-id');
      expect([400, 404].includes(res.status)).toBe(true);
    });
  });

  describe('CORS Support', () => {
    it('should include CORS headers for API requests', async () => {
      const res = await app.request('/api/blog');
      expect(res.headers.get('access-control-allow-origin')).toBeTruthy();
    });
  });
});
