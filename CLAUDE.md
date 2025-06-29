# hashiiiii.com Homepage Project

## プロジェクト概要

hashiiiii.comドメインを使用した個人ホームページの開発プロジェクトです。**静的サイト生成アーキテクチャ**を採用し、高速なパフォーマンスと開発効率を両立させています。

### 実装済み機能

- ✅ **Landing Page**: プロフェッショナルでモダンなトップページ
- ✅ **Blog System**: Markdown静的生成によるブログ機能
- ✅ **Resume Page**: 職歴・スキルをまとめたレジュメページ
- ✅ **Product Page**: プロジェクト紹介ページ
- ✅ **Tokyo Night Theme**: ダーク/ライトモード切り替え
- ✅ **多言語対応**: 日本語/英語サポート
- ✅ **レスポンシブデザイン**: モバイル/タブレット/デスクトップ対応

## 技術スタック

### コア技術

- **フロントエンド**: React 19 + TypeScript
- **スタイリング**: Tailwind CSS v3
- **ビルドツール**: Vite 6
- **ルーティング**: React Router v7 (Client-side)
- **ランタイム**: Node.js 18+ (推奨: 20.x)

### コンテンツ処理

- **Markdown処理**: react-markdown + remark/rehype
- **シンタックスハイライト**: highlight.js (Tokyo Night theme)
- **数式レンダリング**: KaTeX
- **図表**: Mermaid.js

### 開発ツール

- **テストフレームワーク**: Vitest + @testing-library
- **リンター**: ESLint
- **フォーマッター**: Prettier
- **パッケージマネージャー**: npm
- **型チェック**: TypeScript (strict mode)

## プロジェクト構造

```
homepage/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
│       ├── ci.yml         # テスト・リント・ビルド
│       └── deploy.yml     # Vercelデプロイ
├── content/
│   └── blog/              # Markdownブログ記事
├── docs/                  # プロジェクトドキュメント
├── public/                # 静的アセット
│   ├── images/           # 画像ファイル
│   └── favicon.ico       # ファビコン
├── src/
│   ├── components/        # Reactコンポーネント
│   │   ├── blog/         # ブログ関連コンポーネント
│   │   ├── common/       # 共通コンポーネント
│   │   └── resume/       # レジュメページ専用
│   ├── contexts/          # React Context
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── generated/         # ビルド時生成ファイル
│   │   ├── blog-metadata.json
│   │   └── blog-posts.json
│   ├── hooks/            # カスタムReact Hooks
│   ├── lib/              # ビジネスロジック
│   │   ├── blog.ts       # ブログデータアクセス
│   │   ├── build-blog.ts # Markdownビルドスクリプト
│   │   └── product.ts    # プロダクトデータ
│   ├── locales/          # 多言語データ
│   ├── models/           # TypeScript型定義
│   ├── pages/            # ページコンポーネント
│   ├── styles/           # グローバルスタイル・デザインシステム
│   └── utils/            # ユーティリティ関数
├── tests/                # テストファイル
│   ├── setup.ts          # テスト設定
│   └── unit/             # 単体・統合テスト
└── dist/                 # ビルド出力 (gitignore)
```

## 開発ワークフロー

### 日常的な開発手順

1. **開発環境起動**

   ```bash
   npm run dev
   ```

2. **コード品質チェック**

   ```bash
   npm run lint
   npm run test
   ```

3. **ビルド確認**
   ```bash
   npm run build
   ```

### ブログ記事作成フロー

1. **Markdownファイル作成**

   ```bash
   # content/blog/配下に新しい.mdファイルを作成
   touch content/blog/2024-01-01-new-post.md
   ```

2. **メタデータ設定**

   ```markdown
   id: '5'
   title: 'Post Title'
   excerpt: 'Brief description'
   date: '2024-01-01'
   tags: ['React', 'TypeScript']
   readTime: '5 min read'
   ```

3. **自動ビルド**
   - `npm run build`実行時に自動的にJSONファイル生成
   - Markdown仕様違反があればビルドエラーで検知

### 機能開発フロー

1. **テスト駆動開発**

   - 新機能はテストから書き始める
   - Red → Green → Refactorサイクル

2. **コンポーネント作成**

   - 既存コンポーネントのパターンを参考
   - TypeScript型安全性を重視
   - アクセシビリティ配慮

