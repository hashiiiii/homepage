import type { BlogPost } from '@/models/blog.model'

const API_BASE = '/api'

/**
 * Fetch all blog posts
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_BASE}/blog`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    // Check if response is JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON")
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}

/**
 * Fetch a single blog post by ID
 */
export async function fetchBlogPost(id: string): Promise<BlogPost & { content: string, html: string }> {
  try {
    const response = await fetch(`${API_BASE}/blog/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Blog post not found')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    // Check if response is JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON")
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }
}

/**
 * Fetch resume data
 */
export async function fetchResume() {
  const response = await fetch(`${API_BASE}/resume`)
  if (!response.ok) {
    throw new Error('Failed to fetch resume')
  }
  return response.json()
}