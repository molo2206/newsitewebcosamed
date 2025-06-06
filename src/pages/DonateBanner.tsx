import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DonateModal from "./modal/DonateModal";

const DonateBanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const [showDonate, setShowDonate] = useState(false);

  const goToContact = () => {
    navigate("/contact");
  };

  const fullText = `Si vous souhaitez devenir partenaire de notre organisation et rejoindre notre réseau d'excellence, contactez-nous dès aujourd'hui.`;
  const isLong = fullText.length > 180;
  const shortText = fullText.slice(0, 180) + (isLong ? "..." : "");

  return (
    <div className="p-6 mt-4 bg-white flex flex-col lg:flex-row w-full mx-auto px-6 dark:bg-slate-900  overflow-hidden">
      {/* Left Section */}
      <div className="w-full bg-gray-800 text-white flex-1 p-6 lg:p-16 flex flex-col justify-center ">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Sauver une vie aujourd&apos;hui
        </h1>
        <p className="mb-8 text-lg">
          Remarque&nbsp;: Vous serez dirigé vers la page de soutien. Démarrez le
          processus de donation en cliquant sur ce bouton.
        </p>

        {/* Texte extensible (voir plus / voir moins) */}
        <p className="mb-6 text-base md:text-lg leading-relaxed">
          {expanded ? fullText : shortText}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mb-6 text-principal font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-principal"
            aria-expanded={expanded}
            aria-label={expanded ? "Voir moins" : "Voir plus"}
            type="button"
          >
            {expanded ? "Voir moins" : "Voir plus"}
          </button>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <>
            <button
              onClick={() => setShowDonate(true)}
              className="sm:w-full md:w-auto bg-red-500 hover:bg-red-600 transition-colors text-white px-6 py-2 rounded"
            >
              {t("Donate")}
            </button>
            <DonateModal
              isOpen={showDonate}
              onClose={() => setShowDonate(false)}
            />
          </>

          <button
            type="button"
            onClick={goToContact}
            className="sm:w-full md:w-auto px-6 py-2 border border-principal text-white rounded hover:bg-principal hover:text-white transition"
          >
            Aller à la page contactez-nous
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative overflow-hidden ">
        <img
          src="https://apicosamed.cosamed.org/uploads/blogs/3b92d18aa7a6176dd37d372bc2f1eb71.png"
          alt="Happy child"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default DonateBanner;
