import matter from "gray-matter";
import Parser from "rss-parser";
import markdownToHtml from "zenn-markdown-html";

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

const ZENN_USERNAME = "hashiiiii";
const CONTENT_DIR = `${process.cwd()}/content`;

/**
 * Parse markdown file and extract blog post data
 */
function extractPost(fileContent: string, filename: string): BlogPostWithContent {
  const { content, data } = matter(fileContent);
  const id = filename.replace(/\.md$/, "");

  return {
    id,
    title: String(data.title || ""),
    excerpt: String(data.excerpt || ""),
    content,
    html: "",
    date: String(data.date || new Date().toISOString().split("T")[0]),
    tags: Array.isArray(data.tags) ? data.tags : [],
    readTime: String(data.readTime || "5 min"),
    published: typeof data.published === "boolean" ? data.published : true,
    source: "local",
  };
}

/**
 * Validate a blog post's required fields
 */
function validatePost(post: BlogPostWithContent): string[] {
  const errors: string[] = [];

  if (!post.title) errors.push(`[${post.id}] title is required`);
  if (!post.date) errors.push(`[${post.id}] date is required`);

  if (post.date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(post.date)) {
      errors.push(`[${post.id}] date must be in YYYY-MM-DD format`);
    }
  }

  if (!Array.isArray(post.tags)) {
    errors.push(`[${post.id}] tags must be an array`);
  }

  if (!post.content) errors.push(`[${post.id}] content is required`);

  return errors;
}

/**
 * Load and process all local markdown blog posts
 */
export async function loadLocalPosts(): Promise<BlogPostWithContent[]> {
  const glob = new Bun.Glob("*.md");
  const files = Array.from(glob.scanSync(CONTENT_DIR));

  if (files.length === 0) {
    return [];
  }

  const posts: BlogPostWithContent[] = [];
  const allErrors: string[] = [];

  for (const file of files) {
    const fileContent = await Bun.file(`${CONTENT_DIR}/${file}`).text();
    const post = extractPost(fileContent, file);

    const errors = validatePost(post);
    if (errors.length > 0) {
      allErrors.push(...errors);
      continue;
    }

    post.html = await markdownToHtml(post.content, {
      embedOrigin: "https://embed.zenn.studio",
    });

    posts.push(post);
  }

  if (allErrors.length > 0) {
    console.error("Blog validation errors:", allErrors);
  }

  return posts;
}

/**
 * Fetch posts from Zenn RSS feed
 */
export async function fetchZennPosts(): Promise<BlogPost[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(`https://zenn.dev/${ZENN_USERNAME}/feed`);

    return feed.items.map((item) => {
      const urlParts = item.link?.split("/") || [];
      const id = `zenn-${urlParts[urlParts.length - 1] || item.guid || Date.now().toString()}`;
      const date = item.pubDate
        ? new Date(item.pubDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      return {
        id,
        title: item.title || "Untitled",
        excerpt: item.contentSnippet || item.content?.substring(0, 150) || "",
        date,
        tags: item.categories || ["Zenn"],
        readTime: "zenn",
        published: true,
        source: "zenn" as const,
        externalUrl: item.link,
      };
    });
  } catch (error) {
    console.error("Failed to fetch Zenn posts:", error);
    return [];
  }
}

/**
 * Get all published posts (local + Zenn), sorted by date descending
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const localPosts = (await loadLocalPosts()).filter((p) => p.published !== false);
  const zennPosts = await fetchZennPosts();

  const all = [...localPosts, ...zennPosts];
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
