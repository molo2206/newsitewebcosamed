import BlogCard from "./BlogCard";
import BlogCardLoand from "./BlogCardLoad";
import useAsync from "../../hooks/useAsync";
import BlogServices from "../../services/BlogsServices";
import { useTranslation } from "react-i18next";

const Blogs = () => {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => BlogServices.getBlogHome());

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-4 w-full dark:text-white">
      <div className="container mx-auto px-4">
        {/* <SimpleBannerBlog img={Img1} /> */}

        <h1 className="py-4 pl-2 text-left text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("News")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 20 }).map((_, i) => (
                <BlogCardLoand key={i} />
              ))
            : data?.map((item: any, index: number) => (
                <BlogCard blog={item} key={index} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
