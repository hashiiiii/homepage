export const tokyoNightTheme = {
  dark: {
    colors: {
      background: {
        primary: '#1a1b26',      // editor.background
        secondary: '#16161e',     // sideBar.background
        tertiary: '#1e202e',      // editor.lineHighlightBackground
        hover: '#14141b',         // inputBackground
      },
      foreground: {
        primary: '#a9b1d6',      // editor.foreground
        secondary: '#787c99',     // ui.foreground
        muted: '#515670',         // ui.descriptionForeground
      },
      border: '#101014',          // ui.border
      selection: '#515c7e4d',     // editor.selectionBackground
      accent: {
        blue: '#7aa2f7',         // syntax.function
        cyan: '#7dcfff',         // syntax.variableProperty
        green: '#9ece6a',        // syntax.string
        yellow: '#e0af68',       // syntax.functionParameter
        magenta: '#bb9af7',      // syntax.keyword
        red: '#f7768e',          // syntax.variableLanguage
        orange: '#ff9e64',       // syntax.number
      },
      highlight: '#3d59a1',       // ui.buttonBackground
      comment: '#515c7e',         // syntax.comment
    },
  },
  light: {
    colors: {
      background: {
        primary: '#e6e7ed',      // editor.background
        secondary: '#d6d8df',     // sideBar.background
        tertiary: '#dcdee3',      // editor.lineHighlightBackground
        hover: '#dadce3',         // tab.activeBackground
      },
      foreground: {
        primary: '#343b59',      // editor.foreground
        secondary: '#363c4d',     // ui.foreground
        muted: '#707280',         // ui.descriptionForeground
      },
      border: '#c1c2c7',          // ui.border
      selection: '#acb0bf40',     // editor.selectionBackground
      accent: {
        blue: '#2959aa',         // syntax.function
        cyan: '#0f4b6e',         // syntax.variableProperty
        green: '#385f0d',        // syntax.string
        yellow: '#8f5e15',       // syntax.functionParameter
        magenta: '#65359d',      // syntax.keyword
        red: '#8c4351',          // syntax.variableLanguage
        orange: '#965027',       // syntax.number
      },
      highlight: '#2959aa',       // ui.buttonBackground
      comment: '#888b94',         // syntax.comment
    },
  },
}

export type Theme = typeof tokyoNightTheme.dark
export type ThemeMode = 'dark' | 'light'