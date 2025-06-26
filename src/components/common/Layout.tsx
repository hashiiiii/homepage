import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div
      className={`${isLandingPage ? 'h-screen' : 'min-h-screen'} flex flex-col overflow-x-hidden bg-tn-bg-primary text-tn-fg-primary`}
    >
      <Navigation />

      <main
        className={`${isLandingPage ? 'flex-1' : 'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12'}`}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};
