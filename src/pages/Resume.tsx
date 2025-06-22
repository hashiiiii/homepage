import React from 'react'
import { Timeline } from '../components/resume/Timeline'
import { SkillSection } from '../components/resume/SkillSection'

const experience = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    current: true,
    description: [
      'Lead development of cloud-native applications using TypeScript and AWS',
      'Architected microservices infrastructure serving 1M+ daily users',
      'Mentored junior developers and conducted code reviews',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: [
      'Built responsive web applications using React and Node.js',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
      'Collaborated with design team to improve user experience',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: [
      'Developed interactive websites for various clients',
      'Optimized web performance achieving 95+ Lighthouse scores',
      'Introduced modern development practices to the team',
    ],
  },
]

export const Resume: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume</h1>
        <p className="text-xl text-tn-fg-secondary">
          Experienced full stack developer passionate about building great products
        </p>
      </div>
      
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
            <Timeline items={experience} />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Bachelor of Computer Science</h3>
              <p className="text-tn-fg-secondary">University Name • 2014 - 2018</p>
            </div>
          </section>
        </div>
        
        <div className="lg:col-span-1">
          <SkillSection />
          
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Contact</h2>
            <div className="space-y-3">
              <a href="mailto:hello@hashiiiii.com" className="flex items-center gap-2 text-tn-fg-secondary hover:text-tn-blue transition-colors">
                <span>📧</span>
                <span>hello@hashiiiii.com</span>
              </a>
              <a href="https://github.com/hashiiiii" className="flex items-center gap-2 text-tn-fg-secondary hover:text-tn-blue transition-colors">
                <span>🐙</span>
                <span>github.com/hashiiiii</span>
              </a>
              <a href="https://linkedin.com/in/hashiiiii" className="flex items-center gap-2 text-tn-fg-secondary hover:text-tn-blue transition-colors">
                <span>💼</span>
                <span>linkedin.com/in/hashiiiii</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}