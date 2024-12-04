import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import usePageSEO from "../components/Seo/usePageSEO";
import ImageRealisationCard from "../components/blogs/ImageRealisationCard";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import MediaServices from "../services/MediaServices";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import LightboxViewer from "../components/LightBox";
function About() {
  const { data, loading } = useAsync(() => SettingsServices.getSettings());
  const { data: datas } = useAsync(() => MediaServices.getMedia());
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMedia = datas.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  usePageSEO({
    title: "A propos de nous",
    description: "A propos de nous",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BulletinLoad />)
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
                className="text-gray-600 leading-relaxed dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.about_us,
                }}
              ></p>
            </section>

            {/* Mission, Vision, Values */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Mission */}
              <div className="bg-white border dark:bg-slate-800  p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">
                  {t("Mission")}
                </h3>
                <p
                  className="text-gray-600 dark:text-white"
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(data?.translations, lang)
                      ?.mission,
                  }}
                ></p>
              </div>

              {/* Vision */}
              <div className="bg-white p-6 border rounded-lg shadow-md dark:bg-slate-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">
                  {t("Vision")}
                </h3>
                <p
                  className="text-gray-600 dark:text-white"
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(data?.translations, lang)
                      ?.vision,
                  }}
                ></p>
              </div>
              {/* Values */}
              <div className="bg-white border dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">
                  {t("Our_Values")}
                </h3>
                <ul className="text-gray-600 list-disc ml-5 space-y-2 dark:text-white">
                  <li>{t("Professionalism")}</li>
                  <li>{t("Responsibility")}</li>
                  <li>{t("Mutual_respect")}</li>
                  <li>{t("Gender_sensitivity")}</li>
                  <li>{t("Excellence")}</li>
                  <li>{t("Equity")}</li>
                  <li>{t("Inclusion")}</li>
                  <li>{t("Innovation")}</li>
                </ul>
              </div>
            </section>
            {/* Image Gallery */}
            <section className="bg-white p-6  border rounded-lg shadow-md dark:bg-slate-800 ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                {t("Our_achievements")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentMedia.map((item: any, index: number) => (
                      <ImageRealisationCard
                        onClick={() => openLightbox(index)}
                        data={item}
                        key={index}
                      />
                    ))}
              </div>
            </section>
            <Pagination
              postsPerPage={postsPerPage}
              totalPasts={datas.length}
              paginate={paginate}
            />
          </section>
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
          />
        </div>
      )}
    </>
  );
}

export default About;
