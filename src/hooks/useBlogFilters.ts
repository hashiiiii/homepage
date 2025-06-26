import { useState, useMemo, useCallback } from 'react';
import type { BlogPost } from '@/models/blog.model';

export interface BlogFilters {
  tags: string[];
  archive: { year: number; month: number } | null;
}

export function useBlogFilters(posts: BlogPost[] | null) {
  const [filters, setFilters] = useState<BlogFilters>({
    tags: [],
    archive: null,
  });

  // Filter posts based on current filters
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    let filtered = posts;

    // Tag filter (OR search)
    if (filters.tags.length > 0) {
      filtered = filtered.filter((post) => filters.tags.some((tag) => post.tags.includes(tag)));
    }

    // Archive filter
    if (filters.archive) {
      const archive = filters.archive;
      filtered = filtered.filter((post) => {
        const date = new Date(post.date);
        return date.getFullYear() === archive.year && date.getMonth() + 1 === archive.month;
      });
    }

    return filtered;
  }, [posts, filters]);

  // Set tag filter and clear archive
  const setTagFilter = useCallback((tags: string[]) => {
    setFilters({ tags, archive: null });
  }, []);

  // Set archive filter and clear tags
  const setArchiveFilter = useCallback((year: number, month: number) => {
    setFilters({ tags: [], archive: { year, month } });
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({ tags: [], archive: null });
  }, []);

  return {
    filters,
    filteredPosts,
    setTagFilter,
    setArchiveFilter,
    clearFilters,
  };
}
