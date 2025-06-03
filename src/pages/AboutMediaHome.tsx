import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import useAsync from "../hooks/useAsync";
import TestimonyServices from "../services/TestimonyServices";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import TestimonyCard from "../components/blogs/TestimonyCard";
import { useTranslation } from "react-i18next";

const AboutMediaHome = () => {
  const { data: datas = [], loading } = useAsync(() =>
    TestimonyServices.getTestimony()
  );
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTestimonials = datas.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  if (loading) {
    return (
      <>
        {Array.from({ length: 20 }).map((_, i) => (
          <BlogDetailLoad key={i} />
        ))}
      </>
    );
  }

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16 w-full dark:text-white">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="lg:text-xl md:text-xl font-extrabold py-2 text-gray-800 dark:text-white">
            {t("Media_resources")}
          </h1>
          <p className="text-gray-600 mt-4 lg:text-xl md:text-xl font-light dark:text-white">
            Accédez à une sélection complète de documents, communiqués, images
            et plus encore. Tout ce dont vous avez besoin pour comprendre nos
            actions et nos engagements.
          </p>
        </header>

        {/* Resources Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ressources.map((ressource, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:border border-slate-700 p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="lg:text-xl md:text-xl text-gray-800 mb-3 dark:text-white">
                {ressource.title}
              </h2>
              <p className="text-gray-600 mb-4 dark:text-white">
                {ressource.description}
              </p>
              <a
                href={ressource.link}
                className="text-principal font-medium hover:underline"
              >
                En savoir plus →
              </a>
            </div>
          ))}
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-100 rounded-lg py-12 mt-10 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="lg:text-xl md:text-xl font-extrabold text-gray-800 mb-8 dark:text-white">
              {t("Media_testimonials")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTestimonials.map((item: any, index: number) => (
                <TestimonyCard testimony={item} key={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Pagination */}
        <Pagination
          postsPerPage={postsPerPage}
          totalPasts={currentTestimonials.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default AboutMediaHome;
