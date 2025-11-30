import type React from "react";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type Language = "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, data?: Record<string, unknown>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const isLanguage = (value: unknown): value is Language => {
  return value === "en" || value === "ja";
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useLocalStorage<Language>("language", "en", isLanguage);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // Translation function (basic implementation)
  const t = (key: string, _data?: Record<string, unknown>): string => {
    // This will be enhanced with actual translation data
    // For now, return the key as fallback
    return key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Hook for easier translation access
export const useTranslation = () => {
  const { t, language } = useLanguage();
  return { t, language };
};
