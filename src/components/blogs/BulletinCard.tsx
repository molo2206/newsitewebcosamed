import { useNavigate } from "react-router-dom";
import {
  downloadFileWithProgress,
  showingTranslateValue,
} from "../../utils/heleprs";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useLanguageContext } from "../../context/LanguageContext";

interface Props {
  bulletin?: any;
}

const BulletinCard = ({ bulletin }: Props) => {
  const { language: lang } = useLanguageContext();
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/bulletin/detail/${bulletin?.id}`);
  };
  const { t } = useTranslation();

  const translation = showingTranslateValue(bulletin?.translations, lang);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError("Une erreur s'est produite lors du téléchargement.");
    } finally {
      setTimeout(() => setProgress(null), 2000);
    }
  };
  return (
    <div className="border dark:border-gray-700 p-4 bg-gray-50 dark:bg-slate-900 dark:text-white">
      <img
        src={bulletin.image}
        alt={translation?.title}
        className="h-60 w-auto mb-2 mx-auto"
      />
      <p className="text-sm text-gray-500 dark:text-white ">
        {translation?.month}-{translation?.year}
      </p>
      <p className="font-medium text-sm text-gray-800 dark:text-gray-200 mt-1 line-clamp-2">
        {translation?.title}
      </p>
      <div className="mt-3 flex space-x-4 text-sm">
        <button
          onClick={handleDownload}
          className="text-principal dark:text-white  font-medium"
          disabled={progress !== null}
        >
          {progress !== null
            ? `${t("Downloading")}... ${progress}%`
            : t("Download")}
          {progress !== null && (
            <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </button>
        <a
          onClick={(e) => {
            e.stopPropagation();
            goToDetail();
          }}
          className="text-principal font-medium dark:text-white cursor-pointer"
        >
          {t("Read_more")}
        </a>
      </div>
    </div>
  );
};

export default BulletinCard;
