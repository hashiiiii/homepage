import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/models/blog.model'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

/**
 * Load all markdown files from content directory (synchronous)
 */
export function loadMarkdownFiles(): Map<string, BlogPost & { content: string }> {
  const posts = new Map<string, BlogPost & { content: string }>()
  
  try {
    // ディレクトリが存在しない場合は空のMapを返す
    if (!fs.existsSync(CONTENT_DIR)) {
      console.warn(`Content directory not found: ${CONTENT_DIR}`)
      return posts
    }

    const files = fs.readdirSync(CONTENT_DIR)
    const mdFiles = files.filter(file => file.endsWith('.md'))
    
    for (const file of mdFiles) {
      const filePath = path.join(CONTENT_DIR, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      
      const { data, content } = matter(fileContent)
      
      // フロントマターの必須フィールドをチェック
      if (!data.id || !data.title) {
        console.warn(`Invalid frontmatter in ${file}: missing id or title`)
        continue
      }
      
      const post: BlogPost & { content: string } = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt || '',
        content,
        date: data.date || new Date().toISOString().split('T')[0],
        tags: data.tags || [],
        readTime: data.readTime || '5 min read',
      }
      
      posts.set(post.id, post)
    }
  } catch (error) {
    console.error('Error loading markdown files:', error)
  }
  
  return posts
}

/**
 * Get all blog posts metadata (without content)
 */
export function getAllBlogPostsMetadata(): BlogPost[] {
  const posts = loadMarkdownFiles()
  
  return Array.from(posts.values())
    .map(({ content, ...metadata }) => metadata)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a single blog post by ID
 */
export function getBlogPostById(id: string): (BlogPost & { content: string }) | null {
  const posts = loadMarkdownFiles()
  return posts.get(id) || null
}

/**
 * Search blog posts
 */
export function searchBlogPosts(query: string): BlogPost[] {
  const posts = getAllBlogPostsMetadata()
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
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPostsMetadata()
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}