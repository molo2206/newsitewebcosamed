import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import BlogCard from "../components/blogs/BlogCard";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import Input from "../components/form/Input";
import CategoryServices from "../services/CategoryServices";
import { showingTranslateValue, Type, Years } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useValidation from "../hooks/useValidation";
import { ApplyForm } from "../types";
export default function Blog() {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlog = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const { lang } = useAuthContext();

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
  return (
    <div className=" mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Publications</h1>
      <p className="text-gray-600 mb-6">
        If you cannot find a publication on our website, please search COSAMED's
        publications repository directly.
      </p>

      <div className="bg-gray-100 p-6 dark:bg-slate-800 mb-12">
        <form
          onSubmit={validation}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <Input
            required
            label="Select health topic"
            type="select"
            errors=""
            value=""
            options={cat?.map((item: any) => ({
              label: showingTranslateValue(item?.translations, lang)?.name,
              value: item.id,
            }))}
          />

          <Input
            required
            label="Select a year"
            type="select"
            errors=""
            value=""
            options={Years?.map((item: any) => ({
              label: item.label,
              value: item.value,
            }))}
          />
          <Input
            required
            label="Select publication type"
            type="select"
            errors=""
            value=""
            options={Type?.map((item: any) => ({
              label: item.label,
              value: item.value,
            }))}
          />
          <Input
            label={t("Search")}
            name="keyword"
            placeholder={t("Search")}
            type="text"
            errors={errors.keyword}
            value={inputs.keyword}
            onChange={(e: any) => handleOnChange(e.target.value, "keyword")}
          />
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => <BlogCardLoand key={i} />)
          : currentBlog?.map((item: any, index: number) => (
              <BlogCard blog={item} key={index} />
            ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPasts={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
