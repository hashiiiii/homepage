import type React from "react";
import { createContext, useContext, useLayoutEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ThemeMode = "dark" | "light";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const isThemeMode = (value: unknown): value is ThemeMode => {
  return value === "dark" || value === "light";
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial theme based on system preference
  const getDefaultTheme = (): ThemeMode => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useLocalStorage<ThemeMode>("theme", getDefaultTheme(), isThemeMode);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("no-transition");

    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }

    const raf = requestAnimationFrame(() => {
      root.classList.remove("no-transition");
    });

    return () => cancelAnimationFrame(raf);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
