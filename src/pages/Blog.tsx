import React from 'react';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogSidebar } from '../components/blog/BlogSidebar';
import { fetchBlogPosts } from '@/lib/api-client';
import { usePageTitle } from '../hooks/usePageTitle';
import type { BlogPost } from '@/models/blog.model';

export const Blog: React.FC = () => {
  usePageTitle('Blog');
  const [allPosts, setAllPosts] = React.useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = React.useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = React.useState<BlogPost[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedArchive, setSelectedArchive] = React.useState<{
    year: number;
    month: number;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 6;

  React.useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        setAllPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // 表示する記事を更新
  React.useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * postsPerPage;
    setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, currentPage, postsPerPage]);

  // フィルタリング処理を統合
  const applyFilters = React.useCallback(() => {
    let posts = allPosts;

    // タグフィルタ（OR検索）
    if (selectedTags.length > 0) {
      posts = posts.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)));
    }

    // アーカイブフィルタ
    if (selectedArchive) {
      posts = posts.filter((post) => {
        const date = new Date(post.date);
        return (
          date.getFullYear() === selectedArchive.year &&
          date.getMonth() + 1 === selectedArchive.month
        );
      });
    }

    setFilteredPosts(posts);
  }, [allPosts, selectedTags, selectedArchive]);

  // フィルタ変更時の処理
  React.useEffect(() => {
    applyFilters();
    setCurrentPage(1); // フィルタ変更時はページをリセット
  }, [applyFilters]);

  // タグフィルタリング
  const handleTagFilter = React.useCallback((tags: string[]) => {
    setSelectedTags(tags);
    setSelectedArchive(null); // タグ選択時はアーカイブをクリア
  }, []);

  // アーカイブフィルタリング
  const handleArchiveFilter = React.useCallback((year: number, month: number) => {
    setSelectedArchive({ year, month });
    setSelectedTags([]); // アーカイブ選択時はタグをクリア
  }, []);

  // Load More機能
  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const hasMorePosts = currentPage * postsPerPage < filteredPosts.length;

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-tn-fg-secondary">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-tn-red">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">Blog</h1>
          {(selectedTags.length > 0 || selectedArchive) && (
            <div className="mt-4">
              <span className="text-tn-text-secondary">
                フィルター:
                {selectedTags.length > 0 && ` ${selectedTags.length}個のタグでOR検索`}
                {selectedArchive && ` ${selectedArchive.year}年${selectedArchive.month}月`}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-tn-accent-blue px-3 py-1 text-sm text-white"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagFilter(selectedTags.filter((t) => t !== tag))}
                      className="ml-2 hover:text-tn-text-muted"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {selectedArchive && (
                  <span className="inline-flex items-center rounded-full bg-tn-green px-3 py-1 text-sm text-white">
                    {selectedArchive.year}年{selectedArchive.month}月
                    <button
                      onClick={() => setSelectedArchive(null)}
                      className="ml-2 hover:text-tn-text-muted"
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    handleTagFilter([]);
                    setSelectedArchive(null);
                  }}
                  className="rounded-full border border-tn-border px-3 py-1 text-sm text-tn-text-muted hover:text-tn-text-primary"
                >
                  すべてクリア
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* メインコンテンツ */}
          <main className="min-w-0 flex-1">
            <div className="space-y-4 sm:space-y-6">
              {displayedPosts.length > 0 ? (
                displayedPosts.map((post) => <BlogCard key={post.id} post={post} />)
              ) : (
                <div className="py-12 text-center">
                  <p className="text-tn-text-secondary">
                    {selectedTags.length > 0 && selectedArchive
                      ? `選択されたタグ「${selectedTags.join('、')}」と${selectedArchive.year}年${selectedArchive.month}月の記事が見つかりませんでした`
                      : selectedTags.length > 0
                        ? `選択されたタグ「${selectedTags.join('、')}」の記事が見つかりませんでした`
                        : selectedArchive
                          ? `${selectedArchive.year}年${selectedArchive.month}月の記事が見つかりませんでした`
                          : '記事が見つかりませんでした'}
                  </p>
                </div>
              )}
            </div>

            {hasMorePosts && (
              <div className="mt-8 text-center sm:mt-12">
                <button onClick={handleLoadMore} className="btn-secondary w-full sm:w-auto">
                  Load More Posts ({filteredPosts.length - displayedPosts.length}件残り)
                </button>
              </div>
            )}
          </main>

          {/* サイドバー */}
          <BlogSidebar
            posts={allPosts}
            selectedTags={selectedTags}
            selectedArchive={selectedArchive}
            onTagFilter={handleTagFilter}
            onArchiveFilter={handleArchiveFilter}
          />
        </div>
      </div>
    </div>
  );
};
