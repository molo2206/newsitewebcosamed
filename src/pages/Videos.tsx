import { useEffect, useState } from "react";
import { BASE_YOUTUBE } from "../utils/heleprs";
import CardVideo from "../components/cards/CardVideo";
import Pagination from "../components/Pagination/Pagination";
import BreadCumb from "../components/navbar/BreadCumb";
import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import BlogCardLoand from "../components/blogs/BlogCardLoad";

const Videos = () => {
  const [allvideos, setAllvideos] = useState([]);
  const { data: lastblog, loading } = useAsync(() => BlogServices.lastBlog());
  console.log(lastblog)

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
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 dark:bg-slate-900 w-full dark:text-white min-h-screen">
      <BreadCumb title={"Vidéos"} />

      <section className="mb-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <BlogCardLoand key={i} />
            ))}
          </div>
        ) : (
          <>
            <h1 className="mb-8 py-2 text-center text-3xl font-bold dark:text-white text-black">
              Nos vidéos
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentVideos.map((item: any, index: number) => (
                <CardVideo items={item} key={index} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Pagination
                postsPerPage={postsPerPage}
                totalPasts={allvideos.length}
                paginate={paginate}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Videos;
