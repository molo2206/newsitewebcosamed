import ProjectServices from "../services/ProjectServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/blogs/ProjectCard";
import NewsLetter from "./NewsLetter";
const Project = () => {
  const { data, loading } = useAsync(() => ProjectServices.getProjetct());

  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const { t } = useTranslation();
  // Filtrer les projets par recherche

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full  dark:text-white ">
          <div>
            <BreadCumb title={"Blog"} />
            <section className="mb-10 ">
              <header className="bg-principal dark:bg-slate-800 w-full dark:text-white rounded-lg text-white py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                  <h1 className="text-4xl font-bold">{t("Project")}</h1>
                  <p className="mt-4 text-lg">{t("Discover_all_our")}</p>
                </div>
              </header>
              {/* Barre de recherche */}
              <div className="mb-6 mt-10"> </div>

              {/* Liste des projets */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs?.length > 0 ? (
                  currentBlogs?.map((item: any, index: number) => (
                    <ProjectCard projet={item} key={index} />
                  ))
                ) : (
                  <p className="text-gray-600">Aucun projet trouvé.</p>
                )}
              </div>
            </section>
            <Pagination
              postsPerPage={postsPerPage}
              totalPasts={data.length}
              paginate={paginate}
            />
            <NewsLetter />
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
