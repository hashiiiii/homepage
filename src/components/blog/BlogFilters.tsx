import type React from "react";
import type { BlogFilters as BlogFiltersType } from "@/hooks/useBlogFilters";

interface BlogFiltersProps {
  filters: BlogFiltersType;
  onTagFilter: (tags: string[]) => void;
  onClearFilters: () => void;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({ filters, onTagFilter, onClearFilters }) => {
  const hasActiveFilters = filters.tags.length > 0 || filters.archive;

  if (!hasActiveFilters) {
    return null;
  }

  const removeTag = (tagToRemove: string) => {
    onTagFilter(filters.tags.filter((tag) => tag !== tagToRemove));
  };

  return (
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
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 hover:text-tn-text-muted"
              aria-label={`Remove ${tag} filter`}
            >
              ✕
            </button>
          </span>
        ))}
        {filters.archive && (
          <span className="inline-flex items-center rounded-full bg-tn-green px-3 py-1 text-sm text-white">
            {filters.archive.year}年{filters.archive.month}月
            <button
              type="button"
              onClick={onClearFilters}
              className="ml-2 hover:text-tn-text-muted"
              aria-label="Remove archive filter"
            >
              ✕
            </button>
          </span>
        )}
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-full border border-tn-border px-3 py-1 text-sm text-tn-text-muted hover:text-tn-text-primary"
        >
          すべてクリア
        </button>
      </div>
    </div>
  );
};
