import { useState, useEffect } from "react";

const CookieConsent = () => {
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
    <div className=" dark:bg-slate-800 dark:rounded-lg fixed bottom-0 left-0 right-0 bg-white shadow-lg border border-gray-300 p-4">
      <div className=" container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-700 text-sm mb-3 md:mb-0">
          <p>
            <strong className=" dark:text-white">Votre vie privée est importante pour nous</strong>
          </p>
          <p className="dark:text-white">
            En cliquant sur le bouton "Accepter", vous consentez à l'utilisation
            du 1er et cookies tiers (ou similaires) pour améliorer votre
            expérience Web, mesurer notre audience et collecter des données.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            style={{ fontSize: 11 }}
            onClick={() => handleConsent("accepted")}
            className="bg-principal  text-white py-2 px-4 rounded-lg hover:bg- transition"
          >
            Accepter les cookies
          </button>
          <button
            style={{ fontSize: 11 }}
            onClick={() => handleConsent("refused")}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
