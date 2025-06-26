import React from 'react';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogSidebar } from '../components/blog/BlogSidebar';
import { fetchBlogPosts } from '@/lib/api-client';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAsyncData } from '../hooks/useAsyncData';
import { useBlogFilters } from '../hooks/useBlogFilters';
import { usePagination } from '../hooks/usePagination';

export const Blog: React.FC = () => {
  usePageTitle('Blog');
  const { data: posts, loading, error } = useAsyncData(fetchBlogPosts, []);

  // Filter management
  const { filters, filteredPosts, setTagFilter, setArchiveFilter, clearFilters } =
    useBlogFilters(posts);

  // Pagination management
  const {
    displayedItems: displayedPosts,
    hasMore,
    loadMore,
    remainingCount,
  } = usePagination(filteredPosts, 6, [filters.tags, filters.archive]);

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-tn-fg-secondary">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-tn-red">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">Blog</h1>
          {(filters.tags.length > 0 || filters.archive) && (
            <div className="mt-4">
              <span className="text-tn-text-secondary">
                フィルター:
                {filters.tags.length > 0 && ` ${filters.tags.length}個のタグでOR検索`}
                {filters.archive && ` ${filters.archive.year}年${filters.archive.month}月`}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {filters.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-tn-accent-blue px-3 py-1 text-sm text-white"
                  >
                    {tag}
                    <button
                      onClick={() => setTagFilter(filters.tags.filter((t) => t !== tag))}
                      className="ml-2 hover:text-tn-text-muted"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {filters.archive && (
                  <span className="inline-flex items-center rounded-full bg-tn-green px-3 py-1 text-sm text-white">
                    {filters.archive.year}年{filters.archive.month}月
                    <button
                      onClick={() => clearFilters()}
                      className="ml-2 hover:text-tn-text-muted"
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="rounded-full border border-tn-border px-3 py-1 text-sm text-tn-text-muted hover:text-tn-text-primary"
                >
                  すべてクリア
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* メインコンテンツ */}
          <main className="min-w-0 flex-1">
            <div className="space-y-4 sm:space-y-6">
              {displayedPosts.length > 0 ? (
                displayedPosts.map((post) => <BlogCard key={post.id} post={post} />)
              ) : (
                <div className="py-12 text-center">
                  <p className="text-tn-text-secondary">
                    {filters.tags.length > 0
                      ? `選択されたタグ「${filters.tags.join('、')}」の記事が見つかりませんでした`
                      : filters.archive
                        ? `${filters.archive.year}年${filters.archive.month}月の記事が見つかりませんでした`
                        : '記事が見つかりませんでした'}
                  </p>
                </div>
              )}
            </div>

            {hasMore && (
              <div className="mt-8 text-center sm:mt-12">
                <button onClick={loadMore} className="btn-secondary w-full sm:w-auto">
                  Load More Posts ({remainingCount}件残り)
                </button>
              </div>
            )}
          </main>

          {/* サイドバー */}
          <BlogSidebar
            posts={posts || []}
            selectedTags={filters.tags}
            selectedArchive={filters.archive}
            onTagFilter={setTagFilter}
            onArchiveFilter={setArchiveFilter}
          />
        </div>
      </div>
    </div>
  );
};
