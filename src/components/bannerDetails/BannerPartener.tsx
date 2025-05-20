import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import BlogCardLoand from "../../components/blogs/BlogCardLoad";
import useAsync from "../../hooks/useAsync";
import PartenersServices from "../../services/PartenersServices";
import { useTranslation } from "react-i18next";
import PartnerCard from "../../components/blogs/PartnerCard";
import { useNavigate } from "react-router-dom";

function BannerPartener() {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => PartenersServices.getPartners());
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const goToAbout = () => {
    navigate("/contact");
  };

  const fullText = `Si vous souhaitez devenir partenaire de notre organisation et rejoindre notre réseau d'excellence, contactez-nous dès aujourd'hui.`;
  const isLong = fullText.length > 180;
  const shortText = fullText.slice(0, 180) + (isLong ? "..." : "");

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16 w-full dark:text-white">
      <div className="container mx-auto px-6">
        <header className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("Partnerships")}
          </h1>
          <p className="text-gray-600 mt-2 text-lg md:text-xl dark:text-white">
            {t("Data_how_collaborate")}
          </p>
        </header>

        {/* Liste des Partenaires */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 20 }).map((_, i) => (
                <BlogCardLoand key={i} />
              ))
            : data?.map((item: any, index: number) => (
                <PartnerCard partners={item} key={index} />
              ))}
        </section>

        {/* Section Contact dans une card */}
        <section className="mt-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-8 border dark:border-slate-700 mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Devenir Partenaire
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-base md:text-lg leading-relaxed text-center mb-4">
              {expanded ? fullText : shortText}
            </p>

            {isLong && (
              <div className="text-center mb-6">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-principal font-semibold text-base hover:underline focus:outline-none focus:ring-2 focus:ring-principal"
                  aria-expanded={expanded}
                  aria-label={expanded ? "Voir moins" : "Voir plus"}
                  type="button"
                >
                  {expanded ? "Voir moins" : "Voir plus"}
                </button>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={goToAbout}
                className="px-8 py-3 bg-principal text-white rounded-lg hover:bg-hover transition font-semibold focus:outline-none focus:ring-4 focus:ring-principal"
                type="button"
              >
                Aller à la page contactez-nous
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default BannerPartener;
