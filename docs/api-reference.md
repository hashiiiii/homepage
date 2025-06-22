# API リファレンス

このドキュメントでは、hashiiiii.comホームページのAPIエンドポイントについて説明します。

## 基本情報

- **ベースURL**: `https://hashiiiii.com` (本番環境)
- **ベースURL**: `http://localhost:3000` (開発環境)
- **レスポンス形式**: JSON または HTML

## エンドポイント一覧

### ページエンドポイント

#### GET /
**説明**: ランディングページを表示

**レスポンス**: HTML
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>hashiiiii.com</title>
    ...
  </head>
  <body>
    <!-- ランディングページのコンテンツ -->
  </body>
</html>
```

#### GET /blog
**説明**: ブログ記事一覧ページを表示

**レスポンス**: HTML
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>Blog - hashiiiii.com</title>
    ...
  </head>
  <body>
    <!-- ブログ一覧のコンテンツ -->
  </body>
</html>
```

#### GET /blog/:id
**説明**: 特定のブログ記事を表示

**パラメータ**:
- `id` (string): ブログ記事のID

**レスポンス**: HTML
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>Blog Post - hashiiiii.com</title>
    ...
  </head>
  <body>
    <!-- ブログ記事の詳細 -->
  </body>
</html>
```

#### GET /resume
**説明**: レジュメページを表示

**レスポンス**: HTML
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>Resume - hashiiiii.com</title>
    ...
  </head>
  <body>
    <!-- レジュメのコンテンツ -->
  </body>
</html>
```

### APIエンドポイント（将来実装予定）

#### GET /api/blogs
**説明**: ブログ記事の一覧を取得

**クエリパラメータ**:
- `page` (number, optional): ページ番号（デフォルト: 1）
- `limit` (number, optional): 1ページあたりの記事数（デフォルト: 10）
- `tag` (string, optional): タグでフィルタリング
- `category` (string, optional): カテゴリでフィルタリング

**レスポンス例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "初めてのブログ投稿",
      "excerpt": "記事の要約...",
      "tags": ["技術", "JavaScript"],
      "category": "プログラミング",
      "publishedAt": "2024-01-01T00:00:00Z",
      "viewCount": 123
    },
    {
      "id": "2",
      "title": "Honoフレームワークの紹介",
      "excerpt": "Honoは高速で...",
      "tags": ["Hono", "フレームワーク"],
      "category": "技術記事",
      "publishedAt": "2024-01-02T00:00:00Z",
      "viewCount": 456
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### GET /api/blogs/:id
**説明**: 特定のブログ記事の詳細を取得

**パラメータ**:
- `id` (string): ブログ記事のID

**レスポンス例**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "初めてのブログ投稿",
    "content": "# 見出し\n\n記事の本文...",
    "tags": ["技術", "JavaScript"],
    "category": "プログラミング",
    "publishedAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "viewCount": 123
  }
}
```

#### GET /api/resume
**説明**: レジュメ情報を取得

**レスポンス例**:
```json
{
  "success": true,
  "data": {
    "personalInfo": {
      "name": "hashiiiii",
      "title": "Software Engineer",
      "summary": "プロフィールの要約...",
      "socialLinks": [
        {
          "platform": "GitHub",
          "url": "https://github.com/hashiiiii"
        }
      ]
    },
    "workExperience": [
      {
        "id": "1",
        "company": "会社名",
        "position": "ポジション",
        "startDate": "2020-04-01",
        "current": true,
        "description": "職務内容..."
      }
    ],
    "skills": [
      {
        "id": "1",
        "category": "Programming",
        "name": "TypeScript",
        "proficiency": "Advanced"
      }
    ]
  }
}
```

### システムエンドポイント

#### GET /health
**説明**: サーバーの稼働状態を確認

**レスポンス例**:
```json
{
  "status": "ok"
}
```

## エラーレスポンス

すべてのAPIエンドポイントは、エラー時に以下の形式でレスポンスを返します：

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "リソースが見つかりません"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "サーバーエラーが発生しました"
  }
}
```

## 認証（将来実装予定）

管理機能のAPIには認証が必要になる予定です：

```
Authorization: Bearer <token>
```

## レート制限（将来実装予定）

APIの過度な使用を防ぐため、以下のレート制限を設ける予定です：

- 認証なし: 60リクエスト/時間
- 認証あり: 600リクエスト/時間

レート制限の情報はレスポンスヘッダーに含まれます：

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640995200
```

## 開発者向けの注意事項

1. **CORS**: 開発環境ではすべてのオリジンからのアクセスを許可していますが、本番環境では制限されます
2. **キャッシュ**: 静的なコンテンツには適切なキャッシュヘッダーが設定されます
3. **バージョニング**: 将来的にAPIバージョニング（`/api/v1/`）を導入する可能性があります