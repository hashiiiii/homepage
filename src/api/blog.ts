import { Hono } from 'hono'

const blog = new Hono()

// Mock blog data - later this can be connected to a real database
const mockPosts = [
  {
    id: '1',
    title: 'Building Modern Web Applications with Hono',
    excerpt: 'Explore how to create lightning-fast web applications using Hono, a small, simple, and ultra-fast web framework for the Edge.',
    content: 'Full blog post content here...',
    date: '2024-01-15',
    tags: ['Hono', 'TypeScript', 'Edge'],
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'AWS Lambda Best Practices',
    excerpt: 'Learn the best practices for building scalable and cost-effective serverless applications with AWS Lambda.',
    content: 'Full blog post content here...',
    date: '2024-01-10',
    tags: ['AWS', 'Serverless', 'Cloud'],
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'Tokyo Night Theme: A Developer\'s Dream',
    excerpt: 'Deep dive into why Tokyo Night has become one of the most popular color themes among developers.',
    content: 'Full blog post content here...',
    date: '2024-01-05',
    tags: ['Design', 'Productivity', 'Tools'],
    readTime: '4 min read',
  },
]

blog.get('/', (c) => {
  return c.json(mockPosts.map(({ content: _content, ...post }) => post))
})

blog.get('/:id', (c) => {
  const id = c.req.param('id')
  const post = mockPosts.find(p => p.id === id)
  
  if (!post) {
    return c.json({ error: 'Post not found' }, 404)
  }
  
  return c.json(post)
})

export { blog }