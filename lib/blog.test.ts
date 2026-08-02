import { describe, expect, it } from "vitest";
import { loadLocalPosts, validatePost } from "./blog";

describe("loadLocalPosts", () => {
  it("should load markdown files from content", async () => {
    const posts = await loadLocalPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("should have required fields on each post", async () => {
    const posts = await loadLocalPosts();
    for (const post of posts) {
      expect(post.id).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.html).toBeTruthy();
      expect(post.source).toBe("local");
    }
  });

  it("should reject whitespace-only content as missing", () => {
    // gray-matter returns "\n" for a markdown file that has front matter but no
    // body. That is truthy, so a naive `!content` check lets the post through
    // and markdownToHtml renders it to an empty string.
    const errors = validatePost({
      id: "draft",
      title: "Draft",
      excerpt: "",
      content: "\n",
      html: "",
      date: "2026-06-21",
      tags: [],
      readTime: "5 min",
      published: false,
      source: "local",
    });
    expect(errors).toContain("[draft] content is required");
  });

  it("should convert markdown to HTML via zenn-markdown-html", async () => {
    const posts = await loadLocalPosts();
    const postWithContent = posts.find((p) => p.html.length > 0);
    expect(postWithContent).toBeDefined();
    expect(postWithContent?.html).toContain("<");
  });
});
