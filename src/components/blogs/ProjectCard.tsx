import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  projet?: any;
}
const ProjectCard = ({ projet }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <Link
        to={
          `/projet/detail/` +
          showingTranslateValue(projet?.translations, lang)?.slug
        }
        onClick={() => window.scroll(0, 0)}
      >
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
            <div className=" flex justify-between">
              {/* <img
                src={projet?.author?.image}
                className=" h-[30px] px-30 rounded-full duration-200 hover:scale-105"
              />
              <p className=" line-clamp-1 mt-1">{projet?.author.full_name}</p> */}
            </div>
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
            F
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProjectCard;
