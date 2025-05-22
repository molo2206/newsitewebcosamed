import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { showingTranslateValue } from "../../utils/heleprs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Props {
  blog?: any;
}

const BlogCard = ({ blog }: Props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

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
    <div
      onClick={goToDetail}
      className="group cursor-pointer overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={blog?.image}
          alt={blog?.id}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h2
          className="text-lg font-semibold text-gray-800 dark:text-white leading-snug line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(blog?.translations, lang)?.title || "",
          }}
        />

        {/* Description */}
        <p
          className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(blog?.translations, lang)?.description || "",
          }}
        />

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-slate-700 text-xs text-gray-500 dark:text-gray-400">
          {/* Author */}
          <div className="flex items-center space-x-2">
            <img
              src={blog?.author?.image}
              alt={blog?.author?.full_name || "Auteur"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-sm">{blog?.author?.full_name || "Inconnu"}</span>
          </div>

          {/* Date */}
          <span className="text-sm">{formattedDate}</span>
        </div>

        {/* Lire la suite */}
        <div className="text-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetail();
            }}
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            Lire la suite →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
