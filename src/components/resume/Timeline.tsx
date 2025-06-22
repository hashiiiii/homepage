import React from 'react'

interface TimelineItem {
  title: string
  company: string
  period: string
  description: string[]
  current?: boolean
}

interface TimelineProps {
  items: TimelineItem[]
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-tn-comment"></div>
      
      {items.map((item, index) => (
        <div key={index} className="relative mb-8 ml-10">
          <div className={`absolute -left-[26px] w-3 h-3 rounded-full border-2 ${
            item.current 
              ? 'bg-tn-green border-tn-green shadow-lg shadow-tn-green/30' 
              : 'bg-tn-blue border-tn-blue'
          }`}></div>
          
          <div className="card">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-tn-fg-primary">
                {item.title}
              </h3>
              {item.current && (
                <span className="px-2 py-1 text-xs bg-tn-green/10 text-tn-green border border-tn-green/20 rounded">
                  Current
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-3 text-tn-fg-secondary">
              <span className="font-medium">{item.company}</span>
              <span>•</span>
              <span>{item.period}</span>
            </div>
            
            <ul className="space-y-1">
              {item.description.map((desc, i) => (
                <li key={i} className="text-tn-fg-secondary flex items-start">
                  <span className="text-tn-cyan mr-2">▸</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}