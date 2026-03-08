export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  published?: boolean;
  source?: "local" | "zenn";
  externalUrl?: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
  html: string;
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
