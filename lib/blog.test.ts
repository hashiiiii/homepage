import { describe, expect, it } from "vitest";
import { loadLocalPosts } from "./blog";

describe("loadLocalPosts", () => {
  it("should load markdown files from content/blog", async () => {
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

  it("should convert markdown to HTML via zenn-markdown-html", async () => {
    const posts = await loadLocalPosts();
    const postWithContent = posts.find((p) => p.html.length > 0);
    expect(postWithContent).toBeDefined();
    expect(postWithContent?.html).toContain("<");
  });
});
