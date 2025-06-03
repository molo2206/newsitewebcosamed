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
    <div className=" mx-auto p-6 dark:bg-slate-900 dark:text-white">
      {loading ? (
        Array.from({ length: 12 }).map((_, i) => <BlogDetailLoad key={i} />)
      ) : (
        <>
          <BreadCumb title={"Category"} />

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {showingTranslateValue(cat?.translations, lang)?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Browse all articles under this category.
            </p>
          </div>

          {/* Section de recherche type OMS */}
          <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-lg mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search by keyword"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Health Topic"
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Countries/Areas"
                className="p-2 border rounded"
              />
              <select className="p-2 border rounded">
                <option>Year</option>
              </select>
              <select className="p-2 border rounded">
                <option>Publication type</option>
              </select>
              <input
                type="text"
                placeholder="Publishing Offices"
                className="p-2 border rounded"
              />
            </div>
          </div>

          {/* Grille des articles */}

          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {currentBlogs.map((item: any, index: number) => (
                <BlogThematiqueCard cat={item} key={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Aucun article à afficher.
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
