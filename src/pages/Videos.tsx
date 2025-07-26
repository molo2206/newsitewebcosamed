import { useEffect, useState } from "react";
import { BASE_YOUTUBE } from "../utils/heleprs";
import CardVideo from "../components/cards/CardVideo";
import Pagination from "../components/Pagination/Pagination";
import BreadCumb from "../components/navbar/BreadCumb";
import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import BlogCardLoand from "../components/blogs/BlogCardLoad";

const Videos = () => {
  const { data: lastblog, loading } = useAsync(() => BlogServices.lastBlog());
  console.log(lastblog);
  const [allvideos, setAllvideos] = useState([]);

  useEffect(() => {
    fetch(BASE_YOUTUBE)
      .then((response) => response.json())
      .then((resJson) => {
        const result = resJson.items.map((doc: any) => ({
          ...doc,
          VideoLink: "https://www.youtube.com/embed/" + doc.id.videoId,
        }));
        setAllvideos(result);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentVideos = allvideos.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 dark:bg-slate-900 w-full dark:text-white min-h-screen">
      <BreadCumb title="Vidéos" />

      <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
        <h1 className="text-[16px] font-bold uppercase tracking-widest">
          Nos vidéos
        </h1>
      </section>
      <section className="mb-10 mt-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <BlogCardLoand key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentVideos.map((item: any, index: number) => (
                <CardVideo items={item} key={index} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Pagination
                postsPerPage={postsPerPage}
                totalPasts={allvideos.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Videos;
