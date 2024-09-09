import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  report?: any;
}

const RepportCard = ({ report }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <Link
        to={`/report/detail/` + report?.id}
        onClick={() => window.scroll}
      >
         <div className="p-4 shadow-lg  relative overflow-hidden rounded-lg text-sm">
          <div className="overflow-hidden rounded-t-lg hovering">
            <img
              src={report?.image}
              alt="not found"
              className="mx-auto h-[250px] w-full
            object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
            />
            
          </div>
          <div className=" flex justify-between py-2 text-slate-600">
            <p className="bg-principal hover:bg-hover rounded-md px-4 py-1 text-white ">{report?.created}</p>
            <div className=" flex justify-between">
              <img
                src={report?.author?.image}
                className=" h-[30px] px-30 rounded-full duration-200 hover:scale-105"
              />
              <p className=" line-clamp-1 mt-1">{report?.author.full_name}</p>
            </div>
          </div>
          <div className="space-y-2 py3">
            <h1
              className="font-montserrat line-clamp-1 font-bold"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(report?.translations, lang)?.title,
              }}
            ></h1>
            <p
              className="font-montserrat line-clamp-5"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(report?.translations, lang)
                  ?.description,
              }}
            ></p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RepportCard;
