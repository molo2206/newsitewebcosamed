import BlogCard from "./BlogCard";
import BlogCardLoand from "./BlogCardLoad";
import useAsync from "../../hooks/useAsync";
import BlogServices from "../../services/BlogsServices";
import { useTranslation } from "react-i18next";

export default function Blogs() {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => BlogServices.getBlogHome());

  return (
    <div className="p-6 bg-white dark:bg-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{t("News")}</h2>
        <a href="#" className="text-sm text-blue-700 font-medium">
          All →
        </a>
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
