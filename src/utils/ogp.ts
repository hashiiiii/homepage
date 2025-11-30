/**
 * OGP (Open Graph Protocol) 情報を取得するユーティリティ
 */

export interface OGPData {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
}

/**
 * HTMLからOGPメタタグを抽出
 */
function parseOGPFromHTML(html: string, url: string): OGPData {
  const ogp: OGPData = { url };

  // OGPメタタグを正規表現で抽出
  const metaTagRegex = /<meta\s+([^>]*?)>/gi;
  const matches = html.matchAll(metaTagRegex);

  for (const match of matches) {
    const metaTag = match[1];

    // property属性を取得
    const propertyMatch = metaTag.match(/property=["']([^"']+)["']/i);
    const contentMatch = metaTag.match(/content=["']([^"']+)["']/i);

    if (propertyMatch && contentMatch) {
      const property = propertyMatch[1];
      const content = contentMatch[1];

      switch (property) {
        case "og:title":
          ogp.title = content;
          break;
        case "og:description":
          ogp.description = content;
          break;
        case "og:image":
          ogp.image = content;
          break;
        case "og:site_name":
          ogp.siteName = content;
          break;
      }
    }

    // name属性も確認（一部サイトはname="description"を使用）
    const nameMatch = metaTag.match(/name=["']([^"']+)["']/i);
    if (nameMatch && contentMatch) {
      const name = nameMatch[1];
      const content = contentMatch[1];

      if (name === "description" && !ogp.description) {
        ogp.description = content;
      }
    }
  }

  // faviconを抽出
  const faviconMatch = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i);
  if (faviconMatch) {
    let faviconUrl = faviconMatch[1];
    // 相対URLの場合は絶対URLに変換
    if (faviconUrl.startsWith("/")) {
      const urlObj = new URL(url);
      faviconUrl = `${urlObj.protocol}//${urlObj.host}${faviconUrl}`;
    } else if (!faviconUrl.startsWith("http")) {
      const urlObj = new URL(url);
      faviconUrl = `${urlObj.protocol}//${urlObj.host}/${faviconUrl}`;
    }
    ogp.favicon = faviconUrl;
  }

  // titleタグも取得（OGPにない場合のフォールバック）
  if (!ogp.title) {
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      ogp.title = titleMatch[1];
    }
  }

  return ogp;
}

/**
 * URLからOGP情報を取得
 */
export async function fetchOGP(url: string): Promise<OGPData> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BlogBot/1.0)",
      },
    });

    if (!response.ok) {
      console.warn(`[OGP] Failed to fetch ${url}: ${response.status}`);
      return { url };
    }

    const html = await response.text();
    const ogp = parseOGPFromHTML(html, url);

    return ogp;
  } catch (error) {
    console.error(`[OGP] Error fetching ${url}:`, error);
    return { url };
  }
}

/**
 * 複数のURLからOGP情報を並列取得
 */
export async function fetchMultipleOGP(urls: string[]): Promise<Map<string, OGPData>> {
  const results = await Promise.all(
    urls.map(async (url) => {
      const ogp = await fetchOGP(url);
      return [url, ogp] as [string, OGPData];
    }),
  );

  return new Map(results);
}
