import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useLanguageContext } from "../../context/LanguageContext";

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
  const { language: lang } = useLanguageContext();
  const navigate = useNavigate();

  const goToAbout = () => {
    if (communicate?.id) {
      navigate(`/communicated/${communicate.id}`);
    }
  };

  if (!communicate) return null;

  const title =
    showingTranslateValue(communicate.translations, lang)?.title || "";
  const description =
    showingTranslateValue(communicate.translations, lang)?.description || "";

  return (
    <div
      key={communicate.id}
      onClick={goToAbout}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") goToAbout();
      }}
      className="flex flex-col md:flex-row cursor-pointer  bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow overflow-hidden max-w-full md:max-w-3xl"
    >
      {/* Image */}
      <img
        src={communicate.file}
        alt={`Image du communiqué ${communicate.id}`}
        loading="lazy"
        className="w-full h-48 md:w-36 md:h-36 object-cover flex-shrink-0"
      />

      {/* Contenu texte */}
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div>
          <h2
            className="text-gray-900 dark:text-white font-semibold text-lg line-clamp-1"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-3 text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="flex items-center justify-between mt-4 text-gray-500 dark:text-gray-400 text-sm">
          <div className="flex items-center space-x-2">
            <img
              src={communicate.author.image}
              alt={`Photo de ${communicate.author.full_name}`}
              loading="lazy"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="dark:text-white">
              Par {communicate.author.full_name}
            </span>
          </div>
          <span className="dark:text-white">{communicate.created}</span>
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToAbout();
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

export default CommunicateCard;
