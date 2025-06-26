import type { BlogPost, BlogMetadata } from '@/models/blog.model';

const API_BASE = '/api';

/**
 * Fetch all blog posts
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_BASE}/blog`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

/**
 * Fetch a single blog post by ID
 */
export async function fetchBlogPost(
  id: string
): Promise<BlogPost & { content: string; html: string }> {
  try {
    const response = await fetch(`${API_BASE}/blog/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Blog post not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

/**
 * Fetch resume data
 */
export async function fetchResume() {
  try {
    const response = await fetch(`${API_BASE}/resume`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }
}

/**
 * Fetch blog metadata with pre-calculated tag counts and archives
 */
export async function fetchBlogMetadata(): Promise<BlogMetadata> {
  try {
    const response = await fetch(`${API_BASE}/blog/metadata`);
    if (!response.ok) {
      // Fallback to old API if metadata endpoint is not available
      if (response.status === 404) {
        console.warn('Blog metadata endpoint not available, falling back to posts API');
        const posts = await fetchBlogPosts();
        
        // Calculate metadata on client side as fallback
        const tagCounts: Record<string, number> = {};
        posts.forEach(post => {
          post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        });

        const tagCountsArray = Object.entries(tagCounts)
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count);

        const monthlyArchives: Record<string, { year: number; month: number; count: number }> = {};
        posts.forEach(post => {
          const date = new Date(post.date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const key = `${year}-${month.toString().padStart(2, '0')}`;

          if (!monthlyArchives[key]) {
            monthlyArchives[key] = { year, month, count: 0 };
          }
          monthlyArchives[key].count++;
        });

        const archives = Object.values(monthlyArchives)
          .sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
          });

        return {
          posts,
          archives,
          tagCounts: tagCountsArray,
        };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
    throw error;
  }
}
