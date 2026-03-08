import { describe, expect, it } from "vitest";
import type { BlogPost } from "../types/blog";
import { calculateMetadata, loadLocalPosts } from "./blog";

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

describe("calculateMetadata", () => {
  it("should calculate tag counts", () => {
    const posts: BlogPost[] = [
      {
        id: "1",
        title: "A",
        excerpt: "",
        date: "2025-01-01",
        tags: ["Go", "Rust"],
        readTime: "3 min",
        source: "local",
      },
      { id: "2", title: "B", excerpt: "", date: "2025-02-01", tags: ["Go"], readTime: "5 min", source: "local" },
    ];

    const metadata = calculateMetadata(posts);

    expect(metadata.tagCounts).toContainEqual({ tag: "Go", count: 2 });
    expect(metadata.tagCounts).toContainEqual({ tag: "Rust", count: 1 });
  });

  it("should calculate archives sorted by date descending", () => {
    const posts: BlogPost[] = [
      { id: "1", title: "A", excerpt: "", date: "2025-01-15", tags: [], readTime: "", source: "local" },
      { id: "2", title: "B", excerpt: "", date: "2025-03-10", tags: [], readTime: "", source: "local" },
      { id: "3", title: "C", excerpt: "", date: "2025-01-20", tags: [], readTime: "", source: "local" },
    ];

    const metadata = calculateMetadata(posts);

    expect(metadata.archives[0]).toEqual({ year: 2025, month: 3, count: 1 });
    expect(metadata.archives[1]).toEqual({ year: 2025, month: 1, count: 2 });
  });

  it("should return empty arrays for no posts", () => {
    const metadata = calculateMetadata([]);
    expect(metadata.posts).toEqual([]);
    expect(metadata.archives).toEqual([]);
    expect(metadata.tagCounts).toEqual([]);
  });
});
