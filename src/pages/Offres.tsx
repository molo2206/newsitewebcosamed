import SimpleBannerOffre from "../components/simpleBanner/SimpleBannerOffre";
import OffresServices from "../services/OffresServices";
import useAsync from "../hooks/useAsync";
import OffresCard from "../components/blogs/OffresCard";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";
const Offres = () => {
  const { data, loading } = useAsync(() => OffresServices.getOffres());
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOffres = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Offres"} />
            <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-xl font-bold">
              Offres disponibles
            </h1>
            <section className="mb-10 ">
              <SimpleBannerOffre />
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentOffres.map((item: any, index: number) => (
                      <OffresCard offre={item} key={index} />
                    ))}
              </div>
            </section>
            <Pagination postsPerPage={postsPerPage} totalPasts={data.length} paginate={paginate} />
          </div>
        </div>
      )}
    </>
  );
};

export default Offres;
