import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import usePageSEO from "../components/Seo/usePageSEO";
import { CheckCircle } from "lucide-react"; // Icône pour les valeurs

function About() {
  const { data, loading } = useAsync(() => SettingsServices.getSettings());
  const { lang } = useAuthContext();
  const { t } = useTranslation();

  usePageSEO({
    title: t("AboutUs"),
    description: t("AboutUs"),
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map((i) => <BulletinLoad key={i} />)
      ) : (
        <div className="bg-gray-50 dark:bg-slate-900 w-full p-6">
          <div className=" mx-auto px-4">
            <BreadCumb title={t("AboutUs")} />

            {/* En-tête OMS style */}
            <header className="bg-principal border dark:border-gray-700 dark:bg-slate-800 text-white p-6 bor mb-12">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold">
                  {t("AboutUs")}
                </h1>
              </div>
            </header>

            {/* Sections */}
            <section className="space-y-12">
              {/* À propos */}
              <div className="bg-white border dark:border-gray-700 p-6 dark:bg-slate-800">
                <h2 className="text-2xl font-semibold text-blue-900 dark:text-white mb-4">
                  {t("AboutUs")}
                </h2>
                <p
                  className="text-gray-700 dark:text-gray-200 leading-relaxed font-light"
                  dangerouslySetInnerHTML={{
                    __html:
                      showingTranslateValue(data?.translations, lang)
                        ?.about_us || "",
                  }}
                ></p>
              </div>

              {/* Mission, Vision, Valeurs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mission */}
                <div className="bg-white border dark:border-gray-700 p-6 dark:bg-slate-800">
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-2">
                    {t("Mission")}
                  </h3>
                  <p
                    className="text-gray-700 dark:text-gray-200 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        showingTranslateValue(data?.translations, lang)
                          ?.mission || "",
                    }}
                  ></p>
                </div>

                {/* Vision */}
                <div className="bg-white border dark:border-gray-700 dark:bg-slate-800 p-6">
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-2">
                    {t("Vision")}
                  </h3>
                  <p
                    className="text-gray-700 dark:text-gray-200 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        showingTranslateValue(data?.translations, lang)
                          ?.vision || "",
                    }}
                  ></p>
                </div>

                {/* Valeurs */}
                <div className="bg-white  p-6 border dark:border-gray-700 dark:bg-slate-800">
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-2">
                    {t("Our_Values")}
                  </h3>
                  <ul className="text-gray-700 dark:text-gray-200 font-light space-y-2 list-none">
                    {[
                      "Professionalism",
                      "Responsibility",
                      "Mutual_respect",
                      "Gender_sensitivity",
                      "Excellence",
                      "Equity",
                      "Inclusion",
                      "Innovation",
                    ].map((value, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="text-green-600 w-4 h-4" />
                        {t(value)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
