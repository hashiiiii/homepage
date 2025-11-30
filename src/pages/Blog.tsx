import type React from "react";
import { fetchBlogMetadata } from "@/lib/blog";
import { BlogFilters } from "../components/blog/BlogFilters";
import { BlogList } from "../components/blog/BlogList";
import { BlogSidebar } from "../components/blog/BlogSidebar";
import { useBlogFilters } from "../hooks/useBlogFilters";
import { usePageTitle } from "../hooks/usePageTitle";
import { usePagination } from "../hooks/usePagination";

export const Blog: React.FC = () => {
  usePageTitle("Blog");
  const metadata = fetchBlogMetadata();

  const posts = metadata?.posts || [];

  const { filters, filteredPosts, setTagFilter, setArchiveFilter, clearFilters } = useBlogFilters(posts);

  const { displayedItems: displayedPosts, hasMore, loadMore, remainingCount } = usePagination(filteredPosts, 6);

  return (
    <div className="animate-fade-in">
      <div className="w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">Blog</h1>
          <BlogFilters filters={filters} onTagFilter={setTagFilter} onClearFilters={clearFilters} />
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
  );
};
