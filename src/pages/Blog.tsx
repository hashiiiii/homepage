import React from 'react';
import { BlogSidebar } from '../components/blog/BlogSidebar';
import { BlogFilters } from '../components/blog/BlogFilters';
import { BlogList } from '../components/blog/BlogList';
import { LoadingErrorWrapper } from '../components/common/LoadingErrorWrapper';
import { fetchBlogMetadata } from '@/lib/api-client';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAsyncData } from '../hooks/useAsyncData';
import { useBlogFilters } from '../hooks/useBlogFilters';
import { usePagination } from '../hooks/usePagination';

export const Blog: React.FC = () => {
  usePageTitle('Blog');
  const { data: metadata, loading, error } = useAsyncData(fetchBlogMetadata, []);

  const posts = metadata?.posts || [];

  const { filters, filteredPosts, setTagFilter, setArchiveFilter, clearFilters } =
    useBlogFilters(posts);

  const {
    displayedItems: displayedPosts,
    hasMore,
    loadMore,
    remainingCount,
  } = usePagination(filteredPosts, 6, [filters.tags, filters.archive]);

  return (
    <LoadingErrorWrapper loading={loading} error={error} loadingText="Loading posts...">
      <div className="animate-fade-in">
        <div className="w-full">
          <div className="mb-6 sm:mb-8">
            <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">Blog</h1>
            <BlogFilters
              filters={filters}
              onTagFilter={setTagFilter}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <BlogList
              posts={displayedPosts}
              filters={filters}
              hasMore={hasMore}
              remainingCount={remainingCount}
              onLoadMore={loadMore}
            />

            <BlogSidebar
              posts={posts}
              selectedTags={filters.tags}
              selectedArchive={filters.archive}
              onTagFilter={setTagFilter}
              onArchiveFilter={setArchiveFilter}
              metadata={metadata}
            />
          </div>
        </div>
      </div>
    </LoadingErrorWrapper>
  );
};
