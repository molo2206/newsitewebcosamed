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
    <div className="p-6 bg-white dark:bg-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[14px] font-bold">{t("News")}</h2>
        <div
          onClick={() => navigate("/data-loading/blogs")}
          className="text-sm text-principal font-medium cursor-pointer"
        >
          {t("All")} →
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 20 }).map((_, i) => (
                <BlogCardLoand key={i} />
              ))
            : data?.map((item: any, index: number) => (
                <BlogCard blog={item} key={index} />
              ))}
        </div>
      </div>
     
    </div>
  );
}
