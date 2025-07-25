import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../../context/LanguageContext";
import { motion } from "framer-motion";

interface Props {
  blog?: any;
}

const BlogCard = ({ blog }: Props) => {
  const { language: lang } = useLanguageContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToDetail = () => {
    const slug = showingTranslateValue(blog?.translations, lang)?.slug;
    if (slug) {
      navigate(`/blog/detail/${slug}`);
    }
  };

  const formattedDate = blog?.publication_date
    ? format(new Date(blog.publication_date), "d MMMM yyyy", { locale: fr })
    : "";

  const translation = showingTranslateValue(blog?.translations, lang);
  const category = showingTranslateValue(blog?.category?.translations, lang);

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
          src={blog?.image}
          alt={translation?.title}
          className="h-40 w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Date */}
      <p className=" text-[11px] text-gray-500 dark:text-gray-400">{formattedDate}</p>

      {/* Catégorie */}
      {category && (
        <div className="mt-2">
          <span
            className="text-[8px] font-semibold uppercase text-principal bg-principal/10 px-2 py-1 rounded-md tracking-wide"
            dangerouslySetInnerHTML={{ __html: category.name }}
          />
        </div>
      )}

      {/* Titre */}
      <h3
        className="font-semibold  text-[13px] text-gray-800 dark:text-gray-200 mt-2 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: translation?.title || "",
        }}
      />

      {/* Aperçu / extrait */}
      {translation?.content && (
        <p
          className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: translation.content.slice(0, 120) + "...",
          }}
        />
      )}

      {/* Lire plus */}
      <div className="mt-3  text-[13px] text-principal font-medium hover:underline">
        {t("Read_more")}
      </div>
    </motion.article>
  );
};

export default BlogCard;
