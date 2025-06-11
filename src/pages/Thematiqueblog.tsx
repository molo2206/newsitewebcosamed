import CategoryServices from "../services/CategoryServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useParams } from "react-router-dom";
import BlogThematiqueCard from "../components/blogs/BlogThematiqueCard";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";

const Thematiqueblog = () => {
  const { id } = useParams();
  const { lang } = useAuthContext();

  const { data = [], loading } = useAsync(
    () => CategoryServices.getblogCat(id),
    id
  );
  const { data: cat } = useAsync(() => CategoryServices.getOneCategory(id), id);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen mx-auto p-6 flex flex-col">
      {loading ? (
        Array.from({ length: 12 }).map((_, i) => <BlogDetailLoad key={i} />)
      ) : (
        <>
          <BreadCumb title={"Category"} />

          <div className="mb-12  bg-principal dark:bg-slate-800 p-6  shadow-md">
            <h1 className="text-2xl font-bold text-white mb-4">
              Publications{" "}
              {showingTranslateValue(cat?.translations, lang)?.name}
            </h1>
          </div>

          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {currentBlogs.map((item: any, index: number) => (
                <BlogThematiqueCard cat={item} key={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Aucun article à afficher sur la thématique{" "}
              {showingTranslateValue(cat?.translations, lang)?.name ??
                "inconnue"}
              .
            </p>
          )}

          {/* Pagination */}
          <Pagination
            postsPerPage={postsPerPage}
            totalPasts={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default Thematiqueblog;
