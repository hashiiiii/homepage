import React from 'react';

type DescriptionItem = string | { text: string; items?: DescriptionItem[] };

interface TimelineItem {
  title: string;
  company?: string;
  period?: string;
  description: DescriptionItem[];
  current?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

const renderDescriptionItems = (items: DescriptionItem[], level: number = 0): React.ReactNode => {
  const marginClass = level === 0 ? '' : level === 1 ? 'ml-6' : level === 2 ? 'ml-12' : 'ml-18';

  return items.map((item, index) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className={`flex items-start text-tn-fg-secondary ${marginClass}`}>
          <span className="mr-2 text-tn-cyan">▸</span>
          <span>{item}</span>
        </div>
      );
    } else {
      return (
        <div key={index} className={marginClass}>
          <div className="flex items-start text-tn-fg-secondary">
            <span className="mr-2 text-tn-cyan">▸</span>
            <span>{item.text}</span>
          </div>
          {item.items && (
            <div className="mt-1">{renderDescriptionItems(item.items, level + 1)}</div>
          )}
        </div>
      );
    }
  });
};

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-4 w-0.5 bg-tn-comment" />

      {items.map((item, index) => (
        <div key={index} className="relative mb-8 ml-10">
          <div
            className={`absolute left-[-29px] h-6 w-1.5 ${
              item.current ? 'shadow-tn-green/30 bg-tn-green shadow-lg' : 'bg-tn-blue'
            }`}
          />

          <div className="card">
            <div className="mb-2 flex flex-wrap items-center justify-between">
              <h3 className="text-xl font-semibold text-tn-fg-primary">{item.title}</h3>
              {item.current && (
                <span className="bg-tn-green/10 border-tn-green/20 rounded border px-2 py-1 text-xs text-tn-green">
                  Current
                </span>
              )}
            </div>

            {(item.company || item.period) && (
              <div className="mb-3 flex items-center gap-2 text-tn-fg-secondary">
                {item.company && <span className="font-medium">{item.company}</span>}
                {item.company && item.period && <span>•</span>}
                {item.period && <span>{item.period}</span>}
              </div>
            )}

            <div className="space-y-1">{renderDescriptionItems(item.description, 0)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
