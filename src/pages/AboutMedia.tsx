import BreadCumb from "../components/navbar/BreadCumb";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import { BASE_YOUTUBE } from "../utils/heleprs";
import CardVideo from "../components/cards/CardVideo";

const AboutMedia = () => {
  const { data, loading } = useAsync(() => SettingsServices.getSettings());
  console.log(data);
  const [allvideos, setAllvideos] = useState([]);

  useEffect(() => {
    fetch(BASE_YOUTUBE)
      .then((response) => response.json())
      .then((resJson) => {
        const result = resJson.items.map((doc: any) => ({
          ...doc,
          VideoLink: "https://www.youtube.com/embed/" + doc.id.videoId,
        }));
        setAllvideos(result);
      });
  }, []);
  console.log(allvideos);
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentVideos = allvideos.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const ressources = [
    {
      title: "COMMUNIQUÉS DE PRESSE",
      description:
        "Découvrez nos derniers communiqués de presse et annonces officielles.",
      link: "/load-data/communicated",
    },
    {
      title: "RAPPORTS ANNUELS",
      description:
        "Consultez nos rapports annuels pour une vision complète de nos activités.",
      link: "/data-loading/reports",
    },
    {
      title: "GALERIE MULTIMÉDIA",
      description: "Accédez à notre banque d'images, vidéos et graphiques.",
      link: "/data-loading/gallery",
    },
    {
      title: "ÉVÉNEMENTS",
      description: "Explorez nos événements passés et à venir.",
      link: "/evements",
    },
    {
      title: "BLOG & ARTICLES",
      description:
        "Lisez des articles sur les tendances de l'industrie et nos innovations.",
      link: "/data-loading/blogs",
    },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BlogDetailLoad key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-white dark:bg-slate-900 text-gray-900 dark:text-white w-full max-w-7xl mx-auto ">
        <BreadCumb title={t("Media_resources")} />

        <section className="text-center p-6 bg-principal dark:bg-slate-800 text-white rounded-md shadow-md">
          <h1 className="text-xl md:text-xl font-extrabold uppercase tracking-wide">
            RESSOURCES MÉDIAS
          </h1>
          <p className="mt-4 text-sm max-w-3xl mx-auto">
            Accédez aux communiqués, rapports, vidéos et plus encore.
          </p>
        </section>

        <section className=" mx-auto p-2 bg-gray-100  dark:bg-slate-800 mt-6 rounded-md">
          <h2 className="text-xl text-center font-bold uppercase mb-6 text-principal dark:text-white mt-2">
            NOS RESSOURCES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ressources.map((ressource, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-slate-800 border-l-4 border-principal p-6 hover:shadow-md transition-shadow rounded-md"
              >
                <h3 className="text-sm font-semibold uppercase mb-2 text-principal dark:text-white">
                  {ressource.title}
                </h3>
                <p className="text-[12px] text-gray-600 dark:text-gray-300 mb-4">
                  {ressource.description}
                </p>
                <a
                  href={ressource.link}
                  className="text-principal hover:underline font-medium text-[12px]"
                >
                  En savoir plus →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-slate-800 p-6 mt-6">
          <div className=" mx-auto">
            <h2 className="text-xl font-extrabold uppercase text-center mb-10 text-principal dark:text-white">
              VIDÉOS RÉCENTES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentVideos.map((item: any, index: number) => (
                <CardVideo items={item} key={index} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Pagination
                postsPerPage={postsPerPage}
                totalPasts={allvideos.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutMedia;
