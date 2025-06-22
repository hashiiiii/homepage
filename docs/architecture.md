# アーキテクチャ

このドキュメントでは、hashiiiii.comホームページプロジェクトの全体的な構造と設計について説明します。

## 概要

このプロジェクトは**Hono + React SPA統合アーキテクチャ**を採用しており、高いパフォーマンスと優れたUXを両立させています。

```
┌─────────────────────────────────────────────┐
│            ブラウザ（クライアント）            │
│             React SPA                      │
│         (Client Side Routing)              │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│            Hono Server (統合サーバー)         │
│                                            │
│  ┌──────────────┐    ┌──────────────────┐  │
│  │ Static Files │    │   API Routes     │  │
│  │ (React SPA)  │    │  /api/health     │  │
│  │              │    │  /api/blog       │  │
│  │              │    │  /api/resume     │  │
│  └──────────────┘    └──────────────────┘  │
└─────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────┐
│           Mock Data / Future Database        │
│         (現在はメモリ内、将来的にMySQL)        │
└─────────────────────────────────────────────┘
```

## 主要コンポーネント

### 1. フロントエンド: React SPA

**ディレクトリ**: `src/pages/`, `src/components/`, `src/contexts/`

- **React Router**: クライアントサイドルーティング
- **Tokyo Night Theme**: ダーク/ライトテーマ切り替え
- **Tailwind CSS**: ユーティリティファーストなスタイリング
- **TypeScript**: 型安全性

### 2. バックエンド: Hono統合サーバー

**ファイル**: `src/spa-app.ts`, `src/spa-server.ts`

- **統合配信**: 同一サーバーでSPA + API
- **静的ファイル配信**: Viteビルドされたアセット
- **SPA Fallback**: 全ページで同じHTMLを配信
- **API エンドポイント**: RESTful API

### 3. API レイヤー

**ディレクトリ**: `src/api/`

```
/api/health   - ヘルスチェック
/api/blog     - ブログ記事一覧
/api/blog/:id - 特定記事詳細
/api/resume   - レジュメデータ
```

## データフロー

### 1. 初回ページロード
```
1. ブラウザ → Hono Server (任意のURL)
2. Hono → React SPA HTML配信
3. ブラウザ → React アプリ起動
4. React Router → 適切なページコンポーネント表示
```

### 2. ページ遷移（SPA内）
```
1. ユーザー → リンククリック
2. React Router → クライアントサイドルーティング
3. 新しいページコンポーネント → レンダリング
※ サーバーリクエストなし（高速）
```

### 3. データ取得
```
1. Reactコンポーネント → fetch('/api/...')
2. Hono API → データ処理
3. JSON レスポンス → React State更新
4. UI → 再レンダリング
```

## ディレクトリ構造

```
src/
├── api/                # API ルートハンドラー
│   ├── blog.ts
│   └── resume.ts
├── components/         # Reactコンポーネント
│   ├── common/
│   ├── blog/
│   └── resume/
├── contexts/          # React Context (テーマ等)
│   └── ThemeContext.tsx
├── pages/            # ページコンポーネント
│   ├── Landing.tsx
│   ├── Blog.tsx
│   └── Resume.tsx
├── styles/           # スタイル定義
│   └── theme.ts
├── models/           # データ型定義
├── utils/            # ユーティリティ関数
├── spa-app.ts        # Honoアプリ定義
└── spa-server.ts     # サーバー起動
```

## 技術選択の理由

### Hono + React SPA統合
- **メリット**: 
  - 単一サーバーでシンプル
  - SPAの高速UX維持
  - APIとフロントエンドの一元管理
- **デメリット**: 
  - SSRなし（SEO制限）
  - 初回ロード時間

### Tokyo Night Theme
- **実装**: CSS Variables + React Context
- **切り替え**: ダーク/ライトモード
- **持続化**: localStorage

## パフォーマンス戦略

1. **Vite**: 高速ビルドとHMR
2. **コード分割**: React Router の lazy loading
3. **静的アセット最適化**: Viteによる自動最適化
4. **SPA**: ページ遷移時のリクエスト削減

## テスト戦略

- **単体テスト**: React コンポーネント
- **統合テスト**: Hono + SPA 結合
- **API テスト**: エンドポイント動作確認
- **E2E**: 将来的に追加予定

## 開発ワークフロー

```bash
# 開発
npm run dev        # Hono + React SPA統合サーバー

# ビルド
npm run build      # React SPA ビルド

# テスト
npm run test       # 全テスト実行
npm run lint       # コード品質チェック
npm run typecheck  # TypeScript型チェック
```

## 将来の拡張

1. **データベース統合**: MySQL/PostgreSQL
2. **認証システム**: JWT + セッション管理
3. **SSR/SSG**: Next.js移行検討
4. **マイクロサービス**: API分離
5. **CDN**: 静的アセット配信最適化

このアーキテクチャは、現在のMVP要件を満たしつつ、将来の拡張性も考慮した設計となっています。