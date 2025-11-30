import type { Language } from "../contexts/LanguageContext";

export interface PageMultilingualConfig {
  /** Whether the page supports multilingual functionality */
  enabled: boolean;
  /** Default language when disabled */
  defaultLanguage?: Language;
  /** Available languages for this page */
  availableLanguages?: Language[];
  /** Whether to show the language toggle button */
  showToggle?: boolean;
}

/**
 * Multilingual configuration for each page
 * Add new pages here to control their language behavior
 */
export const PAGE_MULTILINGUAL_CONFIG: Record<string, PageMultilingualConfig> = {
  // Landing page - no multilingual needed
  "/": {
    enabled: false,
    showToggle: false,
  },

  // Blog pages - Japanese only for now
  "/blog": {
    enabled: false,
    defaultLanguage: "ja",
    showToggle: true, // Show but disabled
  },

  // Resume page - full multilingual support
  "/resume": {
    enabled: true,
    availableLanguages: ["en", "ja"],
    showToggle: true,
  },

  // Product page - full multilingual support
  "/product": {
    enabled: true,
    availableLanguages: ["en", "ja"],
    showToggle: true,
  },

  // Privacy Policy page - full multilingual support
  "/privacy": {
    enabled: true,
    availableLanguages: ["en", "ja"],
    showToggle: true,
  },
};

/**
 * Get multilingual configuration for a given path
 */
export function getPageMultilingualConfig(pathname: string): PageMultilingualConfig {
  // Check for exact match first
  if (PAGE_MULTILINGUAL_CONFIG[pathname]) {
    return PAGE_MULTILINGUAL_CONFIG[pathname];
  }

  // Check for blog post detail pages (/blog/:id)
  if (pathname.startsWith("/blog/")) {
    return PAGE_MULTILINGUAL_CONFIG["/blog"];
  }

  // Default configuration for unknown pages
  return {
    enabled: false,
    showToggle: false,
  };
}

/**
 * Check if a page supports multilingual functionality
 */
export function isMultilingualEnabled(pathname: string): boolean {
  return getPageMultilingualConfig(pathname).enabled;
}

/**
 * Check if language toggle should be shown for a page
 */
export function shouldShowLanguageToggle(pathname: string): boolean {
  return getPageMultilingualConfig(pathname).showToggle ?? false;
}

/**
 * Get available languages for a page
 */
export function getAvailableLanguages(pathname: string): Language[] {
  const config = getPageMultilingualConfig(pathname);
  return config.availableLanguages ?? ["en", "ja"];
}

/**
 * Get default language for a page when multilingual is disabled
 */
export function getDefaultLanguage(pathname: string): Language {
  const config = getPageMultilingualConfig(pathname);
  return config.defaultLanguage ?? "en";
}
