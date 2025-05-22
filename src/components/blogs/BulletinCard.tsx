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
      className="cursor-pointer group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden max-w-3xl"
    >
      {/* Image */}
      {bulletin?.image && (
        <div className="h-56 overflow-hidden">
          <img
            src={bulletin.image}
            alt={`Bulletin ${bulletin.id}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Contenu */}
      <div className="p-6 flex flex-col gap-4">
        {/* Date / Badge */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span className="bg-gray-100 dark:bg-slate-700 text-principal font-medium px-3 py-1 rounded-full text-xs">
            {translated?.month}-{translated?.year}
          </span>
          {bulletin?.author?.full_name && (
            <div className="flex items-center gap-2">
              <img
                src={bulletin.author.image}
                alt={bulletin.author.full_name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">
                {bulletin.author.full_name}
              </span>
            </div>
          )}
        </div>

        {/* Titre */}
        <h2
          className="text-lg font-semibold text-gray-800 dark:text-white leading-snug line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: translated?.title || "",
          }}
        />

        {/* Bouton CTA */}
        <div className="text-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetail();
            }}
            className="inline-block text-principal font-medium text-sm hover:underline"
          >
            Lire la suite →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulletinCard;
