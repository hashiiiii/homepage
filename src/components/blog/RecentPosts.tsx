import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '@/models/blog.model';

interface RecentPostsProps {
  posts: BlogPost[];
}

export const RecentPosts: React.FC<RecentPostsProps> = React.memo(function RecentPosts({ posts }) {
  const recentPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section className="rounded-lg bg-tn-bg-secondary p-4 sm:p-6">
      <h3 className="mb-3 flex items-center text-base font-semibold text-tn-text-primary sm:mb-4 sm:text-lg">
        <span className="mr-2">📝</span>
        最近の記事
      </h3>

      <div className="space-y-3">
        {recentPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="group block">
            <h4 className="mb-1 line-clamp-2 text-sm text-tn-text-secondary transition-colors group-hover:text-tn-accent-blue">
              {post.title}
            </h4>
            <time className="text-xs text-tn-text-muted">
              {new Date(post.date).toLocaleDateString()}
            </time>
          </Link>
        ))}
      </div>
    </section>
  );
});

RecentPosts.displayName = 'RecentPosts';
