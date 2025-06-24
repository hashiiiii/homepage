/**
 * Blog content management
 * 
 * Phase 1: Static markdown files
 * Phase 2: Database integration
 */

import type { BlogPost } from '@/models/blog.model'
import { extractBlogPost } from '@/utils/markdown'

// Temporary: Import markdown content directly
// In production, this would be handled by a build process
const blogPosts: Record<string, string> = {
  '1': `---
id: "1"
title: "Building Modern Web Applications with Hono"
excerpt: "Explore how to create lightning-fast web applications using Hono, a small, simple, and ultra-fast web framework for the Edge."
date: "2024-01-15"
tags: ["Hono", "TypeScript", "Edge"]
readTime: "5 min read"
---

# Building Modern Web Applications with Hono

Content here...`,
  '2': `---
id: "2"
title: "AWS Lambda Best Practices"
excerpt: "Learn the best practices for building scalable and cost-effective serverless applications with AWS Lambda."
date: "2024-01-10"
tags: ["AWS", "Serverless", "Cloud"]
readTime: "8 min read"
---

# AWS Lambda Best Practices

Content here...`,
  '3': `---
id: "3"
title: "Tokyo Night Theme: A Developer's Dream"
excerpt: "Deep dive into why Tokyo Night has become one of the most popular color themes among developers."
date: "2024-01-05"
tags: ["Design", "Productivity", "Tools"]
readTime: "4 min read"
---

# Tokyo Night Theme: A Developer's Dream

Content here...`,
}

/**
 * Get all blog posts (without content)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = Object.values(blogPosts).map(content => {
    const post = extractBlogPost(content)
    // Return without content for list view
    const { content: _content, ...postWithoutContent } = post
    return postWithoutContent
  })
  
  // Sort by date (newest first)
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPostById(id: string): Promise<(BlogPost & { content: string }) | null> {
  const markdown = blogPosts[id]
  if (!markdown) return null
  
  const post = extractBlogPost(markdown)
  
  return post
}

/**
 * Search blog posts by query
 */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  const lowerQuery = query.toLowerCase()
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}