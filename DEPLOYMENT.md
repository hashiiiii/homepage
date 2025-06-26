# デプロイメントガイド

hashiiiii.com ホームページのVercelへのデプロイ手順です。

## 前提条件

- Route53でドメイン `hashiiiii.com` を管理している
- GitHubアカウントとリポジトリが設定済み
- Vercelアカウントを持っている

## 1. Vercel CLI のインストール

```bash
npm install -g vercel
```

## 2. 初回デプロイ設定

### Vercelにログイン

```bash
vercel login
```

### プロジェクトの初期化

```bash
vercel
```

初回実行時の設定：

- Project Name: `hashiiiii-homepage`
- Framework: `Other`
- Build Command: `npm run build`
- Output Directory: `dist/client`
- Development Command: `npm run dev:frontend`

## 3. 環境変数の設定

Vercel Dashboardで以下を設定：

```bash
# 本番環境
NODE_ENV=production

# 必要に応じて追加
# DATABASE_URL=mysql://...
# API_KEY=...
```

## 4. カスタムドメインの設定

### 4.1 Vercel Dashboard での設定

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. プロジェクト `hashiiiii-homepage` を選択
3. `Settings` → `Domains` へ移動
4. `Add Domain` をクリック
5. `hashiiiii.com` を入力して追加
6. `www.hashiiiii.com` も追加（リダイレクト用）

### 4.2 Route53 での DNS 設定

AWS Route53コンソールで `hashiiiii.com` ホストゾーンを開き、以下のレコードを設定：

#### A レコード（apex domain用）

```
Name: @
Type: A
Value: 76.76.19.61  # Vercelの IP (変更可能性あり)
TTL: 300
```

#### CNAME レコード（www用）

```
Name: www
Type: CNAME
Value: cname.vercel-dns.com
TTL: 300
```

> **注意**: Vercelが表示する実際のCNAME値を使用してください

#### DNS設定の確認

```bash
dig hashiiiii.com
dig www.hashiiiii.com
```

## 5. SSL証明書の自動設定

Vercelは自動でSSL証明書を発行します：

- Let's Encrypt証明書
- 自動更新
- HTTPS強制リダイレクト

## 6. デプロイコマンド

### 開発環境での確認

```bash
npm run deploy:local    # ローカルでVercel環境をテスト
```

### プレビューデプロイ

```bash
npm run deploy:preview  # プレビュー環境にデプロイ
```

### 本番デプロイ

```bash
npm run deploy         # 本番環境にデプロイ
```

## 7. GitHub Actions での自動デプロイ

### 7.1 Vercel Secretsの取得

```bash
# ORG IDの取得
vercel teams list

# プロジェクトIDの取得
vercel projects list

# トークンの作成
# https://vercel.com/account/tokens で作成
```

### 7.2 GitHub Secrets の設定

GitHub リポジトリの `Settings` → `Secrets and variables` → `Actions` で設定：

```
VERCEL_TOKEN=xxx        # Vercelトークン
VERCEL_ORG_ID=xxx       # チームまたは個人ID
VERCEL_PROJECT_ID=xxx   # プロジェクトID
```

### 7.3 自動デプロイの動作

- **Pull Request**: プレビュー環境にデプロイ
- **main ブランチへのpush**: 本番環境にデプロイ

## 8. デプロイ後の確認

### 8.1 サイトの動作確認

```bash
curl -I https://hashiiiii.com
curl -I https://www.hashiiiii.com
```

### 8.2 API エンドポイントの確認

```bash
curl https://hashiiiii.com/api/health
curl https://hashiiiii.com/api/blog
curl https://hashiiiii.com/api/resume
```

### 8.3 パフォーマンステスト

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- Vercel Analytics（プロジェクト内で有効化）

## 9. トラブルシューティング

### DNS の問題

```bash
# DNS プロパゲーションの確認
https://www.whatsmydns.net/

# キャッシュクリア
ipconfig /flushdns  # Windows
sudo dscacheutil -flushcache  # macOS
```

### Vercel デプロイエラー

```bash
# ログの確認
vercel logs https://hashiiiii.com

# 再デプロイ
vercel --prod --force
```

### SSL証明書の問題

- Vercel Dashboardで証明書のステータス確認
- DNS設定の再確認
- 24-48時間待機（証明書発行には時間がかかる場合あり）

## 10. パフォーマンス最適化

### CDN効果の確認

```bash
# キャッシュヘッダーの確認
curl -I https://hashiiiii.com/assets/main.js
```

### バンドルサイズの最適化

```bash
npm run build
ls -la dist/client/assets/  # ファイルサイズ確認
```

## 11. 本番環境での監視

### Vercel Analytics

- Vercel Dashboard → Analytics
- Core Web Vitals
- Real User Monitoring

### エラー監視

- Vercel Dashboard → Functions（Serverless Functions のログ）
- ブラウザ DevTools → Console

---

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Route53 Documentation](https://docs.aws.amazon.com/route53/)
- [GitHub Actions with Vercel](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
