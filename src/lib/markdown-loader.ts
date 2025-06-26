import fs from 'fs';
import path from 'path';
import type { BlogPost } from '@/models/blog.model';
import { extractBlogPost } from '@/utils/markdown';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

// Cache for loaded posts
let postsCache: Map<string, BlogPost & { content: string }> | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in development

/**
 * Load all markdown files from content directory (synchronous)
 */
export function loadMarkdownFiles(): Map<string, BlogPost & { content: string }> {
  const now = Date.now();

  // Return cached posts if cache is still valid
  if (postsCache && now - lastCacheTime < CACHE_DURATION) {
    return postsCache;
  }

  const posts = new Map<string, BlogPost & { content: string }>();

  try {
    // ディレクトリが存在しない場合は空のMapを返す
    if (!fs.existsSync(CONTENT_DIR)) {
      console.warn(`Content directory not found: ${CONTENT_DIR}`);
      postsCache = posts;
      lastCacheTime = now;
      return posts;
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    for (const file of mdFiles) {
      const filePath = path.join(CONTENT_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      try {
        const post = extractBlogPost(fileContent);

        // フロントマターの必須フィールドをチェック
        if (!post.id || !post.title) {
          console.warn(`Invalid frontmatter in ${file}: missing id or title`);
          continue;
        }

        posts.set(post.id, post);
      } catch (error) {
        console.warn(`Error parsing ${file}:`, error);
        continue;
      }
    }
  } catch (error) {
    console.error('Error loading markdown files:', error);
  }

  // Update cache
  postsCache = posts;
  lastCacheTime = now;

  return posts;
}

/**
 * Get all blog posts metadata (without content)
 */
export function getAllBlogPostsMetadata(): BlogPost[] {
  const posts = loadMarkdownFiles();

  return Array.from(posts.values())
    .map(({ content: _content, ...metadata }) => metadata)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by ID
 */
export function getBlogPostById(id: string): (BlogPost & { content: string }) | null {
  const posts = loadMarkdownFiles();
  return posts.get(id) || null;
}

/**
 * Search blog posts
 */
export function searchBlogPosts(query: string): BlogPost[] {
  const posts = getAllBlogPostsMetadata();
  const lowerQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPostsMetadata();
  return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}
