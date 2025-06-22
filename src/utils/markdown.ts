import { marked } from 'marked'
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
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const html = await marked(markdown)
  return html
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

/**
 * Get all markdown files from a directory
 * Note: This is a placeholder - actual implementation would use fs or build-time processing
 */
export async function getAllMarkdownFiles(directory: string): Promise<string[]> {
  // In a real implementation, this would:
  // 1. Read all .md files from the directory
  // 2. Return their paths
  // For now, return mock data
  return [
    '2024-01-15-building-with-hono.md',
    '2024-01-10-aws-lambda-best-practices.md',
    '2024-01-05-tokyo-night-theme.md',
  ]
}