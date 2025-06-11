import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { showingTranslateValue } from "../../utils/heleprs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";

interface Props {
  blog?: any;
}

const BlogCard = ({ blog }: Props) => {
  const { lang } = useAuthContext();
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

  return (
    <div className="border dark:border-gray-700 p-4 bg-gray-50 dark:bg-slate-900 dark:text-white hover:shadow">
      <img
        src={blog?.image}
        alt={showingTranslateValue(blog?.translations, lang)?.title}
        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Date */}
      <p className="text-sm">{formattedDate}</p>

      {/* Catégorie */}
      {blog?.category && (
        <div className="inline-block mt-2">
          <span
            className="inline-block text-[10px] font-semibold uppercase text-principal bg-principal/10 px-2 py-1 rounded-md tracking-wide"
            dangerouslySetInnerHTML={{
              __html:
                showingTranslateValue(blog.category.translations, lang)?.name ||
                "",
            }}
          />
        </div>
      )}

      {/* Titre */}
      <p
        className="font-medium text-sm text-gray-800 dark:text-gray-200 mt-1 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: showingTranslateValue(blog?.translations, lang)?.title || "",
        }}
      ></p>

      {/* Lire plus */}
      <div className="mt-3 flex space-x-4 text-sm">
        <a
          onClick={goToDetail}
          className="text-principal font-medium dark:text-principal cursor-pointer"
        >
          {t("Read_more")}
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
