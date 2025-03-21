import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import CommunicatedServices from "../services/CommunicatedServices";
import BlogServices from "../services/BlogsServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";

import {
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  FacebookShareButton,
} from "react-share";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";
import BlogLastCard from "../components/blogs/BlogLastCard";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import CategoryCard from "../components/blogs/CategoryCard";
import CategoryServices from "../services/CategoryServices";

const CommunicateDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { lang } = useAuthContext();
  const { data, error, loading } = useAsync(
    () => CommunicatedServices.oneCommunicate(id),
    id
  );
  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const { data: blog } = useAsync(() => BlogServices.getBlogHome());
  const urlShare = window.location.href;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlog = blog.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  return error ? (
    <Error404 />
  ) : (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white py-1 ">
          <div className="container">
            <div className=" pb-14 py-1">
              <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
                <div className="col-span-2 col-lg-8 col-md-8 px-4">
                  <div className="overflow-hidden">
                    <BreadCumb
                      title="Detail"
                      second={"/load-data/communicated"}
                      secondTitle={"Communicated"}
                    />
                    <h1 className=" text-2xl font-semibold mb-10 ">
                      {showingTranslateValue(data?.translations, lang)?.title}
                      <p className="border border-t-2 border-principal"></p>
                    </h1>
                    <img
                      src={data?.file}
                      alt=""
                      className="mx-auto w-full max-h-full
            object-contain transition duration-700 rounded-md"
                    />
                  </div>
                  <br />

                  <div
                    className="text-lg font-montserrat"
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.description,
                    }}
                  ></div>
                  <div className="">
                    <img
                      src={data?.author?.image}
                      className=" h-[70px] px-30 rounded-full duration-200 hover:scale-105"
                    />
                    <p className="text-xl font-bold ">
                      {data?.author?.full_name}
                    </p>
                  </div>
                  <div className="px-4 py-1  rounded-2xl">
                    <h1 className=" mb-3 text-justify text-1xl font-bold sm:text-left sm:text-2xl">
                      {t("Share_on")}
                    </h1>
                    <div className=" flex flex-col gap-3 ">
                      <div className="flex gap-3 mr-6 items-center">
                        <FacebookShareButton
                          url={"https://www.cosamed.org"}
                          title={data?.title}
                          hashtag="#camperstribe"
                        >
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={urlShare}>
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                        <LinkedinShareButton url={urlShare}>
                          <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                        <TelegramShareButton url={urlShare}>
                          <TelegramIcon size={32} round={true} />
                        </TelegramShareButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 md:col-lg-4 col-md-4 gap-3 px-4 mt-16 ">
                  <div className="p-4 shadow-2xl rounded-2xl border ">
                    <div className="overflow-hidden ">
                      <h1 className="text-principal text-2xl font-montserrat font-semibold items-center justify-center">
                        Categories
                      </h1>
                      <div className="right-bar">
                        <div className="right-bar-item category">
                          <div className="right-item-content text-slate-600 dark:text-slate-700  ">
                            {cat.map((item: any, index: number) => (
                              <a className="text-sm font-semibold ">
                                <CategoryCard cat={item} key={index} />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 shadow-2xl rounded-lg border mt-10">
                    <div className="overflow-hidden ">
                      <h1 className="text-principal text-2xl font-montserrat font-semibold items-center justify-center">
                        Publications recentes
                      </h1>
                      <div className="right-bar ">
                        {currentBlog.map((item: any, index: number) => (
                          <div className=" text-sm mt-10  ">
                            <BlogLastCard blog={item} key={index} />
                          </div>
                        ))}
                      </div>
                      <Pagination
                        postsPerPage={postsPerPage}
                        totalPasts={blog.length}
                        paginate={paginate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <p className=" border-t-2 border-gray-300/50 py-4 text-center"></p> */}
          {/* <Blogs /> */}
        </div>
      )}
    </>
  );
};

export default CommunicateDetail;
