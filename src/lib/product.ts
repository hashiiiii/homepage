import type { Language } from '@/contexts/LanguageContext';
import { productData } from '@/locales/product';
import type { ProductData } from '@/models/product.model';

/**
 * プロダクトデータを取得
 */
export function getProductData(language: Language): ProductData {
  return productData[language];
}

/**
 * プロダクトデータ取得関数
 */
export function fetchProductData(language: Language): ProductData {
  return getProductData(language);
}
