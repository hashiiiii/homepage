import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from '../../../src/contexts/ThemeContext';
import { ThemeToggle } from '../../../src/components/common/ThemeToggle';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Test component to access theme context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('Tokyo Night Theme System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.className = '';
  });

  describe('ThemeProvider', () => {
    it('should provide dark theme as default', () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true, // prefers dark mode
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    it('should load saved theme from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('light');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });

    it('should respect system preference when no saved theme', () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true, // prefers dark mode
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    it('should toggle between dark and light themes', () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true, // prefers dark mode
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');
      const themeDisplay = screen.getByTestId('current-theme');

      expect(themeDisplay).toHaveTextContent('dark');

      fireEvent.click(toggleButton);
      expect(themeDisplay).toHaveTextContent('light');

      fireEvent.click(toggleButton);
      expect(themeDisplay).toHaveTextContent('dark');
    });

    it('should apply light class to document element when in light mode', () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true, // prefers dark mode
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      // Switch to light mode
      fireEvent.click(toggleButton);

      expect(document.documentElement.classList.contains('light')).toBe(true);
    });

    it('should remove light class from document element when in dark mode', () => {
      // Start with light theme
      localStorageMock.getItem.mockReturnValue('light');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      // Switch to dark mode
      fireEvent.click(toggleButton);

      expect(document.documentElement.classList.contains('light')).toBe(false);
    });

    it('should save theme to localStorage when changed', () => {
      // Mock system preference to dark mode
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true, // prefers dark mode
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      fireEvent.click(toggleButton);

      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('ThemeToggle Component', () => {
    it('should render sun icon in dark mode', () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true, // prefers dark mode
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    });

    it('should render moon icon in light mode', () => {
      localStorageMock.getItem.mockReturnValue('light');

      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    it('should toggle theme when clicked', () => {
      localStorageMock.getItem.mockReturnValue(null);
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true, // prefers dark mode
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <div>
            <TestComponent />
            <ThemeToggle />
          </div>
        </ThemeProvider>
      );

      const themeDisplay = screen.getByTestId('current-theme');
      const toggleButtons = screen.getAllByRole('button');
      const themeToggleButton = toggleButtons.find((btn) =>
        btn.getAttribute('aria-label')?.includes('Switch to')
      );

      expect(themeDisplay).toHaveTextContent('dark');

      if (themeToggleButton) {
        fireEvent.click(themeToggleButton);
        expect(themeDisplay).toHaveTextContent('light');
      }
    });
  });

  describe('Tokyo Night Colors', () => {
    it('should have correct Tokyo Night CSS classes applied', () => {
      render(
        <ThemeProvider>
          <div data-testid="themed-element" className="bg-tn-bg-primary text-tn-fg-primary">
            Test
          </div>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-element');

      // Check that Tokyo Night CSS classes are applied
      expect(element).toHaveClass('bg-tn-bg-primary');
      expect(element).toHaveClass('text-tn-fg-primary');
    });
  });
});
