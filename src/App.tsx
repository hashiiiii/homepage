import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Layout } from './components/common/Layout'
import './styles/globals.css'

// Lazy load pages for better code splitting
const Landing = lazy(() => import('./pages/Landing').then(m => ({ default: m.Landing })))
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })))
const BlogDetail = lazy(() => import('./pages/BlogDetail').then(m => ({ default: m.BlogDetail })))
const Resume = lazy(() => import('./pages/Resume').then(m => ({ default: m.Resume })))
const Product = lazy(() => import('./pages/Product').then(m => ({ default: m.Product })))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-tn-text-muted">Loading...</div>
  </div>
)

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/product" element={<Product />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App