import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist/client',
    chunkSizeWarningLimit: 1000, // 1MBに拡大
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // React関連
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Markdownレンダリング関連（rehype-highlightを含む）
          'markdown-vendor': [
            'react-markdown',
            'remark-gfm',
            'remark-math',
            'rehype-highlight',
            'rehype-katex',
            'rehype-raw',
          ],
          // 数式レンダリング
          'katex-vendor': ['katex'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
