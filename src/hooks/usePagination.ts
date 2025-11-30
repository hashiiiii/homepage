import { useCallback, useMemo, useRef, useState } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const prevItemsLengthRef = useRef(items.length);

  // Reset to first page when items array length changes
  if (prevItemsLengthRef.current !== items.length) {
    prevItemsLengthRef.current = items.length;
    setCurrentPage(1);
  }

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
