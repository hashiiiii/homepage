import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { skillsData } from '../../locales/skills';

export const SkillSection: React.FC = () => {
  const { language } = useTranslation();
  const data = skillsData[language];

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">{data.title}</h2>

      <div className="space-y-6">
        {data.categories.map((category) => (
          <div key={category.category}>
            <h3 className="mb-3 text-lg font-semibold text-tn-fg-primary">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className={`rounded-full border px-3 py-1 text-sm font-medium ${category.color}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
