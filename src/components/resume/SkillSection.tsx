import React from 'react'
import { useTranslation } from '../../contexts/LanguageContext'
import { skillsData } from '../../locales/skills'

export const SkillSection: React.FC = () => {
  const { language } = useTranslation()
  const data = skillsData[language]

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{data.title}</h2>
      
      <div className="space-y-6">
        {data.categories.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold mb-3 text-tn-fg-primary">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${category.color}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}