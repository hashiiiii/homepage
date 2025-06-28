#!/usr/bin/env tsx

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { BlogPost, BlogMetadata, TagCount, BlogArchive } from '../src/models/blog.model';
import { extractBlogPost } from '../src/utils/markdown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/blog');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src/generated');

interface BlogPostWithContent extends BlogPost {
  content: string;
}

interface ValidationError {
  file: string;
  field: string;
  message: string;
}

/**
 * Markdownファイルの仕様検証
 */
function validateMarkdownPost(filePath: string, post: BlogPostWithContent): ValidationError[] {
  const errors: ValidationError[] = [];
  const fileName = path.basename(filePath);

  // 必須フィールドのチェック
  if (!post.id || typeof post.id !== 'string') {
    errors.push({ file: fileName, field: 'id', message: 'id is required and must be a string' });
  }

  if (!post.title || typeof post.title !== 'string') {
    errors.push({
      file: fileName,
      field: 'title',
      message: 'title is required and must be a string',
    });
  }

  if (!post.date || typeof post.date !== 'string') {
    errors.push({
      file: fileName,
      field: 'date',
      message: 'date is required and must be a string',
    });
  } else {
    // 日付形式のチェック (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(post.date)) {
      errors.push({
        file: fileName,
        field: 'date',
        message: 'date must be in YYYY-MM-DD format',
      });
    } else {
      const date = new Date(post.date);
      if (isNaN(date.getTime())) {
        errors.push({
          file: fileName,
          field: 'date',
          message: 'date must be a valid date',
        });
      }
    }
  }

  if (!Array.isArray(post.tags)) {
    errors.push({ file: fileName, field: 'tags', message: 'tags must be an array' });
  } else if (post.tags.some((tag) => typeof tag !== 'string')) {
    errors.push({ file: fileName, field: 'tags', message: 'all tags must be strings' });
  }

  if (post.excerpt && typeof post.excerpt !== 'string') {
    errors.push({
      file: fileName,
      field: 'excerpt',
      message: 'excerpt must be a string if provided',
    });
  }

  if (post.readTime && typeof post.readTime !== 'string') {
    errors.push({
      file: fileName,
      field: 'readTime',
      message: 'readTime must be a string if provided',
    });
  }

  if (!post.content || typeof post.content !== 'string') {
    errors.push({
      file: fileName,
      field: 'content',
      message: 'content is required and must be a string',
    });
  }

  // IDの重複チェック用に呼び出し側で処理する

  return errors;
}

/**
 * Markdownファイルを読み込んで解析
 */
function loadMarkdownFiles(): {
  posts: Map<string, BlogPostWithContent>;
  errors: ValidationError[];
} {
  const posts = new Map<string, BlogPostWithContent>();
  const allErrors: ValidationError[] = [];

  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      console.warn(`Content directory not found: ${CONTENT_DIR}`);
      return { posts, errors: allErrors };
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    console.log(`Found ${mdFiles.length} markdown files`);

    for (const file of mdFiles) {
      const filePath = path.join(CONTENT_DIR, file);

      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const post = extractBlogPost(fileContent);

        // 仕様検証
        const errors = validateMarkdownPost(filePath, post);
        if (errors.length > 0) {
          allErrors.push(...errors);
          continue; // エラーがある場合はスキップ
        }

        // ID重複チェック
        if (posts.has(post.id)) {
          allErrors.push({
            file,
            field: 'id',
            message: `Duplicate post ID: ${post.id} (already used in another file)`,
          });
          continue;
        }

        posts.set(post.id, post);
        console.log(`✅ Processed: ${file} (id: ${post.id})`);
      } catch (error) {
        allErrors.push({
          file,
          field: 'parsing',
          message: `Failed to parse markdown: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
        console.error(`❌ Failed to parse ${file}:`, error);
      }
    }
  } catch (error) {
    allErrors.push({
      file: 'directory',
      field: 'access',
      message: `Failed to read content directory: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
    console.error('Error reading content directory:', error);
  }

  return { posts, errors: allErrors };
}

/**
 * ブログメタデータを計算
 */
function calculateMetadata(posts: BlogPost[]): BlogMetadata {
  // タグの集計
  const tagCounts: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const tagCountsArray: TagCount[] = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  // アーカイブの集計
  const monthlyArchives: Record<string, BlogArchive> = {};
  posts.forEach((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month.toString().padStart(2, '0')}`;

    if (!monthlyArchives[key]) {
      monthlyArchives[key] = { year, month, count: 0 };
    }
    monthlyArchives[key].count++;
  });

  const archives: BlogArchive[] = Object.values(monthlyArchives).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  return {
    posts,
    archives,
    tagCounts: tagCountsArray,
  };
}

/**
 * メイン処理
 */
async function main() {
  console.log('🔨 Building blog data...');

  // Markdownファイルの読み込みと検証
  const { posts, errors } = loadMarkdownFiles();

  // エラーがある場合は処理を停止
  if (errors.length > 0) {
    console.error('\n❌ Markdown validation errors found:');
    errors.forEach((error) => {
      console.error(`  ${error.file} [${error.field}]: ${error.message}`);
    });
    console.error(`\nTotal errors: ${errors.length}`);
    process.exit(1);
  }

  if (posts.size === 0) {
    console.warn('⚠️  No valid markdown files found');
    return;
  }

  // データの整理
  const postsArray = Array.from(posts.values())
    .map(({ content, ...metadata }) => ({ ...metadata, content }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const postsMetadataOnly = postsArray.map(({ content, ...metadata }) => metadata);
  const metadata = calculateMetadata(postsMetadataOnly);

  // 出力ディレクトリの作成
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // JSONファイルの生成
  const postsOutputPath = path.join(OUTPUT_DIR, 'blog-posts.json');
  const metadataOutputPath = path.join(OUTPUT_DIR, 'blog-metadata.json');

  fs.writeFileSync(postsOutputPath, JSON.stringify(postsArray, null, 2));
  fs.writeFileSync(metadataOutputPath, JSON.stringify(metadata, null, 2));

  console.log(`✅ Generated ${postsArray.length} blog posts`);
  console.log(`📁 Posts data: ${postsOutputPath}`);
  console.log(`📁 Metadata: ${metadataOutputPath}`);
  console.log('🎉 Blog data build completed successfully!');
}

// 実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });
}

export { loadMarkdownFiles, validateMarkdownPost, calculateMetadata };
