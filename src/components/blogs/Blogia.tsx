import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { showingTranslateValue } from "../../utils/heleprs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Props {
  blog?: any;
}

const formatDate = (date: string) => {
  return format(new Date(date), "d MMM yyyy", { locale: fr });
};

const Blogia = ({ blog }: Props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate(`/blog/detail/` + showingTranslateValue(blog?.translations, lang)?.slug);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 overflow-hidden transition hover:shadow-md duration-300 text-sm">
      {/* Auteur + Date */}
      <div className="flex items-center gap-3 p-3">
        <img
          src={blog.author.image}
          alt={blog.author.full_name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <p className="text-gray-800 dark:text-white font-medium">
            {blog.author.full_name}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            {formatDate(blog.publication_date)}
          </p>
        </div>
      </div>

      {/* Image */}
      {blog.image && (
        <div onClick={goToAbout} className="cursor-pointer">
          <img
            src={blog.image}
            alt="Illustration blog"
            className="w-full h-40 object-cover"
          />
        </div>
      )}

      {/* Titre + description */}
      <div className="px-3 py-2 cursor-pointer" onClick={goToAbout}>
        <h2
          className="text-sm font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(blog?.translations, lang)?.title,
          }}
        />
        <p
          className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(blog?.translations, lang)?.description,
          }}
        />
      </div>

      {/* Bouton lire la suite */}
      <div className="border-t px-3 py-2 text-right">
        <button
          onClick={goToAbout}
          className="text-xs text-principal font-medium hover:underline"
        >
          Lire la suite →
        </button>
      </div>
    </div>
  );
};

export default Blogia;
