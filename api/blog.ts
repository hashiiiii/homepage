import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

// TypeScript interfaces
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
}

interface BlogPostWithContent extends BlogPost {
  content: string;
}

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

/**
 * Load all markdown files from content directory
 */
function loadMarkdownFiles(): Map<string, BlogPostWithContent> {
  const posts = new Map<string, BlogPostWithContent>();

  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      console.warn(`Content directory not found: ${CONTENT_DIR}`);
      return posts;
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    for (const file of mdFiles) {
      const filePath = path.join(CONTENT_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const { data, content } = matter(fileContent);

      if (!data.id || !data.title) {
        console.warn(`Invalid frontmatter in ${file}: missing id or title`);
        continue;
      }

      const post: BlogPostWithContent = {
        id: String(data.id),
        title: String(data.title),
        excerpt: String(data.excerpt || ''),
        content,
        date: String(data.date || new Date().toISOString().split('T')[0]),
        tags: Array.isArray(data.tags) ? data.tags : [],
        readTime: String(data.readTime || '5 min read'),
      };

      posts.set(post.id, post);
    }
  } catch (error) {
    console.error('Error loading markdown files:', error);
  }

  return posts;
}

/**
 * Get all blog posts metadata (without content)
 */
function getAllBlogPostsMetadata(): BlogPost[] {
  const posts = loadMarkdownFiles();

  return Array.from(posts.values())
    .map(({ content: _content, ...metadata }) => metadata)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by ID
 */
function getBlogPostById(id: string): BlogPostWithContent | null {
  const posts = loadMarkdownFiles();
  return posts.get(id) || null;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    if (!slug || Array.isArray(slug)) {
      // Get all blog posts
      const posts = getAllBlogPostsMetadata();
      return res.status(200).json(posts);
    } else {
      // Get specific blog post
      const post = getBlogPostById(slug);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json(post);
    }
  } catch (error) {
    console.error('Error in blog API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
