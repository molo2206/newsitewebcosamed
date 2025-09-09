import BlogCard from "./BlogCard"; 
import BlogCardLoand from "./BlogCardLoad";
import useAsync from "../../hooks/useAsync";
import BlogServices from "../../services/BlogsServices";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => BlogServices.getBlogHome());
  const navigate = useNavigate();

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 sm:mb-0">
            {t("News")}
          </h2>
          <div
            onClick={() => navigate("/data-loading/blogs")}
            className="text-sm text-principal font-medium cursor-pointer hover:underline"
          >
            {t("All")} →
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <BlogCardLoand key={i} />
              ))
            : data?.map((item: any, index: number) => (
                <BlogCard blog={item} key={index} />
              ))}
        </div>
      </div>
    </section>
  );
}
