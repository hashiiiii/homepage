import React from 'react';
import { BlogCard } from './BlogCard';
import type { BlogPost } from '@/models/blog.model';
import type { BlogFilters } from '@/hooks/useBlogFilters';

interface BlogListProps {
  posts: BlogPost[];
  filters: BlogFilters;
  hasMore: boolean;
  remainingCount: number;
  onLoadMore: () => void;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  filters,
  hasMore,
  remainingCount,
  onLoadMore,
}) => {
  const getEmptyMessage = () => {
    if (filters.tags.length > 0) {
      return `選択されたタグ「${filters.tags.join('、')}」の記事が見つかりませんでした`;
    }
    if (filters.archive) {
      return `${filters.archive.year}年${filters.archive.month}月の記事が見つかりませんでした`;
    }
    return '記事が見つかりませんでした';
  };

  return (
    <main className="min-w-0 flex-1">
      <div className="space-y-4 sm:space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <BlogCard key={post.id} post={post} />)
        ) : (
          <div className="py-12 text-center">
            <p className="text-tn-text-secondary">{getEmptyMessage()}</p>
          </div>
        )}
      </div>

      {hasMore && (
        <div className="mt-8 text-center sm:mt-12">
          <button onClick={onLoadMore} className="btn-secondary w-full sm:w-auto">
            Load More Posts ({remainingCount}件残り)
          </button>
        </div>
      )}
    </main>
  );
};
