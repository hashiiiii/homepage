import React from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { useTranslation } from '../contexts/LanguageContext'
import { productData } from '../locales/product'
import { productConfig } from '../config/product'

export const Product: React.FC = () => {
  const { language } = useTranslation()
  const data = productData[language]
  
  usePageTitle(data.title)

  return (
    <div className="animate-fade-in w-full">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{data.title}</h1>
      </div>

      {/* Open Source Projects Section */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          {data.sections.ossProjects}
        </h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {data.ossProjects.map((project) => (
            <article key={project.id} className="card group">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-tn-fg-primary group-hover:text-tn-blue transition-colors">
                  {project.name}
                </h3>
                {productConfig.showStars && project.stars !== undefined && (
                  <div className="flex items-center gap-1 text-tn-yellow">
                    <span>⭐</span>
                    <span className="text-sm">{project.stars}</span>
                  </div>
                )}
              </div>
              
              <p className="text-tn-fg-secondary mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="tag">{project.language}</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link flex items-center gap-2"
                  >
                    <span>{data.labels.github}</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Presentations Section */}
      {data.presentations.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            {data.sections.presentations}
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {data.presentations.map((presentation) => (
            <article key={presentation.id} className="card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-tn-fg-primary mb-2">
                  {presentation.title}
                </h3>
                <div className="flex items-center gap-4 text-tn-fg-secondary text-sm">
                  <span>{presentation.event}</span>
                  <span>•</span>
                  <span>{new Date(presentation.date).toLocaleDateString(
                    language === 'ja' ? 'ja-JP' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}</span>
                </div>
              </div>
              
              <p className="text-tn-fg-secondary mb-4">{presentation.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {presentation.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {presentation.slidesUrl && (
                  <a
                    href={presentation.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link flex items-center gap-2"
                  >
                    <span>{data.labels.slides}</span>
                    <span>↗</span>
                  </a>
                )}
                {presentation.videoUrl && (
                  <a
                    href={presentation.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link flex items-center gap-2"
                  >
                    <span>{data.labels.video}</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      )}
    </div>
  )
}