3. **スタイリング**
   - Tailwind CSSのユーティリティクラス使用
   - Tokyo Nightテーマカラーシステム準拠

## データベース設計

**このプロジェクトではデータベースは使用していません。**

すべてのデータは以下の形式で管理されています：

- **ブログデータ**: Markdownファイル → ビルド時にJSONに変換
- **静的データ**: TypeScriptファイル内で定義（locales, config等）
- **ユーザー設定**: localStorage（テーマ、言語設定）

## 認証システム

**このプロジェクトでは認証システムは実装していません。**

パブリックな個人ホームページとして設計されており、認証が必要な機能はありません。

## テストガイドライン

### テスト戦略

- **単体テスト**: 個別コンポーネント・ユーティリティ関数
- **統合テスト**: 機能全体のワークフロー
- **カバレッジ**: 100%維持目標

### テスト実行

```bash
# 全テスト実行
npm run test

# ウォッチモード
npm run test -- --watch

# カバレッジ確認
npm run test -- --coverage
```

### テスト作成ガイドライン

1. **コンポーネントテスト**

   ```typescript
   // テンプレート: tests/unit/components/ComponentName.test.tsx
   import { render, screen } from '@testing-library/react';
   import { ComponentName } from '@/components/ComponentName';

   describe('ComponentName', () => {
     it('should render correctly', () => {
       render(<ComponentName />);
       expect(screen.getByRole('...')).toBeInTheDocument();
     });
   });
   ```

2. **フックテスト**

   ```typescript
   // テンプレート: tests/unit/hooks/useHookName.test.ts
   import { renderHook } from '@testing-library/react';
   import { useHookName } from '@/hooks/useHookName';

   describe('useHookName', () => {
     it('should return expected value', () => {
       const { result } = renderHook(() => useHookName());
       expect(result.current).toBe(...);
     });
   });
   ```

3. **Markdownバリデーションテスト**
   - ブログ記事の仕様準拠チェック
   - フロントマター必須フィールド検証
   - 日付形式・タグ形式の妥当性検証

## デプロイメント

### GitHub Actions + Vercel

#### CI Pipeline (`.github/workflows/ci.yml`)

- **トリガー**: Push/PR to `main`
- **実行内容**: Lint → Build → Test
- **Node.js**: 20.x

#### Deploy Pipeline (`.github/workflows/deploy.yml`)

- **トリガー**: Manual workflow dispatch
- **環境**: Preview / Production選択可能
- **実行内容**: Quality checks → Build → Deploy to Vercel

#### 必要なGitHubシークレット

```
VERCEL_TOKEN         # Vercel認証トークン
VERCEL_ORG_ID        # 組織ID
VERCEL_PROJECT_ID    # プロジェクトID
```

#### デプロイ手順

1. GitHub → Actions → "Deploy to Vercel"
2. "Run workflow" → 環境選択
3. 実行完了まで待機

### ローカルビルド

```bash
npm run build
npx serve dist
```

## 重要な設定ファイル

### 1. `package.json`

```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsx src/lib/build-blog.ts && vite build",
    "test": "tsc --noEmit && vitest run --coverage",
    "lint": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md,css,html}\" && eslint . --ext .ts,.tsx"
  }
}
```

### 2. `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mermaid: ['mermaid'],
        },
      },
    },
  },
});
```

### 3. `tailwind.config.js`

- Tokyo Nightカラーシステム定義
- カスタムユーティリティクラス
- レスポンシブブレークポイント

### 4. `tsconfig.json`

- Strict mode有効
- Path mapping設定 (`@/` → `src/`)
- Modern JSX transform

## トラブルシューティング

### よくある問題と解決方法

#### 1. ビルドエラー: "Markdown validation failed"

```bash
# 原因: ブログ記事のフロントマターが仕様に合わない
# 解決: エラーメッセージの指示に従ってMarkdownファイルを修正

# 例: 必須フィールドが不足
Error: Missing required field 'excerpt' in 2024-01-01-post.md

# 修正: フロントマターに不足フィールドを追加
id: '1'
title: 'Title'
excerpt: 'Description'  # 追加
date: '2024-01-01'
tags: ['tag']
readTime: '3 min read'
```

#### 2. テスト失敗: "Cannot resolve module '@/...'"

```bash
# 原因: Path mappingが正しく設定されていない
# 解決: vitest.config.tsでalias設定を確認

