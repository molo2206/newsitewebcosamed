import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface Props {
  bulletin?: any;
}

const BulletinCard = ({ bulletin }: Props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/bulletin/detail/${bulletin?.id}`);
  };

  const translated = showingTranslateValue(bulletin?.translations, lang);

  return (
    <div
      onClick={goToDetail}
      className="cursor-pointer flex items-start gap-6 bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 overflow-hidden transition hover:shadow-md duration-300 p-6 text-base max-w-xl"
    >
      {/* Image */}
      {bulletin?.image && (
        <img
          src={bulletin.image}
          alt={`Bulletin ${bulletin.id}`}
          className="w-40 h-40 rounded-lg object-cover flex-shrink-0"
        />
      )}

      {/* Contenu */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Titre */}
        <h2
          className="text-base font-semibold text-gray-800 dark:text-white line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: translated?.title || "",
          }}
        />

        {/* Auteur & date */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <img
              src={bulletin?.author?.image}
              alt={bulletin?.author?.full_name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>{bulletin?.author?.full_name || "Inconnu"}</span>
          </div>
          <span className="bg-slate-100 dark:bg-slate-700 text-principal px-3 py-1 rounded text-xs">
            {translated?.month}-{translated?.year}
          </span>
        </div>

        {/* Bouton lire la suite */}
        <div className="text-right mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetail();
            }}
            className="text-sm text-principal font-medium hover:underline"
          >
            Lire la suite →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulletinCard;
