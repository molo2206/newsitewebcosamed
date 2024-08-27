import { useEffect, useState } from "react";
import { BASE_YOUTUBE } from "../utils/heleprs";
import CardVideo from "../components/cards/CardVideo";
import Pagination from "../components/Pagination/Pagination";
import SimpleBannerBlog from "../components/simpleBanner/SimpleBannerBlog";
import BlogServices from "../services/BlogsServices";
import useAsync from "../hooks/useAsync";
import BreadCumb from "../components/navbar/BreadCumb";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
const Videos = () => {
  const [allvideos, setAllvideos] = useState([]);
  const { data: lastblog, loading } = useAsync(() => BlogServices.lastBlog());
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

  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentVideos = allvideos.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="container dark:bg-slate-900 w-full dark:text-white ">
        <div>
          <BreadCumb title={"Vidéos"} />
          <section className="mb-10 ">
            {loading ? (
              Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
            ) : (
              <SimpleBannerBlog blog={lastblog} />
            )}
            <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
              Nos actualités
            </h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {loading
                ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                : currentVideos.map((item: any, index: number) => (
                    <CardVideo items={item} key={index} />
                  ))}
            </div>
          </section>
          <Pagination
            postsPerPage={postsPerPage}
            totalPasts={allvideos.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
};

export default Videos;
