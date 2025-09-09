import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../context";
import useValidation from "../hooks/useValidation";
import { ApplyForm } from "../types";
import ButtonSearch from "../components/form/ButtonSearch";
import InputSearchOffre from "../components/form/InputSearchOffre";
import { useState } from "react";
import useAsync from "../hooks/useAsync";
import SearchServices from "../services/SearchServices";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import CardSearch from "../components/cards/CardSearch";

const SearchResultsPage = () => {
  const { t } = useTranslation();
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
      `/search-results-page?q=${searchParams.get(
        "q"
      )}&page=${url.searchParams.get("page")}`
    );
    setCurrentPage(url.searchParams.get("page"));
  };

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({ keyword: "" });

  const validation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.keyword) {
      hanldeError("keyword is required", "keyword");
      return;
    }
    navigate("/search-results-page?q=" + inputs.keyword);
  };

  const renderPaginationLinks = () => (
    <nav className="mt-12 flex justify-center" aria-label="Pagination">
      <ul className="inline-flex flex-wrap gap-2">
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
                className={`px-4 py-2 text-sm md:text-base font-medium rounded-lg border transition-all duration-200
                ${
                  link?.active
                    ? "bg-principal text-white shadow-lg"
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
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100  max-w-7xl mx-auto p-6 mt-6">
      <BreadCumb title={t("Search")} />
      <div className=" mx-auto py-4">
        <div className=" dark:bg-slate-800 bg-white border-blue-900 dark:bg-slate-800 p-4 sm:p-6 mb-10">
          <form
            onSubmit={validation}
            className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto w-full"
          >
            <div className="flex-grow">
              <InputSearchOffre
                name="keyword"
                placeholder={t("Search")}
                type="text"
                errors={errors.keyword}
                value={inputs.keyword}
                onChange={(e: any) => handleOnChange(e.target.value, "keyword")}
              />
            </div>
            <ButtonSearch label={t("Search")} />
          </form>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-extrabold text-principal tracking-tight">
            Résultat de la recherche
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Votre recherche a généré
            <span className="text-principal font-bold px-2">
              {data?.total || 0} résultat(s)
            </span>
          </p>
        </div>

        <div className="grid gap-6 ">
          {loading ? (
            Array.from({ length: 10 }, (_, i) => <BlogCardLoand key={i} />)
          ) : data?.data?.length > 0 ? (
            data.data.map((item: any) => (
              <CardSearch blog={item} key={item.id} />
            ))
          ) : (
            <div className="text-center text-gray-600 text-base py-16">
              <p className="text-xl font-medium">Aucun résultat trouvé</p>
              <p className="mt-2 text-gray-500 text-sm">
                Essayez d’affiner votre mot-clé ou d’utiliser un terme
                différent.
              </p>
            </div>
          )}
        </div>

        {data?.links?.length > 3 && (
          <div className="flex justify-center">{renderPaginationLinks()}</div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
