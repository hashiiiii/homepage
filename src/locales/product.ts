import type { Language } from '../contexts/LanguageContext';
import type { ProductData } from '../models/product.model';

export const productData: Record<Language, ProductData> = {
  en: {
    title: 'Product',
    sections: {
      ossProjects: 'OSS',
      presentations: 'Presentations',
    },
    labels: {
      github: 'GitHub',
      slides: 'Slides',
      video: 'Video',
    },
    ossProjects: [
      {
        id: '1',
        name: 'RectPop',
        description:
          'A Unity plugin for positioning layouts around a RectTransform using anchors and pivots.',
        url: 'https://github.com/hashiiiii/RectPop',
        githubUrl: 'https://github.com/hashiiiii/RectPop',
        stars: 4,
        language: 'C#',
        tags: ['Unity', 'C#', 'uGUI', 'UI', 'Game'],
      },
      {
        id: '2',
        name: 'dotfiles',
        description:
          'About Rules and guidelines for optimizing AI coding assistant interactions in Windsurf and Cursor IDEs.',
        url: 'https://github.com/hashiiiii/dotfiles',
        githubUrl: 'https://github.com/hashiiiii/dotfiles',
        stars: 1,
        language: 'Shell',
        tags: ['Shell', 'zsh', 'dotfiles', 'macOS', 'Debian', 'PowerShell', 'WSL2'],
      },
      {
        id: '3',
        name: 'rules-for-ai',
        description:
          'About Rules and guidelines for optimizing AI coding assistant interactions in Windsurf and Cursor IDEs.',
        url: 'https://github.com/hashiiiii/rules-for-ai',
        githubUrl: 'https://github.com/hashiiiii/rules-for-ai',
        stars: 4,
        language: 'Markdown',
        tags: ['AI', 'Windsurf', 'Cursor', 'Editor'],
      },
      {
        id: '4',
        name: 'gh-auto-load-more',
        description:
          "Automatically expands all 'Load more...' buttons in GitHub PR reviews until all comments are visible.",
        url: 'https://github.com/hashiiiii/gh-auto-load-more',
        githubUrl: 'https://github.com/hashiiiii/gh-auto-load-more',
        stars: 0,
        language: 'TypeScript',
        tags: ['Github', 'chrome-extension'],
      },
      {
        id: '5',
        name: 'homepage',
        description: 'My home page.',
        url: 'https://github.com/hashiiiii/homepage',
        githubUrl: 'https://github.com/hashiiiii/homepage',
        stars: 0,
        language: 'TypeScript',
        tags: ['homepage', 'Hono', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
      },
    ],
    presentations: [],
  },
  ja: {
    title: 'Product',
    sections: {
      ossProjects: 'OSS',
      presentations: '資料',
    },
    labels: {
      github: 'GitHub',
      slides: 'スライド',
      video: '動画',
    },
    ossProjects: [
      {
        id: '1',
        name: 'RectPop',
        description: '任意の RectTransform の周辺に UI をいい感じに表示する Unity プラグイン。',
        url: 'https://github.com/hashiiiii/RectPop',
        githubUrl: 'https://github.com/hashiiiii/RectPop',
        stars: 4,
        language: 'C#',
        tags: ['Unity', 'C#', 'uGUI', 'UI', 'Game'],
      },
      {
        id: '2',
        name: 'dotfiles',
        description: 'My dotfile です。',
        url: 'https://github.com/hashiiiii/dotfiles',
        githubUrl: 'https://github.com/hashiiiii/dotfiles',
        stars: 1,
        language: 'Shell',
        tags: ['Shell', 'zsh', 'dotfiles', 'macOS', 'Debian', 'PowerShell', 'WSL2'],
      },
      {
        id: '3',
        name: 'rules-for-ai',
        description: 'AI-Editor のルールをまとめたやつ。',
        url: 'https://github.com/hashiiiii/rules-for-ai',
        githubUrl: 'https://github.com/hashiiiii/rules-for-ai',
        stars: 4,
        language: 'Markdown',
        tags: ['AI', 'Windsurf', 'Cursor', 'Editor'],
      },
      {
        id: '4',
        name: 'gh-auto-load-more',
        description:
          'GitHub PR で全てのコメントが表示されるまで「Load more...」ボタンを自動的で展開してくれる Chrome 拡張。',
        url: 'https://github.com/hashiiiii/gh-auto-load-more',
        githubUrl: 'https://github.com/hashiiiii/gh-auto-load-more',
        stars: 0,
        language: 'TypeScript',
        tags: ['Github', 'chrome-extension'],
      },
      {
        id: '5',
        name: 'homepage',
        description: '今見てもらってるこのホームページです。',
        url: 'https://github.com/hashiiiii/homepage',
        githubUrl: 'https://github.com/hashiiiii/homepage',
        stars: 0,
        language: 'TypeScript',
        tags: ['homepage', 'Hono', 'React', 'TypeScript', 'Vite', 'Tailwind CSS'],
      },
    ],
    presentations: [],
  },
};
