import React from 'react'
import { Link } from 'react-router-dom'
import type { BlogPost } from '@/models/blog.model'

interface BlogSidebarProps {
  posts: BlogPost[]
  selectedTags: string[]
  selectedArchive: {year: number, month: number} | null
  onTagFilter: (tags: string[]) => void
  onArchiveFilter: (year: number, month: number) => void
}

interface MonthlyArchive {
  year: number
  month: number
  count: number
  posts: BlogPost[]
}

interface YearlyArchive {
  year: number
  months: MonthlyArchive[]
  totalCount: number
}

interface TagCount {
  tag: string
  count: number
}

export function BlogSidebar({ posts, selectedTags, selectedArchive, onTagFilter, onArchiveFilter }: BlogSidebarProps) {
  const [expandedYears, setExpandedYears] = React.useState<Set<number>>(new Set())
  const [showOlderYears, setShowOlderYears] = React.useState(false)
  const [showAllTags, setShowAllTags] = React.useState(false)
  const tagDisplayLimit = 8

  // 年別アーカイブを作成
  const yearlyArchives = React.useMemo(() => {
    const monthlyArchives: Record<string, MonthlyArchive> = {}
    
    posts.forEach(post => {
      const date = new Date(post.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const key = `${year}-${month.toString().padStart(2, '0')}`
      
      if (!monthlyArchives[key]) {
        monthlyArchives[key] = { year, month, count: 0, posts: [] }
      }
      
      monthlyArchives[key].count++
      monthlyArchives[key].posts.push(post)
    })

    // 年ごとにグループ化
    const yearGroups: Record<number, YearlyArchive> = {}
    Object.values(monthlyArchives).forEach(archive => {
      if (!yearGroups[archive.year]) {
        yearGroups[archive.year] = {
          year: archive.year,
          months: [],
          totalCount: 0
        }
      }
      yearGroups[archive.year].months.push(archive)
      yearGroups[archive.year].totalCount += archive.count
    })

    // 各年の月をソート
    Object.values(yearGroups).forEach(yearGroup => {
      yearGroup.months.sort((a, b) => b.month - a.month)
    })

    return Object.values(yearGroups)
      .sort((a, b) => b.year - a.year)
  }, [posts])

  // 最新年を自動展開
  React.useEffect(() => {
    if (yearlyArchives.length > 0) {
      const latestYear = yearlyArchives[0].year
      setExpandedYears(new Set([latestYear]))
    }
  }, [yearlyArchives])

  // 記事がある年から最新の3年分を表示
  const recentYears = yearlyArchives.slice(0, 3) // 最新の3年分
  const olderYears = yearlyArchives.slice(3)      // 4年目以降

  const toggleYear = (year: number) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev)
      if (newSet.has(year)) {
        newSet.delete(year)
      } else {
        newSet.add(year)
      }
      return newSet
    })
  }

  // タグ別記事数を計算
  const tagCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    
    posts.forEach(post => {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }, [posts])

  const getMonthName = (month: number) => {
    const monthNames = [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ]
    return monthNames[month - 1]
  }

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // 選択済みタグを削除
      onTagFilter(selectedTags.filter(t => t !== tag))
    } else {
      // 新しいタグを追加
      onTagFilter([...selectedTags, tag])
    }
  }

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* 最近の記事 */}
      <section className="bg-tn-bg-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-tn-text-primary mb-4 flex items-center">
          <span className="mr-2">📝</span>
          最近の記事
        </h3>
        
        <div className="space-y-3">
          {posts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5)
            .map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block group"
              >
                <h4 className="text-sm text-tn-text-secondary group-hover:text-tn-accent-blue transition-colors line-clamp-2 mb-1">
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
      <section className="bg-tn-bg-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-tn-text-primary mb-4 flex items-center">
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
                className="w-full flex items-center justify-between px-2 py-2 rounded transition-colors text-tn-text-primary hover:bg-tn-bg-tertiary font-medium"
              >
                <div className="flex items-center">
                  <span className={`mr-2 transition-transform ${expandedYears.has(year) ? 'rotate-90' : ''}`}>
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
                    const isSelected = selectedArchive?.year === year && selectedArchive?.month === month
                    return (
                      <button
                        key={`${year}-${month}`}
                        onClick={() => onArchiveFilter(year, month)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded transition-colors text-sm ${
                          isSelected
                            ? 'bg-tn-green text-white' 
                            : 'text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary'
                        }`}
                      >
                        <span>{getMonthName(month)}</span>
                        <span className={`text-xs ${isSelected ? 'text-white' : 'text-tn-text-muted'}`}>
                          ({count})
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          {/* 3年より古いアーカイブ */}
          {olderYears.length > 0 && (
            <div className="pt-2 border-t border-tn-border/50">
              {!showOlderYears ? (
                <button
                  onClick={() => setShowOlderYears(true)}
                  className="w-full px-2 py-2 rounded transition-colors text-tn-text-muted hover:bg-tn-bg-tertiary hover:text-tn-text-primary text-sm"
                >
                  ▼ 過去のアーカイブを表示
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowOlderYears(false)}
                    className="w-full px-2 py-1 rounded transition-colors text-tn-text-muted hover:bg-tn-bg-tertiary hover:text-tn-text-primary text-sm mb-2"
                  >
                    ▲ 古いアーカイブを隠す
                  </button>
                  {olderYears.map(({ year, months, totalCount }) => (
                    <div key={year}>
                      {/* 年のヘッダー */}
                      <button
                        onClick={() => toggleYear(year)}
                        className="w-full flex items-center justify-between px-2 py-2 rounded transition-colors text-tn-text-primary hover:bg-tn-bg-tertiary font-medium"
                      >
                        <div className="flex items-center">
                          <span className={`mr-2 transition-transform ${expandedYears.has(year) ? 'rotate-90' : ''}`}>
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
                            const isSelected = selectedArchive?.year === year && selectedArchive?.month === month
                            return (
                              <button
                                key={`${year}-${month}`}
                                onClick={() => onArchiveFilter(year, month)}
                                className={`w-full flex items-center justify-between px-3 py-1.5 rounded transition-colors text-sm ${
                                  isSelected
                                    ? 'bg-tn-green text-white' 
                                    : 'text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary'
                                }`}
                              >
                                <span>{getMonthName(month)}</span>
                                <span className={`text-xs ${isSelected ? 'text-white' : 'text-tn-text-muted'}`}>
                                  ({count})
                                </span>
                              </button>
                            )
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
      <section className="bg-tn-bg-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-tn-text-primary mb-4 flex items-center">
          <span className="mr-2">🏷️</span>
          タグ
          {selectedTags.length > 0 && (
            <span className="ml-2 text-xs text-tn-text-muted">
              (OR検索)
            </span>
          )}
        </h3>
        
        <div className="space-y-2">
          <button
            onClick={() => onTagFilter([])}
            className={`block w-full text-left px-3 py-2 rounded transition-colors ${
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
              className={`block w-full text-left px-3 py-2 rounded transition-colors flex items-center justify-between ${
                selectedTags.includes(tag)
                  ? 'bg-tn-accent-blue text-white' 
                  : 'text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary'
              }`}
            >
              <span>{tag} ({count})</span>
              {selectedTags.includes(tag) && (
                <span className="text-xs">✓</span>
              )}
            </button>
          ))}

          {/* タグが多い場合の展開ボタン */}
          {tagCounts.length > tagDisplayLimit && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="w-full px-3 py-2 rounded transition-colors text-tn-text-muted hover:bg-tn-bg-tertiary hover:text-tn-text-primary text-sm border border-tn-border/50"
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
          <div className="mt-4 pt-4 border-t border-tn-border">
            <p className="text-xs text-tn-text-muted mb-2">選択中のタグ:</p>
            <div className="flex flex-wrap gap-1">
              {selectedTags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 bg-tn-accent-blue text-white text-xs rounded cursor-pointer hover:bg-tn-accent-blue/80"
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
  )
}