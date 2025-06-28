/**
 * API クライアント設定
 * 環境変数によって静的データ利用か API 利用かを切り替え
 */

// 静的データ利用フラグ（環境変数で制御、デフォルトはtrue）
export const USE_STATIC_DATA = import.meta.env.VITE_USE_STATIC_DATA !== 'false';

// 静的データ利用時のインポート
export const apiClient = USE_STATIC_DATA ? import('./api-client-static') : import('./api-client');

/**
 * 統一されたAPI関数エクスポート
 */
export async function fetchBlogPosts() {
  const client = await apiClient;
  return client.fetchBlogPosts();
}

export async function fetchBlogPost(id: string) {
  const client = await apiClient;
  return client.fetchBlogPost(id);
}

export async function fetchBlogMetadata() {
  const client = await apiClient;
  return client.fetchBlogMetadata();
}
