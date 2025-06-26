import { Hono } from 'hono';

const resume = new Hono();

// Mock resume data
const mockResume = {
  experience: [
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
      current: false,
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
      current: false,
      description: [
        'Developed interactive websites for various clients',
        'Optimized web performance achieving 95+ Lighthouse scores',
        'Introduced modern development practices to the team',
      ],
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Vite'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Hono', 'Express', 'FastAPI', 'GraphQL'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB'],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'University Name',
      period: '2014 - 2018',
    },
  ],
  contact: {
    email: 'hello@hashiiiii.com',
    github: 'https://github.com/hashiiiii',
    linkedin: 'https://linkedin.com/in/hashiiiii',
    twitter: 'https://twitter.com/hashiiiii',
  },
};

resume.get('/', (c) => {
  return c.json(mockResume);
});

export { resume };
