import type { BlogPost, BlogMetadata } from '@/models/blog.model';
import { getStaticBlogPosts, getStaticBlogMetadata, getStaticBlogPostById } from './blog-static';

/**
 * 静的データから全ブログ記事を取得
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = getStaticBlogPosts();
    // contentを除いてメタデータのみ返す
    return posts.map(({ content, ...metadata }) => metadata);
  } catch (error) {
    console.error('Error fetching static blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
}

/**
 * 静的データから特定のブログ記事を取得
 */
export async function fetchBlogPost(
  id: string
): Promise<BlogPost & { content: string; html: string }> {
  try {
    const post = getStaticBlogPostById(id);

    if (!post) {
      throw new Error('Blog post not found');
    }

    // html フィールドは MarkdownRenderer コンポーネントで処理されるため空文字列
    return {
      ...post,
      html: '',
    };
  } catch (error) {
    console.error('Error fetching static blog post:', error);
    if (error instanceof Error && error.message === 'Blog post not found') {
      throw error;
    }
    throw new Error('Failed to fetch blog post');
  }
}

/**
 * 静的データからブログメタデータを取得
 */
export async function fetchBlogMetadata(): Promise<BlogMetadata> {
  try {
    return getStaticBlogMetadata();
  } catch (error) {
    console.error('Error fetching static blog metadata:', error);
    throw new Error('Failed to fetch blog metadata');
  }
}
