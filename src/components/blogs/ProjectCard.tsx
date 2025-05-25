import { date_format, limittext, showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface Props {
  projet?: any;
  index?: number;
}

const ProjectCard = ({ projet, index }: Props) => {
  const { lang } = useAuthContext();
  const translation = showingTranslateValue(projet?.translations, lang);

  return (
    <div
      key={index}
      className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700  p-5 flex flex-col sm:flex-row gap-5 mb-6"
    >
      {/* Image du projet */}
      {projet?.image && (
        <div className="flex-shrink-0">
          <img
            src={projet.image}
            alt={translation?.title}
            className="w-64 h-64 object-cover rounded-md hidden md:block"
          />
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1">
        {/* Date de création */}
        {projet?.created_at && (
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
            {date_format(projet.created_at)}
          </p>
        )}

        {/* Titre */}
        <h2
          className="text-xl font-semibold text-[#0072CE] dark:text-white hover:underline cursor-pointer"
          dangerouslySetInnerHTML={{ __html: translation?.title }}
        />

        {/* Description (limité à 200 caractères) */}
        <p
          className="text-gray-700 dark:text-gray-100 text-sm mt-3 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: limittext(translation?.description, 200),
          }}
        />

        {/* Dates du projet */}
        <p className="text-xs text-gray-400 dark:text-gray-300 mt-4">
          Début : {projet?.datestarted || "N/A"} — Fin : {projet?.dateend || "N/A"}
        </p>

        {/* Lien vers le détail */}
        <a
          href={`/project/detail/${projet?.id}`}
          className="inline-block mt-4 text-[#0072CE] hover:underline text-sm font-medium"
        >
          Détail du projet →
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
