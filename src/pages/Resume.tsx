import React from 'react'
import { Timeline } from '../components/resume/Timeline'
import { SkillSection } from '../components/resume/SkillSection'
import { usePageTitle } from '../hooks/usePageTitle'
import { useTranslation } from '../contexts/LanguageContext'
import { resumeData } from '../locales/resume'

export const Resume: React.FC = () => {
  const { language } = useTranslation()
  const data = resumeData[language]
  
  usePageTitle(data.title)

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
        {data.subtitle && (
          <p className="text-xl text-tn-fg-secondary">
            {data.subtitle}
          </p>
        )}
      </div>
      
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">{data.sections.workExperience}</h2>
            <Timeline items={data.experience} />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">{data.sections.education}</h2>
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">{data.education.degree}</h3>
              <p className="text-tn-fg-secondary">{data.education.university} • {data.education.period}</p>
            </div>
          </section>
        </div>
        
        <div className="lg:col-span-1">
          <SkillSection />
          
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{data.sections.contact}</h2>
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