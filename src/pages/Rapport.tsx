import BulletinLoad from "../components/blogs/BulletinLoad";
import RapportServices from "../services/RapportServices";
import useAsync from "../hooks/useAsync";
import BreadCumb from "../components/navbar/BreadCumb";
import { Key, useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import RepportCard from "../components/blogs/RepportCard";
const Rapport = () => {
  const { data, loading } = useAsync(() => RapportServices.getRapport());

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBulletins = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const { t } = useTranslation();

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BulletinLoad />)
      ) : (
        <div className="p-6 dark:bg-slate-900 w-full  ">
          <BreadCumb title={t("Reports")} />
          <section className="mb-10">
            <header className="bg-principal dark:bg-slate-800 w-full dark:text-white rounded-md text-white py-10">
              <div className="mx-auto px-4 text-center">
                <h1 className="text-[16px] font-bold">{t("How_report")}</h1>
              </div>
            </header>
            <main className="py-8">
              <section className="mb-10 dark:bg-slate-900 w-full dark:text-white">
                <h2 className="text-[16px] font-bold text-gray-800 mb-4 d w-full dark:text-white">
                  Introduction
                </h2>
                <p className="text-gray-600 dark:text-white text-[13px]">
                  Les urgences sanitaires nécessitent des réponses rapides et
                  coordonnées. Nos rapports fournissent des informations clés
                  pour comprendre les défis et proposer des solutions efficaces.
                  Vous trouverez ici une sélection de nos dernières
                  publications.
                </p>
              </section>

              {/* Reports Section */}
              <section className="bg-white dark:bg-slate-800 p-6 border dark:border-slate-700 shadow-md">
                <h2 className="text-[16px] font-bold text-gray-800 mb-6 dark:text-white">
                  Rapports récents
                </h2>
                <div className="space-y-6 ">
                  {currentBulletins.map(
                    (report: unknown, index: Key | null | undefined) => (
                      <RepportCard report={report} key={index} />
                    )
                  )}
                </div>
              </section>
            </main>
          </section>
          <Pagination
            postsPerPage={postsPerPage}
            totalPasts={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default Rapport;
