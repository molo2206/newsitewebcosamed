import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { showingTranslateValue } from "../utils/heleprs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useLanguageContext } from "../context/LanguageContext";
const Vision = () => {
  const { data, loading } = useAsync(() => SettingsServices.getSettings());
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language: lang } = useLanguageContext();
  const goToAbout = () => {
    navigate("/contact");
  };
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BulletinLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full">
          <BreadCumb title={t("Vision & Mission")} />
          <section className="mb-10">
            <header className="bg-principal dark:bg-slate-800 w-full dark:text-white rounded-lg text-white py-10">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold">{t("Vision")}</h1>
              </div>
            </header>
            <div className=" bg-white py-10 px-5 dark:bg-slate-900 dark:text-white ">
              <div className="">
                <section className="bg-white dark:bg-slate-800 w-full dark:text-white border p-6 rounded-lg shadow-md mb-12">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
                    {t("Vision")}
                  </h2>
                  <p
                    className="text-gray-700 dark:text-white"
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.vision,
                    }}
                  ></p>
                </section>
                <section className="bg-white dark:bg-slate-800 w-full  border p-6 rounded-lg shadow-md mb-12">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
                    {t("Mission")}
                  </h2>
                  <p
                    className="text-gray-700 dark:text-white"
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.mission,
                    }}
                  ></p>
                </section>

                {/* Section Valeurs */}
                <section className="bg-white p-6 rounded-lg dark:bg-slate-800 w-full  border shadow-md">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
                    Nos Valeurs
                  </h2>
                  <ul className="space-y-6 text-gray-700 dark:text-white">
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-500">✔️</span>
                      <span className="font-semibold">Innovation</span> : Nous
                      encourageons la créativité et l'innovation pour résoudre
                      les défis de demain.
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-500">✔️</span>
                      <span className="font-semibold">Responsabilité</span> :
                      Nous agissons de manière éthique, responsable et avec un
                      souci constant du bien-être de notre communauté.
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-500">✔️</span>
                      <span className="font-semibold">Excellence</span> : Nous
                      visons toujours l'excellence dans tous les aspects de
                      notre travail.
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-500">✔️</span>
                      <span className="font-semibold">Collaboration</span> : La
                      collaboration avec nos partenaires et clients est au cœur
                      de notre succès.
                    </li>
                  </ul>
                </section>

                {/* Section Contact */}
                <div className="text-center mt-12">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Vous souhaitez en savoir plus ?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    N'hésitez pas à nous contacter pour plus d'informations sur
                    notre vision, nos produits et comment nous pouvons
                    travailler ensemble.
                  </p>
                  <button
                    onClick={goToAbout}
                    className="mt-4 px-6 py-2 bg-principal text-white rounded-md hover:bg-hover"
                  >
                    Aller à la page contactez-nous
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Vision;
