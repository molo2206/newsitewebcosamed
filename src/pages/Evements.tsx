import EventsServices from "../services/EventsServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import EventCard from "../components/blogs/EventCard";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";

const Evements = () => {
  const { data, loading } = useAsync(() => EventsServices.getEvent());
  console.log(data);

  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="p-6">
          <div className=" bg-white dark:bg-slate-900 dark:text-white">
            {/* Header */}
            <BreadCumb title={"Liste des Événements"} />
            <section className="mb-10  ">
              <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
                <h1 className="text-[14px] font-bold uppercase tracking-widest">
                  Découvrez tous les événements à venir et réservez votre place
                  dès maintenant.
                </h1>
              </section>
              <div className="mt-6 ">
                {/* Event List */}
                <div className="bg-white  shadow-lg border dark:border-slate-700 dark:bg-slate-800 dark:text-white ">
                  <div className="space-y-">
                    {loading
                      ? Array.from(Array(20).keys()).map(() => (
                          <BlogCardLoand />
                        ))
                      : currentBlogs.map((item: any, index: number) => (
                          <EventCard event={item} key={index} />
                        ))}
                  </div>
                </div>
              </div>
            </section>
            <Pagination
              postsPerPage={postsPerPage}
              totalPasts={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Evements;
