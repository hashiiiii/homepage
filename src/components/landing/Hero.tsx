import React from 'react'

export const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-tn-blue via-tn-cyan to-tn-magenta bg-clip-text text-transparent">
          Hello, I'm hashiiiii
        </h1>
        <p className="text-xl md:text-2xl text-tn-cyan mb-8 font-medium">
          Full Stack Developer & Creative Technologist
        </p>
        <p className="text-lg text-tn-fg-secondary max-w-2xl mx-auto mb-12">
          Passionate about building elegant solutions with modern technologies. 
          Specializing in web development, cloud architecture, and developer experience.
        </p>
        
        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com/hashiiiii"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/hashiiiii"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}