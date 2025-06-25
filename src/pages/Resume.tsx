import React, { useState } from 'react'
import { Timeline } from '../components/resume/Timeline'
import { SkillSection } from '../components/resume/SkillSection'
import { TabNavigation, Tab } from '../components/common/TabNavigation'
import { usePageTitle } from '../hooks/usePageTitle'
import { useTranslation } from '../contexts/LanguageContext'
import { resumeData } from '../locales/resume'

export const Resume: React.FC = () => {
  const { language } = useTranslation()
  const data = resumeData[language]
  const [activeTab, setActiveTab] = useState<'main' | 'side'>('main')
  
  usePageTitle(data.title)

  const tabs: Tab[] = [
    { id: 'main', label: data.sections.workExperience },
    { id: 'side', label: data.sections.freelance },
  ]

  const currentExperience = activeTab === 'main' ? data.experience : data.freelance

  return (
    <div className="animate-fade-in w-full">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{data.title}</h1>
        {data.subtitle && (
          <p className="text-xl text-tn-fg-secondary">
            {data.subtitle}
          </p>
        )}
      </div>
      
      <div className="grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8 sm:space-y-10 lg:space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{data.sections.workExperienceTitle}</h2>
            <TabNavigation 
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId as 'main' | 'side')}
            />
            <Timeline items={currentExperience} />
          </section>
          
          {activeTab === 'main' && (
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{data.sections.education}</h2>
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">{data.education.degree}</h3>
                <p className="text-tn-fg-secondary">{data.education.university} • {data.education.period}</p>
              </div>
            </section>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <SkillSection />
          
          <section className="mt-8 sm:mt-10 lg:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{data.sections.contact}</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-tn-fg-secondary">
                <span>📧</span>
                <span>{data.contact.email}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}