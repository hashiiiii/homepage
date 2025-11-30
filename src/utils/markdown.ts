import matter from "gray-matter";
import type { BlogPost } from "@/models/blog.model";

export interface MarkdownFile {
  content: string;
  data: Record<string, unknown>;
}

/**
 * Parse markdown file with frontmatter
 */
export function parseMarkdown(fileContent: string): MarkdownFile {
  const { content, data } = matter(fileContent);
  return { content, data };
}

/**
 * Extract blog post data from markdown file
 */
export function extractBlogPost(fileContent: string): BlogPost & { content: string; html: string } {
  const { content, data } = parseMarkdown(fileContent);

  return {
    id: String(data.id || ""),
    title: String(data.title || ""),
    excerpt: String(data.excerpt || ""),
    content,
    html: "", // HTMLはビルド時に生成される
    date: String(data.date || new Date().toISOString()),
    tags: Array.isArray(data.tags) ? data.tags : [],
    readTime: String(data.readTime || "5 min read"),
    published: typeof data.published === "boolean" ? data.published : true, // デフォルトはtrue（公開）
  };
}
