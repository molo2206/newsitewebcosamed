import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

interface ThemeSettingsType {
  theme: "light" | "dark";
}

interface ThemeContextType {
  settings: ThemeSettingsType;
  toggleTheme: () => void;
  setSettings: React.Dispatch<React.SetStateAction<ThemeSettingsType>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "user-theme";

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettingsType>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTheme === "dark" || savedTheme === "light") {
        return { theme: savedTheme };
      } else {
        // Utiliser la préférence système si aucune valeur sauvegardée
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        return { theme: prefersDark ? "dark" : "light" };
      }
    }
    return { theme: "light" };
  });

  const toggleTheme = useCallback(() => {
    setSettings((prev) => {
      const newTheme = prev.theme === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
      }
      return { theme: newTheme };
    });
  }, []);

  useEffect(() => {
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.theme]);

  return (
    <ThemeContext.Provider value={{ settings, toggleTheme, setSettings }}>
      {children}
    </ThemeContext.Provider>
  );
}
