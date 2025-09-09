import useAsync from "../hooks/useAsync";
import { useTranslation } from "react-i18next";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import usePageSEO from "../components/Seo/usePageSEO";
import ImageRealisationCard from "../components/blogs/ImageRealisationCard";
import MediaServices from "../services/MediaServices";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import LightboxViewer from "../components/LightBox";
import { motion } from "framer-motion";

const Gallery = () => {
  const { data: datas, loading } = useAsync(() => MediaServices.getMedia());
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(100);
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
        <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {Array.from(Array(20).keys()).map((_, key) => (
              <BulletinLoad key={key} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <BreadCumb title={t("Gallery")} />

            <section className="mb-10">
              <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
                <h1 className="text-[16px] font-bold uppercase tracking-widest">
                  {t("Gallery")}
                </h1>
              </section>

              <section className="bg-transparent p-0 mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                  {t("Our_achievements")}
                </h2>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                >
                  {currentMedia.map((item: any, index: number) => (
                    <motion.div
                      key={index}
                      onClick={() => openLightbox(index)}
                      variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <ImageRealisationCard data={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </section>

              {datas.length > postsPerPage && (
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPasts={currentMedia.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
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
        </div>
      )}
    </>
  );
};

export default Gallery;
