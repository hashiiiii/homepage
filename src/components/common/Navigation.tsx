import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { path: "/blog", label: "Blog" },
  { path: "/resume", label: "Resume" },
  { path: "/product", label: "Product" },
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const NavLink: React.FC<{
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }> = ({ to, children, className = "", onClick }) => (
    <Link
      to={to}
      className={`transition-colors ${
        isActive(to) ? "text-tn-blue" : "text-tn-fg-secondary hover:text-tn-fg-primary"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-tn-bg-primary/90 sticky top-0 z-50 border-b border-tn-border backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="shrink-0 text-lg font-bold text-tn-cyan transition-colors hover:text-tn-magenta sm:text-xl"
          >
            hashiiiii
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex lg:gap-6">
            {!isLandingPage && (
              <NavLink to="/" className="text-sm lg:text-base">
                Home
              </NavLink>
            )}
            {navLinks.map(({ path, label }) => (
              <NavLink key={path} to={path} className="text-sm lg:text-base">
                {label}
              </NavLink>
            ))}
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
              type="button"
              className="-mr-2 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="flex size-6 flex-col justify-center">
                <span
                  className={`block h-0.5 w-6 bg-tn-fg-primary transition-transform ${
                    isMobileMenuOpen ? "translate-y-1 rotate-45" : ""
                  }`}
                />
                <span
                  className={`mt-1 block h-0.5 w-6 bg-tn-fg-primary transition-opacity ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`mt-1 block h-0.5 w-6 bg-tn-fg-primary transition-transform ${
                    isMobileMenuOpen ? "-translate-y-1 -rotate-45" : ""
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
                <NavLink
                  to="/"
                  className="block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
              )}
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className="block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
