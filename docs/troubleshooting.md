# トラブルシューティング

このドキュメントでは、開発中によく遭遇する問題とその解決方法について説明します。

## 環境構築の問題

### Node.jsのバージョンエラー

**症状**:
```bash
error: Node.js version 16.x.x is not supported. Please use version 18.0.0 or higher.
```

**解決方法**:
1. Node.jsのバージョンを確認:
   ```bash
   node --version
   ```

2. バージョンが古い場合は、Node.jsを更新:
   - [Node.js公式サイト](https://nodejs.org/)から最新版をダウンロード
   - またはnvm（Node Version Manager）を使用:
     ```bash
     nvm install 18
     nvm use 18
     ```

### npm installが失敗する

**症状**:
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**解決方法**:
1. node_modulesとpackage-lock.jsonを削除:
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. キャッシュをクリア:
   ```bash
   npm cache clean --force
   ```

3. 再度インストール:
   ```bash
   npm install
   ```

## 開発サーバーの問題

### ポートが既に使用されている

**症状**:
```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**解決方法**:
1. ポート3000を使用しているプロセスを確認:
   ```bash
   # macOS/Linux
   lsof -i :3000
   
   # Windows
   netstat -ano | findstr :3000
   ```

2. プロセスを終了するか、別のポートを使用:
   ```bash
   # .envファイルでポートを変更
   PORT=3001
   ```

### ホットリロードが動作しない

**症状**: ファイルを変更してもブラウザに反映されない

**解決方法**:
1. 開発サーバーを再起動:
   ```bash
   # Ctrl+C で停止してから
   npm run dev
   ```

2. ブラウザのキャッシュをクリア:
   - Chrome: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)

## TypeScriptのエラー

### 型定義が見つからない

**症状**:
```typescript
Cannot find module '@/handlers/landing' or its corresponding type declarations.
```

**解決方法**:
1. tsconfig.jsonのパス設定を確認:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["src/*"],
         "@handlers/*": ["src/handlers/*"]
       }
     }
   }
   ```

2. VSCodeを再起動またはTypeScriptサーバーを再起動:
   - Cmd+Shift+P → "TypeScript: Restart TS Server"

### strictモードのエラー

**症状**:
```typescript
Object is possibly 'undefined'.
```

**解決方法**:
1. オプショナルチェイニングを使用:
   ```typescript
   // Before
   const value = obj.property.nested;
   
   // After
   const value = obj?.property?.nested;
   ```

2. 型ガードを使用:
   ```typescript
   if (obj && obj.property) {
     const value = obj.property.nested;
   }
   ```

## テストの問題

### テストがタイムアウトする

**症状**:
```bash
Error: Test timed out in 5000ms.
```

**解決方法**:
1. 非同期処理が正しく完了しているか確認:
   ```typescript
   // async/awaitを正しく使用
   it('should handle async operation', async () => {
     const result = await someAsyncFunction();
     expect(result).toBe(expected);
   });
   ```

2. タイムアウト時間を延長:
   ```typescript
   it('slow test', async () => {
     // テストコード
   }, 10000); // 10秒のタイムアウト
   ```

### モックが動作しない

**症状**: 実際のモジュールが呼ばれてしまう

**解決方法**:
```typescript
// vi.mockをインポートの前に配置
vi.mock('@/services/blog.service');

import { BlogService } from '@/services/blog.service';

describe('Blog Handler', () => {
  it('should use mocked service', () => {
    // モックの設定
    vi.mocked(BlogService).mockImplementation(() => ({
      getAllPosts: vi.fn().mockResolvedValue([])
    }));
  });
});
```

## ビルドエラー

### ESModuleエラー

**症状**:
```bash
SyntaxError: Cannot use import statement outside a module
```

**解決方法**:
1. package.jsonに`"type": "module"`が設定されているか確認
2. すべてのインポートに拡張子を付ける:
   ```typescript
   // .jsファイルの場合
   import { something } from './file.js';
   ```

### メモリ不足エラー

**症状**:
```bash
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**解決方法**:
```bash
# Node.jsのメモリ制限を増やす
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## データベース接続の問題

### 接続できない

**症状**:
```bash
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**解決方法**:
1. MySQLサーバーが起動しているか確認
2. .envファイルの接続情報を確認:
   ```env
   DATABASE_URL=mysql://user:password@localhost:3306/database
   ```

## 一般的なデバッグ方法

### ログを活用する

```typescript
// 開発環境でのみログを出力
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### ブラウザの開発者ツール

1. **Network タブ**: APIリクエストの確認
2. **Console タブ**: JavaScriptエラーの確認
3. **Sources タブ**: ブレークポイントの設定

### VSCodeのデバッガー

`.vscode/launch.json`を作成:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

## それでも解決しない場合

1. エラーメッセージをGoogleで検索
2. [Stack Overflow](https://stackoverflow.com/)で類似の問題を探す
3. プロジェクトのIssueトラッカーを確認
4. チームメンバーに相談

## 有用なリソース

- [Hono Troubleshooting](https://hono.dev/getting-started/basic#troubleshooting)
- [TypeScript Error Messages](https://typescript.tv/errors/)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)