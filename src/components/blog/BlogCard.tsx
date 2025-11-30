import type React from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/models/blog.model";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="card hover:shadow-tn-bg-tertiary/50 transition-all duration-300 hover:shadow-lg">
      <Link to={`/blog/${post.id}`} className="block">
        <h3 className="mb-2 text-lg font-semibold text-tn-fg-primary transition-colors hover:text-tn-blue sm:text-xl">
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-tn-fg-secondary">{post.excerpt}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-tn-fg-muted sm:gap-4">
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="flex flex-wrap gap-1 sm:gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};
