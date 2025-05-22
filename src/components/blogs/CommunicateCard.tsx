import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface Props {
  communicate?: {
    id: number | string;
    file: string;
    translations: any[];
    author: {
      image: string;
      full_name: string;
    };
    created: string;
  };
}

const CommunicateCard = ({ communicate }: Props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToAbout = () => {
    if (communicate?.id) {
      navigate(`/communicated/${communicate.id}`);
    }
  };

  if (!communicate) return null;

  const title = showingTranslateValue(communicate.translations, lang)?.title || "";
  const description = showingTranslateValue(communicate.translations, lang)?.description || "";

  return (
    <div
      key={communicate.id}
      className="bg-white rounded-lg shadow-md overflow-hidden py-4 hover:shadow-lg transition-shadow border dark:bg-slate-800 cursor-pointer"
      onClick={goToAbout}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") goToAbout();
      }}
    >
      <img
        src={communicate.file}
        alt={`Image du communiqué ${communicate.id}`}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2
          className="sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-800 line-clamp-1 dark:text-white"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="text-gray-600 sm:text-sm md:text-sm lg:text-sm mb-4 line-clamp-2 dark:text-white"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-2">
            <img
              src={communicate.author.image}
              alt={`Photo de ${communicate.author.full_name}`}
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
            <span className="dark:text-white sm:text-sm md:text-sm lg:text-sm">
              Par {communicate.author.full_name}
            </span>
          </div>
          <span className="dark:text-white sm:text-sm md:text-sm lg:text-sm">
            {communicate.created}
          </span>
        </div>
      </div>
      <div className="p-4 border-t text-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToAbout();
          }}
          className="text-principal font-medium hover:underline sm:text-sm md:text-sm lg:text-sm"
        >
          Lire la suite
        </button>
      </div>
    </div>
  );
};

export default CommunicateCard;
