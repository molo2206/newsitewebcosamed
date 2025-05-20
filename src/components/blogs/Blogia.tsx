import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { showingTranslateValue } from "../../utils/heleprs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Props {
  blog?: any;
}

const formatDate = (date: string) => {
  return format(new Date(date), "d MMMM yyyy", { locale: fr });
};

const Blogia = ({ blog }: Props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate(
      `/blog/detail/` + showingTranslateValue(blog?.translations, lang)?.slug
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 max-w-xl mx-auto my-4">
      {/* En-tête avec avatar, nom, date */}
      <div className="flex items-center p-4 space-x-3">
        <img
          src={blog.author.image}
          alt={blog.author.full_name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 dark:text-white text-sm">
            {blog.author.full_name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300">
            {formatDate(blog.publication_date)}
          </span>
        </div>
      </div>

      {/* Contenu (titre, image, description) */}
      <div className="px-4 pb-4 cursor-pointer" onClick={goToAbout}>
        <h2
          className="text-base font-bold text-gray-800 dark:text-white mb-2 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(blog?.translations, lang)?.title,
          }}
        />
        {blog.image && (
          <img
            src={blog.image}
            alt="Illustration blog"
            className="w-full h-60 object-cover rounded-md mb-3"
          />
        )}
        <p
          className="text-sm text-gray-600 dark:text-gray-200 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(blog?.translations, lang)
              ?.description,
          }}
        />
      </div>

      {/* Footer avec bouton "Lire la suite" */}
      <div className="border-t px-4 py-3 text-right">
        <button
          onClick={goToAbout}
          className="text-sm text-principal font-medium hover:underline"
        >
          Lire la suite →
        </button>
      </div>
    </div>
  );
};

export default Blogia;
