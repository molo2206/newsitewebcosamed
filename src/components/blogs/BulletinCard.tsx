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
      className="cursor-pointer flex items-start space-x-4 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-md transition-shadow p-4"
    >
      <img
        src={bulletin?.image}
        alt={`Bulletin ${bulletin?.id}`}
        className="w-28 h-28 rounded-md object-cover"
      />

      <div className="flex-1">
        <h2
          className="text-base font-semibold text-gray-800 dark:text-white line-clamp-1"
          dangerouslySetInnerHTML={{
            __html: translated?.title || "",
          }}
        />

        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <img
              src={bulletin?.author?.image}
              alt={bulletin?.author?.full_name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>Par {bulletin?.author?.full_name}</span>
          </div>

          <span className="bg-slate-100 dark:bg-slate-700 text-principal px-2 py-1 rounded text-[11px]">
            {translated?.month}-{translated?.year}
          </span>
        </div>

        <div className="text-right mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
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

export default BulletinCard;
