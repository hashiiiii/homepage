import React from 'react'

interface Feature {
  icon: string
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: '🚀',
    title: 'Performance First',
    description: 'Building fast, scalable applications with modern web technologies',
    color: 'text-tn-blue',
  },
  {
    icon: '🎨',
    title: 'Design Focused',
    description: 'Creating beautiful, intuitive user interfaces with attention to detail',
    color: 'text-tn-magenta',
  },
  {
    icon: '☁️',
    title: 'Cloud Native',
    description: 'Leveraging AWS and cloud technologies for robust solutions',
    color: 'text-tn-cyan',
  },
  {
    icon: '📚',
    title: 'Always Learning',
    description: 'Continuously exploring new technologies and best practices',
    color: 'text-tn-green',
  },
]

export const Features: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What I Do
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card hover:shadow-lg hover:shadow-tn-bg-tertiary/50"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="text-tn-fg-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}