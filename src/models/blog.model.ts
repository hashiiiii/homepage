export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
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

export type CreateBlogPostInput = Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt' | 'viewCount'>;
export type UpdateBlogPostInput = Partial<CreateBlogPostInput>;