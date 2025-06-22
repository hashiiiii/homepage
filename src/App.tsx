import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/common/Layout'
import { Landing } from './pages/Landing'
import { Blog } from './pages/Blog'
import { BlogDetail } from './pages/BlogDetail'
import { Resume } from './pages/Resume'
import { MarkdownGuide } from './pages/MarkdownGuide'
import './styles/globals.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/markdown-guide" element={<MarkdownGuide />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App