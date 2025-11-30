import React from "react";
import type { BlogMetadata, BlogPost } from "@/models/blog.model";

interface TagFilterSectionProps {
  posts: BlogPost[];
  selectedTags: string[];
  onTagFilter: (tags: string[]) => void;
  metadata?: BlogMetadata | null;
}

export const TagFilterSection: React.FC<TagFilterSectionProps> = React.memo(function TagFilterSection({
  posts,
  selectedTags,
  onTagFilter,
  metadata,
}) {
  const [showAllTags, setShowAllTags] = React.useState(false);
  const tagDisplayLimit = 8;

  const tagCounts = React.useMemo(() => {
    // Use pre-calculated tag counts from metadata if available
    if (metadata?.tagCounts) {
      return metadata.tagCounts;
    }

    // Fallback to client-side calculation if metadata not available
    const counts: Record<string, number> = {};

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts, metadata?.tagCounts]);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagFilter(selectedTags.filter((t) => t !== tag));
    } else {
      onTagFilter([...selectedTags, tag]);
    }
  };

  return (
    <section className="rounded-lg bg-tn-bg-secondary p-4 sm:p-6">
      <h3 className="mb-3 flex items-center text-base font-semibold text-tn-text-primary sm:mb-4 sm:text-lg">
        <span className="mr-2">🏷️</span>
        タグ
        {selectedTags.length > 0 && <span className="ml-2 text-xs text-tn-text-muted">(OR検索)</span>}
      </h3>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onTagFilter([])}
          className={`block w-full rounded px-3 py-2 text-left transition-colors ${
            selectedTags.length === 0
              ? "bg-tn-accent-blue text-white"
              : "text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
          }`}
        >
          すべて ({posts.length})
        </button>

        {(showAllTags ? tagCounts : tagCounts.slice(0, tagDisplayLimit)).map(({ tag, count }) => (
          <button
            type="button"
            key={tag}
            onClick={() => handleTagToggle(tag)}
            className={`flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors ${
              selectedTags.includes(tag)
                ? "bg-tn-accent-blue text-white"
                : "text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
            }`}
          >
            <span>
              {tag} ({count})
            </span>
            {selectedTags.includes(tag) && <span className="text-xs">✓</span>}
          </button>
        ))}

        {tagCounts.length > tagDisplayLimit && (
          <button
            type="button"
            onClick={() => setShowAllTags(!showAllTags)}
            className="border-tn-border/50 w-full rounded border px-3 py-2 text-sm text-tn-text-muted transition-colors hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
          >
            {showAllTags ? <>▲ タグを少なく表示</> : <>▼ すべてのタグを表示 ({tagCounts.length - tagDisplayLimit}個)</>}
          </button>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-4 border-t border-tn-border pt-4">
          <p className="mb-2 text-xs text-tn-text-muted">選択中のタグ:</p>
          <div className="flex flex-wrap gap-1">
            {selectedTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className="hover:bg-tn-accent-blue/80 inline-flex cursor-pointer items-center rounded bg-tn-accent-blue px-2 py-1 text-xs text-white"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                <span className="ml-1">×</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
});

TagFilterSection.displayName = "TagFilterSection";
