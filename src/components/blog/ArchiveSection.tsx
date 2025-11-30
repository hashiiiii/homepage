import React from "react";
import type { BlogMetadata, BlogPost } from "@/models/blog.model";

interface ArchiveSectionProps {
  posts: BlogPost[];
  selectedArchive: { year: number; month: number } | null;
  onArchiveFilter: (year: number, month: number) => void;
  metadata?: BlogMetadata | null;
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

export const ArchiveSection: React.FC<ArchiveSectionProps> = React.memo(function ArchiveSection({
  posts,
  selectedArchive,
  onArchiveFilter,
  metadata,
}) {
  const [expandedYears, setExpandedYears] = React.useState<Set<number>>(new Set());
  const [showOlderYears, setShowOlderYears] = React.useState(false);

  const yearlyArchives = React.useMemo(() => {
    // Use pre-calculated archives from metadata if available
    if (metadata?.archives) {
      const yearGroups: Record<number, YearlyArchive> = {};

      metadata.archives.forEach((archive) => {
        if (!yearGroups[archive.year]) {
          yearGroups[archive.year] = {
            year: archive.year,
            months: [],
            totalCount: 0,
          };
        }
        yearGroups[archive.year].months.push({
          year: archive.year,
          month: archive.month,
          count: archive.count,
          posts: posts.filter((p) => {
            const date = new Date(p.date);
            return date.getFullYear() === archive.year && date.getMonth() + 1 === archive.month;
          }),
        });
        yearGroups[archive.year].totalCount += archive.count;
      });

      return Object.values(yearGroups).sort((a, b) => b.year - a.year);
    }

    // Fallback to client-side calculation if metadata not available
    const monthlyArchives: Record<string, MonthlyArchive> = {};

    posts.forEach((post) => {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month.toString().padStart(2, "0")}`;

      if (!monthlyArchives[key]) {
        monthlyArchives[key] = { year, month, count: 0, posts: [] };
      }

      monthlyArchives[key].count++;
      monthlyArchives[key].posts.push(post);
    });

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

    Object.values(yearGroups).forEach((yearGroup) => {
      yearGroup.months.sort((a, b) => b.month - a.month);
    });

    return Object.values(yearGroups).sort((a, b) => b.year - a.year);
  }, [posts, metadata?.archives]);

  React.useEffect(() => {
    if (yearlyArchives.length > 0) {
      const latestYear = yearlyArchives[0].year;
      setExpandedYears(new Set([latestYear]));
    }
  }, [yearlyArchives]);

  const recentYears = yearlyArchives.slice(0, 3);
  const olderYears = yearlyArchives.slice(3);

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

  const getMonthName = (month: number) => {
    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    return monthNames[month - 1];
  };

  const renderYearSection = (years: YearlyArchive[]) => (
    <>
      {years.map(({ year, months, totalCount }) => (
        <div key={year}>
          <button
            type="button"
            onClick={() => toggleYear(year)}
            className="flex w-full items-center justify-between rounded p-2 font-medium text-tn-text-primary transition-colors hover:bg-tn-bg-tertiary"
          >
            <div className="flex items-center">
              <span className={`mr-2 transition-transform ${expandedYears.has(year) ? "rotate-90" : ""}`}>▶</span>
              <span>{year}年</span>
            </div>
            <span className="text-sm text-tn-text-muted">({totalCount})</span>
          </button>

          {expandedYears.has(year) && (
            <div className="ml-6 mt-1 space-y-1">
              {months.map(({ month, count }) => {
                const isSelected = selectedArchive?.year === year && selectedArchive?.month === month;
                return (
                  <button
                    type="button"
                    key={`${year}-${month}`}
                    onClick={() => onArchiveFilter(year, month)}
                    className={`flex w-full items-center justify-between rounded px-3 py-1.5 text-sm transition-colors ${
                      isSelected
                        ? "bg-tn-green text-white"
                        : "text-tn-text-secondary hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
                    }`}
                  >
                    <span>{getMonthName(month)}</span>
                    <span className={`text-xs ${isSelected ? "text-white" : "text-tn-text-muted"}`}>({count})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <section className="rounded-lg bg-tn-bg-secondary p-4 sm:p-6">
      <h3 className="mb-3 flex items-center text-base font-semibold text-tn-text-primary sm:mb-4 sm:text-lg">
        <span className="mr-2">📅</span>
        アーカイブ
      </h3>

      <div className="space-y-1">
        {renderYearSection(recentYears)}

        {olderYears.length > 0 && (
          <div className="border-tn-border/50 border-t pt-2">
            {!showOlderYears ? (
              <button
                type="button"
                onClick={() => setShowOlderYears(true)}
                className="w-full rounded p-2 text-sm text-tn-text-muted transition-colors hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
              >
                ▼ 過去のアーカイブを表示
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowOlderYears(false)}
                  className="mb-2 w-full rounded px-2 py-1 text-sm text-tn-text-muted transition-colors hover:bg-tn-bg-tertiary hover:text-tn-text-primary"
                >
                  ▲ 古いアーカイブを隠す
                </button>
                {renderYearSection(olderYears)}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
});

ArchiveSection.displayName = "ArchiveSection";
