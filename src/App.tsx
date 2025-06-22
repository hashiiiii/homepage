import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/common/Layout'
import { Landing } from './pages/Landing'
import { Blog } from './pages/Blog'
import { Resume } from './pages/Resume'
import './styles/globals.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App