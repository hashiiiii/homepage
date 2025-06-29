# hashiiiii.com

Personal homepage built with modern web technologies. A fast, responsive, and accessible single-page application showcasing projects, blog posts, and professional profile.

## ✨ Features

- **🎨 Modern Design**: Tokyo Night theme with dark/light mode toggle
- **📱 Responsive**: Mobile-first design that works on all devices
- **🌐 Multilingual**: Japanese/English language support
- **📝 Blog System**: Markdown-based blog with syntax highlighting and Mermaid diagrams
- **🚀 Performance**: Static site generation with Vite for optimal loading speed
- **♿ Accessible**: Semantic HTML and ARIA compliance
- **🧪 Well Tested**: Comprehensive test suite with 100% coverage

## 🛠 Tech Stack

### Core

- **Frontend**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router 7

### Content & Markdown

- **Markdown Processing**: react-markdown with enhanced features
- **Syntax Highlighting**: highlight.js (Tokyo Night theme)
- **Math Rendering**: KaTeX
- **Diagrams**: Mermaid.js

### Development

- **Testing**: Vitest with coverage
- **Code Quality**: ESLint + Prettier
- **Type Safety**: TypeScript (strict mode)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (Recommended: 20.x)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/hashiiiii/homepage.git
cd homepage

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

## 📜 Available Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start development server   |
| `npm run build` | Build for production       |
| `npm run test`  | Run tests with coverage    |
| `npm run lint`  | Format code and run linter |

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── blog/           # Blog-specific components
│   ├── common/         # Shared components
│   └── resume/         # Resume page components
├── contexts/           # React contexts (Theme, Language)
├── hooks/              # Custom React hooks
├── lib/                # Core business logic
├── locales/            # i18n content
├── models/             # TypeScript type definitions
├── pages/              # Page components
├── styles/             # Global styles and design system
└── utils/              # Utility functions

content/
└── blog/               # Markdown blog posts

tests/
└── unit/               # Unit and integration tests
```

## 📝 Blog System

The blog system uses a static generation approach for optimal performance:

1. **Content**: Write Markdown files in `content/blog/`
2. **Build**: `build-blog.ts` processes markdown into JSON
3. **Runtime**: Components consume pre-processed JSON data

### Blog Post Metadata

```markdown
id: '1'
title: 'Your Blog Post Title'
excerpt: 'A brief description of your blog post content that appears in the blog list.'
date: '2024-01-01'
tags: ['React', 'TypeScript', 'Web Development']
readTime: '3 min read'
```

# Your Blog Post Content

Write your content here using Markdown syntax.

## Features Supported

- Syntax highlighting for code blocks
- Math equations with KaTeX: $E = mc^2$
- Mermaid diagrams for flowcharts
- GitHub-flavored Markdown extensions
- Custom alert blocks (Note, Tip, Warning, Danger)

## 🎨 Theming

Built with Tokyo Night color scheme supporting both dark and light modes:

- **Dark Mode**: Deep blues and purples with high contrast
- **Light Mode**: Clean whites and soft grays

## 🌐 Internationalization

Currently supports:

- **Japanese (ja)**: Native language
- **English (en)**: International audience

Language toggle available in navigation. Content is managed through locale files for maintainability.

## 🧪 Testing

Comprehensive test suite covering:

- **Unit Tests**: Individual components and utilities
- **Integration Tests**: Feature workflows
- **Coverage**: 100% test coverage maintained

Run tests:

```bash
npm run test
```

## 📦 Deployment

### GitHub Actions + Vercel

Deployment is handled via GitHub Actions workflows:

#### Continuous Integration (`.github/workflows/ci.yml`)

- **Trigger**: Push/PR to `main` branch
- **Actions**: Lint → Build → Test
- **Node.js**: 20.x

#### Required Secrets

Set these in GitHub repository settings:

- `VERCEL_TOKEN`: Vercel authentication token
- `VERCEL_ORG_ID`: Organization ID
- `VERCEL_PROJECT_ID`: Project ID

#### Manual Deployment

To deploy manually:

1. Go to Actions tab in GitHub
2. Select "Deploy to Vercel" workflow
3. Click "Run workflow"
4. Choose environment (preview/production)

### Local Build

```bash
# Build the project
npm run build

# Serve the dist folder with any static file server
npx serve dist
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**hashiiiii**

- Website: [hashiiiii.com](https://hashiiiii.com)
- GitHub: [@hashiiiii](https://github.com/hashiiiii)

---

Built with ❤️ using React and TypeScript
