import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  const isActive = (path: string) => location.pathname === path

  return (
    <div className={`${isLandingPage ? 'h-screen' : 'min-h-screen'} bg-tn-bg-primary text-tn-fg-primary flex flex-col`}>
      <nav className="sticky top-0 z-50 bg-tn-bg-primary/90 backdrop-blur-lg border-b border-tn-border">
        <div className="container flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-tn-cyan hover:text-tn-magenta transition-colors"
          >
            hashiiiii
          </Link>
          
          <div className="flex items-center gap-6">
            {!isLandingPage && (
              <Link
                to="/"
                className={`transition-colors ${
                  isActive('/') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                }`}
              >
                Home
              </Link>
            )}
            <Link
              to="/blog"
              className={`transition-colors ${
                isActive('/blog') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/resume"
              className={`transition-colors ${
                isActive('/resume') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
              }`}
            >
              Resume
            </Link>
            <Link
              to="/product"
              className={`transition-colors ${
                isActive('/product') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
              }`}
            >
              Product
            </Link>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>
      
      <main className={`${isLandingPage ? 'flex-1' : 'container py-12'}`}>
        {children}
      </main>
      
      <footer className="border-t border-tn-border">
        <div className="container py-8 text-center text-tn-fg-muted">
          <p>&copy; {new Date().getFullYear()} hashiiiii. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}