import React from 'react';

export interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-8">
      <nav className="flex space-x-3" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`rounded-lg border-2 px-6 py-3 text-base font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-tn-blue/10 shadow-tn-blue/20 border-tn-blue text-tn-blue shadow-md'
                : 'border-transparent bg-tn-bg-secondary text-tn-fg-secondary hover:border-tn-comment hover:bg-tn-bg-tertiary hover:text-tn-fg-primary hover:shadow-sm'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
