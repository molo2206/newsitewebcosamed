import BlogCard from "./BlogCard";
import BlogCardLoand from "./BlogCardLoad";
import useAsync from "../../hooks/useAsync";
import BlogServices from "../../services/BlogsServices";
import { useTranslation } from "react-i18next";
const Blogs = () => {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => BlogServices.getBlogHome());
  return (
    <div className=" dark:bg-slate-900 w-full dark:text-white py-8">
      <div >
        <section className="container py-2 dark:bg-slate-800  ">
          {/* <SimpleBannerBlog img={Img1} /> */}
          <h1 className="py-2 pl-2 text-left lg:text-xl md:text-xl font-extrabold">
            {t('News')}
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-3">
            {loading
              ? Array.from(Array(20).keys()).map(() => (
                  <BlogCardLoand />
                ))
              : data.map((item: any, index: number) => (
                  <BlogCard blog={item} key={index} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