# vitest.config.ts
export default defineConfig({
  test: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### 3. Mermaidダイアグラムが表示されない

```bash
# 原因: 大きなJavaScriptバンドルによる読み込み遅延
# 解決: 自動的に遅延ロードされるため、しばらく待つ
# または、ネットワークタブでスクリプト読み込み状況を確認
```

#### 4. 開発サーバーが起動しない

```bash
# 原因: ポートが既に使用されている
# 解決1: 他のプロセスを終了
lsof -ti:3000 | xargs kill

# 解決2: 別のポートを使用
npm run dev -- --port 3001
```

## CI/CD

### 継続的インテグレーション

#### 自動実行内容

- **コード品質**: ESLint + Prettier
- **型安全性**: TypeScript型チェック
- **ビルド検証**: 本番ビルドの成功確認
- **テスト実行**: 全テストスイートの実行
- **カバレッジ**: テストカバレッジレポート

#### 品質ゲート

- すべてのテストがパス
- ESLint・TypeScriptエラーゼロ
- ビルドが正常に完了

### 継続的デプロイメント

#### 手動デプロイ

- **理由**: 意図しないデプロイを防止
- **トリガー**: GitHub Actions手動実行
- **環境**: Preview/Production選択可能

#### デプロイフロー

1. 品質チェック実行
2. プロダクションビルド
3. Vercel CLI経由でデプロイ
4. デプロイ完了通知

## コントリビューション

### 開発ルール

1. **ブランチ戦略**

   - `main`: 本番ブランチ
   - `feature/*`: 機能開発
   - `fix/*`: バグ修正

2. **コミットメッセージ**

   ```
   feat: add new blog feature
   fix: resolve markdown rendering issue
   docs: update API documentation
   test: add unit tests for BlogCard component
   ```

3. **プルリクエスト**
   - 全テストパス必須
   - コードレビュー必須
   - CIパス確認後マージ

### コード規約

1. **TypeScript**

   - `any`型の使用禁止
   - 明示的な型定義を推奨
   - インターフェース名は`I`プレフィックス不要

2. **React**

   - 関数コンポーネント使用
   - カスタムフックで状態ロジック分離
   - Propsはインターフェースで型定義

3. **CSS**
   - Tailwind CSSユーティリティクラス使用
   - カスタムCSSは最小限に抑制
   - Tokyo Nightテーマカラー使用

## コード生成規約

### 新しいコンポーネント作成

1. **ファイル配置**

   ```
   src/components/[category]/ComponentName.tsx
   tests/unit/components/[category]/ComponentName.test.tsx
   ```

2. **基本テンプレート**

   ```typescript
   import type { FC } from 'react';

   interface ComponentNameProps {
     // Props型定義
   }

   export const ComponentName: FC<ComponentNameProps> = ({
     // props
   }) => {
     return (
       <div className="...">
         {/* JSX */}
       </div>
     );
   };
   ```

3. **テストテンプレート**

   ```typescript
   import { render, screen } from '@testing-library/react';
   import { ComponentName } from '@/components/[category]/ComponentName';

   describe('ComponentName', () => {
     it('should render correctly', () => {
       render(<ComponentName />);
       // テストケース
     });
   });
   ```

### 新しいページ作成

1. **ページコンポーネント**

   ```typescript
   // src/pages/PageName.tsx
   import { usePageTitle } from '@/hooks/usePageTitle';

   export function PageName() {
     usePageTitle('Page Title');

     return (
       <div className="container mx-auto px-4">
         {/* ページ内容 */}
       </div>
     );
   }
   ```

2. **ルート追加**

   ```typescript
   // src/App.tsx
   <Route path="/page-name" element={<PageName />} />
   ```

3. **ナビゲーション追加**
   ```typescript
   // src/components/common/Navigation.tsx
   // 必要に応じてナビゲーションリンクを追加
   ```

### 新しいフック作成

1. **カスタムフックテンプレート**

   ```typescript
   // src/hooks/useHookName.ts
   import { useState, useEffect } from 'react';

   export function useHookName() {
     const [state, setState] = useState(initialValue);

     useEffect(() => {
       // 副作用処理
     }, []);

     return state;
   }
   ```

2. **型安全性**
   - 戻り値の型を明示的に定義
   - ジェネリクスを適切に使用
   - 副作用の依存配列を正確に指定

---

**Last Updated**: 2025-06-29
**Version**: 1.0.0 (Static SPA)
