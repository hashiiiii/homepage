/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tokyo Night background colors
        'tn-bg-primary': 'var(--tn-bg-primary)',
        'tn-bg-secondary': 'var(--tn-bg-secondary)',
        'tn-bg-tertiary': 'var(--tn-bg-tertiary)',
        'tn-bg-hover': 'var(--tn-bg-hover)',
        // Tokyo Night foreground colors
        'tn-fg-primary': 'var(--tn-fg-primary)',
        'tn-fg-secondary': 'var(--tn-fg-secondary)',
        'tn-fg-muted': 'var(--tn-fg-muted)',
        // Tokyo Night UI colors
        'tn-border': 'var(--tn-border)',
        'tn-selection': 'var(--tn-selection)',
        'tn-highlight': 'var(--tn-highlight)',
        'tn-comment': 'var(--tn-comment)',
        // Tokyo Night accent colors
        'tn-blue': 'var(--tn-blue)',
        'tn-cyan': 'var(--tn-cyan)',
        'tn-green': 'var(--tn-green)',
        'tn-yellow': 'var(--tn-yellow)',
        'tn-magenta': 'var(--tn-magenta)',
        'tn-red': 'var(--tn-red)',
        'tn-orange': 'var(--tn-orange)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}