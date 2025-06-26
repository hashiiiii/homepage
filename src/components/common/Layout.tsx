import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`${isLandingPage ? 'h-screen' : 'min-h-screen'} flex flex-col overflow-x-hidden bg-tn-bg-primary text-tn-fg-primary`}
    >
      <nav className="bg-tn-bg-primary/90 sticky top-0 z-50 border-b border-tn-border backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="flex-shrink-0 text-lg font-bold text-tn-cyan transition-colors hover:text-tn-magenta sm:text-xl"
            >
              hashiiiii
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-4 md:flex lg:gap-6">
              {!isLandingPage && (
                <Link
                  to="/"
                  className={`text-sm transition-colors lg:text-base ${
                    isActive('/') ? 'text-tn-blue' : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                  }`}
                >
                  Home
                </Link>
              )}
              <Link
                to="/blog"
                className={`text-sm transition-colors lg:text-base ${
                  isActive('/blog')
                    ? 'text-tn-blue'
                    : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                }`}
              >
                Blog
              </Link>
              <Link
                to="/resume"
                className={`text-sm transition-colors lg:text-base ${
                  isActive('/resume')
                    ? 'text-tn-blue'
                    : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                }`}
              >
                Resume
              </Link>
              <Link
                to="/product"
                className={`text-sm transition-colors lg:text-base ${
                  isActive('/product')
                    ? 'text-tn-blue'
                    : 'text-tn-fg-secondary hover:text-tn-fg-primary'
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
            <div className="flex items-center gap-2 md:hidden">
              <LanguageToggle />
              <ThemeToggle />
              <button
                className="-mr-2 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="flex h-6 w-6 flex-col justify-center">
                  <span
                    className={`block h-0.5 w-6 bg-tn-fg-primary transition-transform ${
                      isMobileMenuOpen ? 'translate-y-1 rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`mt-1 block h-0.5 w-6 bg-tn-fg-primary transition-opacity ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`mt-1 block h-0.5 w-6 bg-tn-fg-primary transition-transform ${
                      isMobileMenuOpen ? '-translate-y-1 -rotate-45' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="border-t border-tn-border bg-tn-bg-primary md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {!isLandingPage && (
                  <Link
                    to="/"
                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                      isActive('/')
                        ? 'text-tn-blue'
                        : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                )}
                <Link
                  to="/blog"
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive('/blog')
                      ? 'text-tn-blue'
                      : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/resume"
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive('/resume')
                      ? 'text-tn-blue'
                      : 'text-tn-fg-secondary hover:text-tn-fg-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume
                </Link>
                <Link
                  to="/product"
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive('/product')
                      ? 'text-tn-blue'
                      : 'text-tn-fg-secondary hover:text-tn-fg-primary'
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

      <main
        className={`${isLandingPage ? 'flex-1' : 'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12'}`}
      >
        {children}
      </main>

      <footer className="mt-auto border-t border-tn-border">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-tn-fg-muted sm:px-6 sm:py-8 lg:px-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} hashiiiii. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
