export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  category: string;
  publishedAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  slug: string;
  viewCount: number;
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