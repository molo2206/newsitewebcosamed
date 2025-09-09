import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaDownload, FaShareAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";

import { useState } from "react";
import useAsync from "../hooks/useAsync";
import BulletinServices from "../services/BulletinServices";
import {
  downloadFileWithProgress,
  limittext,
  showingTranslateValue,
} from "../utils/heleprs";
import { useAuthContext } from "../context";

import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";

// Fonction utilitaire pour nettoyer le HTML pour le SEO
const stripHtml = (html?: string): string =>
  html ? html.replace(/<[^>]*>?/gm, "").trim() : "";

const DetailBulletin = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { lang } = useAuthContext();

  const { data, loading } = useAsync(
    () => BulletinServices.oneBulletin(id),
    id
  );

  const translation = showingTranslateValue(data?.translations, lang);
  const htmlDescription = translation?.description ?? "";
  const textDescription = stripHtml(htmlDescription);

  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setError(null);
    setProgress(0);
    try {
      await downloadFileWithProgress(
        data?.file,
        translation?.title,
        setProgress
      );
    } catch (err) {
      console.error("Erreur de téléchargement :", err);
      setError("Une erreur s'est produite lors du téléchargement.");
    } finally {
      setTimeout(() => setProgress(null), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: translation?.title,
          text: textDescription,
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Le partage n'est pas pris en charge sur ce navigateur.");
    }
  };

  return (
    <>
      {!loading && (
        <Helmet>
          <title>{translation?.title}</title>
          <meta name="og:description" content={textDescription} />
          <meta name="og:title" content={translation?.title} />
          <meta name="og:image" content={data?.image} />
          <meta property="og:title" content={translation?.title ?? ""} />
          <meta property="og:description" content={textDescription} />
          <meta property="og:image" content={data?.image ?? ""} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="NomDeTonSite" />
          <meta property="og:locale" content="fr_FR" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={translation?.title ?? ""} />
          <meta name="twitter:description" content={textDescription} />
          <meta name="twitter:image" content={data?.image ?? ""} />
          <meta name="twitter:url" content={window.location.href} />
          <meta name="twitter:site" content="@TonCompteTwitter" />
          <meta name="twitter:creator" content="@TonCompteTwitter" />
        </Helmet>
      )}

      {loading ? (
        Array.from({ length: 5 }).map((_, i) => <BlogDetailLoad key={i} />)
      ) : (
        <div className="bg-white max-w-7xl mx-auto min-h-[650px] dark:bg-slate-900 p-6">
          <BreadCumb
            title={limittext(translation?.title, 5)}
            second="/data-loading/newsletters"
            secondTitle="Bulletins"
          />

          <div className="bg-white  dark:bg-slate-800 border dark:border-slate-700 mt-4 p-6 shadow-md ">
            <h1 className="text-xl lg:text-2xl font-bold mb-4 text-center sm:text-left">
              Bulletin d'information – {translation?.month} {translation?.year}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center sm:text-left text-sm sm:text-base">
              Publié en {translation?.month} {translation?.year} |{" "}
              <strong>{translation?.title}</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <img
                  src={data?.image}
                  alt={translation?.title}
                  className="w-60 h-60 shadow object-contain"
                />

                <button
                  onClick={handleDownload}
                  className="mt-4 w-60 inline-flex items-center justify-center gap-2 bg-principal text-white py-2 px-4 rounded hover:bg-hover transition disabled:opacity-60"
                  disabled={progress !== null}
                >
                  <FaDownload />
                  {progress !== null
                    ? `${t("Downloading")}... ${progress}%`
                    : t("Download")}
                </button>

                {progress !== null && (
                  <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="flex items-center gap-4 mt-5 text-sm text-gray-600 dark:text-gray-300">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 hover:text-green-600 transition"
                  >
                    <FaShareAlt /> {t("Share")}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 space-y-3 text-sm sm:text-base text-right md:text-left">
                <p>
                  <strong>Équipe COSAMED :</strong> Programme de gestion des
                  situations d'urgence.
                </p>
                <p>
                  <strong>Éditeurs :</strong> Bureau de Goma
                </p>
                <p>
                  <strong>Nombre de pages :</strong>{" "}
                  {data?.pages ?? "Non spécifié"}
                </p>
                <p>
                  <strong>Taille du fichier :</strong>{" "}
                  {data?.fileSize
                    ? `${(data.fileSize / 1024 / 1024).toFixed(2)} Mo`
                    : "N/A"}
                </p>
                <p>
                  <strong>Date de publication :</strong>{" "}
                  {data?.publishedAt
                    ? new Date(data.publishedAt).toLocaleDateString()
                    : "Inconnue"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBulletin;
