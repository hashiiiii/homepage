import { useEffect } from 'react';

/**
 * Custom hook to update page title dynamically
 * @param title - Page title (without domain suffix)
 * @param isHome - Whether this is the home page (uses only domain name)
 */
export function usePageTitle(title?: string, isHome = false) {
  useEffect(() => {
    const baseTitle = 'hashiiiii.com';

    if (isHome || !title) {
      document.title = baseTitle;
    } else {
      document.title = `${title} | ${baseTitle}`;
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = baseTitle;
    };
  }, [title, isHome]);
}
