import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        page_path?: string;
        page_location?: string;
        page_title?: string;
        [key: string]: string | number | boolean | undefined;
      }
    ) => void;
  }
}

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-EW66F2QF0H', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
}
