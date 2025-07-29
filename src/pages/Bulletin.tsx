import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../context";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import Input from "../components/form/Input";
import InputBlog from "../components/form/InputBlog";
import BulletinCard from "../components/blogs/BulletinCard";
import BulletinLoad from "../components/blogs/BulletinLoad";
import useValidation from "../hooks/useValidation";
import { ApplyForm } from "../types";
import { Years, Type, Months } from "../utils/heleprs";
import useBulletinsByYear from "../hooks/useBulletinsByYear";

const Bulletin = () => {
  const { t } = useTranslation();
  const { lang } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
      keyword: "",
      year: "",
      type: "",
      month: "",
    });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const {
    bulletins: data,
    loading,
    error,
  } = useBulletinsByYear({
    year: inputs.year,
    month: inputs.month,
    locale: lang,
  });

  useEffect(() => {
    const match = Type.find((t) => `/${t.value}` === location.pathname);
    if (match && inputs.type !== match.value) {
      handleOnChange(match.value, "type");
    }
  }, [location.pathname]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBulletins = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const validation = (e: React.FormEvent) => {
    e.preventDefault();
    const keywordTrimmed = inputs.keyword?.trim();
    if (!keywordTrimmed) {
      hanldeError(t("keyword is required"), "keyword");
      return;
    }
    navigate("/search-results-page?q=" + encodeURIComponent(keywordTrimmed));
  };

  return (
    <div className="p-6 w-full min-h-screen dark:bg-slate-900 dark:text-white">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <BulletinLoad key={i} />
          ))}
        </div>
      ) : (
        <>
          <BreadCumb title={t("Bulletins")} />

          <section className="mb-10 mt-4">
            <h1 className="text-[16px] font-bold mb-2 text-principal">
              {t("How_news_letters")}
            </h1>
            <p className="text-gray-600 text-[12px] dark:text-gray-400 mb-6 max-w-3xl">
              {t(
                "If you cannot find a publication on our website, please search COSAMED's publications repository directly."
              )}
            </p>

            {/* Zone de filtrage */}
            <div className="bg-gray-100 p-2 rounded-lg shadow dark:bg-slate-800 mb-12">
              <form
                onSubmit={validation}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                <InputBlog
                  label={t("Select a year")}
                  type="select"
                  value={inputs.year}
                  errors={errors.year}
                  onFocus={() => hanldeError(null, "year")}
                  onChange={(e: any) => {
                    handleOnChange(e.target.value, "year");
                    setCurrentPage(1);
                  }}
                  options={Years}
                />

                <Input
                  label={t("Select a month")}
                  type="select"
                  value={inputs.month}
                  errors={errors.month}
                  onChange={(e: any) => {
                    handleOnChange(e.target.value, "month");
                    setCurrentPage(1);
                  }}
                  options={Months}
                />

                <Input
                  label={t("Select publication type")}
                  type="select"
                  value={inputs.type}
                  errors={errors.type}
                  options={Type}
                  onChange={(e: any) => {
                    const selectedType = e.target.value;
                    handleOnChange(selectedType, "type");
                    if (selectedType) {
                      navigate(`/${selectedType}`);
                    }
                  }}
                />

                <Input
                  label={t("Search")}
                  name="keyword"
                  placeholder={t("Search")}
                  type="text"
                  value={inputs.keyword}
                  errors={errors.keyword}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "keyword")
                  }
                />
              </form>
            </div>

            {error && (
              <p className="text-red-500 mb-4">{t("Error_loading_data")}</p>
            )}

            {/* Résumé des filtres actifs */}
            {(inputs.year || inputs.month) && (
              <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">
                {t("Showing results for")}{" "}
                <span className="font-semibold">
                  {inputs.month && `${t(inputs.month)}, `}
                  {inputs.year}
                </span>
              </p>
            )}

            {/* Résultats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {currentBulletins.length === 0 ? (
                <p className="text-gray-500 text-center col-span-4">
                  {t("No bulletins found.")}
                </p>
              ) : (
                currentBulletins.map((item: any, index: number) => (
                  <BulletinCard bulletin={item} key={item.id ?? index} />
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
  );
};

export default Bulletin;
