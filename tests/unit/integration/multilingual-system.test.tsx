import { describe, it, expect } from 'vitest';
import {
  getPageMultilingualConfig,
  isMultilingualEnabled,
  shouldShowLanguageToggle,
  getAvailableLanguages,
  getDefaultLanguage,
} from '../../../src/config/multilingual';

describe('Multilingual System Integration', () => {
  it('should correctly determine multilingual configuration for different paths', () => {
    // Resume page - full multilingual support
    expect(isMultilingualEnabled('/resume')).toBe(true);
    expect(shouldShowLanguageToggle('/resume')).toBe(true);

    // Blog page - disabled but show toggle
    expect(isMultilingualEnabled('/blog')).toBe(false);
    expect(shouldShowLanguageToggle('/blog')).toBe(true);

    // Landing page - no toggle
    expect(isMultilingualEnabled('/')).toBe(false);
    expect(shouldShowLanguageToggle('/')).toBe(false);

    // Blog detail page - inherits blog config
    expect(isMultilingualEnabled('/blog/test-post')).toBe(false);
    expect(shouldShowLanguageToggle('/blog/test-post')).toBe(true);
  });

  it('should return correct default languages', () => {
    expect(getDefaultLanguage('/blog')).toBe('ja');
    expect(getDefaultLanguage('/resume')).toBe('en');
    expect(getDefaultLanguage('/')).toBe('en');
  });

  it('should return correct available languages', () => {
    const resumeLanguages = getAvailableLanguages('/resume');
    expect(resumeLanguages).toEqual(['en', 'ja']);

    // Test cycling logic
    const languages = ['en', 'ja'];
    const currentIndex = languages.indexOf('en');
    const nextIndex = (currentIndex + 1) % languages.length;
    expect(languages[nextIndex]).toBe('ja');
  });

  it('should handle configuration for unknown pages', () => {
    const config = getPageMultilingualConfig('/unknown-page');
    expect(config.enabled).toBe(false);
    expect(config.showToggle).toBe(false);
  });

  it('should properly configure blog detail pages', () => {
    const config = getPageMultilingualConfig('/blog/my-first-post');
    expect(config.enabled).toBe(false);
    expect(config.defaultLanguage).toBe('ja');
    expect(config.showToggle).toBe(true);
  });
});
