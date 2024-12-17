import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import CategoryServices from "../services/CategoryServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import usePageSEO from "../components/Seo/usePageSEO";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";
import CategoryCard from "../components/blogs/CategoryCard";
import { ImageBlogs } from "../components/blogs/ImageBlogs";
import Seo from "../components/Seo/Seo";
import { useTranslation } from "react-i18next";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogCard from "../components/blogs/BlogCard";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";

const DetailBlog = () => {
  const { slug } = useParams();
  const { lang } = useAuthContext();
  const { data, error, loading } = useAsync(
    () => BlogServices.oneBlogs(slug),
    slug
  );
  const { data: recentPost, loading: load } = useAsync(() =>
    BlogServices.getBlogHome()
  );

  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  usePageSEO({
    title: showingTranslateValue(data?.translations, lang)?.title,
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Detail blog",
    ogDescription: showingTranslateValue(data?.translations, lang)?.description,
    ogImage: data?.image,
    ogUrl: window.location.href,
  });
  Seo({
    title: data,
  });
  const { t } = useTranslation();
  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = recentPost.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return error ? (
    <Error404 />
  ) : (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container w-full dark:text-white py-1 mt-10 ">
          {/* Blog Content */}
          <BreadCumb
            title="Detail blog"
            second={"/data-loading/blogs"}
            secondTitle={"Blog"}
          />
          {/* <div className="bg-white p-6 shadow rounded-lg dark:bg-slate-800 border">
            <div className="mb-6">
              <h2
                className="text-2xl font-bold text-gray-800 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.title,
                }}
              ></h2>
              <p className="text-sm text-gray-500 dark:text-white">
                Publié le {data?.publication_date} • Catégorie :{" "}
                {
                  showingTranslateValue(data?.category?.translations, lang)
                    ?.name
                }
              </p>
            </div>
            <div className="mb-6">
              <img
                src={data?.image}
                alt="Main Blog"
                className="w-full rounded-lg"
              />
            </div>
            <p
              className=" font-montserrat text-lg"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)
                  ?.documentation,
              }}
            ></p>

            <ImageBlogs data={data?.allimages} />

            <p
              className="text-gray-700 dark:text-white text-lg  mb-6"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)
                  ?.description,
              }}
            ></p>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("Category")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.map((item: any, index: number) => (
                  <CategoryCard cat={item} key={index} />
                ))}
              </div>
            </div>
          </div> */}

          <div className="flex flex-col lg:flex-row gap-10  ">
            <main className="bg-white p-6 rounded-lg shadow-lg dark:bg-slate-800 flex-1">
              <h1
                className="text-3xl font-bold text-gray-800 dark:text-white  mb-4"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.title,
                }}
              ></h1>
              <p className="text-gray-500 dark:text-white  text-sm mb-6">
                Publié le {data?.publication_date}• Catégorie :{" "}
                {
                  showingTranslateValue(data?.category?.translations, lang)
                    ?.name
                }
              </p>
              <img
                src={data?.image}
                alt="Blog Banner"
                className="w-full rounded-lg mb-6"
              />
              <p
                style={{ fontSize: 13 }}
                className=" font-montserrat lg:text-lg md:text-xl dark:text-white "
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.documentation,
                }}
              ></p>

              <ImageBlogs data={data?.allimages} />
              <div className="text-gray-700 leading-relaxed space-y-4 dark:text-white font-light">
                <p
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(data?.translations, lang)
                      ?.description,
                  }}
                ></p>
              </div>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className=" flex justify-between space-x-2 items-center">
                  <img
                    src={data.author.image}
                    alt={data.author.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span
                    style={{ fontSize: 12 }}
                    className="dark:text-white sm:text-sm md:text-sm lg:text-sm "
                  >
                    Par {data?.author.full_name}
                  </span>
                </div>
              </div>
            </main>
            <aside className="w-full lg:w-72">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Catégories
                </h2>
                <ul className="space-y-2">
                  {cat.map((category: any, index: any) => (
                    <CategoryCard cat={category} key={index} />
                  ))}
                </ul>
              </div>
              <div className=" bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Articles Récents
                </h2>
                <div className="space-y-4 w-full">
                  {load
                    ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                    : currentBlogs.map((item: any, index: number) => (
                        <BlogCard blog={item} key={index} />
                      ))}
                </div>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPasts={recentPost.length}
                  paginate={paginate}
                />
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBlog;
