import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import {
  downloadFileWithProgress,
  limittext,
  showingTranslateValue,
} from "../utils/heleprs";
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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Users } from "lucide-react";
dayjs.extend(relativeTime);

const DetailBlog = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { language: lang } = useLanguageContext();
  const { user } = useAuthContext(); // user.id disponible si connecté
  const navigate = useNavigate();
  // Récupérer les données principales du blog
  const { data: dataHome } = useAsync(() => BlogServices.getBlogHome());
  const { data, error, loading } = useAsync(
    () => BlogServices.oneBlogs(slug),
    slug
  );

  const [expanded, setExpanded] = useState(false);

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
      navigate("/auth/signin", { replace: true });
      return;
    }
    if (!commentText.trim()) return;

    postComment(user.id, commentText.trim());
    setCommentText("");
  };
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const visibleCount = 5;
  const [visibleComments, setVisibleComments] = useState(visibleCount);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEditComment = (comment: any) => {
    setEditingCommentId(comment.id);
    setEditedText(comment.content);
  };

  const handleDeleteComment = (id: any) => {
    // Appelle la méthode de suppression
    console.log(id);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedText("");
  };

  const handleSaveEdit = async (id: any) => {
    if (!editedText.trim()) return;
    console.log(id);
    try {
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 3); // Affiche 3 de plus à chaque clic
  };

  const [progress, setProgress] = useState<number | null>(null);
  const [errors, setError] = useState<string | null>(null);
  const handleDownload = async () => {
    setError(null);
    setProgress(0);
    try {
      await downloadFileWithProgress(
        "https://apicosamed.cosamed.org/public/uploads/doc/autres/p_COSAMED.pdf",
        "COSAMED_Guidelines.pdf",
        setProgress
      );
    } catch (err) {
      console.error("Erreur de téléchargement :", err);
      setError(t("An error occurred during download"));
    } finally {
      setTimeout(() => setProgress(null), 2000);
    }
  };
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BlogDetailLoad key={i} />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="p-6 mx-auto w-full dark:text-white max-w-7xl auto">
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
              <h1
                className="text-2xl font-bold text-gray-900 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.title,
                }}
              />

              {data?.category && (
                <span className="inline-block bg-blue-50 dark:bg-blue-900 text-principal dark:text-white text-[11px] font-semibold px-3 py-1 rounded">
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
                  className=" text-sm font-monteserrat text-gray-600 dark:text-gray-400"
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
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-[12px]">
                      {data.author.full_name}
                    </p>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400">
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

                  <span className="text-[11px] font-semibold">
                    {likesCount > 0 ? t("Liked") : t("Like")}
                  </span>

                  <span className="text-[11px]">
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
                        className="w-6 h-6 rounded-full object-cover border-2 border-white dark:border-gray-900 shadow-sm cursor-pointer hover:scale-105 transition-transform duration-200"
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
                <h3 className="text-[14px] font-bold mb-2">
                  {t("Comments")} ({comments.length})
                </h3>

                {commentsLoading && (
                  <p className="text-[11px]">
                    {t("Chargement des commentaires...")}
                  </p>
                )}
                {!commentsLoading && comments.length === 0 && (
                  <p className="text-sm text-gray-500">
                    {t("Aucun commentaire pour le moment")}
                  </p>
                )}

                {/* Zone saisie commentaire */}
                <div className="flex items-start gap-3 mt-4 border-t pt-4">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  )}
                  <div className="flex-1">
                    <textarea
                      name="comment"
                      placeholder={t("Écrivez un commentaire...")}
                      className="w-full bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-2xl text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handlePostComment();
                        }
                      }}
                      rows={1}
                      autoComplete="on"
                      autoCorrect="on"
                      spellCheck={true}
                    />
                    <div className="mt-2 text-right">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-[11px] font-medium"
                        onClick={handlePostComment}
                        disabled={!commentText.trim() || !user}
                      >
                        {t("Publier")}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Liste commentaires */}
                <div className="space-y-4 mt-4">
                  {comments.slice(0, visibleComments).map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-100 dark:bg-slate-700 p-4 rounded-xl transition-all duration-200 hover:shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row gap-3">
                        <img
                          src={comment.user?.image || "/placeholder.jpg"}
                          alt={comment.user?.full_name || "Anonymous"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-[11px]">
                                {comment.user?.full_name || "Anonymous"}
                              </p>
                              <p className="text-[9px] text-gray-500">
                                {dayjs(comment.created_at).fromNow()}
                                {comment.updated_at !== comment.created_at && (
                                  <span className="ml-2 text-[10px] text-gray-400">
                                    ({t("modifié")})
                                  </span>
                                )}
                              </p>
                            </div>

                            {user?.id === comment.user?.id && (
                              <div className="flex gap-2 text-[11px] text-blue-500">
                                {editingCommentId === comment.id ? (
                                  <>
                                    <button
                                      onClick={() => handleSaveEdit(comment.id)}
                                    >
                                      {t("Sauvegarder")}
                                    </button>
                                    <button onClick={handleCancelEdit}>
                                      {t("Annuler")}
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleEditComment(comment)}
                                    >
                                      {t("Éditer")}
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteComment(comment.id)
                                      }
                                    >
                                      {t("Supprimer")}
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          {editingCommentId === comment.id ? (
                            <textarea
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              className="w-full mt-2 px-3 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                              rows={2}
                            />
                          ) : (
                            <p className="mt-1 text-[11px] text-gray-800 dark:text-gray-200">
                              {comment.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {visibleComments < comments.length && (
                    <div className="text-center mt-2">
                      <button
                        onClick={handleShowMore}
                        className="text-[11px] text-blue-500 hover:underline"
                      >
                        {t("Voir plus de commentaires")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                <h3 className="text-[14px] font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-slate-600">
                  Dernières publications
                </h3>
                <ul className="space-y-2 text-[12px] text-principal dark:text-blue-400">
                  {dataHome.map((blog: any, index: number) => (
                    <li key={index}>
                      <a
                        onClick={() =>
                          navigate(
                            `/blog/detail/${
                              showingTranslateValue(blog?.translations, lang)
                                ?.slug
                            }`
                          )
                        }
                        className="hover:underline  hover:text-hover dark:hover:text-hover cursor-pointer"
                        dangerouslySetInnerHTML={{
                          __html:
                            showingTranslateValue(blog?.translations, lang)
                              .title || "",
                        }}
                      ></a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                <h3 className="text-[14px] font-bold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-slate-600">
                  Ressources utiles
                </h3>
                <ul className="space-y-2 text-[12px] text-principal dark:text-blue-400">
                  <li>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload();
                      }}
                      className="hover:underline hover:text-hover dark:hover:text-blue-200"
                      disabled={progress !== null}
                    >
                      {progress !== null
                        ? `${t("Downloading")}... ${progress}%`
                        : t("Download Cosamed Guidelines")}
                    </button>
                    {progress !== null && (
                      <motion.div
                        className="w-full mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.4 }}
                      >
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </motion.div>
                    )}
                    {errors && (
                      <p className="text-red-500 text-xs mt-3">{errors}</p>
                    )}
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/data-loading/newsletters")}
                      className="hover:underline hover:text-hover dark:hover:text-blue-200 cursor-pointer"
                    >
                      Bulletin sanitaire
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/data-loading/videos")}
                      className="hover:underline hover:text-hover dark:hover:text-blue-200 cursor-pointer"
                    >
                      Nos réalisations et témoignages
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-md rounded-xl p-6">
                <h3 className="text-[14px] font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-slate-600 flex items-center gap-2">
                  Liens utiles
                </h3>
                <ul className="space-y-3 text-[12px] text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <a
                      className=" text-principal"
                      href="https://www.who.int/"
                      target="_blank"
                    >
                      The World Health Organization (OMS)
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <a
                      className=" text-principal"
                      href="https://sante.gouv.cd/"
                      target="_blank"
                    >
                      Ministère de la Santé
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <a
                      className=" text-principal"
                      href="https://www.yorku.ca/"
                      target="_blank"
                    >
                      YORK UNIVERSITY
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <a
                      className=" text-principal"
                      href="https://www.usnews.com/"
                      target="_blank"
                    >
                      Université de Toronto
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <a
                      className=" text-principal"
                      href="https://imaworldhealth.org/"
                      target="_blank"
                    >
                      IMA Word Health
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <a
                      className=" text-principal"
                      href="https://www.ulb.be/fr/ulb-accueil"
                      target="_blank"
                    >
                      ULB
                    </a>
                  </li>
                </ul>
              </div>
              {/* <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-md p-5">
                  <h3 className="text-[14px] font-bold text-gray-800 dark:text-white mb-3">
                    Sondage
                  </h3>
                  <p className="text-[12px] text-gray-700 dark:text-gray-300 mb-3">
                    Trouvez-vous notre contenu utile ?
                  </p>
                  <div className="flex gap-3">
                    <button className="flex-1 px-2 py-1 bg-principal text-white rounded hover:bg-hover text-[12px] font-medium">
                      Oui
                    </button>
                    <button className="flex-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-[12px] font-medium">
                      Non
                    </button>
                  </div>
                </div> */}
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-md rounded-md p-6">
                <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-principal dark:text-blue-400" />
                  Équipe éditoriale
                </h3>

                <p className="text-[12px] text-gray-700 dark:text-gray-300 leading-relaxed">
                  Nous sommes une équipe de professionnels de la santé publique
                  et de la communication, engagés à fournir des informations
                  fiables et à jour.
                  {expanded && (
                    <>
                      {" "}
                      Notre mission est de rendre les données de santé
                      accessibles et compréhensibles pour tous, afin de
                      renforcer la réponse aux urgences sanitaires et de
                      promouvoir le bien-être communautaire. L’équipe comprend
                      des médecins, épidémiologistes, des journalistes
                      spécialisés, des développeurs et des designers engagés.
                    </>
                  )}
                </p>

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 inline-flex items-center text-[12px] font-medium text-principal dark:text-blue-400 hover:underline focus:outline-none"
                >
                  {expanded ? (
                    <>
                      Afficher moins <ChevronUp className="ml-1 w-4 h-4" />
                    </>
                  ) : (
                    <>
                      En savoir plus <ChevronDown className="ml-1 w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </aside>
            <div className="mt-10 border-t pt-6 dark:border-slate-600">
              <h2 className="text-[11px] font-semibold mb-4 text-gray-800 dark:text-white relative">
                {t("Share_on")}
                <span className="block w-6 h-1 bg-blue-500 mt-1 rounded"></span>
              </h2>

              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Partager sur Facebook"
                  aria-label="Partager sur Facebook"
                  className="flex items-center justify-center  transition-all p-0"
                >
                  <FaFacebook className="text-blue-600" size={14} />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Partager sur Twitter"
                  aria-label="Partager sur Twitter"
                  className="flex items-center justify-center w-8 h-8   transition-all p-0"
                >
                  <FaTwitter className="text-sky-500" size={14} />
                </a>

                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Partager sur LinkedIn"
                  aria-label="Partager sur LinkedIn"
                  className="flex items-center justify-center w-8 h-8   transition-all p-0"
                >
                  <FaLinkedin className="text-blue-700" size={14} />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DetailBlog;
