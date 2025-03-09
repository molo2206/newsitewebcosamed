import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CookieConsent = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (decision: any) => {
    localStorage.setItem("cookieConsent", decision);
    setShowBanner(false);
    console.log(`User choice: ${decision}`);
  };

  if (!showBanner) return null;
  
  return (
    <div
      className=" dark:bg-slate-800   top-0 left-0 right-0 p-4
    bg-white shadow-lg border-b dark:border-slate-700 "
    >
      <div className=" container mx-auto flex flex-col  md:flex-row justify-between items-center">
        <div className="text-gray-700 text-sm mb-3 md:mb-0">
          <p>
            <strong className=" dark:text-white">
              {t("Your_privacy_important")}
            </strong>
          </p>
          <p className="dark:text-white">{t("Your_privacy")}</p>
        </div>
        <div className="flex gap-4">
          <button
            style={{ fontSize: 11 }}
            onClick={() => handleConsent("accepted")}
            className="bg-principal dark:bg-slate-900   text-white py-2 px-4 rounded-lg hover:bg- transition"
          >
            {t('Accept_cookies')}
          </button>
          <button
            style={{ fontSize: 11 }}
            onClick={() => handleConsent("refused")}
            className="bg-gray-200 dark:bg-slate-900 dark:text-white   text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            {t('Refuse')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
