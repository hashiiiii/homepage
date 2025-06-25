# hashiiiii.com Homepage Project

## プロジェクト概要
hashiiiii.comドメインを使用した個人ホームページの開発プロジェクトです。**Hono + React SPA統合アーキテクチャ**を採用し、高速なUXと開発効率を両立させています。

### 実装済み機能
- ✅ Landing page: プロフェッショナルでモダンなトップページ
- ✅ Blog page: ブログ記事一覧（現在はモックデータ）
- ✅ Resume page: 職歴・スキルをまとめたレジュメページ
- ✅ Tokyo Night Theme: ダーク/ライトモード切り替え
- ✅ レスポンシブデザイン: モバイル/タブレット/デスクトップ対応

## 技術スタック
### コア技術
- **フロントエンド**: React 19 + TypeScript
- **バックエンド**: Hono (統合サーバー)
- **スタイリング**: Tailwind CSS v3
- **ビルドツール**: Vite
- **テーマ**: Tokyo Night
- **ルーティング**: React Router v7 (Client-side)
- **ランタイム**: Node.js 18+

### 開発ツール
- **テストフレームワーク**: Vitest
- **リンター**: ESLint
- **フォーマッター**: Prettier
- **パッケージマネージャー**: npm
- **型チェック**: TypeScript (strict mode)

## 現在のプロジェクト構造
```
homepage/
├── src/
│   ├── api/              # API ルートハンドラー
│   │   ├── blog.ts       # ブログ記事API
│   │   └── resume.ts     # レジュメAPI
│   ├── components/       # Reactコンポーネント
│   │   ├── common/       # 共通コンポーネント
│   │   │   ├── Layout.tsx
│   │   │   └── Navigation.tsx
│   │   ├── blog/         # ブログ関連
│   │   └── resume/       # レジュメ関連
│   ├── contexts/         # React Context
│   │   └── ThemeContext.tsx
│   ├── pages/            # ページコンポーネント
│   │   ├── Landing.tsx
│   │   ├── Blog.tsx
│   │   └── Resume.tsx
│   ├── styles/           # スタイル定義
│   │   ├── theme.ts      # Tokyo Nightテーマ定義
│   │   └── globals.css   # グローバルCSS
│   ├── models/           # データ型定義
│   ├── utils/            # ユーティリティ関数
│   ├── App.tsx           # Reactアプリ本体
│   ├── main.tsx          # React起動ポイント
│   ├── spa-app.ts        # Honoアプリ定義
│   └── spa-server.ts     # サーバー起動
├── tests/                # テストファイル
│   ├── unit/
│   └── setup.ts
├── public/               # 静的ファイル
├── docs/                 # ドキュメント
├── dist/                 # ビルド出力
│   └── client/           # Viteビルド出力
└── index.html            # SPAエントリーポイント
```

## アーキテクチャ概要

### Hono + React SPA統合
単一のHonoサーバーが以下を配信：
- `/api/*` → JSON API レスポンス
- その他全て → React SPA (index.html)

```
ブラウザ → Honoサーバー(:3000)
           ├── /api/* → APIハンドラー → JSON
           └── /* → index.html → React SPA → Client-side routing
```

## 開発ルール

### 1. テスト駆動開発（TDD）
- 新機能は必ずテストから書き始める
- Red → Green → Refactorのサイクル
- 現在のテストカバレッジ: 30/30 (100%)

### 2. ファイル命名規則
- **Reactコンポーネント**: PascalCase (`Layout.tsx`, `ThemeContext.tsx`)
- **ページコンポーネント**: PascalCase (`Landing.tsx`, `Blog.tsx`)
- **APIファイル**: camelCase (`blog.ts`, `resume.ts`)
- **設定ファイル**: kebab-case (`spa-app.ts`, `spa-server.ts`)
- **テストファイル**: `*.test.ts` or `*.test.tsx`

### 3. コーディング規約
- TypeScript strictモード必須
- 関数型プログラミングアプローチ優先
- 早期リターンでネスト削減
- ESLint/Prettier準拠

### 4. Git運用
- ブランチ命名: `feature/*`, `fix/*`, `docs/*`
- コミットメッセージ: 日本語OK
- PRは全テストパス必須

## 開発コマンド

