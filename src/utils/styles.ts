import { designSystem } from '@/styles/design-system';

export function generateStyles(theme: 'light' | 'dark' = 'light') {
  const colors = designSystem.colors[theme];
  const { typography, spacing, animation } = designSystem;

  return `
    :root {
      --color-bg: ${colors.background};
      --color-fg: ${colors.foreground};
      --color-muted: ${colors.muted};
      --color-border: ${colors.border};
      --color-accent: ${colors.accent};
      --color-hover: ${colors.hover};
      
      --font-sans: ${typography.fontFamily.sans};
      --font-mono: ${typography.fontFamily.mono};
      
      --transition-fast: ${animation.duration.fast} ${animation.easing.inOut};
      --transition-normal: ${animation.duration.normal} ${animation.easing.inOut};
    }
    
    /* ダークモード対応 */
    [data-theme="dark"] {
      --color-bg: ${designSystem.colors.dark.background};
      --color-fg: ${designSystem.colors.dark.foreground};
      --color-muted: ${designSystem.colors.dark.muted};
      --color-border: ${designSystem.colors.dark.border};
      --color-accent: ${designSystem.colors.dark.accent};
      --color-hover: ${designSystem.colors.dark.hover};
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    html {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    body {
      font-family: var(--font-sans);
      background-color: var(--color-bg);
      color: var(--color-fg);
      line-height: ${typography.lineHeight.normal};
      transition: background-color var(--transition-normal), color var(--transition-normal);
    }
    
    .container {
      max-width: 1024px;
      margin: 0 auto;
      padding: ${spacing[4]} ${spacing[6]};
    }
    
    @media (max-width: ${designSystem.breakpoints.sm}) {
      .container {
        padding: ${spacing[4]} ${spacing[4]};
      }
    }
    
    /* Typography */
    h1 {
      font-size: ${typography.fontSize['4xl']};
      font-weight: 700;
      line-height: ${typography.lineHeight.tight};
      margin-bottom: ${spacing[4]};
    }
    
    h2 {
      font-size: ${typography.fontSize['2xl']};
      font-weight: 600;
      line-height: ${typography.lineHeight.tight};
      margin-bottom: ${spacing[3]};
    }
    
    p {
      margin-bottom: ${spacing[4]};
      color: var(--color-fg);
      opacity: 0.9;
    }
    
    a {
      color: var(--color-accent);
      text-decoration: none;
      transition: opacity var(--transition-fast);
    }
    
    a:hover {
      opacity: 0.8;
    }
    
    /* Components */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: ${spacing[8]} ${spacing[4]};
    }
    
    .hero-title {
      font-size: clamp(${typography.fontSize['3xl']}, 8vw, ${typography.fontSize['5xl']});
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: ${spacing[6]};
    }
    
    .hero-subtitle {
      font-size: ${typography.fontSize.lg};
      color: var(--color-muted);
      margin-bottom: ${spacing[8]};
      max-width: 600px;
    }
    
    .nav-links {
      display: flex;
      gap: ${spacing[6]};
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: ${spacing[8]};
    }
    
    .nav-link {
      font-size: ${typography.fontSize.lg};
      color: var(--color-fg);
      padding: ${spacing[2]} ${spacing[4]};
      border-radius: 8px;
      transition: all var(--transition-fast);
      position: relative;
    }
    
    .nav-link:hover {
      background-color: var(--color-hover);
      transform: translateY(-2px);
    }
    
    .social-links {
      display: flex;
      gap: ${spacing[4]};
      justify-content: center;
      align-items: center;
    }
    
    .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-muted);
      transition: all var(--transition-fast);
    }
    
    .social-link:hover {
      background-color: var(--color-hover);
      color: var(--color-fg);
      transform: scale(1.1);
    }
    
    .theme-toggle {
      position: fixed;
      top: ${spacing[4]};
      right: ${spacing[4]};
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: var(--color-hover);
      border: 1px solid var(--color-border);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);
    }
    
    .theme-toggle:hover {
      transform: scale(1.1);
    }
    
    /* ASCII Art Style (inspired by kuniwak.com) */
    .ascii-art {
      font-family: var(--font-mono);
      font-size: ${typography.fontSize.sm};
      line-height: 1.2;
      color: var(--color-muted);
      white-space: pre;
      margin: ${spacing[8]} 0;
    }
    
    /* モバイル対応の改善 */
    @media (max-width: ${designSystem.breakpoints.md}) {
      .hero {
        padding: ${spacing[4]} ${spacing[2]};
      }
      
      .nav-links {
        gap: ${spacing[2]};
        flex-direction: column;
        width: 100%;
        max-width: 200px;
      }
      
      .nav-link {
        width: 100%;
        text-align: center;
        font-size: ${typography.fontSize.base};
      }
      
      .hero-title {
        font-size: ${typography.fontSize['3xl']};
        margin-bottom: ${spacing[4]};
      }
      
      .hero-subtitle {
        font-size: ${typography.fontSize.base};
        margin-bottom: ${spacing[6]};
      }
      
      .social-links {
        gap: ${spacing[3]};
        margin-top: ${spacing[4]};
      }
      
      .social-link {
        width: 40px;
        height: 40px;
      }
      
      .theme-toggle {
        width: 40px;
        height: 40px;
        top: ${spacing[2]};
        right: ${spacing[2]};
      }
      
      .ascii-art {
        font-size: ${typography.fontSize.xs};
        overflow-x: auto;
        margin: ${spacing[6]} -${spacing[2]};
        padding: 0 ${spacing[2]};
      }
    }
    
    @media (max-width: ${designSystem.breakpoints.sm}) {
      .hero-title {
        font-size: ${typography.fontSize['2xl']};
      }
      
      .hero-subtitle {
        font-size: ${typography.fontSize.sm};
      }
      
      .ascii-art {
        display: none; /* 小さい画面では非表示 */
      }
    }
    
    /* アニメーション無効化（アクセシビリティ対応） */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }
    
    /* ハイコントラストモード対応 */
    @media (prefers-contrast: high) {
      :root {
        --color-accent: #0066cc;
        --color-border: #000000;
      }
      
      [data-theme="dark"] {
        --color-accent: #66b3ff;
        --color-border: #ffffff;
      }
    }
  `;
}
