import { useState } from "react";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  commun?: any;
}

const SimpleBannerCommunicated = ({ commun }: Props) => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const goToAbout = () => {
    navigate("/communicated/" + commun?.id);
  };

  const translation = showingTranslateValue(commun?.translations, lang);
  const description = translation?.description || "";
  const isLong = description.length > 300;
  const visibleDescription = expanded
    ? description
    : description.slice(0, 300) + (isLong ? "..." : "");

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border dark:border-slate-700">
          <h1 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white mb-8">
            {t("Important_Announcement") /* Ou "Annonce Importante" */}
          </h1>

          <div className="border-t border-gray-300 dark:border-slate-700 pt-6">
            <h2 className="text-3xl font-semibold text-principal dark:text-principal mb-6">
              {translation?.title}
            </h2>

            <div className="text-gray-700 dark:text-white leading-relaxed mb-6 text-base md:text-lg">
              <p
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: visibleDescription }}
              />
              {isLong && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                  className="text-principal font-semibold text-base mt-3 hover:underline focus:outline-none focus:ring-2 focus:ring-principal"
                  aria-expanded={expanded}
                  aria-label={expanded ? "Voir moins" : "Voir plus"}
                  type="button"
                >
                  {expanded ? "Voir moins" : "Voir plus"}
                </button>
              )}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={goToAbout}
                className="bg-principal hover:bg-hover text-white px-8 py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-4 focus:ring-principal"
                type="button"
              >
                {t("More")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleBannerCommunicated;
