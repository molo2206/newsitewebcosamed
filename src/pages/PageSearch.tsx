import { useTranslation } from "react-i18next";
import useAsync from "../hooks/useAsync";
import SearchServices from "../services/SearchServices";
import { useAuthContext } from "../context";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { showingTranslateValue } from "../utils/heleprs";
import CardSearch from "../components/cards/CardSearch";
import { count } from "console";
import CategoryServices from "../services/CategoryServices";
import CategoryCard from "../components/blogs/CategoryCard";

const PageSearch = () => {
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const [currentPage, setCurrentPage] = useState<any>(
    searchParams.get("page") || 1
  );
  const { t } = useTranslation();
  const { lang } = useAuthContext();

  const location = useLocation();
  const { data, loading } = useAsync(
    () =>
      SearchServices.create(
        {
          keyword: searchParams.get("q"),
          local: lang,
        },
        currentPage
      ),
    [location.key, currentPage]
  );
  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const fetchNextPrevTasks = (link: any) => {
    const url = new URL(link);
    navigation(
      `/search?q=${searchParams.get("q")}&page=${url.searchParams.get("page")}`
    );
    setCurrentPage(url.searchParams.get("page"));
  };
  const renderPaginationLinks = () => {
    return (
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <ul className=" flex relative ">
          {data?.links?.map((link: any, index: number) => (
            <li key={index}>
              <a
                onClick={() => fetchNextPrevTasks(link?.url)}
                aria-current="page"
                className={`cursor-pointer relative z-10 inline-flex items-center
                 ${
                   link?.active
                     ? "bg-principal text-white"
                     : "border-principal border-[1px] text-principal"
                 } px-4 py-2 text-sm font-semibold
                  focus:z-20 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-indigo-600 ${
                     !link?.url && "disabled"
                   }`}
              >
                {link.label
                  .replace("&laquo;", "")
                  .replace("Previous", "<<")
                  .replace("&raquo;", "")
                  .replace("Next", ">>")}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  return (
    <div className="container  dark:bg-slate-900 w-full dark:text-white">
      <div className=" px-4 lg:px-14 max-w-screen-2xl mx-auto my-8  py-20">
        <div className=" md:w-12/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="  ">
            <h2 className=" md:text-5xl sm:text-2xl text-principal text-neutralDGray font-bold mb-4 ">
              {/* {t("media")} */}
              Résultat de la recherche
            </h2>
          </div>
          <div className="">
            <p className=" md:text-3xl sm:text-xl">
              Votre recherche a généré
              <span className=" px-2 text-principal">{data?.total} résultat(s).</span>
            </p>
          </div>
        </div>
        <div className=" py-6">
          <div>
            {data?.data?.map((items: any) => (
              <CardSearch blog={items} />
            ))}
            <div className=" flex relative justify-center items-center">
              {renderPaginationLinks()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageSearch;
