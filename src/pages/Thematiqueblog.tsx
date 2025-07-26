import { useState } from "react";
import { useParams } from "react-router-dom";
import CategoryServices from "../services/CategoryServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import BlogThematiqueCard from "../components/blogs/BlogThematiqueCard";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import Pagination from "../components/Pagination/Pagination";

const Thematiqueblog = () => {
  const { id } = useParams();
  const { lang } = useAuthContext();

  const { data: blogs = [], loading } = useAsync(() => CategoryServices.getblogCat(id), id);
  const { data: category } = useAsync(() => CategoryServices.getOneCategory(id), id);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const categoryName = showingTranslateValue(category?.translations, lang)?.name ?? "inconnue";

  return (
    <div className="min-h-screen p-6 flex flex-col  mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <BlogDetailLoad key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Fil d’Ariane */}
          <BreadCumb title={categoryName} />

          {/* En-tête */}
          <section className="mb-8 bg-principal dark:bg-slate-800 rounded-md p-6 shadow-md  text-center">
            <h1 className="text-[16px] font-bold text-white">
              Publications {categoryName}
            </h1>
          </section>

          {/* Grille des blogs */}
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {currentBlogs.map((item: any, index: number) => (
                <BlogThematiqueCard cat={item} key={index} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 my-20">
              Aucun article à afficher pour la thématique <strong>{categoryName}</strong>.
            </div>
          )}

          {/* Pagination */}
          <Pagination
            postsPerPage={postsPerPage}
            totalPasts={blogs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default Thematiqueblog;
