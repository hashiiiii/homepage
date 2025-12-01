import type React from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/models/blog.model";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const isZennPost = post.source === "zenn";
  const linkUrl = isZennPost && post.externalUrl ? post.externalUrl : `/blog/${post.id}`;

  return (
    <article className="card hover:shadow-tn-bg-tertiary/50 flex h-full flex-col transition-all duration-300 hover:shadow-lg">
      {isZennPost && post.externalUrl ? (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col">
          <div className="mb-2 flex min-h-[3.5rem] items-start justify-between gap-2 sm:min-h-[4rem]">
            <h3 className="line-clamp-2 flex-1 text-lg font-semibold text-tn-fg-primary transition-colors hover:text-tn-blue sm:text-xl">
              {post.title}
            </h3>
            <div className="flex-shrink-0 pt-1" title="Zenn記事">
              <svg className="size-5 text-tn-text-muted" fill="currentColor" viewBox="0 0 24 24" aria-label="Zenn">
                <title>Zenn</title>
                <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z" />
              </svg>
            </div>
          </div>
          <p className="mb-4 line-clamp-3 flex-grow text-tn-fg-secondary">{post.excerpt}</p>

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
        </a>
      ) : (
        <Link to={linkUrl} className="flex h-full flex-col">
          <div className="mb-2 flex min-h-[3.5rem] items-start justify-between gap-2 sm:min-h-[4rem]">
            <h3 className="line-clamp-2 flex-1 text-lg font-semibold text-tn-fg-primary transition-colors hover:text-tn-blue sm:text-xl">
              {post.title}
            </h3>
          </div>
          <p className="mb-4 line-clamp-3 flex-grow text-tn-fg-secondary">{post.excerpt}</p>

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
      )}
    </article>
  );
};
