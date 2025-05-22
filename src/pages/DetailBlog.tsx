import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import { showingTranslateValue } from "../utils/heleprs";
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

  const { data, error, loading } = useAsync(() => BlogServices.oneBlogs(slug), slug);
  const { data: recentPost = [], loading: load } = useAsync(() => BlogServices.getBlogHome());

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
        Array.from({ length: 4 }).map((_, index) => <BlogDetailLoad key={index} />)
      ) : (
        <div className="lg:container mx-auto w-full dark:text-white mt-6  p-4">
          <BreadCumb title="Détail du blog" second="/data-loading/blogs" secondTitle="Blog" />

          <div className="font-sans">
            <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blog principal */}
              <section className="md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-800 lg:rounded-xl lg:border dark:border-slate-700 p-6 lg:shadow-sm">
                  
                  {/* Titre et catégorie */}
                  <div className="mt-4">
                    <h2
                      className="text-xl font-bold leading-tight text-gray-900 dark:text-white"
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)?.title,
                      }}
                    ></h2>
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-white text-xs font-semibold px-2 py-1 rounded mt-2">
                      {showingTranslateValue(data?.category?.translations, lang)?.name}
                    </span>
                  </div>

                  {/* Image principale */}
                  {data?.image && (
                    <img
                      src={data.image}
                      alt="Blog"
                      className="w-full rounded-xl object-cover mt-4 lg:max-h-[400px]"
                    />
                  )}

                  {/* Contenu */}
                  <div className="prose dark:prose-invert mt-6 max-w-none text-gray-800 dark:text-gray-100">
                    <ImageBlogs data={data?.allimages} />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)?.documentation,
                      }}
                    />
                    <div
                      className="mt-4"
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)?.description,
                      }}
                    />
                  </div>

                  {/* Auteur en bas avec carte dédiée */}
                  <div className="mt-10 pt-6 border-t">
                    <div className="flex gap-4 items-start bg-gray-50 dark:bg-slate-700 p-4 rounded-xl shadow-inner">
                      {data?.author?.image && (
                        <img
                          src={data.author.image}
                          alt={data.author.full_name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        <p className="font-semibold text-base">{data?.author?.full_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(data.created_at).toLocaleDateString()}
                        </p>
                        {data?.author?.bio && (
                          <blockquote className="mt-2 italic text-gray-600 dark:text-gray-300">
                            “{data.author.bio}”
                          </blockquote>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="mt-8 pt-4 border-t">
                    <h2 className="text-md font-bold mb-2">{t("Share_on")}</h2>
                    <div className="flex gap-4 items-center">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75"
                      >
                        <FaFacebook size={24} className="text-blue-600" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75"
                      >
                        <FaTwitter size={24} className="text-sky-500" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75"
                      >
                        <FaLinkedin size={24} className="text-blue-700" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sidebar */}
              <aside className="md:col-span-1">
                <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-4 shadow-sm">
                  <h3 className="text-md font-semibold mb-3">{t("News")}</h3>
                  <ul className="space-y-4">
                    {(load ? Array.from({ length: 4 }) : currentBlogs)?.map((item: any, index: number) => (
                      <li
                        key={index}
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(`/blog/detail/${showingTranslateValue(item?.translations, lang)?.slug}`)
                        }
                      >
                        <div className="hover:bg-gray-100 dark:hover:bg-slate-700 p-2 rounded-md transition">
                          <p
                            className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: showingTranslateValue(item?.translations, lang)?.title,
                            }}
                          ></p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPasts={recentPost.length}
                      paginate={paginate}
                    />
                  </div>
                </div>
              </aside>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBlog;
