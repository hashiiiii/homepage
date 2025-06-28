import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GA_TRACKING_ID, pageview } from '@/utils/analytics';

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics スクリプトを動的に読み込み
    if (typeof window !== 'undefined' && GA_TRACKING_ID) {
      if (import.meta.env.DEV) {
        console.log('[GA] Initializing with ID:', GA_TRACKING_ID);
      }
      // gtag スクリプトが既に存在するかチェック
      if (
        !document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"]`)
      ) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
        script.async = true;
        document.head.appendChild(script);

        // gtag 関数を初期化
        window.gtag =
          window.gtag ||
          function () {
            // eslint-disable-next-line prefer-rest-params
            (window as unknown as { dataLayer: unknown[] }).dataLayer =
              (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
            // eslint-disable-next-line prefer-rest-params
            (window as unknown as { dataLayer: unknown[] }).dataLayer.push(arguments);
          };

        window.gtag('js', new Date());
        window.gtag('config', GA_TRACKING_ID, {
          // プライバシー設定
          anonymize_ip: true, // IPアドレスを匿名化
          allow_google_signals: false, // Googleシグナルを無効化
          allow_ad_personalization_signals: false, // 広告パーソナライゼーションを無効化
        });

        if (import.meta.env.DEV) {
          console.log('[GA] Google Analytics initialized successfully');
          console.log('[GA] You can verify with Google Tag Assistant Chrome extension');
        }
      }
    }
  }, []);

  useEffect(() => {
    // ページ変更時にページビューを記録
    if (GA_TRACKING_ID) {
      if (import.meta.env.DEV) {
        console.log('[GA] Tracking pageview:', window.location.href);
      }
      pageview(window.location.href);
    }
  }, [location]);

  return null;
}
