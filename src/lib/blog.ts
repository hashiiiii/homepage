import type { BlogMetadata, BlogPost } from '@/models/blog.model';

// 生成された静的データをインポート
// ビルド時に生成されるため、実行時には必ず存在する
import metadataData from '@/generated/blog-metadata.json';
import postsData from '@/generated/blog-posts.json';

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

/**
 * ブログ記事一覧を取得
 */
export function getBlogPosts(): BlogPostWithContent[] {
  return postsData as BlogPostWithContent[];
}

/**
 * ブログメタデータを取得
 */
export function getBlogMetadata(): BlogMetadata {
  return metadataData as BlogMetadata;
}

/**
 * IDによるブログ記事取得
 */
export function getBlogPostById(id: string): BlogPostWithContent | null {
  const posts = getBlogPosts();
  return posts.find((post) => post.id === id) || null;
}

/**
 * タグによるブログ記事フィルタリング
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getBlogPosts();
  return posts
    .map(({ content, ...metadata }) => metadata)
    .filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

/**
 * 検索によるブログ記事フィルタリング
 */
export function searchBlogPosts(query: string): BlogPost[] {
  const posts = getBlogPosts();
  const lowerQuery = query.toLowerCase();

  return posts
    .map(({ content, ...metadata }) => metadata)
    .filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
}

/**
 * ブログ記事取得関数
 */
export function fetchBlogPost(id: string): (BlogPost & { content: string; html: string }) | null {
  const post = getBlogPostById(id);
  if (!post) {
    throw new Error('Blog post not found');
  }

  // htmlフィールドは MarkdownRenderer コンポーネントで処理されるため空文字列
  return {
    ...post,
    html: '',
  };
}

/**
 * ブログメタデータ取得関数
 */
export function fetchBlogMetadata(): BlogMetadata {
  return getBlogMetadata();
}
