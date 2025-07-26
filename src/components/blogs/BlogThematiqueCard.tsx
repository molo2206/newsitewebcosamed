import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../../context/LanguageContext";
import { motion } from "framer-motion";

interface Props {
  cat?: any;
}

const BlogThematiqueCard = ({ cat }: Props) => {
  const navigate = useNavigate();
  const { language: lang } = useLanguageContext();
  const { t } = useTranslation();

  const translation = showingTranslateValue(cat?.translations, lang);
  const formattedDate = cat?.publication_date
    ? format(new Date(cat.publication_date), "d MMMM yyyy", { locale: fr })
    : "";

  const goToDetail = () => {
    const slug = translation?.slug;
    if (slug) {
      navigate(`/blog/detail/${slug}`);
    }
  };

  return (
    <motion.article
      onClick={goToDetail}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer border dark:border-gray-700 p-4 rounded-md bg-gray-50 dark:bg-slate-900 dark:text-white shadow-sm hover:shadow-lg transition-shadow group"
      role="button"
      tabIndex={0}
      aria-label={translation?.title}
      onKeyDown={(e) => {
        if (e.key === "Enter") goToDetail();
      }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-md mb-3">
        <img
          src={cat?.image}
          alt={translation?.title}
          className="h-40 w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Date */}
      <p className="text-[11px] text-gray-500 dark:text-gray-400">{formattedDate}</p>

      {/* Titre */}
      <h3
        className="font-semibold text-[13px] text-gray-800 dark:text-gray-200 mt-2 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: translation?.title || "",
        }}
      />

      {/* Lire plus */}
      <div className="mt-3 text-[13px] text-principal font-medium hover:underline">
        {t("Read_more")}
      </div>
    </motion.article>
  );
};

export default BlogThematiqueCard;
