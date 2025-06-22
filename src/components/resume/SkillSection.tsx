import React from 'react'

interface SkillCategory {
  category: string
  skills: string[]
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
    color: 'bg-tn-blue/10 text-tn-blue border-tn-blue/20',
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Vite'],
    color: 'bg-tn-cyan/10 text-tn-cyan border-tn-cyan/20',
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Hono', 'Express', 'FastAPI', 'GraphQL'],
    color: 'bg-tn-green/10 text-tn-green border-tn-green/20',
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
    color: 'bg-tn-magenta/10 text-tn-magenta border-tn-magenta/20',
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB'],
    color: 'bg-tn-yellow/10 text-tn-yellow border-tn-yellow/20',
  },
]

export const SkillSection: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
      
      <div className="space-y-6">
        {skillCategories.map((category) => (
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