import { Brain } from "lucide-react";
import BreadCumb from "../components/navbar/BreadCumb";
import { BiHealth } from "react-icons/bi";
import { FaServicestack } from "react-icons/fa";
import DonateModal from "./modal/DonateModal";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BulletinLoad from "../components/blogs/BulletinLoad";

const UrgentActionPage = () => {
  const [showDonate, setShowDonate] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Simuler le chargement
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BulletinLoad key={i} />
        ))}
      </div>
    );
  }

  return (
    <main className="bg-white dark:bg-slate-900 w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title="urgence" />

        <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
          <h1 className="text-[16px] font-bold uppercase tracking-widest">
            Actions urgentes
          </h1>
          <p className="text-[14px] text-white dark:text-gray-300">
            Nous intervenons rapidement pour protéger la vie et la dignité des
            plus vulnérables.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-100 dark:bg-blue-800/20 rounded-lg p-5 shadow-md border border-blue-300 dark:border-blue-600">
            <BiHealth className="text-principal mb-2" size={20} />
            <h3 className="font-bold text-[13px] mb-2">Éducation sanitaire</h3>
            <p className="text-[12px]">
              Installation des cliniques mobiles dans les zones sinistrées pour
              offrir des soins de santé d'urgence.
            </p>
          </div>

          <div className="bg-blue-100 dark:bg-blue-800/20 rounded-lg p-5 shadow-md border border-blue-300 dark:border-blue-600">
            <FaServicestack className="text-principal mb-2" size={20} />
            <h3 className="font-bold text-[13px] mb-2">
              Offre de services de soins de santé
            </h3>
            <p className="text-[12px]">
              Soutien mental et psychologique pour les populations traumatisées
              par les catastrophes.
            </p>
          </div>

          <div className="bg-blue-100 dark:bg-blue-800/20 rounded-lg p-5 shadow-md border border-blue-300 dark:border-blue-600">
            <Brain className="text-principal mb-2" size={20} />
            <h3 className="font-bold text-[13px] mb-2">
              Recherche et numérique
            </h3>
            <p className="text-[12px]">
              Campagnes de sensibilisation et prévention contre les maladies
              contagieuses.
            </p>
          </div>
        </section>

        <section className="text-center bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 p-8 rounded-lg shadow-md">
          <h2 className="text-[16px] font-bold mb-4 text-principal dark:text-white">
            Soutenez nos interventions en urgence
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto text-[12px]">
            Votre générosité nous permet d’apporter une aide rapide et efficace
            aux populations vulnérables. Chaque don compte.
          </p>
          <button
            onClick={() => setShowDonate(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 text-[12px] rounded"
          >
            {t("Donate")}
          </button>
          <DonateModal
            isOpen={showDonate}
            onClose={() => setShowDonate(false)}
          />
        </section>
      </div>
    </main>
  );
};

export default UrgentActionPage;
