import BlogCard from "../components/blogs/BlogCard";
import SimpleBannerBlog from "../components/simpleBanner/SimpleBannerBlog";
import BlogServices from "../services/BlogsServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoad from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  const { data: lastblog } = useAsync(() => BlogServices.lastBlog());
  const { t } = useTranslation();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = data?.slice(indexOfFirstPost, indexOfLastPost) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading && !data) {
    // Chargement global : placeholder
    return (
      <div className="container mx-auto py-8">
        <BlogDetailLoad />
      </div>
    );
  }

  return (
    <div className="container mx-auto dark:bg-slate-900 dark:text-white p-4">
      <BreadCumb title={"Blog"} />

      {/* Bannière principale du dernier article */}
      {lastblog && <SimpleBannerBlog blog={lastblog} />}

      <h1 className="my-8 border-l-8 border-blue-600 pl-4 text-center text-3xl font-bold">
        {t("How_blogs")}
      </h1>

      {/* Grille des articles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: postsPerPage }).map((_, i) => (
              <BlogCardLoad key={i} />
            ))
          : currentBlogs.map((blog: any) => (
              <BlogCard key={blog.id || blog.slug} blog={blog} />
            ))}
      </section>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          postsPerPage={postsPerPage}
          totalPasts={data?.length || 0}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Blog;
