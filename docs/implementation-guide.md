# Tokyo Night テーマ実装ガイド

## 実装概要

このドキュメントでは、Tokyo Nightテーマシステムの技術的実装詳細と、TDD（テスト駆動開発）アプローチでの開発プロセスを説明します。

## アーキテクチャ

### システム構成

```
src/
├── contexts/
│   └── ThemeContext.tsx          # テーマ状態管理
├── components/
│   └── common/
│       └── ThemeToggle.tsx       # テーマ切り替えUI
├── styles/
│   ├── theme.ts                  # カラーパレット定義
│   └── globals.css               # CSS変数とスタイル
└── ...

tests/
└── unit/
    └── components/
        └── theme.test.tsx        # テーマシステムテスト
```

### データフロー

```
ユーザー操作 → ThemeToggle → ThemeContext → CSS変数更新 → UI反映
     ↓                                              ↑
LocalStorage ←→ テーマ状態 ←→ システム設定 ←→ DOM クラス
```

## TDD実装プロセス

### フェーズ1: Red（失敗するテストを書く）

```typescript
// tests/unit/components/theme.test.tsx
describe('Tokyo Night Theme System', () => {
  it('should provide dark theme as default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
  })
})
```

**結果**: ❌ テスト失敗（実装がないため）

### フェーズ2: Green（テストを通す最小実装）

```typescript
// src/contexts/ThemeContext.tsx
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**結果**: ✅ テスト成功

### フェーズ3: Refactor（コードの改善）

```typescript
// 改善点1: LocalStorage統合
useEffect(() => {
  const savedTheme = localStorage.getItem('theme') as ThemeMode | null
  if (savedTheme) setTheme(savedTheme)
}, [])

// 改善点2: システムプリファレンス対応
useEffect(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (!savedTheme && prefersDark) setTheme('dark')
}, [])

// 改善点3: DOM操作でテーマ適用
useEffect(() => {
  const root = document.documentElement
  if (theme === 'light') {
    root.classList.add('light')
  } else {
    root.classList.remove('light')
  }
  localStorage.setItem('theme', theme)
}, [theme])
```

## コンポーネント実装詳細

### ThemeContext

**責任**:
- テーマ状態の管理
- LocalStorageとの同期
- システムプリファレンスの検出
- DOM操作によるテーマ適用

**実装パターン**:
```typescript
interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

**エラーハンドリング**:
- コンテキストプロバイダー外での使用をチェック
- LocalStorageアクセスエラーの処理

### ThemeToggle

**責任**:
- ユーザーインターフェース提供
- アクセシビリティ対応
- ビジュアルフィードバック

**実装パターン**:
```typescript
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 rounded-lg bg-tn-bg-secondary hover:bg-tn-bg-hover transition-all duration-200"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
```

**アクセシビリティ機能**:
- `aria-label`による状態説明
- キーボードナビゲーション対応
- 明確なビジュアルフィードバック

## カラーシステム実装

### CSS変数アプローチ

**メリット**:
- 動的テーマ切り替え
- JavaScript不要での色変更
- ブラウザネイティブサポート

```css
:root {
  /* Dark mode (default) */
  --tn-bg-primary: #1a1b26;
  --tn-fg-primary: #a9b1d6;
}

.light {
  /* Light mode override */
  --tn-bg-primary: #e6e7ed;
  --tn-fg-primary: #343b59;
}
```

### Tailwind統合

**カスタムカラー定義**:
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'tn-bg-primary': 'var(--tn-bg-primary)',
        'tn-fg-primary': 'var(--tn-fg-primary)',
        // ...
      }
    }
  }
}
```

**使用例**:
```tsx
<div className="bg-tn-bg-primary text-tn-fg-primary">
  <h1 className="text-tn-blue">タイトル</h1>
</div>
```

## テスト戦略

### 単体テスト

**対象**:
- ThemeProviderの状態管理
- ThemeToggleのUI動作
- CSS変数の適用

**モック対象**:
```typescript
// LocalStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}

// Media Query
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})
```

### 統合テスト

**シナリオ**:
1. 初期テーマ設定
2. ユーザー操作による切り替え
3. ページリロード後の状態復元
4. システムプリファレンス連携

**テストカバレッジ目標**:
- 行カバレッジ: 100%
- 分岐カバレッジ: 100%
- 関数カバレッジ: 100%

## パフォーマンス考慮

### 最適化ポイント

1. **CSS変数の使用**: JavaScriptによる動的スタイル変更を最小化
2. **Lazy Loading**: テーマ関連リソースの遅延読み込み
3. **メモ化**: 不要な再レンダリングの防止

```typescript
// React.memoでの最適化例
const ThemeToggle = React.memo(() => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {/* UI */}
    </button>
  )
})
```

### メモリ管理

```typescript
// クリーンアップ処理
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light')
    }
  }
  
  mediaQuery.addEventListener('change', handler)
  
  return () => {
    mediaQuery.removeEventListener('change', handler)
  }
}, [])
```

## デプロイメント考慮

### ビルド最適化

```typescript
// vite.config.ts
export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          theme: ['./src/contexts/ThemeContext.tsx']
        }
      }
    }
  }
})
```

### SEO対応

```html
<!-- メタタグでテーマ情報提供 -->
<meta name="theme-color" content="#1a1b26" />
<meta name="color-scheme" content="dark light" />
```

## 拡張性

### 新テーマ追加

```typescript
// テーマタイプ拡張
type ThemeMode = 'dark' | 'light' | 'system' | 'high-contrast'

// 設定オブジェクト
const themeConfig = {
  dark: { /* 設定 */ },
  light: { /* 設定 */ },
  'high-contrast': { /* 設定 */ }
}
```

### カスタマイゼーション

```typescript
// ユーザーカスタマイゼーション対応
interface ThemeCustomization {
  accentColor?: string
  fontSize?: 'small' | 'medium' | 'large'
  borderRadius?: number
}

const useCustomTheme = (customization: ThemeCustomization) => {
  // カスタムテーマロジック
}
```

## トラブルシューティング

### よくある実装課題

1. **SSR環境での初期化**
   ```typescript
   const [mounted, setMounted] = useState(false)
   
   useEffect(() => {
     setMounted(true)
   }, [])
   
   if (!mounted) return null
   ```

2. **CSS変数の遅延適用**
   ```css
   * {
     transition: background-color 0.2s ease, color 0.2s ease;
   }
   ```

3. **テストでのDOMアクセス**
   ```typescript
   // beforeEach で初期化
   beforeEach(() => {
     document.documentElement.className = ''
   })
   ```

## まとめ

Tokyo Nightテーマシステムは以下の原則に基づいて実装されています：

1. **テスト駆動**: 全機能にテストを先行実装
2. **パフォーマンス**: CSS変数による効率的な切り替え
3. **アクセシビリティ**: システムプリファレンス対応
4. **拡張性**: 新テーマやカスタマイゼーション対応
5. **型安全性**: TypeScriptによる堅牢な実装

この実装により、美しく、高性能で、保守性の高いテーマシステムを実現しています。