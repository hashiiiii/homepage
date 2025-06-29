import type { Language } from '@/contexts/LanguageContext';

// Google Analytics 設定
declare global {
  interface Window {
    gtag: (command: string, targetId: string | Date, config?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

// デバッグ用ログ（開発環境のみ）
if (import.meta.env.DEV && typeof window !== 'undefined') {
  console.log(
    '[GA] Environment variable VITE_GA_TRACKING_ID:',
    import.meta.env.VITE_GA_TRACKING_ID
  );
  console.log('[GA] Resolved GA_TRACKING_ID:', GA_TRACKING_ID);
}

// ページビューを記録
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// カスタムイベントを記録
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

// ブログ記事閲覧イベント
export const trackBlogView = (postId: string, title: string) => {
  event({
    action: 'blog_view',
    category: 'engagement',
    label: `${postId}: ${title}`,
  });
};

// 言語変更イベント
export const trackLanguageChange = (language: Language) => {
  event({
    action: 'language_change',
    category: 'user_preference',
    label: language,
  });
};

// テーマ変更イベント
export const trackThemeChange = (theme: 'light' | 'dark') => {
  event({
    action: 'theme_change',
    category: 'user_preference',
    label: theme,
  });
};

// 外部リンククリックイベント
export const trackExternalLink = (url: string, context: string) => {
  event({
    action: 'external_link_click',
    category: 'engagement',
    label: `${context}: ${url}`,
  });
};

// ファイルダウンロードイベント
export const trackDownload = (fileName: string, fileType: string) => {
  event({
    action: 'file_download',
    category: 'engagement',
    label: `${fileType}: ${fileName}`,
  });
};
