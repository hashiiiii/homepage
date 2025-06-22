# Tokyo Night テーマシステム

## 概要

このプロジェクトでは、人気のVSCodeテーマ「Tokyo Night」をベースとした包括的なデザインシステムを実装しています。ダークモード（デフォルト）とライトモードの両方をサポートし、美しく一貫したユーザーインターフェースを提供します。

## 特徴

### 🌙 Tokyo Night カラーパレット
- **正確な色の再現**: 公式VSCodeテーマから抽出した正確な色値を使用
- **ダークモード優先**: デフォルトでダークモード、直感的なライトモード切り替え
- **アクセシビリティ配慮**: 十分なコントラスト比を持つ色の組み合わせ

### 🎨 デザインシステム
- **CSS変数ベース**: 動的なテーマ切り替えをサポート
- **Tailwind CSS統合**: 簡単で一貫したスタイリング
- **コンポーネント指向**: 再利用可能なスタイルコンポーネント

## カラーパレット

### ダークモード（デフォルト）
```css
--tn-bg-primary: #1a1b26      /* メイン背景 */
--tn-bg-secondary: #16161e     /* サイドバー背景 */
--tn-bg-tertiary: #1e202e      /* カード・ライン背景 */
--tn-bg-hover: #14141b         /* ホバー状態 */

--tn-fg-primary: #a9b1d6       /* メインテキスト */
--tn-fg-secondary: #787c99     /* セカンダリテキスト */
--tn-fg-muted: #515670         /* ミュートテキスト */

--tn-blue: #7aa2f7            /* 関数・リンク */
--tn-cyan: #7dcfff            /* プロパティ・強調 */
--tn-green: #9ece6a           /* 文字列・成功 */
--tn-yellow: #e0af68          /* パラメータ・警告 */
--tn-magenta: #bb9af7         /* キーワード・アクセント */
--tn-red: #f7768e             /* エラー・危険 */
--tn-orange: #ff9e64          /* 数値・情報 */
```

### ライトモード
```css
--tn-bg-primary: #e6e7ed       /* メイン背景 */
--tn-bg-secondary: #d6d8df      /* サイドバー背景 */
--tn-bg-tertiary: #dcdee3       /* カード・ライン背景 */
--tn-bg-hover: #dadce3          /* ホバー状態 */

--tn-fg-primary: #343b59        /* メインテキスト */
--tn-fg-secondary: #363c4d      /* セカンダリテキスト */
--tn-fg-muted: #707280          /* ミュートテキスト */

--tn-blue: #2959aa             /* 関数・リンク */
--tn-cyan: #0f4b6e             /* プロパティ・強調 */
--tn-green: #385f0d            /* 文字列・成功 */
--tn-yellow: #8f5e15           /* パラメータ・警告 */
--tn-magenta: #65359d          /* キーワード・アクセント */
--tn-red: #8c4351              /* エラー・危険 */
--tn-orange: #965027           /* 数値・情報 */
```

## 使用方法

### 基本的な使い方

#### 1. アプリケーション全体にテーマを適用

```tsx
import { ThemeProvider } from '@/contexts/ThemeContext'
import '@/styles/globals.css'

function App() {
  return (
    <ThemeProvider>
      {/* あなたのアプリケーション */}
    </ThemeProvider>
  )
}
```

#### 2. テーマ切り替えボタンの追加

```tsx
import { ThemeToggle } from '@/components/common/ThemeToggle'

function Header() {
  return (
    <header>
      <nav>
        {/* ナビゲーション要素 */}
        <ThemeToggle />
      </nav>
    </header>
  )
}
```

#### 3. Tokyo Night色の使用

```tsx
// Tailwind CSSクラスとして
<div className="bg-tn-bg-primary text-tn-fg-primary">
  <h1 className="text-tn-blue">タイトル</h1>
  <p className="text-tn-fg-secondary">説明文</p>
</div>

// 直接CSS変数として
<div style={{ 
  backgroundColor: 'var(--tn-bg-secondary)',
  color: 'var(--tn-cyan)'
}}>
  カスタムスタイル
</div>
```

