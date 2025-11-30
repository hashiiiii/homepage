export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  published?: boolean;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
  html: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogArchive {
  year: number;
  month: number;
  count: number;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface BlogMetadata {
  posts: BlogPost[];
  archives: BlogArchive[];
  tagCounts: TagCount[];
}

export type CreateBlogPostInput = Omit<BlogPost, "id" | "publishedAt" | "updatedAt" | "viewCount">;
export type UpdateBlogPostInput = Partial<CreateBlogPostInput>;
