import CommunicatedServices from "../services/CommunicatedServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination/Pagination";
import CommunicateCard from "../components/blogs/CommunicateCard";
import { useTranslation } from "react-i18next";

const Communicates = () => {
  const { data = [], loading } = useAsync(() =>
    CommunicatedServices.getCommunicate()
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Calculate current posts slice
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCommunicates = data.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const { t } = useTranslation();

  // Reset to page 1 if data changes (new fetch)
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <>
      {loading ? (
        // Affiche un loader global ou placeholder
        <div className="p-6 w-full dark:bg-slate-900 dark:text-white">
          {Array.from({ length: 6 }).map((_, idx) => (
            <BlogDetailLoad key={idx} />
          ))}
        </div>
      ) : (
        <div className="p-6 dark:bg-slate-900 w-full dark:text-white px-4 sm:px-6 lg:px-8">
          <BreadCumb title={t("Communicated")} />

          <section className="mb-10">
            <header className="bg-principal dark:bg-slate-800 w-full dark:text-white text-white py-10 mb-6">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold">{t("How_comminicate")}</h1>
              </div>
            </header>

            {currentCommunicates.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                {t("No_communicates_found")}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentCommunicates.map((item: any) => (
                  <CommunicateCard key={item.id} communicate={item} />
                ))}
              </div>
            )}
          </section>

          {data.length > postsPerPage && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPasts={data.length}
              paginate={paginate}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Communicates;
