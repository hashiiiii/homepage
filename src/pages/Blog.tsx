import React from 'react'
import { BlogCard } from '../components/blog/BlogCard'

const mockPosts = [
  {
    id: '1',
    title: 'Building Modern Web Applications with Hono',
    excerpt: 'Explore how to create lightning-fast web applications using Hono, a small, simple, and ultra-fast web framework for the Edge.',
    date: '2024-01-15',
    tags: ['Hono', 'TypeScript', 'Edge'],
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'AWS Lambda Best Practices',
    excerpt: 'Learn the best practices for building scalable and cost-effective serverless applications with AWS Lambda.',
    date: '2024-01-10',
    tags: ['AWS', 'Serverless', 'Cloud'],
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'Tokyo Night Theme: A Developer\'s Dream',
    excerpt: 'Deep dive into why Tokyo Night has become one of the most popular color themes among developers.',
    date: '2024-01-05',
    tags: ['Design', 'Productivity', 'Tools'],
    readTime: '4 min read',
  },
]

export const Blog: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-tn-fg-secondary mb-12">
          Thoughts on web development, cloud architecture, and technology
        </p>
        
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="btn-secondary">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
}