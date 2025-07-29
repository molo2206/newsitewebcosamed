import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAsync from "../hooks/useAsync";
import BlogCardLoad from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import SimpleBannerTransparence from "../components/simpleBanner/SimpleBannerTransparence";
import FinancesServices from "../services/FinancesServices";

const TransparenceFin = () => {
  const { t } = useTranslation();
  const { data = [], loading } = useAsync(() => FinancesServices.getFinance());
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFinance = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        Array.from({ length: 20 }).map((_, idx) => <BlogDetailLoad key={idx} />)
      ) : (
        <div className="p-6 dark:bg-slate-900 w-full dark:text-white">
          <div>
            <BreadCumb title={t("Financial_transparency")} />
            <section className="mb-10">
              <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
                <h1 className="text-[16px] font-bold uppercase tracking-widest">
                  {t("Financial_transparency")}
                </h1>
              </section>
              <h1 className="mb-8 py-2 pl-2 text-center text-[15px] font-semibold text-principal">
                {t("Find_out_how_we_use")}
              </h1>
              <section className="w-full bg-white shadow p-6 dark:border-slate-50 dark:border dark:bg-gray-900">
                <h3 className="text-[14px] font-semibold text-gray-700 mb-4 bg-white dark:bg-slate-800 dark:text-white">
                  {t("Financial_Report")}
                </h3>
                <table className="w-full text-left border-gray-800 ">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-slate-900 dark:text-slate-50 text-[12px]">
                      <th className="py-2 px-4 border-b">{t("Year")}</th>
                      <th className="py-2 px-4 border-b">{t("Funder")}</th>
                      <th className="py-2 px-4 border-b">{t("Funding")}</th>
                      <th className="py-2 px-4 border-b">{t("Project")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFinance.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center text-[12px] py-4"
                        >
                          {t("No_data_available")}
                        </td>
                      </tr>
                    ) : (
                      currentFinance.map((finance: any, index: number) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-gray-100 dark:bg-slate-800 dark:text-white"
                              : ""
                          }
                        >
                          <td className="py-2 px-4 border-b">
                            {finance?.year}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {finance?.bailleur}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {finance?.financement}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {finance?.projet}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {loading
                  ? Array.from({ length: 20 }).map((_, idx) => (
                      <BlogCardLoad key={idx} />
                    ))
                  : null}
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPasts={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </section>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default TransparenceFin;
