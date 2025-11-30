import type React from "react";
import type { BlogMetadata, BlogPost } from "@/models/blog.model";
import { ArchiveSection } from "./ArchiveSection";
import { RecentPosts } from "./RecentPosts";
import { TagFilterSection } from "./TagFilterSection";

interface BlogSidebarProps {
  posts: BlogPost[];
  selectedTags: string[];
  selectedArchive: { year: number; month: number } | null;
  onTagFilter: (tags: string[]) => void;
  onArchiveFilter: (year: number, month: number) => void;
  metadata?: BlogMetadata | null;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  posts,
  selectedTags,
  selectedArchive,
  onTagFilter,
  onArchiveFilter,
  metadata,
}) => {
  return (
    <aside className="w-full space-y-6 lg:w-80 lg:space-y-8">
      <RecentPosts posts={posts} />
      <ArchiveSection
        posts={posts}
        selectedArchive={selectedArchive}
        onArchiveFilter={onArchiveFilter}
        metadata={metadata}
      />
      <TagFilterSection posts={posts} selectedTags={selectedTags} onTagFilter={onTagFilter} metadata={metadata} />
    </aside>
  );
};
