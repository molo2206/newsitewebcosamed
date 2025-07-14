import{
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import i18n from "../i18n"; 

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>("en");


  useEffect(() => {
    const browserLang = navigator.language || navigator.languages[0];
    const lang = browserLang.startsWith("en") ? "en" : "fr";
    setLanguage(lang);
  }, []);

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
