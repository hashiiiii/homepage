import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '@/models/blog.model';

interface BlogSidebarProps {
  posts: BlogPost[];
  selectedTags: string[];
  selectedArchive: { year: number; month: number } | null;
  onTagFilter: (tags: string[]) => void;
  onArchiveFilter: (year: number, month: number) => void;
}

interface MonthlyArchive {
  year: number;
  month: number;
  count: number;
  posts: BlogPost[];
}

interface YearlyArchive {
  year: number;
  months: MonthlyArchive[];
  totalCount: number;
}

export function BlogSidebar({
  posts,
  selectedTags,
  selectedArchive,
  onTagFilter,
  onArchiveFilter,
}: BlogSidebarProps) {
  const [expandedYears, setExpandedYears] = React.useState<Set<number>>(new Set());
  const [showOlderYears, setShowOlderYears] = React.useState(false);
  const [showAllTags, setShowAllTags] = React.useState(false);
  const tagDisplayLimit = 8;

  // 年別アーカイブを作成
  const yearlyArchives = React.useMemo(() => {
    const monthlyArchives: Record<string, MonthlyArchive> = {};

    posts.forEach((post) => {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month.toString().padStart(2, '0')}`;

      if (!monthlyArchives[key]) {
        monthlyArchives[key] = { year, month, count: 0, posts: [] };
      }

      monthlyArchives[key].count++;
      monthlyArchives[key].posts.push(post);
    });

    // 年ごとにグループ化
    const yearGroups: Record<number, YearlyArchive> = {};
    Object.values(monthlyArchives).forEach((archive) => {
      if (!yearGroups[archive.year]) {
        yearGroups[archive.year] = {
          year: archive.year,
          months: [],
          totalCount: 0,
        };
      }
      yearGroups[archive.year].months.push(archive);
      yearGroups[archive.year].totalCount += archive.count;
    });

    // 各年の月をソート
    Object.values(yearGroups).forEach((yearGroup) => {
      yearGroup.months.sort((a, b) => b.month - a.month);
    });

    return Object.values(yearGroups).sort((a, b) => b.year - a.year);
  }, [posts]);

  // 最新年を自動展開
  React.useEffect(() => {
    if (yearlyArchives.length > 0) {
      const latestYear = yearlyArchives[0].year;
      setExpandedYears(new Set([latestYear]));
    }
  }, [yearlyArchives]);

  // 記事がある年から最新の3年分を表示
  const recentYears = yearlyArchives.slice(0, 3); // 最新の3年分
  const olderYears = yearlyArchives.slice(3); // 4年目以降

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  // タグ別記事数を計算
  const tagCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  const getMonthName = (month: number) => {
    const monthNames = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
    return monthNames[month - 1];
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // 選択済みタグを削除
      onTagFilter(selectedTags.filter((t) => t !== tag));
    } else {
      // 新しいタグを追加
      onTagFilter([...selectedTags, tag]);
    }
  };

  return (
    <aside className="w-full space-y-6 lg:w-80 lg:space-y-8">
      {/* 最近の記事 */}
      <section className="rounded-lg bg-tn-bg-secondary p-4 sm:p-6">
        <h3 className="mb-3 flex items-center text-base font-semibold text-tn-text-primary sm:mb-4 sm:text-lg">
          <span className="mr-2">📝</span>
          最近の記事
        </h3>

        <div className="space-y-3">
          {posts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5)
            .map((post) => (
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

      {/* 年別アーカイブ */}
      <section className="rounded-lg bg-tn-bg-secondary p-4 sm:p-6">
        <h3 className="mb-3 flex items-center text-base font-semibold text-tn-text-primary sm:mb-4 sm:text-lg">
          <span className="mr-2">📅</span>
          アーカイブ
        </h3>

        <div className="space-y-1">
          {/* 最近3年分 */}
          {recentYears.map(({ year, months, totalCount }) => (
            <div key={year}>
              {/* 年のヘッダー */}
              <button
                onClick={() => toggleYear(year)}
                className="flex w-full items-center justify-between rounded px-2 py-2 font-medium text-tn-text-primary transition-colors hover:bg-tn-bg-tertiary"
              >
                <div className="flex items-center">
                  <span
                    className={`mr-2 transition-transform ${expandedYears.has(year) ? 'rotate-90' : ''}`}
                  >
                    ▶
                  </span>
                  <span>{year}年</span>
                </div>
                <span className="text-sm text-tn-text-muted">({totalCount})</span>
              </button>

              {/* 月のリスト */}
              {expandedYears.has(year) && (
                <div className="ml-6 mt-1 space-y-1">
                  {months.map(({ month, count }) => {
                    const isSelected =
                      selectedArchive?.year === year && selectedArchive?.month === month;
                    return (
                      <button
                        key={`${year}-${month}`}
                        onClick={() => onArchiveFilter(year, month)}
                        className={`flex w-full items-center justify-between rounded px-3 py-1.5 text-sm transition-colors ${
                          isSelected
                            ? 'bg-tn-green text-white'
                            : 'text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary'
                        }`}
                      >
                        <span>{getMonthName(month)}</span>
                        <span
                          className={`text-xs ${isSelected ? 'text-white' : 'text-tn-text-muted'}`}
                        >
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* 3年より古いアーカイブ */}
          {olderYears.length > 0 && (
            <div className="border-tn-border/50 border-t pt-2">
              {!showOlderYears ? (
                <button
                  onClick={() => setShowOlderYears(true)}
                  className="w-full rounded px-2 py-2 text-sm text-tn-text-muted transition-colors hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
                >
                  ▼ 過去のアーカイブを表示
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowOlderYears(false)}
                    className="mb-2 w-full rounded px-2 py-1 text-sm text-tn-text-muted transition-colors hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
                  >
                    ▲ 古いアーカイブを隠す
                  </button>
                  {olderYears.map(({ year, months, totalCount }) => (
                    <div key={year}>
                      {/* 年のヘッダー */}
                      <button
                        onClick={() => toggleYear(year)}
                        className="flex w-full items-center justify-between rounded px-2 py-2 font-medium text-tn-text-primary transition-colors hover:bg-tn-bg-tertiary"
                      >
                        <div className="flex items-center">
                          <span
                            className={`mr-2 transition-transform ${expandedYears.has(year) ? 'rotate-90' : ''}`}
                          >
                            ▶
                          </span>
                          <span>{year}年</span>
                        </div>
                        <span className="text-sm text-tn-text-muted">({totalCount})</span>
                      </button>

                      {/* 月のリスト */}
                      {expandedYears.has(year) && (
                        <div className="ml-6 mt-1 space-y-1">
                          {months.map(({ month, count }) => {
                            const isSelected =
                              selectedArchive?.year === year && selectedArchive?.month === month;
                            return (
                              <button
                                key={`${year}-${month}`}
                                onClick={() => onArchiveFilter(year, month)}
                                className={`flex w-full items-center justify-between rounded px-3 py-1.5 text-sm transition-colors ${
                                  isSelected
                                    ? 'bg-tn-green text-white'
                                    : 'text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary'
                                }`}
                              >
                                <span>{getMonthName(month)}</span>
                                <span
                                  className={`text-xs ${isSelected ? 'text-white' : 'text-tn-text-muted'}`}
                                >
                                  ({count})
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* タグフィルター */}
      <section className="rounded-lg bg-tn-bg-secondary p-4 sm:p-6">
        <h3 className="mb-3 flex items-center text-base font-semibold text-tn-text-primary sm:mb-4 sm:text-lg">
          <span className="mr-2">🏷️</span>
          タグ
          {selectedTags.length > 0 && (
            <span className="ml-2 text-xs text-tn-text-muted">(OR検索)</span>
          )}
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => onTagFilter([])}
            className={`block w-full rounded px-3 py-2 text-left transition-colors ${
              selectedTags.length === 0
                ? 'bg-tn-accent-blue text-white'
                : 'text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary'
            }`}
          >
            すべて ({posts.length})
          </button>

          {(showAllTags ? tagCounts : tagCounts.slice(0, tagDisplayLimit)).map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`block flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-tn-accent-blue text-white'
                  : 'text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary'
              }`}
            >
              <span>
                {tag} ({count})
              </span>
              {selectedTags.includes(tag) && <span className="text-xs">✓</span>}
            </button>
          ))}

          {/* タグが多い場合の展開ボタン */}
          {tagCounts.length > tagDisplayLimit && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="border-tn-border/50 w-full rounded border px-3 py-2 text-sm text-tn-text-muted transition-colors hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
            >
              {showAllTags ? (
                <>▲ タグを少なく表示</>
              ) : (
                <>▼ すべてのタグを表示 ({tagCounts.length - tagDisplayLimit}個)</>
              )}
            </button>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className="mt-4 border-t border-tn-border pt-4">
            <p className="mb-2 text-xs text-tn-text-muted">選択中のタグ:</p>
            <div className="flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="hover:bg-tn-accent-blue/80 inline-flex cursor-pointer items-center rounded bg-tn-accent-blue px-2 py-1 text-xs text-white"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                  <span className="ml-1">×</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </aside>
  );
}
