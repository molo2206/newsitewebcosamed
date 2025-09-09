import { useState, Key } from "react";
import { useTranslation } from "react-i18next";
import useAsync from "../hooks/useAsync";
import RapportServices from "../services/RapportServices";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import BulletinLoad from "../components/blogs/BulletinLoad";
import RepportCard from "../components/blogs/RepportCard";

const Rapport = () => {
  const { t } = useTranslation();

  const { data = [], loading } = useAsync(() => RapportServices.getRapport());

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentReports = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title={t("Reports")} />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <BulletinLoad key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="bg-principal dark:bg-slate-800 w-full text-white rounded-md py-10 mb-10 text-center">
              <h1 className="text-[16px] font-bold">{t("How_report")}</h1>
            </header>

            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-[16px] font-bold text-gray-800 dark:text-white mb-4">
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-[13px]">
                Les urgences sanitaires nécessitent des réponses rapides et coordonnées. Nos rapports fournissent des informations clés pour comprendre les défis et proposer des solutions efficaces. Vous trouverez ici une sélection de nos dernières publications.
              </p>
            </section>

            {/* Reports Section */}
            <section className="bg-white dark:bg-slate-800 p-6 border dark:border-slate-700 shadow-md rounded-md mb-12">
              <h2 className="text-[16px] font-bold text-gray-800 dark:text-white mb-6">
                Rapports récents
              </h2>
              <div className="space-y-6">
                {currentReports.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    {t("No reports available.")}
                  </p>
                ) : (
                  currentReports.map((report: unknown, index: Key) => (
                    <RepportCard report={report} key={index} />
                  ))
                )}
              </div>
            </section>

            {/* Pagination */}
            {data.length > postsPerPage && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPasts={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Rapport;
