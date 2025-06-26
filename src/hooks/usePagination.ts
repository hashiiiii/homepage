import { useState, useMemo, useCallback, useEffect } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number, deps: unknown[] = []) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when dependencies change
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Calculate displayed items
  const displayedItems = useMemo(() => {
    const endIndex = currentPage * itemsPerPage;
    return items.slice(0, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // Check if there are more items to load
  const hasMore = currentPage * itemsPerPage < items.length;

  // Load more items
  const loadMore = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  return {
    displayedItems,
    hasMore,
    loadMore,
    currentPage,
    totalPages: Math.ceil(items.length / itemsPerPage),
    remainingCount: items.length - displayedItems.length,
  };
}
