import { describe, expect, it } from "vitest";
import {
  getAvailableLanguages,
  getDefaultLanguage,
  getPageMultilingualConfig,
  isMultilingualEnabled,
  shouldShowLanguageToggle,
} from "../../../src/config/multilingual";

describe("Multilingual Configuration", () => {
  describe("getPageMultilingualConfig", () => {
    it("should return exact match configuration", () => {
      const config = getPageMultilingualConfig("/resume");
      expect(config.enabled).toBe(true);
      expect(config.showToggle).toBe(true);
      expect(config.availableLanguages).toEqual(["en", "ja"]);
    });

    it("should return blog configuration for blog detail pages", () => {
      const config = getPageMultilingualConfig("/blog/test-post");
      expect(config.enabled).toBe(false);
      expect(config.defaultLanguage).toBe("ja");
      expect(config.showToggle).toBe(true);
    });

    it("should return default configuration for unknown pages", () => {
      const config = getPageMultilingualConfig("/unknown");
      expect(config.enabled).toBe(false);
      expect(config.showToggle).toBe(false);
    });
  });

  describe("isMultilingualEnabled", () => {
    it("should return true for enabled pages", () => {
      expect(isMultilingualEnabled("/resume")).toBe(true);
    });

    it("should return false for disabled pages", () => {
      expect(isMultilingualEnabled("/")).toBe(false);
      expect(isMultilingualEnabled("/blog")).toBe(false);
    });
  });

  describe("shouldShowLanguageToggle", () => {
    it("should return true for pages that should show toggle", () => {
      expect(shouldShowLanguageToggle("/resume")).toBe(true);
      expect(shouldShowLanguageToggle("/blog")).toBe(true);
    });

    it("should return false for pages that should not show toggle", () => {
      expect(shouldShowLanguageToggle("/")).toBe(false);
    });
  });

  describe("getAvailableLanguages", () => {
    it("should return configured languages", () => {
      expect(getAvailableLanguages("/resume")).toEqual(["en", "ja"]);
    });

    it("should return default languages for unconfigured pages", () => {
      expect(getAvailableLanguages("/unknown")).toEqual(["en", "ja"]);
    });
  });

  describe("getDefaultLanguage", () => {
    it("should return configured default language", () => {
      expect(getDefaultLanguage("/blog")).toBe("ja");
    });

    it("should return en as default for unconfigured pages", () => {
      expect(getDefaultLanguage("/resume")).toBe("en");
      expect(getDefaultLanguage("/unknown")).toBe("en");
    });
  });
});
