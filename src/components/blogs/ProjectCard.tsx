import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  projet?: any;
}
const ProjectCard = ({ projet }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <div
        key={projet.id}
        className="bg-white p-6 rounded-lg shadow-md border dark:bg-slate-800 hover:shadow-lg transition-shadow"
      >
        <h2
          className="text-xl font-bold text-gray-800 dark:text-white"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(projet?.translations, lang)?.title,
          }}
        ></h2>
        <p className="text-gray-400 text-xs mt-4">
          Début projet: {projet?.datestarted} Fin projet {projet?.dateend}
        </p>
        <p
          className="text-gray-600 mt-2 dark:text-white line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(projet?.translations, lang)
              ?.description,
          }}
        ></p>
        <span
          className={`inline-block mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
            projet.status === "Complet"
              ? "bg-yellow-200 text-yellow-800"
              : projet.status === 1
              ? "bg-green-200 text-green-800"
              : "bg-blue-200 text-blue-800"
          }`}
        >
          Complet
        </span>
        <br />
        <a
          href={`/project/detail/` + projet?.id}
          className="mt-4 md:mt-0 text-principal hover:text-hover hover:underline"
        >
          Detail du projet →
        </a>
      </div>
      {/* <Link to={`/report/detail/` + projet?.id} onClick={() => window.scroll}>
        <div className="p-4 shadow-lg  relative overflow-hidden rounded-lg text-sm">
          <div className="overflow-hidden rounded-t-lg hovering">
            <img
              src={projet?.image}
              alt="not found"
              className="mx-auto h-[250px] w-full
          object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
            />
          </div>
          <div className=" flex justify-between space-x-4 py-2 text-slate-600">
            <p className="bg-principal hover:bg-hover rounded-md px-4 py-1 text-white ">
              Début projet: {projet?.datestarted}
            </p>
            <p className="bg-principal hover:bg-hover rounded-md px-4 py-1 text-white ">
              Fin projet {projet?.dateend}
            </p>
          </div>
          <div className="space-y-2 py3">
            <h1
              className="font-montserrat text-xl line-clamp-1 font-bold"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(projet?.translations, lang)
                  ?.title,
              }}
            ></h1>
            <p
              className="font-montserrat line-clamp-5"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(projet?.translations, lang)
                  ?.description,
              }}
            ></p>
          </div>
        </div>
      </Link> */}
    </>
  );
};

export default ProjectCard;
