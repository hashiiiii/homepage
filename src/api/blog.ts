import { Hono } from 'hono'
import { getAllBlogPostsMetadata, getBlogPostById } from '@/lib/markdown-loader'

const blog = new Hono()

blog.get('/', async (c) => {
  try {
    // Markdownファイルから記事を読み込み
    const posts = getAllBlogPostsMetadata()
    
    if (posts.length === 0) {
      console.warn('No markdown files found')
      return c.json([])
    }
    
    return c.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return c.json({ error: 'Failed to fetch blog posts' }, 500)
  }
})

blog.get('/:id', async (c) => {
  const id = c.req.param('id')

  try {
    // Markdownファイルから記事を読み込み
    const post = getBlogPostById(id)

    if (!post) {
      return c.json({ error: 'Post not found' }, 404)
    }

    return c.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return c.json({ error: 'Failed to fetch blog post' }, 500)
  }
})

export { blog }