import { useEffect, useState } from "react";
import { BASE_YOUTUBE } from "../utils/heleprs";
import CardVideo from "../components/cards/CardVideo";
import Pagination from "../components/Pagination/Pagination";
import BreadCumb from "../components/navbar/BreadCumb";
import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import VideoCardSkeleton from "../components/blogs/VideoCardSkeleton";

const Videos = () => {
  const { data:  loading } = useAsync(() => BlogServices.lastBlog());
  const [allvideos, setAllvideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentVideos = allvideos.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Fil d’Ariane */}
        <BreadCumb title="Vidéos" />

        {/* Titre section */}
        <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md transition-colors duration-300">
          <h1 className="text-[16px] font-bold uppercase tracking-widest">
            Nos vidéos
          </h1>
        </section>

        {/* Liste vidéos */}
        <section className="mb-10 mt-6">
          {loading || allvideos.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <VideoCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentVideos.map((item, index) => (
                  <CardVideo items={item} key={index} />
                ))}
              </div>

              {/* Pagination */}
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
    </div>
  );
};

export default Videos;
