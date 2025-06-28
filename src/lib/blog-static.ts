import type { BlogPost, BlogMetadata } from '@/models/blog.model';

// 生成された静的データをインポート
// ビルド時に生成されるため、実行時には必ず存在する
import postsData from '@/generated/blog-posts.json';
import metadataData from '@/generated/blog-metadata.json';

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

/**
 * 静的に生成されたブログ記事一覧を取得
 */
export function getStaticBlogPosts(): BlogPostWithContent[] {
  return postsData as BlogPostWithContent[];
}

/**
 * 静的に生成されたブログメタデータを取得
 */
export function getStaticBlogMetadata(): BlogMetadata {
  return metadataData as BlogMetadata;
}

/**
 * IDによる静的ブログ記事取得
 */
export function getStaticBlogPostById(id: string): BlogPostWithContent | null {
  const posts = getStaticBlogPosts();
  return posts.find((post) => post.id === id) || null;
}

/**
 * タグによる静的ブログ記事フィルタリング
 */
export function getStaticBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getStaticBlogPosts();
  return posts
    .map(({ content, ...metadata }) => metadata)
    .filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

/**
 * 検索による静的ブログ記事フィルタリング
 */
export function searchStaticBlogPosts(query: string): BlogPost[] {
  const posts = getStaticBlogPosts();
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