### コンポーネントクラス

事前定義されたコンポーネントクラスを使用できます：

```tsx
// ボタン
<button className="btn-primary">プライマリボタン</button>
<button className="btn-secondary">セカンダリボタン</button>

// カード
<div className="card">
  <h3>カードタイトル</h3>
  <p>カード内容</p>
</div>

// リンク
<a href="#" className="link">リンクテキスト</a>

// タグ・バッジ
<span className="tag">タグ</span>
```

## テーマコンテキストAPI

### useTheme フック

```tsx
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div>
      <p>現在のテーマ: {theme}</p>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? 'ライト' : 'ダーク'}モードに切り替え
      </button>
    </div>
  )
}
```

### プロパティ

- `theme: 'dark' | 'light'` - 現在のテーマモード
- `toggleTheme: () => void` - テーマを切り替える関数

## テスト

### テスト戦略

このプロジェクトではTDD（テスト駆動開発）を採用しています：

1. **単体テスト**: 各コンポーネントの動作を検証
2. **統合テスト**: テーマシステム全体の連携を確認
3. **ビジュアルテスト**: 色の適用と切り替えを確認

### テスト実行

```bash
# 全テスト実行
npm run test

# テーマ関連テストのみ
npm run test tests/unit/components/theme.test.tsx

# ウォッチモード
npm run test:watch

# カバレッジ付き
npm run test:coverage
```

### テストカバレッジ

- ThemeProvider: ✅ 100%
- ThemeToggle: ✅ 100%
- 色の適用: ✅ 100%
- LocalStorage統合: ✅ 100%

## 開発ガイド

### 新しい色の追加

1. `src/styles/theme.ts` に色を定義
2. `src/styles/globals.css` にCSS変数を追加
3. `tailwind.config.js` にTailwindクラスを追加
4. テストを更新

### カスタムコンポーネント作成

```tsx
// TypeScriptでの型安全な色使用例
import { tokyoNightTheme, ThemeMode } from '@/styles/theme'

interface MyComponentProps {
  variant: 'primary' | 'secondary'
}

const MyComponent: React.FC<MyComponentProps> = ({ variant }) => {
  const colorClass = variant === 'primary' ? 'text-tn-blue' : 'text-tn-cyan'
  
  return (
    <div className={`${colorClass} bg-tn-bg-secondary p-4 rounded`}>
      <p>カスタムコンポーネント</p>
    </div>
  )
}
```

## ベストプラクティス

### 推奨事項

1. **一貫性**: 必ずTokyo Nightカラーパレットを使用
2. **アクセシビリティ**: 十分なコントラスト比を保つ
3. **パフォーマンス**: CSS変数を活用して動的変更を最適化
4. **テスト**: 新しいテーマ関連機能には必ずテストを追加

### 避けるべきこと

1. ハードコードされた色の値
2. インラインスタイルでの直接色指定（CSS変数は除く）
3. テーマに依存しない固定色の使用

## トラブルシューティング

### よくある問題

#### Q: テーマが切り替わらない
A: `ThemeProvider`でアプリケーション全体がラップされているか確認してください。

#### Q: 色が正しく表示されない
A: `globals.css`が正しくインポートされているか確認してください。

#### Q: Tailwindクラスが効かない
A: ビルドプロセスでTailwindが適切に処理されているか確認してください。

### デバッグ

```tsx
// 現在のテーマ状態を確認
import { useTheme } from '@/contexts/ThemeContext'

function DebugComponent() {
  const { theme } = useTheme()
  
  return (
    <div className="fixed top-0 right-0 p-2 bg-tn-bg-secondary text-tn-fg-primary">
      Current theme: {theme}
      <br />
      HTML class: {document.documentElement.className}
    </div>
  )
}
```

## 参考リンク

- [Tokyo Night VSCode Theme](https://github.com/tokyo-night/tokyo-night-vscode-theme)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

このドキュメントは定期的に更新されます。質問や改善提案がございましたら、issueまたはPRをお送りください。