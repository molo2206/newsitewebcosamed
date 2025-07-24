import { useNavigate } from "react-router-dom";
import {
  downloadFileWithProgress,
  showingTranslateValue,
} from "../../utils/heleprs";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useLanguageContext } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

interface Props {
  bulletin?: any;
}

const BulletinCard = ({ bulletin }: Props) => {
  const { language: lang } = useLanguageContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const translation = showingTranslateValue(bulletin?.translations, lang);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const goToDetail = () => {
    navigate(`/bulletin/detail/${bulletin?.id}`);
  };

  const handleDownload = async () => {
    setError(null);
    setProgress(0);
    try {
      await downloadFileWithProgress(
        bulletin?.file,
        translation?.title,
        setProgress
      );
    } catch (err) {
      console.error("Erreur de téléchargement :", err);
      setError(t("An error occurred during download"));
    } finally {
      setTimeout(() => setProgress(null), 2000);
    }
  };

  return (
    <motion.article
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="border dark:border-gray-700 p-4 rounded-md bg-gray-50 dark:bg-slate-900 dark:text-white shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && goToDetail()}
      onClick={goToDetail}
    >
      <div className="overflow-hidden rounded-md flex justify-center items-center">
        <img
          src={bulletin.image}
          alt={translation?.title}
          className="h-48 w-auto object-contain mb-2"
        />
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {translation?.month}-{translation?.year}
      </p>

      <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mt-1 line-clamp-2">
        {translation?.title}
      </h3>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="flex items-center gap-2 text-principal font-medium dark:text-white hover:underline disabled:opacity-60"
          disabled={progress !== null}
        >
          <FaDownload className="w-4 h-4" />
          {progress !== null
            ? `${t("Downloading")}... ${progress}%`
            : t("Download")}
        </button>

        <span
          onClick={(e) => {
            e.stopPropagation();
            goToDetail();
          }}
          className="text-principal font-medium dark:text-white hover:underline cursor-pointer"
        >
          {t("Read_more")}
        </span>
      </div>

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

      {/* Message d'erreur */}
      {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
    </motion.article>
  );
};

export default BulletinCard;
