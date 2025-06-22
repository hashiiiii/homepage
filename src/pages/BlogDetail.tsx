import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { BlogPost } from '@/models/blog.model'
import { fetchBlogPost } from '@/lib/api-client'
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer'

export function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<(BlogPost & { content: string, html: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadPost = async () => {
      try {
        setLoading(true)
        const data = await fetchBlogPost(id)
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-tn-text-secondary">Loading...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-tn-accent-red mb-4">
            {error || 'Post not found'}
          </h2>
          <Link
            to="/blog"
            className="text-tn-accent-blue hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center text-tn-accent-blue hover:underline mb-8"
        >
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-tn-text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-tn-text-secondary">
              <time>{new Date(post.date).toLocaleDateString()}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <div className="flex gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-tn-bg-tertiary text-tn-text-secondary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <MarkdownRenderer 
            content={post.content}
            className="max-w-none"
          />
        </article>
      </div>
    </div>
  )
}