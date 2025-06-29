import { lazy, Suspense, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { GA_TRACKING_ID } from './utils/analytics';
import './styles/globals.css';

// Lazy load pages for better code splitting
const Landing = lazy(() => import('./pages/Landing').then((m) => ({ default: m.Landing })));
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })));
const BlogDetail = lazy(() =>
  import('./pages/BlogDetail').then((m) => ({ default: m.BlogDetail }))
);
const Resume = lazy(() => import('./pages/Resume').then((m) => ({ default: m.Resume })));
const Product = lazy(() => import('./pages/Product').then((m) => ({ default: m.Product })));
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));

// Loading component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-tn-text-muted">Loading...</div>
  </div>
);

function RouteTracker() {
  const location = useLocation();

  // Initialize Google Analytics
  useEffect(() => {
    if (GA_TRACKING_ID && !document.querySelector(`script[src*="${GA_TRACKING_ID}"]`)) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
      window.gtag('js', new Date());

      // Initial configuration after script loads
      script.onload = () => {
        window.gtag('config', GA_TRACKING_ID, {
          page_path: window.location.pathname + window.location.search,
        });
      };
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (window.gtag && GA_TRACKING_ID) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <RouteTracker />
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/product" element={<Product />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
