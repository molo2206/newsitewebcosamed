import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import usePageSEO from "../components/Seo/usePageSEO";

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
        <div className="container dark:bg-slate-900 w-full ">
          <BreadCumb title={t("AboutUs")} />

          <section className="mb-10">
            <header className="bg-principal dark:bg-slate-800 w-full dark:text-white rounded-lg text-white py-10">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold">{t("AboutUs")}</h1>
              </div>
            </header>

            <section className="bg-white dark:bg-slate-800 border p-6 rounded-lg shadow-md mb-10 mt-10">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 mb-4">
                {t("AboutUs")}
              </h2>
              <p
                className="text-gray-600 leading-relaxed dark:text-white font-light"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.about_us || "",
                }}
              ></p>
            </section>

            {/* Mission, Vision, Values */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Mission */}
              <div className="bg-white border dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">
                  {t("Mission")}
                </h3>
                <p
                  className="text-gray-600 dark:text-white font-light"
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(data?.translations, lang)
                      ?.mission || "",
                  }}
                ></p>
              </div>

              {/* Vision */}
              <div className="bg-white p-6 border rounded-lg shadow-md dark:bg-slate-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white ">
                  {t("Vision")}
                </h3>
                <p
                  className="text-gray-600 dark:text-white font-light"
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(data?.translations, lang)
                      ?.vision || "",
                  }}
                ></p>
              </div>

              {/* Values */}
              <div className="bg-white border dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">
                  {t("Our_Values")}
                </h3>
                <ul className="text-gray-600 list-disc ml-5 space-y-2 dark:text-white font-light">
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
                    <li key={idx}>{t(value)}</li>
                  ))}
                </ul>
              </div>
            </section>
          </section>

          {/* Galerie d’images et pagination (optionnel, à décommenter si besoin) */}
          {/* <section className="bg-white p-6 border rounded-lg shadow-md dark:bg-slate-800">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
              {t("Our_achievements")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loading
                ? Array.from(Array(20).keys()).map((i) => <BlogCardLoand key={i} />)
                : currentMedia.map((item: any, index: number) => (
                    <ImageRealisationCard
                      onClick={() => openLightbox(index)}
                      data={item}
                      key={item.id || index}
                    />
                  ))}
            </div>
          </section>

          <Pagination
            postsPerPage={postsPerPage}
            totalPasts={medias?.length || 0}
            paginate={paginate}
          />

          <LightboxViewer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            images={currentMedia.map((item: any) => ({
              src: item.cover,
              caption: item.id,
              alt: item.id,
            }))}
          /> */}
        </div>
      )}
    </>
  );
}

export default About;
