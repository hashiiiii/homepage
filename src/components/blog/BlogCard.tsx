import React from 'react'
import { Link } from 'react-router-dom'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  readTime: string
}

interface BlogCardProps {
  post: BlogPost
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="card hover:shadow-lg hover:shadow-tn-bg-tertiary/50 transition-all duration-300">
      <Link to={`/blog/${post.id}`} className="block">
        <h3 className="text-xl font-semibold mb-2 text-tn-fg-primary hover:text-tn-blue transition-colors">
          {post.title}
        </h3>
        <p className="text-tn-fg-secondary mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-tn-fg-muted">
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="tag text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}