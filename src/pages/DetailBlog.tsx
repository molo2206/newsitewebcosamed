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

import { FaFacebook, FaHeart, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useLanguageContext } from "../context/LanguageContext";

import useBlogLikes from "../hooks/useBlogLikes";
import useBlogComments from "../hooks/useBlogComments";

const DetailBlog = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { language: lang } = useLanguageContext();
  const { user } = useAuthContext(); // user.id disponible si connecté
  const navigate = useNavigate();
  // Récupérer les données principales du blog
  const { data, error, loading } = useAsync(
    () => BlogServices.oneBlogs(slug),
    slug
  );

  // blogId dépend de data, il peut être undefined au début
  const blogId = data?.id;

  // Appeler les hooks seulement quand blogId est défini
  const {
    likes, // <== Ajoute ceci
    likesCount,
    likeBlog,
  } = useBlogLikes(blogId ?? "");

  const {
    comments,
    loading: commentsLoading,
    postComment,
  } = useBlogComments(blogId ?? "");

  const [commentText, setCommentText] = useState("");

  usePageSEO({
    title: showingTranslateValue(data?.translations, lang)?.title,
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: t("Blog Detail"),
    ogDescription: showingTranslateValue(data?.translations, lang)?.description,
    ogImage: data?.image,
    ogUrl: window.location.href,
  });

  if (error) return <Error404 />;

  const handleLike = () => {
    if (!user?.id) {
      navigate("/auth/signin", { replace: true });
      return;
    }
    likeBlog(user.id);
  };

  const handlePostComment = () => {
    if (!user?.id) {
      alert(t("Please log in to comment."));
      return;
    }
    if (!commentText.trim()) return;

    postComment(user.id, commentText.trim());
    setCommentText("");
  };
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  return (
    <>
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <BlogDetailLoad key={index} />
        ))
      ) : (
        <div className="p-6 mx-auto w-full dark:text-white">
          <main className="lg:px-8 mx-auto font-sans">
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
                {/* Titre, catégorie, image, contenu */}
                <h1
                  className="text-3xl font-bold text-gray-900 dark:text-white"
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
                    alt={t("Blog image")}
                    className="w-full rounded-md object-cover mb-6 border dark:border-slate-700"
                  />
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ImageBlogs data={data?.allimages} />
                  <div
                    className="text-sm"
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

                {/* Auteur */}
                {data?.author && (
                  <div className="mt-6 flex items-center gap-4 border-t pt-6 dark:border-slate-600">
                    {data.author.image && (
                      <img
                        src={data.author.image}
                        alt={data.author.full_name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {data.author.full_name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(data.created_at).toLocaleDateString()}
                      </p>
                      {data.author.bio && (
                        <blockquote className="mt-1 italic text-gray-600 dark:text-gray-300">
                          “{data.author.bio}”
                        </blockquote>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleLike}
                    title={t("Like this article")}
                    aria-pressed={likesCount > 0}
                    className={`
    flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-1
    ${
      likesCount > 0
        ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 focus:ring-blue-500"
        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:ring-blue-300"
    }
  `}
                  >
                    <span
                      aria-hidden="true"
                      className={`
      text-xl transition-transform duration-200
      ${
        likesCount > 0
          ? "text-principal dark:text-principal"
          : "text-principal group-hover:text-principal"
      }
      group-active:scale-110
    `}
                    >
                      <FaHeart size={14} />
                    </span>

                    <span className="text-sm font-semibold">
                      {likesCount > 0 ? t("Liked") : t("Like")}
                    </span>

                    <span className="text-sm">
                      {likesCount > 0
                        ? `- ${likesCount} ${t("people like this article")}`
                        : `- ${t("Be the first to like this article")}`}
                    </span>
                  </button>

                  {likesCount > 0 && likes.length > 0 && (
                    <div className="flex items-center -space-x-3 mt-2">
                      {likes.map((user) => (
                        <img
                          key={user.id}
                          src={user.image || "/default-avatar.png"}
                          alt={user.full_name}
                          title={user.full_name}
                          onClick={() => setSelectedUser(user)}
                          className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-900 shadow-sm cursor-pointer hover:scale-105 transition-transform duration-200"
                        />
                      ))}
                    </div>
                  )}
                  {selectedUser && (
                    <div
                      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
                      onClick={() => setSelectedUser(null)}
                    >
                      <div
                        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-sm w-full p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Bouton de fermeture */}
                        <button
                          onClick={() => setSelectedUser(null)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
                          aria-label="Close"
                        >
                          &times;
                        </button>

                        {/* Image de profil */}
                        <div className="flex flex-col items-center text-center">
                          <img
                            src={selectedUser.image || "/default-avatar.png"}
                            alt={selectedUser.full_name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3"
                          />
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {selectedUser.full_name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-2">{t("Comments")}</h3>
                  {commentsLoading && <p>{t("Loading comments...")}</p>}
                  {!commentsLoading && comments.length === 0 && (
                    <p className="text-sm text-gray-500">
                      {t("No comments yet")}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-4 border-t pt-4">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    )}
                    <input
                      type="text"
                      placeholder={t("Write a comment...")}
                      className="flex-1 bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-full text-sm text-gray-800 dark:text-white focus:outline-none"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handlePostComment();
                      }}
                      disabled={!user}
                    />
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium"
                      onClick={handlePostComment}
                      disabled={!commentText.trim() || !user}
                    >
                      {t("Post")}
                    </button>
                  </div>

                  <div className="space-y-4 mt-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-100 dark:bg-slate-700 p-4 rounded-md"
                      >
                        <div className="flex items-start gap-3">
                          {comment.user?.image && (
                            <img
                              src={comment.user.image}
                              alt={comment.user.full_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-semibold">
                              {comment.user?.full_name || "Anonymous"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(
                                comment.created_at
                              ).toLocaleDateString()}
                            </p>
                            <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-slate-600">
                    Dernières publications
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    {[
                      "La province de Tshopo fait face à une crise de choléra",
                      "Montée des cas de choléra en ville de Kinshasa...",
                      "Hommage au Dr Obadi : Une perte inestimable...",
                      "La prison centrale de Tshikapa touchée par le Mpox",
                    ].map((title, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="hover:underline hover:text-blue-900 dark:hover:text-blue-200"
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-slate-600">
                    Ressources utiles
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    {[
                      "Casemad guidelines",
                      "Bulletin sanitaire",
                      "Nos réalisations et témoignages",
                    ].map((res, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="hover:underline hover:text-blue-900 dark:hover:text-blue-200"
                        >
                          {res}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-slate-600">
                    Nos projets
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      Réponse sanitaire d'urgence pour les déplacés, retournés
                      et autochtones...
                    </p>
                    <p>
                      Réponse aux conséquences sanitaires de la crise
                      humanitaire complexe...
                    </p>
                    <a
                      href="#"
                      className="inline-block mt-2 text-blue-700 dark:text-blue-400 font-medium hover:underline"
                    >
                      Voir tous les projets →
                    </a>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-slate-600">
                    Liens utiles
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    <li>
                      <a href="#" className="hover:underline">
                        Organisation mondiale de la santé (OMS)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Ministère de la Santé
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                    Sondage
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Trouvez-vous notre contenu utile ?
                  </p>
                  <div className="flex gap-3">
                    <button className="flex-1 px-3 py-1.5 bg-principal text-white rounded hover:bg-hover text-sm font-medium">
                      Oui
                    </button>
                    <button className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium">
                      Non
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                    Équipe éditoriale
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Nous sommes une équipe de professionnels de la santé
                    publique et de la communication œuvrant à diffuser des
                    informations fiables pour tous.
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-700 dark:text-blue-400 font-medium hover:underline"
                  >
                    En savoir plus →
                  </a>
                </div>
              </aside>

              <div className="mt-10 border-t pt-6 dark:border-slate-600">
                <h2 className="text-md font-semibold mb-3">{t("Share_on")}</h2>
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
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default DetailBlog;
