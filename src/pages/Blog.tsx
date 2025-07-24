import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAsync from "../hooks/useAsync";
import useValidation from "../hooks/useValidation";
import BlogServices from "../services/BlogsServices";
import CategoryServices from "../services/CategoryServices";
import BlogCard from "../components/blogs/BlogCard";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import Pagination from "../components/Pagination/Pagination";
import Input from "../components/form/Input";
import InputBlog from "../components/form/InputBlog";
import { ApplyForm } from "../types";
import { showingTranslateValue, Type, Years } from "../utils/heleprs";
import { useAuthContext } from "../context";
import useBlogsByYear from "../hooks/useBlogsByYear";

export default function Blog() {
  const { data: allBlogs = [], loading: loadingAll } = useAsync(() =>
    BlogServices.getBlog()
  );
  const { data: categories } = useAsync(() => CategoryServices.getCategory());

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useAuthContext();

  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "";

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
      keyword: "",
      year: "",
      category: "",
      type: "",
    });

  const { blogs: filteredBlogs, loading: loadingYear } = useBlogsByYear({
    year: inputs.year || "",
    category: inputs.category || "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filtered = inputs.year || inputs.category ? filteredBlogs : allBlogs;
  const currentBlogs = filtered.slice(indexOfFirstPost, indexOfLastPost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const keyword = inputs.keyword?.trim();
    if (!keyword) {
      hanldeError(t("Keyword is required"), "keyword");
      return;
    }
    navigate("/search-results-page?q=" + encodeURIComponent(keyword));
  };

  const paginate = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // Synchronisation avec l'URL si /article, /report, etc.
  useEffect(() => {
    const typeInPath = Type.find((t) => `/${t.value}` === location.pathname);
    if (typeInPath && inputs.type !== typeInPath.value) {
      handleOnChange(typeInPath.value, "type");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (initialType) {
      handleOnChange(initialType, "type");
    }
  }, [initialType]);

  return (
    <div className="min-h-screen mx-auto p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-2 text-principal">
        {t("Publications")}
      </h1>
      <p className="text-gray-600 mb-6 dark:text-gray-400 max-w-3xl">
        Use filters to find relevant publications across COSAMED topics
      </p>

      {/* Zone de filtrage */}
      <div className="bg-gray-100 p-6 dark:bg-slate-800 mb-12 rounded-lg shadow">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <Input
            label={t("Select health topic")}
            type="select"
            value={inputs.category}
            errors={errors.category}
            options={categories?.map((item: any) => ({
              label: showingTranslateValue(item?.translations, lang)?.name,
              value: item.id,
            }))}
            onChange={(e: any) => {
              handleOnChange(e.target.value, "category");
              setCurrentPage(1);
            }}
          />

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
            options={Years.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />

          <Input
            label={t("Select publication type")}
            type="select"
            value={inputs.type}
            errors={errors.type}
            options={Type.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            onChange={(e: any) => {
              const selectedType = e.target.value;
              handleOnChange(selectedType, "type");
              if (selectedType) navigate(`/${selectedType}`);
            }}
          />

          <Input
            label={t("Search")}
            name="keyword"
            placeholder={t("Search")}
            type="text"
            value={inputs.keyword}
            errors={errors.keyword}
            onChange={(e: any) => handleOnChange(e.target.value, "keyword")}
          />
        </form>
      </div>

      {/* Résultat */}
      {!loadingAll && !loadingYear && currentBlogs.length > 0 && (
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {inputs.year || inputs.category
            ? `${t("Filtered publications")}${
                inputs.year ? ` (${inputs.year})` : ""
              }`
            : t("All publications")}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loadingAll || loadingYear
          ? Array.from({ length: postsPerPage }).map((_, i) => (
              <BlogCardLoand key={i} />
            ))
          : currentBlogs.map((item: any, index: number) => (
              <BlogCard blog={item} key={item.id ?? index} />
            ))}
      </div>

      {!loadingAll && !loadingYear && currentBlogs.length === 0 && (
        <p className="text-gray-500 text-center mt-8 text-base">
          {inputs.year || inputs.category
            ? t("No data found for selected filters")
            : t("No publications available yet")}
        </p>
      )}

      {!loadingAll && !loadingYear && filtered.length > postsPerPage && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPasts={filtered.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
