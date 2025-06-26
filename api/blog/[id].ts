import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogPostWithContent {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  readTime: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

function getBlogPostById(id: string): BlogPostWithContent | null {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return null
    }

    const files = fs.readdirSync(CONTENT_DIR)
    const mdFiles = files.filter(file => file.endsWith('.md'))

    for (const file of mdFiles) {
      const filePath = path.join(CONTENT_DIR, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      const { data, content } = matter(fileContent)

      if (String(data.id) === id) {
        return {
          id: String(data.id),
          title: String(data.title),
          excerpt: String(data.excerpt || ''),
          content,
          date: String(data.date || new Date().toISOString().split('T')[0]),
          tags: Array.isArray(data.tags) ? data.tags : [],
          readTime: String(data.readTime || '5 min read'),
        }
      }
    }
  } catch (error) {
    console.error('Error loading blog post:', error)
  }

  return null
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid blog post ID' })
  }

  try {
    const post = getBlogPostById(id)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    return res.status(200).json(post)
  } catch (error) {
    console.error('Error in blog detail API:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
