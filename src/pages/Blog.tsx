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
  const { lang } = useAuthContext();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "";

  useEffect(() => {
    if (initialType) {
      handleOnChange(initialType, "type");
    }
  }, [initialType]);

  useEffect(() => {
    const match = Type.find((t) => `/${t.value}` === location.pathname);
    if (match && inputs.type !== match.value) {
      handleOnChange(match.value, "type");
    }
  }, [location.pathname]);

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
      keyword: "",
      year: "",
      category: "",
    });

  // Utilisation du hook avec année et catégorie
  const { blogs: filteredBlogs, loading: loadingYear } = useBlogsByYear({
    year: inputs.year || "",
    category: inputs.category || "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 12;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Si filtre année ou catégorie, on utilise les blogs filtrés, sinon tous
  const safeBlogs = inputs.year || inputs.category ? filteredBlogs : allBlogs;

  const currentBlogs = safeBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (page: number) => setCurrentPage(page);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const keyword = inputs.keyword?.trim();
    if (!keyword) {
      hanldeError(t("Keyword is required"), "keyword");
      return;
    }
    navigate("/search-results-page?q=" + encodeURIComponent(keyword));
  };

  return (
    <div className="min-h-screen mx-auto p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-2">Publications</h1>
      <p className="text-gray-600 mb-6 dark:text-gray-400">
        If you cannot find a publication on our website, please search COSAMED's
        publications repository directly.
      </p>

      <div className="bg-gray-100 p-6 dark:bg-slate-800 mb-12 rounded-lg shadow">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <Input
            label="Select health topic"
            type="select"
            value={inputs.category}
            errors={errors.category}
            options={categories?.map((item: any) => ({
              label: showingTranslateValue(item?.translations, lang)?.name,
              value: item.id,
            }))}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleOnChange(e.target.value, "category");
              setCurrentPage(1);
            }}
          />

          <InputBlog
            label="Select a year"
            type="select"
            value={inputs.year}
            errors={errors.year}
            onFocus={() => hanldeError(null, "year")}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleOnChange(e.target.value, "year");
              setCurrentPage(1);
            }}
            options={Years.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />

          <Input
            label="Select publication type"
            type="select"
            value={inputs.type}
            errors={errors.type}
            options={Type.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e.target.value, "keyword")
            }
          />
        </form>
      </div>

      {!loadingAll && !loadingYear && currentBlogs.length > 0 && (
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-400 mb-4">
          {inputs.year || inputs.category
            ? `Publications filtrées${
                inputs.year ? ` pour l'année ${inputs.year}` : ""
              }${inputs.category ? ` et la catégorie sélectionnée` : ""}`
            : "Toutes les publications"}
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
        <p className="text-gray-500 text-center col-span-4 mt-6">
          {inputs.year || inputs.category
            ? `Aucune donnée trouvée${
                inputs.year ? ` pour l'année ${inputs.year}` : ""
              }${inputs.category ? ` et la catégorie sélectionnée` : ""}.`
            : "Aucune donnée disponible pour le moment."}
        </p>
      )}

      {/* Pagination */}
      {!loadingAll && !loadingYear && safeBlogs.length > postsPerPage && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPasts={safeBlogs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
