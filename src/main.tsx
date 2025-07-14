window.global = window;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/useAuthContext.tsx";
import { ToastProvider } from "react-toast-notifications";
import { AxiosInterceptor } from "./services/axios/index.ts";
import { ThemeProvider } from "./context/useThemeContext.tsx"; // ✅ ajoute ça
import { LanguageProvider } from "./context/LanguageContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <AxiosInterceptor>
                <App />
              </AxiosInterceptor>
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
