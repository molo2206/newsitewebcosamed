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
      className="cursor-pointer flex items-start space-x-4 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-md transition-shadow p-4"
    >
      <img
        src={blog?.image}
        alt={blog?.id}
        className="w-28 h-28 rounded-md object-cover"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2
            className="text-base font-semibold text-gray-800 dark:text-white line-clamp-1"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(blog?.translations, lang)?.title || "",
            }}
          />

          <p
            className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(blog?.translations, lang)?.description || "",
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <img
              src={blog?.author?.image}
              alt={blog?.author?.full_name || "Auteur"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>Par {blog?.author?.full_name || "Inconnu"}</span>
          </div>
          <span>{formattedDate}</span>
        </div>

        <div className="text-right mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation(); // empêche le déclenchement du div parent
              goToDetail();
            }}
            className="text-principal font-medium hover:underline text-sm"
          >
            Lire la suite
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
