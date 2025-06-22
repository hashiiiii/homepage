import { Plugin } from 'vite'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export function markdownPlugin(): Plugin {
  return {
    name: 'vite-plugin-markdown',
    async buildStart() {
      // This runs during build time
      const contentDir = path.join(process.cwd(), 'content/blog')
      const outputFile = path.join(process.cwd(), 'src/generated/blog-posts.json')
      
      try {
        // Ensure output directory exists
        await fs.mkdir(path.dirname(outputFile), { recursive: true })
        
        // Read all markdown files
        const files = await fs.readdir(contentDir)
        const mdFiles = files.filter(file => file.endsWith('.md'))
        
        const posts = []
        
        for (const file of mdFiles) {
          const filePath = path.join(contentDir, file)
          const fileContent = await fs.readFile(filePath, 'utf-8')
          
          const { data, content } = matter(fileContent)
          const html = await marked(content)
          
          posts.push({
            id: data.id || file.replace('.md', ''),
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            content,
            html,
            date: data.date || new Date().toISOString(),
            tags: data.tags || [],
            readTime: data.readTime || '5 min read',
          })
        }
        
        // Write processed posts to a JSON file
        await fs.writeFile(
          outputFile,
          JSON.stringify(posts, null, 2),
          'utf-8'
        )
        
        console.log(`✅ Processed ${posts.length} blog posts`)
      } catch (error) {
        console.error('Error processing markdown files:', error)
      }
    }
  }
}