import BlogCard from "../components/blogs/BlogCard";
import SimpleBannerBlog from "../components/simpleBanner/SimpleBannerBlog";
import BlogServices from "../services/BlogsServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  const { data: lastblog } = useAsync(() => BlogServices.lastBlog());

  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const { t } = useTranslation();
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container  dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Blog"} />
            <section className="mb-10 ">
              <SimpleBannerBlog blog={lastblog} />
              <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
                {t("How_blogs")}
              </h1>
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentBlogs.map((item: any, index: number) => (
                      <BlogCard blog={item} key={index} />
                    ))}
              </div>
              <Pagination
              postsPerPage={postsPerPage}
              totalPasts={data.length}
              paginate={paginate}
            />
            </section>
           
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
