import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import { limittext, showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";

import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";
import { ImageBlogs } from "../components/blogs/ImageBlogs";
import usePageSEO from "../components/Seo/usePageSEO";
import Pagination from "../components/Pagination/Pagination";

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
          <main className="lg:px-8 mx-auto dark:text-white font-sans">
            <BreadCumb
              title={limittext(
                showingTranslateValue(data?.translations, lang)?.title,
                18
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
                    className="w-full max-h-full object-cover border dark:border-slate-700"
                  />
                )}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ImageBlogs data={data?.allimages} />
                  <div
                    className="md:text-[14px] text-[12px] lg:text-[13px] font-semibold"
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

                <div className="mt-4 flex items-center gap-2 text-red-500">
                  <span className="text-xl">❤️</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Aimer{" "}
                    <span className="text-black dark:text-white font-medium">
                      {data?.likedByUsers?.length || 0}
                    </span>{" "}
                    personnes aiment cet article
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2">Commentaires</h3>
                  {(!data?.comments || data.comments.length === 0) && (
                    <p className="text-sm text-gray-500">
                      Aucun commentaire pour le moment
                    </p>
                  )}

                  {/* Zone de saisie */}
                  <div className="flex items-center gap-2 mt-4 border-t pt-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <input
                      type="text"
                      placeholder="Commentaire..."
                      className="flex-1 bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-full text-sm text-gray-800 dark:text-white focus:outline-none"
                    />
                    <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      Publier
                    </button>
                  </div>
                </div>

                {data?.comments?.length > 0 && (
                  <div className="mt-10 border-t pt-6 dark:border-slate-600">
                    <h2 className="text-md font-semibold mb-4">
                      {t("Comments")} ({data.comments.length})
                    </h2>
                    <div className="space-y-4">
                      {data.comments.map((comment: any) => (
                        <div
                          key={comment.id}
                          className="bg-gray-100 dark:bg-slate-700 p-4 rounded-md shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            {comment.user?.image && (
                              <img
                                src={comment.user.image}
                                alt={comment.user.full_name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <p className="font-semibold text-sm text-gray-800 dark:text-white">
                                  {comment.user?.full_name || "Anonymous"}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-300">
                                  {new Date(
                                    comment.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data?.likedByUsers?.length > 0 && (
                  <div className="mt-10 border-t pt-6 dark:border-slate-600">
                    <h2 className="text-md font-semibold mb-4">
                      {t("Liked_by")} ({data.likedByUsers.length})
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                      {data.likedByUsers.slice(0, 3).map((user: any) => (
                        <div key={user.id} className="flex items-center gap-2">
                          <img
                            src={user.image}
                            alt={user.full_name}
                            title={user.full_name}
                            className="w-8 h-8 rounded-full object-cover border border-white dark:border-slate-700"
                          />
                        </div>
                      ))}
                      {data.likedByUsers.length > 3 && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          +{data.likedByUsers.length - 3} {t("others")}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-10 border-t pt-6 dark:border-slate-600">
                  <h2 className="text-md font-semibold mb-3">
                    {t("Share_on")}
                  </h2>
                  <div className="flex gap-4">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      <FaFacebook size={24} className="text-blue-600" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      <FaTwitter size={24} className="text-sky-500" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80"
                    >
                      <FaLinkedin size={24} className="text-blue-700" />
                    </a>
                  </div>
                </div>
              </article>

              {/* SIDEBAR */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-3">
                    Dernières publications
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                    <li>
                      <a href="#">
                        La province de Tshopo fait face à une crise de choléra
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Montée des cas de choléra en ville de Kinshasa...
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Hommage au Dr Obadi : Une perte inestimable...
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        La prison centrale de Tshikapa touchée par le Mpox
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-3">
                    Ressources utiles
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                    <li>
                      <a href="#">Casemad guidelines</a>
                    </li>
                    <li>
                      <a href="#">Bulletin sanitaire</a>
                    </li>
                    <li>
                      <a href="#">Nos réalisations et témoignages</a>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm p-4 space-y-3">
                  <h3 className="text-lg font-semibold">Nos projets</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Réponse sanitaire d'urgence pour les déplacés, retournés et
                    autochtones...
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Réponse aux conséquences sanitaires de la crise humanitaire
                    complexe...
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-600 dark:text-blue-400 font-medium"
                  >
                    Voir tous les projets →
                  </a>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-3">Liens utiles</h3>
                  <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                    <li>
                      <a href="#">Organisation mondiale de la santé (OMS)</a>
                    </li>
                    <li>
                      <a href="#">Ministère de la Santé</a>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm p-4">
                  <h3 className="text-md font-semibold mb-2">Quick poll</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Do you find our blog content helpful?
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">
                      Yes
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                      No
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm p-4">
                  <h3 className="text-md font-semibold mb-2">
                    About the editorial team
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Nous sommes une équipe de professionnels de la santé
                    publique et de la communication...
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-600 dark:text-blue-400"
                  >
                    Show less
                  </a>
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
