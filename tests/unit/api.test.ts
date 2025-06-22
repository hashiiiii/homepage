import { describe, it, expect, beforeAll } from 'vitest'
import type { Hono } from 'hono'

// Test for API endpoints that will be served by the integrated Hono app
describe('Integrated API Endpoints', () => {
  let app: Hono

  beforeAll(async () => {
    const { app: spaApp } = await import('../../src/spa-app')
    app = spaApp
  })

  describe('Health Check API', () => {
    it('should return health status', async () => {
      const res = await app.request('/api/health')
      expect(res.status).toBe(200)
      
      const data = await res.json()
      expect(data).toEqual({ status: 'ok' })
    })
  })

  describe('Blog API', () => {
    it('should return blog posts list', async () => {
      const res = await app.request('/api/blog')
      expect(res.status).toBe(200)
      
      const posts = await res.json()
      expect(Array.isArray(posts)).toBe(true)
      
      if (posts.length > 0) {
        const post = posts[0]
        expect(post).toHaveProperty('id')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('excerpt')
        expect(post).toHaveProperty('date')
        expect(post).toHaveProperty('tags')
        expect(post).toHaveProperty('readTime')
      }
    })

    it('should return specific blog post by id', async () => {
      const res = await app.request('/api/blog/1')
      expect(res.status).toBe(200)
      
      const post = await res.json()
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('content')
    })

    it('should return 404 for non-existent blog post', async () => {
      const res = await app.request('/api/blog/999999')
      expect(res.status).toBe(404)
    })
  })

  describe('Resume API', () => {
    it('should return resume data', async () => {
      const res = await app.request('/api/resume')
      expect(res.status).toBe(200)
      
      const resume = await res.json()
      expect(resume).toHaveProperty('experience')
      expect(resume).toHaveProperty('skills')
      expect(resume).toHaveProperty('education')
      expect(resume).toHaveProperty('contact')
      
      expect(Array.isArray(resume.experience)).toBe(true)
      expect(Array.isArray(resume.skills)).toBe(true)
    })

    it('should return properly structured experience data', async () => {
      const res = await app.request('/api/resume')
      const resume = await res.json()
      
      if (resume.experience.length > 0) {
        const exp = resume.experience[0]
        expect(exp).toHaveProperty('title')
        expect(exp).toHaveProperty('company')
        expect(exp).toHaveProperty('period')
        expect(exp).toHaveProperty('description')
      }
    })
  })

  describe('API Error Handling', () => {
    it('should return 404 for unknown API endpoints', async () => {
      const res = await app.request('/api/non-existent')
      expect(res.status).toBe(404)
    })

    it('should handle API errors gracefully', async () => {
      const res = await app.request('/api/blog/invalid-id')
      expect([400, 404].includes(res.status)).toBe(true)
    })
  })

  describe('CORS Support', () => {
    it('should include CORS headers for API requests', async () => {
      const res = await app.request('/api/health')
      expect(res.headers.get('access-control-allow-origin')).toBeTruthy()
    })
  })
})