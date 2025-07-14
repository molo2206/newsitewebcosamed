import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

const ThemeContext = createContext<any>({});

export const ThemeSettings = {
  theme: { light: 'light', dark: 'dark' },
};

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within an ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState({
    theme: ThemeSettings.theme.light,
  });

  const toggleTheme = useCallback(() => {
    setSettings((prev) => {
      const newTheme =
        prev.theme === ThemeSettings.theme.dark
          ? ThemeSettings.theme.light
          : ThemeSettings.theme.dark;
      return { ...prev, theme: newTheme };
    });
  }, []);

  // Appliquer la classe 'dark' sur <html>
  useEffect(() => {
    if (settings.theme === ThemeSettings.theme.dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  return (
    <ThemeContext.Provider
      value={{
        settings,
        toggleTheme,
        setSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
