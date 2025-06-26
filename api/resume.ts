import type { VercelRequest, VercelResponse } from '@vercel/node';

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
    linkedin: 'https://www.linkedin.com/in/hashiiiii/',
    twitter: 'https://twitter.com/hashiiiii',
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    return res.status(200).json(mockResume);
  } catch (error) {
    console.error('Error in resume API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
