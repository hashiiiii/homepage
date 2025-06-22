import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { serve } from '@hono/node-server'
import type { ServerType } from '@hono/node-server'

describe('Markdown API Integration Tests', () => {
  let server: ServerType
  let baseUrl: string

  beforeAll(async () => {
    const { app } = await import('../../src/spa-app')
    const port = 3004 // Test port for markdown API
    baseUrl = `http://localhost:${port}`
    
    server = serve({
      fetch: app.fetch,
      port,
    })
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 1000))
  })

  afterAll(async () => {
    if (server) {
      server.close()
    }
  })

  describe('Blog API with Markdown', () => {
    it('should return JSON content-type for blog list', async () => {
      const response = await fetch(`${baseUrl}/api/blog`)
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should return valid JSON for blog list', async () => {
      const response = await fetch(`${baseUrl}/api/blog`)
      const data = await response.json()
      
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
      
      const firstPost = data[0]
      expect(firstPost).toHaveProperty('id')
      expect(firstPost).toHaveProperty('title')
      expect(firstPost).toHaveProperty('excerpt')
    })

    it('should return JSON content-type for blog detail', async () => {
      const response = await fetch(`${baseUrl}/api/blog/1`)
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should return blog post with markdown content', async () => {
      const response = await fetch(`${baseUrl}/api/blog/1`)
      const post = await response.json()
      
      expect(post).toHaveProperty('id', '1')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('excerpt')
      expect(post).toHaveProperty('date')
      expect(post).toHaveProperty('tags')
      expect(post).toHaveProperty('readTime')
      
      // Check that content contains markdown
      expect(post.content).toContain('#')
      expect(post.content).toContain('**')
      
      // Verify it's reading from actual markdown files
      expect(post.content).toContain('Hono')
      expect(post.title).toBe('Building Modern Web Applications with Hono')
    })

    it('should return 404 for non-existent blog post', async () => {
      const response = await fetch(`${baseUrl}/api/blog/999`)
      expect(response.status).toBe(404)
      expect(response.headers.get('content-type')).toContain('application/json')
    })
  })

  describe('SPA Routing vs API Routing', () => {
    it('should serve JSON for API routes', async () => {
      const response = await fetch(`${baseUrl}/api/blog`)
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should serve HTML for SPA routes', async () => {
      const response = await fetch(`${baseUrl}/blog`)
      expect(response.headers.get('content-type')).toContain('text/html')
    })

    it('should serve HTML for blog detail pages (SPA)', async () => {
      const response = await fetch(`${baseUrl}/blog/1`)
      expect(response.headers.get('content-type')).toContain('text/html')
    })
  })
})