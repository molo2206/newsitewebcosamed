import EventsServices from "../services/EventsServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import EventCard from "../components/blogs/EventCard";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";

const Evements = () => {
  const { data, loading } = useAsync(() => EventsServices.getEvent());

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {Array.from(Array(20).keys()).map((_, key) => (
              <BlogDetailLoad key={key} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <BreadCumb title={"Liste des Événements"} />

            <section className="mb-10">
              <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
                <h1 className="text-[14px] font-bold uppercase tracking-widest">
                  Découvrez tous les événements à venir et réservez votre place
                  dès maintenant.
                </h1>
              </section>

              {/* Event List */}
              <div className="bg-white dark:bg-slate-800 shadow-lg border dark:border-slate-700 rounded-md p-4">
                {currentBlogs.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Aucun événement trouvé
                  </p>
                ) : (
                  <div className="space-y-6">
                    {currentBlogs.map((item: any, index: number) => (
                      <EventCard event={item} key={index} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {data.length > postsPerPage && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPasts={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Evements;
