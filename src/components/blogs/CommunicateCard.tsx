import { useNavigate } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useLanguageContext } from "../../context/LanguageContext";
import { motion } from "framer-motion";

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

  if (!communicate) return null;

  const goToAbout = () => {
    if (communicate?.id) {
      navigate(`/communicated/${communicate.id}`);
    }
  };

  const title =
    showingTranslateValue(communicate.translations, lang)?.title || "";
  const description =
    showingTranslateValue(communicate.translations, lang)?.description || "";

  return (
    <motion.div
      key={communicate.id}
      onClick={goToAbout}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") goToAbout();
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row cursor-pointer bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow overflow-hidden max-w-full md:max-w-3xl rounded-md"
    >
      {/* Image */}
      <img
        src={communicate.file}
        alt={`Image du communiqué ${communicate.id}`}
        loading="lazy"
        className="w-full h-48 md:w-36 md:h-36 object-cover flex-shrink-0 rounded-t-md md:rounded-l-md"
      />

      {/* Contenu texte */}
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div>
          <h2
            className="text-gray-900 dark:text-white font-semibold text-[13px] line-clamp-1"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-3 text-[12px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="flex items-center justify-between mt-4 text-gray-500 dark:text-gray-400 text-[11px]">
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
          <span className="dark:text-white ">{communicate.created}</span>
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToAbout();
            }}
            className="text-principal font-medium hover:underline text-[12px]"
          >
            Lire la suite →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunicateCard;
