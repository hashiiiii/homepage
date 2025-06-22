import { describe, it, expect } from 'vitest'
import { getAllBlogPostsMetadata, getBlogPostById, loadMarkdownFiles } from '@/lib/markdown-loader'

describe('Markdown Loader', () => {
  describe('loadMarkdownFiles', () => {
    it('should load markdown files from content directory', () => {
      const posts = loadMarkdownFiles()
      
      expect(posts).toBeInstanceOf(Map)
      expect(posts.size).toBeGreaterThan(0)
    })

    it('should parse frontmatter correctly', () => {
      const posts = loadMarkdownFiles()
      const firstPost = posts.get('1')
      
      expect(firstPost).toBeDefined()
      expect(firstPost?.id).toBe('1')
      expect(firstPost?.title).toBe('Building Modern Web Applications with Hono')
      expect(firstPost?.tags).toContain('Hono')
      expect(firstPost?.tags).toContain('TypeScript')
    })

    it('should include markdown content', () => {
      const posts = loadMarkdownFiles()
      const firstPost = posts.get('1')
      
      expect(firstPost).toBeDefined()
      expect(firstPost?.content).toContain('# Building Modern Web Applications with Hono')
      expect(firstPost?.content).toContain('## なぜHono？')
      expect(firstPost?.content).toContain('```typescript')
    })
  })

  describe('getAllBlogPostsMetadata', () => {
    it('should return array of blog posts without content', () => {
      const posts = getAllBlogPostsMetadata()
      
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
      
      // Should have metadata but not content
      posts.forEach(post => {
        expect(post).toHaveProperty('id')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('excerpt')
        expect(post).toHaveProperty('date')
        expect(post).toHaveProperty('tags')
        expect(post).toHaveProperty('readTime')
        expect(post).not.toHaveProperty('content')
      })
    })

    it('should sort posts by date (newest first)', () => {
      const posts = getAllBlogPostsMetadata()
      
      if (posts.length > 1) {
        const dates = posts.map(post => new Date(post.date))
        for (let i = 1; i < dates.length; i++) {
          expect(dates[i - 1].getTime()).toBeGreaterThanOrEqual(dates[i].getTime())
        }
      }
    })
  })

  describe('getBlogPostById', () => {
    it('should return specific blog post with content', () => {
      const post = getBlogPostById('1')
      
      expect(post).toBeDefined()
      expect(post?.id).toBe('1')
      expect(post?.title).toBe('Building Modern Web Applications with Hono')
      expect(post?.content).toContain('# Building Modern Web Applications with Hono')
    })

    it('should return null for non-existent post', () => {
      const post = getBlogPostById('non-existent')
      
      expect(post).toBeNull()
    })

    it('should include all metadata fields', () => {
      const post = getBlogPostById('2')
      
      expect(post).toBeDefined()
      expect(post).toHaveProperty('id', '2')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('excerpt')
      expect(post).toHaveProperty('date')
      expect(post).toHaveProperty('tags')
      expect(post).toHaveProperty('readTime')
      expect(post).toHaveProperty('content')
    })
  })

  describe('Content Quality', () => {
    it('should have valid frontmatter in all posts', () => {
      const posts = getAllBlogPostsMetadata()
      
      posts.forEach(post => {
        expect(post.id).toBeTruthy()
        expect(post.title).toBeTruthy()
        expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(Array.isArray(post.tags)).toBe(true)
      })
    })

    it('should have meaningful content', () => {
      const posts = loadMarkdownFiles()
      
      posts.forEach(post => {
        expect(post.content.length).toBeGreaterThan(100)
        expect(post.content).toContain('#')
      })
    })
  })
})