import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import SimpleBannerTransparence from "../components/simpleBanner/SimpleBannerTransparence";
import FinancesServices from "../services/FinancesServices";

const TransparenceFin = () => {
  const { data, loading } = useAsync(() => FinancesServices.getFinance());
  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFinance = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const { t } = useTranslation();

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="p-6 dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={t("Financial_transparency")} />
            <section className="mb-10">
              <SimpleBannerTransparence />
              <h1 className=" mb-8 py-2 pl-2 text-center text-xl font-bold">
                {t("Find_out_how_we_use")}
              </h1>
              <h1 className=" mb-8  pl-2 text-center text-sm">
                {t("We_believe_in_management")}
              </h1>
              <section className="w-full  bg-white shadow p-6  dark:border-slate-50  border dark:bg-slate-900">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 bg-white dark:bg-slate-800 dark:text-white">
                  {t("Financial_Report")}
                </h3>
                <table className="w-full text-left border-collapse">
                  <thead className="">
                    <tr className="bg-gray-200 dark:bg-slate-900 dark:text-slate-50">
                      <th className="py-2 px-4 border-b">{t("Year")}</th>
                      <th className="py-2 px-4 border-b">{t("Funder")}</th>
                      <th className="py-2 px-4 border-b">{t("Funding")}</th>
                      <th className="py-2 px-4 border-b">{t("Project")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? Array.from(Array(20).keys()).map(() => (
                          <BlogCardLoand />
                        ))
                      : currentFinance.map((finance: any, index: number) => (
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
                        ))}
                  </tbody>
                </table>
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
