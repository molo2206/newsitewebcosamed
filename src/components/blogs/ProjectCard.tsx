import { date_format, limittext, showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  projet?: any;
  index?: number;
}
const ProjectCard = ({ projet, index }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <div
        key={index}
        className="p-4 border rounded-lg shadow-md bg-white flex flex-col sm:flex-row gap-4"
      >
        {projet?.image && (
          <img
            src={projet?.image}
            alt={showingTranslateValue(projet?.translations, lang)?.title}
            className="hidden md:block w-64 h-64 object-cover rounded-md"
          />
        )}
        <div>
          {projet?.created_at && (
            <p className="text-gray-500 text-sm">{ date_format(projet?.created_at) }</p>
          )}
          <h2
            className="text-lg font-semibold text-principal hover:underline cursor-pointer"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(projet?.translations, lang)?.title,
            }}
          ></h2>
          <p
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{
              __html: limittext(showingTranslateValue(projet?.translations, lang)
              ?.description,200)
            }}
          ></p>
          <p className="text-gray-400 text-xs mt-4">
            Début projet: {projet?.datestarted} Fin projet {projet?.dateend}
          </p>
          <a
            href={`/project/detail/` + projet?.id}
            className="mt-4 md:mt-0 text-principal hover:text-hover hover:underline"
          >
            Detail du projet →
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
