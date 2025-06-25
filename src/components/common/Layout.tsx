import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <div className={`${isLandingPage ? 'h-screen' : 'min-h-screen'} bg-tn-bg-primary text-tn-fg-primary flex flex-col overflow-x-hidden`}>
      <nav className="sticky top-0 z-50 bg-tn-bg-primary/90 backdrop-blur-lg border-b border-tn-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="text-lg sm:text-xl font-bold text-tn-cyan hover:text-tn-magenta transition-colors flex-shrink-0"
            >
              hashiiiii
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {!isLandingPage && (
                <Link
                  to="/"
                  className={`transition-colors text-sm lg:text-base ${
                    isActive('/') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                  }`}
                >
                  Home
                </Link>
              )}
              <Link
                to="/blog"
                className={`transition-colors text-sm lg:text-base ${
                  isActive('/blog') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                }`}
              >
                Blog
              </Link>
              <Link
                to="/resume"
                className={`transition-colors text-sm lg:text-base ${
                  isActive('/resume') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                }`}
              >
                Resume
              </Link>
              <Link
                to="/product"
                className={`transition-colors text-sm lg:text-base ${
                  isActive('/product') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                }`}
              >
                Product
              </Link>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <button
                className="p-2 -mr-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center">
                <span className={`block w-6 h-0.5 bg-tn-fg-primary transition-transform ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`} />
                <span className={`block w-6 h-0.5 bg-tn-fg-primary mt-1 transition-opacity ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`block w-6 h-0.5 bg-tn-fg-primary mt-1 transition-transform ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-tn-border bg-tn-bg-primary">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {!isLandingPage && (
                  <Link
                    to="/"
                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                      isActive('/') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                )}
                <Link
                  to="/blog"
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive('/blog') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/resume"
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive('/resume') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume
                </Link>
                <Link
                  to="/product"
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive('/product') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Product
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <main className={`${isLandingPage ? 'flex-1' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 w-full'}`}>
        {children}
      </main>
      
      <footer className="border-t border-tn-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center text-tn-fg-muted">
          <p className="text-sm">&copy; {new Date().getFullYear()} hashiiiii. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}