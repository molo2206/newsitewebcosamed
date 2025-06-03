import BreadCumb from "../components/navbar/BreadCumb";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import TestimonyServices from "../services/TestimonyServices";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import TestimonyCard from "../components/blogs/TestimonyCard";
import { useTranslation } from "react-i18next";
const AboutMedia = () => {
  const { data, loading } = useAsync(() => SettingsServices.getSettings());
  const { data: datas } = useAsync(() => TestimonyServices.getTestimony());
  console.log(data);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTestimonials = datas.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const ressources = [
    {
      title: "Communiqués de presse",
      description:
        "Découvrez nos derniers communiqués de presse et annonces officielles.",
      link: "/load-data/communicated",
    },
    {
      title: "Rapports annuels",
      description:
        "Consultez nos rapports annuels pour une vision complète de nos activités.",
      link: "/data-loading/reports",
    },
    {
      title: "Galerie multimédia",
      description: "Accédez à notre banque d'images, vidéos et graphiques.",
      link: "/data-loading/videos",
    },
    {
      title: "Événements",
      description: "Explorez nos événements passés et à venir.",
      link: "/evements",
    },
    {
      title: "Blog & Articles",
      description:
        "Lisez des articles sur les tendances de l'industrie et nos innovations.",
      link: "/data-loading/blogs",
    },
  ];

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="p-6 dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={t("Media_resources")} />
            <section className="mb-10 ">
              <header className="bg-principal dark:bg-slate-800 dark:text-white text-white py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                  <h1 className="md:text-xl lg:text-2xl font-bold">
                    {" "}
                    {t("Media_resources")}
                  </h1>
                </div>
                <p className="text-white mt-4 sm:text-sm md:text-sm lg:text-xl font-light dark:text-white px-4">
                  Accédez à une sélection complète de documents, communiqués,
                  images et plus encore. Tout ce dont vous avez besoin pour
                  comprendre nos actions et nos engagements.
                </p>
              </header>

              {/* Resources Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-2">
                {ressources.map((ressource, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 shadow-md border p-6 hover:shadow-lg transition-shadow"
                  >
                    <h2 className="text-md font-semibold text-gray-800 mb-3 dark:text-white">
                      {ressource.title}
                    </h2>
                    <p className="text-gray-600 mb-4 dark:text-white text-sm ">
                      {ressource.description}
                    </p>
                    <a
                      href={ressource.link}
                      className="text-principal text-sm font-medium hover:underline"
                    >
                      En savoir plus →
                    </a>
                  </div>
                ))}
              </section>
              <section className="bg-gray-100   py-12 mt-10 dark:bg-slate-800">
                <div className="max-w-6xl mx-auto px-2">
                  <h2 className="text-xl font-light text-gray-800 mb-8 dark:text-white">
                    {t("Media_testimonials")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading
                      ? Array.from(Array(20).keys()).map(() => (
                          <BlogCardLoand />
                        ))
                      : currentTestimonials.map((item: any, index: number) => (
                          <TestimonyCard testimony={item} key={index} />
                        ))}
                  </div>
                </div>
              </section>
              <Pagination
                postsPerPage={postsPerPage}
                totalPasts={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutMedia;
