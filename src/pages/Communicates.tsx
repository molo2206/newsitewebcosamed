import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAsync from "../hooks/useAsync";
import CommunicatedServices from "../services/CommunicatedServices";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import CommunicateCard from "../components/blogs/CommunicateCard";

const Communicates = () => {
  const { t } = useTranslation();
  const { data = [], loading } = useAsync(() =>
    CommunicatedServices.getCommunicate()
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCommunicates = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title={t("Communicated")} />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: postsPerPage }).map((_, idx) => (
              <BlogDetailLoad key={idx} />
            ))}
          </div>
        ) : (
          <section className="mb-10">
            <header className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
              <h1 className="text-[14px] font-bold">{t("How_comminicate")}</h1>
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
        )}

        {data.length > postsPerPage && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPasts={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Communicates;
