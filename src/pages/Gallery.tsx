import useAsync from "../hooks/useAsync";
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
const Gallery = () => {
  const { data: datas, loading  } = useAsync(() => MediaServices.getMedia());
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1000);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMedia = datas.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  usePageSEO({
    title: "Gallery",
    description: "Gallery",
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
        <div className="p-6 dark:bg-slate-900 w-full ">
          <BreadCumb title={t("Gallery")} />
          <section className="mb-10">
            <header className="bg-principal dark:bg-slate-800 w-full dark:text-white text-white py-10">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold">{t("Gallery")}</h1>
              </div>
            </header>
            {/* Image Gallery */}
            <section className="bg-transparent p-0 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                {t("Our_achievements")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
                totalPasts={currentMedia.length}
                paginate={paginate}
                currentPage={currentPage}
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
};

export default Gallery;
