import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import ProjectServices from "../services/ProjectServices";
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

const DetailProject = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { lang } = useAuthContext();
  const { data, error, loading } = useAsync(
    () => ProjectServices.oneProject(id),
    id
  );
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
                      secondTitle={t("Reports")}
                    />
                    <h1 className=" text-4xl font-semibold mb-10 ">
                      Projet :{" "}
                      {showingTranslateValue(data?.translations, lang)?.title}
                    </h1>
                    <div className=" flex justify-between space-x-4 py-2 text-slate-600">
                      <p className="bg-principal hover:bg-hover rounded-md px-4 py-1 text-white ">
                        Début projet: {data?.datestarted}
                      </p>
                      <p className="bg-principal hover:bg-hover rounded-md px-4 py-1 text-white ">
                        Fin projet {data?.dateend}
                      </p>
                    </div>
                    <div className=" object-contain bg-slate-200 items-stretch justify-items-stretch">
                      <img
                        src={data?.image}
                        alt=""
                        className="mx-auto w-full h-[460px]
              object-contain transition duration-700 rounded-2xl"
                      />
                    </div>
                  </div>
                  <br />
                  <div
                    className="text-lg font-montserrat"
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.description,
                    }}
                  ></div>
                  <div>
                    <h3 className="font-montserrat text-lg">
                      {t("PressButton")}
                    </h3>

                    <a
                      className="py-2 text-lg rounded-md w-full text-white cursor-pointer
   bg-principal px-3"
                      href={data?.file}
                      target="_blank"
                      role="noreferrer"
                      download={
                        data?.file
                          ?.split("https://apicosamed.cosamed.org/")[1]
                          ?.split("/")[3]
                      }
                    >
                      {t("Download")}
                    </a>
                  </div>

                  <div className="py-8">
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
                <div className="col-span-1 md:col-lg-4 col-md-4 gap-3 px-4 ">
                  <div className="p-4 shadow-2xl rounded-2xl">
                    <div className="overflow-hidden">
                      <h1 className="text-principal text-2xl font-montserrat font-semibold items-center justify-center">
                        Actualités
                      </h1>
                      <div className="right-bar">
                        {currentBlog.map((item: any, index: number) => (
                          <div className=" text-sm ">
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

export default DetailProject;