```bash
# 開発サーバー起動（Hono + React SPA）
npm run dev           # http://localhost:3000

# フロントエンドのみ開発（Vite HMR）
npm run dev:frontend  # http://localhost:3001

# ビルド
npm run build         # React SPAビルド
npm run build:frontend # 同上

# テスト
npm run test          # 全テスト実行
npm run test:watch    # ウォッチモード
npm run test:coverage # カバレッジ付き

# コード品質
npm run lint          # ESLint実行
npm run format        # Prettier実行
npm run typecheck     # TypeScript型チェック

# 本番起動
npm run start         # ビルド後に本番サーバー起動
```

## APIエンドポイント

### 実装済み
```
GET  /api/health       # ヘルスチェック
GET  /api/blog         # ブログ記事一覧
GET  /api/blog/:id     # ブログ記事詳細
GET  /api/resume       # レジュメデータ
```

### SPA配信
```
GET  /                 # Landing page
GET  /blog             # Blog page
GET  /resume           # Resume page
GET  /*                # その他全て → index.html (SPA fallback)
```

## Tokyo Night Theme実装

### テーマカラー定義
```typescript
// src/styles/theme.ts で定義
const tokyoNightTheme = {
  dark: {
    colors: {
      background: {
        primary: '#1a1b26',   // メイン背景
        secondary: '#16161e', // サイドバー背景
        tertiary: '#1e202e',  // ハイライト背景
      },
      text: {
        primary: '#c0caf5',   // メインテキスト
        secondary: '#a9b1d6', // サブテキスト
        muted: '#565f89',     // ミュートテキスト
      },
      accent: {
        blue: '#7aa2f7',      // リンク・ボタン
        green: '#9ece6a',     // 成功
        red: '#f7768e',       // エラー
      }
    }
  },
  light: { /* ライトテーマ定義 */ }
}
```

### テーマ切り替え
- React Context APIで管理
- localStorage永続化
- システム設定連動対応

## 環境変数
```env
# .env.local (作成予定)
PORT=3000                    # サーバーポート
HOST=localhost               # ホスト名
NODE_ENV=development         # 環境
DATABASE_URL=mysql://...     # 将来のDB接続
```

## テスト戦略

### 現在のテスト
- **単体テスト**: Reactコンポーネント (11 tests)
- **API統合テスト**: Honoエンドポイント (9 tests)
- **SPA統合テスト**: 全体動作確認 (10 tests)

### テスト実行
```bash
# 特定のテストファイル
npm run test tests/unit/components/theme.test.tsx

# 統合テストのみ
npm run test tests/unit/spa-integration.test.ts

# 全テスト
npm run test
```

## 注意事項
- セキュリティ最優先（XSS対策、CORS設定）
- パフォーマンス重視（Vite最適化、コード分割）
- アクセシビリティ配慮（セマンティックHTML、ARIA）
- レスポンシブデザイン必須

## 今後の実装予定
### Phase 1 (次回)
- [ ] 実際のデータベース接続（MySQL/PostgreSQL）
- [ ] ブログ記事のMarkdown対応
- [ ] 検索機能実装

### Phase 2
- [ ] 認証システム（管理画面用）
- [ ] CMS機能（ブログ投稿）
- [ ] 画像最適化・CDN対応

### Phase 3
- [ ] 多言語対応（日英）
- [ ] アナリティクス統合
- [ ] PWA対応
- [ ] SSR/SSG検討（SEO強化）

## デプロイ構成
- **ホスティング**: Vercel (手動デプロイ)
- **ドメイン**: hashiiiii.com
- **CI/CD**: GitHub Actions (テスト自動化、デプロイ手動化)
- **デプロイ方式**: 
  - 自動デプロイ無効化（意図しないデプロイを防止）
  - GitHub Actions経由での手動デプロイ
  - Vercel CLI経由での手動デプロイ

### デプロイ手順
詳細は [docs/vercel-deployment-setup.md](./docs/vercel-deployment-setup.md) を参照

## トラブルシューティング

### よくある問題
1. **ビルドエラー**: `npm run build:frontend`を先に実行
2. **ポート競合**: PORT環境変数で変更可能
3. **テスト失敗**: `npm run build:frontend`後に再実行

### 開発のヒント
- `npm run dev`で統合環境を起動
- フロントエンドのみ開発時は`npm run dev:frontend`が高速
- テーマ変更はCSS変数で簡単にカスタマイズ可能

---

**Last Updated**: 2024-12-22
**Version**: 1.0.0 (MVP)