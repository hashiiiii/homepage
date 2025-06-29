import { describe, it, expect, beforeAll } from 'vitest';
import { validateMarkdownPost, loadMarkdownFiles } from '../../src/lib/build-blog';
import { extractBlogPost } from '../../src/utils/markdown';
import type { BlogPost } from '../../src/models/blog.model';

interface BlogPostWithContent extends BlogPost {
  content: string;
}

describe('Markdown Validation', () => {
  describe('Individual Post Validation', () => {
    it('should validate required fields', () => {
      const invalidPost = {
        id: '',
        title: '',
        excerpt: '',
        content: '',
        date: '',
        tags: [],
        readTime: '',
      } as BlogPostWithContent;

      const errors = validateMarkdownPost('/test/file.md', invalidPost);

      expect(errors.length).toBeGreaterThan(0);
      // IDは自動生成されるので、エラーにはならない
      expect(errors.some((e) => e.field === 'id')).toBe(false);
      expect(errors.some((e) => e.field === 'title')).toBe(true);
      expect(errors.some((e) => e.field === 'date')).toBe(true);
      expect(errors.some((e) => e.field === 'content')).toBe(true);
    });

    it('should validate date format', () => {
      const validPost = {
        id: 'test-1',
        title: 'Test Post',
        excerpt: 'Test excerpt',
        content: 'Test content',
        date: '2023-12-25',
        tags: ['test'],
        readTime: '5 min read',
      } as BlogPostWithContent;

      const errors = validateMarkdownPost('/test/file.md', validPost);
      expect(errors.filter((e) => e.field === 'date')).toHaveLength(0);
    });

    it('should reject invalid date formats', () => {
      const invalidDates = [
        '23-12-25', // Wrong year format
        '2023/12/25', // Wrong separator
        '2023-13-25', // Invalid month
        '2023-12-32', // Invalid day
        'invalid-date', // Non-date string
      ];

      invalidDates.forEach((invalidDate) => {
        const post = {
          id: 'test-1',
          title: 'Test Post',
          excerpt: 'Test excerpt',
          content: 'Test content',
          date: invalidDate,
          tags: ['test'],
          readTime: '5 min read',
        } as BlogPostWithContent;

        const errors = validateMarkdownPost('/test/file.md', post);
        expect(errors.some((e) => e.field === 'date')).toBe(true);
      });
    });

    it('should validate tags as array of strings', () => {
      const invalidPost = {
        id: 'test-1',
        title: 'Test Post',
        excerpt: 'Test excerpt',
        content: 'Test content',
        date: '2023-12-25',
        tags: ['valid-tag', 123, null, ''] as any, // Invalid tag types
        readTime: '5 min read',
      } as BlogPostWithContent;

      const errors = validateMarkdownPost('/test/file.md', invalidPost);
      expect(errors.some((e) => e.field === 'tags')).toBe(true);
    });

    it('should pass validation for valid post', () => {
      const validPost = {
        id: 'test-1',
        title: 'Test Post',
        excerpt: 'Test excerpt',
        content: 'Test content with meaningful text',
        date: '2023-12-25',
        tags: ['typescript', 'testing'],
        readTime: '5 min read',
      } as BlogPostWithContent;

      const errors = validateMarkdownPost('/test/file.md', validPost);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Markdown File Processing', () => {
    it('should parse valid markdown with frontmatter', () => {
      const validMarkdown = `---
id: "test-post"
title: "Test Post Title"
date: "2023-12-25"
tags: ["typescript", "testing"]
excerpt: "This is a test excerpt"
readTime: "3 min read"
---

# Test Content

This is the main content of the test post.

## Section 1

Some content here.

\`\`\`typescript
const example = "code block";
\`\`\`

## Section 2

More content with **bold** and *italic* text.
`;

      expect(() => {
        const post = extractBlogPost(validMarkdown);
        expect(post.id).toBe('test-post');
        expect(post.title).toBe('Test Post Title');
        expect(post.content).toContain('# Test Content');
        expect(post.tags).toEqual(['typescript', 'testing']);
      }).not.toThrow();
    });

    it('should handle markdown without frontmatter (but validation will catch it)', () => {
      const invalidMarkdown = `# Just a heading

Some content without frontmatter.
`;

      const post = extractBlogPost(invalidMarkdown);
      const errors = validateMarkdownPost('/test/file.md', post);

      // extractBlogPost doesn't throw, but validation should catch missing fields
      expect(errors.length).toBeGreaterThan(0);
      // IDは自動生成されるので、エラーにはならない
      expect(errors.some((e) => e.field === 'id')).toBe(false);
      expect(errors.some((e) => e.field === 'title')).toBe(true);
    });

    it('should reject markdown with incomplete frontmatter', () => {
      const incompleteMarkdown = `---
title: "Missing Required Fields"
---

# Content

This is missing id, date, and other required fields.
`;

      const post = extractBlogPost(incompleteMarkdown);
      const errors = validateMarkdownPost('/test/file.md', post);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('Real Content Directory Validation', () => {
    let contentValidation: { posts: Map<string, BlogPostWithContent>; errors: any[] };

    beforeAll(() => {
      // 実際のcontentディレクトリを検証
      contentValidation = loadMarkdownFiles();
    });

    it('should have no validation errors in existing content', () => {
      if (contentValidation.errors.length > 0) {
        console.error('Validation errors found:');
        contentValidation.errors.forEach((error) => {
          console.error(`  ${error.file} [${error.field}]: ${error.message}`);
        });
      }

      expect(contentValidation.errors).toHaveLength(0);
    });

    it('should have at least one valid post', () => {
      expect(contentValidation.posts.size).toBeGreaterThan(0);
    });

    it('should have unique post IDs', () => {
      const ids = Array.from(contentValidation.posts.keys());
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have properly formatted posts', () => {
      contentValidation.posts.forEach((post, id) => {
        // ID validation
        expect(post.id).toBe(id);
        expect(typeof post.id).toBe('string');
        expect(post.id.length).toBeGreaterThan(0);

        // Title validation
        expect(typeof post.title).toBe('string');
        expect(post.title.length).toBeGreaterThan(0);

        // Date validation
        expect(typeof post.date).toBe('string');
        expect(/^\d{4}-\d{2}-\d{2}$/.test(post.date)).toBe(true);
        expect(new Date(post.date).getTime()).not.toBeNaN();

        // Tags validation
        expect(Array.isArray(post.tags)).toBe(true);
        post.tags.forEach((tag) => {
          expect(typeof tag).toBe('string');
          expect(tag.length).toBeGreaterThan(0);
        });

        // Content validation
        expect(typeof post.content).toBe('string');
        expect(post.content.length).toBeGreaterThan(0);

        // Optional fields validation
        if (post.excerpt) {
          expect(typeof post.excerpt).toBe('string');
        }

        if (post.readTime) {
          expect(typeof post.readTime).toBe('string');
        }
      });
    });
  });

  describe('Content Quality Checks', () => {
    let posts: Map<string, BlogPostWithContent>;

    beforeAll(() => {
      const result = loadMarkdownFiles();
      posts = result.posts;
    });

    it('should have meaningful content length', () => {
      posts.forEach((post) => {
        expect(post.content.length).toBeGreaterThan(100); // 最低100文字
        expect(post.title.length).toBeGreaterThan(5); // タイトル最低5文字
      });
    });

    it('should have proper markdown structure', () => {
      posts.forEach((post) => {
        // 見出しの存在チェック（# または ##）
        const hasHeadings = /^#{1,6}\s+.+$/m.test(post.content);
        expect(hasHeadings).toBe(true);
      });
    });

    it('should have at least one tag per post', () => {
      posts.forEach((post) => {
        expect(post.tags.length).toBeGreaterThan(0);
      });
    });

    it('should have valid dates (not future dates)', () => {
      const now = new Date();
      posts.forEach((post) => {
        const postDate = new Date(post.date);
        expect(postDate.getTime()).toBeLessThanOrEqual(now.getTime());
      });
    });
  });

  describe('Markdown Syntax Support', () => {
    it('should handle common markdown elements', () => {
      const complexMarkdown = `---
id: "syntax-test"
title: "Markdown Syntax Test"
date: "2023-12-25"
tags: ["markdown", "syntax"]
excerpt: "Testing markdown syntax support"
---

# Main Heading

## Sub Heading

### Smaller Heading

**Bold text** and *italic text* and ***bold italic***.

> This is a blockquote
> with multiple lines

\`\`\`typescript
const code = "syntax highlighting";
function example() {
  return code;
}
\`\`\`

- List item 1
- List item 2
  - Nested item
  - Another nested item

1. Numbered list
2. Second item

[Link text](https://example.com)

| Table | Header |
|-------|--------|
| Cell 1| Cell 2 |

![Image alt text](image.jpg)
`;

      expect(() => {
        const post = extractBlogPost(complexMarkdown);
        expect(post.content).toContain('# Main Heading');
        expect(post.content).toContain('```typescript');
        expect(post.content).toContain('> This is a blockquote');
      }).not.toThrow();
    });
  });
});
