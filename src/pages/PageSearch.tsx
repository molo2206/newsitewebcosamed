import useAsync from "../hooks/useAsync";
import SearchServices from "../services/SearchServices";
import { useAuthContext } from "../context";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import CardSearch from "../components/cards/CardSearch";
import BreadCumb from "../components/navbar/BreadCumb";
import SearchResultsSkeleton from "../components/hero/SearchResultsSkeleton";

const PageSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<any>(
    searchParams.get("page") || 1
  );
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

  const fetchNextPrevTasks = (link: any) => {
    const url = new URL(link);
    navigate(
      `/search?q=${searchParams.get("q")}&page=${url.searchParams.get("page")}`
    );
    setCurrentPage(url.searchParams.get("page"));
  };

  const renderPaginationLinks = () => (
    <nav className="mt-10 flex justify-center" aria-label="Pagination">
      <ul className="inline-flex flex-wrap items-center gap-2">
        {data?.links?.map((link: any, index: number) => {
          const label = link.label
            .replace("&laquo;", "")
            .replace("Previous", "← Précédent")
            .replace("&raquo;", "")
            .replace("Next", "Suivant →");

          return (
            <li key={index}>
              <button
                onClick={() => link?.url && fetchNextPrevTasks(link.url)}
                disabled={!link?.url}
                className={`px-4 py-2 text-sm md:text-base font-medium rounded-md border transition-all duration-200
                ${
                  link?.active
                    ? "bg-principal text-white shadow-md"
                    : "border-gray-300 text-principal hover:bg-principal/10 hover:text-principal"
                }
                disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span dangerouslySetInnerHTML={{ __html: label }} />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 dark:bg-slate-900 dark:text-white">
      <BreadCumb title={"Resultat"} />
      <div className="mx-auto py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-principal">
            Résultat de la recherche
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Votre recherche a généré
            <span className="text-principal font-semibold px-2">
              {data?.total} résultat(s)
            </span>
          </p>
        </div>

        {/* Résultats */}
        <div className="flex flex-col gap-4 container">
          {loading
            ? Array.from({ length: 10 }, (_, i) => <SearchResultsSkeleton key={i} />)
            : data?.data?.map((item: any) => (
                <CardSearch blog={item} key={item.id} />
              ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center">
          {renderPaginationLinks()}
        </div>
      </div>
    </div>
  );
};

export default PageSearch;
