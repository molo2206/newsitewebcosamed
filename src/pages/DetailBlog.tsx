import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import { limittext, showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";

// Components
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";
import { ImageBlogs } from "../components/blogs/ImageBlogs";
import usePageSEO from "../components/Seo/usePageSEO";
import Pagination from "../components/Pagination/Pagination";

// Icons
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const DetailBlog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { lang } = useAuthContext();

  const { data, error, loading } = useAsync(
    () => BlogServices.oneBlogs(slug),
    slug
  );
  const { data: recentPost = [], loading: load } = useAsync(() =>
    BlogServices.getBlogHome()
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = recentPost.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // SEO Meta
  usePageSEO({
    title: showingTranslateValue(data?.translations, lang)?.title,
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Détail du blog",
    ogDescription: showingTranslateValue(data?.translations, lang)?.description,
    ogImage: data?.image,
    ogUrl: window.location.href,
  });

  if (error) return <Error404 />;

  return (
    <>
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <BlogDetailLoad key={index} />
        ))
      ) : (
        <div className="p-6 mx-auto w-full dark:text-white">
          <main className="px-4 sm:px-6 lg:px-8 mx-auto dark:text-white font-sans">
            <BreadCumb
              title={limittext(
                showingTranslateValue(data?.translations, lang)?.title,
                23
              )}
              second="/data-loading/blogs"
              secondTitle="Blog"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
              <article className="lg:col-span-8 space-y-6">
                <h1
                  className="lg:text-3xl font-bold leading-tight text-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(data?.translations, lang)
                      ?.title,
                  }}
                />
                {data?.category && (
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-white text-xs font-semibold px-3 py-1 rounded">
                    {
                      showingTranslateValue(data?.category?.translations, lang)
                        ?.name
                    }
                  </span>
                )}

                {data?.image && (
                  <img
                    src={data.image}
                    alt="Image du blog"
                    className="w-full max-h-[500px] object-cover  border dark:border-slate-700"
                  />
                )}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ImageBlogs data={data?.allimages} />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.documentation,
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: showingTranslateValue(data?.translations, lang)
                        ?.description,
                    }}
                  />
                </div>
                <div className="mt-6 flex items-center gap-4 border-t pt-6 dark:border-slate-600">
                  {data?.author?.image && (
                    <img
                      src={data.author.image}
                      alt={data.author.full_name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {data?.author?.full_name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(data.created_at).toLocaleDateString()}
                    </p>
                    {data?.author?.bio && (
                      <blockquote className="mt-1 italic text-gray-600 dark:text-gray-300">
                        “{data.author.bio}”
                      </blockquote>
                    )}
                  </div>
                </div>

                <div className="mt-10 border-t pt-6 dark:border-slate-600">
                  <h2 className="text-md font-semibold mb-3">
                    {t("Share_on")}
                  </h2>
                  <div className="flex gap-4">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Partager sur Facebook"
                      className="hover:opacity-80"
                    >
                      <FaFacebook size={24} className="text-blue-600" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Partager sur Twitter"
                      className="hover:opacity-80"
                    >
                      <FaTwitter size={24} className="text-sky-500" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Partager sur LinkedIn"
                      className="hover:opacity-80"
                    >
                      <FaLinkedin size={24} className="text-blue-700" />
                    </a>
                  </div>
                </div>
              </article>
              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4">{t("News")}</h3>
                  <ul className="space-y-4">
                    {(load ? Array.from({ length: 4 }) : currentBlogs)?.map(
                      (item: any, index: number) => (
                        <li
                          key={index}
                          onClick={() =>
                            navigate(
                              `/blog/detail/${
                                showingTranslateValue(item?.translations, lang)
                                  ?.slug
                              }`
                            )
                          }
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-2 rounded-md transition"
                        >
                          <p
                            className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: showingTranslateValue(
                                item?.translations,
                                lang
                              )?.title,
                            }}
                          />
                        </li>
                      )
                    )}
                  </ul>
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPasts={data.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </aside>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default DetailBlog;
