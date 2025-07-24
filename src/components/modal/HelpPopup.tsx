import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface HelpPopupProps {
  onHelpClick: () => void;
}

export default function HelpPopup({ onHelpClick }: HelpPopupProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Affiche après 1 minute
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 60000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 "
        onClick={() => setIsVisible(false)}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 ">
        <div className="bg-white dark:bg-slate-900 rounded-md border border-gray-200 dark:border-slate-700  shadow-2xl max-w-md w-full p-6 relative transition-all">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-principal dark:hover:text-white focus:outline-none"
            aria-label="Fermer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="w-20 h-20 mx-auto mb-4">
            <img
              src="https://apicosamed.cosamed.org/uploads/logo/popup.png"
              alt="Support icon"
              className="w-full h-full object-contain rounded-xl shadow-md"
              loading="lazy"
            />
          </div>

          <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
            {t("Besoin d’aide ou assistance ?")}
          </h3>
          <p className="text-[11px] text-center text-gray-600 dark:text-gray-400 mb-6">
            {t(
              "Vous naviguez depuis un moment. Si vous avez une urgence ou une question, notre équipe est disponible pour vous aider."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="w-full sm:w-auto bg-principal dark:bg-slate-800 hover:bg-hover text-[10px] text-white px-5 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-principal"
              onClick={() => {
                setIsVisible(false);
                onHelpClick();
              }}
            >
              {t("Contact_us")}
            </button>
            <button
              className="w-full sm:w-auto border border-gray-300 text-[10px] dark:border-slate-600 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              onClick={() => setIsVisible(false)}
            >
              {t("Fermer")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
