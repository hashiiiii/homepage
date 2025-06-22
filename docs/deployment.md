# デプロイメント

このドキュメントでは、hashiiiii.comホームページをAWSにデプロイする手順を説明します。

## 前提条件

- AWSアカウントが作成済み
- AWS CLIがインストール・設定済み
- Route53で`hashiiiii.com`ドメインが設定済み

## デプロイアーキテクチャ

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│     Route53     │────▶│  CloudFront  │────▶│ S3 (静的)   │
│ (hashiiiii.com) │     │    (CDN)     │     └─────────────┘
└─────────────────┘     └──────────────┘            │
                               │                     │
                               ▼                     ▼
                        ┌──────────────┐     ┌─────────────┐
                        │ API Gateway  │────▶│   Lambda    │
                        └──────────────┘     └─────────────┘
                                                    │
                                                    ▼
                                            ┌─────────────┐
                                            │ RDS Aurora  │
                                            │ Serverless  │
                                            └─────────────┘
```

## 手動デプロイ手順

### 1. ビルド

```bash
# プロジェクトをビルド
npm run build
```

### 2. Lambda関数の準備

```bash
# Lambda用のzipファイルを作成
zip -r lambda-function.zip dist/ node_modules/ package.json
```

### 3. AWS Lambdaにデプロイ

```bash
# Lambda関数を作成（初回のみ）
aws lambda create-function \
  --function-name hashiiiii-homepage \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler dist/app.handler \
  --zip-file fileb://lambda-function.zip

# Lambda関数を更新（2回目以降）
aws lambda update-function-code \
  --function-name hashiiiii-homepage \
  --zip-file fileb://lambda-function.zip
```

### 4. API Gatewayの設定

```bash
# REST APIを作成
aws apigateway create-rest-api \
  --name hashiiiii-homepage-api \
  --description "API for hashiiiii.com"

# Lambda統合を設定
# (詳細な手順はAWSコンソールで実施)
```

### 5. 静的ファイルのS3アップロード

```bash
# S3バケットを作成（初回のみ）
aws s3 mb s3://hashiiiii-homepage-static

# 静的ファイルをアップロード
aws s3 sync public/ s3://hashiiiii-homepage-static/ \
  --delete \
  --cache-control "public, max-age=31536000"
```

### 6. CloudFrontの設定

```bash
# CloudFrontディストリビューションを作成
# (AWSコンソールで実施することを推奨)
```

## GitHub Actionsによる自動デプロイ

### 1. AWSの認証情報を設定

GitHubリポジトリの Settings → Secrets and variables → Actions で以下を設定：

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (ap-northeast-1)

### 2. デプロイワークフローの作成

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build project
      run: npm run build
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.AWS_REGION }}
    
    - name: Deploy to Lambda
      run: |
        zip -r lambda-function.zip dist/ node_modules/ package.json
        aws lambda update-function-code \
          --function-name hashiiiii-homepage \
          --zip-file fileb://lambda-function.zip
    
    - name: Deploy static files to S3
      run: |
        aws s3 sync public/ s3://hashiiiii-homepage-static/ \
          --delete \
          --cache-control "public, max-age=31536000"
    
    - name: Invalidate CloudFront
      run: |
        aws cloudfront create-invalidation \
          --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
          --paths "/*"
```

## 環境変数の管理

### Lambda環境変数の設定

```bash
aws lambda update-function-configuration \
  --function-name hashiiiii-homepage \
  --environment Variables='{
    DATABASE_URL="mysql://...",
    NODE_ENV="production"
  }'
```

### Secrets Managerの使用（推奨）

```typescript
// src/utils/secrets.ts
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

export async function getSecret(secretName: string) {
  const client = new SecretsManagerClient({ region: "ap-northeast-1" });
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  return JSON.parse(response.SecretString || "{}");
}
```

## モニタリングとログ

### CloudWatch Logsの確認

```bash
# Lambda関数のログを確認
aws logs tail /aws/lambda/hashiiiii-homepage --follow
```

### アラームの設定

```bash
# エラー率のアラーム
aws cloudwatch put-metric-alarm \
  --alarm-name hashiiiii-homepage-error-rate \
  --alarm-description "High error rate" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

## ロールバック手順

### Lambdaのロールバック

```bash
# 前のバージョンに戻す
aws lambda update-function-code \
  --function-name hashiiiii-homepage \
  --s3-bucket hashiiiii-homepage-deployments \
  --s3-key previous-version.zip
```

### S3のロールバック

```bash
# バックアップから復元
aws s3 sync s3://hashiiiii-homepage-backup/ s3://hashiiiii-homepage-static/ \
  --delete
```

## トラブルシューティング

### デプロイが失敗する

1. **権限エラー**: IAMロールの権限を確認
2. **ビルドエラー**: ローカルでビルドが成功するか確認
3. **サイズ制限**: Lambda関数のサイズが250MB以下か確認

### サイトにアクセスできない

1. **DNS設定**: Route53の設定を確認
2. **CloudFront**: ディストリビューションのステータスを確認
3. **API Gateway**: エンドポイントURLを確認

## ベストプラクティス

1. **ステージング環境**: 本番環境にデプロイする前にテスト
2. **ブルーグリーンデプロイ**: ダウンタイムなしでデプロイ
3. **自動テスト**: デプロイ前に必ずテストを実行
4. **監視**: CloudWatchでメトリクスを監視
5. **バックアップ**: 定期的なバックアップの実施

## 費用の見積もり

月間のおおよその費用（東京リージョン）：

- **Lambda**: $0（無料枠内）
- **API Gateway**: $3.50（100万リクエスト）
- **S3**: $0.10（10GB storage）
- **CloudFront**: $0.12（10GB転送）
- **Route53**: $0.50（ホストゾーン）
- **RDS Aurora Serverless**: $0.12/ACU時間

**合計**: 約$5-10/月（トラフィックにより変動）