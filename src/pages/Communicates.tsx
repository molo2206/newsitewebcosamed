
import CommunicatedServices from "../services/CommunicatedServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import CommunicateCard from "../components/blogs/CommunicateCard";
import SimpleBannerCommunicated from "../components/simpleBanner/SimpleBannerCommunicated";


const Communicates = () => {
  const { data, loading } = useAsync(() => CommunicatedServices.getCommunicate());
  const { data:lastCom} = useAsync(() =>CommunicatedServices.getLastCommunicate());

  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Communicated"} />
            <section className="mb-10 ">
              <SimpleBannerCommunicated commun={lastCom} />
              <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
                Nos communiqués de presse
              </h1>
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentBlogs.map((item: any, index: number) => (
                      <CommunicateCard communicate={item} key={index} />
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

export default Communicates;
