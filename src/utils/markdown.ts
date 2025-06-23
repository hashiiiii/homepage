import matter from 'gray-matter'
import type { BlogPost } from '@/models/blog.model'

export interface MarkdownFile {
  content: string
  data: Record<string, any>
}

/**
 * Parse markdown file with frontmatter
 */
export function parseMarkdown(fileContent: string): MarkdownFile {
  const { content, data } = matter(fileContent)
  return { content, data }
}

/**
 * Extract blog post data from markdown file
 */
export function extractBlogPost(fileContent: string): BlogPost & { content: string } {
  const { content, data } = parseMarkdown(fileContent)
  
  return {
    id: data.id || '',
    title: data.title || '',
    excerpt: data.excerpt || '',
    content,
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    readTime: data.readTime || '5 min read',
  }
}