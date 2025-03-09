import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import usePageSEO from "../components/Seo/usePageSEO";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";
import { ImageBlogs } from "../components/blogs/ImageBlogs";
import Seo from "../components/Seo/Seo";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import Pagination from "../components/Pagination/Pagination";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DetailBlog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { lang } = useAuthContext();

  const { data, error, loading } = useAsync(
    () => BlogServices.oneBlogs(slug),
    slug
  );
  const { data: recentPost, loading: load } = useAsync(() =>
    BlogServices.getBlogHome()
  );

  usePageSEO({
    title: showingTranslateValue(data?.translations, lang)?.title,
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Détail du blog",
    ogDescription: showingTranslateValue(data?.translations, lang)?.description,
    ogImage: data?.image,
    ogUrl: window.location.href,
  });

  Seo({ title: data });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = recentPost?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  if (error) return <Error404 />;

  return (
    <>
      {loading ? (
        Array.from({ length: 20 }).map((_, index) => (
          <BlogDetailLoad key={index} />
        ))
      ) : (
        <div className="container mx-auto w-full dark:text-white mt-10">
          <BreadCumb
            title="Détail du blog"
            second="/data-loading/blogs"
            secondTitle="Blog"
          />
          <div className="min-h-screen dark:bg-slate-800 font-sans rounded-lg dark:border-slate-700 border">
            <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 md:p-8">
              <section className="md:col-span-2 relative">
                <div className="relative rounded-md overflow-hidden shadow-lg">
                  <img
                    src={data?.image}
                    alt="Aide pour Mayotte"
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-4">
                    <span className="bg-red-500 px-2 py-1 text-xs uppercase font-bold text-white rounded ">
                      {
                        showingTranslateValue(
                          data?.category?.translations,
                          lang
                        )?.name
                      }
                    </span>
                    <h2
                      className="text-white sm:text-sm md:text-xl lg:text-xl font-bold mt-2 leading-tight"
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)
                          ?.title,
                      }}
                    ></h2>
                  </div>
                </div>
                {data && Object.keys(data).length > 0 ? (
                  <aside className="bg-white dark:bg-slate-800 rounded-md mt-4 shadow-lg px-4 py-2">
                    <ImageBlogs data={data?.allimages} />
                    <p
                      className="font-montserrat lg:text-lg md:text-xl dark:text-white"
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)
                          ?.documentation,
                      }}
                    ></p>
                    <p
                      className="text-gray-700 leading-relaxed space-y-4 dark:text-white font-light"
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)
                          ?.description,
                      }}
                    ></p>
                    {data?.author?.image && (
                      <img
                        src={data.author.image}
                        alt={data.author.full_name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    {data?.author?.full_name && (
                      <span className="bg-red-500 px-2 py-1 text-xs uppercase font-bold text-white rounded">
                        Par {data?.author.full_name}
                      </span>
                    )}
                  </aside>
                ) : (
                  <p>Chargement ou aucune donnée disponible</p>
                )}{/* Accessoires supplémentaires */}
                <div className="mt-8 border-t pt-6">
                  <h2 className="lg:text-xl md:text-xl font-bold  mb-4">
                    {t("Share_on")}
                  </h2>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-principal dark:text-white hover:text-hover dark:hover:text-hover"
                    >
                      <FaFacebook size={24} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-principal dark:text-white hover:text-hover dark:hover:text-hover"
                    >
                      <FaTwitter size={24} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-principal dark:text-white hover:text-hover dark:hover:text-hover"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </div>
              </section>
              
              <aside className="md:col-span-1 bg-white dark:bg-slate-800 dark:border-slate-700 border rounded-md shadow-lg p-2">
                <h3 className="text-lg font-semibold pb-2 mb-4">Récentes</h3>
                <ul className="space-y-4">
                  {load
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <BlogCardLoand key={index} />
                      ))
                    : currentBlogs?.map((item: any, index: number) => (
                        <li
                          key={index}
                          className="flex items-start px-2 font-semibold"
                        >
                          <h1
                            className="line-clamp-2 cursor-pointer border-t border-gray-200 hover:text-slate-700 text-sm"
                            onClick={() =>
                              navigate(
                                `/blog/detail/` +
                                  showingTranslateValue(
                                    item?.translations,
                                    lang
                                  )?.slug
                              )
                            }
                            dangerouslySetInnerHTML={{
                              __html: showingTranslateValue(
                                item?.translations,
                                lang
                              )?.title,
                            }}
                          ></h1>
                        </li>
                      ))}
                </ul>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPasts={recentPost.length}
                  paginate={paginate}
                />
              </aside>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBlog;
