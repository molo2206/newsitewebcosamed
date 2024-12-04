import CommunicatedServices from "../services/CommunicatedServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import CommunicateCard from "../components/blogs/CommunicateCard";
import { useTranslation } from "react-i18next";

const Communicates = () => {
  const { data, loading } = useAsync(() =>
    CommunicatedServices.getCommunicate()
  );

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
        <div className=" container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Communicated"} />
            <section className="mb-10 ">
              <header className="bg-principal dark:bg-slate-800 w-full dark:text-white rounded-lg text-white py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                  <h1 className="text-4xl font-bold">{t("How_comminicate")}</h1>
                </div>
              </header>
              
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentBlogs.map((item: any, index: number) => (
                      <CommunicateCard communicate={item} key={index} />
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

export default Communicates;
