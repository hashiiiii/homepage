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
