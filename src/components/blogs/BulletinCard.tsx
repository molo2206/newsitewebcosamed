import { Link } from "react-router-dom";
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";

interface props {
  bulletin?: any;
}

const BulletinCard = ({ bulletin }: props) => {
  const { lang } = useAuthContext();
  return (
    <>
      <Link
        to={`/bulletin/detail/` + bulletin?.id}
        onClick={() => window.scroll}
      >
        <div className="p-4 shadow-lg py-2  relative overflow-hidden rounded-lg text-sm 
           border dark:bg-slate-900 ">
          <div className=" overflow-hidden rounded-t-lg hovering ">
            <img
              src={bulletin?.image}
              alt="not found"
              className="mx-auto h-64 w-64 object-fill "
            />
          </div>
          <div className=" flex justify-between  py-4 text-slate-600">
            <p
              className="bg-slate-100 hover:bg-hover hover:text-slate-100 rounded-md px-4 py-1 text-principal "
              dangerouslySetInnerHTML={{
                __html:
                  showingTranslateValue(bulletin?.translations, lang)?.month +
                  "-" +
                  showingTranslateValue(bulletin?.translations, lang)?.year,
              }}
            ></p>
            
            <div className=" flex justify-between gap-2">
              <img
                src={bulletin?.author?.image}
                className=" h-[30px] px-30 rounded-full duration-200 hover:scale-105"
              />
              <p className=" line-clamp-1 mt-1 dark:text-white">{bulletin?.author.full_name}</p>
            </div>
          </div>
          <div className="space-y-2 py3">
            <h1
              className="font-montserrat line-clamp-1 font-bold text-sm dark:text-white"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(bulletin?.translations, bulletin)
                  ?.title,
              }}
            ></h1>
            <p
              className="font-montserrat line-clamp-3 text-sm dark:text-white"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(bulletin?.translations, lang)
                  ?.description,
              }}
            ></p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BulletinCard;
