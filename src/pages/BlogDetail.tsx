import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPost } from '@/lib/blog';
import { ZennContentRenderer } from '@/components/blog/ZennContentRenderer';
import { usePageTitle } from '../hooks/usePageTitle';

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();

  let post = null;
  let error = null;

  try {
    post = id ? fetchBlogPost(id) : null;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  // Set page title when post is loaded
  usePageTitle(post?.title);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-tn-red">Error loading post</h2>
          <p className="mb-4 text-tn-fg-secondary">{error}</p>
          <Link to="/blog" className="text-tn-blue hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-tn-red">Post not found</h2>
          <Link to="/blog" className="text-tn-blue hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Link to="/blog" className="mb-8 inline-flex items-center text-tn-blue hover:underline">
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold text-tn-fg-primary">{post.title}</h1>
            <div className="flex items-center gap-4 text-tn-fg-secondary">
              <time>{new Date(post.date).toLocaleDateString()}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <div className="mt-4 flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-tn-bg-tertiary px-3 py-1 text-sm text-tn-fg-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <ZennContentRenderer html={post.html} className="max-w-none" />
        </article>
      </div>
    </div>
  );
}
