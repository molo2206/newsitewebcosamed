import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DonateModal from "./modal/DonateModal";

const DonateBanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDonate, setShowDonate] = useState(false);

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-sm bg-white dark:bg-slate-800">
          {/* Left Section */}
          <div className="w-full bg-gray-800 text-white flex-1 p-6 lg:p-16 flex flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">
              Sauver une vie aujourd&apos;hui
            </h1>
            <p className="mb-8 text-[15px]">
              Remarque&nbsp;: Vous serez dirigé vers la page de soutien.
              Démarrez le processus de donation en cliquant sur ce bouton.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <>
                <button
                  onClick={() => setShowDonate(true)}
                  className="sm:w-full md:w-auto bg-red-500 hover:bg-red-600 text-[12px] transition-colors text-white px-6 py-2 rounded"
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
                className="sm:w-full md:w-auto px-6 py-2 text-[12px] border border-principal text-white rounded hover:bg-principal hover:text-white transition"
              >
                Aller à la page contactez-nous
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://apicosamed.cosamed.org/uploads/blogs/3b92d18aa7a6176dd37d372bc2f1eb71.png"
              alt="Happy child"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateBanner;
