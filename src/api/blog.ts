import { Hono } from 'hono';
import { getAllBlogPostsMetadata, getBlogPostById } from '@/lib/markdown-loader';
import type { BlogPost, BlogMetadata, TagCount, BlogArchive } from '@/models/blog.model';

const blog = new Hono();

// Cache for metadata calculations
let metadataCache: BlogMetadata | null = null;
let lastMetadataCacheTime = 0;
const METADATA_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function calculateMetadata(posts: BlogPost[]): BlogMetadata {
  const now = Date.now();

  // Return cached metadata if still valid
  if (metadataCache && now - lastMetadataCacheTime < METADATA_CACHE_DURATION) {
    return metadataCache;
  }

  // Calculate tag counts
  const tagCounts: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const tagCountsArray: TagCount[] = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  // Calculate archives
  const monthlyArchives: Record<string, BlogArchive> = {};
  posts.forEach((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month.toString().padStart(2, '0')}`;

    if (!monthlyArchives[key]) {
      monthlyArchives[key] = { year, month, count: 0 };
    }
    monthlyArchives[key].count++;
  });

  const archives: BlogArchive[] = Object.values(monthlyArchives).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  const metadata: BlogMetadata = {
    posts,
    archives,
    tagCounts: tagCountsArray,
  };

  // Update cache
  metadataCache = metadata;
  lastMetadataCacheTime = now;

  return metadata;
}

blog.get('/', async (c) => {
  try {
    // Markdownファイルから記事を読み込み
    const posts = getAllBlogPostsMetadata();

    if (posts.length === 0) {
      console.warn('No markdown files found');
      return c.json([]);
    }

    return c.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return c.json({ error: 'Failed to fetch blog posts' }, 500);
  }
});

blog.get('/metadata', async (c) => {
  try {
    const posts = getAllBlogPostsMetadata();
    const metadata = calculateMetadata(posts);
    return c.json(metadata);
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
    return c.json({ error: 'Failed to fetch blog metadata' }, 500);
  }
});

blog.get('/:id', async (c) => {
  const id = c.req.param('id');

  try {
    // Markdownファイルから記事を読み込み
    const post = getBlogPostById(id);

    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }

    return c.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return c.json({ error: 'Failed to fetch blog post' }, 500);
  }
});

export { blog };
