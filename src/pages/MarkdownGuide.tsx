import React from 'react'
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer'

const markdownGuideContent = `# Markdown記法ガイド

このブログでは、Zenn互換のMarkdown記法が利用できます。

## 基本的な記法

### 見出し

\`\`\`markdown
# 見出し1
## 見出し2  
### 見出し3
\`\`\`

### 強調

**太字** や *斜体* で強調できます。

\`\`\`markdown
**太字**
*斜体*
\`\`\`

### リスト

- 箇条書き1
- 箇条書き2
  - ネストした項目
  - ネストした項目2

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3

### リンク

[外部リンク](https://github.com)

### 引用

> これは引用文です。
> 複数行にわたって書くことができます。

## コードブロック

### インラインコード

\`console.log("Hello World")\` のようにインラインでコードを書けます。

### コードブロック

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
}

console.log(user.name)
\`\`\`

\`\`\`javascript
// JavaScript のサンプルコード
function greet(name) {
  return \`Hello, \${name}!\`
}

const message = greet("World")
console.log(message)
\`\`\`

\`\`\`python
# Python のサンプルコード
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

\`\`\`bash
# Shell コマンド
npm install
npm run dev
git commit -m "Add new feature"
\`\`\`

## テーブル

| 言語 | 拡張子 | 特徴 |
|------|--------|------|
| TypeScript | .ts, .tsx | 静的型付け |
| JavaScript | .js, .jsx | 動的型付け |
| Python | .py | シンプルな文法 |

## 画像

![代替テキスト](https://via.placeholder.com/400x200)

## 水平線

---

## 高度な機能

### GitHub Flavored Markdown

- [x] 完了したタスク
- [ ] 未完了のタスク

### 取り消し線

~~取り消されたテキスト~~

## 注意事項

- シンタックスハイライトは多くの言語に対応しています
- Tokyo Nightテーマに最適化されたカラーリング
- レスポンシブデザインに対応

---

*このガイドはZennの記法を参考に作成されています。*
`

export function MarkdownGuide() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <MarkdownRenderer content={markdownGuideContent} />
      </div>
    </div>
  )
}