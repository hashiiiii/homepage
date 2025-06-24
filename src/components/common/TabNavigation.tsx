import React from 'react'

export interface Tab {
  id: string
  label: string
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="mb-8">
      <nav className="flex space-x-3" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 font-semibold text-base transition-all duration-200 rounded-lg border-2 ${
              activeTab === tab.id
                ? 'border-tn-blue text-tn-blue bg-tn-blue/10 shadow-md shadow-tn-blue/20'
                : 'border-transparent text-tn-fg-secondary bg-tn-bg-secondary hover:text-tn-fg-primary hover:border-tn-comment hover:bg-tn-bg-tertiary hover:shadow-sm'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}