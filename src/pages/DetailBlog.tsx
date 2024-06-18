import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import CategoryServices from "../services/CategoryServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import Blogs from "../components/blogs/Blogs";
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
import CategoryCard from "../components/blogs/CategoryCard";
import BlogLastCard from "../components/blogs/BlogLastCard";

import HelmetMetaData from "../components/Seo";

const DetailBlog = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { lang } = useAuthContext();
  const { data, error, loading } = useAsync(
    () => BlogServices.oneBlogs(slug),
    slug
  );
  const { data: blog } = useAsync(() => BlogServices.getBlogHome());
  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const urlShare = window.location.href;
  return error ? (
    <Error404 />
  ) : (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white py-1 ">
          {/* <Seo
            title={showingTranslateValue(data?.translations, lang)?.title}
            image={data?.image}
            description={
              showingTranslateValue(data?.translations, lang)?.description
            }
          /> */}
          {/* <HelmetMetaData></HelmetMetaData> */}
          <div className="container">
            <div className=" pb-14 py-1">
              <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 row">
                <div className="col-span-2 col-lg-8 col-md-8 px-4">
                  <div className="overflow-hidden">
                    <BreadCumb
                      title="Detail blog"
                      second={"/data-loading/blogs"}
                      secondTitle={"Blog"}
                    />
                    <img
                      src={data?.image}
                      alt=""
                      className="mx-auto w-full 
            object-cover transition duration-700 rounded-2xl"
                    />
                  </div>
                  <p
                    className="  font-montserrat text-lg"
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.documentation,
                    }}
                  ></p>
                  <br />
                  <h1 className=" text-2xl font-semibold mb-10 ">
                    {showingTranslateValue(data?.translations, lang)?.title}
                    <p className="border border-t-2 border-principal"></p>
                  </h1>
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
                        {/* <a
                          onClick={() => share_facebook(urlShare)}
                          className="duration-200 hover:scale-105"
                        >
                          <FacebookIcon size={32} round={true} />
                        </a> */}
                        {/* <a onClick={() => share_whatsapp(urlShare)}>
                          <WhatsappIcon size={32} round={true} />
                        </a> */}
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
                  <form className="mt-8 space-y-6 mb-8">
                    <div className="space-y-px rounded-md items-center">
                      <div className="blog-search-content">
                        <div className="border-slate-300 border border-sm dark:border-slate-700 search-box">
                          <input placeholder="Search" type="search" />
                          <button>
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="p-4 shadow-2xl rounded-2xl">
                    <div className="overflow-hidden">
                      <h1 className="text-principal text-2xl font-montserrat font-semibold items-center justify-center">
                        Categories
                      </h1>
                      <div className="right-bar">
                        <div className="right-bar-item category">
                          <div className="right-item-content text-slate-600 dark:text-slate-700  ">
                            {cat.map((item: any, index: number) => (
                              <a href="#" className="right-item-title">
                                <CategoryCard cat={item} key={index} />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 shadow-2xl rounded-2xl">
                    <div className="overflow-hidden">
                      <h1 className="text-principal text-2xl font-montserrat font-semibold items-center justify-center">
                        Popular Posts
                      </h1>
                      <div className="right-bar">
                        {blog.map((item: any, index: number) => (
                          <div className="right-bar-item">
                            <BlogLastCard blog={item} key={index} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <p className=" border-t-2 border-gray-300/50 py-4 text-center"></p> */}
          <Blogs />
        </div>
      )}
    </>
  );
};

export default DetailBlog;
