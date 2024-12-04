import CategoryServices from "../services/CategoryServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useParams } from "react-router-dom";
import BlogThematiqueCard from "../components/blogs/BlogThematiqueCard";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";

const Thematiqueblog = () => {
  const { id } = useParams();
  const { lang } = useAuthContext();
  const { data, loading } = useAsync(() => CategoryServices.getblogCat(id), id);
  const { data: cat } = useAsync(() => CategoryServices.getOneCategory(id), id);
  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Category"} />
            <section className="mb-10 ">
              <header className="bg-principal dark:bg-slate-800 dark:text-white rounded-lg text-white py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                  <h1 className="text-4xl font-bold">
                    {showingTranslateValue(cat?.translations, lang)?.name}
                  </h1>
                </div>
              </header>
              {/* <SimpleBannerBlog img={Img1} /> */}
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentBlogs.map((item: any, index: number) => (
                      <BlogThematiqueCard cat={item} key={index} />
                    ))}
              </div>
            </section>
            <Pagination
              postsPerPage={postsPerPage}
              totalPasts={data.length}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Thematiqueblog;
